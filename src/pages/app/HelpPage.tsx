import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, ChevronDown, ChevronUp, Send, X } from 'lucide-react';

const faqs = [
  { q: 'คะแนนสะสมมีอายุกี่ปี?', a: 'คะแนนสะสมมีอายุ 2 ปี นับจากวันที่ได้รับ หากไม่ใช้ภายในระยะเวลาที่กำหนด คะแนนจะหมดอายุโดยอัตโนมัติ' },
  { q: 'จะเลื่อน Tier ได้อย่างไร?', a: 'การเลื่อน Tier ขึ้นอยู่กับยอดใช้จ่ายสะสม: Diamond (฿1M+), Black Diamond (฿5M+), Infinite Blue Diamond (฿50M+)' },
  { q: 'สามารถโอนคะแนนให้คนอื่นได้ไหม?', a: 'ได้ โดยไปที่หน้า "โอนคะแนน" ระบุหมายเลขสมาชิกผู้รับ มีค่าธรรมเนียม 10%' },
  { q: 'คูปองใช้ได้ที่ไหนบ้าง?', a: 'คูปองใช้ได้ที่ศูนย์บริการทุกสาขาของแบรนด์ที่ระบุ กรุณาแสดง QR Code ให้พนักงาน' },
  { q: 'ลืมรหัสผ่านต้องทำอย่างไร?', a: 'กด "ลืมรหัสผ่าน" ที่หน้า Login ระบบจะส่ง OTP ไปยังเบอร์ที่ลงทะเบียน' },
  { q: 'จะยกเลิกสมาชิกภาพได้อย่างไร?', a: 'ไปที่ "ความเป็นส่วนตัว & PDPA" > "ขอลบข้อมูล" หรือติดต่อ 02-880-5555' },
];
const branches = [
  { name: 'BMW Millennium Auto - Rama 4', address: 'ถ.พระราม 4 กรุงเทพฯ', phone: '02-260-1234', brand: 'BMW' },
  { name: 'BMW Millennium Auto - Ekkamai', address: 'ซ.เอกมัย กรุงเทพฯ', phone: '02-381-5678', brand: 'BMW' },
  { name: 'Rolls-Royce Motor Cars Bangkok', address: 'ถ.เพลินจิต กรุงเทพฯ', phone: '02-254-9999', brand: 'Rolls-Royce' },
  { name: 'MINI Millennium Auto - Thonglor', address: 'ซ.ทองหล่อ กรุงเทพฯ', phone: '02-712-3456', brand: 'MINI' },
  { name: 'Summit Honda - Bangna', address: 'ถ.บางนา-ตราด กรุงเทพฯ', phone: '02-399-7890', brand: 'Honda' },
  { name: 'Harley-Davidson Bangkok', address: 'ถ.รามอินทรา กรุงเทพฯ', phone: '02-943-1234', brand: 'Harley-Davidson' },
  { name: 'Maserati Bangkok', address: 'ถ.เพชรบุรี กรุงเทพฯ', phone: '02-308-5555', brand: 'Maserati' },
];

export default function HelpPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ from: 'user' | 'bot'; text: string }>>([
    { from: 'bot', text: 'สวัสดีค่ะ! ยินดีให้บริการ MOBILIFE Live Chat\nมีอะไรให้ช่วยเหลือคะ?' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { from: 'user', text: chatInput.trim() }]);
    setChatInput('');
    setTimeout(() => setChatMessages(prev => [...prev, { from: 'bot', text: 'ขอบคุณค่ะ เจ้าหน้าที่กำลังตรวจสอบ กรุณารอสักครู่ค่ะ 🙏' }]), 1200);
  };

  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-[#1B2B5B]"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold text-[#1B2B5B]">ช่วยเหลือ & ติดต่อเรา</h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setShowChat(true)} className="bg-[#C9A96E]/5 border border-[#C9A96E]/20 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-[#C9A96E]/10 transition-all">
          <MessageCircle size={24} className="text-[#C9A96E]" /><span className="text-xs font-semibold text-[#C9A96E]">Live Chat</span>
        </button>
        <a href="tel:028805555" className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-blue-100 transition-all">
          <Phone size={24} className="text-blue-500" /><span className="text-xs font-semibold text-blue-500">02-880-5555</span>
        </a>
        <a href="https://lin.ee/mgcasia" target="_blank" rel="noreferrer" className="bg-green-50 border border-green-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-green-100 transition-all">
          <MessageCircle size={24} className="text-green-500" /><span className="text-xs font-semibold text-green-500">LINE OA</span>
        </a>
        <a href="mailto:support@mgc-asia.com" className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-purple-100 transition-all">
          <Mail size={24} className="text-purple-500" /><span className="text-xs font-semibold text-purple-500">Email</span>
        </a>
      </div>

      <div>
        <h2 className="font-bold text-sm text-[#1B2B5B] mb-3">คำถามที่พบบ่อย</h2>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-3 text-left">
                <span className="text-xs font-medium text-[#1B2B5B] pr-4">{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
              </button>
              {openFaq === idx && <div className="px-3 pb-3 text-xs text-[#334155]/60 border-t border-gray-100 pt-2">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-sm text-[#1B2B5B] mb-3">โชว์รูม MGC-ASIA</h2>
        <div className="space-y-2">
          {branches.map((branch, idx) => (
            <div key={idx} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B2B5B]/5 text-[#1B2B5B]">{branch.brand}</span>
              <h3 className="text-xs font-semibold text-[#1B2B5B] mt-1">{branch.name}</h3>
              <div className="flex items-center gap-1.5 text-[10px] text-[#334155]/50 mt-1"><MapPin size={10} /> {branch.address}</div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#334155]/50 mt-0.5"><Phone size={10} /> {branch.phone}</div>
            </div>
          ))}
        </div>
      </div>

      {showChat && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={() => setShowChat(false)}>
          <div className="bg-white rounded-t-3xl w-full max-w-md h-[75vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1B2B5B] flex items-center justify-center text-xs font-bold text-white">M</div>
                <div><p className="text-sm font-bold text-[#1B2B5B]">MOBILIFE Support</p><p className="text-[10px] text-green-500">Online</p></div>
              </div>
              <button onClick={() => setShowChat(false)} className="p-1"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F7FA]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs whitespace-pre-line ${msg.from === 'user' ? 'bg-[#1B2B5B] text-white' : 'bg-white text-[#1B2B5B] shadow-sm'}`}>{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100 flex items-center gap-2 bg-white">
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="พิมพ์ข้อความ..." className="flex-1 bg-[#F5F7FA] border border-gray-200 rounded-full py-2 px-4 text-sm text-[#1B2B5B] placeholder-gray-400 focus:outline-none focus:border-[#1B2B5B]/30" />
              <button onClick={sendMessage} className="w-9 h-9 rounded-full bg-[#1B2B5B] flex items-center justify-center shrink-0"><Send size={16} className="text-white" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
