import { z } from "zod";
import { unauthorizedResponse, verifyAuth } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { uploadImage } from "@/lib/storage";

const puppySchema = z.object({
    name: z.string().min(1, "O título é obrigatório"),
    description: z.string().min(1, "A descrição é obrigatória"),
    comentario: z.string().optional(),
    price: z.number().min(0, "O preço deve ser um número positivo"),
    age: z.string().optional(),
    weight: z.string().optional(),
    status: z.enum(["entregue", "ativo", "inativo"]).optional().default("ativo"),
    primaryImage: z.string().min(1, "A imagem principal é obrigatória"),
    images: z.array(z.string().min(1, "A URL da imagem é obrigatória")).optional(),
});

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        const skip = (page - 1) * limit;

        const where: any = {};
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { description: { contains: search } },
            ];
        }

        const [puppies, total] = await Promise.all([
            prisma.puppy.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.puppy.count({ where }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            message: "Dados dos filhotes carregados com sucesso",
            data: puppies,
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
            { error: "Falha ao buscar os dados dos filhotes" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const auth = await verifyAuth(request);
    if (!auth.success) return unauthorizedResponse();

    try {
        const formData = await request.formData();

        const name = formData.get('name')
        const description = formData.get('description')
        const price = Number(formData.get('price'))
        const age = formData.get('age')
        const weight = formData.get('weight')
        const primaryImage = formData.get('primaryImage')
        const images = formData.getAll('images')

        // Upload da imagem principal
        let primaryImageUrl = '';
        if (primaryImage instanceof File) {
            primaryImageUrl = await uploadImage(primaryImage, 'filhotes');
        } else {
            primaryImageUrl = String(primaryImage);
        }

        const imagesUrls: string[] = [];
        for (const img of images) {
            if (img instanceof File) {
                const url = await uploadImage(img, 'filhotes');
                imagesUrls.push(url);
            } else {
                imagesUrls.push(String(img));
            }
        }

        const rawData = {
            name,
            description,
            price,
            age: age ? String(age) : undefined,
            weight: weight ? String(weight) : undefined,
            primaryImage: primaryImageUrl,
            images: imagesUrls
        }

        const parsedBody = puppySchema.parse(rawData);

        const puppy = await prisma.puppy.create({
            data: {
                ...parsedBody,
                images: {
                    create: parsedBody.images?.map((url: string) => ({ url })) || [],
                },
            },
        });

        revalidateTag('filhotes', 'max');

        return NextResponse.json(
            {
                message: "Filhote criado com sucesso",
                data: puppy,
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
        console.error("Erro ao criar filhote:", error);
        return NextResponse.json(
            { error: `Falha ao criar o filhote: ${error.message || 'Erro desconhecido'}` },
            { status: 500 }
        );
    }
}
