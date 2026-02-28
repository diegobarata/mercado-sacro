import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center gap-1 text-sm text-text-tertiary flex-wrap">
        <li>
          <Link href="/" className="flex items-center hover:text-accent-primary transition-colors">
            <Home size={14} />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight size={14} />
            {item.href ? (
              <Link href={item.href} className="hover:text-accent-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-secondary font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
