import { useState } from "react";
import SimulatorDeviceWrapper from "./components/SimulatorDeviceWrapper";
import BudgetCalculator from "./components/BudgetCalculator";
import {
  CheckCircle,
  Sparkles,
  ShieldCheck,
  Cloud,
  Users,
  Settings,
  ChevronDown,
  ArrowRight,
  Star,
  Info,
  Layers,
  HelpCircle,
  TrendingUp,
  Receipt,
  Store,
  ExternalLink,
  Laptop,
  Check,
  Send,
  PhoneCall,
  Wifi,
  WifiOff,
  QrCode,
  Smartphone,
  Package,
  AlertTriangle,
  CreditCard,
  Menu,
  X,
  Sun,
  Moon,
  MousePointer2,
  ChevronLeft,
  Search,
  ArrowLeft,
  Home,
  Armchair,
  User,
  ShoppingCart,
  Calculator,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore
import happyEntrepreneurImg from "./assets/images/happy_entrepreneur_1780669280659.png";
import GaorLogo from "./components/GaorLogo";

// FAQ data structure for collapsible accordion
const FAQ_ITEMS = [
  {
    q: "¿El software de GAORSYSTEM requiere pago mensual obligatorio?",
    a: "Para la campaña de inicio de mes, ofrecemos un fabuloso descuento directo del 30% en nuestra tarifa regular de licenciamiento. Este abono anual te incluye servidor en la nube de alta disponibilidad, actualizaciones normativas SUNAT totalmente gratuitas, soporte local premium y boletas electrónicas integradas sin cobros sorpresa a mitad de año.",
  },
  {
    q: "¿Cómo se hace el envío de comprobantes electrónicos a SUNAT?",
    a: "Toda venta cobrada en caja genera opcionalmente un archivo contable homologado que se envía de manera automática y transparente a la SUNAT. No requieres contratar PSE externos; nuestro sistema ya incluye este módulo integrado.",
  },
  {
    q: "¿En qué se diferencia GAORSYSTEM de un POS tradicional o de Odoo estándar?",
    a: "Mientras que Odoo requiere de complejas parametrizaciones y consultores externos costosos para adaptarse a Perú, GAORSYSTEM ya viene pre-configurado para las tiendas, boticas, ferreterías y minimarkets peruanos. Además, nuestro soporte es local, inmediato vía WhatsApp/Llamadas, y corre en servidores de ultra-baja latencia.",
  },
  {
    q: "¿Qué sucede si mi local se queda temporalmente sin señal de internet?",
    a: "¡No te preocupes! El POS de GAORSYSTEM tiene un búfer inteligente de contingencia que te permite seguir facturando y realizando ventas en caja de manera local. Los datos de la venta se sincronizarán con tu servidor central apenas el internet retorne.",
  },
  {
    q: "¿Cuántas computadoras o cajas de cobro puedo enlazar con mi cuenta?",
    a: "Nuestro sistema es multiusuario y en la nube. Puedes configurar múltiples cajeros y acceder desde cualquier computadora, laptop, tablet o celular en tiempo real, facilitando la administración de tu negocio remotamente.",
  },
];

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [currentView, setCurrentView] = useState<
    "home" | "quote" | "simulator"
  >("home");

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`bg-[#0b0314] text-slate-150 min-h-screen selection:bg-teal-500 selection:text-slate-950 font-sans leading-relaxed overflow-x-hidden ${theme === "light" ? "theme-light" : ""}`}
    >
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 bg-[#0b0314]/90 backdrop-blur-xl border-b border-purple-950/40 z-40 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo with rocket layout matching brochure */}
          <button 
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-2.5 cursor-pointer text-left focus:outline-none"
          >
            <GaorLogo size="xs" layout="horizontal" showSubtitle={false} />
            <div className="hidden min-[400px]:block border-l border-purple-950/40 pl-3 leading-none py-1">
              <p className="text-[10px] sm:text-[11px] text-teal-400 font-extrabold tracking-wide uppercase">
                Sistemas Inteligentes
              </p>
              <p className="text-[8px] sm:text-[9px] text-slate-400 font-sans tracking-widest uppercase mt-0.5">
                Para Tiendas y Pymes
              </p>
            </div>
          </button>

          {/* Nav quick links for Large Screens (hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button
              onClick={() => setCurrentView("home")}
              className="hover:text-teal-400 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Inicio
            </button>
            <a
              href="#diferencia"
              onClick={() => setCurrentView("home")}
              className="hover:text-teal-400 transition-colors uppercase tracking-wider"
            >
              Diferencia GAOR
            </a>
            <button
              onClick={() => setCurrentView("simulator")}
              className="hover:text-teal-400 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Simulador POS
            </button>
            <button
              onClick={() => setCurrentView("quote")}
              className="hover:text-teal-400 transition-colors uppercase tracking-wider font-bold text-teal-400 cursor-pointer"
            >
              Cotizar Online
            </button>
          </nav>

          {/* Quick contact and social proof call to action */}
          <div className="flex items-center gap-3">
            <a
              href="tel:51989666214"
              className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors font-mono"
            >
              <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
              <span>989 666 214</span>
            </a>
            <a
              href="https://wa.me/51989666214?text=Hola%20GAORSYSTEM%20Per%C3%BA,%20deseo%20asesor%C3%ADa%20personalizada%20con%20el%2030%25%20de%20descuento%20de%20inicio%20de%20mes."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all items-center gap-1.5 shadow-lg shadow-emerald-500/15 cursor-pointer hover:scale-105"
            >
              <span>Consultar Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 rounded-xl border transition-colors cursor-pointer text-slate-300 hover:text-white bg-[#0f0917]/40 border-slate-900 hover:border-slate-800"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Expand Button - Only visible on Mobile (< 768px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-teal-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu collapsible panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-3 border-t border-slate-900 pt-3.5 space-y-2 select-none"
            >
              <div className="grid grid-cols-1 gap-1.5 pb-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView("simulator");
                  }}
                  className="px-4 py-2 bg-slate-900/50 hover:bg-purple-950/20 rounded-xl border border-slate-850 text-xs font-bold text-slate-200 hover:text-white transition-colors text-left"
                >
                  🖥️ Simulador POS en Vivo
                </button>
                <a
                  href="#diferencia"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView("home");
                  }}
                  className="px-4 py-2 bg-slate-900/50 hover:bg-purple-950/20 rounded-xl border border-slate-850 text-xs font-bold text-slate-200 hover:text-white transition-colors"
                >
                  🚀 Diferencia GAOR
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView("quote");
                  }}
                  className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 rounded-xl border border-teal-500/30 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors text-left"
                >
                  💰 Cotizar Online & Promo
                </button>
              </div>

              {/* Direct quick call and WhatsApp CTA inside mobile drawer */}
              <div className="flex gap-2.5 pt-2 border-t border-slate-900/60">
                <a
                  href="tel:51989666214"
                  className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-850 text-slate-200 text-[11px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                  <span>Llamar por Teléfono</span>
                </a>
                <a
                  href="https://wa.me/51989666214?text=Hola%20GAORSYSTEM%20Per%C3%BA,%20deseo%20asesor%C3%ADa%20personalizada%20con%20el%2030%25%20de%20descuento%20de%20inicio%20de%20mes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-[11px] font-black py-2.5 rounded-xl flex items-center justify-center gap-1"
                >
                  <span>Chatear Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {currentView === "home" ? (
        <div className="home-view-container">
          {/* 2. Hero banner section with centered handwritten layout */}
          <section className="relative overflow-hidden pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20">
            {/* Background Image of happy store owner (subtle watermark) */}
            <div className="absolute inset-0 w-full h-full opacity-[0.06] sm:opacity-[0.08] pointer-events-none mix-blend-lighten z-0">
              <img
                src={happyEntrepreneurImg}
                alt=""
                className="w-full h-full object-cover object-center scale-105 filter blur-[1px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b0314] via-transparent to-[#0b0314]" />
            </div>

            {/* Glow Spheres Backing */}
            <div className="absolute top-10 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-20 right-1/4 w-84 h-84 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
              <div className="flex justify-center pb-2">
                <GaorLogo 
                  size="md" 
                  className="transform hover:scale-[1.05] transition-transform duration-500 cursor-pointer" 
                />
              </div>
              <h1 className="text-[2.6rem] sm:text-5xl md:text-[4.5rem] leading-[0.85] sm:leading-[0.9] md:leading-[0.85] text-center font-caveat font-bold select-none text-white tracking-tight">
                Un PdV{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e2b7] to-[#4caccb]">
                  hecho para
                </span>{" "}
                <span className="text-[#96bbf7]">ventas</span>
                <br className="hidden sm:block" />{" "}
                <span className="text-[#b282fb]">minoristas</span>
              </h1>

              <p className="text-slate-200 text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Un{" "}
                <strong className="font-bold text-teal-300">
                  sistema de ventas inteligente
                </strong>{" "}
                para negocios modernos. Gestiona inventario, fideliza clientes,
                automatiza promociones y vende tanto en tienda como por internet
                desde un solo lugar.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
                <a
                  href="https://wa.me/51989666214?text=Hola!%20Deseo%20comenzar%20ahora%20con%20GAORSYSTEM%20Per%C3%BA.%20Estoy%20buscando%20una%20soluci%C3%B3n%20integral%20e%20inteligente%20de%20ventas%20y%20administraci%C3%B3n%20para%20mi%20negocio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-[#017e84] hover:from-teal-400 hover:to-teal-500 text-slate-950 font-extrabold py-3.5 px-8 rounded-xl text-[15px] font-sans shadow-lg shadow-teal-500/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Comenzar ahora</span>
                </a>

                <a
                  href="https://wa.me/51989666214?text=Hola!%20Deseo%20contactar%20con%20un%20consultor%20de%20GAORSYSTEM%20Per%C3%BA%20para%20recibir%20asesor%C3%ADa%20personalizada%20sobre%20la%20soluci%C3%B3n%20de%20ventas%20para%20mi%20negocio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-slate-900 border border-slate-700/60 hover:bg-slate-800 text-slate-200 font-extrabold py-3.5 px-8 rounded-xl text-[15px] font-sans shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Contactar a un consultor</span>
                </a>
              </div>

              {/* Decorative Sparkles indicating playful lines around */}
              <div className="absolute -left-10 md:left-10 bottom-0 text-red-500/40 pointer-events-none opacity-50">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="M4.93 4.93l2.83 2.83" />
                  <path d="M16.24 16.24l2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="M4.93 19.07l2.83-2.83" />
                  <path d="M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
            </div>
          </section>

          {/* 2.5. Details & Campaign section (brought back per user request) */}
          <section className="relative overflow-hidden py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20">
            {/* Glow Spheres Backing */}
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left side: Campaign copy text and pricing */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="lg:col-span-6 space-y-5 text-left"
                >
                  <div className="inline-flex items-center gap-2 bg-[#0f0917] border border-slate-800 px-3.5 py-1.5 rounded-full text-teal-400 font-sans text-xs">
                    <Smartphone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="font-bold uppercase tracking-wider block">
                      100% Optimizado para celular & tablet
                    </span>
                  </div>

                  <div className="text-[11.5px] leading-relaxed text-slate-300 select-none">
                    <strong className="text-white">
                      El 70% de nuestros clientes
                    </strong>{" "}
                    controlan sus ingresos, cierres de caja y stock en vivo
                    directamente desde su celular. ¡Lleva el control de tu
                    tienda en tu bolsillo!
                  </div>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide leading-tight font-caveat">
                    Lleva un{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                      ERP Completo, Moderno y Seguro
                    </span>{" "}
                    para tu negocio.
                  </h2>

                  <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-normal max-w-lg font-sans">
                    Desarrollamos soluciones digitales a la medida de tu tienda,
                    bodega, minimarket, ferretería o restaurante en Perú.
                    Totalmente homologado con la SUNAT, en tiempo real y con
                    control de stock inteligente.
                  </p>

                  {/* Promotional Campaign card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                    className="bg-slate-900/80 p-5 rounded-2xl border-2 border-purple-500/40 backdrop-blur-md max-w-md relative overflow-hidden group shadow-lg shadow-purple-950/20"
                  >
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-purple-600/10 rounded-full blur-xl pointer-events-none" />
                    <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-teal-500/10 rounded-full blur-xl pointer-events-none" />

                    <div className="space-y-4 relative">
                      <div className="flex items-center gap-2">
                        <span className="bg-purple-600/20 text-purple-300 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-purple-500/20">
                          Campaña Activa de Hoy
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>

                      <h4 className="text-slate-200 text-xs uppercase font-extrabold tracking-widest block font-sans">
                        Plan de Licenciamiento ERP
                      </h4>

                      <div className="flex items-center gap-3.5 py-1">
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-black font-sans px-4 flex flex-col justify-center items-center py-3 rounded-2xl text-4xl tracking-tighter shadow-md border border-white/15 scale-100 group-hover:scale-105 transition-all leading-none">
                          <span>30%</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-purple-200 mt-1">
                            DESC.
                          </span>
                        </div>
                        <div>
                          <span className="text-teal-400 text-xs font-black uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-teal-400 shrink-0 animate-pulse" />
                            ¡Descuento Garantizado!
                          </span>
                          <p className="text-slate-300 text-xs font-medium leading-snug mt-1">
                            Aplica hoy mismo un 30% de descuento directo en tu
                            presupuesto de implementación anual.
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800 text-[10.5px] text-slate-300 font-bold leading-relaxed space-y-1">
                        <span className="text-teal-400 font-mono flex items-center gap-1">
                          💼 TARIFA FLEXIBLE A TU MEDIDA
                        </span>
                        <p className="text-slate-400 font-sans text-[10px] leading-snug">
                          Pagos sin cuotas ocultas u obligaciones a largo plazo.
                          Licenciamiento personalizado por sucursales.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-slate-950/50 border border-slate-900/80 rounded-xl p-3 text-center space-y-1 backdrop-blur-sm cursor-default"
                    >
                      <div className="mx-auto bg-purple-500/10 text-purple-400 w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/15">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-white font-extrabold text-[11px] block uppercase tracking-wide font-sans mt-1">
                        Seguro
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-slate-950/50 border border-slate-900/80 rounded-xl p-3 text-center space-y-1 backdrop-blur-sm cursor-default"
                    >
                      <div className="mx-auto bg-purple-500/10 text-purple-400 w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/15">
                        <Cloud className="w-4 h-4" />
                      </div>
                      <span className="text-white font-extrabold text-[11px] block uppercase tracking-wide font-sans mt-1">
                        En la nube
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-slate-950/50 border border-slate-900/80 rounded-xl p-3 text-center space-y-1 backdrop-blur-sm cursor-default"
                    >
                      <div className="mx-auto bg-purple-500/10 text-purple-400 w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/15">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-white font-extrabold text-[11px] block uppercase tracking-wide font-sans mt-1">
                        Multiusuario
                      </span>
                    </motion.div>
                  </div>

                  <div className="pt-3 flex justify-center lg:justify-start">
                    <a
                      href="https://wa.me/51989666214?text=Hola!%20He%20visto%20la%20secci%C3%B3n%20de%20gesti%C3%B3n%20m%C3%B3vil%20e%20implementaci%C3%B3n%20anual%20con%20descuento.%20Deseo%20ver%20c%C3%B3mo%20GAORSYSTEM%20se%20adaptar%C3%ADa%20a%20mi%20propio%20negocio."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto text-center bg-gradient-to-r from-teal-500 to-[#017e84] hover:from-teal-400 hover:to-teal-500 text-slate-950 font-extrabold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-500/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-950 shrink-0" />
                      <span>¡Quiero ver cómo será para mi negocio! ✨</span>
                    </a>
                  </div>
                </motion.div>

                {/* Right side Image */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="lg:col-span-6 relative flex justify-center"
                >
                  <div className="relative group rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-950/40 bg-slate-900 p-3 max-w-lg w-full">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-teal-500/15 transition-all" />
                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

                    <div className="relative overflow-hidden rounded-2xl aspect-video w-full">
                      <img
                        src="/src/assets/images/happy_shop_owner_1780597571252.png"
                        alt="Emprendedora peruana feliz con el sistema"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-bold text-teal-300 flex items-center gap-1.5 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>SISTEMA ACTIVO EN TIENDA</span>
                      </div>
                    </div>

                    <div className="mt-4 p-2 text-center">
                      <p className="text-white font-extrabold text-xs tracking-tight uppercase">
                        Administra tu Minimarket de manera Inteligente, Rápida y
                        Segura
                      </p>
                      <p className="text-slate-400 text-[10px] mt-1 leading-relaxed">
                        Control de stock por código de barras, boletas
                        automáticas y reportes de caja precisos.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Lo Complejo vs Intuitivo Section */}
          <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20 max-w-[1400px] mx-auto relative overflow-hidden">
            <div className="text-center max-w-4xl mx-auto space-y-5 mb-10 animate-fade-in">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-caveat text-white flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                <span>Convertimos procesos complejos</span>
                <div className="bg-teal-400 rounded-full p-2 sm:p-3 shadow-[0_0_15px_rgba(45,212,191,0.4)] transform hover:scale-110 transition-transform hidden sm:block">
                  <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 text-slate-900 stroke-[3]" />
                </div>
                <span>en experiencias simples</span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed">
                <strong className="text-white font-bold">
                  Nuestra interfaz lo tiene todo
                </strong>{" "}
                y es tan intuitiva que a nadie le toma más de un par de minutos
                entender cómo usarla. Su gran variedad de opciones avanzadas te
                permitirá gestionar cualquier transacción con facilidad y
                concentrarte en lo más importante: tus clientes.
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left Annotations (Desktop only) */}
                <div className="hidden lg:flex flex-col col-span-3 space-y-[120px] text-right pr-4 relative z-10 mt-10">
                  <div className="relative transform hover:-translate-x-2 transition-transform cursor-default">
                    <span className="font-caveat text-4xl text-purple-300 tracking-wide drop-shadow-md">
                      Ventas
                      <br />
                      personalizadas
                    </span>
                    <svg
                      className="absolute -right-20 top-4 w-16 h-8 text-purple-400/70 drop-shadow-md"
                      viewBox="0 0 50 30"
                      fill="none"
                    >
                      <path
                        d="M0,15 C20,15 30,25 48,25"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                      />
                      <path
                        d="M40,18 L48,25 L40,32"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="relative transform hover:-translate-x-2 transition-transform cursor-default">
                    <span className="font-caveat text-4xl text-purple-300 tracking-wide drop-shadow-md">
                      Programas de
                      <br />
                      lealtad
                    </span>
                    <svg
                      className="absolute -right-24 top-2 w-20 h-10 text-purple-400/70 drop-shadow-md"
                      viewBox="0 0 60 40"
                      fill="none"
                    >
                      <path
                        d="M0,20 C20,20 40,5 58,5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                      />
                      <path
                        d="M48,-2 L58,5 L48,12"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="relative transform hover:-translate-x-2 transition-transform cursor-default">
                    <span className="font-caveat text-4xl text-purple-300 tracking-wide drop-shadow-md">
                      Varios métodos
                      <br />
                      de pago
                    </span>
                    <svg
                      className="absolute -right-20 top-6 w-16 h-10 text-purple-400/70 drop-shadow-md"
                      viewBox="0 0 50 40"
                      fill="none"
                    >
                      <path
                        d="M0,5 C20,5 30,35 48,35"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                      />
                      <path
                        d="M40,28 L48,35 L40,42"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Center POS Image/Wireframe */}
                <div className="col-span-1 lg:col-span-6 relative z-20">
                  <div className="absolute inset-0 bg-teal-500/10 blur-[80px] rounded-full" />
                  <div className="bg-slate-100 rounded-3xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col h-[520px] relative transform hover:scale-[1.01] transition-transform duration-500">
                    {/* Header */}
                    <div className="bg-white h-14 border-b border-slate-200 flex items-center justify-between px-5">
                      <div className="flex space-x-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-400 border border-red-500/20"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-500/20"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 border border-emerald-500/20"></div>
                      </div>
                      <div className="flex gap-2 items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                        <img
                          src="https://ui-avatars.com/api/?name=Mitchell+Admin&background=020617&color=fff"
                          alt="Admin"
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-slate-700 text-xs font-semibold">
                          Mitchell Admin
                        </span>
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)] animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex flex-1 overflow-hidden">
                      {/* Order Side */}
                      <div className="w-[45%] border-r border-slate-200 bg-white flex flex-col shadow-[4px_0_15px_rgba(0,0,0,0.03)] z-10">
                        <div className="flex-1 p-5 space-y-5 overflow-hidden">
                          {/* Items */}
                          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                            <div className="space-y-1.5">
                              <div className="w-28 h-3.5 bg-slate-700 rounded-sm"></div>
                              <div className="w-20 h-2 bg-slate-400/80 rounded-sm"></div>
                            </div>
                            <div className="w-16 h-3.5 bg-slate-800 rounded-sm"></div>
                          </div>
                          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                            <div className="space-y-1.5">
                              <div className="w-24 h-3.5 bg-slate-700 rounded-sm"></div>
                              <div className="w-16 h-2 bg-slate-400/80 rounded-sm"></div>
                            </div>
                            <div className="w-12 h-3.5 bg-slate-800 rounded-sm"></div>
                          </div>
                          <div className="flex justify-between items-start pb-3 bg-teal-50/70 p-3 rounded-lg border border-teal-100">
                            <div className="space-y-1.5">
                              <div className="w-32 h-3.5 bg-teal-800 rounded-sm"></div>
                              <div className="w-24 h-2 bg-teal-600 rounded-sm"></div>
                            </div>
                            <div className="w-16 h-3.5 bg-teal-800 rounded-sm"></div>
                          </div>
                        </div>
                        {/* Loyalty/Total Area */}
                        <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
                          <div className="flex justify-between items-center px-1">
                            <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                              Total:
                            </span>
                            <span className="text-2xl font-black text-slate-900">
                              $ 452.41
                            </span>
                          </div>
                          <div className="h-10 bg-white border border-slate-200 shadow-sm rounded-lg flex items-center justify-between px-4">
                            <span className="text-xs text-slate-500 font-bold flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>{" "}
                              Puntos
                            </span>
                            <span className="text-xs text-emerald-600 font-black">
                              +4524.1
                            </span>
                          </div>
                        </div>
                        {/* Numpad/Actions */}
                        <div className="h-44 bg-slate-100 border-t border-slate-200 p-3 grid grid-cols-4 gap-2">
                          <div className="col-span-1 grid grid-cols-1 gap-2">
                            <div className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg flex items-center justify-center cursor-pointer">
                              <User className="text-white w-5 h-5" />
                            </div>
                            <div className="bg-gradient-to-b from-purple-800 to-purple-950 hover:from-purple-700 hover:to-purple-900 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md cursor-pointer flex-1 transition-all">
                              Pay
                            </div>
                          </div>
                          <div className="col-span-3 grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "+/-", 0, "."].map(
                              (n) => (
                                <div
                                  key={n}
                                  className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg shadow-sm flex items-center justify-center text-slate-700 font-black text-base cursor-pointer transition-colors active:scale-95"
                                >
                                  {n}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Product Side */}
                      <div className="w-[55%] bg-slate-100/50 flex flex-col">
                        <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-5">
                          <div className="flex space-x-6">
                            <div className="flex flex-col items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                              <Home className="w-5 h-5 text-slate-700" />
                              <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                              <Armchair className="w-5 h-5 text-teal-600" />
                              <div className="w-14 h-1 bg-teal-500 rounded-full"></div>
                            </div>
                          </div>
                          <div className="w-44 bg-slate-100 rounded-full px-4 py-2 flex items-center gap-2 border border-slate-200">
                            <Search className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-400 text-xs font-semibold">
                              Search...
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 p-5 grid grid-cols-3 gap-5 overflow-hidden content-start bg-[#f8f9fa]">
                          {/* Product Cards */}
                          {[...Array(9)].map((_, i) => (
                            <div
                              key={i}
                              className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-28 hover:border-teal-400 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
                            >
                              <div className="h-16 bg-slate-50/80 flex items-center justify-center rounded-t-2xl group-hover:bg-teal-50/50 inset-0 border-b border-slate-100 relative overflow-hidden">
                                {/* decorative geometric shapes simulating products */}
                                <div
                                  className={`w-8 h-8 rounded opacity-20 ${["bg-purple-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500"][i % 5]}`}
                                />
                                <div className="absolute top-1 right-1 px-1 bg-slate-100 text-[10px] rounded text-slate-400 font-mono">
                                  i
                                </div>
                              </div>
                              <div className="flex-1 p-3 flex flex-col justify-between">
                                <div className="w-full h-2.5 bg-slate-300 rounded" />
                                <div className="w-1/2 h-3.5 bg-slate-800 rounded font-bold" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Annotations (Desktop only) */}
                <div className="hidden lg:flex flex-col col-span-3 space-y-[120px] text-left pl-4 relative z-10 mt-10 justify-center">
                  <div className="relative transform hover:translate-x-2 transition-transform cursor-default">
                    <span className="font-caveat text-4xl text-teal-300 tracking-wide drop-shadow-md">
                      Filtra por
                      <br />
                      categorías de
                      <br />
                      productos
                    </span>
                    <svg
                      className="absolute -left-24 top-10 w-20 h-10 text-teal-400/70 drop-shadow-md"
                      viewBox="0 0 60 40"
                      fill="none"
                    >
                      <path
                        d="M60,20 C40,20 20,5 2,5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                      />
                      <path
                        d="M12,-3 L2,5 L12,13"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="relative transform hover:translate-x-2 transition-transform cursor-default">
                    <span className="font-caveat text-4xl text-teal-300 tracking-wide drop-shadow-md">
                      Visualización
                      <br />
                      intuitiva
                    </span>
                    <svg
                      className="absolute -left-20 top-4 w-16 h-8 text-teal-400/70 drop-shadow-md"
                      viewBox="0 0 50 30"
                      fill="none"
                    >
                      <path
                        d="M50,15 C30,15 20,25 2,25"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                      />
                      <path
                        d="M10,18 L2,25 L10,32"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mobile Annotations (Stacked below UI on smaller screens) */}
              <div className="lg:hidden mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
                <div className="space-y-1 transform hover:scale-105 transition-transform">
                  <span className="font-caveat text-3xl md:text-4xl text-purple-300 drop-shadow-md">
                    Ventas personalizadas
                  </span>
                </div>
                <div className="space-y-1 transform hover:scale-105 transition-transform">
                  <span className="font-caveat text-3xl md:text-4xl text-purple-300 drop-shadow-md">
                    Programas de lealtad
                  </span>
                </div>
                <div className="space-y-1 transform hover:scale-105 transition-transform">
                  <span className="font-caveat text-3xl md:text-4xl text-purple-300 drop-shadow-md">
                    Varios métodos de pago
                  </span>
                </div>
                <div className="space-y-1 transform hover:scale-105 transition-transform">
                  <span className="font-caveat text-3xl md:text-4xl text-teal-300 drop-shadow-md">
                    Filtra por categorías
                  </span>
                </div>
                <div className="space-y-1 transform hover:scale-105 transition-transform">
                  <span className="font-caveat text-3xl md:text-4xl text-teal-300 drop-shadow-md">
                    Visualización intuitiva
                  </span>
                </div>
              </div>

              {/* Encouraging CTA Button to redirect to WhatsApp */}
              <div className="text-center mt-10 relative z-10">
                <a
                  href="https://wa.me/51989666214?text=Hola!%20Estoy%20listo%20para%20subir%20mi%20negocio%20al%20siguiente%20nivel%20con%20la%20interfaz%20intuitiva%20de%20GAORSYSTEM%20Per%C3%BA.%20%C3%BFC%C3%B3mo%20empezamos?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-[#017e84] hover:from-teal-400 hover:to-teal-500 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-500/10 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>¡Listo para subir al siguiente nivel! 📈</span>
                </a>
              </div>
            </div>
          </section>

          {/* Kiosk / Self-Order Feature */}
          <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20 max-w-7xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side: Interactive Graphic */}
              <div className="relative flex justify-center order-2 lg:order-1 select-none pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-100/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative w-full max-w-md h-[400px]">
                  {/* Main Kiosk Tablet */}
                  <div className="absolute top-0 left-0 bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 p-2 transform rotate-[-4deg] transition-transform duration-700 z-10 w-[85%] h-[320px]">
                    <div className="flex justify-between items-center bg-slate-800 p-3 rounded-t-2xl border-b border-slate-700">
                      <div className="flex gap-2">
                        <span className="p-1 px-2 rounded bg-slate-700 text-[9px] text-slate-300 font-bold uppercase tracking-wider">
                          Combos
                        </span>
                        <span className="p-1 px-2 rounded bg-slate-700 text-[9px] text-slate-300 font-bold uppercase tracking-wider">
                          Snacks
                        </span>
                      </div>
                      <Search className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="p-3 grid grid-cols-2 gap-3 bg-slate-900 h-full">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex flex-col items-center gap-2 h-20"
                        >
                          <div className="w-10 h-10 rounded-full bg-slate-700/50" />
                          <div className="space-y-1.5 w-full flex-1 flex flex-col items-center">
                            <div className="h-1.5 bg-slate-600 rounded-full w-3/4" />
                            <div className="h-1.5 bg-slate-600 rounded-full w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phone overlay */}
                  <div className="absolute bottom-4 right-0 w-48 bg-slate-900 rounded-[28px] shadow-2xl shadow-black/80 border-4 border-slate-800 p-3 transform rotate-6 transition-transform duration-700 z-20">
                    <div className="flex justify-between items-center mb-4 px-1 border-b border-slate-800 pb-2">
                      <ChevronLeft className="w-4 h-4 text-slate-400" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-300">
                        Tu Pedido
                      </span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </div>
                    <div className="space-y-3 px-1 pb-2">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Subtotal</span>
                        <span>S/ 45.00</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>IGV</span>
                        <span>S/ 8.10</span>
                      </div>
                      <div className="flex justify-between font-bold text-[12px] text-white border-t border-slate-800 pt-3">
                        <span>Total</span>
                        <span className="text-teal-400">S/ 53.10</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-teal-500 to-[#017e84] text-slate-950 text-center py-3 rounded-xl text-[10px] font-black uppercase tracking-wider mt-3 shadow-lg flex items-center justify-center gap-1">
                      <Smartphone className="w-3.5 h-3.5" />
                      Pagar Ahora
                    </div>
                  </div>

                  {/* Accent Hand/Click Icon */}
                  <div className="absolute top-10 -right-2 z-30 animate-[bounce_2s_infinite]">
                    <div className="bg-teal-500/20 p-3 rounded-full border border-teal-500/30 backdrop-blur-sm">
                      <MousePointer2
                        className="w-6 h-6 text-teal-400"
                        fill="currentColor"
                      />
                    </div>
                  </div>

                  {/* Decorative lines like in the image */}
                  <div className="absolute -top-10 -left-6 z-0">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 100 100"
                      fill="none"
                      opacity="0.6"
                    >
                      <path
                        d="M20,50 L40,60"
                        stroke="#2dd4bf"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M40,20 L50,45"
                        stroke="#2dd4bf"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M75,30 L60,50"
                        stroke="#2dd4bf"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right side: Content */}
              <div className="order-1 lg:order-2 space-y-6 text-center lg:text-left pt-10 lg:pt-0">
                <span className="text-teal-400 font-extrabold text-[10px] uppercase tracking-widest block font-mono">
                  Omnicanalidad Integrada
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide leading-tight font-caveat">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-teal-200">
                    El futuro está
                  </span>
                  <br />
                  <span>en el autopedido</span>
                </h2>
                <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                  <strong className="text-teal-400">
                    Avanza hacia el futuro.
                  </strong>{" "}
                  Tus clientes pueden hacer todo con un quiosco automático o
                  escaneando un QR desde sus celulares, desde ordenar sus platos
                  hasta pagar en línea.
                </p>

                <div className="pt-3 flex justify-center lg:justify-start">
                  <a
                    href="https://wa.me/51989666214?text=Hola!%20Me%20encant%C3%B3%20la%20opci%C3%B3n%20de%20autopedido%20y%20quiosco%20digital.%20Deseo%20conversar%20con%20un%20experto%20para%20llevar%20mi%20negocio%20al%20siguiente%20nivel."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center bg-gradient-to-r from-teal-500 to-[#017e84] hover:from-teal-400 hover:to-teal-500 text-slate-950 font-extrabold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-500/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>¡Quiero innovar de la mano de un experto! 💡</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Interactive POS Simulator Section CTA */}
          <section
            id="simulator-cta"
            className="py-10 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20 bg-slate-900/50 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-center">
              <div className="space-y-3">
                <span className="text-purple-400 font-extrabold text-[10px] uppercase tracking-widest block font-mono">
                  Prueba Interactiva del Punto de Venta
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide font-caveat">
                  Diseño de Interfaz Intuitivo y Veloz
                </h2>
                <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                  Utiliza nuestro simulador POS en tiempo real: selecciona
                  artículos de varias categorías, introduce el código{" "}
                  <span className="text-teal-400 font-black">GAOR30</span> para
                  aplicar el 30% de descuento y genera tu boleta con el formato
                  tributario del brochure peruano.
                </p>
              </div>

              <div className="flex justify-center pt-1">
                <button
                  onClick={() => setCurrentView("simulator")}
                  className="bg-gradient-to-r from-teal-500 to-[#017e84] hover:from-teal-400 hover:to-teal-500 text-slate-950 font-black px-8 py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-105 flex items-center gap-3 cursor-pointer"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Explorar Demo en Vivo</span>
                </button>
              </div>
            </div>
          </section>



          {/* Relocated and Animated Comparison Section (placed immediately above budget calculator) */}
          <motion.section
            id="diferencia"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="py-8 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20 max-w-7xl mx-auto relative overflow-hidden bg-slate-950/10"
          >
            {/* Glow Spheres Backing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
              {/* Left Column: Happy Entrepreneur & ERP Control buttons (7 columns) */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                <div className="space-y-3 text-center lg:text-left">
                  <span className="text-teal-400 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest block font-mono">
                    La Tranquilidad del Control Total
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-wide font-caveat leading-tight">
                    Tu Negocio bajo control de un solo vistazo
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed mx-auto lg:mx-0 font-sans">
                    Súmate a los emprendedores de bodegas y minimarkets que ya controlan su negocio de manera rápida, transparente y totalmente integrada desde una sola pantalla.
                  </p>
                </div>

                {/* Entrepreneur Dashboard Card */}
                <div className="relative w-full max-w-2xl bg-gradient-to-b from-purple-950/20 via-slate-900/50 to-slate-900/80 p-6 sm:p-8 rounded-3xl border border-purple-500/10 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-6 items-center">
                  {/* Backdrop lights */}
                  <div className="absolute top-0 left-0 w-36 h-36 bg-teal-500/10 rounded-full blur-[80px]" />
                  <div className="absolute bottom-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full blur-[80px]" />

                  {/* Entrepreneur Image Container */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-teal-500/25 shadow-xl shadow-teal-500/5">
                      <img
                        src={happyEntrepreneurImg}
                        alt="Emprendedor de Market Feliz"
                        className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-3 py-1 rounded-full text-[10px] sm:text-xs shadow-md border border-teal-300/30 font-mono tracking-wider flex items-center gap-1.5 transition-colors">
                      <span className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-ping" />
                      EMPRENDEDOR FELIZ
                    </div>
                  </div>

                  {/* Operational ERP Buttons list on the right of the entrepreneur */}
                  <div className="grid grid-cols-2 gap-3 w-full mt-4 md:mt-0">
                    {[
                      { name: "Compras", desc: "Abastecimiento ágil", icon: ShoppingCart, color: "hover:border-teal-400/40 bg-teal-500/5 text-teal-400" },
                      { name: "Ventas", desc: "Caja rápida y boleta", icon: TrendingUp, color: "hover:border-purple-400/40 bg-purple-500/5 text-purple-400" },
                      { name: "Contabilidad", desc: "Reportes automatizados", icon: Calculator, color: "hover:border-blue-400/40 bg-blue-500/5 text-blue-400" },
                      { name: "Facturación", desc: "Sincronizado con SUNAT", icon: Receipt, color: "hover:border-emerald-400/40 bg-emerald-500/5 text-emerald-400" },
                      { name: "Inventario", desc: "Stock y mermas en vivo", icon: Package, color: "hover:border-pink-400/40 bg-pink-500/5 text-pink-400" },
                      { name: "Reportes", desc: "Ganancia real del día", icon: Layers, color: "hover:border-teal-400/40 bg-teal-500/5 text-teal-300" }
                    ].map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <motion.div
                          key={feature.name}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-3 rounded-xl border border-slate-800/80 bg-slate-900/60 transition-all flex flex-col gap-1 text-left cursor-default group ${feature.color}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-lg bg-white/5 shrink-0 group-hover:bg-white/10 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-white text-xs sm:text-sm font-extrabold tracking-wide font-sans">
                              {feature.name}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[10px] sm:text-[11px] leading-tight font-sans">
                            {feature.desc}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full text-center lg:text-left p-3.5 bg-teal-500/10 rounded-2xl border border-teal-500/20 max-w-2xl">
                  <p className="text-teal-300 font-bold text-xs sm:text-sm font-caveat tracking-wide flex items-center justify-center lg:justify-start gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>¡Y mucho más con soporte de primer nivel e impresora térmica conectada al instante!</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Title and 3 Stacked Cards (5 columns) */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="space-y-4">
                  <span className="text-purple-400 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest block font-mono">
                    Diferencia Real y Sencilla
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide leading-tight font-caveat">
                    ¿Por qué elegir GAORSYSTEM Perú en lugar de sistemas tradicionales?
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans pb-2">
                    La mayoría de sistemas o planificadores exigen costosas consultorías y complejas configuraciones de red. GAORSYSTEM está diseñado para funcionar al instante de forma totalmente amigable para el mercado peruano.
                  </p>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-teal-300 tracking-wide leading-tight font-caveat">
                    La tranquilidad de tener todo bajo control
                  </h3>
                </div>

                {/* Stacked comparison cards with springy hover animations */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      x: 4,
                      borderColor: "rgba(20, 184, 166, 0.3)",
                    }}
                    className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 transition-all flex gap-4 items-start group cursor-default"
                  >
                    <div className="bg-teal-500/10 text-teal-400 p-2.5 rounded-xl border border-teal-500/15 shrink-0 group-hover:bg-teal-500/20 transition-colors">
                      <Receipt className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-extrabold text-xs tracking-wide uppercase font-sans flex items-center gap-1.5">
                        <span>1. Boleta Electrónica sin Intermediarios</span>
                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping" />
                      </h4>
                      <p className="text-slate-300 text-[11px] leading-relaxed font-sans mt-0.5">
                        Genera comprobantes oficiales firmados digitalmente
                        listos para enviar a SUNAT. Te ahorramos pagar empresas
                        PSE secundarias o configuraciones enredadas.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{
                      scale: 1.02,
                      x: 4,
                      borderColor: "rgba(168, 85, 247, 0.3)",
                    }}
                    className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 transition-all flex gap-4 items-start group cursor-default"
                  >
                    <div className="bg-purple-500/10 text-purple-400 p-2.5 rounded-xl border border-purple-500/15 shrink-0 group-hover:bg-purple-500/20 transition-colors">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-extrabold text-xs tracking-wide uppercase font-sans">
                        2. Todo Listo Para Usar
                      </h4>
                      <p className="text-slate-300 text-[11px] leading-relaxed font-sans mt-0.5">
                        Sin tecnicismos aburridos. Controla mermas de almacén,
                        lotes por expirar, precios de ofertas del día y cuadras
                        de caja automáticos con botones gigantes y legibles.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{
                      scale: 1.02,
                      x: 4,
                      borderColor: "rgba(16, 185, 129, 0.3)",
                    }}
                    className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 transition-all flex gap-4 items-start group cursor-default"
                  >
                    <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/15 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-extrabold text-xs tracking-wide uppercase font-sans">
                        3. Soporte Local y Humano
                      </h4>
                      <p className="text-slate-300 text-[11px] leading-relaxed font-sans mt-0.5">
                        ¿Se trabó la impresora de tickets? Llámanos o escríbenos
                        directamente por WhatsApp. Te proporcionamos ingenieros
                        locales peruanos dedicados que te rescatan al momento.
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="pt-2 flex justify-center lg:justify-start">
                  <a
                    href="https://wa.me/51989666214?text=Hola!%20He%20visto%20la%20secci%C3%B3n%20comparativa%20con%20sistemas%20tradicionales.%20Deseo%20ver%20c%C3%B3mo%20funcionar%C3%ADa%20GAORSYSTEM%20para%20mi%20negocio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-gradient-to-r from-teal-500 to-[#017e84] hover:from-teal-400 hover:to-teal-500 text-slate-950 font-extrabold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-500/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>¡Quiero ver cómo funcionaría para mi negocio! 🚀</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Budget Calculator removed from here as it now lives in its own tab */}

          {/* 7. Accordion Frequently Asked Questions (Collapsible with motion) */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <HelpCircle className="w-8 h-8 text-purple-400 mx-auto animate-pulse" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide font-caveat">
                Preguntas Frecuentes
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-normal max-w-md mx-auto">
                Resolvemos tus dudas de forma rápida y visual en dos columnas
                ágiles para un menor uso de espacio.
              </p>
            </div>

            {/* 2-Column Responsive FAQ Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* Column 1 (Left Side: Items 0, 2, 4) */}
              <div className="space-y-4">
                {[0, 2, 4].map((idx) => {
                  const faq = FAQ_ITEMS[idx];
                  if (!faq) return null;
                  const isOpen = activeFaq === idx;
                  return (
                    <motion.div
                      key={idx}
                      layout="position"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="bg-slate-900/60 hover:bg-slate-900/85 border border-slate-800/80 hover:border-purple-500/30 rounded-2xl overflow-hidden transition-all group shadow-sm"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <span className="font-extrabold text-white text-xs sm:text-sm font-sans leading-snug group-hover:text-teal-400 transition-colors">
                          {faq.q}
                        </span>
                        <div
                          className={`text-teal-400 p-1 bg-slate-950 rounded-lg border border-slate-850 shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 bg-teal-500/10 border-teal-500/25"
                              : ""
                          }`}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="px-5 pb-4 text-xs text-slate-200 leading-relaxed font-sans border-t border-slate-800/50 pt-3 whitespace-pre-line bg-slate-950/20">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Column 2 (Right Side: Items 1, 3) */}
              <div className="space-y-4">
                {[1, 3].map((idx) => {
                  const faq = FAQ_ITEMS[idx];
                  if (!faq) return null;
                  const isOpen = activeFaq === idx;
                  return (
                    <motion.div
                      key={idx}
                      layout="position"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="bg-slate-900/60 hover:bg-slate-900/85 border border-slate-800/80 hover:border-purple-500/30 rounded-2xl overflow-hidden transition-all group shadow-sm"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <span className="font-extrabold text-white text-xs sm:text-sm font-sans leading-snug group-hover:text-teal-400 transition-colors">
                          {faq.q}
                        </span>
                        <div
                          className={`text-teal-400 p-1 bg-slate-950 rounded-lg border border-slate-850 shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 bg-teal-500/10 border-teal-500/25"
                              : ""
                          }`}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="px-5 pb-4 text-xs text-slate-200 leading-relaxed font-sans border-t border-slate-800/50 pt-3 whitespace-pre-line bg-slate-950/20">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 8. Sticky lead footer element */}
          <section className="bg-gradient-to-t from-purple-950/40 via-[#0b0314] to-[#0b0314] py-8 px-4 sm:px-6 lg:px-8 border-t border-purple-950/30 text-center">
            <div className="max-w-4xl mx-auto space-y-5">
              <GaorLogo size="sm" showSubtitle={false} className="mx-auto py-1" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-caveat tracking-wide leading-tight">
                ¿Listo para modernizar los cobros e inventarios de tu tienda?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                Ahorra horas de cuadres manuales y evita pérdidas de mercadería
                con nuestro sistema ERP Premium en la nube. ¡30% de descuento
                válido durante la campaña actual!
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                <a
                  href="https://wa.me/51989666214?text=Hola!%20Deseo%20comenzar%20ahora%20con%20GAORSYSTEM%20Per%C3%BA.%20Estoy%20buscando%20una%20soluci%C3%B3n%20integral%20e%20inteligente%20de%20ventas%20y%20administraci%C3%B3n%20para%20mi%20negocio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-teal-500 to-[#017e84] hover:from-teal-400 hover:to-teal-500 text-slate-950 font-black text-sm px-8 py-4 rounded-2xl shadow-xl shadow-teal-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950" />
                  <span>Chatear en WhatsApp: 989 666 214</span>
                </a>

                <a
                  href="#simulator"
                  onClick={() => setCurrentView("simulator")}
                  className="bg-slate-900 border border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-white py-4 px-6 rounded-2xl text-xs font-bold transition-all w-full sm:w-auto text-center"
                >
                  Probar POS Demo de nuevo
                </a>
              </div>

              <div className="text-[11px] text-slate-500/80 font-medium pt-4">
                GAORSYSTEM Perú S.A.C. | Todos los derechos reservados ©{" "}
                {new Date().getFullYear()}.
              </div>
            </div>
          </section>
        </div>
      ) : currentView === "quote" ? (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0b0314] min-h-screen">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-3 pt-6 pb-6 border-b border-slate-900/60 mb-6">
              <span className="text-teal-400 font-extrabold text-[11px] uppercase tracking-widest block font-mono">
                Cotizar Online y Activa tu Promo
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide leading-tight font-caveat">
                Diseña tu Solución en Vivo & Descubre tu Expectativa
              </h1>
              <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mt-4">
                Selecciona tu rubro comercial, el número de puntos de venta que
                deseas interconectar en la nube, equipamiento adicional y obtén
                al instante tu propuesta personalizada con la campaña activa de
                hoy.
              </p>
            </div>
            <BudgetCalculator />
          </div>
        </section>
      ) : (
        <section className="py-6 px-4 bg-[#0b0314] min-h-screen">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center space-y-2 pt-4 pb-4">
              <span className="text-teal-400 font-extrabold text-[11px] uppercase tracking-widest block font-mono">
                Prueba Interactiva del Punto de Venta
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wide leading-tight font-caveat">
                Simulador POS GAORSYSTEM
              </h1>
            </div>

            <SimulatorDeviceWrapper />
          </div>
        </section>
      )}
    </div>
  );
}


