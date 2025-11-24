# luanda sabores - diretório de restaurantes da ilha de luanda

site NextJS completo para explorar os melhores restaurantes da ilha de luanda, angola.

## características

### páginas geradas (296 páginas estáticas)

- **homepage** - hero com busca e restaurantes em destaque
- **40 páginas de restaurantes individuais** - detalhes completos de cada restaurante
- **61 páginas de categorias** - filtradas por tipo de cozinha
- **186 páginas de tags** - filtradas por características e ambiente
- **página de listagem** - todos os restaurantes com pesquisa e filtros
- **página de mapa** - mapa interactivo com leaflet
- **sitemap.xml** - SEO optimizado
- **robots.txt** - configurado para motores de busca

### funcionalidades

- pesquisa em tempo real por nome, tipo de cozinha e especialidades
- filtros por categoria de cozinha
- mapa interactivo com todos os restaurantes (leaflet)
- páginas de detalhes com:
  - galeria de imagens
  - menu completo com preços em AOA
  - horário de funcionamento
  - informações de contacto
  - localização com mapa
  - dicas de segurança
  - informação de estacionamento
  - dicas de viajantes
  - avaliações de clientes
  - restaurantes relacionados
- design responsivo (mobile-first)
- dark mode
- SEO optimizado com meta tags dinâmicas

## tecnologias

- **NextJS 14** com App Router
- **TypeScript**
- **Tailwind CSS**
- **Leaflet** (react-leaflet) para mapas
- **next-seo** para otimização SEO
- **Plus Jakarta Sans** font

## estrutura do projeto

```
luanda-sabores/
├── app/
│   ├── layout.tsx (layout principal com header)
│   ├── page.tsx (homepage)
│   ├── restaurantes/
│   │   ├── page.tsx (lista de restaurantes)
│   │   ├── RestaurantesPageClient.tsx (componente client)
│   │   └── [slug]/page.tsx (detalhes do restaurante)
│   ├── categorias/[categoria]/page.tsx (páginas de categoria)
│   ├── tags/[tag]/page.tsx (páginas de tags)
│   ├── mapa/page.tsx (mapa interactivo)
│   ├── api/restaurants/route.ts (API para dados)
│   ├── sitemap.ts (geração de sitemap)
│   ├── robots.ts (robots.txt)
│   └── not-found.tsx (página 404)
├── components/
│   ├── Header.tsx
│   ├── RestaurantCard.tsx
│   ├── SearchBar.tsx
│   └── Map.tsx (mapa leaflet)
├── lib/
│   ├── types.ts (tipos TypeScript)
│   └── restaurants.ts (funções de dados)
├── data/
│   └── *.json (40 ficheiros de restaurantes)
└── public/
```

## instalação e execução

### 1. instalar dependências

```bash
npm install
```

### 2. executar em desenvolvimento

```bash
npm run dev
```

aceder a: http://localhost:3000

### 3. build para produção

```bash
npm run build
```

### 4. executar versão de produção

```bash
npm start
```

## dados

os dados dos restaurantes estão em ficheiros JSON individuais na pasta `/data/`. cada restaurante tem:

- informações básicas (nome, descrição, localização)
- contactos (telefone, email, website, redes sociais)
- tipo de cozinha e especialidades
- preços (faixa de preço, preço médio em AOA)
- menu completo com categorias e preços
- horário de funcionamento
- avaliações e número de avaliações
- estacionamento
- dicas de segurança
- dicas de viajantes
- características (wifi, ar condicionado, vista mar, etc.)
- imagens
- meta tags SEO

## SEO

todas as páginas têm:

- títulos únicos optimizados
- meta descriptions convincentes
- keywords relevantes
- open graph tags
- schema.org markup (nas páginas de restaurantes)
- sitemap.xml gerado dinamicamente
- robots.txt configurado

### exemplos de títulos SEO:

- homepage: "luanda sabores - restaurantes na ilha de luanda"
- restaurante: "cais de quatro - restaurante de marisco na ilha de luanda | vista mar"
- categoria: "melhores restaurantes de marisco na ilha de luanda - 25 opções"
- tag: "restaurantes românticos na ilha de luanda - 18 opções"

## deployment

### vercel (recomendado)

```bash
npm install -g vercel
vercel
```

ou conectar o repositório GitHub à vercel.

### digital ocean app platform

1. criar novo app
2. conectar repositório git
3. selecionar branch
4. build command: `npm run build`
5. run command: `npm start`

### netlify

1. conectar repositório
2. build command: `npm run build`
3. publish directory: `.next`

## personalização

### alterar cores

editar `/app/globals.css`:

```css
:root {
  --primary: #F4B32A; /* amarelo primário */
  --accent-red: #D1302C; /* vermelho accent */
  --accent-black: #000000; /* preto */
  --background-light: #FFFFFF;
  --background-dark: #1A1A1A;
}
```

### alterar domínio no sitemap

editar `/app/sitemap.ts` e `/app/robots.ts`:

```typescript
const baseUrl = 'https://seudominio.ao';
```

## estatísticas do site

- **40 restaurantes**
- **61 categorias de cozinha**
- **186 tags únicas**
- **296 páginas estáticas geradas**
- **tempo de build: ~37 segundos**

## licença

MIT

---

desenvolvido com NextJS, TypeScript e Tailwind CSS.
dados de restaurantes da ilha de luanda, angola.
