import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, MessageSquare, Mail, Smartphone, Moon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function NotificationSettingsPage() {
  const navigate = useNavigate();
  const { triggerToast } = useLanguage();
  const [byType, setByType] = useState({ campaigns: true, points: true, tierChanges: true, serviceReminders: true, birthday: true });
  const [byChannel, setByChannel] = useState({ push: true, sms: true, email: true, line: false });
  const [quietHours, setQuietHours] = useState({ enabled: false, start: '22:00', end: '08:00' });

  const typeItems = [
    { key: 'campaigns', label: 'แคมเปญและโปรโมชั่น', desc: 'แจ้งเตือนแคมเปญใหม่และสิทธิพิเศษ', icon: '🎁' },
    { key: 'points', label: 'คะแนนสะสม', desc: 'ได้รับ/ใช้คะแนน, คะแนนใกล้หมดอายุ', icon: '⭐' },
    { key: 'tierChanges', label: 'การเปลี่ยนระดับสมาชิก', desc: 'เลื่อนขั้นหรือสถานะ Tier เปลี่ยน', icon: '💎' },
    { key: 'serviceReminders', label: 'การนัดหมายบริการ', desc: 'เตือนนัดหมายเซอร์วิสและทดลองขับ', icon: '🔧' },
    { key: 'birthday', label: 'วันเกิด', desc: 'ของขวัญและสิทธิพิเศษวันเกิด', icon: '🎂' },
  ];
  const channelItems = [
    { key: 'push', label: 'Push Notification', icon: Smartphone },
    { key: 'sms', label: 'SMS', icon: MessageSquare },
    { key: 'email', label: 'Email', icon: Mail },
    { key: 'line', label: 'LINE', icon: MessageSquare },
  ];

  const toggleType = (key: string) => { setByType(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] })); triggerToast('บันทึกการตั้งค่าเรียบร้อย'); };
  const toggleChannel = (key: string) => { setByChannel(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] })); triggerToast('บันทึกการตั้งค่าเรียบร้อย'); };

  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-[#1B2B5B]"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold text-[#1B2B5B]">ตั้งค่าการแจ้งเตือน</h1>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><Bell size={18} className="text-[#C9A96E]" /><h3 className="font-semibold text-sm text-[#1B2B5B]">แจ้งเตือนตามประเภท</h3></div>
        <div className="space-y-4">
          {typeItems.map(item => (
            <div key={item.key} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5"><span className="text-lg mt-0.5">{item.icon}</span><div><p className="text-xs font-medium text-[#1B2B5B]">{item.label}</p><p className="text-[10px] text-[#334155]/50 mt-0.5">{item.desc}</p></div></div>
              <button onClick={() => toggleType(item.key)} className={`w-11 h-6 rounded-full transition-all shrink-0 mt-0.5 ${byType[item.key as keyof typeof byType] ? 'bg-[#1B2B5B]' : 'bg-gray-200'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-all shadow-sm ${byType[item.key as keyof typeof byType] ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><Smartphone size={18} className="text-blue-500" /><h3 className="font-semibold text-sm text-[#1B2B5B]">ช่องทางการแจ้งเตือน</h3></div>
        <div className="space-y-4">
          {channelItems.map(item => (
            <div key={item.key} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5"><item.icon size={16} className="text-[#334155]/40" /><p className="text-xs font-medium text-[#1B2B5B]">{item.label}</p></div>
              <button onClick={() => toggleChannel(item.key)} className={`w-11 h-6 rounded-full transition-all shrink-0 ${byChannel[item.key as keyof typeof byChannel] ? 'bg-[#1B2B5B]' : 'bg-gray-200'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-all shadow-sm ${byChannel[item.key as keyof typeof byChannel] ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Moon size={18} className="text-purple-500" /><h3 className="font-semibold text-sm text-[#1B2B5B]">ช่วงเวลาห้ามรบกวน</h3></div>
          <button onClick={() => { setQuietHours(prev => ({ ...prev, enabled: !prev.enabled })); triggerToast('บันทึกการตั้งค่าเรียบร้อย'); }}
            className={`w-11 h-6 rounded-full transition-all ${quietHours.enabled ? 'bg-purple-500' : 'bg-gray-200'}`}>
            <div className={`w-5 h-5 rounded-full bg-white transition-all shadow-sm ${quietHours.enabled ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
          </button>
        </div>
        {quietHours.enabled && (
          <div className="flex items-center gap-3">
            <div className="flex-1"><label className="text-[10px] text-[#334155]/50 block mb-1">เริ่ม</label><input type="time" value={quietHours.start} onChange={e => setQuietHours(prev => ({ ...prev, start: e.target.value }))} className="w-full bg-[#F5F7FA] border border-gray-200 rounded-lg py-2 px-3 text-xs text-[#1B2B5B]" /></div>
            <span className="text-gray-300 mt-4">—</span>
            <div className="flex-1"><label className="text-[10px] text-[#334155]/50 block mb-1">สิ้นสุด</label><input type="time" value={quietHours.end} onChange={e => setQuietHours(prev => ({ ...prev, end: e.target.value }))} className="w-full bg-[#F5F7FA] border border-gray-200 rounded-lg py-2 px-3 text-xs text-[#1B2B5B]" /></div>
          </div>
        )}
      </div>
    </div>
  );
}
