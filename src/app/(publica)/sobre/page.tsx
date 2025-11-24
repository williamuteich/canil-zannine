import { Metadata } from "next";
import SobreContent from "./components/SobreContent";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: "Conheça a história do Canil Zannine, nossa essência e compromisso com a criação ética e amorosa de Chihuahuas desde 2018.",
  openGraph: {
    title: "Sobre Nós | Canil Zannine",
    description: "Conheça a história do Canil Zannine, nossa essência e compromisso com a criação ética e amorosa de Chihuahuas desde 2018.",
  }
};

export default function SobrePage() {
  return <SobreContent />;
}
