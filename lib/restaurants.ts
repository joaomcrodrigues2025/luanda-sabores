import { Restaurant } from './types';
import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export function getAllRestaurants(): Restaurant[] {
  const fileNames = fs.readdirSync(dataDirectory);
  const restaurants = fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const fullPath = path.join(dataDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(fileContents) as Restaurant;
    });

  return restaurants.sort((a, b) => b.avaliacoes.avaliacao - a.avaliacoes.avaliacao);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  try {
    const fullPath = path.join(dataDirectory, `${id}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents) as Restaurant;
  } catch (error) {
    return undefined;
  }
}

export function getRestaurantsByCategory(category: string): Restaurant[] {
  const allRestaurants = getAllRestaurants();
  return allRestaurants.filter((restaurant) =>
    restaurant.tipoCozinha.some(
      (tipo) => tipo.toLowerCase() === category.toLowerCase()
    )
  );
}

export function getRestaurantsByTag(tag: string): Restaurant[] {
  const allRestaurants = getAllRestaurants();
  return allRestaurants.filter((restaurant) => {
    const allTags = [
      ...restaurant.tipoCozinha,
      ...restaurant.ambiente,
      ...restaurant.seo.tags,
    ].map((t) => t.toLowerCase());
    return allTags.includes(tag.toLowerCase());
  });
}

export function getAllCategories(): string[] {
  const allRestaurants = getAllRestaurants();
  const categories = new Set<string>();

  allRestaurants.forEach((restaurant) => {
    restaurant.tipoCozinha.forEach((tipo) => categories.add(tipo));
  });

  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const allRestaurants = getAllRestaurants();
  const tags = new Set<string>();

  allRestaurants.forEach((restaurant) => {
    restaurant.tipoCozinha.forEach((tag) => tags.add(tag));
    restaurant.ambiente.forEach((tag) => tags.add(tag));
    restaurant.seo.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function searchRestaurants(query: string): Restaurant[] {
  const allRestaurants = getAllRestaurants();
  const lowerQuery = query.toLowerCase();

  return allRestaurants.filter((restaurant) => {
    return (
      restaurant.nome.toLowerCase().includes(lowerQuery) ||
      restaurant.descricao.toLowerCase().includes(lowerQuery) ||
      restaurant.tipoCozinha.some((tipo) =>
        tipo.toLowerCase().includes(lowerQuery)
      ) ||
      restaurant.especialidades.some((esp) =>
        esp.toLowerCase().includes(lowerQuery)
      )
    );
  });
}

export function filterRestaurants(filters: {
  categoria?: string;
  precoMin?: number;
  precoMax?: number;
  avaliacaoMin?: number;
  caracteristicas?: string[];
}): Restaurant[] {
  let restaurants = getAllRestaurants();

  if (filters.categoria) {
    restaurants = restaurants.filter((r) =>
      r.tipoCozinha.some(
        (tipo) => tipo.toLowerCase() === filters.categoria?.toLowerCase()
      )
    );
  }

  if (filters.precoMin !== undefined) {
    restaurants = restaurants.filter(
      (r) => r.precos.faixaPreco >= filters.precoMin!
    );
  }

  if (filters.precoMax !== undefined) {
    restaurants = restaurants.filter(
      (r) => r.precos.faixaPreco <= filters.precoMax!
    );
  }

  if (filters.avaliacaoMin !== undefined) {
    restaurants = restaurants.filter(
      (r) => r.avaliacoes.avaliacao >= filters.avaliacaoMin!
    );
  }

  if (filters.caracteristicas && filters.caracteristicas.length > 0) {
    restaurants = restaurants.filter((r) => {
      return filters.caracteristicas!.every((caracteristica) => {
        return (r.caracteristicas as any)[caracteristica] === true;
      });
    });
  }

  return restaurants;
}

export function getRelatedRestaurants(
  restaurantId: string,
  limit: number = 3
): Restaurant[] {
  const restaurant = getRestaurantById(restaurantId);
  if (!restaurant) return [];

  const allRestaurants = getAllRestaurants().filter((r) => r.id !== restaurantId);

  // Pontuar restaurantes por semelhança
  const scored = allRestaurants.map((r) => {
    let score = 0;

    // Mesma categoria de cozinha
    r.tipoCozinha.forEach((tipo) => {
      if (restaurant.tipoCozinha.includes(tipo)) score += 3;
    });

    // Mesmo ambiente
    r.ambiente.forEach((amb) => {
      if (restaurant.ambiente.includes(amb)) score += 2;
    });

    // Faixa de preço similar
    if (Math.abs(r.precos.faixaPreco - restaurant.precos.faixaPreco) <= 1) {
      score += 1;
    }

    return { restaurant: r, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.restaurant);
}
