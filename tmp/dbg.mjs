import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const store = {};
globalThis.localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { Numerology } = await server.ssrLoadModule('/src/components/Numerology.jsx');
const { Journal } = await server.ssrLoadModule('/src/components/Journal.jsx');

const html = renderToStaticMarkup(React.createElement(Numerology, { lang: 'vi', profile: { fullName: 'A B', birthDate: '1990-05-15', gender: 'female' }, onSaveProfile: () => {} }));
const i = html.indexOf('Dự Báo');
console.log('--- tieu de muc du bao trong HTML ---');
console.log(html.slice(i - 20, i + 60));

store['celestial_tarot_journal'] = JSON.stringify([
  { id: 'new', type: 'numerology', date: 'nay', name: 'A', birthDate: '1990-05-15', lifePath: 3, lifePathTitle: 'X',
    numbers: [{ key: 'expression', value: 7 }], forecastYear: 2030, personalYear: 7, personalYearTitle: 'Năm Nhìn Vào Trong' },
  { id: 'old', type: 'numerology', date: 'cu', name: 'B', birthDate: '1990-05-15', lifePath: 3, lifePathTitle: 'X',
    numbers: [{ key: 'expression', value: 7 }], personalYear: 3 }
]);
const j = renderToStaticMarkup(React.createElement(Journal, { lang: 'vi' }));
console.log('\n--- o Nam Ca Nhan trong nhat ky ---');
let k=0; while((k=j.indexOf('Năm Cá Nhân',k))!==-1){ console.log('  ...'+j.slice(k-90,k+140).replace(/</g,'|<')); k+=5; }
console.log('\n--- co chuoi undefined khong? ---', j.includes('undefined'));
await server.close();
