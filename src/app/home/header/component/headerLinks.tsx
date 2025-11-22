import Link from "next/link";

export function HeaderLinks() {
    return (
        <nav className="hidden md:flex items-center space-x-1">
            <ul className="flex gap-1 text-base font-medium">
                <li>
                    <Link
                        className="px-4 py-3 rounded-md transition-all duration-300 text-gray-600 hover:text-pink-400 hover:bg-pink-100"
                        href="/"
                    >
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link
                        className="px-4 py-3 rounded-md transition-all duration-300 text-gray-600 hover:text-pink-400 hover:bg-pink-100"
                        href="/nossos-filhotes"
                    >
                        Nossos Filhotes
                    </Link>
                </li>
                <li>
                    <Link
                        className="px-4 py-3 rounded-md transition-all duration-300 text-gray-600 hover:text-pink-400 hover:bg-pink-100"
                        href="/filhotes-entregues"
                    >
                        Filhotes Entregues
                    </Link>
                </li>
                <li>
                    <Link
                        className="px-4 py-3 rounded-md transition-all duration-300 text-gray-600 hover:text-pink-400 hover:bg-pink-100"
                        href="/#contato"
                    >
                        Contato
                    </Link>
                </li>
                <li>
                    <Link
                        className="px-4 py-3 rounded-md transition-all duration-300 text-gray-600 hover:text-pink-400 hover:bg-pink-100"
                        href="/sobre"
                    >
                        Sobre
                    </Link>
                </li>
            </ul>
        </nav>
    )
}