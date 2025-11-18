import { TableDemo } from "../../../components/dataTable";
import type { InstaEmbed } from "@/types/models";

interface InstagramTableProps {
  embeds: InstaEmbed[];
}

export function InstagramTable({ embeds }: InstagramTableProps) {
  const tableHead = ["Id", "Title", "Url", "Status", "Ação"];

  if (!embeds || embeds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border border-slate-200 rounded-lg bg-slate-50">
        <div className="text-center space-y-3">
          <svg
            className="mx-auto h-12 w-12 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="text-lg font-semibold text-slate-900">
            Nenhum registro encontrado
          </h3>
          <p className="text-sm text-slate-600">
            Comece adicionando um novo post do Instagram.
          </p>
        </div>
      </div>
    );
  }

  const tableRows = embeds.map((embed) => ({
    id: embed.id,
    title: embed.title,
    url: embed.link,
    status: embed.status,
  }));

  return <TableDemo tableHead={tableHead} rows={tableRows} />;
}
