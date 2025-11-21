"use client";

import { PuppyInfoPanelProps } from "@/types/models";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, Dog, Heart, Phone } from "lucide-react";

const AccordionItem = ({
  title,
  content,
  icon: Icon,
  isOpen,
  onToggle
}: {
  title: string;
  content: string;
  icon: any;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full px-4 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-blue-600" />
        <span className="font-semibold text-gray-900">{title}</span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="h-5 w-5 text-gray-500" />
      </motion.div>
    </button>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 pb-4"
      >
        <div
          className="text-gray-700 leading-relaxed text-sm space-y-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </motion.div>
    )}
  </div>
);

export function PuppyInfoPanel({
  name,
  emoji,
  age,
  breed,
  description,
  weight,
  price,
  priceOld,
  whatsappLink,
  status = 'ativo',
}: PuppyInfoPanelProps & { whatsappLink?: string; status?: string }) {

  const handleWhatsAppClick = (action: string) => {
    if (!whatsappLink) return;
    const message = `Olá! Tenho interesse no filhote ${name} (${action}). Poderia me dar mais informações?`;
    const url = `${whatsappLink}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">{name}</h1>
            <p className="text-base font-semibold text-gray-500 uppercase tracking-wider mt-2">{breed}</p>
          </div>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed font-medium">{description}</p>
        <div className="h-1.5 w-20 bg-linear-to-r from-[#b8860b] to-[#d35836] rounded-full" />
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-base text-gray-500 font-semibold uppercase tracking-wide">Valor:</span>
        <span className="text-3xl font-bold text-gray-900">
          R$ {price.toLocaleString("pt-BR")}
        </span>
        {priceOld && (
          <span className="text-lg text-gray-400 line-through decoration-2">
            R$ {priceOld.toLocaleString("pt-BR")}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/80 border border-blue-100 hover:border-blue-200 transition-colors">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Idade</p>
            <p className="text-lg font-bold text-gray-900">{age}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-purple-50/80 border border-purple-100 hover:border-purple-200 transition-colors">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Dog className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-purple-600 font-bold uppercase tracking-wide">Peso</p>
            <p className="text-lg font-bold text-gray-900">{weight}</p>
          </div>
        </div>
      </div>

      {status === 'ativo' ? (
        <div className="space-y-4 pt-6">
          <motion.button
            onClick={() => handleWhatsAppClick("reserva")}
            className="w-full bg-linear-to-r from-[#b8860b] to-[#d35836] hover:from-[#d4a017] hover:to-[#e67e66] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Heart className="h-6 w-6 fill-white/20" />
            <span className="text-lg">Quero Reservar {name}</span>
          </motion.button>

          <motion.button
            onClick={() => handleWhatsAppClick("mais informações")}
            className="w-full bg-white border-2 border-gray-100 hover:border-[#d35836]/30 text-gray-700 hover:text-[#d35836] font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="h-6 w-6" />
            <span className="text-lg">Falar sobre {name}</span>
          </motion.button>
        </div>
      ) : (
        <div className="pt-6">
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 text-gray-500 font-medium py-6 px-6 rounded-2xl text-center opacity-75">
            <p className="text-xl font-bold mb-2">🏠 Já encontrei um lar</p>
            <p className="text-base">Este filhote não está mais disponível para reserva.</p>
          </div>
        </div>
      )}
    </div>
  );
}