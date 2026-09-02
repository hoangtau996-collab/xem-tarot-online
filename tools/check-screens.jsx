// Kiểm tra mọi màn hình chính có vẽ được không, chạy tự động trước mỗi lần
// build (xem "prebuild" trong package.json).
//
// Vì sao cần: lỗi lúc chạy trong React không bị lint hay build bắt. Một biến
// đọc trước khi khai báo, một thuộc tính đọc trên undefined - cả hai đều biên
// dịch sạch sẽ rồi làm trắng trang ngay lần vẽ đầu tiên. Đã xảy ra một lần với
// trang Thần Số Học, và chỉ lộ ra khi thực sự đem đi vẽ thử.
//
// Giới hạn cần biết: đây là máy dò khói, không phải hệ thống chữa cháy. Nó vẽ
// một lượt phía máy chủ nên bắt được lỗi lúc vẽ, nhưng KHÔNG chạm tới lỗi
// trong trình xử lý sự kiện, trong useEffect, hay lỗi chỉ xảy ra trên trình
// duyệt thật. Phần đó do ErrorBoundary lo, để trang hỏng một mục chứ không
// trắng toàn bộ.

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../src/App.jsx';
import { Numerology } from '../src/components/Numerology.jsx';
import { Destiny } from '../src/components/Destiny.jsx';
import { Journal } from '../src/components/Journal.jsx';
import { ReadingResult } from '../src/components/ReadingResult.jsx';
import { SpreadSelector } from '../src/components/SpreadSelector.jsx';
import { CardDeck } from '../src/components/CardDeck.jsx';
import { Encyclopedia } from '../src/components/Encyclopedia.jsx';
import { TAROT_DECK } from '../src/data/tarotData.js';
import { SPREAD_TYPES, TAROT_DECKS_THEMES } from '../src/data/tarotSpreads.js';
import { deckLens } from '../src/data/deckLens.js';
import { translationCoverage } from '../src/data/tarot/cardText.js';
import { labelCoverage } from '../src/data/tarot/i18n/labels.js';

/* Phía máy chủ không có trình duyệt. Chỉ dựng đúng những thứ được đụng tới
   trong lúc vẽ - không giả lập cả DOM, vì càng giả lập nhiều thì phép thử
   càng xa với thực tế. */
/* Kho gia lap co that de ghi vao duoc: man Nhat Ky chi ve ra thu gi khi trong
   kho co ban ghi, nen mot stub luon tra null se ve ra man rong va khong kiem
   duoc gi. */
const STORE = {};
globalThis.localStorage = {
  getItem: (key) => (key in STORE ? STORE[key] : null),
  setItem: (key, value) => { STORE[key] = String(value); },
  removeItem: (key) => { delete STORE[key]; }
};
globalThis.window = Object.assign(globalThis.window || {}, {
  location: { hash: '#/xem-tarot', pathname: '/', search: '' }
});

const PROFILE = {
  fullName: 'Nguyen Van A',
  birthDate: '1985-07-23',
  birthTime: '07:30',
  gender: 'male',
  cityKey: 'hanoi',
  houseSystem: 'placidus'
};

// Hồ sơ thiếu giờ sinh: nhánh code khác hẳn (không có Cung Mọc, không chia nhà)
// nên phải thử riêng, đây là chỗ dễ vỡ nhất của phần chiêm tinh.
const NO_TIME = { ...PROFILE, birthTime: null };

const cards = Array.from({ length: 5 }, (_, i) => ({
  ...TAROT_DECK[(i * 17) % TAROT_DECK.length],
  isReversed: i % 2 === 0
}));

const noop = () => {};

/* Mot muc nhat ky Tarot co ghi bo bai, va mot muc cu luu tu truoc khi co bo
   bai. Muc cu phai van hien binh thuong - do la nhat ky that cua khach, khong
   duoc de no vo hay bien mat khi them truong moi. */
const JOURNAL_SEED = JSON.stringify([
  {
    id: 'journal-test-1',
    type: 'tarot',
    date: '01/01/2026',
    question: 'Cau hoi thu',
    spreadTitle: 'Trai 5 La',
    deckId: 'ancient_egyptian',
    deckName: 'Tarot Than Thoai Ai Cap Co Dai',
    deckIcon: '🏺',
    cards: cards.map(c => ({ nameVi: c.nameVi, isReversed: c.isReversed, icon: c.icon })),
    userNote: 'Ghi chu thu'
  },
  {
    id: 'journal-test-cu',
    type: 'tarot',
    date: '01/12/2025',
    question: 'Muc luu truoc khi co bo bai',
    spreadTitle: 'Trai 3 La',
    cards: cards.slice(0, 3).map(c => ({ nameVi: c.nameVi, isReversed: c.isReversed, icon: c.icon })),
    userNote: ''
  }
]);

const SCREENS = [
  /* Từ khi mỗi mục được tải riêng (React.lazy trong App), màn này chỉ còn vẽ
     phần khung: thanh điều hướng, quả cầu, chân trang, cộng màn chờ. Nội dung
     bên trong từng mục phải thử riêng ở các dòng dưới - nếu chỉ giữ mỗi dòng
     này thì phép thử vẫn xanh trong khi chẳng còn kiểm được nội dung nào. */
  ['Trang chủ (khung + màn chờ)', () => <App />],

  /* Ba màn dưới đây trước nay chưa từng được đem đi vẽ thử. Chúng lọt lưới vì
     màn "Trang chủ" từng vẽ hộ phần chọn kiểu trải bài, còn Tra Cứu thì không
     ai để ý. Giờ tách gói rồi thì phải kê tên từng cái. */
  ['Chọn kiểu trải bài', () => <SpreadSelector onSelectSpread={noop} lang="vi" />],
  ['Rút bài', () => (
    <CardDeck spread={SPREAD_TYPES[3]} deckTheme={TAROT_DECKS_THEMES[0]}
      question="Câu hỏi thử" onCompleteDraw={noop} lang="vi" />
  )],
  ['Tra Cứu', () => <Encyclopedia lang="vi" arcana="All" cardId={null} />],
  ['Thần Số Học - chưa nhập', () => <Numerology lang="vi" profile={null} onSaveProfile={noop} />],
  ['Thần Số Học - đã nhập', () => <Numerology lang="vi" profile={PROFILE} onSaveProfile={noop} />],
  ['Huyền Học', () => <Destiny lang="vi" section="mysticism" profile={PROFILE} onSaveProfile={noop} />],
  ['Chiêm Tinh - đủ giờ sinh', () => <Destiny lang="vi" section="astrology" profile={PROFILE} onSaveProfile={noop} />],
  ['Chiêm Tinh - thiếu giờ sinh', () => <Destiny lang="vi" section="astrology" profile={NO_TIME} onSaveProfile={noop} />],
  ['Nhật Ký (rỗng)', () => { delete STORE.celestial_tarot_journal; return <Journal lang="vi" />; }],

  /* Nhat ky co ban ghi. Man rong ve ra duoc khong chung minh duoc gi ve phan
     hien ban ghi. Doi chieu ba thu: ten bo bai da luu, cau lang kinh lay tu
     chinh bang lang kinh, va muc cu khong co bo bai van con nguyen. */
  ['Nhật Ký (có bản ghi)', () => {
    STORE.celestial_tarot_journal = JOURNAL_SEED;
    return <Journal lang="vi" />;
  }, [
    'Tarot Than Thoai Ai Cap Co Dai',
    deckLens('ancient_egyptian', 'vi').frame,
    'Muc luu truoc khi co bo bai'
  ]],
  ['Giải bài Tarot', () => (
    <ReadingResult drawnCards={cards} spread={{ id: 'five_aspects', title: 'Trải 5 Lá', cardCount: 5 }}
      question="Câu hỏi thử" onReset={noop} lang="vi" />
  )],
  // Hai ngôn ngữ còn lại chỉ cần một màn hình nặng nhất là đủ để lộ ra thiếu
  // bản dịch hay lỗi ghép chuỗi theo ngôn ngữ.
  ['Chiêm Tinh (English)', () => <Destiny lang="en" section="astrology" profile={PROFILE} onSaveProfile={noop} />],
  ['Chiêm Tinh (中文)', () => <Destiny lang="zh" section="astrology" profile={PROFILE} onSaveProfile={noop} />],

  // Bản giải Tarot ở hai ngôn ngữ kia. Chỗ này từng lọt lưới đúng vì không ai
  // đem đi vẽ thử: thân bài Tarot đọc từ một bảng dịch riêng (data/tarot/i18n),
  // đi đường khác hẳn phần chiêm tinh, nên phải thử tách ra.
  ['Giải bài Tarot (English)', () => (
    <ReadingResult drawnCards={cards} spread={{ id: 'five_aspects', title: 'Five Cards', cardCount: 5 }}
      question="Test question" onReset={noop} lang="en" />
  )],
  /* Bản giải với một bộ bài khác bộ mặc định: lăng kính của bộ bài đi qua một
     đường riêng (App -> ReadingResult -> analyzeReadingSession), nên phải có
     ít nhất một màn đi qua đường đó. */
  ['Giải bài Tarot (bộ Ai Cập)', () => (
    <ReadingResult drawnCards={cards} spread={{ id: 'five_aspects', title: 'Trải 5 Lá', cardCount: 5 }}
      deckTheme={TAROT_DECKS_THEMES.find(d => d.id === 'ancient_egyptian')}
      question="Câu hỏi thử" onReset={noop} lang="vi" />
  )],

  ['Giải bài Tarot (中文)', () => (
    <ReadingResult drawnCards={cards} spread={{ id: 'five_aspects', title: '五张牌', cardCount: 5 }}
      question="测试问题" onReset={noop} lang="zh" />
  )]
];

/* React thoat dau nhay va dau & khi ve ra HTML, nen chuoi doi chieu phai thoat
   y het thi moi tim thay. */
const escapeForHtml = (text = '') => text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#x27;');

const failures = [];

for (const [name, render, mustContain = []] of SCREENS) {
  try {
    const html = renderToStaticMarkup(render());
    if (!html || html.length < 500) {
      failures.push({ name, reason: `vẽ ra quá ít nội dung (${html.length} ký tự)` });
      continue;
    }
    /* Ve duoc chua chac la ve dung. Voi nhung man co doan chu bat buoc phai
       xuat hien, doi chieu thang - neu khong thi mot man vo noi dung van du
       500 ky tu khung va van xanh. */
    const absent = mustContain.filter(text => !html.includes(escapeForHtml(text)));
    if (absent.length) {
      failures.push({ name, reason: `thiếu đoạn chữ bắt buộc: ${absent.map(x => `"${x.slice(0, 40)}"`).join(', ')}` });
      continue;
    }
    console.log(`  OK   ${name}`);
  } catch (err) {
    failures.push({ name, reason: err.message, stack: err.stack });
  }
}

/* Độ phủ bản dịch Tarot.
   Cố tình KHÔNG làm vỡ build: dịch 78 lá là việc nội dung, làm dần từng bộ ẩn;
   chặn build lại thì trong lúc đó không sửa được gì khác. Nhưng phải in ra mỗi
   lần, để phần còn thiếu không lặng lẽ trôi ra bản phát hành. */
/* Moi bo bai phai co lang kinh o ca ba ngon ngu. Them bo bai thu bay ma quen
   lang kinh thi ban giai cua no lang le tut ve ban chung - khong ai thay. */
const checkDeckLens = () => {
  const missing = [];
  for (const deck of TAROT_DECKS_THEMES)
    for (const lang of ['vi', 'en', 'zh'])
      if (!deckLens(deck.id, lang)) missing.push(`${deck.id}/${lang}`);
  if (!missing.length) {
    console.log(`  lang kinh bo bai: ${TAROT_DECKS_THEMES.length}/${TAROT_DECKS_THEMES.length} bo du ca 3 ngon ngu`);
    return true;
  }
  console.error(`
✗ Thieu lang kinh cho: ${missing.join(', ')}`);
  return false;
};

const reportCoverage = () => {
  for (const lang of ['en', 'zh']) {
    const { total, done, missingCards } = translationCoverage(TAROT_DECK, lang);
    const percent = total ? Math.round((done / total) * 100) : 0;
    const line = `  ban dich ${lang}: ${done}/${total} doan (${percent}%)`;
    if (done === total) console.log(`${line} - du`);
    else console.log(`${line} - con ${missingCards.length} la chua dich, tam hien tieng Viet`);

    // Nhãn ngắn (nguyên tố + từ khoá) đi đường khác với phần luận giải, nên đếm riêng.
    const labels = labelCoverage(TAROT_DECK, lang);
    if (labels.length) console.log(`  nhan ${lang}    : con ${labels.length} nhan chua dich (vi du: ${labels.slice(0, 3).join(', ')})`);
  }
};

if (failures.length === 0) {
  console.log(`\n✓ ${SCREENS.length} màn hình đều vẽ được.`);
  reportCoverage();
  const lensOk = checkDeckLens();
  console.log('');
  process.exit(lensOk ? 0 : 1);
}

console.error('\n✗ CÓ MÀN HÌNH KHÔNG VẼ ĐƯỢC - đã dừng, không build.\n');
for (const f of failures) {
  console.error(`  ${f.name}: ${f.reason}`);
  if (f.stack) console.error(String(f.stack).split('\n').slice(1, 4).join('\n'));
}
console.error('\nSửa xong chạy lại "npm run build". Bản đang chạy trên trang không bị ảnh hưởng.\n');
process.exit(1);
