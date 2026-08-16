// Full 78 Rider-Waite Tarot Deck Database with i18n localization support

import { MAJOR_ARCANA } from './tarot/majorArcana.js';
import { WANDS } from './tarot/wands.js';
import { CUPS } from './tarot/cups.js';
import { SWORDS } from './tarot/swords.js';
import { PENTACLES } from './tarot/pentacles.js';

// 🌟 TAROT DECK THEMES (Multi-Language Support)
export const getTarotDecksThemes = (lang = 'vi') => [
  {
    id: 'cosmic_advice',
    name: lang === 'en' ? 'Cosmic Advice & Oracle Tarot' : lang === 'zh' ? '宇宙启示神谕塔罗' : 'Tarot Lời Khuyên Vũ Trụ',
    englishName: 'Cosmic Advice & Oracle Tarot',
    description: lang === 'en'
      ? 'A sacred oracle deck focused on soul awakening, spiritual advice, and divine cosmic guidance.'
      : lang === 'zh'
      ? '专注于灵魂觉醒、灵性指引与宇宙深层神谕启示的神圣塔罗。'
      : 'Bộ bài chuyên sâu về thông điệp thức tỉnh, lời khuyên khai sáng tâm hồn và năng lượng dẫn lối từ các đấng sáng tạo vũ trụ.',
    icon: '🌌',
    color: '#e879f9',
    bgGradient: 'from-fuchsia-600 via-purple-600 to-cyan-400',
    cardBackBg: 'bg-[radial-gradient(#e879f9_1px,transparent_1px)]',
    border: 'border-fuchsia-400/60',
    glowColor: 'rgba(232, 121, 249, 0.5)',
    symbol: '☸️',
    styleTag: lang === 'en' ? 'Cosmic Advice & Oracle' : lang === 'zh' ? '启示与神谕' : 'Lời Khuyên & Khai Sáng'
  },
  {
    id: 'cosmic_gold',
    name: lang === 'en' ? 'Cosmic Gold Tarot' : lang === 'zh' ? '黄金宇宙塔罗' : 'Tarot Vũ Trụ Hoàng Kim',
    englishName: 'Cosmic Gold Tarot',
    description: lang === 'en'
      ? 'Classic radiant cosmic deck with gold foil patterns, esoteric sacred geometry, and twinkling starlight.'
      : lang === 'zh'
      ? '经典的金光熠熠宇宙塔罗，融合神圣几何与璀璨星光。'
      : 'Bộ bài vũ trụ kinh điển rực rỡ với họa tiết vàng kim, biểu tượng huyền học và ánh sao lung linh.',
    icon: '🔮',
    color: '#fbbf24',
    bgGradient: 'from-amber-500 via-purple-600 to-amber-300',
    cardBackBg: 'bg-space',
    border: 'border-amber-400/50',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    symbol: '✧',
    styleTag: lang === 'en' ? 'Cosmic & Esoteric' : lang === 'zh' ? '宇宙神秘学' : 'Vũ Trụ & Huyền Học'
  },
  {
    id: 'lunar_nebula',
    name: lang === 'en' ? 'Lunar & Nebula Tarot' : lang === 'zh' ? '月相星云塔罗' : 'Tarot Trăng & Tinh Vân',
    englishName: 'Lunar & Nebula Tarot',
    description: lang === 'en'
      ? 'Infused with mystical moon phase energies, galaxy nebulae, and deep intuitive wisdom.'
      : lang === 'zh'
      ? '蕴含月相神秘能量与银河星云，唤醒深层直觉智慧。'
      : 'Bộ bài ẩn chứa dòng năng lượng huyền bí của các chu kỳ mặt trăng, tinh vân dải ngân hà và trực giác sâu thẳm.',
    icon: '🌙',
    color: '#c084fc',
    bgGradient: 'from-indigo-600 via-purple-600 to-pink-500',
    cardBackBg: 'bg-[radial-gradient(#a855f7_1px,transparent_1px)]',
    border: 'border-purple-400/60',
    glowColor: 'rgba(192, 132, 252, 0.5)',
    symbol: '🌔',
    styleTag: lang === 'en' ? 'Moon & Intuition' : lang === 'zh' ? '月相与直觉' : 'Mặt Trăng & Trực Giác'
  },
  {
    id: 'mystic_botanical',
    name: lang === 'en' ? 'Mystic Botanical Witches Tarot' : lang === 'zh' ? '植物女巫塔罗' : 'Tarot Phù Thủy & Thảo Mộc',
    englishName: 'Mystic Botanical Witches Tarot',
    description: lang === 'en'
      ? 'Nature spellcraft deck with herbal magic, emerald crystals, and ancient healing runes.'
      : lang === 'zh'
      ? '充满草药魔法与翡翠能量的自然女巫塔罗，寓意疗愈与生机。'
      : 'Bộ bài mang hơi thở ma thuật thiên nhiên, thần chú thảo mộc, đá ngọc bích và ký tự cổ rune chữa lành.',
    icon: '🌿',
    color: '#34d399',
    bgGradient: 'from-emerald-600 via-teal-600 to-amber-400',
    cardBackBg: 'bg-[radial-gradient(#10b981_1px,transparent_1px)]',
    border: 'border-emerald-400/60',
    glowColor: 'rgba(52, 211, 153, 0.5)',
    symbol: '🍃',
    styleTag: lang === 'en' ? 'Nature & Healing' : lang === 'zh' ? '自然与疗愈' : 'Thiên Nhiên & Chữa Lành'
  },
  {
    id: 'ancient_egyptian',
    name: lang === 'en' ? 'Ancient Egyptian Mythic Tarot' : lang === 'zh' ? '古埃及神话塔罗' : 'Tarot Thần Thoại Ai Cập Cổ Đại',
    englishName: 'Ancient Egyptian Mythic Tarot',
    description: lang === 'en'
      ? 'Papyrus mythic style featuring lucky scarab, Eye of Horus, and divine pharaoh wisdom.'
      : lang === 'zh'
      ? '古埃及莎草纸风格，融汇荷鲁斯之眼与圣甲虫神秘祝福。'
      : 'Bộ bài phong cách giấy bối Ai Cập cổ đại với bọ hung may mắn, mắt thần Horus và ngai vàng các vị thần.',
    icon: '🏺',
    color: '#38bdf8',
    bgGradient: 'from-blue-600 via-cyan-500 to-amber-400',
    cardBackBg: 'bg-[radial-gradient(#06b6d4_1px,transparent_1px)]',
    border: 'border-cyan-400/60',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    symbol: '👁️',
    styleTag: lang === 'en' ? 'Myth & Wisdom' : lang === 'zh' ? '神话与智慧' : 'Thần Thoại & Trí Tuệ'
  },
  {
    id: 'solar_radiance',
    name: lang === 'en' ? 'Solar Radiance Tarot' : lang === 'zh' ? '耀日光芒塔罗' : 'Tarot Mặt Trời & Hào Quang',
    englishName: 'Solar Radiance Tarot',
    description: lang === 'en'
      ? 'Radiant solar energy deck fostering powerful awakening, courage, and luminous victory.'
      : lang === 'zh'
      ? '如烈日般炽热的能量塔罗，赋予勇气、觉醒与胜利光芒。'
      : 'Bộ bài rực cháy năng lượng mặt trời, mang lại sự thức tỉnh mạnh mẽ, lòng quả cảm và chiến thắng quang minh.',
    icon: '☀️',
    color: '#f97316',
    bgGradient: 'from-orange-500 via-amber-500 to-rose-500',
    cardBackBg: 'bg-[radial-gradient(#f97316_1px,transparent_1px)]',
    border: 'border-orange-400/60',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    symbol: '🔆',
    styleTag: lang === 'en' ? 'Solar & Victory' : lang === 'zh' ? '阳光与胜景' : 'Mặt Trời & Khát Vọng'
  }
];

export const getSpreadTypes = (lang = 'vi') => [
  {
    id: 'single',
    title: lang === 'en' ? 'Single Card (Cosmic Message)' : lang === 'zh' ? '单牌占卜 (宇宙启示)' : 'Rút 1 Lá (Thông Điệp Vũ Trụ)',
    cardCount: 1,
    desc: lang === 'en'
      ? 'Quick single card daily guidance or direct answer to a specific question.'
      : lang === 'zh'
      ? '快速获取每日宇宙提示或解答单一特定疑问。'
      : 'Nhận câu trả lời ngắn gọn, thông điệp định hướng nhanh trong ngày hoặc giải đáp 1 câu hỏi cụ thể.',
    badge: lang === 'en' ? 'Popular' : lang === 'zh' ? '热门' : 'Phổ biến',
    icon: '✨'
  },
  {
    id: 'three_time',
    title: lang === 'en' ? '3 Cards (Timeline Spread)' : lang === 'zh' ? '三牌牌阵 (时间流)' : 'Trải 3 Lá (Thời Gian)',
    cardCount: 3,
    desc: lang === 'en'
      ? 'Past - Present - Future: Gain perspective on your timeline and evolving energy flow.'
      : lang === 'zh'
      ? '过去 - 现状 - 未来：回顾时间线演变与能量流向。'
      : 'Quá khứ - Hiện tại - Tương lai: Nhìn lại tiến trình phát triển và dòng chảy thời gian.',
    badge: lang === 'en' ? 'Basic' : lang === 'zh' ? '基础' : 'Cơ bản',
    icon: '⌛'
  },
  {
    id: 'three_advice',
    title: lang === 'en' ? '3 Cards (Problem Solving)' : lang === 'zh' ? '三牌牌阵 (问题破局)' : 'Trải 3 Lá (Giải Quyết Vấn Đề)',
    cardCount: 3,
    desc: lang === 'en'
      ? 'Situation - Challenge - Advice: Uncover hidden obstacles and shape your next steps.'
      : lang === 'zh'
      ? '现状 - 挑战 - 建议：破译盲点并指引明确方向。'
      : 'Hoàn cảnh - Thử thách - Lời khuyên: Giúp tháo gỡ góc khuất và định hình hướng đi.',
    badge: lang === 'en' ? 'Insightful' : lang === 'zh' ? '进阶' : 'Chuyên sâu',
    icon: '🗝️'
  },
  {
    id: 'five_aspects',
    title: lang === 'en' ? '5 Cards (Full Cosmic Overview)' : lang === 'zh' ? '五维全景占卜 (五大维度)' : 'Trải 5 Lá (Tổng Quan Vũ Trụ)',
    cardCount: 5,
    desc: lang === 'en'
      ? 'Complete analysis across 5 key realms: Situation, Love, Career, Finance & General Advice.'
      : lang === 'zh'
      ? '全面解析五大维度：现状心境、感情羁绊、事业学业、财务运势与宇宙建议。'
      : 'Giải nghĩa đầy đủ 5 khía cạnh cốt lõi: Hoàn cảnh, Tình cảm, Công việc/Học tập, Tài chính & Lời khuyên.',
    badge: lang === 'en' ? 'Comprehensive' : lang === 'zh' ? '全景' : 'Toàn diện',
    icon: '🔮'
  }
];

export const TAROT_DECKS_THEMES = getTarotDecksThemes('vi');
export const SPREAD_TYPES = getSpreadTypes('vi');

export const TAROT_DECK = [
  ...MAJOR_ARCANA,
  ...WANDS,
  ...CUPS,
  ...SWORDS,
  ...PENTACLES
];

// Helper to draw random unique cards
export const getRandomDeckDraw = (count = 5) => {
  const deckCopy = [...TAROT_DECK];
  const drawn = [];
  for (let i = 0; i < count; i++) {
    if (deckCopy.length === 0) break;
    const randomIndex = Math.floor(Math.random() * deckCopy.length);
    const card = deckCopy.splice(randomIndex, 1)[0];
    drawn.push({
      ...card,
      isReversed: Math.random() < 0.2
    });
  }
  return drawn;
};
