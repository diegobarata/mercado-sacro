'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, X, AlertTriangle, Info } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: X,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'bg-success text-white',
  error: 'bg-error text-white',
  warning: 'bg-warning text-white',
  info: 'bg-accent-primary text-white',
};

export default function Toast({ message, type = 'success', isVisible, onClose, duration = 3000 }: ToastProps) {
  const Icon = icons[type];

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed top-4 right-4 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg',
            styles[type]
          )}
        >
          <Icon size={20} />
          <span className="text-sm font-medium">{message}</span>
          <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity" aria-label="Fechar">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
