"use client";
import Link from "next/link";
import { Header } from "@/app/home/header/header";
import { Footer } from "@/app/home/footer/footer";
import { Lock, Mail, LogIn } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Header />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fef9e7] via-[#ffe4de] to-[#e8ebe0]">
        <div className="relative z-10 w-full px-8 pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-36">
          <div className="max-w-[1400px] mx-auto">
            <div className="mx-auto max-w-md sm:max-w-lg">
              <div className="bg-[#faf8f5]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#ebe3d5] p-6 sm:p-8">
                <div className="text-center space-y-2 mb-6 sm:mb-8">
                  <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
                    <span className="bg-gradient-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent">Acessar conta</span>
                  </h1>
                  <p className="text-[#57534e] text-sm sm:text-base">Entre para gerenciar seus pedidos e acompanhar novidades.</p>
                </div>
                <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" aria-hidden />
                      <input id="email" name="email" type="email" placeholder="voce@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-[#d0c4ad] bg-[#faf8f5] px-11 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" aria-hidden />
                      <input id="password" name="password" type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-[#d0c4ad] bg-[#faf8f5] px-11 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Link href="/recuperar-senha" className="text-sm font-semibold text-[#d35836] hover:text-[#b03a1e]">Esqueci minha senha</Link>
                  </div>
                  <button type="submit" disabled={loading} className="inline-flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b8860b] to-[#d35836] text-white font-semibold px-4 py-3 shadow-lg shadow-[#d4a017]/20 hover:scale-[1.01] hover:from-[#d4a017] hover:to-[#e67e66] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d4a017]/50 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[#d4a017]/30">
                    <LogIn className="h-5 w-5" aria-hidden />
                    {loading ? "Entrando..." : "Entrar"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}