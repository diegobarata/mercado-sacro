'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductBySlug, getProductsByCategory, products } from '@/data/products';
import { getReviewsByProduct } from '@/data/reviews';
import { categories } from '@/data/categories';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = getProductBySlug(slug);

  const reviews = useMemo(
    () => (product ? getReviewsByProduct(product.id) : []),
    [product]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCategory = getProductsByCategory(product.categorySlug)
      .filter((p) => p.id !== product.id);
    if (sameCategory.length >= 6) return sameCategory.slice(0, 6);
    // Fill with other products if not enough
    const others = products
      .filter((p) => p.id !== product.id && p.categorySlug !== product.categorySlug)
      .slice(0, 6 - sameCategory.length);
    return [...sameCategory, ...others];
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            Produto não encontrado
          </h1>
          <p className="text-text-secondary">
            O produto que você procura não está disponível.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-accent-primary text-white rounded-md text-sm font-medium hover:bg-accent-primary-hover transition-colors"
          >
            Voltar à loja
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === product.categorySlug);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            ...(category
              ? [{ label: category.name, href: `/categoria/${category.slug}` }]
              : []),
            { label: product.shortName },
          ]}
        />

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 pb-8">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-border">
          <ProductTabs product={product} reviews={reviews} />
        </div>

        {/* Related Products */}
        <div className="border-t border-border">
          <RelatedProducts products={relatedProducts} />
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
