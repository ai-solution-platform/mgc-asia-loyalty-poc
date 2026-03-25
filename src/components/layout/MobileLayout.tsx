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
    <div className="min-h-screen bg-[#F5F7FA] text-[#1B2B5B] max-w-md mx-auto relative">
      {/* Header — Navy Blue */}
      <header className="sticky top-0 z-40 bg-[#0D1B4A] px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A96E] to-[#D4A853] flex items-center justify-center font-bold text-xs text-white">M</div>
          <span className="font-bold text-sm text-white tracking-wide">MOBILIFE</span>
        </div>
        <button onClick={() => navigate('/app/notifications')} className="relative p-2 rounded-full hover:bg-white/10 text-white">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white">{unreadCount}</span>
          )}
        </button>
      </header>

      {/* Content */}
      <main className="pb-20 min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>

      {/* Bottom Nav — Navy Blue */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#0D1B4A] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-50">
        <div className="flex items-center justify-around py-2">
          {tabs.map(tab => {
            const isActive = tab.path === '/app'
              ? location.pathname === '/app'
              : location.pathname.startsWith(tab.path);
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${isActive ? 'text-[#D4A853]' : 'text-white/50 hover:text-white/80'}`}
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
