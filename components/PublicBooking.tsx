
import React, { useState } from 'react';
import { Professional, Appointment, AppointmentStatus } from '../types';

interface PublicBookingProps {
  professional: Professional;
  onBook: (apt: Appointment) => void;
}

const PublicBooking: React.FC<PublicBookingProps> = ({ professional, onBook }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '' });

  const slots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const handleBooking = () => {
    if (!clientInfo.name || !clientInfo.phone || !selectedDate || !selectedTime) return;
    
    const dateTime = new Date(`${selectedDate}T${selectedTime}:00`);
    
    const newApt: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      professionalId: professional.id,
      clientName: clientInfo.name,
      clientPhone: clientInfo.phone,
      date: dateTime.toISOString(),
      durationMinutes: 60,
      status: AppointmentStatus.PENDING,
      value: professional.sessionValue
    };

    onBook(newApt);
    setStep(3);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-500">
      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-10 text-white text-center">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center text-4xl border border-white/30 shadow-2xl">
            👤
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-400 w-8 h-8 rounded-full border-4 border-violet-600 flex items-center justify-center text-[10px] text-white font-bold animate-pulse">
            ON
          </div>
        </div>
        <h2 className="text-2xl font-black tracking-tight">{professional.name}</h2>
        <p className="text-violet-100 font-medium opacity-80">{professional.profession}</p>
        <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/20">
          R$ {professional.sessionValue} / sessão
        </div>
      </div>

      <div className="p-10">
        {step === 1 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Escolha seu horário</h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passo 1 de 2</span>
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data da Consulta</label>
              <input 
                type="date" 
                className="w-full p-5 rounded-2xl border border-slate-100 bg-slate-50 font-bold text-slate-700 focus:ring-4 focus:ring-violet-500/10 focus:bg-white outline-none transition-all"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            {selectedDate && (
              <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Horários Disponíveis</label>
                <div className="grid grid-cols-3 gap-3">
                  {slots.map(s => (
                    <button 
                      key={s}
                      onClick={() => setSelectedTime(s)}
                      className={`p-4 rounded-2xl border-2 font-black text-sm transition-all ${selectedTime === s ? 'bg-violet-600 text-white border-violet-600 shadow-xl shadow-violet-200 scale-105' : 'bg-white text-slate-600 border-slate-100 hover:border-violet-200'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button 
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(2)}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-violet-600 hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:scale-100 transition-all"
            >
              Próximo Passo →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Seus Dados</h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passo 2 de 2</span>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  placeholder="Ex: João Silva"
                  className="w-full p-5 rounded-2xl border border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-violet-500/10 focus:bg-white transition-all"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Seu WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  className="w-full p-5 rounded-2xl border border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-violet-500/10 focus:bg-white transition-all"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="bg-violet-50 p-6 rounded-3xl border border-violet-100 flex items-start gap-4">
              <span className="text-2xl">📱</span>
              <p className="text-xs font-bold text-violet-900/60 leading-relaxed">
                Você receberá uma mensagem de confirmação com <span className="text-violet-600">botões interativos</span> em seu WhatsApp minutos após o agendamento.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-100 text-slate-500 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Voltar
              </button>
              <button 
                onClick={handleBooking}
                disabled={!clientInfo.name || !clientInfo.phone}
                className="flex-[2] bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-violet-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                Finalizar Agendamento ✓
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12 space-y-6 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center text-4xl mx-auto shadow-inner">
              ✓
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Agendado!</h3>
              <p className="text-slate-500 font-medium mt-2">Um convite foi enviado para seu WhatsApp.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left space-y-2">
               <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">CLIENTE</span>
                  <span className="text-slate-800">{clientInfo.name}</span>
               </div>
               <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">DATA/HORA</span>
                  <span className="text-slate-800">{selectedDate.split('-').reverse().join('/')} às {selectedTime}</span>
               </div>
            </div>
            <button 
              onClick={() => { setStep(1); setSelectedDate(''); setSelectedTime(''); setClientInfo({name:'', phone:''}); }}
              className="text-violet-600 font-black text-xs uppercase tracking-widest hover:text-fuchsia-600 transition-colors"
            >
              + Agendar outro horário
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicBooking;
