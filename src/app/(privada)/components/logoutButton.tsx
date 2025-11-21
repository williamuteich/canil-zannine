"use client"
import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface LogoutDashboardProps {
  className?: string;
}

export function LogoutDashboard({ className = "" }: LogoutDashboardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      title="Sair do sistema"
      className={className || `flex items-center gap-2 rounded-md border border-slate-500 cursor-pointer bg-slate-700/80 px-4 py-2 text-sm font-medium text-white 
        transition-colors 
        ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-600 hover:border-red-500"}
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
    >
      <LogOut className={`w-4 h-4 ${isLoading ? 'animate-pulse' : ''}`} />
      <span>{isLoading ? "Saindo..." : "Sair"}</span>
    </button>
  );
}
