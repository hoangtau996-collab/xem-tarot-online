import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { StarfieldBackground } from './components/StarfieldBackground';
import { Navbar } from './components/Navbar';
import { CosmicOrb } from './components/CosmicOrb';
import { VisitorCounter } from './components/VisitorCounter';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SectionError } from './components/SectionError';
import { SectionLoading } from './components/SectionLoading';
import { SPREAD_TYPES, TAROT_DECKS_THEMES } from './data/tarotSpreads';
import { TRANSLATIONS } from './data/translations';
import { useRoute, buildPath, navigate, redirectLegacyHash, SITE_URL } from './utils/router';
import { readInitialLang, rememberLang, syncHtmlLang } from './utils/lang';
import { pageMeta } from './utils/pageMeta';
import { Sparkles } from 'lucide-react';

/* Mỗi mục là một gói riêng, chỉ tải khi khách mở tới.
 *
 * Trước đây tất cả nằm chung một gói 440KB: khách chỉ muốn rút một lá bài vẫn
 * phải tải cả astronomy-engine (chỉ tab Chiêm Tinh dùng), cả 78 lá bài kèm bản
 * dịch, cả dữ liệu thần số học và huyền học. Phần lớn khách không mở hết năm
 * mục, nên phần lớn số đó là tải phí.
 *
 * Thanh điều hướng, quả cầu thông điệp và chân trang vẫn nạp ngay: chúng có
 * mặt ở mọi mục, tách ra chỉ thêm một vòng chờ chứ không tiết kiệm được gì. */
const SpreadSelector = lazy(() => import('./components/SpreadSelector').then(m => ({ default: m.SpreadSelector })));
const CardDeck = lazy(() => import('./components/CardDeck').then(m => ({ default: m.CardDeck })));
const ReadingResult = lazy(() => import('./components/ReadingResult').then(m => ({ default: m.ReadingResult })));
const Encyclopedia = lazy(() => import('./components/Encyclopedia').then(m => ({ default: m.Encyclopedia })));
const Numerology = lazy(() => import('./components/Numerology').then(m => ({ default: m.Numerology })));
const Destiny = lazy(() => import('./components/Destiny').then(m => ({ default: m.Destiny })));
const Journal = lazy(() => import('./components/Journal').then(m => ({ default: m.Journal })));

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
  /* Ngôn ngữ đọc từ ?lang= trên link, rồi tới bộ nhớ máy, rồi mới tới tiếng
     Việt - xem utils/lang.js. Trước đây chỗ này là useState('vi') trần, nên
     tải lại trang là mất lựa chọn, và link chia sẻ luôn mở ra tiếng Việt. */
  const [lang, setLang] = useState(readInitialLang);

  // Tab đang mở do link trên thanh địa chỉ quyết định, không phải state riêng:
  // nhờ vậy nút Quay lại / Tiến tới của trình duyệt và link dán vào đều đúng.
  const route = useRoute();
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
    // Link cũ dạng #/than-so-hoc vẫn phải mở đúng mục - xử lý trước, rồi mới
    // chuẩn hoá. Nếu chuẩn hoá trước thì hash bị vứt đi mất.
    if (redirectLegacyHash()) return;

    const canonical = buildPath(activeTab, route);
    if (window.location.pathname !== canonical) navigate(canonical, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Đổi màn thì đưa khách về đầu trang.
     Điều hướng bằng hash không tự cuộn khi không có phần tử nào trùng id, nên
     trước đây khách đang đọc cuối bản Thần Số Học mà bấm sang Tarot sẽ rơi vào
     giữa trang - rất rõ trên điện thoại.

     Cố ý chỉ theo dõi "màn đang xem", không theo dõi cả route:
       - Mở một lá bài trong Tra Cứu chỉ là mở hộp thoại, cuộn nền lúc đó là sai.
       - Lần vẽ đầu tiên bỏ qua, vì trình duyệt tự khôi phục vị trí cuộn khi
         tải lại trang; cuộn đè lên sẽ giật khách về đầu trang giữa lúc đọc.
     Cuộn tức thì chứ không mượt: đây là chuyển màn, kéo mượt qua một trang dài
     mất cả giây và cảm giác như trang bị treo. */
  const screenKey = `${activeTab}/${route.destiny}/${readingStep}`;
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' });
  }, [screenKey]);

  // Thẻ <html lang> phải khớp ngôn ngữ đang xem: trình đọc màn hình chọn giọng
  // theo thuộc tính này, và Google dựa vào đó để biết trang thuộc ngôn ngữ nào.
  useEffect(() => {
    syncHtmlLang(lang);
  }, [lang]);

  /* Tiêu đề, mô tả và địa chỉ chuẩn đổi theo từng mục.
     Chữ lấy từ utils/pageMeta - đúng nguồn mà bước dựng sẵn HTML dùng, nên
     bản khách thấy và bản máy tìm kiếm đọc không thể lệch nhau.

     Trang một lá bài giữ nguyên tiêu đề chung của mục Tra Cứu khi khách đi
     tới bằng cách bấm trong trang: muốn ghi đúng tên lá thì App phải nắm dữ
     liệu 78 lá, mà như vậy là kéo ngược nó về gói chính, phá đúng việc tách
     gói vừa làm. Bản dựng sẵn đã ghi đúng tên lá rồi, và đó mới là bản mà
     Google, Facebook và Zalo đọc. */
  useEffect(() => {
    const { title, description } = pageMeta(route, lang);
    document.title = title;

    const set = (selector, attr, value) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:title"]', 'content', title);
    set('link[rel="canonical"]', 'href', `${SITE_URL.replace(/\/$/, '')}${buildPath(route.tab, route)}`);
    set('meta[property="og:url"]', 'content', `${SITE_URL.replace(/\/$/, '')}${buildPath(route.tab, route)}`);
  }, [route, lang]);

  /* Mỗi lần đổi ngôn ngữ đều ghi lại: vào localStorage cho lần sau, và vào
     ?lang= trên đường dẫn để link khách sao chép mang theo đúng ngôn ngữ. */
  const handleSetLang = (next) => {
    setLang(rememberLang(next));
  };

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
        setLang={handleSetLang}
        onGoHome={handleGoHome}
      />

      {/* Main Body View Switching */}
      {/* Luoi an toan chi boc phan noi dung muc: thanh dieu huong va chan trang
          nam ngoai nen mot muc hong thi khach van bam sang muc khac duoc.
          key la tab dang mo: doi muc thi React dung lai khoi nay voi trang thai
          sach, nen mot muc hong khong keo theo cac muc sau cung hien loi. */}
      <main className="flex-1 pb-16">
        <ErrorBoundary key={activeTab} fallback={<SectionError lang={lang} />}>

        {/* Quả cầu thông điệp Vũ Trụ - đứng đầu trang, khách vừa vào đã thấy.
            Đặt ngoài phần chuyển tab nên không lẫn vào bản giải bài. */}
        <CosmicOrb lang={lang} />

        {/* Ranh giới chờ đặt SAU quả cầu, không bọc nó: quả cầu nạp sẵn trong
            gói chính nên phải hiện ngay, nếu bọc chung thì nó cũng bị giữ lại
            cho tới khi mã của mục tải xong. */}
        <Suspense fallback={<SectionLoading lang={lang} />}>

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

        </Suspense>
        </ErrorBoundary>
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
