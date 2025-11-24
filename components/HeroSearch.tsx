'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/restaurantes?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/restaurantes');
    }
  };

  const quickFilters = [
    { label: 'marisco', href: '/categorias/marisco' },
    { label: 'angolana', href: '/categorias/angolana' },
    { label: 'vista mar', href: '/tags/vista-mar' },
    { label: 'romântico', href: '/tags/romântico' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Barra de pesquisa */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden">
          <span className="material-symbols-outlined text-gray-400 text-2xl pl-5">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="pesquisar restaurantes, cozinha, zona..."
            className="flex-1 py-4 px-4 text-gray-900 placeholder-gray-500 text-base outline-none bg-transparent"
          />
          <button
            type="submit"
            className="bg-[#D1302C] hover:bg-red-700 text-white font-bold py-3 px-6 m-1.5 rounded-full transition-colors flex items-center gap-2"
          >
            <span className="hidden sm:inline">pesquisar</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </form>

      {/* Filtros rápidos */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {quickFilters.map((filter) => (
          <a
            key={filter.label}
            href={filter.href}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full text-sm font-medium transition-colors border border-white/30"
          >
            {filter.label}
          </a>
        ))}
      </div>
    </div>
  );
}
