// Tiêu đề và mô tả riêng cho từng trang.
//
// Trước đây cả trang chỉ có đúng một thẻ <title> và một thẻ description viết
// cứng trong index.html. Với định tuyến bằng hash thì cũng không sao, vì với
// máy tìm kiếm cả trang vốn chỉ là một địa chỉ. Nay mỗi mục là một địa chỉ
// thật, nên mỗi địa chỉ phải tự giới thiệu được mình - nếu không thì Google
// nhìn thấy tám trang giống hệt nhau và tự chọn bỏ bớt.
//
// Dùng chung cho hai nơi: thẻ <title> đổi lúc chạy trong App, và các thẻ meta
// được nướng sẵn vào HTML lúc build (tools/prerender.jsx). Cùng một nguồn chữ
// nên hai nơi không thể lệch nhau.

import { TRANSLATIONS } from '../data/translations.js';

/* Mô tả từng mục. Viết tay chứ không ghép máy móc từ tiêu đề: đây là đoạn chữ
   hiện dưới link trên trang kết quả tìm kiếm và trong ô xem trước khi chia sẻ,
   nên nó phải đọc như một câu mời, không phải như một nhãn phân loại. */
const DESCRIPTIONS = {
  vi: {
    reading: 'Trải bài Tarot online miễn phí với bộ 78 lá Rider-Waite. Mỗi lá được giải theo năm khía cạnh: hoàn cảnh, tình cảm, công việc, tài chính và lời khuyên chữa lành.',
    numerology: 'Tra thần số học Pythagoras từ ngày sinh và họ tên: Đường Đời, Sứ Mệnh, Linh Hồn, biểu đồ ngày sinh, các Đỉnh Cao và Thử Thách của từng chặng đời.',
    mysticism: 'Xem Huyền Học Đông Phương theo ngày sinh: can chi, nạp âm, ngũ hành bản mệnh, cung phi Bát Trạch cùng hướng tốt hướng xấu và các tuổi hợp xung.',
    astrology: 'Dựng lá số chiêm tinh Tây Phương đầy đủ từ ngày, giờ và nơi sinh: Cung Mọc, Thiên Đỉnh, mười hai nhà, góc chiếu và cân bằng nguyên tố.',
    encyclopedia: 'Tra cứu đầy đủ 78 lá bài Tarot Rider-Waite. Mỗi lá có nghĩa xuôi và nghĩa ngược, giải theo hoàn cảnh, tình cảm, công việc, tài chính và lời khuyên.',
    journal: 'Nhật ký lưu lại các phiên trải bài, hồ sơ thần số học và hồ sơ huyền học đã xem, để đọc lại và đối chiếu về sau.'
  },
  en: {
    reading: 'Free online Tarot readings with the full 78-card Rider-Waite deck. Every card is read across five aspects: circumstances, love, work, money and healing advice.',
    numerology: 'Pythagorean numerology from your birth date and full name: Life Path, Expression, Soul Urge, birth chart, and the Pinnacles and Challenges of each life stage.',
    mysticism: 'Eastern metaphysics from your birth date: heavenly stem and earthly branch, sound element, destiny element, Bat Trach Kua number with lucky directions and animal groups.',
    astrology: 'A full Western natal chart from your date, time and place of birth: Ascendant, Midheaven, twelve houses, aspects and elemental balance.',
    encyclopedia: 'A complete reference for all 78 Rider-Waite Tarot cards. Each card carries upright and reversed meanings across circumstances, love, work, money and advice.',
    journal: 'A journal of the readings, numerology profiles and metaphysics profiles you have saved, kept so you can read them back later.'
  },
  zh: {
    reading: '免费在线塔罗占卜，采用完整的 78 张韦特塔罗牌。每张牌从五个面向解读：处境、感情、事业、财务与疗愈建议。',
    numerology: '依出生日期与姓名推算毕达哥拉斯生命密码：生命历程数、表达数、灵魂数、出生图，以及人生各阶段的巅峰与挑战。',
    mysticism: '依出生日期看东方玄学：天干地支、纳音、本命五行、八宅命卦与吉凶方位、三合六冲。',
    astrology: '依出生日期、时间与地点推算完整的西洋星盘：上升、天顶、十二宫位、相位与元素平衡。',
    encyclopedia: '完整收录 78 张韦特塔罗牌。每张牌都有正位与逆位释义，涵盖处境、感情、事业、财务与建议。',
    journal: '保存过的占卜、生命密码与玄学档案，都收在这本日记里，方便日后回看对照。'
  }
};

const pick = (lang) => DESCRIPTIONS[lang] || DESCRIPTIONS.vi;

/* Khoá mô tả cho một route. Bản Mệnh có hai hệ nên tách riêng: hai hệ trả lời
   cùng một câu hỏi bằng hai truyền thống khác nhau, gộp chung một mô tả thì cả
   hai trang cùng mờ nhạt. */
const descriptionKey = (route) =>
  route.tab === 'destiny' ? (route.destiny === 'astrology' ? 'astrology' : 'mysticism') : route.tab;

/* Tiêu đề và mô tả của một trang.
   card là lá bài đang mở ở Tra Cứu, nếu có - trang lá bài phải nói về chính lá
   đó, đấy là 78 trang có nội dung riêng biệt nhất của cả site. */
export const pageMeta = (route, lang = 'vi', card = null) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const d = pick(lang);

  if (card) {
    const name = lang === 'en' ? card.name : lang === 'zh' ? (card.nameZh || card.name) : card.nameVi;
    const summary = lang === 'en'
      ? (card.upright?.summaryEn || card.upright?.summary)
      : lang === 'zh'
        ? (card.upright?.summaryZh || card.upright?.summary)
        : card.upright?.summary;
    return {
      title: `${name} - ${t.routeTitles.encyclopedia} | ${t.appTitle}`,
      description: summary || d.encyclopedia
    };
  }

  const pageTitle = t.routeTitles[route.tab] || t.routeTitles.reading;
  return {
    title: `${pageTitle} | ${t.appTitle} - ${t.appSubtitle}`,
    description: d[descriptionKey(route)] || d.reading
  };
};
