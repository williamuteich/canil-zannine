import { z } from "zod";
import { unauthorizedResponse, verifyAuth } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

const puppySchema = z.object({
    name: z.string().min(1, "O título é obrigatório"),
    description: z.string().min(1, "A descrição é obrigatória"),
    price: z.number().min(0, "O preço deve ser um número positivo"),
    status: z.enum(["pedding", "ativo", "inativo"]).optional().default("ativo"),
    primaryImage: z.string().min(1, "A imagem principal é obrigatória"),
    images: z.array(z.string().min(1, "A URL da imagem é obrigatória")).optional(),
});

const saveFile = async (file: File) => {
    const UPLOAD_DIR = path.join(process.cwd(), 'public', 'filhote');
    const buffer = await file.arrayBuffer();
    const filePath = path.join(UPLOAD_DIR, file.name);
    await writeFile(filePath, Buffer.from(buffer));
};

export async function GET(request: NextRequest) {
    try {
        const puppies = await prisma.puppy.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            message: "Dados dos filhotes carregados com sucesso",
            data: puppies,
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
        const primaryImage = formData.get('primaryImage')
        const images =  formData.getAll('images')
        
        const primaryImageName = primaryImage instanceof File ? primaryImage.name : String(primaryImage)
        const imagesNames = images.map(img => img instanceof File ? img.name : String(img))

        const rawData = {
            name,
            description,
            price,
            primaryImage: primaryImageName,
            images: imagesNames
        }

        const parsedBody = puppySchema.parse(rawData);

        const puppy = await prisma.puppy.create({
            data: {
                ...parsedBody,
                images: {
                    create: parsedBody.images?.map(filename => ({ url: `/${filename}` })) || [],
                },
                primaryImage: `/uploads/${parsedBody.primaryImage}`,
            },
        });

        if (primaryImage instanceof File) {
            await saveFile(primaryImage);
        }

        if(images){
            for (const img of images) {
                if (img instanceof File) {
                    await saveFile(img);
                }
            }
        }
        
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
        return NextResponse.json(
            { error: "Falha ao criar o Link" },
            { status: 500 }
        );
    }
}
