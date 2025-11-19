import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

export async function DELETE(
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

    await prisma.puppy.delete({
      where: { id },
    });

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
