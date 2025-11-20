"use client";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { SocialMedia } from "@/types/models";

interface BannerProps {
  socialMedia: SocialMedia[];
}

export function Banner({ socialMedia }: BannerProps) {
  const whatsapp = socialMedia.find(sm => sm.plataform.toLowerCase() === 'whatsapp' && sm.status);
  const whatsappLink = whatsapp?.link || (whatsapp?.value ? `https://wa.me/${whatsapp.value.replace(/\D/g, '')}` : undefined);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-[#FFF7F0] via-[#F9D7EB] to-[#B6F1FF]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/filhote/imageBanner.jpg"
          alt="Filhotes adoráveis"
          className="object-cover opacity-45"
          fill
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#FFF7F0]/80 via-[#F9D7EB]/85 to-[#B6F1FF]/80" />
      </div>

      <div className="relative z-10 w-full px-8 pt-6 pb-8 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-[calc(12rem+6vh)] xl:pt-40 xl:pb-[calc(14rem+8vh)] 2xl:pt-44 2xl:pb-[calc(16rem+2vh)]">
        <motion.div
          className="max-w-5xl mx-auto text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="space-y-4">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-white/60 text-sm font-semibold text-gray-700 shadow-sm"
            >
              Filhotes criados com carinho
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-gray-900"
            >
              Encontre seu <span className="bg-linear-to-r from-pink-500 via-pink-400 to-sky-400 bg-clip-text text-transparent">melhor amigo</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl md:text-2xl text-gray-700/90 max-w-3xl mx-auto leading-relaxed"
            >
              Filhotes saudáveis, vacinados e prontos para receber todo o amor da sua família. Um processo transparente, acolhedor e cheio de cuidado em cada etapa.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {whatsapp && whatsappLink && (
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1EB656] text-white text-md font-semibold px-8 py-3 sm:px-10 sm:py-3 shadow-xl shadow-[#25D366]/40 transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] cursor-pointer"
              >
                <MessageCircle className="h-6 w-6" aria-hidden />
                Fale conosco no WhatsApp
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-32 sm:h-36 lg:h-48">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,240L40,224C80,208,160,176,240,154.7C320,133,400,123,480,144C560,165,640,219,720,224C800,229,880,187,960,165.3C1040,144,1120,144,1200,149.3C1280,155,1360,165,1400,170.7L1440,176L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/50 z-20" />
      </div>

    </section>
  );
}