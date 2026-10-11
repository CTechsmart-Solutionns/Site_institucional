// Conteúdo das soluções: alimenta os cards da home e as páginas /solucoes/[slug].
// Textos baseados no mockup — não incluir números, preços ou integrações não confirmadas.

import type { ImageMetadata } from 'astro';
import fastLabSymbol from '../assets/fast-lab/simbolo.svg';
import fastLabLogo from '../assets/fast-lab/logo-horizontal.png';

export type IconName = 'chat' | 'calendar' | 'chart';

export interface Faq {
  q: string;
  a: string;
}

export interface Solution {
  slug: string;
  icon: IconName;
  /** Identidade própria do produto (substitui o ícone genérico). Originais em Docs/<produto>/. */
  brand?: {
    symbol: ImageMetadata;
    logo: ImageMetadata;
    /** Caminho público do símbolo em PNG, para JSON-LD. */
    symbolPublic: string;
  };
  name: string;
  summary: string;
  bullets: string[];
  seo: { title: string; description: string };
  /** Eyebrow acima do h1 da página da solução. */
  eyebrow: string;
  h1: string;
  intro: string;
  benefits: { title: string; text: string }[];
  forClinics: string;
  forLabs: string;
  /** Título (h2) da seção de perguntas frequentes. */
  faqTitle: string;
  faq: Faq[];
}

export const solutions: Solution[] = [
  {
    slug: 'chatbot-de-atendimento',
    icon: 'chat',
    name: 'Chatbot de atendimento',
    summary: 'Responde pacientes no WhatsApp e no site, inclusive fora do horário comercial.',
    bullets: [
      'Dúvidas sobre exames, preparo e convênios',
      'Agendamento direto pela conversa',
      'Transferência para a equipe quando necessário',
    ],
    seo: {
      title: 'Chatbot WhatsApp para clínicas e laboratórios',
      description:
        'Chatbot que atende pacientes no WhatsApp e no site 24h: tira dúvidas de exames, preparo e convênios e agenda direto na conversa.',
    },
    eyebrow: 'Chatbot de atendimento',
    h1: 'Chatbot de WhatsApp para clínicas e laboratórios',
    intro:
      'Seus pacientes recebem resposta na hora, a qualquer horário. O chatbot da CTechsmart tira dúvidas frequentes, agenda consultas e coletas e chama sua equipe quando o caso pede atenção humana.',
    benefits: [
      {
        title: 'Atendimento fora do horário',
        text: 'Noites, fins de semana e feriados deixam de ser horário sem resposta. O paciente é atendido quando procura.',
      },
      {
        title: 'Recepção menos sobrecarregada',
        text: 'Perguntas repetidas sobre convênios, preparo de exames e endereço são respondidas automaticamente.',
      },
      {
        title: 'Agendamento na própria conversa',
        text: 'Conectado ao Fast-Lab, o chatbot mostra horários livres e marca sem o paciente sair do WhatsApp.',
      },
      {
        title: 'Equipe entra quando precisa',
        text: 'Casos que exigem atenção humana são transferidos para a equipe com o histórico da conversa.',
      },
    ],
    forClinics:
      'Responde sobre especialidades, convênios aceitos e valores, e confirma consultas para reduzir faltas.',
    forLabs:
      'Envia orientações de preparo de cada exame e agenda coletas por unidade e horário.',
    faqTitle: 'Perguntas sobre o chatbot de atendimento',
    faq: [
      {
        q: 'O chatbot funciona no WhatsApp?',
        a: 'Sim. O chatbot atende pacientes no WhatsApp e também no site da sua clínica ou laboratório.',
      },
      {
        q: 'O chatbot substitui a recepção?',
        a: 'Não. Ele resolve as dúvidas repetitivas e os agendamentos simples, e transfere para a equipe quando é preciso atenção humana. Assim a recepção fica livre para quem está no balcão.',
      },
      {
        q: 'Preciso instalar algum programa?',
        a: 'Não. A plataforma roda 100% na nuvem e é configurada pela nossa equipe.',
      },
      {
        q: 'Os dados das conversas ficam seguros?',
        a: 'Sim. Os dados de pacientes são protegidos e tratados conforme a LGPD.',
      },
    ],
  },
  {
    slug: 'fast-lab',
    icon: 'calendar',
    brand: { symbol: fastLabSymbol, logo: fastLabLogo, symbolPublic: '/fast-lab-simbolo.png' },
    name: 'Fast-Lab',
    summary:
      'Agendamento, gestão e indicadores numa só ferramenta, para reduzir faltas e aumentar o faturamento.',
    bullets: [
      'Agenda única para recepção, site e chatbot',
      'Confirmação e lembretes automáticos',
      'Cadastro de pacientes, relatórios e acesso por perfil',
      'Visão de ocupação para preencher horários vagos',
    ],
    seo: {
      title: 'Fast-Lab: agendamento e gestão para clínicas',
      description:
        'Fast-Lab: agenda online e gestão para clínicas e laboratórios. Menos faltas, horários mais ocupados e relatórios para aumentar o faturamento.',
    },
    eyebrow: 'Agendamento e gestão',
    h1: 'Fast-Lab: agendamento online e gestão para clínicas e laboratórios',
    intro:
      'O Fast-Lab junta agenda, gestão e indicadores numa só ferramenta. O paciente marca, confirma e reagenda sozinho, sua equipe enxerga a operação inteira num painel e você descobre onde estão os horários ociosos, para transformar agenda cheia em faturamento.',
    benefits: [
      {
        title: 'Mais faturamento',
        text: 'Menos faltas e horários vagos mais fáceis de preencher: cada horário ocupado é receita que antes se perdia.',
      },
      {
        title: 'Menos faltas',
        text: 'Confirmação e lembretes automáticos lembram o paciente do compromisso.',
      },
      {
        title: 'Sem conflito de horários',
        text: 'Recepção, site e chatbot consultam a mesma agenda, então um horário nunca é vendido duas vezes.',
      },
      {
        title: 'Autonomia para o paciente',
        text: 'O próprio paciente agenda e reagenda quando precisa, sem ligar para a recepção.',
      },
      {
        title: 'Gestão num só painel',
        text: 'Cadastro e histórico de pacientes, relatórios de atendimento e ocupação, sem planilhas soltas.',
      },
      {
        title: 'Agendas do seu jeito',
        text: 'Organize por profissional, sala ou unidade, com acesso por perfil para cada equipe.',
      },
    ],
    forClinics:
      'Agenda por médico e por especialidade, confirmação de consultas pelo WhatsApp e visão da ocupação de cada profissional.',
    forLabs:
      'Agendamento de coleta por unidade e horário, distribuindo melhor o fluxo de pacientes e acompanhando a ocupação de cada posto.',
    faqTitle: 'Perguntas sobre o Fast-Lab',
    faq: [
      {
        q: 'O que é o Fast-Lab?',
        a: 'É a ferramenta da CTechsmart que reúne agendamento online e gestão: agenda única, lembretes automáticos, cadastro de pacientes e relatórios de atendimento e ocupação.',
      },
      {
        q: 'Como o Fast-Lab ajuda a aumentar o faturamento?',
        a: 'Reduzindo faltas com confirmações e lembretes automáticos, facilitando o reagendamento pelo próprio paciente e mostrando nos relatórios onde a agenda está ociosa, para você preencher esses horários.',
      },
      {
        q: 'O paciente consegue agendar sozinho?',
        a: 'Sim. O paciente pode agendar pelo site ou pelo chatbot no WhatsApp, e também reagendar quando precisar.',
      },
      {
        q: 'Funciona para várias unidades?',
        a: 'Sim. É possível criar agendas por profissional, por sala ou por unidade.',
      },
      {
        q: 'Posso controlar o que cada funcionário acessa?',
        a: 'Sim. O acesso é definido por perfil, para cada equipe ver apenas o que precisa.',
      },
      {
        q: 'Preciso de servidor próprio?',
        a: 'Não. O Fast-Lab é 100% na nuvem, por assinatura mensal, e pode ser acessado de qualquer computador ou celular.',
      },
    ],
  },
];
