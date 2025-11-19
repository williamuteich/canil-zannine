import Link from "next/link";
import { ImageGallery } from "../components/ImageGallery";
import { PuppyInfoPanel } from "../components/PuppyInfoPanel";
import { getData } from "@/services/get-data.service";

interface Puppy {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  age?: string;
  weight?: string;
  status: string;
  primaryImage: string;
  images: { id: string; url: string }[];
}

export default async function FilhoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  let puppy: Puppy | null = null;
  const { id } = await params;

  try {
    puppy = await getData<Puppy>(`/api/filhote/${id}`);
  } catch (error) {
    console.error("Erro ao buscar filhote:", error);
  }

  if (!puppy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8ed]">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-[#febbd6]">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Filhote não encontrado</h1>
          <p className="text-gray-600 mb-6">O filhote que você procura não existe ou foi removido.</p>
          <Link href="/" className="inline-block bg-linear-to-r from-[#f2a3c0] to-[#3dc7c4] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = [
    puppy.primaryImage,
    ...(puppy.images?.map(img => img.url) || [])
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#faf8ed]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-32 pb-16">
        {puppy.status !== 'ativo' && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-800 font-bold text-lg">⚠️ Este filhote já foi adotado ou não está mais disponível</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#febbd6] shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
            <div className="lg:w-1/2">
              <ImageGallery images={galleryImages} name={puppy.name} />
            </div>

            <div className="lg:w-1/2">
              <PuppyInfoPanel
                name={puppy.name}
                emoji="❤️"
                age={puppy.age || "Consultar"}
                breed="Chihuahua"
                description={puppy.description}
                weight={puppy.weight || "Consultar"}
                price={puppy.price}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}