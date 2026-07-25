// Tarot Interpretation Synthesis Engine with i18n Multi-Language Support

export const analyzeReadingSession = (drawnCards = [], spreadType = 'five_aspects', question = '', lang = 'vi') => {
  if (!drawnCards || drawnCards.length === 0) return null;

  // 1. Calculate Major/Minor Arcana counts
  const majorCount = drawnCards.filter(c => c.arcana === 'Major').length;
  const minorCount = drawnCards.length - majorCount;

  // 2. Calculate Elemental Distribution
  const elementCounts = { 'Fire': 0, 'Water': 0, 'Air': 0, 'Earth': 0 };
  drawnCards.forEach(c => {
    const el = c.element || '';
    if (el.includes('Lửa') || el.includes('Fire') || c.suit === 'Wands') elementCounts['Fire']++;
    else if (el.includes('Nước') || el.includes('Water') || c.suit === 'Cups') elementCounts['Water']++;
    else if (el.includes('Khí') || el.includes('Air') || c.suit === 'Swords') elementCounts['Air']++;
    else if (el.includes('Đất') || el.includes('Earth') || c.suit === 'Pentacles') elementCounts['Earth']++;
    else elementCounts['Air']++;
  });

  // Find dominant element
  let dominantElement = 'Fire';
  let maxCount = -1;
  Object.entries(elementCounts).forEach(([el, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantElement = el;
    }
  });

  const elementNamesVi = {
    'Fire': 'Lửa (Khát vọng & Đột phá)',
    'Water': 'Nước (Cảm xúc & Chữa lành)',
    'Air': 'Khí (Tri thức & Sự thật)',
    'Earth': 'Đất (Vật chất & Bền vững)'
  };

  const elementNamesEn = {
    'Fire': 'Fire (Passion & Breakthrough)',
    'Water': 'Water (Emotion & Healing)',
    'Air': 'Air (Truth & Wisdom)',
    'Earth': 'Earth (Stability & Prosperity)'
  };

  const elementNamesZh = {
    'Fire': '火元素 (激情与突破)',
    'Water': '水元素 (情感与疗愈)',
    'Air': '风元素 (真理与智慧)',
    'Earth': '土元素 (基石与丰收)'
  };

  const currentElementMap = lang === 'en' ? elementNamesEn : lang === 'zh' ? elementNamesZh : elementNamesVi;

  // 3. Aspect Syntheses
  const aspects = {
    situation: [],
    love: [],
    work: [],
    finance: [],
    advice: []
  };

  drawnCards.forEach((card, index) => {
    const data = card.isReversed ? card.reversed : card.upright;
    const cardTitleVi = `${card.nameVi} (${card.isReversed ? 'Bài Ngược 🔄' : 'Bài Xuôi ✨'})`;
    const cardTitleEn = `${card.name} (${card.isReversed ? 'Reversed 🔄' : 'Upright ✨'})`;
    const cardTitleZh = `${card.nameZh || card.name} (${card.isReversed ? '逆位 🔄' : '正位 ✨'})`;

    const cardTitle = lang === 'en' ? cardTitleEn : lang === 'zh' ? cardTitleZh : cardTitleVi;
    const summary = lang === 'en' ? (data.summaryEn || data.summary) : lang === 'zh' ? (data.summaryZh || data.summary) : data.summary;

    aspects.situation.push({
      cardName: cardTitle,
      cardIndex: index + 1,
      text: data.situation,
      summary: summary,
      color: card.color
    });

    aspects.love.push({
      cardName: cardTitle,
      cardIndex: index + 1,
      text: data.love,
      summary: summary,
      color: card.color
    });

    aspects.work.push({
      cardName: cardTitle,
      cardIndex: index + 1,
      text: data.work,
      summary: summary,
      color: card.color
    });

    aspects.finance.push({
      cardName: cardTitle,
      cardIndex: index + 1,
      text: data.finance,
      summary: summary,
      color: card.color
    });

    aspects.advice.push({
      cardName: cardTitle,
      cardIndex: index + 1,
      text: data.advice,
      summary: summary,
      color: card.color
    });
  });

  // Affirmations pool in multi-languages
  const affirmationsVi = [
    "Tôi là người kiến tạo thực tại của chính mình. Vũ trụ luôn rộng mở soi đường cho tôi.",
    "Tôi buông bỏ những điều không còn phục vụ sự phát triển của tâm hồn và đón nhận năng lượng tươi mới.",
    "Trí tuệ và trực giác nội tâm của tôi là ngọn đèn hải đăng dẫn lối qua mọi bão tố.",
    "Tôi trân trọng hành trình hiện tại và tin tưởng vào thời điểm hoàn hảo của vũ trụ.",
    "Tôi xứng đáng nhận được tình yêu thương, sự bình an và thịnh vượng trọn vẹn."
  ];

  const affirmationsEn = [
    "I am the co-creator of my reality. The Universe illuminates my path.",
    "I release what no longer serves my spiritual growth and embrace fresh energy.",
    "My inner wisdom and intuition guide me through every storm.",
    "I honor my present journey and trust in the Universe's perfect timing.",
    "I am worthy of receiving deep love, peace, and abundance."
  ];

  const affirmationsZh = [
    "我是自身现实的显化创造者，宇宙神圣光芒时刻照亮前路。",
    "我勇敢放下不再服务于灵魂成长的羁绊，拥抱崭新的宇宙能量。",
    "我内在的智慧与直觉是我穿过风浪最可靠的指路明灯。",
    "我珍视当下的每一段旅程，并全然相信宇宙最完美的时机安排。",
    "我值得拥有丰盈的爱、内心的宁静与无尽的繁荣。"
  ];

  const pool = lang === 'en' ? affirmationsEn : lang === 'zh' ? affirmationsZh : affirmationsVi;
  const chosenAffirmation = pool[Math.floor(Math.random() * pool.length)];

  return {
    drawnCards,
    spreadType,
    question,
    date: new Date().toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'zh' ? 'zh-CN' : 'vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    stats: {
      total: drawnCards.length,
      majorCount,
      minorCount,
      reversedCount: drawnCards.filter(c => c.isReversed).length,
      dominantElement: currentElementMap[dominantElement] || dominantElement
    },
    aspects,
    affirmation: chosenAffirmation
  };
};
