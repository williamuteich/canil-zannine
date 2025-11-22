/**
 * Função genérica para fazer requisições GET
 * @param url - URL da API para fazer a requisição
 * @returns Promise com os dados ou erro
*/
export async function getData<T>(url: string): Promise<T> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const fullUrl = url.startsWith("http") ? url : (baseUrl ? `${baseUrl}${url}` : url);

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
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

    if (!result) {
      return result as T;
    }

    return result;

  } catch (error: any) {
    const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
    const isHangingPromise = error?.digest === 'HANGING_PROMISE_REJECTION';

    if (!isBuild && !isHangingPromise) {
      console.error(`Erro ao buscar ${url}:`, error);
    }

    return null as unknown as T;
  }
}
