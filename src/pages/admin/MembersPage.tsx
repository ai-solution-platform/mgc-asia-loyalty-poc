import { useState } from 'react';
import { members, tierConfig, pointTransactions } from '../../data/mockData';
import { Search, Download, Eye, UserPlus } from 'lucide-react';

export default function MembersPage() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = members.filter(m => {
    const matchSearch = `${m.firstName} ${m.lastName} ${m.memberId} ${m.phone} ${m.email}`.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === 'all' || m.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const selectedMember = members.find(m => m.id === selected);
  const memberTxns = selected ? pointTransactions.filter(t => t.memberId === selected) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Members</h1>
          <p className="text-sm text-slate-400 mt-1">{members.length} total members</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:bg-slate-700">
            <Download size={14} /> Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-orange-500 rounded-lg text-xs text-white font-semibold hover:bg-orange-600">
            <UserPlus size={14} /> Add Member
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" placeholder="ค้นหาสมาชิก..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50" />
        </div>
        <select value={tierFilter} onChange={e => setTierFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 text-sm text-slate-300">
          <option value="all">All Tiers</option>
          <option value="Member">Member</option>
          <option value="Diamond">Diamond</option>
          <option value="Black Diamond">Black Diamond</option>
          <option value="Infinite Blue Diamond">Infinite Blue Diamond</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="text-left py-3 px-4 font-medium">Member</th>
                <th className="text-left py-3 px-4 font-medium">Tier</th>
                <th className="text-left py-3 px-4 font-medium">Points</th>
                <th className="text-left py-3 px-4 font-medium">Spending</th>
                <th className="text-left py-3 px-4 font-medium">Brand</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Registered</th>
                <th className="text-center py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => {
                const tc = tierConfig[m.tier];
                return (
                  <tr key={m.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setSelected(m.id)}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center text-xs font-bold text-orange-400">{m.firstName[0]}</div>
                        <div>
                          <p className="font-medium text-xs">{m.firstName} {m.lastName}</p>
                          <p className="text-[10px] text-slate-500">{m.memberId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{background: `${tc.color}15`, color: tc.color}}>{tc.icon} {m.tier}</span>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium">{m.points.toLocaleString()}</td>
                    <td className="py-3 px-4 text-xs">฿{m.totalSpending.toLocaleString()}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{m.registeredBU}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{m.status}</span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400">{m.registeredDate}</td>
                    <td className="py-3 px-4 text-center">
                      <button className="p-1 hover:bg-slate-700 rounded" onClick={e => { e.stopPropagation(); setSelected(m.id); }}>
                        <Eye size={14} className="text-slate-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-slate-700" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Member Details</h2>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-xl font-bold">{selectedMember.firstName[0]}</div>
              <div>
                <h3 className="text-lg font-bold">{selectedMember.firstName} {selectedMember.lastName}</h3>
                <p className="text-sm text-slate-400">{selectedMember.memberId} • {selectedMember.memberType}</p>
                <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block" style={{background: `${tierConfig[selectedMember.tier].color}15`, color: tierConfig[selectedMember.tier].color}}>
                  {tierConfig[selectedMember.tier].icon} {selectedMember.tier}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-3"><p className="text-[10px] text-slate-500">Points</p><p className="font-bold text-orange-400">{selectedMember.points.toLocaleString()}</p></div>
              <div className="bg-slate-800 rounded-lg p-3"><p className="text-[10px] text-slate-500">Total Spending</p><p className="font-bold">฿{selectedMember.totalSpending.toLocaleString()}</p></div>
              <div className="bg-slate-800 rounded-lg p-3"><p className="text-[10px] text-slate-500">Brand</p><p className="font-bold">{selectedMember.registeredBU}</p></div>
              <div className="bg-slate-800 rounded-lg p-3"><p className="text-[10px] text-slate-500">Status</p><p className={`font-bold ${selectedMember.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>{selectedMember.status}</p></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
              <div><p className="text-slate-500">Email</p><p className="mt-0.5">{selectedMember.email}</p></div>
              <div><p className="text-slate-500">Phone</p><p className="mt-0.5">{selectedMember.phone}</p></div>
              <div><p className="text-slate-500">Registration Date</p><p className="mt-0.5">{selectedMember.registeredDate}</p></div>
              <div><p className="text-slate-500">Points Expiring</p><p className="mt-0.5 text-yellow-400">{selectedMember.pointsExpiring.toLocaleString()} pts ({selectedMember.pointsExpiryDate})</p></div>
            </div>

            <h4 className="font-semibold text-sm mb-3">Recent Transactions</h4>
            <div className="space-y-2">
              {memberTxns.length === 0 && <p className="text-xs text-slate-500">No transactions found</p>}
              {memberTxns.map(txn => (
                <div key={txn.id} className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0 text-xs">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${txn.type === 'earn' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                    {txn.type === 'earn' ? '+' : '-'}
                  </div>
                  <div className="flex-1"><p className="font-medium">{txn.description}</p><p className="text-slate-500">{txn.brand} • {txn.date}</p></div>
                  <span className={`font-bold ${txn.points > 0 ? 'text-green-400' : 'text-orange-400'}`}>{txn.points > 0 ? '+' : ''}{txn.points.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6">
              <button className="flex-1 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold">Edit Member</button>
              <button className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700">Adjust Points</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
