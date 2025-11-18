import { PaginationDemo } from "../../components/pagination";
import { TableDemo } from "../../components/dataTable";
import { InstagramSearch } from "../../components/searchItem";

export default function FilhotesPage() {
    const tableHead = ["Id", "Nome", "Raça", "Status", "Ação"];

    const tableRows = [
        {
            id: "DOG001",
            title: "Golden Retriever - Fêmea",
            url: "https://canil.com/filhotes/dog001",
            status: true,
        },
        {
            id: "DOG002",
            title: "Labrador - Macho",
            url: "https://canil.com/filhotes/dog002",
            status: false,
        },
        {
            id: "DOG003",
            title: "Poodle Toy - Fêmea",
            url: "https://canil.com/filhotes/dog003",
            status: true,
        },
        {
            id: "DOG004",
            title: "Shih-tzu - Macho",
            url: "https://canil.com/filhotes/dog004",
            status: true,
        },
        {
            id: "DOG005",
            title: "Spitz Alemão - Fêmea",
            url: "https://canil.com/filhotes/dog005",
            status: false,
        },
    ];

    return (
        <div className="space-y-7">
            <div className="space-y-1.5">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Filhotes</h1>
                <p className="text-base text-slate-600">
                    Tela de gerenciamento dos filhotes cadastrados. Aqui você pode visualizar e organizar os registros.
                </p>
            </div>

            <InstagramSearch />

            <TableDemo tableHead={tableHead} rows={tableRows} />

            <div className="mt-6 flex flex-col gap-3">
                <div className="text-end">
                    <button className="rounded-md mb-2 bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800">
                        Adicionar Filhote
                    </button>
                </div>
                <PaginationDemo />
            </div>
        </div>
    );
}