import { Suspense } from "react";
import { PuppiesCarouselUI } from "./carousel-ui";
import { getData } from "@/services/get-data.service";
import { Puppy, PaginatedResponse } from "@/types/models";
import { cacheLife, cacheTag } from "next/cache";

async function CarouselData() {
  'use cache'
  cacheTag('filhotes');
  cacheLife('hours');

  let puppies: Puppy[] = [];

  try {
    const result = await getData<Puppy[]>('/api/filhote');
    const data = result || [];
    puppies = data.filter((p: Puppy) => p.status === 'ativo');
  } catch (error) {
    console.error('Erro ao buscar filhotes:', error);
  }

  if (puppies.length === 0) {
    return null;
  }

  return <PuppiesCarouselUI puppies={puppies} />;
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
