import { z } from "zod";
import { unauthorizedResponse, verifyAuth } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const socialMediaSchema = z.object({
  plataform: z.string().min(1, "A plataforma é obrigatória"),
  link: z.string().url("O link deve ser uma URL válida").optional().or(z.literal('')),
  value: z.string().optional(),
  status: z.boolean().optional().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const socialMedia = await prisma.socialMedia.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Redes sociais carregadas com sucesso",
      data: socialMedia,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao buscar as redes sociais" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.success) return unauthorizedResponse();

  try {
    const body = await request.json();
    const parsedBody = socialMediaSchema.parse(body);

    const existing = await prisma.socialMedia.findFirst({
      where: {
        plataform: parsedBody.plataform,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Esta plataforma já está cadastrada" },
        { status: 409 }
      );
    }

    const socialMedia = await prisma.socialMedia.create({
      data: {
        plataform: parsedBody.plataform,
        link: parsedBody.link || "",
        value: parsedBody.value,
        status: parsedBody.status,
      },
    });

    revalidateTag('social-media', 'max');

    return NextResponse.json(
      {
        message: "Rede social criada com sucesso",
        data: socialMedia,
      },
      { status: 201 }
    );
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
      { error: "Falha ao criar a rede social" },
      { status: 500 }
    );
  }
}
