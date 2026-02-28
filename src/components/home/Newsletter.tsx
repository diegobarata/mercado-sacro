'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-accent-primary py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
          Receba novidades e ofertas exclusivas
        </h2>
        <p className="mt-2 text-white/80 text-sm md:text-base max-w-md mx-auto">
          Promoções, novos produtos e devocionais toda semana.
        </p>

        {submitted ? (
          <div className="mt-6 bg-white/10 rounded-lg px-6 py-4 max-w-md mx-auto">
            <p className="text-white font-medium">
              ✓ Inscrição confirmada! Obrigado por se juntar a nós.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              className="flex-1 px-4 py-3 rounded-lg text-text-primary text-sm placeholder:text-text-tertiary
                focus:outline-none focus:ring-2 focus:ring-accent-secondary"
            />
            <Button type="submit" className="bg-accent-secondary text-white hover:bg-yellow-600 whitespace-nowrap">
              Inscrever-se
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
