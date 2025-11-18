export async function deleteData(url: string): Promise<{ status: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const fullUrl = `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `Erro ao deletar: ${response.status}`);
  }

  return {
    status: response.status,
  };
}
