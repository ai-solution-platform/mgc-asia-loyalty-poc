import { useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, ArrowRight, FileText, ExternalLink, Sparkles, Archive } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const basePath = import.meta.env.BASE_URL || '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B4A] to-[#1B2B5B] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center py-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A96E] to-[#D4A853] flex items-center justify-center font-bold text-white text-xl shadow-lg">M</div>
        </div>
        <h1 className="text-4xl font-black text-white mb-2">MOBILIFE</h1>
        <p className="text-lg text-[#C9A96E] mb-2">Loyalty Platform</p>
        <p className="text-sm text-white/40 mb-2">MGC-ASIA Group — POC Demo & Proposals</p>
        <p className="text-xs text-white/30 mb-10">For MGC-ASIA / By True Business</p>

        {/* POC Demo Section */}
        <p className="text-xs text-[#C9A96E] uppercase tracking-widest font-semibold mb-1">Live POC Demo</p>
        <p className="text-[11px] text-emerald-300/90 mb-4 flex items-center justify-center gap-1.5">
          <Sparkles size={11} /> Powered by AI น้องใบเตย
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto mb-12">
          {/* Customer Experience — LINE LIFF */}
          <button
            onClick={() => {
              sessionStorage.removeItem('mobilife_line_authed');
              navigate('/app');
            }}
            className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left hover:border-[#06C755]/50 hover:bg-white/15 transition-all"
          >
            <span className="absolute top-3 right-3 text-[9px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: '#06C755' }}>
              LINE
            </span>
            <div className="w-14 h-14 rounded-xl bg-[#C9A96E]/15 flex items-center justify-center text-[#D4A853] mb-4 group-hover:scale-110 transition-transform">
              <Smartphone size={28} />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Customer Experience</h2>
            <p className="text-[10px] text-emerald-300/80 font-semibold uppercase tracking-wider mb-2">via LINE LIFF</p>
            <p className="text-xs text-white/50 mb-4">ลูกค้าใช้งานผ่าน LINE — ดูคะแนน, แคมเปญ, แลกรางวัล โดยไม่ต้องติดตั้ง app</p>
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
            <p className="text-xs text-white/50 mb-4">Operation Portal สำหรับทีมงาน — จัดการสมาชิก, แคมเปญ, รายงาน + AI assistant</p>
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
              เข้าสู่ระบบ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Proposal Section v2 — Unified */}
        <p className="text-xs text-[#C9A96E] uppercase tracking-widest font-semibold mb-1">Proposal Document</p>
        <p className="text-[11px] text-white/50 mb-4">Version 2 — LINE LIFF · Cloud-Native · AI-Powered</p>
        <div className="max-w-md mx-auto">
          {/* Unified Proposal */}
          <a
            href={`${basePath}v2/proposal.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-br from-[#E2231A]/20 to-[#7E2A8E]/15 backdrop-blur-sm border-2 border-[#E2231A]/40 rounded-2xl p-8 text-left hover:border-[#E2231A]/70 hover:from-[#E2231A]/25 transition-all block shadow-[0_0_30px_rgba(226,35,26,0.15)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#E2231A]/20 flex items-center justify-center text-[#FF6B6B]">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">MOBILIFE Loyalty Platform</h2>
                <p className="text-[10px] text-[#FF8888] font-semibold uppercase tracking-wider">For MGC-ASIA · By True Business</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/5 rounded-lg p-2 text-center">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Total</p>
                <p className="text-sm font-bold text-[#FFD700]">฿8M</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2 text-center">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Timeline</p>
                <p className="text-sm font-bold text-white">5 mo</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2 text-center">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">SLA</p>
                <p className="text-sm font-bold text-white">99.5%</p>
              </div>
            </div>
            <p className="text-xs text-white/60 mb-4">Cloud-Native · LINE-First · AI-Powered (น้องใบเตย) · CAPEX ฿4.5M + OPEX ฿3M + CR Pool ฿0.5M</p>
            <div className="flex items-center gap-2 text-[#FFD700] text-sm font-semibold">
              ดู Proposal <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>

        {/* v1 Archive */}
        <div className="mt-8 flex items-center justify-center gap-4 text-[11px]">
          <span className="text-white/30">Archive:</span>
          <a href={`${basePath}v1/plan-a-v1.html`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
            <Archive size={11} /> Plan A v1
          </a>
          <a href={`${basePath}v1/plan-b-v1.html`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
            <Archive size={11} /> Plan B v1
          </a>
          <a href={`${basePath}v1/plan-c-v1.html`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
            <Archive size={11} /> Plan C v1
          </a>
        </div>

        <div className="mt-12 text-xs text-white/30">
          <p>Powered by True Business — MarTech | AI | Digital Transformation</p>
          <p className="mt-1">POC Version • Confidential • For MGC-ASIA Group • Q2 2026</p>
        </div>
      </div>
    </div>
  );
}
