import { useState } from 'react';
import { campaigns, currentUser } from '../../data/mockData';
import { Search, Bookmark, BookmarkCheck, Share2, Check } from 'lucide-react';
import { CampaignArtwork } from '../../components/CampaignArtwork';
import { useLanguage } from '../../contexts/LanguageContext';

const categories = ['All', 'Service', 'Experience', 'Merchandise', 'Points Multiplier', 'Birthday', 'Travel', 'Ultra-Premium Experience'];

export default function CampaignsPage() {
  const { triggerToast } = useLanguage();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [showRedeemConfirm, setShowRedeemConfirm] = useState(false);
  const [showRedeemSuccess, setShowRedeemSuccess] = useState(false);
  const [savedCampaigns, setSavedCampaigns] = useState<Set<string>>(new Set());

  const filtered = campaigns.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    return matchSearch && matchCat && c.status === 'active';
  });

  const selected = campaigns.find(c => c.id === selectedCampaign);

  const toggleSave = (id: string) => {
    setSavedCampaigns(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); triggerToast('ยกเลิกบันทึกแล้ว'); }
      else { next.add(id); triggerToast('บันทึกแคมเปญแล้ว'); }
      return next;
    });
  };

  const handleShare = () => triggerToast('คัดลอกลิงก์แคมเปญแล้ว');
  const handleRedeem = () => { setShowRedeemConfirm(false); setShowRedeemSuccess(true); };

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-bold text-[#1B2B5B]">แคมเปญ</h1>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="ค้นหาแคมเปญ..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#1B2B5B] placeholder-gray-400 focus:outline-none focus:border-[#1B2B5B]/30 shadow-sm" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${category === cat ? 'bg-[#1B2B5B] text-white' : 'bg-white text-[#334155] hover:bg-gray-100 border border-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(campaign => (
          <div key={campaign.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-md">
            <div onClick={() => setSelectedCampaign(campaign.id)} className="cursor-pointer hover:opacity-90 transition-all">
              <CampaignArtwork brand={campaign.brand} campaignType={campaign.category} title={campaign.name} />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B2B5B]/5 text-[#1B2B5B]">{campaign.brand}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A96E]/10 text-[#C9A96E]">{campaign.type.replace('_', ' ')}</span>
                </div>
                <h3 className="font-bold text-sm mb-1 text-[#1B2B5B]">{campaign.name}</h3>
                <p className="text-xs text-[#334155]/60 mb-3 line-clamp-2">{campaign.description}</p>
                <div className="flex items-center justify-between">
                  <div>{campaign.pointsRequired > 0 ? <span className="text-sm font-bold text-[#C9A96E]">{campaign.pointsRequired.toLocaleString()} คะแนน</span> : <span className="text-sm font-bold text-green-600">ฟรี</span>}</div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#334155]/50">แลกแล้ว {campaign.totalRedemptions}/{campaign.maxRedemptions}</div>
                    <div className="w-20 bg-gray-100 rounded-full h-1 mt-1"><div className="h-1 rounded-full bg-[#1B2B5B]" style={{width: `${(campaign.totalRedemptions/campaign.maxRedemptions)*100}%`}}></div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border-t border-gray-100">
              <button onClick={() => toggleSave(campaign.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-[#334155]/60 hover:bg-gray-50 transition-all">
                {savedCampaigns.has(campaign.id) ? <BookmarkCheck size={14} className="text-[#C9A96E]" /> : <Bookmark size={14} />}
                <span className={savedCampaigns.has(campaign.id) ? 'text-[#C9A96E]' : ''}>{savedCampaigns.has(campaign.id) ? 'บันทึกแล้ว' : 'บันทึก'}</span>
              </button>
              <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-[#334155]/60 hover:bg-gray-50 transition-all border-l border-gray-100">
                <Share2 size={14} /> แชร์
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && !showRedeemSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={() => setSelectedCampaign(null)}>
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 space-y-4 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto"></div>
            <CampaignArtwork brand={selected.brand} campaignType={selected.category} title={selected.name} className="rounded-xl" />
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-[#1B2B5B]/5 text-[#1B2B5B]">{selected.brand}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-[#C9A96E]/10 text-[#C9A96E]">{selected.category}</span>
            </div>
            <h2 className="text-lg font-bold text-[#1B2B5B]">{selected.name}</h2>
            <p className="text-sm text-[#334155]/70">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F5F7FA] rounded-lg p-3"><p className="text-[#334155]/50">ระยะเวลา</p><p className="font-semibold mt-1 text-[#1B2B5B]">{selected.startDate} — {selected.endDate}</p></div>
              <div className="bg-[#F5F7FA] rounded-lg p-3"><p className="text-[#334155]/50">จำนวนที่เหลือ</p><p className="font-semibold mt-1 text-[#1B2B5B]">{(selected.maxRedemptions - selected.totalRedemptions).toLocaleString()} สิทธิ์</p></div>
              <div className="bg-[#F5F7FA] rounded-lg p-3"><p className="text-[#334155]/50">กลุ่มเป้าหมาย</p><p className="font-semibold mt-1 text-[#1B2B5B]">{selected.targetAudience === 'all' ? 'สมาชิกทุกระดับ' : selected.targetAudience.replace('_', ' ')}</p></div>
              <div className="bg-[#F5F7FA] rounded-lg p-3"><p className="text-[#334155]/50">รหัสแคมเปญ</p><p className="font-semibold mt-1 font-mono text-[#C9A96E]">{selected.code}</p></div>
            </div>
            <div className="bg-[#F5F7FA] rounded-lg p-3 text-[10px] text-[#334155]/50 space-y-1">
              <p className="font-semibold text-[#1B2B5B] text-xs mb-1">เงื่อนไขและข้อกำหนด</p>
              <p>- สิทธิ์มีจำนวนจำกัด เรียงลำดับก่อนหลัง</p>
              <p>- ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้</p>
              <p>- ไม่สามารถโอนสิทธิ์ หรือแลกเปลี่ยนเป็นเงินสดได้</p>
              <p>- บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไข</p>
              <p>- ใช้ได้กับ {selected.brand} เท่านั้น</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => toggleSave(selected.id)} className="flex-1 py-3 bg-[#F5F7FA] rounded-xl text-sm font-semibold text-[#1B2B5B] flex items-center justify-center gap-2">
                {savedCampaigns.has(selected.id) ? <BookmarkCheck size={16} className="text-[#C9A96E]" /> : <Bookmark size={16} />}
                {savedCampaigns.has(selected.id) ? 'บันทึกแล้ว' : 'บันทึก'}
              </button>
              <button onClick={handleShare} className="py-3 px-4 bg-[#F5F7FA] rounded-xl"><Share2 size={16} className="text-[#1B2B5B]" /></button>
            </div>
            <button onClick={() => setShowRedeemConfirm(true)} className="w-full py-3 bg-[#1B2B5B] text-white rounded-xl font-bold text-sm active:scale-[0.98] transition-transform hover:bg-[#0D1B4A]">
              {selected.pointsRequired > 0 ? `แลก ${selected.pointsRequired.toLocaleString()} คะแนน` : 'รับสิทธิ์ฟรี'}
            </button>
          </div>
        </div>
      )}

      {/* Redeem Confirmation */}
      {showRedeemConfirm && selected && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-6" onClick={() => setShowRedeemConfirm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-center text-[#1B2B5B]">ยืนยันการแลกสิทธิ์</h2>
            <div className="bg-[#F5F7FA] rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-[#334155]/50">แคมเปญ</span><span className="font-semibold text-right text-[#1B2B5B]">{selected.name}</span></div>
              {selected.pointsRequired > 0 && (
                <>
                  <div className="flex justify-between"><span className="text-[#334155]/50">คะแนนที่ใช้</span><span className="text-[#C9A96E] font-bold">{selected.pointsRequired.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-[#334155]/50">คะแนนคงเหลือ</span><span className="text-[#1B2B5B]">{(currentUser.points - selected.pointsRequired).toLocaleString()}</span></div>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowRedeemConfirm(false)} className="flex-1 py-2.5 bg-gray-100 text-[#334155] rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button onClick={handleRedeem} className="flex-1 py-2.5 bg-[#1B2B5B] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#0D1B4A]"><Check size={14} /> ยืนยัน</button>
            </div>
          </div>
        </div>
      )}

      {/* Redeem Success */}
      {showRedeemSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={() => { setShowRedeemSuccess(false); setSelectedCampaign(null); }}>
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2 text-[#1B2B5B]">แลกสำเร็จ!</h2>
            <p className="text-sm text-[#334155]/60 mb-6">คูปองถูกเพิ่มเข้า Wallet ของคุณแล้ว</p>
            <button onClick={() => { setShowRedeemSuccess(false); setSelectedCampaign(null); }} className="w-full py-3 bg-[#1B2B5B] text-white rounded-xl font-bold text-sm hover:bg-[#0D1B4A]">ตกลง</button>
          </div>
        </div>
      )}
    </div>
  );
}
