import { dashboardStats } from '../../data/mockData';
import { Users, TrendingUp, Award, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const COLORS = ['#94a3b8', '#60a5fa', '#a78bfa', '#06b6d4'];

export default function DashboardPage() {
  const s = dashboardStats;

  const kpis = [
    { label: 'Total Members', value: s.totalMembers.toLocaleString(), change: '+5.2%', up: true, icon: Users, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Active Members', value: s.activeMembers.toLocaleString(), change: '+3.8%', up: true, icon: Users, color: 'text-green-400 bg-green-500/10' },
    { label: 'Outstanding Points', value: `${(s.outstandingPoints/1000000).toFixed(0)}M`, change: '+12.5%', up: true, icon: TrendingUp, color: 'text-orange-400 bg-orange-500/10' },
    { label: 'Active Campaigns', value: s.activeCampaigns.toString(), change: '+2', up: true, icon: Target, color: 'text-purple-400 bg-purple-500/10' },
    { label: 'Redemption Rate', value: `${s.redemptionRate}%`, change: '+2.1%', up: true, icon: Award, color: 'text-cyan-400 bg-cyan-500/10' },
    { label: 'New This Month', value: s.newMembersThisMonth.toLocaleString(), change: '+19%', up: true, icon: ArrowUpRight, color: 'text-emerald-400 bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">MOBILIFE Loyalty Platform Overview — March 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi.color}`}>
                <kpi.icon size={18} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
                {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.change}
              </span>
            </div>
            <div className="text-xl font-bold">{kpi.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Trend Chart */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={s.monthlyStats}>
              <defs>
                <linearGradient id="colorEarned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRedeemed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" tick={{fill:'#94a3b8', fontSize:11}} />
              <YAxis tick={{fill:'#94a3b8', fontSize:11}} tickFormatter={v => `${v/1000000}M`} />
              <Tooltip contentStyle={{background:'#1e293b', border:'1px solid #334155', borderRadius:'8px', color:'#f1f5f9', fontSize:'12px'}} />
              <Area type="monotone" dataKey="pointsEarned" stroke="#f97316" fill="url(#colorEarned)" name="Points Earned" />
              <Area type="monotone" dataKey="pointsRedeemed" stroke="#06b6d4" fill="url(#colorRedeemed)" name="Points Redeemed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Tier Distribution */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">Tier Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={s.tierDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="count" nameKey="tier">
                {s.tierDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{background:'#1e293b', border:'1px solid #334155', borderRadius:'8px', color:'#f1f5f9', fontSize:'12px'}} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {s.tierDistribution.map((t, i) => (
              <div key={t.tier} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{background: COLORS[i]}}></span>
                  <span className="text-slate-300">{t.tier}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{t.count.toLocaleString()}</span>
                  <span className="text-slate-500 w-10 text-right">{t.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Brands & Recent Transactions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">Top Brands by Members</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={s.topBrands} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" tick={{fill:'#94a3b8', fontSize:11}} tickFormatter={v => `${v/1000}K`} />
              <YAxis dataKey="brand" type="category" tick={{fill:'#94a3b8', fontSize:11}} width={100} />
              <Tooltip contentStyle={{background:'#1e293b', border:'1px solid #334155', borderRadius:'8px', color:'#f1f5f9', fontSize:'12px'}} />
              <Bar dataKey="members" fill="#f97316" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">Recent Transactions</h3>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {s.recentTransactions.map(txn => (
              <div key={txn.id} className="flex items-center gap-3 py-2 border-b border-slate-700/30 last:border-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${txn.type === 'earn' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                  {txn.type === 'earn' ? '+' : '-'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{txn.description}</p>
                  <p className="text-[10px] text-slate-500">{txn.brand} • {txn.date}</p>
                </div>
                <span className={`text-xs font-bold ${txn.points > 0 ? 'text-green-400' : 'text-orange-400'}`}>
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
