export async function deleteData(url: string): Promise<{ status: number }> {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
