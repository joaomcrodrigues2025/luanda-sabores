import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "luanda sabores - restaurantes na ilha de luanda",
  description: "descubra os melhores restaurantes da ilha de luanda. marisco fresco, cozinha internacional, angolana e muito mais. o seu guia definitivo para comer bem em luanda.",
  keywords: "restaurantes luanda, ilha de luanda, marisco luanda, cozinha angolana, restaurantes angola, comer em luanda",
  openGraph: {
    title: "luanda sabores - restaurantes na ilha de luanda",
    description: "descubra os melhores restaurantes da ilha de luanda",
    images: [
      {
        url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
        width: 1200,
        height: 630,
        alt: "restaurantes na ilha de luanda"
      }
    ],
    locale: "pt_PT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${plusJakarta.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
