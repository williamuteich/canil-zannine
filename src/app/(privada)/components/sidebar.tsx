'use client'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { Menu, Home, PawPrint, Instagram, Globe } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
    const pathname = usePathname()

    const menuItems = [
        { icon: Home, label: "Home", href: "/admin" },
        { icon: PawPrint, label: "Filhotes", href: "/admin/filhotes" },
        { icon: Instagram, label: "Instagram", href: "/admin/instagram", external: true },
        { icon: Globe, label: "Redes Sociais", href: "/admin/redes-sociais" },
    ]

    const renderLinks = () =>
        menuItems.map(item => (
            <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 text-sm font-medium hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors ${pathname === item.href ? 'bg-slate-700 text-white font-semibold shadow-inner' : ''}`}
            >
                <item.icon className="h-6 w-6" />
                {item.label}
            </Link>
        ))

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button
                    className="p-2 cursor-pointer rounded-lg transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label="Abrir menu">
                    <Menu className="h-6 w-6" />
                </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[300px] bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 p-0 flex flex-col">
                <SheetHeader className="mb-0 p-6 pb-4 border-b border-slate-700">
                    <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                    <div className="flex flex-col items-center space-y-2">
                        <div className="rounded-lg bg-white p-2">
                            <PawPrint className="h-8 w-8 text-slate-900" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Canil Cannine</h2>
                        <p className="text-xs text-slate-300">Filhotes com amor</p>
                    </div>
                </SheetHeader>

                <nav className="space-y-1 flex-1 overflow-y-auto p-4 scrollbar-dark">
                    {renderLinks()}
                </nav>
            </SheetContent>
        </Sheet>
    )
}