import React from 'react';

interface RewardArtworkProps {
  brand: string;
  rewardType: 'e_coupon' | 'physical' | 'lucky_draw' | string;
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

// Simplified vehicle silhouettes for smaller reward cards
function SmallCarSilhouette({ brand }: { brand: string }) {
  if (brand === 'Harley-Davidson' || brand === 'Triumph') {
    return (
      <g opacity="0.7" transform="translate(90, 55) scale(0.7)">
        <path d="M30,30 L42,20 L55,16 L68,16 L78,19 L82,25 L86,30" fill="none" stroke="white" strokeWidth="1.8"/>
        <ellipse cx="55" cy="19" rx="12" ry="5" fill="white" fillOpacity="0.1"/>
        <line x1="42" y1="20" x2="38" y2="12" stroke="white" strokeWidth="1.2"/>
        <circle cx="32" cy="32" r="11" fill="none" stroke="white" strokeWidth="1.8"/>
        <circle cx="32" cy="32" r="3" fill="white" fillOpacity="0.12"/>
        <circle cx="86" cy="32" r="11" fill="none" stroke="white" strokeWidth="1.8"/>
        <circle cx="86" cy="32" r="3" fill="white" fillOpacity="0.12"/>
      </g>
    );
  }

  const isLuxury = brand === 'Rolls-Royce' || brand === 'Maserati';
  const isMini = brand === 'MINI';

  return (
    <g opacity="0.7" transform={`translate(${isMini ? 95 : 80}, 58) scale(${isMini ? 0.65 : 0.7})`}>
      <path
        d={isLuxury
          ? "M20,40 L28,40 L32,28 L38,20 L55,14 L90,12 L130,12 L155,14 L170,22 L176,30 L180,40 L188,40"
          : isMini
          ? "M25,40 L32,40 L35,30 L42,22 L55,18 L78,16 L100,16 L118,18 L130,22 L136,30 L140,40 L148,40"
          : "M22,40 L30,40 L34,28 L42,20 L60,14 L92,12 L125,12 L148,14 L162,20 L170,28 L174,40 L182,40"
        }
        fill="none" stroke="white" strokeWidth="1.8"
      />
      <path
        d={isLuxury
          ? "M20,40 L28,40 L32,28 L38,20 L55,14 L90,12 L130,12 L155,14 L170,22 L176,30 L180,40 L188,40"
          : isMini
          ? "M25,40 L32,40 L35,30 L42,22 L55,18 L78,16 L100,16 L118,18 L130,22 L136,30 L140,40 L148,40"
          : "M22,40 L30,40 L34,28 L42,20 L60,14 L92,12 L125,12 L148,14 L162,20 L170,28 L174,40 L182,40"
        }
        fill="white" fillOpacity="0.05"
      />
      {/* Windows */}
      <path d={isMini
        ? "M62,18 L58,24 L56,30 L90,28 L90,17 Z"
        : "M68,14 L62,22 L60,28 L100,26 L100,13 Z"
      } fill="white" fillOpacity="0.12"/>
      {/* Wheels */}
      <circle cx={isMini ? 52 : 48} cy="42" r={isMini ? 10 : 11} fill="none" stroke="white" strokeWidth="1.8"/>
      <circle cx={isMini ? 52 : 48} cy="42" r={isMini ? 5 : 6} fill="white" fillOpacity="0.08"/>
      <circle cx={isMini ? 126 : isLuxury ? 164 : 158} cy="42" r={isMini ? 10 : 11} fill="none" stroke="white" strokeWidth="1.8"/>
      <circle cx={isMini ? 126 : isLuxury ? 164 : 158} cy="42" r={isMini ? 5 : 6} fill="white" fillOpacity="0.08"/>
    </g>
  );
}

function CouponVisual() {
  return (
    <g>
      {/* Coupon / ticket shape */}
      <g transform="translate(230, 18)" opacity="0.12">
        <rect x="0" y="0" width="50" height="30" rx="4" fill="white"/>
        <line x1="18" y1="0" x2="18" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
        <text x="30" y="18" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" opacity="0.5">%</text>
      </g>
      {/* Scissors */}
      <g transform="translate(225, 28)" opacity="0.08">
        <circle cx="0" cy="-3" r="3" fill="none" stroke="white" strokeWidth="1"/>
        <circle cx="0" cy="5" r="3" fill="none" stroke="white" strokeWidth="1"/>
        <line x1="3" y1="-3" x2="8" y2="1" stroke="white" strokeWidth="1"/>
        <line x1="3" y1="5" x2="8" y2="1" stroke="white" strokeWidth="1"/>
      </g>
      {/* Discount badge */}
      <g transform="translate(30, 25)" opacity="0.08">
        <circle cx="0" cy="0" r="14" fill="white"/>
        <text x="0" y="4" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" opacity="0.6">$</text>
      </g>
    </g>
  );
}

function MerchandiseVisual() {
  return (
    <g>
      {/* Shopping bag */}
      <g transform="translate(250, 15)" opacity="0.12">
        <rect x="-12" y="0" width="24" height="28" rx="3" fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M-6,0 L-6,-5 Q0,-12 6,-5 L6,0" fill="none" stroke="white" strokeWidth="1.2"/>
      </g>
      {/* Gift box */}
      <g transform="translate(40, 30)" opacity="0.08">
        <rect x="-10" y="-2" width="20" height="15" rx="2" fill="white"/>
        <rect x="-12" y="-5" width="24" height="5" rx="2" fill="white"/>
        <line x1="0" y1="-5" x2="0" y2="13" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        <path d="M0,-5 Q-5,-12 -10,-5" fill="none" stroke="white" strokeWidth="1"/>
        <path d="M0,-5 Q5,-12 10,-5" fill="none" stroke="white" strokeWidth="1"/>
      </g>
      {/* Star */}
      <g transform="translate(270, 55)" opacity="0.08">
        <path d="M0,-8 L2,-3 L7,-2 L3,2 L4,7 L0,4 L-4,7 L-3,2 L-7,-2 L-2,-3 Z" fill="white"/>
      </g>
    </g>
  );
}

function LuckyDrawVisual() {
  return (
    <g>
      {/* Stars */}
      {[[255,20],[35,25],[270,55],[45,55]].map(([x,y], i) => (
        <path key={i} d={`M${x},${y-5} L${x+1.5},${y-1.5} L${x+5},${y-0.5} L${x+2.5},${y+2} L${x+3},${y+5} L${x},${y+3} L${x-3},${y+5} L${x-2.5},${y+2} L${x-5},${y-0.5} L${x-1.5},${y-1.5} Z`} fill="#FFD700" fillOpacity={0.12 + i * 0.02}>
          <animate attributeName="opacity" values="0.06;0.18;0.06" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
        </path>
      ))}
      {/* Ticket */}
      <g transform="translate(245, 30)" opacity="0.1">
        <rect x="0" y="0" width="30" height="18" rx="3" fill="white"/>
        <circle cx="0" cy="9" r="4" fill="currentColor" opacity="0.3"/>
        <circle cx="30" cy="9" r="4" fill="currentColor" opacity="0.3"/>
      </g>
      {/* Sparkles */}
      {[[30,40],[280,45],[160,15]].map(([x,y], i) => (
        <g key={`s${i}`}>
          <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="white" strokeWidth="1" opacity="0.1"/>
          <line x1={x} y1={y-4} x2={x} y2={y+4} stroke="white" strokeWidth="1" opacity="0.1"/>
        </g>
      ))}
    </g>
  );
}

function getRewardVisual(type: string) {
  switch (type) {
    case 'e_coupon': return <CouponVisual />;
    case 'physical': return <MerchandiseVisual />;
    case 'lucky_draw': return <LuckyDrawVisual />;
    default: return <CouponVisual />;
  }
}

export function RewardArtwork({ brand, rewardType, title, className = '' }: RewardArtworkProps) {
  const [color1, color2] = brandGradients[brand] || brandGradients['All Brands'];
  const gradientId = `rg-${brand.replace(/[\s-]+/g, '')}-${rewardType}`;

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
        <linearGradient id={`${gradientId}-overlay`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="320" height="180" fill={`url(#${gradientId})`} />
      <rect width="320" height="180" fill={`url(#${gradientId}-overlay)`} />

      {/* Subtle pattern */}
      <g opacity="0.015">
        {Array.from({ length: 8 }, (_, i) => (
          <React.Fragment key={i}>
            <circle cx={i * 40 + 20} cy="90" r={60} fill="none" stroke="white" strokeWidth="0.5" />
          </React.Fragment>
        ))}
      </g>

      {/* Reward type visual */}
      {getRewardVisual(rewardType)}

      {/* Vehicle */}
      <SmallCarSilhouette brand={brand} />

      {/* Floating particles */}
      {[
        { cx: 25, cy: 80, r: 1, dur: '5s' },
        { cx: 295, cy: 70, r: 1.2, dur: '6s' },
        { cx: 160, cy: 20, r: 0.8, dur: '7s' },
      ].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="white" fillOpacity="0.15">
          <animate attributeName="cy" values={`${p.cy};${p.cy-10};${p.cy}`} dur={p.dur} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.05;0.18;0.05" dur={p.dur} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Brand */}
      <text x="16" y="22" fill="white" fillOpacity="0.6" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="1.5">
        {brand.toUpperCase()}
      </text>

      {/* Bottom bar */}
      <rect y="140" width="320" height="40" fill="black" fillOpacity="0.3" />

      {/* Reward type badge */}
      <rect x="16" y="148" width={rewardType === 'e_coupon' ? 55 : rewardType === 'physical' ? 72 : 62} height="16" rx="8" fill="white" fillOpacity="0.12"/>
      <text x="22" y="159" fill="white" fillOpacity="0.8" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
        {rewardType === 'e_coupon' ? 'E-Coupon' : rewardType === 'physical' ? 'Merchandise' : 'Lucky Draw'}
      </text>

      {/* Title */}
      <text x={rewardType === 'physical' ? 96 : rewardType === 'lucky_draw' ? 86 : 78} y="159" fill="white" fillOpacity="0.9" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
        {title.length > 28 ? title.slice(0, 28) + '...' : title}
      </text>
    </svg>
  );
}

export default RewardArtwork;
