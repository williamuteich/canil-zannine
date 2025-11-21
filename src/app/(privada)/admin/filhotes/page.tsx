import { Suspense } from "react";
import { FilhotesContent } from "./components/FilhotesContent";

interface FilhotesPageProps {
    searchParams: Promise<{ page?: string; search?: string }>;
}

async function FilhotesData({ searchParams }: FilhotesPageProps) {
    const resolvedParams = await searchParams;
    const page = parseInt(resolvedParams.page || '1');
    const search = resolvedParams.search || '';
    const limit = 8;

    return <FilhotesContent page={page} search={search} limit={limit} />;
}

export default function FilhotesPage({ searchParams }: FilhotesPageProps) {
    return (
        <Suspense fallback={
            <div className="space-y-7">
                <div className="space-y-1.5">
                    <div className="h-9 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
                    ))}
                </div>
            </div>
        }>
            <FilhotesData searchParams={searchParams} />
        </Suspense>
    );
}
