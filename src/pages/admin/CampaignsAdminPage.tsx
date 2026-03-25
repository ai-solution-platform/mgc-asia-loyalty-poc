import { useState } from 'react';
import { campaigns as initialCampaigns } from '../../data/mockData';
import type { Campaign } from '../../types';
import { Plus, Search, X, Check, Copy, Pause, Play, Square, Eye, Edit, BarChart3 } from 'lucide-react';

export default function CampaignsAdminPage() {
  const [campaignsList, setCampaignsList] = useState<Campaign[]>(initialCampaigns);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [viewCampaign, setViewCampaign] = useState<Campaign | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const brands = [...new Set(campaignsList.map(c => c.brand))];

  const filtered = campaignsList.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchBrand = brandFilter === 'all' || c.brand === brandFilter;
    return matchSearch && matchStatus && matchBrand;
  });

  const emptyForm: Campaign = { id: '', name: '', nameEN: '', code: '', type: 'coupon', status: 'draft', startDate: '', endDate: '', targetAudience: 'all', pointsRequired: 0, totalRedemptions: 0, maxRedemptions: 100, image: '', description: '', brand: '', category: '' };
  const [form, setForm] = useState<Campaign>(emptyForm);

  const openCreate = () => { setForm({ ...emptyForm, id: `c${Date.now()}`, code: `MGC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026` }); setShowCreateModal(true); };
  const openEdit = (c: Campaign) => { setForm({ ...c }); setEditingCampaign(c); };

  const saveCampaign = () => {
    if (!form.name || !form.brand) return;
    if (editingCampaign) {
      setCampaignsList(prev => prev.map(c => c.id === form.id ? form : c));
      setEditingCampaign(null);
      showToast('Campaign updated successfully!');
    } else {
      setCampaignsList(prev => [...prev, form]);
      setShowCreateModal(false);
      showToast('Campaign created successfully!');
    }
  };

  const duplicateCampaign = (c: Campaign) => {
    const dup: Campaign = { ...c, id: `c${Date.now()}`, name: `${c.name} (Copy)`, nameEN: `${c.nameEN} (Copy)`, code: `${c.code}-DUP`, status: 'draft', totalRedemptions: 0 };
    setCampaignsList(prev => [...prev, dup]);
    showToast('Campaign duplicated!');
  };

  const pauseCampaign = (id: string) => { setCampaignsList(prev => prev.map(c => c.id === id ? { ...c, status: 'inactive' as Campaign['status'] } : c)); showToast('Campaign paused!'); };
  const resumeCampaign = (id: string) => { setCampaignsList(prev => prev.map(c => c.id === id ? { ...c, status: 'active' as Campaign['status'] } : c)); showToast('Campaign resumed!'); };
  const endCampaign = (id: string) => { setCampaignsList(prev => prev.map(c => c.id === id ? { ...c, status: 'expired' as Campaign['status'] } : c)); showToast('Campaign ended!'); };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-600';
      case 'draft': return 'bg-yellow-50 text-yellow-600';
      case 'inactive': return 'bg-gray-100 text-gray-500';
      case 'expired': return 'bg-red-50 text-red-500';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const CampaignForm = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#1B2B5B]">{editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#1B2B5B]"><X size={20} /></button>
        </div>
        <div className="space-y-4">
          <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Campaign Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value, nameEN: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" placeholder="Campaign name" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Type *</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Campaign['type'] })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm"><option value="coupon">Coupon</option><option value="lucky_draw">Lucky Draw</option><option value="physical">Physical</option><option value="points">Points</option></select></div>
            <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Brand *</label><input type="text" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm" placeholder="Brand" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Start Date *</label><input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm" /></div>
            <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">End Date *</label><input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Points Cost</label><input type="number" value={form.pointsRequired} onChange={e => setForm({ ...form, pointsRequired: parseInt(e.target.value) || 0 })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm" /></div>
            <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Max Redemptions</label><input type="number" value={form.maxRedemptions} onChange={e => setForm({ ...form, maxRedemptions: parseInt(e.target.value) || 0 })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Target Audience</label><select value={form.targetAudience} onChange={e => setForm({ ...form, targetAudience: e.target.value as Campaign['targetAudience'] })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm"><option value="all">All Members</option><option value="diamond">Diamond+</option><option value="black_diamond">Black Diamond+</option><option value="infinite_blue">Infinite Blue Diamond</option></select></div>
            <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Category</label><input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm" placeholder="e.g. Service" /></div>
          </div>
          <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Status</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Campaign['status'] })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm"><option value="draft">Draft</option><option value="active">Active</option><option value="inactive">Paused</option></select></div>
          <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm h-20 resize-none" placeholder="Campaign description" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-[#334155]">Cancel</button>
            <button onClick={saveCampaign} className="flex-1 py-2.5 bg-[#1B2B5B] text-white rounded-lg text-sm font-semibold hover:bg-[#0D1B4A]">{editingCampaign ? 'Save Changes' : 'Create Campaign'}</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {toast && (<div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"><Check size={16} /> {toast}</div>)}

      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-[#1B2B5B]">Campaigns</h1><p className="text-sm text-[#334155]/50 mt-1">{campaignsList.length} total campaigns</p></div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[#1B2B5B] rounded-lg text-sm text-white font-semibold hover:bg-[#0D1B4A] shadow-sm"><Plus size={16} /> Create Campaign</button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search campaigns..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm text-[#1B2B5B] placeholder-gray-400 focus:outline-none focus:border-[#1B2B5B]/30 shadow-sm" /></div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 text-sm text-[#334155] shadow-sm"><option value="all">All Status</option><option value="active">Active</option><option value="inactive">Paused</option><option value="draft">Draft</option><option value="expired">Expired</option></select>
        <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 text-sm text-[#334155] shadow-sm"><option value="all">All Brands</option>{brands.map(b => <option key={b} value={b}>{b}</option>)}</select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-[#1B2B5B]/20 transition-all shadow-sm hover:shadow-md">
            <div className="h-32 bg-gradient-to-br from-[#F5F7FA] to-gray-100 flex items-center justify-center text-4xl relative">
              {c.type === 'coupon' ? '🎫' : c.type === 'lucky_draw' ? '🎰' : c.type === 'physical' ? '🎁' : '⭐'}
              <div className="absolute top-2 right-2"><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusBadge(c.status)}`}>{c.status}</span></div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B2B5B]/5 text-[#1B2B5B]">{c.brand}</span>
                <span className="text-[10px] text-[#334155]/40">{c.code}</span>
              </div>
              <h3 className="font-bold text-sm mb-1 text-[#1B2B5B]">{c.name}</h3>
              <p className="text-xs text-[#334155]/60 line-clamp-2 mb-3">{c.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#334155]/40">{c.startDate} — {c.endDate}</span>
                <span className="text-[#C9A96E] font-semibold">{c.totalRedemptions}/{c.maxRedemptions}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1 mt-2">
                <div className="h-1 rounded-full bg-[#1B2B5B]" style={{width: `${Math.min((c.totalRedemptions/c.maxRedemptions)*100, 100)}%`}}></div>
              </div>
              <div className="flex gap-1 mt-3">
                <button onClick={() => setViewCampaign(c)} className="flex-1 py-1.5 bg-[#F5F7FA] rounded text-xs text-[#334155] hover:bg-gray-100 flex items-center justify-center gap-1"><Eye size={12} /> View</button>
                <button onClick={() => openEdit(c)} className="flex-1 py-1.5 bg-[#1B2B5B]/5 rounded text-xs text-[#1B2B5B] hover:bg-[#1B2B5B]/10 flex items-center justify-center gap-1"><Edit size={12} /> Edit</button>
                <button onClick={() => duplicateCampaign(c)} className="py-1.5 px-2 bg-[#F5F7FA] rounded text-xs text-[#334155]/60 hover:bg-gray-100" title="Duplicate"><Copy size={12} /></button>
                {c.status === 'active' && <button onClick={() => pauseCampaign(c.id)} className="py-1.5 px-2 bg-yellow-50 rounded text-xs text-yellow-600 hover:bg-yellow-100" title="Pause"><Pause size={12} /></button>}
                {c.status === 'inactive' && <button onClick={() => resumeCampaign(c.id)} className="py-1.5 px-2 bg-green-50 rounded text-xs text-green-600 hover:bg-green-100" title="Resume"><Play size={12} /></button>}
                {(c.status === 'active' || c.status === 'inactive') && <button onClick={() => endCampaign(c.id)} className="py-1.5 px-2 bg-red-50 rounded text-xs text-red-500 hover:bg-red-100" title="End"><Square size={12} /></button>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {(showCreateModal || editingCampaign) && <CampaignForm onClose={() => { setShowCreateModal(false); setEditingCampaign(null); }} />}

      {viewCampaign && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setViewCampaign(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-[#1B2B5B]">Campaign Details</h2><button onClick={() => setViewCampaign(null)} className="text-gray-400"><X size={20} /></button></div>
            <div className="space-y-3">
              <div><p className="text-xs text-[#334155]/50">Name</p><p className="text-sm font-bold text-[#1B2B5B]">{viewCampaign.name}</p></div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><p className="text-[#334155]/50">Code</p><p className="font-medium font-mono text-[#1B2B5B]">{viewCampaign.code}</p></div>
                <div><p className="text-[#334155]/50">Brand</p><p className="font-medium text-[#1B2B5B]">{viewCampaign.brand}</p></div>
                <div><p className="text-[#334155]/50">Type</p><p className="font-medium capitalize text-[#1B2B5B]">{viewCampaign.type.replace('_', ' ')}</p></div>
                <div><p className="text-[#334155]/50">Status</p><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge(viewCampaign.status)}`}>{viewCampaign.status}</span></div>
                <div><p className="text-[#334155]/50">Start</p><p className="font-medium text-[#1B2B5B]">{viewCampaign.startDate}</p></div>
                <div><p className="text-[#334155]/50">End</p><p className="font-medium text-[#1B2B5B]">{viewCampaign.endDate}</p></div>
                <div><p className="text-[#334155]/50">Points Required</p><p className="font-medium text-[#C9A96E]">{viewCampaign.pointsRequired.toLocaleString()}</p></div>
                <div><p className="text-[#334155]/50">Target</p><p className="font-medium capitalize text-[#1B2B5B]">{viewCampaign.targetAudience.replace('_', ' ')}</p></div>
              </div>
              <div><p className="text-xs text-[#334155]/50">Description</p><p className="text-sm text-[#334155]">{viewCampaign.description}</p></div>
              <div className="bg-[#F5F7FA] rounded-lg p-3">
                <div className="flex items-center gap-1 mb-2"><BarChart3 size={14} className="text-[#334155]/50" /><p className="text-xs font-medium text-[#334155]/60">Campaign Analytics</p></div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><p className="text-xs text-[#334155]/40">Redemptions</p><p className="font-bold text-sm text-[#1B2B5B]">{viewCampaign.totalRedemptions}</p></div>
                  <div><p className="text-xs text-[#334155]/40">Max</p><p className="font-bold text-sm text-[#1B2B5B]">{viewCampaign.maxRedemptions}</p></div>
                  <div><p className="text-xs text-[#334155]/40">Fill Rate</p><p className="font-bold text-sm text-[#C9A96E]">{Math.round((viewCampaign.totalRedemptions / viewCampaign.maxRedemptions) * 100)}%</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
