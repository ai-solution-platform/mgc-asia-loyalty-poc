import { useState } from 'react';
import { coupons } from '../../data/mockData';
import { QrCode, Clock, CheckCircle2, XCircle } from 'lucide-react';

const statusTabs = [
  { key: 'available', label: 'ใช้ได้', icon: QrCode, color: 'text-green-400' },
  { key: 'used', label: 'ใช้แล้ว', icon: CheckCircle2, color: 'text-slate-500' },
  { key: 'expired', label: 'หมดอายุ', icon: XCircle, color: 'text-red-400' },
];

export default function WalletPage() {
  const [tab, setTab] = useState('available');
  const [showQR, setShowQR] = useState<string | null>(null);

  const filtered = coupons.filter(c => c.status === tab);

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-bold">Coupon Wallet</h1>

      {/* Status Tabs */}
      <div className="flex gap-1 bg-slate-800 rounded-xl p-1">
        {statusTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${tab === t.key ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
          >
            {t.label} ({coupons.filter(c => c.status === t.key).length})
          </button>
        ))}
      </div>

      {/* Coupons */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            ไม่มีคูปอง{tab === 'available' ? 'ที่ใช้ได้' : tab === 'used' ? 'ที่ใช้แล้ว' : 'ที่หมดอายุ'}
          </div>
        )}
        {filtered.map(coupon => (
          <div key={coupon.id} className={`bg-slate-800/50 rounded-xl border overflow-hidden ${coupon.status === 'available' ? 'border-green-500/20' : 'border-slate-700/50 opacity-60'}`}>
            <div className="flex">
              <div className={`w-20 flex items-center justify-center text-3xl ${coupon.status === 'available' ? 'bg-green-500/5' : 'bg-slate-800'}`}>
                🎫
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{coupon.brand}</span>
                </div>
                <h3 className="font-semibold text-xs">{coupon.discount}</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">{coupon.description}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px]">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock size={10} /> {coupon.status === 'used' ? `ใช้เมื่อ ${coupon.usedDate}` : `หมดอายุ ${coupon.expiryDate}`}
                  </span>
                </div>
              </div>
              {coupon.status === 'available' && (
                <button onClick={() => setShowQR(coupon.id)} className="px-3 flex items-center">
                  <QrCode size={24} className="text-orange-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Modal (Use Coupon) */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setShowQR(null)}>
          <div className="bg-slate-900 rounded-2xl p-8 text-center max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">ใช้คูปอง</h2>
            <div className="bg-white rounded-xl p-6 mb-4">
              <div className="w-40 h-40 mx-auto bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIj48cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMTEwIiB5PSIxMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMTAiIHk9IjExMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iNjAiIHk9IjYwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEyMCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjIwIiB5PSIxMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-contain bg-center bg-no-repeat"></div>
            </div>
            <p className="text-xs text-slate-400 mb-1">แสดง QR Code ให้พนักงาน</p>
            <p className="text-sm font-mono text-orange-400 font-bold">{coupons.find(c => c.id === showQR)?.code}</p>
            <div className="mt-4 p-3 bg-red-500/10 rounded-lg text-red-400 text-xs">
              ⚠️ คูปองจะหมดอายุใน <span className="font-bold">15:00</span> นาที หลังกดใช้
            </div>
            <button onClick={() => setShowQR(null)} className="w-full mt-4 py-3 bg-orange-500 text-white rounded-xl font-bold text-sm">
              ยืนยันใช้คูปอง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
