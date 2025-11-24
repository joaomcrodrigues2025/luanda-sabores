import Link from 'next/link';
import { getAllRestaurants, getAllCategories } from '@/lib/restaurants';
import RestaurantCard from '@/components/RestaurantCard';
import HeroSearch from '@/components/HeroSearch';

export default function HomePage() {
  const restaurants = getAllRestaurants();
  const categories = getAllCategories();
  const featuredRestaurants = restaurants.slice(0, 6);
  const topCategories = ['marisco', 'angolana', 'portuguesa', 'grelhados', 'internacional', 'mediterrânica'];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#1A1A1A] overflow-x-hidden">
      {/* Hero Section com Pesquisa */}
      <div
        className="relative z-0 min-h-screen w-full bg-center bg-no-repeat bg-cover flex items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 flex grow flex-col items-center justify-center px-4 py-20 text-center w-full">
          <div className="w-full max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="text-[#F4B32A]">🍽️</span>
              <span className="text-white/90 text-sm font-medium">40+ restaurantes na ilha de luanda</span>
            </div>

            <h1 className="text-white tracking-tight text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              descubra os sabores<br />
              <span className="text-[#F4B32A]">da ilha de luanda</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
              o seu guia definitivo para os melhores restaurantes, desde os mais tradicionais aos mais sofisticados
            </p>

            {/* Barra de Pesquisa */}
            <HeroSearch />

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <span className="material-symbols-outlined text-white/60 text-3xl">
                keyboard_arrow_down
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Categorias populares */}
      <section className="bg-white dark:bg-[#1A1A1A] px-4 py-12 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-[#252525] rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-6">
              explorar por tipo de cozinha
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {topCategories.map((categoria) => (
                <Link
                  key={categoria}
                  href={`/categorias/${categoria.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-[#1A1A1A] hover:bg-[#F4B32A] hover:text-black transition-all group"
                >
                  <span className="material-symbols-outlined text-3xl mb-2 text-[#D1302C] group-hover:text-black">
                    {categoria === 'marisco' ? 'set_meal' :
                     categoria === 'angolana' ? 'restaurant_menu' :
                     categoria === 'portuguesa' ? 'local_dining' :
                     categoria === 'grelhados' ? 'outdoor_grill' :
                     categoria === 'internacional' ? 'public' : 'ramen_dining'}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-black capitalize">
                    {categoria}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="bg-white dark:bg-[#1A1A1A] px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-1">
                restaurantes em destaque
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                os mais bem avaliados da ilha de luanda
              </p>
            </div>
            <Link
              href="/restaurantes"
              className="hidden sm:flex items-center gap-2 text-[#D1302C] font-medium hover:underline"
            >
              ver todos
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/restaurantes"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#D1302C] text-white font-bold hover:bg-red-700 transition-colors"
            >
              ver todos os {restaurants.length} restaurantes
            </Link>
          </div>
        </div>
      </section>

      {/* Mapa CTA */}
      <section className="bg-gray-50 dark:bg-[#0F0F0F] px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#D1302C] to-[#F4B32A] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                encontre no mapa
              </h2>
              <p className="text-white/90 text-lg">
                visualize todos os restaurantes da ilha de luanda num mapa interactivo
              </p>
            </div>
            <Link
              href="/mapa"
              className="flex items-center gap-3 bg-white text-[#D1302C] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <span className="material-symbols-outlined text-2xl">map</span>
              abrir mapa
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-[#1A1A1A] px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-[#252525]">
              <div className="text-[#F4B32A] text-4xl font-bold">{restaurants.length}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">restaurantes</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-[#252525]">
              <div className="text-[#F4B32A] text-4xl font-bold">{categories.length}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">tipos de cozinha</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-[#252525]">
              <div className="text-[#F4B32A] text-4xl font-bold">
                {restaurants.filter(r => r.avaliacoes.avaliacao >= 4.5).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">avaliação 4.5+</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-[#252525]">
              <div className="text-[#F4B32A] text-4xl font-bold">
                {restaurants.filter(r => r.caracteristicas.vistaMar).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">com vista mar</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] px-4 py-12 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🍽️</span>
                <span className="font-bold text-xl">luanda sabores</span>
              </div>
              <p className="text-gray-400 text-sm">
                o guia definitivo dos melhores restaurantes da ilha de luanda, angola.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">explorar</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/restaurantes" className="hover:text-white transition-colors">todos os restaurantes</Link></li>
                <li><Link href="/mapa" className="hover:text-white transition-colors">mapa</Link></li>
                <li><Link href="/categorias/marisco" className="hover:text-white transition-colors">marisco</Link></li>
                <li><Link href="/categorias/angolana" className="hover:text-white transition-colors">cozinha angolana</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">popular</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tags/vista-mar" className="hover:text-white transition-colors">vista mar</Link></li>
                <li><Link href="/tags/romântico" className="hover:text-white transition-colors">romântico</Link></li>
                <li><Link href="/tags/familiar" className="hover:text-white transition-colors">familiar</Link></li>
                <li><Link href="/tags/praia" className="hover:text-white transition-colors">na praia</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">informações</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                  ilha de luanda, angola
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">language</span>
                  português (pt-pt)
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">payments</span>
                  preços em AOA (kwanza)
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2024 luanda sabores. todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
