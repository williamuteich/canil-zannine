import { Footer } from "./home/footer/footer";
import { Header } from "./home/header/header"

export default function Home() {
  return (
    <main>
      <Header />
      <div className="mt-32">Conteudo Princial</div>
      <Footer />
    </main>
  );
}
