"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { IconWhatsapp } from "./iconWhatsapp";
import Link from "next/link";

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

interface ContatoWhatsAppUIProps {
  whatsappNumero?: string;
}

export function ContatoWhatsAppUI({ whatsappNumero }: ContatoWhatsAppUIProps) {
  const whatsappLink = whatsappNumero ? `https://wa.me/${whatsappNumero}` : undefined;

  const handleWhatsAppClick = () => {
    if (whatsappLink) {
      const message = "Olá! Gostaria de mais informações sobre os filhotes.";
      const url = `${whatsappLink}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  };

  if (!whatsappNumero) return null;

  return (
    <>
      <motion.div
        className="bg-linear-to-br from-[#faf8f5] to-[#f5f0e8] rounded-2xl lg:rounded-3xl p-6 md:p-8 shadow-lg border border-[#ebe3d5] mb-8"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
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

      <IconWhatsapp onClick={handleWhatsAppClick} />
    </>
  );
}

interface ContatoInfoUIProps {
  telefone?: string;
  email?: string;
}

export function ContatoInfoUI({ telefone, email }: ContatoInfoUIProps) {
  const contactInfo = [
    ...(telefone ? [{
      icon: Phone,
      title: "Telefone",
      content: telefone,
      description: "Horário comercial",
      link: `tel:${telefone}`
    }] : []),
    ...(email ? [{
      icon: Mail,
      title: "Email",
      content: email,
      description: "Respondemos rapidamente",
      link: `mailto:${email}`
    }] : []),
  ];

  if (contactInfo.length === 0) return null;

  return (
    <>
      {contactInfo.map((item) => (
        <motion.div
          key={item.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group"
          whileHover={{ y: -5 }}
        >
          <Link href={item.link} className="block">
            <motion.div
              className="w-12 h-12 bg-linear-to-br from-[#d4a017] to-[#e67e66] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
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
          </Link>
        </motion.div>
      ))}
    </>
  );
}
