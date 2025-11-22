'use server'

import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth-config";
import prisma from "@/lib/db";
import { revalidatePath, updateTag } from "next/cache";
import { z } from "zod";

const socialMediaSchema = z.object({
  plataform: z.string().min(1, "A plataforma é obrigatória"),
  link: z.string().url("O link deve ser uma URL válida").optional().or(z.literal('')),
  value: z.string().optional(),
  status: z.boolean().optional().default(true),
});

const socialMediaPatchSchema = z.object({
  plataform: z.string().min(1, "A plataforma é obrigatória").optional(),
  link: z.string().url("O link deve ser uma URL válida").optional().or(z.literal('')),
  value: z.string().optional(),
  status: z.boolean().optional(),
});

export async function createSocialMedia(data: any) {
  const session = await getServerSession(auth);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const parsed = socialMediaSchema.parse(data);

    const existing = await prisma.socialMedia.findFirst({
      where: {
        plataform: parsed.plataform,
      },
    });

    if (existing) {
      throw new Error("Esta plataforma já está cadastrada");
    }

    const socialMedia = await prisma.socialMedia.create({
      data: {
        plataform: parsed.plataform,
        link: parsed.link || "",
        value: parsed.value,
        status: parsed.status,
      },
    });

    updateTag('social-media');
    revalidatePath("/admin/redes-sociais");

    return { success: true, data: socialMedia };
  } catch (error: any) {
    console.error("Error creating social media:", error);
    throw new Error(error.message || "Failed to create social media");
  }
}

export async function updateSocialMedia(id: string, data: any) {
  const session = await getServerSession(auth);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const parsed = socialMediaPatchSchema.parse(data);

    const dataToUpdate: any = {};
    if (parsed.plataform !== undefined) dataToUpdate.plataform = parsed.plataform;
    if (parsed.link !== undefined) dataToUpdate.link = parsed.link;
    if (parsed.value !== undefined) dataToUpdate.value = parsed.value;
    if (parsed.status !== undefined) dataToUpdate.status = parsed.status;

    if (Object.keys(dataToUpdate).length === 0) {
      return { success: true };
    }

    const updated = await prisma.socialMedia.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath("/admin/redes-sociais");
    updateTag('social-media');

    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Error updating social media:", error);
    throw new Error(error.message || "Failed to update social media");
  }
}

export async function deleteSocialMedia(id: string) {
  const session = await getServerSession(auth);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.socialMedia.delete({
      where: { id },
    });

    revalidatePath("/admin/redes-sociais");
    updateTag('social-media');

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting social media:", error);
    throw new Error(error.message || "Failed to delete social media");
  }
}
