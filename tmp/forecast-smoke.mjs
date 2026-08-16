import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const store = {};
globalThis.localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { Numerology } = await server.ssrLoadModule('/src/components/Numerology.jsx');
const { Journal } = await server.ssrLoadModule('/src/components/Journal.jsx');
const { calcYearForecast } = await server.ssrLoadModule('/src/utils/numerology.js');
const { TRANSLATIONS } = await server.ssrLoadModule('/src/data/translations.js');

let fail = 0;
const expect = (label, cond, extra = '') => { if (!cond) fail++; console.log(`${cond ? 'ok  ' : 'FAIL'}  ${label}${extra ? '  ' + extra : ''}`); };

const profile = { fullName: 'Nguyễn Thị Minh Anh', birthDate: '1990-05-15', gender: 'female' };
const thisYear = new Date().getFullYear();

for (const lang of ['vi', 'en', 'zh']) {
  const t = TRANSLATIONS[lang];
  const html = renderToStaticMarkup(React.createElement(Numerology, { lang, profile, onSaveProfile: () => {} }));
  const f = calcYearForecast(15, 5, thisYear, lang);

  expect(`Co muc du bao (${lang})`, html.includes(t.numForecastTitle));
  expect(`Hien nam ca nhan + ten nam (${lang})`, html.includes(f.info.title) && html.includes(f.info.summary));
  expect(`Co trong tam + loi khuyen nam (${lang})`, html.includes(f.info.focus) && html.includes(f.info.advice));

  const missMonthName = t.monthNames.filter(m => !html.includes(m));
  expect(`Du 12 ten thang (${lang})`, missMonthName.length === 0, missMonthName.join(','));

  const missMonthText = f.months.filter(m => !html.includes(m.title) || !html.includes(m.summary));
  expect(`Du 12 luan giai thang (${lang})`, missMonthText.length === 0, missMonthText.map(m => 'T' + m.calendarMonth).join(','));

  // Nam sinh 1990 la gioi han duoi, khong duoc phep chon nam truoc do
  expect(`Co the chon nam tu 1990 den ${thisYear + 30} (${lang})`,
    html.includes('value="1990"') && html.includes(`value="${thisYear + 30}"`) && !html.includes('value="1989"'));

  expect(`Danh dau thang hien tai (${lang})`, html.includes(t.numCurrentMonthBadge));
  expect(`Khong lot chuoi thieu (${lang})`, !html.includes('undefined'));
}

// Nhat ky: ban ghi moi co nam du bao, ban ghi cu khong co van hien duoc
store['celestial_tarot_journal'] = JSON.stringify([
  { id: 'new', type: 'numerology', date: 'nay', name: 'A', birthDate: '1990-05-15', lifePath: 3, lifePathTitle: 'Người Sáng Tạo',
    numbers: [{ key: 'expression', value: 7 }], forecastYear: 2030, personalYear: 7, personalYearTitle: 'Năm Nhìn Vào Trong' },
  { id: 'old', type: 'numerology', date: 'cu', name: 'B', birthDate: '1990-05-15', lifePath: 3, lifePathTitle: 'Người Sáng Tạo',
    numbers: [{ key: 'expression', value: 7 }], personalYear: 3 }
]);
const j = renderToStaticMarkup(React.createElement(Journal, { lang: 'vi' }));
expect('Nhat ky: ban ghi moi hien nam du bao', j.includes('2030') && j.includes('7 — Năm Nhìn Vào Trong'));
expect('Nhat ky: ban ghi cu khong co forecastYear van hien', j.includes('>3<') && !j.includes('undefined'));

await server.close();
console.log(fail ? `\n>>> ${fail} loi` : '\n>>> Du bao nam & thang sach');
process.exit(fail ? 1 : 0);
