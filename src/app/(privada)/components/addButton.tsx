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
import { useState } from "react"
import { postData } from "@/services/post-data.service"
import { useRouter } from "next/navigation"
import { AddButtonProps } from "@/types/models"

export function AddButton({ title, description, buttonLabel, fields, apiUrl, serverAction }: AddButtonProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const data: Record<string, any> = {}

        fields.forEach(field => {
            if (field.type === "number") {
                const value = formData.get(field.name)
                data[field.name] = value ? Number(value) : null
            } else {
                data[field.name] = formData.get(field.name) || ""
            }
        })

        try {
            if (serverAction) {
                await serverAction(data)
                e.currentTarget?.reset()
                setOpen(false)
            } else {
                const response = await postData(apiUrl, data)
                e.currentTarget?.reset()
                setOpen(false)

                if (response.status === 201 || response.status === 200) {
                    router.refresh()
                }
            }
        } catch (error) {
            console.error("Erro ao salvar:", error)
            setError(error instanceof Error ? error.message : "Erro ao salvar")
        } finally {
            setLoading(false)
        }
    }

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen) {
            setError("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 cursor-pointer">
                    {buttonLabel}
                </Button>
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
                            {loading ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
