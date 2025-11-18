import { TableDemo } from "../../../components/dataTable";
import type { RedesSociaisTableProps } from "@/types/models";

export function RedesSociaisTable({ socialMedia }: RedesSociaisTableProps) {
  const tableHead = ["Id", "Plataforma", "Link", "Status", "Ação"];

  if (!socialMedia || socialMedia.length === 0) {
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
            Comece adicionando uma nova rede social.
          </p>
        </div>
      </div>
    );
  }

  const tableRows = socialMedia.map((item) => ({
    id: item.id,
    title: item.plataform,
    url: item.link,
    status: item.status,
  }));

  return <TableDemo tableHead={tableHead} rows={tableRows} apiUrl="/api/redes-sociais" />;
}
