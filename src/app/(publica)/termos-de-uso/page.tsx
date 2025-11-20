import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | Canil Zannine",
  description: "Termos de uso e condições do Canil Zannine.",
};

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-[#ebe3d5] p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Termos de Uso
          </h1>

          <div className="prose prose-stone max-w-none text-gray-600 space-y-6">
            <p>
              Bem-vindo ao site do Canil Zannine. Ao acessar e utilizar este site, você concorda com os seguintes termos e condições. Por favor, leia atentamente.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. Uso do Site</h2>
            <p>
              Este site tem como objetivo fornecer informações sobre nossa criação de Chihuahuas, nossos filhotes disponíveis e nossa filosofia de criação. O conteúdo é apenas para fins informativos.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo deste site, incluindo textos, imagens, logotipos e design, é de propriedade do Canil Zannine ou utilizado com permissão. É proibida a reprodução, distribuição ou uso não autorizado de qualquer material sem nosso consentimento prévio por escrito.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. Informações sobre Filhotes</h2>
            <p>
              Nos esforçamos para manter as informações sobre nossos filhotes o mais precisas e atualizadas possível. No entanto, a disponibilidade e as características dos filhotes podem mudar. Recomendamos entrar em contato diretamente conosco para confirmar qualquer informação.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. Links Externos</h2>
            <p>
              Nosso site pode conter links para sites de terceiros (como redes sociais). Não nos responsabilizamos pelo conteúdo ou práticas de privacidade desses sites.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. Recomendamos que você revise estes termos periodicamente.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através dos canais disponibilizados no site.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500">
              Última atualização: Novembro de 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
