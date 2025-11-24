'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    return null; // Homepage tem o seu próprio hero
  }

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-sm">
      <div className="flex items-center p-4 pb-2 justify-between">
        <Link href="/" className="text-gray-900 dark:text-white flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
        </Link>
        <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          {pathname.includes('/restaurantes/') ? 'restaurante' : 'explorar restaurantes'}
        </h1>
        <div className="flex size-12 shrink-0 items-center justify-end" />
      </div>
    </header>
  );
}
