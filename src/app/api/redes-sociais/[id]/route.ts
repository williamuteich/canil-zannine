import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyAuth, unauthorizedResponse } from "@/lib/auth-utils";
import { z } from "zod";

const socialMediaPatchSchema = z.object({
  plataform: z.string().min(1, "A plataforma é obrigatória").optional(),
  link: z.string().url("O link deve ser uma URL válida").optional(),
  status: z.boolean().optional(),
});

const idSchema = z.string().min(1, "ID é obrigatório");

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id?: string }> }
) {
  const auth = await verifyAuth(request);
  if (!auth.success) return unauthorizedResponse();

  try {
    const { id } = await params;
    const idValidated = idSchema.parse(id);
    const body = await request.json();
    const parsed = socialMediaPatchSchema.parse(body);

    const dataToUpdate: any = {};
    if (parsed.plataform !== undefined) dataToUpdate.plataform = parsed.plataform;
    if (parsed.link !== undefined) dataToUpdate.link = parsed.link;
    if (parsed.status !== undefined) dataToUpdate.status = parsed.status;

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: "É necessário enviar pelo menos um campo para atualizar" },
        { status: 400 }
      );
    }

    const updated = await prisma.socialMedia.update({
      where: { id: idValidated },
      data: dataToUpdate,
    });

    return NextResponse.json({
      message: "Rede social atualizada com sucesso",
      data: updated,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error.issues.map(e => ({
            path: e.path.join('.'),
            message: e.message,
            code: e.code,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Falha ao atualizar a rede social" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id?: string }> }
) {
  const auth = await verifyAuth(request);
  if (!auth.success) return unauthorizedResponse();

  try {
    const { id } = await params;
    const idValidated = idSchema.parse(id);

    await prisma.socialMedia.delete({
      where: { id: idValidated },
    });

    return NextResponse.json({
      message: "Rede social deletada com sucesso",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map(e => e.message) },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Falha ao deletar a rede social" },
      { status: 500 }
    );
  }
}
