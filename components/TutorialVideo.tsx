
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface TutorialVideoProps {
  t: any;
  onBack: () => void;
}

const TutorialVideo: React.FC<TutorialVideoProps> = ({ t, onBack }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [needsKey, setNeedsKey] = useState(false);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      try {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setNeedsKey(true);
        }
      } catch (e) {
        console.warn("Ambiente externo detectado: Verificação de chave ignorada.");
      }
    }
  };

  const handleOpenKeySelector = async () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setNeedsKey(false);
      generateDemoVideo();
    } else {
      alert("Seletor de chaves disponível apenas no ambiente de desenvolvimento.");
    }
  };

  const generateDemoVideo = async () => {
    setIsGenerating(true);
    setStatusText(t.videoStep1);

    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : "";

    if (!apiKey) {
      alert("API KEY não configurada. Verifique as variáveis de ambiente.");
      setIsGenerating(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = "A professional woman in a bright, modern office using a sleek tablet app with a violet and white interface. The app shows a calendar with checkmarks and scheduling buttons. Cinematic lighting, high quality, 4k, smooth motion, professional atmosphere.";

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      const statusInterval = setInterval(() => {
        setStatusText(prev => {
          if (prev === t.videoStep1) return t.videoStep2;
          if (prev === t.videoStep2) return t.videoStep3;
          return t.videoStep1;
        });
      }, 8000);

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      clearInterval(statusInterval);
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${apiKey}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error("Error generating video:", error);
      if (error.message?.includes("Requested entity was not found")) {
        setNeedsKey(true);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-10">
        <button onClick={onBack} className="text-slate-400 hover:text-violet-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
          ← {t.back}
        </button>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Showcase AgendaAuto</h2>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 aspect-video flex items-center justify-center relative">
        {videoUrl ? (
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-cover"
          />
        ) : isGenerating ? (
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-100 border-t-violet-600 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-violet-600">AI</div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-black text-slate-900 animate-pulse">{statusText}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.generatingVideo}</p>
            </div>
          </div>
        ) : needsKey ? (
          <div className="p-10 text-center space-y-8">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-sm">
              🔑
            </div>
            <div className="max-w-sm mx-auto space-y-4">
              <h3 className="text-xl font-black text-slate-900">{t.selectKey}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Para gerar uma demonstração personalizada com o modelo Veo 3.1 da Google, você precisa selecionar uma chave de API de um projeto com faturamento ativo.
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <button 
                onClick={handleOpenKeySelector}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-violet-600 transition-all"
              >
                Selecionar Chave de API
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-violet-600 underline"
              >
                {t.billingDoc}
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-violet-100 text-violet-600 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto shadow-inner">
              🎬
            </div>
            <button 
              onClick={generateDemoVideo}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-violet-200 hover:scale-105 transition-all"
            >
              Gerar Demo com IA
            </button>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Powered by Google Veo 3.1</p>
          </div>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard title="Interface Fluida" text="Design otimizado para profissionais que não têm tempo a perder." icon="📱" />
        <FeatureCard title="Bot Inteligente" text="Confirmações automáticas via WhatsApp Business API." icon="🤖" />
        <FeatureCard title="Insights de IA" text="Redução real de faltas com análise de comportamento." icon="🧠" />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, text, icon }: { title: string, text: string, icon: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
    <div className="text-2xl mb-4">{icon}</div>
    <h4 className="font-black text-slate-900 mb-2">{title}</h4>
    <p className="text-xs text-slate-500 font-medium leading-relaxed">{text}</p>
  </div>
);

export default TutorialVideo;
