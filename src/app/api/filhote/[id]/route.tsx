import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import { revalidateTag } from "next/cache";
import { randomUUID } from "crypto";

const saveFile = async (file: File) => {
  const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'filhotes');
  const buffer = await file.arrayBuffer();

  const ext = path.extname(file.name);
  const newFileName = `${randomUUID()}${ext}`;
  const filePath = path.join(UPLOAD_DIR, newFileName);

  await writeFile(filePath, Buffer.from(buffer));
  return newFileName;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const puppy = await prisma.puppy.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!puppy) {
      return NextResponse.json(
        { error: "Filhote não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Filhote encontrado com sucesso",
      data: puppy,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao buscar o filhote" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const puppy = await prisma.puppy.findUnique({
      where: { id },
    });

    if (!puppy) {
      return NextResponse.json(
        { error: "Filhote não encontrado" },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const age = formData.get('age');
    const weight = formData.get('weight');
    const primaryImage = formData.get('primaryImage');
    const status = formData.get('status');
    const keepImageUrls = formData.getAll('keepImages');
    const newPrimaryImageFile = formData.get('newPrimaryImage');
    const newImages = formData.getAll('images');

    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = String(name);
    if (description) dataToUpdate.description = String(description);
    if (price) dataToUpdate.price = Number(price);
    if (age) dataToUpdate.age = String(age);
    if (weight) dataToUpdate.weight = String(weight);
    if (status) dataToUpdate.status = String(status);

    if (newPrimaryImageFile instanceof File) {
      const savedFileName = await saveFile(newPrimaryImageFile);
      dataToUpdate.primaryImage = `/uploads/filhotes/${savedFileName}`;
    } else if (primaryImage && primaryImage !== 'undefined' && primaryImage !== 'null') {
      dataToUpdate.primaryImage = String(primaryImage);
    }

    const updated = await prisma.puppy.update({
      where: { id },
      data: dataToUpdate,
    });

    const existingImages = await prisma.productImage.findMany({
      where: { puppyId: id },
    });

    const keepUrls = keepImageUrls.map(url => String(url));
    const imagesToDelete = existingImages.filter(img => !keepUrls.includes(img.url));

    for (const img of imagesToDelete) {
      try {
        const fileName = img.url.split('/').pop();
        if (fileName) {
          const filePath = path.join(process.cwd(), 'public', 'uploads', 'filhotes', fileName);
          await unlink(filePath);
        }
      } catch (error) {
        console.error('Erro ao deletar arquivo:', error);
      }

      await prisma.productImage.delete({
        where: { id: img.id },
      });
    }

    if (newImages && newImages.length > 0) {
      const imagesToCreate = [];

      for (const img of newImages) {
        if (img instanceof File) {
          const savedFileName = await saveFile(img);
          imagesToCreate.push({
            url: `/uploads/filhotes/${savedFileName}`,
            puppyId: id,
          });
        }
      }

      if (imagesToCreate.length > 0) {
        await prisma.productImage.createMany({
          data: imagesToCreate,
        });
      }
    }

    revalidateTag('filhotes', 'max');

    return NextResponse.json({
      message: "Filhote atualizado com sucesso",
      data: updated,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar filhote:", error);
    return NextResponse.json(
      { error: `Falha ao atualizar o filhote: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const puppy = await prisma.puppy.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!puppy) {
      return NextResponse.json(
        { error: "Filhote não encontrado" },
        { status: 404 }
      );
    }

    try {
      const primaryFileName = puppy.primaryImage.split('/').pop();
      if (primaryFileName) {
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'filhotes', primaryFileName);
        await unlink(filePath);
      }
    } catch (error) {
      console.error('Erro ao deletar imagem principal:', error);
    }

    for (const img of puppy.images) {
      try {
        const fileName = img.url.split('/').pop();
        if (fileName) {
          const filePath = path.join(process.cwd(), 'public', 'uploads', 'filhotes', fileName);
          await unlink(filePath);
        }
      } catch (error) {
        console.error('Erro ao deletar imagem da galeria:', error);
      }
    }

    await prisma.puppy.delete({
      where: { id },
    });

    revalidateTag('filhotes', 'max');

    return NextResponse.json({
      message: "Filhote deletado com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao deletar filhote:", error);
    return NextResponse.json(
      { error: `Falha ao deletar o filhote: ${error.message}` },
      { status: 500 }
    );
  }
}
