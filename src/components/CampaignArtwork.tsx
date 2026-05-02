type BrandKey = 'BMW' | 'Rolls-Royce' | 'MINI' | 'Honda' | 'Triumph' | 'MORGAN' | 'Harley-Davidson' | 'Maserati' | 'Sixt' | 'All Brands' | string;

interface CampaignArtworkProps {
  brand: BrandKey;
  campaignType: string;
  title: string;
  className?: string;
}

const brandGradients: Record<string, [string, string]> = {
  'BMW': ['#1B4D8C', '#2563eb'],
  'Rolls-Royce': ['#0a0a0a', '#1a1a2e'],
  'MINI': ['#8B4513', '#C9A96E'],
  'Honda': ['#c1121f', '#8b0000'],
  'Triumph': ['#dc2626', '#1f2937'],
  'MORGAN': ['#16a34a', '#d4a853'],
  'Morgan': ['#16a34a', '#d4a853'],
  'Harley-Davidson': ['#ff6b35', '#1a1a1a'],
  'Maserati': ['#1a1a2e', '#4a5568'],
  'Sixt': ['#FF5F00', '#CC4C00'],
  'All Brands': ['#1B2B5B', '#C9A96E'],
};

// BMW Sport Sedan — sleek modern (5 Series / M3 silhouette: long hood, sloped roof, Hofmeister kink)
function BMWSilhouette() {
  return (
    <g opacity="0.95">
      {/* Body — long hood + fastback roofline */}
      <path d="M40,128 L52,128 L55,118 L62,110 L78,102 L100,96 L130,88 L165,84 L195,86 L218,93 L235,100 L248,108 L258,116 L270,120 L278,128 L286,128"
            fill="white" fillOpacity="0.12" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      {/* Greenhouse - sloped fastback */}
      <path d="M120,90 L112,99 L107,108 L155,106 L155,87 Z" fill="white" fillOpacity="0.22"/>
      <path d="M158,87 L158,106 L205,106 L218,98 L207,90 L195,87 Z" fill="white" fillOpacity="0.22"/>
      {/* Hofmeister kink */}
      <path d="M205,94 L218,96 L213,103 L208,102 Z" fill="white" fillOpacity="0.08"/>
      {/* Belt line */}
      <line x1="65" y1="115" x2="265" y2="115" stroke="white" strokeWidth="0.8" opacity="0.4"/>
      {/* Kidney grille hint */}
      <rect x="44" y="116" width="6" height="10" rx="1" fill="white" fillOpacity="0.25"/>
      <rect x="51" y="116" width="6" height="10" rx="1" fill="white" fillOpacity="0.25"/>
      {/* Headlight - angular */}
      <path d="M48,112 L62,108 L68,112 L62,116 Z" fill="white" fillOpacity="0.45"/>
      {/* Tail light */}
      <rect x="270" y="110" width="10" height="5" rx="1" fill="#ff3333" fillOpacity="0.55"/>
      {/* Wheels — M-style */}
      <circle cx="92" cy="130" r="16" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="92" cy="130" r="11" fill="white" fillOpacity="0.05"/>
      <circle cx="92" cy="130" r="4" fill="white" fillOpacity="0.4"/>
      {[0,72,144,216,288].map(a => (
        <line key={a} x1="92" y1="130" x2={92 + 11*Math.cos((a-90)*Math.PI/180)} y2={130 + 11*Math.sin((a-90)*Math.PI/180)} stroke="white" strokeWidth="1.5" opacity="0.5"/>
      ))}
      <circle cx="232" cy="130" r="16" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="232" cy="130" r="11" fill="white" fillOpacity="0.05"/>
      <circle cx="232" cy="130" r="4" fill="white" fillOpacity="0.4"/>
      {[0,72,144,216,288].map(a => (
        <line key={`r${a}`} x1="232" y1="130" x2={232 + 11*Math.cos((a-90)*Math.PI/180)} y2={130 + 11*Math.sin((a-90)*Math.PI/180)} stroke="white" strokeWidth="1.5" opacity="0.5"/>
      ))}
    </g>
  );
}

// Rolls-Royce — long, stately Phantom/Ghost silhouette with prominent vertical Pantheon grille
function RollsRoyceSilhouette() {
  return (
    <g opacity="0.95">
      {/* Long stately body — flat roof, suicide-door wheelbase */}
      <path d="M22,128 L34,128 L36,108 L38,96 L48,86 L66,80 L96,74 L150,72 L210,72 L242,76 L262,84 L274,96 L282,108 L286,128 L298,128"
            fill="white" fillOpacity="0.10" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      {/* Pantheon grille — tall vertical */}
      <rect x="26" y="88" width="14" height="34" rx="1" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1"/>
      {[91,96,101,106,111,116].map(y => (
        <line key={y} x1="28" y1={y} x2="38" y2={y} stroke="white" strokeWidth="0.6" opacity="0.5"/>
      ))}
      <line x1="33" y1="88" x2="33" y2="122" stroke="white" strokeWidth="0.8" opacity="0.4"/>
      {/* Spirit of Ecstasy */}
      <line x1="33" y1="88" x2="33" y2="76" stroke="white" strokeWidth="1.5" opacity="0.85"/>
      <path d="M28,76 L33,68 L38,76 L33,80 Z" fill="white" fillOpacity="0.7"/>
      {/* Greenhouse — flat formal roof */}
      <path d="M70,80 L62,90 L60,100 L150,98 L150,72 Z" fill="white" fillOpacity="0.16"/>
      <path d="M152,72 L152,98 L240,98 L255,90 L228,76 L195,72 Z" fill="white" fillOpacity="0.16"/>
      {/* Hidden B-pillar (suicide door gap) */}
      <line x1="150" y1="74" x2="150" y2="98" stroke="white" strokeWidth="0.5" opacity="0.3"/>
      {/* Body chrome line */}
      <line x1="48" y1="118" x2="282" y2="118" stroke="white" strokeWidth="0.8" opacity="0.45"/>
      {/* Square headlights */}
      <rect x="42" y="100" width="10" height="8" rx="1" fill="white" fillOpacity="0.5"/>
      {/* Tail light */}
      <rect x="276" y="106" width="6" height="8" rx="1" fill="#ff3333" fillOpacity="0.5"/>
      {/* Wheels — large with white-walls feel */}
      <circle cx="86" cy="130" r="17" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="86" cy="130" r="12" fill="white" fillOpacity="0.06"/>
      <circle cx="86" cy="130" r="5" fill="white" fillOpacity="0.5"/>
      <circle cx="248" cy="130" r="17" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="248" cy="130" r="12" fill="white" fillOpacity="0.06"/>
      <circle cx="248" cy="130" r="5" fill="white" fillOpacity="0.5"/>
    </g>
  );
}

// MINI Cooper — short hatchback, short overhangs, round headlight, contrast roof
function MINISilhouette() {
  return (
    <g opacity="0.95">
      {/* Short body — distinctive stubby proportions */}
      <path d="M88,128 L96,128 L98,116 L102,104 L114,94 L132,88 L162,86 L188,88 L204,94 L214,104 L218,116 L222,128 L232,128"
            fill="white" fillOpacity="0.14" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Iconic dome roof (contrast color hint) */}
      <path d="M118,90 Q116,98 116,108 L162,108 L162,86 Q140,84 118,90 Z" fill="white" fillOpacity="0.28"/>
      <path d="M164,86 L164,108 L198,108 Q204,100 200,93 Q183,86 164,86 Z" fill="white" fillOpacity="0.28"/>
      {/* Roof rim (contrast roof line) */}
      <path d="M112,92 Q160,82 206,92" fill="none" stroke="white" strokeWidth="2" opacity="0.6"/>
      {/* Black grille bar */}
      <rect x="92" y="116" width="14" height="6" rx="2" fill="white" fillOpacity="0.4"/>
      {/* Round MINI headlight */}
      <circle cx="100" cy="110" r="6" fill="white" fillOpacity="0.55"/>
      <circle cx="100" cy="110" r="3" fill="white" fillOpacity="0.85"/>
      {/* Round taillight */}
      <rect x="218" y="106" width="6" height="9" rx="2" fill="#ff3333" fillOpacity="0.55"/>
      {/* Side body line */}
      <line x1="100" y1="120" x2="220" y2="120" stroke="white" strokeWidth="0.7" opacity="0.4"/>
      {/* Wheels */}
      <circle cx="118" cy="130" r="14" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="118" cy="130" r="9" fill="white" fillOpacity="0.06"/>
      <circle cx="118" cy="130" r="3" fill="white" fillOpacity="0.5"/>
      <circle cx="206" cy="130" r="14" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="206" cy="130" r="9" fill="white" fillOpacity="0.06"/>
      <circle cx="206" cy="130" r="3" fill="white" fillOpacity="0.5"/>
    </g>
  );
}

// Honda — modern crossover/sedan (Civic/CR-V silhouette: balanced, slightly raised)
function HondaSilhouette() {
  return (
    <g opacity="0.95">
      {/* Body — slightly raised crossover stance */}
      <path d="M50,128 L62,128 L64,114 L72,104 L88,96 L114,90 L145,86 L180,86 L208,90 L228,96 L242,104 L252,114 L258,128 L272,128"
            fill="white" fillOpacity="0.12" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      {/* Greenhouse — modern wraparound */}
      <path d="M122,90 L116,98 L113,106 L152,104 L152,87 Z" fill="white" fillOpacity="0.22"/>
      <path d="M154,87 L154,104 L202,104 L212,96 L200,90 Z" fill="white" fillOpacity="0.22"/>
      {/* Honda H-grille (chrome bar) */}
      <rect x="56" y="112" width="12" height="3" rx="0.5" fill="white" fillOpacity="0.5"/>
      <rect x="56" y="118" width="12" height="3" rx="0.5" fill="white" fillOpacity="0.3"/>
      {/* Headlight - swept */}
      <path d="M58,108 L72,104 L78,108 L72,112 Z" fill="white" fillOpacity="0.45"/>
      {/* Tail light */}
      <rect x="248" y="108" width="10" height="6" rx="1" fill="#ff3333" fillOpacity="0.55"/>
      {/* Body crease */}
      <line x1="72" y1="118" x2="252" y2="118" stroke="white" strokeWidth="0.7" opacity="0.4"/>
      {/* Wheels */}
      <circle cx="100" cy="130" r="15" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="100" cy="130" r="10" fill="white" fillOpacity="0.06"/>
      <circle cx="100" cy="130" r="3.5" fill="white" fillOpacity="0.5"/>
      {[0,60,120,180,240,300].map(a => (
        <line key={a} x1="100" y1="130" x2={100 + 10*Math.cos((a-90)*Math.PI/180)} y2={130 + 10*Math.sin((a-90)*Math.PI/180)} stroke="white" strokeWidth="1.2" opacity="0.5"/>
      ))}
      <circle cx="232" cy="130" r="15" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="232" cy="130" r="10" fill="white" fillOpacity="0.06"/>
      <circle cx="232" cy="130" r="3.5" fill="white" fillOpacity="0.5"/>
      {[0,60,120,180,240,300].map(a => (
        <line key={`r${a}`} x1="232" y1="130" x2={232 + 10*Math.cos((a-90)*Math.PI/180)} y2={130 + 10*Math.sin((a-90)*Math.PI/180)} stroke="white" strokeWidth="1.2" opacity="0.5"/>
      ))}
    </g>
  );
}

// Harley-Davidson — cruiser style (long, low, ape-hangers, big front fender, V-twin engine, rider position)
function HarleySilhouette() {
  return (
    <g opacity="0.95">
      {/* Big rounded fenders */}
      <path d="M60,128 Q80,108 110,116" fill="none" stroke="white" strokeWidth="2.2" opacity="0.6"/>
      <path d="M210,116 Q240,108 260,128" fill="none" stroke="white" strokeWidth="2.2" opacity="0.6"/>
      {/* Big teardrop fuel tank */}
      <path d="M138,98 Q150,82 175,84 Q188,92 188,104 L138,104 Z" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="1.8"/>
      {/* V-twin engine block */}
      <path d="M148,108 L152,118 L160,124 L172,124 L180,118 L184,108 Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.5"/>
      <line x1="156" y1="110" x2="158" y2="120" stroke="white" strokeWidth="1.2"/>
      <line x1="174" y1="110" x2="176" y2="120" stroke="white" strokeWidth="1.2"/>
      {/* Cruiser seat — low, dipped */}
      <path d="M186,98 Q198,94 216,100 L216,106 Q200,104 188,106 Z" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.5"/>
      {/* Sissy bar / tall backrest */}
      <line x1="216" y1="100" x2="220" y2="80" stroke="white" strokeWidth="2" opacity="0.7"/>
      <path d="M214,80 L220,76 L226,80" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7"/>
      {/* Ape-hanger handlebars */}
      <path d="M132,98 Q126,80 118,72" fill="none" stroke="white" strokeWidth="2.2" opacity="0.85"/>
      <line x1="113" y1="70" x2="123" y2="74" stroke="white" strokeWidth="2.2"/>
      {/* Front fork (raked) */}
      <line x1="135" y1="100" x2="118" y2="124" stroke="white" strokeWidth="2" opacity="0.85"/>
      {/* Round headlight */}
      <circle cx="124" cy="98" r="6" fill="white" fillOpacity="0.55"/>
      <circle cx="124" cy="98" r="3" fill="white" fillOpacity="0.85"/>
      {/* Big chrome dual exhausts */}
      <path d="M180,118 L228,124 L246,126" fill="none" stroke="white" strokeWidth="3" opacity="0.6"/>
      <path d="M182,122 L226,128 L244,130" fill="none" stroke="white" strokeWidth="2.5" opacity="0.45"/>
      {/* Front wheel - large with white-wall feel */}
      <circle cx="118" cy="128" r="18" fill="none" stroke="white" strokeWidth="2.8"/>
      <circle cx="118" cy="128" r="13" fill="white" fillOpacity="0.06"/>
      <circle cx="118" cy="128" r="4" fill="white" fillOpacity="0.5"/>
      {[0,45,90,135].map(a => (
        <line key={a} x1={118 + 13*Math.cos(a*Math.PI/180)} y1={128 + 13*Math.sin(a*Math.PI/180)} x2={118 - 13*Math.cos(a*Math.PI/180)} y2={128 - 13*Math.sin(a*Math.PI/180)} stroke="white" strokeWidth="0.8" opacity="0.5"/>
      ))}
      {/* Rear wheel */}
      <circle cx="220" cy="128" r="18" fill="none" stroke="white" strokeWidth="2.8"/>
      <circle cx="220" cy="128" r="13" fill="white" fillOpacity="0.06"/>
      <circle cx="220" cy="128" r="4" fill="white" fillOpacity="0.5"/>
      {[0,45,90,135].map(a => (
        <line key={`r${a}`} x1={220 + 13*Math.cos(a*Math.PI/180)} y1={128 + 13*Math.sin(a*Math.PI/180)} x2={220 - 13*Math.cos(a*Math.PI/180)} y2={128 - 13*Math.sin(a*Math.PI/180)} stroke="white" strokeWidth="0.8" opacity="0.5"/>
      ))}
    </g>
  );
}

// Triumph — sport/cafe-racer (forward-leaning, tucked rider, rear-set pegs, sportier proportions)
function TriumphSilhouette() {
  return (
    <g opacity="0.95">
      {/* Aggressive faired tank */}
      <path d="M138,96 Q146,82 168,82 Q186,88 188,102 L150,106 Z" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="1.8"/>
      {/* Engine — parallel-twin, more compact */}
      <rect x="146" y="106" width="40" height="14" rx="2" fill="white" fillOpacity="0.28" stroke="white" strokeWidth="1.4"/>
      <line x1="158" y1="108" x2="158" y2="118" stroke="white" strokeWidth="1.2"/>
      <line x1="172" y1="108" x2="172" y2="118" stroke="white" strokeWidth="1.2"/>
      {/* Sport seat — humped tail */}
      <path d="M186,94 L210,90 Q218,90 216,98 L188,100 Z" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="1.5"/>
      {/* Tail hump */}
      <path d="M204,90 Q214,84 218,92" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7"/>
      {/* Clip-on (low) bars */}
      <line x1="135" y1="92" x2="125" y2="92" stroke="white" strokeWidth="2.2"/>
      <line x1="125" y1="92" x2="120" y2="96" stroke="white" strokeWidth="2"/>
      {/* Front fork — straighter, sportier rake */}
      <line x1="135" y1="96" x2="125" y2="122" stroke="white" strokeWidth="2"/>
      {/* Round-headlight Triumph (Bonneville-ish) */}
      <circle cx="130" cy="96" r="6" fill="white" fillOpacity="0.55"/>
      <circle cx="130" cy="96" r="3" fill="white" fillOpacity="0.85"/>
      {/* Twin upswept exhausts */}
      <path d="M186,118 L210,114 L226,108" fill="none" stroke="white" strokeWidth="2.5" opacity="0.6"/>
      <path d="M186,122 L210,118 L226,112" fill="none" stroke="white" strokeWidth="2" opacity="0.45"/>
      {/* Sport mag wheels */}
      <circle cx="128" cy="126" r="17" fill="none" stroke="white" strokeWidth="2.6"/>
      <circle cx="128" cy="126" r="12" fill="white" fillOpacity="0.06"/>
      {[0,72,144,216,288].map(a => (
        <line key={a} x1="128" y1="126" x2={128 + 12*Math.cos((a-90)*Math.PI/180)} y2={126 + 12*Math.sin((a-90)*Math.PI/180)} stroke="white" strokeWidth="1.4" opacity="0.55"/>
      ))}
      <circle cx="128" cy="126" r="3.5" fill="white" fillOpacity="0.5"/>
      <circle cx="216" cy="126" r="17" fill="none" stroke="white" strokeWidth="2.6"/>
      <circle cx="216" cy="126" r="12" fill="white" fillOpacity="0.06"/>
      {[0,72,144,216,288].map(a => (
        <line key={`r${a}`} x1="216" y1="126" x2={216 + 12*Math.cos((a-90)*Math.PI/180)} y2={126 + 12*Math.sin((a-90)*Math.PI/180)} stroke="white" strokeWidth="1.4" opacity="0.55"/>
      ))}
      <circle cx="216" cy="126" r="3.5" fill="white" fillOpacity="0.5"/>
    </g>
  );
}

// MORGAN — vintage open-top roadster (separate fenders, low slung, classic windshield)
function MORGANSilhouette() {
  return (
    <g opacity="0.95">
      {/* Open-top, low-slung body */}
      <path d="M58,128 L70,128 L72,114 L80,104 L100,96 L130,92 L160,90 L196,94 L222,102 L240,114 L246,128 L260,128"
            fill="white" fillOpacity="0.10" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      {/* Long classic bonnet line */}
      <line x1="80" y1="106" x2="148" y2="98" stroke="white" strokeWidth="1.2" opacity="0.5"/>
      {/* Bonnet louvres */}
      {[0,1,2,3,4,5].map(i => (
        <line key={i} x1={92 + i*8} y1="104" x2={96 + i*8} y2="98" stroke="white" strokeWidth="1" opacity="0.55"/>
      ))}
      {/* Vertical chrome grille */}
      <rect x="60" y="106" width="10" height="18" rx="1" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1"/>
      <line x1="63" y1="108" x2="63" y2="122" stroke="white" strokeWidth="0.6" opacity="0.5"/>
      <line x1="65" y1="108" x2="65" y2="122" stroke="white" strokeWidth="0.6" opacity="0.5"/>
      <line x1="67" y1="108" x2="67" y2="122" stroke="white" strokeWidth="0.6" opacity="0.5"/>
      {/* Round headlights — separate, on fender */}
      <circle cx="84" cy="102" r="6" fill="white" fillOpacity="0.55"/>
      <circle cx="84" cy="102" r="3" fill="white" fillOpacity="0.9"/>
      {/* Tiny windshield */}
      <path d="M150,98 L146,82 L182,82 L184,98" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
      {/* Open cockpit dip */}
      <path d="M148,98 Q165,108 198,98" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      {/* Separate front fender (sweeping arch) */}
      <path d="M70,116 Q88,84 116,108" fill="none" stroke="white" strokeWidth="2.2" opacity="0.7"/>
      {/* Rear fender */}
      <path d="M196,108 Q220,86 246,116" fill="none" stroke="white" strokeWidth="2.2" opacity="0.7"/>
      {/* Spare tire on side (classic touch) */}
      <circle cx="232" cy="108" r="6" fill="none" stroke="white" strokeWidth="1.2" opacity="0.5"/>
      {/* Wire wheels */}
      <circle cx="100" cy="128" r="15" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="100" cy="128" r="11" fill="white" fillOpacity="0.05"/>
      <circle cx="100" cy="128" r="3" fill="white" fillOpacity="0.6"/>
      {[0,30,60,90,120,150].map(a => (
        <line key={a} x1={100 + 11*Math.cos(a*Math.PI/180)} y1={128 + 11*Math.sin(a*Math.PI/180)} x2={100 - 11*Math.cos(a*Math.PI/180)} y2={128 - 11*Math.sin(a*Math.PI/180)} stroke="white" strokeWidth="0.8" opacity="0.5"/>
      ))}
      <circle cx="218" cy="128" r="15" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="218" cy="128" r="11" fill="white" fillOpacity="0.05"/>
      <circle cx="218" cy="128" r="3" fill="white" fillOpacity="0.6"/>
      {[0,30,60,90,120,150].map(a => (
        <line key={`r${a}`} x1={218 + 11*Math.cos(a*Math.PI/180)} y1={128 + 11*Math.sin(a*Math.PI/180)} x2={218 - 11*Math.cos(a*Math.PI/180)} y2={128 - 11*Math.sin(a*Math.PI/180)} stroke="white" strokeWidth="0.8" opacity="0.5"/>
      ))}
    </g>
  );
}

// Maserati — sport coupe (low, aggressive, sleek GT/MC20 inspired)
function MaseratiSilhouette() {
  return (
    <g opacity="0.95">
      {/* Low-slung coupe body */}
      <path d="M36,128 L48,128 L50,116 L56,108 L70,100 L96,92 L130,86 L170,84 L208,90 L236,100 L254,110 L264,120 L272,128 L286,128"
            fill="white" fillOpacity="0.12" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      {/* Sloped fastback roofline */}
      <path d="M108,92 Q102,100 100,110 L155,108 L155,86 Q132,86 108,92 Z" fill="white" fillOpacity="0.22"/>
      <path d="M158,86 L158,108 L218,108 Q230,98 222,90 Q188,84 158,86 Z" fill="white" fillOpacity="0.22"/>
      {/* Trident grille — concave oval */}
      <ellipse cx="58" cy="116" rx="12" ry="6" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.2"/>
      {/* Trident emblem hint */}
      <line x1="58" y1="110" x2="58" y2="122" stroke="white" strokeWidth="1.2" opacity="0.7"/>
      <line x1="54" y1="113" x2="54" y2="120" stroke="white" strokeWidth="1" opacity="0.6"/>
      <line x1="62" y1="113" x2="62" y2="120" stroke="white" strokeWidth="1" opacity="0.6"/>
      {/* Side air intakes (port) */}
      <path d="M170,108 L182,104 L196,108 L184,112 Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1"/>
      {/* Side three-port vents */}
      <line x1="160" y1="112" x2="170" y2="112" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      <line x1="162" y1="116" x2="172" y2="116" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      <line x1="164" y1="120" x2="174" y2="120" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      {/* Sharp headlight */}
      <path d="M44,108 L62,104 L66,110 L60,114 Z" fill="white" fillOpacity="0.5"/>
      {/* Tail light strip */}
      <rect x="262" y="108" width="14" height="4" rx="1" fill="#ff3333" fillOpacity="0.55"/>
      {/* Wheels - performance multi-spoke */}
      <circle cx="92" cy="130" r="16" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="92" cy="130" r="11" fill="white" fillOpacity="0.06"/>
      <circle cx="92" cy="130" r="3.5" fill="white" fillOpacity="0.5"/>
      {[0,36,72,108,144,180,216,252,288,324].map(a => (
        <line key={a} x1="92" y1="130" x2={92 + 11*Math.cos((a-90)*Math.PI/180)} y2={130 + 11*Math.sin((a-90)*Math.PI/180)} stroke="white" strokeWidth="1" opacity="0.5"/>
      ))}
      <circle cx="246" cy="130" r="16" fill="none" stroke="white" strokeWidth="2.5"/>
      <circle cx="246" cy="130" r="11" fill="white" fillOpacity="0.06"/>
      <circle cx="246" cy="130" r="3.5" fill="white" fillOpacity="0.5"/>
      {[0,36,72,108,144,180,216,252,288,324].map(a => (
        <line key={`r${a}`} x1="246" y1="130" x2={246 + 11*Math.cos((a-90)*Math.PI/180)} y2={130 + 11*Math.sin((a-90)*Math.PI/180)} stroke="white" strokeWidth="1" opacity="0.5"/>
      ))}
    </g>
  );
}

function getVehicleSilhouette(brand: string) {
  switch (brand) {
    case 'BMW': return <BMWSilhouette />;
    case 'Rolls-Royce': return <RollsRoyceSilhouette />;
    case 'MINI': return <MINISilhouette />;
    case 'Honda': return <HondaSilhouette />;
    case 'Triumph': return <TriumphSilhouette />;
    case 'Harley-Davidson': return <HarleySilhouette />;
    case 'MORGAN':
    case 'Morgan': return <MORGANSilhouette />;
    case 'Maserati': return <MaseratiSilhouette />;
    case 'Sixt': return <BMWSilhouette />;
    default: return <BMWSilhouette />;
  }
}

// Campaign-themed background elements
function SummerDriveElements() {
  return (
    <g>
      {/* Sun */}
      <circle cx="280" cy="35" r="22" fill="white" fillOpacity="0.08"/>
      <circle cx="280" cy="35" r="16" fill="white" fillOpacity="0.06"/>
      {/* Sun rays */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
        <line key={a} x1={280 + 24*Math.cos(a*Math.PI/180)} y1={35 + 24*Math.sin(a*Math.PI/180)} x2={280 + 32*Math.cos(a*Math.PI/180)} y2={35 + 32*Math.sin(a*Math.PI/180)} stroke="white" strokeWidth="1" opacity="0.06"/>
      ))}
      {/* Mountains */}
      <path d="M0,100 L40,55 L80,85 L120,45 L170,80 L200,60 L240,75 L280,50 L320,100" fill="white" fillOpacity="0.04"/>
      {/* Road */}
      <path d="M0,145 Q80,135 160,140 Q240,145 320,138" fill="none" stroke="white" strokeWidth="1" opacity="0.1"/>
      <path d="M40,142 L50,142 M80,140 L90,140 M120,141 L130,141 M170,142 L180,142 M220,141 L230,141 M260,140 L270,140" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 8" opacity="0.08"/>
    </g>
  );
}

function LuckyDrawElements() {
  return (
    <g>
      {/* Stars */}
      {[[35,25],[285,30],[260,60],[50,55],[300,85]].map(([x,y], i) => (
        <g key={i} opacity={0.1 + i * 0.03}>
          <path d={`M${x},${y-6} L${x+2},${y-2} L${x+6},${y-1} L${x+3},${y+2} L${x+4},${y+6} L${x},${y+3} L${x-4},${y+6} L${x-3},${y+2} L${x-6},${y-1} L${x-2},${y-2} Z`} fill="#FFD700" fillOpacity="0.5"/>
        </g>
      ))}
      {/* Dice */}
      <rect x="25" y="70" width="22" height="22" rx="4" fill="white" fillOpacity="0.06" transform="rotate(-15 36 81)"/>
      <circle cx="31" cy="76" r="2" fill="white" fillOpacity="0.12"/>
      <circle cx="42" cy="86" r="2" fill="white" fillOpacity="0.12"/>
      <circle cx="36" cy="81" r="2" fill="white" fillOpacity="0.12"/>
      {/* Sparkle particles */}
      {[[270,45],[290,75],[30,40],[55,90],[250,25]].map(([x,y], i) => (
        <circle key={`p${i}`} cx={x} cy={y} r={1.5} fill="white" fillOpacity="0.15">
          <animate attributeName="opacity" values="0.05;0.2;0.05" dur={`${2 + i * 0.5}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </g>
  );
}

function LifestyleElements() {
  return (
    <g>
      {/* Shopping bag */}
      <rect x="260" y="35" width="18" height="22" rx="2" fill="none" stroke="white" strokeWidth="1.2" opacity="0.12"/>
      <path d="M264,35 L264,30 Q269,24 274,30 L274,35" fill="none" stroke="white" strokeWidth="1" opacity="0.12"/>
      {/* Sunglasses */}
      <path d="M30,45 L38,45 Q42,45 42,49 Q42,53 38,53 L34,53 Q30,53 30,49 Z" fill="white" fillOpacity="0.06"/>
      <path d="M46,45 L54,45 Q58,45 58,49 Q58,53 54,53 L50,53 Q46,53 46,49 Z" fill="white" fillOpacity="0.06"/>
      <line x1="42" y1="47" x2="46" y2="47" stroke="white" strokeWidth="1" opacity="0.08"/>
      {/* Coffee cup */}
      <rect x="280" y="70" width="14" height="16" rx="2" fill="none" stroke="white" strokeWidth="1" opacity="0.1"/>
      <path d="M294,75 Q300,78 294,82" fill="none" stroke="white" strokeWidth="1" opacity="0.08"/>
      {/* Urban buildings */}
      <rect x="20" y="80" width="10" height="30" fill="white" fillOpacity="0.03"/>
      <rect x="32" y="70" width="8" height="40" fill="white" fillOpacity="0.03"/>
      <rect x="42" y="85" width="12" height="25" fill="white" fillOpacity="0.03"/>
    </g>
  );
}

function ServiceElements() {
  return (
    <g>
      {/* Wrench */}
      <g transform="translate(270,35) rotate(-30)" opacity="0.12">
        <rect x="-3" y="-20" width="6" height="30" rx="2" fill="white"/>
        <circle cx="0" cy="-20" r="8" fill="none" stroke="white" strokeWidth="3"/>
      </g>
      {/* Gear */}
      <g transform="translate(40, 50)" opacity="0.08">
        <circle cx="0" cy="0" r="10" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="0" cy="0" r="4" fill="white" fillOpacity="0.3"/>
        {[0,45,90,135,180,225,270,315].map(a => (
          <rect key={a} x="-2.5" y="-14" width="5" height="6" rx="1" fill="white" transform={`rotate(${a})`}/>
        ))}
      </g>
      {/* Checkmark */}
      <g transform="translate(50, 85)" opacity="0.1">
        <circle cx="0" cy="0" r="8" fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M-4,0 L-1,3 L4,-3" fill="none" stroke="white" strokeWidth="1.5"/>
      </g>
      {/* Oil drop */}
      <path d="M280,75 Q283,68 286,75 Q286,80 283,82 Q280,80 280,75 Z" fill="white" fillOpacity="0.08"/>
    </g>
  );
}

function TrackDayElements() {
  return (
    <g>
      {/* Speed lines */}
      {[50,65,80,95,110].map((y, i) => (
        <line key={i} x1={10 + i*5} y1={y} x2={50 + i*10} y2={y} stroke="white" strokeWidth="1" opacity={0.04 + i*0.01}/>
      ))}
      {/* Checkered flag */}
      <g transform="translate(270,25)" opacity="0.1">
        <rect x="0" y="0" width="6" height="6" fill="white"/>
        <rect x="6" y="6" width="6" height="6" fill="white"/>
        <rect x="0" y="12" width="6" height="6" fill="white"/>
        <rect x="6" y="0" width="6" height="6" fill="white" fillOpacity="0.3"/>
        <rect x="0" y="6" width="6" height="6" fill="white" fillOpacity="0.3"/>
        <rect x="6" y="12" width="6" height="6" fill="white" fillOpacity="0.3"/>
        <line x1="0" y1="18" x2="0" y2="32" stroke="white" strokeWidth="1.5"/>
      </g>
      {/* Track curve */}
      <path d="M0,140 Q60,125 120,130 Q200,138 260,125 Q300,118 320,122" fill="none" stroke="white" strokeWidth="2" opacity="0.06"/>
      <path d="M0,145 Q60,130 120,135 Q200,143 260,130 Q300,123 320,127" fill="none" stroke="white" strokeWidth="1" strokeDasharray="6 10" opacity="0.05"/>
      {/* Tachometer hint */}
      <g transform="translate(40,40)" opacity="0.08">
        <path d="M-12,0 A12,12 0 0,1 12,0" fill="none" stroke="white" strokeWidth="1.5"/>
        <line x1="0" y1="0" x2="6" y2="-8" stroke="white" strokeWidth="1.5"/>
      </g>
    </g>
  );
}

function AdventureElements() {
  return (
    <g>
      {/* Mountains */}
      <path d="M0,90 L50,40 L85,70 L130,25 L180,60 L220,35 L260,55 L300,30 L320,50 L320,100 L0,100 Z" fill="white" fillOpacity="0.03"/>
      {/* Trees */}
      {[30,55,250,275,295].map((x, i) => (
        <g key={i} transform={`translate(${x},${75 + i*3})`} opacity="0.06">
          <polygon points="0,-12 6,0 -6,0" fill="white"/>
          <rect x="-1" y="0" width="2" height="5" fill="white"/>
        </g>
      ))}
      {/* Trail path */}
      <path d="M0,140 Q40,132 80,135 Q130,140 180,130 Q230,120 280,128 Q310,132 320,130" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.08"/>
      {/* Compass */}
      <g transform="translate(275,40)" opacity="0.1">
        <circle cx="0" cy="0" r="10" fill="none" stroke="white" strokeWidth="1"/>
        <path d="M0,-8 L2,0 L0,8 L-2,0 Z" fill="white" fillOpacity="0.3"/>
      </g>
    </g>
  );
}

function BirthdayElements() {
  return (
    <g>
      {/* Confetti */}
      {[[30,30],[60,20],[280,25],[255,45],[290,60],[40,65],[300,40],[50,45]].map(([x,y], i) => (
        <rect key={i} x={x} y={y} width={4} height={4} rx={1} fill={['#FFD700','#FF69B4','#87CEEB','#98FB98','#DDA0DD','#FFA07A','#F0E68C','#ADD8E6'][i]} fillOpacity={0.15} transform={`rotate(${i*35} ${x+2} ${y+2})`}>
          <animate attributeName="opacity" values="0.08;0.2;0.08" dur={`${1.5 + i*0.3}s`} repeatCount="indefinite"/>
        </rect>
      ))}
      {/* Gift box */}
      <g transform="translate(270,60)" opacity="0.1">
        <rect x="-10" y="-5" width="20" height="14" rx="2" fill="white"/>
        <rect x="-12" y="-8" width="24" height="5" rx="2" fill="white"/>
        <line x1="0" y1="-8" x2="0" y2="9" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
        <path d="M0,-8 Q-6,-16 -10,-8" fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M0,-8 Q6,-16 10,-8" fill="none" stroke="white" strokeWidth="1.5"/>
      </g>
      {/* Cake */}
      <g transform="translate(40,70)" opacity="0.08">
        <rect x="-12" y="0" width="24" height="14" rx="3" fill="white"/>
        <rect x="-14" y="-3" width="28" height="5" rx="2" fill="white"/>
        <line x1="0" y1="-3" x2="0" y2="-10" stroke="white" strokeWidth="1.5"/>
        <circle cx="0" cy="-12" r="2" fill="#FFD700" fillOpacity="0.5"/>
      </g>
    </g>
  );
}

function ReferralElements() {
  return (
    <g>
      {/* Connection lines between two areas */}
      <path d="M100,55 Q160,35 220,55" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.1"/>
      {/* Heart / gift */}
      <g transform="translate(160,35)" opacity="0.12">
        <path d="M0,4 Q0,0 -4,-2 Q-8,-4 -8,0 Q-8,4 0,10 Q8,4 8,0 Q8,-4 4,-2 Q0,0 0,4 Z" fill="white" fillOpacity="0.4"/>
      </g>
      {/* Gift boxes */}
      <g transform="translate(40,50)" opacity="0.08">
        <rect x="-6" y="-3" width="12" height="10" rx="1" fill="white"/>
        <line x1="0" y1="-3" x2="0" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      </g>
      <g transform="translate(275,50)" opacity="0.08">
        <rect x="-6" y="-3" width="12" height="10" rx="1" fill="white"/>
        <line x1="0" y1="-3" x2="0" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      </g>
      {/* People silhouettes */}
      <g transform="translate(60,75)" opacity="0.06">
        <circle cx="0" cy="-6" r="4" fill="white"/>
        <path d="M-6,0 Q0,8 6,0" fill="white"/>
      </g>
      <g transform="translate(260,75)" opacity="0.06">
        <circle cx="0" cy="-6" r="4" fill="white"/>
        <path d="M-6,0 Q0,8 6,0" fill="white"/>
      </g>
    </g>
  );
}

function TravelElements() {
  return (
    <g>
      {/* Road */}
      <path d="M0,138 Q80,128 160,132 Q240,138 320,128" fill="none" stroke="white" strokeWidth="1.5" opacity="0.08"/>
      {/* Map pin */}
      <g transform="translate(275,35)" opacity="0.1">
        <path d="M0,-12 Q8,-12 8,-6 Q8,0 0,8 Q-8,0 -8,-6 Q-8,-12 0,-12 Z" fill="none" stroke="white" strokeWidth="1.5"/>
        <circle cx="0" cy="-5" r="3" fill="white" fillOpacity="0.3"/>
      </g>
      {/* Suitcase */}
      <g transform="translate(40,55)" opacity="0.08">
        <rect x="-8" y="-4" width="16" height="12" rx="2" fill="white"/>
        <rect x="-4" y="-7" width="8" height="4" rx="1" fill="none" stroke="white" strokeWidth="1"/>
      </g>
      {/* GPS line */}
      <path d="M50,80 L80,70 L120,78 L160,65 L200,72 L240,60 L275,40" fill="none" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.06"/>
    </g>
  );
}

function UltraPremiumElements() {
  return (
    <g>
      {/* Waves / sea */}
      <path d="M0,100 Q40,92 80,100 Q120,108 160,100 Q200,92 240,100 Q280,108 320,100" fill="none" stroke="white" strokeWidth="1" opacity="0.06"/>
      <path d="M0,108 Q40,100 80,108 Q120,116 160,108 Q200,100 240,108 Q280,116 320,108" fill="none" stroke="white" strokeWidth="0.8" opacity="0.04"/>
      {/* Yacht hint */}
      <g transform="translate(270,45)" opacity="0.08">
        <path d="M0,0 L12,-15 L12,0 Z" fill="white"/>
        <path d="M-10,0 L15,0" stroke="white" strokeWidth="1.5"/>
        <path d="M-8,2 Q3,6 13,2" fill="white" fillOpacity="0.5"/>
      </g>
      {/* Diamond sparkles */}
      {[[40,30],[60,50],[280,70],[300,35]].map(([x,y], i) => (
        <path key={i} d={`M${x},${y-4} L${x+3},${y} L${x},${y+4} L${x-3},${y} Z`} fill="white" fillOpacity="0.08">
          <animate attributeName="opacity" values="0.04;0.12;0.04" dur={`${2+i*0.7}s`} repeatCount="indefinite"/>
        </path>
      ))}
    </g>
  );
}

function GenericElements() {
  return (
    <g>
      {/* Subtle particles */}
      {[[30,30],[280,40],[50,80],[270,75],[160,25]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={1.5} fill="white" fillOpacity="0.08">
          <animate attributeName="opacity" values="0.04;0.12;0.04" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </g>
  );
}

function getCampaignElements(title: string, category: string) {
  const lower = (title + ' ' + category).toLowerCase();
  if (lower.includes('refer') || lower.includes('friend') || lower.includes('ชวนเพื่อน') || lower.includes('family & friends')) return <ReferralElements />;
  if (lower.includes('lucky') || lower.includes('mystery') || lower.includes('wheel of fortune') || lower.includes('spin') || lower.includes('lucky_draw')) return <LuckyDrawElements />;
  if (lower.includes('summer') || lower.includes('drive experience')) return <SummerDriveElements />;
  if (lower.includes('lifestyle') || lower.includes('collection') || lower.includes('merchandise')) return <LifestyleElements />;
  if (lower.includes('service') || lower.includes('point') || lower.includes('triple') || lower.includes('multiplier')) return <ServiceElements />;
  if (lower.includes('track') || lower.includes('m performance') || lower.includes('racing')) return <TrackDayElements />;
  if (lower.includes('adventure') || lower.includes('riding') || lower.includes('tiger') || lower.includes('camp')) return <AdventureElements />;
  if (lower.includes('birthday') || lower.includes('surprise')) return <BirthdayElements />;
  if (lower.includes('travel') || lower.includes('getaway') || lower.includes('weekend') || lower.includes('sixt')) return <TravelElements />;
  if (lower.includes('ultra') || lower.includes('sea') || lower.includes('yacht') || lower.includes('azimut')) return <UltraPremiumElements />;
  return <GenericElements />;
}

// Floating particles animation
function FloatingParticles({ color }: { color: string }) {
  return (
    <g>
      {[
        { cx: 20, cy: 20, r: 1.2, dur: '6s', delay: '0s' },
        { cx: 300, cy: 30, r: 1, dur: '7s', delay: '1s' },
        { cx: 160, cy: 15, r: 0.8, dur: '5s', delay: '2s' },
        { cx: 80, cy: 50, r: 1, dur: '8s', delay: '0.5s' },
        { cx: 260, cy: 60, r: 1.3, dur: '6.5s', delay: '1.5s' },
      ].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={color} fillOpacity="0.2">
          <animate attributeName="cy" values={`${p.cy};${p.cy - 15};${p.cy}`} dur={p.dur} begin={p.delay} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.05;0.2;0.05" dur={p.dur} begin={p.delay} repeatCount="indefinite"/>
        </circle>
      ))}
    </g>
  );
}

export function CampaignArtwork({ brand, campaignType, title, className = '' }: CampaignArtworkProps) {
  const [color1, color2] = brandGradients[brand] || brandGradients['All Brands'];
  const gradientId = `cg-${brand.replace(/\s+/g, '')}-${title.replace(/\s+/g, '').slice(0, 8)}`;

  return (
    <svg
      viewBox="0 0 320 180"
      className={`w-full ${className}`}
      style={{ aspectRatio: '16/9' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
        <linearGradient id={`${gradientId}-shine`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.05" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="320" height="180" fill={`url(#${gradientId})`} />
      <rect width="320" height="180" fill={`url(#${gradientId}-shine)`} />

      {/* Subtle grid pattern */}
      <g opacity="0.02">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="180" stroke="white" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="320" y2={i * 20} stroke="white" strokeWidth="0.5" />
        ))}
      </g>

      {/* Campaign-specific elements */}
      {getCampaignElements(title, campaignType)}

      {/* Vehicle silhouette */}
      {getVehicleSilhouette(brand)}

      {/* Floating particles */}
      <FloatingParticles color="white" />

      {/* Brand text */}
      <text x="16" y="24" fill="white" fillOpacity="0.7" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="2">
        {brand.toUpperCase()}
      </text>

      {/* Bottom vignette */}
      <rect y="130" width="320" height="50" fill="url(#none)" opacity="0">
        <animate attributeName="opacity" values="0;0" dur="1s" />
      </rect>
      <rect y="140" width="320" height="40" fill="black" fillOpacity="0.3" />

      {/* Title text */}
      <text x="16" y="165" fill="white" fillOpacity="0.95" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">
        {title.length > 38 ? title.slice(0, 38) + '...' : title}
      </text>
    </svg>
  );
}

export default CampaignArtwork;
