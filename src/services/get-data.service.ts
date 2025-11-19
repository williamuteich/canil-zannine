/**
 * Função genérica para fazer requisições GET
 * @param url - URL da API para fazer a requisição
 * @returns Promise com os dados ou erro
 */
export async function getData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(process.env.NEXTAUTH_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Erro ao buscar dados' }));
      const errorMessage = error.error || error.message || `Erro ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();

    if (result && typeof result === 'object' && 'data' in result) {
      return result.data;
    }

    return result;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Erro de conexão. Verifique sua internet ou se a API está rodando.');
    }

    throw error;
  }
}
