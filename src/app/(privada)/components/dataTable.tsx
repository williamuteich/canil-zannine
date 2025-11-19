import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { tableRow } from "@/types/models"
import Link from "next/link"
import { DeleteButton } from "./deleteButton"
import Image from "next/image"

export function TableDemo({
  tableHead,
  rows,
  apiUrl,
  editUrl,
  showPrice = false,
}: {
  tableHead: string[]
  rows: tableRow[]
  apiUrl: string
  editUrl?: string
  showPrice?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <Table className="min-w-[900px]">
        <TableHeader className="bg-slate-900 text-white">
          <TableRow className="border-b border-slate-800/60 hover:bg-transparent">
            {tableHead.map((head, index) => (
              <TableHead
                key={head}
                className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wide ${index === tableHead.length - 1 ? "text-right" : "text-left"
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
                {row.image ? (
                  <div className="h-12 w-12 overflow-hidden rounded-lg border border-slate-200">
                    <Image
                      src={row.image}
                      alt={row.title}
                      className="h-full w-full object-cover"
                      height={48}
                      width={48}
                    />
                  </div>
                ) : (
                  row.id
                )}
              </TableCell>
              <TableCell className="py-3.5 px-4 text-sm text-slate-900 font-medium">
                {row.title}
              </TableCell>
              <TableCell className="py-3.5 px-4 text-sm text-slate-600">
                {row.age || '-'}
              </TableCell>
              <TableCell className="py-3.5 px-4 text-sm text-slate-600">
                {row.weight || '-'}
              </TableCell>
              <TableCell className="py-3.5 px-4 text-sm text-slate-700 max-w-[200px]">
                {row.url ? (
                  <Link
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline truncate block"
                  >
                    {row.url}
                  </Link>
                ) : row.description ? (
                  <span className="line-clamp-1 block" title={row.description}>
                    {row.description}
                  </span>
                ) : (
                  <span>{row.subtitle || '-'}</span>
                )}
              </TableCell>

              {showPrice && (
                <TableCell className="py-3.5 px-4 text-sm text-slate-700">
                  {row.price ? `R$ ${row.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                </TableCell>
              )}

              <TableCell className="py-3.5 px-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${row.status
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                    }`}
                >
                  {row.status ? "Ativo" : "Inativo"}
                </span>
              </TableCell>
              <TableCell className="py-3.5 px-4 text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                  {editUrl ? (
                    <Link href={`${editUrl}/${row.id}`}>
                      <button className="cursor-pointer rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50">
                        Editar
                      </button>
                    </Link>
                  ) : (
                    <button className="cursor-pointer rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50">
                      Editar
                    </button>
                  )}
                  <DeleteButton id={row.id} apiUrl={apiUrl} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}