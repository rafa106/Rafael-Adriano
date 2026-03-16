
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  DollarSign, 
  MousePointerClick,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { Language } from '../translations';

interface AffiliateProps {
  language: Language;
  t: any;
}

const Affiliate: React.FC<AffiliateProps> = ({ t }) => {
  const [copied, setCopied] = useState(false);
  const affiliateLink = `https://agendaauto.com/ref/user_${Math.floor(Math.random() * 10000)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
      className="space-y-10 pb-10"
    >
      {/* Header Section */}
      <motion.section 
        variants={item}
        className="relative overflow-hidden rounded-[3.5rem] p-12 text-white shadow-2xl bg-gradient-to-br from-indigo-600 to-violet-700"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full -mr-20 -mt-20 blur-[80px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/10">
              <Award className="w-3 h-3" />
              {t.affiliate}
            </div>
            <h2 className="text-5xl font-black tracking-tight leading-none mb-4 font-display">
              {t.affiliateTitle}
            </h2>
            <p className="text-white/70 font-bold text-lg max-w-xl">
              {t.affiliateSub}
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">{t.affiliateCommission}</p>
            <p className="text-6xl font-black tracking-tighter">40%</p>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          label={t.affiliateEarnings} 
          value={`${t.currency} 1.240,00`} 
          icon={<DollarSign className="w-6 h-6 text-emerald-500" />} 
          trend="+12% este mês"
        />
        <StatCard 
          label={t.affiliateSales} 
          value="18" 
          icon={<Users className="w-6 h-6 text-violet-500" />} 
          trend="+3 novas"
        />
        <StatCard 
          label={t.affiliateClicks} 
          value="452" 
          icon={<MousePointerClick className="w-6 h-6 text-fuchsia-500" />} 
          trend="Taxa: 4.2%"
        />
      </div>

      {/* Link Section */}
      <motion.section variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display mb-4">{t.affiliateLink}</h3>
          <p className="text-slate-500 font-medium mb-8">Compartilhe este link com outros profissionais e receba sua comissão automaticamente a cada mensalidade paga.</p>
          
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 group">
            <LinkIcon className="w-5 h-5 text-slate-400 ml-2" />
            <code className="flex-1 text-sm font-bold text-slate-600 truncate">{affiliateLink}</code>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-violet-600'}`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t.linkCopied : t.copyLink}
            </button>
          </div>

          <div className="mt-10 pt-10 border-t border-slate-100">
            <h4 className="text-xl font-black text-slate-900 tracking-tight font-display mb-4">{t.payoutTitle}</h4>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">{t.payoutDesc}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 rounded-xl text-xs font-black uppercase tracking-widest">
              <TrendingUp className="w-3 h-3" />
              {t.minPayout}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display mb-8">{t.payoutMethod}</h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.payoutMethod}</label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-violet-200 transition-all">
                <option>PIX (Brasil)</option>
                <option>PayPal (Global)</option>
                <option>Bank Transfer (SWIFT)</option>
              </select>
            </div>
            
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{t.payoutKey}</label>
              <input 
                type="text" 
                placeholder="Ex: seuemail@exemplo.com"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-violet-200 transition-all"
              />
            </div>

            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-violet-600 transition-all shadow-lg shadow-slate-200">
              {t.save}
            </button>

            <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{t.payoutStatus}</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">Ativo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{t.payoutNext}</span>
                <ArrowUpRight className="w-4 h-4 text-white/30" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

const StatCard = ({ label, value, icon, trend }: { label: string, value: string, icon: React.ReactNode, trend: string }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
    whileHover={{ y: -5 }}
    className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group"
  >
    <div className="flex items-center justify-between mb-8">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
        <TrendingUp className="w-3 h-3" />
        {trend}
      </div>
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className="text-4xl font-black text-slate-900 tracking-tighter">{value}</p>
  </motion.div>
);

export default Affiliate;
