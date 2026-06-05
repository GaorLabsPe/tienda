import React, { useState, useMemo, useEffect } from "react";
import { Product, CartItem } from "../types";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ReceiptText,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  AlertTriangle,
  X,
  Printer,
  Percent,
  MessageSquareShare,
  Smartphone,
  Eye,
  Settings,
  User,
  Coffee,
  Wrench,
  Shirt,
  Store,
  Grid,
  Wifi,
  Cloud,
  FileSpreadsheet,
  Search,
  ChevronRight,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
const happyEntrepreneurImg =
  "/src/assets/images/happy_entrepreneur_receipts_1780589650226.png";

// Industry presets matching store systems
const INDUSTRY_PRESETS = [
  { id: "all", label: "Todo / Home", icon: Grid },
  { id: "minimarket", label: "Abarrotes / Bodega", icon: Store },
  { id: "hardware", label: "Ferretería / Herramientas", icon: Wrench },
  { id: "clothing", label: "Ropa / Moda", icon: Shirt },
  { id: "restaurant", label: "Restaurante / Snacks", icon: Coffee },
];

const INITIAL_PRODUCTS: Product[] = [
  // Minimarket / Bodega
  {
    id: "m1",
    name: "Arroz Extra Costeño 5kg",
    price: 18.5,
    category: "minimarket",
    stock: 24,
    minStock: 8,
    emoji: "🌾",
  },
  {
    id: "m2",
    name: "Leche Evaporada Gloria 400g",
    price: 4.2,
    category: "minimarket",
    stock: 125,
    minStock: 15,
    emoji: "🥛",
  },
  {
    id: "m3",
    name: "Aceite Primor Premium 1L",
    price: 8.9,
    category: "minimarket",
    stock: 4,
    minStock: 10,
    emoji: "🧴",
  }, // low stock
  {
    id: "m4",
    name: "Gaseosa Inca Kola 3L",
    price: 11.5,
    category: "minimarket",
    stock: 15,
    minStock: 5,
    emoji: "🥤",
  },
  {
    id: "m5",
    name: "Azúcar Rubia Cartavio 1kg",
    price: 3.8,
    category: "minimarket",
    stock: 78,
    minStock: 12,
    emoji: "🍬",
  },
  {
    id: "m6",
    name: "Detergente Opal Multiusos 1kg",
    price: 9.8,
    category: "minimarket",
    stock: 18,
    minStock: 5,
    emoji: "🧼",
  },

  // Ferreteria
  {
    id: "h1",
    name: "Martillo Tramontina Acero 16oz",
    price: 24.5,
    category: "hardware",
    stock: 6,
    minStock: 5,
    emoji: "🔨",
  },
  {
    id: "h2",
    name: "Taladro Percutor Bosch 550W",
    price: 189.0,
    category: "hardware",
    stock: 1,
    minStock: 3,
    emoji: "🔌",
  }, // low stock
  {
    id: "h2b",
    name: "Caja de Herramientas Premium Stanley",
    price: 95.0,
    category: "hardware",
    stock: 14,
    minStock: 4,
    emoji: "🧰",
  },
  {
    id: "h3",
    name: "Cinta Aislante 3M Negra 20m",
    price: 3.5,
    category: "hardware",
    stock: 50,
    minStock: 10,
    emoji: "🏷️",
  },
  {
    id: "h4",
    name: "Kit de Destornilladores Stanley x6",
    price: 35.0,
    category: "hardware",
    stock: 12,
    minStock: 4,
    emoji: "🪛",
  },
  {
    id: "h5",
    name: "Clavos de Acero 2 pulgadas x1kg",
    price: 12.0,
    category: "hardware",
    stock: 15,
    minStock: 5,
    emoji: "🔩",
  },

  // Tienda de Ropa
  {
    id: "c1",
    name: "Polo Algodón Premium Pima",
    price: 45.0,
    category: "clothing",
    stock: 30,
    minStock: 5,
    emoji: "👕",
  },
  {
    id: "c2",
    name: "Pantalón Jean Denim Stretch Clásico",
    price: 89.0,
    category: "clothing",
    stock: 3,
    minStock: 8,
    emoji: "👖",
  }, // low stock
  {
    id: "c3",
    name: "Casaca Cortaviento Impermeable",
    price: 149.0,
    category: "clothing",
    stock: 8,
    minStock: 4,
    emoji: "🧥",
  },
  {
    id: "c4",
    name: "Zapatillas Urbanas Blancas Unisex",
    price: 120.0,
    category: "clothing",
    stock: 10,
    minStock: 3,
    emoji: "👟",
  },

  // Restaurante / Café
  {
    id: "r1",
    name: "Pollo a la Brasa - 1/4 Pecho Súper",
    price: 22.0,
    category: "restaurant",
    stock: 45,
    minStock: 10,
    emoji: "🍗",
  },
  {
    id: "r2",
    name: "Lomo Saltado con Gajos de Papa",
    price: 32.0,
    category: "restaurant",
    stock: 15,
    minStock: 3,
    emoji: "🥩",
  },
  {
    id: "r3",
    name: "Arroz con Pollo Criollo Norteño",
    price: 18.0,
    category: "restaurant",
    stock: 2,
    minStock: 5,
    emoji: "🍛",
  }, // low stock
  {
    id: "r4",
    name: "Chicha Morada Natural Jarra 1.5L",
    price: 12.0,
    category: "restaurant",
    stock: 30,
    minStock: 8,
    emoji: "🍷",
  },
  {
    id: "r5",
    name: "Ceviche de Pescado Clásico Tres Mares",
    price: 35.05,
    category: "restaurant",
    stock: 20,
    minStock: 4,
    emoji: "🐟",
  },
];

export default function POSSimulator({
  layoutMode = "desktop",
}: {
  layoutMode?: "desktop" | "tablet" | "mobile";
}) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Numpad control systems - exactly like Odoo 19
  const [selectedCartIndex, setSelectedCartIndex] = useState<number>(-1);
  const [numpadMode, setNumpadMode] = useState<"qty" | "disc" | "price">("qty");
  const [numpadBuffer, setNumpadBuffer] = useState<string>("");
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  // Customer profile info
  const [billingName, setBillingName] = useState("Público General");
  const [rucOrDni, setRucOrDni] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscountRate, setAppliedDiscountRate] = useState<number>(0); // e.g. 0.30 for 30% campaign level

  // Checkout modal
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("B001-0001438");
  const [checkoutSuccessful, setCheckoutSuccessful] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "EFECTIVO" | "YAPE" | "PLIN" | "VISA"
  >("EFECTIVO");
  const [cashReceived, setCashReceived] = useState<string>("");

  // Sync selected index when cart gets modified
  useEffect(() => {
    if (cart.length === 0) {
      setSelectedCartIndex(-1);
      setNumpadBuffer("");
    } else if (selectedCartIndex === -1 || selectedCartIndex >= cart.length) {
      setSelectedCartIndex(cart.length - 1);
      setNumpadBuffer("");
    }
  }, [cart.length, selectedCartIndex]);

  // Helpers for switching select index and mode
  const selectCartItem = (idx: number) => {
    setSelectedCartIndex(idx);
    setNumpadBuffer("");
  };

  const changeNumpadMode = (mode: "qty" | "disc" | "price") => {
    setNumpadMode(mode);
    setNumpadBuffer("");
  };

  const applyCampaign30Percent = () => {
    // If we have an active cart item, apply 30% line discount
    if (selectedCartIndex !== -1 && cart[selectedCartIndex]) {
      setCart((prev) =>
        prev.map((item, idx) =>
          idx === selectedCartIndex ? { ...item, lineDiscount: 30 } : item,
        ),
      );
    }
    // Set global discount rate to 30%, which mimics active Campaign
    setAppliedDiscountRate(0.3);
    setDiscountCode("GAOR30");
    setBillingName("Minimarket El Progreso S.A.C.");
    setRucOrDni("20601423891");
  };

  // Filter products by industry tab and search query
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchIndustry =
        selectedIndustry === "all" || p.category === selectedIndustry;
      const matchQuery = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchIndustry && matchQuery;
    });
  }, [products, selectedIndustry, searchQuery]);

  // Add to cart with precise odoo selection
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id,
      );
      if (existingIdx !== -1) {
        const updated = [...prev];
        const item = updated[existingIdx];
        if (item.quantity < product.stock) {
          updated[existingIdx] = { ...item, quantity: item.quantity + 1 };
        }
        // Set focus to existing item
        setTimeout(() => setSelectedCartIndex(existingIdx), 50);
        return updated;
      } else {
        const newItem: CartItem = { product, quantity: 1, lineDiscount: 0 };
        const updated = [...prev, newItem];
        // Set focus to the end
        setTimeout(() => setSelectedCartIndex(updated.length - 1), 50);
        return updated;
      }
    });
    setNumpadBuffer("");
  };

  // Keyboard engine
  const handleNumpadPress = (key: string) => {
    if (selectedCartIndex === -1 || !cart[selectedCartIndex]) return;
    const activeItem = cart[selectedCartIndex];
    let currentBuffer = numpadBuffer;

    if (key === "backspace") {
      if (currentBuffer.length > 0) {
        currentBuffer = currentBuffer.slice(0, -1);
      } else {
        // Decrease quantity or remove item if backspace pressed on empty buffer
        const nextQty = activeItem.quantity - 1;
        if (nextQty <= 0) {
          setCart((prev) => prev.filter((_, idx) => idx !== selectedCartIndex));
          setSelectedCartIndex((prev) => Math.max(0, prev - 1));
          setNumpadBuffer("");
          return;
        } else {
          setCart((prev) =>
            prev.map((item, idx) =>
              idx === selectedCartIndex ? { ...item, quantity: nextQty } : item,
            ),
          );
          return;
        }
      }
    } else if (key === "+/-") {
      if (currentBuffer.startsWith("-")) {
        currentBuffer = currentBuffer.substring(1);
      } else if (currentBuffer !== "" && currentBuffer !== "0") {
        currentBuffer = "-" + currentBuffer;
      } else {
        currentBuffer = "-";
      }
    } else if (key === ".") {
      if (!currentBuffer.includes(".")) {
        currentBuffer = (currentBuffer || "0") + ".";
      }
    } else {
      // Normal digit
      if (currentBuffer === "0") {
        currentBuffer = key;
      } else {
        currentBuffer = currentBuffer + key;
      }
    }

    setNumpadBuffer(currentBuffer);

    // Apply value live to state
    setCart((prev) => {
      return prev.map((item, idx) => {
        if (idx === selectedCartIndex) {
          const parsedVal = parseFloat(currentBuffer) || 0;
          if (numpadMode === "qty") {
            const safeQty = Math.max(
              0,
              Math.min(item.product.stock, parsedVal),
            );
            return { ...item, quantity: safeQty };
          } else if (numpadMode === "disc") {
            const safeDisc = Math.max(0, Math.min(100, parsedVal));
            return { ...item, lineDiscount: safeDisc };
          } else if (numpadMode === "price") {
            const safePrice = Math.max(0, parsedVal);
            return { ...item, customPrice: safePrice };
          }
        }
        return item;
      });
    });
  };

  // Standard cart actions
  const clearCart = () => {
    setCart([]);
    setAppliedDiscountRate(0);
    setDiscountCode("");
    setCheckoutSuccessful(false);
    setSelectedCartIndex(-1);
    setNumpadBuffer("");
  };

  const removeSpecificLine = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
    setNumpadBuffer("");
  };

  // Calculations that support Odoo decimal precision
  const subtotalBeforeDiscounts = useMemo(() => {
    return cart.reduce((sum, item) => {
      const basePrice =
        item.customPrice !== undefined ? item.customPrice : item.product.price;
      return sum + basePrice * item.quantity;
    }, 0);
  }, [cart]);

  const totalLineDiscounts = useMemo(() => {
    return cart.reduce((sum, item) => {
      const basePrice =
        item.customPrice !== undefined ? item.customPrice : item.product.price;
      const discountPct = item.lineDiscount || 0;
      return sum + basePrice * item.quantity * (discountPct / 100);
    }, 0);
  }, [cart]);

  const totalAfterLineDiscounts = useMemo(() => {
    return subtotalBeforeDiscounts - totalLineDiscounts;
  }, [subtotalBeforeDiscounts, totalLineDiscounts]);

  const campaignDiscountAmount = useMemo(() => {
    return totalAfterLineDiscounts * appliedDiscountRate;
  }, [totalAfterLineDiscounts, appliedDiscountRate]);

  const total = useMemo(() => {
    return Math.max(0, totalAfterLineDiscounts - campaignDiscountAmount);
  }, [totalAfterLineDiscounts, campaignDiscountAmount]);

  const computedIgv = useMemo(() => {
    // SUNAT IGV (18%) inside total price (real calculation)
    return (total * 0.18) / (1 + 0.18);
  }, [total]);

  // Apply Coupon mechanics
  const tryApplyCoupon = (code: string) => {
    const formatted = code.toUpperCase().trim();
    if (
      formatted === "GAOR30" ||
      formatted === "ODOO" ||
      formatted === "CAMPANA30"
    ) {
      setAppliedDiscountRate(0.3);
      setDiscountCode(formatted);
      return true;
    }
    return false;
  };

  // Submit and checkout boleta SUNAT - opens the payment selection first
  const handleCheckout = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (cart.length === 0) return;

    setCashReceived("");
    setSelectedPaymentMethod("EFECTIVO");
    setShowPaymentModal(true);
  };

  // Actually finalize the transaction with the selected payment method
  const handleFinalizePayment = () => {
    if (cart.length === 0) return;

    // Deduct stock simulation
    setProducts((prev) => {
      return prev.map((p) => {
        const inCart = cart.find((item) => item.product.id === p.id);
        if (inCart) {
          return { ...p, stock: Math.max(0, p.stock - inCart.quantity) };
        }
        return p;
      });
    });

    // Generate SUNAT serials
    const randomSeq = Math.floor(Math.random() * 900000) + 100000;
    setReceiptNumber(`B001-0${randomSeq}`);
    setCheckoutSuccessful(true);
    setShowPaymentModal(false);
    setIsReceiptOpen(true);
  };

  // Quick action: auto fill campaign client and code
  const applyCampaignPreset = () => {
    setDiscountCode("GAOR30");
    setAppliedDiscountRate(0.3);
    setBillingName("Minimarket El Progreso S.A.C.");
    setRucOrDni("20601423891");
    setShowCustomerModal(false);
  };

  return (
    <div className="bg-[#f0f2f5] text-slate-800 rounded-2xl overflow-hidden border border-slate-350 shadow-2xl relative font-sans select-none">
      {/* 1. ODOO TOP NAVIGATION BAR (Extremely Authentic Header) */}
      <div className="bg-[#201d24] text-slate-200 px-4 py-2.5 flex items-center justify-between border-b border-[#16141a]">
        {/* Left branding crumbs */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-[#714B67] rounded flex items-center justify-center shadow-inner">
            <div className="w-2.5 h-2.5 border border-white rounded-full"></div>
          </div>
          <div className="flex items-center text-xs">
            <span className="font-extrabold text-[#9e7694] tracking-wider uppercase">
              Odoo<span className="text-white font-medium lowercase">19</span>
            </span>
            <span className="mx-2 text-slate-500 font-bold">/</span>
            <span className="text-slate-300 font-semibold truncate max-w-[140px] sm:max-w-none">
              Punto de Venta (POS-01)
            </span>
          </div>
        </div>

        {/* Sync indicators mock */}
        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
          <span className="hidden sm:flex items-center gap-1.5 text-teal-400">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Online
          </span>
          <span className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <Cloud className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline text-slate-300">
              SUNAT Conectada
            </span>
          </span>
          <div className="border-l border-slate-700 h-4 mx-1"></div>
          <div className="flex items-center gap-2 text-slate-200">
            <div className="bg-[#714B67]/20 border border-[#714B67]/40 w-5 h-5 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-[#714B67]" />
            </div>
            <span className="font-bold text-[11px]">Mitchell Admin</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN POS SCREEN WORKSPACE */}
      <div
        className={`border border-slate-300 rounded-b-2xl overflow-hidden shadow-2xl ${
          layoutMode === "mobile"
            ? "flex flex-col h-auto"
            : "grid grid-cols-1 lg:grid-cols-12 h-auto lg:h-[620px]"
        }`}
      >
        {/* ==================== LEFT AREA: Odoo Order Lines & Dynamic Numpad (45%) ==================== */}
        <div
          className={`flex flex-col bg-white ${
            layoutMode === "mobile"
              ? "border-b border-slate-300 h-[520px] order-2"
              : "lg:col-span-5 border-r border-slate-300 h-[520px] lg:h-full order-1"
          }`}
        >
          {/* Active Cart Line items scrollpane */}
          <div className="flex-1 overflow-y-auto p-3.5 bg-slate-50/55 space-y-1 scrollbar-thin">
            {cart.map((item, idx) => {
              const isActive = selectedCartIndex === idx;
              const hasLineDiscount =
                item.lineDiscount !== undefined && item.lineDiscount > 0;
              const unitPrice =
                item.customPrice !== undefined
                  ? item.customPrice
                  : item.product.price;
              const rowTotal =
                unitPrice *
                item.quantity *
                (1 - (item.lineDiscount || 0) / 100);

              return (
                <div
                  key={item.product.id + "-" + idx}
                  onClick={() => selectCartItem(idx)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer relative ${
                    isActive
                      ? "bg-[#e2f1f5] border-sky-400 shadow-sm ring-1 ring-sky-300/35"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {/* Remove line button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSpecificLine(idx);
                    }}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-rose-600 transition-colors bg-transparent rounded-full hover:bg-slate-100 p-1"
                    title="Remover línea"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="pr-6">
                    {/* Item title */}
                    <span className="font-bold text-slate-800 text-xs block leading-tight truncate">
                      {item.product.emoji} {item.product.name}
                    </span>

                    {/* Calculation breakdown line */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 font-mono">
                      <span>
                        {item.quantity} {item.quantity % 1 === 0 ? "uds" : "kg"}{" "}
                        x S/ {unitPrice.toFixed(2)}
                        {hasLineDiscount && (
                          <span className="text-purple-600 ml-1.5 font-sans font-bold">
                            (-{item.lineDiscount}%)
                          </span>
                        )}
                      </span>
                      <span
                        className={`font-bold ${isActive ? "text-slate-900" : "text-slate-700"}`}
                      >
                        S/ {rowTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {cart.length === 0 && (
              <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-slate-100/80 rounded-full flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">
                    Ticket Vacío - Mitchell Admin
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">
                    Toca artículos a la derecha para iniciar la simulación de
                    cobro.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Totals Display */}
          <div className="p-4 bg-white border-t border-slate-250 space-y-2">
            {/* Show currently selected customer in Odoo mode */}
            <div className="flex justify-between items-center text-[11px] bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg mb-2">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <User className="w-3.5 h-3.5 text-[#714B67]" />
                Cliente:{" "}
                <strong className="text-[#714B67] truncate max-w-[150px]">
                  {billingName}
                </strong>
              </span>
              <button
                onClick={() => setShowCustomerModal(true)}
                className="text-[#017e84] font-bold hover:underline cursor-pointer text-[10px]"
              >
                Cambiar
              </button>
            </div>

            <div className="space-y-1 font-sans text-xs">
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>Subtotal Recibido:</span>
                <span className="font-mono">
                  S/ {subtotalBeforeDiscounts.toFixed(2)}
                </span>
              </div>

              {totalLineDiscounts > 0 && (
                <div className="flex justify-between text-purple-600 font-bold">
                  <span>Descuentos de Línea:</span>
                  <span className="font-mono">
                    - S/ {totalLineDiscounts.toFixed(2)}
                  </span>
                </div>
              )}

              {appliedDiscountRate > 0 && (
                <div className="flex justify-between text-odoo-purple font-bold">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-purple-600" />
                    Descuento Campaña Especial ({appliedDiscountRate * 100}%):
                  </span>
                  <span className="font-mono">
                    - S/ {campaignDiscountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>IGV Incorporado (18%):</span>
                <span>S/ {computedIgv.toFixed(2)}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center bg-[#fcfcff]">
                <span className="text-slate-800 font-extrabold text-xs uppercase tracking-wide">
                  A COBRAR
                </span>
                <span className="text-odoo-teal font-black font-mono text-xl tracking-wider">
                  S/ {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* ===================== MASSIVE INTERACTIVE ODOO 19 NUMPAD AREA ===================== */}
          <div className="grid grid-cols-12 bg-[#eeeef2] p-2 border-t border-slate-300 gap-1.5 flex-shrink-0">
            {/* Left Columns (5 of 12Cols): Big Navigation controls */}
            <div className="col-span-5 flex flex-col gap-1.5 h-full justify-between">
              {/* Odoo "Cliente" selector key */}
              <button
                onClick={() => setShowCustomerModal(true)}
                className="w-full bg-white hover:bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-[11px] font-black text-slate-700 font-sans uppercase tracking-wider flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all shadow-xs h-[68px]"
              >
                <User className="w-4 h-4 text-[#714B67]" />
                <span>Cliente</span>
              </button>

              {/* Odoo Massive Payment Main Trigger (PAGO) */}
              <button
                onClick={() => handleCheckout()}
                disabled={cart.length === 0}
                className={`w-full border rounded-xl text-xs font-black uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md h-[104px] ${
                  cart.length > 0
                    ? "bg-[#017e84] text-white hover:bg-[#016267] border-[#016267] shadow-[#017e84]/15 font-black uppercase tracking-wider"
                    : "bg-slate-300 text-slate-400 border-slate-350 cursor-not-allowed"
                }`}
                title="Pagar con Yape, Plin, Visa, Efectivo"
                id="btn-odoo-pay"
              >
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-teal-200">
                    Sincronizado
                  </span>
                </div>
                <span className="text-[13px] font-black tracking-wide">
                  PAGAR / COBRAR
                </span>
                <span className="text-[8px] opacity-80 uppercase font-bold">
                  Yape, Plin o Tarjeta
                </span>
              </button>
            </div>

            {/* Right Columns (7 of 12Cols): Digits & dynamic modes */}
            <div className="col-span-7 grid grid-cols-4 gap-1">
              {/* Odoo Mode Rows & Digits arrangement */}
              {/* Row 1: digit 1, 2, 3 and Cant mode key */}
              <button
                onClick={() => handleNumpadPress("1")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                1
              </button>
              <button
                onClick={() => handleNumpadPress("2")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                2
              </button>
              <button
                onClick={() => handleNumpadPress("3")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                3
              </button>
              <button
                onClick={() => changeNumpadMode("qty")}
                className={`h-10 text-[10px] font-black uppercase rounded-lg shadow-xs flex items-center justify-center cursor-pointer transition-colors border ${
                  numpadMode === "qty"
                    ? "bg-[#714B67] text-white border-[#714B67]"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-350"
                }`}
                title="Modificar Cantidad"
              >
                Cant
              </button>

              {/* Row 2: digit 4, 5, 6 and Desc mode key */}
              <button
                onClick={() => handleNumpadPress("4")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                4
              </button>
              <button
                onClick={() => handleNumpadPress("5")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                5
              </button>
              <button
                onClick={() => handleNumpadPress("6")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                6
              </button>
              <button
                onClick={() => changeNumpadMode("disc")}
                className={`h-10 text-[10px] font-black uppercase rounded-lg shadow-xs flex items-center justify-center cursor-pointer transition-colors border ${
                  numpadMode === "disc"
                    ? "bg-[#714B67] text-white border-[#714B67]"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-350"
                }`}
                title="Modificar Descuento individual por línea"
              >
                Desc
              </button>

              {/* Row 3: digit 7, 8, 9 and Prec mode key */}
              <button
                onClick={() => handleNumpadPress("7")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                7
              </button>
              <button
                onClick={() => handleNumpadPress("8")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                8
              </button>
              <button
                onClick={() => handleNumpadPress("9")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                9
              </button>
              <button
                onClick={() => changeNumpadMode("price")}
                className={`h-10 text-[10px] font-black uppercase rounded-lg shadow-xs flex items-center justify-center cursor-pointer transition-colors border ${
                  numpadMode === "price"
                    ? "bg-[#714B67] text-white border-[#714B67]"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-350"
                }`}
                title="Modificar Precio override para artículo"
              >
                Precio
              </button>

              {/* Row 4: digit +/- or toggle sign, 0, dot, and backspace */}
              <button
                onClick={() => handleNumpadPress("+/-")}
                className="h-10 text-xs font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                +/-
              </button>
              <button
                onClick={() => handleNumpadPress("0")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                0
              </button>
              <button
                onClick={() => handleNumpadPress(".")}
                className="h-10 text-sm font-bold bg-white active:bg-slate-200 border border-slate-300 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-slate-800"
              >
                .
              </button>
              <button
                onClick={() => handleNumpadPress("backspace")}
                className="h-10 text-sm font-bold bg-[#fadbd8] hover:bg-[#f5b7b1] border border-red-200 rounded-lg shadow-xs flex items-center justify-center cursor-pointer text-[#c0392b] active:bg-[#f1948a]"
                title="Borrar carácter"
              >
                ⌫
              </button>
            </div>
          </div>
        </div>

        {/* ==================== RIGHT AREA: Odoo Categories, Search, & Product Grid (55%) ==================== */}
        <div
          className={`flex flex-col bg-[#f0f2f5] overflow-hidden p-3 sm:p-4 gap-3 ${
            layoutMode === "mobile"
              ? "h-[600px] border-b border-slate-300 order-1"
              : "lg:col-span-7 h-[520px] lg:h-full order-2"
          }`}
        >
          {/* Top navigation filters row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-white p-3 rounded-xl border border-slate-250 shadow-xs">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Buscar por nombre (ej. arroz, lomo)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-slate-100 border border-slate-200 rounded-lg py-2 pl-9 pr-8 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 bg-transparent"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* BEAUTIFUL COMPACT CARD showcasing a happy entrepreneur and their electronic bills (No CTA button, pure inspiration) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-r from-[#201d24] via-[#322c39] to-[#714B67] text-white p-3 rounded-xl border border-purple-500/10 shadow-sm flex items-center gap-3.5 transition-all shrink-0"
          >
            {/* Soft glowing background element */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(113,75,103,0.25),transparent_70%)] pointer-events-none" />

            {/* Happy Entrepreneur Image Frame */}
            <div className="relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border border-white/10 shadow-sm">
              <img
                src={happyEntrepreneurImg}
                alt="Emprendedor de GAORSYSTEM"
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Inspiring text with focus on happy retail & boletas */}
            <div className="flex-1 min-w-0 pr-1 select-none">
              <span className="text-[8px] text-teal-300 font-black uppercase tracking-wider block bg-teal-950/20 px-1.5 py-0.5 rounded w-max border border-teal-500/10 font-mono">
                Éxito Comercial
              </span>
              <h3 className="text-[11px] font-black tracking-tight mt-1 text-white uppercase">
                Boletas Electrónicas al Instante
              </h3>
              <p className="text-[9.5px] leading-snug font-sans text-slate-300">
                Únete a los emprendedores peruanos que ya emiten boletas SUNAT
                homologadas con total fluidez, rapidez y sin errores de cuadre.
              </p>
            </div>
          </motion.div>

          {/* Odoo Breadcrumbs and categories bar */}
          <div className="bg-white border border-slate-250 rounded-xl px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-xs">
            {/* Category selection */}
            <div className="flex items-center gap-1 shrink-0 text-slate-400 text-xs mr-2 font-semibold">
              <span>Inicio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>

            <div className="flex items-center gap-1.5">
              {INDUSTRY_PRESETS.map((preset) => {
                const IconComponent = preset.icon;
                const active = selectedIndustry === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedIndustry(preset.id);
                      setSearchQuery("");
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all shrink-0 cursor-pointer ${
                      active
                        ? "bg-[#714B67] text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    <IconComponent className="w-3 h-3" />
                    <span>{preset.label.split(" / ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Items Frame */}
          <div className="flex-1 overflow-y-auto pr-1 pb-4 scrollbar-thin">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p) => {
                  const isLowStock = p.stock <= p.minStock;
                  const itemInCart = cart.find(
                    (item) => item.product.id === p.id,
                  );
                  const inCartQty = itemInCart ? itemInCart.quantity : 0;

                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => addToCart(p)}
                      className={`relative bg-white rounded-xl border p-3 flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-md transition-all h-[130px] group ${
                        inCartQty > 0
                          ? "border-[#714B67] ring-1 ring-[#714B67]/25"
                          : "border-slate-200 hover:border-slate-350"
                      }`}
                    >
                      {/* Circle quantity indicator overlay */}
                      {inCartQty > 0 && (
                        <div className="absolute -top-1.5 -right-1.5 bg-[#714B67] text-white w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-md animate-none">
                          {inCartQty}
                        </div>
                      )}

                      {/* Header block with emoji and stock state */}
                      <div className="flex justify-between items-start">
                        <div className="w-8 h-8 bg-slate-100/80 group-hover:bg-purple-50 rounded-lg flex items-center justify-center text-xl shadow-inner transition-colors">
                          {p.emoji}
                        </div>
                        <span
                          className={`text-[9px] font-black font-mono px-1.5 py-0.5 rounded-md ${
                            p.stock === 0
                              ? "bg-rose-50 text-rose-600 border border-rose-100"
                              : isLowStock
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-teal-50 text-teal-600 border border-teal-100"
                          }`}
                        >
                          {p.stock === 0 ? "AGOTADO" : `STK: ${p.stock}`}
                        </span>
                      </div>

                      {/* Info body */}
                      <div className="mt-1 flex-1 flex flex-col justify-end">
                        <h4 className="font-extrabold text-[10px] sm:text-xs text-slate-800 line-clamp-2 leading-none tracking-tight group-hover:text-[#714B67] transition-colors uppercase">
                          {p.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-100">
                          <span className="text-odoo-teal font-black font-mono text-[11px] sm:text-xs">
                            S/ {p.price.toFixed(2)}
                          </span>
                          <span className="text-[8px] text-slate-400 uppercase tracking-widest font-black font-sans block">
                            {p.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredProducts.length === 0 && (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center text-slate-400 bg-white border border-slate-250 rounded-xl gap-2 shadow-xs">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                    <Store className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-500">
                    Ningún producto coincide
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedIndustry("all");
                    }}
                    className="text-[10px] text-[#714B67] underline mt-0.5 font-bold"
                  >
                    Restablecer categorías
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sincronización indicators standard rail bottom */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between text-[9px] text-slate-400 font-bold font-sans tracking-wide uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#017e84]"></span>
              SUNAT: Homologado Activo
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Alerta de Stock habilitada (V19)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#714B67]"></span>
              Base de Datos: 20601423891
            </span>
          </div>
        </div>
      </div>

      {/* ================================= MODALS & POPUPS ================================= */}

      {/* MODAL 1: CUSTOMER SELECTION overlay/drawer inside POS */}
      <AnimatePresence>
        {showCustomerModal && (
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center z-40 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-200 max-w-sm w-full p-5 shadow-2xl relative space-y-4"
            >
              <button
                onClick={() => setShowCustomerModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-50 bg-transparent"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <div className="p-1.5 bg-purple-50 text-[#714B67] rounded-lg">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900 tracking-wide uppercase">
                    Asignar Cliente Odoo
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Emisión de boletas/facturas electrónicas en caja
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {/* Billing Name */}
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                    Nombre / Razón Social Cliente:
                  </label>
                  <input
                    type="text"
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    placeholder="Público General"
                    className="w-full text-xs bg-slate-50 border border-slate-250 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#714B67] font-semibold"
                  />
                </div>

                {/* DNI RUC */}
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                    DNI o RUC Tributario:
                  </label>
                  <input
                    type="text"
                    value={rucOrDni}
                    onChange={(e) => setRucOrDni(e.target.value)}
                    placeholder="Sin identificación (Opcional)"
                    maxLength={11}
                    className="w-full text-xs bg-slate-50 border border-slate-250 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#714B67] font-mono font-bold"
                  />
                </div>

                {/* Promo Code Campaign */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      Código de Descuento (Campaña):
                    </label>
                    <span className="text-[9px] text-[#017e84] font-black">
                      Código: GAOR30
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDiscountCode(val);
                        tryApplyCoupon(val);
                      }}
                      placeholder="Ej. GAOR30"
                      className="flex-1 text-xs bg-slate-50 border border-slate-250 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#714B67] font-mono font-bold uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setDiscountCode("GAOR30");
                        setAppliedDiscountRate(0.3);
                        alert("¡Descuento de Campaña GAOR30 (30%) Aplicado!");
                      }}
                      className="bg-[#017e84] text-white px-3 rounded-lg text-xs font-bold hover:bg-[#016267] cursor-pointer"
                    >
                      30%
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-[10px] text-slate-500 space-y-1">
                  <span className="font-bold text-[#714B67] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#714B67]" />
                    ¿Quieres probar la simulación rápida?
                  </span>
                  <p className="leading-tight text-[9px]">
                    Haz clic en el botón de abajo para cargar automáticamente
                    los datos de simulación del brochure tributario.
                  </p>

                  <button
                    type="button"
                    onClick={applyCampaignPreset}
                    className="w-full bg-[#714B67]/10 hover:bg-[#714B67]/20 border border-[#714B67]/20 text-[#714B67] py-1.5 rounded text-[9px] font-black uppercase mt-1 tracking-wider cursor-pointer"
                  >
                    PREESTABLECER CLIENTE CAMPAÑA (30% DESC)
                  </button>
                </div>
              </div>

              {/* Modal footer closing */}
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomerModal(false)}
                  className="flex-1 bg-[#017e84] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#016267] transition-all cursor-pointer text-center"
                >
                  Confirmar y Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 1.5: SELECCIONAR MÉTODO DE PAGO (Perú: YAPE, PLIN, VISA, EFECTIVO) */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-slate-900 rounded-2xl max-w-sm w-full p-5 shadow-2xl relative border-t-8 border-[#017e84]"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900 p-1 rounded-full hover:bg-slate-100 bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 font-sans">
                {/* Header Title */}
                <div className="text-center pb-2 border-b border-slate-100">
                  <h4 className="font-extrabold text-[13px] text-slate-900 uppercase tracking-wide">
                    Caja • Procesar Pago
                  </h4>
                  <p className="text-[9px] text-slate-400 uppercase font-mono tracking-wider font-bold mt-0.5">
                    Sincronizado con SUNAT
                  </p>
                </div>

                {/* Amount to pay display */}
                <div className="bg-slate-55 border border-slate-200 rounded-xl p-3 text-center space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold block">
                    Total a Cobrar
                  </span>
                  <span className="text-2xl font-black text-[#017e84] font-mono block">
                    S/ {total.toFixed(2)}
                  </span>
                  <span className="text-[9px] text-slate-400 block">
                    (IGV de 18% incluido)
                  </span>
                </div>

                {/* Peruvian Payment Methods Selector Grid */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-extrabold">
                    Seleccione Método de Pago:
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    {/* EFECTIVO */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPaymentMethod("EFECTIVO");
                        setCashReceived(total.toFixed(0));
                      }}
                      className={`p-2.5 rounded-xl border-2 text-left flex flex-col justify-between h-16 transition-all cursor-pointer ${
                        selectedPaymentMethod === "EFECTIVO"
                          ? "border-emerald-500 bg-emerald-50/40 text-emerald-950 font-black"
                          : "border-slate-200 hover:border-slate-350 bg-white text-slate-700"
                      }`}
                    >
                      <span className="bg-emerald-500 text-white text-[7.5px] font-black tracking-wider px-1 py-0.2 rounded uppercase self-start">
                        Caja
                      </span>
                      <span className="text-[11px] font-extrabold tracking-wide uppercase mt-1">
                        💵 Efectivo
                      </span>
                    </button>

                    {/* YAPE */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPaymentMethod("YAPE");
                        setCashReceived("");
                      }}
                      className={`p-2.5 rounded-xl border-2 text-left flex flex-col justify-between h-16 transition-all cursor-pointer ${
                        selectedPaymentMethod === "YAPE"
                          ? "border-purple-600 bg-purple-50/40 text-purple-950 font-black"
                          : "border-slate-200 hover:border-slate-350 bg-white text-slate-700"
                      }`}
                    >
                      <span className="bg-purple-600 text-white text-[7.5px] font-black tracking-wider px-1 py-0.2 rounded uppercase self-start">
                        Billetera
                      </span>
                      <span className="text-[11px] font-extrabold tracking-wide uppercase mt-1">
                        📱 Yape
                      </span>
                    </button>

                    {/* PLIN */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPaymentMethod("PLIN");
                        setCashReceived("");
                      }}
                      className={`p-2.5 rounded-xl border-2 text-left flex flex-col justify-between h-16 transition-all cursor-pointer ${
                        selectedPaymentMethod === "PLIN"
                          ? "border-cyan-500 bg-cyan-50/40 text-cyan-955 font-black"
                          : "border-slate-200 hover:border-slate-350 bg-white text-slate-700"
                      }`}
                    >
                      <span className="bg-cyan-500 text-white text-[7.5px] font-black tracking-wider px-1 py-0.2 rounded uppercase self-start">
                        Billetera
                      </span>
                      <span className="text-[11px] font-extrabold tracking-wide uppercase mt-1">
                        🟢 Plin
                      </span>
                    </button>

                    {/* VISA */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPaymentMethod("VISA");
                        setCashReceived("");
                      }}
                      className={`p-2.5 rounded-xl border-2 text-left flex flex-col justify-between h-16 transition-all cursor-pointer ${
                        selectedPaymentMethod === "VISA"
                          ? "border-blue-700 bg-blue-50/40 text-blue-900 font-black"
                          : "border-slate-200 hover:border-slate-350 bg-white text-slate-700"
                      }`}
                    >
                      <span className="bg-blue-700 text-white text-[7.5px] font-black tracking-wider px-1 py-0.2 rounded uppercase self-start">
                        Tarjeta
                      </span>
                      <span className="text-[11px] font-extrabold tracking-wide uppercase mt-1">
                        💳 Visa / POS
                      </span>
                    </button>
                  </div>
                </div>

                {/* Conditional Sub-panels dependent on selection */}
                {selectedPaymentMethod === "EFECTIVO" ? (
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-2.5 space-y-1.5">
                    <label className="block text-[9.5px] font-bold text-emerald-800 uppercase tracking-wide">
                      Monto Recibido:
                    </label>
                    <div className="flex gap-1.5">
                      <div className="relative flex-1">
                        <span className="absolute left-2 top-1.5 text-xs font-bold text-slate-400">
                          S/
                        </span>
                        <input
                          type="number"
                          value={cashReceived}
                          onChange={(e) => setCashReceived(e.target.value)}
                          placeholder={total.toFixed(2)}
                          className="w-full text-xs font-bold bg-white border border-slate-250 rounded-lg pl-7 pr-2 py-1 text-slate-800 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setCashReceived(total.toFixed(2))}
                        className="bg-emerald-500 text-white font-black text-[9px] px-2.5 rounded-lg uppercase tracking-wider hover:bg-emerald-600 transition-colors cursor-pointer"
                      >
                        Exacto
                      </button>
                    </div>

                    {/* Change (Vuelto) calculation dynamically */}
                    {parseFloat(cashReceived) >= total && (
                      <div className="flex justify-between items-center text-xs font-bold pt-1.5 text-emerald-700 border-t border-emerald-500/10">
                        <span>Vuelto sugerido:</span>
                        <span className="text-sm font-black font-mono">
                          S/ {(parseFloat(cashReceived) - total).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : selectedPaymentMethod === "YAPE" ||
                  selectedPaymentMethod === "PLIN" ? (
                  <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-2.5 text-center text-[10px] text-slate-500 leading-normal">
                    <p className="font-semibold text-purple-800">
                      📱 Billetera Móvil QR de {selectedPaymentMethod}
                    </p>
                    <p className="mt-0.5">
                      Muestre su código QR al cliente y valide el abono recibido
                      en su app de cobros antes de emitir.
                    </p>
                  </div>
                ) : (
                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-2.5 text-center text-[10px] text-slate-500 leading-normal">
                    <p className="font-semibold text-blue-800">
                      💳 Cobro mediante Niubiz o Izipay
                    </p>
                    <p className="mt-0.5">
                      Inserte o acerque la tarjeta física del cliente en su
                      terminal POS e ingrese el total de S/ {total.toFixed(2)}.
                    </p>
                  </div>
                )}

                {/* Finalizing confirmation buttons */}
                <div className="pt-2 border-t border-slate-100 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-slate-700 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Regresar
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalizePayment}
                    className="flex-1 bg-[#017e84] hover:bg-[#016267] text-white py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-0.5 shadow-md shadow-[#017e84]/10 active:scale-95"
                  >
                    <span>Emitir boleta</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: RECEIPT PRINTER POPUP (Formato térmico real de la boleta de SUNAT - REDUCIDA Y COMPACTA) */}
      <AnimatePresence>
        {isReceiptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-slate-900 rounded-xl max-w-[290px] w-full p-4 shadow-2xl relative border-t-4 border-[#714B67]"
            >
              <button
                onClick={() => setIsReceiptOpen(false)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-950 p-1 rounded-full hover:bg-slate-100 bg-transparent"
              >
                <X className="w-4 h-4 animate-none" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="bg-[#017e84]/15 p-1.5 text-odoo-teal rounded-full mb-1.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h4 className="font-extrabold text-[11px] text-slate-950 font-sans tracking-wide uppercase">
                  Caja Cerrada Exitosamente
                </h4>
                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                  Boleta autorizada electronicamente
                </p>
              </div>

              {/* Thermal paper invoice mockup layout - EXTREMELY COMPACT AND REDUCED */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 my-2.5 font-mono text-[9px] space-y-2.5 shadow-inner leading-normal">
                <div className="text-center space-y-0.5 pb-2 border-b border-dashed border-slate-300">
                  <div className="font-black text-[10.5px] tracking-tight uppercase">
                    GAORSYSTEM COMPROBANTES SAC
                  </div>
                  <div className="text-[8px] text-slate-500 font-bold">
                    RUC: 20601423891 - Lima, Perú
                  </div>
                  <div className="text-[8px] text-slate-500 leading-none">
                    Urb. Las Orquídeas block C8, San Borja
                  </div>
                  <div className="text-[8px] text-slate-500">
                    Soporte: 989 666 214
                  </div>
                </div>

                <div className="space-y-0.5 text-slate-600">
                  <div className="flex justify-between">
                    <span>COMPROBANTE:</span>
                    <span className="font-extrabold text-slate-900">
                      {receiptNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>FECHA:</span>
                    <span>
                      {new Date().toLocaleDateString("es-PE")}{" "}
                      {new Date().toLocaleTimeString("es-PE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between max-w-full">
                    <span>CLIENTE:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[130px] text-right">
                      {billingName}
                    </span>
                  </div>
                  {rucOrDni && (
                    <div className="flex justify-between">
                      <span>DNI/RUC:</span>
                      <span className="font-bold">{rucOrDni}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>CAJA:</span>
                    <span>Mitchell (Caja #1)</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#017e84] bg-emerald-500/5 px-1 rounded text-[8.5px] border border-emerald-500/10">
                    <span>PAGO RECIBIDO:</span>
                    <span>{selectedPaymentMethod}</span>
                  </div>
                </div>

                {/* Table details block */}
                <div className="border-t border-dashed border-slate-300 pt-1.5 space-y-1.5 max-h-[120px] overflow-y-auto pr-0.5">
                  {cart.map((item, idx) => {
                    const unitPrice =
                      item.customPrice !== undefined
                        ? item.customPrice
                        : item.product.price;
                    const discountRate = item.lineDiscount || 0;
                    const lineTotal =
                      unitPrice * item.quantity * (1 - discountRate / 100);

                    return (
                      <div
                        key={item.product.id + "-rep-" + idx}
                        className="flex justify-between items-start text-[9px] leading-tight"
                      >
                        <div className="max-w-[70%]">
                          <span className="block font-bold text-slate-800 leading-tight">
                            {item.product.name}
                          </span>
                          <span className="text-[8px] text-slate-500 font-sans block">
                            {item.quantity} x S/ {unitPrice.toFixed(2)}
                            {discountRate > 0 && ` (Desc. -${discountRate}%)`}
                          </span>
                        </div>
                        <span className="font-bold text-slate-900">
                          S/ {lineTotal.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Calculation sum details block */}
                <div className="border-t border-dashed border-slate-300 pt-1.5 space-y-0.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal Neto:</span>
                    <span>S/ {subtotalBeforeDiscounts.toFixed(2)}</span>
                  </div>

                  {totalLineDiscounts > 0 && (
                    <div className="flex justify-between text-purple-700 font-bold">
                      <span>Dscto. Items:</span>
                      <span>- S/ {totalLineDiscounts.toFixed(2)}</span>
                    </div>
                  )}

                  {appliedDiscountRate > 0 && (
                    <div className="flex justify-between text-[#714B67] font-bold">
                      <span>Dscto. Campaña (30%):</span>
                      <span>- S/ {campaignDiscountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500 text-[8px]">
                    <span>IGV Incorporado (18%):</span>
                    <span>S/ {computedIgv.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-[11px] font-black border-t border-slate-300 pt-1.5 text-[#017e84]">
                    <span>TOTAL FACTURADO:</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>

                  {selectedPaymentMethod === "EFECTIVO" &&
                    cashReceived &&
                    parseFloat(cashReceived) > total && (
                      <div className="flex justify-between text-[8.5px] font-bold text-emerald-800 pt-0.5">
                        <span>EFECTIVO RECIBIDO:</span>
                        <span>S/ {parseFloat(cashReceived).toFixed(2)}</span>
                      </div>
                    )}
                  {selectedPaymentMethod === "EFECTIVO" &&
                    cashReceived &&
                    parseFloat(cashReceived) > total && (
                      <div className="flex justify-between text-[8.5px] font-black text-emerald-700">
                        <span>VUELTO ENTREGADO:</span>
                        <span>
                          S/ {(parseFloat(cashReceived) - total).toFixed(2)}
                        </span>
                      </div>
                    )}
                </div>

                {/* SUNAT bottom security information, matching brochure standards */}
                <div className="text-center pt-2.5 border-t border-dashed border-slate-300 text-[9px] text-slate-500 space-y-1.5">
                  <div className="flex justify-center my-1.5">
                    {/* Mock Square QR code for SUNAT scan, elegantly done in CSS circles & grids */}
                    <div className="w-16 h-16 bg-white p-1 border border-slate-300 rounded flex flex-wrap gap-[2px] items-center justify-center">
                      {Array.from({ length: 49 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-[6px] h-[6px] rounded-xs ${
                            (i * i + 3) % 5 === 0 || i % 7 === 0 || i > 40
                              ? "bg-slate-900"
                              : "bg-slate-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    Representación impresa de la Boleta de Venta Electrónica.
                  </div>
                  <div className="font-extrabold text-slate-800">
                    Autorizado mediante resolución SUNAT.
                  </div>
                  <div className="text-odoo-purple font-black text-[9px] tracking-wider uppercase">
                    Fácil • Cloud • Sincronizado
                  </div>
                </div>
              </div>

              {/* Action items inside receipt modal close flow */}
              <div className="space-y-2 mt-4 font-sans">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-250 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir Comprobante (Caja)
                </button>
                <a
                  href={`https://wa.me/51989666214?text=Hola%20GAORSYSTEM%20Per%C3%BA,%20acabo%20de%20completar%20la%20prueba%20del%20simulador%20Odoo%2019%20y%20me%20pareci%C3%B3%20formidable.%20Quiero%20poner%20este%20Punto%20de%20Venta%20para%20mi%20negocio.%20Nombre:%20${encodeURIComponent(billingName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 cursor-pointer"
                >
                  <MessageSquareShare className="w-4 h-4" />
                  Solicitar este ERP por WhatsApp
                </a>
                <button
                  onClick={() => {
                    setIsReceiptOpen(false);
                    clearCart();
                  }}
                  className="w-full bg-transparent hover:bg-slate-50 text-slate-500 py-2 rounded-xl text-xs font-medium transition-all text-center cursor-pointer"
                >
                  Comenzar Nueva Venta
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
