"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-xl overflow-hidden bg-gray-50">
        <div className="w-full h-96 sm:h-[500px] lg:h-[600px] flex items-center justify-center">
          <motion.img
            key={selectedImage}
            src={images[selectedImage]}
            alt={name}
            className="max-h-full max-w-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2 min-w-max justify-center">
            {images.map((img, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${selectedImage === index
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={img}
                  alt={`${name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  height={80}
                  width={80}
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}