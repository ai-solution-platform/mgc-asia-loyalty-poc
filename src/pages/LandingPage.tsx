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

        {/* Proposal Section v2 */}
        <p className="text-xs text-[#C9A96E] uppercase tracking-widest font-semibold mb-1">Proposal Documents</p>
        <p className="text-[11px] text-white/50 mb-4">Version 2 — LINE LIFF · Cloud · True Business</p>
        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {/* Plan A — Premium */}
          <a
            href={`${basePath}v2/plan-a.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-[#C9A96E]/20 to-[#D4A853]/10 backdrop-blur-sm border border-[#C9A96E]/30 rounded-2xl p-6 text-left hover:border-[#C9A96E]/60 hover:from-[#C9A96E]/25 transition-all block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9A96E]/20 flex items-center justify-center text-[#D4A853]">
                <FileText size={20} />
              </div>
              <span className="text-[10px] bg-[#C9A96E]/20 text-[#D4A853] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Plan A</span>
            </div>
            <h2 className="text-base font-bold text-white mb-1">Premium</h2>
            <p className="text-[11px] text-[#D4A853] font-semibold mb-2">฿11M · True IDC</p>
            <p className="text-xs text-white/50 mb-3">Enterprise-grade — Dedicated cloud, 24/7 managed, full AI suite, 99.9% SLA</p>
            <div className="flex items-center gap-2 text-[#D4A853] text-xs font-semibold">
              ดู Proposal <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Plan B — Standard (RECOMMENDED) */}
          <a
            href={`${basePath}v2/plan-b.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-br from-[#E2231A]/20 to-[#7E2A8E]/15 backdrop-blur-sm border-2 border-[#E2231A]/40 rounded-2xl p-6 text-left hover:border-[#E2231A]/70 hover:from-[#E2231A]/25 transition-all block shadow-[0_0_30px_rgba(226,35,26,0.15)]"
          >
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white px-3 py-1 rounded-full whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #E2231A, #C9A96E)' }}>
              ★ RECOMMENDED
            </span>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#E2231A]/20 flex items-center justify-center text-[#FF6B6B]">
                <FileText size={20} />
              </div>
              <span className="text-[10px] bg-[#E2231A]/20 text-[#FF6B6B] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Plan B</span>
            </div>
            <h2 className="text-base font-bold text-white mb-1">Standard</h2>
            <p className="text-[11px] text-[#FF8888] font-semibold mb-2">฿8M · Hybrid Cloud</p>
            <p className="text-xs text-white/50 mb-3">Sweet spot — Hybrid (UIH+AWS), full AI, business hrs+on-call, 99.5% SLA</p>
            <div className="flex items-center gap-2 text-[#FF8888] text-xs font-semibold">
              ดู Proposal <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Plan C — Lean */}
          <a
            href={`${basePath}v2/plan-c.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-left hover:border-white/30 hover:bg-white/10 transition-all block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60">
                <FileText size={20} />
              </div>
              <span className="text-[10px] bg-white/10 text-white/50 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Plan C</span>
            </div>
            <h2 className="text-base font-bold text-white mb-1">Lean</h2>
            <p className="text-[11px] text-white/60 font-semibold mb-2">฿5.5M · AWS Public</p>
            <p className="text-xs text-white/50 mb-3">Smart entry — Cloud-native AWS, basic AI, self-service+, 99.0% SLA</p>
            <div className="flex items-center gap-2 text-white/50 text-xs font-semibold">
              ดู Proposal <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
