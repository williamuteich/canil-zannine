import { Suspense } from "react";
import { BannerUI } from "./banner-ui";
import BannerWhatsApp from "./banner-whatsapp";

function Banner() {
  return (
    <BannerUI
      whatsappButton={
        <Suspense fallback={
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-300/50 text-transparent text-md font-semibold px-8 py-3 sm:px-10 sm:py-3 shadow-xl animate-pulse cursor-wait">
            <div className="h-6 w-6 bg-gray-400/50 rounded-full" />
            Fale conosco no WhatsApp
          </div>
        }>
          <BannerWhatsApp />
        </Suspense>
      }
    />
  );
}

export default Banner;