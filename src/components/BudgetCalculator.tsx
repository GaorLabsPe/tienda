import { useState, useMemo } from 'react';
import { 
  Building2, 
  Store, 
  ShoppingBag, 
  UtensilsCrossed, 
  Check, 
  Smartphone, 
  Printer, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Database,
  Calculator,
  X,
  Gift,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import GaorLogo from './GaorLogo';

interface RubroOption {
  id: string;
  name: string;
  icon: any;
  desc: string;
}

export default function BudgetCalculator() {
  const [step, setStep] = useState<number>(1);
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
      desc: 'Venta fluida, lector de barras ultra-veloz, vencimiento de alimentos y alertas de stock.' 
    },
    { 
      id: 'ferreteria', 
      name: 'Ferreterías & Materiales', 
      icon: Building2, 
      desc: 'Soporte de múltiples unidades de medida (metros, kilos), despachos parciales.' 
    },
    { 
      id: 'boutique', 
      name: 'Boutiques & Calzado', 
      icon: ShoppingBag, 
      desc: 'Control de inventario clasificado por tallas, variantes de color y marcas de moda.' 
    },
    { 
      id: 'restaurante', 
      name: 'Restaurantes, Cafés & Bar', 
      icon: UtensilsCrossed, 
      desc: 'Comandas directas a cocina, distribución interactiva de mesas y control de recetas.' 
    }
  ];

  // Optional Equipment add-ons
  const equipmentOptions = [
    { id: 'printer', label: 'Ticketera Térmica Homologada SUNAT', desc: 'Emite comprobantes físicos de manera instantánea.', icon: Printer },
    { id: 'scanner', label: 'Lector de Códigos de Barras Láser', desc: 'Sincroniza y detecta códigos de productos velozmente.', icon: Smartphone },
    { id: 'drawer', label: 'Cajón Monedero Metálico Inteligente', desc: 'Apertura automática segura conectada a cada cobro.', icon: Database }
  ];

  const handleToolToggle = (id: string) => {
    setSelectedTools(prev => 
      prev.includes(id) 
        ? prev.filter(tool => tool !== id) 
        : [...prev, id]
    );
  };

  const selectedRubroName = useMemo(() => {
    return rubros.find(r => r.id === rubro)?.name || rubro;
  }, [rubro]);

  const selectedAccesoriosList = useMemo(() => {
    if (selectedTools.length === 0) return 'Ningún accesorio adicional';
    return selectedTools.map(t => equipmentOptions.find(o => o.id === t)?.label).join(', ');
  }, [selectedTools]);

  // Precomputed WhatsApp text with the custom 30% discount expectation
  const whatsappUrl = useMemo(() => {
    const toolsStr = selectedTools.length > 0 
      ? selectedTools.map(t => equipmentOptions.find(o => o.id === t)?.label).join(', ')
      : 'Solo software (Licencia)';
    
    const text = `¡Hola GAORSYSTEM Perú! 👋 Acabo de diseñar la solución ideal en el cotizador interactivo:\n\n` +
      `- 🏢 Giro de Negocio: *${selectedRubroName}*\n` +
      `- 📍 Cantidad de Locales: *${branches} local(es)*\n` +
      `- 🔌 Accesorios Incluidos: *${toolsStr}*\n\n` +
      `🎁 ¡Quiero reclamar mi súper beneficio de hoy del 30% de DESCUENTO de campaña para mi negocio y programar mi demostración guiada en vivo!`;
    
    return `https://wa.me/51989666214?text=${encodeURIComponent(text)}`;
  }, [selectedRubroName, branches, selectedTools]);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="bg-slate-900 border border-purple-500/10 rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header of Configurator */}
      <div className="text-center mb-8 space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/15 to-teal-500/15 border border-purple-500/30 px-3 py-1 rounded-full text-teal-300 text-[10px] sm:text-xs font-mono font-semibold tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          DISEÑADOR DE SOLUCIONES DIGITALES EN VIVO
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Configura y Obtén tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-[#96bbf7]">Beneficios Exclusivos</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Sigue los tres pasos rápidos para armar el Punto de Venta ideal adaptado al ritmo de tu negocio. Al finalizar descubrirás tu oferta de campaña.
        </p>
      </div>

      {/* Interactive Progress Bar */}
      <div className="max-w-md mx-auto mb-8 relative z-10 px-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          <div 
            className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setStep(num)}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-350 relative z-10 cursor-pointer ${
                step >= num 
                  ? 'bg-gradient-to-br from-teal-400 to-purple-500 text-slate-950 scale-110 shadow-lg shadow-teal-500/20' 
                  : 'bg-slate-950 border border-slate-800 text-slate-500'
              }`}
            >
              {step > num ? <Check className="w-4 h-4 stroke-[3]" /> : num}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mt-2.5 px-1">
          <span className={`${step >= 1 ? 'text-teal-400 font-black' : ''}`}>1. Rubro</span>
          <span className={`${step >= 2 ? 'text-purple-400 font-black' : ''}`}>2. Locales</span>
          <span className={`${step >= 3 ? 'text-teal-400 font-black' : ''}`}>3. Accesorios</span>
        </div>
      </div>

      {/* Steps Switcher Canvas */}
      <div className="relative z-10 min-h-[280px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-black tracking-widest text-[#00e2b7] uppercase font-mono block mb-1">
                  Paso 1 de 3: Selección de Giro Comercial
                </span>
                <h4 className="text-white text-lg font-bold">¿A qué se dedica tu negocio o comercio principal?</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {rubros.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = rubro === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setRubro(item.id)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative group flex gap-3.5 items-start ${
                        isSelected 
                          ? 'bg-gradient-to-br from-purple-950/30 to-slate-900 border-teal-500/60 shadow-xl shadow-teal-500/5' 
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 border transition-colors ${
                        isSelected 
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' 
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-extrabold text-xs sm:text-sm">
                            {item.name}
                          </span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-black tracking-widest text-[#00e2b7] uppercase font-mono block mb-1">
                  Paso 2 de 3: Locales y Puntos de Control
                </span>
                <h4 className="text-white text-lg font-bold">¿Cuántos locales, bodegas o sucursales necesitas interconectar?</h4>
                <p className="text-[11px] text-slate-400 mt-1">Nuestra tecnología en la nube centraliza inventarios, caja diaria y boletas de todos tus puntos de venta.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isSelected = branches === num;
                  return (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setBranches(num)}
                      className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-950/30 to-slate-900 border-purple-500 shadow-xl shadow-purple-500/10'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs select-none border ${
                        isSelected 
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        {num}
                      </div>
                      <span className={`text-[11px] font-extrabold ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                        {num === 1 ? '1 Local' : `${num} Locales`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-purple-950/25 border border-purple-500/10 flex items-start gap-3 mt-2">
                <AlertCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-[11.5px] text-slate-300 leading-normal font-sans">
                  <strong>Control Centralizado en Tiempo Real:</strong> Podrás ver reportes, mermas, ventas, y controlar cierres de caja de todos tus locales desde el celular, tablet o laptop de forma instantánea.
                </p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-black tracking-widest text-[#00e2b7] uppercase font-mono block mb-1">
                  Paso 3 de 3: Incrementa tu Velocidad con Hardware
                </span>
                <h4 className="text-white text-lg font-bold">¿Qué accesorios adicionales te gustaría incluir para potenciar tu PDV?</h4>
                <p className="text-[11px] text-slate-400 mt-1">Todos los equipos cuentan con configuración local garantizada y compatibilidad absoluta sin costos de mantenimiento ocultos.</p>
              </div>

              <div className="space-y-2.5 pt-1">
                {equipmentOptions.map((eq) => {
                  const isChecked = selectedTools.includes(eq.id);
                  const EqIcon = eq.icon;
                  return (
                    <button
                      type="button"
                      key={eq.id}
                      onClick={() => handleToolToggle(eq.id)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-gradient-to-r from-purple-950/20 via-slate-900 to-slate-900 border-teal-500/50 shadow-md' 
                          : 'bg-slate-950/50 border-slate-850 hover:bg-slate-950/80 hover:border-slate-750'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl shrink-0 border ${
                          isChecked 
                            ? 'bg-teal-500/10 text-teal-300 border-teal-500/20' 
                            : 'bg-slate-900 text-slate-500 border-slate-850'
                        }`}>
                          <EqIcon className="w-5 h-5" />
                        </div>
                        <div className="text-left font-sans">
                          <span className="text-slate-100 block text-xs sm:text-sm font-bold leading-tight">
                            {eq.label}
                          </span>
                          <span className="text-slate-400 block text-[10.5px] leading-tight mt-1">
                            {eq.desc}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                        isChecked 
                          ? 'bg-teal-400 border-teal-300 text-slate-950' 
                          : 'border-slate-800 bg-slate-900 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button controls footer */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-850 relative z-10">
        <button
          type="button"
          disabled={step === 1}
          onClick={prevStep}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold font-sans text-xs transition-colors cursor-pointer ${
            step === 1 
              ? 'text-slate-600 cursor-not-allowed opacity-40' 
              : 'text-slate-300 hover:text-white bg-slate-950 border border-slate-850'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Atrás</span>
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="bg-[#00e2b7] hover:bg-[#00c59f] text-slate-950 font-black px-5 py-2.5 rounded-xl font-sans text-xs flex items-center gap-1.5 transition-all hover:scale-[1.03] shadow-lg shadow-teal-500/15 cursor-pointer"
          >
            <span>Siguiente Paso</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowCampaignModal(true)}
            className="bg-gradient-to-r from-purple-500 to-teal-400 hover:from-purple-400 hover:to-teal-300 text-white font-black px-6 py-3 rounded-xl font-sans text-xs flex items-center gap-1.5 transition-all hover:scale-[1.04] shadow-xl shadow-purple-500/20 cursor-pointer animate-pulse"
          >
            <Calculator className="w-4 h-4 shrink-0 text-white" />
            <span>CALCULAR PROPUESTA & VER DESCUENTO</span>
            <Sparkles className="w-4 h-4 shrink-0 text-teal-200" />
          </button>
        )}
      </div>

      {/* Confetti & Campaña Beneficio Exclusivo Climax Modal - Compact and screen-safe */}
      <AnimatePresence>
        {showCampaignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="bg-slate-900 border-2 border-teal-400 rounded-2xl p-4 sm:p-5 max-w-md w-full sm:max-w-[430px] shadow-[0_0_50px_rgba(45,212,191,0.25)] relative overflow-hidden text-left my-4"
            >
              {/* Confetti styling background glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button badge */}
              <button
                type="button"
                onClick={() => setShowCampaignModal(false)}
                className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 p-1.5 rounded-full cursor-pointer transition-colors z-20"
                aria-label="Cerrar"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="space-y-4 relative z-10 text-center">
                
                {/* Brand Logo Integration & Celebratory Icon Header */}
                <div className="flex flex-col items-center justify-center pt-1 gap-1 select-none">
                  <GaorLogo size="sm" showText={true} showSubtitle={false} className="scale-90" />
                  <div className="w-9 h-9 bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/5 mt-1 animate-bounce">
                    <Gift className="w-4 h-4 shrink-0" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-black tracking-widest text-[#00e2b7] uppercase font-mono block">
                    ¡VALORACIÓN DE CAMPAÑA CALCULADA!
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight">
                    ¡Felicitaciones! 🎉
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-purple-400 text-sm sm:text-base font-extrabold">
                      ¡Súper Descuento del 30% Aprobado!
                    </span>
                  </h3>
                  <p className="text-[10.5px] text-slate-300 leading-normal max-w-xs mx-auto font-sans">
                    Tu expectativa comercial ha sido aprobada automáticamente con el descuento activo de inicio de mes.
                  </p>
                </div>

                {/* Expectation Ticket Summary */}
                <div className="bg-slate-950 rounded-xl p-3 border border-teal-500/15 space-y-2.5 text-left">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Tu Solución Diseñada</span>
                    <span className="bg-teal-500/10 text-teal-400 font-mono font-bold text-[8.5px] px-2 py-0.5 rounded-full border border-teal-500/20">Ahorro Activo</span>
                  </div>

                  <div className="space-y-1.5 text-[11.5px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Giro de Negocio:</span>
                      <strong className="text-white font-semibold">{selectedRubroName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Puntos de Venta:</span>
                      <strong className="text-white font-semibold">{branches === 1 ? '1 Local' : `${branches} Locales`}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Accesorios elegidos:</span>
                      <strong className="text-white text-right max-w-[170px] truncate font-semibold">{selectedAccesoriosList}</strong>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-950/40 to-teal-950/45 p-2 rounded-lg border border-purple-500/15 flex items-center justify-between text-[11px]">
                    <span className="text-slate-300 font-extrabold flex items-center gap-1 shrink-0">
                      🏷️ Descuento por Campaña:
                    </span>
                    <span className="text-teal-400 font-mono font-black text-xs sm:text-xs tracking-wider">
                      30% DE DCTO. DIRECTO
                    </span>
                  </div>
                </div>

                {/* Returns Projection ROI */}
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <div className="flex items-center gap-1 text-teal-400 pb-0.5">
                      <Clock className="w-3 h-3" />
                      <span className="text-[8.5px] font-mono font-extrabold uppercase tracking-wide">Tiempo Libre</span>
                    </div>
                    <span className="text-white font-extrabold text-[11px] sm:text-xs block">18 horas/mes</span>
                    <span className="text-[8.5px] text-slate-500 block leading-tight">Menos cuadres y mermas</span>
                  </div>

                  <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <div className="flex items-center gap-1 text-purple-400 pb-0.5">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-[8.5px] font-mono font-extrabold uppercase tracking-wide">Utilidad</span>
                    </div>
                    <span className="text-white font-extrabold text-[11px] sm:text-xs block">+30% Rentabilidad</span>
                    <span className="text-[8.5px] text-slate-500 block leading-tight">En tus primeros 60 días</span>
                  </div>
                </div>

                {/* Confirmed Redirect Call to action */}
                <div className="pt-1.5 space-y-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all text-slate-950 font-black py-3 px-3 rounded-xl flex items-center justify-center gap-2 text-[10.5px] uppercase tracking-wide shadow-lg shadow-emerald-500/15 cursor-pointer select-none text-center transform hover:scale-[1.01]"
                  >
                    <span>RECLAMAR 30% DCTO. & ENVIAR RESUMEN</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowCampaignModal(false)}
                    className="w-full bg-transparent hover:bg-slate-950/40 transition-all text-slate-400 hover:text-white font-bold py-1.5 rounded-lg text-[9.5px] uppercase tracking-wider cursor-pointer border border-transparent hover:border-slate-800"
                  >
                    Ajustar mi configuración de cotización
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[8.5px] text-slate-500 font-sans leading-normal px-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Beneficio exclusivo para nuevos registros de negocios en Perú hoy.</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
