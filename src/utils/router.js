// Định tuyến bằng đường dẫn thật cho ứng dụng một trang.
//
// Trước đây file này dùng hash (#/than-so-hoc). Lý do ghi lúc đó là đúng với
// hoàn cảnh lúc đó: trang là SPA tĩnh đẩy thẳng lên GitHub, mà máy chủ tĩnh
// thì trả 404 cho mọi đường dẫn không phải file có thật. Hoàn cảnh đã khác -
// trang chạy trên Vercel, và vercel.json ở gốc dự án đã bảo máy chủ trả
// index.html cho mọi đường dẫn.
//
// Vì sao phải đổi: hash không bao giờ được gửi lên máy chủ. Với Google thì cả
// trang chỉ là MỘT địa chỉ duy nhất, năm mục và 78 trang lá bài đều vô hình.
// Còn Facebook và Zalo thì không chạy JavaScript, nên mọi link chia sẻ đều
// hiện đúng một ô xem trước giống hệt nhau, bất kể người gửi đang ở trang nào.
//
// Link cũ dạng #/than-so-hoc vẫn mở đúng chỗ: xem redirectLegacyHash bên dưới.

import { useMemo, useSyncExternalStore } from 'react';

export const DEFAULT_TAB = 'reading';

/* Slug tiếng Việt không dấu - link đọc được và chia sẻ được. Đổi slug ở đây là
   đổi cả link lẫn điều hướng, không cần sửa chỗ nào khác. */
export const TAB_SLUGS = {
  reading: 'xem-tarot',
  numerology: 'than-so-hoc',
  destiny: 'ban-menh',
  encyclopedia: 'tra-cuu',
  journal: 'nhat-ky'
};

/* Muc Ban Menh gom hai he luan giai song song, moi he mot slug con. Gom chung
   mot muc de thanh dieu huong van du nam o, dong thoi giu duoc y niem "cung
   mot cau hoi, hai truyen thong tra loi". */
export const DESTINY_SLUGS = {
  mysticism: 'huyen-hoc',
  astrology: 'chiem-tinh'
};

export const DEFAULT_DESTINY = 'mysticism';

/* Link cu da phat ra ngoai truoc khi co muc Ban Menh. Giu bang nay de moi
   duong dan da chia se van mo dung cho, thay vi roi ve trang Tarot. */
const LEGACY_SLUGS = {
  'huyen-hoc': { tab: 'destiny', destiny: 'mysticism' }
};

export const ARCANA_SLUGS = {
  Major: 'an-chinh',
  Minor: 'an-phu'
};

const SLUG_TO_TAB = Object.fromEntries(Object.entries(TAB_SLUGS).map(([tab, slug]) => [slug, tab]));
const SLUG_TO_DESTINY = Object.fromEntries(Object.entries(DESTINY_SLUGS).map(([key, slug]) => [slug, key]));
const SLUG_TO_ARCANA = Object.fromEntries(Object.entries(ARCANA_SLUGS).map(([arcana, slug]) => [slug, arcana]));

/* Đọc một đường dẫn thành route đã chuẩn hoá.
   Đường dẫn lạ hoặc rỗng đều rơi về tab mặc định thay vì hiện màn hình trắng. */
export const parsePath = (pathname = '') => {
  const parts = pathname
    .split('?')[0]
    .split('#')[0]
    .split('/')
    .filter(Boolean)
    .map(part => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part; // đường dẫn bị dán hỏng - giữ nguyên còn hơn ném lỗi
      }
    });

  const legacy = LEGACY_SLUGS[parts[0]];
  const tab = SLUG_TO_TAB[parts[0]] || legacy?.tab || DEFAULT_TAB;
  const route = { tab, arcana: 'All', cardId: null, destiny: legacy?.destiny || DEFAULT_DESTINY };

  // Ban Menh co hai he: Huyen Hoc Dong Phuong va Chiem Tinh Tay Phuong.
  if (tab === 'destiny' && SLUG_TO_DESTINY[parts[1]]) route.destiny = SLUG_TO_DESTINY[parts[1]];

  // Tra Cứu có hai kiểu link con: lọc theo bộ ẩn, và mở thẳng một lá bài.
  if (tab === 'encyclopedia') {
    if (parts[1] === 'la' && parts[2]) route.cardId = parts[2];
    else if (SLUG_TO_ARCANA[parts[1]]) route.arcana = SLUG_TO_ARCANA[parts[1]];
  }

  return route;
};

/* Dựng đường dẫn từ tab + tham số. Dùng cho cả thuộc tính href của thẻ <a> lẫn
   lệnh điều hướng, nên link hiện trên thanh địa chỉ luôn khớp với link người
   dùng thấy khi rê chuột. */
export const buildPath = (tab, { arcana, cardId, destiny } = {}) => {
  const slug = TAB_SLUGS[tab] || TAB_SLUGS[DEFAULT_TAB];
  let path = `/${slug}`;

  if (tab === 'destiny') path += `/${DESTINY_SLUGS[destiny] || DESTINY_SLUGS[DEFAULT_DESTINY]}`;

  if (tab === 'encyclopedia') {
    if (cardId) path += `/la/${encodeURIComponent(cardId)}`;
    else if (arcana && arcana !== 'All') path += `/${ARCANA_SLUGS[arcana]}`;
  }

  return path;
};

/* Mọi đường dẫn hợp lệ của trang, dùng cho sitemap và cho bước dựng sẵn HTML.
   Nhận danh sách id lá bài để khỏi kéo dữ liệu 78 lá vào gói chính. */
export const allPaths = (cardIds = []) => [
  '/',
  ...Object.keys(TAB_SLUGS)
    .filter(tab => tab !== 'destiny')
    .map(tab => buildPath(tab)),
  ...Object.keys(DESTINY_SLUGS).map(destiny => buildPath('destiny', { destiny })),
  ...Object.keys(ARCANA_SLUGS).map(arcana => buildPath('encyclopedia', { arcana })),
  ...cardIds.map(cardId => buildPath('encyclopedia', { cardId }))
];

/* Đổi đường dẫn mà không tải lại trang.
   replace=true ghi đè mục hiện tại trong lịch sử - dùng khi chuẩn hoá một link
   hỏng, để nút Quay lại không đưa khách về đúng cái link hỏng đó.

   Chuỗi ?lang= luôn được mang theo: nó nằm ở phần query chứ không phải đường
   dẫn, mà pushState thì ghi đè cả hai nếu ta quên. */
export const navigate = (path, { replace = false } = {}) => {
  if (typeof window === 'undefined') return;
  const target = `${path}${window.location.search}`;
  if (`${window.location.pathname}${window.location.search}` === target) return;

  window.history[replace ? 'replaceState' : 'pushState'](null, '', target);
  // pushState không tự phát sự kiện nào, nên phải tự báo cho useRoute biết.
  window.dispatchEvent(new Event(ROUTE_EVENT));
};

/* Link cũ dạng #/than-so-hoc đã phát ra ngoài từ trước khi đổi sang đường dẫn
   thật. Chúng vẫn phải mở đúng mục, nếu không mọi bài đăng và tin nhắn đã gửi
   đều dẫn về trang Tarot. Dùng replace nên nút Quay lại không kẹt lại ở link
   cũ vừa được sửa. */
export const redirectLegacyHash = () => {
  if (typeof window === 'undefined') return false;
  const hash = window.location.hash;
  if (!hash || !hash.startsWith('#/')) return false;

  const route = parsePath(hash.slice(1));
  const target = buildPath(route.tab, route);
  window.history.replaceState(null, '', `${target}${window.location.search}`);
  window.dispatchEvent(new Event(ROUTE_EVENT));
  return true;
};

/* Ten mien chinh thuc cua trang. Logo lay hang so nay lam link "ve trang
   chu", nen khach re chuot len logo thay dia chi that chu khong phai mot cai
   hash. Doi ten mien thi sua o day va o the canonical trong index.html. */
export const SITE_URL = 'https://healing.pmarcom.com/';

/* Trang co dang chay tren chinh ten mien do khong. Ban chay o may (localhost)
   va ban preview deu tra ve false, de bam logo luc thu nghiem khong bi nem
   sang ban that. */
export const isCanonicalSite = () => {
  if (typeof window === 'undefined') return false;
  try {
    return window.location.origin === new URL(SITE_URL).origin;
  } catch {
    return false; // moi truong khong co URL hop le - coi nhu khong phai ban that
  }
};

/* Link luôn trỏ về tên miền chính thức.
 *
 * Khác absoluteUrl ở chỗ không đọc origin hiện tại: chữ khách sao chép rồi gửi
 * cho người khác thì không được mang theo localhost hay tên miền bản xem thử,
 * vì người nhận bấm vào sẽ không mở ra được gì. */
export const canonicalUrl = (path = '') => `${SITE_URL.replace(/\/$/, '')}${path}`;

/* Link tuyệt đối để khách sao chép và gửi cho người khác. */
export const absoluteUrl = (path) => {
  if (typeof window === 'undefined') return `${SITE_URL.replace(/\/$/, '')}${path}`;
  return `${window.location.origin}${path}`;
};

/* ------------------------------------------------------------------ */
/* THEO DÕI ĐƯỜNG DẪN                                                  */
/* ------------------------------------------------------------------ */

const ROUTE_EVENT = 'phealing:route';

const subscribe = (onChange) => {
  window.addEventListener('popstate', onChange);
  window.addEventListener(ROUTE_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(ROUTE_EVENT, onChange);
  };
};

// Ảnh chụp phải là chuỗi thô: trả về object mới mỗi lần gọi sẽ khiến
// useSyncExternalStore coi như dữ liệu luôn thay đổi và render vô hạn.
const getSnapshot = () => window.location.pathname;

/* Đường dẫn dùng khi vẽ phía máy chủ. Bước dựng sẵn HTML đặt giá trị này trước
   mỗi trang, nhờ đó cùng một component vẽ ra đúng mục tương ứng. */
let ssrPath = '/';
export const setSsrPath = (path) => { ssrPath = path || '/'; };
const getServerSnapshot = () => ssrPath;

export const useRoute = () => {
  const path = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => parsePath(path), [path]);
};
