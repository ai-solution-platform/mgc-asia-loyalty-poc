import { useState } from 'react';
import { dashboardStats, campaigns } from '../../data/mockData';
import { Download, Check, Filter } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts';

const COLORS = ['#1B2B5B', '#C9A96E', '#3B5998', '#6B8EC9', '#f59e0b', '#ef4444', '#6366f1', '#ec4899'];
type DateRange = 'today' | '7d' | '30d' | '90d';

export default function AnalyticsPage() {
  const s = dashboardStats;
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showComparison, setShowComparison] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const exportChart = (name: string) => showToast(`${name} data exported!`);

  const brands = [...new Set(s.topBrands.map(b => b.brand))];
  const filteredBrands = brandFilter === 'all' ? s.topBrands : s.topBrands.filter(b => b.brand === brandFilter);

  const comparisonStats = s.monthlyStats.map(m => ({
    ...m, prevPointsEarned: Math.round(m.pointsEarned * 0.85), prevPointsRedeemed: Math.round(m.pointsRedeemed * 0.9),
    prevRevenue: Math.round(m.revenue * 0.88), prevNewMembers: Math.round(m.newMembers * 0.82),
  }));

  const topCampaigns = campaigns.filter(c => c.status === 'active').sort((a, b) => b.totalRedemptions - a.totalRedemptions).slice(0, 8);

  const funnelData = [
    { stage: 'Visitors', count: 125000, color: '#1B2B5B' },
    { stage: 'Registered', count: 48520, color: '#C9A96E' },
    { stage: 'Active', count: 39301, color: '#3B5998' },
    { stage: 'Redeemed', count: 18500, color: '#6B8EC9' },
    { stage: 'Repeat Redeemers', count: 8200, color: '#f59e0b' },
  ];

  const tierPieData = s.tierDistribution.map(t => ({ name: t.tier, value: t.count }));

  return (
    <div className="space-y-6">
      {toast && (<div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"><Check size={16} /> {toast}</div>)}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div><h1 className="text-2xl font-bold text-[#1B2B5B]">Analytics</h1><p className="text-sm text-[#334155]/50 mt-1">Loyalty Program Performance Analytics</p></div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#F5F7FA] p-1 rounded-lg">
            {([['today', 'Today'], ['7d', '7 Days'], ['30d', '30 Days'], ['90d', '90 Days']] as [DateRange, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setDateRange(key)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${dateRange === key ? 'bg-white text-[#1B2B5B] shadow-sm' : 'text-[#334155]/50 hover:text-[#1B2B5B]'}`}>{label}</button>
            ))}
          </div>
          <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-[#334155] bg-white shadow-sm">
            <option value="all">All Brands</option>{brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <button onClick={() => setShowComparison(!showComparison)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border ${showComparison ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' : 'border-gray-200 text-[#334155]/50 bg-white'}`}>
            <Filter size={12} /> vs Previous
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm"><p className="text-xs text-[#334155]/50">Total Points Issued</p><p className="text-2xl font-bold text-[#1B2B5B] mt-1">{(s.totalPointsIssued/1000000).toFixed(0)}M</p></div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm"><p className="text-xs text-[#334155]/50">Points Redeemed</p><p className="text-2xl font-bold text-[#C9A96E] mt-1">{(s.totalPointsRedeemed/1000000).toFixed(0)}M</p></div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm"><p className="text-xs text-[#334155]/50">Outstanding Points</p><p className="text-2xl font-bold text-[#D4A853] mt-1">{(s.outstandingPoints/1000000).toFixed(0)}M</p></div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm"><p className="text-xs text-[#334155]/50">Burn Rate</p><p className="text-2xl font-bold text-green-600 mt-1">50%</p></div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-sm text-[#1B2B5B]">Revenue & Member Growth Trend</h3><button onClick={() => exportChart('Revenue Trend')} className="flex items-center gap-1 text-xs text-[#334155]/40 hover:text-[#334155]"><Download size={12} /> Export</button></div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={showComparison ? comparisonStats : s.monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{fill:'#64748b', fontSize:11}} />
            <YAxis yAxisId="left" tick={{fill:'#64748b', fontSize:11}} tickFormatter={v => `${v/1000000}M`} />
            <YAxis yAxisId="right" orientation="right" tick={{fill:'#64748b', fontSize:11}} />
            <Tooltip contentStyle={{background:'#fff', border:'1px solid #E2E8F0', borderRadius:'8px', color:'#1B2B5B', fontSize:'12px'}} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#1B2B5B" strokeWidth={2} name="Revenue" dot={{fill:'#1B2B5B'}} />
            <Line yAxisId="right" type="monotone" dataKey="newMembers" stroke="#C9A96E" strokeWidth={2} name="New Members" dot={{fill:'#C9A96E'}} />
            {showComparison && (<><Line yAxisId="left" type="monotone" dataKey="prevRevenue" stroke="#1B2B5B" strokeWidth={1} strokeDasharray="5 5" name="Prev Revenue" dot={false} /><Line yAxisId="right" type="monotone" dataKey="prevNewMembers" stroke="#C9A96E" strokeWidth={1} strokeDasharray="5 5" name="Prev Members" dot={false} /></>)}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-sm text-[#1B2B5B]">Points: Earn vs Burn</h3><button onClick={() => exportChart('Points')} className="flex items-center gap-1 text-xs text-[#334155]/40 hover:text-[#334155]"><Download size={12} /> Export</button></div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={s.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" /><XAxis dataKey="month" tick={{fill:'#64748b', fontSize:11}} /><YAxis tick={{fill:'#64748b', fontSize:11}} tickFormatter={v => `${v/1000000}M`} /><Tooltip contentStyle={{background:'#fff', border:'1px solid #E2E8F0', borderRadius:'8px', fontSize:'12px'}} /><Legend />
              <Area type="monotone" dataKey="pointsEarned" stroke="#1B2B5B" fill="#1B2B5B" fillOpacity={0.1} name="Earned" />
              <Area type="monotone" dataKey="pointsRedeemed" stroke="#C9A96E" fill="#C9A96E" fillOpacity={0.1} name="Redeemed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-sm text-[#1B2B5B]">Tier Distribution</h3><button onClick={() => exportChart('Tier Distribution')} className="flex items-center gap-1 text-xs text-[#334155]/40 hover:text-[#334155]"><Download size={12} /> Export</button></div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={tierPieData} cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={true} dataKey="value">{tierPieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip contentStyle={{background:'#fff', border:'1px solid #E2E8F0', borderRadius:'8px', fontSize:'12px'}} /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-sm text-[#1B2B5B]">Brand Performance</h3><button onClick={() => exportChart('Brand Performance')} className="flex items-center gap-1 text-xs text-[#334155]/40 hover:text-[#334155]"><Download size={12} /> Export</button></div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredBrands}><CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" /><XAxis dataKey="brand" tick={{fill:'#64748b', fontSize:11}} /><YAxis tick={{fill:'#64748b', fontSize:11}} tickFormatter={v => `${v/1000000000}B`} /><Tooltip contentStyle={{background:'#fff', border:'1px solid #E2E8F0', borderRadius:'8px', fontSize:'12px'}} /><Bar dataKey="spending" fill="#1B2B5B" radius={[4,4,0,0]} name="Spending" /></BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-sm text-[#1B2B5B]">Top Performing Campaigns</h3><button onClick={() => exportChart('Campaign Performance')} className="flex items-center gap-1 text-xs text-[#334155]/40 hover:text-[#334155]"><Download size={12} /> Export</button></div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-gray-200 text-[#334155]/50"><th className="text-left py-2 px-2 font-medium">Campaign</th><th className="text-left py-2 px-2 font-medium">Brand</th><th className="text-right py-2 px-2 font-medium">Redemptions</th><th className="text-right py-2 px-2 font-medium">Fill Rate</th></tr></thead>
              <tbody>
                {topCampaigns.map(c => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-[#F5F7FA]/50">
                    <td className="py-2 px-2 font-medium text-[#1B2B5B] truncate max-w-[160px]">{c.name}</td>
                    <td className="py-2 px-2 text-[#334155]/50">{c.brand}</td>
                    <td className="py-2 px-2 text-right text-[#334155]">{c.totalRedemptions.toLocaleString()}</td>
                    <td className="py-2 px-2 text-right"><span className={`font-medium ${(c.totalRedemptions / c.maxRedemptions) > 0.7 ? 'text-green-600' : (c.totalRedemptions / c.maxRedemptions) > 0.4 ? 'text-[#C9A96E]' : 'text-[#334155]/50'}`}>{Math.round((c.totalRedemptions / c.maxRedemptions) * 100)}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-sm text-[#1B2B5B]">Member Acquisition Funnel</h3><button onClick={() => exportChart('Acquisition Funnel')} className="flex items-center gap-1 text-xs text-[#334155]/40 hover:text-[#334155]"><Download size={12} /> Export</button></div>
          <div className="space-y-3 mt-2">
            {funnelData.map((item, i) => {
              const widthPct = (item.count / funnelData[0].count) * 100;
              return (
                <div key={item.stage}>
                  <div className="flex items-center justify-between text-xs mb-1"><span className="text-[#334155] font-medium">{item.stage}</span><span className="text-[#1B2B5B] font-bold">{item.count.toLocaleString()}</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-6 relative">
                    <div className="h-6 rounded-full flex items-center justify-end pr-2 transition-all" style={{ width: `${widthPct}%`, backgroundColor: item.color }}>
                      <span className="text-[10px] text-white font-bold">{Math.round(widthPct)}%</span>
                    </div>
                  </div>
                  {i > 0 && <p className="text-[10px] text-[#334155]/40 mt-0.5">Conversion: {Math.round((item.count / funnelData[i - 1].count) * 100)}% from {funnelData[i - 1].stage}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
