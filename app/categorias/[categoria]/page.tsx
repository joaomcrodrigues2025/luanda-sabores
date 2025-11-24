import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRestaurantsByCategory, getAllCategories } from '@/lib/restaurants';
import RestaurantCard from '@/components/RestaurantCard';
import Link from 'next/link';

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((categoria) => ({
    categoria: categoria.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const categoryName = decodeURIComponent(categoria).replace(/-/g, ' ');
  const restaurants = getRestaurantsByCategory(categoryName);

  if (restaurants.length === 0) {
    return {
      title: 'categoria não encontrada',
    };
  }

  return {
    title: `melhores restaurantes de ${categoryName} na ilha de luanda - ${restaurants.length} opções`,
    description: `descubra os ${restaurants.length} melhores restaurantes de ${categoryName} na ilha de luanda. compare preços, avaliações e menus. encontre o restaurante perfeito!`,
    keywords: `${categoryName} luanda, restaurantes ${categoryName}, comer ${categoryName} ilha de luanda, ${categoryName} angola`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const categoryName = decodeURIComponent(categoria).replace(/-/g, ' ');
  const restaurants = getRestaurantsByCategory(categoryName);

  if (restaurants.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A] pt-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#D1302C] to-[#B82822] text-white px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm mb-4 opacity-90">
            <Link href="/" className="hover:underline">
              início
            </Link>
            {' > '}
            <Link href="/restaurantes" className="hover:underline">
              restaurantes
            </Link>
            {' > '}
            <span className="capitalize">{categoryName}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 capitalize">
            restaurantes de {categoryName}
          </h1>
          <p className="text-white/90 text-lg">
            {restaurants.length} {restaurants.length === 1 ? 'restaurante' : 'restaurantes'} na
            ilha de luanda
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 dark:bg-[#0F0F0F] px-4 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#F4B32A]">{restaurants.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">restaurantes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#F4B32A]">
              {restaurants.filter((r) => r.avaliacoes.avaliacao >= 4.5).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">avaliação 4.5+</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#F4B32A]">
              {Math.round(
                restaurants.reduce((acc, r) => acc + r.precos.precoMedio, 0) / restaurants.length
              ).toLocaleString('pt-AO')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">preço médio (AOA)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#F4B32A]">
              {restaurants.filter((r) => r.caracteristicas.vistaMar).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">com vista mar</div>
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              todos os restaurantes
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ordenado por avaliação
            </p>
          </div>
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 dark:bg-[#0F0F0F] px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            não encontrou o que procurava?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            explore todos os restaurantes da ilha de luanda
          </p>
          <Link
            href="/restaurantes"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#D1302C] text-white font-bold hover:bg-red-700 transition-colors"
          >
            ver todos os restaurantes
          </Link>
        </div>
      </div>
    </div>
  );
}
