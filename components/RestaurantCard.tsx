import Link from 'next/link';
import Image from 'next/image';
import { Restaurant } from '@/lib/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurantes/${restaurant.id}`}>
      <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#2C2C2C] p-3 shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-transparent dark:hover:border-[#F4B32A]/50 hover:border-[#F4B32A]/20">
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
          <Image
            src={restaurant.imagens.imagemPrincipal}
            alt={restaurant.nome}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
              {restaurant.nome}
            </p>
            <div className="flex items-center gap-1 text-[#F4B32A]">
              <p className="text-sm font-medium leading-normal">
                {restaurant.avaliacoes.avaliacao.toFixed(1)}
              </p>
              <span className="material-symbols-outlined text-base fill">star</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">
            {restaurant.tipoCozinha.join(' • ')} • {restaurant.precos.faixaPrecoTexto}
          </p>
        </div>
      </div>
    </Link>
  );
}
