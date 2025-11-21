import { Suspense } from "react";
import { InstagramContent } from "./components/InstagramContent";

interface InstagramPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

async function InstagramData({ searchParams }: InstagramPageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || '1');
  const search = resolvedParams.search || '';

  return <InstagramContent page={page} search={search} />;
}

export default function InstagramPage({ searchParams }: InstagramPageProps) {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <InstagramData searchParams={searchParams} />
    </Suspense>
  );
}
