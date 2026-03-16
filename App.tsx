
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Link as LinkIcon, 
  Settings as SettingsIcon, 
  LogOut, 
  Download, 
  Trash2, 
  X, 
  Plus,
  Globe,
  Smartphone,
  Monitor,
  Users
} from 'lucide-react';
import { Appointment, AppointmentStatus, Professional } from './types';
import { MOCK_PROFESSIONAL, MOCK_APPOINTMENTS } from './constants';
import { Language, translations } from './translations';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import PublicBooking from './components/PublicBooking';
import Settings from './components/Settings';
import Pricing from './components/Pricing';
import LandingPage from './components/LandingPage';
import Affiliate from './components/Affiliate';

type View = 'landing' | 'dashboard' | 'calendar' | 'settings' | 'booking' | 'pricing' | 'affiliate';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  
  const [language, setLanguage] = useState<Language>('pt');
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS as Appointment[]);
  const [professional] = useState<Professional>(MOCK_PROFESSIONAL);
  
  // States for Notepad
  const [notes, setNotes] = useState(() => localStorage.getItem('agenda_auto_notes') || '');
  const [showNotesBlock, setShowNotesBlock] = useState(() => {
    const saved = localStorage.getItem('agenda_auto_show_notes');
    return saved === null ? true : saved === 'true';
  });

  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('agenda_auto_notes', notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('agenda_auto_show_notes', showNotesBlock.toString());
  }, [showNotesBlock]);

  useEffect(() => {
    if (currentView !== 'landing') {
      localStorage.setItem('agenda_auto_logged', 'true');
    }
  }, [currentView]);

  const handleUpdateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status } : apt));
  };

  const handleAddAppointment = (apt: Appointment) => {
    setAppointments(prev => [...prev, apt]);
  };

  const handleLogout = () => {
    localStorage.setItem('agenda_auto_logged', 'false');
    setCurrentView('landing');
  };

  if (currentView === 'landing') {
    return <LandingPage t={t} language={language} onStart={() => setCurrentView('dashboard')} />;
  }

  const renderView = () => {
    const commonProps = { language, t };
    switch (currentView) {
      case 'dashboard':
        return <Dashboard appointments={appointments} professional={professional} onUpgrade={() => setCurrentView('pricing')} {...commonProps} />;
      case 'calendar':
        return <CalendarView appointments={appointments} onUpdateStatus={handleUpdateStatus} onAddManual={handleAddAppointment} {...commonProps} />;
      case 'settings':
        return <Settings professional={professional} onViewPricing={() => setCurrentView('pricing')} {...commonProps} />;
      case 'booking':
        return <PublicBooking professional={professional} onBook={handleAddAppointment} {...commonProps} />;
      case 'pricing':
        return <Pricing onBack={() => setCurrentView('dashboard')} {...commonProps} />;
      case 'affiliate':
        return <Affiliate {...commonProps} />;
      default:
        return <Dashboard appointments={appointments} professional={professional} onUpgrade={() => setCurrentView('pricing')} {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 selection:bg-violet-200 font-sans">
      {/* Sidebar Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 p-2 flex justify-around md:relative md:flex-col md:w-72 md:border-r md:border-t-0 md:p-8 z-50 overflow-y-auto">
        <div className="hidden md:block mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-xl shadow-lg shadow-violet-200"></div>
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 tracking-tight">AgendaAuto</h1>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Global SaaS Engine</p>
        </div>
        
        <div className="flex w-full justify-around md:flex-col md:gap-2 mb-8">
          <NavLink active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} label={t.dashboard} icon={<LayoutDashboard className="w-5 h-5" />} />
          <NavLink active={currentView === 'calendar'} onClick={() => setCurrentView('calendar')} label={t.calendar} icon={<CalendarIcon className="w-5 h-5" />} />
          <NavLink active={currentView === 'booking'} onClick={() => setCurrentView('booking')} label={t.publicLink} icon={<LinkIcon className="w-5 h-5" />} />
          <NavLink active={currentView === 'affiliate'} onClick={() => setCurrentView('affiliate')} label={t.affiliate} icon={<Users className="w-5 h-5" />} />
          <NavLink active={currentView === 'settings'} onClick={() => setCurrentView('settings')} label={t.settings} icon={<SettingsIcon className="w-5 h-5" />} />
        </div>

        {/* Professional Notepad Block */}
        <AnimatePresence>
          {showNotesBlock && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="hidden md:block mb-10"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.notes}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setNotes('')}
                    title={t.clearNotes}
                    className="text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setShowNotesBlock(false)}
                    title={t.removeNotes}
                    className="text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="w-full h-36 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium text-slate-600 focus:ring-2 focus:ring-violet-200 outline-none resize-none transition-all placeholder:text-slate-300 shadow-inner"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls and Language */}
        <div className="hidden md:flex flex-col gap-6 mt-auto pt-8 border-t border-slate-100">
           {!showNotesBlock && (
             <button 
              onClick={() => setShowNotesBlock(true)}
              className="group flex items-center gap-2 text-[10px] font-black text-violet-500 uppercase tracking-widest hover:text-violet-600 transition-colors"
             >
               <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform" />
               {t.notes}
             </button>
           )}
           
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Language</p>
             <div className="flex gap-2">
                <LangBtn active={language === 'pt'} onClick={() => setLanguage('pt')} flag="🇧🇷" />
                <LangBtn active={language === 'en'} onClick={() => setLanguage('en')} flag="🇺🇸" />
                <LangBtn active={language === 'es'} onClick={() => setLanguage('es')} flag="🇪🇸" />
             </div>
           </div>

           <button 
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors group"
           >
             <Download className="w-4 h-4 group-hover:bounce" />
             {t.downloadApp}
           </button>

           <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors group"
           >
             <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             Sair
           </button>
        </div>
      </nav>

      <main className="flex-1 p-4 md:p-12 pb-24 md:pb-12 bg-slate-50 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Download Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDownloadModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full -mr-10 -mt-10"></div>
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-8">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 font-display tracking-tight">{t.downloadApp}</h3>
                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                  {t.downloadDesc}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <Smartphone className="w-6 h-6 text-violet-600" />
                    <div>
                      <p className="text-sm font-black text-slate-800">{t.installPwa}</p>
                      <p className="text-xs text-slate-400 font-medium">Abra no Chrome/Safari e selecione "Adicionar à Tela de Início"</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <Monitor className="w-6 h-6 text-fuchsia-600" />
                    <div>
                      <p className="text-sm font-black text-slate-800">{t.desktopApp}</p>
                      <p className="text-xs text-slate-400 font-medium">Clique no ícone de instalação na barra de endereços do navegador</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowDownloadModal(false)}
                  className="w-full mt-10 bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-violet-600 transition-all"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LangBtn: React.FC<{ active: boolean, onClick: () => void, flag: string }> = ({ active, onClick, flag }) => (
  <button 
    onClick={onClick}
    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all border ${active ? 'bg-violet-100 border-violet-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-300 opacity-50 grayscale hover:grayscale-0'}`}
  >
    {flag}
  </button>
);

const NavLink: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-violet-600 text-white shadow-xl shadow-violet-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
  >
    <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform`}>{icon}</div>
    <span className="text-[10px] md:text-sm font-bold tracking-tight">{label}</span>
  </button>
);

export default App;
