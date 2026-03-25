import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'TH' | 'EN' | 'CN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  showToast: boolean;
  toastMessage: string;
  triggerToast: (msg: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'TH',
  setLanguage: () => {},
  showToast: false,
  toastMessage: '',
  triggerToast: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('TH');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const messages: Record<Language, string> = {
      TH: 'ภาษาถูกเปลี่ยนเรียบร้อย',
      EN: 'Language changed successfully',
      CN: '语言已成功更改',
    };
    triggerToast(messages[lang]);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, showToast, toastMessage, triggerToast }}>
      {children}
      {/* Global Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
          <div className="bg-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {toastMessage}
          </div>
        </div>
      )}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
