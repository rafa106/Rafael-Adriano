
import React from 'react';

export const COLORS = {
  primary: 'violet-600',
  primaryLight: 'violet-500',
  primaryDark: 'violet-700',
  accent: 'fuchsia-500',
  success: 'emerald-400',
  danger: 'rose-500',
  warning: 'amber-400',
  info: 'cyan-400'
};

export const PROFESSION_THEMES: Record<string, { gradient: string, badge: string, icon: string, shadow: string, services: { name: string, icon: string }[] }> = {
  'Psicóloga': {
    gradient: 'from-violet-600 to-indigo-600',
    badge: 'bg-violet-100 text-violet-700',
    icon: '🧠',
    shadow: 'shadow-violet-200',
    services: [
      { name: 'Terapia Individual', icon: '🗣️' },
      { name: 'Avaliação Psicológica', icon: '📝' },
      { name: 'Terapia de Casal', icon: '💑' }
    ]
  },
  'Psicólogo': {
    gradient: 'from-violet-600 to-indigo-600',
    badge: 'bg-violet-100 text-violet-700',
    icon: '🧠',
    shadow: 'shadow-violet-200',
    services: [
      { name: 'Terapia Individual', icon: '🗣️' },
      { name: 'Avaliação Psicológica', icon: '📝' },
      { name: 'Terapia de Casal', icon: '💑' }
    ]
  },
  'Advogado': {
    gradient: 'from-slate-800 to-slate-900',
    badge: 'bg-slate-100 text-slate-700',
    icon: '⚖️',
    shadow: 'shadow-slate-300',
    services: [
      { name: 'Consultoria Jurídica', icon: '⚖️' },
      { name: 'Elaboração de Contratos', icon: '📜' },
      { name: 'Defesa em Juízo', icon: '🏛️' }
    ]
  },
  'Personal Trainer': {
    gradient: 'from-orange-500 to-red-600',
    badge: 'bg-orange-100 text-orange-700',
    icon: '💪',
    shadow: 'shadow-orange-200',
    services: [
      { name: 'Treino Funcional', icon: '🏋️‍♂️' },
      { name: 'Consultoria Online', icon: '💻' },
      { name: 'Avaliação Física', icon: '📏' }
    ]
  },
  'Dentista': {
    gradient: 'from-cyan-500 to-blue-600',
    badge: 'bg-cyan-100 text-cyan-700',
    icon: '🦷',
    shadow: 'shadow-cyan-200',
    services: [
      { name: 'Limpeza Dental', icon: '🦷' },
      { name: 'Clareamento', icon: '✨' },
      { name: 'Implantes', icon: '🛠️' }
    ]
  },
  'Esteticista': {
    gradient: 'from-rose-400 to-fuchsia-500',
    badge: 'bg-rose-100 text-rose-700',
    icon: '✨',
    shadow: 'shadow-rose-200',
    services: [
      { name: 'Limpeza de Pele', icon: '💆‍♀️' },
      { name: 'Drenagem Linfática', icon: '🌊' },
      { name: 'Massagem Relaxante', icon: '🕯️' }
    ]
  },
  'Nutricionista': {
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'bg-emerald-100 text-emerald-700',
    icon: '🍎',
    shadow: 'shadow-emerald-200',
    services: [
      { name: 'Consulta Nutricional', icon: '🥗' },
      { name: 'Bioimpedância', icon: '⚖️' },
      { name: 'Plano Alimentar', icon: '📋' }
    ]
  },
  'Arquiteto': {
    gradient: 'from-zinc-700 to-zinc-900',
    badge: 'bg-zinc-100 text-zinc-700',
    icon: '📐',
    shadow: 'shadow-zinc-300',
    services: [
      { name: 'Projeto Residencial', icon: '🏠' },
      { name: 'Consultoria de Interiores', icon: '🛋️' },
      { name: 'Acompanhamento de Obra', icon: '🏗️' }
    ]
  },
  'Barbeiro': {
    gradient: 'from-slate-900 via-slate-800 to-slate-900',
    badge: 'bg-slate-100 text-slate-900',
    icon: '💈',
    shadow: 'shadow-slate-400',
    services: [
      { name: 'Corte de Cabelo', icon: '✂️' },
      { name: 'Barba Completa', icon: '🪒' },
      { name: 'Corte + Barba', icon: '🔥' }
    ]
  },
  'Manicure': {
    gradient: 'from-pink-400 to-rose-500',
    badge: 'bg-pink-100 text-pink-700',
    icon: '💅',
    shadow: 'shadow-pink-200',
    services: [
      { name: 'Pé e Mão', icon: '💅' },
      { name: 'Alongamento em Gel', icon: '✨' },
      { name: 'Esmaltação em Gel', icon: '🎨' }
    ]
  },
  'Social Media': {
    gradient: 'from-blue-600 to-indigo-700',
    badge: 'bg-blue-100 text-blue-700',
    icon: '🚀',
    shadow: 'shadow-blue-200',
    services: [
      { name: 'Gestão de Redes', icon: '📱' },
      { name: 'Tráfego Pago', icon: '🎯' },
      { name: 'Produção de Conteúdo', icon: '🎬' }
    ]
  },
  'Médico': {
    gradient: 'from-sky-500 to-blue-700',
    badge: 'bg-sky-100 text-sky-700',
    icon: '🩺',
    shadow: 'shadow-sky-200',
    services: [
      { name: 'Consulta Geral', icon: '👨‍⚕️' },
      { name: 'Telemedicina', icon: '💻' },
      { name: 'Check-up', icon: '🔬' }
    ]
  }
};

export const DEFAULT_THEME = {
  gradient: 'from-violet-600 to-fuchsia-600',
  badge: 'bg-violet-100 text-violet-700',
  icon: '💼',
  shadow: 'shadow-violet-200',
  services: [
    { name: 'Consultoria Geral', icon: '💼' },
    { name: 'Atendimento Online', icon: '🌐' }
  ]
};

export const WEEK_DAYS = [
  'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
];

export const MOCK_PROFESSIONAL = {
  id: 'prof-1',
  name: 'Dra. Beatriz Silva',
  profession: 'Nutricionista',
  sessionValue: 150,
  whatsapp: '5511999999999',
  email: 'beatriz.silva@email.com',
  workingHours: {
    start: '08:00',
    end: '18:00',
    days: [1, 2, 3, 4, 5]
  },
  whatsappBookingEnabled: true,
  whatsappBookingMessage: 'Olá Dra. Beatriz, gostaria de agendar uma consulta para o dia {date} às {time}. Meu nome é {name}.',
  adsenseId: 'ca-pub-XXXXXXXXXXXXXXXX'
};

export const MOCK_APPOINTMENTS = [
  {
    id: '1',
    professionalId: 'prof-1',
    clientName: 'João Ferreira',
    clientPhone: '551188888888',
    date: new Date().toISOString(),
    durationMinutes: 60,
    status: 'confirmed',
    value: 150
  },
  {
    id: '2',
    professionalId: 'prof-1',
    clientName: 'Maria Alice',
    clientPhone: '551177777777',
    date: new Date(Date.now() + 86400000).toISOString(),
    durationMinutes: 60,
    status: 'pending',
    value: 150
  }
];
