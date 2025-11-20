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
}: PuppyInfoPanelProps & { whatsappLink?: string }) {

  const handleWhatsAppClick = (action: string) => {
    if (!whatsappLink) return;
    const message = `Olá! Tenho interesse no filhote ${name} (${action}). Poderia me dar mais informações?`;
    const url = `${whatsappLink}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{name}</h1>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">{breed}</p>
          </div>
          <span className="text-2xl">{emoji}</span>
        </div>
        <p className="text-gray-600 leading-relaxed">{description}</p>
        <div className="h-1 w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-sm text-gray-500 font-medium">Valor:</span>
        <span className="text-xl font-semibold text-gray-800">
          R$ {price.toLocaleString("pt-BR")}
        </span>
        {priceOld && (
          <span className="text-sm text-gray-400 line-through ml-2">
            R$ {priceOld.toLocaleString("pt-BR")}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
          <Calendar className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-xs text-blue-600 font-medium">Idade</p>
            <p className="text-sm font-semibold text-gray-900">{age}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
          <Dog className="h-5 w-5 text-purple-600" />
          <div>
            <p className="text-xs text-purple-600 font-medium">Peso</p>
            <p className="text-sm font-semibold text-gray-900">{weight}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <motion.button
          onClick={() => handleWhatsAppClick("reserva")}
          className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Heart className="h-5 w-5" />
          Reservar {name}
        </motion.button>

        <motion.button
          onClick={() => handleWhatsAppClick("mais informações")}
          className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Phone className="h-5 w-5" />
          Falar sobre {name}
        </motion.button>
      </div>
    </div>
  );
}