import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type FilterType = 'all' | 'earned' | 'redeemed';

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  category: 'purchase' | 'redeem' | 'birthday' | 'weekend' | 'ecash' | 'service';
}

const historyData: HistoryItem[] = [
  { id: 'h1', title: 'Purchase — MGC Central', date: '2 May 2025', amount: 320, category: 'purchase' },
  { id: 'h2', title: '2× Weekend Bonus', date: '2 May 2025', amount: 320, category: 'weekend' },
  { id: 'h3', title: 'Redeemed Coffee Voucher', date: '28 Apr 2025', amount: -500, category: 'redeem' },
  { id: 'h4', title: 'Purchase — MGC Online', date: '25 Apr 2025', amount: 150, category: 'purchase' },
  { id: 'h5', title: 'Birthday Bonus', date: '1 Apr 2025', amount: 1000, category: 'birthday' },
  { id: 'h6', title: 'Redeemed E-Cash 100 THB', date: '15 Mar 2025', amount: -1000, category: 'ecash' },
  { id: 'h7', title: 'Purchase — MGC Phuket', date: '10 Mar 2025', amount: 280, category: 'purchase' },
  { id: 'h8', title: 'Service Bonus', date: '5 Mar 2025', amount: 200, category: 'service' },
  { id: 'h9', title: '2× Saturday Earn', date: '1 Mar 2025', amount: 180, category: 'weekend' },
  { id: 'h10', title: 'Redeemed Movie Voucher', date: '20 Feb 2025', amount: -300, category: 'redeem' },
];

const categoryStyle: Record<HistoryItem['category'], { icon: string; bg: string }> = {
  purchase: { icon: '💰', bg: '#DCFCE7' },
  redeem: { icon: '🎁', bg: '#FEE2E2' },
  birthday: { icon: '🎂', bg: '#FEF3C7' },
  weekend: { icon: '⭐', bg: '#FEF9C3' },
  ecash: { icon: '💳', bg: '#FCE7F3' },
  service: { icon: '🔧', bg: '#DBEAFE' },
};

export default function PointHistoryPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = historyData.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'earned') return item.amount > 0;
    if (filter === 'redeemed') return item.amount < 0;
    return true;
  });

  const tabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'earned', label: 'Earned' },
    { key: 'redeemed', label: 'Redeemed' },
  ];

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-[#1B2B5B]">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#1B2B5B]">Point History</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(tab => {
          const active = filter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                active
                  ? 'bg-white text-[#1B2B5B] border-[#C9A96E] shadow-sm'
                  : 'bg-white text-[#334155]/60 border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Transaction list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {filtered.map(item => {
          const style = categoryStyle[item.category];
          const isEarned = item.amount > 0;
          return (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
                style={{ background: style.bg }}
              >
                {style.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1B2B5B] truncate">{item.title}</p>
                <p className="text-[11px] text-[#334155]/50 mt-0.5">{item.date}</p>
              </div>
              <div
                className={`text-sm font-bold shrink-0 ${
                  isEarned ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {isEarned ? '+' : ''}
                {item.amount.toLocaleString()}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-[#334155]/50">
            ไม่มีรายการ
          </div>
        )}
      </div>
    </div>
  );
}
