import Sidebar from "../components/sidebar"
import { LogoutDashboard } from "../components/logoutButton"
import { ViewSiteButton } from "../components/viewSiteButton"

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
                        <div className="flex items-center gap-3">
                            <ViewSiteButton />
                            <div className="hidden md:block">
                                <LogoutDashboard />
                            </div>
                        </div>
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