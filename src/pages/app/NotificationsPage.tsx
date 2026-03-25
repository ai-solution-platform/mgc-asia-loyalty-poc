import { notifications } from '../../data/mockData';
import { Bell, Gift, TrendingUp, Settings, Cake, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  points: TrendingUp,
  campaign: Gift,
  tier: TrendingUp,
  system: Settings,
  birthday: Cake,
};
const colorMap = {
  points: 'text-green-400 bg-green-500/10',
  campaign: 'text-orange-400 bg-orange-500/10',
  tier: 'text-purple-400 bg-purple-500/10',
  system: 'text-slate-400 bg-slate-500/10',
  birthday: 'text-pink-400 bg-pink-500/10',
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold">การแจ้งเตือน</h1>
      </div>
      <div className="space-y-2">
        {notifications.map(n => {
          const Icon = iconMap[n.type];
          return (
            <div key={n.id} className={`flex gap-3 p-3 rounded-xl border transition-all ${n.read ? 'bg-slate-800/20 border-slate-800/30' : 'bg-slate-800/50 border-orange-500/10'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorMap[n.type]}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold truncate">{n.title}</h3>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-slate-600 mt-1">{n.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
