import { Facebook, Instagram, Twitter, Linkedin, MessageCircle, Youtube, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { getData } from "@/services/get-data.service";
import type { SocialMedia } from "@/types/models";

const getSocialIcon = (platform: string) => {
  const icons: Record<string, typeof Facebook> = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    whatsapp: MessageCircle,
    youtube: Youtube,
    telefone: Phone,
    email: Mail,
  };
  return icons[platform.toLowerCase()] || MessageCircle;
};

export async function FooterWrapper() {
  let socialMedia: SocialMedia[] = [];
  try {
    socialMedia = await getData<SocialMedia[]>("/api/redes-sociais");
  } catch (error) {
    console.error("Erro ao buscar redes sociais:", error);
  }

  const activeSocialMedia = socialMedia.filter(sm => sm.status);

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-6 flex items-center">
        <span className="w-1 h-6 bg-white rounded-full mr-3" />
        Contato
      </h3>
      <div className="space-y-4 mb-6">
        {activeSocialMedia
          .filter(sm => sm.value)
          .map((sm) => {
            const Icon = getSocialIcon(sm.plataform);
            return (
              <Link
                key={sm.id}
                href={sm.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60 capitalize">{sm.plataform}</span>
                  <span className="font-semibold">{sm.value}</span>
                </div>
              </Link>
            );
          })}
      </div>

      <div className="flex space-x-3 flex-wrap gap-2">
        {activeSocialMedia
          .filter(sm => !sm.value)
          .map((sm) => {
            const Icon = getSocialIcon(sm.plataform);
            return (
              <Link
                key={sm.id}
                aria-label={sm.plataform}
                href={sm.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/10"
              >
                <Icon className="h-5 w-5 text-white" />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
