import { InstagramSearch } from "../../components/searchItem";
import { getData } from "@/services/get-data.service";
import { FilhotesTable } from "./components/FilhotesTable";
import Link from "next/link";
import { Filhote } from "@/types/models";

export default async function FilhotesPage() {
    let filhotes: Filhote[] = [];

    try {
        filhotes = await getData<Filhote[]>('/api/filhote');
    } catch (error) {
        console.error('Erro ao carregar filhotes:', error);
    }

    return (
        <div className="space-y-7">
            <div className="space-y-1.5">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Filhotes</h1>
                <p className="text-base text-slate-600">
                    Tela de gerenciamento dos filhotes cadastrados. Aqui você pode visualizar e organizar os registros.
                </p>
            </div>

            <InstagramSearch />

            <FilhotesTable filhotes={filhotes} />

            <div className="mt-6 flex justify-end">
                <Link href="/admin/filhotes/add">
                    <button className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 cursor-pointer transition-colors">
                        Adicionar Filhote
                    </button>
                </Link>
            </div>
        </div>
    );
}
