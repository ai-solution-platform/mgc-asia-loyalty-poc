import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Award, BarChart3, Settings, Target, Bell, LogOut, Megaphone, Ticket } from 'lucide-react';
import { useState } from 'react';

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

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-xs shrink-0">M</div>
          {!collapsed && <span className="font-bold text-sm">MOBILIFE Admin</span>}
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {sidebarItems.map(item => {
            const isActive = item.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? 'bg-orange-500/10 text-orange-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-2 border-t border-slate-800">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-all">
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/50">
          <div className="text-sm text-slate-400">MGC-ASIA MOBILIFE Loyalty Platform — Operation Portal</div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">A</div>
              <span className="text-slate-300">Admin User</span>
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
