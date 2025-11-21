import { Suspense } from "react";
import { RedesSociaisContent } from "./components/RedesSociaisContent";

export default function RedesSociais() {
	return (
		<Suspense fallback={<div>Carregando...</div>}>
			<RedesSociaisContent />
		</Suspense>
	);
}