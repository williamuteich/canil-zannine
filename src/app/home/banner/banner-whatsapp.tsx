import { getData } from "@/services/get-data.service";
import type { SocialMedia } from "@/types/models";
import { cacheLife, cacheTag } from "next/cache";
import { BannerButton } from "./components/banner-button";

async function BannerWhatsApp() {
  'use cache'
  cacheTag('social-media')
  cacheLife('days')

  try {
    const socialMedia = await getData<SocialMedia[]>("/api/redes-sociais") || [];
    const whatsapp = socialMedia.find(sm => sm.plataform.toLowerCase() === 'whatsapp' && sm.status);

    if (whatsapp?.value) {
      const numero = whatsapp.value.replace(/\D/g, '');
      const whatsappLink = `https://wa.me/${numero}`;
      return <BannerButton whatsappLink={whatsappLink} />;
    }
  } catch (error) {
    console.error("Erro ao buscar número do WhatsApp:", error);
  }

  return null;
}

export default BannerWhatsApp;
