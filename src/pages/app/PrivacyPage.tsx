import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Trash2, FileText, Cookie, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PrivacyPage() {
  const navigate = useNavigate();
  const { triggerToast } = useLanguage();
  const [consents, setConsents] = useState({ marketing: true, analytics: true, thirdParty: false, profiling: true, crossBorder: false });
  const [cookies, setCookies] = useState({ necessary: true, functional: true, analytics: true, advertising: false });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [showPolicy, setShowPolicy] = useState(false);

  const toggleConsent = (key: string) => { setConsents(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] })); triggerToast('บันทึกการยินยอมเรียบร้อย'); };
  const toggleCookie = (key: string) => { if (key === 'necessary') return; setCookies(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] })); triggerToast('บันทึกการตั้งค่าคุกกี้เรียบร้อย'); };

  const consentItems = [
    { key: 'marketing', label: 'การตลาดและโปรโมชั่น', desc: 'รับข้อมูลแคมเปญ โปรโมชั่น และข่าวสาร' },
    { key: 'analytics', label: 'การวิเคราะห์ข้อมูล', desc: 'ใช้ข้อมูลเพื่อปรับปรุงบริการ' },
    { key: 'thirdParty', label: 'แชร์ข้อมูลกับพันธมิตร', desc: 'แบ่งปันข้อมูลกับบริษัทในเครือและพันธมิตร' },
    { key: 'profiling', label: 'การจัดทำโปรไฟล์', desc: 'วิเคราะห์พฤติกรรมเพื่อเสนอสิทธิประโยชน์ที่เหมาะสม' },
    { key: 'crossBorder', label: 'การส่งข้อมูลข้ามประเทศ', desc: 'ส่งข้อมูลไปยังเซิร์ฟเวอร์ต่างประเทศ' },
  ];
  const cookieItems = [
    { key: 'necessary', label: 'คุกกี้ที่จำเป็น', desc: 'จำเป็นสำหรับการทำงานของระบบ', locked: true },
    { key: 'functional', label: 'คุกกี้เพื่อการใช้งาน', desc: 'จดจำการตั้งค่าและภาษา', locked: false },
    { key: 'analytics', label: 'คุกกี้เพื่อการวิเคราะห์', desc: 'วิเคราะห์การใช้งานเพื่อปรับปรุงแอป', locked: false },
    { key: 'advertising', label: 'คุกกี้เพื่อการโฆษณา', desc: 'แสดงโฆษณาที่เกี่ยวข้อง', locked: false },
  ];

  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-[#1B2B5B]"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold text-[#1B2B5B]">ความเป็นส่วนตัว & PDPA</h1>
      </div>

      {/* PDPA Consent */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><Shield size={18} className="text-blue-500" /><h3 className="font-semibold text-sm text-[#1B2B5B]">การจัดการความยินยอม (PDPA)</h3></div>
        <div className="space-y-4">
          {consentItems.map(item => (
            <div key={item.key} className="flex items-start justify-between gap-3">
              <div className="flex-1"><p className="text-xs font-medium text-[#1B2B5B]">{item.label}</p><p className="text-[10px] text-[#334155]/50 mt-0.5">{item.desc}</p></div>
              <button onClick={() => toggleConsent(item.key)} className={`w-11 h-6 rounded-full transition-all shrink-0 mt-0.5 ${consents[item.key as keyof typeof consents] ? 'bg-[#1B2B5B]' : 'bg-gray-200'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-all shadow-sm ${consents[item.key as keyof typeof consents] ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cookie Preferences */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><Cookie size={18} className="text-yellow-500" /><h3 className="font-semibold text-sm text-[#1B2B5B]">การตั้งค่าคุกกี้</h3></div>
        <div className="space-y-4">
          {cookieItems.map(item => (
            <div key={item.key} className="flex items-start justify-between gap-3">
              <div className="flex-1"><p className="text-xs font-medium text-[#1B2B5B]">{item.label}</p><p className="text-[10px] text-[#334155]/50 mt-0.5">{item.desc}</p></div>
              <button onClick={() => toggleCookie(item.key)} disabled={item.locked}
                className={`w-11 h-6 rounded-full transition-all shrink-0 mt-0.5 ${cookies[item.key as keyof typeof cookies] ? 'bg-[#1B2B5B]' : 'bg-gray-200'} ${item.locked ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-all shadow-sm ${cookies[item.key as keyof typeof cookies] ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Policy */}
      <button onClick={() => setShowPolicy(!showPolicy)} className="w-full bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 text-left">
        <FileText size={18} className="text-[#334155]/40 shrink-0" />
        <div className="flex-1"><p className="text-sm font-medium text-[#1B2B5B]">นโยบายความเป็นส่วนตัว</p><p className="text-[10px] text-[#334155]/40">อ่านนโยบาย PDPA ฉบับเต็ม</p></div>
      </button>
      {showPolicy && (
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-xs text-[#334155]/60 space-y-3 max-h-60 overflow-y-auto">
          <h4 className="font-bold text-[#1B2B5B]">นโยบายคุ้มครองข้อมูลส่วนบุคคล</h4>
          <p>บริษัท เอ็มจีซี-เอเชีย จำกัด ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของท่าน ตาม PDPA</p>
          <p><strong className="text-[#1B2B5B]">1. ข้อมูลที่เก็บรวบรวม:</strong> ชื่อ-นามสกุล, อีเมล, เบอร์โทร, ที่อยู่, ข้อมูลการทำธุรกรรม</p>
          <p><strong className="text-[#1B2B5B]">2. วัตถุประสงค์:</strong> เพื่อ Loyalty Program, การติดต่อ, การวิเคราะห์, การปรับปรุงบริการ</p>
          <p><strong className="text-[#1B2B5B]">3. สิทธิ์ของเจ้าของข้อมูล:</strong> เข้าถึง, แก้ไข, ลบ, จำกัดการประมวลผล, ขอรับสำเนา</p>
          <p><strong className="text-[#1B2B5B]">4. ติดต่อ DPO:</strong> dpo@mgc-asia.com | โทร 02-880-5555</p>
        </div>
      )}

      {/* Data Deletion */}
      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
        <div className="flex items-center gap-2 mb-2"><Trash2 size={18} className="text-red-500" /><h3 className="font-semibold text-sm text-red-600">ขอลบข้อมูลส่วนบุคคล</h3></div>
        <p className="text-[10px] text-[#334155]/50 mb-3">ตามสิทธิ์ PDPA คุณสามารถขอให้เราลบข้อมูลส่วนบุคคลของคุณได้ การดำเนินการจะใช้เวลา 30 วัน</p>
        <button onClick={() => setShowDeleteModal(true)} className="w-full py-2.5 border border-red-300 text-red-500 rounded-xl text-xs font-semibold hover:bg-red-100 transition-all">ขอลบข้อมูล</button>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 text-red-500"><AlertTriangle size={20} /><h2 className="text-lg font-bold">ยืนยันการลบข้อมูล</h2></div>
            <p className="text-xs text-[#334155]/60">การลบข้อมูลจะมีผลดังนี้:</p>
            <ul className="text-xs text-[#334155]/60 space-y-1 list-disc pl-4"><li>คะแนนสะสมทั้งหมดจะถูกยกเลิก</li><li>คูปองที่ยังไม่ได้ใช้จะถูกยกเลิก</li><li>ประวัติการใช้บริการจะถูกลบ</li><li>สมาชิกภาพจะถูกยกเลิก</li></ul>
            <div>
              <label className="text-xs text-[#334155]/50 block mb-1">พิมพ์ "ลบข้อมูล" เพื่อยืนยัน</label>
              <input type="text" value={deleteConfirmText} onChange={e => setDeleteConfirmText(e.target.value)} placeholder="ลบข้อมูล"
                className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-[#1B2B5B] placeholder-gray-400 focus:outline-none focus:border-red-400" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 bg-gray-100 text-[#334155] rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button onClick={() => { if (deleteConfirmText === 'ลบข้อมูล') { setShowDeleteModal(false); setDeleteConfirmText(''); triggerToast('ส่งคำขอลบข้อมูลเรียบร้อย'); } }}
                disabled={deleteConfirmText !== 'ลบข้อมูล'} className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${deleteConfirmText === 'ลบข้อมูล' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>ยืนยันลบ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
