import { useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, ArrowRight, FileText, ExternalLink } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const basePath = import.meta.env.BASE_URL || '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B4A] to-[#1B2B5B] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A96E] to-[#D4A853] flex items-center justify-center font-bold text-white text-xl shadow-lg">M</div>
        </div>
        <h1 className="text-4xl font-black text-white mb-2">MOBILIFE</h1>
        <p className="text-lg text-[#C9A96E] mb-2">Loyalty Platform</p>
        <p className="text-sm text-white/40 mb-10">MGC-ASIA Group — POC Demo & Proposals</p>

        {/* POC Demo Section */}
        <p className="text-xs text-[#C9A96E] uppercase tracking-widest font-semibold mb-4">Live POC Demo</p>
        <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto mb-12">
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

        {/* Proposal Section */}
        <p className="text-xs text-[#C9A96E] uppercase tracking-widest font-semibold mb-4">Proposal Documents</p>
        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {/* Plan A */}
          <a
            href={`${basePath}proposal.html`}
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
            <h2 className="text-base font-bold text-white mb-1">Full Platform</h2>
            <p className="text-xs text-white/50 mb-3">AI-First, Full-Featured — ครบทุก module, AI Personalization, Marketing Automation</p>
            <div className="flex items-center gap-2 text-[#D4A853] text-xs font-semibold">
              ดู Proposal <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Plan B */}
          <a
            href={`${basePath}plan-b.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:border-[#C9A96E]/50 hover:bg-white/15 transition-all block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <FileText size={20} />
              </div>
              <span className="text-[10px] bg-white/15 text-white/70 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Plan B</span>
            </div>
            <h2 className="text-base font-bold text-white mb-1">Essentials Plus</h2>
            <p className="text-xs text-white/50 mb-3">Smart Investment — On-Premise, React Native, IP Ownership Options</p>
            <div className="flex items-center gap-2 text-white/70 text-xs font-semibold">
              ดู Proposal <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Plan C */}
          <a
            href={`${basePath}plan-c.html`}
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
            <h2 className="text-base font-bold text-white mb-1">Starter</h2>
            <p className="text-xs text-white/50 mb-3">Budget-Optimized — Expo App, Core Features, Expansion Path</p>
            <div className="flex items-center gap-2 text-white/50 text-xs font-semibold">
              ดู Proposal <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>

        <div className="mt-12 text-xs text-white/30">
          <p>Powered by ANTS MarTech — AI-First Marketing Technology</p>
          <p className="mt-1">POC Version • Confidential • March 2026</p>
        </div>
      </div>
    </div>
  );
}
