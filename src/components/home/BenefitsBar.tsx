import { Truck, ShieldCheck, RefreshCw, CreditCard, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Truck,
  ShieldCheck,
  RefreshCw,
  CreditCard,
};

import { BENEFITS } from '@/lib/constants';

export default function BenefitsBar() {
  return (
    <section className="bg-bg-secondary py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = iconMap[benefit.icon];
            return (
              <div key={benefit.icon} className="flex flex-col items-center text-center gap-2">
                {Icon && <Icon size={28} className="text-accent-primary" />}
                <div>
                  <p className="text-sm font-semibold text-text-primary">{benefit.title}</p>
                  <p className="text-xs text-text-tertiary">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
