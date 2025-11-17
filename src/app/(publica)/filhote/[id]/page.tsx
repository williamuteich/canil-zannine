import Link from "next/link";
import { ImageGallery } from "../components/ImageGallery";
import { PuppyInfoPanel } from "../components/PuppyInfoPanel";

const puppies = [
  {
    id: 1,
    name: "Bella",
    age: "3 meses",
    breed: "Chihuahua Pelo Curto",
    description: "Fêmea adorável, carinhosa e brincalhona",
    fullDescription: `
      <p>Bella é uma fêmea encantadora, muito carinhosa e brincalhona. Ela adora atenção e é extremamente dócil com crianças e outros animais.</p>
      <p>Perfeita para famílias que buscam uma companheira fiel e cheia de amor para dar. Seu temperamento calmo e afetuoso faz dela a escolha ideal para quem busca um pet tranquilo e amoroso.</p>
      <p>Bella já está adaptada ao ambiente doméstico e responde muito bem aos comandos básicos.</p>
    `,
    features: `
      <ul class="space-y-2">
        <li class="flex items-center gap-2">• Pelo curto e fácil de cuidar</li>
        <li class="flex items-center gap-2">• Extremamente carinhosa</li>
        <li class="flex items-center gap-2">• Sociável com outros animais</li>
        <li class="flex items-center gap-2">• Adora brincar com crianças</li>
        <li class="flex items-center gap-2">• Responde a comandos básicos</li>
      </ul>
    `,
    healthInfo: `
      <div class="space-y-3">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Vacinações realizadas:</h4>
          <ul class="space-y-1 text-gray-700">
            <li class="flex items-center gap-2">• V8 - 1ª dose</li>
            <li class="flex items-center gap-2">• V10 - 2ª dose</li>
            <li class="flex items-center gap-2">• Raiva</li>
            <li class="flex items-center gap-2">• Vermífugo</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Cuidados especiais:</h4>
          <ul class="space-y-1 text-gray-700">
            <li class="flex items-center gap-2">• Alimentação premium para filhotes</li>
            <li class="flex items-center gap-2">• Banhos semanais</li>
            <li class="flex items-center gap-2">• Escovação regular</li>
            <li class="flex items-center gap-2">• Controle veterinário mensal</li>
          </ul>
        </div>
      </div>
    `,
    image: "https://images.unsplash.com/photo-1517423447168-cb804aafa6e0?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517423447168-cb804aafa6e0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&h=600&fit=crop"
    ],
    emoji: "❤️",
    available: true,
    weight: "1.2kg",
    pedigree: true,
    healthGuarantee: true,
    price: 1800,
    priceOld: 2200
  },
  {
    id: 2,
    name: "Max",
    age: "2 meses",
    breed: "Chihuahua Pelo Longo",
    description: "Macho ativo e muito inteligente",
    fullDescription: `
      <p>Max é um macho super ativo e inteligente, sempre pronto para brincadeiras e aprendizado.</p>
      <p>Sua pelagem longa é sedosa e requer cuidados especiais. Ideal para quem busca um companheiro energético e cheio de personalidade.</p>
      <p>Max é muito curioso e adora explorar novos ambientes, sempre com muita energia e disposição.</p>
    `,
    features: `
      <ul class="space-y-2">
        <li class="flex items-center gap-2">• Pelagem longa e sedosa</li>
        <li class="flex items-center gap-2">• Extremamente inteligente</li>
        <li class="flex items-center gap-2">• Muito ativo e energético</li>
        <li class="flex items-center gap-2">• Curioso e explorador</li>
        <li class="flex items-center gap-2">• Aprende comandos rapidamente</li>
      </ul>
    `,
    healthInfo: `
      <div class="space-y-3">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Vacinações realizadas:</h4>
          <ul class="space-y-1 text-gray-700">
            <li class="flex items-center gap-2">• V8 - 1ª dose</li>
            <li class="flex items-center gap-2">• V10 - 1ª dose</li>
            <li class="flex items-center gap-2">• Vermífugo</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Cuidados especiais:</h4>
          <ul class="space-y-1 text-gray-700">
            <li class="flex items-center gap-2">• Escovação diária da pelagem</li>
            <li class="flex items-center gap-2">• Alimentação energética</li>
            <li class="flex items-center gap-2">• Exercícios regulares</li>
            <li class="flex items-center gap-2">• Controle veterinário mensal</li>
          </ul>
        </div>
      </div>
    `,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517423447168-cb804aafa6e0?w=600&h=600&fit=crop"
    ],
    emoji: "❤️",
    available: true,
    weight: "1.0kg",
    pedigree: true,
    healthGuarantee: true,
    price: 2000,
    priceOld: 2500
  }
];

export default function FilhoteDetailPage() {
  const puppy = puppies[0];

  if (!puppy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Filhote não encontrado</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-24 pb-16">
        <nav className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            ← Voltar para filhotes
          </Link>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
            <div className="lg:w-1/2">
              <ImageGallery images={puppy.images} name={puppy.name} />
            </div>

            <div className="lg:w-1/2">
              <PuppyInfoPanel
                name={puppy.name}
                emoji={puppy.emoji}
                age={puppy.age}
                breed={puppy.breed}
                description={puppy.description}
                weight={puppy.weight}
                price={puppy.price}
                priceOld={puppy.priceOld}
                fullDescription={puppy.fullDescription}
                features={puppy.features}
                healthInfo={puppy.healthInfo}
                pedigree={puppy.pedigree}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}