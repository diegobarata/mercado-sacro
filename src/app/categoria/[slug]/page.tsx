'use client';

import { useState, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutGrid, List } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import FilterSidebar, { type FilterState } from '@/components/catalog/FilterSidebar';
import MobileFilterSheet from '@/components/catalog/MobileFilterSheet';
import SortDropdown, { type SortOption } from '@/components/catalog/SortDropdown';
import Pagination from '@/components/catalog/Pagination';
import { products, getProductsByCategory } from '@/data/products';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const PRODUCTS_PER_PAGE = 12;

function getAllMaterials(prods: typeof products): string[] {
  const set = new Set<string>();
  prods.forEach((p) => p.materials.forEach((m) => set.add(m)));
  return Array.from(set).sort();
}

function getPriceRange(prods: typeof products) {
  if (prods.length === 0) return { min: 0, max: 1000 };
  const prices = prods.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = slug === 'promocoes'
    ? products.filter((p) => p.discount && p.discount > 0)
    : getProductsByCategory(slug);

  const allMaterials = useMemo(() => getAllMaterials(categoryProducts), [categoryProducts]);
  const priceRange = useMemo(() => getPriceRange(categoryProducts), [categoryProducts]);

  const [sort, setSort] = useState<SortOption>('relevancia');
  const [filters, setFilters] = useState<FilterState>({
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    materials: [],
    ratings: 0,
    inStockOnly: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedExtraPages, setLoadedExtraPages] = useState(0);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Price filter
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);

    // Material filter
    if (filters.materials.length > 0) {
      result = result.filter((p) =>
        p.materials.some((m) => filters.materials.includes(m))
      );
    }

    // Rating filter
    if (filters.ratings > 0) {
      result = result.filter((p) => p.rating >= filters.ratings);
    }

    // In stock filter
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock && p.stockQuantity > 0);
    }

    // Sort
    switch (sort) {
      case 'menor-preco':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'maior-preco':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mais-vendidos':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'mais-recentes':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'melhor-avaliados':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [categoryProducts, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const displayCount = PRODUCTS_PER_PAGE * (currentPage + loadedExtraPages);
  const paginatedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setLoadedExtraPages(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLoadMore = useCallback(() => {
    setLoadedExtraPages((prev) => prev + 1);
  }, []);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setLoadedExtraPages(0);
  }, []);

  const categoryName = category?.name ?? (slug === 'promocoes' ? 'Promoções' : slug);
  const categoryDescription = category?.description ?? '';

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: categoryName }]} />

        {/* Category Header */}
        <div className="pb-6">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
            {categoryName}
          </h1>
          {categoryDescription && (
            <p className="text-text-secondary mt-1.5 text-sm md:text-base max-w-2xl">
              {categoryDescription}
            </p>
          )}
          <p className="text-sm text-text-tertiary mt-2">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                availableMaterials={allMaterials}
                priceRange={priceRange}
                resultCount={filteredProducts.length}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <MobileFilterSheet
                filters={filters}
                onFiltersChange={handleFiltersChange}
                availableMaterials={allMaterials}
                priceRange={priceRange}
                resultCount={filteredProducts.length}
              />
              <div className="ml-auto">
                <SortDropdown value={sort} onChange={setSort} />
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
              >
                {paginatedProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className="text-text-secondary text-lg">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
                <button
                  onClick={() =>
                    handleFiltersChange({
                      priceMin: priceRange.min,
                      priceMax: priceRange.max,
                      materials: [],
                      ratings: 0,
                      inStockOnly: false,
                    })
                  }
                  className="mt-4 text-gold hover:underline text-sm"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
}
