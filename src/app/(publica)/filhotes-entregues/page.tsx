import { Puppy } from "@/types/models";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { PaginationDemo } from "@/app/(privada)/components/pagination";
import prisma from "@/lib/db";
import { DeliveredPuppyCard } from "./components/DeliveredPuppyCard";

interface FilhotesEntreguesPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function FilhotesData({ page }: { page: number }) {
  'use cache'
  cacheTag('filhotes');
  cacheLife('hours');

  const limit = 12;
  const skip = (page - 1) * limit;

  let puppies: Puppy[] = [];
  let pagination = {
    page: 1,
    limit,
    total: 0,
    totalPages: 0,
  };

  try {
    const [result, total] = await Promise.all([
      prisma.puppy.findMany({
        where: { status: 'entregue' },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { images: true }
      }),
      prisma.puppy.count({ where: { status: 'entregue' } })
    ]);

    puppies = result.map(puppy => ({
      ...puppy,
      comentario: puppy.comentario ?? undefined,
      age: puppy.age ?? 'N/A',
      weight: puppy.weight ?? 'N/A',
    }));

    const totalPages = Math.ceil(total / limit);
    pagination = {
      page,
      limit,
      total,
      totalPages,
    };
  } catch (error) {
    console.error("Erro ao buscar filhotes entregues:", error);
  }

  const displayPuppies = puppies;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Filhotes <span className="bg-linear-to-r from-pink-500 via-pink-400 to-sky-400 bg-clip-text text-transparent">Entregues</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça os filhotes que já encontraram um lar cheio de amor e felicidade com suas novas famílias.
          </p>
        </div>

        {displayPuppies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Nenhum filhote entregue no momento.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10 px-2 sm:px-4">
              {displayPuppies.map((puppy, index) => (
                <div
                  key={puppy.id}
                  className="transform hover:-translate-y-2 transition-transform duration-500"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
                  }}
                >
                  <DeliveredPuppyCard puppy={puppy} />
                </div>
              ))}
            </div>

            <PaginationDemo
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              className="mt-12"
            />
          </>
        )}
      </div>
    </div>
  );
}

async function FilhotesPageData({ searchParams }: FilhotesEntreguesPageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || '1');

  return <FilhotesData page={page} />;
}

export default function FilhotesEntreguesPage({ searchParams }: FilhotesEntreguesPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <FilhotesPageData searchParams={searchParams} />
    </Suspense>
  );
}
