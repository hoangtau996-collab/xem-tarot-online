// Ghi nhớ ngôn ngữ khách đã chọn.
//
// Trước đây ngôn ngữ chỉ là state trong App, không lưu ở đâu cả. Hai hệ quả
// khách gặp phải hằng ngày:
//   - Đổi sang English rồi tải lại trang (hoặc bấm vào một link trong bài) là
//     quay về tiếng Việt.
//   - Link gửi cho người nước ngoài LUÔN mở ra tiếng Việt, dù người gửi đang
//     xem bản tiếng Anh.
//
// Nên chốt hai nơi lưu, theo đúng thứ tự ưu tiên:
//   1. ?lang= trên chính đường dẫn - người gửi link đã chọn hộ người nhận,
//      lựa chọn đó phải thắng bộ nhớ máy của người nhận.
//   2. localStorage - lựa chọn lần trước của chính khách.
//   3. Tiếng Việt - thị trường chính, giữ nguyên nếp cũ.
//
// Cố tình KHÔNG đoán theo navigator.language: rất nhiều máy ở Việt Nam để hệ
// điều hành tiếng Anh, đoán kiểu đó sẽ đẩy nhầm khách Việt sang bản tiếng Anh.

export const SUPPORTED_LANGS = ['vi', 'en', 'zh'];
export const DEFAULT_LANG = 'vi';

const STORAGE_KEY = 'phealing_lang';
const QUERY_KEY = 'lang';

/* Mã cho thuộc tính lang của thẻ <html>. Không trùng mã trong ứng dụng: bản
   tiếng Trung ở đây là chữ giản thể, ghi 'zh' trống trơn thì trình đọc màn
   hình và Google phải tự đoán phồn thể hay giản thể. */
const HTML_LANG = { vi: 'vi', en: 'en', zh: 'zh-Hans' };

const isSupported = (value) => SUPPORTED_LANGS.includes(value);

/* Đọc ngôn ngữ lúc khởi động. Chạy được cả khi không có trình duyệt (bộ kiểm
   tra màn hình vẽ phía máy chủ), nên mọi thứ đều phải dò trước khi chạm. */
export const readInitialLang = () => {
  if (typeof window === 'undefined') return DEFAULT_LANG;

  try {
    const fromUrl = new URLSearchParams(window.location.search || '').get(QUERY_KEY);
    if (isSupported(fromUrl)) return fromUrl;
  } catch {
    /* search bị dán hỏng - bỏ qua, còn hai lớp dự phòng phía dưới */
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isSupported(saved)) return saved;
  } catch {
    /* localStorage bị chặn (chế độ riêng tư) - vẫn dùng được trong phiên này */
  }

  return DEFAULT_LANG;
};

/* Đặt thuộc tính lang cho thẻ <html>.
   Không phải chi tiết làm đẹp: trình đọc màn hình chọn giọng theo thuộc tính
   này, nên để nguyên "vi" mà đọc nội dung tiếng Anh thì ra giọng méo không
   nghe được; Google cũng dựa vào đây để biết trang thuộc ngôn ngữ nào. */
const applyHtmlLang = (lang) => {
  if (typeof document === 'undefined' || !document.documentElement) return;
  document.documentElement.lang = HTML_LANG[lang] || HTML_LANG[DEFAULT_LANG];
};

/* Ghi ?lang= vào đường dẫn để khách sao chép link là mang theo ngôn ngữ.
   Dùng replaceState nên không sinh thêm mục lịch sử - đổi ngôn ngữ rồi bấm
   Quay lại phải về trang trước đó, chứ không phải về chính trang này. */
const applyQuery = (lang) => {
  if (typeof window === 'undefined') return;
  if (!window.history || typeof window.history.replaceState !== 'function') return;

  try {
    const url = new URL(window.location.href);
    // Tiếng Việt là mặc định nên không cần ghi ra - giữ link ngắn và sạch.
    if (lang === DEFAULT_LANG) url.searchParams.delete(QUERY_KEY);
    else url.searchParams.set(QUERY_KEY, lang);
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  } catch {
    /* URL lạ - không ghi được thì thôi, localStorage vẫn nhớ giúp */
  }
};

/* Lưu lựa chọn vào bộ nhớ máy và vào đường dẫn.
   Cố tình KHÔNG đụng tới thẻ <html> ở đây: thuộc tính đó do một useEffect
   trong App trông coi, để dù ngôn ngữ đến từ link, từ bộ nhớ hay từ nút bấm
   thì cũng chỉ có đúng một chỗ ghi nó. */
export const rememberLang = (lang) => {
  const safe = isSupported(lang) ? lang : DEFAULT_LANG;

  try {
    localStorage.setItem(STORAGE_KEY, safe);
  } catch {
    /* localStorage bị chặn - lựa chọn chỉ sống trong phiên hiện tại */
  }

  applyQuery(safe);
  return safe;
};

/* Đồng bộ thẻ <html>. Nơi duy nhất trong ứng dụng ghi thuộc tính này. */
export const syncHtmlLang = applyHtmlLang;
