// Đọc câu hỏi người xem gõ vào để biết họ đang hỏi CHUYỆN GÌ và hỏi THEO KIỂU GÌ.
//
// Trước đây câu hỏi chỉ được nhắc lại ở đoạn mở đầu, còn bản giải thì y hệt
// nhau dù người ta hỏi chuyện người yêu cũ hay chuyện xin việc. Module này
// không cố "hiểu" câu hỏi như AI, nó chỉ dò từ khoá - đủ để:
//   - chọn đúng khía cạnh của lá bài mà đọc,
//   - biết người xem cần câu trả lời có/không, mốc thời gian, lý do, cách làm...
// Dò sai thì rơi về "tổng quan", bản giải vẫn đọc được, không bao giờ vỡ.

import { TRANSLATIONS } from '../data/translations.js';

/* Bỏ dấu tiếng Việt để khách gõ không dấu ("nguoi yeu cu") vẫn nhận ra. */
const normalizeVi = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\u0111/g, 'd');

/* Dữ liệu 78 lá chỉ viết sẵn năm khía cạnh. Chủ đề nào không có khía cạnh
   riêng thì mượn khía cạnh gần nhất: sức khoẻ, gia đình, bạn bè, chuyển đi
   đọc theo "hoàn cảnh"; chuyện bản thân đọc theo "lời khuyên". Không mượn
   khía cạnh tình cảm cho gia đình, vì lời giải tình cảm viết cho người yêu. */
export const TOPIC_ASPECT = {
  love: 'love',
  work: 'work',
  finance: 'finance',
  health: 'situation',
  family: 'situation',
  friends: 'situation',
  self: 'advice',
  move: 'situation'
};

/* Từ khoá tiếng Việt viết không dấu và so theo ranh giới từ. Cố tình bỏ hoặc
   chỉ giữ dạng cụm cho những từ trùng mặt chữ khi mất dấu: "nợ"/"nó",
   "lãi"/"lại", "vay"/"vậy", "thi"/"thì", "tiền"/"tiến", "cưới"/"cuối",
   "thương"/"thường", "giàu"/"giấu", "đau"/"đâu", "ốm"/"ôm",
   "bạn thân"/"bản thân" (bỏ hẳn cả hai). */
const TOPIC_WORDS = {
  love: {
    vi: ['tinh cam', 'tinh yeu', 'yeu', 'nguoi yeu', 'ny', 'crush', 'nguoi ay', 'anh ay', 'co ay', 'nguoi cu',
      'chia tay', 'quay lai', 'tai hop', 'hen ho', 'ket hon', 'dam cuoi', 'cuoi xin', 'cuoi nhau', 'hon nhan', 'vo chong', 'chong toi', 'chong em', 'vo toi', 'vo em', 'nguoi chong', 'nguoi vo',
      'ban trai', 'ban gai', 'mot nua', 'nguoi thu ba', 'ngoai tinh', 'ghen', 'yeu thuong', 'thuong nho', 'mai moi', 'doi lua',
      'ex', 'dung nguoi', 'nguoi phu hop', 'ly hon', 'tha thinh', 'to tinh'],
    en: ['love', 'relationship', 'boyfriend', 'girlfriend', 'partner', 'crush', 'ex', 'marriage', 'marry', 'married',
      'dating', 'date', 'husband', 'wife', 'breakup', 'break up', 'soulmate', 'romance', 'romantic', 'him', 'her', 'divorce', 'the one'],
    zh: ['爱', '感情', '恋', '男友', '女友', '男朋友', '女朋友', '对象', '结婚', '婚', '分手', '复合', '前任', '暧昧', '喜欢', '桃花', '伴侣', '正缘']
  },
  work: {
    vi: ['cong viec', 'viec lam', 'su nghiep', 'hoc', 'hoc tap', 'ky thi', 'di thi', 'thi cu', 'thi dai hoc', 'du hoc', 'phong van', 'xin viec', 'nghi viec',
      'chuyen viec', 'nhay viec', 'doi viec', 'sep', 'dong nghiep', 'thang chuc', 'thang tien', 'du an', 'khoi nghiep', 'cong ty',
      'luan van', 'dai hoc', 'nganh', 'job', 'offer', 'kpi', 'hop dong'],
    en: ['job', 'jobs', 'career', 'work', 'boss', 'promotion', 'interview', 'interviews', 'study', 'exam', 'exams', 'school', 'university', 'college',
      'business', 'project', 'company', 'colleague', 'hired', 'quit', 'startup'],
    zh: ['工作', '事业', '学业', '考试', '面试', '升职', '老板', '同事', '跳槽', '辞职', '创业', '公司', '学习', '留学', '职场', '项目']
  },
  finance: {
    vi: ['tien bac', 'tien nong', 'kiem tien', 'co tien', 'mat tien', 'nhieu tien', 'dong tien', 'chuyen tien', 'tai chinh', 'luong', 'thu nhap',
      'dau tu', 'chung khoan', 'co phieu', 'crypto', 'coin', 'tra no', 'khoan no', 'no nan', 'vay tien', 'khoan vay', 'vay ngan hang',
      'mua nha', 'mua xe', 'tiet kiem', 'thua lo', 'lai suat', 'loi nhuan', 'giau co', 'lam giau', 'chi tieu', 'doanh thu', 'kinh doanh',
      'buon ban', 'trung so', 'dat dai'],
    en: ['money', 'finance', 'financial', 'salary', 'income', 'invest', 'investment', 'debt', 'loan', 'stock', 'stocks',
      'crypto', 'savings', 'rich', 'wealth', 'profit', 'mortgage'],
    zh: ['钱', '财', '收入', '工资', '薪', '投资', '股票', '债', '贷款', '买房', '存款', '理财', '赚']
  },
  health: {
    vi: ['suc khoe', 'benh', 'om dau', 'bi om', 'bi dau', 'dau dau', 'dau lung', 'mat ngu', 'tam ly', 'tram cam', 'stress', 'cang thang',
      'lo au', 'phau thuat', 'mang thai', 'co thai', 'co bau', 'giam can', 'an uong', 'the luc', 'tinh than', 'kiet suc', 'met moi', 'hoi phuc'],
    en: ['health', 'healthy', 'sick', 'illness', 'disease', 'surgery', 'pregnant', 'pregnancy', 'anxiety', 'depression', 'stress',
      'sleep', 'weight', 'recover', 'recovery', 'mental', 'burnout', 'tired'],
    zh: ['健康', '身体', '病', '手术', '怀孕', '焦虑', '抑郁', '压力', '失眠', '减肥', '康复', '疲惫']
  },
  family: {
    vi: ['gia dinh', 'bo me', 'cha me', 'ba me', 'me toi', 'bo toi', 'ba toi', 'anh chi', 'anh em', 'chi em', 'con cai', 'con toi',
      'ho hang', 'nha chong', 'nha vo', 'me chong', 'bo chong', 'me vo', 'bo vo', 'ong ba', 'sinh con', 'nuoi con'],
    en: ['family', 'parents', 'parent', 'mother', 'father', 'mom', 'dad', 'sister', 'brother', 'children', 'kids', 'son', 'daughter', 'in-laws'],
    zh: ['家庭', '家人', '父母', '妈妈', '爸爸', '母亲', '父亲', '孩子', '兄弟', '姐妹', '婆婆', '公婆']
  },
  friends: {
    vi: ['ban be', 'tinh ban', 'nguoi ban', 'hoi ban', 'nhom ban', 'xa giao', 'mau thuan', 'bi ghet', 'noi xau', 'phan boi'],
    en: ['friend', 'friends', 'friendship', 'betrayed', 'betrayal', 'social'],
    zh: ['朋友', '友情', '闺蜜', '人际', '背叛']
  },
  self: {
    vi: ['chinh minh', 'muc dich song', 'y nghia cuoc song', 'dam me', 'tu tin', 'phat trien ban than', 'chua lanh', 'noi tam',
      'tam linh', 'binh an', 'buong bo', 'tim lai minh', 'con duong cua toi', 'su menh'],
    en: ['myself', 'purpose', 'passion', 'confidence', 'self', 'growth', 'healing', 'spiritual', 'meaning', 'inner peace', 'let go'],
    zh: ['自己', '自我', '人生意义', '目标', '成长', '疗愈', '内心', '自信', '放下', '使命']
  },
  move: {
    vi: ['chuyen nha', 'nha moi', 'don nha', 'xuat ngoai', 'dinh cu', 'nuoc ngoai', 'du lich', 've que', 'chuyen den', 'chuyen vao', 'chuyen ra', 'thanh pho moi'],
    en: ['move house', 'move abroad', 'move to another city', 'moving house', 'moving abroad', 'relocate', 'relocation', 'travel', 'abroad', 'trip', 'emigrate', 'new city'],
    zh: ['搬家', '出国', '旅行', '移民', '定居', '换城市']
  }
};

/* Dạng câu hỏi, dò theo thứ tự trong KIND_ORDER - dạng cụ thể dò trước dạng
   chung: "làm sao để anh ấy quay lại" là hỏi cách làm, không phải hỏi có/không;
   "khi nào thì có người yêu" là hỏi thời gian. Tiếng Việt dò có/không trước
   lựa chọn vì chữ "hay" còn nghĩa là "thường" ("có hay nghĩ về tôi không");
   tiếng Anh thì ngược lại ("Should I take A or B" là câu lựa chọn). */
const KIND_ORDER = {
  vi: ['timing', 'why', 'howto', 'feelings', 'outcome', 'yesno', 'choice'],
  en: ['timing', 'why', 'howto', 'feelings', 'outcome', 'choice', 'yesno'],
  zh: ['timing', 'why', 'howto', 'feelings', 'outcome', 'choice', 'yesno']
};

const KIND_PATTERNS = {
  vi: {
    timing: /\b(khi nao|bao gio|bao lau|luc nao|chung nao|thang nao|nam nao|may thang|bao nhieu lau|den bao gio)\b/,
    why: /\b(tai sao|vi sao|ly do|sao lai|nguyen nhan|vi dau)\b/,
    howto: /\b(lam sao|lam the nao|lam gi|nen lam gi|can lam gi|cach nao|bang cach nao|lam cach nao|phai lam sao)\b/,
    feelings: /\b(nghi gi ve toi|nghi sao ve toi|nghi ve toi|cam xuc|cam nhan|con yeu toi|co yeu toi|co thich toi|con thuong toi|co thuong toi|thuong toi khong|co nho toi|con nho toi|thay the nao ve toi|trong long)\b/,
    outcome: /\b(ket qua|ket cuc|thanh cong|co thanh|di den dau|ve dau|co suon se|co on khong)\b/,
    choice: /\b(nen chon|lua chon|chon ai|chon cai nao|hay la|hoac la)\b|\bhay\b(?! khong)(?! ghen)/,
    yesno: /\b(co nen|lieu|phai khong|duoc khong|co phai)\b|\bco\b.*\b(khong|ko|k)\b|\b(khong|ko|chua)\s*\??$|\bnen\b.*\bkhong\b/
  },
  en: {
    timing: /\b(when|how long|how soon|what time)\b/,
    why: /\b(why|what is the reason|reason)\b/,
    howto: /\b(how can|how do i|how to|how should|what should i do|what can i do|what do i need)\b/,
    feelings: /\b(feel about me|feels about me|think of me|think about me|thinks of me|thinks about me|love me|like me|miss me|feelings for me)\b/,
    outcome: /\b(outcome|result|succeed|success|successful|turn out|work out)\b/,
    choice: /\b(which|or|choose between)\b/,
    yesno: /^(will|should|is|are|does|do|can|could|would|am|has|have|did|was)\b/
  },
  zh: {
    timing: /什么时候|何时|多久|多长时间|哪一年|几月/,
    why: /为什么|为何|原因|怎么会/,
    howto: /怎么办|如何|怎样才能|该怎么|该做什么|怎么做/,
    feelings: /怎么看我|对我的感觉|喜欢我|爱我|想我|心里怎么想|对我有意思/,
    outcome: /结果|结局|成功|会成吗|顺利吗/,
    choice: /还是|选哪|哪个|哪一个/,
    yesno: /吗[？?]?$|会不会|能不能|该不该|是不是|有没有|要不要|可不可以/
  }
};

const DEFAULT_QUESTIONS = new Set(
  Object.values(TRANSLATIONS).map(t => t?.defaultQuestion).filter(Boolean)
);

/* Câu hỏi trống hoặc chính là câu mặc định (form tự điền khi bỏ trống ô) thì
   coi như người xem không hỏi gì cụ thể. */
export const isBlankQuestion = (question) => {
  const q = (question || '').trim();
  return !q || DEFAULT_QUESTIONS.has(q);
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const countHits = (text, words, useBoundary) =>
  words.reduce((n, w) => {
    if (!useBoundary) return n + (text.includes(w) ? 1 : 0);
    return n + (new RegExp(`\\b${escapeRe(w)}\\b`).test(text) ? 1 : 0);
  }, 0);

/* Trả về:
     topics - chủ đề được hỏi, xếp theo độ khớp, tối đa 2 (câu hỏi kiểu
              "tình cảm và công việc" thì đọc cả hai). Rỗng nghĩa là tổng quan.
     kind   - 'yesno' | 'timing' | 'choice' | 'why' | 'howto' | 'feelings' | 'outcome' | 'open'
     blank  - người xem không đặt câu hỏi */
export const detectQuestionIntent = (question, lang = 'vi') => {
  if (isBlankQuestion(question)) return { blank: true, topics: [], kind: 'open' };

  const raw = question.trim();
  // Khách có thể gõ tiếng Việt khi đang ở giao diện tiếng Anh và ngược lại,
  // nên dò từ khoá của cả ba thứ tiếng, chỉ dạng câu là theo ngôn ngữ đang xem.
  const vi = normalizeVi(raw);
  const en = raw.toLowerCase();

  const scores = Object.entries(TOPIC_WORDS).map(([topic, words]) => ({
    topic,
    score: countHits(vi, words.vi, true) + countHits(en, words.en, true) + countHits(raw, words.zh, false)
  }));

  const key = lang === 'en' || lang === 'zh' ? lang : 'vi';
  const probe = key === 'vi' ? vi : key === 'en' ? en : raw;
  const kind = KIND_ORDER[key].find(k => KIND_PATTERNS[key][k].test(probe)) || 'open';

  let topics = scores
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(s => s.topic);

  // "Người ấy nghĩ gì về tôi" mà không nêu ai thì mặc định là chuyện tình cảm.
  if (kind === 'feelings' && topics.length === 0) topics = ['love'];

  return { blank: false, topics, kind };
};
