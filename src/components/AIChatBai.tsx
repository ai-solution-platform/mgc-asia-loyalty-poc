import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface AIChatBaiProps {
  context: 'customer' | 'admin';
}

interface Message {
  id: number;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  table?: { headers: string[]; rows: (string | number)[][] };
}

// Allow other components to programmatically open the chat with a prefilled prompt
declare global {
  interface WindowEventMap {
    'baisai:open': CustomEvent<{ prompt?: string }>;
  }
}

const customerPrompts = [
  'คะแนนของฉัน',
  'Campaign ที่แนะนำ',
  'ดู rewards ใหม่',
  'ติดต่อศูนย์บริการ',
];

const adminPrompts = [
  'Top 10 members เดือนนี้',
  'Churn risk analysis',
  'Campaign ROI',
  'ออก report',
];

const fallbackResponses = [
  'ขออภัยค่ะ ใบเตยกำลังเรียนรู้เรื่องนี้อยู่ ลองถามใหม่ได้นะคะ',
  'เข้าใจแล้วค่ะ ใบเตยกำลังประมวลผล... ขอข้อมูลเพิ่มเติมได้ไหมคะ',
];

function generateResponse(input: string): { content: string; table?: Message['table'] } {
  const text = input.toLowerCase();

  if (text.includes('คะแนน') || text.includes('points') || text.includes('point')) {
    return {
      content:
        'คุณมี 12,450 คะแนน (Diamond Tier) — ขาดอีก 2,550 คะแนนจะอัพเป็น Black Diamond ค่ะ ✨',
    };
  }
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
  if (text.includes('campaign') || text.includes('แคมเปญ')) {
    return {
      content:
        'พบ 3 campaigns ที่ตรงกับคุณค่ะ:\n• BMW Summer Drive (+5,000 pts)\n• MINI Lifestyle Collection (-30%)\n• Rolls-Royce Black Badge Lucky Draw',
    };
  }
  if (text.includes('roi')) {
    return {
      content:
        'Campaign ROI สรุป (30 วัน): BMW Summer Drive ROI 4.2x, MINI Lifestyle Collection ROI 3.1x, Rolls-Royce Black Badge ROI 6.8x — แนะนำเพิ่มงบ Rolls-Royce อีก 20% ค่ะ',
    };
  }
  if (text.includes('reward') || text.includes('รางวัล')) {
    return {
      content:
        'Rewards แนะนำสำหรับคุณค่ะ:\n• BMW Care Service Voucher (8,000 pts)\n• Rolls-Royce Champagne Set (12,000 pts)\n• MINI Weekend Drive Experience (10,500 pts)',
    };
  }
  if (text.includes('report') || text.includes('รายงาน')) {
    return {
      content:
        'สร้างรายงาน "Monthly Loyalty Performance" เรียบร้อยค่ะ ✓\n— Total members: 24,580\n— Active rate: 68%\n— Redemption rate: 32%\n\nส่งทาง email หรือดู preview ที่นี่ได้เลยค่ะ',
    };
  }
  if (text.includes('ติดต่อ') || text.includes('ศูนย์บริการ') || text.includes('contact')) {
    return {
      content:
        'ศูนย์บริการ MGC-ASIA ค่ะ:\n• BMW Service: 02-095-9999\n• MINI Service: 02-095-8888\n• Rolls-Royce: 02-095-7777\n\nหรือกด "Book Appointment" ในแอปได้เลยค่ะ',
    };
  }
  return {
    content: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
  };
}

export default function AIChatBai({ context }: AIChatBaiProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      content: 'สวัสดีค่ะ! ใบเตยช่วยอะไรได้บ้างคะ? 🌿',
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
    window.addEventListener('baisai:open', handler);
    return () => window.removeEventListener('baisai:open', handler);
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
      const { content, table } = generateResponse(trimmed);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          content,
          table,
          timestamp: new Date(),
        },
      ]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI Assistant น้องใบเตย"
          className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[60] w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform group"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, #6EE7B7 0%, #10B981 45%, #047857 100%)',
          }}
        >
          <span className="absolute inset-0 rounded-full ring-4 ring-emerald-400/30 animate-pulse" />
          <span className="relative flex items-center justify-center w-full h-full text-white font-bold text-2xl drop-shadow">
            ใ
          </span>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A96E] flex items-center justify-center shadow-lg">
            <Sparkles size={10} className="text-white" />
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
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 flex items-center gap-3 text-white shrink-0">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #6EE7B7 50%, #10B981 100%)',
                    color: '#047857',
                  }}
                >
                  ใ
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-tight">น้องใบเตย</h3>
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
                    <p className="whitespace-pre-line">{msg.content}</p>
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
                <p className="text-[10px] text-[#334155]/50 mb-1.5 px-1">ลองถามได้เลยค่ะ</p>
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
                placeholder="พิมพ์ข้อความถึงใบเตย..."
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
export function openBaiSai(prompt?: string) {
  window.dispatchEvent(new CustomEvent('baisai:open', { detail: { prompt } }));
}
