import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./home/header/header";
import { Footer } from "./home/footer/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Canil Zannine - Criação Especializada de Chihuahua",
    template: "%s | Canil Zannine"
  },
  description: "Canil Zannine - Filhotes de Chihuahua de alta qualidade, saúde e temperamento excepcionais. Encontre seu novo melhor amigo conosco!",
  keywords: ["chihuahua", "canil", "filhotes", "cães", "venda de cachorros", "zannine", "canil zannine", "chihuahua brasil"],
  authors: [{ name: "Bianca Cogo" }],
  creator: "Canil Zannine",
  publisher: "Canil Zannine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Canil Zannine - Criação Especializada de Chihuahua",
    description: "Filhotes de alta qualidade, saúde e temperamento excepcionais.",
    url: '/',
    siteName: 'Canil Zannine',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Logo Canil Zannine',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Canil Zannine",
    description: "Criação Especializada de Chihuahua",
    images: ['/logo.png'],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
