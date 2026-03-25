import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { currentUser, tierConfig } from '../../data/mockData';

const tiers = [
  { name: 'Member' as const, spending: '฿0 - ฿999,999', icon: '⬜', benefits: ['สะสมคะแนน 1 คะแนนต่อ ฿100', 'แลกรางวัลในแคตตาล็อก', 'รับ E-Coupon วันเกิด', 'เข้าร่วมแคมเปญทั่วไป', 'ข่าวสารและโปรโมชั่น'] },
  { name: 'Diamond' as const, spending: '฿1,000,000 - ฿4,999,999', icon: '💎', benefits: ['สะสมคะแนน 1.5x ทุกรายการ', 'Priority Service ที่ศูนย์บริการ', 'Exclusive Event Invitations', 'Birthday Double Points', 'Free Car Wash 12 ครั้ง/ปี', 'Sixt Rent A Car ราคาพิเศษ'] },
  { name: 'Black Diamond' as const, spending: '฿5,000,000 - ฿49,999,999', icon: '🖤', benefits: ['สะสมคะแนน 2x ทุกรายการ', 'Dedicated Personal Assistant', 'VIP Lounge Access ทุกสาขา', 'Airport Transfer Service', 'Exclusive Test Drive Events', 'Birthday Triple Points + Gift', 'Partner Luxury Benefits', 'Annual Dinner Invitation'] },
  { name: 'Infinite Blue Diamond' as const, spending: '฿50,000,000+', icon: '🔷', benefits: ['สะสมคะแนน 3x ทุกรายการ', 'Private Concierge 24/7', 'Factory Tour Invitation (Global)', 'First Priority — New Model Access', 'Complimentary Annual Service', 'Yacht & Jet Experience', 'Exclusive Art & Wine Events', 'Birthday 5x Points + Premium Gift', 'Family Member Benefit Sharing', 'Rolls-Royce / Maserati Private Events'] },
];

export default function TierBenefitsPage() {
  const navigate = useNavigate();
  const currentTierIndex = tiers.findIndex(t => t.name === currentUser.tier);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  const progress = currentUser.tierSpendingToNext > 0 ? (currentUser.tierCurrentSpending / (currentUser.tierCurrentSpending + currentUser.tierSpendingToNext)) * 100 : 100;

  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-[#1B2B5B]"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold text-[#1B2B5B]">สิทธิประโยชน์ตาม Tier</h1>
      </div>

      {/* Current Tier Card */}
      <div className="rounded-2xl p-5 relative overflow-hidden shadow-xl" style={{ background: `linear-gradient(135deg, #0D1B4A, #1B2B5B)` }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: tierConfig[currentUser.tier].color, transform: 'translate(30%, -30%)' }}></div>
        <p className="text-xs text-white/50">ระดับปัจจุบัน</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-3xl">{tierConfig[currentUser.tier].icon}</span>
          <span className="text-2xl font-black" style={{ color: tierConfig[currentUser.tier].color }}>{currentUser.tier}</span>
        </div>
        <p className="text-xs text-white/50 mt-2">ยอดใช้จ่ายสะสม ฿{currentUser.tierCurrentSpending.toLocaleString()}</p>
        {nextTier ? (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-white/50">ถึง {nextTier.name}</span>
              <span className="text-[#D4A853]">อีก ฿{currentUser.tierSpendingToNext.toLocaleString()}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5">
              <div className="h-2.5 rounded-full transition-all duration-700 bg-gradient-to-r from-[#C9A96E] to-[#D4A853]" style={{ width: `${Math.min(progress, 100)}%` }}></div>
            </div>
          </div>
        ) : (
          <p className="text-sm mt-3 font-semibold text-[#D4A853]">คุณอยู่ระดับสูงสุดแล้ว</p>
        )}
      </div>

      {/* All Tiers */}
      <div className="space-y-4">
        {tiers.map((tier, idx) => {
          const isCurrentOrPast = idx <= currentTierIndex;
          const isCurrent = tier.name === currentUser.tier;
          const config = tierConfig[tier.name];
          return (
            <div key={tier.name} className={`rounded-xl border p-4 transition-all ${isCurrent ? 'border-[#C9A96E]/40 bg-white shadow-md' : 'border-gray-100 bg-white shadow-sm'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tier.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: config.color }}>{tier.name}</h3>
                    <p className="text-[10px] text-[#334155]/40">{tier.spending}</p>
                  </div>
                </div>
                {isCurrent && idx === currentTierIndex && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] font-bold">ปัจจุบัน</span>}
                {!isCurrentOrPast && <Lock size={14} className="text-gray-300" />}
              </div>
              <div className="space-y-1.5">
                {tier.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <Check size={12} className={`mt-0.5 shrink-0 ${isCurrentOrPast ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={isCurrentOrPast ? 'text-[#334155]' : 'text-[#334155]/40'}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
