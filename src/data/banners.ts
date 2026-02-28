export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  bgColor: string;
  textColor: string;
  image?: string;
}

export const banners: Banner[] = [
  {
    id: 'banner-1',
    title: 'Tudo para sua fé, num só lugar.',
    subtitle: 'Artigos religiosos com os melhores preços e entrega para todo o Brasil.',
    cta: 'Ver Ofertas',
    ctaLink: '/categoria/promocoes',
    bgColor: '#0D0D0D',
    textColor: '#FFFFFF',
  },
  {
    id: 'banner-2',
    title: 'Presentes para Primeira Comunhão',
    subtitle: 'Kits especiais com terço, Bíblia e vela. A partir de R$145.',
    cta: 'Comprar Agora',
    ctaLink: '/categoria/presentes',
    bgColor: '#1C1C1E',
    textColor: '#FFFFFF',
  },
  {
    id: 'banner-3',
    title: 'Terços em Promoção',
    subtitle: 'De madeira a prata 925 — até 30% de desconto nesta semana.',
    cta: 'Aproveitar',
    ctaLink: '/categoria/tercos',
    bgColor: '#F0EBE1',
    textColor: '#1A1A1A',
  },
  {
    id: 'banner-4',
    title: 'Bíblias de Estudo',
    subtitle: 'Edições especiais para aprofundar sua fé. Parcele em até 12x.',
    cta: 'Conhecer',
    ctaLink: '/categoria/biblias',
    bgColor: '#0D0D0D',
    textColor: '#FFFFFF',
  },
];
