'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, Tag, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, calculateInstallment, calculatePixPrice } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD, PIX_DISCOUNT_PERCENT, MAX_INSTALLMENTS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ShippingCalculator from '@/components/cart/ShippingCalculator';

const MOCK_COUPONS: Record<string, { discount: number; type: 'percent' | 'fixed'; minValue?: number }> = {
  'SACRO10': { discount: 10, type: 'percent' },
  'SACRO20': { discount: 20, type: 'fixed', minValue: 100 },
  'PRIMEIRA': { discount: 15, type: 'percent', minValue: 50 },
  'FRETE': { discount: 0, type: 'fixed' },
};

export default function CarrinhoPage() {
  const { state, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState<{ code: string; discount: number } | null>(null);
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError('Digite um código de cupom.');
      return;
    }

    const coupon = MOCK_COUPONS[code];
    if (!coupon) {
      setCouponError('Cupom inválido ou expirado.');
      return;
    }

    if (coupon.minValue && subtotal < coupon.minValue) {
      setCouponError(`Valor mínimo de ${formatPrice(coupon.minValue)} para este cupom.`);
      return;
    }

    const discountValue = coupon.type === 'percent'
      ? subtotal * (coupon.discount / 100)
      : coupon.discount;

    setCouponApplied({ code, discount: discountValue });
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCouponInput('');
    setCouponError('');
  };

  const discount = couponApplied?.discount ?? 0;
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = freeShipping ? 0 : (shippingCost ?? 0);
  const total = subtotal - discount + shipping;
  const pixTotal = calculatePixPrice(total, PIX_DISCOUNT_PERCENT);

  const breadcrumbItems = [{ label: 'Carrinho' }];

  if (state.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-bg-secondary flex items-center justify-center">
            <ShoppingCart size={40} className="text-text-tertiary" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Seu carrinho está vazio
          </h1>
          <p className="text-text-secondary mb-8 max-w-md">
            Explore nossos produtos e encontre artigos religiosos perfeitos para você ou para presentear.
          </p>
          <Link href="/">
            <Button size="lg">
              <ArrowLeft size={18} className="mr-2" />
              Continuar comprando
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

        <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mt-4 mb-6">
          Meu Carrinho
          <span className="text-base font-body font-normal text-text-tertiary ml-3">
            ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-1 space-y-4">
            <AnimatePresence mode="popLayout">
              {state.items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                  className="bg-white rounded-lg border border-border/60 p-4 flex gap-4"
                >
                  {/* Image */}
                  <Link
                    href={`/produto/${item.product.slug}`}
                    className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative rounded-md overflow-hidden bg-bg-secondary"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="128px"
                      className="object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/200x200/F0EBE1/4A4A4A?text=${encodeURIComponent(item.product.shortName)}`;
                      }}
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/produto/${item.product.slug}`}>
                        <h3 className="text-sm md:text-base font-medium text-text-primary hover:text-gold transition-colors line-clamp-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex-shrink-0 p-1.5 text-text-tertiary hover:text-error hover:bg-error/10 rounded-md transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Original price if on sale */}
                    {item.product.originalPrice && (
                      <p className="text-xs text-text-tertiary line-through mt-1">
                        {formatPrice(item.product.originalPrice)}
                      </p>
                    )}

                    <p className="text-lg font-bold text-text-primary mt-0.5">
                      {formatPrice(item.product.price)}
                    </p>

                    <p className="text-xs text-text-tertiary">
                      {calculateInstallment(item.product.price, MAX_INSTALLMENTS)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-bg-secondary transition-colors rounded-l-md disabled:opacity-40"
                          disabled={item.quantity <= 1}
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-bg-secondary transition-colors rounded-r-md disabled:opacity-40"
                          disabled={item.quantity >= item.product.stockQuantity}
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-sm text-text-secondary">
                        Subtotal: <strong className="text-text-primary">{formatPrice(item.product.price * item.quantity)}</strong>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-hover transition-colors mt-4"
            >
              <ArrowLeft size={16} />
              Continuar comprando
            </Link>
          </div>

          {/* Order summary sidebar */}
          <aside className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white rounded-lg border border-border/60 p-6 space-y-5 lg:sticky lg:top-36">
              <h2 className="text-lg font-heading font-bold text-text-primary">
                Resumo do Pedido
              </h2>

              {/* Coupon */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Cupom de desconto
                </label>
                {couponApplied ? (
                  <div className="flex items-center justify-between bg-sacred-green/10 border border-sacred-green/30 rounded-md px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-sacred-green" />
                      <span className="text-sm font-medium text-sacred-green">{couponApplied.code}</span>
                      <span className="text-xs text-text-secondary">(-{formatPrice(couponApplied.discount)})</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-text-tertiary hover:text-error transition-colors"
                      aria-label="Remover cupom"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); }}
                      placeholder="Digite seu cupom"
                      className="flex-1 rounded-md border border-border bg-white px-3 py-2 text-sm text-text-primary
                        placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <Button size="sm" variant="outline" onClick={handleApplyCoupon}>
                      Aplicar
                    </Button>
                  </div>
                )}
                {couponError && (
                  <p className="text-xs text-error mt-1">{couponError}</p>
                )}
              </div>

              {/* Shipping */}
              <ShippingCalculator
                subtotal={subtotal}
                freeShipping={freeShipping}
                onShippingChange={setShippingCost}
              />

              {/* Totals */}
              <div className="border-t border-border/60 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal ({totalItems} itens)</span>
                  <span className="text-text-primary">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-sacred-green">Desconto</span>
                    <span className="text-sacred-green">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Frete</span>
                  <span className={freeShipping ? 'text-sacred-green font-medium' : 'text-text-primary'}>
                    {freeShipping ? 'Grátis' : shippingCost !== null ? formatPrice(shipping) : 'Calcular acima'}
                  </span>
                </div>

                {freeShipping && (
                  <p className="text-xs text-sacred-green flex items-center gap-1">
                    <Truck size={12} />
                    Frete grátis para compras acima de {formatPrice(FREE_SHIPPING_THRESHOLD)}
                  </p>
                )}

                <div className="border-t border-border/60 pt-3 mt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-base font-semibold text-text-primary">Total</span>
                    <div className="text-right">
                      <p className="text-xl font-bold text-text-primary">{formatPrice(total)}</p>
                      <p className="text-xs text-text-tertiary">
                        ou {calculateInstallment(total, MAX_INSTALLMENTS)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-sacred-green/10 rounded-md px-3 py-2">
                    <p className="text-sm text-sacred-green font-medium">
                      {formatPrice(pixTotal)} no Pix ({PIX_DISCOUNT_PERCENT}% off)
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button fullWidth size="lg" className="mt-4">
                Finalizar Compra
              </Button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 pt-2 text-text-tertiary">
                <div className="flex items-center gap-1 text-xs">
                  <ShieldCheck size={14} />
                  <span>Compra segura</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <CreditCard size={14} />
                  <span>Até {MAX_INSTALLMENTS}x</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
