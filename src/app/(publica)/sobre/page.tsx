"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Award, Star, Quote } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function SobrePage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-20 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply" />
      <div className="fixed inset-0 -z-20 bg-linear-to-b from-white/80 via-transparent to-transparent" />

      <section className="relative pt-40 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="flex justify-center">
              <span className="px-3 py-1 text-xs font-semibold tracking-widest text-gray-500 uppercase border border-gray-200 rounded-full bg-white/50 backdrop-blur-sm">
                Desde 2018
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-serif text-gray-900 tracking-tight leading-tight"
            >
              Nossa <span className="italic text-pink-500">Essência</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                Criando laços de amor e companheirismo. Mais do que um canil, somos uma família dedicada à excelência.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="w-px h-24 bg-linear-to-b from-gray-300 to-transparent mx-auto mt-12"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="relative aspect-4/5 rounded-sm overflow-hidden shadow-2xl">
                  <img
                    src="https://static.wixstatic.com/media/0baaed_96c8e3a618934942b6053d08187d8d02~mv2.jpg/v1/fill/w_840,h_1080,al_c,q_85,usm_0.66_1.00_1,enc_auto/_DSC0476.jpg"
                    alt="Bianca Cogo"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>

                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-pink-100 -z-10 rounded-full opacity-50 blur-2xl" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 -z-10 rounded-full opacity-50 blur-2xl" />
              </motion.div>
            </div>

            <div className="lg:col-span-7 lg:pl-12 space-y-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 bg-linear-to-r from-[#b8860b] to-[#d35836] bg-clip-text">
                  O Início de Um Sonho
                </motion.h2>

                <motion.div variants={fadeInUp} className="prose prose-lg text-gray-600 space-y-6">
                  <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-pink-500 first-letter:mr-3 first-letter:float-left">
                    O mundo dos Chihuahua nasceu de uma paixão avassaladora. Tive a minha primeira Chihuahua e me apaixonei loucamente pela raça. Foi amor à primeira vista, uma conexão que mudou minha vida para sempre.
                  </p>
                  <p>
                    Essa paixão me levou a cursar Medicina Veterinária, onde adquiri o conhecimento técnico necessário para oferecer o melhor cuidado possível. Cada aprendizado foi um degrau para construir o que hoje é o Canil Zannine.
                  </p>
                </motion.div>

                <motion.blockquote
                  variants={fadeInUp}
                  className="my-12 pl-6 border-l-2 border-pink-500 italic text-xl text-gray-800 font-serif"
                >
                  "Zannine é um sobrenome da minha família. Decidi passá-lo aos bebês com a intenção de dar um significado a cada bebê que nasce por aqui. Zannine significa 'Enviado de Deus'."
                  <footer className="text-sm text-gray-500 font-sans font-semibold mt-4 not-italic uppercase tracking-wide">— Bianca Cogo</footer>
                </motion.blockquote>

                <motion.p variants={fadeInUp} className="text-lg text-gray-600">
                  Hoje, temos bebês espalhados por todo o Brasil. Cada um carrega não apenas nossa genética de excelência, mas também um pedacinho do nosso coração.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-linear-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent">Nossos Pilares</h2>
            <p className="text-base sm:text-lg text-[#57534e] max-w-2xl mx-auto px-2">
              Nossa criação é fundamentada em princípios inegociáveis que garantem a excelência e o bem-estar de cada filhote.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Amor Incondicional",
                desc: "Criação em ambiente familiar, com socialização desde os primeiros dias de vida.",
                color: "text-pink-500",
                bg: "bg-pink-50"
              },
              {
                icon: Shield,
                title: "Saúde em Primeiro Lugar",
                desc: "Controle rigoroso de vacinas, vermífugos e acompanhamento veterinário constante.",
                color: "text-blue-500",
                bg: "bg-blue-50"
              },
              {
                icon: Award,
                title: "Genética de Ponta",
                desc: "Seleção criteriosa baseada no padrão CBKC, focando em beleza e temperamento.",
                color: "text-amber-500",
                bg: "bg-amber-50"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
