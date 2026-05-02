import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Gift, Award, Wallet, User, Bell, ChevronLeft, MoreHorizontal } from 'lucide-react';
import { notifications } from '../../data/mockData';
import AIChatBai from '../AIChatBai';

const tabs = [
  { path: '/app', icon: Home, label: 'Home' },
  { path: '/app/campaigns', icon: Gift, label: 'Campaigns' },
  { path: '/app/rewards', icon: Award, label: 'Rewards' },
  { path: '/app/wallet', icon: Wallet, label: 'Wallet' },
  { path: '/app/profile', icon: User, label: 'Profile' },
];

const LINE_GREEN = '#06C755';

// Compact LINE wordmark used inside the LINE chrome bar
function LineMark() {
  return (
    <span
      className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[9px] font-black tracking-tight"
      style={{ background: 'white', color: LINE_GREEN, lineHeight: 1 }}
    >
      LINE
    </span>
  );
}

export default function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  // First-time visit → redirect to LINE login (once per session)
  useEffect(() => {
    const authed = sessionStorage.getItem('mobilife_line_authed');
    if (!authed) {
      navigate('/app/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1B2B5B] max-w-md mx-auto relative shadow-2xl md:my-4 md:rounded-2xl md:overflow-hidden md:border md:border-gray-200">
      {/* LINE LIFF chrome — faux LINE app top bar */}
      <div className="sticky top-0 z-50">
        {/* LINE green band */}
        <div
          className="px-3 py-1.5 flex items-center justify-between text-white"
          style={{ background: LINE_GREEN }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-[11px] font-medium hover:opacity-80"
            aria-label="Close LIFF"
          >
            <ChevronLeft size={14} strokeWidth={2.5} />
            <span>Close</span>
          </button>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide">
            <LineMark />
            <span className="opacity-95">MOBILIFE — MGC-ASIA</span>
          </div>
          <button className="p-0.5 hover:opacity-80" aria-label="More">
            <MoreHorizontal size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* MOBILIFE Header — Navy Blue */}
        <header className="bg-[#0D1B4A] px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A96E] to-[#D4A853] flex items-center justify-center font-bold text-xs text-white">M</div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm text-white tracking-wide">MOBILIFE</span>
              <span className="text-[9px] text-white/50 flex items-center gap-1">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: LINE_GREEN }}
                />
                Running in LINE LIFF
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: LINE_GREEN }}
              title="Running inside LINE Web View (LIFF)"
            >
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              LINE
            </span>
            <button onClick={() => navigate('/app/notifications')} className="relative p-2 rounded-full hover:bg-white/10 text-white">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white">{unreadCount}</span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Content */}
      <main className="pb-20 min-h-[calc(100vh-140px)]">
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

      {/* AI Chat — น้องใบเตย */}
      <AIChatBai context="customer" />
    </div>
  );
}
