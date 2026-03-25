import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardStats, pointTransactions, members } from '../../data/mockData';
import { Users, TrendingUp, Award, Target, ArrowUpRight, ArrowDownRight, Calendar, Plus, UserPlus, Download, Check } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const COLORS = ['#1B2B5B', '#C9A96E', '#3B5998', '#6B8EC9'];

type DateRange = 'today' | '7d' | '30d' | 'custom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const s = dashboardStats;
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // Recent activity feed with member info
  const recentActivity = pointTransactions.slice(0, 12).map(txn => {
    const member = members.find(m => m.id === txn.memberId);
    return { ...txn, memberName: member ? `${member.firstName} ${member.lastName}` : 'Unknown', memberCode: member?.memberId || '' };
  });

  const kpis = [
    { label: 'Total Members', value: s.totalMembers.toLocaleString(), change: '+5.2%', up: true, icon: Users, color: 'text-[#1B2B5B] bg-[#1B2B5B]/5', route: '/admin/members' },
    { label: 'Active Members', value: s.activeMembers.toLocaleString(), change: '+3.8%', up: true, icon: Users, color: 'text-green-600 bg-green-50', route: '/admin/members' },
    { label: 'Outstanding Points', value: `${(s.outstandingPoints/1000000).toFixed(0)}M`, change: '+12.5%', up: true, icon: TrendingUp, color: 'text-[#C9A96E] bg-[#C9A96E]/10', route: '/admin/analytics' },
    { label: 'Active Campaigns', value: s.activeCampaigns.toString(), change: '+2', up: true, icon: Target, color: 'text-purple-600 bg-purple-50', route: '/admin/campaigns' },
    { label: 'Redemption Rate', value: `${s.redemptionRate}%`, change: '+2.1%', up: true, icon: Award, color: 'text-cyan-600 bg-cyan-50', route: '/admin/analytics' },
    { label: 'New This Month', value: s.newMembersThisMonth.toLocaleString(), change: '+19%', up: true, icon: ArrowUpRight, color: 'text-emerald-600 bg-emerald-50', route: '/admin/members' },
  ];

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check size={16} /> {toast}
        </div>
      )}

      {/* Header with Date Range and Quick Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2B5B]">Dashboard</h1>
          <p className="text-sm text-[#334155]/50 mt-1">MOBILIFE Loyalty Platform Overview — March 2026</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center gap-1 bg-[#F5F7FA] p-1 rounded-lg">
            {([['today', 'Today'], ['7d', '7 Days'], ['30d', '30 Days']] as [DateRange, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setDateRange(key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${dateRange === key ? 'bg-white text-[#1B2B5B] shadow-sm' : 'text-[#334155]/50 hover:text-[#1B2B5B]'}`}>
                {label}
              </button>
            ))}
            <button onClick={() => setDateRange('custom')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${dateRange === 'custom' ? 'bg-white text-[#1B2B5B] shadow-sm' : 'text-[#334155]/50 hover:text-[#1B2B5B]'}`}>
              <Calendar size={12} /> Custom
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => navigate('/admin/campaigns')} className="flex items-center gap-2 px-4 py-2 bg-[#1B2B5B] rounded-lg text-xs text-white font-semibold hover:bg-[#0D1B4A] transition-colors shadow-sm">
          <Plus size={14} /> Create Campaign
        </button>
        <button onClick={() => navigate('/admin/members')} className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] rounded-lg text-xs text-white font-semibold hover:bg-[#B8944D] transition-colors shadow-sm">
          <UserPlus size={14} /> Add Member
        </button>
        <button onClick={() => showToast('Report exported successfully!')} className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-xs text-[#334155] font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* KPI Cards — Clickable */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} onClick={() => navigate(kpi.route)}
            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md hover:border-[#C9A96E]/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi.color}`}>
                <kpi.icon size={18} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.change}
              </span>
            </div>
            <div className="text-xl font-bold text-[#1B2B5B]">{kpi.value}</div>
            <div className="text-xs text-[#334155]/50 mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Trend Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-sm mb-4 text-[#1B2B5B]">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={s.monthlyStats}>
              <defs>
                <linearGradient id="colorEarned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B2B5B" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#1B2B5B" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRedeemed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#C9A96E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{fill:'#64748b', fontSize:11}} />
              <YAxis tick={{fill:'#64748b', fontSize:11}} tickFormatter={v => `${v/1000000}M`} />
              <Tooltip contentStyle={{background:'#fff', border:'1px solid #E2E8F0', borderRadius:'8px', color:'#1B2B5B', fontSize:'12px'}} />
              <Area type="monotone" dataKey="pointsEarned" stroke="#1B2B5B" fill="url(#colorEarned)" name="Points Earned" />
              <Area type="monotone" dataKey="pointsRedeemed" stroke="#C9A96E" fill="url(#colorRedeemed)" name="Points Redeemed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Tier Distribution */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-sm mb-4 text-[#1B2B5B]">Tier Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={s.tierDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="count" nameKey="tier">
                {s.tierDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{background:'#fff', border:'1px solid #E2E8F0', borderRadius:'8px', color:'#1B2B5B', fontSize:'12px'}} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {s.tierDistribution.map((t, i) => (
              <div key={t.tier} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{background: COLORS[i]}}></span>
                  <span className="text-[#334155]">{t.tier}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#334155]/60">{t.count.toLocaleString()}</span>
                  <span className="text-[#334155]/40 w-10 text-right">{t.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Brands & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-sm mb-4 text-[#1B2B5B]">Top Brands by Members</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={s.topBrands} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" tick={{fill:'#64748b', fontSize:11}} tickFormatter={v => `${v/1000}K`} />
              <YAxis dataKey="brand" type="category" tick={{fill:'#64748b', fontSize:11}} width={100} />
              <Tooltip contentStyle={{background:'#fff', border:'1px solid #E2E8F0', borderRadius:'8px', color:'#1B2B5B', fontSize:'12px'}} />
              <Bar dataKey="members" fill="#1B2B5B" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-[#1B2B5B]">Recent Activity</h3>
            <button onClick={() => navigate('/admin/analytics')} className="text-xs text-[#C9A96E] hover:underline">View All</button>
          </div>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {recentActivity.map(txn => (
              <div key={txn.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${txn.type === 'earn' ? 'bg-green-50 text-green-600' : txn.type === 'redeem' ? 'bg-[#C9A96E]/10 text-[#C9A96E]' : 'bg-blue-50 text-blue-600'}`}>
                  {txn.type === 'earn' ? '+' : txn.type === 'redeem' ? '-' : '~'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#1B2B5B] truncate">{txn.description}</p>
                  <p className="text-[10px] text-[#334155]/40">{txn.memberName} &bull; {txn.brand} &bull; {txn.date}</p>
                </div>
                <span className={`text-xs font-bold ${txn.points > 0 ? 'text-green-600' : 'text-[#C9A96E]'}`}>
                  {txn.points > 0 ? '+' : ''}{txn.points.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
