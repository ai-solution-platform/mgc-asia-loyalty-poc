import { useState } from 'react';
import { rewards } from '../../data/mockData';
import { ShoppingBag, Ticket, Dice5 } from 'lucide-react';

const typeFilters = [
  { key: 'all', label: 'All' },
  { key: 'e_coupon', label: 'E-Coupon', icon: Ticket },
  { key: 'physical', label: 'Merchandise', icon: ShoppingBag },
  { key: 'lucky_draw', label: 'Lucky Draw', icon: Dice5 },
];

export default function RewardsPage() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [redeemed, setRedeemed] = useState<string | null>(null);

  const filtered = rewards.filter(r => typeFilter === 'all' || r.type === typeFilter);

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-bold">Rewards Catalog</h1>

      {/* Type Filters */}
      <div className="flex gap-2">
        {typeFilters.map(f => (
          <button
            key={f.key}
            onClick={() => setTypeFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${typeFilter === f.key ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(reward => (
          <div key={reward.id} className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="h-28 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-4xl">
              {reward.type === 'e_coupon' ? '🎫' : reward.type === 'physical' ? '📦' : '🎰'}
            </div>
            <div className="p-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{reward.brand}</span>
              <h3 className="font-semibold text-xs mt-1.5 line-clamp-2">{reward.name}</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">เหลือ {reward.stock - reward.totalRedeemed} ชิ้น</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-orange-400">{reward.pointsCost.toLocaleString()} pts</span>
                <button
                  onClick={() => setRedeemed(reward.id)}
                  className="text-[10px] px-2.5 py-1 bg-orange-500 text-white rounded-lg font-semibold active:scale-95 transition-transform"
                >
                  แลก
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Redeem Success Modal */}
      {redeemed && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setRedeemed(null)}>
          <div className="bg-slate-900 rounded-2xl p-8 text-center max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2">แลกสำเร็จ!</h2>
            <p className="text-sm text-slate-400 mb-6">คูปองถูกเพิ่มเข้า Wallet ของคุณแล้ว</p>
            <button onClick={() => setRedeemed(null)} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-sm">
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
