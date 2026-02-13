
import React from 'react';
import { Professional } from '../types';
import { WEEK_DAYS } from '../constants';

interface SettingsProps {
  professional: Professional;
  onViewPricing: () => void;
  t: any;
}

const Settings: React.FC<SettingsProps> = ({ professional, onViewPricing, t }) => {
  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.settings}</h2>
        <p className="text-slate-500 font-medium">{t.pt ? 'Gerencie seu perfil e suas automações inteligentes.' : (t.es ? 'Gestiona tu perfil y tus automatizaciones inteligentes.' : 'Manage your profile and smart automations.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Section */}
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-black text-lg flex items-center gap-3">
            <span className="p-2.5 bg-violet-50 text-violet-600 rounded-xl">👤</span> 
            {t.pt ? 'Perfil Profissional' : (t.es ? 'Perfil Profesional' : 'Professional Profile')}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.name}</label>
              <input type="text" defaultValue={professional.name} className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 font-medium focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.profession}</label>
              <input type="text" defaultValue={professional.profession} className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 font-medium focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.sessionValue} ({t.currency})</label>
              <input type="number" defaultValue={professional.sessionValue} className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 font-medium focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all outline-none" />
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-black text-lg flex items-center gap-3">
            <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">💳</span> 
            {t.pt ? 'Faturamento Stripe' : (t.es ? 'Facturación Stripe' : 'Stripe Billing')}
          </h3>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-xl text-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.pt ? 'Estado do Plano' : (t.es ? 'Estado del Plan' : 'Plan Status')}</span>
                <p className="text-xl font-black mt-1">Trial: {t.freeTrial}</p>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4 brightness-0 invert opacity-50" />
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
              {t.cancelAnytime}. <br/>
              {t.noChargeToday}.
            </p>
            <button 
              onClick={onViewPricing}
              className="w-full py-3 bg-violet-600 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-violet-700 transition-all shadow-lg shadow-violet-900/20"
            >
              {t.pt ? 'Gerenciar Assinatura' : (t.es ? 'Gestionar Suscripción' : 'Manage Subscription')}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-tighter">🔒 {t.pt ? 'Ambiente Seguro e Criptografado' : (t.es ? 'Ambiente Seguro y Encriptado' : 'Secure and Encrypted Environment')}</p>
        </section>

        {/* Availability Section */}
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-black text-lg flex items-center gap-3">
            <span className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">🕒</span> 
            {t.pt ? 'Disponibilidade' : (t.es ? 'Disponibilidad' : 'Availability')}
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.pt ? 'Início' : (t.es ? 'Inicio' : 'Start')}</label>
                <input type="time" defaultValue={professional.workingHours.start} className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 font-medium focus:ring-2 focus:ring-violet-500 transition-all outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.pt ? 'Fim' : (t.es ? 'Fin' : 'End')}</label>
                <input type="time" defaultValue={professional.workingHours.end} className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 font-medium focus:ring-2 focus:ring-violet-500 transition-all outline-none" />
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Automation Section */}
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-black text-lg flex items-center gap-3">
            <span className="p-2.5 bg-fuchsia-50 text-fuchsia-600 rounded-xl">📲</span> 
            {t.pt ? 'Automação WhatsApp' : (t.es ? 'Automatización WhatsApp' : 'WhatsApp Automation')}
          </h3>
          <div className="space-y-4">
             <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                <div>
                  <p className="font-black text-xs uppercase tracking-tight">{t.confirmation} 1-Clique</p>
                  <p className="text-[10px] font-medium text-slate-500">{t.pt ? 'Botões interativos da API Business' : (t.es ? 'Botones interactivos de API Business' : 'Interactive Business API Buttons')}</p>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full flex items-center px-1">
                  <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                </div>
             </div>
          </div>
        </section>

        <section className="md:col-span-2 flex justify-end gap-4 pt-8 border-t border-slate-100">
          <button className="px-8 py-3 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-all">{t.pt ? 'Descartar' : (t.es ? 'Descartar' : 'Discard')}</button>
          <button className="px-12 py-3 bg-violet-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-violet-200 hover:bg-violet-700 transition-all">{t.save}</button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
