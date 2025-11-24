import { Metadata } from 'next';
import { getAllRestaurants } from '@/lib/restaurants';
import MapPageClient from './MapPageClient';

export const metadata: Metadata = {
  title: 'mapa de restaurantes - ilha de luanda',
  description: 'veja todos os restaurantes da ilha de luanda no mapa interactivo. encontre restaurantes perto de si com localização precisa.',
};

export default function MapaPage() {
  const restaurants = getAllRestaurants();

  return <MapPageClient restaurants={restaurants} />;
}
