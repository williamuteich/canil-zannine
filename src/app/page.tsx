import { Banner } from "./home/banner/banner";
import { PuppiesCarousel } from "./home/carousel/carousel";
import { Contato } from "./home/contato/contato";
import { HomeSobre } from "./home/sobre/sobre";

export default function Home() {
  return (
    <main>
      <Banner />
      <PuppiesCarousel />
      <HomeSobre />
      <Contato />
    </main>
  );
}
