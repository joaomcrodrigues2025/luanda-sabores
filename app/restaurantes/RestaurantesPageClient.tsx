'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import RestaurantCard from '@/components/RestaurantCard';
import SearchBar from '@/components/SearchBar';
import { Restaurant } from '@/lib/types';

export default function RestaurantesPageClient() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const applyFilters = useCallback((data: Restaurant[], categories: string[], query: string | null) => {
    let filtered = [...data];

    if (query) {
      filtered = filtered.filter((r) =>
        r.nome.toLowerCase().includes(query.toLowerCase()) ||
        r.descricao.toLowerCase().includes(query.toLowerCase()) ||
        r.tipoCozinha.some((c) => c.toLowerCase().includes(query.toLowerCase()))
      );
    } else if (categories.length > 0) {
      filtered = filtered.filter((r) =>
        r.tipoCozinha.some((c) => categories.includes(c))
      );
    }

    return filtered;
  }, []);

  useEffect(() => {
    fetch('/api/restaurants')
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        const query = searchParams?.get('q') || null;
        setFilteredRestaurants(applyFilters(data, selectedCategories, query));

        const categories = new Set<string>();
        data.forEach((r: Restaurant) => {
          r.tipoCozinha.forEach((c: string) => categories.add(c));
        });
        setAllCategories(Array.from(categories).sort());
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar restaurantes:', err);
        setLoading(false);
      });
  }, [searchParams, applyFilters, selectedCategories]);

  useEffect(() => {
    if (restaurants.length > 0) {
      const query = searchParams?.get('q') || null;
      setFilteredRestaurants(applyFilters(restaurants, selectedCategories, query));
    }
  }, [searchParams, restaurants, selectedCategories, applyFilters]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">a carregar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A]">
      <SearchBar />

      {/* Category Filters */}
      <div className="flex gap-3 px-4 py-3 overflow-x-auto">
        <button
          onClick={() => setSelectedCategories([])}
          className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 ${
            selectedCategories.length === 0
              ? 'bg-[#D1302C] text-white'
              : 'bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white'
          }`}
        >
          <p className="text-sm font-medium leading-normal">todos</p>
        </button>
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 ${
              selectedCategories.includes(category)
                ? 'bg-[#D1302C] text-white'
                : 'bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white'
            }`}
          >
            <p className="text-sm font-medium leading-normal">{category}</p>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="px-4 py-2">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurante' : 'restaurantes'}
        </p>
      </div>

      {/* Restaurant Grid */}
      <main className="flex-1 px-4 py-2 space-y-4 pb-8">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              nenhum restaurante encontrado
            </p>
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        )}
      </main>
    </div>
  );
}
