import { useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B4A] to-[#1B2B5B] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A96E] to-[#D4A853] flex items-center justify-center font-bold text-white text-xl shadow-lg">M</div>
        </div>
        <h1 className="text-4xl font-black text-white mb-2">MOBILIFE</h1>
        <p className="text-lg text-[#C9A96E] mb-2">Loyalty Platform</p>
        <p className="text-sm text-white/40 mb-12">MGC-ASIA Group — POC Demo</p>

        <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto">
          {/* Customer App */}
          <button
            onClick={() => navigate('/app')}
            className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left hover:border-[#C9A96E]/50 hover:bg-white/15 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-[#C9A96E]/15 flex items-center justify-center text-[#D4A853] mb-4 group-hover:scale-110 transition-transform">
              <Smartphone size={28} />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Customer App</h2>
            <p className="text-xs text-white/50 mb-4">Mobile application สำหรับลูกค้า — ดูคะแนน, แคมเปญ, แลกรางวัล</p>
            <div className="flex items-center gap-2 text-[#D4A853] text-sm font-semibold">
              เข้าสู่ระบบ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Admin Portal */}
          <button
            onClick={() => navigate('/admin')}
            className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left hover:border-[#C9A96E]/50 hover:bg-white/15 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              <Monitor size={28} />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Admin Portal</h2>
            <p className="text-xs text-white/50 mb-4">Operation Portal สำหรับทีมงาน — จัดการสมาชิก, แคมเปญ, รายงาน</p>
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
              เข้าสู่ระบบ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <div className="mt-12 text-xs text-white/30">
          <p>Powered by ANTS MarTech — AI-First Marketing Technology</p>
          <p className="mt-1">POC Version • Confidential • March 2026</p>
        </div>
      </div>
    </div>
  );
}
