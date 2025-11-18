import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type InstagramRow = {
  id: string
  title: string
  url: string
  status: boolean
}

export function TableDemo({
  tableHead,
  rows,
}: {
  tableHead: string[]
  rows: InstagramRow[]
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <Table className="min-w-[900px]">
        <TableHeader className="bg-slate-900 text-white">
          <TableRow className="border-b border-slate-800/60 hover:bg-transparent">
            {tableHead.map((head, index) => (
              <TableHead
                key={head}
                className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wide ${
                  index === tableHead.length - 1 ? "text-right" : "text-left"
                }`}
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className="border-b border-slate-100/60 last:border-0 hover:bg-slate-50 transition-colors"
            >
              <TableCell className="py-3.5 px-4 text-sm font-medium text-slate-900">
                {row.id}
              </TableCell>
              <TableCell className="py-3.5 px-4 text-sm text-slate-900">
                {row.title}
              </TableCell>
              <TableCell className="py-3.5 px-4 text-sm text-slate-700">
                <a
                  href={row.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {row.url}
                </a>
              </TableCell>
              <TableCell className="py-3.5 px-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    row.status
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {row.status ? "Ativo" : "Inativo"}
                </span>
              </TableCell>
              <TableCell className="py-3.5 px-4 text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                  <button className="cursor-pointer rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50">
                    Editar
                  </button>
                  <button className="cursor-pointer rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-[11px] font-medium text-rose-700 hover:bg-rose-100">
                    Excluir
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}