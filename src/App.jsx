import React, { useState, useEffect } from 'react';
import { StarfieldBackground } from './components/StarfieldBackground';
import { Navbar } from './components/Navbar';
import { SpreadSelector } from './components/SpreadSelector';
import { CardDeck } from './components/CardDeck';
import { ReadingResult } from './components/ReadingResult';
import { CosmicOrb } from './components/CosmicOrb';
import { Encyclopedia } from './components/Encyclopedia';
import { Numerology } from './components/Numerology';
import { Destiny } from './components/Destiny';
import { Journal } from './components/Journal';
import { VisitorCounter } from './components/VisitorCounter';
import { SPREAD_TYPES, TAROT_DECKS_THEMES } from './data/tarotData';
import { TRANSLATIONS } from './data/translations';
import { useHashRoute, buildPath, navigate } from './utils/router';
import { Sparkles } from 'lucide-react';

// Hồ sơ ngày sinh dùng chung cho tab Thần Số Học và tab Huyền Học. Giữ ở App
// (và nhớ qua localStorage) nên khách chỉ nhập một lần là hai tab cùng dùng.
const PROFILE_KEY = 'phealing_mystic_profile';

const loadProfile = () => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && data.birthDate ? data : null;
  } catch {
    return null;
  }
};

export function App() {
  const [lang, setLang] = useState('vi'); // 'vi', 'en', 'zh'

  // Tab đang mở do link trên thanh địa chỉ quyết định, không phải state riêng:
  // nhờ vậy nút Quay lại / Tiến tới của trình duyệt và link dán vào đều đúng.
  const route = useHashRoute();
  const activeTab = route.tab;

  const [readingStep, setReadingStep] = useState('selector'); // 'selector', 'deck', 'result'

  const [selectedSpread, setSelectedSpread] = useState(SPREAD_TYPES[3]);
  const [selectedDeckTheme, setSelectedDeckTheme] = useState(TAROT_DECKS_THEMES[0]);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState([]);
  const [mysticProfile, setMysticProfile] = useState(loadProfile);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  // Link rỗng hoặc gõ sai được thay bằng link chuẩn của tab đang hiện, để thanh
  // địa chỉ luôn là một link sao chép được. Dùng replace nên nút Quay lại không
  // đưa khách trở lại đúng cái link hỏng vừa sửa.
  useEffect(() => {
    const canonical = buildPath(activeTab, route);
    if (window.location.hash !== canonical) navigate(canonical, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Đổi tiêu đề trình duyệt theo từng mục: link chia sẻ và mục lịch sử hiện
  // đúng tên chức năng thay vì cùng một tiêu đề cho cả trang.
  useEffect(() => {
    const pageTitle = t.routeTitles[activeTab] || t.routeTitles.reading;
    document.title = `${pageTitle} | ${t.appTitle} - ${t.appSubtitle}`;
  }, [activeTab, t]);

  const handleSaveMysticProfile = (profile) => {
    setMysticProfile(profile);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      /* localStorage bị chặn - vẫn xem được trong phiên hiện tại */
    }
  };

  const handleSelectSpread = (spread, deckTheme, qText) => {
    setSelectedSpread(spread);
    setSelectedDeckTheme(deckTheme);
    setQuestion(qText);
    setReadingStep('deck');
  };

  const handleCompleteDraw = (cards) => {
    setDrawnCards(cards);
    setReadingStep('result');
  };

  const handleResetReading = () => {
    setDrawnCards([]);
    setReadingStep('selector');
  };

  /* Bam logo = ve dau trang chu that su: doi ve tab Tarot, xoa phien trai bai
     dang do va keo len dau trang. Neu chi doi hash thi khach dang xem ket qua
     se khong thay gi xay ra, vi hash luc do da la #/xem-tarot. */
  const handleGoHome = () => {
    handleResetReading();
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative text-gray-100 selection:bg-purple-500 selection:text-white">
      
      {/* Dynamic Starfield Canvas Background */}
      <StarfieldBackground />

      {/* Cosmic Navigation Header */}
      <Navbar
        activeTab={activeTab}
        lang={lang}
        setLang={setLang}
        onGoHome={handleGoHome}
      />

      {/* Main Body View Switching */}
      <main className="flex-1 pb-16">

        {/* Quả cầu thông điệp Vũ Trụ - đứng đầu trang, khách vừa vào đã thấy.
            Đặt ngoài phần chuyển tab nên không lẫn vào bản giải bài. */}
        <CosmicOrb lang={lang} />

        {activeTab === 'reading' && (
          <>
            {readingStep === 'selector' && (
              <SpreadSelector
                onSelectSpread={handleSelectSpread}
                lang={lang}
              />
            )}

            {readingStep === 'deck' && (
              <CardDeck
                spread={selectedSpread}
                deckTheme={selectedDeckTheme}
                question={question}
                onCompleteDraw={handleCompleteDraw}
                lang={lang}
              />
            )}

            {readingStep === 'result' && (
              <ReadingResult
                drawnCards={drawnCards}
                spread={selectedSpread}
                question={question}
                onReset={handleResetReading}
                lang={lang}
              />
            )}
          </>
        )}

        {/* data-section: khoá bảng màu riêng cho từng mục. Các class dùng chung
            (glass-panel, gold-gradient-text, bg-space...) được đổi tông trong
            index.css theo thuộc tính này, nên không phải nhân bản class. */}
        {activeTab === 'numerology' && (
          <div data-section="numerology">
            <Numerology
              lang={lang}
              profile={mysticProfile}
              onSaveProfile={handleSaveMysticProfile}
            />
          </div>
        )}

        {/* Ban Menh tu dat data-section theo he dang mo, vi hai he con dung hai
            bang mau khac nhau. */}
        {activeTab === 'destiny' && (
          <Destiny
            lang={lang}
            section={route.destiny}
            profile={mysticProfile}
            onSaveProfile={handleSaveMysticProfile}
          />
        )}

        {activeTab === 'encyclopedia' && (
          <Encyclopedia lang={lang} arcana={route.arcana} cardId={route.cardId} />
        )}

        {activeTab === 'journal' && <Journal lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-purple-500/20 text-center text-xs text-gray-400 backdrop-blur-md bg-space/40 space-y-3">
        {/* Visitor Analytics Widget */}
        <VisitorCounter lang={lang} variant="footer" />

        {/* footerText đã chứa sẵn tên thương hiệu ở cả 3 ngôn ngữ,
            nên không lặp lại appTitle ở đây nữa. */}
        <p className="px-4 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5">
          <span>{t.footerText}</span>
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        </p>
        <p className="px-4 text-xs text-purple-300/60 font-light">
          {t.footerSubtext}
        </p>
      </footer>

    </div>
  );
}

export default App;
