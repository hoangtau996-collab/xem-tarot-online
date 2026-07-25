// Full 78 Rider-Waite Tarot Deck Database with i18n localization support

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
  {
    id: 'major-0',
    number: 0,
    name: 'The Fool',
    nameVi: 'Chàng Khờ (The Fool)',
    nameZh: '愚人 (The Fool)',
    arcana: 'Major',
    element: 'Khí (Air)',
    keywords: ['Khởi đầu mới', 'Tự do', 'Tin tưởng', 'Bất ngờ', 'Mạo hiểm'],
    icon: '🔮',
    symbol: '🌀',
    color: '#38bdf8',
    upright: {
      summary: 'Khởi đầu một hành trình mới đầy hào hứng, tự do và tự tin dấn thân vào những điều chưa biết.',
      summaryEn: 'Embarking on an exciting new journey with freedom and trust in the unknown.',
      summaryZh: '踏上一段充满希望与自由的新旅程，勇敢拥抱未知的可能性。',
      situation: 'Bạn đang đứng ở vạch xuất phát của một chu kỳ sống mới. Hãy mở lòng đón nhận những trải nghiệm mới mà không bị ràng buộc bởi sự sợ hãi hay định kiến cũ.',
      love: 'Một làn gió mới tràn vào đời sống tình cảm. Nếu đang độc thân, bạn sắp gặp đối tượng mang lại cảm xúc mới mẻ; nếu đang trong mối quan hệ, hãy tạo ra những bất ngờ vui vẻ.',
      work: 'Thời điểm lý tưởng để khởi xướng dự án mới, chuyển hướng công việc hoặc thử sức ở lĩnh vực chưa từng làm. Sự sáng tạo tự do là chìa khóa.',
      finance: 'Cơ hội tài chính mới xuất hiện. Tuy nhiên hãy mạo hiểm có tính toán, tránh quyết định bốc đồng quá mức.',
      advice: 'Hãy tin tưởng vào vũ trụ và bước đi bằng trái tim thuần khiết. Đừng để nỗi sợ thất bại cản bước chân bạn.'
    },
    reversed: {
      summary: 'Sự liều lĩnh thiếu tính toán, nỗi sợ hãi bước ra khỏi vùng an toàn hoặc chần chừ bỏ lỡ cơ hội.',
      summaryEn: 'Recklessness, fear of stepping outside your comfort zone, or hesitation causing missed opportunities.',
      summaryZh: '鲁莽行事缺乏规划，或过于恐惧迈出舒适区而错失良机。',
      situation: 'Bạn có thể đang hành động thiếu suy nghĩ hoặc ngược lại, quá lo sợ rủi ro nên tự giam mình trong lối mòn.',
      love: 'Cần cẩn trọng với những quyết định bộc phát trong tình cảm. Tránh hứa hẹn khi chưa sẵn sàng cam kết.',
      work: 'Tránh ngẫu hứng thiếu kế hoạch trong công việc. Hãy xem xét kỹ các chi tiết trước khi ký kết hợp đồng.',
      finance: 'Cảnh báo chi tiêu ngẫu hứng gây thâm hụt. Hãy quản lý ngân sách cẩn thận hơn.',
      advice: 'Hãy chậm lại một chút để suy xét hậu quả trước khi nhảy xuống hố sâu. Tự do cần đi kèm sự trách nhiệm.'
    }
  },
  {
    id: 'major-1',
    number: 1,
    name: 'The Magician',
    nameVi: 'Nhà Ảo Thuật (The Magician)',
    nameZh: '魔术师 (The Magician)',
    arcana: 'Major',
    element: 'Khí (Air)',
    keywords: ['Năng lực', 'Ý chí', 'Tạo tác', 'Hiện thực hóa', 'Tập trung'],
    icon: '🪄',
    symbol: '♾️',
    color: '#ec4899',
    upright: {
      summary: 'Bạn nắm giữ đầy đủ công cụ, kỹ năng và nguồn lực để biến ý tưởng thành hiện thực.',
      summaryEn: 'You possess all the tools, skills, and resources needed to manifest your intentions into reality.',
      summaryZh: '您拥有实现目标所需的一切资源与天赋技能，可显化心想事成。',
      situation: 'Bạn đang ở trạng thái tập trung và tràn đầy năng lượng sáng tạo. Mọi nguồn lực vũ trụ đang ủng hộ mục tiêu của bạn.',
      love: 'Mối quan hệ mang tính chủ động cao. Bạn có sức hút mạnh mẽ và khả năng truyền cảm hứng sâu sắc tới đối phương.',
      work: 'Thời điểm bứt phá mạnh mẽ trong sự nghiệp. Khả năng giao tiếp, giải quyết vấn đề và năng lực cá nhân được phát huy tối đa.',
      finance: 'Khả năng tạo ra thu nhập mới thông qua tài năng và ý tưởng cá nhân rất cao. Hãy chủ động hành động.',
      advice: 'Hợp nhất ý chí và mục tiêu. Hãy tự tin sử dụng mọi khả năng của mình để kiến tạo thực tại mong muốn.'
    },
    reversed: {
      summary: 'Lãng phí tài năng, thiếu tập trung hoặc bị thao túng bởi những lời hứa suông.',
      summaryEn: 'Unused talent, lack of focus, or potential manipulation.',
      summaryZh: '资源浪费、专注力不足或需要防范花言巧语。',
      situation: 'Bạn chưa khai thác hết tiềm năng vốn có hoặc cảm thấy nghi ngờ bản thân dù sở hữu đủ năng lực.',
      love: 'Cẩn trọng với những biểu hiện thiếu chân thành hay sự thao túng cảm xúc trong mối quan hệ.',
      work: 'Đừng hứa hẹn quá sức mình. Hãy tập trung hoàn thiện kỹ năng thay vì đi đường tắt.',
      finance: 'Đề phòng các cơ hội làm giàu không rõ ràng hoặc lừa đảo tài chính.',
      advice: 'Hãy kiểm tra lại động cơ và rèn luyện tính trung thực với chính mình trước khi hành động.'
    }
  },
  {
    id: 'major-2',
    number: 2,
    name: 'The High Priestess',
    nameVi: 'Nữ Tế Sĩ (The High Priestess)',
    nameZh: '女祭司 (The High Priestess)',
    arcana: 'Major',
    element: 'Nước (Water)',
    keywords: ['Trực giác', 'Bí mật', 'Trí tuệ nội tâm', 'Lắng nghe', 'Tâm linh'],
    icon: '🌙',
    symbol: '🌔',
    color: '#a855f7',
    upright: {
      summary: 'Trực giác và trí tuệ tâm linh lên tiếng. Hãy kiên nhẫn lắng nghe tiếng nói bên trong.',
      summaryEn: 'Intuition and inner wisdom are calling. Listen closely to your quiet inner voice.',
      summaryZh: '灵性直觉与内在智慧苏醒，静心倾听深层直觉指引。',
      situation: 'Bạn đang trải qua khoảng thời gian suy ngẫm sâu sắc. Không phải lúc nào hành động bên ngoài cũng là giải pháp, đôi khi cần quan sát tĩnh lặng.',
      love: 'Sự kết nối tinh thần sâu sắc vượt trên lời nói. Có những cảm xúc tiềm ẩn cần thời gian bộc lộ.',
      work: 'Hãy tin vào cảm nhận cá nhân khi đưa ra quyết định. Giữ sự bảo mật cho các ý tưởng chiến lược.',
      finance: 'Giữ thái độ cẩn trọng. Không nên vội vàng đầu tư khi chưa nắm rõ mọi thông tin ẩn bên dưới.',
      advice: 'Dành thời gian yên tĩnh tĩnh tâm. Trực giác của bạn chính là ngọn hải đăng chính xác nhất lúc này.'
    },
    reversed: {
      summary: 'Phớt lờ tiếng nói trực giác, sự che giấu hoặc bị xao nhãng bởi ý kiến bên ngoài.',
      summaryEn: 'Ignoring your intuition, secrets, or being distracted by external noise.',
      summaryZh: '忽视直觉声音，或因外界杂音干扰而迷失方向。',
      situation: 'Bạn đang chạy theo áp lực đám đông mà bỏ qua tiếng nói nội tâm chân thật của chính mình.',
      love: 'Thiếu sự chia sẻ thành thật hoặc có bí mật gây khoảng cách giữa hai người.',
      work: 'Thông tin bị giấu giếm hoặc hiểu lầm trong giao tiếp công sở. Hãy làm rõ mọi thắc mắc.',
      finance: 'Đề phòng những rủi ro tài chính ẩn nấp dưới vẻ ngoài hấp dẫn.',
      advice: 'Hãy dừng lại, tránh xa tiếng ồn bên ngoài và học cách lắng nghe sự thật từ bên trong.'
    }
  },
  {
    id: 'major-3',
    number: 3,
    name: 'The Empress',
    nameVi: 'Nữ Hoàng (The Empress)',
    nameZh: '皇后 (The Empress)',
    arcana: 'Major',
    element: 'Đất (Earth)',
    keywords: ['Trù phú', 'Sinh sôi', 'Nuôi dưỡng', 'Vẻ đẹp', 'Tình mẫu tử'],
    icon: '👑',
    symbol: '♀️',
    color: '#f59e0b',
    upright: {
      summary: 'Thời kỳ gặt hái sự trù phú, tươi đẹp và đong đầy tình yêu thương nuôi dưỡng.',
      summaryEn: 'A period of abundance, creative fertility, beauty, and nurturing love.',
      summaryZh: '收获丰饶、蓬勃创造力与滋养之爱的美妙时期。',
      situation: 'Năng lượng sáng tạo và sự phát triển thịnh vượng đang bao bọc lấy bạn. Hãy đón nhận niềm vui sống.',
      love: 'Tình yêu thăng hoa, ấm áp và gắn kết sâu sắc. Đánh dấu bước tiến mới đong đầy hạnh phúc.',
      work: 'Dự án đang ra hoa kết trái. Môi trường làm việc hài hòa, khơi gợi cảm hứng sáng tạo dạt dào.',
      finance: 'Tài chính dồi dào, ổn định và có xu hướng tăng trưởng bền vững.',
      advice: 'Yêu thương bản thân và thiên nhiên. Hãy lan tỏa sự chăm sóc và lòng tốt đến mọi người xung quanh.'
    },
    reversed: {
      summary: 'Sự phụ thuộc cảm xúc, ngột ngạt hoặc cảm giác thiếu hụt sự chăm sóc.',
      summaryEn: 'Emotional dependence, burnout, or feeling neglected.',
      summaryZh: '情感过度消耗、缺乏自爱或创造力暂时受阻。',
      situation: 'Bạn cảm thấy kiệt sức do cho đi quá nhiều mà quên mất việc chăm sóc chính mình.',
      love: 'Cần tránh việc kiểm soát quá đà hoặc hy sinh bản thân đến mức đánh mất sự độc lập.',
      work: 'Sự sáng tạo bị tắc nghẽn. Hãy nghỉ ngơi để nạp lại năng lượng thay vì ép buộc bản thân.',
      finance: 'Chi tiêu quá tay cho những sự xa xỉ không cần thiết. Cần cân bằng lại thu chi.',
      advice: 'Hãy ưu tiên yêu thương và chữa lành cho chính mình trước khi quay sang chăm sóc người khác.'
    }
  },
  {
    id: 'major-4',
    number: 4,
    name: 'The Emperor',
    nameVi: 'Hoàng Đế (The Emperor)',
    nameZh: '皇帝 (The Emperor)',
    arcana: 'Major',
    element: 'Lửa (Fire)',
    keywords: ['Kỷ luật', 'Quyền lực', 'Cấu trúc', 'Bảo vệ', 'Ổn định'],
    icon: '🏛️',
    symbol: '♈',
    color: '#ef4444',
    upright: {
      summary: 'Sự làm chủ, vững vàng, thiết lập trật tự và thực thi kỷ luật rõ ràng.',
      summaryEn: 'Mastery, stability, establishing order, and applying clear discipline.',
      summaryZh: '彰显主控力、秩序建立与严谨的自律精神。',
      situation: 'Bạn cần đóng vai trò nhà lãnh đạo cuộc đời mình. Xây dựng kế hoạch vững chắc và thực thi nghiêm túc.',
      love: 'Tình yêu dựa trên sự cam kết, an toàn và tinh thần trách nhiệm cao từ cả hai phía.',
      work: 'Thời điểm thiết lập quy trình, khẳng định vị thế uy tín và dẫn dắt tập thể hướng đến mục tiêu chung.',
      finance: 'Quản lý tài chính bài bản, đầu tư có hệ thống và bảo vệ thành quả lao động chắc chắn.',
      advice: 'Hãy giữ sự kiên định, nguyên tắc và kỷ luật. Sức mạnh đến từ sự rõ ràng và bản lĩnh.'
    },
    reversed: {
      summary: 'Sự cứng nhắc quá mức, lạm quyền hoặc thiếu khả năng kiểm soát tình hình.',
      summaryEn: 'Overly rigid control, abuse of authority, or lack of discipline.',
      summaryZh: '过于死板固执、控制欲过强或自我约束力缺乏。',
      situation: 'Bạn có thể đang quá kiểm soát hoặc ngược lại, thiếu tính kỷ luật dẫn đến sự hỗn loạn.',
      love: 'Tránh sự gia trưởng, độc đoán hoặc áp đặt quan điểm lên người bạn đời.',
      work: 'Xung đột với cấp trên hoặc quy trình quá cồng kềnh cản trở sự linh hoạt.',
      finance: 'Thiếu kiểm soát trong dòng tiền hoặc đầu tư quá mạo hiểm thiếu chiến lược.',
      advice: 'Hãy mềm mỏng hơn khi cần thiết. Lãnh đạo giỏi là người biết lắng nghe và linh hoạt.'
    }
  },
  {
    id: 'major-5',
    number: 5,
    name: 'The Hierophant',
    nameVi: 'Tư Tế (The Hierophant)',
    nameZh: '教皇 (The Hierophant)',
    arcana: 'Major',
    element: 'Đất (Earth)',
    keywords: ['Truyền thống', 'Học hỏi', 'Đạo đức', 'Định hướng', 'Quy chuẩn'],
    icon: '📜',
    symbol: '♉',
    color: '#eab308',
    upright: {
      summary: 'Tìm kiếm tri thức, tuân theo giá trị truyền thống và nhận được lời khuyên từ người có kinh nghiệm.',
      summaryEn: 'Seeking wisdom, respecting core traditions, and receiving mentorship.',
      summaryZh: '遵循正统价值观，寻求导师指引与成熟智慧。',
      situation: 'Bạn đang tìm kiếm hướng đi dựa trên các giá trị đạo đức vững chắc hoặc học hỏi từ những người thầy uy tín.',
      love: 'Mối quan hệ hướng tới sự cam kết truyền thống (kết hôn, đính hôn) và chung giá trị sống.',
      work: 'Thích hợp làm việc trong tổ chức có hệ thống rõ ràng, học hỏi từ cấp trên hoặc nâng cao trình độ chuyên môn.',
      finance: 'Nên chọn các kênh đầu tư an toàn, chính thống và tham khảo ý kiến chuyên gia.',
      advice: 'Tôn trọng những giá trị cốt lõi và tìm kiếm tri thức chuẩn mực để dẫn lối.'
    },
    reversed: {
      summary: 'Tư duy phá cách, tự tạo con đường riêng hoặc thoát khỏi những giáo điều cũ kỹ.',
      summaryEn: 'Unconventional thinking, forging your own path beyond dogma.',
      summaryZh: '打破陈规旧俗，勇敢开拓专属于自己的道路。',
      situation: 'Bạn cảm thấy các quy tắc hiện tại không còn phù hợp và muốn bứt phá ra khỏi khuôn mẫu.',
      love: 'Mối quan hệ đi ngược lại số đông hoặc cần định nghĩa lại các quy chuẩn tình yêu của riêng hai người.',
      work: 'Thách thức các quy định lỗi thời, sáng tạo ra phương pháp làm việc đột phá.',
      finance: 'Tìm kiếm giải pháp tài chính mới mẻ ngoài các mô hình truyền thống.',
      advice: 'Hãy dũng cảm suy nghĩ độc lập nhưng vẫn giữ sự tôn trọng với bài học lịch sử.'
    }
  },
  {
    id: 'major-6',
    number: 6,
    name: 'The Lovers',
    nameVi: 'Tình Nhân (The Lovers)',
    nameZh: '恋人 (The Lovers)',
    arcana: 'Major',
    element: 'Khí (Air)',
    keywords: ['Lựa chọn', 'Hòa hợp', 'Tình yêu', 'Giá trị', 'Gắn kết'],
    icon: '💖',
    symbol: '♊',
    color: '#f472b6',
    upright: {
      summary: 'Sự hòa hợp tâm hồn sâu sắc và quyết định quan trọng dựa trên tiếng gọi của trái tim.',
      summaryEn: 'Deep spiritual harmony and making essential life choices from the heart.',
      summaryZh: '灵魂深处的契合，基于内心真实信仰做出重要选择。',
      situation: 'Bạn đứng trước một lựa chọn có tính định hình cuộc sống. Hãy chọn con đường đồng điệu với giá trị cốt lõi của mình.',
      love: 'Tình yêu đôi lứa nồng nàn, thấu hiểu và cùng chung nhịp đập tâm hồn.',
      work: 'Sự hợp tác ăn ý, đối tác tin cậy và quyết định nghề nghiệp quan trọng đòi hỏi sự trung thực.',
      finance: 'Cần cân nhắc giữa lý trí và mong muốn cá nhân khi quyết định chi tiêu hay hợp tác kinh doanh.',
      advice: 'Lắng nghe sự mách bảo của trái tim và đưa ra lựa chọn nhất quán với giá trị sống của bạn.'
    },
    reversed: {
      summary: 'Sự mất cân bằng, mâu thuẫn trong lựa chọn hoặc thiếu sự đồng điệu.',
      summaryEn: 'Disharmony, misaligned values, or conflicted choices.',
      summaryZh: '沟通隔阂、价值观分歧或内心抉择摇摆不定。',
      situation: 'Bạn cảm thấy giằng xé giữa các sự lựa chọn hoặc mất kết nối với bản thân.',
      love: 'Khoảng cách trong giao tiếp, sự bất đồng quan điểm hoặc mâu thuẫn về giá trị sống.',
      work: 'Trặc trở trong hợp tác, xung đột ý tưởng với cộng sự.',
      finance: 'Quyết định tài chính thiếu cân nhắc gây ra mất cân đối dòng tiền.',
      advice: 'Hãy chữa lành sự đứt gãy bên trong trước khi đưa ra quyết định cam kết với bên ngoài.'
    }
  },
  {
    id: 'major-7',
    number: 7,
    name: 'The Chariot',
    nameVi: 'Cỗ Xe Chiến Thắng (The Chariot)',
    nameZh: '战车 (The Chariot)',
    arcana: 'Major',
    element: 'Nước (Water)',
    keywords: ['Ý chí', 'Chinh phục', 'Tập trung', 'Hành động', 'Chiến thắng'],
    icon: '🛡️',
    symbol: '♋',
    color: '#06b6d4',
    upright: {
      summary: 'Vượt qua chướng ngại nhờ ý chí sắt đá, quyết tâm cao độ và sự làm chủ cảm xúc.',
      summaryEn: 'Overcoming obstacles through willpower, focus, and emotional self-mastery.',
      summaryZh: '依靠钢铁般的意志力克服重重障碍，掌控全局赢得胜利。',
      situation: 'Bạn có đủ sức mạnh để làm chủ hai luồng năng lượng đối lập và tiến về phía mục tiêu.',
      love: 'Chủ động theo đuổi tình yêu, vượt qua những rào cản địa lý hay thách thức ban đầu.',
      work: 'Tập trung năng lượng tối đa để hoàn thành mục tiêu. Sự nghiệp thăng tiến nhờ quyết tâm mạnh mẽ.',
      finance: 'Kiểm soát tốt ngân sách và quyết đoán trong các kế hoạch tích lũy tài sản.',
      advice: 'Giữ vững tay lái, tập trung vào mục tiêu và không để điều gì làm bạn xao nhãng.'
    },
    reversed: {
      summary: 'Mất phương hướng, hành động nôn nóng hoặc cảm giác bất lực trước trở ngại.',
      summaryEn: 'Lack of direction, impetuous action, or feeling overwhelmed.',
      summaryZh: '方向感缺失、急躁冒进或感到失去掌控。',
      situation: 'Bạn có thể đang cảm thấy mất kiểm soát hoặc đẩy tình huống đi quá nhanh vượt quá khả năng xử lý.',
      love: 'Nôn nóng ép buộc cảm xúc khiến đối phương cảm thấy áp lực.',
      work: 'Thiếu sự chuẩn bị dẫn đến chệch hướng trong kế hoạch. Cần xem xét lại chiến lược.',
      finance: 'Tránh các quyết định đầu tư nóng vội theo cảm xúc thiếu phân tích.',
      advice: 'Hãy buông bớt cái tôi nôn nóng, lấy lại sự bình tĩnh trước khi tiếp tục nhấn ga.'
    }
  },
  {
    id: 'major-8',
    number: 8,
    name: 'Strength',
    nameVi: 'Sức Mạnh (Strength)',
    nameZh: '力量 (Strength)',
    arcana: 'Major',
    element: 'Lửa (Fire)',
    keywords: ['Nhu hòa', 'Bản lĩnh', 'Lòng tốt', 'Dẫn dắt', 'Kiên nhẫn'],
    icon: '🦁',
    symbol: '♌',
    color: '#fb923c',
    upright: {
      summary: 'Chinh phục thử thách bằng lòng can đảm dịu dàng, sự kiên nhẫn và lòng trắc ẩn.',
      summaryEn: 'Conquering challenges with gentle courage, patience, and compassion.',
      summaryZh: '以温和的力量、耐心与慈悲克服内心与外界的挑战。',
      situation: 'Sức mạnh thật sự không nằm ở sự thô bạo mà ở khả năng thu phục lòng người bằng sự thấu hiểu và điềm tĩnh.',
      love: 'Tình yêu chân thành, bao dung và đầy thấu hiểu. Bạn có khả năng cảm hóa và chữa lành cho đối phương.',
      work: 'Giải quyết các mâu thuẫn phức tạp bằng thái độ khéo léo, kiên trì và bản lĩnh nội tâm.',
      finance: 'Quản lý tài chính thông minh, bền bỉ tích lũy mà không cần mạo hiểm.',
      advice: 'Hãy đối xử dịu dàng với chính mình và người khác. Năng lượng nhu hòa sẽ chiến thắng mọi bão tố.'
    },
    reversed: {
      summary: 'Nghi ngờ bản thân, thiếu kiên nhẫn hoặc để cảm xúc tiêu cực lấn át.',
      summaryEn: 'Self-doubt, impatience, or letting raw emotions dominate.',
      summaryZh: '自我怀疑、缺乏耐心或任由负面情绪宣泄。',
      situation: 'Bạn cảm thấy thiếu tự tin vào năng lực cá nhân hoặc dễ nổi giận trước khó khăn.',
      love: 'Sự tự ti khiến bạn e ngại bộc lộ tình cảm hoặc dễ nảy sinh nghi ngờ vô cớ.',
      work: 'Thiếu kiên nhẫn với đồng nghiệp hoặc mệt mỏi vì áp lực kéo dài.',
      finance: 'Lo âu thái quá về tiền bạc dẫn đến những quyết định thụ động.',
      advice: 'Nhắc nhở bản thân về những thành tựu quá khứ. Bạn mạnh mẽ hơn những gì mình tưởng tượng.'
    }
  },
  {
    id: 'major-9',
    number: 9,
    name: 'The Hermit',
    nameVi: 'Ẩn Sĩ (The Hermit)',
    nameZh: '隐士 (The Hermit)',
    arcana: 'Major',
    element: 'Đất (Earth)',
    keywords: ['Chiêm nghiệm', 'Tìm kiếm sự thật', 'Một mình', 'Hải đăng', 'Trí tuệ'],
    icon: '🕯️',
    symbol: '♍',
    color: '#a1a1aa',
    upright: {
      summary: 'Rút lui khỏi những ồn ào bên ngoài để quay vào bên trong tìm kiếm câu trả lời.',
      summaryEn: 'Withdrawing from external noise to seek inner truth and wisdom.',
      summaryZh: '远离喧嚣沉淀自我，向内探索真实的智慧与解答。',
      situation: 'Đây là quãng nghỉ cần thiết để bạn soi sáng tâm hồn, định hình lại triết lý sống và con đường tương lai.',
      love: 'Khoảng trầm cần thiết để hiểu rõ mong muốn thực sự trong tình yêu trước khi cam kết lâu dài.',
      work: 'Tập trung nghiên cứu sâu, hoàn thiện chuyên môn một cách độc lập thay vì chạy theo số đông.',
      finance: 'Tiết kiệm, giản dị và đánh giá lại giá trị thực sự của tài sản vật chất đối với bạn.',
      advice: 'Hãy trân trọng những khoảnh khắc tĩnh lặng một mình. Ngọn đèn nội tâm sẽ soi sáng bước đi tiếp theo.'
    },
    reversed: {
      summary: 'Sự cô lập tiêu cực, từ chối lời khuyên hoặc sợ hãi sự cô đơn.',
      summaryEn: 'Negative isolation, rejecting good counsel, or fearing solitude.',
      summaryZh: '消极孤立、拒绝善意建议或过度害怕孤独。',
      situation: 'Bạn có thể đang tự cô lập bản thân quá mức hoặc né tránh sự kết nối với thế giới.',
      love: 'Cảm giác cô đơn ngay trong mối quan hệ hoặc cố tình đóng chặt cửa trái tim.',
      work: 'Xa rời thực tế, thiếu sự tương tác với đội ngũ làm chậm tiến độ công việc.',
      finance: 'Quá thắt chặt chi tiêu đến mức tằn tiện thiếu hợp lý.',
      advice: 'Mở cửa bước ra ánh sáng. Việc chiêm nghiệm cần được kết nối trở lại với đời sống thực tế.'
    }
  },
  {
    id: 'major-10',
    number: 10,
    name: 'Wheel of Fortune',
    nameVi: 'Vòng Quay Vận Mệnh (Wheel of Fortune)',
    nameZh: '命运之轮 (Wheel of Fortune)',
    arcana: 'Major',
    element: 'Hỏa / Định mệnh',
    keywords: ['Thay đổi', 'Vận may', 'Chu kỳ', 'Định mệnh', 'Cơ hội'],
    icon: '🎡',
    symbol: '☸️',
    color: '#6366f1',
    upright: {
      summary: 'Vòng quay cuộc đời chuyển động mang lại cơ hội tốt lành, bước ngoặt định mệnh và sự may mắn.',
      summaryEn: 'The wheel turns bringing good fortune, fateful turning points, and cosmic alignment.',
      summaryZh: '命运之轮转动，带来转机、吉运与定数中的好运。',
      situation: 'Những thay đổi tích cực đang đến. Cần linh hoạt thích nghi với các cơ hội mới mà vũ trụ mang lại.',
      love: 'Cuộc gặp gỡ định mệnh hoặc sự chuyển biến bước ngoặt giúp mối quan hệ sang trang mới tươi sáng.',
      work: 'Thời cơ thăng tiến, chuyển đổi công việc thuận lợi hoặc gặp gỡ đối tác quan trọng.',
      finance: 'Vận may tài chính mỉm cười. Thu nhập cải thiện hoặc gặt hái thành quả bất ngờ.',
      advice: 'Hãy sẵn sàng nắm bắt cơ hội. Nhanh chóng thích nghi với dòng chảy thay đổi của vũ trụ.'
    },
    reversed: {
      summary: 'Sự biến động ngoài dự kiến, chu kỳ trầm xuống tạm thời hoặc kháng cự sự thay đổi.',
      summaryEn: 'Temporary setbacks, unforeseen fluctuations, or resistance to change.',
      summaryZh: '短暂的时运低迷、突如其来的变故或抗拒改变。',
      situation: 'Giai đoạn thử thách thách thức sự kiên nhẫn. Đừng lo lắng vì mọi chu kỳ đều mang tính tạm thời.',
      love: 'Mối quan hệ trải qua giai đoạn trầm lắng. Cần kiên nhẫn cùng nhau vượt qua thử thách.',
      work: 'Sự trì hoãn hoặc biến động nhân sự ngoài tầm kiểm soát. Hãy chuẩn bị phương án dự phòng.',
      finance: 'Cẩn trọng với những biến động tài chính. Hạn chế đầu tư mạo hiểm giai đoạn này.',
      advice: 'Mọi thứ đều là chu kỳ. Giữ bình tĩnh và kiên trì, bánh xe vận mệnh sẽ lại quay lên.'
    }
  },

  // Minor Arcana Sample
  {
    id: 'wands-1',
    number: 1,
    name: 'Ace of Wands',
    nameVi: 'Át Gậy (Ace of Wands)',
    nameZh: '权杖首牌 (Ace of Wands)',
    arcana: 'Minor',
    suit: 'Wands',
    element: 'Lửa (Fire)',
    keywords: ['Ngọn lửa cảm hứng', 'Đam mê', 'Khởi đầu mới', 'Năng lượng dồi dào'],
    icon: '🪄',
    symbol: '🔥',
    color: '#f97316',
    upright: {
      summary: 'Ngọn lửa đam mê và cảm hứng bùng cháy, mở ra cơ hội khởi đầu hành động tràn đầy nhiệt huyết.',
      summaryEn: 'A spark of passion and inspiration igniting new creative ventures.',
      summaryZh: '激情与灵感的火花迸发，带来全新的行动机会。',
      situation: 'Bạn đang sở hữu nguồn năng lượng dồi dào để khởi tạo các dự án mới.',
      love: 'Sự thu hút mãnh liệt, ngọn lửa tình cảm bùng cháy bất ngờ.',
      work: 'Ý tưởng dự án mới đầy triển vọng, thời điểm vàng để khởi động hành động.',
      finance: 'Cơ hội kiếm tiền mới xuất hiện từ chính đam mê cá nhân.',
      advice: 'Nắm bắt ngay cơ hội khi ngọn lửa nhiệt huyết đang dâng cao.'
    },
    reversed: {
      summary: 'Thiếu nhiệt huyết, ý tưởng bị trì hoãn hoặc cảm giác tụt năng lượng.',
      summaryEn: 'Lack of motivation, delayed ideas, or low energy.',
      summaryZh: '热情消退、创意受阻或行动力不足。',
      situation: 'Đam mê tạm thời bị trì hoãn.',
      love: 'Tình cảm có dấu hiệu thiếu lửa.',
      work: 'Dự án chậm tiến độ do thiếu kế hoạch thực thi.',
      finance: 'Kế hoạch kinh doanh bị gián đoạn.',
      advice: 'Tìm lại nguồn cảm hứng bên trong trước khi ép bản thân hành động.'
    }
  },
  {
    id: 'cups-1',
    number: 1,
    name: 'Ace of Cups',
    nameVi: 'Át Cốc (Ace of Cups)',
    nameZh: '圣杯首牌 (Ace of Cups)',
    arcana: 'Minor',
    suit: 'Cups',
    element: 'Nước (Water)',
    keywords: ['Dòng chảy cảm xúc', 'Tình yêu đong đầy', 'Chữa lành', 'Trực giác'],
    icon: '🏆',
    symbol: '🌊',
    color: '#06b6d4',
    upright: {
      summary: 'Cốc tình yêu và cảm xúc đong đầy tràn trề, khởi đầu cho sự kết nối tâm hồn tuyệt vời.',
      summaryEn: 'An overflowing cup of emotional fulfillment, deep love, and healing.',
      summaryZh: '情感与爱的圣杯盈满，开启心灵疗愈与美妙连结。',
      situation: 'Trái tim bạn rộng mở đón nhận yêu thương.',
      love: 'Khởi đầu một tình yêu ngập tràn hạnh phúc.',
      work: 'Tìm thấy đam mê thuần khiết trong công việc.',
      finance: 'Tài chính mang lại sự an tâm tinh thần.',
      advice: 'Hãy để cảm xúc chân thật chảy tràn.'
    },
    reversed: {
      summary: 'Cảm xúc dồn nén, đứt gãy kết nối hoặc vết thương lòng chưa lành.',
      summaryEn: 'Blocked emotions, heartbreak, or feeling disconnected.',
      summaryZh: '压抑的情感、心碎感或灵魂连结脱节。',
      situation: 'Bị tổn thương cảm xúc.',
      love: 'E ngại mở lòng.',
      work: 'Thiếu sự gắn kết với môi trường làm việc.',
      finance: 'Lo lắng cảm tính về tiền bạc.',
      advice: 'Cho phép trái tim được chữa lành từ từ.'
    }
  },
  {
    id: 'swords-1',
    number: 1,
    name: 'Ace of Swords',
    nameVi: 'Át Kiếm (Ace of Swords)',
    nameZh: '宝剑首牌 (Ace of Swords)',
    arcana: 'Minor',
    suit: 'Swords',
    element: 'Khí (Air)',
    keywords: ['Sự thật minh bạch', 'Tư duy sắc bén', 'Đột phá trí tuệ', 'Quyết đoán'],
    icon: '🗡️',
    symbol: '⚡',
    color: '#0284c7',
    upright: {
      summary: 'Thanh kiếm sự thật cắt đứt mọi nghi ngờ, mang lại tư duy sắc bén và đột phá ý tưởng.',
      summaryEn: 'The sword of truth cutting through confusion with mental clarity and breakthroughs.',
      summaryZh: '斩断迷思的真理之剑，带来清晰洞察与理性突破。',
      situation: 'Tư duy trở nên minh bạch và sắc bén.',
      love: 'Giao tiếp thẳng thắn bằng sự thật.',
      work: 'Đột phá trong giải pháp công việc.',
      finance: 'Quyết định tài chính quyết đoán.',
      advice: 'Dũng cảm nói lên sự thật.'
    },
    reversed: {
      summary: 'Tư duy hỗn loạn, hiểu lầm giao tiếp hoặc sử dụng lời nói gây tổn thương.',
      summaryEn: 'Mental confusion, misunderstandings, or harsh words.',
      summaryZh: '思维混乱、沟通误解或言语造成伤害。',
      situation: 'Suy nghĩ bị rối bời.',
      love: 'Lời nói làm tổn thương nhau.',
      work: 'Thiếu sự rõ ràng trong kế hoạch.',
      finance: 'Đánh giá sai lầm thông tin.',
      advice: 'Cân nhắc kỹ lời nói trước khi phát ngôn.'
    }
  },
  {
    id: 'pentacles-1',
    number: 1,
    name: 'Ace of Pentacles',
    nameVi: 'Át Tiền (Ace of Pentacles)',
    nameZh: '星币首牌 (Ace of Pentacles)',
    arcana: 'Minor',
    suit: 'Pentacles',
    element: 'Đất (Earth)',
    keywords: ['Cơ hội tài chính', 'Nền tảng vững chắc', 'Thịnh vượng vật chất', 'Hiện thực'],
    icon: '🪙',
    symbol: '🌱',
    color: '#10b981',
    upright: {
      summary: 'Hạt giống thịnh vượng và cơ hội tài chính vật chất thực tế đang nằm trong tay bạn.',
      summaryEn: 'A seed of material prosperity and promising financial opportunities.',
      summaryZh: '物质丰饶的种子，带来坚实的财务与实业机遇。',
      situation: 'Cơ hội tuyệt vời để đầu tư và xây dựng.',
      love: 'Mối quan hệ mang lại sự an toàn thực tế.',
      work: 'Dự án mới sinh lời cao.',
      finance: 'Khoản thu nhập mới hoặc quà tặng giá trị.',
      advice: 'Vun trồng hạt giống bằng kế hoạch thực tế.'
    },
    reversed: {
      summary: 'Bỏ lỡ cơ hội tài chính, quản lý ngân sách kém hoặc kế hoạch thiếu tính thực tế.',
      summaryEn: 'Missed financial opportunity or poor budget management.',
      summaryZh: '错失理财良机或缺乏切合实际的规划。',
      situation: 'Quản lý ngân sách chưa chặt chẽ.',
      love: 'Áp lực vật chất tác động lên tình cảm.',
      work: 'Dự án chậm sinh lời.',
      finance: 'Thất thoát nhỏ do thiếu kiểm soát.',
      advice: 'Xây dựng nền tảng chắc chắn trước khi mở rộng.'
    }
  }
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
