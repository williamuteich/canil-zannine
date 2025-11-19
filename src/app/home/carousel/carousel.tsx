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

const puppies = [
  {
    id: 1,
    name: "Bella",
    age: "3 meses",
    breed: "Chihuahua Pelo Curto",
    description: "Fêmea adorável, carinhosa e brincalhona",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop&auto=format",
    emoji: "❤️",
    available: true,
  },
  {
    id: 2,
    name: "Max",
    age: "2 meses",
    breed: "Chihuahua Pelo Longo",
    description: "Macho ativo e muito inteligente",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    emoji: "❤️",
    available: true,
  },
  {
    id: 3,
    name: "Luna",
    age: "4 meses",
    breed: "Chihuahua Tricolor",
    description: "Fêmea dócil e amorosa",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop",
    emoji: "❤️",
    available: true,
  },
  {
    id: 4,
    name: "Thor",
    age: "3 meses",
    breed: "Chihuahua Pelo Curto",
    description: "Macho corajoso e protetor",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop",
    emoji: "❤️",
    available: true,
  },
];

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

export function PuppiesCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section id="filhotes" className="py-12 md:py-16 bg-gradient-to-b from-[#faf8f5] via-[#f5f0e8] to-[#faf8f5]">
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
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent"
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
                <CarouselItem key={puppy.id} className="pl-1 sm:pl-2 md:pl-4 basis-1/2 lg:basis-1/3">
                  <motion.div
                    className="p-1 sm:p-2 h-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    custom={index}
                  >
                    <div className="rounded-lg sm:rounded-xl overflow-hidden border-2 border-[#f9e79f]/40 shadow-sm hover:shadow-xl hover:border-[#d4a017] transition-all duration-500 bg-white h-full group flex flex-col relative">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                      <div className="relative aspect-4/3 overflow-hidden shrink-0 z-10">
                        <motion.img
                          src={puppy.image}
                          alt={`Filhote ${puppy.name} - ${puppy.breed}`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

                        {puppy.available && (
                          <motion.div
                            className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#8a9468] text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            Disponível
                          </motion.div>
                        )}

                        <motion.div
                          className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3"
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-white/95 backdrop-blur-sm rounded px-2 sm:px-3 py-1 sm:py-2">
                            <p className="text-xs text-gray-700 font-medium">
                              {puppy.description}
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      <div className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col z-10">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <motion.h2
                            className="text-lg sm:text-xl font-semibold text-gray-900"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {puppy.name}
                          </motion.h2>

                          <motion.span
                            className="text-lg sm:text-xl"
                            aria-label="coração"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {puppy.emoji}
                          </motion.span>
                        </div>

                        <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 flex-1">
                          <motion.div
                            className="flex items-center text-gray-700 bg-gray-50 rounded px-2 sm:px-3 py-1 sm:py-2"
                            whileHover={{ x: 5 }}
                          >
                            <span className="mr-1 sm:mr-2 text-sm">📅</span>
                            <span className="font-medium text-xs sm:text-sm">{puppy.age}</span>
                          </motion.div>

                          <motion.div
                            className="flex items-center text-gray-700 bg-gray-50 rounded px-2 sm:px-3 py-1 sm:py-2"
                            whileHover={{ x: 5 }}
                          >
                            <span className="mr-1 sm:mr-2 text-sm">🐕</span>
                            <span className="font-medium text-xs sm:text-sm">{puppy.breed}</span>
                          </motion.div>
                        </div>

                        <Link
                          href={`/filhote/${puppy.id}`}
                          className="w-full bg-gradient-to-r from-[#57534e] to-[#44403c] hover:from-[#44403c] hover:to-[#292524] text-white py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 mt-auto text-sm sm:text-base relative overflow-hidden group cursor-pointer"
                          aria-label={`Ver detalhes do filhote ${puppy.name}`}
                        >
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="sm:w-4 sm:h-4"
                            whileHover={{ rotate: 10 }}
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </motion.svg>
                          Ver Detalhes
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden min-[1250px]:flex absolute rounded-full top-1/2 -translate-y-1/2 -left-16 w-12 h-12 bg-gradient-to-br from-[#57534e] to-[#44403c] border-0 text-white hover:from-[#44403c] hover:to-[#292524] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer">
              <span className="text-2xl font-bold">‹</span>
            </CarouselPrevious>
            <CarouselNext className="hidden min-[1250px]:flex absolute rounded-full top-1/2 -translate-y-1/2 -right-16 w-12 h-12 bg-gradient-to-br from-[#57534e] to-[#44403c] border-0 text-white hover:from-[#44403c] hover:to-[#292524] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer">
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
