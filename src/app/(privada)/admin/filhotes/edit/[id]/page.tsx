import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PuppyData } from "@/types/models";
import EditFilhoteForm from "./components/EditFilhoteForm";
import prisma from "@/lib/db";

export async function generateStaticParams() {
  return [{ id: '_' }];
}

interface EditFilhotePageProps {
  params: Promise<{ id: string }>;
}

async function EditFilhoteData({ params }: EditFilhotePageProps) {
  const { id } = await params;

  if (id === '_') {
    notFound();
  }

  let puppyData: PuppyData | null = null;

  try {
    const result = await prisma.puppy.findUnique({
      where: { id },
      include: { images: true }
    });

    if (result) {
      puppyData = {
        ...result,
        age: result.age ?? undefined,
        weight: result.weight ?? undefined,
        comentario: result.comentario ?? undefined,
      };
    }
  } catch (error) {
    console.error('Erro ao carregar filhote:', error);
  }

  if (!puppyData) {
    return (
      <div className="space-y-7">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Erro</h1>
          <p className="text-base text-red-600">
            Erro ao carregar dados do filhote.
          </p>
        </div>
      </div>
    );
  }

  return <EditFilhoteForm initialData={puppyData} id={id} />;
}

export default function EditFilhotePage({ params }: EditFilhotePageProps) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    }>
      <EditFilhoteData params={params} />
    </Suspense>
  );
}
