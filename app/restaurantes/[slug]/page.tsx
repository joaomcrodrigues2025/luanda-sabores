import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRestaurantById, getAllRestaurants, getRelatedRestaurants } from '@/lib/restaurants';
import Map from '@/components/Map';
import RestaurantCard from '@/components/RestaurantCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const restaurants = getAllRestaurants();
  return restaurants.map((restaurant) => ({
    slug: restaurant.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = getRestaurantById(slug);

  if (!restaurant) {
    return {
      title: 'restaurante não encontrado',
    };
  }

  return {
    title: restaurant.seo.metaTitulo,
    description: restaurant.seo.metaDescricao,
    keywords: restaurant.seo.tags.join(', '),
    openGraph: {
      title: restaurant.seo.metaTitulo,
      description: restaurant.seo.metaDescricao,
      images: [
        {
          url: restaurant.imagens.imagemPrincipal,
          width: 1200,
          height: 630,
          alt: restaurant.nome,
        },
      ],
    },
  };
}

export default async function RestaurantePage({ params }: Props) {
  const { slug } = await params;
  const restaurant = getRestaurantById(slug);

  if (!restaurant) {
    notFound();
  }

  const relatedRestaurants = getRelatedRestaurants(restaurant.id);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#1A1A1A] overflow-x-hidden pt-16">
      {/* Hero Image Gallery */}
      <div className="@container">
        <div className="@[480px]:px-4 @[480px]:py-3">
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#231610] @[480px]:rounded-lg min-h-80"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url('${restaurant.imagens.imagemPrincipal}')`,
            }}
          >
            <div className="flex justify-center gap-2 p-5">
              <div className="size-1.5 rounded-full bg-white" />
              <div className="size-1.5 rounded-full bg-white opacity-50" />
              <div className="size-1.5 rounded-full bg-white opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="px-4 pt-6">
        <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight">
          {restaurant.nome}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-base font-normal leading-normal pt-2">
          {restaurant.descricao}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4 px-4 py-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`material-symbols-outlined ${
                i < Math.floor(restaurant.avaliacoes.avaliacao)
                  ? 'text-[#F4B32A] fill'
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              star
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {restaurant.avaliacoes.avaliacao.toFixed(1)} ({restaurant.avaliacoes.numeroAvaliacoes} avaliações)
        </p>
      </div>

      {/* Tags */}
      <div className="flex gap-2 px-4 py-2 flex-wrap">
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#F4B32A]/20 px-3">
          <p className="text-yellow-800 dark:text-[#F4B32A] text-sm font-medium leading-normal">
            {restaurant.precos.faixaPrecoTexto}
          </p>
        </div>
        {restaurant.ambiente.slice(0, 3).map((amb) => (
          <div key={amb} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-200 dark:bg-gray-700 px-3">
            <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
              {amb}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 px-4 py-6 text-center">
        <a className="flex flex-col items-center gap-2" href="#menu">
          <div className="flex items-center justify-center size-12 rounded-full bg-[#D1302C]/20">
            <span className="material-symbols-outlined text-[#D1302C]">menu_book</span>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300">menu</p>
        </a>
        <a className="flex flex-col items-center gap-2" href="#horario">
          <div className="flex items-center justify-center size-12 rounded-full bg-[#F4B32A]/20">
            <span className="material-symbols-outlined text-[#F4B32A]">schedule</span>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300">horário</p>
        </a>
        <a className="flex flex-col items-center gap-2" href="#localizacao">
          <div className="flex items-center justify-center size-12 rounded-full bg-green-500/20">
            <span className="material-symbols-outlined text-green-600">location_on</span>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300">mapa</p>
        </a>
        <a className="flex flex-col items-center gap-2" href={`tel:${restaurant.contactos.telefone}`}>
          <div className="flex items-center justify-center size-12 rounded-full bg-gray-200 dark:bg-gray-800">
            <span className="material-symbols-outlined text-gray-900 dark:text-white">call</span>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300">ligar</p>
        </a>
      </div>

      <div className="px-4 py-2">
        <hr className="border-gray-200 dark:border-gray-800" />
      </div>

      {/* Full Description */}
      <div className="px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Sobre</h2>
        <p className="text-gray-700 dark:text-gray-300 text-base leading-7 whitespace-pre-line">
          {restaurant.descricaoCompleta}
        </p>
      </div>

      <div className="px-4">
        <hr className="border-gray-200 dark:border-gray-800" />
      </div>

      {/* Especialidades */}
      <div className="px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Especialidades</h2>
        <div className="flex flex-wrap gap-2">
          {restaurant.especialidades.map((esp, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              {esp}
            </span>
          ))}
        </div>
      </div>

      <div className="px-4">
        <hr className="border-gray-200 dark:border-gray-800" />
      </div>

      {/* Safety Tips */}
      {restaurant.seguranca.dicasSeguranca.length > 0 && (
        <>
          <div className="px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Dicas de segurança</h2>
            <div className="space-y-3">
              {restaurant.seguranca.dicasSeguranca.map((dica, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-600">
                    {restaurant.seguranca.temVigilancia ? 'verified_user' : 'info'}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{dica}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4">
            <hr className="border-gray-200 dark:border-gray-800" />
          </div>
        </>
      )}

      {/* Parking */}
      {restaurant.estacionamento.temEstacionamento && (
        <>
          <div className="px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Estacionamento</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#D1302C]">local_parking</span>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {restaurant.estacionamento.tipoEstacionamento}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {restaurant.estacionamento.informacaoEstacionamento}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    custo: {restaurant.estacionamento.custoEstacionamento}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4">
            <hr className="border-gray-200 dark:border-gray-800" />
          </div>
        </>
      )}

      {/* Menu */}
      <div id="menu" className="px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Menu</h2>
        {restaurant.menu.map((categoria) => (
          <div key={categoria.categoria} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {categoria.categoria}
            </h3>
            <div className="space-y-4">
              {categoria.pratos.map((prato, index) => (
                <div key={index} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{prato.nome}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{prato.descricao}</p>
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    {prato.preco.toLocaleString('pt-AO')} AOA
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4">
        <hr className="border-gray-200 dark:border-gray-800" />
      </div>

      {/* Contacts */}
      <div className="px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Contactos</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#D1302C]">call</span>
            <a href={`tel:${restaurant.contactos.telefone}`} className="text-gray-700 dark:text-gray-300 hover:text-[#D1302C]">
              {restaurant.contactos.telefone}
            </a>
          </div>
          {restaurant.contactos.website && (
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-600">language</span>
              <a
                href={restaurant.contactos.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-[#D1302C]"
              >
                {restaurant.contactos.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {restaurant.contactos.email && (
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">mail</span>
              <a href={`mailto:${restaurant.contactos.email}`} className="text-gray-700 dark:text-gray-300 hover:text-[#D1302C]">
                {restaurant.contactos.email}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="px-4">
        <hr className="border-gray-200 dark:border-gray-800" />
      </div>

      {/* Traveler Tips */}
      {restaurant.dicasViajantes.length > 0 && (
        <>
          <div className="px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Dicas de viajantes</h2>
            <div className="space-y-3">
              {restaurant.dicasViajantes.map((dica, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm italic">"{dica.dica}"</p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                    — {dica.autor}, {dica.origem}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4">
            <hr className="border-gray-200 dark:border-gray-800" />
          </div>
        </>
      )}

      {/* Location and Hours */}
      <div id="localizacao" className="px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Localização e horário</h2>
        <div className="mb-4">
          <Map restaurants={[restaurant]} center={[restaurant.localizacao.coordenadas.latitude, restaurant.localizacao.coordenadas.longitude]} zoom={16} />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${restaurant.localizacao.coordenadas.latitude},${restaurant.localizacao.coordenadas.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 mt-3 text-gray-800 dark:text-gray-200 hover:text-[#D1302C]"
          >
            <span className="material-symbols-outlined mt-0.5">location_on</span>
            <p className="flex-1">{restaurant.localizacao.endereco}</p>
          </a>
        </div>
        <div id="horario">
          <div className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
            <span className="material-symbols-outlined mt-0.5">schedule</span>
            <div className="flex-1">
              <p className="font-bold mb-2">Horário de funcionamento</p>
              <div className="space-y-1 text-sm">
                {Object.entries(restaurant.horario.horarioFuncionamento).map(([dia, horario]) => (
                  <div key={dia} className="flex justify-between">
                    <span className="capitalize">{dia}:</span>
                    <span className={horario === 'encerrado' ? 'text-red-600' : ''}>{horario}</span>
                  </div>
                ))}
              </div>
              {restaurant.horario.observacoes && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {restaurant.horario.observacoes}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <hr className="border-gray-200 dark:border-gray-800" />
      </div>

      {/* Reviews */}
      <div className="px-4 py-8 pb-28">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Avaliações</h2>
        {restaurant.avaliacoes.avaliacoes.map((avaliacao, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full mr-3 bg-[#D1302C]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#D1302C]">person</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{avaliacao.autor}</p>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`material-symbols-outlined text-sm ${
                        i < avaliacao.nota ? 'text-[#F4B32A] fill' : 'text-gray-400'
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{avaliacao.comentario}</p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              {avaliacao.origem} • {new Date(avaliacao.data).toLocaleDateString('pt-PT')}
            </p>
          </div>
        ))}
      </div>

      {/* Related Restaurants */}
      {relatedRestaurants.length > 0 && (
        <>
          <div className="px-4">
            <hr className="border-gray-200 dark:border-gray-800" />
          </div>
          <div className="px-4 py-8 pb-28">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
              Restaurantes semelhantes
            </h2>
            <div className="space-y-4">
              {relatedRestaurants.map((related) => (
                <RestaurantCard key={related.id} restaurant={related} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          {restaurant.contactos.website && (
            <a
              href={restaurant.contactos.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 flex-1 items-center justify-center gap-x-2 rounded-lg bg-[#D1302C] text-white font-bold hover:bg-red-700 transition-colors"
            >
              visitar website
            </a>
          )}
          <a
            href={`tel:${restaurant.contactos.telefone}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-200 dark:bg-gray-800"
          >
            <span className="material-symbols-outlined text-gray-900 dark:text-white">call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
