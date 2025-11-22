'use server'

import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth-config";
import prisma from "@/lib/db";
import { z } from "zod";
import { revalidatePath, updateTag } from "next/cache";

const instaEmbedSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  link: z.string().url("O link deve ser uma URL válida"),
  status: z.boolean().optional().default(true),
});

const instaEmbedPatchSchema = z.object({
  title: z.string().min(1, "O título é obrigatório").optional(),
  link: z.string().url("O link deve ser uma URL válida").optional(),
  status: z.boolean().optional(),
});

export async function createInstagram(data: any) {
  const session = await getServerSession(auth);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const parsed = instaEmbedSchema.parse(data);

    const instaEmbed = await prisma.instaEmbed.create({
      data: {
        title: parsed.title,
        link: parsed.link,
        status: parsed.status,
      },
    });

    updateTag('instagram');
    revalidatePath("/admin/instagram");

    return { success: true, data: instaEmbed };
  } catch (error: any) {
    console.error("Error creating instagram:", error);
    throw new Error(error.message || "Failed to create instagram");
  }
}

export async function updateInstagram(id: string, data: any) {
  const session = await getServerSession(auth);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const parsed = instaEmbedPatchSchema.parse(data);

    const dataToUpdate: any = {};
    if (parsed.title !== undefined) dataToUpdate.title = parsed.title;
    if (parsed.link !== undefined) dataToUpdate.link = parsed.link;
    if (parsed.status !== undefined) dataToUpdate.status = parsed.status;

    if (Object.keys(dataToUpdate).length === 0) {
      return { success: true };
    }

    const updated = await prisma.instaEmbed.update({
      where: { id },
      data: dataToUpdate,
    });

    updateTag('instagram');
    revalidatePath("/admin/instagram");

    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Error updating instagram:", error);
    throw new Error(error.message || "Failed to update instagram");
  }
}

export async function deleteInstagram(id: string) {
  const session = await getServerSession(auth);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.instaEmbed.delete({
      where: { id },
    });

    updateTag('instagram');
    revalidatePath("/admin/instagram");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting instagram:", error);
    throw new Error(error.message || "Failed to delete instagram");
  }
}
