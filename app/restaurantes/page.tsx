import { Suspense } from 'react';
import RestaurantesPageClient from './RestaurantesPageClient';

export const metadata = {
  title: 'todos os restaurantes - ilha de luanda',
  description: 'explore todos os restaurantes da ilha de luanda. pesquise por tipo de cozinha, preço e características. encontre o lugar perfeito para a sua próxima refeição.',
};

export default function RestaurantesPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <RestaurantesPageClient />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A] flex items-center justify-center">
      <div className="text-gray-600 dark:text-gray-400">a carregar...</div>
    </div>
  );
}
