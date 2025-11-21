import { InstagramSearch } from "@/app/(privada)/components/searchItem";
import type { InstaEmbed } from "@/types/models";
import { InstagramTable } from "./InstagramTable";
import { PaginationDemo } from "@/app/(privada)/components/pagination";
import { AddButton } from "@/app/(privada)/components/addButton";
import { cacheLife, cacheTag } from "next/cache";

interface InstagramContentProps {
  page: number;
  search: string;
}

export async function InstagramContent({ page, search }: InstagramContentProps) {
  "use cache";
  cacheTag('instagram');
  cacheLife('hours');

  const limit = 8;

  let embeds: InstaEmbed[] = [];
  let pagination = {
    page: 1,
    limit,
    total: 0,
    totalPages: 0,
  };

  try {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}api/instagram?page=${page}&limit=${limit}${searchParam}`
    );
    const result = await response.json();
    embeds = result.data;
    pagination = result.pagination;
  } catch (error) {
    console.error('Erro ao carregar embeds do Instagram:', error);
  }

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Instagram</h1>
        <p className="text-base text-slate-600">
          Tela de gerenciamento das publicações do Instagram. Aqui você pode visualizar e organizar os registros.
        </p>
      </div>

      <InstagramSearch />

      <InstagramTable embeds={embeds} />

      {!search && (
        <PaginationDemo
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          className="mt-6"
        />
      )}

      <div className="mt-6 flex justify-end">
        <AddButton
          title="Adicionar Post do Instagram"
          description="Preencha os dados do novo post do Instagram."
          buttonLabel="Adicionar Post"
          apiUrl="/api/instagram"
          fields={[
            {
              name: "title",
              label: "Título",
              type: "text",
              required: true,
              placeholder: "Ex: Novo filhote chegou!",
            },
            {
              name: "link",
              label: "Link do Instagram",
              type: "url",
              required: true,
              placeholder: "https://instagram.com/p/...",
            }
          ]}
        />
      </div>
    </div>
  );
}
