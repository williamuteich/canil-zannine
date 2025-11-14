import Link from "next/link";
import { Menu, Home, Heart, MessageCircle, Info, PawPrint, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden p-2.5 rounded-lg hover:bg-pink-50 transition-all duration-300 active:scale-95">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[320px] sm:w-[360px] bg-white border-l border-gray-200 p-0 flex flex-col h-full"
      >
        <div className="px-6 py-5 bg-white border-b border-gray-200 shadow-sm">
          <SheetTitle className="sr-only">Menu de navegação do Canil Zannine</SheetTitle>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center shadow-md border border-pink-200">
              <Image 
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">
                Canil Zannine
              </h2>
              <p className="text-sm text-gray-600 font-medium mt-0.5">
                Filhotes com Amor & Qualidade
              </p>
            </div>
            <div className="w-1 h-8 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full"></div>
          </div>
        </div>

        <nav className="flex-1 py-1 px-4 flex flex-col">
          <ul className="flex-1 flex flex-col gap-2">
            <li className="w-full">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="group w-full flex items-center justify-between px-4 py-4 rounded-xl text-gray-800 bg-white border border-gray-100 hover:border-pink-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-25 transition-all duration-300 font-medium shadow-sm hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <Home className="w-5 h-5 text-pink-600 group-hover:text-pink-500 transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
                      Página Inicial
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </SheetClose>
            </li>

            <li className="w-full">
              <SheetClose asChild>
                <Link
                  href="/filhotes"
                  className="group w-full flex items-center justify-between px-4 py-4 rounded-xl text-gray-800 bg-white border border-gray-100 hover:border-pink-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-25 transition-all duration-300 font-medium shadow-sm hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <Heart className="w-5 h-5 text-pink-600 group-hover:text-pink-500 transition-colors duration-300" fill="currentColor" />
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
                      Nossos Filhotes
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </SheetClose>
            </li>

            <li className="w-full">
              <SheetClose asChild>
                <Link
                  href="/contato"
                  className="group w-full flex items-center justify-between px-4 py-4 rounded-xl text-gray-800 bg-white border border-gray-100 hover:border-pink-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-25 transition-all duration-300 font-medium shadow-sm hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <MessageCircle className="w-5 h-5 text-pink-600 group-hover:text-pink-500 transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
                      Contato
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </SheetClose>
            </li>

            <li className="w-full">
              <SheetClose asChild>
                <Link
                  href="/sobre"
                  className="group w-full flex items-center justify-between px-4 py-4 rounded-xl text-gray-800 bg-white border border-gray-100 hover:border-pink-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-25 transition-all duration-300 font-medium shadow-sm hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <Info className="w-5 h-5 text-pink-600 group-hover:text-pink-500 transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
                      Sobre Nós
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </SheetClose>
            </li>
          </ul>

          <div className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-pink-25 rounded-xl border border-pink-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-pink-500" />
              Fale Conosco
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Pronto para conhecer seu novo companheiro?
            </p>
            <SheetClose asChild>
              <Link
                href="/contato"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 text-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Entrar em Contato
              </Link>
            </SheetClose>
          </div>
        </nav>

        <div className="w-full px-6 py-5 bg-gray-50 border-t border-gray-300 mt-auto">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 border border-pink-200">
              <Heart className="w-5 h-5 text-pink-600" fill="currentColor" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Amor e Dedicação
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                Criamos nossos filhotes com carinho e responsabilidade. 
                Fale conosco para conhecer nossos bebês disponíveis!
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <div className="flex-1 text-center">
              <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">FILHOTES</div>
              <div className="text-xs font-bold text-pink-600 mt-1">Saudáveis</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">VACINAS</div>
              <div className="text-xs font-bold text-pink-600 mt-1">Em Dia</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">AMOR</div>
              <div className="text-xs font-bold text-pink-600 mt-1">Garantido</div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}