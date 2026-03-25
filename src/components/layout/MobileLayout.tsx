import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Gift, Award, Wallet, User, Bell } from 'lucide-react';
import { notifications } from '../../data/mockData';

const tabs = [
  { path: '/app', icon: Home, label: 'Home' },
  { path: '/app/campaigns', icon: Gift, label: 'Campaigns' },
  { path: '/app/rewards', icon: Award, label: 'Rewards' },
  { path: '/app/wallet', icon: Wallet, label: 'Wallet' },
  { path: '/app/profile', icon: User, label: 'Profile' },
];

export default function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white max-w-md mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-xs">M</div>
          <span className="font-bold text-sm">MOBILIFE</span>
        </div>
        <button onClick={() => navigate('/app/notifications')} className="relative p-2 rounded-full hover:bg-slate-800">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">{unreadCount}</span>
          )}
        </button>
      </header>

      {/* Content */}
      <main className="pb-20 min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/50 z-50">
        <div className="flex items-center justify-around py-2">
          {tabs.map(tab => {
            const isActive = tab.path === '/app'
              ? location.pathname === '/app'
              : location.pathname.startsWith(tab.path);
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${isActive ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <tab.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
