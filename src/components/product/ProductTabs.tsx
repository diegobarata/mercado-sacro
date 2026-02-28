'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import { ThumbsUp, CheckCircle, Image as ImageIcon } from 'lucide-react';
import type { Product } from '@/types';
import type { Review } from '@/types/review';

interface ProductTabsProps {
  product: Product;
  reviews: Review[];
}

type TabKey = 'descricao' | 'especificacoes' | 'avaliacoes';

export default function ProductTabs({ product, reviews }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('descricao');

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: 'descricao', label: 'Descrição' },
    { key: 'especificacoes', label: 'Especificações' },
    { key: 'avaliacoes', label: 'Avaliações', count: reviews.length },
  ];

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : product.rating;

  // Star distribution
  const starDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.floor(r.rating) === star).length,
    pct: reviews.length > 0
      ? (reviews.filter((r) => Math.floor(r.rating) === star).length / reviews.length) * 100
      : 0,
  }));

  return (
    <div id="avaliacoes">
      {/* Tabs header */}
      <div className="border-b border-border">
        <div className="flex gap-0 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'px-4 md:px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                activeTab === tab.key
                  ? 'border-gold text-gold'
                  : 'border-transparent text-text-tertiary hover:text-text-secondary'
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1 text-xs">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="py-6">
        {/* Description */}
        {activeTab === 'descricao' && (
          <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed">
            <p>{product.longDescription}</p>
            {product.materials.length > 0 && (
              <div className="mt-4">
                <strong className="text-text-primary">Materiais:</strong>{' '}
                {product.materials.join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Specs */}
        {activeTab === 'especificacoes' && (
          <div className="max-w-lg">
            <table className="w-full">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={cn(i % 2 === 0 ? 'bg-bg-secondary' : 'bg-white')}
                  >
                    <td className="px-4 py-2.5 text-sm font-medium text-text-primary w-40">
                      {spec.label}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-text-secondary">
                      {spec.value}
                    </td>
                  </tr>
                ))}
                {product.dimensions && (
                  <tr className={cn(product.specs.length % 2 === 0 ? 'bg-bg-secondary' : 'bg-white')}>
                    <td className="px-4 py-2.5 text-sm font-medium text-text-primary w-40">
                      Dimensões
                    </td>
                    <td className="px-4 py-2.5 text-sm text-text-secondary">
                      {product.dimensions}
                    </td>
                  </tr>
                )}
                {product.weight && (
                  <tr className={cn((product.specs.length + (product.dimensions ? 1 : 0)) % 2 === 0 ? 'bg-bg-secondary' : 'bg-white')}>
                    <td className="px-4 py-2.5 text-sm font-medium text-text-primary w-40">
                      Peso
                    </td>
                    <td className="px-4 py-2.5 text-sm text-text-secondary">
                      {product.weight}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'avaliacoes' && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="flex flex-col sm:flex-row gap-6 p-4 bg-bg-secondary rounded-lg">
              <div className="text-center sm:text-left">
                <p className="text-4xl font-bold text-text-primary">
                  {avgRating.toFixed(1)}
                </p>
                <StarRating rating={avgRating} size={18} />
                <p className="text-xs text-text-tertiary mt-1">
                  {product.reviewCount} avaliações
                </p>
              </div>
              <div className="flex-1 space-y-1.5">
                {starDist.map((d) => (
                  <div key={d.star} className="flex items-center gap-2">
                    <span className="text-xs text-text-secondary w-8">{d.star}★</span>
                    <div className="flex-1 h-2 bg-gold-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-warning rounded-full transition-all"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-tertiary w-8">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review list */}
            {reviews.length > 0 ? (
              <div className="divide-y divide-border">
                {reviews.map((review) => (
                  <div key={review.id} className="py-4 first:pt-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-text-primary">
                            {review.userName}
                          </span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-xs text-success">
                              <CheckCircle size={12} />
                              Compra verificada
                            </span>
                          )}
                        </div>
                        <StarRating rating={review.rating} size={14} />
                      </div>
                      <span className="text-xs text-text-tertiary">
                        {new Date(review.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-text-primary mb-1">
                      {review.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {review.comment}
                    </p>
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {review.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="w-16 h-16 bg-bg-secondary rounded-md flex items-center justify-center"
                          >
                            <ImageIcon size={16} className="text-text-tertiary" />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2">
                      <button className="flex items-center gap-1 text-xs text-text-tertiary hover:text-gold transition-colors">
                        <ThumbsUp size={12} />
                        Útil ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-text-tertiary py-8">
                Este produto ainda não possui avaliações.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
