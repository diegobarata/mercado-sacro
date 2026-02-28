'use client';

import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useFavorites } from '@/contexts/FavoritesContext';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function FavoritosPage() {
  const { favorites, clearFavorites } = useFavorites();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const breadcrumbItems = [{ label: 'Favoritos' }];

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-bg-secondary flex items-center justify-center">
            <Heart size={40} className="text-text-tertiary" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Nenhum favorito ainda
          </h1>
          <p className="text-text-secondary mb-8 max-w-md">
            Explore nossos produtos e clique no coração para salvar seus artigos favoritos.
          </p>
          <Link href="/">
            <Button size="lg">
              <ArrowLeft size={18} className="mr-2" />
              Explorar produtos
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between mt-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
            Meus Favoritos
            <span className="text-base font-body font-normal text-text-tertiary ml-3">
              ({favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'itens'})
            </span>
          </h1>
          <button
            onClick={clearFavorites}
            className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-error transition-colors"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">Limpar tudo</span>
          </button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {favoriteProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-hover transition-colors"
          >
            <ArrowLeft size={16} />
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
