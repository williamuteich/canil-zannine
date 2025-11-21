import { InstagramSearch } from "../../../components/searchItem";
import { FilhotesTable } from "./FilhotesTable";
import Link from "next/link";
import { Filhote, PaginatedResponse } from "@/types/models";
import { PaginationDemo } from "../../../components/pagination";
import { cacheLife, cacheTag } from "next/cache";

interface FilhotesContentProps {
  page: number;
  search: string;
  limit: number;
}

export async function FilhotesContent({ page, search, limit }: FilhotesContentProps) {
  'use cache'
  cacheTag('filhotes');
  cacheLife('minutes');

  let filhotes: Filhote[] = [];
  let pagination = {
    page: 1,
    limit,
    total: 0,
    totalPages: 0,
  };

  try {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}api/filhote?page=${page}&limit=${limit}${searchParam}`
    );
    const result: PaginatedResponse<Filhote> = await response.json();
    filhotes = result.data;
    pagination = result.pagination;
  } catch (error) {
    console.error('Erro ao carregar filhotes:', error);
  }

  const timestamp = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'medium'
  });

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Filhotes</h1>
        <p className="text-base text-slate-600">
          Tela de gerenciamento dos filhotes cadastrados. Aqui você pode visualizar e organizar os registros.
        </p>
        <p className="text-sm text-slate-500 italic">
          Última atualização da API: {timestamp}
        </p>
      </div>

      <InstagramSearch placeholder="Buscar filhotes" />

      <FilhotesTable filhotes={filhotes} />

      {!search && (
        <PaginationDemo
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          className="mt-6"
        />
      )}

      <div className="mt-6 flex justify-end">
        <Link href="/admin/filhotes/add">
          <button className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 cursor-pointer transition-colors">
            Adicionar Filhote
          </button>
        </Link>
      </div>
    </div>
  );
}
