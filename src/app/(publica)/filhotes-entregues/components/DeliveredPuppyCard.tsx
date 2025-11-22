"use client"

import Image from "next/image";
import { Puppy } from "@/types/models";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface DeliveredPuppyCardProps {
  puppy: Puppy;
}

export function DeliveredPuppyCard({ puppy }: DeliveredPuppyCardProps) {
  const allImages = [
    puppy.primaryImage,
    ...(puppy.images?.map((img) => img.url) || []),
  ].filter(Boolean);

  return (
    <Card className="group relative bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-none">
      <CardContent className="p-0">
        <div className="relative aspect-4/5 w-full bg-gray-100">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {allImages.map((image, index) => (
                <CarouselItem key={index} className="relative h-full aspect-4/5">
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`${puppy.name} - Imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {allImages.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border-none h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border-none h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              </>
            )}
          </Carousel>

          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center z-10 pointer-events-none">
            <p className="text-white text-sm leading-relaxed font-medium">
              {puppy.comentario || "Sem comentário disponível."}
            </p>
          </div>

          <div className="absolute top-3 right-3 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-wide z-10 pointer-events-none">
            Entregue
          </div>
        </div>

        <div className="p-4 text-center bg-white relative z-20">
          <h2 className="font-handwriting text-2xl font-bold text-gray-800 font-serif mb-2">
            {puppy.name}
          </h2>
          {puppy.comentario && (
            <p className="text-xs text-gray-500 line-clamp-2 italic">
              "{puppy.comentario}"
            </p>
          )}
          {!puppy.comentario && (
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">
              Chihuahua
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
