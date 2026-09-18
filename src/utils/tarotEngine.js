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

import { cardText } from '../data/tarot/cardText.js';
import { deckLens } from '../data/deckLens.js';
import { detectQuestionIntent, isBlankQuestion, TOPIC_ASPECT } from './questionIntent.js';

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
  /* Trải một lá thì mọi câu đếm số đều đọc rất ngô nghê ("cả 1 lá đều ngược"),
     nên nhánh này nói thẳng về đúng lá đó thay vì nói theo tỉ lệ. */
  if (total === 1) {
    return reversedCount === 1
      ? 'Lá duy nhất của phiên này ra ngược. Đó không phải điềm xấu — nó chỉ đang nói rằng việc cần làm lúc này nằm ở bên trong bạn, nên hãy chậm lại một nhịp và gỡ cho xong chuyện trong lòng đã.'
      : 'Lá này ra xuôi, nên chuyện của bạn đang khá rõ ràng — không có gì bị giấu đi hay kẹt lại ở đâu.';
  }
  if (reversedCount === 0) return 'Trước hết, không có lá ngược nào cả. Chuyện của bạn đang diễn ra khá rõ ràng, không có gì bị giấu đi hay kẹt lại ở đâu.';
  if (reversedCount === total) return `Cả ${total} lá đều ngược — nhìn qua thì hơi choáng, nhưng bạn đừng vội lo. Nó không phải điềm xấu, nó chỉ đang nói rằng việc cần làm lúc này nằm ở bên trong bạn. Chậm lại một nhịp, gỡ cho xong chuyện trong lòng, rồi hãy tính tới chuyện bên ngoài.`;
  return `Trước hết là ${reversedCount}/${total} lá ngược. Bài ngược không có nghĩa là xui đâu — phần lớn thời gian nó chỉ đang nói rằng chỗ đó bị chậm lại, đang quay vào bên trong, hoặc bạn chưa dùng hết mặt tốt của nó.`;
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
  if (total === 1) {
    return majorCount === 1
      ? 'Thêm nữa, đây là một lá Ẩn Chính — nhóm lá nói về bước ngoặt, chứ không phải chuyện vặt trong ngày. Điều bạn đang hỏi nặng hơn vẻ ngoài của nó.'
      : 'Đây là một lá Ẩn Phụ, nghĩa là chuyện đang ở mức đời thường thôi. Nó gỡ được bằng những việc nhỏ và cụ thể, chưa cần bạn đảo lộn gì lớn cả.';
  }
  if (majorCount === 0) return 'Tiếp nữa, toàn bộ đều là lá Ẩn Phụ — nghĩa là chuyện đang ở mức đời thường thôi. Nó gỡ được bằng những việc nhỏ và cụ thể, chưa cần bạn đảo lộn gì lớn cả.';
  if (heavy) return `Rồi tới chuyện này: có tới ${majorCount} lá Ẩn Chính. Đây là những lá nói về bước ngoặt chứ không phải chuyện vặt trong ngày, nên điều bạn đang hỏi nặng hơn vẻ ngoài của nó nhiều.`;
  return `Tiếp nữa, có ${majorCount} lá Ẩn Chính trong ${total} lá. Giữa những chuyện thường ngày vẫn đang có một mạch thật sự quan trọng chạy qua.`;
};

const explainElement = (element, lang, total) => {
  const plain = ELEMENT_PLAIN[lang][element];
  if (lang === 'en') return `Most cards belong to ${ELEMENT_NAMES.en[element]}. In plain terms, this is ${plain}.`;
  if (lang === 'zh') return `多数牌属于${ELEMENT_NAMES.zh[element]}。说白了，这件事${plain}。`;
  if (total === 1) return `Lá này thuộc nhóm ${ELEMENT_NAMES.vi[element]}. Nói cho dễ hiểu thì rốt cuộc, đây là ${plain}.`;
  return `Và cuối cùng, phần lớn các lá thuộc nhóm ${ELEMENT_NAMES.vi[element]}. Nói cho dễ hiểu thì rốt cuộc, đây là ${plain}.`;
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

// --- Trả lời theo câu hỏi người xem ----------------------------------------
//
// Câu hỏi được dò ra chủ đề (tình cảm, công việc, tiền, sức khoẻ, gia đình...)
// và dạng câu (có-không, khi nào, chọn gì, vì sao, làm sao, người ấy nghĩ gì,
// kết quả ra sao, hay hỏi mở) - xem utils/questionIntent.js. Từ đó: lá nào là
// "lá trả lời" tuỳ kiểu trải bài, đọc đúng đoạn khía cạnh của lá đó, và nói
// một câu kết luận theo đúng dạng câu hỏi.

const ASPECT_POSITION = {
  five_aspects: { situation: 0, love: 1, work: 2, finance: 3, advice: 4 }
};

/* Lá nào đang trả lời câu hỏi. Trải 3 lá thời gian: hiện tại và tương lai.
   Trải 3 lá lời khuyên: hoàn cảnh và lời khuyên. Trải 5 lá: đúng lá được rút
   cho khía cạnh người xem hỏi. */
const answerCardIndexes = (spreadType, total, aspect) => {
  if (total === 1) return [0];
  if (ASPECT_POSITION[spreadType]) return [ASPECT_POSITION[spreadType][aspect] ?? 0];
  if (spreadType === 'three_time') return [1, 2];
  if (spreadType === 'three_advice') return aspect === 'advice' ? [2] : [0, 2];
  return [total - 1];
};

const adviceCardIndex = (spreadType, total) =>
  spreadType === 'five_aspects' ? 4 : spreadType === 'three_advice' ? 2 : total - 1;

/* Hỏi "vì sao" thì tìm gốc: trải thời gian là lá Quá khứ, trải lời khuyên là
   lá Thử thách; còn lại lấy lá trả lời nào đang ngược (chỗ kẹt), không có thì
   lấy chính lá trả lời. */
const rootCardIndex = (spreadType, drawnCards, keyIdx) => {
  if (drawnCards.length > 1 && spreadType === 'three_time') return 0;
  if (drawnCards.length > 1 && spreadType === 'three_advice') return 1;
  const stuck = keyIdx.find(i => drawnCards[i]?.isReversed);
  return stuck ?? keyIdx[0];
};

/* Cùng một câu hỏi và cùng bộ lá thì luôn ra cùng một cách nói - phiên bài
   được lưu và mở lại, chữ không được tự đổi. Khác câu hỏi hoặc khác lá thì
   đổi cách nói, để người hay quay lại không đọc mãi một khuôn câu. */
const seedOf = (question, drawnCards) => {
  const s = `${question}|${drawnCards.map(c => `${c.id}${c.isReversed ? 'r' : ''}`).join(',')}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const TOPIC_LABELS = {
  vi: {
    love: 'tình cảm', work: 'công việc / học tập', finance: 'tiền bạc', health: 'sức khoẻ và tinh thần',
    family: 'gia đình', friends: 'bạn bè và các mối quan hệ xung quanh', self: 'chính bản thân bạn', move: 'chuyển đi, đổi chỗ ở'
  },
  en: {
    love: 'love', work: 'work and study', finance: 'money', health: 'health and wellbeing',
    family: 'family', friends: 'friends and the people around you', self: 'yourself', move: 'moving or travelling'
  },
  zh: {
    love: '感情', work: '事业学业', finance: '财务', health: '身心健康',
    family: '家庭', friends: '朋友与人际', self: '你自己', move: '搬迁与出行'
  }
};

const PACE = {
  vi: {
    Fire: 'khá nhanh — tính bằng ngày, cùng lắm vài tuần',
    Air: 'tương đối nhanh — trong vòng vài tuần',
    Water: 'từ từ — vài tuần tới vài tháng, và thường đi theo cảm xúc hơn là theo lịch',
    Earth: 'chậm mà chắc — tính bằng tháng, có khi lâu hơn'
  },
  en: {
    Fire: 'fast — days, a few weeks at most',
    Air: 'fairly quick — within a few weeks',
    Water: 'gradual — weeks to a few months, following feelings more than a calendar',
    Earth: 'slow and steady — months rather than weeks'
  },
  zh: {
    Fire: '很快——以天计，最多几周',
    Air: '较快——几周之内',
    Water: '慢慢来——几周到几个月，更多跟着情绪走而不是跟着日历走',
    Earth: '慢而稳——以月计，甚至更久'
  }
};

const buildQuestionAnswer = ({ lang, spreadType, drawnCards, positions, question, intent, dominantElement }) => {
  if (!intent || intent.blank) return null;

  const total = drawnCards.length;
  const name = (c) => cardNameByLang(c, lang);
  const face = (c) => (c.isReversed ? T[lang].reversed : T[lang].upright);
  const sum = (c) => summaryByLang(c.isReversed ? c.reversed : c.upright, lang);
  const adviceOf = (c) => cardText(c, c.isReversed ? 'reversed' : 'upright', 'advice', lang);

  // Nhiều chủ đề có thể mượn chung một khía cạnh (sức khoẻ và gia đình cùng
  // đọc "hoàn cảnh"), nên gom theo khía cạnh để không in một lá hai lần.
  const byAspect = new Map();
  (intent.topics.length ? intent.topics : [null]).forEach(topic => {
    const aspect = topic ? TOPIC_ASPECT[topic] : 'situation';
    if (!byAspect.has(aspect)) byAspect.set(aspect, []);
    if (topic) byAspect.get(aspect).push(topic);
  });

  const keyIdx = [...new Set([...byAspect.keys()].flatMap(a => answerCardIndexes(spreadType, total, a)))];

  // Nghiêng về thuận hay kẹt: lá trả lời nặng gấp đôi các lá còn lại.
  let score = 0;
  let weight = 0;
  drawnCards.forEach((c, i) => {
    const w = keyIdx.includes(i) ? 2 : 1;
    score += c.isReversed ? -w : w;
    weight += w;
  });
  const ratio = weight ? score / weight : 0;
  const tone = ratio >= 0.34 ? 'pos' : ratio <= -0.34 ? 'neg' : 'mid';
  const keyRev = keyIdx.map(i => drawnCards[i]).find(c => c?.isReversed);
  const mostlyReversed = drawnCards.filter(c => c.isReversed).length > total / 2;

  const seed = seedOf(question, drawnCards);
  const pick = (v, salt = 0) => (Array.isArray(v) ? v[(seed + salt) % v.length] : v);

  const joiner = lang === 'en' ? ' and ' : lang === 'zh' ? '与' : ' và ';
  const topicText = intent.topics.map(t => TOPIC_LABELS[lang][t]).join(joiner);
  const pace = PACE[lang][dominantElement];
  const elementName = ELEMENT_NAMES[lang][dominantElement];

  const rootI = rootCardIndex(spreadType, drawnCards, keyIdx);
  const root = drawnCards[rootI];
  const rootWhere = positions[rootI];
  const adv = drawnCards[adviceCardIndex(spreadType, total)];
  const outI = spreadType === 'five_aspects' ? keyIdx[0] : total - 1;
  const out = drawnCards[outI];

  const copy = {
    vi: {
      title: 'Trả lời thẳng vào câu hỏi của bạn',
      frame: intent.topics.length
        ? [
          `Câu hỏi của bạn xoay quanh chuyện ${topicText}, nên ở phần này mình không đọc lan man mọi mặt nữa mà chỉ nghe các lá nói gì về đúng chuyện đó.`,
          `Điều bạn đang bận lòng là chuyện ${topicText}. Vậy mình gác các mặt khác sang một bên, chỉ đọc các lá qua đúng góc này.`,
          `Mình hiểu bạn đang hỏi về ${topicText}. Phần này sẽ bám sát chuyện đó thôi, không đi vòng.`
        ]
        : [
          'Câu hỏi của bạn không gói trong riêng một mảng nào, nên mình đọc các lá theo hoàn cảnh chung của bạn lúc này.',
          'Câu hỏi của bạn khá rộng, nên mình đọc các lá như một bức tranh chung về chỗ bạn đang đứng.'
        ],
      yesno: {
        pos: [
          'Nếu cần một chữ thôi thì bài đang nghiêng về phía CÓ. Các lá quan trọng phần lớn ra xuôi, tức là chuyện này đang thuận chiều với bạn — việc của bạn là đừng tự làm mình chùn bước.',
          'Câu trả lời nghiêng rõ về CÓ. Bài đang đứng về phía bạn; điều duy nhất có thể cản lại là chính sự ngần ngại của bạn.'
        ],
        neg: [
          `Nếu cần một chữ thôi thì bài đang nghiêng về phía CHƯA. Không phải "không bao giờ", mà là chưa phải lúc này, hoặc chưa theo đúng cách bạn đang hình dung.${keyRev ? ` Chỗ kẹt nằm ở lá ${name(keyRev)} — gỡ được chỗ đó thì câu trả lời hoàn toàn có thể đổi.` : ''}`,
          `Lúc này bài trả lời là CHƯA. Đừng đọc chữ đó thành cánh cửa đóng hẳn — nó giống một đèn vàng hơn: dừng lại, nhìn kỹ, rồi mới đi.${keyRev ? ` Thứ cần nhìn kỹ là điều lá ${name(keyRev)} đang chỉ ra.` : ''}`
        ],
        mid: [
          `Câu trả lời là CÓ THỂ, nhưng kèm điều kiện. Bài vừa có phần thuận vừa có phần kẹt, nên kết quả phụ thuộc khá nhiều vào cách bạn xử lý ${keyRev ? `chỗ mà lá ${name(keyRev)} đang chỉ ra` : 'những điều các lá dưới đây nhắc tới'}.`,
          `Bài không trả lời gọn một chữ CÓ hay KHÔNG, mà là "CÓ, nếu...". Cái "nếu" ấy nằm ở ${keyRev ? `lá ${name(keyRev)}` : 'các lá bên dưới'} — xử lý được nó thì cán cân nghiêng về phía bạn.`
        ]
      },
      timing: `${pick(['Về chuyện "khi nào": tarot không đọc ra ngày tháng cụ thể, nhưng đọc được nhịp.', 'Tarot không phải cuốn lịch, nó không chỉ ra ngày cụ thể — nhưng nó cho biết chuyện đi nhanh hay chậm.'], 1)} Phần lớn các lá thuộc nhóm ${elementName}, nên nhịp của chuyện này ${pace}.${mostlyReversed
        ? ' Có khá nhiều lá ngược, nên nhiều khả năng mọi thứ sẽ tới chậm hơn bạn mong — chậm không có nghĩa là không tới.'
        : tone === 'pos' ? ' Các lá chính đều ra xuôi, nên không có gì đang chặn đường cả.' : ''}`,
      choice: {
        lead: 'Tarot không chọn hộ bạn giữa các phương án — quyết định vẫn là của bạn. Nhưng nó cho biết bạn đang ở trạng thái nào để chọn.',
        pos: 'Bài đang thuận, nên phương án nào đòi bạn chủ động bước tới thì đang được ủng hộ hơn phương án đứng yên chờ.',
        neg: 'Bài ngược khá nhiều, nên lúc này chưa hợp để quyết vội. Phương án nào cho bạn thêm thời gian và giữ được đường lui thì an toàn hơn.',
        mid: 'Hai phía đều có lý của nó. Đọc lời khuyên ở các lá bên dưới, rồi chọn phương án mà khi nghĩ tới, bạn thấy nhẹ lòng hơn.'
      },
      why: `${pick(['Bạn hỏi "vì sao", nên mình lần về tận gốc. ', 'Muốn hiểu vì sao thì phải lần về gốc. '], 2)}Theo bài, gốc của chuyện này nằm ở lá ${name(root)}${rootWhere ? ` (vị trí "${rootWhere}")` : ''}: ${sum(root)} ${root.isReversed
        ? 'Lá này ra ngược — nghĩa là nguyên nhân nằm ở chỗ đang bị dồn nén hoặc bị né tránh, chứ không phải ở chỗ bạn đang nhìn.'
        : 'Lá này ra xuôi, nên lý do không phải điều gì xấu xa — nó là một hoàn cảnh cần được hiểu cho đúng hơn.'}`,
      howto: `${{
        pos: 'Bài đang thuận, nên việc cần làm không phải là xoay chuyển gì lớn, mà là giữ nhịp và bước tiếp cho đều.',
        neg: 'Bài đang có nhiều chỗ kẹt, nên bước đầu tiên không phải là cố đẩy mạnh hơn, mà là gỡ chỗ kẹt trước đã.',
        mid: 'Có phần đang thuận, có phần đang kẹt — nên việc cần làm là dựa vào phần thuận để gỡ dần phần kẹt.'
      }[tone]} Việc cụ thể nhất bài gợi ý nằm ở lá ${name(adv)}: ${adviceOf(adv)}`,
      feelings: {
        pos: [
          'Về phía người kia: cảm xúc dành cho bạn là thật, và đang ấm. Các lá chính ra xuôi — họ để tâm tới bạn nhiều hơn những gì họ thể hiện ra.',
          'Đọc lòng người kia qua các lá này thì đó là sự quý mến thật. Có thể họ chưa nói ra, nhưng họ không hề dửng dưng với bạn.'
        ],
        neg: [
          `Cảm xúc phía bên kia lúc này đang rối, hoặc đang tự thu mình lại. Không hẳn là hết tình cảm — nhiều khi là họ đang bận đối phó với chính họ.${keyRev ? ` Lá ${name(keyRev)} cho thấy chỗ họ đang vướng.` : ''}`,
          `Lòng người kia lúc này đang khép lại nhiều hơn là mở ra. Đừng vội hiểu đó là họ không cần bạn — có thể họ đang có chuyện riêng chưa gỡ xong.${keyRev ? ` Lá ${name(keyRev)} gợi ý chuyện đó là gì.` : ''}`
        ],
        mid: [
          'Người kia có quan tâm tới bạn, nhưng đang giữ một khoảng cách nhất định — nửa muốn lại gần, nửa còn dè dặt. Một cuộc nói chuyện thẳng thắn sẽ rõ hơn mọi phỏng đoán.',
          'Tình cảm phía bên kia có đó, nhưng còn lưng chừng: họ nghĩ về bạn, chỉ là chưa chắc mình nên làm gì với cảm xúc ấy.'
        ]
      },
      outcome: `Nếu mọi thứ cứ đi tiếp như bây giờ, kết quả nằm ở lá ${name(out)}, ra ${face(out)}. ${out.isReversed
        ? 'Kết cục chưa đẹp như bạn mong, nhưng đó là cảnh báo sớm chứ không phải bản án — đổi cách làm thì kết quả đổi theo.'
        : tone === 'neg'
          ? 'Lá kết ra xuôi dù đường đi còn nhiều trắc trở: tới được, chỉ là không dễ.'
          : 'Đây là một kết cục sáng sủa — cứ đi đúng hướng này là chuyện sẽ thành.'}`,
      open: {
        pos: [
          'Nhìn chung, bài đang thuận cho chuyện này. Các lá bên dưới nói cụ thể nó đang đi theo hướng nào.',
          'Tín hiệu chung là tốt: phần lớn các lá quan trọng ra xuôi. Dưới đây là chi tiết từng lá.'
        ],
        neg: [
          'Nhìn chung, chuyện này đang có vài chỗ kẹt cần gỡ trước rồi mọi thứ mới trôi. Các lá bên dưới chỉ rõ kẹt ở đâu.',
          'Chuyện này hiện chưa suôn sẻ — không phải vì bạn làm sai, mà vì có vài nút thắt chưa được gỡ. Các lá dưới đây chỉ ra từng nút.'
        ],
        mid: [
          'Nhìn chung, chuyện này đang có cả phần thuận lẫn phần kẹt. Các lá bên dưới tách bạch từng phần cho bạn.',
          'Bức tranh đang pha trộn: có chỗ sáng, có chỗ còn tối. Đọc từng lá dưới đây để biết chỗ nào nên dựa vào, chỗ nào cần để ý.'
        ]
      },
      health: 'Một lời nhắc thật lòng: tarot chỉ soi được phần tinh thần và thói quen, không thay được bác sĩ. Có dấu hiệu gì bất thường thì bạn đi khám nhé.'
    },
    en: {
      title: 'A straight answer to your question',
      frame: intent.topics.length
        ? `Your question is about ${topicText}, so here the cards are read for that one thing only.`
        : 'Your question is not tied to one area, so the cards are read for your situation as a whole.',
      yesno: {
        pos: 'If you want it in one word: the cards lean towards YES. Most of the key cards are upright — this is moving with you, so do not talk yourself out of it.',
        neg: `If you want it in one word: the cards lean towards NOT YET. Not "never" — just not now, or not in the way you are picturing it.${keyRev ? ` The sticking point is ${name(keyRev)}; clear that and the answer can change.` : ''}`,
        mid: `The answer is MAYBE, with conditions. The spread is mixed, so the outcome depends on how you handle ${keyRev ? `what ${name(keyRev)} points at` : 'what the cards below bring up'}.`
      },
      timing: `On the "when": tarot does not give dates, but it does show pace. Most cards belong to ${elementName}, so this moves ${pace}.${mostlyReversed
        ? ' Many cards are reversed, so expect it slower than you hope — slow is not the same as never.'
        : tone === 'pos' ? ' The key cards are upright, so nothing is blocking the way.' : ''}`,
      choice: {
        lead: 'Tarot will not pick an option for you — the choice stays yours. What it shows is the state you are choosing from.',
        pos: 'The spread is favourable, so the option that asks you to step forward is better supported than the one where you wait.',
        neg: 'Many cards are reversed, so this is not the moment for a rushed call. The option that buys time and keeps a way back is safer.',
        mid: 'Both sides have a case. Read the advice in the cards below, then pick the option that feels lighter when you imagine it.'
      },
      why: `The root of this sits with ${name(root)}${rootWhere ? ` (in the "${rootWhere}" slot)` : ''}: ${sum(root)} ${root.isReversed
        ? 'It is reversed, so the cause lies in something held down or avoided, not where you have been looking.'
        : 'It is upright, so the reason is not something bad — it is a situation that needs to be understood more clearly.'}`,
      howto: `${{
        pos: 'The cards are favourable, so this is less about turning things around and more about keeping a steady pace.',
        neg: 'There are knots here, so the first step is not to push harder but to untie what is stuck.',
        mid: 'Part of this is working and part is stuck — lean on what works to loosen what does not.'
      }[tone]} The most concrete advice comes from ${name(adv)}: ${adviceOf(adv)}`,
      feelings: {
        pos: 'On their side: the feeling towards you is real, and warm. The key cards are upright — they care more than they show.',
        neg: `Their feelings are tangled or pulled inward right now. That is not the same as not caring — often they are busy dealing with themselves.${keyRev ? ` ${name(keyRev)} shows where they are stuck.` : ''}`,
        mid: 'They do care, but they are keeping some distance — half drawn to you, half hesitant. An honest conversation will tell you more than guessing.'
      },
      outcome: `If things keep going as they are, the outcome is ${name(out)}, ${face(out)}. ${out.isReversed
        ? 'It is not the ending you want yet, but it is an early warning rather than a verdict — change the approach and the outcome changes.'
        : tone === 'neg'
          ? 'The final card is upright even though the road is rough: you get there, just not easily.'
          : 'That is a bright outcome — stay on this course and it comes together.'}`,
      open: {
        pos: 'Overall, the cards are favourable here. The lines below show which way it is heading.',
        neg: 'Overall, there are a few knots to untie before this flows. The lines below show where they are.',
        mid: 'Overall, this is a mix of what is working and what is stuck. The lines below separate the two.'
      },
      health: 'An honest reminder: tarot can speak to your mood and habits, not replace a doctor. If something feels physically wrong, get it checked.'
    },
    zh: {
      title: '直接回答你的问题',
      frame: intent.topics.length
        ? `你问的是${topicText}方面的事，所以这里只看牌对这件事说了什么。`
        : '你的问题不局限于某一个面向，所以这里按你眼下的整体状况来读牌。',
      yesno: {
        pos: '如果只要一个字：牌面倾向于「会」。关键牌多为正位，事情顺着你的方向走，别自己先打退堂鼓。',
        neg: `如果只要一个字：牌面倾向于「还没到时候」。不是「永远不会」，而是不在此刻，或不是以你想象的方式。${keyRev ? `卡住的地方在 ${name(keyRev)}，把它解开，答案就可能改变。` : ''}`,
        mid: `答案是「有可能，但有条件」。牌面顺逆参半，结果很大程度取决于你怎么处理${keyRev ? ` ${name(keyRev)} 指出的问题` : '下面几张牌提到的事'}。`
      },
      timing: `关于「什么时候」：塔罗读不出具体日期，但能读出节奏。多数牌属于${elementName}，所以这件事的节奏是${pace}。${mostlyReversed
        ? '逆位牌较多，可能比你期待的慢——慢不代表不会来。'
        : tone === 'pos' ? '关键牌都是正位，路上没有阻碍。' : ''}`,
      choice: {
        lead: '塔罗不会替你在选项之间做决定，选择权仍在你手上；它能告诉你的是你此刻处在什么状态。',
        pos: '牌面顺利，需要你主动迈步的那个选项，比原地等待更受支持。',
        neg: '逆位较多，现在不适合仓促决定。能给你多一点时间、保留退路的选项更稳妥。',
        mid: '两边都有道理。读完下面各牌的建议，再选那个想起来让你更轻松的选项。'
      },
      why: `这件事的根源在 ${name(root)}${rootWhere ? `（「${rootWhere}」位置）` : ''}：${sum(root)}${root.isReversed
        ? '它是逆位，说明原因藏在被压抑或被回避的地方，而不是你一直盯着看的地方。'
        : '它是正位，所以原因并不是什么坏事，而是一个需要被看清楚的处境。'}`,
      howto: `${{
        pos: '牌面顺利，要做的不是大转弯，而是稳住节奏继续走。',
        neg: '牌面有几处卡住，第一步不是更用力地推，而是先把卡住的地方解开。',
        mid: '有顺的部分也有卡的部分——借顺的部分慢慢松开卡住的部分。'
      }[tone]}最具体的建议来自 ${name(adv)}：${adviceOf(adv)}`,
      feelings: {
        pos: '对方那边：对你的感情是真的，而且是温热的。关键牌都是正位——他们在意你，比表现出来的更多。',
        neg: `对方此刻情绪纠结，或正往内收。这不等于没有感情——很多时候他们只是在忙着应付自己。${keyRev ? `${name(keyRev)} 显示了他们卡住的地方。` : ''}`,
        mid: '对方是在意你的，但保持着一段距离——一半想靠近，一半还在犹豫。坦诚地聊一次，胜过所有猜测。'
      },
      outcome: `如果照现在这样走下去，结果落在 ${name(out)}，${face(out)}。${out.isReversed
        ? '结局还不如你所愿，但这是提早的提醒，而非定论——换个做法，结果就会跟着变。'
        : tone === 'neg'
          ? '尽管过程坎坷，结果牌仍是正位：到得了，只是不容易。'
          : '这是明朗的结局——沿着这个方向走，事情就会成。'}`,
      open: {
        pos: '整体来看，牌面对这件事是顺的。下面几行说明它正往哪个方向走。',
        neg: '整体来看，这件事有几个结要先解开才会顺。下面几行指出卡在哪里。',
        mid: '整体来看，这件事顺与卡并存。下面几行帮你把两者分开。'
      },
      health: '真心提醒：塔罗能照见情绪与习惯，但代替不了医生。身体若有异样，请去检查。'
    }
  }[lang];

  const kind = intent.kind;
  const verdict = kind === 'choice'
    ? `${copy.choice.lead} ${copy.choice[tone]}`
    : ['yesno', 'feelings', 'open'].includes(kind)
      ? pick(copy[kind][tone], 3)
      : copy[kind];

  const extra = intent.topics.includes('health') ? copy.health : '';
  const sep = lang === 'zh' ? '' : ' ';
  const body = [pick(copy.frame), verdict, extra].filter(Boolean).join(sep);

  /* Nhãn mỗi dòng: vị trí lá, kèm tên chủ đề khi đọc nhiều chủ đề một lúc
     hoặc khi chủ đề phải mượn khía cạnh khác ("Hoàn cảnh · sức khoẻ") - để
     người xem không thắc mắc sao hỏi sức khoẻ lại ra dòng "Hoàn cảnh". */
  const multi = byAspect.size > 1;
  const items = [...byAspect.entries()].flatMap(([aspect, topics]) =>
    answerCardIndexes(spreadType, total, aspect).map(i => {
      const c = drawnCards[i];
      const where = positions[i] || name(c);
      const borrowed = topics.some(t => t !== aspect);
      const tag = topics.map(t => TOPIC_LABELS[lang][t]).join(joiner);
      return {
        label: tag && (multi || borrowed) ? `${where} · ${tag}` : where,
        text: `${name(c)} (${face(c)}) — ${cardText(c, c.isReversed ? 'reversed' : 'upright', aspect, lang)}`
      };
    })
  );

  return { title: copy.title, body, items };
};

const buildSections = ({ lang, spreadType, drawnCards, positions, question, intent, majorCount, reversedCount, dominantElement, deckId }) => {
  const total = drawnCards.length;
  const shape = getSpreadShape(spreadType, total);
  const first = drawnCards[0];
  const last = drawnCards[total - 1];
  const mids = drawnCards.slice(1, total - 1);

  const name = (c) => cardNameByLang(c, lang);
  const face = (c) => (c.isReversed ? T[lang].reversed : T[lang].upright);
  const faceData = (c) => (c.isReversed ? c.reversed : c.upright);
  /* Lời khuyên phải đi qua cardText: trường .advice trong dữ liệu chỉ có
     tiếng Việt, đọc thẳng là bản tiếng Anh/Trung lọt một câu tiếng Việt. */
  const adviceOf = (c) => cardText(c, c.isReversed ? 'reversed' : 'upright', 'advice', lang);
  const sum = (c) => summaryByLang(faceData(c), lang);
  const pos = (i) => positions[i];

  /* Bản tiếng Việt mở phần tổng thể bằng một câu dẫn, và ba câu phía sau đã có
     sẵn từ nối ("Trước hết", "Tiếp nữa", "Và cuối cùng") - để đoạn này đọc như
     một người ngồi kể lại, chứ không phải ba dòng thống kê dán cạnh nhau. */
  const wholeLead = lang === 'vi'
    ? (total === 1 ? 'Nhìn lại lá này một lượt nữa trước khi bạn khép trang. ' : 'Giờ thì mình lùi lại một bước, nhìn cả phiên bài một lượt. ')
    : '';

  const wholeNote = lang === 'zh'
    ? `${explainReversed(reversedCount, total, lang)}${explainMajor(majorCount, total, lang)}${explainElement(dominantElement, lang, total)}`
    : `${wholeLead}${explainReversed(reversedCount, total, lang)} ${explainMajor(majorCount, total, lang)} ${explainElement(dominantElement, lang, total)}`;

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
      oneThingBody: `The card sitting in the "${pos(total - 1)}" slot is ${name(last)}, ${face(last)}. Its advice: ${adviceOf(last)}`,
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
      oneThingBody: `落在「${pos(total - 1)}」位置的是 ${name(last)}，${face(last)}。它的建议是：${adviceOf(last)}`,
      wholeTitle: '整个牌阵合起来看'
    },
    vi: {
      introQuestionSingle: `Điều bạn mang tới đây là: "${question}". Bộ bài đáp lại bằng đúng một lá — chỉ một thôi, nên câu trả lời sẽ gọn và thẳng, không có chỗ để vòng vo.`,
      introQuestionMany: `Điều bạn mang tới đây là: "${question}". Bộ bài đáp lại bằng ${total} lá, và mình sẽ đi qua từng lá một cùng bạn. Chỉ xin bạn nhớ giúp một điều: đây là một câu chuyện liền mạch, không phải ${total} lời phán rời nhau — mỗi lá chỉ soi một góc của cùng một chuyện.`,
      introBlankSingle: 'Bạn rút một lá mà chưa đặt câu hỏi nào cụ thể. Vậy thì mình cứ xem đây như một lời nhắc cho riêng hôm nay: điều gì đọc thấy đúng thì bạn giữ lấy, điều gì chưa đúng thì cứ để đó, không sao cả.',
      introBlankMany: `Bạn rút ${total} lá mà chưa đặt câu hỏi nào cụ thể. Vậy mình sẽ đọc chúng như một bức ảnh chụp nhanh chỗ bạn đang đứng lúc này. Điều gì thấy đúng thì bạn giữ lấy, điều gì chưa đúng thì cứ để đó, không sao cả.`,
      introTitle: 'Chuyện bạn mang tới đây',
      singleTitle: `Lá bài của bạn — ${name(first)}`,
      singleBody: `${name(first)} ra ${face(first)}. Nói gọn trong một câu: ${sum(first)} ${first.isReversed
        ? 'Thấy chữ "ngược" thì bạn đừng vội lo — nó không phải tin xấu. Nó chỉ đang chỉ tay vào một chuyện đang bị chậm lại, hoặc một chuyện bạn chưa muốn nhìn thẳng vào.'
        : 'Ra xuôi nghĩa là chuyện này đang đi cùng phía với bạn, chứ không cản bạn.'}`,
      singleAdviceTitle: 'Vậy thì mình nên làm gì',
      startTitle: `Câu chuyện bắt đầu từ đây — ${name(first)}${pos(0) ? ` (${pos(0)})` : ''}`,
      startBody: `Mình bắt đầu từ ${name(first)}, ra ${face(first)}. Nói gọn trong một câu: ${sum(first)} ${first.isReversed
        ? 'Vì là bài ngược, điểm xuất phát thật sự thường không nằm ở chỗ dễ nhìn — nó nằm ở chuyện bạn vẫn né bấy lâu nay.'
        : 'Đây là chỗ đứng vững của bạn. Nó đang thuận, nên cứ dựa vào đó mà đi tiếp.'}`,
      midTitle: 'Rồi mọi thứ chuyển động',
      midBody: `Từ chỗ đó, câu chuyện đi tiếp như thế này. ${mids.map((c, i) => `${name(c)}${pos(i + 1) ? ` (${pos(i + 1)})` : ''}, ${face(c)}: ${sum(c)}`).join(' ')} Mấy lá ở giữa mới là phần bạn còn tác động được. Chúng đang kể một chuyện đang xảy ra, chứ không đọc một bản án đã tuyên.`,
      endTitle: `Và đây là nơi nó đang đi tới — ${name(last)}${pos(total - 1) ? ` (${pos(total - 1)})` : ''}`,
      endBody: `Khép lại là ${name(last)}, ${face(last)}: ${sum(last)} ${last.isReversed
        ? 'Lá chốt ra ngược là một lời nhắc, không phải một lời kết tội. Ý nó là: nếu mọi thứ cứ giữ nguyên như bây giờ thì kết quả sẽ đi về phía này — mà bạn thì vẫn còn nguyên quyền bẻ lái.'
        : 'Lá chốt ra xuôi là một dấu hiệu lành: cứ giữ hướng bạn đang đi, rồi chuyện sẽ dừng lại ở chỗ dễ chịu này.'}`,
      domainTitle: 'Mỗi lá nói về một góc đời bạn',
      domainBody: 'Trải 5 lá không đọc theo thứ tự thời gian, nên bạn đừng tìm xem cái nào trước cái nào sau. Mỗi lá được rút riêng cho một mặt của đời sống, nên cứ đọc dòng nào chạm tới mình nhất trước cũng được.',
      oneThingTitle: 'Nếu hôm nay bạn chỉ làm được một việc',
      oneThingBody: `Đọc tới đây mà thấy nhiều quá thì bạn chỉ cần nhớ lấy lá này thôi. Nằm ở vị trí "${pos(total - 1)}" là ${name(last)}, ra ${face(last)}. Điều nó muốn nhắn với bạn: ${adviceOf(last)}`,
      wholeTitle: 'Ngồi lại nhìn cả phiên bài'
    }
  }[lang];

  const sections = [];

  /* Câu cuối của đoạn mở đầu nói rõ bộ bài đang đọc theo hướng nào. Đặt ở đây
     chứ không thành một mục riêng: người xem cần biết lăng kính TRƯỚC khi đọc
     phần còn lại, chứ không phải sau. */
  const lens = deckLens(deckId, lang);
  /* Ô câu hỏi bỏ trống thì form tự điền câu mặc định, nên không được coi mọi
     chuỗi khác rỗng là "có câu hỏi" - nếu không, người không hỏi gì vẫn đọc
     thấy "Điều bạn mang tới đây là: Thông điệp tổng quan...". */
  const introBody = !isBlankQuestion(question)
    ? (total === 1 ? C.introQuestionSingle : C.introQuestionMany)
    : (total === 1 ? C.introBlankSingle : C.introBlankMany);

  sections.push({
    title: C.introTitle,
    body: lens ? `${introBody} ${lens.frame}` : introBody
  });

  // Trả lời thẳng câu hỏi, ngay sau đoạn mở đầu: đây là thứ người xem đọc
  // bản giải để tìm, không thể bắt họ tự gộp từ năm tab khía cạnh.
  const answer = buildQuestionAnswer({ lang, spreadType, drawnCards, positions, question, intent, dominantElement });
  if (answer) sections.push(answer);

  if (shape === 'single') {
    sections.push({ title: C.singleTitle, body: C.singleBody });
    sections.push({ title: C.singleAdviceTitle, body: adviceOf(first) });
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
    ? `${leadName} chính là lá được rút riêng cho phần ${aspectLabel}, nên bạn hãy đọc lá này trước đã: ${leadSummary}`
    : where
      ? `Phần này mình đọc lần lượt nhé. Mở đầu là ${leadName} ở vị trí "${where}": ${leadSummary}`
      : `Mình bắt đầu từ ${leadName}: ${leadSummary}`;
  if (others === 0) return base;
  return isPrimary
    ? `${base} ${others} lá còn lại chỉ tô thêm sắc thái thôi, chúng không lật ngược ý chính này đâu.`
    : `${base} Rồi ${others} lá còn lại sẽ kể tiếp cùng một mạch chuyện đó.`;
};

// --- Việc nên làm / điều nên để ý ------------------------------------------

const ACTION_COPY = {
  vi: {
    doTitle: 'Việc bạn làm được ngay',
    watchTitle: 'Điều mình nên để ý',
    doHint: 'Những dòng này rút ra từ các lá ra xuôi — đây là phần đang thuận, bạn bắt tay vào được ngay hôm nay.',
    watchHint: 'Những dòng này rút ra từ các lá ra ngược. Không phải điềm xấu đâu, chỉ là chỗ dễ vấp nếu mình bỏ qua.',
    empty: 'Phiên này không có lá nào rơi vào nhóm đó, nên phần này để trống.'
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

/* deckId quyet dinh lang kinh doc bai - xem data/deckLens.js. De trong thi ban
   giai chay y nhu truoc khi co tinh nang nay. */
export const analyzeReadingSession = (drawnCards = [], spreadType = 'five_aspects', question = '', langInput = 'vi', deckId = null) => {
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
    const side = card.isReversed ? 'reversed' : 'upright';
    const data = card[side];
    const orientationTag = card.isReversed ? T[lang].reversedTag : T[lang].uprightTag;

    ASPECT_KEYS.forEach(key => {
      aspects[key].push({
        cardIndex: index + 1,
        cardName: cardNameByLang(card, lang),
        orientation: orientationTag,
        isReversed: !!card.isReversed,
        positionLabel: positions[index],
        isPrimary: primaryMap[index] === key,
        text: cardText(card, side, key, lang),
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
    // Câu dẫn riêng của bộ bài, uốn phần hành động theo đúng lăng kính đã nêu
    // ở đoạn mở đầu. Không có bộ bài thì không có câu này.
    deckLead: deckLens(deckId, lang)?.adviceLead || null,
    doList: drawnCards
      .filter(c => !c.isReversed)
      .map(c => ({ cardName: cardNameByLang(c, lang), icon: c.icon, text: cardText(c, 'upright', 'advice', lang) })),
    watchList: drawnCards
      .filter(c => c.isReversed)
      .map(c => ({ cardName: cardNameByLang(c, lang), icon: c.icon, text: cardText(c, 'reversed', 'advice', lang) }))
  };

  // 6. Bản luận giải tổng thể, có phần trả lời riêng theo câu hỏi
  const intent = detectQuestionIntent(question, lang);
  const holisticSections = buildSections({
    lang, spreadType, drawnCards, positions, question, intent, majorCount, reversedCount, dominantElement, deckId
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
    // Tab khía cạnh mở sẵn khi vào trang kết quả: đúng mảng người xem hỏi.
    focusAspect: TOPIC_ASPECT[intent.topics[0]] || 'situation',
    questionIntent: intent,
    actionPlan,
    holisticSections,
    holisticNarrative
  };
};
