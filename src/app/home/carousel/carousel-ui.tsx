"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Puppy } from "@/types/models";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface PuppiesCarouselUIProps {
  puppies: Puppy[];
}

export function PuppiesCarouselUI({ puppies }: PuppiesCarouselUIProps) {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section id="filhotes" className="py-12 md:py-16">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12 xl:px-10 max-w-[1400px]">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-linear-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent"
          >
            Nossos Filhotes Disponíveis
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[#57534e] max-w-2xl mx-auto px-2"
          >
            Conheça nossos adoráveis filhotes, todos vacinados, vermifugados e com garantia de saúde
          </motion.p>
        </motion.div>

        <div className="relative w-full mx-auto px-1 sm:px-2 md:px-4 lg:px-8 xl:px-16">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
              {puppies.map((puppy, index) => (
                <CarouselItem key={puppy.id} className="pl-1 sm:pl-2 md:pl-4 basis-1/2 xl:basis-1/3">
                  <motion.div
                    className="p-4 h-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    custom={index}
                  >
                    <Link
                      href={`/filhote/${puppy.id}`}
                      className="group relative block bg-white p-4 pb-16 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 rotate-0 h-full"
                      style={{
                        transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
                      }}
                    >
                      <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100 shadow-inner">
                        <motion.img
                          src={puppy.primaryImage || '/placeholder-puppy.jpg'}
                          alt={`Filhote ${puppy.name}`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center z-20">
                          <p className="text-white text-sm leading-relaxed mb-6 line-clamp-4 font-medium">
                            {puppy.description}
                          </p>

                          <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors flex items-center gap-2">
                            Ver Detalhes
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </span>
                        </div>

                        {puppy.status === 'ativo' && (
                          <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-wide z-10">
                            Disponível
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center">
                        <div className="text-center">
                          <h2 className="font-handwriting text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors font-serif">
                            {puppy.name}
                          </h2>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">
                            Chihuahua
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden min-[1250px]:flex absolute rounded-full top-1/2 -translate-y-1/2 -left-16 w-12 h-12 bg-linear-to-br from-[#57534e] to-[#44403c] border-0 text-white hover:from-[#44403c] hover:to-[#292524] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer">
              <span className="text-2xl font-bold">‹</span>
            </CarouselPrevious>
            <CarouselNext className="hidden min-[1250px]:flex absolute rounded-full top-1/2 -translate-y-1/2 -right-16 w-12 h-12 bg-linear-to-br from-[#57534e] to-[#44403c] border-0 text-white hover:from-[#44403c] hover:to-[#292524] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer">
              <span className="text-2xl font-bold">›</span>
            </CarouselNext>
          </Carousel>

          <motion.div
            className="text-center mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-xs sm:text-sm xl:hidden">
              Deslize para ver mais filhotes disponíveis
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
