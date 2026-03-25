import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Search, Check, AlertTriangle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

interface TransferRecord { id: string; type: 'out' | 'in'; targetName: string; targetId: string; amount: number; fee: number; date: string; }

const mockHistory: TransferRecord[] = [
  { id: 't1', type: 'out', targetName: 'พิมพ์ใจ ลิ้มประเสริฐ', targetId: 'MOB-2024-00002', amount: 5000, fee: 500, date: '2026-03-20' },
  { id: 't2', type: 'in', targetName: 'อริสรา จิตรดำรงค์', targetId: 'MOB-2024-00004', amount: 3000, fee: 0, date: '2026-03-15' },
  { id: 't3', type: 'out', targetName: 'ชัยวัฒน์ สุขเจริญ', targetId: 'MOB-2024-00005', amount: 2000, fee: 200, date: '2026-03-10' },
];

export default function TransferPage() {
  const navigate = useNavigate();
  const { triggerToast: _triggerToast } = useLanguage();
  const [tab, setTab] = useState<'transfer' | 'history'>('transfer');
  const [memberId, setMemberId] = useState('');
  const [amount, setAmount] = useState('');
  const [foundMember, setFoundMember] = useState<{ name: string; id: string } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [history, setHistory] = useState(mockHistory);

  const fee = Math.ceil(Number(amount) * 0.1);
  const total = Number(amount) + fee;

  const searchMember = () => {
    if (memberId === 'MOB-2024-00002') setFoundMember({ name: 'พิมพ์ใจ ลิ้มประเสริฐ', id: 'MOB-2024-00002' });
    else if (memberId === 'MOB-2024-00004') setFoundMember({ name: 'อริสรา จิตรดำรงค์', id: 'MOB-2024-00004' });
    else if (memberId === 'MOB-2024-00005') setFoundMember({ name: 'ชัยวัฒน์ สุขเจริญ', id: 'MOB-2024-00005' });
    else if (memberId.length >= 5) setFoundMember({ name: 'สมาชิก MOBILIFE', id: memberId });
    else setFoundMember(null);
  };

  const confirmTransfer = () => {
    if (!foundMember || !amount || Number(amount) <= 0 || total > currentUser.points) return;
    setShowConfirm(false); setShowSuccess(true);
    setHistory(prev => [{ id: `t${Date.now()}`, type: 'out', targetName: foundMember.name, targetId: foundMember.id, amount: Number(amount), fee, date: '2026-03-25' }, ...prev]);
  };

  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-[#1B2B5B]"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold text-[#1B2B5B]">โอนคะแนน</h1>
      </div>

      <div className="bg-gradient-to-br from-[#0D1B4A] to-[#1B2B5B] rounded-2xl p-4 text-center shadow-xl">
        <p className="text-xs text-white/60">คะแนนคงเหลือ</p>
        <p className="text-3xl font-black text-white mt-1">{currentUser.points.toLocaleString()}</p>
        <p className="text-[10px] text-white/40 mt-1">ค่าธรรมเนียมการโอน 10%</p>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        <button onClick={() => setTab('transfer')} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${tab === 'transfer' ? 'bg-white text-[#1B2B5B] shadow-sm' : 'text-[#334155]/50'}`}>โอนคะแนน</button>
        <button onClick={() => setTab('history')} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${tab === 'history' ? 'bg-white text-[#1B2B5B] shadow-sm' : 'text-[#334155]/50'}`}>ประวัติการโอน</button>
      </div>

      {tab === 'transfer' && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[#334155]/50 block mb-1.5">หมายเลขสมาชิกผู้รับ</label>
            <div className="flex gap-2">
              <input type="text" value={memberId} onChange={e => { setMemberId(e.target.value); setFoundMember(null); }} placeholder="MOB-2024-XXXXX"
                className="flex-1 bg-[#F5F7FA] border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-[#1B2B5B] placeholder-gray-400 focus:outline-none focus:border-[#1B2B5B]/30" />
              <button onClick={searchMember} className="px-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"><Search size={18} className="text-[#1B2B5B]" /></button>
            </div>
          </div>
          {foundMember && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-600">{foundMember.name[0]}</div>
              <div><p className="text-sm font-semibold text-[#1B2B5B]">{foundMember.name}</p><p className="text-[10px] text-[#334155]/50">{foundMember.id}</p></div>
              <Check size={16} className="text-green-500 ml-auto" />
            </div>
          )}
          <div>
            <label className="text-xs text-[#334155]/50 block mb-1.5">จำนวนคะแนนที่จะโอน</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" min={1}
              className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl py-3 px-3 text-lg font-bold text-[#1B2B5B] placeholder-gray-300 focus:outline-none focus:border-[#1B2B5B]/30 text-center" />
          </div>
          {amount && Number(amount) > 0 && (
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-[#334155]/50">คะแนนที่โอน</span><span className="text-[#1B2B5B]">{Number(amount).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#334155]/50">ค่าธรรมเนียม (10%)</span><span className="text-yellow-600">{fee.toLocaleString()}</span></div>
              <div className="flex justify-between font-bold pt-1 border-t border-gray-100"><span className="text-[#1B2B5B]">คะแนนที่หักรวม</span><span className={total > currentUser.points ? 'text-red-500' : 'text-[#C9A96E]'}>{total.toLocaleString()}</span></div>
              {total > currentUser.points && <div className="flex items-center gap-1 text-red-500 text-[10px]"><AlertTriangle size={12} /> คะแนนไม่เพียงพอ</div>}
            </div>
          )}
          <button onClick={() => setShowConfirm(true)} disabled={!foundMember || !amount || Number(amount) <= 0 || total > currentUser.points}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${foundMember && amount && Number(amount) > 0 && total <= currentUser.points ? 'bg-[#1B2B5B] text-white active:scale-[0.98] hover:bg-[#0D1B4A]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            <Send size={16} /> ยืนยันการโอน
          </button>
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-2">
          {history.length === 0 && <div className="text-center py-12 text-[#334155]/40 text-sm">ยังไม่มีประวัติการโอน</div>}
          {history.map(record => (
            <div key={record.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${record.type === 'out' ? 'bg-[#C9A96E]/10 text-[#C9A96E]' : 'bg-green-50 text-green-600'}`}>
                {record.type === 'out' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
              </div>
              <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate text-[#1B2B5B]">{record.type === 'out' ? 'โอนให้' : 'รับจาก'} {record.targetName}</p><p className="text-[10px] text-[#334155]/50">{record.targetId} &bull; {record.date}</p></div>
              <div className={`text-sm font-bold ${record.type === 'out' ? 'text-[#C9A96E]' : 'text-green-600'}`}>{record.type === 'out' ? '-' : '+'}{record.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      {showConfirm && foundMember && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-center text-[#1B2B5B]">ยืนยันการโอนคะแนน</h2>
            <div className="bg-[#F5F7FA] rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-[#334155]/50">ผู้รับ</span><span className="font-semibold text-[#1B2B5B]">{foundMember.name}</span></div>
              <div className="flex justify-between"><span className="text-[#334155]/50">หมายเลข</span><span className="text-[#1B2B5B]">{foundMember.id}</span></div>
              <div className="flex justify-between"><span className="text-[#334155]/50">คะแนน</span><span className="text-[#1B2B5B]">{Number(amount).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#334155]/50">ค่าธรรมเนียม</span><span className="text-yellow-600">{fee.toLocaleString()}</span></div>
              <div className="flex justify-between font-bold pt-2 border-t border-gray-200"><span className="text-[#1B2B5B]">รวมหัก</span><span className="text-[#C9A96E]">{total.toLocaleString()}</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 bg-gray-100 text-[#334155] rounded-xl text-xs font-semibold">ยกเลิก</button>
              <button onClick={confirmTransfer} className="flex-1 py-2.5 bg-[#1B2B5B] text-white rounded-xl text-xs font-semibold hover:bg-[#0D1B4A]">ยืนยัน</button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={() => { setShowSuccess(false); setMemberId(''); setAmount(''); setFoundMember(null); }}>
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-green-50 mx-auto mb-4 flex items-center justify-center"><Check size={32} className="text-green-500" /></div>
            <h2 className="text-xl font-bold mb-2 text-[#1B2B5B]">โอนสำเร็จ!</h2>
            <p className="text-sm text-[#334155]/60 mb-6">คะแนน {Number(amount).toLocaleString()} pts ถูกโอนเรียบร้อยแล้ว</p>
            <button onClick={() => { setShowSuccess(false); setMemberId(''); setAmount(''); setFoundMember(null); }} className="w-full py-3 bg-[#1B2B5B] text-white rounded-xl font-bold text-sm hover:bg-[#0D1B4A]">ตกลง</button>
          </div>
        </div>
      )}
    </div>
  );
}
