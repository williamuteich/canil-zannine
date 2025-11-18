"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function IconWhatsapp({ onClick }: { onClick: () => void }) {
  const [messageVisible, setMessageVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1300);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="fixed bottom-12 right-4 xl:right-10 z-50 flex flex-col items-center gap-3">
      {messageVisible && isDesktop && (
        <div className="relative">
          <div className="rounded-2xl bg-linear-to-r from-white/95 to-slate-100/95 px-4 py-2 text-[11px] font-medium text-slate-800 shadow-lg border border-slate-200/80 backdrop-blur-sm flex flex-col gap-0.5 pr-7">
            <span className="text-[11px] tracking-wide uppercase text-emerald-600 font-semibold">
              WhatsApp • Atendimento
            </span>
            <span className="text-xs text-center text-slate-700">
              Ficou com alguma dúvida?
            </span>

            <button
              type="button"
              onClick={() => setMessageVisible(false)}
              className="absolute right-1.5 top-1.5 h-4 w-4 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 flex items-center justify-center text-[10px] font-bold leading-none cursor-pointer shadow-sm"
              aria-label="Fechar aviso do WhatsApp"
            >
              ×
            </button>
          </div>
          <div className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white/95 border-b border-r border-slate-200/80" />
        </div>
      )}

      <motion.button
        onClick={onClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl w-14 h-14 md:w-18 md:h-18 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <MessageCircle className="h-6 w-6 md:h-8 md:w-8" />
      </motion.button>
    </div>
  );
}