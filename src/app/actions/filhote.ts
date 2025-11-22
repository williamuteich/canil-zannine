'use server'

import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth-config";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createFilhote(formData: FormData) {
  const session = await getServerSession(auth);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const apiUrl = `${process.env.NEXTAUTH_URL}api/filhote`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create filhote");
    }

    const result = await response.json();

    revalidateTag('filhotes', 'max');
    revalidatePath("/admin/filhotes");

    return { success: true, data: result.data };
  } catch (error: any) {
    console.error("Error creating filhote:", error);
    throw new Error(error.message || "Failed to create filhote");
  }
}

export async function updateFilhote(id: string, formData: FormData) {
  const session = await getServerSession(auth);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const apiUrl = `${process.env.NEXTAUTH_URL}api/filhote/${id}`;

    const response = await fetch(apiUrl, {
      method: 'PATCH',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update filhote");
    }

    revalidateTag('filhotes', 'max');
    revalidatePath("/admin/filhotes");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating filhote:", error);
    throw new Error(error.message || "Failed to update filhote");
  }
}

export async function deleteFilhote(id: string) {
  const session = await getServerSession(auth);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const apiUrl = `${process.env.NEXTAUTH_URL}api/filhote/${id}`;

    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete filhote");
    }

    revalidateTag('filhotes', 'max');
    revalidatePath("/admin/filhotes");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting filhote:", error);
    throw new Error(error.message || "Failed to delete filhote");
  }
}
