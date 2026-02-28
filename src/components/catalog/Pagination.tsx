'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

function getPageNumbers(current: number, total: number): (number | 'dots')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'dots')[] = [1];

  if (current > 3) {
    pages.push('dots');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('dots');
  }

  pages.push(total);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onLoadMore,
  hasMore,
}: PaginationProps) {
  if (totalPages <= 1 && !hasMore) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Numbered pagination */}
      {totalPages > 1 && (
        <nav aria-label="Paginação" className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              'p-2 rounded-md transition-colors',
              currentPage === 1
                ? 'text-text-tertiary/40 cursor-not-allowed'
                : 'text-text-secondary hover:bg-bg-secondary hover:text-gold'
            )}
            aria-label="Página anterior"
          >
            <ChevronLeft size={18} />
          </button>

          {pages.map((page, i) =>
            page === 'dots' ? (
              <span key={`dots-${i}`} className="px-1 text-text-tertiary">
                <MoreHorizontal size={16} />
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  'min-w-[36px] h-9 rounded-md text-sm font-medium transition-colors',
                  page === currentPage
                    ? 'bg-gold text-white'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-gold'
                )}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              'p-2 rounded-md transition-colors',
              currentPage === totalPages
                ? 'text-text-tertiary/40 cursor-not-allowed'
                : 'text-text-secondary hover:bg-bg-secondary hover:text-gold'
            )}
            aria-label="Próxima página"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      )}

      {/* Load more button (hybrid) */}
      {hasMore && onLoadMore && (
        <button
          onClick={onLoadMore}
          className="px-6 py-2.5 border border-gold text-gold rounded-md text-sm font-medium hover:bg-gold hover:text-white transition-colors"
        >
          Carregar mais produtos
        </button>
      )}
    </div>
  );
}
