import HeroBanner from '@/components/home/HeroBanner';
import CategoryIcons from '@/components/home/CategoryIcons';
import ProductCarousel from '@/components/home/ProductCarousel';
import SecondaryBanner from '@/components/home/SecondaryBanner';
import ProductGrid from '@/components/home/ProductGrid';
import BenefitsBar from '@/components/home/BenefitsBar';
import Newsletter from '@/components/home/Newsletter';
import { products, getBestSellers, getProductsByCategory } from '@/data/products';

export default function HomePage() {
  const bestSellers = getBestSellers();
  const tercos = getProductsByCategory('tercos');
  const biblias = getProductsByCategory('biblias');
  const crucifixos = getProductsByCategory('crucifixos');

  // "Recommended" - featured products
  const recommended = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      {/* SEÇÃO 1: Hero Banner Carousel */}
      <HeroBanner />

      {/* SEÇÃO 2: Category Icons */}
      <CategoryIcons />

      {/* SEÇÃO 3: Best Sellers */}
      <ProductCarousel
        title="Mais Vendidos"
        products={bestSellers}
        viewAllLink="/categoria/promocoes"
        viewAllLabel="Ver todos →"
      />

      {/* SEÇÃO 4A: Terços */}
      <ProductCarousel
        title="Terços"
        products={tercos}
        viewAllLink="/categoria/tercos"
        viewAllLabel="Ver todos →"
      />

      {/* SEÇÃO 5: Secondary Banner */}
      <SecondaryBanner
        title="Presentes para Primeira Comunhão"
        subtitle="Kits especiais com terço, Bíblia e vela personalizável. A partir de R$145."
        cta="Ver Presentes"
        ctaLink="/categoria/presentes"
      />

      {/* SEÇÃO 4B: Bíblias */}
      <ProductCarousel
        title="Bíblias & Missais"
        products={biblias}
        viewAllLink="/categoria/biblias"
        viewAllLabel="Ver todos →"
      />

      {/* SEÇÃO 4C: Crucifixos */}
      <ProductCarousel
        title="Crucifixos"
        products={crucifixos}
        viewAllLink="/categoria/crucifixos"
        viewAllLabel="Ver todos →"
      />

      {/* SEÇÃO 6: Recommended Products Grid */}
      <ProductGrid
        title="Você também pode gostar"
        products={recommended}
      />

      {/* SEÇÃO 7: Benefits Bar */}
      <BenefitsBar />

      {/* SEÇÃO 8: Newsletter */}
      <Newsletter />
    </>
  );
}
