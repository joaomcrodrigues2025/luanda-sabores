'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'início', icon: 'home' },
    { href: '/restaurantes', label: 'restaurantes', icon: 'restaurant' },
    { href: '/mapa', label: 'mapa', icon: 'map' },
    { href: '/restaurantes?q=', label: 'procura', icon: 'search' },
  ];

  const getPageTitle = () => {
    if (pathname === '/restaurantes') return 'restaurantes';
    if (pathname === '/mapa') return 'mapa';
    if (pathname.includes('/restaurantes/')) return 'restaurante';
    if (pathname.includes('/categorias/')) return 'categoria';
    if (pathname.includes('/tags/')) return 'explorar';
    return 'explorar';
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${isHome ? 'bg-transparent' : 'bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800'}`}>
        <div className="flex items-center p-4 justify-between max-w-7xl mx-auto">
          {/* Logo / Voltar */}
          {isHome ? (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-white font-bold text-lg hidden sm:block">luanda sabores</span>
            </Link>
          ) : (
            <Link href="/" className="text-gray-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
              <span className="hidden sm:block font-medium">voltar</span>
            </Link>
          )}

          {/* Título da página (apenas em páginas internas) */}
          {!isHome && (
            <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 transform -translate-x-1/2">
              {getPageTitle()}
            </h1>
          )}

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  isHome
                    ? 'text-white hover:text-[#F4B32A]'
                    : pathname === link.href || (link.href === '/restaurantes?q=' && pathname === '/restaurantes')
                    ? 'text-[#D1302C]'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#D1302C]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Botão Menu Hamburger (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isHome
                ? 'text-white hover:bg-white/20'
                : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Menu Mobile Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu Panel */}
          <nav className="absolute top-0 right-0 h-full w-72 bg-white dark:bg-[#1A1A1A] shadow-2xl">
            <div className="p-6 pt-20">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      pathname === link.href
                        ? 'bg-[#D1302C] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{link.icon}</span>
                    <span className="font-medium text-lg">{link.label}</span>
                  </Link>
                ))}
              </div>

              {/* Footer do menu */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-gradient-to-r from-[#D1302C] to-[#F4B32A] p-4 rounded-xl text-white">
                  <p className="font-bold">luanda sabores</p>
                  <p className="text-sm opacity-90">os melhores restaurantes da ilha</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
