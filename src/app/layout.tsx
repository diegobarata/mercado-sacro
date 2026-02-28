import type { Metadata } from 'next';
import { Inter, Merriweather, Cinzel, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Mercado Sacro — Artigos Religiosos Católicos',
    template: '%s | Mercado Sacro',
  },
  description:
    'Tudo para sua fé, num só lugar. Terços, crucifixos, bíblias, imagens sacras e muito mais com os melhores preços e entrega para todo o Brasil.',
  keywords: [
    'artigos religiosos',
    'loja católica',
    'terços',
    'crucifixos',
    'bíblias',
    'imagens sacras',
    'presentes católicos',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${merriweather.variable} ${cinzel.variable} ${cormorant.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
