// Tarot Interpretation Synthesis Engine with i18n Multi-Language & Holistic Interconnected Story Generator
//
// Thông điệp khẳng định từ Vũ Trụ (affirmation) không còn nằm trong bản giải
// bài: nó là một trải nghiệm riêng ở quả cầu đầu trang (components/CosmicOrb).

export const analyzeReadingSession = (drawnCards = [], spreadType = 'five_aspects', question = '', lang = 'vi') => {
  if (!drawnCards || drawnCards.length === 0) return null;

  // 1. Calculate Major/Minor Arcana counts
  const majorCount = drawnCards.filter(c => c.arcana === 'Major').length;
  const minorCount = drawnCards.length - majorCount;
  const reversedCount = drawnCards.filter(c => c.isReversed).length;
  const uprightCount = drawnCards.length - reversedCount;

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

  // 4. 🔮 HOLISTIC INTERCONNECTED NARRATIVE SYNTHESIS (Bản Luận Giải Liên Kết Tổng Thể)
  const firstCard = drawnCards[0];
  const lastCard = drawnCards[drawnCards.length - 1];
  const midCards = drawnCards.slice(1, drawnCards.length - 1);

  const getCardNameByLang = (c) => lang === 'en' ? c.name : lang === 'zh' ? (c.nameZh || c.name) : c.nameVi;

  let holisticNarrative = '';

  if (lang === 'en') {
    holisticNarrative = `### 🌌 The Interconnected Energy Flow of Your Spread\n\n` +
      `Your reading opens with **${getCardNameByLang(firstCard)}** (${firstCard.isReversed ? 'Reversed' : 'Upright'}), establishing the core baseline of your current query. This foundational card reveals that the initial catalyst is driven by ${firstCard.isReversed ? 'inner reflection and resolving underlying friction' : 'an active cosmic invitation to step forward'}.\n\n` +
      (midCards.length > 0 ? `As we trace the energy moving through **${midCards.map(getCardNameByLang).join('**, **')}**, we see the dynamic evolution of your situation. The interplay between these cards indicates a period of transformation where your decisions directly influence the momentum of your journey.\n\n` : '') +
      `The climax of your spread rests upon **${getCardNameByLang(lastCard)}** (${lastCard.isReversed ? 'Reversed' : 'Upright'}), acting as the ultimate cosmic anchor. This final card reminds you that ${lastCard.isReversed ? 'by gently addressing past doubts and embracing patience, victory is assured' : 'trusting your inner wisdom and aligning your actions will unlock full abundance'}.\n\n` +
      `**Elemental Alignment:** The strong presence of **${currentElementMap[dominantElement]}** emphasizes that your primary key to breakthrough lies in ${dominantElement === 'Fire' ? 'bold passion and decisive action' : dominantElement === 'Water' ? 'emotional healing and intuitive trust' : dominantElement === 'Air' ? 'clarity of truth and rational focus' : 'practical grounding and steady perseverance'}.`;
  } else if (lang === 'zh') {
    holisticNarrative = `### 🌌 牌阵整体能量脉络深度交织解析\n\n` +
      `本次占卜以 **${getCardNameByLang(firstCard)}** (${firstCard.isReversed ? '逆位' : '正位'}) 揭开序幕，这构成了您当前所问议题的基石能量。此牌表明一切的起点源于 ${firstCard.isReversed ? '内心的深刻反思与潜意识矛盾的化解' : '宇宙积极的召唤与蓬勃发展的契机'}。\n\n` +
      (midCards.length > 0 ? `顺着能量流动观察穿梭于 **${midCards.map(getCardNameByLang).join('** 与 **')}** 之间的脉络，展现出事物发展的动态演变过程。卡牌之间的相互呼应提示您，当下的每一个抉择都将深远影响接下来的轨迹。\n\n` : '') +
      `整幅牌阵的最终落脚点定格在 **${getCardNameByLang(lastCard)}** (${lastCard.isReversed ? '逆位' : '正位'})，作为宇宙给予您的神圣锚点。这张总结牌启示您：${lastCard.isReversed ? '只要温和接纳自我、保持耐心疏导盲点，破局时刻终将到来' : '坚定信任内心直觉并知行合一，必能收获圆满丰盈'}。\n\n` +
      `**元素交织启示：** 牌阵中 **${currentElementMap[dominantElement]}** 占据主导地位，表明您实现破局的关键在于 ${dominantElement === 'Fire' ? '保持炽热激情与果断行动' : dominantElement === 'Water' ? '深化情感疗愈与直觉信任' : dominantElement === 'Air' ? '坚守理智洞察与真理清明' : '务实沉淀与持之以恒的积累'}。`;
  } else {
    // Vietnamese (Default)
    holisticNarrative = `### 🌌 Bản Luận Giải Liên Kết Dòng Chảy Năng Lượng Tổng Thể\n\n` +
      `Phiên trải bài của bạn mở đầu với lá **${getCardNameByLang(firstCard)}** (${firstCard.isReversed ? 'Bài Ngược 🔄' : 'Bài Xuôi ✨'}), đại diện cho móng giàn năng lượng xuất phát điểm. Sự hiện diện của lá bài này cho thấy gốc rễ vấn đề bắt nguồn từ ${firstCard.isReversed ? 'những xung đột âm ỉ nội tâm cần được nhìn nhận và chữa lành' : 'một cơ hội khởi đầu đầy hứa hẹn được Vũ Trụ thúc đẩy'}.\n\n` +
      (midCards.length > 0 ? `Tiếp nối dòng chảy chuyển động qua các lá **${midCards.map(getCardNameByLang).join('**, **')}**, chúng ta thấy được sự tương tác đa chiều giữa các mặt trong cuộc sống. Các lá bài giữa đóng vai trò như cây cầu nối, chỉ ra rằng giai đoạn này đòi hỏi bạn phải cân bằng giữa lý trí và cảm xúc để biến thử thách thành bước đà thăng tiến.\n\n` : '') +
      `Điểm kết tụ năng lượng và là chìa khóa đúc kết cho toàn bộ trải bài dừng lại ở **${getCardNameByLang(lastCard)}** (${lastCard.isReversed ? 'Bài Ngược 🔄' : 'Bài Xuôi ✨'}). Lá bài chốt hạ này mang thông điệp cốt lõi từ Vũ Trụ: ${lastCard.isReversed ? 'chỉ cần bạn kiên nhẫn tháo gỡ những nghi ngờ cũ và buông bỏ sự vội vàng, thành quả tốt đẹp sẽ tự nhiên gõ cửa' : 'khi bạn dám dấn thân và tin tưởng tuyệt đối vào bản năng, mọi ước nguyện sẽ hiện thực hóa trọn vẹn'}.\n\n` +
      `**Sự Tương Tác Nguyên Tố:** Sự áp đảo của **${currentElementMap[dominantElement]}** khẳng định rằng chiếc chìa khóa vạn năng giúp bạn tháo gỡ mọi vướng mắc lúc này chính là ${dominantElement === 'Fire' ? 'ngọn lửa nhiệt huyết, sự quyết đoán và tinh thần dấn thân' : dominantElement === 'Water' ? 'sự lắng nghe trực giác, yêu thương và chữa lành cảm xúc' : dominantElement === 'Air' ? 'sự minh bạch của sự thật, tư duy sắc bén và lý trí' : 'sự kiên trì, thực tế và xây dựng nền tảng vững chắc'}.`;
  }

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
      reversedCount,
      uprightCount,
      dominantElement: currentElementMap[dominantElement] || dominantElement
    },
    aspects,
    holisticNarrative
  };
};
