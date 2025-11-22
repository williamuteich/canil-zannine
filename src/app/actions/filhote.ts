'use server'

import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag } from "next/cache";

export async function createFilhote(formData: FormData) {
  try {
    const apiUrl = `${process.env.NEXTAUTH_URL}api/filhote`;
    const cookieStore = await cookies();

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Cookie': cookieStore.toString(),
      },
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
  try {
    const apiUrl = `${process.env.NEXTAUTH_URL}api/filhote/${id}`;
    const cookieStore = await cookies();

    const response = await fetch(apiUrl, {
      method: 'PATCH',
      body: formData,
      headers: {
        'Cookie': cookieStore.toString(),
      },
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
  try {
    const apiUrl = `${process.env.NEXTAUTH_URL}api/filhote/${id}`;
    const cookieStore = await cookies();

    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Cookie': cookieStore.toString(),
      },
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
