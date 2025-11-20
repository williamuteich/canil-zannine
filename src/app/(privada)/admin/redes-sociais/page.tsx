import { AddButton } from "../../components/addButton";
import { getData } from "@/services/get-data.service";
import type { SocialMedia } from "@/types/models";
import { RedesSociaisTable } from "./components/RedesSociaisTable";

export default async function RedesSociais() {
	const socialMedia = await getData<SocialMedia[]>("/api/redes-sociais");

	return (
		<div className="space-y-7">
			<div className="space-y-1.5">
				<h1 className="text-3xl font-semibold tracking-tight text-slate-900">Redes Sociais</h1>
				<p className="text-base text-slate-600">
					Tela de gerenciamento dos links das redes sociais. Aqui você pode visualizar e organizar os registros.
				</p>
			</div>

			<RedesSociaisTable socialMedia={socialMedia} />

			<div className="mt-6 flex flex-col gap-3">
				<div className="text-end">
					<AddButton
						title="Adicionar Rede Social"
						description="Preencha os dados da nova rede social."
						buttonLabel="Adicionar Rede Social"
						apiUrl="/api/redes-sociais"
						fields={[
							{
								name: "plataform",
								label: "Plataforma",
								type: "select",
								required: true,
								options: [
									{ value: "instagram", label: "Instagram" },
									{ value: "facebook", label: "Facebook" },
									{ value: "tiktok", label: "TikTok" },
									{ value: "youtube", label: "YouTube" },
									{ value: "twitter", label: "X (Twitter)" },
									{ value: "linkedin", label: "LinkedIn" },
									{ value: "whatsapp", label: "WhatsApp" },
									{ value: "telefone", label: "Telefone" },
									{ value: "email", label: "Email" },
								],
							},
							{
								name: "link",
								label: "Link",
								type: "url",
								required: false,
								placeholder: "https://...",
							},
							{
								name: "value",
								label: "Valor/Texto (opcional)",
								type: "text",
								required: false,
								placeholder: "Ex: (51) 99868-2733",
							}
						]}
					/>
				</div>
			</div>
		</div>
	);
}