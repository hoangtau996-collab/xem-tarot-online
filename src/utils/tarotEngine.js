// Bộ tổng hợp lời giải cho một phiên trải bài (đa ngôn ngữ vi / en / zh).
//
// Nguyên tắc viết lời giải ở file này:
//   - Nói bằng tiếng người bình thường. Không "dòng chảy năng lượng", không
//     "điểm kết tụ". Người xem đang có chuyện trong lòng, họ cần hiểu ngay.
//   - Mọi câu chữ phải bám vào lá bài thật sự rút được, không dùng đoạn văn
//     mẫu chung chung dán cho mọi phiên.
//   - Luôn nói rõ lá nào đứng ở vị trí nào của kiểu trải bài, vì đó là thứ
//     người xem hay hỏi nhất: "lá này là quá khứ hay tương lai?".
//
// Thông điệp khẳng định từ Vũ Trụ (affirmation) không nằm trong bản giải bài:
// nó là một trải nghiệm riêng ở quả cầu đầu trang (components/CosmicOrb).

// --- Vị trí các lá trong từng kiểu trải bài ---------------------------------

const POSITION_LABELS = {
  single: {
    vi: ['Thông điệp dành cho bạn'],
    en: ['Your message'],
    zh: ['给你的讯息']
  },
  three_time: {
    vi: ['Quá khứ', 'Hiện tại', 'Tương lai'],
    en: ['Past', 'Present', 'Future'],
    zh: ['过去', '现在', '未来']
  },
  three_advice: {
    vi: ['Hoàn cảnh', 'Thử thách', 'Lời khuyên'],
    en: ['Situation', 'Challenge', 'Advice'],
    zh: ['现状', '挑战', '建议']
  },
  five_aspects: {
    vi: ['Hoàn cảnh', 'Tình cảm', 'Công việc / Học tập', 'Tài chính', 'Lời khuyên'],
    en: ['Situation', 'Love', 'Career / Study', 'Finance', 'Advice'],
    zh: ['现状', '感情', '事业 / 学业', '财务', '建议']
  }
};

// Với vài kiểu trải bài, mỗi vị trí được rút riêng cho một khía cạnh. Lá đó là
// "lá chủ đạo" của khía cạnh, các lá khác chỉ bổ sung sắc thái. Trước đây cả 5
// lá hiện ngang nhau trong mọi tab nên người xem không biết nên đọc lá nào.
const PRIMARY_ASPECT_BY_POSITION = {
  five_aspects: ['situation', 'love', 'work', 'finance', 'advice'],
  three_advice: ['situation', null, 'advice']
};

const getPositionLabels = (spreadType, lang, count) => {
  const table = POSITION_LABELS[spreadType];
  const labels = table ? (table[lang] || table.vi) : null;
  return Array.from({ length: count }, (_, i) => (labels && labels[i]) || '');
};

// --- Nguyên tố -------------------------------------------------------------

const ELEMENT_NAMES = {
  vi: {
    Fire: 'Lửa (Khát vọng & Đột phá)',
    Water: 'Nước (Cảm xúc & Chữa lành)',
    Air: 'Khí (Tri thức & Sự thật)',
    Earth: 'Đất (Vật chất & Bền vững)'
  },
  en: {
    Fire: 'Fire (Passion & Breakthrough)',
    Water: 'Water (Emotion & Healing)',
    Air: 'Air (Truth & Wisdom)',
    Earth: 'Earth (Stability & Prosperity)'
  },
  zh: {
    Fire: '火元素 (激情与突破)',
    Water: '水元素 (情感与疗愈)',
    Air: '风元素 (真理与智慧)',
    Earth: '土元素 (基石与丰收)'
  }
};

// Nguyên tố nói bằng lời thường: rốt cuộc chuyện này là chuyện của cái gì.
const ELEMENT_PLAIN = {
  vi: {
    Fire: 'chuyện của hành động và ý chí — bạn muốn gì, và có dám bắt tay làm hay không',
    Water: 'chuyện của tình cảm — bạn đang thương ai, giận ai, và đang né cảm xúc nào',
    Air: 'chuyện của suy nghĩ và lời nói — điều gì cần được nói thẳng, điều gì bạn đang nghĩ quá nhiều',
    Earth: 'chuyện của đời sống thực tế — sức khoẻ, công việc, tiền bạc, những thứ sờ được'
  },
  en: {
    Fire: 'about action and willpower — what you want, and whether you dare to start',
    Water: 'about feelings — who you love, who you resent, which emotion you keep avoiding',
    Air: 'about thoughts and words — what needs saying out loud, what you keep overthinking',
    Earth: 'about practical life — health, work, money, the things you can touch'
  },
  zh: {
    Fire: '关于行动与意志——你想要什么，以及敢不敢开始',
    Water: '关于感情——你在乎谁、埋怨谁，又在回避哪种情绪',
    Air: '关于想法与言语——什么需要说清楚，什么是你想太多了',
    Earth: '关于实际生活——健康、工作、金钱这些摸得着的事'
  }
};

// --- Câu chữ phụ trợ --------------------------------------------------------

const T = {
  vi: { upright: 'xuôi', reversed: 'ngược', uprightTag: 'Bài xuôi ✨', reversedTag: 'Bài ngược 🔄' },
  en: { upright: 'upright', reversed: 'reversed', uprightTag: 'Upright ✨', reversedTag: 'Reversed 🔄' },
  zh: { upright: '正位', reversed: '逆位', uprightTag: '正位 ✨', reversedTag: '逆位 🔄' }
};

const pickLang = (lang) => (lang === 'en' || lang === 'zh' ? lang : 'vi');

const cardNameByLang = (card, lang) =>
  lang === 'en' ? card.name : lang === 'zh' ? (card.nameZh || card.name) : card.nameVi;

const summaryByLang = (data, lang) =>
  lang === 'en'
    ? (data.summaryEn || data.summary)
    : lang === 'zh'
      ? (data.summaryZh || data.summary)
      : data.summary;

// --- Giải thích các con số thống kê ----------------------------------------
//
// Người xem thấy "3 lá ngược" là lo. Phải nói rõ bài ngược không phải điềm xấu,
// nếu không mọi lời khuyên phía sau đều bị đọc qua lăng kính sợ hãi.

const explainReversed = (reversedCount, total, lang) => {
  if (lang === 'en') {
    if (reversedCount === 0) return 'No reversed cards at all. Things are moving in the open — nothing is stuck or hidden right now.';
    if (reversedCount === total) return `All ${total} cards came up reversed. That is not bad luck; it means the work is inward for now. Slow down and sort out how you feel before you act.`;
    return `${reversedCount} of ${total} cards came up reversed. A reversed card is not bad luck — it usually means that energy is delayed, turned inward, or not being used fully yet.`;
  }
  if (lang === 'zh') {
    if (reversedCount === 0) return '本次没有逆位牌。事情走在明处，眼下没有卡住或被隐瞒的部分。';
    if (reversedCount === total) return `${total} 张牌全是逆位。这不是坏运气，而是提醒你此刻的功课在内部：先把心里的事理顺，再谈行动。`;
    return `${total} 张牌中有 ${reversedCount} 张逆位。逆位不等于倒霉，它多半表示那股力量被拖慢了、转向内在，或你还没把它用出来。`;
  }
  if (reversedCount === 0) return 'Không có lá ngược nào. Chuyện đang diễn ra khá rõ ràng, không có gì bị giấu hay bị kẹt lại.';
  if (reversedCount === total) return `Cả ${total} lá đều ngược. Đây không phải điềm xấu. Nó nói rằng việc cần làm lúc này nằm ở bên trong bạn: hãy chậm lại, gỡ cho xong chuyện trong lòng rồi hãy tính chuyện bên ngoài.`;
  return `Có ${reversedCount}/${total} lá ngược. Bài ngược không có nghĩa là xui. Thường nó chỉ nói rằng phần đó đang bị chậm lại, đang hướng vào bên trong, hoặc bạn chưa dùng hết mặt tốt của nó.`;
};

const explainMajor = (majorCount, total, lang) => {
  const heavy = majorCount > 0 && majorCount >= Math.ceil(total / 2);
  if (lang === 'en') {
    if (majorCount === 0) return 'Every card here is a Minor Arcana. This is everyday-life territory — solvable with small, ordinary steps rather than a life overhaul.';
    if (heavy) return `${majorCount} Major Arcana cards showed up. These mark turning points, not small daily matters. Whatever you asked about carries more weight than it may look.`;
    return `${majorCount} Major Arcana card appeared among ${total}. One genuinely important thread runs through an otherwise everyday situation.`;
  }
  if (lang === 'zh') {
    if (majorCount === 0) return '全部是小阿尔克那牌。这属于日常范畴，用一些具体的小步骤就能推动，不必大动干戈。';
    if (heavy) return `出现了 ${majorCount} 张大阿尔克那牌。它们代表人生的转折点，而非日常琐事——你所问的事，分量比表面看起来更重。`;
    return `${total} 张牌中有 ${majorCount} 张大阿尔克那。日常之中，确实藏着一条重要的主线。`;
  }
  if (majorCount === 0) return 'Toàn bộ là lá Ẩn Phụ. Chuyện đang ở mức đời thường, gỡ được bằng những việc nhỏ và cụ thể, không cần đảo lộn gì lớn.';
  if (heavy) return `Có tới ${majorCount} lá Ẩn Chính. Đây là những lá nói về bước ngoặt, không phải chuyện vặt trong ngày. Điều bạn đang hỏi nặng ký hơn vẻ ngoài của nó.`;
  return `Có ${majorCount} lá Ẩn Chính trong ${total} lá. Giữa những chuyện thường ngày vẫn có một mạch thật sự quan trọng.`;
};

const explainElement = (element, lang) => {
  const plain = ELEMENT_PLAIN[lang][element];
  if (lang === 'en') return `Most cards belong to ${ELEMENT_NAMES.en[element]}. In plain terms, this is ${plain}.`;
  if (lang === 'zh') return `多数牌属于${ELEMENT_NAMES.zh[element]}。说白了，这件事${plain}。`;
  return `Phần lớn các lá thuộc nhóm ${ELEMENT_NAMES.vi[element]}. Nói cho dễ hiểu: đây là ${plain}.`;
};

// --- Bản luận giải tổng thể -------------------------------------------------

// Khung kể chuyện phụ thuộc kiểu trải bài. Trải 3 lá là một chuỗi có trước có
// sau nên đọc theo mạch "bắt đầu - đang xảy ra - hướng tới". Trải 5 lá thì
// không: mỗi lá được rút riêng cho một mặt của cuộc sống, gọi lá cuối là "kết
// cục" là nói sai với chính kiểu trải bài người xem đã chọn.
const SPREAD_SHAPES = {
  single: 'single',
  three_time: 'sequence',
  three_advice: 'sequence',
  five_aspects: 'domains'
};

const getSpreadShape = (spreadType, total) => {
  if (total === 1) return 'single';
  return SPREAD_SHAPES[spreadType] || 'sequence';
};

const buildSections = ({ lang, spreadType, drawnCards, positions, question, majorCount, reversedCount, dominantElement }) => {
  const total = drawnCards.length;
  const shape = getSpreadShape(spreadType, total);
  const first = drawnCards[0];
  const last = drawnCards[total - 1];
  const mids = drawnCards.slice(1, total - 1);

  const name = (c) => cardNameByLang(c, lang);
  const face = (c) => (c.isReversed ? T[lang].reversed : T[lang].upright);
  const faceData = (c) => (c.isReversed ? c.reversed : c.upright);
  const sum = (c) => summaryByLang(faceData(c), lang);
  const pos = (i) => positions[i];

  const wholeNote = lang === 'zh'
    ? `${explainReversed(reversedCount, total, lang)}${explainMajor(majorCount, total, lang)}${explainElement(dominantElement, lang)}`
    : `${explainReversed(reversedCount, total, lang)} ${explainMajor(majorCount, total, lang)} ${explainElement(dominantElement, lang)}`;

  const C = {
    en: {
      introQuestionSingle: `You asked: "${question}". The deck answered with a single card, so the answer is short and direct.`,
      introQuestionMany: `You asked: "${question}". The deck answered with ${total} cards. Read them as one message, not ${total} separate fortunes — each card covers a different corner of the same story.`,
      introBlankSingle: 'You drew one card without a fixed question. Treat it as a nudge for today: take what fits your life and leave the rest.',
      introBlankMany: `You drew ${total} cards without a fixed question, so read this as a snapshot of where you are. Take what fits your life and leave the rest.`,
      introTitle: 'What you asked, and what came up',
      singleTitle: `Your card — ${name(first)}`,
      singleBody: `${name(first)} came up ${face(first)}. In one line: ${sum(first)} ${first.isReversed
        ? 'Reversed does not mean bad news. It points at something that is delayed, or that you have not been willing to look at yet.'
        : 'Upright means this is working with you, not against you.'}`,
      singleAdviceTitle: 'What to do about it',
      startTitle: `Where it starts — ${name(first)}${pos(0) ? ` (${pos(0)})` : ''}`,
      startBody: `${name(first)} came up ${face(first)}. In one line: ${sum(first)} ${first.isReversed
        ? 'Because it is reversed, the honest starting point is something you have been putting off looking at.'
        : 'This is solid ground under your feet — it is working in your favour, so build on it.'}`,
      midTitle: 'What is moving in between',
      midBody: `${mids.map((c, i) => `${name(c)}${pos(i + 1) ? ` (${pos(i + 1)})` : ''}, ${face(c)}: ${sum(c)}`).join(' ')} These middle cards are the part you can still influence. They describe what is happening now, not a verdict.`,
      endTitle: `Where it is heading — ${name(last)}${pos(total - 1) ? ` (${pos(total - 1)})` : ''}`,
      endBody: `${name(last)}, ${face(last)}: ${sum(last)} ${last.isReversed
        ? 'Reversed at the end is a caution, not a sentence: if nothing changes, this is the shape things settle into. It is still yours to redirect.'
        : 'Upright at the end is a good sign — keep going the way you are going and this is where it lands.'}`,
      domainTitle: 'One card for each part of your life',
      domainBody: 'A five-card spread is not a timeline. Each card was drawn for one specific area, so you can read the lines below one at a time.',
      oneThingTitle: 'If you only do one thing',
      oneThingBody: `The card sitting in the "${pos(total - 1)}" slot is ${name(last)}, ${face(last)}. Its advice: ${faceData(last).advice}`,
      wholeTitle: 'What the spread says as a whole'
    },
    zh: {
      introQuestionSingle: `你问的是：「${question}」。牌阵只用一张牌回应，所以答案会短而直接。`,
      introQuestionMany: `你问的是：「${question}」。牌阵用 ${total} 张牌回应你。请把它们当成一段完整的话来读，而不是 ${total} 个各自独立的预言——每张牌只讲同一件事的不同侧面。`,
      introBlankSingle: '你没有设定具体问题就抽了一张牌。就把它当成今天的一句提醒：对得上的收下，对不上的放下即可。',
      introBlankMany: `你没有设定具体问题就抽了 ${total} 张牌，那就把这份解读当作当下状态的写照。对得上的收下，对不上的放下即可。`,
      introTitle: '你问的事，与牌给的回应',
      singleTitle: `你的牌 — ${name(first)}`,
      singleBody: `${name(first)} 以${face(first)}出现。一句话说：${sum(first)}${first.isReversed
        ? '逆位不等于坏消息，它指向某件被拖住、或你还不太愿意面对的事。'
        : '正位表示这股力量站在你这边，而不是跟你作对。'}`,
      singleAdviceTitle: '那该怎么做',
      startTitle: `起点 — ${name(first)}${pos(0) ? `（${pos(0)}）` : ''}`,
      startBody: `${name(first)} 以${face(first)}出现。一句话说：${sum(first)}${first.isReversed
        ? '因为是逆位，真正的起点往往是那件你一直不太愿意正视的事。'
        : '这是你脚下踏实的地面，它站在你这边，可以放心往上搭。'}`,
      midTitle: '中间正在发生的变化',
      midBody: `${mids.map((c, i) => `${name(c)}${pos(i + 1) ? `（${pos(i + 1)}）` : ''}，${face(c)}：${sum(c)}`).join('')}中间这几张，是你此刻仍能施力的部分。它们描述正在发生的事，而不是最终判决。`,
      endTitle: `事情的走向 — ${name(last)}${pos(total - 1) ? `（${pos(total - 1)}）` : ''}`,
      endBody: `${name(last)}，${face(last)}：${sum(last)}${last.isReversed
        ? '收尾是逆位，属于提醒而非定论：若什么都不改变，事情大致会落成这个样子——而你仍握着调整的余地。'
        : '结尾正位是好兆头：照现在的方向走下去，就会落在这里。'}`,
      domainTitle: '每张牌各答一个生活面向',
      domainBody: '五张牌不是时间线。每张牌都是为某一个面向而抽的，因此下面几行可以一条一条分开来读。',
      oneThingTitle: '如果只做一件事',
      oneThingBody: `落在「${pos(total - 1)}」位置的是 ${name(last)}，${face(last)}。它的建议是：${faceData(last).advice}`,
      wholeTitle: '整个牌阵合起来看'
    },
    vi: {
      introQuestionSingle: `Bạn hỏi: "${question}". Bộ bài trả lời bằng đúng một lá, nên câu trả lời sẽ gọn và thẳng.`,
      introQuestionMany: `Bạn hỏi: "${question}". Bộ bài trả lời bằng ${total} lá. Hãy đọc chúng như một câu chuyện liền mạch, đừng đọc thành ${total} lời phán riêng lẻ — mỗi lá chỉ soi một góc của cùng một chuyện.`,
      introBlankSingle: 'Bạn rút một lá mà không đặt câu hỏi cụ thể. Hãy xem đây như một lời nhắc cho hôm nay: điều gì thấy đúng thì giữ lấy, điều gì chưa đúng thì cứ để đó.',
      introBlankMany: `Bạn rút ${total} lá mà không đặt câu hỏi cụ thể, nên hãy xem đây là bức ảnh chụp nhanh tình trạng hiện tại của mình. Điều gì thấy đúng thì giữ lấy, điều gì chưa đúng thì cứ để đó.`,
      introTitle: 'Bạn hỏi gì, và bài trả lời ra sao',
      singleTitle: `Lá bài của bạn — ${name(first)}`,
      singleBody: `${name(first)} ra ${face(first)}. Nói gọn một câu: ${sum(first)} ${first.isReversed
        ? 'Bài ngược không có nghĩa là tin xấu. Nó chỉ vào một chuyện đang bị chậm lại, hoặc chuyện bạn chưa muốn nhìn thẳng vào.'
        : 'Bài xuôi nghĩa là chuyện này đang thuận theo bạn, không phải cản bạn.'}`,
      singleAdviceTitle: 'Vậy nên làm gì',
      startTitle: `Chuyện bắt đầu từ đâu — ${name(first)}${pos(0) ? ` (${pos(0)})` : ''}`,
      startBody: `${name(first)} ra ${face(first)}. Nói gọn một câu: ${sum(first)} ${first.isReversed
        ? 'Vì là bài ngược, điểm xuất phát thật sự thường nằm ở chuyện bạn vẫn né, chưa muốn nhìn thẳng vào.'
        : 'Đây là chỗ đứng vững của bạn. Nó đang thuận, nên cứ dựa vào đó mà đi tiếp.'}`,
      midTitle: 'Những gì đang chuyển động ở giữa',
      midBody: `${mids.map((c, i) => `${name(c)}${pos(i + 1) ? ` (${pos(i + 1)})` : ''}, ${face(c)}: ${sum(c)}`).join(' ')} Mấy lá ở giữa là phần bạn còn tác động được. Chúng kể chuyện đang xảy ra, không phải bản án đã tuyên.`,
      endTitle: `Mọi chuyện đang hướng về đâu — ${name(last)}${pos(total - 1) ? ` (${pos(total - 1)})` : ''}`,
      endBody: `${name(last)}, ${face(last)}: ${sum(last)} ${last.isReversed
        ? 'Lá chốt ra ngược là một lời nhắc, không phải lời kết tội: nếu mọi thứ cứ giữ nguyên thì kết quả sẽ đi về phía này. Bạn vẫn còn quyền bẻ lái.'
        : 'Lá chốt ra xuôi là dấu hiệu tốt: cứ giữ hướng đang đi, chuyện sẽ dừng lại ở chỗ dễ chịu này.'}`,
      domainTitle: 'Mỗi lá trả lời một mặt của cuộc sống',
      domainBody: 'Trải 5 lá không đọc theo thứ tự thời gian. Mỗi lá được rút riêng cho một mặt, nên bạn có thể đọc từng dòng dưới đây một cách độc lập.',
      oneThingTitle: 'Nếu chỉ chọn một việc để làm',
      oneThingBody: `Lá nằm ở vị trí "${pos(total - 1)}" là ${name(last)}, ra ${face(last)}. Lời khuyên của nó: ${faceData(last).advice}`,
      wholeTitle: 'Nhìn cả phiên bài thì thấy gì'
    }
  }[lang];

  const sections = [];

  sections.push({
    title: C.introTitle,
    body: question
      ? (total === 1 ? C.introQuestionSingle : C.introQuestionMany)
      : (total === 1 ? C.introBlankSingle : C.introBlankMany)
  });

  if (shape === 'single') {
    sections.push({ title: C.singleTitle, body: C.singleBody });
    sections.push({ title: C.singleAdviceTitle, body: faceData(first).advice });
  } else if (shape === 'domains') {
    sections.push({
      title: C.domainTitle,
      body: C.domainBody,
      items: drawnCards.map((c, i) => ({
        label: pos(i),
        text: `${name(c)} (${face(c)}): ${sum(c)}`
      }))
    });
    sections.push({ title: C.oneThingTitle, body: C.oneThingBody });
  } else {
    sections.push({ title: C.startTitle, body: C.startBody });
    if (mids.length > 0) sections.push({ title: C.midTitle, body: C.midBody });
    sections.push({ title: C.endTitle, body: C.endBody });
  }

  sections.push({ title: C.wholeTitle, body: wholeNote });

  return sections;
};

// --- Câu tóm gọn cho từng khía cạnh ----------------------------------------
//
// Người xem mở một tab và gặp ngay 5 đoạn văn thì sẽ bỏ cuộc. Dòng này trả lời
// giúp họ câu hỏi "rốt cuộc phần này nói gì", trước khi họ đọc chi tiết.

const buildQuickTake = ({ lang, aspectLabel, lead, others, isPrimary }) => {
  const leadName = lead.cardName;
  const leadSummary = lead.summary;
  const where = lead.positionLabel;

  if (lang === 'en') {
    const base = isPrimary
      ? `${leadName} was drawn specifically for ${aspectLabel}, so read it first: ${leadSummary}`
      : where
        ? `Read these in order. It opens with ${leadName} at "${where}": ${leadSummary}`
        : `Start with ${leadName}: ${leadSummary}`;
    if (others === 0) return base;
    return isPrimary
      ? `${base} The other ${others} card${others > 1 ? 's' : ''} add shading — they do not overrule this.`
      : `${base} Then let the remaining ${others} card${others > 1 ? 's' : ''} continue the same thread.`;
  }

  if (lang === 'zh') {
    const base = isPrimary
      ? `${leadName} 正是为「${aspectLabel}」而抽的，请先读它：${leadSummary}`
      : where
        ? `请依序阅读。开头是位于「${where}」的 ${leadName}：${leadSummary}`
        : `先从 ${leadName} 读起：${leadSummary}`;
    if (others === 0) return base;
    return isPrimary
      ? `${base}另外 ${others} 张只是补充色彩，不会推翻这句话。`
      : `${base}接着让其余 ${others} 张把同一条线索讲完。`;
  }

  const base = isPrimary
    ? `${leadName} là lá được rút riêng cho phần ${aspectLabel}, nên hãy đọc lá này trước: ${leadSummary}`
    : where
      ? `Hãy đọc lần lượt theo thứ tự. Mở đầu là ${leadName} ở vị trí "${where}": ${leadSummary}`
      : `Bắt đầu từ ${leadName}: ${leadSummary}`;
  if (others === 0) return base;
  return isPrimary
    ? `${base} ${others} lá còn lại chỉ bổ sung sắc thái, không lật ngược ý chính này.`
    : `${base} Rồi để ${others} lá còn lại kể tiếp cùng một mạch chuyện.`;
};

// --- Việc nên làm / điều nên để ý ------------------------------------------

const ACTION_COPY = {
  vi: {
    doTitle: 'Việc nên làm',
    watchTitle: 'Điều nên để ý',
    doHint: 'Rút từ lời khuyên của các lá ra xuôi — đây là phần đang thuận, bắt tay làm được ngay.',
    watchHint: 'Rút từ các lá ra ngược — không phải điềm xấu, mà là chỗ dễ vấp nếu bỏ qua.',
    empty: 'Phiên này không có lá nào rơi vào nhóm đó.'
  },
  en: {
    doTitle: 'What to do',
    watchTitle: 'What to watch',
    doHint: 'Taken from the upright cards — this is what is already working in your favour.',
    watchHint: 'Taken from the reversed cards — not bad luck, just where you are most likely to trip.',
    empty: 'No cards fell into this group in this reading.'
  },
  zh: {
    doTitle: '可以去做的事',
    watchTitle: '需要留意的事',
    doHint: '取自正位牌——这些是眼下顺势可为的部分。',
    watchHint: '取自逆位牌——不是坏运气，而是容易绊倒的地方。',
    empty: '本次没有牌落在这一组。'
  }
};

const ASPECT_KEYS = ['situation', 'love', 'work', 'finance', 'advice'];

const ASPECT_PLAIN_LABELS = {
  vi: { situation: 'hoàn cảnh', love: 'tình cảm', work: 'công việc / học tập', finance: 'tài chính', advice: 'lời khuyên' },
  en: { situation: 'your situation', love: 'love', work: 'work and study', finance: 'money', advice: 'advice' },
  zh: { situation: '现状', love: '感情', work: '事业学业', finance: '财务', advice: '建议' }
};

// --- Hàm chính --------------------------------------------------------------

export const analyzeReadingSession = (drawnCards = [], spreadType = 'five_aspects', question = '', langInput = 'vi') => {
  if (!drawnCards || drawnCards.length === 0) return null;

  const lang = pickLang(langInput);
  const total = drawnCards.length;

  // 1. Đếm Ẩn Chính / Ẩn Phụ / xuôi / ngược
  const majorCount = drawnCards.filter(c => c.arcana === 'Major').length;
  const minorCount = total - majorCount;
  const reversedCount = drawnCards.filter(c => c.isReversed).length;
  const uprightCount = total - reversedCount;

  // 2. Phân bố nguyên tố
  const elementCounts = { Fire: 0, Water: 0, Air: 0, Earth: 0 };
  drawnCards.forEach(c => {
    const el = c.element || '';
    if (el.includes('Lửa') || el.includes('Fire') || c.suit === 'Wands') elementCounts.Fire++;
    else if (el.includes('Nước') || el.includes('Water') || c.suit === 'Cups') elementCounts.Water++;
    else if (el.includes('Khí') || el.includes('Air') || c.suit === 'Swords') elementCounts.Air++;
    else if (el.includes('Đất') || el.includes('Earth') || c.suit === 'Pentacles') elementCounts.Earth++;
    else elementCounts.Air++;
  });

  let dominantElement = 'Fire';
  let maxCount = -1;
  Object.entries(elementCounts).forEach(([el, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantElement = el;
    }
  });

  const elementMap = ELEMENT_NAMES[lang];
  const positions = getPositionLabels(spreadType, lang, total);
  const primaryMap = PRIMARY_ASPECT_BY_POSITION[spreadType] || [];

  // 3. Gom lời giải theo từng khía cạnh
  const aspects = { situation: [], love: [], work: [], finance: [], advice: [] };

  drawnCards.forEach((card, index) => {
    const data = card.isReversed ? card.reversed : card.upright;
    const orientationTag = card.isReversed ? T[lang].reversedTag : T[lang].uprightTag;

    ASPECT_KEYS.forEach(key => {
      aspects[key].push({
        cardIndex: index + 1,
        cardName: cardNameByLang(card, lang),
        orientation: orientationTag,
        isReversed: !!card.isReversed,
        positionLabel: positions[index],
        isPrimary: primaryMap[index] === key,
        text: data[key],
        summary: summaryByLang(data, lang),
        icon: card.icon,
        color: card.color
      });
    });
  });

  // Lá chủ đạo của khía cạnh phải nằm đầu danh sách, nếu không người xem vẫn
  // đọc từ trên xuống và gặp lá phụ trước.
  ASPECT_KEYS.forEach(key => {
    aspects[key].sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
  });

  // 4. Câu tóm gọn mỗi khía cạnh
  const aspectLabels = ASPECT_PLAIN_LABELS[lang];
  const aspectQuickTakes = {};
  ASPECT_KEYS.forEach(key => {
    const list = aspects[key];
    if (list.length === 0) return;
    const lead = list[0];
    aspectQuickTakes[key] = buildQuickTake({
      lang,
      aspectLabel: aspectLabels[key],
      lead,
      others: list.length - 1,
      isPrimary: lead.isPrimary
    });
  });

  // 5. Việc nên làm / nên để ý, rút thẳng từ lời khuyên của từng lá
  const actionPlan = {
    ...ACTION_COPY[lang],
    doList: drawnCards
      .filter(c => !c.isReversed)
      .map(c => ({ cardName: cardNameByLang(c, lang), icon: c.icon, text: c.upright.advice })),
    watchList: drawnCards
      .filter(c => c.isReversed)
      .map(c => ({ cardName: cardNameByLang(c, lang), icon: c.icon, text: c.reversed.advice }))
  };

  // 6. Bản luận giải tổng thể
  const holisticSections = buildSections({
    lang, spreadType, drawnCards, positions, question, majorCount, reversedCount, dominantElement
  });

  // Bản chữ thuần, dùng cho file PDF / ảnh xuất ra và cho nút chia sẻ.
  const holisticNarrative = holisticSections
    .map(s => {
      const bullets = (s.items || []).map(it => `- ${it.label ? `${it.label}: ` : ''}${it.text}`).join('\n');
      return bullets ? `${s.title}\n${s.body}\n${bullets}` : `${s.title}\n${s.body}`;
    })
    .join('\n\n');

  return {
    drawnCards,
    spreadType,
    question,
    positions,
    date: new Date().toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'zh' ? 'zh-CN' : 'vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    stats: {
      total,
      majorCount,
      minorCount,
      reversedCount,
      uprightCount,
      dominantElement: elementMap[dominantElement] || dominantElement,
      reversedNote: explainReversed(reversedCount, total, lang),
      majorNote: explainMajor(majorCount, total, lang),
      elementNote: explainElement(dominantElement, lang)
    },
    aspects,
    aspectQuickTakes,
    actionPlan,
    holisticSections,
    holisticNarrative
  };
};
