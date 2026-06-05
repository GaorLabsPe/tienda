import { useState } from 'react';
import POSSimulator from './components/POSSimulator';
import BudgetCalculator from './components/BudgetCalculator';
import DoblePoderInteractive from './components/DoblePoderInteractive';
import { 
  InteractiveMultiPaymentFeature, 
  InteractiveStockWarningFeature, 
  InteractiveVipLoyaltyFeature 
} from './components/InteractiveTourAddons';
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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// FAQ data structure for collapsible accordion
const FAQ_ITEMS = [
  {
    q: "¿El software de GAORSYSTEM requiere pago mensual obligatorio?",
    a: "Para la campaña de inicio de mes, ofrecemos un fabuloso descuento directo del 30% en nuestra tarifa regular de licenciamiento. Este abono anual te incluye servidor en la nube de alta disponibilidad, actualizaciones normativas SUNAT totalmente gratuitas, soporte local premium y boletas electrónicas integradas sin cobros sorpresa a mitad de año."
  },
  {
    q: "¿Cómo se hace el envío de comprobantes electrónicos a SUNAT?",
    a: "Toda venta cobrada en caja genera opcionalmente un archivo contable homologado que se envía de manera automática y transparente a la SUNAT. No requieres contratar PSE externos; nuestro sistema ya incluye este módulo integrado."
  },
  {
    q: "¿En qué se diferencia GAORSYSTEM de un POS tradicional o de Odoo estándar?",
    a: "Mientras que Odoo requiere de complejas parametrizaciones y consultores externos costosos para adaptarse a Perú, GAORSYSTEM ya viene pre-configurado para las tiendas, boticas, ferreterías y minimarkets peruanos. Además, nuestro soporte es local, inmediato vía WhatsApp/Llamadas, y corre en servidores de ultra-baja latencia."
  },
  {
    q: "¿Qué sucede si mi local se queda temporalmente sin señal de internet?",
    a: "¡No te preocupes! El POS de GAORSYSTEM tiene un búfer inteligente de contingencia que te permite seguir facturando y realizando ventas en caja de manera local. Los datos de la venta se sincronizarán con tu servidor central apenas el internet retorne."
  },
  {
    q: "¿Cuántas computadoras o cajas de cobro puedo enlazar con mi cuenta?",
    a: "Nuestro sistema es multiusuario y en la nube. Puedes configurar múltiples cajeros y acceder desde cualquier computadora, laptop, tablet o celular en tiempo real, facilitando la administración de tu negocio remotamente."
  }
];

const FEATURES_TO_SHOW = [
  {
    title: "Boleta SUNAT Directa",
    tagline: "FACTURACIÓN EN 1 SEGUNDO",
    description: "Emite boletas de venta electrónicas firmadas digitalmente y enviadas a SUNAT sin procesos manuales o pasarelas intermedias. El formato contable se genera al instante.",
    icon: Receipt,
    color: "from-teal-500 to-[#017e84]",
    bgAccent: "bg-teal-500/10 text-teal-400"
  },
  {
    title: "Caja Multi-Pago Localizada",
    tagline: "YAPE, PLIN Y TARJETAS",
    description: "Procesa cobros rápidos integrados para el mercado peruano. Agiliza colas permitiendo seleccionar Yape, Plin, tarjeta física, además de efectivo con vuelto automático.",
    icon: CreditCard,
    color: "from-blue-500 to-indigo-650",
    bgAccent: "bg-blue-500/10 text-blue-400"
  },
  {
    title: "Control de Stock y Mermas",
    tagline: "SOPORTE DE CONTROL S.O.S.",
    description: "Visualiza de forma proactiva alertas de vencimiento de lotes o stock mínimo para tus abarrotes, medicinas o prendas. Toma decisiones de preventa informadas.",
    icon: Package,
    color: "from-amber-500 to-orange-650",
    bgAccent: "bg-amber-500/10 text-amber-400"
  },
  {
    title: "Fidelización de Clientes VIP",
    tagline: "RECURRENTES CON PUNTOS",
    description: "Busca y registra clientes por su DNI o RUC al instante de forma automatizada. Prémialos con acumulación de puntos por compras y campañas de descuentos especial.",
    icon: Users,
    color: "from-emerald-500 to-[#017e84]",
    bgAccent: "bg-emerald-500/10 text-emerald-400"
  }
];

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="bg-[#0b0314] text-slate-150 min-h-screen selection:bg-teal-500 selection:text-slate-950 font-sans leading-relaxed overflow-x-hidden">
      
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 bg-[#0b0314]/90 backdrop-blur-xl border-b border-purple-950/40 z-40 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo with rocket layout matching brochure */}
          <div className="flex items-center gap-2.5">
            <div className="relative group">
              <div className="absolute inset-0 bg-teal-500 rounded-xl blur-md opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-teal-400 to-purple-600 text-slate-950 p-2 rounded-xl flex items-center justify-center font-black shadow-lg">
                <svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-[15px] sm:text-lg text-white tracking-tight uppercase font-sans">GAORSYSTEM</span>
                <span className="bg-teal-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full font-mono uppercase">Perú</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans tracking-wide">Sistemas inteligentes para tiendas</p>
            </div>
          </div>

          {/* Nav quick links for Large Screens (hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#simulator" className="hover:text-teal-400 transition-colors uppercase tracking-wider">Simulador POS</a>
            <a href="#success-story" className="hover:text-teal-400 transition-colors uppercase tracking-wider">Caso de Éxito</a>
            <a href="#benefits" className="hover:text-teal-400 transition-colors uppercase tracking-wider">Beneficios</a>
            <a href="#calculator" className="hover:text-teal-400 transition-colors uppercase tracking-wider">Inversión</a>
            <a href="#doble-poder" className="hover:text-teal-400 transition-colors uppercase tracking-wider">Doble Poder</a>
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

            {/* Mobile Expand Button - Only visible on Mobile (< 768px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-teal-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu collapsible panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-3 border-t border-slate-900 pt-3.5 space-y-2 select-none"
            >
              <div className="grid grid-cols-1 gap-1.5 pb-3">
                <a 
                  href="#simulator" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 bg-slate-900/50 hover:bg-purple-950/20 rounded-xl border border-slate-850 text-xs font-bold text-slate-200 hover:text-white transition-colors"
                >
                  🖥️ Simulador POS en Vivo
                </a>
                <a 
                  href="#success-story" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 bg-slate-900/50 hover:bg-purple-950/20 rounded-xl border border-slate-850 text-xs font-bold text-slate-200 hover:text-white transition-colors"
                >
                  🏆 Testimonio / Caso de Éxito
                </a>
                <a 
                  href="#benefits" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 bg-slate-900/50 hover:bg-purple-950/20 rounded-xl border border-slate-850 text-xs font-bold text-slate-200 hover:text-white transition-colors"
                >
                  🚀 Características Clave
                </a>
                <a 
                  href="#calculator" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 bg-slate-900/50 hover:bg-purple-950/20 rounded-xl border border-slate-850 text-xs font-bold text-slate-200 hover:text-white transition-colors"
                >
                  💰 Inversión & Cotizador ROI
                </a>
                <a 
                  href="#doble-poder" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 bg-slate-900/50 hover:bg-purple-950/20 rounded-xl border border-slate-850 text-xs font-bold text-slate-200 hover:text-white transition-colors"
                >
                  ⚡ Doble Poder Comercial
                </a>
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

      {/* 2. Hero banner section with brochure campaign highlights */}
      <section className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20">
        
        {/* Glow Spheres Backing */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-20 right-1/4 w-84 h-84 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Campaign copy text and pricing */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              
              <div className="inline-flex items-center gap-2 bg-purple-950/40 border border-purple-500/20 px-3.5 py-1.5 rounded-full text-purple-300 font-sans text-xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="font-bold uppercase tracking-wider">¡Campaña activa de inicio de mes!</span>
              </div>

              {/* Mobile-optimization statistical metric corresponding to user's 70% data point */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gradient-to-r from-teal-950/40 to-slate-900 border border-teal-500/20 p-3.5 rounded-2xl max-w-lg flex items-start gap-3 shadow-md"
              >
                <div className="bg-teal-500/10 text-teal-400 p-2 rounded-xl border border-teal-500/15 shrink-0 mt-0.5">
                  <Smartphone className="w-4 h-4 text-teal-400 animate-pulse" />
                </div>
                <div className="text-[11.5px] leading-relaxed text-slate-300 select-none">
                  <span className="text-teal-300 font-black block text-xs uppercase tracking-wide">📲 100% Optimizado para Celular & Tablet</span>
                  <strong>El 70% de nuestros clientes</strong> controlan sus ingresos, cierres de caja y stock en vivo directamente desde su celular. ¡Lleva el control de tu tienda en tu bolsillo!
                </div>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight font-sans">
                Lleva un <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">ERP Completo, Moderno y Seguro</span> para tu negocio.
              </h1>

              <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-normal max-w-lg font-sans">
                Desarrollamos soluciones digitales a la medida de tu tienda, bodega, minimarket, ferretería o restaurante en Perú. Totalmente homologado con la SUNAT, en tiempo real y con control de stock inteligente.
              </p>

              {/* Promotional Campaign card focusing on percentage instead of fixed monetary figures */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="bg-slate-900/80 p-6 rounded-2xl border-2 border-purple-500/40 backdrop-blur-md max-w-md relative overflow-hidden group shadow-lg shadow-purple-950/20"
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
                  
                  {/* Huge 30% Off display */}
                  <div className="flex items-center gap-3.5 py-2">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-black font-sans px-4.5 py-3 rounded-2xl text-4xl tracking-tighter shadow-md border border-white/15 scale-100 group-hover:scale-105 transition-all flex flex-col justify-center items-center leading-none">
                      <span>30%</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-200 mt-1">DESC.</span>
                    </div>
                    <div>
                      <span className="text-teal-400 text-xs font-black uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-teal-400 shrink-0 animate-pulse" />
                        ¡Descuento Garantizado!
                      </span>
                      <p className="text-slate-300 text-xs font-medium leading-snug mt-1">
                        Aplica hoy mismo un 30% de descuento directo en tu presupuesto de implementación anual.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 px-3.5 py-2.5 rounded-xl border border-slate-800 text-[10.5px] text-slate-300 font-bold leading-relaxed space-y-1">
                    <span className="text-teal-400 font-mono flex items-center gap-1">
                      💼 TARIFA FLEXIBLE A TU MEDIDA
                    </span>
                    <p className="text-slate-400 font-sans text-[10px] leading-snug">
                      Pagos sin cuotas ocultas u obligaciones a largo plazo. Licenciamiento personalizado por sucursales.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Slogan details matching the three checkmarks on brochure: Seguro, En la nube, Multiusuario */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-slate-950/50 border border-slate-900/80 rounded-xl p-3 text-center space-y-1 backdrop-blur-sm cursor-default"
                >
                  <div className="mx-auto bg-purple-500/10 text-purple-400 w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/15">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-white font-extrabold text-[11px] block uppercase tracking-wide font-sans mt-1">Seguro</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-slate-950/50 border border-slate-900/80 rounded-xl p-3 text-center space-y-1 backdrop-blur-sm cursor-default"
                >
                  <div className="mx-auto bg-purple-500/10 text-purple-400 w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/15">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <span className="text-white font-extrabold text-[11px] block uppercase tracking-wide font-sans mt-1">En la nube</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-slate-950/50 border border-slate-900/80 rounded-xl p-3 text-center space-y-1 backdrop-blur-sm cursor-default"
                >
                  <div className="mx-auto bg-purple-500/10 text-purple-400 w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/15">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-white font-extrabold text-[11px] block uppercase tracking-wide font-sans mt-1">Multiusuario</span>
                </motion.div>
              </div>

            </motion.div>

            {/* Right side: Imagen de emprendedora feliz con su negocio y el sistema GAORSYSTEM */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 relative flex justify-center"
            >
              <div className="relative group rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-950/40 bg-slate-900 p-3 max-w-lg w-full">
                {/* Decorative glow spheres */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-teal-500/15 transition-all" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

                <div className="relative overflow-hidden rounded-2xl aspect-video w-full">
                  <img 
                    src="/src/assets/images/happy_shop_owner_1780597571252.png" 
                    alt="Emprendedora peruana feliz con el sistema GAORSYSTEM en su minimarket" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-bold text-teal-300 flex items-center gap-1.5 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SISTEMA ACTIVO EN TIENDA</span>
                  </div>
                </div>

                {/* Legend caption */}
                <div className="mt-4 p-2 text-center">
                  <p className="text-white font-extrabold text-xs tracking-tight uppercase">
                    Administra tu Minimarket de manera Inteligente, Rápida y Segura
                  </p>
                  <p className="text-slate-400 text-[10px] mt-1 leading-relaxed">
                    Control de stock por código de barras, boletas automáticas y reportes de caja precisos.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefit grid showcasing the user's explicit content with ID 'benefits' */}
      <section id="benefits" className="py-12 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20 max-w-7xl mx-auto relative overflow-hidden">
        {/* Glow Spheres Backing */}
        <div className="absolute top-1/4 right-5 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-5 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-8">
          <span className="text-teal-400 font-extrabold text-[10px] uppercase tracking-widest block font-mono">
            Diferencia GAORSYSTEM
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-teal-400 bg-clip-text text-transparent">
            Lo complejo se vuelve Intuitivo
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Hemos convertido las reglas de negocio peruanas en una interfaz sumamente visual y táctil. Haz clic en las opciones para probar cada función en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Active Features selector tabs - Left side (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-3">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-mono mb-1">
              Explora las Características:
            </span>
            
            {FEATURES_TO_SHOW.map((feat, idx) => {
              const IconComp = feat.icon;
              const isSelected = activeFeature === idx;
              return (
                <button
                  key={'feat-tab-' + idx}
                  onClick={() => {
                    setActiveFeature(idx);
                  }}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-slate-900 border-purple-500/30 text-white shadow-lg shadow-purple-950/20' 
                      : 'bg-[#0f0917]/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                  }`}
                  id={`btn-feature-tab-${idx}`}
                >
                  {/* Subtle color highlight in background of tab */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-purple-500" />
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl border transition-all shrink-0 ${
                      isSelected 
                        ? 'bg-purple-500/10 border-purple-500/30 text-teal-300' 
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 group-hover:text-slate-300'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black tracking-widest uppercase ${
                          isSelected ? 'text-teal-400' : 'text-slate-500'
                        }`}>
                          {feat.tagline}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm tracking-tight">{feat.title}</h4>
                      <p className="text-slate-400 text-[11px] leading-snug line-clamp-2 font-medium">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Device Showcase theater - Right side (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative w-full max-w-xl mx-auto rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-5 shadow-2.5xl shadow-purple-950/30 overflow-hidden min-h-[420px] flex flex-col">
              
              {/* Inner Decorative Background grid */}
              <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Simulated Device Top Bezel Area */}
              <div className="relative flex justify-between items-center text-[9px] font-bold text-slate-500 font-mono border-b border-slate-800 pb-3 mb-4 shrink-0 select-none">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-400 animate-none" />
                  <span className="text-[8.5px] uppercase tracking-wider">GAOR Tablet v2.5 • Simulación</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>SALA DE PRUEVAS INTERACTIVA</span>
                  </span>
                  <span className="text-slate-500">|</span>
                  <span>12:00 PM</span>
                </div>
              </div>

              {/* Dynamic viewport showcasing interactive simulated states */}
              <div className="relative flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {activeFeature === 0 && (
                    <motion.div
                      key="interactive-sunat"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 flex flex-col"
                    >
                      {/* Ticket voucher mock */}
                      <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-xl border-t-8 border-teal-500 max-w-xs mx-auto space-y-3 font-mono text-[10px]">
                        <div className="text-center border-b border-slate-200 pb-2">
                          <span className="font-black block uppercase text-[10px] tracking-tight">GAORSYSTEM COMPROBANTES</span>
                          <span className="text-[8px] text-slate-500">RUC: 20601423891 • Lima</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>BOLETA ELECT.:</span>
                            <span className="font-extrabold text-slate-900">B001-0004523</span>
                          </div>
                          <div className="flex justify-between">
                            <span>EMISIÓN:</span>
                            <span>{new Date().toLocaleDateString('es-PE')}</span>
                          </div>
                          <div className="flex justify-between font-bold border-t border-slate-100 pt-1 text-teal-700">
                            <span>TOTAL FACTURADO:</span>
                            <span>S/ 48.00</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-800 p-1.5 rounded border border-emerald-150">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                          <span className="font-sans font-extrabold text-[8.5px] uppercase tracking-wide">Firma XML Validada</span>
                        </div>
                      </div>

                      {/* Interactive Visual steps */}
                      <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-2.5 max-w-sm mx-auto w-full">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block text-center font-mono">Simulación de Flujo Contable</span>
                        <div className="flex justify-between items-center gap-2">
                          <div className="text-center flex-1">
                            <span className="bg-purple-950/60 p-1.5 rounded-lg border border-purple-500/20 text-purple-300 block text-[9px] font-bold truncate">1. Venta Registrada</span>
                          </div>
                          <span className="text-slate-400">➔</span>
                          <div className="text-center flex-1">
                            <span className="bg-teal-950/60 p-1.5 rounded-lg border border-teal-500/20 text-teal-400 block text-[9px] font-bold truncate">2. Firma Automática</span>
                          </div>
                          <span className="text-slate-400">➔</span>
                          <div className="text-center flex-1">
                            <span className="bg-emerald-950/60 p-1.5 rounded-lg border border-emerald-500/20 text-emerald-400 block text-[9px] font-bold truncate flex items-center justify-center gap-0.5">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                              <span>3. OK SUNAT</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeFeature === 1 && (
                    <motion.div
                      key="interactive-multipay"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <InteractiveMultiPaymentFeature />
                    </motion.div>
                  )}

                  {activeFeature === 2 && (
                    <motion.div
                      key="interactive-stock"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <InteractiveStockWarningFeature />
                    </motion.div>
                  )}

                  {activeFeature === 3 && (
                    <motion.div
                      key="interactive-vip"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <InteractiveVipLoyaltyFeature />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom footer bar calling back with interactive guide */}
              <div className="border-t border-slate-900 pt-3 mt-4 text-center shrink-0 select-none">
                <p className="text-[9.5px] text-slate-500 font-sans">
                  💡 <span className="font-semibold text-slate-400">Consejo Interactivo:</span> Haz clic en los botones de la izquierda para ver cómo se maneja la caja de forma muy simple.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. Interactive POS Simulator Section */}
      <section id="simulator" className="py-10 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20 bg-slate-950/30">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-purple-400 font-extrabold text-[10px] uppercase tracking-widest block">
              Prueba Interactiva del Punto de Venta
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Diseño de Interfaz Intuitivo y Veloz
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-normal">
              Utiliza nuestro simulador POS en tiempo real: selecciona artículos de varias categorías, introduce el código <span className="text-teal-400 font-black">GAOR30</span> para aplicar el 30% de descuento y genera tu boleta con el formato tributario del brochure peruano.
            </p>
          </div>

          <POSSimulator />

        </div>
      </section>

      {/* 5. Emprendimiento Exitoso y Gestión de Boletas Electrónicas */}
      <section id="success-story" className="py-10 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info side */}
          <div className="lg:col-span-5 space-y-5 text-left font-sans">
            <span className="text-teal-400 font-extrabold text-[10px] uppercase tracking-widest block">
              Testimonio de Éxito Comercial
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              La tranquilidad de tener todo bajo control
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Manejar productos, lotes, vencimiento y cumplir con las normativas de la SUNAT ya no es un dolor de cabeza para miles de negocios. 
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Con <strong>GAORSYSTEM</strong>, emites tus boletas en segundos, manejas tus inventarios de forma automática y te enfocas únicamente en lo más valioso: hacer crecer tu negocio y ver felices a tus clientes.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex gap-3 items-start text-xs text-slate-300">
                <div className="bg-teal-500/10 text-teal-400 p-1 rounded-md shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Actualizaciones normativas ante la SUNAT completamente invisibles y automáticas.</span>
              </div>
              <div className="flex gap-3 items-start text-xs text-slate-300">
                <div className="bg-teal-500/10 text-teal-400 p-1 rounded-md shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Sincronización instantánea de boletas impresas o digitales vía WhatsApp.</span>
              </div>
              <div className="flex gap-3 items-start text-xs text-slate-300">
                <div className="bg-teal-500/10 text-teal-400 p-1 rounded-md shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Control total sobre tus mermas, inventarios físicos y ventas diarias.</span>
              </div>
            </div>

            <div className="bg-purple-950/20 p-4 rounded-2xl border border-purple-500/10 text-xs text-purple-300 space-y-1">
              <span className="font-bold flex items-center gap-1 block">
                📌 Campaña Activa:
              </span>
              <p className="text-slate-400 text-[11px] leading-snug">
                Adquiere el sistema durante esta campaña activa con el 30% de descuento y obtén la instalación remota personalizada junto con la carga inicial de tus productos totalmente gratis.
              </p>
            </div>
          </div>

          {/* Image Side - Replaces the AIConsultant chatbot */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative group rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-950/40 bg-slate-900 p-3 max-w-lg w-full font-sans">
              {/* Decorative light elements */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-teal-500/15 transition-all" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/15 transition-all" />
              
              <div className="relative overflow-hidden rounded-2xl aspect-[16/9] w-full">
                <img 
                  src="/src/assets/images/happy_entrepreneur_receipts_1780589650226.png" 
                  alt="Emprendedor peruano exitoso con boletas electrónicas" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-bold text-teal-300 flex items-center gap-1.5 shadow">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>NEGOCIO EXPANDIDO CON GAOR</span>
                </div>
              </div>

              {/* Caption or Quote */}
              <div className="mt-4 p-2 text-center">
                <p className="text-white italic text-xs leading-relaxed">
                  "Desde que implementamos el sistema de facturación en mi minimarket, no solo reducimos el tiempo de atención a la mitad, sino que los cierres de caja cuadran a la perfección todos los días."
                </p>
                <div className="mt-2.5">
                  <span className="text-[10px] font-black tracking-widest text-teal-400 uppercase block">Jorge Pérez</span>
                  <span className="text-[8.5px] text-slate-400 uppercase tracking-widest">Socio Fundador • Minimarket "El Sol de Lima"</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6.5. Doble Poder Comercial (POS + ERP Backoffice synergy) */}
      <section id="doble-poder" className="py-10 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20 max-w-7xl mx-auto relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        
        <div className="space-y-8 relative">
          <div className="text-center space-y-3">
            <span className="text-teal-400 font-extrabold text-[10px] uppercase tracking-widest block font-mono">
              Diseño Inteligente y Fácil
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-teal-400 bg-clip-text text-transparent">
              Funciones potentes que se aprenden en 2 minutos
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Inspirado en los mejores sistemas del mundo como Odoo, pero simplificado al máximo para que tus colaboradores cobren rápido sin enredarse con la computadora. Juega con la demostración de abajo:
            </p>
          </div>

          <DoblePoderInteractive />

        </div>
      </section>

      {/* Relocated and Animated Comparison Section (placed immediately above budget calculator) */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-12 px-4 sm:px-6 lg:px-8 border-b border-purple-950/20 max-w-7xl mx-auto relative overflow-hidden bg-slate-950/10"
      >
        {/* Glow Spheres Backing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          {/* Left Column: Title and 3 Stacked Cards (5 columns) with Staggered Scale-on-hover effects */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-teal-400 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest block font-mono">
                Diferencia Real y Sencilla
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                ¿Por qué elegir GAORSYSTEM Perú en lugar de sistemas tradicionales?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                La mayoría de sistemas o planificadores exigen costosas consultorías y complejas configuraciones de red. GAORSYSTEM está diseñado para funcionar al instante de forma totalmente amigable para el mercado peruano.
              </p>
            </div>

            {/* Stacked comparison cards with springy hover animations */}
            <div className="space-y-4">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.02, x: 4, borderColor: "rgba(20, 184, 166, 0.3)" }}
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
                    Genera comprobantes oficiales firmados digitalmente listos para enviar a SUNAT. Te ahorramos pagar empresas PSE secundarias o configuraciones enredadas.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02, x: 4, borderColor: "rgba(168, 85, 247, 0.3)" }}
                className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 transition-all flex gap-4 items-start group cursor-default"
              >
                <div className="bg-purple-500/10 text-purple-400 p-2.5 rounded-xl border border-purple-500/15 shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-xs tracking-wide uppercase font-sans">2. Todo Listo Para Usar</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans mt-0.5">
                    Sin tecnicismos aburridos. Controla mermas de almacén, lotes por expirar, precios de ofertas del día y cuadras de caja automáticos con botones gigantes y legibles.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02, x: 4, borderColor: "rgba(16, 185, 129, 0.3)" }}
                className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 transition-all flex gap-4 items-start group cursor-default"
              >
                <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/15 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-xs tracking-wide uppercase font-sans">3. Soporte Local y Humano</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans mt-0.5">
                    ¿Se trabó la impresora de tickets? Llámanos o escríbenos directamente por WhatsApp. Te proporcionamos ingenieros locales peruanos dedicados que te rescatan al momento.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column: Highly animated Live Dashboard Mockup with responsive spring widths and entry transitions (7 columns) */}
          <div className="lg:col-span-7 relative">
            
            {/* Floating element 1: Stock alert with dynamic entrance */}
            <motion.div 
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -top-3 -left-4 bg-slate-900 border border-purple-500/25 rounded-2xl p-3 shadow-2xl z-20 max-w-[190px] flex gap-2.5 items-start"
            >
              <div className="bg-red-500/15 text-red-400 p-1.5 rounded-lg shrink-0">
                <AlertTriangle className="w-4 h-4 animate-bounce text-red-400" />
              </div>
              <div className="text-[10px]">
                <span className="text-white font-bold block leading-tight">Control de Almacén</span>
                <p className="text-slate-300 leading-tight mt-0.5">Quedan pocas unidades de Aceite Vegetal.</p>
              </div>
            </motion.div>

            {/* Floating element 2: Sales Metrics with dynamic entrance */}
            <motion.div 
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-4 -right-2 bg-slate-900 border border-teal-500/25 rounded-2xl p-3.5 shadow-2xl z-20 flex gap-3 items-center"
            >
              <div className="bg-teal-500/10 text-teal-400 p-2 rounded-xl">
                <TrendingUp className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase block font-semibold leading-none">Inventario Actual</span>
                <span className="text-teal-400 text-sm font-black font-mono">S/ 48,560.50</span>
                <span className="text-[9px] text-slate-400 block font-mono">Actualizado en vivo</span>
              </div>
            </motion.div>

            {/* Main Laptop mock with the inventory dashboard and spring animations for loading elements */}
            <div className="bg-gradient-to-tr from-purple-900 via-slate-900 to-slate-900 rounded-3xl p-3 border border-purple-950/60 shadow-2.5xl relative overflow-hidden group">
              <div className="bg-slate-950 rounded-2xl overflow-hidden aspect-video relative flex flex-col">
                
                {/* Laptop screen mock header */}
                <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800/80 flex justify-between items-center text-[9px] text-slate-400">
                  <div className="flex items-center gap-1.5 select-none">
                    <Store className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-extrabold text-slate-200">Panel - Minimarket de Prueba</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[8px]">
                    <span className="flex items-center gap-1 text-teal-400 font-bold">
                       <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                       EN LÍNEA
                    </span>
                    <span>Tienda Central</span>
                  </div>
                </div>

                {/* Laptop screen mock contents */}
                <div className="p-4 flex-1 grid grid-cols-12 gap-3 bg-slate-950/90 text-slate-300 font-sans text-[10px]">
                  <div className="col-span-8 space-y-2">
                    
                    {/* Stat Tiles row */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-900/80 rounded-xl p-2 border border-slate-850">
                        <span className="text-slate-500 block text-[8px] font-bold uppercase leading-none">Artículos</span>
                        <span className="text-white font-extrabold text-[11px] block mt-1">1,245 ítems</span>
                      </div>
                      <div className="bg-slate-900/80 rounded-xl p-2 border border-slate-850">
                        <span className="text-slate-500 block text-[8px] font-bold uppercase leading-none">Ventas</span>
                        <span className="text-white font-extrabold text-[11px] block mt-1">35 hechas</span>
                      </div>
                      <div className="bg-slate-900/80 rounded-xl p-2 border border-slate-850">
                        <span className="text-amber-500/90 block text-[8px] font-bold uppercase leading-none">Bajo Stock</span>
                        <span className="text-amber-500 font-extrabold text-[11px] block mt-1">8 artículos</span>
                      </div>
                    </div>

                    {/* Highly responsive bar chart loading on scroll view */}
                    <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-850 space-y-2">
                      <span className="text-slate-300 block text-[9px] font-bold tracking-wide">Ventas por Categorías (Soles S/)</span>
                      <div className="space-y-2">
                        <div className="space-y-0.5">
                          <div className="flex justify-between text-[8px] text-slate-500">
                            <span>Abarrotes y Conservas</span> <span>S/ 12,450.00</span>
                          </div>
                          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: "0%" }} 
                              whileInView={{ width: "75%" }} 
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="bg-purple-600 h-full rounded-full" 
                            />
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex justify-between text-[8px] text-slate-500">
                            <span>Limpieza y Cuidado</span> <span>S/ 4,120.00</span>
                          </div>
                          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: "0%" }} 
                              whileInView={{ width: "42%" }} 
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
                              className="bg-teal-400 h-full rounded-full" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="col-span-4 bg-slate-900/80 rounded-xl p-2.5 border border-slate-850 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="text-slate-400 block font-bold text-[8px] uppercase tracking-wider">Productos Recientes</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 px-1 py-0.5 hover:bg-slate-950 rounded transition-colors text-[9px]">
                          <span>🌾</span> <span className="truncate">Arroz Extra 5kg</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-1 py-0.5 hover:bg-slate-950 rounded transition-colors text-[9px]">
                          <span>🥛</span> <span className="truncate">Leche Evaporada</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-1 py-0.5 hover:bg-slate-950 rounded transition-colors text-[9px]">
                          <span>🧴</span> <span className="truncate">Aceite Vegetal</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950/90 p-2 rounded border border-slate-800 text-[8px] leading-normal text-teal-400/90 font-medium text-center">
                      ⚡ Sincronización en la nube automática.
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </motion.section>

      {/* 6. Budget & ROI Calculator section */}
      <section id="calculator" className="py-10 px-4 sm:px-6 lg:px-8 bg-slate-950/20 border-b border-purple-950/20">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-teal-400 font-extrabold text-[10px] uppercase tracking-widest block animate-none">
              Inversión Transparente
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Calcula Tu Costo y Retorno de Inversión (ROI)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leadership leading-normal">
              Selecciona tu rubro comercial para ver qué funciones avanzadas te corresponden y calcula tu ahorro inmediato con nuestra campaña promocional del 30% de descuento.
            </p>
          </div>

          <BudgetCalculator />

        </div>
      </section>

      {/* 7. Accordion Frequently Asked Questions (Collapsible with motion) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-purple-400 mx-auto animate-pulse" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight font-sans">
            Preguntas Frecuentes
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-normal max-w-md mx-auto">
            Resolvemos tus dudas de forma rápida y visual en dos columnas ágiles para un menor uso de espacio.
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
                    <div className={`text-teal-400 p-1 bg-slate-950 rounded-lg border border-slate-850 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-teal-500/10 border-teal-500/25' : ''
                    }`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
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
                    <div className={`text-teal-400 p-1 bg-slate-950 rounded-lg border border-slate-850 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-teal-500/10 border-teal-500/25' : ''
                    }`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
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
      <section className="bg-gradient-to-t from-purple-950/40 via-[#0b0314] to-[#0b0314] py-10 px-4 sm:px-6 lg:px-8 border-t border-purple-950/30 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <Store className="w-10 h-10 text-teal-400 mx-auto animate-none" />
          <h2 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight leading-tight">
            ¿Listo para modernizar los cobros e inventarios de tu tienda?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Ahorra horas de cuadres manuales y evita pérdidas de mercadería con nuestro sistema ERP Premium en la nube. ¡30% de descuento válido durante la campaña actual!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-3">
            <a
              href="https://wa.me/51989666214?text=Hola%20GAORSYSTEM%20Per%C3%BA,%20deseo%20activar%20el%20sistema%20con%20el%2030%25%20de%20descuento%20de%20campa%C3%B1a."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <PhoneCall className="w-4 h-4 text-slate-950" />
              <span>Chatear en WhatsApp: 989 666 214</span>
            </a>
            
            <a
              href="#simulator"
              className="bg-slate-900 border border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-white py-4 px-6 rounded-2xl text-xs font-bold transition-all w-full sm:w-auto text-center"
            >
              Probar POS Demo de nuevo
            </a>
          </div>

          <div className="text-[11px] text-slate-500/80 font-medium pt-4">
            GAORSYSTEM Perú S.A.C. | Todos los derechos reservados © {new Date().getFullYear()}.
          </div>
        </div>
      </section>

    </div>
  );
}
