import Link from "next/link";
import { Menu, Home, Heart, MessageCircle, Info, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logoImage from "@/assets/logo.png";

export function MobileSidebar() {
  const navigationLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/nossos-filhotes", label: "Nossos Filhotes", icon: Heart },
    { href: "/filhotes-entregues", label: "Filhotes Entregues", icon: Heart },
    { href: "/#contato", label: "Contato", icon: MessageCircle },
    { href: "/sobre", label: "Sobre", icon: Info },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button aria-label="Abrir menu de navegação" className="md:hidden p-2.5 rounded-lg hover:bg-pink-50 transition-all duration-300 active:scale-95 cursor-pointer">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[340px] bg-white border-l border-gray-200 p-0 flex flex-col h-full max-h-screen overflow-y-auto overscroll-contain"
      >
        <div className="px-6 py-5 bg-white border-b border-gray-200">
          <SheetTitle className="sr-only">Menu de navegação do Canil Zannine</SheetTitle>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-pink-100 to-pink-200 flex items-center justify-center shadow-md border border-pink-200">
              <img
                src={logoImage.src}
                alt="Logo"
                width="48"
                height="48"
                className="rounded-full"
              />
            </div>
            <Link href="/" className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">
                Canil Zannine
              </h2>
              <p className="text-sm text-gray-600 font-medium mt-0.5">
                Filhotes com Amor & Qualidade
              </p>
            </Link>
          </div>
        </div>

        <nav className="flex-1 py-1 px-4 flex flex-col">
          <ul className="flex-1 flex flex-col gap-3">
            {navigationLinks.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href} className="w-full">
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="group w-full flex items-center gap-3 rounded-md px-2 py-1.5 transition-all duration-200 hover:bg-pink-50 hover:shadow-sm border border-transparent hover:border-pink-100"
                    >
                      <div className="h-10 w-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center transition-all duration-200 group-hover:bg-white group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-gray-800 text-sm block truncate">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-pink-500 shrink-0" />
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-linear-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Fale Conosco</h3>
                <p className="text-xs text-gray-600">Pronto para conhecer seu novo companheiro?</p>
              </div>
            </div>
            <SheetClose asChild>
              <Link
                href="/#contato"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-md text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Entrar em Contato
              </Link>
            </SheetClose>
          </div>
        </nav>

        <div className="px-5 py-4 bg-linear-to-b from-gray-50 to-white border-t border-gray-200">
          <div className="text-center mb-3">
            <div className="flex justify-center gap-6 mb-3">
              <div className="text-center">
                <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">FILHOTES</div>
                <div className="text-xs font-bold text-pink-600 mt-1">Saudáveis</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">VACINAS</div>
                <div className="text-xs font-bold text-pink-600 mt-1">Em Dia</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">AMOR</div>
                <div className="text-xs font-bold text-pink-600 mt-1">Garantido</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <Heart className="w-3 h-3 text-pink-500" fill="currentColor" />
              <span>Criados com carinho e responsabilidade</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}    
