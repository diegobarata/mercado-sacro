import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { SITE_NAME, NAVIGATION_CATEGORIES, SOCIAL_LINKS, PAYMENT_METHODS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="font-logo text-xl font-bold tracking-[0.15em] text-gold">
              {SITE_NAME.toUpperCase()}
            </span>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed font-accent italic">
              &ldquo;Tudo para sua fé, num só lugar.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Categorias</h3>
            <ul className="space-y-2">
              {NAVIGATION_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Minha Conta</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/conta" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Meus pedidos
                </Link>
              </li>
              <li>
                <Link href="/conta" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Meus endereços
                </Link>
              </li>
              <li>
                <Link href="/conta" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Meus dados
                </Link>
              </li>
              <li>
                <Link href="/conta" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Política de Trocas
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-6 justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Formas de pagamento</p>
              <div className="flex items-center gap-2 flex-wrap">
                {PAYMENT_METHODS.map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Segurança</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">SSL 🔒</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">Site Seguro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
          </p>
          <p className="mt-1 text-xs text-gray-600 font-accent italic">
            Deus seja louvado.
          </p>
        </div>
      </div>
    </footer>
  );
}
