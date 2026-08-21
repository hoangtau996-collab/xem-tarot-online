// Định tuyến bằng hash cho ứng dụng một trang.
//
// Vì sao dùng hash (#/than-so-hoc) chứ không phải đường dẫn thật
// (/than-so-hoc): trang này là SPA tĩnh đẩy thẳng lên GitHub. Với đường dẫn
// thật, khách dán link vào trình duyệt sẽ nhận 404 vì máy chủ tĩnh đi tìm một
// file không tồn tại - muốn chạy được phải cấu hình rewrite ở phía host. Hash
// thì không bao giờ được gửi lên máy chủ, nên mọi link đều mở đúng mục ở bất
// kỳ nơi nào ta đặt trang.

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

/* Đọc hash hiện tại thành một route đã chuẩn hoá.
   Hash lạ hoặc rỗng đều rơi về tab mặc định thay vì hiện màn hình trắng. */
export const parseHash = (hash = '') => {
  const parts = hash
    .replace(/^#\/?/, '')
    .split('?')[0]
    .split('/')
    .filter(Boolean)
    .map(part => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part; // hash bị dán hỏng - giữ nguyên còn hơn ném lỗi
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

/* Dựng hash từ tab + tham số. Dùng cho cả thuộc tính href của thẻ <a> lẫn lệnh
   điều hướng, nên link hiện trên thanh địa chỉ luôn khớp với link người dùng
   thấy khi rê chuột. */
export const buildPath = (tab, { arcana, cardId, destiny } = {}) => {
  const slug = TAB_SLUGS[tab] || TAB_SLUGS[DEFAULT_TAB];
  let path = `#/${slug}`;

  if (tab === 'destiny') path += `/${DESTINY_SLUGS[destiny] || DESTINY_SLUGS[DEFAULT_DESTINY]}`;

  if (tab === 'encyclopedia') {
    if (cardId) path += `/la/${encodeURIComponent(cardId)}`;
    else if (arcana && arcana !== 'All') path += `/${ARCANA_SLUGS[arcana]}`;
  }

  return path;
};

/* Đổi hash bằng tay (dùng cho nút bấm không phải thẻ <a>).
   replace=true ghi đè mục hiện tại trong lịch sử - dùng khi chuẩn hoá một link
   hỏng, để nút Quay lại không đưa khách về đúng cái link hỏng đó. */
export const navigate = (path, { replace = false } = {}) => {
  if (typeof window === 'undefined') return;
  if (window.location.hash === path) return;

  if (replace) window.location.replace(`${window.location.pathname}${window.location.search}${path}`);
  else window.location.hash = path;
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

/* Link tuyệt đối để khách sao chép và gửi cho người khác. */
export const absoluteUrl = (path) => {
  if (typeof window === 'undefined') return path;
  return `${window.location.origin}${window.location.pathname}${path}`;
};

const subscribe = (onChange) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};

// Ảnh chụp phải là chuỗi hash thô: trả về object mới mỗi lần gọi sẽ khiến
// useSyncExternalStore coi như dữ liệu luôn thay đổi và render vô hạn.
const getSnapshot = () => window.location.hash;
const getServerSnapshot = () => '';

export const useHashRoute = () => {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => parseHash(hash), [hash]);
};
