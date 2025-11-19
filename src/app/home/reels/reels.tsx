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
        <section className="relative w-full mx-auto px-1 sm:px-2 md:px-4 lg:px-8 xl:px-16 py-12 md:py-16 ">
            <div className="container mx-auto px-3 sm:px-6 lg:px-12 xl:px-10 max-w-[1400px]">
                <div className="w-full relative">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-linear-to-r from-primary to-pink-600 bg-clip-text text-transparent">
                            Nossos Momentos
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                            Acompanhe os momentos especiais dos nossos filhotes no Instagram
                        </p>
                    </div>

                    <ShowInstaEmbeds
                        posts={posts}
                        instagramUrl="https://instagram.com/canilzannine"
                    />
                </div>
            </div>
        </section>
    );
}