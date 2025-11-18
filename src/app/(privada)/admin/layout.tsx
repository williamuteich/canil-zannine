import Link from "next/link"
import Sidebar from "../components/sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <div className="flex min-h-screen flex-col">
                <header className="bg-linear-to-r from-slate-800 to-slate-900 text-white shadow-sm">
                    <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-4 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <Sidebar />
                            <div>
                                <p className="text-lg font-medium">Painel Administrativo</p>
                                <p className="text-sm text-slate-300">Controle do Sistema</p>
                            </div>
                        </div>

                        <Link
                            href="/"
                            className="rounded-md border border-slate-500 bg-slate-700/80 px-4 py-2 text-sm font-medium text-white 
                            transition-colors hover:bg-slate-600/90 hover:border-slate-400
                            focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                        >
                            Ver site
                        </Link>
                    </div>
                </header>

                <main className="flex-1">
                    <div className="mx-auto w-full max-w-[1800px] px-4 py-8">
                        <div className="rounded-md bg-white p-4 shadow-sm sm:p-6 md:p-7">{children}</div>
                    </div>
                </main>
            </div>
        </div>
    )
}