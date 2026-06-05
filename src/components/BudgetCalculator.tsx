import { useState, useMemo } from 'react';
import { 
  Building2, 
  Store, 
  ShoppingBag, 
  UtensilsCrossed, 
  ShieldCheck,
  Check, 
  Smartphone, 
  Printer, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  HelpCircle as QuestionIcon,
  Database,
  Calculator,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RubroOption {
  id: string;
  name: string;
  icon: any;
  desc: string;
}

export default function BudgetCalculator() {
  const [rubro, setRubro] = useState<string>('minimarket');
  const [branches, setBranches] = useState<number>(1);
  const [selectedTools, setSelectedTools] = useState<string[]>(['printer']);
  const [showCampaignModal, setShowCampaignModal] = useState<boolean>(false);

  // Rubro definitions
  const rubros: RubroOption[] = [
    { 
      id: 'minimarket', 
      name: 'Minimarkets & Bodegas', 
      icon: Store, 
      desc: 'Venta rápida, código de barras, control de vencimiento de alimentos.' 
    },
    { 
      id: 'ferreteria', 
      name: 'Ferreterías & Eléctricos', 
      icon: Building2, 
      desc: 'Venta por metros, kilos, control multialmacén de repuestos.' 
    },
    { 
      id: 'boutique', 
      name: 'Boutiques & Calzado', 
      icon: ShoppingBag, 
      desc: 'Control de tallas, colores, categorías de moda y stock físico.' 
    },
    { 
      id: 'restaurante', 
      name: 'Restaurantes & Cafés', 
      icon: UtensilsCrossed, 
      desc: 'Comandas a cocina, administración de mesas y control de recetas.' 
    }
  ];

  // Optional Equipment add-ons
  const equipmentOptions = [
    { id: 'printer', label: 'Ticketera Térmica SUNAT', desc: 'Emite boletas físicas directas.', icon: Printer },
    { id: 'scanner', label: 'Lector Láser de Barras', desc: 'Sincroniza y lee códigos rápido.', icon: Smartphone },
    { id: 'drawer', label: 'Cajón Monedero Inteligente', desc: 'Apertura automática con el cobro.', icon: Database }
  ];

  const handleToolToggle = (id: string) => {
    setSelectedTools(prev => 
      prev.includes(id) 
        ? prev.filter(tool => tool !== id) 
        : [...prev, id]
    );
  };

  // Precomputed WhatsApp text 
  const whatsappUrl = useMemo(() => {
    const selectedRubroName = rubros.find(r => r.id === rubro)?.name || rubro;
    const toolsStr = selectedTools.length > 0 
      ? selectedTools.map(t => equipmentOptions.find(o => o.id === t)?.label).join(', ')
      : 'Ninguno';
    
    const text = `Hola GAORSYSTEM! Acabo de cotizar en el sistema interactivo:\n\n` +
      `- Rubro de negocio: *${selectedRubroName}*\n` +
      `- Sucursales configuradas: *${branches}*\n` +
      `- Equipos seleccionados: *${toolsStr}*\n\n` +
      `Deseo solicitar la cotización formal aplicando la *Campaña Activa con 30% Descuento Especial*.`;
    
    return `https://wa.me/51989666214?text=${encodeURIComponent(text)}`;
  }, [rubro, branches, selectedTools]);

  return (
    <div className="bg-slate-900 border border-purple-500/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
      {/* Decorative Glow Orb */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header of Configurator */}
      <div className="text-center md:text-left mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-purple-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          COTIZADOR AUTOMÁTICO DE SUCURSAL
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Diseña tu Solución en Vivo & Descubre tu Expectativa
        </h3>
        <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
          Selecciona tu rubro comercial, el número de puntos de venta que deseas interconectar en la nube, equipamiento adicional y obtén al instante tu propuesta personalizada con la campaña activa de hoy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Step-by-Step interactive controller (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Rubro Selection */}
          <div className="space-y-3">
            <span className="text-[11px] font-black tracking-widest text-teal-400 uppercase font-mono block">
              Paso 1: Selecciona tu Rubro o Giro de Negocio
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rubros.map((item) => {
                const IconComp = item.icon;
                const isSelected = rubro === item.id;
                return (
                  <motion.button
                    type="button"
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRubro(item.id)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative group flex gap-3.5 items-start ${
                      isSelected 
                        ? 'bg-gradient-to-br from-purple-950/40 to-slate-900 border-purple-500 shadow-xl shadow-purple-950/30' 
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/70'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 border ${
                      isSelected 
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-extrabold text-xs sm:text-xs">
                          {item.name}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Branches Configuration */}
          <div className="space-y-3 bg-slate-950/30 p-5 rounded-2xl border border-slate-850">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-black tracking-widest text-purple-400 uppercase font-mono">
                Paso 2: Número de Locales / Sucursales
              </span>
              <span className="text-[11px] font-bold font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full select-none">
                {branches === 1 ? 'Solo local principal' : `Local central + ${branches - 1} sucursales`}
              </span>
            </div>
            
            <div className="pt-2">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setBranches(num)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono transition-all border cursor-pointer ${
                      branches === num
                        ? 'bg-teal-500/10 border-teal-500 text-teal-400 shadow-md shadow-teal-950/20'
                        : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {num === 1 ? '1 Local' : `${num} Locales`}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-sans italic">
              * El sistema GAORSYSTEM sincroniza en tiempo real inventarios, cajas y reportes de todas tus sucursales en la nube.
            </p>
          </div>

          {/* Step 3: Selected Accessories */}
          <div className="space-y-3">
            <span className="text-[11px] font-black tracking-widest text-teal-400 uppercase font-mono block">
              Paso 3: Accesorios & Equipos Adicionales (Opcional)
            </span>
            <div className="space-y-2">
              {equipmentOptions.map((eq) => {
                const isChecked = selectedTools.includes(eq.id);
                const EqIcon = eq.icon;
                return (
                  <button
                    type="button"
                    key={eq.id}
                    onClick={() => handleToolToggle(eq.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isChecked 
                        ? 'bg-gradient-to-r from-purple-950/30 to-slate-900 border-purple-500/50' 
                        : 'bg-slate-950/40 border-slate-850 hover:bg-slate-950/80 hover:border-slate-750'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl shrink-0 border ${
                        isChecked 
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                          : 'bg-slate-900 text-slate-500 border-slate-850'
                      }`}>
                        <EqIcon className="w-4 h-4" />
                      </div>
                      <div className="text-left font-sans">
                        <span className="text-slate-200 block text-xs font-bold leading-tight">
                          {eq.label}
                        </span>
                        <span className="text-slate-500 block text-[10px] leading-tight mt-0.5">
                          {eq.desc}
                        </span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isChecked 
                        ? 'bg-teal-500 border-teal-400 text-slate-950' 
                        : 'border-slate-800 bg-slate-900 text-transparent'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Trigger button to view expectation report details */}
          <div className="pt-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCampaignModal(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all text-white py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 text-xs uppercase tracking-wider font-extrabold shadow-lg shadow-purple-950/40 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-white animate-spin-slow" />
              <span>Calcular Propuesta & Ver Campaña Activa</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.button>
            <p className="text-[10px] text-slate-500 text-center font-sans tracking-wide mt-2">
              Haz clic arriba para generar tu informe de retorno de inversión personalizado sin compromiso.
            </p>
          </div>

        </div>

        {/* Instantly loaded expectations side-by-side card for continuous visual guide (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950/80 p-5 md:p-6 rounded-2xl border border-purple-500/10 flex flex-col justify-between space-y-6 relative self-stretch">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/15">
                Campaña Activa en Perú
              </span>
            </div>

            <h4 className="text-white font-extrabold text-sm tracking-tight border-b border-slate-900 pb-2.5">
              Expectativa de Rendimiento
            </h4>

            {/* Campaign values box requested */}
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850">
                <span className="text-[9px] text-slate-500 block uppercase font-bold leading-none mb-1">
                  Inversión Base
                </span>
                <span className="text-slate-200 font-mono font-black text-xs block">
                  100% Tarifa
                </span>
                <span className="text-[8px] text-slate-500 block mt-0.5 leading-none">
                  Licencia Estándar
                </span>
              </div>

              <div className="bg-purple-950/20 p-3 rounded-xl border border-purple-500/20">
                <span className="text-[9px] text-purple-400 block uppercase font-bold leading-none mb-1">
                  Con Descuento
                </span>
                <span className="text-teal-400 font-mono font-black text-xs block">
                  -30% MENOS
                </span>
                <span className="text-[8px] text-teal-400 block mt-0.5 leading-none font-bold">
                  ¡Aplica Automático!
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-950/30 to-slate-900 border border-slate-850 p-3 rounded-xl flex items-center justify-between text-[11px]">
              <span className="text-slate-300 font-bold block">Campaña de Hoy:</span>
              <span className="bg-teal-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded uppercase tracking-wider select-none">
                30% DE DCTO. GARANTIZADO
              </span>
            </div>

            {/* Retorno Estimado display values */}
            <div className="space-y-3.5 pt-2">
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">
                Retorno Estimado de Inversión (ROI)
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-teal-500/10 text-teal-400 p-2 rounded-xl border border-teal-500/15 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <span className="text-slate-100 font-extrabold text-xs sm:text-xs block">
                    ~ 18 horas / mes
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-snug mt-0.5">
                    Ahorro de tiempo en balances y mermas
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-purple-500/10 text-purple-400 p-2 rounded-xl border border-purple-500/15 shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <span className="text-slate-100 font-extrabold text-xs sm:text-xs block">
                    + 30% de utilidades
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-snug mt-0.5">
                    Por fidelización de clientes e inventario dinámico
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all text-slate-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-emerald-500/10 select-none text-center"
            >
              <span>Solicitar Cotización con 30% dpto</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>
            <span className="text-[9px] text-slate-500 block text-center mt-2 leading-relaxed">
              * El 30% de descuento aplica para la campaña de inicio de mes de forma integral en el licenciamiento. Consulta con un asesor comercial.
            </span>
          </div>

        </div>

      </div>

      {/* Dynamic Expectation Window Overlay (Modal Window requested) */}
      <AnimatePresence>
        {showCampaignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none bg-slate-950/80 backdrop-blur-md">
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-slate-900 border-2 border-purple-500/30 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden text-left"
            >
              {/* Particle backgrounds inside modal */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button button */}
              <button
                type="button"
                onClick={() => setShowCampaignModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 p-2 rounded-full cursor-pointer transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6 relative z-10">
                {/* Modal Title header */}
                <div className="space-y-1.5 text-center">
                  <div className="mx-auto w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center border border-purple-500/20 mb-3 animate-pulse">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-teal-400 uppercase font-mono block">
                    INFORME DE VALORACIÓN EMITIDO
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    ¡Campaña Activa Aplicada Con Éxito!
                  </h3>
                  <p className="text-xs text-slate-400 leading-normal max-w-sm mx-auto">
                    Hemos procesado la configuración elegida para {branches === 1 ? '1 Local' : `${branches} Locales`} bajo el régimen de ahorro optimizado.
                  </p>
                </div>

                {/* Standard prices section from prompt */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850/80 space-y-3.5">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-slate-900 py-3 px-2 rounded-xl border border-slate-800">
                      <span className="text-[9px] text-slate-400 block uppercase font-bold leading-none mb-1">
                        Inversión Base
                      </span>
                      <span className="text-slate-300 font-mono font-black text-xs block">
                        100% Tarifa
                      </span>
                      <span className="text-[8.5px] text-slate-500 block mt-0.5 leading-none">
                        Licencia Estándar
                      </span>
                    </div>

                    <div className="bg-purple-950/30 py-3 px-2 rounded-xl border border-purple-500/30">
                      <span className="text-[9px] text-purple-400 block uppercase font-bold leading-none mb-1">
                        Con Descuento
                      </span>
                      <span className="text-teal-400 font-mono font-black text-xs block">
                        -30% MENOS
                      </span>
                      <span className="text-[8.5px] text-teal-400 block mt-0.5 leading-none font-bold">
                        ¡Aplica Automático!
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/30 to-teal-900/30 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold block">Campaña de Hoy:</span>
                    <span className="bg-teal-500 text-slate-950 font-black text-[9px] px-2.5 py-1 rounded inline-block uppercase tracking-wider select-none">
                      30% DE DCTO. GARANTIZADO
                    </span>
                  </div>
                </div>

                {/* Expectations parameters with ROI from prompt */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black block border-b border-slate-800 pb-1.5">
                    Retorno Estimado de Inversión (ROI)
                  </span>

                  <div className="space-y-3.5">
                    <div className="flex gap-3.5 items-start">
                      <div className="bg-teal-500/10 text-teal-400 p-2.5 rounded-xl border border-teal-500/15 shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 text-teal-400" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-white font-extrabold text-xs sm:text-sm block">
                          ~ 18 horas / mes
                        </span>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          Ahorro de tiempo en balances y mermas
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3.5 items-start">
                      <div className="bg-purple-500/10 text-purple-400 p-2.5 rounded-xl border border-purple-500/15 shrink-0 mt-0.5">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-white font-extrabold text-xs sm:text-sm block">
                          + 30% de utilidades
                        </span>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          Por fidelización de clientes e inventario dinámico
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm or consult action links to WA */}
                <div className="pt-2 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all text-slate-950 font-black py-4 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer select-none text-center"
                  >
                    <span>Solicitar Cotización con 30% dpto</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowCampaignModal(false)}
                    className="w-full bg-transparent hover:bg-slate-950/60 transition-all text-slate-400 hover:text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer border border-transparent hover:border-slate-800"
                  >
                    Cerrar Informe, Ajustar Valores
                  </button>

                  <span className="text-[9.5px] text-slate-500 text-center block leading-relaxed max-w-sm mx-auto">
                    * El 30% de descuento aplica para la campaña de inicio de mes de forma integral en el licenciamiento. Consulta con un asesor comercial.
                  </span>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
