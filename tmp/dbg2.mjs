import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const store = {};
globalThis.localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { Journal } = await server.ssrLoadModule('/src/components/Journal.jsx');
store['celestial_tarot_journal'] = JSON.stringify([
  { id: 'new', type: 'numerology', date: 'nay', name: 'A', birthDate: '1990-05-15', lifePath: 3, lifePathTitle: 'X',
    numbers: [{ key: 'expression', value: 7 }], forecastYear: 2030, personalYear: 7, personalYearTitle: 'Nam Nhin Vao Trong' }
]);
const j = renderToStaticMarkup(React.createElement(Journal, { lang: 'vi' }));
console.log('do dai HTML:', j.length);
console.log('co "Nam Ca Nhan":', j.includes('N\u0103m C\u00e1 Nh\u00e2n'));
console.log('co "2030":', j.includes('2030'));
console.log('co "Nam Nhin Vao Trong":', j.includes('Nam Nhin Vao Trong'));
console.log('co "S\u1ed1 S\u1ee9 M\u1ec7nh":', j.includes('S\u1ed1 S\u1ee9 M\u1ec7nh'));
const k = j.indexOf('2030');
console.log('\n--- quanh vi tri 2030 ---');
console.log(k === -1 ? '(khong tim thay)' : j.slice(k - 200, k + 120));
await server.close();
