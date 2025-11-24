import Link from 'next/link';
import { getAllRestaurants } from '@/lib/restaurants';
import RestaurantCard from '@/components/RestaurantCard';

export default function HomePage() {
  const restaurants = getAllRestaurants();
  const featuredRestaurants = restaurants.slice(0, 6);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#1A1A1A] overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative z-0 h-screen w-full bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex grow flex-col items-center justify-end px-4 pb-16 pt-10 text-center sm:justify-center sm:pb-10">
          <div className="w-full max-w-md">
            <h1 className="text-white tracking-tight text-4xl font-bold leading-tight">
              descubra os sabores de luanda
            </h1>
            <p className="text-white/90 text-base font-normal leading-normal pt-4 pb-8">
              o seu guia definitivo para os melhores restaurantes da cidade, desde os mais tradicionais aos mais sofisticados na ilha de luanda.
            </p>
            <div className="flex flex-col items-center gap-4 mt-4">
              <Link
                href="/restaurantes"
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#F4B32A] text-black text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-[#F4B32A]/30 hover:bg-yellow-400 transition-colors duration-300"
              >
                <span className="truncate">começar a explorar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurants */}
      <section className="bg-white dark:bg-[#1A1A1A] px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-2">
            restaurantes em destaque
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            os mais bem avaliados da ilha de luanda
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/restaurantes"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#D1302C] text-white font-bold hover:bg-red-700 transition-colors"
            >
              ver todos os {restaurants.length} restaurantes
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 dark:bg-[#0F0F0F] px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-[#F4B32A] text-4xl font-bold">{restaurants.length}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">restaurantes</div>
            </div>
            <div className="text-center">
              <div className="text-[#F4B32A] text-4xl font-bold">
                {new Set(restaurants.flatMap(r => r.tipoCozinha)).size}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">tipos de cozinha</div>
            </div>
            <div className="text-center">
              <div className="text-[#F4B32A] text-4xl font-bold">
                {restaurants.filter(r => r.avaliacoes.avaliacao >= 4.5).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">avaliação 4.5+</div>
            </div>
            <div className="text-center">
              <div className="text-[#F4B32A] text-4xl font-bold">
                {restaurants.filter(r => r.caracteristicas.vistaMar).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">vista mar</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#D1302C] px-4 py-16 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">pronto para explorar?</h2>
          <p className="text-white/90 text-lg mb-8">
            encontre o restaurante perfeito para qualquer ocasião na ilha de luanda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/restaurantes"
              className="px-8 py-3 rounded-lg bg-white text-[#D1302C] font-bold hover:bg-gray-100 transition-colors"
            >
              explorar restaurantes
            </Link>
            <Link
              href="/mapa"
              className="px-8 py-3 rounded-lg bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-colors"
            >
              ver no mapa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
