import { useState, useEffect, useMemo } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';

interface LuckyDrawModalProps {
  mechanic: 'spin-wheel' | 'open-box';
  rewards: string[];
  campaignName: string;
  brand: string;
  onClose: () => void;
}

const wheelColors = [
  '#1B2B5B', '#C9A96E', '#0066B1', '#680021',
  '#16a34a', '#dc2626', '#7c3aed', '#0891b2',
];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.5 + Math.random() * 2,
        size: 6 + Math.random() * 8,
        color: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#FFA07A', '#F0E68C', '#1B2B5B', '#C9A96E'][i % 9],
        rot: Math.random() * 360,
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {pieces.map(p => (
        <span
          key={p.id}
          className="absolute block"
          style={{
            left: `${p.left}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: `rotate(${p.rot}deg)`,
            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
            borderRadius: p.id % 3 === 0 ? '50%' : '2px',
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

function SpinWheel({ rewards, onResult }: { rewards: string[]; onResult: (reward: string) => void }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const segments = rewards.slice(0, 8);
  const segCount = segments.length;
  const segAngle = 360 / segCount;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const winnerIdx = Math.floor(Math.random() * segCount);
    const turns = 5 + Math.floor(Math.random() * 3); // 5-7 full turns
    // Wheel pointer at top (0deg). Center of segment i is at i*segAngle + segAngle/2.
    // Resulting rotation must align that center to top, i.e. rotate by -(centerAngle).
    const centerAngle = winnerIdx * segAngle + segAngle / 2;
    const finalRot = turns * 360 + (360 - centerAngle);
    setRotation(prev => prev + finalRot);
    setTimeout(() => {
      setSpinning(false);
      onResult(segments[winnerIdx]);
    }, 3200);
  };

  // Build conic-gradient for wheel
  const conicStops = segments
    .map((_, i) => `${wheelColors[i % wheelColors.length]} ${i * segAngle}deg ${(i + 1) * segAngle}deg`)
    .join(', ');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-72 h-72 max-w-full">
        {/* Pointer */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#1B2B5B] drop-shadow" />
        </div>
        {/* Wheel */}
        <div
          className="relative w-full h-full rounded-full shadow-2xl border-4 border-[#C9A96E]"
          style={{
            background: `conic-gradient(${conicStops})`,
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 3s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          {segments.map((label, i) => {
            const mid = i * segAngle + segAngle / 2;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-left"
                style={{
                  transform: `rotate(${mid}deg) translateX(20px)`,
                  width: '50%',
                }}
              >
                <span
                  className="block text-[10px] font-bold text-white text-center pr-3 truncate"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {label}
                </span>
              </div>
            );
          })}
          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-inner flex items-center justify-center border-4 border-[#C9A96E]">
            <Sparkles size={20} className="text-[#C9A96E]" />
          </div>
        </div>
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className={`mt-6 px-10 py-3 rounded-full text-white font-bold text-base shadow-lg transition-all ${
          spinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#C9A96E] to-[#a8884f] hover:scale-105 active:scale-95'
        }`}
      >
        {spinning ? 'กำลังหมุน...' : 'Spin!'}
      </button>
    </div>
  );
}

function MysteryBox({ rewards, onResult }: { rewards: string[]; onResult: (reward: string) => void }) {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const open = () => {
    if (opening || opened) return;
    setOpening(true);
    setTimeout(() => {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      setOpened(true);
      onResult(reward);
    }, 1800);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56" onClick={open} role="button">
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,110,0.5), transparent 70%)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
        {/* Box */}
        <div
          className={`relative mx-auto mt-6 w-44 h-40 cursor-pointer transition-transform ${opening ? 'animate-shake' : 'hover:scale-105'}`}
          style={{ perspective: '600px' }}
        >
          {/* Box body */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-[#C9A96E] to-[#8B6F3D] rounded-md shadow-xl border-2 border-[#5e4a26]">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 bg-[#1B2B5B] opacity-70" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-[#1B2B5B] opacity-70" />
          </div>
          {/* Lid */}
          <div
            className="absolute left-0 right-0 top-0 h-12 bg-gradient-to-b from-[#d4b67c] to-[#a8884f] rounded-md shadow-lg border-2 border-[#5e4a26]"
            style={{
              transformOrigin: 'bottom left',
              transform: opened ? 'rotateX(-110deg) translateY(-6px)' : opening ? 'rotateX(-25deg)' : 'rotateX(0deg)',
              transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Bow */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-10 h-6 bg-[#1B2B5B] rounded-full opacity-80" />
          </div>
          {/* Reveal sparkle */}
          {opened && (
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 text-4xl animate-pop">
              <Gift size={48} className="text-[#C9A96E]" />
            </div>
          )}
        </div>
      </div>
      {!opening && !opened && (
        <button
          onClick={open}
          className="mt-6 px-10 py-3 rounded-full text-white font-bold text-base shadow-lg bg-gradient-to-r from-[#C9A96E] to-[#a8884f] hover:scale-105 active:scale-95 transition-transform"
        >
          เปิดกล่อง
        </button>
      )}
      {opening && !opened && <p className="mt-6 text-sm text-[#334155]/70 animate-pulse">กำลังเปิด...</p>}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-4px) rotate(-2deg); }
          75% { transform: translateX(4px) rotate(2deg); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out infinite; }
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop { animation: pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export function LuckyDrawModal({ mechanic, rewards, campaignName, brand, onClose }: LuckyDrawModalProps) {
  const [result, setResult] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (result) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [result]);

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center"
          aria-label="Close"
        >
          <X size={18} className="text-[#1B2B5B]" />
        </button>

        <div className="p-6 text-center">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A96E]/15 text-[#C9A96E] font-semibold uppercase tracking-wider">
            {brand} Lucky Draw
          </span>
          <h2 className="text-lg font-bold text-[#1B2B5B] mt-2 mb-1">{campaignName}</h2>
          <p className="text-xs text-[#334155]/60 mb-5">
            {mechanic === 'spin-wheel' ? 'หมุนวงล้อเพื่อลุ้นรางวัล' : 'แตะที่กล่องเพื่อเปิด'}
          </p>

          {!result ? (
            mechanic === 'spin-wheel' ? (
              <SpinWheel rewards={rewards} onResult={setResult} />
            ) : (
              <MysteryBox rewards={rewards} onResult={setResult} />
            )
          ) : (
            <div className="py-6 space-y-4">
              <div className="text-5xl">🎉</div>
              <h3 className="text-xl font-bold text-[#1B2B5B]">ยินดีด้วย!</h3>
              <p className="text-sm text-[#334155]/70">คุณได้รับ</p>
              <div className="bg-gradient-to-br from-[#C9A96E]/15 to-[#1B2B5B]/10 border-2 border-[#C9A96E] rounded-xl p-5">
                <p className="text-lg font-bold text-[#1B2B5B]">{result}</p>
              </div>
              <p className="text-[10px] text-[#334155]/50">รางวัลถูกเพิ่มเข้า Wallet แล้ว</p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#1B2B5B] text-white rounded-xl font-bold text-sm hover:bg-[#0D1B4A]"
              >
                ตกลง
              </button>
            </div>
          )}
        </div>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
}

export default LuckyDrawModal;
