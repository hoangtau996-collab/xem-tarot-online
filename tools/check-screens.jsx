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
import { TAROT_DECK } from '../src/data/tarotData.js';

/* Phía máy chủ không có trình duyệt. Chỉ dựng đúng những thứ được đụng tới
   trong lúc vẽ - không giả lập cả DOM, vì càng giả lập nhiều thì phép thử
   càng xa với thực tế. */
globalThis.localStorage = { getItem: () => null, setItem: () => {} };
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

const SCREENS = [
  ['Trang chủ', () => <App />],
  ['Thần Số Học - chưa nhập', () => <Numerology lang="vi" profile={null} onSaveProfile={noop} />],
  ['Thần Số Học - đã nhập', () => <Numerology lang="vi" profile={PROFILE} onSaveProfile={noop} />],
  ['Huyền Học', () => <Destiny lang="vi" section="mysticism" profile={PROFILE} onSaveProfile={noop} />],
  ['Chiêm Tinh - đủ giờ sinh', () => <Destiny lang="vi" section="astrology" profile={PROFILE} onSaveProfile={noop} />],
  ['Chiêm Tinh - thiếu giờ sinh', () => <Destiny lang="vi" section="astrology" profile={NO_TIME} onSaveProfile={noop} />],
  ['Nhật Ký', () => <Journal lang="vi" />],
  ['Giải bài Tarot', () => (
    <ReadingResult drawnCards={cards} spread={{ id: 'five_aspects', title: 'Trải 5 Lá', cardCount: 5 }}
      question="Câu hỏi thử" onReset={noop} lang="vi" />
  )],
  // Hai ngôn ngữ còn lại chỉ cần một màn hình nặng nhất là đủ để lộ ra thiếu
  // bản dịch hay lỗi ghép chuỗi theo ngôn ngữ.
  ['Chiêm Tinh (English)', () => <Destiny lang="en" section="astrology" profile={PROFILE} onSaveProfile={noop} />],
  ['Chiêm Tinh (中文)', () => <Destiny lang="zh" section="astrology" profile={PROFILE} onSaveProfile={noop} />]
];

const failures = [];

for (const [name, render] of SCREENS) {
  try {
    const html = renderToStaticMarkup(render());
    if (!html || html.length < 500) {
      failures.push({ name, reason: `vẽ ra quá ít nội dung (${html.length} ký tự)` });
      continue;
    }
    console.log(`  OK   ${name}`);
  } catch (err) {
    failures.push({ name, reason: err.message, stack: err.stack });
  }
}

if (failures.length === 0) {
  console.log(`\n✓ ${SCREENS.length} màn hình đều vẽ được.\n`);
  process.exit(0);
}

console.error('\n✗ CÓ MÀN HÌNH KHÔNG VẼ ĐƯỢC - đã dừng, không build.\n');
for (const f of failures) {
  console.error(`  ${f.name}: ${f.reason}`);
  if (f.stack) console.error(String(f.stack).split('\n').slice(1, 4).join('\n'));
}
console.error('\nSửa xong chạy lại "npm run build". Bản đang chạy trên trang không bị ảnh hưởng.\n');
process.exit(1);
