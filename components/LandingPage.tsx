
import React from 'react';
import { Language } from '../translations';

interface LandingPageProps {
  t: any;
  language: Language;
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ t, language, onStart }) => {
  return (
    <div className="bg-white min-h-screen selection:bg-violet-100">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-xl shadow-lg shadow-violet-200"></div>
          <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 tracking-tight">AgendaAuto</h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
          <a href="#features" className="hover:text-violet-600 transition-colors">Funcionalidades</a>
          <a href="#pricing" className="hover:text-violet-600 transition-colors">Preços</a>
          <button 
            onClick={onStart}
            className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-violet-600 transition-all shadow-xl shadow-slate-200"
          >
            {t.login}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
        <div className="inline-block bg-violet-50 text-violet-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-bounce">
          ✨ {t.trustedBy}
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter max-w-4xl mx-auto">
          {t.heroTitle.split('IA')[0]} <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">IA</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.heroSub}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto bg-violet-600 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-violet-200 hover:scale-105 active:scale-95 transition-all"
          >
            {t.startFree}
          </button>
        </div>
        
        {/* Mockup Preview */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
          <div className="bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border border-slate-800 rotate-1 transform-gpu">
            <div className="bg-slate-50 rounded-[1.5rem] overflow-hidden aspect-[16/10] flex items-center justify-center text-slate-200">
               {/* Simulação de interface */}
               <div className="w-full h-full p-8 flex flex-col gap-6 opacity-40">
                  <div className="flex justify-between items-center">
                     <div className="w-32 h-8 bg-slate-200 rounded-lg"></div>
                     <div className="flex gap-4">
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                     </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                     <div className="h-32 bg-slate-200 rounded-2xl"></div>
                     <div className="h-32 bg-slate-200 rounded-2xl"></div>
                     <div className="h-32 bg-slate-200 rounded-2xl"></div>
                  </div>
                  <div className="flex-1 bg-slate-200 rounded-[2rem]"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-3xl font-black text-slate-900 mb-4">{t.dashboard} Inteligente</h3>
            <p className="text-slate-500 font-medium">Tudo o que você precisa para escalar seu negócio.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureItem title={t.feature1Title} desc={t.feature1Desc} icon="🧠" />
            <FeatureItem title={t.feature2Title} desc={t.feature2Desc} icon="🔗" />
            <FeatureItem title={t.feature3Title} desc={t.feature3Desc} icon="📈" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <StatItem value="15h" label="Salvas por semana" />
          <StatItem value="42%" label="Menos faltas" />
          <StatItem value="5k+" label="Profissionais" />
          <StatItem value="100%" label="Criptografado" />
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-violet-200">
           <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Pronto para transformar<br/>sua rotina?</h3>
           <button 
             onClick={onStart}
             className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
           >
             {t.startTrial}
           </button>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
        &copy; 2024 AgendaAuto - Global SaaS Engine
      </footer>
    </div>
  );
};

const FeatureItem = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{icon}</div>
    <h4 className="text-xl font-black text-slate-900 mb-4">{title}</h4>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div>
    <p className="text-5xl font-black text-slate-900 tracking-tighter mb-2">{value}</p>
    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</p>
  </div>
);

export default LandingPage;
