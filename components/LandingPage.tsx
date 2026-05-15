
import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  MessageSquare, 
  Calendar,
  Download,
  ChevronDown
} from 'lucide-react';
import { Language } from '../translations';
import { Professional } from '../types';
import AdSense from './AdSense';
import LegalModal from './LegalModal';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LandingPageProps {
  t: any;
  language: Language;
  onStart: () => void;
  professional: Professional;
}

const LandingPage: React.FC<LandingPageProps> = ({ t, language, onStart, professional }) => {
  const [legalModal, setLegalModal] = React.useState<{ isOpen: boolean; type: 'terms' | 'privacy' }>({
    isOpen: false,
    type: 'terms'
  });

  return (
    <div className="bg-white min-h-screen selection:bg-violet-100 font-sans text-slate-900 overflow-x-hidden">
      {/* Legal Modal */}
      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
        type={legalModal.type}
        t={t}
      />
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-7xl">
        <div className="glass-effect rounded-3xl px-6 h-20 flex items-center justify-between shadow-2xl shadow-slate-200/50">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-500 rounded-xl shadow-lg shadow-violet-200 group-hover:rotate-12 transition-transform duration-500"></div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">AgendaAuto</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-xs font-black text-slate-500 uppercase tracking-widest">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors uppercase">{t.howItWorks}</a>
            <a href="#features" className="hover:text-slate-900 transition-colors uppercase">Funcionalidades</a>
            <a href="#download" className="hover:text-slate-900 transition-colors uppercase">{t.downloadApp}</a>
            <button 
              onClick={onStart}
              className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl hover:bg-violet-600 transition-all shadow-xl shadow-slate-200 active:scale-95 text-xs uppercase tracking-widest font-black"
            >
              {t.login}
            </button>
          </div>
          
          <button className="md:hidden p-3 bg-slate-900 text-white rounded-2xl shadow-lg" onClick={onStart}>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-40 px-6 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse -z-10"></div>
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-fuchsia-200/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse delay-700 -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-indigo-100/50 shadow-sm"
          >
            <Zap className="w-3 h-3 fill-current" />
            {t.trustedBy}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[9.5rem] font-black text-slate-900 leading-[0.85] mb-10 tracking-[-0.04em] max-w-6xl mx-auto font-display"
          >
            {t.heroTitle.split('IA')[0]} <span className="text-white bg-slate-900 px-4 py-1 rounded-[1.5rem] md:rounded-[2.5rem] transform -rotate-1 inline-block">IA</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            {t.heroSub}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-slate-900 text-white px-14 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:bg-indigo-600 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              {t.startFree}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#download"
              className="w-full sm:w-auto bg-white/50 backdrop-blur-md border border-slate-200 text-slate-900 px-14 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:border-slate-300 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-100"
            >
              {t.downloadApp}
              <Download className="w-5 h-5" />
            </a>
          </motion.div>

          {/* New Hero Image with perspective effect */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 perspective-1000"
          >
            <div className="relative max-w-5xl mx-auto rounded-[3rem] p-4 bg-white/30 backdrop-blur-sm border border-white/50 shadow-[0_50px_100px_rgba(0,0,0,0.1)] group">
              <div className="aspect-[16/9] rounded-[2rem] overflow-hidden bg-slate-100 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" 
                  alt="AgendaAuto Preview" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  referrerPolicy="no-referrer"
                />
                {/* Floating UI element */}
                <div className="absolute top-10 left-10 p-6 glass-effect rounded-[2rem] shadow-2xl animate-float">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sucesso</p>
                      <p className="text-sm font-black text-slate-900">Agendamento Confirmado!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-40 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 via-white to-white -z-20"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h3 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 font-display tracking-tight leading-none">
              Gestão <span className="text-indigo-600 italic">simplificada</span>
            </h3>
            <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Três passos simples para automatizar sua vida profissional e focar no que realmente importa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch">
            <StepItem number="01" title={t.step1} desc={t.step1Desc} icon={<Calendar className="w-6 h-6" />} color="indigo" />
            <StepItem number="02" title={t.step2} desc={t.step2Desc} icon={<MessageSquare className="w-6 h-6" />} color="violet" />
            <StepItem number="03" title={t.step3} desc={t.step3Desc} icon={<Zap className="w-6 h-6" />} color="fuchsia" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-40 px-6 bg-slate-900 text-white rounded-[4rem] mx-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 text-white/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10">
                Funcionalidades Premium
              </div>
              <h3 className="text-5xl md:text-8xl font-black mb-12 font-display tracking-tight leading-[0.85]">
                Parece <span className="text-indigo-400 italic">mágica</span>, mas é IA.
              </h3>
              <div className="grid gap-10">
                <FeatureRow 
                  icon={<Zap className="w-6 h-6" />}
                  title={t.feature1Title}
                  desc={t.feature1Desc}
                  color="indigo"
                />
                <FeatureRow 
                  icon={<Smartphone className="w-6 h-6" />}
                  title={t.feature2Title}
                  desc={t.feature2Desc}
                  color="fuchsia"
                />
                <FeatureRow 
                  icon={<ShieldCheck className="w-6 h-6" />}
                  title={t.feature3Title}
                  desc={t.feature3Desc}
                  color="emerald"
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-10 bg-indigo-500/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
              <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-6 p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all">
                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-3xl shadow-inner">🧠</div>
                    <div>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">IA Preditiva</p>
                      <p className="text-lg font-bold text-white/90 leading-tight">"Detectamos alta demanda para próximas segundas. Sugerimos abrir novos slots."</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all">
                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-3xl shadow-inner">⚡</div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2">Automação WhatsApp</p>
                      <p className="text-lg font-bold text-white/90 leading-tight">12 confirmações automáticas enviadas hoje sem sua intervenção.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[120px] -ml-64 -mb-64"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-black mb-8 font-display tracking-tight leading-none">
                {t.downloadApp}
              </h3>
              <p className="text-xl text-slate-400 font-medium mb-12 leading-relaxed">
                {t.downloadDesc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="flex items-center gap-4 bg-white text-slate-900 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all group">
                  <Smartphone className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-50 leading-none mb-1">Disponível para</p>
                    <p>iOS & Android</p>
                  </div>
                </button>
                <button className="flex items-center gap-4 bg-slate-800 text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-700 transition-all group border border-slate-700">
                  <Monitor className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-50 leading-none mb-1">Disponível para</p>
                    <p>Windows & Mac</p>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="flex justify-center relative">
              <div className="absolute -inset-10 bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/30 blur-[80px] -z-10 animate-pulse"></div>
              <motion.div 
                initial={{ rotate: -5, y: 20 }}
                whileInView={{ rotate: 0, y: 0 }}
                className="relative w-72 h-[580px] bg-slate-800 rounded-[3rem] border-8 border-slate-700 shadow-2xl overflow-hidden group"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-700 rounded-b-2xl z-20"></div>
                <img 
                  src="https://picsum.photos/seed/mobile-app/600/1200" 
                  alt="App Interface" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                  <p className="text-white font-black text-xl leading-tight">Sua agenda sempre com você.</p>
                </div>
              </motion.div>
              
              {/* Floating secondary image */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute -right-12 top-1/2 -translate-y-1/2 hidden xl:block w-48 h-48 rounded-3xl overflow-hidden border-4 border-white shadow-2xl rotate-12"
              >
                <img 
                  src="https://picsum.photos/seed/professional/400/400" 
                  alt="Professional using app" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-black text-slate-900 mb-16 text-center font-display tracking-tight">{t.faq}</h3>
          <div className="space-y-6">
            <FaqItem question={t.faq1Q} answer={t.faq1A} />
            <FaqItem question={t.faq2Q} answer={t.faq2A} />
            <FaqItem question={t.faq3Q} answer={t.faq3A} />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[4rem] p-12 md:p-24 text-center text-white shadow-[0_40px_80px_-20px_rgba(124,58,237,0.4)] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative z-10"
           >
             <h3 className="text-4xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter font-display">
               Pronto para transformar<br/>sua rotina?
             </h3>
             <button 
               onClick={onStart}
               className="bg-white text-slate-900 px-16 py-7 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-slate-50 hover:-translate-y-1 active:scale-95 transition-all"
             >
               {t.startTrial}
             </button>
             <p className="mt-8 text-white/60 font-bold text-xs uppercase tracking-[0.2em]">{t.noChargeToday}</p>
           </motion.div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-lg"></div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">AgendaAuto</h1>
          </div>
          <div className="flex gap-10 text-xs font-black text-slate-400 uppercase tracking-widest">
            <button 
              onClick={() => setLegalModal({ isOpen: true, type: 'terms' })}
              className="hover:text-violet-600 transition-colors uppercase cursor-pointer"
            >
              {t.terms}
            </button>
            <button 
              onClick={() => setLegalModal({ isOpen: true, type: 'privacy' })}
              className="hover:text-violet-600 transition-colors uppercase cursor-pointer"
            >
              {t.privacy}
            </button>
            <a href="mailto:rafaeladrianoconstancio10@gmail.com" className="hover:text-violet-600 transition-colors uppercase">Suporte</a>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            &copy; 2026 AgendaAuto - Global SaaS Engine
          </p>
        </div>
      </footer>
    </div>
  );
};

const StepItem = ({ number, title, desc, icon, color }: { number: string, title: string, desc: string, icon: React.ReactNode, color: string }) => {
  const colorMap: any = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-100/50',
    violet: 'bg-violet-50 text-violet-600 border-violet-100 shadow-violet-100/50',
    fuchsia: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 shadow-fuchsia-100/50'
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white p-12 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 text-center relative group overflow-hidden h-full flex flex-col justify-center"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 blur-3xl opacity-20 transition-all group-hover:scale-150 ${colorMap[color].split(' ')[0]}`}></div>
      <div className={`w-20 h-20 rounded-[2rem] ${colorMap[color]} shadow-2xl flex items-center justify-center mx-auto mb-10 transition-all group-hover:rotate-6 duration-500`}>
        {icon}
      </div>
      <h4 className="text-2xl font-black text-slate-900 mb-4 font-display tracking-tight">{title}</h4>
      <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">{desc}</p>
      <div className="mt-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">{number}</div>
    </motion.div>
  );
};

const FeatureRow = ({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) => {
  const colorMap: any = {
    indigo: 'bg-indigo-500/20 text-indigo-400',
    fuchsia: 'bg-fuchsia-500/20 text-fuchsia-400',
    emerald: 'bg-emerald-500/20 text-emerald-400'
  };

  return (
    <div className="flex gap-8 group">
      <div className={`flex-shrink-0 w-16 h-16 rounded-[1.5rem] ${colorMap[color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/20`}>
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-black text-white mb-3 font-display tracking-tight leading-none">{title}</h4>
        <p className="text-slate-400 font-medium leading-relaxed text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
};

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-slate-100 pb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-lg font-black text-slate-900 group-hover:text-violet-600 transition-colors">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 text-slate-500 font-medium leading-relaxed"
        >
          {answer}
        </motion.p>
      )}
    </div>
  );
};

export default LandingPage;
