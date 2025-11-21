"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchItemProps {
  placeholder?: string;
}

export function InstagramSearch({ placeholder = "Buscar publicações do Instagram" }: SearchItemProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (searchTerm) {
        params.set('search', searchTerm);
        params.set('page', '1');
      } else {
        params.delete('search');
      }

      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, router]);

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
      />
    </div>
  );
}