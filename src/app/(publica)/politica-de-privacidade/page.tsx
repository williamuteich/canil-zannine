import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Canil Zannine",
  description: "Política de Privacidade do Canil Zannine, em conformidade com a LGPD.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-[#ebe3d5] p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Política de Privacidade
          </h1>

          <div className="prose prose-stone max-w-none text-gray-600 space-y-6">
            <p>
              No Canil Zannine, a sua privacidade é importante para nós. Esta Política de Privacidade explica como tratamos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded-r-lg">
              <p className="text-blue-800 font-medium m-0">
                <strong>Importante:</strong> Atualmente, este site é meramente informativo e não coletamos dados pessoais diretamente através de formulários ou contas de usuário.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. Coleta de Dados</h2>
            <p>
              No momento, não solicitamos nem armazenamos dados pessoais (como nome, e-mail, telefone ou endereço) diretamente através do nosso site. O contato conosco é realizado voluntariamente por você através de links para nossas redes sociais ou aplicativos de mensagens (como WhatsApp).
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. Uso das Informações</h2>
            <p>
              Caso você entre em contato conosco por meios externos (WhatsApp, E-mail, Instagram), utilizaremos as informações fornecidas apenas para:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Responder às suas dúvidas e solicitações;</li>
              <li>Fornecer informações sobre nossos filhotes;</li>
              <li>Dar andamento a processos de adoção ou compra, caso seja do seu interesse.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. Compartilhamento de Dados</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Seus dados são tratados com confidencialidade.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. Seus Direitos (LGPD)</h2>
            <p>
              A LGPD garante a você, como titular dos dados, diversos direitos, incluindo:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Confirmação da existência de tratamento de dados;</li>
              <li>Acesso aos dados (caso tenhamos algum dado seu);</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Eliminação dos dados pessoais, mediante solicitação.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. Segurança</h2>
            <p>
              Adotamos medidas de segurança adequadas para proteger contra acesso não autorizado, alteração, divulgação ou destruição de dados.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6. Alterações nesta Política</h2>
            <p>
              Podemos atualizar nossa Política de Privacidade periodicamente. Recomendamos que você reveja esta página regularmente para quaisquer alterações.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">7. Contato</h2>
            <p>
              Se você tiver dúvidas sobre nossa Política de Privacidade ou sobre como tratamos seus dados, entre em contato conosco.
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
