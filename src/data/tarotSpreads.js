// Kiểu trải bài và các bộ bài (phần trình bày).
//
// Tách khỏi tarotData.js vì hai phần này không đụng tới dữ liệu 78 lá, trong
// khi tarotData.js kéo theo cả năm file bộ ẩn. App chỉ cần đúng hai hằng số ở
// đây để đặt giá trị mặc định, mà import từ tarotData thì gói chính phải ôm
// trọn bộ bài ngay từ lần tải đầu - kể cả với khách chưa từng mở tab Tarot.

export const getTarotDecksThemes = (lang = 'vi') => [
  {
    id: 'cosmic_advice',
    name: lang === 'en' ? 'Cosmic Advice & Oracle Tarot' : lang === 'zh' ? '宇宙启示神谕塔罗' : 'Tarot Lời Khuyên Vũ Trụ',
    englishName: 'Cosmic Advice & Oracle Tarot',
        description: lang === 'en'
      ? 'Reads for action: each card is asked what step it wants from you. Good when you already know the problem and need something concrete to do.'
      : lang === 'zh'
      ? '偏向行动的读法：每张牌都在问你该迈哪一步。适合问题已经清楚、只差一件具体的事去做。'
      : 'Đọc theo hướng hành động: mỗi lá được hỏi bạn nên bước tiếp thế nào. Hợp khi bạn đã rõ vấn đề và cần một việc cụ thể để làm.',
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
      ? 'The classic reading: every side weighed evenly, no push to decide. Good when you want the whole picture first.'
      : lang === 'zh'
      ? '经典读法：各面向平均照顾，不催你下决定。适合想先看清全局的时候。'
      : 'Đọc theo lối kinh điển, cân đều các mặt và không thúc bạn chọn vội. Hợp khi bạn muốn nhìn toàn cảnh trước đã.',
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
      ? 'Reads for rhythm and timing, rising or falling. Good when your question is whether to move now or wait.'
      : lang === 'zh'
      ? '看事情的涨落节奏，重在时机。适合你想问的是现在就走，还是再等一等。'
      : 'Đọc theo nhịp lên xuống của sự việc, nặng về thời điểm. Hợp khi câu hỏi của bạn là nên đi bây giờ hay nên đợi.',
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
      ? 'Reads like tending a garden: what to feed, what to cut back. Good when you are healing something or clearing space.'
      : lang === 'zh'
      ? '像照料一座园子来读：什么该养，什么该剪。适合正在疗愈，或想清一清的时候。'
      : 'Đọc như chăm một khu vườn: cái gì cần nuôi, cái gì cần tỉa. Hợp khi bạn đang muốn chữa lành hoặc dọn bớt.',
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
      ? 'Reads by weighing long consequences, further out than this week. Good when facing a decision that will stay with you.'
      : lang === 'zh'
      ? '用秤来读，看的是长远的后果，比这一周更远。适合面对一个会跟你很久的决定。'
      : 'Đọc theo lối cân đo hệ quả dài, nhìn xa hơn tuần này. Hợp khi bạn đứng trước một quyết định còn theo bạn lâu.',
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
      ? 'Reads for nerve: where you are hiding and what stepping out would give you. Good when you know what to do but have not dared.'
      : lang === 'zh'
      ? '读的是胆量：你躲在哪里，走出来能换到什么。适合心里有数、只是还不敢动的时候。'
      : 'Đọc theo hướng can đảm: chỗ nào bạn đang nấp, bước ra thì được gì. Hợp khi bạn biết phải làm gì mà chưa dám.',
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
