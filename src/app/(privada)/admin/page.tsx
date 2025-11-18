import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, Instagram, Globe, Calendar, Star } from "lucide-react"
import Link from "next/link"
import { DateDisplay } from "../components/dateDisplay"
import { Suspense } from "react"

const quickActions = [
  {
    title: "Cadastrar Filhote",
    description: "Adicione um novo filhote ao catálogo",
    href: "/admin/filhotes",
    icon: PawPrint,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    title: "Instagram",
    description: "Gerencie o feed do Instagram",
    href: "/admin/instagram",
    icon: Instagram,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600"
  },
  {
    title: "Redes Sociais",
    description: "Gerencie todas as redes sociais",
    href: "/admin/redes-sociais",
    icon: Globe,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  }
]

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="bg-linear-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <PawPrint className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Bem-vindo de Volta!
              </h1>
            </div>
            <p className="text-md text-blue-100 max-w-2xl">
              Gerencie seus filhotes, redes sociais e todo o conteúdo do Canil Cannine
              em um só lugar. Aqui você tem controle total sobre sua presença digital.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-300" />
                <Suspense fallback={<span className="text-sm text-blue-100">Carregando...</span>}>
                  <DateDisplay />
                </Suspense>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center mt-6 md:mt-0">
            <div className="relative">
              <div className="w-32 h-32 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <PawPrint className="h-16 w-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <PawPrint className="h-5 w-5 text-blue-600" />
          Ações Rápidas
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Card key={action.title} className="hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-slate-900 group-hover:text-blue-700 transition-colors">
                      {action.title}
                    </CardTitle>
                    <div className={`${action.iconBg} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 ${action.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{action.description}</p>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-slate-800 hover:bg-slate-900 text-white">
                    <Link href={action.href}>Acessar</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Manutenção contínua</h3>
              <p className="text-sm text-slate-600 mt-1">
                Mantenha as informações e conteúdos sempre atualizados para assegurar uma comunicação eficiente e organizada.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}