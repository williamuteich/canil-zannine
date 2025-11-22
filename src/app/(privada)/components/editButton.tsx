"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EditButtonProps } from "@/types/models"
import { Pencil } from "lucide-react"

export function EditButton({ id, title, description, fields, apiUrl, initialData, serverAction }: EditButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [data, setData] = useState<Record<string, any>>(initialData || {})
  const router = useRouter()

  useEffect(() => {
    if (open && initialData) {
      setData(initialData)
    }
  }, [open, initialData])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const formValues: Record<string, any> = {}

    fields.forEach(field => {
      if (field.type === "number") {
        const value = formData.get(field.name)
        formValues[field.name] = value ? Number(value) : null
      } else {
        formValues[field.name] = formData.get(field.name) || ""
      }
    })

    try {
      if (serverAction) {
        await serverAction(id, formValues)
        setOpen(false)
      } else {
        console.error("Server action not provided")
        setError("Erro interno: Ação do servidor não fornecida.")
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error)
      setError(error instanceof Error ? error.message : "Erro ao atualizar")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setError("")
      if (!initialData) {
        setData({})
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="cursor-pointer rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1">
          <Pencil className="h-3 w-3" />
          Editar
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {fields.map((field) => (
              <div key={field.name} className="grid gap-3">
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>

                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    defaultValue={data[field.name] || ""}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Selecione...</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    defaultValue={data[field.name] || ""}
                  />
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="border-gray-700 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className={`bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                }`}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
