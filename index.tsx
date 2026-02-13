
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Log de diagnóstico
console.log("AgendaAuto: Iniciando aplicação...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("ERRO: Elemento #root não encontrado no HTML.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("AgendaAuto: Renderização inicial concluída.");
  } catch (error) {
    console.error("ERRO FATAL NA RENDERIZAÇÃO:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: #721c24; background: #f8d7da; border-radius: 8px; margin: 20px;">
        <h3>Erro ao carregar aplicação</h3>
        <p>Ocorreu um erro técnico impedindo o carregamento do AgendaAuto.</p>
        <pre style="font-size: 12px; overflow: auto;">${error.message}</pre>
        <p><small>Verifique o console do desenvolvedor (F12) para mais detalhes.</small></p>
      </div>
    `;
  }
}
