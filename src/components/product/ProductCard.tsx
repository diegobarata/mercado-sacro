'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import { formatPrice, calculateInstallment } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/contexts/ToastContext';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorited = isFavorite(product.id);

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}
      className="group relative bg-white rounded-lg border border-border/60 overflow-hidden transition-all duration-200"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant={product.badge}>
            {product.badge === 'promoção' && product.discount
              ? `-${product.discount}%`
              : product.badge}
          </Badge>
        </div>
      )}

      {/* Favorite button */}
      <button
        onClick={() => {
          toggleFavorite(product.id);
          showToast(
            favorited ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
            favorited ? 'info' : 'favorite'
          );
        }}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart
          size={18}
          className={favorited ? 'fill-burgundy text-burgundy' : 'text-text-tertiary'}
        />
      </button>

      {/* Image */}
      <Link href={`/produto/${product.slug}`} className="block aspect-square relative bg-bg-secondary overflow-hidden">
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="relative w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://placehold.co/400x400/F0EBE1/4A4A4A?text=${encodeURIComponent(product.shortName)}`;
              }}
            />
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        {/* Rating */}
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size={14} />

        {/* Name */}
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm font-medium text-text-primary line-clamp-2 hover:text-gold transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="space-y-0.5">
          {product.originalPrice && (
            <p className="text-xs text-text-tertiary line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-lg font-bold text-text-primary">
            {formatPrice(product.price)}
          </p>
          <p className="text-xs text-text-tertiary">
            ou {calculateInstallment(product.price, 6)}
          </p>
        </div>

        {/* Add to cart */}
        <button
          onClick={() => {
            addToCart(product);
            showToast(`${product.shortName} adicionado ao carrinho`, 'cart');
          }}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-gold text-white py-2 rounded-md text-sm font-medium
            hover:bg-gold-hover transition-colors"
        >
          <ShoppingCart size={16} />
          <span>Adicionar</span>
        </button>
      </div>
    </motion.div>
  );
}
