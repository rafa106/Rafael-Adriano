
import React, { useEffect, useState } from 'react';
import { Appointment, AppointmentStatus, Professional } from '../types';
import { generateSmartInsights } from '../services/geminiService';
import { Language } from '../translations';
import { PROFESSION_THEMES, DEFAULT_THEME } from '../constants';

interface DashboardProps {
  appointments: Appointment[];
  professional: Professional;
  onUpgrade: () => void;
  language: Language;
  t: any;
}

const Dashboard: React.FC<DashboardProps> = ({ appointments, professional, onUpgrade, language, t }) => {
  const [aiData, setAiData] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Determina o tema com base na profissão (ignora sufixos como "Clínica")
  const professionKey = Object.keys(PROFESSION_THEMES).find(key => professional.profession.includes(key)) || '';
  const theme = PROFESSION_THEMES[professionKey] || DEFAULT_THEME;

  useEffect(() => {
    const loadAi = async () => {
      setLoadingAi(true);
      const data = await generateSmartInsights(appointments, professional, language);
      setAiData(data);
      setLoadingAi(false);
    };
    loadAi();
  }, [appointments, professional, language]);

  const totalRevenue = appointments
    .filter(a => a.status === AppointmentStatus.COMPLETED || a.status === AppointmentStatus.CONFIRMED)
    .reduce((sum, a) => sum + a.value, 0);

  const confirmedCount = appointments.filter(a => a.status === AppointmentStatus.CONFIRMED).length;
  const confirmationRate = appointments.length > 0 ? (confirmedCount / appointments.length) * 100 : 0;
  
  const atRisk = appointments.filter(a => 
    a.status === AppointmentStatus.PENDING && 
    new Date(a.date).getTime() - new Date().getTime() < 86400000
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Hero Section Contextual */}
      <section className={`relative overflow-hidden rounded-[3rem] p-10 text-white shadow-2xl ${theme.shadow} transition-all duration-700`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-95`}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-5xl shadow-inner border border-white/30 transform hover:rotate-6 transition-transform">
              {theme.icon}
            </div>
            <div className="text-center md:text-left">
              <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                {professional.profession}
              </div>
              <h2 className="text-4xl font-black tracking-tight leading-none mb-2">
                {t.hello}, {professional.name.split(' ')[0]}!
              </h2>
              <p className="text-white/70 font-medium flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                {t.activeAutomation}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button 
              onClick={onUpgrade}
              className="w-full sm:w-auto bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              🚀 {t.upgrade}
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
          <QuickStat label={t.revenue} value={`${t.currency} ${totalRevenue}`} />
          <QuickStat label={t.confirmation} value={`${confirmationRate.toFixed(0)}%`} />
          <QuickStat label={t.atRisk} value={atRisk.length.toString()} />
          <QuickStat label={t.savings} value="15h" />
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Insight Card */}
        <div className="lg:col-span-2 group">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 h-full hover:shadow-xl transition-all duration-500 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.gradient} opacity-[0.03] rounded-full -mr-10 -mt-10`}></div>
            
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-tr ${theme.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                  ✨
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.aiRetention}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.reductionRate}</p>
                </div>
              </div>
              {loadingAi && <AiPulse theme={theme} />}
            </div>
            
            {aiData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-violet-200 transition-colors group/tip">
                    <h4 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                      💡 {t.conversionTip}
                    </h4>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">{aiData.optimization}</p>
                  </div>
                  <div className={`p-6 rounded-3xl border ${theme.badge.replace('bg-', 'border-').replace('text-', 'border-')} transition-all`}>
                    <h4 className={`font-black text-[10px] uppercase tracking-widest mb-3 ${theme.badge.split(' ')[1]}`}>
                      💬 {t.whatsappScript}
                    </h4>
                    <p className="text-slate-800 text-xs italic font-medium leading-relaxed">"{aiData.messages.reminder24h}"</p>
                  </div>
                </div>
                
                <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-white/30 text-[10px] uppercase tracking-[0.2em] mb-6">{t.automationMetrics}</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Confirmações</span>
                        <span className="text-white font-black text-3xl tracking-tighter">88%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${theme.gradient} w-[88%] shadow-[0_0_20px_rgba(255,255,255,0.2)]`}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium mt-8 border-t border-white/5 pt-6 italic">
                    {aiData.insights[0]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center space-y-4">
                <div className={`w-12 h-12 border-4 border-slate-100 border-t-current rounded-full animate-spin ${theme.badge.split(' ')[1]}`}></div>
                <p className="text-xs font-black text-slate-300 uppercase tracking-widest animate-pulse">Consultando Inteligência...</p>
              </div>
            )}
          </div>
        </div>

        {/* Attention Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.attentionNeeded}</h3>
            <span className="text-xs font-black text-rose-600 bg-rose-50 px-4 py-2 rounded-2xl uppercase tracking-widest">{atRisk.length}</span>
          </div>
          <div className="space-y-6">
            {atRisk.length > 0 ? atRisk.map(apt => (
              <div key={apt.id} className="group flex items-center gap-5 p-5 rounded-[1.5rem] bg-rose-50/30 border border-rose-100/50 hover:bg-rose-50 hover:scale-[1.02] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl">
                  ⚠️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-800 truncate">{apt.clientName}</p>
                  <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1">{t.atRisk}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
                <div className="text-4xl mb-4 grayscale opacity-20">🎉</div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest leading-loose">{t.allConfirmed}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickStat = ({ label, value }: { label: string, value: string }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">{label}</p>
    <p className="text-2xl font-black tracking-tighter">{value}</p>
  </div>
);

const AiPulse = ({ theme }: { theme: any }) => (
  <div className="flex gap-1.5">
    <div className={`w-2 h-2 rounded-full animate-bounce ${theme.badge.split(' ')[0]}`}></div>
    <div className={`w-2 h-2 rounded-full animate-bounce delay-100 ${theme.badge.split(' ')[0]}`}></div>
    <div className={`w-2 h-2 rounded-full animate-bounce delay-200 ${theme.badge.split(' ')[0]}`}></div>
  </div>
);

export default Dashboard;
