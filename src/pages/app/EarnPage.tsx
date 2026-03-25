import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Wrench, Users, ClipboardList, MapPin, ChevronRight } from 'lucide-react';

const earnMethods = [
  { icon: ShoppingCart, title: 'ซื้อรถยนต์ / มอเตอร์ไซค์', desc: 'รับคะแนนจากการซื้อรถใหม่ทุกแบรนด์ในเครือ MGC-ASIA', points: '1 คะแนน ต่อ ฿100', multiplier: 'Diamond 1.5x | Black Diamond 2x | Infinite Blue 3x', color: 'bg-green-50 text-green-600', details: ['BMW: สูงสุด 85,000 pts/คัน', 'Rolls-Royce: สูงสุด 250,000 pts/คัน', 'MINI: สูงสุด 45,000 pts/คัน', 'Honda: สูงสุด 15,000 pts/คัน', 'Harley-Davidson: สูงสุด 30,000 pts/คัน'] },
  { icon: Wrench, title: 'เข้ารับบริการศูนย์', desc: 'รับคะแนนจากค่าบริการและค่าอะไหล่', points: '1 คะแนน ต่อ ฿50', multiplier: 'แคมเปญพิเศษ: สูงสุด 3x', color: 'bg-blue-50 text-blue-600', details: ['ค่าแรงซ่อม: 1 คะแนน/฿50', 'ค่าอะไหล่: 1 คะแนน/฿100', 'ประกันภัย Howden: 1 คะแนน/฿200', 'Sixt Rent A Car: 1 คะแนน/฿100'] },
  { icon: Users, title: 'แนะนำเพื่อน (Referral)', desc: 'แนะนำเพื่อนมาเป็นสมาชิกและซื้อรถ', points: '5,000 คะแนน ต่อคน', multiplier: 'ผู้ถูกแนะนำได้รับ 2,000 คะแนน', color: 'bg-purple-50 text-purple-600', details: ['แนะนำสมัครสมาชิก: 500 คะแนน', 'เพื่อนซื้อรถ: 5,000 คะแนน', 'เพื่อนเข้าบริการครั้งแรก: 1,000 คะแนน', 'ไม่จำกัดจำนวนการแนะนำ'] },
  { icon: ClipboardList, title: 'ทำแบบสำรวจ', desc: 'ตอบแบบสอบถามเพื่อรับคะแนนสะสม', points: '100 - 500 คะแนน', multiplier: 'เดือนละ 2-3 แบบสำรวจ', color: 'bg-yellow-50 text-yellow-600', details: ['แบบสำรวจความพึงพอใจ: 100 คะแนน', 'แบบสำรวจผลิตภัณฑ์ใหม่: 300 คะแนน', 'แบบสำรวจพิเศษ (Quarterly): 500 คะแนน'] },
  { icon: MapPin, title: 'เช็คอิน (Check-in)', desc: 'เช็คอินที่โชว์รูมหรืองานอีเวนต์', points: '50 - 200 คะแนน', multiplier: 'สูงสุด 2 ครั้ง/เดือน', color: 'bg-[#C9A96E]/10 text-[#C9A96E]', details: ['เช็คอินที่โชว์รูม: 50 คะแนน', 'เข้าร่วมอีเวนต์: 200 คะแนน', 'Test Drive Event: 150 คะแนน', 'Grand Opening: 500 คะแนน'] },
];

export default function EarnPage() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-[#1B2B5B]"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold text-[#1B2B5B]">วิธีสะสมคะแนน</h1>
      </div>

      <div className="bg-gradient-to-br from-[#0D1B4A] to-[#1B2B5B] rounded-2xl p-4 shadow-xl">
        <p className="text-xs text-white/60 mb-1">สะสมคะแนนได้หลายช่องทาง</p>
        <p className="text-sm font-medium text-white">ยิ่ง Tier สูง ยิ่งได้คะแนนมาก — สูงสุด <span className="text-[#D4A853] font-bold">3 เท่า!</span></p>
      </div>

      <div className="space-y-3">
        {earnMethods.map((method, idx) => {
          const Icon = method.icon;
          return (
            <details key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group">
              <summary className="flex items-start gap-3 p-4 cursor-pointer list-none">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${method.color}`}><Icon size={20} /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#1B2B5B]">{method.title}</h3>
                  <p className="text-[10px] text-[#334155]/50 mt-0.5">{method.desc}</p>
                  <div className="flex items-center gap-2 mt-2"><span className="text-xs font-bold text-[#C9A96E]">{method.points}</span></div>
                  <p className="text-[10px] text-[#334155]/40 mt-0.5">{method.multiplier}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 mt-1 shrink-0 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-4 pb-4 pt-1 border-t border-gray-100 mt-1">
                <div className="space-y-1.5">
                  {method.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#334155]/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0"></span>{detail}
                    </div>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
