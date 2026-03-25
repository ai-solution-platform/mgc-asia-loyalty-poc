import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Award, BarChart3, Settings, Target, Bell, LogOut, Megaphone, Ticket, User, ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const sidebarItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/members', icon: Users, label: 'Members' },
  { path: '/admin/campaigns', icon: Target, label: 'Campaigns' },
  { path: '/admin/rewards', icon: Award, label: 'Rewards' },
  { path: '/admin/coupons', icon: Ticket, label: 'Coupons' },
  { path: '/admin/communications', icon: Megaphone, label: 'Communications' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

const recentNotifications = [
  { id: 1, title: 'New member registered', message: 'สมชาย วัฒนศิริ just registered via BMW BU', time: '5 min ago', read: false },
  { id: 2, title: 'Campaign threshold reached', message: 'BMW Summer Drive at 80% redemption capacity', time: '1 hour ago', read: false },
  { id: 3, title: 'Low stock alert', message: 'Rolls-Royce Umbrella reward: only 12 units left', time: '2 hours ago', read: false },
  { id: 4, title: 'Points adjustment', message: 'Manual point adjustment of +5,000 for MOB-2024-00003', time: '3 hours ago', read: true },
  { id: 5, title: 'System update', message: 'Scheduled maintenance window tonight 02:00-04:00', time: '5 hours ago', read: true },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(recentNotifications);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1B2B5B] flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-gradient-to-b from-[#0D1B4A] to-[#152249] flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A96E] to-[#D4A853] flex items-center justify-center font-bold text-xs text-white shrink-0">M</div>
          {!collapsed && <span className="font-bold text-sm text-white tracking-wide">MOBILIFE Admin</span>}
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {sidebarItems.map(item => {
            const isActive = item.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? 'bg-[#C9A96E]/15 text-[#D4A853]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-2 border-t border-white/10">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-red-400 transition-all">
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 shrink-0 bg-white shadow-sm">
          <div className="text-sm text-[#1B2B5B]/60">MGC-ASIA MOBILIFE Loyalty Platform — Operation Portal</div>
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                className="relative p-2 rounded-lg hover:bg-gray-100 text-[#1B2B5B]/60">
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold px-1">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <div className="flex items-center justify-between p-3 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-[10px] text-[#C9A96E] hover:underline">Mark all read</button>
                      )}
                      <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                    </div>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`px-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer ${!n.read ? 'bg-blue-50/50' : ''}`}
                        onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}>
                        <div className="flex items-start gap-2">
                          {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>}
                          <div className={!n.read ? '' : 'ml-4'}>
                            <p className="text-xs font-medium text-slate-900">{n.title}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{n.message}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-200">
                    <button onClick={() => { setShowNotifications(false); navigate('/admin/communications'); }}
                      className="w-full text-center text-xs text-[#C9A96E] hover:underline py-1">View All Notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userRef}>
              <button onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                className="flex items-center gap-2 text-sm hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors">
                <div className="w-7 h-7 rounded-full bg-[#1B2B5B]/10 flex items-center justify-center text-[#1B2B5B] text-xs font-bold">A</div>
                <span className="text-[#334155]">Admin User</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <div className="p-3 border-b border-slate-200">
                    <p className="text-xs font-bold text-slate-900">Admin MOBILIFE</p>
                    <p className="text-[10px] text-slate-400">admin@mobilife.co.th</p>
                  </div>
                  <div className="p-1">
                    <button onClick={() => { setShowUserMenu(false); navigate('/admin/settings'); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-lg">
                      <User size={14} /> Profile
                    </button>
                    <button onClick={() => { setShowUserMenu(false); navigate('/admin/settings'); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-lg">
                      <Settings size={14} /> Settings
                    </button>
                    <button onClick={() => { setShowUserMenu(false); navigate('/'); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 rounded-lg">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
