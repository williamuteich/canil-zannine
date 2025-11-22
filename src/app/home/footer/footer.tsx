import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { FooterWrapper } from "./footer-wrapper";
import { FooterVisibility } from "./footer-visibility";
import logoImage from "@/assets/logo.png";

export function Footer() {
  return (
    <FooterVisibility>
      <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-br from-pink-300 to-cyan-300 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-linear-to-br from-purple-300 to-pink-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-br from-cyan-300 to-pink-300 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-linear-to-br from-blue-300 to-cyan-200 rounded-full blur-2xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 py-12 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 mb-10">

            <div className="lg:col-span-2 flex flex-col justify-center items-center md:block">
              <div className="flex items-center space-x-4 mb-4 justify-center md:justify-start">
                <img
                  src={logoImage.src}
                  alt="Logo"
                  width="70"
                  height="70"
                />
              </div>
              <p className="text-white/80 text-justify leading-relaxed mb-4 max-w-sm sm:max-w-md lg:max-w-lg">
                Especializados em criar filhotes saudáveis, vacinados e socializados em ambiente familiar. Cada filhote recebe amor e cuidados individuais desde o nascimento.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white/70">Criando com amor desde 2018</span>
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
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/nossos-filhotes" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                    <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    Nossos Filhotes
                  </Link>
                </li>
                <li>
                  <Link href="/filhotes-entregues" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                    <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    Filhotes Entregues
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                    <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/#contato" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                    <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <Suspense fallback={
              <div>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                  <span className="w-1 h-6 bg-white rounded-full mr-3" />
                  Contato
                </h3>
                <div className="space-y-4 mb-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 animate-pulse" />
                      <div className="flex flex-col space-y-1">
                        <div className="w-16 h-3 bg-white/10 rounded animate-pulse" />
                        <div className="w-24 h-4 bg-white/10 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }>
              <FooterWrapper />
            </Suspense>

            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <span className="w-1 h-6 bg-white rounded-full mr-3" />
                Dados da Empresa
              </h3>
              <div className="space-y-3 text-sm text-white/70">
                <p className="leading-relaxed">Razão Social: Zannine Pets LTDA</p>
                <p className="leading-relaxed">Endereço: Rua Exemplo, 123 - Bairro, São Paulo/SP</p>
                <p className="leading-relaxed">Horário: Seg–Sáb 08:00–20:00</p>
              </div>

              <h3 className="text-lg font-bold text-white mt-8 mb-6 flex items-center">
                <span className="w-1 h-6 bg-white rounded-full mr-3" />
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/termos-de-uso" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                    <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/politica-de-privacidade" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                    <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/politica-de-cookies" className="text-white/70 hover:text-white transition-all duration-300 flex items-center group text-sm">
                    <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    Política de Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col w-full gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <p className="text-white/60 text-sm">
                &copy; 2024 Canil Zannine. Todos os direitos reservados.
              </p>

              <p className="text-white/60 text-sm">
                CNPJ: 00.000.000/0001-00
              </p>
            </div>
          </div>
        </div>
      </footer>
    </FooterVisibility>
  );
}
