'use client';

import Link from 'next/link';
import { Menu, Search, Heart, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import CartDrawer from '@/components/cart/CartDrawer';
import { NAVIGATION_CATEGORIES, FREE_SHIPPING_THRESHOLD, MAX_INSTALLMENTS } from '@/lib/constants';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { state } = useCart();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Top bar */}
      <div className="bg-bg-dark text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 md:justify-between">
          <span>Frete grátis acima de {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
          <span className="hidden md:inline">Parcele em até {MAX_INSTALLMENTS}x sem juros</span>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-30 bg-white border-b border-border/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-14 md:h-16 gap-4">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 hover:bg-bg-secondary rounded-lg transition-colors"
              aria-label="Abrir menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-logo text-lg md:text-xl font-bold tracking-[0.15em] text-gold">
                MERCADO SACRO
              </span>
            </Link>

            {/* Desktop search */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <SearchBar className="w-full" />
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Mobile search toggle */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="lg:hidden p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                aria-label="Buscar"
              >
                <Search size={22} />
              </button>

              {/* Account */}
              <Link
                href="/conta"
                className="hidden md:flex items-center gap-2 p-2 hover:bg-bg-secondary rounded-lg transition-colors text-text-secondary hover:text-text-primary"
              >
                <User size={22} />
                <span className="text-sm hidden lg:inline">Minha conta</span>
              </Link>

              {/* Favorites */}
              <Link
                href="/favoritos"
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors text-text-secondary hover:text-text-primary"
                aria-label="Favoritos"
              >
                <Heart size={22} />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2 hover:bg-bg-secondary rounded-lg transition-colors text-text-secondary hover:text-text-primary"
                aria-label="Carrinho"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-burgundy text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile search bar (expandable) */}
          {mobileSearchOpen && (
            <div className="pb-3 lg:hidden">
              <SearchBar />
            </div>
          )}
        </div>

        {/* Category nav (desktop) */}
        <nav className="hidden lg:block border-t border-border/60 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-1 py-1">
              {NAVIGATION_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="block px-3 py-2 text-sm font-medium text-text-secondary hover:text-gold hover:bg-bg-secondary rounded-md transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Cart drawer */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  );
}
