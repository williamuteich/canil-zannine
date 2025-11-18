import { InstagramSearch } from "../../components/searchItem";
import { getData } from "@/services/get-data.service";
import { InstagramTable } from "./components/InstagramTable";
import type { InstaEmbed } from "@/types/models";
import { AddButton } from "../../components/addButton";

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
        <AddButton
          title="Adicionar Post do Instagram"
          description="Preencha os dados do novo post do Instagram."
          buttonLabel="Adicionar Post"
          apiUrl="/api/instagram"
          fields={[
            {
              name: "title",
              label: "Título",
              type: "text",
              required: true,
              placeholder: "Ex: Novo filhote chegou!",
            },
            {
              name: "link",
              label: "Link do Instagram",
              type: "url",
              required: true,
              placeholder: "https://instagram.com/p/...",
            }
          ]}
        />
      </div>
    </div>
  );
}