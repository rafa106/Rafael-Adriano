
import React, { useState } from 'react';

interface PricingProps {
  onBack: () => void;
  t: any;
}

declare global {
  interface Window {
    Stripe: any;
  }
}

const STRIPE_PUBLIC_KEY = 'pk_test_51RjKR8PIKIDmETAzx07ClYj3aWwC8SmdIvLrPOj0R0SgLPuJuRAgoTTo6ZmeQnwwN9J0VWXn4Toi980WSBe4TEv200cLA88Jv8';

const Pricing: React.FC<PricingProps> = ({ onBack, t }) => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planName: string) => {
    setLoadingPlan(planName);
    
    // Inicializa o Stripe com a chave fornecida
    const stripe = window.Stripe(STRIPE_PUBLIC_KEY);
    
    console.log(`Iniciando checkout Stripe para o plano: ${planName}`);
    
    // Simulação de delay de rede para feedback visual do usuário
    setTimeout(() => {
      alert(`[Stripe Checkout]\nPlano: ${planName}\nOferta: ${t.freeTrial}\n\n${t.noChargeToday}.`);
      setLoadingPlan(null);
    }, 1500);
  };

  const plans = [
    {
      name: t.pt ? 'Básico' : (t.es ? 'Básico' : 'Basic'),
      price: '39',
      features: [
        'Até 50 agendamentos/mês',
        'Confirmação via WhatsApp',
        'Agenda Inteligente',
        'Link Público'
      ],
      recommended: false,
    },
    {
      name: t.pt ? 'Profissional' : (t.es ? 'Profesional' : 'Professional'),
      price: '59',
      features: [
        'Agendamentos Ilimitados',
        'Insights de IA Avançados',
        'Lembretes Customizados',
        'Relatórios de Receita',
        'Suporte VIP via WhatsApp'
      ],
      recommended: true,
    },
    {
      name: 'Premium',
      price: '99',
      features: [
        'Tudo do Profissional',
        'Time de Especialistas',
        'IA de Reagendamento',
        'Integração Google/Outlook',
        'API Personalizada'
      ],
      recommended: false,
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in slide-in-from-bottom-10 duration-700">
      <div className="text-center mb-20">
        <div className="inline-block bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
          🎁 {t.freeTrial}
        </div>
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
          {t.pt ? 'Sua produtividade merece o' : (t.es ? 'Tu productividad merece el' : 'Your productivity deserves the')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">{t.pt ? 'melhor plano' : (t.es ? 'mejor plan' : 'best plan')}</span>
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          {t.cancelAnytime}. {t.noChargeToday}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`group relative flex flex-col p-10 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:-translate-y-4 ${
              plan.recommended 
                ? 'bg-slate-900 text-white scale-110 z-10' 
                : 'bg-white border border-slate-100'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                {t.pt ? 'MAIS POPULAR' : (t.es ? 'MÁS POPULAR' : 'MOST POPULAR')}
              </div>
            )}
            
            <div className="mb-10">
              <h3 className={`text-2xl font-black ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
              <div className="mt-6 flex items-baseline">
                <span className="text-6xl font-black tracking-tighter">{t.currency} {plan.price}</span>
                <span className={`ml-2 text-sm font-bold uppercase tracking-widest ${plan.recommended ? 'text-slate-400' : 'text-slate-500'}`}>/mês</span>
              </div>
              <p className={`mt-2 text-[10px] font-black uppercase tracking-widest ${plan.recommended ? 'text-emerald-400' : 'text-emerald-500'}`}>
                ✨ {t.freeTrial}
              </p>
            </div>

            <ul className="flex-1 space-y-5 mb-12">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-4 text-sm font-bold">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${plan.recommended ? 'bg-violet-500/20 text-violet-400' : 'bg-emerald-100 text-emerald-500'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={plan.recommended ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              disabled={loadingPlan !== null}
              onClick={() => handleCheckout(plan.name)}
              className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                plan.recommended 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-500/40 hover:scale-105 active:scale-95' 
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {loadingPlan === plan.name ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : t.startTrial}
            </button>
            <p className={`text-center mt-4 text-[9px] font-bold uppercase tracking-widest ${plan.recommended ? 'text-slate-500' : 'text-slate-400'}`}>
              {t.cancelAnytime}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full border border-slate-200 shadow-sm mb-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-5" />
          <div className="w-px h-4 bg-slate-200"></div>
          <span className="text-xs font-black text-slate-500 uppercase tracking-[0.1em]">{t.pt ? 'Pagamento 100% Criptografado' : (t.es ? 'Pago 100% Encriptado' : '100% Encrypted Payment')}</span>
          <span className="text-emerald-500 text-lg">🛡️</span>
        </div>
        <br />
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-violet-600 font-black text-xs uppercase tracking-[0.2em] transition-all"
        >
          ← {t.back}
        </button>
      </div>
    </div>
  );
};

export default Pricing;
