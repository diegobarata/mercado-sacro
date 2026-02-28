import Link from 'next/link';
import Button from '@/components/ui/Button';

interface SecondaryBannerProps {
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  bgColor?: string;
}

export default function SecondaryBanner({
  title,
  subtitle,
  cta,
  ctaLink,
  bgColor = '#EDE9E3',
}: SecondaryBannerProps) {
  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: bgColor }}
        >
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary">
              {title}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
          </div>
          <Link href={ctaLink}>
            <Button variant="primary" size="lg">
              {cta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
