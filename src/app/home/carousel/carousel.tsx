import { Suspense } from "react";
import { PuppiesCarouselUI } from "./carousel-ui";
import prisma from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

async function CarouselData() {
  'use cache'
  cacheTag('filhotes');
  cacheLife('hours');

  try {
    const result = await prisma.puppy.findMany({
      where: { status: 'ativo' },
      orderBy: { createdAt: 'desc' },
      include: { images: true }
    });

    if (result.length === 0) {
      return null;
    }

    const puppies = result.map(puppy => ({
      ...puppy,
      age: puppy.age ?? 'N/A',
      weight: puppy.weight ?? 'N/A',
    }));

    return <PuppiesCarouselUI puppies={puppies} />;
  } catch (error) {
    console.error('Erro ao buscar filhotes:', error);
    return null;
  }
}

export function PuppiesCarousel() {
  return (
    <Suspense fallback={
      <section id="filhotes" className="py-12 md:py-16 min-h-[400px] flex items-center justify-center">
        <div className="text-[#f2a3c0] animate-pulse">Carregando filhotes...</div>
      </section>
    }>
      <CarouselData />
    </Suspense>
  );
}
