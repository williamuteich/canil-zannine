import { getData } from "@/services/get-data.service";
import type { SocialMedia } from "@/types/models";
import { cacheLife, cacheTag } from "next/cache";
import { ContatoWhatsAppUI, ContatoInfoUI } from "./components/contato-dynamic";

async function getSocialMediaData() {
  'use cache'
  cacheTag('social-media')
  cacheLife('days')
  return await getData<SocialMedia[]>("/api/redes-sociais");
}

export async function ContatoWhatsAppData() {
  try {
    const socialMedia = await getSocialMediaData() || [];
    const whatsapp = socialMedia.find(sm => sm.plataform.toLowerCase() === 'whatsapp' && sm.status);
    const whatsappNumero = whatsapp?.value?.replace(/\D/g, '');

    return <ContatoWhatsAppUI whatsappNumero={whatsappNumero} />;
  } catch (error) {
    console.error("Erro ao buscar WhatsApp:", error);
    return null;
  }
}

export async function ContatoInfoData() {
  try {
    const socialMedia = await getSocialMediaData() || [];

    const getVal = (platform: string) =>
      socialMedia.find(sm => sm.plataform.toLowerCase() === platform && sm.status)?.value;

    const telefone = getVal('telefone');
    const email = getVal('email');

    return <ContatoInfoUI telefone={telefone} email={email} />;
  } catch (error) {
    console.error("Erro ao buscar Info:", error);
    return null;
  }
}
