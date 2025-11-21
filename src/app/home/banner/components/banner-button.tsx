import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface BannerButtonProps {
  whatsappLink: string;
}

export function BannerButton({ whatsappLink }: BannerButtonProps) {
  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1EB656] text-white text-md font-semibold px-8 py-3 sm:px-10 sm:py-3 shadow-xl shadow-[#25D366]/40 transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] cursor-pointer"
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
      Fale conosco no WhatsApp
    </Link>
  );
}
