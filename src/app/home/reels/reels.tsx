import { getData } from "@/services/get-data.service";
import type { InstaEmbed } from "@/types/models";
import ShowInstaEmbeds from "./components/showInstaEmbeds";

async function getInstaData() {
    try {
        const posts = await getData<InstaEmbed[]>('/api/instagram');
        return {
            posts: posts || [],
        };
    } catch (error) {
        console.error('Erro ao buscar posts do Instagram:', error);
        return { posts: [] };
    }
}

export default async function InstagramReels() {
    const { posts } = await getInstaData();

    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section id="reels" className="py-12 md:py-16 bg-[#faf8f5]">
            <div className="container mx-auto px-3 sm:px-6 lg:px-12 xl:px-10 max-w-[1400px]">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-linear-to-r from-[#b8860b] to-[#d35836] bg-clip-text text-transparent">
                        Nossos Momentos
                    </h2>
                    <p className="text-base sm:text-lg text-[#57534e] max-w-2xl mx-auto px-2">
                        Acompanhe os momentos especiais dos nossos filhotes no Instagram
                    </p>
                </div>

                <ShowInstaEmbeds
                    posts={posts}
                    instagramUrl="https://instagram.com/canilzannine"
                />
            </div>
        </section>
    );
}