import { useState } from 'react';
import { appointments } from '../../data/mockData';
import { Calendar, Clock, MapPin, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const brands = ['BMW', 'MINI', 'Honda', 'Harley-Davidson', 'Maserati', 'Peugeot'];
const types = [
  { key: 'test_drive', label: 'ทดลองขับ' },
  { key: 'service', label: 'เข้ารับบริการ' },
  { key: 'partner', label: 'บริการพาร์ทเนอร์' },
];

export default function AppointmentPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [booked, setBooked] = useState(false);

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-bold">นัดหมาย</h1>
      </div>

      {/* Existing Appointments */}
      <div className="space-y-3">
        {appointments.map(apt => (
          <div key={apt.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{apt.brand}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${apt.status === 'confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                {apt.status === 'confirmed' ? 'ยืนยันแล้ว' : 'รอยืนยัน'}
              </span>
            </div>
            <h3 className="text-sm font-semibold">{apt.type === 'test_drive' ? 'ทดลองขับ' : apt.type === 'service' ? 'เข้ารับบริการ' : 'พาร์ทเนอร์'}</h3>
            <div className="mt-2 space-y-1 text-xs text-slate-400">
              <div className="flex items-center gap-2"><Calendar size={12} />{apt.date}</div>
              <div className="flex items-center gap-2"><Clock size={12} />{apt.time}</div>
              <div className="flex items-center gap-2"><MapPin size={12} />{apt.branch}</div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">{apt.notes}</p>
          </div>
        ))}
      </div>

      {/* New Appointment Button */}
      <button onClick={() => setShowForm(true)} className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-sm">
        + จองนัดหมายใหม่
      </button>

      {/* Booking Form Modal */}
      {showForm && !booked && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-slate-900 rounded-t-3xl w-full max-w-md p-6 space-y-4 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-2"></div>
            <h2 className="text-lg font-bold">จองนัดหมายใหม่</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">ประเภท</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white">
                  {types.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">แบรนด์</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white">
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">วันที่</label>
                <input type="date" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">เวลา</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white">
                  {['09:00','09:30','10:00','10:30','11:00','13:00','13:30','14:00','14:30','15:00','15:30','16:00'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">หมายเหตุ</label>
                <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white h-20" placeholder="รายละเอียดเพิ่มเติม..."></textarea>
              </div>
            </div>
            <button onClick={() => setBooked(true)} className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-sm">
              ยืนยันนัดหมาย
            </button>
          </div>
        </div>
      )}

      {/* Booking Success */}
      {booked && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => { setBooked(false); setShowForm(false); }}>
          <div className="bg-slate-900 rounded-2xl p-8 text-center max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-green-500/10 mx-auto mb-4 flex items-center justify-center">
              <Check size={32} className="text-green-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">จองสำเร็จ!</h2>
            <p className="text-sm text-slate-400 mb-6">ระบบจะส่งการยืนยันทาง SMS และ Push Notification</p>
            <button onClick={() => { setBooked(false); setShowForm(false); }} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-sm">ตกลง</button>
          </div>
        </div>
      )}
    </div>
  );
}
