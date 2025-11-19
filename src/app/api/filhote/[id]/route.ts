import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyAuth, unauthorizedResponse } from "@/lib/auth-utils";
import { z } from "zod";

const puppyPatchSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    status: z.enum(["ativo", "inativo"]).optional(),
    primaryImage: z.string().url().optional(),
    images: z.array(z.string().url()).optional()
});

const idSchema = z.string().min(1, "ID é obrigatório");

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = await verifyAuth(request);
    if (!auth.success) return unauthorizedResponse();

    try {
        const idValidated = idSchema.parse((await params).id);
        const body = await request.json();
        const parsed = puppyPatchSchema.parse(body);

        const dataToUpdate: any = {};

        if (parsed.name !== undefined) dataToUpdate.name = parsed.name;
        if (parsed.description !== undefined) dataToUpdate.description = parsed.description;
        if (parsed.price !== undefined) dataToUpdate.price = parsed.price;
        if (parsed.status !== undefined) dataToUpdate.status = parsed.status;
        if (parsed.primaryImage !== undefined)
            dataToUpdate.primaryImage = parsed.primaryImage;

        const updated = await prisma.$transaction(async tx => {
            const updatedPuppy = await tx.puppy.update({
                where: { id: idValidated },
                data: dataToUpdate,
            });

            if (parsed.images !== undefined) {
                await tx.productImage.deleteMany({
                    where: { puppyId: idValidated },
                });

                if (parsed.images.length > 0) {
                    await tx.productImage.createMany({
                        data: parsed.images.map(url => ({
                            url,
                            puppyId: idValidated,
                        })),
                    });
                }
            }

            return updatedPuppy;
        });

        return NextResponse.json({
            message: "Filhote atualizado com sucesso",
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
            { error: "Falha ao atualizar o Filhote" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = await verifyAuth(request);
    if (!auth.success) return unauthorizedResponse();
    try {
        const { id } = await params;
        const idValidated = idSchema.parse(id);

        await prisma.puppy.delete({
            where: { id: idValidated },
        });

        return NextResponse.json({
            message: "Filhote deletado com sucesso",
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues.map(e => e.message) },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Falha ao deletar o Filhote" },
            { status: 500 }
        );
    }
}
