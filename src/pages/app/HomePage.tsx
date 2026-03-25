import { useNavigate } from 'react-router-dom';
import { currentUser, campaigns, pointTransactions, tierConfig } from '../../data/mockData';
import { ArrowUpRight, ArrowDownLeft, Repeat, Calendar, ChevronRight, TrendingUp } from 'lucide-react';
import { CampaignArtwork } from '../../components/CampaignArtwork';

export default function HomePage() {
  const navigate = useNavigate();
  const tier = tierConfig[currentUser.tier];
  const userTxns = pointTransactions.filter(t => t.memberId === currentUser.id).slice(0, 5);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').slice(0, 5);

  const spendingProgress = currentUser.tier === 'Infinite Blue Diamond'
    ? 100
    : (currentUser.tierCurrentSpending / (currentUser.tierCurrentSpending + currentUser.tierSpendingToNext)) * 100;

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Welcome & Tier */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#334155]/60 text-xs">สวัสดี,</p>
          <h1 className="text-xl font-bold text-[#1B2B5B]">{currentUser.firstName} {currentUser.lastName}</h1>
        </div>
        <div className="px-3 py-1.5 rounded-full text-xs font-bold" style={{background: tier.bg, color: tier.color, border: `1px solid ${tier.color}33`}}>
          {tier.icon} {currentUser.tier}
        </div>
      </div>

      {/* Points Card */}
      <div className="bg-gradient-to-br from-[#0D1B4A] to-[#1B2B5B] rounded-2xl p-5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <p className="text-white/60 text-xs mb-1">คะแนนสะสม</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-white">{currentUser.points.toLocaleString()}</span>
          <span className="text-sm text-white/50">pts</span>
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs">
          <div className="text-[#D4A853] flex items-center gap-1">
            <TrendingUp size={12} />
            <span>{currentUser.pointsExpiring.toLocaleString()} pts หมดอายุ {currentUser.pointsExpiryDate}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-white/50">Tier Progress</span>
            <span className="text-[#D4A853]">
              {currentUser.tier === 'Infinite Blue Diamond' ? 'Max Tier' : `อีก ฿${currentUser.tierSpendingToNext.toLocaleString()} สู่ Tier ถัดไป`}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-[#C9A96E] to-[#D4A853]" style={{width: `${spendingProgress}%`}}></div>
          </div>
          <p className="text-[10px] text-white/40 mt-1">ยอดใช้จ่ายสะสม ฿{currentUser.totalSpending.toLocaleString()}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: ArrowDownLeft, label: 'Earn', color: 'bg-green-50 text-green-600', action: () => navigate('/app/earn') },
          { icon: ArrowUpRight, label: 'Redeem', color: 'bg-[#1B2B5B]/5 text-[#1B2B5B]', action: () => navigate('/app/rewards') },
          { icon: Repeat, label: 'Transfer', color: 'bg-blue-50 text-blue-600', action: () => navigate('/app/transfer') },
          { icon: Calendar, label: 'Appointment', color: 'bg-purple-50 text-purple-600', action: () => navigate('/app/appointment') },
        ].map(item => (
          <button key={item.label} onClick={item.action} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl ${item.color} transition-all active:scale-95 shadow-sm`}>
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Active Campaigns */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-sm text-[#1B2B5B]">แคมเปญ</h2>
          <button onClick={() => navigate('/app/campaigns')} className="text-xs text-[#1B2B5B] font-semibold flex items-center gap-1 hover:text-[#C9A96E]">ดูทั้งหมด <ChevronRight size={14} /></button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
          {activeCampaigns.map(campaign => (
            <div key={campaign.id} onClick={() => navigate('/app/campaigns')} className="min-w-[260px] snap-start bg-white rounded-xl border border-gray-100 overflow-hidden flex-shrink-0 shadow-md cursor-pointer hover:border-[#1B2B5B]/20 transition-all">
              <CampaignArtwork brand={campaign.brand} campaignType={campaign.category} title={campaign.name} />
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B2B5B]/5 text-[#1B2B5B]">{campaign.brand}</span>
                  <span className="text-[10px] text-[#334155]/50">{campaign.category}</span>
                </div>
                <h3 className="font-semibold text-xs mb-1 line-clamp-1 text-[#1B2B5B]">{campaign.name}</h3>
                <p className="text-[10px] text-[#334155]/60 line-clamp-2">{campaign.description}</p>
                <div className="flex items-center justify-between mt-2">
                  {campaign.pointsRequired > 0 ? (
                    <span className="text-xs font-bold text-[#C9A96E]">{campaign.pointsRequired.toLocaleString()} pts</span>
                  ) : (
                    <span className="text-xs font-bold text-green-600">FREE</span>
                  )}
                  <span className="text-[10px] text-[#334155]/40">หมดเขต {campaign.endDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-sm text-[#1B2B5B]">ประวัติล่าสุด</h2>
          <button onClick={() => navigate('/app/wallet')} className="text-xs text-[#1B2B5B] font-semibold flex items-center gap-1 hover:text-[#C9A96E]">ดูทั้งหมด <ChevronRight size={14} /></button>
        </div>
        <div className="space-y-2">
          {userTxns.map(txn => (
            <div key={txn.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${txn.type === 'earn' ? 'bg-green-50 text-green-600' : txn.type === 'redeem' ? 'bg-[#C9A96E]/10 text-[#C9A96E]' : 'bg-blue-50 text-blue-600'}`}>
                {txn.type === 'earn' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate text-[#1B2B5B]">{txn.description}</p>
                <p className="text-[10px] text-[#334155]/50">{txn.brand} • {txn.date}</p>
              </div>
              <div className={`text-sm font-bold ${txn.points > 0 ? 'text-green-600' : 'text-[#C9A96E]'}`}>
                {txn.points > 0 ? '+' : ''}{txn.points.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
