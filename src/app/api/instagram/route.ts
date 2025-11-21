import { z } from "zod";
import { unauthorizedResponse, verifyAuth } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const instaEmbedSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  link: z.string().url("O link deve ser uma URL válida"),
  status: z.boolean().optional().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '8');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { link: { contains: search } },
      ];
    }

    const [instaEmbeds, total] = await Promise.all([
      prisma.instaEmbed.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.instaEmbed.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      message: "Links carregados com sucesso",
      data: instaEmbeds,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao buscar os links" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.success) return unauthorizedResponse();

  try {
    const body = await request.json();
    const parsedBody = instaEmbedSchema.parse(body);

    const instaEmbed = await prisma.instaEmbed.create({
      data: {
        title: parsedBody.title,
        link: parsedBody.link,
        status: parsedBody.status,
      },
    });

    return NextResponse.json(
      {
        message: "Link criado com sucesso",
        data: instaEmbed,
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
      { error: "Falha ao criar o Link" },
      { status: 500 }
    );
  }
}
