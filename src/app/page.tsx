import { Banner } from "./home/banner/banner";
import { PuppiesCarousel } from "./home/carousel/carousel";
import { Footer } from "./home/footer/footer";
import { Header } from "./home/header/header"

export default function Home() {
  return (
    <main>
      <Header />
      <Banner />
      <PuppiesCarousel />
      <Footer />
    </main>
  );
}
