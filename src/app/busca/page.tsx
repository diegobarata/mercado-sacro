'use client';

import { useState, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import FilterSidebar, { type FilterState } from '@/components/catalog/FilterSidebar';
import MobileFilterSheet from '@/components/catalog/MobileFilterSheet';
import SortDropdown, { type SortOption } from '@/components/catalog/SortDropdown';
import Pagination from '@/components/catalog/Pagination';
import { products } from '@/data/products';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const PRODUCTS_PER_PAGE = 12;

function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const normalized = normalizeSearch(query);
    return products.filter((p) => {
      const fields = [
        p.name,
        p.shortName,
        p.description,
        p.category,
        p.categorySlug,
        ...p.materials,
        ...(p.colors || []),
      ].join(' ');
      return normalizeSearch(fields).includes(normalized);
    });
  }, [query]);

  const allMaterials = useMemo(() => {
    const set = new Set<string>();
    searchResults.forEach((p) => p.materials.forEach((m) => set.add(m)));
    return Array.from(set).sort();
  }, [searchResults]);

  const priceRange = useMemo(() => {
    if (searchResults.length === 0) return { min: 0, max: 1000 };
    const prices = searchResults.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [searchResults]);

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
    let result = [...searchResults];

    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);
    if (filters.materials.length > 0) {
      result = result.filter((p) => p.materials.some((m) => filters.materials.includes(m)));
    }
    if (filters.ratings > 0) {
      result = result.filter((p) => p.rating >= filters.ratings);
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock && p.stockQuantity > 0);
    }

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
        break;
    }

    return result;
  }, [searchResults, filters, sort]);

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

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Busca' }]} />

        {/* Search header */}
        <div className="pb-6">
          {query ? (
            <>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
                Resultados para &ldquo;{query}&rdquo;
              </h1>
              <p className="text-sm text-text-tertiary mt-2">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </>
          ) : (
            <div className="text-center py-16">
              <SearchIcon size={48} className="mx-auto text-text-tertiary mb-4" />
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                O que você está procurando?
              </h1>
              <p className="text-text-secondary mt-2">
                Use a barra de busca acima para encontrar produtos.
              </p>
            </div>
          )}
        </div>

        {query && (
          <div className="flex gap-8">
            {/* Desktop sidebar */}
            {searchResults.length > 0 && (
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
            )}

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {searchResults.length > 0 && (
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
              )}

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
                    Nenhum produto encontrado para &ldquo;{query}&rdquo;.
                  </p>
                  <p className="text-text-tertiary mt-2 text-sm">
                    Tente buscar com outros termos ou navegue pelas categorias.
                  </p>
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
              />
            </div>
          </div>
        )}

        <div className="h-12" />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-primary flex items-center justify-center">
          <p className="text-text-tertiary">Carregando...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
