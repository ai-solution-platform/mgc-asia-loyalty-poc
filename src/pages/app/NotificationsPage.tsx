import { useState } from 'react';
import { notifications as initialNotifications } from '../../data/mockData';
import { Gift, TrendingUp, Settings, Cake, ArrowLeft, CheckCheck, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Notification } from '../../types';

const iconMap = { points: TrendingUp, campaign: Gift, tier: TrendingUp, system: Settings, birthday: Cake };
const colorMap = {
  points: 'text-green-600 bg-green-50',
  campaign: 'text-[#C9A96E] bg-[#C9A96E]/10',
  tier: 'text-purple-600 bg-purple-50',
  system: 'text-gray-500 bg-gray-100',
  birthday: 'text-pink-500 bg-pink-50',
};

const typeFilters = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'points', label: 'คะแนน' },
  { key: 'campaign', label: 'แคมเปญ' },
  { key: 'tier', label: 'Tier' },
  { key: 'birthday', label: 'วันเกิด' },
  { key: 'system', label: 'ระบบ' },
];

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { triggerToast } = useLanguage();
  const [notifList, setNotifList] = useState<Notification[]>(initialNotifications);
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = notifList.filter(n => typeFilter === 'all' || n.type === typeFilter);
  const unreadCount = notifList.filter(n => !n.read).length;

  const markAsRead = (id: string) => setNotifList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllAsRead = () => { setNotifList(prev => prev.map(n => ({ ...n, read: true }))); triggerToast('อ่านทั้งหมดแล้ว'); };
  const deleteNotif = (id: string) => { setNotifList(prev => prev.filter(n => n.id !== id)); triggerToast('ลบการแจ้งเตือนแล้ว'); };

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-[#1B2B5B]"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold text-[#1B2B5B] flex-1">การแจ้งเตือน</h1>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="flex items-center gap-1 text-xs text-[#C9A96E] px-2 py-1 rounded-lg hover:bg-[#C9A96E]/10 transition-all">
            <CheckCheck size={14} /> อ่านทั้งหมด
          </button>
        )}
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {typeFilters.map(f => (
          <button key={f.key} onClick={() => setTypeFilter(f.key)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-medium transition-all ${typeFilter === f.key ? 'bg-[#1B2B5B] text-white' : 'bg-white text-[#334155] border border-gray-200'}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && <div className="text-center py-12 text-[#334155]/40 text-sm">ไม่มีการแจ้งเตือน</div>}
        {filtered.map(n => {
          const Icon = iconMap[n.type];
          return (
            <div key={n.id} onClick={() => markAsRead(n.id)}
              className={`flex gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${n.read ? 'bg-white/50 border-gray-100' : 'bg-white border-[#1B2B5B]/10 shadow-sm'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorMap[n.type]}`}><Icon size={18} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold truncate text-[#1B2B5B]">{n.title}</h3>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-[#1B2B5B] shrink-0"></span>}
                </div>
                <p className="text-[11px] text-[#334155]/60 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-[#334155]/30 mt-1">{n.date}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-lg transition-all self-center shrink-0">
                <Trash2 size={14} className="text-red-400" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
