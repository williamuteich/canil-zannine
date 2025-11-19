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
import { useRef, useState, useEffect } from "react";

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
  const [puppies, setPuppies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    async function fetchPuppies() {
      try {
        const response = await fetch('/api/filhote');
        if (response.ok) {
          const result = await response.json();
          const data = result.data || [];
          setPuppies(data.filter((p: any) => p.status === 'ativo'));
        }
      } catch (error) {
        console.error('Erro ao buscar filhotes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPuppies();
  }, []);

  if (loading) {
    return (
      <section id="filhotes" className="py-12 md:py-16 min-h-[400px] flex items-center justify-center">
        <div className="text-[#f2a3c0] animate-pulse">Carregando filhotes...</div>
      </section>
    );
  }

  if (puppies.length === 0) {
    return null;
  }

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
                    className="p-1 sm:p-2 h-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    custom={index}
                  >
                    <div className="rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 bg-white h-full group flex flex-col relative">

                      <div className="relative aspect-4/3 overflow-hidden shrink-0 z-10">
                        <motion.img
                          src={puppy.primaryImage || '/placeholder-puppy.jpg'}
                          alt={`Filhote ${puppy.name}`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                        {puppy.status === 'ativo' && (
                          <div className="absolute top-1 right-1 bg-[#3dc7c4]/90 backdrop-blur-sm text-white px-1.5 py-1 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-wide">
                            Disponível
                          </div>
                        )}

                        <div className="absolute inset-0 flex items-end justify-center p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-black/40 backdrop-blur-[2px]">
                          <p className="text-white text-sm text-center font-medium line-clamp-4 drop-shadow-md">
                            {puppy.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col relative bg-white z-10">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#d35836] transition-colors duration-300">
                            {puppy.name}
                          </h2>
                          <span className="text-2xl animate-pulse">❤️</span>
                        </div>

                        <div className="w-full h-px bg-gray-100 my-3" />

                        <Link
                          href={`/filhote/${puppy.id}`}
                          className="w-full bg-linear-to-r from-[#b8860b] to-[#d35836] hover:from-[#d4a017] hover:to-[#e67e66] text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 mt-auto shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                          <span>Ver Detalhes</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
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
