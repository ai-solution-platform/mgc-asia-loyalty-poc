import { useState } from 'react';
import { coupons as initialCoupons, campaigns } from '../../data/mockData';
import type { Coupon } from '../../types';
import { Search, Ticket, Download, Check, X, Copy, BarChart3 } from 'lucide-react';

export default function CouponsAdminPage() {
  const [couponsList, setCouponsList] = useState<Coupon[]>(initialCoupons);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkCampaign, setBulkCampaign] = useState('');
  const [bulkCount, setBulkCount] = useState('10');
  const [showStats, setShowStats] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const brands = [...new Set(couponsList.map(c => c.brand))];

  const filtered = couponsList.filter(c => {
    const matchSearch = c.code.toLowerCase().includes(search.toLowerCase()) || c.campaignName.toLowerCase().includes(search.toLowerCase()) || c.discount.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchBrand = brandFilter === 'all' || c.brand === brandFilter;
    return matchSearch && matchStatus && matchBrand;
  });

  const stats = {
    total: couponsList.length,
    available: couponsList.filter(c => c.status === 'available').length,
    used: couponsList.filter(c => c.status === 'used').length,
    expired: couponsList.filter(c => c.status === 'expired').length,
    suspended: couponsList.filter(c => c.status === 'suspended').length,
  };

  const generateBulk = () => {
    if (!bulkCampaign || !bulkCount) return;
    const count = parseInt(bulkCount);
    if (isNaN(count) || count <= 0) return;
    const campaign = campaigns.find(c => c.id === bulkCampaign);
    if (!campaign) return;

    const newCoupons: Coupon[] = Array.from({ length: count }, (_, i) => ({
      id: `cp-gen-${Date.now()}-${i}`,
      code: `${campaign.code}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      campaignId: campaign.id,
      campaignName: campaign.name,
      status: 'available' as const,
      discount: `Campaign: ${campaign.name}`,
      expiryDate: campaign.endDate,
      image: '',
      brand: campaign.brand,
      description: campaign.description,
    }));

    setCouponsList(prev => [...prev, ...newCoupons]);
    setShowBulkModal(false);
    setBulkCampaign('');
    setBulkCount('10');
    showToast(`Generated ${count} coupons successfully!`);
  };

  const toggleSuspend = (id: string) => {
    setCouponsList(prev => prev.map(c => {
      if (c.id !== id) return c;
      return { ...c, status: c.status === 'suspended' ? 'available' : 'suspended' } as Coupon;
    }));
    showToast('Coupon status updated!');
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Copied: ${code}`);
  };

  const exportCoupons = () => showToast('Coupons exported successfully!');

  const statusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'used': return 'bg-blue-100 text-blue-700';
      case 'expired': return 'bg-slate-100 text-slate-500';
      case 'suspended': return 'bg-red-100 text-red-600';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check size={16} /> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2B5B]">Coupons Management</h1>
          <p className="text-sm text-slate-500 mt-1">{couponsList.length} total coupons</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowStats(!showStats)} className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
            <BarChart3 size={14} /> Stats
          </button>
          <button onClick={exportCoupons} className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
            <Download size={14} /> Export
          </button>
          <button onClick={() => setShowBulkModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] rounded-lg text-sm text-white font-semibold hover:bg-[#B8944D]">
            <Ticket size={16} /> Bulk Generate
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {showStats && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(stats).map(([key, val]) => (
            <div key={key} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
              <p className="text-xs text-slate-500 capitalize">{key}</p>
              <p className="text-2xl font-bold text-[#1B2B5B] mt-1">{val}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by code, campaign, or discount..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C9A96E]" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 text-sm text-slate-600">
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="used">Used</option>
          <option value="expired">Expired</option>
          <option value="suspended">Suspended</option>
        </select>
        <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 text-sm text-slate-600">
          <option value="all">All Brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Coupons Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                <th className="text-left py-3 px-4 font-medium">Code</th>
                <th className="text-left py-3 px-4 font-medium">Campaign</th>
                <th className="text-left py-3 px-4 font-medium">Discount</th>
                <th className="text-left py-3 px-4 font-medium">Brand</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Expiry</th>
                <th className="text-left py-3 px-4 font-medium">Used Date</th>
                <th className="text-center py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">{c.code}</code>
                      <button onClick={() => copyCode(c.code)} className="text-slate-400 hover:text-slate-600"><Copy size={12} /></button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600">{c.campaignName}</td>
                  <td className="py-3 px-4 text-xs font-medium text-slate-900">{c.discount}</td>
                  <td className="py-3 px-4 text-xs text-slate-500">{c.brand}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(c.status)}`}>{c.status}</span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-500">{c.expiryDate}</td>
                  <td className="py-3 px-4 text-xs text-slate-400">{c.usedDate || '—'}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleSuspend(c.id)}
                      disabled={c.status === 'used' || c.status === 'expired'}
                      className={`text-xs px-2 py-1 rounded ${c.status === 'used' || c.status === 'expired' ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      {c.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Generate Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowBulkModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Bulk Generate Coupons</h2>
              <button onClick={() => setShowBulkModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Campaign *</label>
                <select value={bulkCampaign} onChange={e => setBulkCampaign(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm">
                  <option value="">Select campaign...</option>
                  {campaigns.filter(c => c.status === 'active').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Number of Coupons *</label>
                <input type="number" value={bulkCount} onChange={e => setBulkCount(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#C9A96E]" min="1" max="1000" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowBulkModal(false)} className="flex-1 py-2 border border-slate-300 rounded-lg text-sm text-slate-600">Cancel</button>
                <button onClick={generateBulk} className="flex-1 py-2 bg-[#C9A96E] text-white rounded-lg text-sm font-semibold hover:bg-[#B8944D]">Generate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
