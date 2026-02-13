
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

export const PROFESSION_THEMES: Record<string, { gradient: string, badge: string, icon: string, shadow: string }> = {
  'Psicóloga': {
    gradient: 'from-violet-600 to-indigo-600',
    badge: 'bg-violet-100 text-violet-700',
    icon: '🧠',
    shadow: 'shadow-violet-200'
  },
  'Psicólogo': {
    gradient: 'from-violet-600 to-indigo-600',
    badge: 'bg-violet-100 text-violet-700',
    icon: '🧠',
    shadow: 'shadow-violet-200'
  },
  'Advogado': {
    gradient: 'from-slate-800 to-slate-900',
    badge: 'bg-slate-100 text-slate-700',
    icon: '⚖️',
    shadow: 'shadow-slate-300'
  },
  'Personal Trainer': {
    gradient: 'from-orange-500 to-red-600',
    badge: 'bg-orange-100 text-orange-700',
    icon: '💪',
    shadow: 'shadow-orange-200'
  },
  'Dentista': {
    gradient: 'from-cyan-500 to-blue-600',
    badge: 'bg-cyan-100 text-cyan-700',
    icon: '🦷',
    shadow: 'shadow-cyan-200'
  },
  'Esteticista': {
    gradient: 'from-rose-400 to-fuchsia-500',
    badge: 'bg-rose-100 text-rose-700',
    icon: '✨',
    shadow: 'shadow-rose-200'
  }
};

export const DEFAULT_THEME = {
  gradient: 'from-violet-600 to-fuchsia-600',
  badge: 'bg-violet-100 text-violet-700',
  icon: '💼',
  shadow: 'shadow-violet-200'
};

export const WEEK_DAYS = [
  'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
];

export const MOCK_PROFESSIONAL = {
  id: 'prof-1',
  name: 'Dra. Beatriz Silva',
  profession: 'Psicóloga Clínica',
  sessionValue: 150,
  whatsapp: '5511999999999',
  email: 'beatriz.silva@email.com',
  workingHours: {
    start: '08:00',
    end: '18:00',
    days: [1, 2, 3, 4, 5]
  }
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
