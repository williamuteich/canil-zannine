import { Phone, Mail, ArrowRight, Globe2, Camera, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-pink-300 to-cyan-300 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-300 to-pink-300 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-300 to-cyan-200 rounded-full blur-2xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-12 mb-16">

          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-8 justify-center md:justify-start">
              <Image
                src="/logo.png"
                alt="Logo"
                width={70}
                height={70}
              />
            </div>
            <p className="text-white/80 leading-relaxed mb-8 max-w-sm sm:max-w-md lg:max-w-lg">
              Especializados em criar filhotes saudáveis, vacinados e socializados em ambiente familiar. Cada filhote recebe amor e cuidados individuais desde o nascimento.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white/70">Criando com amor desde 2020</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-1 h-6 bg-white rounded-full mr-3" />
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                  <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/filhotes" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                  <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  Nossos Filhotes
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                  <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                  <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-1 h-6 bg-white rounded-full mr-3" />
              Contato
            </h3>
            <div className="space-y-4 mb-6">
              <Link
                href="https://wa.me/5599999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60">Telefone/WhatsApp</span>
                  <span className="font-semibold">(11) 99999-9999</span>
                </div>
              </Link>
              <Link
                href="mailto:contato@canilzannine.com.br"
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60">Email</span>
                  <span className="font-semibold text-sm">contato@canilzannine.com.br</span>
                </div>
              </Link>
            </div>

            <div className="flex space-x-3">
              <Link aria-label="Facebook" href="#" className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/10">
                <Globe2 className="h-5 w-5 text-white" />
              </Link>
              <Link aria-label="Instagram" href="#" className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/10">
                <Camera className="h-5 w-5 text-white" />
              </Link>
              <Link aria-label="X (Twitter)" href="#" className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/10">
                <Share2 className="h-5 w-5 text-white" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col w-full gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-white/60 text-sm">&copy; 2024 Canil Zannine. Todos os direitos reservados.</p>
            <p className="text-white/60 text-sm flex items-center justify-center gap-2 md:justify-end">
              <span>Feito com</span>
              <span className="text-red-500" aria-hidden>&#10084;</span>
              <span>para conectar famílias e filhotes</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}