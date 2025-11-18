import { InstagramSearch } from "../../components/searchItem";
import { getData } from "@/services/get-data.service";
import { InstagramTable } from "./components/InstagramTable";
import type { InstaEmbed } from "@/types/models";

export default async function Instagram() {
  let embeds: InstaEmbed[] = [];
  
  try {
    embeds = await getData<InstaEmbed[]>('/api/instagram');
  } catch (error) {
    console.error('Erro ao carregar embeds do Instagram:', error);
  }

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Instagram</h1>
        <p className="text-base text-slate-600">
          Tela de gerenciamento das publicações do Instagram. Aqui você pode visualizar e organizar os registros.
        </p>
      </div>

      <InstagramSearch />

      <InstagramTable embeds={embeds} />

      <div className="mt-6 flex justify-end">
        <button className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 cursor-pointer">
          Adicionar Post
        </button>
      </div>
    </div>
  );
}