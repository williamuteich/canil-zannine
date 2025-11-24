'use server'

import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

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
      let errorMessage = "Failed to create filhote";

      if (errorData.error) {
        if (Array.isArray(errorData.error)) {
          errorMessage = errorData.error.map((e: any) => `${e.path}: ${e.message}`).join(', ');
        } else {
          errorMessage = typeof errorData.error === 'string' ? errorData.error : JSON.stringify(errorData.error);
        }
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();

    updateTag('filhotes');
    revalidatePath("/admin/filhotes");
    revalidatePath("/");

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
      let errorMessage = "Failed to update filhote";

      if (errorData.error) {
        if (Array.isArray(errorData.error)) {
          errorMessage = errorData.error.map((e: any) => `${e.path}: ${e.message}`).join(', ');
        } else {
          errorMessage = typeof errorData.error === 'string' ? errorData.error : JSON.stringify(errorData.error);
        }
      }

      throw new Error(errorMessage);
    }

    updateTag('filhotes');
    revalidatePath("/admin/filhotes");
    revalidatePath("/");

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

    updateTag('filhotes');
    revalidatePath("/admin/filhotes");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting filhote:", error);
    throw new Error(error.message || "Failed to delete filhote");
  }
}
