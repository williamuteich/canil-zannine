import Image from "next/image";
import { MobileSidebar } from "./component/sidebar";
import { HeaderLinks } from "./component/headerLinks";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-50 backdrop-blur-md border-b border-[hsl(333,95%,89%)]/30 shadow-md">
      <div className="max-w-[1400px] mx-auto px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
          />

          <div className="flex flex-col">
            <span className="text-2xl font-bold text-transparent bg-linear-to-r from-pink-300 via-pink-300 to-sky-300 bg-clip-text drop-shadow-sm">
              Canil Zannine
            </span>
            <p className="text-sm text-gray-600 font-medium tracking-wide">Filhotes Com Amor</p>
          </div>
        </div>

        <HeaderLinks />
        <MobileSidebar />
      </div>
    </header>
  );
}
