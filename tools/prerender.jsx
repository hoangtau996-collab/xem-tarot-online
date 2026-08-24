// Dựng sẵn một file HTML cho mỗi đường dẫn, chạy sau vite build.
//
// Vì sao cần, dù đã đổi sang đường dẫn thật: máy chủ vẫn chỉ trả về một khung
// index.html rỗng cho mọi địa chỉ, nội dung do React vẽ ra sau. Google có chạy
// JavaScript nên cuối cùng vẫn đọc được, chỉ là chậm và không chắc chắn. Còn
// Facebook và Zalo thì KHÔNG chạy JavaScript - chúng chỉ đọc HTML thô. Nghĩa
// là mọi link chia sẻ, dù trỏ tới lá bài nào hay mục nào, đều hiện đúng một ô
// xem trước giống hệt nhau. Nướng sẵn HTML là cách duy nhất chữa được.
//
// Chỉ dựng bản tiếng Việt. Đó là ngôn ngữ gốc và là thị trường chính; bản Anh
// và Trung vẫn chạy bình thường phía khách qua ?lang=, chỉ là không có trang
// tĩnh riêng. Muốn có thì phải cấp cho mỗi ngôn ngữ một nhánh đường dẫn riêng,
// đó là một quyết định khác.

import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

/* Phía máy chủ không có trình duyệt. Dựng đúng những thứ được đụng tới trong
   lúc vẽ, giống hệt tools/check-screens.jsx. Riêng origin phải là tên miền
   thật, để link trên logo trong bản dựng sẵn trỏ đúng chỗ. */
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
globalThis.window = Object.assign(globalThis.window || {}, {
  location: { pathname: '/', search: '', hash: '', origin: 'https://healing.pmarcom.com' },
  addEventListener: () => {},
  removeEventListener: () => {}
});
globalThis.document = globalThis.document || { documentElement: {}, head: { querySelector: () => null } };

const { App } = await import('../src/App.jsx');
const { allPaths, parsePath, setSsrPath, SITE_URL } = await import('../src/utils/router.js');
const { pageMeta } = await import('../src/utils/pageMeta.js');
const { TAROT_DECK } = await import('../src/data/tarotData.js');

const DIST = 'dist';
const ORIGIN = SITE_URL.replace(/\/$/, '');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

/* Vẽ một đường dẫn ra HTML.
 *
 * Mỗi mục nay là một gói riêng nạp bằng import động (React.lazy trong App).
 * Lần vẽ đầu phía máy chủ vì thế chỉ ra được màn chờ, còn các gói thì mới bắt
 * đầu tải. Nên phải vẽ, nhường lượt cho import chạy xong, rồi vẽ lại - lặp cho
 * tới khi màn chờ biến mất. Bỏ bước này thì cả 86 trang dựng ra đều chỉ chứa
 * một vòng xoay, tức là công cốc. */
const LOADING_MARK = 'aria-live="polite"';

const renderPath = async (routePath) => {
  setSsrPath(routePath);
  globalThis.window.location.pathname = routePath;

  let html = '';
  for (let attempt = 0; attempt < 8; attempt++) {
    html = renderToStaticMarkup(<App />);
    if (!html.includes(LOADING_MARK)) return html;
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  return html; // vẫn còn màn chờ - phần kiểm tra bên dưới sẽ báo
};

/* Thay đúng những thẻ nói về trang này, giữ nguyên phần còn lại của khung. */
const applyMeta = (htmlTemplate, { title, description, url }) => htmlTemplate
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  .replace(/(<meta name="title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
  .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
  .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
  .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
  .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
  .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
  .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);

const escapeHtml = (text = '') => text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const writePage = (routePath, html) => {
  const dir = routePath === '/' ? DIST : path.join(DIST, routePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
};

/* ------------------------------------------------------------------ */

const cardById = new Map(TAROT_DECK.map(c => [c.id, c]));
const paths = allPaths(TAROT_DECK.map(c => c.id));
const failures = [];

for (const routePath of paths) {
  const route = parsePath(routePath);
  const card = route.cardId ? cardById.get(route.cardId) : null;
  const { title, description } = pageMeta(route, 'vi', card);
  const url = `${ORIGIN}${routePath === '/' ? '/' : routePath}`;

  const body = await renderPath(routePath);
  if (body.includes(LOADING_MARK)) failures.push(routePath);

  const page = applyMeta(template, { title, description, url })
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  writePage(routePath, page);
}

/* --- robots.txt và sitemap.xml ---
   Cả hai đều sinh từ chính bảng đường dẫn ở router, nên thêm một mục hay một
   lá bài là sitemap tự có, không ai phải nhớ cập nhật tay. */
fs.writeFileSync(path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`, 'utf8');

const today = new Date().toISOString().split('T')[0];
const urls = paths.map(p => {
  const loc = `${ORIGIN}${p === '/' ? '/' : p}`;
  // Trang mục đổi thường xuyên hơn trang một lá bài, và quan trọng hơn.
  const isCard = p.includes('/la/');
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n` +
         `    <changefreq>${isCard ? 'monthly' : 'weekly'}</changefreq>\n` +
         `    <priority>${p === '/' ? '1.0' : isCard ? '0.6' : '0.8'}</priority>\n  </url>`;
}).join('\n');

fs.writeFileSync(path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  'utf8');

console.log(`\n✓ Đã dựng sẵn ${paths.length} trang, kèm robots.txt và sitemap.xml.`);
if (failures.length) {
  console.error(`\n✗ ${failures.length} trang vẫn dừng ở màn chờ - HTML dựng ra không có nội dung thật:`);
  failures.slice(0, 10).forEach(p => console.error(`  ${p}`));
  console.error('\nThường là do một mục mới nạp động mà vòng chờ chưa kịp. Sửa xong chạy lại build.\n');
  process.exit(1);
}
