'use client';

import { useEffect, useRef } from 'react';
import { Restaurant } from '@/lib/types';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  restaurants: Restaurant[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export default function Map({
  restaurants,
  center = [-8.7936, 13.2344],
  zoom = 15,
  height = '400px'
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Importar Leaflet dinamicamente no cliente
    import('leaflet').then((L) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current!).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Adicionar marcadores
      restaurants.forEach((restaurant) => {
        const { latitude, longitude } = restaurant.localizacao.coordenadas;

        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: #D1302C; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><span class="material-symbols-outlined" style="color: white; font-size: 20px;">restaurant</span></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        L.marker([latitude, longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: 'Plus Jakarta Sans', sans-serif;">
              <strong style="font-size: 16px; color: #1A1A1A;">${restaurant.nome}</strong><br/>
              <span style="color: #6B6B6B; font-size: 14px;">${restaurant.tipoCozinha.join(' • ')}</span><br/>
              <div style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                <span style="color: #F4B32A; font-size: 14px;">★</span>
                <span style="font-weight: 600; font-size: 14px;">${restaurant.avaliacoes.avaliacao.toFixed(1)}</span>
              </div>
              <a href="/restaurantes/${restaurant.id}" style="color: #D1302C; font-weight: 600; font-size: 14px; margin-top: 8px; display: inline-block;">ver detalhes →</a>
            </div>
          `);
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [restaurants, center, zoom]);

  return <div ref={mapRef} style={{ height, width: '100%' }} className="rounded-lg overflow-hidden" />;
}
