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
        <section className="py-16 lg:py-24 w-full bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full relative">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                            Nossos Momentos
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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