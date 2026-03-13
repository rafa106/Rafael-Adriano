
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
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LandingPageProps {
  t: any;
  language: Language;
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ t, language, onStart }) => {
  return (
    <div className="bg-white min-h-screen selection:bg-violet-100 font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-xl shadow-lg shadow-violet-200 group-hover:rotate-6 transition-transform"></div>
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 tracking-tight font-display">AgendaAuto</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            <a href="#how-it-works" className="hover:text-violet-600 transition-colors">{t.howItWorks}</a>
            <a href="#features" className="hover:text-violet-600 transition-colors">Funcionalidades</a>
            <a href="#download" className="hover:text-violet-600 transition-colors">{t.downloadApp}</a>
            <button 
              onClick={onStart}
              className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-violet-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              {t.login}
            </button>
          </div>
          
          <button className="md:hidden p-2 text-slate-600">
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-violet-50/50 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-violet-100"
          >
            <Zap className="w-3 h-3 fill-current" />
            {t.trustedBy}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter max-w-5xl mx-auto font-display"
          >
            {t.heroTitle.split('IA')[0]} <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 italic">IA</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t.heroSub}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-violet-600 text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-violet-200 hover:bg-violet-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {t.startFree}
              <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#download"
              className="w-full sm:w-auto bg-white border border-slate-200 text-slate-600 px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              {t.downloadApp}
              <Download className="w-5 h-5" />
            </a>
          </motion.div>

          {/* New Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group"
          >
            <img 
              src="https://picsum.photos/seed/agenda-hero/1200/600?blur=1" 
              alt="AgendaAuto Dashboard Preview" 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-display tracking-tight">{t.howItWorks}</h3>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Três passos simples para automatizar sua vida profissional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-slate-200 -translate-y-1/2 -z-10"></div>
            
            <StepItem number="01" title={t.step1} desc={t.step1Desc} icon={<Calendar className="w-6 h-6" />} />
            <StepItem number="02" title={t.step2} desc={t.step2Desc} icon={<MessageSquare className="w-6 h-6" />} />
            <StepItem number="03" title={t.step3} desc={t.step3Desc} icon={<Zap className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 font-display tracking-tight leading-none">
                Gestão que parece <span className="text-violet-600 italic">mágica</span>.
              </h3>
              <div className="space-y-8">
                <FeatureRow 
                  icon={<Zap className="w-6 h-6 text-violet-600" />}
                  title={t.feature1Title}
                  desc={t.feature1Desc}
                />
                <FeatureRow 
                  icon={<Smartphone className="w-6 h-6 text-fuchsia-600" />}
                  title={t.feature2Title}
                  desc={t.feature2Desc}
                />
                <FeatureRow 
                  icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />}
                  title={t.feature3Title}
                  desc={t.feature3Desc}
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-[3rem] rotate-3 -z-10 opacity-10"></div>
              <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-6 bg-violet-50 rounded-3xl border border-violet-100">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-xl">🧠</div>
                    <div>
                      <p className="text-xs font-black text-violet-600 uppercase tracking-widest mb-1">IA Insights</p>
                      <p className="text-sm font-bold text-slate-800">"O cliente João Silva costuma cancelar às segundas. Enviando lembrete especial..."</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-xl">📈</div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Crescimento</p>
                      <p className="text-sm font-bold text-slate-800">Seu faturamento aumentou 24% este mês.</p>
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
            <a href="#" className="hover:text-violet-600 transition-colors">Termos</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Suporte</a>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            &copy; 2026 AgendaAuto - Global SaaS Engine
          </p>
        </div>
      </footer>
    </div>
  );
};

const StepItem = ({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) => (
  <div className="text-center group">
    <div className="w-20 h-20 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center mx-auto mb-8 group-hover:-translate-y-2 transition-transform duration-500 relative">
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-black">{number}</div>
      <div className="text-violet-600">{icon}</div>
    </div>
    <h4 className="text-xl font-black text-slate-900 mb-4 font-display">{title}</h4>
    <p className="text-slate-500 font-medium leading-relaxed text-sm">{desc}</p>
  </div>
);

const FeatureRow = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex gap-6 group">
    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-black text-slate-900 mb-2 font-display">{title}</h4>
      <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

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
