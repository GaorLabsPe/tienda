import { useState } from "react";
import POSSimulator from "../components/POSSimulator";

export default function SimulatorDeviceWrapper() {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  return (
    <div className="flex flex-col items-center w-full">
      {/* Device Toggle */}
      <div className="flex bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 mb-6 w-full max-w-xs mx-auto">
        <button
          onClick={() => setDevice("desktop")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all ${device === "desktop" ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
        >
          <span className="hidden sm:block">PC / Laptop</span>
          <span className="sm:hidden">PC</span>
        </button>
        <button
          onClick={() => setDevice("tablet")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all ${device === "tablet" ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
        >
          Tablet
        </button>
        <button
          onClick={() => setDevice("mobile")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all ${device === "mobile" ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
        >
          <span className="hidden sm:block">Móvil</span>
          <span className="sm:hidden">Cel</span>
        </button>
      </div>

      {/* Device Frame */}
      <div
        className={`bg-slate-950 border-4 border-slate-800 rounded-3xl shadow-2xl transition-all duration-500 ${
          device === "desktop"
            ? "w-full max-w-4xl aspect-video"
            : device === "tablet"
            ? "w-full max-w-2xl aspect-[3/4]"
            : "w-full max-w-[280px] aspect-[9/19]"
        }`}
      >
        <div className="absolute top-2 w-full flex justify-center left-0">
          {device === "tablet" || device === "mobile" ? (
            <div className="w-16 h-1.5 bg-slate-800 rounded-full" />
          ) : null}
        </div>
        <div className="flex-1 mt-2">
          <POSSimulator layoutMode={device} />
        </div>
      </div>
    </div>
  );
}
