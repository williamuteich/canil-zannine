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
  showPrice = true,
}: {
  tableHead: string[]
  rows: tableRow[]
  apiUrl: string
  editUrl?: string
  showPrice?: boolean
}) {
  const renderCell = (row: tableRow, field: keyof tableRow) => {
    const value = row[field];

    if (field === 'id' && row.image) {
      return (
        <div className="h-12 w-12 overflow-hidden rounded-lg border border-slate-200">
          <Image
            src={row.image}
            alt={row.title}
            className="h-full w-full object-cover"
            height={48}
            width={48}
          />
        </div>
      );
    }

    if (field === 'url' && value) {
      return (
        <Link
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline truncate block"
        >
          {value as string}
        </Link>
      );
    }

    if (field === 'description' && value) {
      return (
        <span className="line-clamp-1 block max-w-[250px]" title={value as string}>
          {value as string}
        </span>
      );
    }

    if (field === 'price' && value !== undefined) {
      return `R$ ${(value as number).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }

    if (field === 'status') {
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${value ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            }`}
        >
          {value ? "Ativo" : "Inativo"}
        </span>
      );
    }

    return value !== undefined ? String(value) : '';
  };

  const getFieldsToDisplay = (): (keyof tableRow)[] => {
    if (rows.length === 0) return [];

    const firstRow = rows[0];
    const fields: (keyof tableRow)[] = [];

    fields.push('id');

    if (firstRow.title !== undefined) fields.push('title');
    if (firstRow.age !== undefined) fields.push('age');
    if (firstRow.weight !== undefined) fields.push('weight');
    if (firstRow.url !== undefined) fields.push('url');
    if (firstRow.description !== undefined) fields.push('description');
    if (firstRow.subtitle !== undefined) fields.push('subtitle');
    if (firstRow.price !== undefined && showPrice) fields.push('price');

    fields.push('status');

    return fields;
  };

  const fieldsToDisplay = getFieldsToDisplay();

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <Table className="min-w-[900px]">
        <TableHeader className="bg-slate-900 text-white">
          <TableRow className="border-b border-slate-800/60 hover:bg-transparent">
            {tableHead.map((head, index) => (
              <TableHead
                key={`${head}-${index}`}
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
              {fieldsToDisplay.map((field, index) => (
                <TableCell
                  key={`${row.id}-${field}`}
                  className={`py-3.5 px-4 text-sm ${field === 'id' || field === 'title'
                    ? 'font-medium text-slate-900'
                    : 'text-slate-600'
                    } ${field === 'url' ? 'max-w-[200px]' : ''}`}
                >
                  {renderCell(row, field)}
                </TableCell>
              ))}

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