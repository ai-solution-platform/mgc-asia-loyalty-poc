import { useState } from 'react';
import { Save, Plus, X, Check, Eye, EyeOff, Edit } from 'lucide-react';

interface EarnRule {
  id: string; brand: string; category: string; pointsPerBaht: number; multiplier: number; active: boolean;
}
interface TierThreshold {
  tier: string; minSpending: number; maxSpending: number; benefits: string;
}
interface Brand {
  id: string; name: string; code: string; active: boolean;
}
interface AdminUser {
  id: string; name: string; email: string; role: 'super_admin' | 'admin' | 'operator' | 'viewer'; lastLogin: string; active: boolean;
}
interface ApiKey {
  id: string; name: string; key: string; created: string; lastUsed: string; active: boolean;
}

const initialEarnRules: EarnRule[] = [
  { id: 'er1', brand: 'BMW', category: 'Vehicle Purchase', pointsPerBaht: 100, multiplier: 1, active: true },
  { id: 'er2', brand: 'BMW', category: 'Service', pointsPerBaht: 50, multiplier: 1, active: true },
  { id: 'er3', brand: 'Honda', category: 'Vehicle Purchase', pointsPerBaht: 80, multiplier: 1, active: true },
  { id: 'er4', brand: 'Honda', category: 'Service', pointsPerBaht: 40, multiplier: 1, active: true },
  { id: 'er5', brand: 'Rolls-Royce', category: 'Vehicle Purchase', pointsPerBaht: 200, multiplier: 1, active: true },
  { id: 'er6', brand: 'MINI', category: 'Vehicle Purchase', pointsPerBaht: 100, multiplier: 1, active: true },
  { id: 'er7', brand: 'Harley-Davidson', category: 'Vehicle Purchase', pointsPerBaht: 120, multiplier: 1, active: true },
  { id: 'er8', brand: 'Sixt', category: 'Rental', pointsPerBaht: 30, multiplier: 1, active: true },
];

const initialTiers: TierThreshold[] = [
  { tier: 'Member', minSpending: 0, maxSpending: 999999, benefits: 'Basic earn & burn, birthday rewards' },
  { tier: 'Diamond', minSpending: 1000000, maxSpending: 4999999, benefits: 'Priority service, 1.5x earn multiplier, exclusive events' },
  { tier: 'Black Diamond', minSpending: 5000000, maxSpending: 9999999, benefits: '2x earn multiplier, concierge, VIP lounge access' },
  { tier: 'Infinite Blue Diamond', minSpending: 10000000, maxSpending: Infinity, benefits: '3x earn multiplier, personal relationship manager, ultra-premium experiences' },
];

const initialBrands: Brand[] = [
  { id: 'b1', name: 'BMW', code: 'BMW', active: true },
  { id: 'b2', name: 'MINI', code: 'MINI', active: true },
  { id: 'b3', name: 'Rolls-Royce', code: 'RR', active: true },
  { id: 'b4', name: 'Honda', code: 'HND', active: true },
  { id: 'b5', name: 'Harley-Davidson', code: 'HD', active: true },
  { id: 'b6', name: 'Maserati', code: 'MAS', active: true },
  { id: 'b7', name: 'Aston Martin', code: 'AM', active: true },
  { id: 'b8', name: 'Peugeot', code: 'PEU', active: true },
  { id: 'b9', name: 'JEEP', code: 'JEEP', active: true },
  { id: 'b10', name: 'Xpeng', code: 'XP', active: true },
  { id: 'b11', name: 'Zeekr', code: 'ZK', active: true },
  { id: 'b12', name: 'Sixt', code: 'SIXT', active: true },
  { id: 'b13', name: 'Azimut', code: 'AZ', active: true },
];

const initialAdmins: AdminUser[] = [
  { id: 'a1', name: 'Admin MOBILIFE', email: 'admin@mobilife.co.th', role: 'super_admin', lastLogin: '2026-03-25 09:15', active: true },
  { id: 'a2', name: 'Siriporn K.', email: 'siriporn.k@mgc-asia.com', role: 'admin', lastLogin: '2026-03-24 14:30', active: true },
  { id: 'a3', name: 'Pattarapong W.', email: 'pattarapong.w@mgc-asia.com', role: 'operator', lastLogin: '2026-03-23 11:00', active: true },
  { id: 'a4', name: 'Viewer User', email: 'viewer@mgc-asia.com', role: 'viewer', lastLogin: '2026-03-20 16:00', active: true },
];

const initialApiKeys: ApiKey[] = [
  { id: 'k1', name: 'Production API', key: 'mob_live_sk_xxxxxxxxxxxxxxxxxxxxxxxx', created: '2026-01-15', lastUsed: '2026-03-25', active: true },
  { id: 'k2', name: 'Staging API', key: 'mob_test_sk_xxxxxxxxxxxxxxxxxxxxxxxx', created: '2026-02-01', lastUsed: '2026-03-24', active: true },
  { id: 'k3', name: 'Webhook Secret', key: 'mob_wh_xxxxxxxxxxxxxxxxxxxxxxxx', created: '2026-01-20', lastUsed: '2026-03-25', active: true },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<'earn' | 'tiers' | 'brands' | 'admins' | 'api' | 'notifications'>('earn');
  const [earnRules, setEarnRules] = useState(initialEarnRules);
  const [tiers, setTiers] = useState(initialTiers);
  const [brands, setBrands] = useState(initialBrands);
  const [admins, setAdmins] = useState(initialAdmins);
  const [apiKeys] = useState(initialApiKeys);
  const [toast, setToast] = useState('');
  const [showKeyId, setShowKeyId] = useState<string | null>(null);
  const [editingRule, setEditingRule] = useState<EarnRule | null>(null);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: '', code: '' });
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'operator' as AdminUser['role'] });

  const [sysNotifSettings, setSysNotifSettings] = useState({
    pointsEarned: true, pointsRedeemed: true, tierChange: true, campaignLaunch: true,
    expiryReminder: true, expiryDaysBefore: 30, birthdayReward: true,
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const tabs = [
    { id: 'earn' as const, label: 'Point Earning Rules' },
    { id: 'tiers' as const, label: 'Tier Thresholds' },
    { id: 'brands' as const, label: 'Brand Management' },
    { id: 'notifications' as const, label: 'Notifications' },
    { id: 'admins' as const, label: 'Admin Users' },
    { id: 'api' as const, label: 'API Keys' },
  ];

  const roleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-700';
      case 'admin': return 'bg-purple-100 text-purple-700';
      case 'operator': return 'bg-blue-100 text-blue-700';
      case 'viewer': return 'bg-slate-100 text-slate-600';
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

      <div>
        <h1 className="text-2xl font-bold text-[#1B2B5B]">System Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure loyalty platform rules and settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-all ${tab === t.id ? 'bg-white text-[#1B2B5B] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Earn Rules */}
      {tab === 'earn' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-slate-900">Point Earning Rules</h3>
            <button onClick={() => setEditingRule({ id: `er${Date.now()}`, brand: '', category: '', pointsPerBaht: 100, multiplier: 1, active: true })}
              className="flex items-center gap-1 text-xs text-[#C9A96E] hover:underline"><Plus size={14} /> Add Rule</button>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-slate-500"><th className="text-left py-2 px-3 font-medium text-xs">Brand</th><th className="text-left py-2 px-3 font-medium text-xs">Category</th><th className="text-left py-2 px-3 font-medium text-xs">Points per Baht</th><th className="text-left py-2 px-3 font-medium text-xs">Multiplier</th><th className="text-left py-2 px-3 font-medium text-xs">Status</th><th className="text-center py-2 px-3 font-medium text-xs">Actions</th></tr></thead>
            <tbody>
              {earnRules.map(r => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3 text-xs font-medium text-slate-900">{r.brand}</td>
                  <td className="py-2 px-3 text-xs text-slate-600">{r.category}</td>
                  <td className="py-2 px-3 text-xs text-slate-600">1 pt per ฿{r.pointsPerBaht}</td>
                  <td className="py-2 px-3 text-xs text-slate-600">{r.multiplier}x</td>
                  <td className="py-2 px-3"><span className={`text-xs px-2 py-0.5 rounded-full ${r.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{r.active ? 'Active' : 'Inactive'}</span></td>
                  <td className="py-2 px-3 text-center">
                    <button onClick={() => setEditingRule({ ...r })} className="p-1 hover:bg-slate-100 rounded text-slate-400"><Edit size={14} /></button>
                    <button onClick={() => { setEarnRules(prev => prev.map(x => x.id === r.id ? { ...x, active: !x.active } : x)); showToast('Rule updated!'); }} className="p-1 hover:bg-slate-100 rounded text-slate-400 ml-1">
                      {r.active ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editingRule && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setEditingRule(null)}>
              <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">{earnRules.find(r => r.id === editingRule.id) ? 'Edit Rule' : 'Add Rule'}</h2>
                  <button onClick={() => setEditingRule(null)} className="text-slate-400"><X size={20} /></button>
                </div>
                <div className="space-y-3">
                  <input type="text" value={editingRule.brand} onChange={e => setEditingRule({ ...editingRule, brand: e.target.value })} placeholder="Brand" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" />
                  <input type="text" value={editingRule.category} onChange={e => setEditingRule({ ...editingRule, category: e.target.value })} placeholder="Category" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" />
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs text-slate-500">Points per Baht</label><input type="number" value={editingRule.pointsPerBaht} onChange={e => setEditingRule({ ...editingRule, pointsPerBaht: parseInt(e.target.value) || 0 })} className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" /></div>
                    <div><label className="text-xs text-slate-500">Multiplier</label><input type="number" step="0.5" value={editingRule.multiplier} onChange={e => setEditingRule({ ...editingRule, multiplier: parseFloat(e.target.value) || 1 })} className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" /></div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setEditingRule(null)} className="flex-1 py-2 border border-slate-300 rounded-lg text-sm text-slate-600">Cancel</button>
                    <button onClick={() => {
                      const exists = earnRules.find(r => r.id === editingRule.id);
                      if (exists) setEarnRules(prev => prev.map(r => r.id === editingRule.id ? editingRule : r));
                      else setEarnRules(prev => [...prev, editingRule]);
                      setEditingRule(null);
                      showToast('Rule saved!');
                    }} className="flex-1 py-2 bg-[#C9A96E] text-white rounded-lg text-sm font-semibold">Save</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tier Thresholds */}
      {tab === 'tiers' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900">Tier Thresholds</h3>
          <div className="space-y-3">
            {tiers.map((t, i) => (
              <div key={t.tier} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900">{t.tier}</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                  <div>
                    <label className="text-slate-500">Min Spending (฿)</label>
                    <input type="number" value={t.minSpending} onChange={e => { const v = [...tiers]; v[i] = { ...t, minSpending: parseInt(e.target.value) || 0 }; setTiers(v); }}
                      className="w-full border border-slate-300 rounded py-1.5 px-2 mt-0.5 text-sm" />
                  </div>
                  <div>
                    <label className="text-slate-500">Max Spending (฿)</label>
                    <input type="text" value={t.maxSpending === Infinity ? 'Unlimited' : t.maxSpending}
                      onChange={e => { const v = [...tiers]; v[i] = { ...t, maxSpending: e.target.value === 'Unlimited' ? Infinity : parseInt(e.target.value) || 0 }; setTiers(v); }}
                      className="w-full border border-slate-300 rounded py-1.5 px-2 mt-0.5 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Benefits</label>
                  <input type="text" value={t.benefits} onChange={e => { const v = [...tiers]; v[i] = { ...t, benefits: e.target.value }; setTiers(v); }}
                    className="w-full border border-slate-300 rounded py-1.5 px-2 mt-0.5 text-sm" />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => showToast('Tier thresholds saved!')} className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] text-white rounded-lg text-sm font-semibold hover:bg-[#B8944D]">
            <Save size={14} /> Save Changes
          </button>
        </div>
      )}

      {/* Brand Management */}
      {tab === 'brands' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-slate-900">Brand Management</h3>
            <button onClick={() => setShowAddBrand(true)} className="flex items-center gap-1 text-xs text-[#C9A96E] hover:underline"><Plus size={14} /> Add Brand</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {brands.map(b => (
              <div key={b.id} className={`border rounded-lg p-3 flex items-center justify-between ${b.active ? 'border-slate-200' : 'border-slate-100 opacity-50'}`}>
                <div>
                  <p className="font-medium text-sm text-slate-900">{b.name}</p>
                  <p className="text-xs text-slate-400">{b.code}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => { setBrands(prev => prev.map(x => x.id === b.id ? { ...x, active: !x.active } : x)); showToast(`${b.name} ${b.active ? 'deactivated' : 'activated'}!`); }}
                    className={`text-xs px-2 py-1 rounded ${b.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {b.active ? 'Active' : 'Off'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {showAddBrand && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowAddBrand(false)}>
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Add Brand</h2>
                <div className="space-y-3">
                  <input type="text" value={newBrand.name} onChange={e => setNewBrand({ ...newBrand, name: e.target.value })} placeholder="Brand name" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" />
                  <input type="text" value={newBrand.code} onChange={e => setNewBrand({ ...newBrand, code: e.target.value })} placeholder="Brand code (e.g. BMW)" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" />
                  <div className="flex gap-3">
                    <button onClick={() => setShowAddBrand(false)} className="flex-1 py-2 border border-slate-300 rounded-lg text-sm text-slate-600">Cancel</button>
                    <button onClick={() => { if (!newBrand.name) return; setBrands(prev => [...prev, { id: `b${Date.now()}`, ...newBrand, active: true }]); setShowAddBrand(false); setNewBrand({ name: '', code: '' }); showToast('Brand added!'); }}
                      className="flex-1 py-2 bg-[#C9A96E] text-white rounded-lg text-sm font-semibold">Add</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* System Notifications */}
      {tab === 'notifications' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900">System Notification Settings</h3>
          <div className="space-y-3">
            {[
              { key: 'pointsEarned', label: 'Points Earned Notification', desc: 'Notify members when they earn points' },
              { key: 'pointsRedeemed', label: 'Points Redeemed Notification', desc: 'Notify members when they redeem points' },
              { key: 'tierChange', label: 'Tier Change Notification', desc: 'Notify members on tier upgrade/downgrade' },
              { key: 'campaignLaunch', label: 'Campaign Launch Notification', desc: 'Notify eligible members of new campaigns' },
              { key: 'expiryReminder', label: 'Points Expiry Reminder', desc: 'Remind members before points expire' },
              { key: 'birthdayReward', label: 'Birthday Reward Notification', desc: 'Send birthday rewards automatically' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <button onClick={() => setSysNotifSettings(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${sysNotifSettings[item.key as keyof typeof sysNotifSettings] ? 'bg-[#C9A96E]' : 'bg-slate-300'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${sysNotifSettings[item.key as keyof typeof sysNotifSettings] ? 'translate-x-5' : 'translate-x-0.5'}`}></span>
                </button>
              </div>
            ))}
            {sysNotifSettings.expiryReminder && (
              <div className="pl-4">
                <label className="text-xs text-slate-500">Days before expiry</label>
                <input type="number" value={sysNotifSettings.expiryDaysBefore} onChange={e => setSysNotifSettings(prev => ({ ...prev, expiryDaysBefore: parseInt(e.target.value) || 30 }))}
                  className="w-20 border border-slate-300 rounded py-1 px-2 ml-2 text-sm" />
              </div>
            )}
          </div>
          <button onClick={() => showToast('Notification settings saved!')} className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] text-white rounded-lg text-sm font-semibold hover:bg-[#B8944D]">
            <Save size={14} /> Save Settings
          </button>
        </div>
      )}

      {/* Admin Users */}
      {tab === 'admins' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-slate-900">Admin Users</h3>
            <button onClick={() => setShowAddAdmin(true)} className="flex items-center gap-1 text-xs text-[#C9A96E] hover:underline"><Plus size={14} /> Add Admin</button>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-slate-500"><th className="text-left py-2 px-3 font-medium text-xs">Name</th><th className="text-left py-2 px-3 font-medium text-xs">Email</th><th className="text-left py-2 px-3 font-medium text-xs">Role</th><th className="text-left py-2 px-3 font-medium text-xs">Last Login</th><th className="text-left py-2 px-3 font-medium text-xs">Status</th><th className="text-center py-2 px-3 font-medium text-xs">Actions</th></tr></thead>
            <tbody>
              {admins.map(a => (
                <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3 text-xs font-medium text-slate-900">{a.name}</td>
                  <td className="py-2 px-3 text-xs text-slate-500">{a.email}</td>
                  <td className="py-2 px-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColor(a.role)}`}>{a.role.replace('_', ' ')}</span></td>
                  <td className="py-2 px-3 text-xs text-slate-400">{a.lastLogin}</td>
                  <td className="py-2 px-3"><span className={`text-xs px-2 py-0.5 rounded-full ${a.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{a.active ? 'Active' : 'Disabled'}</span></td>
                  <td className="py-2 px-3 text-center">
                    <button onClick={() => { setAdmins(prev => prev.map(x => x.id === a.id ? { ...x, active: !x.active } : x)); showToast(`User ${a.active ? 'disabled' : 'enabled'}!`); }}
                      className="p-1 hover:bg-slate-100 rounded text-slate-400">{a.active ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showAddAdmin && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowAddAdmin(false)}>
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Add Admin User</h2>
                <div className="space-y-3">
                  <input type="text" value={newAdmin.name} onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })} placeholder="Full name" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" />
                  <input type="email" value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} placeholder="Email" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm" />
                  <select value={newAdmin.role} onChange={e => setNewAdmin({ ...newAdmin, role: e.target.value as AdminUser['role'] })} className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm">
                    <option value="admin">Admin</option>
                    <option value="operator">Operator</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <div className="flex gap-3">
                    <button onClick={() => setShowAddAdmin(false)} className="flex-1 py-2 border border-slate-300 rounded-lg text-sm text-slate-600">Cancel</button>
                    <button onClick={() => { if (!newAdmin.name || !newAdmin.email) return; setAdmins(prev => [...prev, { id: `a${Date.now()}`, ...newAdmin, lastLogin: 'Never', active: true }]); setShowAddAdmin(false); setNewAdmin({ name: '', email: '', role: 'operator' }); showToast('Admin added!'); }}
                      className="flex-1 py-2 bg-[#C9A96E] text-white rounded-lg text-sm font-semibold">Add</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* API Keys */}
      {tab === 'api' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900">API Keys</h3>
          <p className="text-xs text-slate-400">Manage API keys for integrations. Keys are masked for security.</p>
          <div className="space-y-3">
            {apiKeys.map(k => (
              <div key={k.id} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-slate-900">{k.name}</p>
                  <code className="text-xs font-mono text-slate-500 mt-0.5 block">
                    {showKeyId === k.id ? k.key : `${k.key.slice(0, 12)}${'*'.repeat(24)}`}
                  </code>
                  <p className="text-xs text-slate-400 mt-1">Created: {k.created} | Last used: {k.lastUsed}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowKeyId(showKeyId === k.id ? null : k.id)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400">
                    {showKeyId === k.id ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${k.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{k.active ? 'Active' : 'Revoked'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
