import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface AIChatBaiProps {
  context: 'customer' | 'admin';
}

// Custom AI icon — friendly chatbot face with sparkle (represents Able AI Assistant)
function AbleIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Robot head/face body */}
      <rect x="6" y="8" width="20" height="18" rx="6" fill="#1B2B5B"/>
      {/* Antenna with sparkle on top */}
      <line x1="16" y1="8" x2="16" y2="4" stroke="#1B2B5B" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="3" r="2" fill="#FFD700"/>
      {/* Eyes — friendly happy */}
      <circle cx="12" cy="16" r="2" fill="#FFD700"/>
      <circle cx="20" cy="16" r="2" fill="#FFD700"/>
      {/* Smile */}
      <path d="M12 21 Q16 24 20 21" stroke="#FFD700" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Side ear/sparkle accent */}
      <circle cx="6" cy="14" r="1.2" fill="#FFD700" opacity="0.9"/>
      <circle cx="26" cy="14" r="1.2" fill="#FFD700" opacity="0.9"/>
    </svg>
  );
}

interface RewardCard {
  name: string;
  points: number;
  brand: string;
}

interface CampaignCard {
  name: string;
  detail: string;
  brand: string;
}

interface CouponCard {
  name: string;
  detail: string;
}

interface HistoryItem {
  date: string;
  description: string;
  points: number;
}

interface RichContent {
  progress?: { current: number; max: number; label?: string };
  rewards?: RewardCard[];
  campaigns?: CampaignCard[];
  chips?: string[];
  brandChips?: string[];
  coupons?: CouponCard[];
  tierBenefits?: string[];
  history?: HistoryItem[];
  shareButton?: boolean;
}

interface Message {
  id: number;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  table?: { headers: string[]; rows: (string | number)[][] };
  rich?: RichContent;
}

// Allow other components to programmatically open the chat with a prefilled prompt
declare global {
  interface WindowEventMap {
    'able:open': CustomEvent<{ prompt?: string }>;
  }
}

const customerPrompts = [
  'คะแนนของฉัน',
  'Reward แนะนำ',
  'Campaign ที่เหมาะกับฉัน',
  'จองศูนย์บริการ',
  'ชวนเพื่อน',
  'ประวัติคะแนน',
];

const adminPrompts = [
  'Top 10 members เดือนนี้',
  'Churn risk analysis',
  'Campaign ROI',
  'ออก report',
];

const fallbackChips = ['คะแนนของฉัน', 'Reward แนะนำ', 'จองศูนย์บริการ', 'ชวนเพื่อน'];

function generateResponse(input: string, context: 'customer' | 'admin'): { content: string; table?: Message['table']; rich?: RichContent } {
  const text = input.toLowerCase();

  // ===== CUSTOMER CONTEXT =====
  if (context === 'customer') {
    // 1. Points / คะแนน
    if (text.includes('คะแนน') || text.includes('points') || text.includes('point')) {
      return {
        content: 'คุณมี **12,450 คะแนน** (Diamond Tier) ✨\nขาดอีก **2,550 คะแนน** จะอัพเป็น Black Diamond',
        rich: {
          progress: { current: 12450, max: 15000, label: 'Diamond → Black Diamond' },
        },
      };
    }

    // 10. History / ประวัติ — check before generic "reward" since we want history specific
    if (text.includes('ประวัติ') || text.includes('history') || text.includes('transaction')) {
      return {
        content: 'ประวัติคะแนน 5 รายการล่าสุดของคุณค่ะ:',
        rich: {
          history: [
            { date: '2026-03-20', description: 'BMW 520d Sport Purchase', points: 8500 },
            { date: '2026-03-18', description: 'Redeem: BMW Lifestyle Package', points: -5000 },
            { date: '2026-03-15', description: 'Annual Service Package', points: 3200 },
            { date: '2026-03-01', description: 'Birthday Bonus 🎂', points: 1000 },
            { date: '2026-02-28', description: 'BMW M Service Voucher Redeem', points: -2000 },
          ],
        },
      };
    }

    // 2. Rewards / แลกอะไรดี
    if (
      text.includes('แลกอะไร') ||
      text.includes('reward') ||
      text.includes('รางวัล') ||
      text.includes('แลก')
    ) {
      return {
        content: 'Rewards แนะนำสำหรับคุณค่ะ:',
        rich: {
          rewards: [
            { name: 'BMW Service Voucher', points: 8000, brand: 'BMW' },
            { name: 'Rolls-Royce Champagne Set', points: 12000, brand: 'Rolls-Royce' },
            { name: 'MINI Lifestyle Collection', points: 4500, brand: 'MINI' },
          ],
          chips: ['ดู Rewards ทั้งหมด', 'แลกตอนนี้'],
        },
      };
    }

    // 3. Campaign / แคมเปญ
    if (text.includes('campaign') || text.includes('แคมเปญ') || text.includes('โปรโมชัน') || text.includes('โปรโมชั่น')) {
      return {
        content: 'พบ 3 campaigns ที่เหมาะกับคุณค่ะ:',
        rich: {
          campaigns: [
            { name: 'BMW Summer Drive', detail: '+5,000 pts', brand: 'BMW' },
            { name: 'MINI Lifestyle Collection', detail: '30% off', brand: 'MINI' },
            { name: 'Rolls-Royce Lucky Draw', detail: 'ลุ้น Private Dinner', brand: 'Rolls-Royce' },
          ],
          chips: ['ดูทั้งหมด'],
        },
      };
    }

    // 4. Appointment / จองศูนย์บริการ
    if (text.includes('จองศูนย์') || text.includes('appointment') || text.includes('บริการ') || text.includes('จอง')) {
      return {
        content: 'Able จองศูนย์บริการให้ได้ — เลือกแบรนด์ของคุณ:',
        rich: {
          brandChips: ['BMW', 'MINI', 'Honda', 'Rolls-Royce'],
        },
      };
    }

    // 5. Tier / Black Diamond / ระดับ
    if (text.includes('black diamond') || text.includes('tier') || text.includes('ระดับ') || text.includes('สิทธิ์')) {
      return {
        content: 'Tier ของคุณคือ **Diamond** 💎 — สิทธิ์ที่ได้รับ:',
        rich: {
          tierBenefits: [
            '1.5x Points ทุกการซื้อ',
            'Priority Service ที่ทุกศูนย์',
            'Exclusive Events & Test Drives',
            'Birthday Bonus 1,000 คะแนน',
          ],
        },
      };
    }

    // 6. Coupon / คูปอง / voucher
    if (text.includes('คูปอง') || text.includes('coupon') || text.includes('voucher')) {
      return {
        content: 'คุณมี 3 คูปองที่ใช้งานได้ค่ะ:',
        rich: {
          coupons: [
            { name: '10% Off Service', detail: 'หมดอายุ 31/05/2026' },
            { name: 'Free Car Wash', detail: 'ใช้ได้ทุกศูนย์' },
            { name: '฿500 Cash Voucher', detail: 'ขั้นต่ำ ฿2,500' },
          ],
          chips: ['ใช้คูปอง', 'ดูทั้งหมด'],
        },
      };
    }

    // 7. Birthday / วันเกิด
    if (text.includes('birthday') || text.includes('วันเกิด')) {
      return {
        content:
          'วันเกิดของคุณคือ **15 มีนาคม** 🎂\nAble เตรียม Birthday Bonus **1,000 คะแนน** ให้แล้ว — พร้อมส่วนลด After-Sales Service 15% ตลอดเดือนเกิด',
        rich: {
          chips: ['รับ Bonus เลย', 'ดู Birthday Campaign'],
        },
      };
    }

    // 8. Help / ติดต่อ / ช่วยเหลือ
    if (text.includes('ติดต่อ') || text.includes('help') || text.includes('ช่วยเหลือ') || text.includes('contact')) {
      return {
        content: 'Able ช่วยได้! เลือกหัวข้อที่ต้องการ:',
        rich: {
          chips: ['Call Center', 'LINE OA', 'ศูนย์บริการใกล้ฉัน', 'FAQ'],
        },
      };
    }

    // 9. Refer / ชวนเพื่อน
    if (text.includes('แนะนำเพื่อน') || text.includes('refer') || text.includes('เพื่อน') || text.includes('ชวนเพื่อน')) {
      return {
        content:
          'ชวนเพื่อนใช้ MOBILIFE — รับ **500 คะแนน** เมื่อเพื่อนสมัครและใช้คะแนนครั้งแรกค่ะ',
        rich: {
          shareButton: true,
          chips: ['คัดลอก Referral Link'],
        },
      };
    }

    // Default fallback for customer
    return {
      content: 'Able กำลังเรียนรู้เรื่องนี้อยู่ ✨ ลองถาม:',
      rich: {
        chips: fallbackChips,
      },
    };
  }

  // ===== ADMIN CONTEXT =====
  if (text.includes('top') || text.includes('top 10')) {
    return {
      content: 'Top 10 members เดือนนี้ค่ะ — เรียงตามคะแนนสะสมสูงสุด',
      table: {
        headers: ['Rank', 'Member', 'Points', 'Brand'],
        rows: [
          [1, 'คุณสมชาย วัฒนศิริ', '48,200', 'Rolls-Royce'],
          [2, 'คุณปรีดา ภูวนัย', '42,150', 'BMW'],
          [3, 'คุณนรินทร์ สวัสดิ์', '39,820', 'BMW'],
          [4, 'คุณวิภาดา ชัยกุล', '36,500', 'MINI'],
          [5, 'คุณอรรถพล เจริญ', '34,720', 'Rolls-Royce'],
          [6, 'คุณธนพล ศักดา', '33,210', 'BMW'],
          [7, 'คุณณัฐริกา อินทร์', '31,900', 'BMW'],
          [8, 'คุณสุวิมล รัตนา', '30,540', 'MINI'],
          [9, 'คุณกษิดิศ บุญมี', '29,180', 'BMW'],
          [10, 'คุณพิมพ์ใจ ปิติ', '28,420', 'Rolls-Royce'],
        ],
      },
    };
  }
  if (text.includes('churn')) {
    return {
      content:
        'พบสมาชิก Black Diamond 23 คนเสี่ยง churn สูง — แนะนำ campaign "Welcome Back Bonus 5,000 pts" สำหรับกลุ่มนี้ค่ะ',
      table: {
        headers: ['Member', 'Last Visit', 'Tier', 'Risk'],
        rows: [
          ['คุณนรินทร์ สวัสดิ์', '92 days ago', 'Black Diamond', 'High'],
          ['คุณวิภาดา ชัยกุล', '78 days ago', 'Black Diamond', 'High'],
          ['คุณอรรถพล เจริญ', '71 days ago', 'Diamond', 'High'],
          ['คุณธนพล ศักดา', '65 days ago', 'Diamond', 'Medium'],
          ['คุณสุวิมล รัตนา', '58 days ago', 'Black Diamond', 'Medium'],
        ],
      },
    };
  }
  if (text.includes('roi')) {
    return {
      content:
        'Campaign ROI สรุป (30 วัน): BMW Summer Drive ROI 4.2x, MINI Lifestyle Collection ROI 3.1x, Rolls-Royce Black Badge ROI 6.8x — แนะนำเพิ่มงบ Rolls-Royce อีก 20% ค่ะ',
    };
  }
  if (text.includes('campaign') || text.includes('แคมเปญ')) {
    return {
      content:
        'พบ 3 campaigns ที่ตรงกับคุณค่ะ:\n• BMW Summer Drive (+5,000 pts)\n• MINI Lifestyle Collection (-30%)\n• Rolls-Royce Black Badge Lucky Draw',
    };
  }
  if (text.includes('report') || text.includes('รายงาน')) {
    return {
      content:
        'สร้างรายงาน "Monthly Loyalty Performance" เรียบร้อยค่ะ ✓\n— Total members: 24,580\n— Active rate: 68%\n— Redemption rate: 32%\n\nส่งทาง email หรือดู preview ที่นี่ได้เลยค่ะ',
    };
  }
  return {
    content: 'ขออภัย Able กำลังเรียนรู้เรื่องนี้อยู่ ลองถามใหม่ได้',
  };
}

// Render markdown-like **bold** in plain text
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const brandColorMap: Record<string, string> = {
  BMW: '#0066B1',
  MINI: '#007C41',
  'Rolls-Royce': '#680021',
  Honda: '#CC0000',
};

export default function AIChatBai({ context }: AIChatBaiProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      content: 'สวัสดี! Able ยินดีให้บริการ ✨ ถามอะไรก็ได้เลย',
      timestamp: new Date(),
    },
  ]);

  const suggestedPrompts = context === 'admin' ? adminPrompts : customerPrompts;
  const scrollRef = useRef<HTMLDivElement>(null);

  // Listen for global open events from other components (e.g., admin dashboard)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ prompt?: string }>).detail;
      setOpen(true);
      if (detail?.prompt) {
        // Small delay so the input renders before pre-filling
        setTimeout(() => {
          setInput(detail.prompt!);
        }, 50);
      }
    };
    window.addEventListener('able:open', handler);
    return () => window.removeEventListener('able:open', handler);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const { content, table, rich } = generateResponse(trimmed, context);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          content,
          table,
          rich,
          timestamp: new Date(),
        },
      ]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Action Button — prominent with label */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Able AI Assistant"
          className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[60] flex items-center gap-2 pl-2 pr-4 py-2 rounded-full shadow-2xl hover:scale-105 transition-transform group"
          style={{
            background: 'linear-gradient(135deg, #1B2B5B 0%, #7E2A8E 50%, #E2231A 100%)',
            boxShadow: '0 10px 30px rgba(126,42,142,0.45), 0 0 0 4px rgba(201,169,110,0.25)',
          }}
        >
          <span className="absolute inset-0 rounded-full ring-2 ring-[#C9A96E]/60 animate-pulse" />
          <span
            className="relative flex items-center justify-center w-12 h-12 rounded-full drop-shadow"
            style={{ background: 'linear-gradient(135deg, #C9A96E, #D4A853)' }}
          >
            <AbleIcon size={28} />
          </span>
          <span className="relative flex flex-col items-start text-white">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-90 flex items-center gap-1">
              <Sparkles size={9} className="text-[#FFD700]" /> AI Assistant
            </span>
            <span className="text-sm font-bold leading-tight">Able</span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 z-[60] bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />

          <div
            className="fixed z-[70] flex flex-col bg-white shadow-2xl
              inset-0 md:inset-auto md:bottom-6 md:right-6
              md:w-[380px] md:h-[600px] md:rounded-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3 text-white shrink-0" style={{ background: 'linear-gradient(135deg, #1B2B5B 0%, #7E2A8E 60%, #E2231A 100%)' }}>
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: 'linear-gradient(135deg, #C9A96E, #D4A853)' }}
                >
                  <AbleIcon size={26} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-tight">Able</h3>
                <p className="text-[11px] text-white/85 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  AI Assistant — Online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-1.5 rounded-full hover:bg-white/15 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F7FA]">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-[#1B2B5B] text-white rounded-br-sm'
                        : 'bg-white text-[#1B2B5B] border border-gray-100 rounded-bl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{renderInline(msg.content)}</p>

                    {/* Progress bar */}
                    {msg.rich?.progress && (
                      <div className="mt-2.5">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="text-[#334155]/70">
                            {msg.rich.progress.label || 'Progress'}
                          </span>
                          <span className="font-semibold text-emerald-600">
                            {Math.round((msg.rich.progress.current / msg.rich.progress.max) * 100)}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all"
                            style={{
                              width: `${Math.min(100, (msg.rich.progress.current / msg.rich.progress.max) * 100)}%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-[9px] text-[#334155]/50 mt-0.5">
                          <span>{msg.rich.progress.current.toLocaleString()} pts</span>
                          <span>{msg.rich.progress.max.toLocaleString()} pts</span>
                        </div>
                      </div>
                    )}

                    {/* Reward cards */}
                    {msg.rich?.rewards && (
                      <div className="mt-2.5 space-y-1.5">
                        {msg.rich.rewards.map((r, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded-lg bg-[#F5F7FA] border border-gray-100"
                          >
                            <div
                              className="w-1.5 h-8 rounded-full shrink-0"
                              style={{ background: brandColorMap[r.brand] || '#1B2B5B' }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-semibold text-[#1B2B5B] truncate">
                                {r.name}
                              </p>
                              <p className="text-[9px] text-[#334155]/60">{r.brand}</p>
                            </div>
                            <span className="text-[10px] font-bold text-[#C9A96E] whitespace-nowrap">
                              {r.points.toLocaleString()} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Campaign cards */}
                    {msg.rich?.campaigns && (
                      <div className="mt-2.5 space-y-1.5">
                        {msg.rich.campaigns.map((c, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded-lg bg-[#F5F7FA] border border-gray-100"
                          >
                            <div
                              className="w-1.5 h-8 rounded-full shrink-0"
                              style={{ background: brandColorMap[c.brand] || '#1B2B5B' }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-semibold text-[#1B2B5B] truncate">
                                {c.name}
                              </p>
                              <p className="text-[9px] text-[#334155]/60">{c.brand}</p>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 whitespace-nowrap">
                              {c.detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Coupons */}
                    {msg.rich?.coupons && (
                      <div className="mt-2.5 space-y-1.5">
                        {msg.rich.coupons.map((c, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200"
                          >
                            <span className="text-base">🎫</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-semibold text-[#1B2B5B] truncate">
                                {c.name}
                              </p>
                              <p className="text-[9px] text-[#334155]/60">{c.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tier benefits */}
                    {msg.rich?.tierBenefits && (
                      <ul className="mt-2 space-y-1">
                        {msg.rich.tierBenefits.map((b, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1.5 text-[11px] text-[#334155]"
                          >
                            <span className="text-emerald-500 mt-0.5">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* History list */}
                    {msg.rich?.history && (
                      <div className="mt-2.5 space-y-1">
                        {msg.rich.history.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-2 py-1.5 px-2 rounded-md bg-[#F5F7FA] border border-gray-100"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] text-[#1B2B5B] truncate">
                                {h.description}
                              </p>
                              <p className="text-[9px] text-[#334155]/50">{h.date}</p>
                            </div>
                            <span
                              className={`text-[11px] font-bold whitespace-nowrap ${h.points > 0 ? 'text-emerald-600' : 'text-[#C9A96E]'}`}
                            >
                              {h.points > 0 ? '+' : ''}
                              {h.points.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Brand chips */}
                    {msg.rich?.brandChips && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {msg.rich.brandChips.map(b => (
                          <button
                            key={b}
                            onClick={() => sendMessage(`จองศูนย์บริการ ${b}`)}
                            className="text-[11px] px-2.5 py-1 rounded-full text-white font-semibold shadow-sm hover:opacity-90 transition-opacity"
                            style={{ background: brandColorMap[b] || '#1B2B5B' }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Share button */}
                    {msg.rich?.shareButton && (
                      <button
                        onClick={() => sendMessage('คัดลอก Referral Link')}
                        className="mt-2.5 w-full text-[11px] font-semibold py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                      >
                        📤 Share Referral Link
                      </button>
                    )}

                    {/* Generic chips */}
                    {msg.rich?.chips && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {msg.rich.chips.map(chip => (
                          <button
                            key={chip}
                            onClick={() => sendMessage(chip)}
                            className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.table && (
                      <div className="mt-2 -mx-1 overflow-x-auto">
                        <table className="w-full text-[10px] border-collapse">
                          <thead>
                            <tr className="bg-[#1B2B5B]/5 text-[#1B2B5B]">
                              {msg.table.headers.map(h => (
                                <th key={h} className="text-left px-2 py-1 font-semibold border-b border-gray-200">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {msg.table.rows.map((row, i) => (
                              <tr key={i} className="border-b border-gray-100 last:border-0">
                                {row.map((cell, j) => (
                                  <td key={j} className="px-2 py-1 text-[#334155]">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-3.5 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested prompts */}
            {messages.length <= 2 && !typing && (
              <div className="px-3 pb-2 shrink-0 bg-[#F5F7FA]">
                <p className="text-[10px] text-[#334155]/50 mb-1.5 px-1">ลองถามได้เลย</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedPrompts.map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-[11px] px-2.5 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex items-center gap-2 bg-white shrink-0">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="พิมพ์ข้อความถึง Able..."
                className="flex-1 px-3 py-2 text-xs bg-[#F5F7FA] rounded-full outline-none focus:ring-2 focus:ring-emerald-500/30 text-[#1B2B5B]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

// Helper function for other components to open the chat with a pre-filled prompt
export function openAble(prompt?: string) {
  window.dispatchEvent(new CustomEvent('able:open', { detail: { prompt } }));
}
