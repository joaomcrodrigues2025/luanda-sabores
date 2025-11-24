import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1A1A] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#D1302C] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          página não encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          desculpe, não conseguimos encontrar a página que procura.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#F4B32A] text-black font-bold hover:bg-yellow-400 transition-colors"
        >
          voltar ao início
        </Link>
      </div>
    </div>
  );
}
