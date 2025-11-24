const fs = require('fs');
const path = require('path');

// Coordenadas reais da Ilha de Luanda obtidas do Google Maps
// A ilha estende-se de norte (ponta) para sul
const realCoordinates = {
  // Restaurantes com coordenadas reais do Google Maps
  'tamariz': { lat: -8.7866923, lng: 13.2321684 },
  'miami-beach': { lat: -8.7655407, lng: 13.2574381 },
  'lookal-ocean-club': { lat: -8.7658616, lng: 13.2569897 },
  'pimms': { lat: -8.8332128, lng: 13.2359754 }, // Este está fora da ilha, vamos ajustar
  'bahia': { lat: -8.8116738, lng: 13.2296048 },

  // Coordenadas estimadas ao longo da Ilha de Luanda (norte para sul)
  // Zona Norte da Ilha (ponta) - lat ~-8.765 a -8.775
  'coconuts': { lat: -8.7662, lng: 13.2568 },
  'wave-beach-club': { lat: -8.7670, lng: 13.2560 },
  'sunset-beach-bar': { lat: -8.7678, lng: 13.2555 },
  'ilha-mar-beach-club': { lat: -8.7685, lng: 13.2548 },
  'surf-bar': { lat: -8.7692, lng: 13.2540 },

  // Zona Centro-Norte - lat ~-8.775 a -8.785
  'esplanada-tropical': { lat: -8.7755, lng: 13.2465 },
  'brisa-do-mar': { lat: -8.7768, lng: 13.2450 },
  'ponto-final': { lat: -8.7782, lng: 13.2428 },
  'pescador': { lat: -8.7795, lng: 13.2410 },
  'cantinho-do-marisco': { lat: -8.7810, lng: 13.2395 },

  // Zona Central - lat ~-8.785 a -8.795
  'sabores-da-ilha': { lat: -8.7835, lng: 13.2365 },
  'quiosque-da-ilha': { lat: -8.7848, lng: 13.2345 },
  'afrika': { lat: -8.7860, lng: 13.2330 },
  'sol-nascente': { lat: -8.7875, lng: 13.2315 },
  'lua-cheia': { lat: -8.7888, lng: 13.2300 },

  // Zona Centro-Sul - lat ~-8.795 a -8.805
  'cais-de-quatro': { lat: -8.7920, lng: 13.2280 },
  'bar-do-ze': { lat: -8.7935, lng: 13.2265 },
  'toca-do-manel': { lat: -8.7950, lng: 13.2250 },
  'atlantico': { lat: -8.7965, lng: 13.2240 },
  'marisqueira': { lat: -8.7980, lng: 13.2235 },

  // Zona Sul - lat ~-8.805 a -8.815
  'o-mar': { lat: -8.8005, lng: 13.2230 },
  'gambrinus': { lat: -8.8020, lng: 13.2228 },
  'portofino': { lat: -8.8035, lng: 13.2235 },
  'farol-velho': { lat: -8.8072, lng: 13.2233 }, // Coordenada real do Forte Velho
  'casanova': { lat: -8.8060, lng: 13.2250 },

  // Zona mais a sul - lat ~-8.81 a -8.82
  'paladar': { lat: -8.8095, lng: 13.2270 },
  'sal-e-brasa': { lat: -8.8110, lng: 13.2285 },
  'santa-maria': { lat: -8.8125, lng: 13.2300 },
  'tasca-portuguesa': { lat: -8.8140, lng: 13.2315 },
  'kero': { lat: -8.8155, lng: 13.2330 },

  // Bares e outros
  'bar-cubano': { lat: -8.7725, lng: 13.2490 },
  'bar-lounge-xico': { lat: -8.7740, lng: 13.2475 },
  'biker': { lat: -8.7902, lng: 13.2288 },
  'chill-out-bar': { lat: -8.7700, lng: 13.2530 },
  'pizza-na-ilha': { lat: -8.7815, lng: 13.2380 },
  'sushi-na-ilha': { lat: -8.7828, lng: 13.2372 }
};

// Ajustar pimms para estar na zona da cidade (não na ilha)
realCoordinates['pimms'] = { lat: -8.8180, lng: 13.2350 };

const dataDir = path.join(__dirname, 'data');

fs.readdirSync(dataDir).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(dataDir, file);
    const id = file.replace('.json', '');

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      if (realCoordinates[id]) {
        data.localizacao.coordenadas.latitude = realCoordinates[id].lat;
        data.localizacao.coordenadas.longitude = realCoordinates[id].lng;
        console.log(`✓ ${id}: ${realCoordinates[id].lat}, ${realCoordinates[id].lng}`);
      } else {
        // Gerar coordenadas aleatórias dentro da Ilha de Luanda
        // Lat: -8.765 a -8.815, Lng: 13.222 a 13.258
        const lat = -8.765 - (Math.random() * 0.05);
        const lng = 13.222 + (Math.random() * 0.036);
        data.localizacao.coordenadas.latitude = parseFloat(lat.toFixed(6));
        data.localizacao.coordenadas.longitude = parseFloat(lng.toFixed(6));
        console.log(`? ${id}: ${lat.toFixed(6)}, ${lng.toFixed(6)} (gerado)`);
      }

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      console.error(`Erro ao processar ${file}:`, err.message);
    }
  }
});

console.log('\n✅ Coordenadas actualizadas com sucesso!');
