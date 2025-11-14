import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray/80 backdrop-blur-md border-b border-[hsl(333,95%,89%)]/30 shadow-md">
      <div className="max-w-[1450px] mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
          />

          <div className="flex flex-col">
            <span className="md:text-2xl font-bold text-transparent bg-gradient-to-r from-pink-300 via-pink-300 to-sky-300 bg-clip-text drop-shadow-sm">
              Canil Zannine
            </span>
            <p className="text-sm text-gray-600 font-medium tracking-wide">Filhotes Com Amor</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <ul className="flex gap-1 text-base font-medium">
            <li>
              <Link 
                className="px-4 py-3 rounded-md transition-all duration-300 text-gray-600 hover:text-pink-400 hover:bg-pink-100" 
                href="/"
              >
                Página Inicial
              </Link>
            </li>
            <li>
              <Link 
                className="px-4 py-3 rounded-md transition-all duration-300 text-gray-600 hover:text-pink-400 hover:bg-pink-100" 
                href="/"
              >
                Nossos Filhotes
              </Link>
            </li>
            <li>
              <Link 
                className="px-4 py-3 rounded-md transition-all duration-300 text-gray-600 hover:text-pink-400 hover:bg-pink-100" 
                href="/"
              >
                Contato
              </Link>
            </li>
            <li>
              <Link 
                className="px-4 py-3 rounded-md transition-all duration-300 text-gray-600 hover:text-pink-400 hover:bg-pink-100" 
                href="/"
              >
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
