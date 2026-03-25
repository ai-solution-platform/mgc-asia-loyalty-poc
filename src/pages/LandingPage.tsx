import { useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-white text-xl">M</div>
        </div>
        <h1 className="text-4xl font-black text-white mb-2">MOBILIFE</h1>
        <p className="text-lg text-slate-400 mb-2">Loyalty Platform</p>
        <p className="text-sm text-slate-500 mb-12">MGC-ASIA Group — POC Demo</p>

        <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto">
          {/* Customer App */}
          <button
            onClick={() => navigate('/app')}
            className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-left hover:border-orange-500/30 hover:bg-slate-800/80 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
              <Smartphone size={28} />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Customer App</h2>
            <p className="text-xs text-slate-400 mb-4">Mobile application สำหรับลูกค้า — ดูคะแนน, แคมเปญ, แลกรางวัล</p>
            <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold">
              เข้าสู่ระบบ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Admin Portal */}
          <button
            onClick={() => navigate('/admin')}
            className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-left hover:border-blue-500/30 hover:bg-slate-800/80 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Monitor size={28} />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Admin Portal</h2>
            <p className="text-xs text-slate-400 mb-4">Operation Portal สำหรับทีมงาน — จัดการสมาชิก, แคมเปญ, รายงาน</p>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
              เข้าสู่ระบบ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <div className="mt-12 text-xs text-slate-600">
          <p>Powered by ANTS MarTech — AI-First Marketing Technology</p>
          <p className="mt-1">POC Version • Confidential • March 2026</p>
        </div>
      </div>
    </div>
  );
}
