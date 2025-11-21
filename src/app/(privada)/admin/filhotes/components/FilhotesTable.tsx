import { FilhotesTableProps } from "@/types/models";
import { TableDemo } from "../../../components/dataTable";

export function FilhotesTable({ filhotes }: FilhotesTableProps) {
  const tableHead = ["Imagem", "Nome", "Idade", "Peso", "Descrição", "Preço", "Status", "Ação"];

  if (!filhotes || filhotes.length === 0) {
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
            Nenhum filhote cadastrado
          </h3>
          <p className="text-sm text-slate-600">
            Comece adicionando um novo filhote ao sistema.
          </p>
        </div>
      </div>
    );
  }

  const tableRows = filhotes.map((filhote) => ({
    id: filhote.id,
    image: filhote.primaryImage,
    title: filhote.name,
    age: filhote.age,
    weight: filhote.weight,
    description: filhote.description,
    price: filhote.price,
    status: filhote.status,
  }));

  return <TableDemo tableHead={tableHead} rows={tableRows} apiUrl="/api/filhote" editUrl="/admin/filhotes/edit" showPrice={true} />;
}
