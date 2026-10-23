// Dados institucionais. Campos com null ainda não foram informados pelo cliente:
// não inventar — enquanto forem null, o site mostra/omite conforme cada componente.
export const site = {
  name: 'CTechsmart Solutions',
  // Razão social idêntica ao cartão CNPJ e ao portfólio empresarial da Meta.
  legalName: 'Carlos Eduardo Gomes de Araujo',
  description:
    'Chatbot de atendimento e Fast-Lab (agendamento online e gestão) para clínicas e laboratórios. Software por assinatura, 100% na nuvem.',
  locale: 'pt_BR',
  contact: {
    whatsapp: "(22)99985-1983" as string | null, // ex.: '+55 11 90000-0000'
    email: "contato@ctechsmartsolutions.com" as string | null, // ex.: 'contato@empresa.com.br'
  },
  cnpj: '54.408.750/0001-26' as string | null,
  address: {
    street: 'Rua Nicanor Esteves, 151',
    neighborhood: 'Oscar Brito',
    city: 'Carapebus',
    state: 'RJ',
    postalCode: '27998-000',
  } as { street: string; neighborhood: string; city: string; state: string; postalCode: string } | null,
  // Perfis oficiais (LinkedIn, Instagram…) — usados no JSON-LD `sameAs`.
  sameAs: [] as string[],
  // Endpoint que recebe o formulário de demonstração (Formspree, Netlify Forms, API própria…).
  formEndpoint: null as string | null,
};

/** Endereço em uma linha, como exibido no rodapé e na política de privacidade. */
export const addressLine = site.address
  ? `${site.address.street} – ${site.address.neighborhood}, ${site.address.city}/${site.address.state}, CEP ${site.address.postalCode}`
  : null;

/** WhatsApp só com dígitos e com o DDI 55 (formato exigido pelo wa.me e pelo JSON-LD). */
export const whatsappIntl = (() => {
  const digits = site.contact.whatsapp?.replace(/\D/g, '');
  if (!digits) return null;
  // DDD + 8/9 dígitos = número nacional ainda sem o código do Brasil.
  return digits.length <= 11 ? `55${digits}` : digits;
})();

export const mainNav = [
  { label: 'Soluções', href: '/#solucoes' },
  { label: 'Para quem', href: '/#para-quem' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Contato', href: '/contato' },
];

export const footerNav = [
  {
    title: 'Soluções',
    links: [
      { label: 'Chatbot de atendimento', href: '/solucoes/chatbot-de-atendimento' },
      { label: 'Fast-Lab: agendamento e gestão', href: '/solucoes/fast-lab' },
    ],
  },
  {
    title: 'Para quem',
    links: [
      { label: 'Clínicas', href: '/para-clinicas' },
      { label: 'Laboratórios', href: '/para-laboratorios' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Como funciona', href: '/#como-funciona' },
      { label: 'Agendar demonstração', href: '/contato' },
      { label: 'Política de privacidade', href: '/politica-de-privacidade' },
    ],
  },
];

export const differentials = [
  { title: '100% na nuvem', text: 'Acesse de qualquer computador ou celular.' },
  { title: 'Assinatura mensal', text: 'Custo previsível, sem investimento inicial em servidores.' },
  { title: 'Suporte próximo', text: 'Atendimento em português, por gente que conhece a área.' },
  { title: 'Segurança e LGPD', text: 'Dados de pacientes protegidos e tratados conforme a LGPD.' },
];

export const steps = [
  {
    title: 'Conversa inicial',
    text: 'Entendemos sua rotina, seus canais de atendimento e o que mais toma tempo da equipe.',
  },
  {
    title: 'Configuração',
    text: 'Configuramos agendas, mensagens do chatbot e acessos. Nada para instalar: tudo roda na nuvem.',
  },
  {
    title: 'Acompanhamento',
    text: 'Seguimos junto com sua equipe, ajustando o que for preciso. Assinatura mensal, sem fidelidade longa.',
  },
];
