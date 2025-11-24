'use client';

import { useState } from 'react';
import Link from 'next/link';
import Map from '@/components/Map';
import { Restaurant } from '@/lib/types';

interface Props {
  restaurants: Restaurant[];
}

export default function MapPageClient({ restaurants }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const filteredRestaurants = searchQuery
    ? restaurants.filter(
        (r) =>
          r.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.tipoCozinha.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : restaurants;

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      {/* Search Header */}
      <header className="absolute top-0 left-0 z-[1000] w-full p-4">
        <div className="flex items-center gap-3">
          <div className="flex-grow">
            <label className="flex flex-col h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg shadow-lg">
                <div className="text-gray-800 dark:text-gray-300 flex border-none bg-white dark:bg-gray-800/90 items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-gray-800/90 focus:border-none h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal"
                  placeholder="procurar por nome ou cozinha"
                />
              </div>
            </label>
          </div>
        </div>
      </header>

      {/* Map */}
      <main className="flex-1 relative">
        <Map restaurants={filteredRestaurants} height="100%" />
      </main>

      {/* Bottom Navigation */}
      <footer className="w-full z-[1000] border-t border-gray-200 dark:border-gray-800">
        <div className="flex bg-white dark:bg-gray-900/90 backdrop-blur-sm px-4 pb-3 pt-2">
          <Link
            href="/"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-gray-500 dark:text-gray-400"
          >
            <div className="flex h-8 items-center justify-center">
              <span className="material-symbols-outlined">explore</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">início</p>
          </Link>
          <Link
            href="/mapa"
            className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#D1302C]"
          >
            <div className="flex h-8 items-center justify-center">
              <span className="material-symbols-outlined fill">map</span>
            </div>
            <p className="text-xs font-bold leading-normal tracking-[0.015em]">mapa</p>
          </Link>
          <Link
            href="/restaurantes"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-gray-500 dark:text-gray-400"
          >
            <div className="flex h-8 items-center justify-center">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">restaurantes</p>
          </Link>
        </div>
      </footer>

      {/* Info Badge */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[999] bg-white dark:bg-gray-900 rounded-full px-4 py-2 shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurante' : 'restaurantes'}
        </p>
      </div>
    </div>
  );
}
