"use client";

import { ImageGalleryProps } from "@/types/models";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function ImageGallery({ images, name, status }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-6">
      <div className="relative w-full rounded-xl overflow-hidden bg-gray-100">
        <div className="w-full aspect-square flex items-center justify-center p-8">
          <motion.div
            key={selectedImage}
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={images[selectedImage]}
              alt={name}
              fill
              className="object-contain"
              quality={90}
            />
          </motion.div>
        </div>

        {status !== 'ativo' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-md px-8 py-6 rounded-xl shadow-2xl border border-white/50">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 uppercase tracking-wide mb-2">Vendido</p>
                <p className="text-sm text-gray-600">Este filhote já encontrou um lar</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max px-1">
            {images.map((img, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer relative ${selectedImage === index
                    ? "border-gray-900 shadow-md scale-105"
                    : "border-gray-300 hover:border-gray-400 opacity-80 hover:opacity-100"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={img}
                  alt={`${name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-gray-900/20 border-2 border-gray-900 rounded-lg" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}