export async function patchMedia<T>(url: string, formData: FormData): Promise<{ data: T; status: number }> {
  const baseUrl = process.env.NEXTAUTH_URL;
  const fullUrl = baseUrl ? `${baseUrl}${url}` : url;

  const response = await fetch(fullUrl, {
    method: "PATCH",
    body: formData,
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `Erro ao enviar dados: ${response.status}`);
  }

  const result = await response.json();

  const responseData = result && typeof result === "object" && "data" in result ? result.data : result;

  return {
    data: responseData,
    status: response.status,
  };
}
