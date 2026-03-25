import { dashboardStats } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

export default function AnalyticsPage() {
  const s = dashboardStats;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Loyalty Program Performance Analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center">
          <p className="text-xs text-slate-500">Total Points Issued</p>
          <p className="text-2xl font-bold text-orange-400 mt-1">{(s.totalPointsIssued/1000000).toFixed(0)}M</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center">
          <p className="text-xs text-slate-500">Points Redeemed</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">{(s.totalPointsRedeemed/1000000).toFixed(0)}M</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center">
          <p className="text-xs text-slate-500">Outstanding Points</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{(s.outstandingPoints/1000000).toFixed(0)}M</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center">
          <p className="text-xs text-slate-500">Burn Rate</p>
          <p className="text-2xl font-bold text-green-400 mt-1">50%</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4">Revenue & Member Growth Trend</h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={s.monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" tick={{fill:'#94a3b8', fontSize:11}} />
            <YAxis yAxisId="left" tick={{fill:'#94a3b8', fontSize:11}} tickFormatter={v => `${v/1000000}M`} />
            <YAxis yAxisId="right" orientation="right" tick={{fill:'#94a3b8', fontSize:11}} />
            <Tooltip contentStyle={{background:'#1e293b', border:'1px solid #334155', borderRadius:'8px', color:'#f1f5f9', fontSize:'12px'}} />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} name="Revenue (฿)" dot={{fill:'#f97316'}} />
            <Line yAxisId="right" type="monotone" dataKey="newMembers" stroke="#06b6d4" strokeWidth={2} name="New Members" dot={{fill:'#06b6d4'}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Brand Performance */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4">Brand Performance — Spending vs Members</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={s.topBrands}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="brand" tick={{fill:'#94a3b8', fontSize:11}} />
            <YAxis tick={{fill:'#94a3b8', fontSize:11}} tickFormatter={v => `${v/1000000000}B`} />
            <Tooltip contentStyle={{background:'#1e293b', border:'1px solid #334155', borderRadius:'8px', color:'#f1f5f9', fontSize:'12px'}} />
            <Bar dataKey="spending" fill="#f97316" radius={[4,4,0,0]} name="Spending (฿)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
