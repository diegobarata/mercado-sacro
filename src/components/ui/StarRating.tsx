import { Star, StarHalf } from 'lucide-react';
import { getStarArray } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
}

export default function StarRating({ rating, reviewCount, size = 16, showCount = true }: StarRatingProps) {
  const stars = getStarArray(rating);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {stars.map((type, i) => {
          if (type === 'full') {
            return <Star key={i} size={size} className="fill-gold text-gold" />;
          }
          if (type === 'half') {
            return <StarHalf key={i} size={size} className="fill-gold text-gold" />;
          }
          return <Star key={i} size={size} className="text-border" />;
        })}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-text-tertiary ml-0.5">({reviewCount})</span>
      )}
    </div>
  );
}
