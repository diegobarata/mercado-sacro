'use client';

import { Search } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export default function SearchBar({ className, placeholder = 'Buscar artigos religiosos...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-white pl-4 pr-12 py-2.5 text-sm text-text-primary
            placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent
            transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-accent-primary text-white p-2 rounded-md hover:bg-accent-primary-hover transition-colors"
          aria-label="Buscar"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
}
