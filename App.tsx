
import React, { useState, useEffect } from 'react';
import { Appointment, AppointmentStatus, Professional } from './types';
import { MOCK_PROFESSIONAL, MOCK_APPOINTMENTS } from './constants';
import { Language, translations } from './translations';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import PublicBooking from './components/PublicBooking';
import Settings from './components/Settings';
import Pricing from './components/Pricing';
import TutorialVideo from './components/TutorialVideo';

type View = 'dashboard' | 'calendar' | 'settings' | 'booking' | 'pricing' | 'tutorial';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [language, setLanguage] = useState<Language>('pt');
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS as Appointment[]);
  const [professional] = useState<Professional>(MOCK_PROFESSIONAL);
  
  // States for Notepad
  const [notes, setNotes] = useState(() => localStorage.getItem('agenda_auto_notes') || '');
  const [showNotesBlock, setShowNotesBlock] = useState(() => {
    const saved = localStorage.getItem('agenda_auto_show_notes');
    return saved === null ? true : saved === 'true';
  });

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('agenda_auto_notes', notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('agenda_auto_show_notes', showNotesBlock.toString());
  }, [showNotesBlock]);

  const handleUpdateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status } : apt));
  };

  const handleAddAppointment = (apt: Appointment) => {
    setAppointments(prev => [...prev, apt]);
    if (currentView === 'calendar') {
      setCurrentView('calendar');
    }
  };

  const renderView = () => {
    const commonProps = { language, t };
    switch (currentView) {
      case 'dashboard':
        return <Dashboard appointments={appointments} professional={professional} onUpgrade={() => setCurrentView('pricing')} onViewDemo={() => setCurrentView('tutorial')} {...commonProps} />;
      case 'calendar':
        return <CalendarView appointments={appointments} onUpdateStatus={handleUpdateStatus} onAddManual={handleAddAppointment} {...commonProps} />;
      case 'settings':
        return <Settings professional={professional} onViewPricing={() => setCurrentView('pricing')} {...commonProps} />;
      case 'booking':
        return <PublicBooking professional={professional} onBook={handleAddAppointment} {...commonProps} />;
      case 'pricing':
        return <Pricing onBack={() => setCurrentView('dashboard')} {...commonProps} />;
      case 'tutorial':
        return <TutorialVideo t={t} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard appointments={appointments} professional={professional} onUpgrade={() => setCurrentView('pricing')} {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 selection:bg-violet-200">
      {/* Sidebar Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 p-2 flex justify-around md:relative md:flex-col md:w-64 md:border-r md:border-t-0 md:p-6 z-50 overflow-y-auto">
        <div className="hidden md:block mb-8 px-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-lg shadow-lg shadow-violet-200"></div>
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">AgendaAuto</h1>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global SaaS Engine</p>
        </div>
        
        <div className="flex w-full justify-around md:flex-col md:gap-2 mb-6">
          <NavLink active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} label={t.dashboard} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} />
          <NavLink active={currentView === 'calendar'} onClick={() => setCurrentView('calendar')} label={t.calendar} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
          <NavLink active={currentView === 'tutorial'} onClick={() => setCurrentView('tutorial')} label={t.viewDemo} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          <NavLink active={currentView === 'booking'} onClick={() => setCurrentView('booking')} label={t.publicLink} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>} />
        </div>

        {/* Professional Notepad Block */}
        {showNotesBlock && (
          <div className="hidden md:block mb-8 px-2 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.notes}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setNotes('')}
                  title={t.clearNotes}
                  className="text-[9px] font-bold text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <button 
                  onClick={() => setShowNotesBlock(false)}
                  title={t.removeNotes}
                  className="text-[9px] font-bold text-slate-300 hover:text-slate-500 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full h-32 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-600 focus:ring-2 focus:ring-violet-200 outline-none resize-none transition-all placeholder:text-slate-300"
            />
          </div>
        )}

        {/* Controls and Language */}
        <div className="hidden md:flex flex-col gap-2 mt-auto pt-6 border-t border-slate-100">
           {!showNotesBlock && (
             <button 
              onClick={() => setShowNotesBlock(true)}
              className="mb-4 text-[10px] font-black text-violet-500 uppercase tracking-widest hover:text-violet-600 text-left px-2"
             >
               + {t.notes}
             </button>
           )}
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Language</p>
           <div className="flex gap-2 px-2">
              <LangBtn active={language === 'pt'} onClick={() => setLanguage('pt')} flag="🇧🇷" />
              <LangBtn active={language === 'en'} onClick={() => setLanguage('en')} flag="🇺🇸" />
              <LangBtn active={language === 'es'} onClick={() => setLanguage('es')} flag="🇪🇸" />
           </div>
        </div>
      </nav>

      <main className="flex-1 p-4 md:p-10 pb-24 md:pb-10 bg-slate-50 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
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
    className={`flex flex-col md:flex-row items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${active ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
  >
    <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform`}>{icon}</div>
    <span className="text-[10px] md:text-sm font-bold tracking-tight">{label}</span>
  </button>
);

export default App;
