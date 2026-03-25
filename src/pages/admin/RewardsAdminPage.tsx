import { useState } from 'react';
import { rewards as initialRewards, pointTransactions } from '../../data/mockData';
import type { Reward } from '../../types';
import { Search, Plus, Package, Edit, BarChart3, Archive, X, Check } from 'lucide-react';

export default function RewardsAdminPage() {
  const [rewardsList, setRewardsList] = useState<Reward[]>(initialRewards);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [stockReward, setStockReward] = useState<Reward | null>(null);
  const [stockAmount, setStockAmount] = useState('');
  const [historyReward, setHistoryReward] = useState<Reward | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const brands = [...new Set(rewardsList.map(r => r.brand))];

  const filtered = rewardsList.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchBrand = brandFilter === 'all' || r.brand === brandFilter;
    return matchSearch && matchStatus && matchBrand;
  });

  const emptyForm: Reward = { id: '', name: '', type: 'physical', pointsCost: 0, stock: 0, totalRedeemed: 0, image: '', brand: '', description: '', status: 'active' };
  const [form, setForm] = useState<Reward>(emptyForm);

  const openCreate = () => { setForm({ ...emptyForm, id: `r${Date.now()}` }); setShowCreateModal(true); };
  const openEdit = (r: Reward) => { setForm({ ...r }); setEditingReward(r); };

  const saveReward = () => {
    if (!form.name || !form.brand) return;
    if (editingReward) {
      setRewardsList(prev => prev.map(r => r.id === form.id ? form : r));
      setEditingReward(null);
      showToast('Reward updated successfully!');
    } else {
      setRewardsList(prev => [...prev, form]);
      setShowCreateModal(false);
      showToast('Reward created successfully!');
    }
  };

  const addStock = () => {
    if (!stockReward || !stockAmount) return;
    const amt = parseInt(stockAmount);
    if (isNaN(amt) || amt <= 0) return;
    setRewardsList(prev => prev.map(r => r.id === stockReward.id ? { ...r, stock: r.stock + amt } : r));
    setStockReward(null);
    setStockAmount('');
    showToast(`Added ${amt} units to inventory!`);
  };

  const toggleStatus = (id: string) => {
    setRewardsList(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r));
    showToast('Reward status updated!');
  };

  const redemptionHistory = historyReward ? pointTransactions.filter(t => t.type === 'redeem' && t.description.toLowerCase().includes(historyReward.name.toLowerCase().split(' ')[0])) : [];

  const RewardForm = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">{editingReward ? 'Edit Reward' : 'Create New Reward'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Reward Name *</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#C9A96E]" placeholder="Enter reward name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Type *</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Reward['type'] })}
                className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm">
                <option value="physical">Physical</option>
                <option value="e_coupon">E-Coupon</option>
                <option value="lucky_draw">Lucky Draw</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Brand *</label>
              <input type="text" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
                className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" placeholder="Brand name" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Points Cost *</label>
              <input type="number" value={form.pointsCost} onChange={e => setForm({ ...form, pointsCost: parseInt(e.target.value) || 0 })}
                className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Initial Stock</label>
              <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm h-20 resize-none" placeholder="Reward description" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}
              className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={saveReward} className="flex-1 py-2.5 bg-[#C9A96E] text-white rounded-lg text-sm font-semibold hover:bg-[#B8944D]">
              {editingReward ? 'Save Changes' : 'Create Reward'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in">
          <Check size={16} /> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2B5B]">Rewards Management</h1>
          <p className="text-sm text-slate-500 mt-1">{rewardsList.length} total rewards</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] rounded-lg text-sm text-white font-semibold hover:bg-[#B8944D]">
          <Plus size={16} /> Add Reward
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search rewards..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C9A96E]" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 text-sm text-slate-600">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 text-sm text-slate-600">
          <option value="all">All Brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Rewards Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                <th className="text-left py-3 px-4 font-medium">Reward</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Brand</th>
                <th className="text-left py-3 px-4 font-medium">Points</th>
                <th className="text-left py-3 px-4 font-medium">Stock</th>
                <th className="text-left py-3 px-4 font-medium">Redeemed</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-center py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-xs text-slate-900">{r.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{r.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {r.type === 'physical' ? 'Physical' : r.type === 'e_coupon' ? 'E-Coupon' : 'Lucky Draw'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-500">{r.brand}</td>
                  <td className="py-3 px-4 text-xs font-medium text-[#C9A96E]">{r.pointsCost.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium ${r.stock < 10 ? 'text-red-500' : r.stock < 50 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {r.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-500">{r.totalRedeemed}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(r)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600" title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => setStockReward(r)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600" title="Add Stock">
                        <Package size={14} />
                      </button>
                      <button onClick={() => setHistoryReward(r)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600" title="View History">
                        <BarChart3 size={14} />
                      </button>
                      <button onClick={() => toggleStatus(r.id)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600" title={r.status === 'active' ? 'Deactivate' : 'Activate'}>
                        <Archive size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingReward) && (
        <RewardForm onClose={() => { setShowCreateModal(false); setEditingReward(null); }} />
      )}

      {/* Stock Management Modal */}
      {stockReward && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => { setStockReward(null); setStockAmount(''); }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Add Inventory</h2>
              <button onClick={() => { setStockReward(null); setStockAmount(''); }} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <p className="text-sm text-slate-500 mb-4">Adding stock for: <span className="font-medium text-slate-900">{stockReward.name}</span></p>
            <p className="text-xs text-slate-400 mb-2">Current stock: {stockReward.stock}</p>
            <input type="number" value={stockAmount} onChange={e => setStockAmount(e.target.value)}
              className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm mb-4 focus:outline-none focus:border-[#C9A96E]" placeholder="Units to add" />
            <div className="flex gap-3">
              <button onClick={() => { setStockReward(null); setStockAmount(''); }} className="flex-1 py-2 border border-slate-300 rounded-lg text-sm text-slate-600">Cancel</button>
              <button onClick={addStock} className="flex-1 py-2 bg-[#C9A96E] text-white rounded-lg text-sm font-semibold hover:bg-[#B8944D]">Add Stock</button>
            </div>
          </div>
        </div>
      )}

      {/* Redemption History Modal */}
      {historyReward && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setHistoryReward(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Redemption History</h2>
              <button onClick={() => setHistoryReward(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <p className="text-sm text-slate-500 mb-4">{historyReward.name} — Total redeemed: {historyReward.totalRedeemed}</p>
            <div className="space-y-2">
              {redemptionHistory.length === 0 && <p className="text-xs text-slate-400">No redemption records found in recent transactions</p>}
              {redemptionHistory.map(t => (
                <div key={t.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0 text-xs">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600">-</div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{t.description}</p>
                    <p className="text-slate-400">{t.brand} &bull; {t.date}</p>
                  </div>
                  <span className="font-bold text-orange-600">{t.points.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
