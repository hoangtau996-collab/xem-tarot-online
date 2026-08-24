// Lấy phần luận giải của một lá bài theo ngôn ngữ đang xem.
//
// Vì sao cần một lớp riêng thay vì đọc thẳng card.upright.advice như trước:
// dữ liệu 78 lá chỉ có tóm tắt ba thứ tiếng (summary / summaryEn / summaryZh),
// còn năm khía cạnh - hoàn cảnh, tình cảm, công việc, tài chính, lời khuyên -
// chỉ viết bằng tiếng Việt. Khách chọn English vẫn thấy tiêu đề tiếng Anh
// nhưng thân bài tiếng Việt, và đó là phần dài nhất của bản giải.
//
// Bản dịch để ở file riêng theo từng ngôn ngữ, khoá theo id lá bài, thay vì
// nhồi thêm trường vào 5 file dữ liệu gốc. Ba lý do:
//   - File tiếng Việt đang chạy tốt thì không phải đụng vào, khỏi rủi ro.
//   - Dịch xong từng bộ ẩn là nạp vào được ngay, không phải sửa giữa file.
//   - Mỗi ngôn ngữ một file nên đếm được còn thiếu bao nhiêu (xem coverage).

import { TAROT_TEXT_EN } from './i18n/en.js';
import { TAROT_TEXT_ZH } from './i18n/zh.js';

export const ASPECT_FIELDS = ['situation', 'love', 'work', 'finance', 'advice'];
export const CARD_SIDES = ['upright', 'reversed'];

const TABLES = { en: TAROT_TEXT_EN, zh: TAROT_TEXT_ZH };

/* side: 'upright' | 'reversed'   field: một trong ASPECT_FIELDS
   Lá nào chưa dịch thì trả về tiếng Việt. Cố tình không trả chuỗi rỗng:
   thà lệch ngôn ngữ còn hơn để khách nhìn một ô trống không giải thích gì. */
export const cardText = (card, side, field, lang = 'vi') => {
  const vi = card?.[side]?.[field] || '';
  if (lang === 'vi' || !card?.id) return vi;
  return TABLES[lang]?.[card.id]?.[side]?.[field] || vi;
};

/* Đếm độ phủ bản dịch. Dùng cho bộ kiểm tra trước mỗi lần build, để việc dịch
   còn dở không lặng lẽ trôi ra bản phát hành. */
export const translationCoverage = (deck, lang) => {
  const table = TABLES[lang];
  if (!table) return { lang, total: 0, done: 0, missingCards: [] };

  let total = 0;
  let done = 0;
  const missingCards = [];

  for (const card of deck) {
    let cardMissing = 0;
    for (const side of CARD_SIDES) {
      for (const field of ASPECT_FIELDS) {
        if (!card[side]?.[field]) continue; // tiếng Việt cũng không có thì không tính
        total++;
        if (table[card.id]?.[side]?.[field]) done++;
        else cardMissing++;
      }
    }
    if (cardMissing) missingCards.push({ id: card.id, name: card.name, missing: cardMissing });
  }

  return { lang, total, done, missingCards };
};
