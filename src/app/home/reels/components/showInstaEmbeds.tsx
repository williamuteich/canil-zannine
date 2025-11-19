'use client';

import { useEffect, useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Script from 'next/script';
import Link from 'next/link';
import type { ShowInstaEmbedsProps } from '@/types/models';

declare global {
    interface Window {
        instgrm?: {
            Embeds: {
                process: () => void;
            };
        };
    }
}

export default function ShowInstaEmbeds({ posts, instagramUrl }: ShowInstaEmbedsProps) {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const processEmbeds = () => {
            if (window.instgrm) {
                try {
                    window.instgrm.Embeds.process();
                } catch (error) {
                    console.error('Erro ao processar embeds:', error);
                }
            }
        };

        if (window.instgrm) {
            processEmbeds();
        }

        const timer = setTimeout(processEmbeds, 500);

        return () => clearTimeout(timer);
    }, [posts]);

    const handleScriptLoad = () => {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    };

    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <>
            <Script
                src="https://www.instagram.com/embed.js"
                strategy="afterInteractive"
                onLoad={handleScriptLoad}
            />

            <div ref={carouselRef} className="relative">
                <Carousel 
                    opts={{ 
                        align: "start",
                        loop: true,
                    }} 
                    className="w-full"
                >
                    <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
                        {posts.map((post) => (
                            <CarouselItem
                                key={post.id}
                                className="pl-1 sm:pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="w-full h-[700px] flex items-center justify-center bg-white rounded-lg">
                                    <div className="w-full h-full max-w-[500px]">
                                        <blockquote
                                            className="instagram-media"
                                            data-instgrm-permalink={`${post.link}?utm_source=ig_embed&amp;utm_campaign=loading`}
                                            data-instgrm-version="14"
                                            style={{
                                                background: '#FFF',
                                                border: '0',
                                                borderRadius: '3px',
                                                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                                                margin: '0',
                                                padding: '0',
                                                width: '100%',
                                                height: '700px',
                                                minHeight: '700px',
                                                maxHeight: '700px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="hidden min-[1250px]:flex -left-16 w-12 h-12 rounded-full bg-linear-to-br from-gray-800 to-gray-900 border-none text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl" />
                    <CarouselNext className="hidden min-[1250px]:flex -right-16 w-12 h-12 rounded-full bg-linear-to-br from-gray-800 to-gray-900 border-none text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl" />
                </Carousel>
            </div>

            {instagramUrl && (
                <div className="mt-12 text-center">
                    <Link
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm lg:text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <span>Ver mais no Instagram</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                        </svg>
                    </Link>
                </div>
            )}
        </>
    );
}