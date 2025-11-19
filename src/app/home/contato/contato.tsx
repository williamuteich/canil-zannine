"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { IconWhatsapp } from "./components/iconWhatsapp";


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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Localização",
    content: "São Paulo, SP",
    description: "Atendemos toda região"
  },
  {
    icon: Phone,
    title: "Telefone",
    content: "(11) 99999-9999",
    description: "Horário comercial"
  },
  {
    icon: Mail,
    title: "Email",
    content: "contato@canilzannine.com.br",
    description: "Respondemos rapidamente"
  },
];

export function Contato() {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de mais informações sobre os filhotes.";
    const phoneNumber = "5511999999999";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contato" className="relative py-16 md:py-24 bg-[#faf8f5] overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#f9e79f]/40 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e67e66]/30 rounded-full blur-3xl opacity-50" />

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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent">
              Entre em Contato
            </h2>
            <p className="text-lg text-[#57534e] max-w-2xl mx-auto">
              Estamos prontos para ajudar você a encontrar seu novo melhor amigo!
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8] rounded-2xl lg:rounded-3xl p-6 md:p-8 shadow-lg border border-[#ebe3d5] mb-8"
            variants={scaleIn}
          >
            <div className="text-center mb-6">
              <motion.div
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <MessageCircle className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Atendimento via WhatsApp
              </h3>
              <p className="text-gray-600">
                Tire suas dúvidas, veja mais fotos dos filhotes e agende sua visita!
              </p>
            </div>

            <motion.button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="h-6 w-6" />
              Chamar no WhatsApp Agora
            </motion.button>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-[#d4a017] to-[#e67e66] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </motion.div>
                <h4 className="font-semibold text-gray-900 text-center mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-900 text-center font-medium text-lg mb-1">
                  {item.content}
                </p>
                <p className="text-gray-500 text-sm text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <IconWhatsapp onClick={handleWhatsAppClick} />
    </section>
  );
}