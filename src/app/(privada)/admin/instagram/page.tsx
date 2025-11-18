import { PaginationDemo } from "../../components/pagination";
import { TableDemo } from "../../components/dataTable";
import { InstagramSearch } from "../../components/searchItem";

export default function Instagram() {
  const tableHead = ["Id", "Title", "Url", "Status", "Ação"];

  const tableRows = [
    {
      id: "POST001",
      title: "Nosso novo filhote de Golden Retriever!",
      url: "https://instagram.com/p/post001",
      status: true,
    },
    {
      id: "POST002",
      title: "Cuidados com filhotes no verão",
      url: "https://instagram.com/p/post002",
      status: false,
    },
    {
      id: "POST003",
      title: "Adoção responsável - conheça nossa história",
      url: "https://instagram.com/p/post003",
      status: true,
    },
    {
      id: "POST004",
      title: "Dicas de alimentação para cães",
      url: "https://instagram.com/p/post004",
      status: true,
    },
    {
      id: "POST005",
      title: "Banho e tosa com produtos naturais",
      url: "https://instagram.com/p/post005",
      status: false,
    },
  ];

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Instagram</h1>
        <p className="text-base text-slate-600">
          Tela de gerenciamento das publicações do Instagram. Aqui você pode visualizar e organizar os registros.
        </p>
      </div>

      <InstagramSearch />

      <TableDemo tableHead={tableHead} rows={tableRows} />

      <div className="mt-6 flex flex-col gap-3">
        <div className="text-end">
          <button className="rounded-md mb-2 bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800">
            Adicionar Post
          </button>
        </div>
        <PaginationDemo />
      </div>
    </div>
  );
}