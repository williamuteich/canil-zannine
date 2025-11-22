import { cacheLife, cacheTag } from "next/cache";
import { BannerButton } from "./components/banner-button";
import prisma from "@/lib/db";

async function BannerWhatsApp() {
  'use cache'
  cacheTag('social-media')
  cacheLife('days')

  try {
    const socialMedia = await prisma.socialMedia.findMany({
      orderBy: { createdAt: 'desc' }
    });

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
