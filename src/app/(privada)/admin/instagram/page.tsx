import { Suspense } from "react";
import { InstagramContent } from "./components/InstagramContent";

export default async function InstagramPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || '1');
  const search = resolvedParams.search || '';


  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <InstagramContent page={page} search={search} />
    </Suspense>
  );
}
