import { useState } from 'react';
import { members as initialMembers, tierConfig, pointTransactions as initialTransactions } from '../../data/mockData';
import type { Member, PointTransaction } from '../../types';
import { Search, Download, Eye, UserPlus, Edit, X, Check, ChevronDown } from 'lucide-react';

export default function MembersPage() {
  const [membersList, setMembersList] = useState<Member[]>(initialMembers);
  const [transactions, setTransactions] = useState<PointTransaction[]>(initialTransactions);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = membersList.filter(m => {
    const matchSearch = `${m.firstName} ${m.lastName} ${m.memberId} ${m.phone} ${m.email}`.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === 'all' || m.tier === tierFilter;
    const matchType = typeFilter === 'all' || m.memberType === typeFilter;
    return matchSearch && matchTier && matchType;
  });

  const selectedMember = membersList.find(m => m.id === selected);
  const memberTxns = selected ? transactions.filter(t => t.memberId === selected) : [];

  // Edit form state
  const [editForm, setEditForm] = useState<Partial<Member>>({});
  const openEdit = (m: Member) => { setEditForm({ ...m }); setShowEditModal(true); };
  const saveEdit = () => {
    if (!editForm.id) return;
    setMembersList(prev => prev.map(m => m.id === editForm.id ? { ...m, ...editForm } as Member : m));
    setShowEditModal(false);
    showToast('Member updated successfully!');
  };

  // Points adjustment state
  const [pointsAction, setPointsAction] = useState<'add' | 'deduct'>('add');
  const [pointsAmount, setPointsAmount] = useState('');
  const [pointsReason, setPointsReason] = useState('');
  const openPoints = () => { setPointsAction('add'); setPointsAmount(''); setPointsReason(''); setShowPointsModal(true); };
  const adjustPoints = () => {
    if (!selected || !pointsAmount || !pointsReason) return;
    const amount = parseInt(pointsAmount);
    if (isNaN(amount) || amount <= 0) return;
    const actualPoints = pointsAction === 'add' ? amount : -amount;
    const member = membersList.find(m => m.id === selected);
    if (!member) return;
    const newBalance = member.points + actualPoints;
    if (newBalance < 0) { showToast('Cannot deduct more points than available!'); return; }
    setMembersList(prev => prev.map(m => m.id === selected ? { ...m, points: newBalance } : m));
    const newTxn: PointTransaction = {
      id: `pt-adj-${Date.now()}`, memberId: selected, type: pointsAction === 'add' ? 'adjust_add' : 'adjust_subtract',
      points: actualPoints, balance: newBalance, description: `Manual Adjustment: ${pointsReason}`,
      brand: 'System', date: new Date().toISOString().split('T')[0], status: 'completed',
    };
    setTransactions(prev => [newTxn, ...prev]);
    setShowPointsModal(false);
    showToast(`Points ${pointsAction === 'add' ? 'added' : 'deducted'} successfully!`);
  };

  // Tier override
  const overrideTier = (memberId: string, newTier: Member['tier']) => {
    setMembersList(prev => prev.map(m => m.id === memberId ? { ...m, tier: newTier } : m));
    showToast(`Tier overridden to ${newTier}!`);
  };

  // Add member
  const [newMember, setNewMember] = useState<Partial<Member>>({ firstName: '', lastName: '', email: '', phone: '', tier: 'Member', registeredBU: '', memberType: 'B2C', status: 'Active' });
  const addMember = () => {
    if (!newMember.firstName || !newMember.lastName || !newMember.email) return;
    const member: Member = {
      id: `${Date.now()}`, memberId: `MOB-2026-${String(membersList.length + 1).padStart(5, '0')}`,
      firstName: newMember.firstName!, lastName: newMember.lastName!, email: newMember.email!, phone: newMember.phone || '',
      tier: (newMember.tier as Member['tier']) || 'Member', points: 0, totalSpending: 0,
      status: (newMember.status as Member['status']) || 'Active', registeredBU: newMember.registeredBU || '',
      registeredDate: new Date().toISOString().split('T')[0], memberType: (newMember.memberType as Member['memberType']) || 'B2C',
      pointsExpiring: 0, pointsExpiryDate: '2027-12-31', tierSpendingToNext: 1000000, tierCurrentSpending: 0,
    };
    setMembersList(prev => [...prev, member]);
    setShowAddModal(false);
    setNewMember({ firstName: '', lastName: '', email: '', phone: '', tier: 'Member', registeredBU: '', memberType: 'B2C', status: 'Active' });
    showToast('Member created successfully!');
  };

  const exportMembers = () => showToast('Member list exported successfully!');

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check size={16} /> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2B5B]">Members</h1>
          <p className="text-sm text-[#334155]/50 mt-1">{membersList.length} total members</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportMembers} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-[#334155] hover:bg-gray-50 shadow-sm">
            <Download size={14} /> Export
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-3 py-2 bg-[#1B2B5B] rounded-lg text-xs text-white font-semibold hover:bg-[#0D1B4A] shadow-sm">
            <UserPlus size={14} /> Add Member
          </button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm text-[#1B2B5B] placeholder-gray-400 focus:outline-none focus:border-[#1B2B5B]/30 shadow-sm" />
        </div>
        <select value={tierFilter} onChange={e => setTierFilter(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 text-sm text-[#334155] shadow-sm">
          <option value="all">All Tiers</option><option value="Member">Member</option><option value="Diamond">Diamond</option><option value="Black Diamond">Black Diamond</option><option value="Infinite Blue Diamond">Infinite Blue Diamond</option>
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 text-sm text-[#334155] shadow-sm">
          <option value="all">All Types</option><option value="B2C">B2C</option><option value="B2B">B2B</option>
        </select>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-[#334155]/60 bg-[#F5F7FA]">
                <th className="text-left py-3 px-4 font-medium">Member</th><th className="text-left py-3 px-4 font-medium">Tier</th><th className="text-left py-3 px-4 font-medium">Points</th><th className="text-left py-3 px-4 font-medium">Spending</th><th className="text-left py-3 px-4 font-medium">Brand</th><th className="text-left py-3 px-4 font-medium">Status</th><th className="text-left py-3 px-4 font-medium">Registered</th><th className="text-center py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => {
                const tc = tierConfig[m.tier];
                return (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-[#F5F7FA]/50 transition-colors cursor-pointer" onClick={() => setSelected(m.id)}>
                    <td className="py-3 px-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-[#1B2B5B]/5 flex items-center justify-center text-xs font-bold text-[#1B2B5B]">{m.firstName[0]}</div><div><p className="font-medium text-xs text-[#1B2B5B]">{m.firstName} {m.lastName}</p><p className="text-[10px] text-[#334155]/40">{m.memberId} &bull; {m.memberType}</p></div></div></td>
                    <td className="py-3 px-4"><span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{background: `${tc.color}15`, color: tc.color}}>{tc.icon} {m.tier}</span></td>
                    <td className="py-3 px-4 text-xs font-medium text-[#C9A96E]">{m.points.toLocaleString()}</td>
                    <td className="py-3 px-4 text-xs text-[#334155]">{m.totalSpending.toLocaleString()}</td>
                    <td className="py-3 px-4 text-xs text-[#334155]/60">{m.registeredBU}</td>
                    <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>{m.status}</span></td>
                    <td className="py-3 px-4 text-xs text-[#334155]/60">{m.registeredDate}</td>
                    <td className="py-3 px-4 text-center"><div className="flex items-center justify-center gap-1"><button className="p-1 hover:bg-gray-100 rounded" onClick={e => { e.stopPropagation(); setSelected(m.id); }}><Eye size={14} className="text-[#334155]/50" /></button><button className="p-1 hover:bg-gray-100 rounded" onClick={e => { e.stopPropagation(); openEdit(m); }}><Edit size={14} className="text-[#334155]/50" /></button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && !showEditModal && !showPointsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-gray-100 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#1B2B5B]">Member Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-[#1B2B5B]"><X size={20} /></button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B2B5B] to-[#0D1B4A] flex items-center justify-center text-xl font-bold text-white">{selectedMember.firstName[0]}</div>
              <div>
                <h3 className="text-lg font-bold text-[#1B2B5B]">{selectedMember.firstName} {selectedMember.lastName}</h3>
                <p className="text-sm text-[#334155]/50">{selectedMember.memberId} &bull; {selectedMember.memberType}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{background: `${tierConfig[selectedMember.tier].color}15`, color: tierConfig[selectedMember.tier].color}}>{tierConfig[selectedMember.tier].icon} {selectedMember.tier}</span>
                  <div className="relative group">
                    <button className="text-[10px] text-[#334155]/40 hover:text-[#C9A96E] flex items-center gap-0.5">Override <ChevronDown size={10} /></button>
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1 hidden group-hover:block z-10 w-44">
                      {(['Member', 'Diamond', 'Black Diamond', 'Infinite Blue Diamond'] as Member['tier'][]).map(t => (
                        <button key={t} onClick={() => overrideTier(selectedMember.id, t)} className="w-full text-left px-2 py-1 text-xs hover:bg-[#F5F7FA] rounded text-[#1B2B5B]">{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#F5F7FA] rounded-lg p-3"><p className="text-[10px] text-[#334155]/50">Points</p><p className="font-bold text-[#C9A96E]">{selectedMember.points.toLocaleString()}</p></div>
              <div className="bg-[#F5F7FA] rounded-lg p-3"><p className="text-[10px] text-[#334155]/50">Total Spending</p><p className="font-bold text-[#1B2B5B]">{selectedMember.totalSpending.toLocaleString()}</p></div>
              <div className="bg-[#F5F7FA] rounded-lg p-3"><p className="text-[10px] text-[#334155]/50">Brand</p><p className="font-bold text-[#1B2B5B]">{selectedMember.registeredBU}</p></div>
              <div className="bg-[#F5F7FA] rounded-lg p-3"><p className="text-[10px] text-[#334155]/50">Status</p><p className={`font-bold ${selectedMember.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>{selectedMember.status}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
              <div><p className="text-[#334155]/50">Email</p><p className="mt-0.5 text-[#1B2B5B]">{selectedMember.email}</p></div>
              <div><p className="text-[#334155]/50">Phone</p><p className="mt-0.5 text-[#1B2B5B]">{selectedMember.phone}</p></div>
              <div><p className="text-[#334155]/50">Registration Date</p><p className="mt-0.5 text-[#1B2B5B]">{selectedMember.registeredDate}</p></div>
              <div><p className="text-[#334155]/50">Points Expiring</p><p className="mt-0.5 text-[#C9A96E]">{selectedMember.pointsExpiring.toLocaleString()} pts ({selectedMember.pointsExpiryDate})</p></div>
            </div>
            <h4 className="font-semibold text-sm mb-3 text-[#1B2B5B]">Transaction History</h4>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {memberTxns.length === 0 && <p className="text-xs text-[#334155]/40">No transactions found</p>}
              {memberTxns.map(txn => (
                <div key={txn.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0 text-xs">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${txn.points > 0 ? 'bg-green-50 text-green-600' : 'bg-[#C9A96E]/10 text-[#C9A96E]'}`}>{txn.points > 0 ? '+' : '-'}</div>
                  <div className="flex-1"><p className="font-medium text-[#1B2B5B]">{txn.description}</p><p className="text-[#334155]/40">{txn.brand} &bull; {txn.date}</p></div>
                  <span className={`font-bold ${txn.points > 0 ? 'text-green-600' : 'text-[#C9A96E]'}`}>{txn.points > 0 ? '+' : ''}{txn.points.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => openEdit(selectedMember)} className="flex-1 py-2 bg-[#1B2B5B] text-white rounded-lg text-xs font-semibold hover:bg-[#0D1B4A]">Edit Member</button>
              <button onClick={openPoints} className="flex-1 py-2 bg-white text-[#1B2B5B] rounded-lg text-xs font-semibold border border-[#1B2B5B]/20 hover:bg-[#F5F7FA]">Adjust Points</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && editForm.id && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-[#1B2B5B]">Edit Member</h2><button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-[#1B2B5B]"><X size={20} /></button></div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">First Name</label><input type="text" value={editForm.firstName || ''} onChange={e => setEditForm({ ...editForm, firstName: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Last Name</label><input type="text" value={editForm.lastName || ''} onChange={e => setEditForm({ ...editForm, lastName: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
              </div>
              <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Email</label><input type="email" value={editForm.email || ''} onChange={e => setEditForm({ ...editForm, email: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
              <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Phone</label><input type="text" value={editForm.phone || ''} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Brand</label><input type="text" value={editForm.registeredBU || ''} onChange={e => setEditForm({ ...editForm, registeredBU: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Status</label><select value={editForm.status || 'Active'} onChange={e => setEditForm({ ...editForm, status: e.target.value as Member['status'] })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm"><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Suspended">Suspended</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Tier</label><select value={editForm.tier || 'Member'} onChange={e => setEditForm({ ...editForm, tier: e.target.value as Member['tier'] })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm"><option value="Member">Member</option><option value="Diamond">Diamond</option><option value="Black Diamond">Black Diamond</option><option value="Infinite Blue Diamond">Infinite Blue Diamond</option></select></div>
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Type</label><select value={editForm.memberType || 'B2C'} onChange={e => setEditForm({ ...editForm, memberType: e.target.value as Member['memberType'] })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm"><option value="B2C">B2C</option><option value="B2B">B2B</option></select></div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowEditModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-[#334155]">Cancel</button>
                <button onClick={saveEdit} className="flex-1 py-2.5 bg-[#1B2B5B] text-white rounded-lg text-sm font-semibold hover:bg-[#0D1B4A]">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Points Adjustment Modal */}
      {showPointsModal && selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowPointsModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-[#1B2B5B]">Adjust Points</h2><button onClick={() => setShowPointsModal(false)} className="text-gray-400"><X size={20} /></button></div>
            <p className="text-xs text-[#334155]/40 mb-4">Current balance: <span className="font-bold text-[#C9A96E]">{selectedMember?.points.toLocaleString()}</span></p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={() => setPointsAction('add')} className={`flex-1 py-2 rounded-lg text-xs font-semibold ${pointsAction === 'add' ? 'bg-green-50 text-green-700 border-2 border-green-300' : 'bg-[#F5F7FA] text-[#334155]/50 border border-gray-200'}`}>+ Add Points</button>
                <button onClick={() => setPointsAction('deduct')} className={`flex-1 py-2 rounded-lg text-xs font-semibold ${pointsAction === 'deduct' ? 'bg-[#C9A96E]/10 text-[#C9A96E] border-2 border-[#C9A96E]/30' : 'bg-[#F5F7FA] text-[#334155]/50 border border-gray-200'}`}>- Deduct Points</button>
              </div>
              <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Amount *</label><input type="number" value={pointsAmount} onChange={e => setPointsAmount(e.target.value)} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" placeholder="Enter points amount" /></div>
              <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Reason *</label><input type="text" value={pointsReason} onChange={e => setPointsReason(e.target.value)} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" placeholder="Reason for adjustment" /></div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowPointsModal(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-[#334155]">Cancel</button>
                <button onClick={adjustPoints} className={`flex-1 py-2 text-white rounded-lg text-sm font-semibold ${pointsAction === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-[#C9A96E] hover:bg-[#B8944D]'}`}>{pointsAction === 'add' ? 'Add' : 'Deduct'} Points</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-[#1B2B5B]">Add New Member</h2><button onClick={() => setShowAddModal(false)} className="text-gray-400"><X size={20} /></button></div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">First Name *</label><input type="text" value={newMember.firstName || ''} onChange={e => setNewMember({ ...newMember, firstName: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Last Name *</label><input type="text" value={newMember.lastName || ''} onChange={e => setNewMember({ ...newMember, lastName: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
              </div>
              <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Email *</label><input type="email" value={newMember.email || ''} onChange={e => setNewMember({ ...newMember, email: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
              <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Phone</label><input type="text" value={newMember.phone || ''} onChange={e => setNewMember({ ...newMember, phone: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Brand</label><input type="text" value={newMember.registeredBU || ''} onChange={e => setNewMember({ ...newMember, registeredBU: e.target.value })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1B2B5B]/30" /></div>
                <div><label className="block text-xs font-medium text-[#334155]/60 mb-1">Type</label><select value={newMember.memberType || 'B2C'} onChange={e => setNewMember({ ...newMember, memberType: e.target.value as Member['memberType'] })} className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm"><option value="B2C">B2C</option><option value="B2B">B2B</option></select></div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-[#334155]">Cancel</button>
                <button onClick={addMember} className="flex-1 py-2.5 bg-[#1B2B5B] text-white rounded-lg text-sm font-semibold hover:bg-[#0D1B4A]">Create Member</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
