import { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  ChevronRight, 
  Loader2, 
  RefreshCw,
  PhoneCall,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SUGGESTIONS = [
  "¿Cómo funciona la facturación SUNAT?",
  "Tengo un Minimarket, ¿qué funciones especiales tiene?",
  "¿Puedo usarlo sin internet en mi tienda?",
  "¿Cuánto cuesta con la promoción activa?"
];

export default function AIConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '¡Hola! Bienvenido a GAORSYSTEM Perú, la solución inteligente para automatizar tu punto de venta e inventarios. 🚀 \n\nEscribe tu duda o cuéntame qué tipo de tienda manejas (ej. Bodega, Minimarket, Ferretería, Boutique) para darte recomendaciones personalizadas.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to chat bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/consultant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('No se pudo establecer comunicación con el consultor inteligente.');
      }

      const data = await response.json();
      const modelMsg: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus("Estamos procesando consultas en modo offline rápido temporal debido a configuración.");
      
      // Fallback response for direct seamless local demo
      const fallbackReplies: Record<string, string> = {
        "sunat": "¡Por supuesto! GAORSYSTEM está totalmente homologado por la SUNAT. Puedes emitir boletas, facturas, notas de crédito independientes desde el cajero de tu POS, imprimir recibos en ticket térmico y enviar resúmenes automatizados a la SUNAT al instante de cada venta.",
        "precio": "Nuestra Gran Promoción de Inicio de Mes tiene un **30% de descuento**: \n\n- Precio normal anual: S/ 2,300 \n- **Precio Promocional: S/ 1,600 (Gasto único anual)**\n\nTe incluye todas las actualizaciones gratuitas, soporte en Perú, multiusuario, multialmacén y facturas ilimitadas. Conversemos en WhatsApp al 989 666 214.",
        "minimarket": "Para un Minimarket, GAORSYSTEM ofrece:\n- Escaneo ultra-veloz de código de barra.\n- Sincronización instantánea de stock.\n- Alertas sobre productos con stock bajo.\n- Configuración de ofertas especiales por volumen.\n- Cierre de caja arqueado para evitar pérdidas.",
        "internet": "GAORSYSTEM funciona idealmente sincronizado 100% en la nube, lo que te permite monitorear tu negocio desde el celular, tu casa o cualquier parte del mundo. Sin embargo, nuestro software cuenta con un búfer local de contingencia para que sigas facturando y cobrando en caja si la señal de internet se debilita momentáneamente, enviando los datos apenas regrese el enlace."
      };

      let text = "¡Excelente consulta! Para el control comercial y de caja, GAORSYSTEM Perú cuenta con funciones adaptativas de inventario avanzado, cobros inmediatos por código de barras y reporte de balances. Contáctanos por WhatsApp al 989 666 214 para agendar tu demo del sistema real.";
      
      const lower = textToSend.toLowerCase();
      if (lower.includes("sunat") || lower.includes("boleta") || lower.includes("factura")) {
        text = fallbackReplies.sunat;
      } else if (lower.includes("precio") || lower.includes("costo") || lower.includes("cuanto") || lower.includes("promocion") || lower.includes("campaña")) {
        text = fallbackReplies.precio;
      } else if (lower.includes("minimarket") || lower.includes("bodega") || lower.includes("tienda")) {
        text = fallbackReplies.minimarket;
      } else if (lower.includes("internet") || lower.includes("linea") || lower.includes("nube")) {
        text = fallbackReplies.internet;
      }

      setMessages(prev => [...prev, {
        id: `offline-${Date.now()}`,
        role: 'model',
        text: text,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[540px] shadow-2xl relative">
      
      {/* Bot Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-950 to-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600/20 text-purple-400 p-2.5 rounded-2xl border border-purple-500/10">
            <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-white text-sm font-sans">Asesor Virtual GAOR</h4>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">Especialista en Punto de Venta y SUNAT</p>
          </div>
        </div>

        {/* Dynamic promotional tag inside header */}
        <div className="hidden sm:flex bg-purple-500/10 border border-purple-500/20 rounded-xl px-2.5 py-1 items-center gap-1.5 text-[10px] text-purple-300">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>30% OFF Activo</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
        {messages.map((msg) => {
          const isModel = msg.role === 'model';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                isModel ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border text-xs ${
                isModel 
                  ? 'bg-purple-950/50 border-purple-800/40 text-purple-400' 
                  : 'bg-teal-950/50 border-teal-800/40 text-teal-400'
              }`}>
                {isModel ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message text bubble */}
              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-xs leading-relaxed font-sans font-normal shadow-sm ${
                  isModel 
                    ? 'bg-slate-950/80 text-slate-200 border border-slate-800/80 rounded-tl-sm' 
                    : 'bg-purple-600 text-white rounded-tr-sm'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <div className={`text-[9px] text-slate-500 font-mono px-1 flex items-center gap-1 ${
                  isModel ? 'justify-start' : 'justify-end'
                }`}>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[80%] animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-purple-950/50 border border-purple-800/20 flex items-center justify-center text-purple-400">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            </div>
            <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-2xl rounded-tl-sm text-xs text-slate-400 flex items-center gap-1.5 font-sans">
              <span>Pensando recomendaciones para tu tienda</span>
              <span className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce delay-200"></span>
              </span>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs font-sans">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block mb-0.5">Nota Sincronización</span>
              <p className="text-[11px] text-amber-400/80 leading-normal">{errorStatus}</p>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length < 4 && (
        <div className="px-6 py-2 bg-slate-950/40 flex flex-wrap gap-2 border-t border-slate-800/40">
          {SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sug)}
              className="text-[10px] bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-full border border-slate-700/50 transition-colors text-left flex items-center gap-1 font-sans cursor-pointer"
            >
              <HelpCircle className="w-3 h-3 text-purple-400 shrink-0" />
              <span>{sug}</span>
              <ChevronRight className="w-2.5 h-2.5 text-slate-500 shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Chat Send Input Box */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(input);
            }}
            placeholder="Escribe tu consulta sobre el sistema, SUNAT, etc..."
            className="w-full bg-slate-900 border border-slate-850 rounded-2xl py-3 pl-4 pr-12 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all cursor-pointer ${
              input.trim() && !isLoading
                ? 'bg-purple-600 text-white hover:scale-105'
                : 'text-slate-500'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Contact/Demo Call action next to send box */}
        <a
          href="https://wa.me/51989666214?text=Hola%20GAORSYSTEM%20Per%C3%BA,%20vi%20su%20Asesor%20Virtual%20y%20me%20gustar%C3%ADa%20adquirir%20su%20sistema%20ERP%20Premium%20con%20el%2030%25%20de%20descuento%20anual%20(S/%201,600)."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:text-white px-3.5 py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/10 shrink-0 text-xs font-bold"
          title="Contacto comercial directo en WhatsApp"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Hablar con Humano</span>
        </a>
      </div>
    </div>
  );
}
