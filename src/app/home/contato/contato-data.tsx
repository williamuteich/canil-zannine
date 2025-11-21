import { getData } from "@/services/get-data.service";
import type { SocialMedia } from "@/types/models";
import { cacheLife } from "next/cache";
import { ContatoDynamic } from "./components/contato-dynamic";

async function ContatoData() {
  'use cache'

  cacheLife('days')

  let whatsappNumero: string | undefined;
  let telefone: string | undefined;
  let email: string | undefined;

  try {
    const socialMedia = await getData<SocialMedia[]>("/api/redes-sociais");

    const whatsapp = socialMedia.find(sm => sm.plataform.toLowerCase() === 'whatsapp' && sm.status);
    if (whatsapp?.value) {
      whatsappNumero = whatsapp.value.replace(/\D/g, '');
    }

    const telefoneData = socialMedia.find(sm => sm.plataform.toLowerCase() === 'telefone' && sm.status);
    if (telefoneData?.value) {
      telefone = telefoneData.value;
    }

    const emailData = socialMedia.find(sm => sm.plataform.toLowerCase() === 'email' && sm.status);
    if (emailData?.value) {
      email = emailData.value;
    }
  } catch (error) {
    console.error("Erro ao buscar dados de contato:", error);
  }

  return <ContatoDynamic whatsappNumero={whatsappNumero} telefone={telefone} email={email} />;
}

export default ContatoData;
