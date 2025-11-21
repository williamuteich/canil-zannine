import { Puppy, PaginatedResponse } from "@/types/models";
import Link from "next/link";
import Image from "next/image";
import { PaginationDemo } from "@/app/(privada)/components/pagination";

interface NossosFilhotesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NossosFilhotesPage({ searchParams }: NossosFilhotesPageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || '1');
  const limit = 12;

  let puppies: Puppy[] = [];
  let pagination = {
    page: 1,
    limit,
    total: 0,
    totalPages: 0,
  };

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}api/filhote?page=${page}&limit=${limit}&status=ativo`,
      { cache: 'no-store' }
    );
    const result: PaginatedResponse<Puppy> = await response.json();
    puppies = result.data;
    pagination = result.pagination;
  } catch (error) {
    console.error("Erro ao buscar filhotes:", error);
  }

  const displayPuppies = puppies;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Nossos <span className="bg-linear-to-r from-pink-500 via-pink-400 to-sky-400 bg-clip-text text-transparent">Filhotes</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça nossos adoráveis filhotes, criados com muito amor e carinho, prontos para encontrar um novo lar.
          </p>
        </div>

        {displayPuppies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Nenhum filhote encontrado no momento.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-10 px-2 sm:px-4">
              {displayPuppies.map((puppy, index) => (
                <Link
                  key={puppy.id}
                  href={`/filhote/${puppy.id}`}
                  className="group relative bg-white p-4 pb-16 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 rotate-0"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
                  }}
                >
                  <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100 shadow-inner">
                    <Image
                      src={puppy.primaryImage || '/placeholder-puppy.jpg'}
                      alt={puppy.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
                      <p className="text-white text-sm leading-relaxed mb-6 line-clamp-4 font-medium">
                        {puppy.description}
                      </p>

                      <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors flex items-center gap-2">
                        Ver Detalhes
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </div>

                    {puppy.status === 'ativo' && (
                      <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-wide z-10">
                        Disponível
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="font-handwriting text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors font-serif">
                        {puppy.name}
                      </h2>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">
                        Chihuahua
                      </p>
                    </div>
                  </div>
                </Link>
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
