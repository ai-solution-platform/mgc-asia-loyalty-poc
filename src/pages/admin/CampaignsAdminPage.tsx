import { useState } from 'react';
import { campaigns } from '../../data/mockData';
import { Plus, Search } from 'lucide-react';

export default function CampaignsAdminPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = campaigns.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Campaigns</h1>
          <p className="text-sm text-slate-400 mt-1">{campaigns.length} total campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-lg text-sm text-white font-semibold hover:bg-orange-600">
          <Plus size={16} /> Create Campaign
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" placeholder="Search campaigns..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 text-sm text-slate-300">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-orange-500/20 transition-all">
            <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-4xl relative">
              {c.type === 'coupon' ? '🎫' : c.type === 'lucky_draw' ? '🎰' : c.type === 'physical' ? '🎁' : '⭐'}
              <div className="absolute top-2 right-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.status === 'active' ? 'bg-green-500/10 text-green-400' : c.status === 'draft' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-500/10 text-slate-400'}`}>
                  {c.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{c.brand}</span>
                <span className="text-[10px] text-slate-500">{c.code}</span>
              </div>
              <h3 className="font-bold text-sm mb-1">{c.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{c.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{c.startDate} — {c.endDate}</span>
                <span className="text-orange-400 font-semibold">{c.totalRedemptions}/{c.maxRedemptions}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                <div className="h-1 rounded-full bg-orange-500" style={{width: `${(c.totalRedemptions/c.maxRedemptions)*100}%`}}></div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 bg-slate-700 rounded text-xs text-slate-300 hover:bg-slate-600">View</button>
                <button className="flex-1 py-1.5 bg-orange-500/10 rounded text-xs text-orange-400 hover:bg-orange-500/20">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
