
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface CalendarSyncProps {
  t: any;
}

const CalendarSync: React.FC<CalendarSyncProps> = ({ t }) => {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [outlookConnected, setOutlookConnected] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin
      if (!event.origin.endsWith('.run.app') && !event.origin.includes('localhost')) return;

      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        if (event.data.provider === 'google') setGoogleConnected(true);
        if (event.data.provider === 'microsoft') setOutlookConnected(true);
        setLoading(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnect = async (provider: 'google' | 'microsoft') => {
    setLoading(provider);
    try {
      const response = await fetch(`/api/auth/${provider}/url`);
      const { url } = await response.json();
      
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      window.open(
        url,
        `auth_${provider}`,
        `width=${width},height=${height},left=${left},top=${top}`
      );
    } catch (error) {
      console.error('Failed to get auth URL:', error);
      setLoading(null);
    }
  };

  return (
    <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
      <h3 className="font-black text-lg flex items-center gap-3">
        <span className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">📅</span> 
        {t.calendarSync}
      </h3>
      
      <p className="text-sm text-slate-500 font-medium leading-relaxed">
        {t.syncDesc}
      </p>

      <div className="space-y-4">
        {/* Google Calendar */}
        <div className={`p-5 rounded-2xl border transition-all ${googleConnected ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google" className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-sm text-slate-900">Google Calendar</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {googleConnected ? t.syncSuccess : 'Google Workspace'}
                </p>
              </div>
            </div>
            
            {googleConnected ? (
              <div className="flex items-center gap-2 text-emerald-600 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Ativo</span>
              </div>
            ) : (
              <button 
                onClick={() => handleConnect('google')}
                disabled={loading !== null}
                className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                {loading === 'google' ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ExternalLink className="w-3 h-3" />}
                {t.connectGoogle}
              </button>
            )}
          </div>
        </div>

        {/* Outlook Calendar */}
        <div className={`p-5 rounded-2xl border transition-all ${outlookConnected ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" alt="Outlook" className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-sm text-slate-900">Outlook Calendar</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {outlookConnected ? t.syncSuccess : 'Microsoft 365'}
                </p>
              </div>
            </div>
            
            {outlookConnected ? (
              <div className="flex items-center gap-2 text-emerald-600 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Ativo</span>
              </div>
            ) : (
              <button 
                onClick={() => handleConnect('microsoft')}
                disabled={loading !== null}
                className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                {loading === 'microsoft' ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ExternalLink className="w-3 h-3" />}
                {t.connectOutlook}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
          {t.pt ? 'Nota: A sincronização bidirecional garante que eventos criados na sua agenda pessoal bloqueiem horários no AgendaAuto, e vice-versa.' : 'Note: Two-way sync ensures personal events block time in AgendaAuto, and vice versa.'}
        </p>
      </div>
    </section>
  );
};

export default CalendarSync;
