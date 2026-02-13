
export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  NO_SHOW = 'no_show',
  RESCHEDULE_REQUESTED = 'reschedule_requested'
}

export interface WorkingHours {
  start: string; // HH:mm
  end: string;   // HH:mm
  days: number[]; // 0-6 (Sun-Sat)
}

export interface Professional {
  id: string;
  name: string;
  profession: string;
  sessionValue: number;
  whatsapp: string;
  email: string;
  workingHours: WorkingHours;
}

export interface Appointment {
  id: string;
  professionalId: string;
  clientName: string;
  clientPhone: string;
  date: string; // ISO string
  durationMinutes: number;
  status: AppointmentStatus;
  value: number;
  whatsappSent?: boolean;
  confirmationMethod?: 'manual' | 'whatsapp_button';
}

export interface DashboardStats {
  totalRevenue: number;
  totalSessions: number;
  noShowRate: number;
  timeSavedHours: number;
  confirmationRate: number;
}
