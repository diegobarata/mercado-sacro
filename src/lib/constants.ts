export const SITE_NAME = 'Mercado Sacro';
export const SITE_DESCRIPTION = 'Tudo para sua fé, num só lugar. Artigos religiosos católicos com os melhores preços.';
export const SITE_URL = 'https://mercadosacro.com.br';

export const FREE_SHIPPING_THRESHOLD = 150;
export const MAX_INSTALLMENTS = 12;
export const PIX_DISCOUNT_PERCENT = 5;

export const NAVIGATION_CATEGORIES = [
  { name: 'Terços', slug: 'tercos' },
  { name: 'Crucifixos', slug: 'crucifixos' },
  { name: 'Bíblias', slug: 'biblias' },
  { name: 'Imagens', slug: 'imagens-sacras' },
  { name: 'Velas', slug: 'velas-incenso' },
  { name: 'Presentes', slug: 'presentes' },
  { name: 'Promoções', slug: 'promocoes' },
] as const;

export const BENEFITS = [
  {
    icon: 'Truck',
    title: 'Frete grátis',
    description: 'Acima de R$150',
  },
  {
    icon: 'ShieldCheck',
    title: 'Compra segura',
    description: '100% protegida',
  },
  {
    icon: 'RefreshCw',
    title: 'Troca e devolução',
    description: 'Em até 30 dias',
  },
  {
    icon: 'CreditCard',
    title: 'Até 12x',
    description: 'Sem juros',
  },
] as const;

export const PAYMENT_METHODS = [
  'Visa', 'Mastercard', 'Elo', 'American Express', 'Pix', 'Boleto',
] as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/mercadosacro',
  facebook: 'https://facebook.com/mercadosacro',
  youtube: 'https://youtube.com/mercadosacro',
} as const;
