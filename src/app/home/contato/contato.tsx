import { Suspense } from "react";
import { ContatoUI } from "./components/contato-ui";
import { ContatoWhatsAppData, ContatoInfoData } from "./contato-data";

function Contato() {
  return (
    <ContatoUI
      whatsappSlot={
        <Suspense fallback={
          <div className="bg-linear-to-br from-[#faf8f5] to-[#f5f0e8] rounded-2xl lg:rounded-3xl p-6 md:p-8 shadow-lg border border-[#ebe3d5] mb-8 animate-pulse">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="h-6 bg-gray-200 rounded w-64 mx-auto mb-2" />
              <div className="h-4 bg-gray-200 rounded w-80 mx-auto max-w-full" />
            </div>
            <div className="h-14 bg-gray-200 rounded-xl" />
          </div>
        }>
          <ContatoWhatsAppData />
        </Suspense>
      }
      infoSlot={
        <Suspense fallback={
          <>
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2" />
                <div className="h-5 bg-gray-200 rounded w-32 mx-auto mb-1" />
                <div className="h-3 bg-gray-200 rounded w-28 mx-auto" />
              </div>
            ))}
          </>
        }>
          <ContatoInfoData />
        </Suspense>
      }
    />
  );
}

export default Contato;