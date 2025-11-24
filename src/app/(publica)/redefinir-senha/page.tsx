import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Header } from "@/app/home/header/header";
import prisma from "@/lib/db";
import { hashToken } from "@/lib/crypto";
import RedefinirSenhaClient from "./RedefinirSenhaClient";

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

async function RedefinirSenhaData({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    redirect("/login");
  }

  const hashedToken = hashToken(token);
  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return <RedefinirSenhaClient token={token} />;
}

function LoadingSkeleton() {
  return (
    <main>
      <Header />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-[#fef9e7] via-[#ffe4de] to-[#e8ebe0]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="mx-auto max-w-xl sm:max-w-2xl">
              <div className="bg-[#faf8f5]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#ebe3d5] p-6 sm:p-8">
                <div className="text-center space-y-2 mb-6 sm:mb-8">
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse mx-auto w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded-lg animate-pulse mx-auto w-2/3 mt-3"></div>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                  </div>

                  <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>

                  <div className="text-center pt-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse mx-auto w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function RedefinirSenha({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <RedefinirSenhaData searchParams={searchParams} />
    </Suspense>
  );
}
