'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import Button from '@/components/ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-gold" />
                <h2 className="text-lg font-heading font-bold text-text-primary">
                  Carrinho
                </h2>
                {totalItems > 0 && (
                  <span className="bg-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-bg-secondary rounded-md transition-colors"
                aria-label="Fechar carrinho"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free shipping progress */}
            {totalItems > 0 && (
              <div className="px-5 py-3 bg-bg-secondary/50">
                {remaining > 0 ? (
                  <p className="text-xs text-text-secondary mb-1.5">
                    Faltam <strong className="text-gold">{formatPrice(remaining)}</strong> para frete grátis
                  </p>
                ) : (
                  <p className="text-xs text-sacred-green font-medium mb-1.5">
                    🎉 Você ganhou frete grátis!
                  </p>
                )}
                <div className="w-full h-1.5 bg-border/60 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-5 text-center">
                  <div className="w-20 h-20 rounded-full bg-bg-secondary flex items-center justify-center mb-4">
                    <ShoppingCart size={32} className="text-text-tertiary" />
                  </div>
                  <p className="text-text-secondary text-sm mb-4">Seu carrinho está vazio</p>
                  <Button variant="outline" size="sm" onClick={onClose}>
                    Continuar comprando
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border/40">
                  <AnimatePresence mode="popLayout">
                    {state.items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, x: 80, transition: { duration: 0.2 } }}
                        className="px-5 py-4 flex gap-3"
                      >
                        {/* Thumbnail */}
                        <Link
                          href={`/produto/${item.product.slug}`}
                          onClick={onClose}
                          className="flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden bg-bg-secondary"
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-contain p-1.5"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://placehold.co/160x160/F0EBE1/4A4A4A?text=${encodeURIComponent(item.product.shortName)}`;
                            }}
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/produto/${item.product.slug}`}
                            onClick={onClose}
                          >
                            <h3 className="text-sm font-medium text-text-primary line-clamp-2 hover:text-gold transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>

                          <p className="text-base font-bold text-text-primary mt-1">
                            {formatPrice(item.product.price)}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity */}
                            <div className="flex items-center border border-border rounded-md">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-bg-secondary transition-colors rounded-l-md disabled:opacity-40"
                                disabled={item.quantity <= 1}
                                aria-label="Diminuir"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-xs font-medium tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-bg-secondary transition-colors rounded-r-md disabled:opacity-40"
                                disabled={item.quantity >= item.product.stockQuantity}
                                aria-label="Aumentar"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 text-text-tertiary hover:text-error transition-colors"
                              aria-label="Remover"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-border/60 px-5 py-4 space-y-3 bg-white">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-semibold text-text-primary">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-text-tertiary">
                  Frete e descontos calculados no carrinho
                </p>

                <Link href="/carrinho" onClick={onClose}>
                  <Button fullWidth size="lg">
                    Ver Carrinho
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
