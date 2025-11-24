"use client";
import Link from "next/link";
import { Header } from "@/app/home/header/header";
import { Lock, CheckCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface RedefinirSenhaClientProps {
  token: string;
}

export default function RedefinirSenhaClient({ token }: RedefinirSenhaClientProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao redefinir senha");
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Header />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-[#fef9e7] via-[#ffe4de] to-[#e8ebe0]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="mx-auto max-w-xl sm:max-w-2xl">
              <div className="bg-[#faf8f5]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#ebe3d5] p-6 sm:p-8">
                {success ? (
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
                      <span className="bg-linear-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent">Senha Redefinida!</span>
                    </h1>
                    <p className="text-[#57534e] text-sm sm:text-base">
                      Sua senha foi alterada com sucesso.
                    </p>
                    <p className="text-[#78716c] text-sm">
                      Você será redirecionado para o login em instantes...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center space-y-2 mb-6 sm:mb-8">
                      <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
                        <span className="bg-linear-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent">Nova Senha</span>
                      </h1>
                      <p className="text-[#57534e] text-sm sm:text-base">
                        Digite sua nova senha abaixo.
                      </p>
                    </div>

                    <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
                      <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Nova Senha
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" aria-hidden />
                          <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full rounded-xl border border-[#d0c4ad] bg-[#faf8f5] px-11 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                          Confirmar Nova Senha
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" aria-hidden />
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Digite a senha novamente"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full rounded-xl border border-[#d0c4ad] bg-[#faf8f5] px-11 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#b8860b] to-[#d35836] text-white font-semibold px-4 py-3 shadow-lg shadow-[#d4a017]/20 hover:scale-[1.01] hover:from-[#d4a017] hover:to-[#e67e66] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d4a017]/50 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[#d4a017]/30"
                      >
                        <Lock className="h-5 w-5" aria-hidden />
                        {loading ? "Salvando..." : "Redefinir Senha"}
                      </button>

                      <div className="text-center pt-2">
                        <Link
                          href="/login"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#d35836] hover:text-[#b03a1e] transition-colors"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Voltar ao Login
                        </Link>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
