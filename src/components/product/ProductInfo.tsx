'use client';

import { useState } from 'react';
import { ShoppingCart, Zap, Heart, Truck, ShieldCheck, RotateCcw, Minus, Plus } from 'lucide-react';
import { formatPrice, calculateInstallment, calculatePixPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { MAX_INSTALLMENTS, PIX_DISCOUNT_PERCENT, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import type { Product } from '@/types';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const pixPrice = calculatePixPrice(product.price);
  const installmentText = calculateInstallment(product.price, MAX_INSTALLMENTS);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="space-y-5">
      {/* Badge */}
      {product.badge && (
        <div>
          <Badge variant={product.badge}>
            {product.badge === 'promoção' && product.discount
              ? `-${product.discount}%`
              : product.badge}
          </Badge>
        </div>
      )}

      {/* Name */}
      <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-text-primary leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <StarRating rating={product.rating} size={18} />
        <a href="#avaliacoes" className="text-sm text-accent-primary hover:underline">
          Ver {product.reviewCount} avaliações
        </a>
      </div>

      {/* Price block */}
      <div className="bg-bg-secondary rounded-lg p-4 space-y-2">
        {product.originalPrice && (
          <p className="text-sm text-text-tertiary line-through">
            De {formatPrice(product.originalPrice)}
          </p>
        )}
        <p className="text-3xl font-bold text-text-primary">
          {formatPrice(product.price)}
        </p>
        <p className="text-sm text-text-secondary">
          ou {installmentText} sem juros
        </p>
        <div className="flex items-center gap-2">
          <span className="bg-success/10 text-success text-xs font-semibold px-2 py-0.5 rounded">
            PIX
          </span>
          <span className="text-sm text-success font-medium">
            {formatPrice(pixPrice)} no Pix ({PIX_DISCOUNT_PERCENT}% off)
          </span>
        </div>
      </div>

      {/* Short description */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {product.description}
      </p>

      {/* Color / Sizes Options */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <p className="text-sm font-medium text-text-primary mb-2">Cor:</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className="px-3 py-1.5 border border-border rounded-md text-sm text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors"
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <p className="text-sm font-medium text-text-primary mb-2">Tamanho:</p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className="px-3 py-1.5 border border-border rounded-md text-sm text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="text-sm font-medium text-text-primary mb-2">Quantidade:</p>
        <div className="flex items-center gap-0 border border-border rounded-md w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2 hover:bg-bg-secondary transition-colors text-text-secondary"
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center text-sm font-medium text-text-primary">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
            className="p-2 hover:bg-bg-secondary transition-colors text-text-secondary"
            disabled={quantity >= product.stockQuantity}
          >
            <Plus size={16} />
          </button>
        </div>
        {product.stockQuantity <= 5 && product.inStock && (
          <p className="text-xs text-sale mt-1">
            Apenas {product.stockQuantity} em estoque!
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-2 bg-accent-primary text-white py-3.5 rounded-md text-base font-semibold hover:bg-accent-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap size={18} />
          COMPRAR AGORA
        </button>
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-2 border-2 border-accent-primary text-accent-primary py-3 rounded-md text-sm font-medium hover:bg-accent-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={18} />
          Adicionar ao Carrinho
        </button>
        <button
          onClick={() => toggleFavorite(product.id)}
          className="w-full flex items-center justify-center gap-2 border border-border py-2.5 rounded-md text-sm text-text-secondary hover:border-sale hover:text-sale transition-colors"
        >
          <Heart size={16} className={favorited ? 'fill-sale text-sale' : ''} />
          {favorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </button>
      </div>

      {/* CEP calculator */}
      <div className="border border-border rounded-lg p-4">
        <p className="text-sm font-medium text-text-primary mb-2">Calcular frete:</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
            className="flex-1 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary"
          />
          <button className="px-4 py-2 bg-bg-secondary text-text-primary rounded-md text-sm font-medium hover:bg-bg-tertiary transition-colors">
            Calcular
          </button>
        </div>
        {product.price >= FREE_SHIPPING_THRESHOLD && (
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <Truck size={14} />
            Frete grátis para este produto!
          </p>
        )}
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <ShieldCheck size={20} className="text-accent-primary" />
          <span className="text-xs text-text-secondary">Compra segura</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <Truck size={20} className="text-accent-primary" />
          <span className="text-xs text-text-secondary">Produto original</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <RotateCcw size={20} className="text-accent-primary" />
          <span className="text-xs text-text-secondary">Devolução grátis</span>
        </div>
      </div>
    </div>
  );
}
