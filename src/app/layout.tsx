import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./home/header/header";
import { Footer } from "./home/footer/footer";

export const metadata: Metadata = {
  title: "Canil Zannine - Filhotes de Alta Qualidade",
  description: "Canil Zannine - Filhotes de alta qualidade, saúde e temperamento excepcionais. Encontre seu novo melhor amigo conosco!",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
