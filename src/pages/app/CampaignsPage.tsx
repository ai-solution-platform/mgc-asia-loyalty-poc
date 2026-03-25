import { useState } from 'react';
import { campaigns } from '../../data/mockData';
import { Search } from 'lucide-react';

const categories = ['All', 'Service', 'Experience', 'Merchandise', 'Points Multiplier', 'Birthday', 'Travel', 'Ultra-Premium Experience'];

export default function CampaignsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const filtered = campaigns.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    return matchSearch && matchCat && c.status === 'active';
  });

  const selected = campaigns.find(c => c.id === selectedCampaign);

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-bold">แคมเปญ</h1>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="ค้นหาแคมเปญ..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${category === cat ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="space-y-3">
        {filtered.map(campaign => (
          <div
            key={campaign.id}
            onClick={() => setSelectedCampaign(campaign.id)}
            className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden cursor-pointer hover:border-orange-500/30 transition-all"
          >
            <div className="h-36 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-5xl">
              {campaign.type === 'coupon' ? '🎫' : campaign.type === 'lucky_draw' ? '🎰' : campaign.type === 'physical' ? '🎁' : '⭐'}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{campaign.brand}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400">{campaign.type.replace('_', ' ')}</span>
              </div>
              <h3 className="font-bold text-sm mb-1">{campaign.name}</h3>
              <p className="text-xs text-slate-400 mb-3 line-clamp-2">{campaign.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  {campaign.pointsRequired > 0 ? (
                    <span className="text-sm font-bold text-orange-400">{campaign.pointsRequired.toLocaleString()} คะแนน</span>
                  ) : (
                    <span className="text-sm font-bold text-green-400">ฟรี</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500">แลกแล้ว {campaign.totalRedemptions}/{campaign.maxRedemptions}</div>
                  <div className="w-20 bg-slate-700 rounded-full h-1 mt-1">
                    <div className="h-1 rounded-full bg-orange-500" style={{width: `${(campaign.totalRedemptions/campaign.maxRedemptions)*100}%`}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center" onClick={() => setSelectedCampaign(null)}>
          <div className="bg-slate-900 rounded-t-3xl w-full max-w-md p-6 space-y-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-2"></div>
            <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-6xl">
              {selected.type === 'coupon' ? '🎫' : selected.type === 'lucky_draw' ? '🎰' : selected.type === 'physical' ? '🎁' : '⭐'}
            </div>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300">{selected.brand}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-400">{selected.category}</span>
            </div>
            <h2 className="text-lg font-bold">{selected.name}</h2>
            <p className="text-sm text-slate-400">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-slate-500">ระยะเวลา</p>
                <p className="font-semibold mt-1">{selected.startDate} — {selected.endDate}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-slate-500">จำนวนที่เหลือ</p>
                <p className="font-semibold mt-1">{(selected.maxRedemptions - selected.totalRedemptions).toLocaleString()} สิทธิ์</p>
              </div>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-sm active:scale-[0.98] transition-transform">
              {selected.pointsRequired > 0 ? `แลก ${selected.pointsRequired.toLocaleString()} คะแนน` : 'รับสิทธิ์ฟรี'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
