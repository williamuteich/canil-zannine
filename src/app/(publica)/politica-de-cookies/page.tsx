import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Canil Zannine",
  description: "Política de Cookies do Canil Zannine.",
};

export default function PoliticaDeCookiesPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-40 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-[#ebe3d5] p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Política de Cookies
          </h1>

          <div className="prose prose-stone max-w-none text-gray-600 space-y-6">
            <p>
              Esta Política de Cookies explica o que são cookies e como os utilizamos no site do Canil Zannine.
            </p>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6 rounded-r-lg">
              <p className="text-green-800 font-medium m-0">
                <strong>Resumo:</strong> Utilizamos o mínimo necessário de cookies para garantir o funcionamento básico do site. Não utilizamos cookies de rastreamento publicitário invasivo.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. O que são Cookies?</h2>
            <p>
              Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. Como utilizamos os Cookies</h2>
            <p>
              Atualmente, nosso uso de cookies é limitado a:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cookies Estritamente Necessários:</strong> São essenciais para que você possa navegar pelo site e usar seus recursos. Sem esses cookies, alguns serviços não podem ser fornecidos.</li>
              <li><strong>Cookies de Desempenho (Opcional):</strong> Podemos utilizar ferramentas anônimas para entender como os visitantes interagem com nosso site (como páginas mais visitadas), ajudando-nos a melhorar a experiência do usuário.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. Cookies de Terceiros</h2>
            <p>
              Nosso site pode conter conteúdo incorporado de outros sites (como vídeos do YouTube ou mapas). Esses sites podem definir seus próprios cookies. Não temos controle sobre esses cookies e recomendamos que você verifique as políticas de privacidade desses terceiros.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. Como gerenciar Cookies</h2>
            <p>
              Você pode controlar e/ou excluir cookies conforme desejar. Você pode apagar todos os cookies já instalados no seu computador e configurar a maioria dos navegadores para impedir que sejam armazenados. No entanto, se você fizer isso, talvez tenha que ajustar manualmente algumas preferências toda vez que visitar um site e alguns serviços e funcionalidades podem não funcionar.
            </p>
            <p>
              Para mais informações sobre como gerenciar cookies no seu navegador, consulte a ajuda do seu navegador (Chrome, Firefox, Safari, Edge, etc.).
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. Contato</h2>
            <p>
              Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco.
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
