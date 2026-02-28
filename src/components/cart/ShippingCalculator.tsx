'use client';

import { useState } from 'react';
import { MapPin, Loader2, Truck, Package } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  deadline: string;
  icon: 'truck' | 'package';
}

interface ShippingCalculatorProps {
  subtotal: number;
  freeShipping: boolean;
  onShippingChange: (cost: number | null) => void;
}

// Mock shipping options based on CEP region
function getMockShippingOptions(cep: string, freeShipping: boolean): ShippingOption[] {
  const region = parseInt(cep.charAt(0));
  const baseCost = region <= 2 ? 12.90 : region <= 5 ? 18.90 : 24.90;

  return [
    {
      id: 'standard',
      name: 'PAC — Correios',
      price: freeShipping ? 0 : baseCost,
      deadline: region <= 2 ? '5 a 8 dias úteis' : region <= 5 ? '8 a 12 dias úteis' : '10 a 15 dias úteis',
      icon: 'package',
    },
    {
      id: 'express',
      name: 'SEDEX — Correios',
      price: freeShipping ? 0 : baseCost * 2.2,
      deadline: region <= 2 ? '2 a 3 dias úteis' : region <= 5 ? '3 a 5 dias úteis' : '5 a 7 dias úteis',
      icon: 'truck',
    },
  ];
}

// Mock ViaCEP response
interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export default function ShippingCalculator({ subtotal, freeShipping, onShippingChange }: ShippingCalculatorProps) {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<ViaCEPResponse | null>(null);
  const [options, setOptions] = useState<ShippingOption[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState('');

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 8);
    if (numbers.length > 5) {
      return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
    }
    return numbers;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(formatCep(e.target.value));
    setError('');
  };

  const handleCalculate = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setError('CEP deve ter 8 dígitos.');
      return;
    }

    setLoading(true);
    setError('');
    setAddress(null);
    setOptions(null);
    setSelected(null);
    onShippingChange(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data: ViaCEPResponse = await response.json();

      if (data.erro) {
        setError('CEP não encontrado.');
        setLoading(false);
        return;
      }

      setAddress(data);
      const shippingOptions = getMockShippingOptions(cleanCep, freeShipping);
      setOptions(shippingOptions);

      // Auto-select cheapest
      const cheapest = shippingOptions[0];
      setSelected(cheapest.id);
      onShippingChange(cheapest.price);
    } catch {
      setError('Erro ao consultar CEP. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (option: ShippingOption) => {
    setSelected(option.id);
    onShippingChange(option.price);
  };

  return (
    <div>
      <label className="text-sm font-medium text-text-secondary mb-1.5 block">
        Calcular frete
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            placeholder="00000-000"
            className="w-full rounded-md border border-border bg-white pl-9 pr-3 py-2 text-sm text-text-primary
              placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
          />
        </div>
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="px-4 py-2 rounded-md border-2 border-gold text-gold text-sm font-medium
            hover:bg-gold hover:text-white transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : 'Calcular'}
        </button>
      </div>

      {error && <p className="text-xs text-error mt-1">{error}</p>}

      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gold hover:text-gold-hover transition-colors mt-1 inline-block"
      >
        Não sei meu CEP
      </a>

      {/* Address result */}
      {address && (
        <p className="text-xs text-text-secondary mt-2">
          {address.logradouro ? `${address.logradouro}, ` : ''}{address.bairro ? `${address.bairro} — ` : ''}
          {address.localidade}/{address.uf}
        </p>
      )}

      {/* Shipping options */}
      {options && (
        <div className="mt-3 space-y-2">
          {options.map((option) => {
            const IconComp = option.icon === 'truck' ? Truck : Package;
            return (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                  selected === option.id
                    ? 'border-gold bg-gold/5'
                    : 'border-border/60 hover:border-gold/50'
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => handleSelectOption(option)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selected === option.id ? 'border-gold' : 'border-border'
                }`}>
                  {selected === option.id && (
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  )}
                </div>
                <IconComp size={16} className="text-text-tertiary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{option.name}</p>
                  <p className="text-xs text-text-tertiary">{option.deadline}</p>
                </div>
                <span className={`text-sm font-semibold flex-shrink-0 ${
                  option.price === 0 ? 'text-sacred-green' : 'text-text-primary'
                }`}>
                  {option.price === 0 ? 'Grátis' : formatPrice(option.price)}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
