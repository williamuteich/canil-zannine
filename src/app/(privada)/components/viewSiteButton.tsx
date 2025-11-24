"use client";

import { HomeIcon } from "lucide-react";
import { revalidateAndRedirect } from "@/app/actions/revalidate";
import { useTransition } from "react";

export function ViewSiteButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await revalidateAndRedirect();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-2 rounded-md border border-slate-500 bg-slate-700/80 px-4 py-2 text-sm font-medium text-white 
      transition-colors hover:bg-slate-600/90 hover:border-slate-400
      focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800
      disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <HomeIcon className="w-4 h-4" />
      {isPending ? "Carregando..." : "Ver site"}
    </button>
  );
}
