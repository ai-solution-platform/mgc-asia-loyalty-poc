import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser, tierConfig } from '../../data/mockData';
import { ChevronRight, LogOut, Shield, Bell as BellIcon, Globe, HelpCircle, Star, Edit3, X, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const languageOptions: Array<{ code: 'TH' | 'EN' | 'CN'; label: string; flag: string }> = [
  { code: 'TH', label: 'ไทย', flag: '🇹🇭' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'CN', label: '中文', flag: '🇨🇳' },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { language, setLanguage, triggerToast } = useLanguage();
  const tier = tierConfig[currentUser.tier];

  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: currentUser.firstName, lastName: currentUser.lastName,
    phone: currentUser.phone, email: currentUser.email,
    birthday: '1985-06-15',
    address: '123 ซ.สุขุมวิท 55 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110',
  });
  const [displayInfo, setDisplayInfo] = useState({ ...editForm });
  const [showLangPicker, setShowLangPicker] = useState(false);

  const saveProfile = () => {
    setDisplayInfo({ ...editForm });
    setShowEdit(false);
    triggerToast('บันทึกข้อมูลเรียบร้อย');
  };

  const menuItems = [
    { icon: Edit3, label: 'แก้ไขข้อมูลส่วนตัว', action: () => setShowEdit(true) },
    { icon: Star, label: 'สิทธิประโยชน์ตาม Tier', action: () => navigate('/app/tier-benefits') },
    { icon: Shield, label: 'ความเป็นส่วนตัว & PDPA', action: () => navigate('/app/privacy') },
    { icon: BellIcon, label: 'การแจ้งเตือน', action: () => navigate('/app/notification-settings') },
    { icon: Globe, label: `เปลี่ยนภาษา (${language})`, action: () => setShowLangPicker(true) },
    { icon: HelpCircle, label: 'ช่วยเหลือ & ติดต่อเรา', action: () => navigate('/app/help') },
  ];

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-[#0D1B4A] to-[#1B2B5B] rounded-2xl p-5 text-center shadow-xl">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#D4A853] mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white">
          {displayInfo.firstName[0]}
        </div>
        <h2 className="text-lg font-bold text-white">{displayInfo.firstName} {displayInfo.lastName}</h2>
        <p className="text-xs text-white/50 mt-0.5">{currentUser.memberId}</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mt-2 text-xs font-bold" style={{background: tier.bg, color: tier.color, border: `1px solid ${tier.color}33`}}>
          {tier.icon} {currentUser.tier}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
          <div><div className="text-lg font-bold text-[#D4A853]">{currentUser.points.toLocaleString()}</div><div className="text-[10px] text-white/40">คะแนน</div></div>
          <div><div className="text-lg font-bold text-white">฿{(currentUser.totalSpending/1000000).toFixed(1)}M</div><div className="text-[10px] text-white/40">ยอดใช้จ่าย</div></div>
          <div><div className="text-lg font-bold text-green-400">{currentUser.registeredBU}</div><div className="text-[10px] text-white/40">แบรนด์</div></div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-[#1B2B5B]">ข้อมูลส่วนตัว</h3>
          <button onClick={() => setShowEdit(true)} className="text-xs text-[#C9A96E] flex items-center gap-1"><Edit3 size={12} /> แก้ไข</button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div><p className="text-[#334155]/50">อีเมล</p><p className="text-[#1B2B5B]">{displayInfo.email}</p></div>
          <div><p className="text-[#334155]/50">โทรศัพท์</p><p className="text-[#1B2B5B]">{displayInfo.phone}</p></div>
          <div><p className="text-[#334155]/50">วันเกิด</p><p className="text-[#1B2B5B]">{displayInfo.birthday}</p></div>
          <div><p className="text-[#334155]/50">วันสมัคร</p><p className="text-[#1B2B5B]">{currentUser.registeredDate}</p></div>
        </div>
        {displayInfo.address && (
          <div className="text-xs"><p className="text-[#334155]/50">ที่อยู่</p><p className="text-[#1B2B5B] mt-0.5">{displayInfo.address}</p></div>
        )}
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {menuItems.map(item => (
          <button key={item.label} onClick={item.action} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-all">
            <item.icon size={18} className="text-[#1B2B5B]/40" />
            <span className="text-sm flex-1 text-left text-[#334155]">{item.label}</span>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 py-3 text-red-500 text-sm font-medium rounded-xl hover:bg-red-50 transition-all">
        <LogOut size={16} /> ออกจากระบบ
      </button>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={() => setShowEdit(false)}>
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 space-y-4 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-[#1B2B5B]">แก้ไขข้อมูลส่วนตัว</h2>
              <button onClick={() => setShowEdit(false)} className="p-1"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#334155]/50 block mb-1">ชื่อ</label>
                  <input type="text" value={editForm.firstName} onChange={e => setEditForm(p => ({...p, firstName: e.target.value}))}
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-[#1B2B5B] focus:outline-none focus:border-[#1B2B5B]/30" />
                </div>
                <div>
                  <label className="text-xs text-[#334155]/50 block mb-1">นามสกุล</label>
                  <input type="text" value={editForm.lastName} onChange={e => setEditForm(p => ({...p, lastName: e.target.value}))}
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-[#1B2B5B] focus:outline-none focus:border-[#1B2B5B]/30" />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#334155]/50 block mb-1">เบอร์โทรศัพท์</label>
                <input type="tel" value={editForm.phone} onChange={e => setEditForm(p => ({...p, phone: e.target.value}))}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-[#1B2B5B] focus:outline-none focus:border-[#1B2B5B]/30" />
              </div>
              <div>
                <label className="text-xs text-[#334155]/50 block mb-1">อีเมล</label>
                <input type="email" value={editForm.email} onChange={e => setEditForm(p => ({...p, email: e.target.value}))}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-[#1B2B5B] focus:outline-none focus:border-[#1B2B5B]/30" />
              </div>
              <div>
                <label className="text-xs text-[#334155]/50 block mb-1">วันเกิด</label>
                <input type="date" value={editForm.birthday} onChange={e => setEditForm(p => ({...p, birthday: e.target.value}))}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-[#1B2B5B] focus:outline-none focus:border-[#1B2B5B]/30" />
              </div>
              <div>
                <label className="text-xs text-[#334155]/50 block mb-1">ที่อยู่</label>
                <textarea value={editForm.address} onChange={e => setEditForm(p => ({...p, address: e.target.value}))}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-[#1B2B5B] h-20 focus:outline-none focus:border-[#1B2B5B]/30" />
              </div>
            </div>
            <button onClick={saveProfile} className="w-full py-3 bg-[#1B2B5B] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-[#0D1B4A]">
              <Check size={16} /> บันทึก
            </button>
          </div>
        </div>
      )}

      {/* Language Picker */}
      {showLangPicker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={() => setShowLangPicker(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-3 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-[#1B2B5B] mb-2">เลือกภาษา</h2>
            {languageOptions.map(opt => (
              <button key={opt.code} onClick={() => { setLanguage(opt.code); setShowLangPicker(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${language === opt.code ? 'bg-[#1B2B5B]/5 border border-[#1B2B5B]/20' : 'bg-[#F5F7FA] border border-gray-100 hover:bg-gray-100'}`}>
                <span className="text-2xl">{opt.flag}</span>
                <span className="text-sm font-medium flex-1 text-left text-[#1B2B5B]">{opt.label}</span>
                {language === opt.code && <Check size={16} className="text-[#C9A96E]" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
