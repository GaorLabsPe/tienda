import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  WifiOff, 
  Check, 
  Database, 
  Cloud, 
  QrCode, 
  CreditCard, 
  Coins, 
  Package, 
  AlertTriangle, 
  Users, 
  Search, 
  Star,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

// ==========================================
// 1. INTERACTIVE OFFLINE MODE COMPONENT
// ==========================================
export function InteractiveOfflineFeature() {
  const [isOnline, setIsOnline] = useState<boolean>(false); // Start offline to let them toggle online
  const [cacheCount, setCacheCount] = useState<number>(3);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [salesList, setSalesList] = useState<string[]>([
    'Boleta B001-00214 • S/ 35.00',
    'Boleta B001-00215 • S/ 12.50',
    'Boleta B001-00216 • S/ 84.90'
  ]);

  const handleToggleWifi = () => {
    if (!isOnline) {
      // Toggle to online -> perform synching animation
      setSyncing(true);
      setTimeout(() => {
        setSyncing(false);
        setIsOnline(true);
        setCacheCount(0);
        setSalesList([]);
      }, 1500);
    } else {
      setIsOnline(false);
      setCacheCount(1);
      setSalesList(['Boleta B001-00217 • S/ 52.00']);
    }
  };

  const handleAddOfflineSale = () => {
    if (isOnline) return;
    const nextNum = 217 + salesList.length;
    const randomPrices = [15.00, 24.50, 68.00, 9.90];
    const pickedPrice = randomPrices[Math.floor(Math.random() * randomPrices.length)];
    setCacheCount(prev => prev + 1);
    setSalesList(prev => [...prev, `Boleta B001-00${nextNum} • S/ ${pickedPrice.toFixed(2)}`]);
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto w-full font-sans text-xs">
      
      {/* Live status panel */}
      <div className={`p-4.5 rounded-2xl border transition-all text-center relative ${
        isOnline 
          ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-350' 
          : 'bg-red-500/5 border-red-500/20 text-red-300 animate-pulse'
      }`}>
        <div className="flex justify-between items-center mb-2 font-mono">
          <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500">Antena WiFi Local</span>
          <div className="flex items-center gap-1">
            {isOnline ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
            <span className="font-semibold text-[9.5px] uppercase">
              {isOnline ? 'CONECTANDO DIRECTO (SUNAT)' : 'SINAL DE INTERNET CAÍDO'}
            </span>
          </div>
        </div>

        {isOnline ? (
          <div className="space-y-1 py-1 text-center">
            <p className="text-white font-bold">📡 Sincronización en la Nube Activa</p>
            <p className="text-slate-400 text-[10px]">Tus ventas se homologan y reportan en 1ms automáticamente.</p>
          </div>
        ) : (
          <div className="space-y-1 py-1 text-center">
            <p className="text-white font-bold">⚠️ Búfer de Contingencia GAOR Activo</p>
            <p className="text-slate-400 text-[10px]">Sigue cobrando normalmente. ¡Cero caídas en tu local!</p>
          </div>
        )}
      </div>

      {/* Cache List mockups */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
        <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono pb-1 border-b border-slate-800">
          <span className="flex items-center gap-1 uppercase font-bold text-slate-500">
            <Database className="w-3.5 h-3.5 text-slate-400" />
            Ventas en Caché Local ({cacheCount})
          </span>
          <span className="text-purple-400 font-extrabold uppercase">Memoria Encriptada</span>
        </div>
        
        {syncing ? (
          <div className="py-6 flex flex-col items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-mono text-[9px] animate-pulse">Sincronizando lote local con servidores de SUNAT...</p>
          </div>
        ) : salesList.length === 0 ? (
          <div className="py-4 text-center text-slate-500 text-[10px] space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
            <p className="text-slate-300 font-bold">¡Todo al día en la nube!</p>
            <p className="text-slate-500 text-[9px] leading-tight">No tienes comprobantes pendientes de sincronizar.</p>
          </div>
        ) : (
          <div className="space-y-1 max-h-[85px] overflow-y-auto pr-1">
            {salesList.map((sale, i) => (
              <div key={i} className="flex justify-between items-center bg-[#07030b] border border-purple-950/30 p-1.5 rounded text-[10px] font-mono text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                  {sale}
                </span>
                <span className="text-purple-400 font-bold bg-purple-500/10 px-1 rounded text-[8px] uppercase tracking-wide">Por Sincronizar</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Triggers */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleAddOfflineSale}
          disabled={isOnline || syncing}
          className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-extrabold py-2 px-2.5 rounded-lg border uppercase tracking-wider transition-all select-none active:scale-95 ${
            isOnline 
              ? 'bg-slate-800 border-slate-750 text-slate-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-750 border-purple-500/20 text-white cursor-pointer active:scale-95 shadow shadow-purple-600/10'
          }`}
        >
          <span>Emitir en Tienda</span>
        </button>

        <button
          type="button"
          onClick={handleToggleWifi}
          disabled={syncing}
          className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black py-2 px-3 rounded-lg border uppercase tracking-wider transition-all select-none active:scale-95 cursor-pointer shadow-md ${
            isOnline 
              ? 'bg-red-500/10 hover:bg-red-550/15 border-red-500/25 text-red-400 shadow-red-500/5'
              : 'bg-emerald-500 hover:bg-emerald-600 border-emerald-400 text-slate-950 font-black shadow-emerald-500/15'
          }`}
        >
          {isOnline ? (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span>Simular Corte</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span>Conectar Internet</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}

// ==========================================
// 2. INTERACTIVE MULTI-PAYMENT SIMULATION
// ==========================================
export function InteractiveMultiPaymentFeature() {
  const [selectedMethod, setSelectedMethod] = useState<'YAPE' | 'PLIN' | 'VISA' | 'EFECTIVO'>('YAPE');
  const [cashAmount, setCashAmount] = useState<string>('50');
  const totalBill = 35.80;

  const getVuelto = () => {
    const val = parseFloat(cashAmount);
    if (isNaN(val) || val < totalBill) return '0.00';
    return (val - totalBill).toFixed(2);
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto w-full font-sans text-xs">
      
      {/* Top Selector Grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { id: 'YAPE', label: '📱 Yape', color: 'border-purple-600 bg-purple-500/5 text-purple-400' },
          { id: 'PLIN', label: '🟢 Plin', color: 'border-cyan-500 bg-cyan-500/5 text-cyan-400' },
          { id: 'VISA', label: '💳 Visa', color: 'border-blue-600 bg-blue-500/5 text-blue-400' },
          { id: 'EFECTIVO', label: '💵 Cash', color: 'border-emerald-500 bg-emerald-500/5 text-emerald-400' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setSelectedMethod(btn.id as any)}
            className={`p-1.5 text-[9.5px] font-black uppercase rounded-xl border-2 tracking-wide transition-all select-none cursor-pointer text-center ${
              selectedMethod === btn.id 
                ? 'bg-slate-900 border-slate-200 text-white shadow-md' 
                : 'border-slate-800 text-slate-400 hover:border-slate-705'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Screen view matching dynamic state */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 min-h-[170px] flex flex-col justify-between relative overflow-hidden">
        
        {/* Soft glowing background indicators depending on state */}
        <div className={`absolute inset-0 opacity-10 pointer-events-none blur-3xl transition-all ${
          selectedMethod === 'YAPE' ? 'bg-purple-600' :
          selectedMethod === 'PLIN' ? 'bg-cyan-500' :
          selectedMethod === 'VISA' ? 'bg-blue-600' : 'bg-emerald-500'
        }`} />

        <div className="space-y-2 relative">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block font-mono">Terminal Caja de Pagos</span>
            <span className="text-[9px] text-teal-300 font-bold font-mono">Total: S/ {totalBill.toFixed(2)}</span>
          </div>

          <AnimatePresence mode="wait">
            {selectedMethod === 'YAPE' && (
              <motion.div
                key="yape-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-2 text-center py-2"
              >
                <div className="bg-purple-600 text-white rounded-lg p-1.5 inline-block mx-auto mb-1">
                  <QrCode className="w-8 h-8" />
                </div>
                <p className="text-purple-300 font-bold block text-[11.5px]">📷 QR Código de Yape de la Tienda</p>
                <p className="text-slate-400 text-[10px] leading-tight max-w-[210px] mx-auto">Muestra tu celular o tablet. El cliente lee el QR, abona S/ {totalBill.toFixed(2)} y tú confirmas en tu app.</p>
              </motion.div>
            )}

            {selectedMethod === 'PLIN' && (
              <motion.div
                key="plin-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-2 text-center py-2"
              >
                <div className="bg-cyan-500 text-white rounded-lg p-1.5 inline-block mx-auto mb-1">
                  <QrCode className="w-8 h-8" />
                </div>
                <p className="text-cyan-300 font-bold block text-[11.5px]">📱 Escanear con Plin Interoperable</p>
                <p className="text-slate-400 text-[10px] leading-tight max-w-[210px] mx-auto">Abona de manera instantáneo y reporta en tu reporte de caja cuadre total diario sin costes de tarjeta.</p>
              </motion.div>
            )}

            {selectedMethod === 'VISA' && (
              <motion.div
                key="visa-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-2 text-center py-2"
              >
                <div className="bg-blue-600 text-white rounded-full p-2.5 inline-block mx-auto mb-1">
                  <CreditCard className="w-6 h-6 animate-pulse" />
                </div>
                <p className="text-blue-300 font-bold block text-[11.5px]">💳 Lector POS Niubiz / Izipay listo</p>
                <p className="text-slate-400 text-[10px] leading-tight max-w-[210px] mx-auto">Acerca o inserta la tarjeta. GAORSYSTEM se sincroniza para registrar el cobro por tarjeta de débito/crédito.</p>
              </motion.div>
            )}

            {selectedMethod === 'EFECTIVO' && (
              <motion.div
                key="cash-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-2.5 text-left py-1.5"
              >
                <p className="text-emerald-350 font-bold text-center block text-[11px] uppercase tracking-wide mb-1.5">💵 Pago Rápido en Efectivo</p>
                <div className="flex gap-2 items-center">
                  <span className="text-slate-400 text-[10.5px]">Monto Recibido S/:</span>
                  <input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-teal-300 px-2 py-0.5 rounded text-xs w-24 text-right focus:outline-none focus:border-teal-400 font-bold font-mono"
                  />
                </div>
                <div className="flex justify-between items-center text-xs font-bold pt-1.5 border-t border-slate-800/80 text-emerald-400 font-mono">
                  <span>Vuelto Sugerido para caja:</span>
                  <span className="text-sm font-black bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-350S">S/ {getVuelto()}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}

// ==========================================
// 3. INTERACTIVE STOCK ALERTS SHELF
// ==========================================
export function InteractiveStockWarningFeature() {
  const [selectedProduct, setSelectedProduct] = useState<number>(0);

  const testProducts = [
    { id: 0, name: "Leche Gloria Sol 400g", stock: 3, limit: 10, status: "LOW_STOCK", alert: "📉 Stock Crítico: Reponer urgente.", expiry: "Octubre 2026" },
    { id: 1, name: "Yogurt de Fresa Soprole", stock: 24, limit: 8, status: "EXPIRING", alert: "⏰ Lote Expira en 3 días: Ofertar hoy.", expiry: "En 3 días (Campaña)" },
    { id: 2, name: "Fideos Don Vittorio 1kg", stock: 0, limit: 12, status: "OUT", alert: "❌ SIN STOCK: Desactivado de caja.", expiry: "Diciembre 2026" }
  ];

  return (
    <div className="space-y-4 max-w-sm mx-auto w-full font-sans text-xs">
      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block font-mono text-center mb-1">Góndola Inteligente • Clic para ver alertas</span>
      
      {/* Product List Selector Cards */}
      <div className="space-y-2">
        {testProducts.map((prod) => {
          const isSelected = selectedProduct === prod.id;
          return (
            <button
              key={prod.id}
              onClick={() => setSelectedProduct(prod.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-center select-none cursor-pointer ${
                isSelected 
                  ? 'bg-slate-900 border-yellow-500/30 font-bold text-white shadow-md' 
                  : 'bg-[#0e0716]/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Package className={`w-4 h-4 shrink-0 ${
                  prod.status === 'LOW_STOCK' ? 'text-amber-400' :
                  prod.status === 'EXPIRING' ? 'text-orange-400' : 'text-red-500'
                }`} />
                <div className="truncate pr-1">
                  <span className="block text-[11px] font-bold text-slate-100">{prod.name}</span>
                  <span className="text-[9px] text-slate-400">Stock actual: {prod.stock} u. | Límite: {prod.limit} u.</span>
                </div>
              </div>
              
              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${
                prod.status === 'LOW_STOCK' ? 'bg-amber-500/15 text-amber-300' :
                prod.status === 'EXPIRING' ? 'bg-orange-500/15 text-orange-300' : 'bg-red-500/15 text-red-300'
              }`}>
                {prod.status === 'LOW_STOCK' ? 'Bajo' :
                 prod.status === 'EXPIRING' ? 'Vence' : 'Nulo'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Shelf feedback screen */}
      <div className="bg-amber-500/5 border border-yellow-500/10 rounded-2xl p-3.5 space-y-2 text-center">
        <div className="flex items-center justify-center gap-1.5 text-yellow-400 font-bold uppercase text-[10px] tracking-wide font-mono">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          <span>Notificación Automatizada del ERP</span>
        </div>
        
        <p className="text-white font-bold text-xs">
          {testProducts[selectedProduct].alert}
        </p>
        
        <div className="text-[10px] text-slate-400 leading-normal bg-slate-950/40 p-1.5 rounded border border-slate-900">
          <span>Sugerencia GAOR: </span>
          <span className="text-slate-300 font-medium">
            {testProducts[selectedProduct].status === 'LOW_STOCK' ? 'Generar orden de compra automática al proveedor autorizado con 1 clic.' :
             testProducts[selectedProduct].status === 'EXPIRING' ? 'Activar botón de oferta especial del 30% en pantalla interactiva de caja.' :
             'Inhabilitado temporalmente de caja táctil para evitar insatisfacción del cliente.'}
          </span>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// 4. INTERACTIVE VIP CLIENT LOYALTY
// ==========================================
export function InteractiveVipLoyaltyFeature() {
  const [searchedDni, setSearchedDni] = useState<string>('45831912');
  const [points, setPoints] = useState<number>(1280);
  const [added, setAdded] = useState<boolean>(false);

  const simulateAddVip = () => {
    if (added) return;
    setAdded(true);
    // increment points with animations
    let step = 0;
    const interval = setInterval(() => {
      if (step < 5) {
        setPoints(prev => prev + 20);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 120);
  };

  const handleReset = () => {
    setPoints(1280);
    setAdded(false);
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto w-full font-sans text-xs">
      
      {/* Search Input Simulation */}
      <div className="space-y-1">
        <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">Simulador de Búsqueda de Comitente</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.25" />
            <input
              type="text"
              readOnly
              value={searchedDni}
              className="bg-slate-900 border border-slate-800 text-white pl-8 pr-2 py-1.5 rounded-lg text-xs w-full focus:outline-none focus:border-purple-500 font-mono font-bold"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchedDni('20601423891');
              setAdded(false);
              setPoints(950);
            }}
            className="bg-[#0f0917] hover:bg-slate-900 border border-slate-800 text-slate-300 font-bold px-2 rounded-lg cursor-pointer transition-all active:scale-95 text-[9.5px] uppercase"
          >
            Socio RUC
          </button>
        </div>
      </div>

      {/* Customer profile card preview */}
      <div className="bg-gradient-to-r from-purple-950/20 to-slate-900 border border-purple-500/20 rounded-2xl p-3.5 relative overflow-hidden flex flex-col justify-between min-h-[125px]">
        
        {/* Particle effect */}
        {added && (
          <div className="absolute top-2 right-2 flex items-center gap-0.5 text-yellow-400 font-black animate-bounce text-[9px] font-mono uppercase bg-yellow-500/10 px-1 py-0.2 rounded border border-yellow-500/15">
            <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
            <span>+100 PTS</span>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-black text-white uppercase block leading-tight">
                {searchedDni === '20601423891' ? 'GAORSYSTEM COMPROBANTES SAC' : 'Jorge Pérez del Sol'}
              </span>
              <span className="text-[8px] text-slate-400 uppercase font-mono mt-0.5 block">
                {searchedDni === '20601423891' ? 'RUC COMERCIAL: 20601423891' : 'DNI NATURAL: 45831912'}
              </span>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-md p-1 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
            </div>
          </div>

          <div className="space-y-1.5 pt-1.5 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-[10px] text-slate-300">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                Nivel de Membresía:
              </span>
              <span className="text-yellow-400 font-extrabold uppercase text-[9px] tracking-widest font-mono">Socio VIP Oro</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[9.5px]">
                <span className="text-slate-400 font-bold">Puntos del Cliente:</span>
                <span className="text-white font-mono font-black">{points} PTS</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full border border-slate-850 overflow-hidden relative">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((points / 2000) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trigger control for testing loyalty */}
      <div className="flex gap-2 justify-center pt-1 shrink-0">
        <button
          type="button"
          onClick={simulateAddVip}
          disabled={added}
          className={`flex-1 flex items-center justify-center gap-1.5 text-[9.5px] font-black py-2 px-3 rounded-lg border uppercase tracking-wider transition-all select-none active:scale-95 ${
            added 
              ? 'bg-slate-800 border-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-indigo-650 hover:from-purple-550 hover:to-indigo-550 border-purple-500/10 hover:border-purple-500 text-white cursor-pointer shadow-lg shadow-purple-600/10'
          }`}
        >
          {added ? '✓ Compra y Puntos Registrados' : 'Simular Cobro en Caja (+Puntos)'}
        </button>
        {added && (
          <button
            type="button"
            onClick={handleReset}
            className="bg-[#0f0917] hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-bold px-2 rounded-lg cursor-pointer transition-all active:scale-95 text-[9px] uppercase font-mono"
          >
            Reiniciar
          </button>
        )}
      </div>

    </div>
  );
}
