import { useState } from 'react';
import { rewards } from '../../data/mockData';
import { RewardArtwork } from '../../components/RewardArtwork';

const typeFilters = [
  { key: 'all', label: 'All' },
  { key: 'e_coupon', label: 'E-Coupon' },
  { key: 'physical', label: 'Merchandise' },
  { key: 'lucky_draw', label: 'Lucky Draw' },
];

export default function RewardsPage() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [redeemed, setRedeemed] = useState<string | null>(null);

  const filtered = rewards.filter(r => typeFilter === 'all' || r.type === typeFilter);

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-bold text-[#1B2B5B]">Rewards Catalog</h1>

      {/* Type Filters */}
      <div className="flex gap-2">
        {typeFilters.map(f => (
          <button
            key={f.key}
            onClick={() => setTypeFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${typeFilter === f.key ? 'bg-[#1B2B5B] text-white' : 'bg-white text-[#334155] hover:bg-gray-100 border border-gray-200'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(reward => (
          <div key={reward.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-md">
            <RewardArtwork brand={reward.brand} rewardType={reward.type} title={reward.name} />
            <div className="p-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B2B5B]/5 text-[#1B2B5B]">{reward.brand}</span>
              <h3 className="font-semibold text-xs mt-1.5 line-clamp-2 text-[#1B2B5B]">{reward.name}</h3>
              <p className="text-[10px] text-[#334155]/50 mt-0.5">เหลือ {reward.stock - reward.totalRedeemed} ชิ้น</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-[#C9A96E]">{reward.pointsCost.toLocaleString()} pts</span>
                <button
                  onClick={() => setRedeemed(reward.id)}
                  className="text-[10px] px-2.5 py-1 bg-[#1B2B5B] text-white rounded-lg font-semibold active:scale-95 transition-transform hover:bg-[#0D1B4A]"
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
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={() => setRedeemed(null)}>
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-[#1B2B5B] mb-2">แลกสำเร็จ!</h2>
            <p className="text-sm text-[#334155]/60 mb-6">คูปองถูกเพิ่มเข้า Wallet ของคุณแล้ว</p>
            <button onClick={() => setRedeemed(null)} className="w-full py-3 bg-[#1B2B5B] text-white rounded-xl font-bold text-sm hover:bg-[#0D1B4A]">
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
