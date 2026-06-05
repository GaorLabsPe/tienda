import React from "react";

interface GaorLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showSubtitle?: boolean;
  layout?: "vertical" | "horizontal";
}

export default function GaorLogo({
  className = "",
  size = "md",
  showText = false,
  showSubtitle = false,
  layout = "vertical",
}: GaorLogoProps) {
  // Dimensions map based on size selection
  const sizeMap = {
    xs: { width: "w-8", height: "h-8", textClass: "text-sm", subTextClass: "text-[7px]" },
    sm: { width: "w-12", height: "h-12", textClass: "text-lg", subTextClass: "text-[9px]" },
    md: { width: "w-20", height: "h-20", textClass: "text-2xl", subTextClass: "text-[11px]" },
    lg: { width: "w-36", height: "h-36", textClass: "text-4xl", subTextClass: "text-sm" },
    xl: { width: "w-52", height: "h-52", textClass: "text-5xl sm:text-6xl", subTextClass: "text-sm sm:text-base" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex ${layout === "horizontal" ? "flex-row items-center text-left" : "flex-col items-center justify-center text-center"} select-none ${className}`}>
      {/* 🚀 SVG Graphic of the Rocket Logo */}
      <div className={`relative ${currentSize.width} ${currentSize.height} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(120,45,242,0.3)]"
        >
          {/* Defs for gradients to match the modern corporate slate theme */}
          <defs>
            <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
            
            <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e2b7" />
              <stop offset="100%" stopColor="#05caa4" />
            </linearGradient>

            <linearGradient id="strokePurpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ac6eff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>

          {/* Background subtle glow sphere */}
          <circle cx="100" cy="100" r="90" fill="url(#glowGrad)" />

          {/* LEFT CURVED BOOSTER LEG */}
          <path
            d="M 68 110 C 35 125 35 155 46 168 C 50 170 54 167 55 162 C 51 154 52 138 64 124"
            fill="#7c3aed"
            stroke="#ac6eff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* RIGHT CURVED BOOSTER LEG */}
          <path
            d="M 132 110 C 165 125 165 155 154 168 C 150 170 146 167 145 162 C 149 154 148 138 136 124"
            fill="#7c3aed"
            stroke="#ac6eff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* BOTTOM THRUST FEET / ENGINE PADS */}
          <path
            d="M 86 160 L 86 172 C 86 175 92 175 92 172 L 92 161 Z"
            fill="#ac6eff"
            stroke="#7c3aed"
            strokeWidth="2"
          />
          <path
            d="M 114 160 L 114 172 C 114 175 108 175 108 172 L 108 161 Z"
            fill="#ac6eff"
            stroke="#7c3aed"
            strokeWidth="2"
          />

          {/* MAIN ROCKET SHIELD/BODY */}
          {/* Gothic teardrop shape pointed at top, rounded below */}
          <path
            d="M 100 24 C 62 76 62 128 100 156 C 138 128 138 76 100 24 Z"
            fill="url(#rocketBodyGrad)"
            stroke="#7c3aed"
            strokeWidth="11"
            strokeLinejoin="round"
          />

          {/* INNER ROCKET WINDOW/CONTROLS */}
          <circle cx="100" cy="88" r="21" fill="#7c3aed" stroke="#ac6eff" strokeWidth="2.5" />
        </svg>
      </div>

      {/* 📝 Brand Text Labels */}
      {showText && (
        <div className={layout === "horizontal" ? "ml-3 flex flex-col items-start leading-[1.1]" : "mt-3 flex flex-col items-center leading-[1.1]"}>
          <h2
            className={`font-black tracking-tight uppercase select-none ${layout === "horizontal" ? "text-base sm:text-lg" : currentSize.textClass} text-[#00e2b7] font-sans`}
            style={{
              textShadow: "1.5px 1.5px 0px #7c3aed, -0.5px -0.5px 0px #7c3aed, 0.5px -0.5px 0px #7c3aed, -0.5px 0.5px 0px #7c3aed",
            }}
          >
            GAORSYSTEM
          </h2>
          
          <h2
            className={`font-black tracking-widest uppercase mt-0.5 select-none ${layout === "horizontal" ? "text-xs sm:text-sm" : currentSize.textClass} text-[#00e2b7] font-sans`}
            style={{
              textShadow: "1.5px 1.5px 0px #7c3aed, -0.5px -0.5px 0px #7c3aed, 0.5px -0.5px 0px #7c3aed, -0.5px 0.5px 0px #7c3aed",
            }}
          >
            PERÚ
          </h2>

          {showSubtitle && (
            <div className={`mt-1.5 transform hover:scale-[1.03] transition-transform duration-300`}>
              <div 
                className="bg-gradient-to-r from-purple-600 to-[#782df2] text-white font-extrabold px-2 py-0.5 rounded text-[8px] sm:text-[9px] shadow-sm border border-purple-400/20 text-center uppercase tracking-wide whitespace-nowrap"
              >
                SOFTWARE ERP <span className="text-[#00e2b7]">PARA TU NEGOCIO</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
