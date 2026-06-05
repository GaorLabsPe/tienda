import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Pause, 
  Play, 
  UserPlus, 
  Search, 
  BadgePercent, 
  Plus, 
  Minus, 
  CheckCircle, 
  Receipt,
  UserCheck,
  TrendingDown,
  Sparkles
} from 'lucide-react';

type TabType = 'espera' | 'fidelizacion' | 'mayorista';

export default function DoblePoderInteractive() {
  const [activeTab, setActiveTab] = useState<TabType>('espera');

  // State for TAB 1: Cuenta en Espera
  const [cartA, setCartA] = useState<{name: string, price: number}[]>([
    { name: 'Arroz Extra 5kg', price: 35.00 },
    { name: 'Aceite Vegetal 1L', price: 8.50 }
  ]);
  const [onHoldCart, setOnHoldCart] = useState<{name: string, price: number}[] | null>(null);
  const [currentCart, setCurrentCart] = useState<{name: string, price: number}[]>([
    { name: 'Arroz Extra 5kg', price: 35.00 },
    { name: 'Aceite Vegetal 1L', price: 8.50 }
  ]);
  const [statusMsgTab1, setStatusMsgTab1] = useState<string>('Ticket activo: Atendiendo a "Cliente A"');

  // State for TAB 2: Consulta DNI / RUC y Puntos de Fidelidad
  const [documentNumber, setDocumentNumber] = useState<string>('45781239');
  const [documentType, setDocumentType] = useState<'DNI' | 'RUC'>('DNI');
  const [lookupResult, setLookupResult] = useState<{name: string, type: string, points: number} | null>({
    name: 'Juan Carlos Torres Larrea',
    type: 'DNI',
    points: 140
  });
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [statusMsgTab2, setStatusMsgTab2] = useState<string>('Datos activos para la boleta de Juan Carlos Torres');

  // State for TAB 3: Precios Mayoristas
  const [qty, setQty] = useState<number>(1);
  const unitPriceNormal = 4.50;
  const unitPriceMayorista = 3.90;
  const targetThreshold = 6; // starts mayorista pricing at 6 units

  const isMayoristaActive = qty >= targetThreshold;
  const currentUnitPrice = isMayoristaActive ? unitPriceMayorista : unitPriceNormal;
  const totalMayoristaAmount = qty * currentUnitPrice;
  const normalSum = qty * unitPriceNormal;
  const globalAhorro = isMayoristaActive ? normalSum - totalMayoristaAmount : 0;

  // Handlers for TAB 1
  const handlePutOnHold = () => {
    if (currentCart.length === 0) return;
    setOnHoldCart([...currentCart]);
    setCurrentCart([]); // Leave current screen empty for next customer
    setStatusMsgTab1('¡Cliente A en espera! Caja libre para el "Cliente B".');
  };

  const handleServeCustomerB = () => {
    setCurrentCart([
      { name: 'Leche Gloria Can', price: 4.20 },
      { name: 'Paquete de Galletas', price: 1.50 }
    ]);
    setStatusMsgTab1('Atendiendo a "Cliente B" rápido (S/ 5.70 total).');
  };

  const handleChargeB = () => {
    setCurrentCart([]);
    setStatusMsgTab1('¡Cobrado con éxito al "Cliente B"! Caja libre de nuevo.');
  };

  const handleRecoverCart = () => {
    if (!onHoldCart) return;
    setCurrentCart([...onHoldCart]);
    setOnHoldCart(null);
    setStatusMsgTab1('¡Recuperamos el ticket de "Cliente A"! Listo para cobrar.');
  };

  const handleResetTab1 = () => {
    setCurrentCart([...cartA]);
    setOnHoldCart(null);
    setStatusMsgTab1('Ticket activo: Atendiendo a "Cliente A"');
  };

  // Handlers for TAB 2
  const handleLookup = (numberToSearch?: string, customType?: 'DNI' | 'RUC') => {
    const searchNum = numberToSearch || documentNumber;
    const searchType = customType || documentType;
    
    setIsSearching(true);
    setStatusMsgTab2('Buscando en servidores (RENIEC/SUNAT)...');
    
    setTimeout(() => {
      setIsSearching(false);
      if (searchNum === '45781239') {
        setLookupResult({ name: 'Juan Carlos Torres Larrea', type: 'DNI', points: 140 });
        setStatusMsgTab2('✓ DNI Encontrado: Juan Carlos Torres (140 puntos acumulados)');
      } else if (searchNum === '20601423891') {
        setLookupResult({ name: 'Ferretería El Sol S.A.C.', type: 'RUC', points: 450 });
        setStatusMsgTab2('✓ RUC Encontrado: Ferretería El Sol S.A.C. (450 puntos acumulados)');
      } else if (searchNum.length < 8) {
        setLookupResult(null);
        setStatusMsgTab2('⚠️ Completa un número de DNI (8 dígitos) o RUC (11 dígitos)');
      } else {
        const randomName = searchType === 'DNI' ? 'Carlos Alberto Sánchez Medina' : 'Distribuidora Lima Norte E.I.R.L.';
        setLookupResult({
          name: randomName,
          type: searchType,
          points: 0
        });
        setStatusMsgTab2(`✓ Registrado: ${randomName} (Nuevo cliente, 0 puntos)`);
      }
    }, 600);
  };

  const handleGainPoints = () => {
    if (!lookupResult) return;
    setLookupResult(prev => {
      if (!prev) return null;
      const nextPoints = prev.points + 15;
      setStatusMsgTab2(`⚡ ¡Puntos asignados! ${prev.name} acumuló +15 puntos.`);
      return { ...prev, points: nextPoints };
    });
  };

  const handleResetPoints = () => {
    if (!lookupResult) return;
    setLookupResult(prev => {
      if (!prev) return null;
      setStatusMsgTab2(`✓ Descuento por Canje aplicado a la venta actual.`);
      return { ...prev, points: Math.max(0, prev.points - 100) };
    });
  };

  return (
    <div className="bg-gradient-to-b from-[#0c0516] to-[#0d071b] border border-purple-500/15 rounded-3xl p-5 sm:p-7 max-w-4xl mx-auto space-y-6 relative overflow-hidden font-sans">
      
      {/* Absolute subtle background lights */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-505/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-teal-505/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header section explaining simply */}
      <div className="text-center space-y-1">
        <h4 className="text-white font-extrabold text-sm sm:text-base uppercase tracking-tight">
          Prueba tú mismo las 3 funciones básicas que te salvan el día
        </h4>
        <p className="text-slate-400 text-[11px] sm:text-xs max-w-xl mx-auto leading-tight">
          No necesitas ser un experto en sistemas. Elige una función abajo y presiona los botones para ver cómo te ahorran tiempo y dinero de forma muy sencilla.
        </p>
      </div>

      {/* Simplified Tabs Selector */}
      <div className="flex flex-wrap gap-2 justify-center bg-slate-950 p-1 rounded-2xl border border-slate-900 max-w-lg mx-auto">
        <button
          onClick={() => setActiveTab('espera')}
          className={`flex-1 min-w-[130px] px-3 py-2 rounded-xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'espera' 
              ? 'bg-purple-600 text-white shadow' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Pause className="w-3.5 h-3.5" />
          <span>1. Cuenta en Espera</span>
        </button>

        <button
          onClick={() => setActiveTab('fidelizacion')}
          className={`flex-1 min-w-[130px] px-3 py-2 rounded-xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'fidelizacion' 
              ? 'bg-purple-600 text-white shadow' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>2. Consulta DNI / RUC</span>
        </button>

        <button
          onClick={() => setActiveTab('mayorista')}
          className={`flex-1 min-w-[130px] px-3 py-2 rounded-xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'mayorista' 
              ? 'bg-purple-600 text-white shadow' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BadgePercent className="w-3.5 h-3.5" />
          <span>3. Precios por Mayor</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-slate-950/55 rounded-2xl border border-slate-900/80 p-4 sm:p-6 min-h-[340px] flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CUENTA EN ESPERA */}
          {activeTab === 'espera' && (
            <motion.div
              key="espera"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                
                {/* Column left: Real register screen */}
                <div className="md:col-span-7 bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3.5">
                  <div className="flex justify-between items-center text-[10px] pb-2 border-b border-white/5">
                    <span className="text-teal-400 font-bold block uppercase tracking-wider font-mono">Punto de Venta (Tu pantalla en caja)</span>
                    <span className="text-slate-500 font-mono">CAJA ACTIVA</span>
                  </div>

                  {/* Simulated basket */}
                  <div className="space-y-2 min-h-[110px] flex flex-col justify-center">
                    {currentCart.length === 0 ? (
                      <p className="text-slate-500 text-center text-xs italic">Caja vacía. Lista para el próximo cliente.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {currentCart.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs text-white">
                            <span>🛒 {item.name}</span>
                            <span className="font-mono font-bold">S/ {item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Total indicator */}
                  <div className="border-t border-slate-800/85 pt-3 flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-bold">TOTAL COMPRA:</span>
                    <span className="text-teal-350 text-sm font-black font-mono">
                      S/ {currentCart.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Column right: Simulator control actions */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="bg-purple-900/30 text-purple-300 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border border-purple-500/10 inline-block">
                      Simulador de Fila
                    </span>
                    <h5 className="text-white text-xs font-bold leading-tight">
                      Imagina que Cliente A va por un producto extra y se aleja de la caja:
                    </h5>
                    <p className="text-slate-400 text-[10.5px] leading-relaxed">
                      Presiona <strong>"Dejar en Espera"</strong> para liberar la pantalla, cobrarle al siguiente de la cola, y luego recuperarla para no tener que volver a ingresar sus productos.
                    </p>
                  </div>

                  {/* Operational controls */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={handlePutOnHold}
                      disabled={currentCart.length === 0 || !!onHoldCart}
                      className="bg-purple-600/10 hover:bg-purple-600/20 text-purple-300 border border-purple-500/20 py-2 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ⏸ Dejar en Espera
                    </button>

                    <button
                      type="button"
                      onClick={handleRecoverCart}
                      disabled={!onHoldCart}
                      className="bg-teal-500 hover:bg-teal-405 text-slate-950 py-2 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-45 disabled:cursor-not-allowed"
                    >
                      ▶ Recuperar (A)
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleServeCustomerB}
                      disabled={currentCart.length > 0}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 py-2 rounded-xl text-[10px] font-bold uppercase transition-all"
                    >
                      👤 Cobrar a Cliente B
                    </button>

                    <button
                      type="button"
                      onClick={handleChargeB}
                      disabled={currentCart.length === 0 || currentCart[0]?.name === 'Arroz Extra 5kg'}
                      className="bg-[#037885]/15 hover:bg-[#037885]/25 text-[#0ee1e8] border border-[#0de0e7]/20 py-2 rounded-xl text-[10px] font-bold uppercase transition-all disabled:opacity-40"
                    >
                      ✓ Finalizar Cliente B
                    </button>
                  </div>

                  <button
                    onClick={handleResetTab1}
                    className="text-[9px] text-[#00ebf2] hover:underline font-semibold block text-center"
                  >
                    Resetear Demostración de Cola
                  </button>
                </div>

              </div>

              {/* Status dynamic output bar */}
              <div className="bg-[#120b24] text-slate-300 px-4 py-2.5 rounded-xl border border-purple-950/20 text-[10px] font-mono flex items-center justify-between">
                <span>📍 ESTADO DE LA CAJA: <strong className="text-white">{statusMsgTab1}</strong></span>
                {onHoldCart && (
                  <span className="bg-amber-400/10 text-amber-300 px-1.5 py-0.5 rounded text-[8.5px] font-bold animate-pulse">
                    ⚠️ 1 COMPRA DETENIDA (A)
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: CONSULTA DE DNI O RUC AL INSTANTE */}
          {activeTab === 'fidelizacion' && (
            <motion.div
              key="fidelizacion"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                
                {/* Column Left: Visual lookup simulation screen */}
                <div className="md:col-span-7 bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-[10px] pb-1.5 border-b border-white/5">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider font-mono">Buscador Integrado (RENIEC / SUNAT)</span>
                    <span className="text-teal-400 font-mono font-bold">1ms CONSULTA AUTOMÁTICA</span>
                  </div>

                  {/* Document input simulator */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => { setDocumentType('DNI'); setDocumentNumber('45781239'); }}
                        className={`text-[9.5px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                          documentType === 'DNI' 
                            ? 'bg-purple-500/10 border-purple-500/40 text-purple-350' 
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        DNI (Persona)
                      </button>
                      <button 
                        type="button"
                        onClick={() => { setDocumentType('RUC'); setDocumentNumber('20601423891'); }}
                        className={`text-[9.5px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                          documentType === 'RUC' 
                            ? 'bg-purple-500/10 border-purple-500/40 text-purple-350' 
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        RUC (Empresa)
                      </button>
                    </div>

                    <div className="flex gap-1.5">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={documentNumber}
                          onChange={(e) => setDocumentNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                          placeholder={documentType === 'DNI' ? 'Ej. 45781239' : 'Ej. 20601423891'}
                          className="bg-slate-950 border border-slate-800/80 rounded-lg p-2 text-xs text-white tracking-widest font-mono w-full focus:outline-none focus:border-purple-500/40"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleLookup()}
                        disabled={isSearching}
                        className="bg-purple-600 hover:bg-purple-550 text-white px-3.5 rounded-lg text-[10px] font-extrabold uppercase transition-all shrink-0 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Search className="w-3 h-3" />
                        <span>{isSearching ? 'Buscando...' : 'Buscar'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Search Result display card */}
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850/80 min-h-[90px] flex flex-col justify-center">
                    {lookupResult ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0">
                            <span className="text-[8.5px] font-mono font-bold uppercase tracking-widest text-slate-500 block">
                              Razón Social / Propietario Encontrado:
                            </span>
                            <p className="text-white text-xs font-black truncate">{lookupResult.name}</p>
                          </div>
                          <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-mono font-black px-1.5 py-0.5 rounded border border-emerald-500/15 uppercase shrink-0">
                            {lookupResult.type} VÁLIDO
                          </span>
                        </div>

                        <div className="flex justify-between items-center bg-purple-950/20 px-2.5 py-1.5 rounded-lg border border-purple-505/10">
                          <span className="text-[10px] text-slate-400 font-medium">✨ Puntos de Fidelidad GAOR:</span>
                          <span className="font-mono text-xs font-black text-purple-350">{lookupResult.points} pts</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-500 text-center text-xs italic">Ingresa un número y presiona "Buscar" para consultar la base de datos de manera inmediata.</p>
                    )}
                  </div>
                </div>

                {/* Column Right: Action explanations */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="bg-[#037885]/10 text-[#0ee1e8] text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border border-[#0de0e7]/15 inline-block">
                      Fidelización y SUNAT
                    </span>
                    <h5 className="text-white text-xs font-bold leading-tight">
                      Cero errores de digitación y clientes felices que regresan:
                    </h5>
                    <p className="text-slate-400 text-[10.5px] leading-relaxed">
                      Escribe el número de documento del cliente o haz clic en los tipos de arriba. El sistema consulta y completa su información fiscal en la boleta sin perder tiempo.
                    </p>
                  </div>

                  {/* Interaction Buttons to play with Points */}
                  <div className="space-y-2.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Acción de Caja de Prueba:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleGainPoints}
                        disabled={!lookupResult}
                        className="bg-purple-600 hover:bg-purple-550 text-white py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ⚡ Sumar Puntos (+15)
                      </button>

                      <button
                        type="button"
                        onClick={handleResetPoints}
                        disabled={!lookupResult || lookupResult.points < 100}
                        className="bg-slate-800 hover:bg-slate-700 text-teal-350 py-2 rounded-xl text-[10px] font-bold uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        🎁 Canjear Premio (-100)
                      </button>
                    </div>
                    {lookupResult && lookupResult.points < 100 && (
                      <p className="text-[9px] text-center text-slate-500">
                        (Suma puntos hasta tener 100+ para canjear un premio de descuento)
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Status feedback line */}
              <div className="bg-[#120b24] text-slate-300 px-4 py-2.5 rounded-xl border border-purple-950/20 text-[10px] font-mono">
                📢 CONSULTA EXPRESS: <strong className="text-white">{statusMsgTab2}</strong>
              </div>
            </motion.div>
          )}

          {/* TAB 3: CONTROL DE PRECIOS MAYORISTAS AUTOMÁTICOS */}
          {activeTab === 'mayorista' && (
            <motion.div
              key="mayorista"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                
                {/* Column left: Real register screen */}
                <div className="md:col-span-7 bg-slate-900 rounded-xl p-4 border border-slate-800 flex flex-col justify-between min-h-[160px]">
                  
                  <div className="flex justify-between items-center text-[10px] pb-2 border-b border-white/5">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider font-mono">Comprobante de Caja</span>
                    <span className="text-teal-400 font-mono font-bold text-[8.5px] uppercase">VENTA AUTOMÁTICA</span>
                  </div>

                  {/* Quantity and dynamic savings content */}
                  <div className="py-4 space-y-3">
                    <div className="flex justify-between items-center text-xs text-white">
                      <div className="space-y-0.5">
                        <p className="font-extrabold text-sm font-sans flex items-center gap-1.5">
                          <span>📦 Leche Gloria (Tarro Grande)</span>
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {qty} Tarro(s) x S/ {currentUnitPrice.toFixed(2)} c/u
                        </p>
                      </div>
                      <span className="font-mono font-bold text-sm">S/ {totalMayoristaAmount.toFixed(2)}</span>
                    </div>

                    {isMayoristaActive ? (
                      <div className="bg-emerald-500/10 text-emerald-400 p-2 border border-emerald-500/20 text-[9.5px] rounded-lg font-bold flex justify-between items-center">
                        <span>🏷️ ¡SUPER DESCUENTO AUTOMÁTICO APLICADO POR MAYOR (6+)!</span>
                        <span className="font-mono text-[10.5px] font-black">Ahorras S/ {globalAhorro.toFixed(2)}</span>
                      </div>
                    ) : (
                      <div className="bg-slate-950/80 p-2.5 text-slate-550 text-[9px] rounded-lg text-center font-semibold italic border border-slate-850">
                        Agrega {targetThreshold - qty} tarros más para pasar a Precio Mayorista (S/ {unitPriceMayorista.toFixed(2)} por unidad).
                      </div>
                    )}
                  </div>

                  {/* Receipt Footer */}
                  <div className="border-t border-slate-800/85 pt-3 flex justify-between items-center text-xs font-bold text-slate-400">
                    <span>COBRAR AL CLIENTE:</span>
                    <span className="text-teal-350 text-base font-black font-mono">
                      S/ {totalMayoristaAmount.toFixed(2)}
                    </span>
                  </div>

                </div>

                {/* Column right: Simulator control actions */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="bg-purple-900/30 text-purple-300 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border border-purple-500/10 inline-block">
                      Precios Inteligentes
                    </span>
                    <h5 className="text-white text-xs font-bold leading-tight">
                      Aumenta las unidades de compra para probar la tarifa reducida:
                    </h5>
                    <p className="text-slate-400 text-[10.5px] leading-relaxed">
                      No dejes que tu cajero falle en la matemática o pierda tiempo memorizando tarifas. El sistema calcula y reduce el costo en el instante exacto.
                    </p>
                  </div>

                  {/* Quantity selector buttons */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-3 text-center">
                    <span className="text-[9.5px] text-slate-400 uppercase block font-mono font-extrabold select-none">
                      Ajustar Tarros de Leche en Carrito
                    </span>

                    <div className="flex justify-center items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setQty(prev => Math.max(1, prev - 1))}
                        className="bg-slate-950 text-white w-9 h-9 rounded-xl flex items-center justify-center border border-slate-800 hover:border-slate-700 active:scale-90 transition-transform"
                      >
                        <Minus className="w-4 h-4 text-purple-400" />
                      </button>

                      <span className="text-lg font-black text-white font-mono min-w-[30px] inline-block text-center select-none">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQty(prev => Math.min(12, prev + 1))}
                        className="bg-slate-950 text-white w-9 h-9 rounded-xl flex items-center justify-center border border-slate-800 hover:border-slate-700 active:scale-90 transition-transform"
                      >
                        <Plus className="w-4 h-4 text-teal-400" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* Human, non-technical explanatory bottom panel */}
      <div className="border-t border-white/5 pt-5 text-center leading-relaxed">
        <p className="text-white font-extrabold text-xs">
          💡 En GAORSYSTEM Perú, nos adaptamos a la realidad de tu tienda.
        </p>
        <p className="text-slate-400 text-[10.5px] mt-1 max-w-2xl mx-auto">
          ¿Para qué tener un sistema que nadie entiende? Nuestras funciones están diseñadas para que cualquier colaborador las maneje en un par de minutos, previniendo robos sistemáticos, mermas de stock y agilizando tus cobros al máximo.
        </p>
      </div>

    </div>
  );
}
