export async function postData<T>(url: string, data: Record<string, any>): Promise<{ data: T; status: number }> {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const fullUrl = `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
