"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

interface ContatoUIProps {
  whatsappSlot?: React.ReactNode;
  infoSlot?: React.ReactNode;
}

export function ContatoUI({ whatsappSlot, infoSlot }: ContatoUIProps) {
  return (
    <section id="contato" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-linear-to-br from-[#fef9e7] via-[#ffe4de] to-[#e8ebe0] opacity-60" />
      <div className="absolute inset-0 -z-30 bg-[#faf8f5]" />

      <div className="absolute top-1/3 -right-12 w-60 h-60 rounded-full bg-[#e67e66]/25 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#b5be9a]/25 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-linear-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent">
              Entre em Contato
            </h2>
            <p className="text-base sm:text-lg text-[#57534e] max-w-2xl mx-auto px-2">
              Estamos prontos para ajudar você a encontrar seu novo melhor amigo!
            </p>
          </motion.div>

          {whatsappSlot}

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="block">
                <motion.div
                  className="w-12 h-12 bg-linear-to-br from-[#d4a017] to-[#e67e66] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <MapPin className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 text-center mb-2">
                  Localização
                </h3>
                <p className="text-gray-900 text-center font-medium text-lg mb-1">
                  São Paulo, SP
                </p>
                <p className="text-gray-500 text-sm text-center">
                  Atendemos toda região
                </p>
              </div>
            </motion.div>

            {infoSlot}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
