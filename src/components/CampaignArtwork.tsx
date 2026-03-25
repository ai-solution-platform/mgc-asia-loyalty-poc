type BrandKey = 'BMW' | 'Rolls-Royce' | 'MINI' | 'Honda' | 'Triumph' | 'MORGAN' | 'Harley-Davidson' | 'Maserati' | 'Sixt' | 'All Brands' | string;

interface CampaignArtworkProps {
  brand: BrandKey;
  campaignType: string;
  title: string;
  className?: string;
}

const brandGradients: Record<string, [string, string]> = {
  'BMW': ['#0066B1', '#1B3A6B'],
  'Rolls-Royce': ['#2B0040', '#460073'],
  'MINI': ['#2D8C3C', '#1A5C27'],
  'Honda': ['#CC0000', '#8B0000'],
  'Triumph': ['#000000', '#333333'],
  'MORGAN': ['#1B4D3E', '#0D2B1F'],
  'Harley-Davidson': ['#FF6600', '#993D00'],
  'Maserati': ['#003366', '#001a33'],
  'Sixt': ['#FF5F00', '#CC4C00'],
  'All Brands': ['#D97706', '#92400E'],
};

// BMW Sport Sedan (5 Series style)
function BMWSilhouette() {
  return (
    <g opacity="0.9">
      <path d="M60,120 L70,120 L75,105 L85,95 L110,88 L145,85 L180,85 L210,88 L230,95 L240,100 L250,105 L255,120 L260,120" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M60,120 L70,120 L75,105 L85,95 L110,88 L145,85 L180,85 L210,88 L230,95 L240,100 L250,105 L255,120 L260,120" fill="white" fillOpacity="0.08"/>
      {/* Windows */}
      <path d="M120,88 L115,95 L110,100 L145,98 L145,86 Z" fill="white" fillOpacity="0.15"/>
      <path d="M148,86 L148,98 L195,98 L205,90 L195,86 Z" fill="white" fillOpacity="0.15"/>
      {/* Wheels */}
      <circle cx="95" cy="122" r="14" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="95" cy="122" r="8" fill="white" fillOpacity="0.1"/>
      <circle cx="230" cy="122" r="14" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="230" cy="122" r="8" fill="white" fillOpacity="0.1"/>
      {/* Headlight */}
      <ellipse cx="70" cy="112" rx="6" ry="4" fill="white" fillOpacity="0.3"/>
      {/* Tail light */}
      <rect x="254" y="108" width="4" height="8" rx="1" fill="#ff3333" fillOpacity="0.5"/>
    </g>
  );
}

// Rolls-Royce Luxury Sedan
function RollsRoyceSilhouette() {
  return (
    <g opacity="0.9">
      <path d="M50,120 L60,120 L65,105 L70,92 L90,82 L130,78 L190,78 L230,82 L250,90 L258,100 L262,110 L265,120 L270,120" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M50,120 L60,120 L65,105 L70,92 L90,82 L130,78 L190,78 L230,82 L250,90 L258,100 L262,110 L265,120 L270,120" fill="white" fillOpacity="0.06"/>
      {/* Spirit of Ecstasy hint */}
      <line x1="68" y1="92" x2="68" y2="78" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      <path d="M64,78 L68,72 L72,78" fill="white" fillOpacity="0.4"/>
      {/* Windows */}
      <path d="M105,82 L100,90 L95,100 L155,98 L155,80 Z" fill="white" fillOpacity="0.12"/>
      <path d="M158,80 L158,98 L215,98 L225,88 L210,80 Z" fill="white" fillOpacity="0.12"/>
      {/* Grille lines */}
      <rect x="56" y="105" width="10" height="12" rx="2" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
      {/* Wheels */}
      <circle cx="90" cy="122" r="15" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="90" cy="122" r="9" fill="white" fillOpacity="0.08"/>
      <circle cx="240" cy="122" r="15" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="240" cy="122" r="9" fill="white" fillOpacity="0.08"/>
    </g>
  );
}

// MINI Compact
function MINISilhouette() {
  return (
    <g opacity="0.9">
      <path d="M80,120 L88,120 L92,108 L100,97 L115,90 L140,88 L170,88 L195,90 L210,97 L218,108 L222,120 L230,120" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M80,120 L88,120 L92,108 L100,97 L115,90 L140,88 L170,88 L195,90 L210,97 L218,108 L222,120 L230,120" fill="white" fillOpacity="0.08"/>
      {/* Rounded roof - classic MINI */}
      <path d="M120,90 L118,97 L116,104 L155,102 L155,89 Z" fill="white" fillOpacity="0.18"/>
      <path d="M158,89 L158,102 L190,102 L198,95 L188,89 Z" fill="white" fillOpacity="0.18"/>
      {/* Bonnet stripe */}
      <line x1="82" y1="112" x2="98" y2="99" stroke="white" strokeWidth="1" opacity="0.3"/>
      {/* Wheels */}
      <circle cx="108" cy="122" r="13" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="108" cy="122" r="7" fill="white" fillOpacity="0.1"/>
      <circle cx="205" cy="122" r="13" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="205" cy="122" r="7" fill="white" fillOpacity="0.1"/>
      {/* Headlight */}
      <circle cx="86" cy="110" r="5" fill="white" fillOpacity="0.25"/>
    </g>
  );
}

// Honda Modern Sedan
function HondaSilhouette() {
  return (
    <g opacity="0.9">
      <path d="M65,120 L75,120 L78,106 L88,96 L108,89 L145,86 L185,86 L215,89 L235,96 L245,106 L248,120 L258,120" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M65,120 L75,120 L78,106 L88,96 L108,89 L145,86 L185,86 L215,89 L235,96 L245,106 L248,120 L258,120" fill="white" fillOpacity="0.07"/>
      {/* Windows */}
      <path d="M120,89 L115,96 L112,102 L155,100 L155,87 Z" fill="white" fillOpacity="0.15"/>
      <path d="M158,87 L158,100 L200,100 L210,92 L198,87 Z" fill="white" fillOpacity="0.15"/>
      {/* Wheels */}
      <circle cx="98" cy="122" r="14" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="98" cy="122" r="8" fill="white" fillOpacity="0.1"/>
      <circle cx="232" cy="122" r="14" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="232" cy="122" r="8" fill="white" fillOpacity="0.1"/>
    </g>
  );
}

// Triumph / Harley-Davidson Motorcycle
function MotorcycleSilhouette() {
  return (
    <g opacity="0.9">
      {/* Body */}
      <path d="M120,110 L135,95 L155,88 L175,88 L190,92 L195,100 L200,110" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M120,110 L135,95 L155,88 L175,88 L190,92 L195,100 L200,110" fill="white" fillOpacity="0.08"/>
      {/* Tank */}
      <ellipse cx="160" cy="92" rx="18" ry="8" fill="white" fillOpacity="0.12"/>
      {/* Seat */}
      <path d="M170,90 L185,88 L195,92 L188,95 Z" fill="white" fillOpacity="0.1"/>
      {/* Handlebars */}
      <line x1="135" y1="95" x2="128" y2="82" stroke="white" strokeWidth="1.5"/>
      <line x1="128" y1="82" x2="122" y2="80" stroke="white" strokeWidth="1.5"/>
      <line x1="128" y1="82" x2="134" y2="80" stroke="white" strokeWidth="1.5"/>
      {/* Front fork */}
      <line x1="132" y1="98" x2="125" y2="118" stroke="white" strokeWidth="1.5"/>
      {/* Exhaust */}
      <path d="M195,105 L215,108 L220,110" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      {/* Front wheel */}
      <circle cx="122" cy="120" r="16" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="122" cy="120" r="4" fill="white" fillOpacity="0.15"/>
      {/* Rear wheel */}
      <circle cx="200" cy="120" r="16" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="200" cy="120" r="4" fill="white" fillOpacity="0.15"/>
      {/* Spokes hint */}
      <line x1="122" y1="104" x2="122" y2="136" stroke="white" strokeWidth="0.5" opacity="0.3"/>
      <line x1="106" y1="120" x2="138" y2="120" stroke="white" strokeWidth="0.5" opacity="0.3"/>
      <line x1="200" y1="104" x2="200" y2="136" stroke="white" strokeWidth="0.5" opacity="0.3"/>
      <line x1="184" y1="120" x2="216" y2="120" stroke="white" strokeWidth="0.5" opacity="0.3"/>
      {/* Headlight */}
      <circle cx="128" cy="90" r="4" fill="white" fillOpacity="0.3"/>
    </g>
  );
}

// MORGAN Classic Vintage Car
function MORGANSilhouette() {
  return (
    <g opacity="0.9">
      <path d="M70,120 L78,120 L82,108 L88,100 L100,94 L115,90 L140,88 L165,88 L190,90 L210,95 L225,102 L232,110 L238,120 L245,120" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M70,120 L78,120 L82,108 L88,100 L100,94 L115,90 L140,88 L165,88 L190,90 L210,95 L225,102 L232,110 L238,120 L245,120" fill="white" fillOpacity="0.07"/>
      {/* Rounded fenders */}
      <path d="M78,115 Q75,105 85,100" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      <path d="M235,115 Q238,105 228,100" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      {/* Open top / windshield */}
      <path d="M130,90 L128,95 L128,100 L155,99 L155,89 Z" fill="white" fillOpacity="0.15"/>
      {/* Louvres on bonnet */}
      <line x1="88" y1="102" x2="92" y2="96" stroke="white" strokeWidth="0.7" opacity="0.4"/>
      <line x1="93" y1="101" x2="97" y2="95" stroke="white" strokeWidth="0.7" opacity="0.4"/>
      <line x1="98" y1="100" x2="102" y2="94" stroke="white" strokeWidth="0.7" opacity="0.4"/>
      {/* Wheels */}
      <circle cx="100" cy="122" r="14" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="100" cy="122" r="7" fill="white" fillOpacity="0.1"/>
      <circle cx="220" cy="122" r="14" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="220" cy="122" r="7" fill="white" fillOpacity="0.1"/>
      {/* Wire wheel spokes */}
      {[0,45,90,135].map(a => (
        <line key={a} x1={100 + 14*Math.cos(a*Math.PI/180)} y1={122 + 14*Math.sin(a*Math.PI/180)} x2={100 - 14*Math.cos(a*Math.PI/180)} y2={122 - 14*Math.sin(a*Math.PI/180)} stroke="white" strokeWidth="0.5" opacity="0.3"/>
      ))}
    </g>
  );
}

// Maserati Luxury Sport
function MaseratiSilhouette() {
  return (
    <g opacity="0.9">
      <path d="M55,120 L65,120 L70,105 L80,94 L105,86 L145,83 L190,83 L225,86 L245,94 L252,105 L258,120 L265,120" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M55,120 L65,120 L70,105 L80,94 L105,86 L145,83 L190,83 L225,86 L245,94 L252,105 L258,120 L265,120" fill="white" fillOpacity="0.07"/>
      {/* Sporty windows */}
      <path d="M118,86 L112,94 L110,102 L155,100 L155,84 Z" fill="white" fillOpacity="0.14"/>
      <path d="M158,84 L158,100 L210,100 L222,90 L205,84 Z" fill="white" fillOpacity="0.14"/>
      {/* Trident hint */}
      <line x1="75" y1="100" x2="75" y2="94" stroke="white" strokeWidth="1" opacity="0.4"/>
      {/* Wheels */}
      <circle cx="95" cy="122" r="15" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="95" cy="122" r="8" fill="white" fillOpacity="0.1"/>
      <circle cx="240" cy="122" r="15" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="240" cy="122" r="8" fill="white" fillOpacity="0.1"/>
    </g>
  );
}

function getVehicleSilhouette(brand: string) {
  switch (brand) {
    case 'BMW': return <BMWSilhouette />;
    case 'Rolls-Royce': return <RollsRoyceSilhouette />;
    case 'MINI': return <MINISilhouette />;
    case 'Honda': return <HondaSilhouette />;
    case 'Triumph':
    case 'Harley-Davidson': return <MotorcycleSilhouette />;
    case 'MORGAN': return <MORGANSilhouette />;
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
  if (lower.includes('summer') || lower.includes('drive experience')) return <SummerDriveElements />;
  if (lower.includes('lucky') || lower.includes('lucky_draw')) return <LuckyDrawElements />;
  if (lower.includes('lifestyle') || lower.includes('collection') || lower.includes('merchandise')) return <LifestyleElements />;
  if (lower.includes('service') || lower.includes('point') || lower.includes('triple') || lower.includes('multiplier')) return <ServiceElements />;
  if (lower.includes('track') || lower.includes('m performance') || lower.includes('racing')) return <TrackDayElements />;
  if (lower.includes('adventure') || lower.includes('riding') || lower.includes('tiger') || lower.includes('camp')) return <AdventureElements />;
  if (lower.includes('birthday') || lower.includes('surprise')) return <BirthdayElements />;
  if (lower.includes('refer') || lower.includes('friend') || lower.includes('bonus')) return <ReferralElements />;
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
