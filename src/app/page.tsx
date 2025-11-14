import { Banner } from "./home/banner/banner";
import { Footer } from "./home/footer/footer";
import { Header } from "./home/header/header"

export default function Home() {
  return (
    <main>
      <Header />
      <Banner />
      <div>Conteudo Princial</div>
      <Footer />
    </main>
  );
}
