'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { NAVIGATION_CATEGORIES } from '@/lib/constants';
import SearchBar from './SearchBar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          {/* Menu panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-logo text-lg font-bold tracking-wider text-accent-primary">
                MERCADO SACRO
              </span>
              <button onClick={onClose} className="p-1 hover:bg-bg-secondary rounded-lg" aria-label="Fechar menu">
                <X size={24} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4">
              <SearchBar />
            </div>

            {/* Navigation */}
            <nav className="px-2">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
              >
                <Home size={20} />
                <span className="font-medium">Início</span>
              </Link>

              <div className="mt-2">
                <p className="px-4 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Categorias
                </p>
                {NAVIGATION_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categoria/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-3 text-text-secondary hover:bg-bg-secondary rounded-lg transition-colors"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight size={16} className="text-text-tertiary" />
                  </Link>
                ))}
              </div>

              <div className="mt-4 border-t border-border pt-4 px-4 space-y-3">
                <Link
                  href="/sobre"
                  onClick={onClose}
                  className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Sobre nós
                </Link>
                <Link
                  href="/contato"
                  onClick={onClose}
                  className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Contato
                </Link>
                <Link
                  href="/faq"
                  onClick={onClose}
                  className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  FAQ
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
