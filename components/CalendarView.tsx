
import React, { useState } from 'react';
import { Appointment, AppointmentStatus } from '../types';

interface CalendarViewProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
  onAddManual?: (apt: Appointment) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ appointments, onUpdateStatus, onAddManual }) => {
  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newApt, setNewApt] = useState({ name: '', phone: '', date: '', time: '' });

  const sorted = [...appointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApt.name || !newApt.date || !newApt.time) return;
    
    const dateTime = new Date(`${newApt.date}T${newApt.time}:00`);
    const apt: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      professionalId: 'prof-1',
      clientName: newApt.name,
      clientPhone: newApt.phone,
      date: dateTime.toISOString(),
      durationMinutes: 60,
      status: AppointmentStatus.PENDING,
      value: 150
    };

    if (onAddManual) onAddManual(apt);
    setIsAdding(false);
    setNewApt({ name: '', phone: '', date: '', time: '' });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Agenda Interativa 2026</h2>
          <p className="text-slate-500 font-medium text-lg mt-1">Gestão estratégica de tempo e faturamento.</p>
        </div>
        <div className="flex gap-4">
            <div className="hidden sm:flex bg-white shadow-sm border border-slate-100 px-6 py-3 rounded-2xl items-center gap-4">
               <div className="relative">
                  <span className="block w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                  <span className="block w-2.5 h-2.5 bg-emerald-500 rounded-full absolute top-0 animate-ping"></span>
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">WhatsApp Business Online</span>
            </div>
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-violet-600 hover:-translate-y-1 transition-all"
            >
              + NOVO AGENDAMENTO
            </button>
        </div>
      </header>

      {/* Manual Add Form Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl p-12 space-y-10 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Novo Cliente</h3>
              <button onClick={() => setIsAdding(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors">✕</button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                <input required type="text" value={newApt.name} onChange={e => setNewApt({...newApt, name: e.target.value})} className="w-full p-5 rounded-2xl border border-slate-100 bg-slate-50 font-bold focus:ring-4 focus:ring-violet-500/10 outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data</label>
                  <input required type="date" value={newApt.date} onChange={e => setNewApt({...newApt, date: e.target.value})} className="w-full p-5 rounded-2xl border border-slate-100 bg-slate-50 font-bold focus:ring-4 focus:ring-violet-500/10 outline-none transition-all" />
                </div>
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hora</label>
                  <input required type="time" value={newApt.time} onChange={e => setNewApt({...newApt, time: e.target.value})} className="w-full p-5 rounded-2xl border border-slate-100 bg-slate-50 font-bold focus:ring-4 focus:ring-violet-500/10 outline-none transition-all" />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-violet-600 transition-all">
                CADASTRAR NA AGENDA ✓
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/30">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(d => (
            <div key={d} className="py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{d}</div>
          ))}
        </div>
        
        <div className="divide-y divide-slate-100">
          {sorted.map(apt => (
            <div key={apt.id} className="relative group p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-10 hover:bg-slate-50/50 transition-all duration-300">
              <div className="flex items-center gap-10">
                <div className="w-24 text-center">
                  <p className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-1 opacity-60">
                    {new Date(apt.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
                  </p>
                  <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                    {new Date(apt.date).getDate().toString().padStart(2, '0')}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    2026
                  </p>
                </div>
                <div className="w-px h-16 bg-slate-200 hidden sm:block opacity-40"></div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h4 className="font-black text-slate-900 text-xl tracking-tight leading-none">{apt.clientName}</h4>
                    <StatusBadge status={apt.status} />
                  </div>
                  <div className="flex items-center gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2.5">
                      <span className="text-lg opacity-50">🕒</span> 
                      {new Date(apt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="flex items-center gap-2.5">
                      <span className="text-lg opacity-50">💰</span> 
                      R$ {apt.value}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl shadow-inner">
                    <ActionBtn 
                        label="Check-in" 
                        onClick={() => onUpdateStatus(apt.id, AppointmentStatus.COMPLETED)} 
                        active={apt.status === AppointmentStatus.COMPLETED} 
                        color="emerald" 
                    />
                    <ActionBtn 
                        label="Falta" 
                        onClick={() => onUpdateStatus(apt.id, AppointmentStatus.NO_SHOW)} 
                        active={apt.status === AppointmentStatus.NO_SHOW} 
                        color="rose" 
                    />
                </div>

                <button 
                  onClick={() => setSimulationId(simulationId === apt.id ? null : apt.id)}
                  className={`p-5 rounded-2xl transition-all border ${simulationId === apt.id ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:text-slate-900 hover:border-slate-300'}`}
                >
                   <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.122.554 4.197 1.604 6.013L0 24l6.135-1.61a11.803 11.803 0 005.912 1.586h.005c6.635 0 12.03-5.395 12.033-12.03a11.777 11.777 0 00-3.475-8.498z" /></svg>
                </button>
              </div>

              {/* Popup de Simulação Flutuante */}
              {simulationId === apt.id && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2 z-50 animate-in slide-in-from-right-8 duration-500">
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl border border-white/10 w-80 space-y-6">
                        <div className="flex justify-between items-center border-b border-white/5 pb-5">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Business Preview</span>
                            <button onClick={() => setSimulationId(null)} className="text-slate-500 hover:text-white transition-colors">✕</button>
                        </div>
                        <div className="bg-slate-800/80 p-5 rounded-3xl border border-white/5 italic text-xs font-medium text-slate-300 leading-relaxed shadow-inner">
                            "Olá {apt.clientName.split(' ')[0]}, confirma sua consulta com a Dra. Beatriz às {new Date(apt.date).getHours()}:00?"
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => { onUpdateStatus(apt.id, AppointmentStatus.CONFIRMED); setSimulationId(null); }}
                                className="bg-emerald-500 hover:bg-emerald-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/10"
                            >
                                ✅ Sim
                            </button>
                            <button 
                                onClick={() => { onUpdateStatus(apt.id, AppointmentStatus.RESCHEDULE_REQUESTED); setSimulationId(null); }}
                                className="bg-rose-500 hover:bg-rose-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-rose-500/10"
                            >
                                ❌ Remarcar
                            </button>
                        </div>
                    </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionBtn: React.FC<{ label: string; onClick: () => void; active?: boolean; color: string }> = ({ label, onClick, active, color }) => {
  const colors: Record<string, string> = {
    emerald: active ? 'bg-emerald-600 text-white shadow-lg' : 'bg-transparent text-slate-500 hover:bg-white hover:text-emerald-600',
    rose: active ? 'bg-rose-600 text-white shadow-lg' : 'bg-transparent text-slate-500 hover:bg-white hover:text-rose-600',
  };

  return (
    <button 
      onClick={onClick}
      className={`px-6 py-3 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest transition-all ${colors[color]}`}
    >
      {label}
    </button>
  );
};

const StatusBadge: React.FC<{ status: AppointmentStatus }> = ({ status }) => {
    const config: Record<AppointmentStatus, { label: string, icon: string, desc: string, style: string }> = {
      [AppointmentStatus.PENDING]: {
        label: 'Pendente',
        icon: '⏳',
        desc: 'Aguardando confirmação do cliente via WhatsApp.',
        style: 'bg-amber-50 text-amber-600 border-amber-200/50'
      },
      [AppointmentStatus.CONFIRMED]: {
        label: 'Confirmado',
        icon: '✅',
        desc: 'Cliente confirmou presença para este horário.',
        style: 'bg-emerald-500 text-white shadow-lg shadow-emerald-100 border-emerald-400'
      },
      [AppointmentStatus.COMPLETED]: {
        label: 'Concluído',
        icon: '🏁',
        desc: 'Atendimento realizado com sucesso.',
        style: 'bg-slate-900 text-white shadow-lg shadow-slate-200 border-slate-800'
      },
      [AppointmentStatus.CANCELED]: {
        label: 'Cancelado',
        icon: '🚫',
        desc: 'Agendamento cancelado pelo cliente ou profissional.',
        style: 'bg-slate-100 text-slate-400 border-slate-200'
      },
      [AppointmentStatus.NO_SHOW]: {
        label: 'Faltou',
        icon: '❌',
        desc: 'O cliente não compareceu ao horário agendado.',
        style: 'bg-rose-500 text-white shadow-lg shadow-rose-100 border-rose-400'
      },
      [AppointmentStatus.RESCHEDULE_REQUESTED]: {
        label: 'Reagendar',
        icon: '🔄',
        desc: 'Cliente solicitou alteração de data ou horário.',
        style: 'bg-violet-600 text-white shadow-lg shadow-violet-200 border-violet-500 animate-pulse'
      }
    };

    const { label, icon, desc, style } = config[status];

    return (
      <div className="relative group/status">
        <span className={`flex items-center gap-2 text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border transition-all duration-300 cursor-help ${style}`}>
          <span className="text-xs">{icon}</span>
          {label}
        </span>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-4 bg-slate-900 text-white text-[10px] font-bold rounded-2xl opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all duration-300 z-[60] shadow-2xl pointer-events-none border border-white/10">
          <div className="relative text-center leading-relaxed">
            {desc}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-white/10"></div>
          </div>
        </div>
      </div>
    );
  };

export default CalendarView;
