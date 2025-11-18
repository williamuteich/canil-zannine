import { TableDemo } from "../../components/dataTable";

export default function RedesSociais() {
	const tableHead = ["Id", "Plataforma", "Url", "Status", "Ação"];

	const tableRows = [
		{
			id: "SOC001",
			title: "Instagram Principal",
			url: "https://instagram.com/canil",
			status: true,
		},
		{
			id: "SOC002",
			title: "Facebook Página",
			url: "https://facebook.com/canil",
			status: true,
		},
		{
			id: "SOC003",
			title: "TikTok",
			url: "https://tiktok.com/@canil",
			status: false,
		},
		{
			id: "SOC004",
			title: "YouTube Canal",
			url: "https://youtube.com/canil",
			status: true,
		},
		{
			id: "SOC005",
			title: "X (Twitter)",
			url: "https://x.com/canil",
			status: false,
		},
	];

	return (
		<div className="space-y-7">
			<div className="space-y-1.5">
				<h1 className="text-3xl font-semibold tracking-tight text-slate-900">Redes Sociais</h1>
				<p className="text-base text-slate-600">
					Tela de gerenciamento dos links das redes sociais. Aqui você pode visualizar e organizar os registros.
				</p>
			</div>

			<TableDemo tableHead={tableHead} rows={tableRows} />

			<div className="mt-6 flex flex-col gap-3">
				<div className="text-end">
					<button className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 cursor-pointer">
						Adicionar Link
					</button>
				</div>
			</div>
		</div>
	);
}