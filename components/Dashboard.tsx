
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  MessageSquare
} from 'lucide-react';
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-10"
    >
      {/* Hero Section Contextual */}
      <motion.section 
        variants={item}
        className={`relative overflow-hidden rounded-[3.5rem] p-12 text-white shadow-2xl ${theme.shadow} transition-all duration-700`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-95`}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-32 -mt-32 blur-[100px] animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center text-6xl shadow-inner border border-white/30"
            >
              {theme.icon}
            </motion.div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/10">
                <Sparkles className="w-3 h-3" />
                {professional.profession}
              </div>
              <h2 className="text-5xl font-black tracking-tight leading-none mb-3 font-display">
                {t.hello}, {professional.name.split(' ')[0]}!
              </h2>
              <p className="text-white/70 font-bold flex items-center justify-center md:justify-start gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                {t.activeAutomation}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                {theme.services.map((service, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5 text-[10px] font-black uppercase tracking-wider"
                  >
                    <span className="text-sm">{service.icon}</span>
                    <span>{service.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button 
              onClick={onUpgrade}
              className="w-full sm:w-auto bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-slate-50 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              🚀 {t.upgrade}
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 pt-12 border-t border-white/10">
          <QuickStat label={`${t.revenue} 2026`} value={`${t.currency} ${totalRevenue}`} icon={<TrendingUp className="w-4 h-4 opacity-50" />} />
          <QuickStat label={t.confirmation} value={`${confirmationRate.toFixed(0)}%`} icon={<CheckCircle2 className="w-4 h-4 opacity-50" />} />
          <QuickStat label={t.atRisk} value={atRisk.length.toString()} icon={<AlertCircle className="w-4 h-4 opacity-50" />} />
          <QuickStat label={t.savings} value="15h" icon={<Clock className="w-4 h-4 opacity-50" />} />
        </div>
      </motion.section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* AI Insight Card */}
        <motion.div variants={item} className="lg:col-span-2 group">
          <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${theme.gradient} opacity-[0.03] rounded-full -mr-16 -mt-16`}></div>
            
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 bg-gradient-to-tr ${theme.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg text-white`}>
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display">{t.aiRetention}</h3>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.reductionRate}</p>
                </div>
              </div>
              {loadingAi && <AiPulse theme={theme} />}
            </div>
            
            {aiData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:border-violet-200 transition-all group/tip">
                    <h4 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ArrowUpRight className="w-3 h-3 text-violet-500" />
                      {t.conversionTip}
                    </h4>
                    <p className="text-slate-700 text-base leading-relaxed font-medium">{aiData.optimization}</p>
                  </div>
                  <div className={`p-8 rounded-[2rem] border ${theme.badge.replace('bg-', 'border-').replace('text-', 'border-')} transition-all`}>
                    <h4 className={`font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2 ${theme.badge.split(' ')[1]}`}>
                      <MessageSquare className="w-3 h-3" />
                      {t.whatsappScript}
                    </h4>
                    <p className="text-slate-800 text-sm italic font-medium leading-relaxed">"{aiData.messages.reminder24h}"</p>
                  </div>
                </div>
                
                <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <h4 className="font-black text-white/30 text-[10px] uppercase tracking-[0.2em] mb-8">{t.automationMetrics}</h4>
                    <div className="space-y-8">
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Confirmações</span>
                        <span className="text-white font-black text-4xl tracking-tighter">88%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "88%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${theme.gradient} shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium mt-12 border-t border-white/5 pt-8 italic relative z-10">
                    {aiData.insights[0]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-80 flex flex-col items-center justify-center space-y-6">
                <div className={`w-16 h-16 border-4 border-slate-100 border-t-current rounded-full animate-spin ${theme.badge.split(' ')[1]}`}></div>
                <p className="text-sm font-black text-slate-300 uppercase tracking-widest animate-pulse">Consultando Inteligência...</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Attention Card */}
        <motion.div 
          variants={item} 
          whileHover={{ y: -5 }}
          className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-rose-100 transition-all duration-500"
        >
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display">{t.attentionNeeded}</h3>
            <span className="text-xs font-black text-rose-600 bg-rose-50 px-5 py-2.5 rounded-2xl uppercase tracking-widest">{atRisk.length}</span>
          </div>
          <div className="space-y-6">
            {atRisk.length > 0 ? atRisk.map(apt => (
              <motion.div 
                key={apt.id} 
                whileHover={{ scale: 1.02 }}
                className="group flex items-center gap-6 p-6 rounded-[2rem] bg-rose-50/30 border border-rose-100/50 hover:bg-rose-50 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">
                  <AlertCircle className="w-6 h-6 text-rose-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-black text-slate-800 truncate">{apt.clientName}</p>
                  <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1">{t.atRisk}</p>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-24 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm grayscale opacity-20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest leading-loose">{t.allConfirmed}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const QuickStat = ({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">{label}</p>
    </div>
    <p className="text-3xl font-black tracking-tighter">{value}</p>
  </div>
);

const AiPulse = ({ theme }: { theme: any }) => (
  <div className="flex gap-2">
    {[0, 1, 2].map(i => (
      <motion.div 
        key={i}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
        className={`w-2.5 h-2.5 rounded-full ${theme.badge.split(' ')[0]}`}
      ></motion.div>
    ))}
  </div>
);

export default Dashboard;
