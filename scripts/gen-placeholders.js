const fs = require('fs');
const path = require('path');

const dir = 'public/img/products';

const files = [
  'terco-madeira-1','terco-madeira-2','terco-madeira-3',
  'terco-sao-bento-1','terco-sao-bento-2','terco-sao-bento-3',
  'medalha-miracolosa-1','medalha-miracolosa-2','medalha-miracolosa-3',
  'escapulario-carmo-1','escapulario-carmo-2','escapulario-carmo-3',
  'vela-7dias-1','vela-7dias-2','vela-7dias-3',
  'santinhos-1','santinhos-2','santinhos-3',
  'agua-benta-1','agua-benta-2','agua-benta-3',
  'incenso-1','incenso-2','incenso-3',
  'terco-prata-1','terco-prata-2','terco-prata-3','terco-prata-4',
  'biblia-ave-maria-1','biblia-ave-maria-2','biblia-ave-maria-3','biblia-ave-maria-4',
  'crucifixo-parede-1','crucifixo-parede-2','crucifixo-parede-3','crucifixo-parede-4',
  'santo-antonio-1','santo-antonio-2','santo-antonio-3',
  'kit-comunhao-1','kit-comunhao-2','kit-comunhao-3','kit-comunhao-4',
  'missal-1','missal-2','missal-3',
  'velas-liturgicas-1','velas-liturgicas-2','velas-liturgicas-3',
  'terco-ouro-1','terco-ouro-2','terco-ouro-3','terco-ouro-4','terco-ouro-5',
  'crucifixo-nogueira-1','crucifixo-nogueira-2','crucifixo-nogueira-3','crucifixo-nogueira-4',
  'biblia-catedral-1','biblia-catedral-2','biblia-catedral-3','biblia-catedral-4',
  'ns-fatima-1','ns-fatima-2','ns-fatima-3','ns-fatima-4','ns-fatima-5',
  'calice-prata-1','calice-prata-2','calice-prata-3','calice-prata-4',
];

files.forEach(f => {
  const label = f.replace(/-\d+$/, '').replace(/-/g, ' ');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <rect width="800" height="800" fill="#F5F3F0"/>
  <text x="400" y="370" text-anchor="middle" font-family="serif" font-size="28" fill="#4A5568">${label}</text>
  <text x="400" y="420" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#A0AEC0">Mercado Sacro</text>
  <line x1="400" y1="260" x2="400" y2="320" stroke="#2C5282" stroke-width="3"/>
  <line x1="380" y1="290" x2="420" y2="290" stroke="#2C5282" stroke-width="3"/>
</svg>`;
  fs.writeFileSync(path.join(dir, f + '.jpg'), svg);
});

console.log(files.length + ' product images created');
