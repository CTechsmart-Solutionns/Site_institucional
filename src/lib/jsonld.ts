import type { Faq } from '../data/solutions';

export function faqPageLd(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function serviceLd(opts: { name: string; description: string; url: string; siteUrl: URL; audience?: string; logo?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.name,
    ...(opts.logo && { logo: new URL(opts.logo, opts.siteUrl).href }),
    areaServed: { '@type': 'Country', name: 'Brasil' },
    provider: { '@id': new URL('/#organization', opts.siteUrl).href },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: opts.audience ?? 'Clínicas e laboratórios',
    },
  };
}
