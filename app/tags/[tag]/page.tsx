import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRestaurantsByTag, getAllTags } from '@/lib/restaurants';
import RestaurantCard from '@/components/RestaurantCard';
import Link from 'next/link';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const tagName = decodeURIComponent(tag).replace(/-/g, ' ');
  const restaurants = getRestaurantsByTag(tagName);

  if (restaurants.length === 0) {
    return {
      title: 'tag não encontrada',
    };
  }

  return {
    title: `restaurantes ${tagName} na ilha de luanda - ${restaurants.length} opções`,
    description: `${restaurants.length} restaurantes ${tagName} na ilha de luanda. explore com fotos, avaliações e informações completas.`,
    keywords: `${tagName} luanda, restaurantes ${tagName}, ${tagName} ilha de luanda, ${tagName} angola`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const tagName = decodeURIComponent(tag).replace(/-/g, ' ');
  const restaurants = getRestaurantsByTag(tagName);

  if (restaurants.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#F4B32A] to-[#E5A528] text-black px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm mb-4 opacity-80">
            <Link href="/" className="hover:underline">
              início
            </Link>
            {' > '}
            <Link href="/restaurantes" className="hover:underline">
              restaurantes
            </Link>
            {' > '}
            <span className="capitalize">{tagName}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 capitalize">
            restaurantes {tagName}
          </h1>
          <p className="opacity-90 text-lg">
            {restaurants.length} {restaurants.length === 1 ? 'opção' : 'opções'} na ilha de luanda
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-8 bg-gray-50 dark:bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            explore {restaurants.length} restaurantes {tagName} cuidadosamente selecionados na ilha
            de luanda. compare preços, leia avaliações e encontre o lugar perfeito para a sua
            próxima refeição.
          </p>
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
              {restaurants.length} resultados
            </p>
          </div>
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </div>

      {/* Related Tags */}
      <div className="bg-gray-50 dark:bg-[#0F0F0F] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            explorar mais tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {getAllTags()
              .filter((t) => t.toLowerCase() !== tagName.toLowerCase())
              .slice(0, 10)
              .map((t) => (
                <Link
                  key={t}
                  href={`/tags/${t.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-[#F4B32A] hover:text-black transition-colors"
                >
                  {t}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            explore todos os restaurantes
          </h2>
          <Link
            href="/restaurantes"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#D1302C] text-white font-bold hover:bg-red-700 transition-colors"
          >
            ver todo o diretório
          </Link>
        </div>
      </div>
    </div>
  );
}
