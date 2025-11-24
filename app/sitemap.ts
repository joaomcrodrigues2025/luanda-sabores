import { MetadataRoute } from 'next';
import { getAllRestaurants, getAllCategories, getAllTags } from '@/lib/restaurants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://luandasabores.ao'; // Alterar para o domínio real

  const restaurants = getAllRestaurants();
  const categories = getAllCategories();
  const tags = getAllTags();

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/restaurantes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mapa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Individual restaurant pages
  const restaurantPages: MetadataRoute.Sitemap = restaurants.map((restaurant) => ({
    url: `${baseUrl}/restaurantes/${restaurant.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categorias/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Tag pages
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...restaurantPages, ...categoryPages, ...tagPages];
}
