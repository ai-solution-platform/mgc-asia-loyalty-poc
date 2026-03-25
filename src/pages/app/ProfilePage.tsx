import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser, tierConfig } from '../../data/mockData';
import { ChevronRight, LogOut, Shield, Bell as BellIcon, Globe, HelpCircle, Star, Edit3 } from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const tier = tierConfig[currentUser.tier];
  const [consents, setConsents] = useState({ sms: true, email: true, push: true, line: true });

  const menuItems = [
    { icon: Edit3, label: 'แก้ไขข้อมูลส่วนตัว', action: () => {} },
    { icon: Star, label: 'สิทธิประโยชน์ตาม Tier', action: () => {} },
    { icon: Shield, label: 'ความเป็นส่วนตัว & PDPA', action: () => {} },
    { icon: BellIcon, label: 'การแจ้งเตือน', action: () => {} },
    { icon: Globe, label: 'เปลี่ยนภาษา (TH/EN)', action: () => {} },
    { icon: HelpCircle, label: 'ช่วยเหลือ & ติดต่อเรา', action: () => {} },
  ];

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700/50 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mx-auto mb-3 flex items-center justify-center text-2xl font-bold">
          {currentUser.firstName[0]}
        </div>
        <h2 className="text-lg font-bold">{currentUser.firstName} {currentUser.lastName}</h2>
        <p className="text-xs text-slate-400 mt-0.5">{currentUser.memberId}</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mt-2 text-xs font-bold" style={{background: tier.bg, color: tier.color, border: `1px solid ${tier.color}33`}}>
          {tier.icon} {currentUser.tier}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700/50">
          <div>
            <div className="text-lg font-bold text-orange-400">{currentUser.points.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500">คะแนน</div>
          </div>
          <div>
            <div className="text-lg font-bold">฿{(currentUser.totalSpending/1000000).toFixed(1)}M</div>
            <div className="text-[10px] text-slate-500">ยอดใช้จ่าย</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">{currentUser.registeredBU}</div>
            <div className="text-[10px] text-slate-500">แบรนด์</div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="glass rounded-xl p-4 space-y-3 bg-slate-800/30 border border-slate-700/30">
        <h3 className="font-semibold text-sm mb-2">ข้อมูลส่วนตัว</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div><p className="text-slate-500">อีเมล</p><p>{currentUser.email}</p></div>
          <div><p className="text-slate-500">โทรศัพท์</p><p>{currentUser.phone}</p></div>
          <div><p className="text-slate-500">ประเภท</p><p>{currentUser.memberType}</p></div>
          <div><p className="text-slate-500">วันสมัคร</p><p>{currentUser.registeredDate}</p></div>
        </div>
      </div>

      {/* Consent Management */}
      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
        <h3 className="font-semibold text-sm mb-3">การยินยอมรับข้อมูล</h3>
        <div className="space-y-3">
          {Object.entries(consents).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-xs text-slate-300 capitalize">{key === 'line' ? 'LINE OA' : key.toUpperCase()}</span>
              <button
                onClick={() => setConsents(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`w-10 h-5 rounded-full transition-all ${value ? 'bg-orange-500' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${value ? 'translate-x-5.5' : 'translate-x-0.5'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {menuItems.map(item => (
          <button key={item.label} onClick={item.action} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 transition-all">
            <item.icon size={18} className="text-slate-400" />
            <span className="text-sm flex-1 text-left">{item.label}</span>
            <ChevronRight size={16} className="text-slate-600" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 py-3 text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/5 transition-all">
        <LogOut size={16} />
        ออกจากระบบ
      </button>
    </div>
  );
}
