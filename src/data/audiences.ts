// Conteúdo das páginas por público (/para-clinicas e /para-laboratorios) e dos cards "Para quem" da home.
import type { Faq } from './solutions';

export interface Audience {
  slug: 'para-clinicas' | 'para-laboratorios';
  name: string;
  summary: string;
  checks: string[];
  seo: { title: string; description: string };
  eyebrow: string;
  h1: string;
  intro: string;
  pains: { title: string; text: string }[];
  faq: Faq[];
}

export const audiences: Audience[] = [
  {
    slug: 'para-clinicas',
    name: 'Clínicas',
    summary:
      'Para consultórios e clínicas de uma ou várias especialidades que querem reduzir faltas e liberar a recepção.',
    checks: [
      'Agenda por médico e por especialidade',
      'Confirmação de consultas pelo WhatsApp',
      'Respostas automáticas sobre convênios e valores',
    ],
    seo: {
      title: 'Software para clínicas e consultórios',
      description:
        'Chatbot de WhatsApp, agenda online e gestão para clínicas e consultórios: menos faltas, recepção mais livre e tudo na nuvem, por assinatura.',
    },
    eyebrow: 'Para clínicas',
    h1: 'Software para clínicas e consultórios',
    intro:
      'Para consultórios e clínicas de uma ou várias especialidades. Atendimento automático no WhatsApp, agenda online e gestão integrados para reduzir faltas e liberar a recepção.',
    pains: [
      {
        title: 'Faltas e horários vagos',
        text: 'Confirmação de consultas pelo WhatsApp e lembretes automáticos ajudam o paciente a não esquecer.',
      },
      {
        title: 'Telefone que não para',
        text: 'Perguntas sobre convênios, valores e especialidades são respondidas pelo chatbot, a qualquer hora.',
      },
      {
        title: 'Agendas de vários médicos',
        text: 'Uma agenda por médico e por especialidade, consultada ao mesmo tempo pela recepção, pelo site e pelo chatbot.',
      },
    ],
    faq: [
      {
        q: 'Serve para consultório pequeno?',
        a: 'Sim. A plataforma atende desde consultórios até clínicas de várias especialidades, e você contrata só as soluções de que precisa.',
      },
      {
        q: 'O paciente consegue confirmar a consulta pelo WhatsApp?',
        a: 'Sim. A confirmação de consultas é feita pelo WhatsApp, de forma automática.',
      },
      {
        q: 'Preciso instalar algo nos computadores da clínica?',
        a: 'Não. Tudo roda na nuvem e pode ser acessado de qualquer computador ou celular.',
      },
      {
        q: 'Existe fidelidade?',
        a: 'A contratação é por assinatura mensal, sem fidelidade longa.',
      },
    ],
  },
  {
    slug: 'para-laboratorios',
    name: 'Laboratórios',
    summary:
      'Para laboratórios de análises clínicas e postos de coleta que lidam com grande volume de pedidos e dúvidas de preparo.',
    checks: [
      'Orientações de preparo enviadas automaticamente',
      'Agendamento de coleta por unidade e horário',
      'Atendimento de dúvidas sem ocupar a recepção',
    ],
    seo: {
      title: 'Software para laboratório de análises clínicas',
      description:
        'Chatbot, agendamento de coleta e gestão para laboratórios de análises clínicas e postos de coleta: preparo de exames enviado automaticamente.',
    },
    eyebrow: 'Para laboratórios',
    h1: 'Software para laboratório de análises clínicas',
    intro:
      'Para laboratórios de análises clínicas e postos de coleta com grande volume de pedidos. Orientações de preparo automáticas, agendamento de coleta por unidade e atendimento de dúvidas sem ocupar a recepção.',
    pains: [
      {
        title: 'Dúvidas de preparo repetidas',
        text: 'O chatbot envia as orientações de preparo de cada exame automaticamente, pelo WhatsApp ou pelo site.',
      },
      {
        title: 'Filas nos horários de pico',
        text: 'O agendamento de coleta por unidade e horário distribui melhor o fluxo de pacientes ao longo do dia.',
      },
      {
        title: 'Várias unidades de coleta',
        text: 'Agendas por unidade e indicadores de ocupação num só painel de gestão.',
      },
    ],
    faq: [
      {
        q: 'O chatbot informa o preparo de cada exame?',
        a: 'Sim. As orientações de preparo são enviadas automaticamente ao paciente.',
      },
      {
        q: 'Funciona com vários postos de coleta?',
        a: 'Sim. O agendamento de coleta é organizado por unidade e horário.',
      },
      {
        q: 'Os dados dos pacientes ficam protegidos?',
        a: 'Sim. Os dados de pacientes são protegidos e tratados conforme a LGPD.',
      },
      {
        q: 'Como começo?',
        a: 'Agende uma demonstração gratuita. Entendemos sua rotina, configuramos a plataforma e acompanhamos sua equipe.',
      },
    ],
  },
];
