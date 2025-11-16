"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Award, Home } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const features = [
  {
    icon: Heart,
    title: "Amor e Cuidado",
    description: "Cada filhote é criado com muito amor e atenção individual",
  },
  {
    icon: Shield,
    title: "Garantia de Saúde",
    description: "Todos os filhotes são vacinados, vermifugados e com atestado veterinário",
  },
  {
    icon: Award,
    title: "Pedigree CBKC",
    description: "Filhotes com pedigree e linhagem de qualidade comprovada",
  },
  {
    icon: Home,
    title: "Ambiente Seguro",
    description: "Instalações modernas e higienizadas para o bem-estar dos filhotes",
  },
];

export function HomeSobre() {
  return (
    <section id="sobre" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#FFF7F0] via-[#F9D7EB] to-[#B6F1FF] opacity-90" />
      <div className="absolute inset-0 -z-20 bg-white" />
      
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl" />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div 
            className="relative"
            variants={slideInLeft}
          >
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
              <div className="aspect-3/4 w-full bg-linear-to-br from-pink-100 to-blue-100">
                <img 
                  src="https://static.wixstatic.com/media/0baaed_96c8e3a618934942b6053d08187d8d02~mv2.jpg/v1/fill/w_840,h_1080,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/_DSC0476.jpg"
                  alt="Mundo dos Chihuahua - Canil Zannine" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-linear-to-br from-pink-400/20 to-blue-400/20 rounded-full -z-10"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
          </motion.div>

          <motion.div 
            className="space-y-6"
            variants={slideInRight}
          >
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              <motion.span 
                className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium"
                variants={fadeUp}
              >
                Sobre Nós
              </motion.span>
              
              <motion.h2 
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent"
              >
                MUNDO DOS CHIHUAHUA
              </motion.h2>
              
              <motion.div 
                className="h-1.5 w-20 bg-linear-to-r from-pink-400 to-blue-400 rounded-full" 
                variants={fadeUp}
              />
            </motion.div>
            
            <motion.div 
              variants={fadeUp}
              className="space-y-4 text-gray-700"
            >
              <p className="leading-relaxed">
                O mundo dos Chihuahua nasceu de um sonho. Tive a minha primeira Chihuahua e me apaixonei loucamente pela raça.
              </p>
              
              <p className="leading-relaxed">
                Comecei a fazer o curso de medicina veterinária onde aprendi muito e me ajudou bastante a desenvolver o canil.
              </p>
              
              <p className="leading-relaxed">
                O nosso canil se chama <span className="font-semibold text-pink-600">Canil Zannine</span>, que é um sobrenome da minha família. Decidi passá-lo aos bebês com a intenção de dar um significado a cada bebê que nasce por aqui. Zannine significa <span className="italic">"Enviado de Deus"</span>.
              </p>
              
              <p className="leading-relaxed">
                Temos vários bebês espalhados pelo Brasil, cada um com sua personalidade e beleza, todos maravilhosos.
              </p>
              
              <p className="leading-relaxed">
                Nossos Chihuahuas têm um padrão de estética elevado, sempre priorizamos na nossa seleção o padrão CBKC.
              </p>
              
              <p className="text-pink-600 font-medium mt-4">
                Bianca Cogo
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className="flex items-start p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 hover:border-pink-200/50 hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                >
                  <div className="shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-pink-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}