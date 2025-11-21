import { PuppiesCarousel } from "./home/carousel/carousel";
import { Contato } from "./home/contato/contato";
import { HomeSobre } from "./home/sobre/sobre";
import InstagramReels from "./home/reels/reels";
import { getData } from "@/services/get-data.service";
import type { SocialMedia } from "@/types/models";
import Banner from "./home/banner/banner";

export default async function Home() {
  let socialMedia: SocialMedia[] = [];

  try {
    socialMedia = await getData<SocialMedia[]>("/api/redes-sociais");
  } catch (error) {
    console.error("Erro ao buscar redes sociais:", error);
  }

  return (
    <main>
      <Banner />
      <PuppiesCarousel />
      <HomeSobre />
      <InstagramReels />
      <Contato socialMedia={socialMedia} />
    </main>
  );
}
