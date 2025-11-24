import Link from "next/link";
import { Home, Search, AlertCircle } from "lucide-react";
import { Header } from "./home/header/header";

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-[#fef9e7] via-[#ffe4de] to-[#e8ebe0]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="mx-auto max-w-xl sm:max-w-2xl">
              <div className="bg-[#faf8f5]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#ebe3d5] p-8 sm:p-12">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-[#b8860b] to-[#d35836] opacity-20 blur-3xl rounded-full"></div>
                      <AlertCircle className="relative h-24 w-24 text-[#d35836]" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div>
                    <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight">
                      <span className="bg-linear-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent">404</span>
                    </h1>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Página não encontrada
                    </h2>
                    <p className="text-[#57534e] text-base sm:text-lg max-w-md mx-auto">
                      Ops! A página que você está procurando não existe ou foi movida.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                    <Link
                      href="/"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#b8860b] to-[#d35836] text-white font-semibold px-6 py-3 shadow-lg shadow-[#d4a017]/20 hover:scale-[1.02] hover:from-[#d4a017] hover:to-[#e67e66] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d4a017]/50"
                    >
                      <Home className="h-5 w-5" />
                      Voltar para o Início
                    </Link>

                    <Link
                      href="/nossos-filhotes"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white text-[#d35836] font-semibold px-6 py-3 border-2 border-[#d35836] hover:bg-[#d35836] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d4a017]/50"
                    >
                      <Search className="h-5 w-5" />
                      Ver Nossos Filhotes
                    </Link>
                  </div>

                  <div className="pt-8 flex justify-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#b8860b] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-[#d4a017] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-[#d35836] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
