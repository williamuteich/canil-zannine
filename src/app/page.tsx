import { Banner } from "./home/banner/banner";
import { PuppiesCarousel } from "./home/carousel/carousel";
import { Contato } from "./home/contato/contato";
import { HomeSobre } from "./home/sobre/sobre";
import InstagramReels from "./home/reels/reels";

export default function Home() {
  return (
    <main>
      <Banner />
      <PuppiesCarousel />
      <HomeSobre />
      <InstagramReels />
      <Contato />
    </main>
  );
}
