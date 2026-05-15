
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
  t: any;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type, t }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${type === 'privacy' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {type === 'privacy' ? <Shield className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight font-display">
                    {type === 'privacy' ? t.privacy : t.terms}
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AgendaAuto Global</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-10 max-h-[60vh] overflow-y-auto">
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  {type === 'privacy' ? t.privacyText : t.termsText}
                </p>
                
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">1. Visão Geral</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Este documento estabelece as diretrizes para o uso da nossa plataforma. O AgendaAuto é um software de produtividade focado em agendamentos.
                </p>

                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">2. Uso de Dados</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Utilizamos integrações com Google e Outlook apenas para sincronização de horários. Suas informações de contato do WhatsApp são utilizadas para o envio automático de lembretes.
                </p>

                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">3. Responsabilidades</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  O usuário é responsável pela veracidade dos dados inseridos e pela gestão de seus próprios clientes através da plataforma.
                </p>
              </div>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-violet-600 transition-all shadow-xl shadow-slate-200"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
