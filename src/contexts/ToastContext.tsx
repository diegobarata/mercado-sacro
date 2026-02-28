'use client';

import { createContext, useContext, useCallback, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, X, AlertTriangle, Info, Heart, ShoppingCart } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'cart' | 'favorite';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const icons = {
  success: CheckCircle,
  error: X,
  warning: AlertTriangle,
  info: Info,
  cart: ShoppingCart,
  favorite: Heart,
};

const styles: Record<ToastType, string> = {
  success: 'bg-sacred-green text-white',
  error: 'bg-error text-white',
  warning: 'bg-warning text-white',
  info: 'bg-gold text-white',
  cart: 'bg-sacred-green text-white',
  favorite: 'bg-burgundy text-white',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg pointer-events-auto ${styles[toast.type]}`}
              >
                <Icon size={18} className={toast.type === 'favorite' ? 'fill-current' : ''} />
                <span className="text-sm font-medium flex-1">{toast.message}</span>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="hover:opacity-70 transition-opacity flex-shrink-0"
                  aria-label="Fechar"
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
