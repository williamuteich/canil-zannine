import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ImageGallery } from "../components/ImageGallery";
import { PuppyInfoPanel } from "../components/PuppyInfoPanel";
import { getData } from "@/services/get-data.service";
import { Puppy, SocialMedia } from "@/types/models";

export async function generateStaticParams() {
  return [{ id: '_' }];
}

async function FilhoteData({ id }: { id: string }) {

  if (id === '_') {
    notFound();
  }

  let puppy: Puppy | null = null;
  let socialMedia: SocialMedia[] = [];

  try {
    [puppy, socialMedia] = await Promise.all([
      getData<Puppy>(`/api/filhote/${id}`),
      getData<SocialMedia[]>("/api/redes-sociais")
    ]);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }

  const whatsapp = (socialMedia || []).find(sm => sm.plataform.toLowerCase() === 'whatsapp' && sm.status);
  const whatsappLink = whatsapp?.link || (whatsapp?.value ? `https://wa.me/${whatsapp.value.replace(/\D/g, '')}` : undefined);

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
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
            <div className="lg:w-1/2">
              <ImageGallery images={galleryImages} name={puppy.name} status={puppy.status} />
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
                whatsappLink={whatsappLink}
                status={puppy.status}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function FilhoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    }>
      <FilhoteData id={id} />
    </Suspense>
  );
}