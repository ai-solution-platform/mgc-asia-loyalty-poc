import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Loader2 } from 'lucide-react';

const LINE_GREEN = '#06C755';

// Inline LINE-style logo (rounded square with speech bubble "LINE" wordmark approximation)
function LineLogo({ size = 48 }: { size?: number }) {
  return (
    <div
      className="rounded-[28%] flex items-center justify-center font-black text-white shadow-lg"
      style={{
        width: size,
        height: size,
        background: LINE_GREEN,
        fontSize: size * 0.32,
        letterSpacing: '-0.03em',
      }}
    >
      LINE
    </div>
  );
}

export default function LineLoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'login' | 'consent' | 'redirecting'>('login');

  const goToApp = () => {
    sessionStorage.setItem('mobilife_line_authed', '1');
    navigate('/app');
  };

  const handleLogin = () => {
    setStep('consent');
  };

  const handleAllow = () => {
    setStep('redirecting');
    setTimeout(goToApp, 900);
  };

  const handleSkip = () => {
    sessionStorage.setItem('mobilife_line_authed', '1');
    navigate('/app');
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{ background: LINE_GREEN }}
    >
      <div className="w-full max-w-sm">
        {step === 'login' && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <LineLogo size={64} />
            </div>
            <h1 className="text-white text-2xl font-bold mb-2">เข้าสู่ระบบด้วย LINE</h1>
            <p className="text-white/85 text-sm mb-12">
              MOBILIFE ใช้ LINE Login เพื่อความปลอดภัย
              <br />และความสะดวกในการเข้าใช้งาน
            </p>

            {/* MOBILIFE card */}
            <div className="bg-white rounded-2xl p-5 shadow-xl mb-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A96E] to-[#D4A853] flex items-center justify-center font-bold text-white text-lg shadow">
                  M
                </div>
                <div>
                  <p className="font-bold text-[#1B2B5B] text-sm">MOBILIFE</p>
                  <p className="text-[11px] text-[#334155]/60">MGC-ASIA Loyalty Platform</p>
                </div>
              </div>
              <p className="text-xs text-[#334155]/70 leading-relaxed">
                Loyalty platform สำหรับลูกค้า BMW, MINI, Rolls-Royce, BMW Motorrad และ Peugeot
              </p>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-white text-[#06C755] font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <LineLogo size={22} />
              <span>Login with LINE</span>
            </button>

            <button
              onClick={handleSkip}
              className="w-full mt-3 text-white/85 text-xs underline hover:text-white py-2"
            >
              Skip Login (Demo)
            </button>

            <p className="text-[10px] text-white/60 mt-8">
              By continuing, you agree to LINE Terms & MOBILIFE Privacy Policy
            </p>
          </div>
        )}

        {step === 'consent' && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header strip */}
            <div className="px-5 py-4 flex items-center gap-2 border-b border-gray-100" style={{ background: LINE_GREEN }}>
              <LineLogo size={22} />
              <span className="text-white text-xs font-semibold">LINE Login</span>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A96E] to-[#D4A853] flex items-center justify-center font-bold text-white text-lg">
                  M
                </div>
                <ChevronRight size={18} className="text-gray-400" />
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ background: LINE_GREEN }}
                >
                  <span className="text-xl">L</span>
                </div>
              </div>

              <h2 className="text-center font-bold text-[#1B2B5B] text-base mb-1">
                MOBILIFE ต้องการเข้าถึง:
              </h2>
              <p className="text-center text-[11px] text-[#334155]/60 mb-5">
                wants to access your LINE account
              </p>

              <div className="space-y-2.5 mb-6">
                <div className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded-lg">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: LINE_GREEN }}>
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1B2B5B]">Profile</p>
                    <p className="text-[10px] text-[#334155]/60">รูปโปรไฟล์ ชื่อแสดงผล และ user ID</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded-lg">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: LINE_GREEN }}>
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1B2B5B]">Email</p>
                    <p className="text-[10px] text-[#334155]/60">อีเมลที่ลงทะเบียนกับ LINE</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAllow}
                className="w-full text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
                style={{ background: LINE_GREEN }}
              >
                Allow
              </button>
              <button
                onClick={() => setStep('login')}
                className="w-full mt-2 text-[#334155]/60 text-xs py-2 hover:text-[#1B2B5B]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === 'redirecting' && (
          <div className="text-center text-white">
            <Loader2 size={48} className="animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium">กำลังเข้าสู่ MOBILIFE...</p>
            <p className="text-xs text-white/70 mt-1">Authenticating via LINE</p>
          </div>
        )}
      </div>
    </div>
  );
}
