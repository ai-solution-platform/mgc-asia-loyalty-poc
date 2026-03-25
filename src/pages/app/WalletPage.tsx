import { useState, useEffect, useCallback } from 'react';
import { coupons as initialCoupons } from '../../data/mockData';
import { QrCode, Clock, CheckCircle2, XCircle, X, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Coupon } from '../../types';

const statusTabs = [
  { key: 'available', label: 'ใช้ได้', icon: QrCode, color: 'text-green-600' },
  { key: 'used', label: 'ใช้แล้ว', icon: CheckCircle2, color: 'text-gray-400' },
  { key: 'expired', label: 'หมดอายุ', icon: XCircle, color: 'text-red-400' },
];

const brandFilters = ['All', 'BMW', 'MINI', 'Harley-Davidson', 'Sixt', 'All Brands'];

export default function WalletPage() {
  const { triggerToast } = useLanguage();
  const [tab, setTab] = useState('available');
  const [brandFilter, setBrandFilter] = useState('All');
  const [couponList, setCouponList] = useState<Coupon[]>(initialCoupons);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [showConfirmUse, setShowConfirmUse] = useState(false);
  const [countdown, setCountdown] = useState(15 * 60);
  const [timerActive, setTimerActive] = useState(false);

  const filtered = couponList.filter(c => {
    const matchStatus = c.status === tab;
    const matchBrand = brandFilter === 'All' || c.brand === brandFilter;
    return matchStatus && matchBrand;
  });

  useEffect(() => {
    if (!timerActive || countdown <= 0) return;
    const interval = setInterval(() => setCountdown(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive, countdown]);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, []);

  const openCouponDetail = (coupon: Coupon) => setSelectedCoupon(coupon);

  const openQR = () => {
    setShowQR(true);
    setCountdown(15 * 60);
    setTimerActive(true);
  };

  const confirmUseCoupon = () => {
    if (!selectedCoupon) return;
    setCouponList(prev => prev.map(c => c.id === selectedCoupon.id ? { ...c, status: 'used' as const, usedDate: '2026-03-25' } : c));
    setShowQR(false);
    setShowConfirmUse(false);
    setSelectedCoupon(null);
    setTimerActive(false);
    triggerToast('ใช้คูปองสำเร็จ!');
  };

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-bold text-[#1B2B5B]">Coupon Wallet</h1>

      {/* Status Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {statusTabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${tab === t.key ? 'bg-white text-[#1B2B5B] shadow-sm' : 'text-[#334155]/50'}`}>
            {t.label} ({couponList.filter(c => c.status === t.key).length})
          </button>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {brandFilters.map(brand => (
          <button key={brand} onClick={() => setBrandFilter(brand)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-medium transition-all ${brandFilter === brand ? 'bg-[#1B2B5B] text-white' : 'bg-white text-[#334155] border border-gray-200'}`}>
            {brand}
          </button>
        ))}
      </div>

      {/* Coupons */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#334155]/40 text-sm">
            ไม่มีคูปอง{tab === 'available' ? 'ที่ใช้ได้' : tab === 'used' ? 'ที่ใช้แล้ว' : 'ที่หมดอายุ'}
          </div>
        )}
        {filtered.map(coupon => (
          <div key={coupon.id} onClick={() => openCouponDetail(coupon)}
            className={`bg-white rounded-xl border overflow-hidden cursor-pointer hover:border-[#1B2B5B]/20 transition-all shadow-sm ${coupon.status === 'available' ? 'border-green-200' : 'border-gray-100 opacity-60'}`}>
            <div className="flex">
              <div className={`w-20 flex items-center justify-center text-3xl ${coupon.status === 'available' ? 'bg-green-50' : 'bg-gray-50'}`}>🎫</div>
              <div className="flex-1 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B2B5B]/5 text-[#1B2B5B]">{coupon.brand}</span>
                </div>
                <h3 className="font-semibold text-xs text-[#1B2B5B]">{coupon.discount}</h3>
                <p className="text-[10px] text-[#334155]/50 mt-0.5">{coupon.description}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px]">
                  <span className="text-[#334155]/40 flex items-center gap-1">
                    <Clock size={10} /> {coupon.status === 'used' ? `ใช้เมื่อ ${coupon.usedDate}` : `หมดอายุ ${coupon.expiryDate}`}
                  </span>
                </div>
              </div>
              {coupon.status === 'available' && (
                <div className="px-3 flex items-center"><QrCode size={24} className="text-[#1B2B5B]" /></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Detail Modal */}
      {selectedCoupon && !showQR && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={() => setSelectedCoupon(null)}>
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 space-y-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-2"></div>
            <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-6xl">🎫</div>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-[#1B2B5B]/5 text-[#1B2B5B]">{selectedCoupon.brand}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${selectedCoupon.status === 'available' ? 'bg-green-50 text-green-600' : selectedCoupon.status === 'used' ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-red-400'}`}>
                {selectedCoupon.status === 'available' ? 'ใช้ได้' : selectedCoupon.status === 'used' ? 'ใช้แล้ว' : 'หมดอายุ'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#1B2B5B]">{selectedCoupon.discount}</h2>
            <p className="text-sm text-[#334155]/70">{selectedCoupon.description}</p>
            <div className="bg-[#F5F7FA] rounded-lg p-3 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-[#334155]/50">รหัสคูปอง</span><span className="font-mono text-[#C9A96E] font-bold">{selectedCoupon.code}</span></div>
              <div className="flex justify-between"><span className="text-[#334155]/50">แคมเปญ</span><span className="text-[#1B2B5B]">{selectedCoupon.campaignName}</span></div>
              <div className="flex justify-between"><span className="text-[#334155]/50">{selectedCoupon.status === 'used' ? 'ใช้เมื่อ' : 'หมดอายุ'}</span><span className="text-[#1B2B5B]">{selectedCoupon.status === 'used' ? selectedCoupon.usedDate : selectedCoupon.expiryDate}</span></div>
            </div>
            <div className="bg-[#F5F7FA] rounded-lg p-3 text-[10px] text-[#334155]/50 space-y-1">
              <p className="font-semibold text-[#1B2B5B] text-xs mb-1">เงื่อนไขการใช้งาน</p>
              <p>- ใช้ได้ 1 ครั้งต่อ 1 คูปอง</p>
              <p>- แสดง QR Code ให้พนักงานก่อนใช้บริการ</p>
              <p>- ใช้ได้ที่ศูนย์บริการแบรนด์ที่ระบุเท่านั้น</p>
              <p>- ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้</p>
              <p>- ไม่สามารถแลกเปลี่ยนเป็นเงินสดได้</p>
            </div>
            {selectedCoupon.status === 'available' && (
              <button onClick={openQR} className="w-full py-3 bg-[#1B2B5B] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-[#0D1B4A]">
                <QrCode size={18} /> ใช้คูปอง
              </button>
            )}
            <button onClick={() => setSelectedCoupon(null)} className="w-full py-2.5 bg-gray-100 text-[#334155] rounded-xl text-xs font-semibold">ปิด</button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && selectedCoupon && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={() => { setShowQR(false); setTimerActive(false); }}>
          <div className="bg-white rounded-2xl p-6 text-center max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1B2B5B]">ใช้คูปอง</h2>
              <button onClick={() => { setShowQR(false); setTimerActive(false); }} className="p-1"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="bg-[#F5F7FA] rounded-xl p-6 mb-4">
              <div className="w-40 h-40 mx-auto bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIj48cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMTEwIiB5PSIxMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMTAiIHk9IjExMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iNjAiIHk9IjYwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEyMCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjIwIiB5PSIxMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-contain bg-center bg-no-repeat"></div>
            </div>
            <p className="text-xs text-[#334155]/50 mb-1">แสดง QR Code ให้พนักงาน</p>
            <p className="text-sm font-mono text-[#1B2B5B] font-bold mb-3">{selectedCoupon.code}</p>
            <div className={`p-3 rounded-lg text-xs mb-4 ${countdown > 60 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-600'}`}>
              ⏱️ QR Code จะหมดอายุใน <span className="font-bold font-mono">{formatTime(countdown)}</span>
            </div>
            <button onClick={() => setShowConfirmUse(true)} className="w-full py-3 bg-[#1B2B5B] text-white rounded-xl font-bold text-sm active:scale-[0.98] transition-transform hover:bg-[#0D1B4A]">
              ยืนยันใช้คูปอง
            </button>
          </div>
        </div>
      )}

      {/* Use Confirmation */}
      {showConfirmUse && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-6" onClick={() => setShowConfirmUse(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-[#C9A96E]/10 mx-auto flex items-center justify-center">
              <CheckCircle2 size={28} className="text-[#C9A96E]" />
            </div>
            <h2 className="text-lg font-bold text-[#1B2B5B]">ยืนยันการใช้คูปอง?</h2>
            <p className="text-xs text-[#334155]/60">คูปองนี้จะถูกใช้งานทันทีและไม่สามารถยกเลิกได้</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirmUse(false)} className="flex-1 py-2.5 bg-gray-100 text-[#334155] rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button onClick={confirmUseCoupon} className="flex-1 py-2.5 bg-[#1B2B5B] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#0D1B4A]"><Check size={14} /> ยืนยัน</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
