import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./home/header/header";
import { Footer } from "./home/footer/footer";
import { getData } from "@/services/get-data.service";
import type { SocialMedia } from "@/types/models";

export const metadata: Metadata = {
  title: "Canil Zannine - Filhotes de Alta Qualidade",
  description: "Canil Zannine - Filhotes de alta qualidade, saúde e temperamento excepcionais. Encontre seu novo melhor amigo conosco!",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let socialMedia: SocialMedia[] = [];

  try {
    socialMedia = await getData<SocialMedia[]>("/api/redes-sociais");
  } catch (error) {
    console.error("Erro ao buscar redes sociais:", error);
  }

  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer socialMedia={socialMedia} />
      </body>
    </html>
  );
}
