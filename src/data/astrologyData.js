// Dữ liệu cấu trúc của chiêm tinh phương Tây: 12 cung, 12 hành tinh/điểm,
// 12 nhà, các góc chiếu và bảng miếu vượng hãm rơi.
//
// Chỉ chứa dữ liệu tra cứu và tên gọi ba ngôn ngữ. Phần văn luận giải dài nằm
// riêng ở astrologyTexts.js để file này còn đọc được bằng mắt.

/* ------------------------------------------------------------------ */
/* 12 CUNG HOÀNG ĐẠO                                                   */
/* Thứ tự cố định từ Bạch Dương: chỉ số i tương ứng dải kinh độ hoàng   */
/* đạo [i*30, i*30+30). Không đổi thứ tự này - cả engine lẫn vòng bản   */
/* đồ đều tính vị trí bằng phép chia cho 30.                           */
/* ------------------------------------------------------------------ */
export const SIGNS = [
  {
    key: 'aries', glyph: '♈', element: 'fire', modality: 'cardinal', polarity: 'yang',
    ruler: 'mars', traditionalRuler: 'mars', color: '#ef4444',
    name: { vi: 'Bạch Dương', en: 'Aries', zh: '白羊座' },
    keyword: { vi: 'Khởi phát', en: 'Initiation', zh: '开创' },
    style: { vi: 'thẳng thắn, nóng vội, lao vào trước rồi tính sau', en: 'direct, impatient, charging in first and thinking later', zh: '直率、性急，先冲上去再说' }
  },
  {
    key: 'taurus', glyph: '♉', element: 'earth', modality: 'fixed', polarity: 'yin',
    ruler: 'venus', traditionalRuler: 'venus', color: '#84cc16',
    name: { vi: 'Kim Ngưu', en: 'Taurus', zh: '金牛座' },
    keyword: { vi: 'Bền vững', en: 'Stability', zh: '稳固' },
    style: { vi: 'chậm rãi, thực tế, đã chọn thì giữ tới cùng', en: 'slow, practical, holding on once a choice is made', zh: '缓慢务实，一旦选定便坚持到底' }
  },
  {
    key: 'gemini', glyph: '♊', element: 'air', modality: 'mutable', polarity: 'yang',
    ruler: 'mercury', traditionalRuler: 'mercury', color: '#fbbf24',
    name: { vi: 'Song Tử', en: 'Gemini', zh: '双子座' },
    keyword: { vi: 'Kết nối', en: 'Connection', zh: '联结' },
    style: { vi: 'nhanh, hiếu kỳ, thích thử nhiều hướng cùng lúc', en: 'quick, curious, testing many directions at once', zh: '轻快好奇，喜欢同时试多个方向' }
  },
  {
    key: 'cancer', glyph: '♋', element: 'water', modality: 'cardinal', polarity: 'yin',
    ruler: 'moon', traditionalRuler: 'moon', color: '#c084fc',
    name: { vi: 'Cự Giải', en: 'Cancer', zh: '巨蟹座' },
    keyword: { vi: 'Chở che', en: 'Nurture', zh: '守护' },
    style: { vi: 'mềm bên ngoài, dai bên trong, luôn dựng một cái tổ để lui về', en: 'soft outside, tenacious inside, always building a nest to retreat to', zh: '外柔内韧，总要筑一个可退守的窝' }
  },
  {
    key: 'leo', glyph: '♌', element: 'fire', modality: 'fixed', polarity: 'yang',
    ruler: 'sun', traditionalRuler: 'sun', color: '#f59e0b',
    name: { vi: 'Sư Tử', en: 'Leo', zh: '狮子座' },
    keyword: { vi: 'Toả sáng', en: 'Radiance', zh: '闪耀' },
    style: { vi: 'ấm áp, hào phóng, cần được nhìn thấy mới sống hết mình', en: 'warm, generous, needing to be seen to give fully', zh: '温暖慷慨，被看见时才全力以赴' }
  },
  {
    key: 'virgo', glyph: '♍', element: 'earth', modality: 'mutable', polarity: 'yin',
    ruler: 'mercury', traditionalRuler: 'mercury', color: '#10b981',
    name: { vi: 'Xử Nữ', en: 'Virgo', zh: '处女座' },
    keyword: { vi: 'Tinh chỉnh', en: 'Refinement', zh: '精修' },
    style: { vi: 'tỉ mỉ, phân tích, muốn mọi thứ chạy trơn hơn hôm qua', en: 'meticulous, analytical, wanting things to run better than yesterday', zh: '细致善析，想让一切比昨天运转得更顺' }
  },
  {
    key: 'libra', glyph: '♎', element: 'air', modality: 'cardinal', polarity: 'yang',
    ruler: 'venus', traditionalRuler: 'venus', color: '#f472b6',
    name: { vi: 'Thiên Bình', en: 'Libra', zh: '天秤座' },
    keyword: { vi: 'Cân bằng', en: 'Balance', zh: '权衡' },
    style: { vi: 'nhã nhặn, cân nhắc mọi phía, sợ làm mất lòng người', en: 'gracious, weighing every side, afraid of causing offence', zh: '优雅、面面俱到，怕伤了和气' }
  },
  {
    key: 'scorpio', glyph: '♏', element: 'water', modality: 'fixed', polarity: 'yin',
    ruler: 'pluto', traditionalRuler: 'mars', color: '#a855f7',
    name: { vi: 'Thiên Yết', en: 'Scorpio', zh: '天蝎座' },
    keyword: { vi: 'Chuyển hoá', en: 'Transformation', zh: '蜕变' },
    style: { vi: 'sâu, kín, đã dấn thân thì không có đường lùi nửa vời', en: 'deep, private, all-in once committed', zh: '深沉隐秘，一旦投入便无半途' }
  },
  {
    key: 'sagittarius', glyph: '♐', element: 'fire', modality: 'mutable', polarity: 'yang',
    ruler: 'jupiter', traditionalRuler: 'jupiter', color: '#fb923c',
    name: { vi: 'Nhân Mã', en: 'Sagittarius', zh: '射手座' },
    keyword: { vi: 'Mở rộng', en: 'Expansion', zh: '拓展' },
    style: { vi: 'phóng khoáng, thẳng ruột, luôn nhìn về chân trời kế tiếp', en: 'expansive, blunt, always eyeing the next horizon', zh: '豪放直言，眼睛总望着下一个地平线' }
  },
  {
    key: 'capricorn', glyph: '♑', element: 'earth', modality: 'cardinal', polarity: 'yin',
    ruler: 'saturn', traditionalRuler: 'saturn', color: '#64748b',
    name: { vi: 'Ma Kết', en: 'Capricorn', zh: '摩羯座' },
    keyword: { vi: 'Kiến tạo', en: 'Mastery', zh: '筑造' },
    style: { vi: 'kỷ luật, tính đường dài, leo từng bậc không tắt', en: 'disciplined, long-range, climbing one rung at a time', zh: '自律、看长线，一级一级地爬' }
  },
  {
    key: 'aquarius', glyph: '♒', element: 'air', modality: 'fixed', polarity: 'yang',
    ruler: 'uranus', traditionalRuler: 'saturn', color: '#22d3ee',
    name: { vi: 'Bảo Bình', en: 'Aquarius', zh: '水瓶座' },
    keyword: { vi: 'Đổi mới', en: 'Innovation', zh: '革新' },
    style: { vi: 'độc lập, khác người, nhìn việc từ trên cao và hơi lạnh', en: 'independent, contrarian, viewing things from above and a little coolly', zh: '独立另类，从高处俯看，略带疏离' }
  },
  {
    key: 'pisces', glyph: '♓', element: 'water', modality: 'mutable', polarity: 'yin',
    ruler: 'neptune', traditionalRuler: 'jupiter', color: '#818cf8',
    name: { vi: 'Song Ngư', en: 'Pisces', zh: '双鱼座' },
    keyword: { vi: 'Hoà tan', en: 'Dissolution', zh: '消融' },
    style: { vi: 'giàu tưởng tượng, thấm cảm xúc người khác, ranh giới mờ', en: 'imaginative, soaking up other people feelings, with blurred boundaries', zh: '想象丰沛，吸收他人情绪，界线模糊' }
  }
];

export const SIGN_KEYS = SIGNS.map(s => s.key);

/* ------------------------------------------------------------------ */
/* HÀNH TINH VÀ ĐIỂM ẢO                                                */
/* role = câu hỏi mà hành tinh đó trả lời trong lá số.                  */
/* orbBonus nới rộng sai số cho phép của góc chiếu khi hành tinh này     */
/* tham gia - hai đèn trời chi phối mạnh hơn hẳn nên được nới thêm.      */
/* ------------------------------------------------------------------ */
export const PLANETS = {
  sun: {
    key: 'sun', glyph: '☉', color: '#fbbf24', group: 'luminary', orbBonus: 2,
    name: { vi: 'Mặt Trời', en: 'Sun', zh: '太阳' },
    role: { vi: 'Bản ngã cốt lõi - bạn là ai khi sống đúng nhất với mình', en: 'Core self - who you are at your most authentic', zh: '核心自我——最真实时的你' },
    cycle: { vi: '1 năm một vòng hoàng đạo', en: 'One year per zodiac cycle', zh: '一年绕行黄道一周' }
  },
  moon: {
    key: 'moon', glyph: '☽', color: '#e5e7eb', group: 'luminary', orbBonus: 2,
    name: { vi: 'Mặt Trăng', en: 'Moon', zh: '月亮' },
    role: { vi: 'Thế giới cảm xúc - điều bạn cần để thấy an toàn', en: 'Emotional world - what you need to feel safe', zh: '情绪世界——你需要什么才感到安全' },
    cycle: { vi: '28 ngày một vòng, đổi cung mỗi 2 ngày rưỡi', en: 'A cycle every 28 days, changing sign every two and a half days', zh: '约28天一周，每两天半换一宫' }
  },
  mercury: {
    key: 'mercury', glyph: '☿', color: '#a3e635', group: 'personal', orbBonus: 0,
    name: { vi: 'Sao Thuỷ', en: 'Mercury', zh: '水星' },
    role: { vi: 'Cách tư duy, học và diễn đạt', en: 'How you think, learn and express', zh: '思考、学习与表达的方式' },
    cycle: { vi: 'Không bao giờ rời Mặt Trời quá một cung', en: 'Never more than one sign from the Sun', zh: '与太阳相距不超过一宫' }
  },
  venus: {
    key: 'venus', glyph: '♀', color: '#f472b6', group: 'personal', orbBonus: 0,
    name: { vi: 'Sao Kim', en: 'Venus', zh: '金星' },
    role: { vi: 'Cách yêu, cách tận hưởng và thứ bạn cho là đẹp', en: 'How you love, enjoy, and what you find beautiful', zh: '如何爱、如何享受，以及你认为什么是美' },
    cycle: { vi: 'Không bao giờ rời Mặt Trời quá hai cung', en: 'Never more than two signs from the Sun', zh: '与太阳相距不超过两宫' }
  },
  mars: {
    key: 'mars', glyph: '♂', color: '#ef4444', group: 'personal', orbBonus: 0,
    name: { vi: 'Sao Hoả', en: 'Mars', zh: '火星' },
    role: { vi: 'Cách hành động, ham muốn và nổi giận', en: 'How you act, desire and get angry', zh: '行动、欲望与愤怒的方式' },
    cycle: { vi: 'Khoảng 2 năm một vòng', en: 'About two years per cycle', zh: '约两年一周' }
  },
  jupiter: {
    key: 'jupiter', glyph: '♃', color: '#fb923c', group: 'social', orbBonus: 0,
    name: { vi: 'Sao Mộc', en: 'Jupiter', zh: '木星' },
    role: { vi: 'Nơi bạn được mở rộng, gặp may và tin vào điều lớn hơn', en: 'Where you expand, get lucky, and believe in something larger', zh: '你得以扩展、走运并相信更大事物之处' },
    cycle: { vi: '12 năm một vòng, mỗi cung khoảng một năm', en: 'Twelve years per cycle, about a year per sign', zh: '十二年一周，每宫约一年' }
  },
  saturn: {
    key: 'saturn', glyph: '♄', color: '#94a3b8', group: 'social', orbBonus: 0,
    name: { vi: 'Sao Thổ', en: 'Saturn', zh: '土星' },
    role: { vi: 'Bài học khó, giới hạn và thứ bạn phải tự tay xây', en: 'The hard lesson, the limit, and what you must build yourself', zh: '难题、界限，以及必须亲手筑起之物' },
    cycle: { vi: '29,5 năm một vòng - mốc "hồi quy Sao Thổ" tuổi 29', en: 'A 29.5-year cycle - the Saturn Return around age 29', zh: '29.5年一周——29岁的土星回归' }
  },
  uranus: {
    key: 'uranus', glyph: '♅', color: '#22d3ee', group: 'generational', orbBonus: 0,
    name: { vi: 'Sao Thiên Vương', en: 'Uranus', zh: '天王星' },
    role: { vi: 'Nơi bạn phá lệ, bật ra khỏi khuôn và đổi đột ngột', en: 'Where you break rules, jump the mould and change abruptly', zh: '你破例、跳出模子并骤然改变之处' },
    cycle: { vi: '84 năm một vòng, 7 năm một cung - dấu ấn của cả một thế hệ', en: 'Eighty-four years per cycle, seven per sign - a generational marker', zh: '84年一周，每宫七年——一代人的印记' }
  },
  neptune: {
    key: 'neptune', glyph: '♆', color: '#818cf8', group: 'generational', orbBonus: 0,
    name: { vi: 'Sao Hải Vương', en: 'Neptune', zh: '海王星' },
    role: { vi: 'Nơi ranh giới tan ra: mộng, nghệ thuật, tâm linh và cả ảo tưởng', en: 'Where boundaries dissolve: dream, art, spirit - and illusion', zh: '界线消融之处：梦、艺术、灵性，也包括幻觉' },
    cycle: { vi: '165 năm một vòng, 14 năm một cung', en: 'A 165-year cycle, fourteen years per sign', zh: '165年一周，每宫十四年' }
  },
  pluto: {
    key: 'pluto', glyph: '♇', color: '#a855f7', group: 'generational', orbBonus: 0,
    name: { vi: 'Sao Diêm Vương', en: 'Pluto', zh: '冥王星' },
    role: { vi: 'Nơi bạn chết đi sống lại: quyền lực, ám ảnh và tái sinh', en: 'Where you die and are reborn: power, obsession, regeneration', zh: '你向死而生之处：权力、执念与重生' },
    cycle: { vi: '248 năm một vòng, 12-30 năm một cung', en: 'A 248-year cycle, twelve to thirty years per sign', zh: '248年一周，每宫十二至三十年' }
  },
  northNode: {
    key: 'northNode', glyph: '☊', color: '#34d399', group: 'point', orbBonus: 0, alwaysRetrograde: true,
    name: { vi: 'Nút Bắc (La Hầu)', en: 'North Node', zh: '北交点' },
    role: { vi: 'Hướng trưởng thành đời này - vùng còn lạ nhưng phải bước vào', en: 'This life growth direction - unfamiliar ground you must walk into', zh: '此生的成长方向——陌生却必须踏入的地带' },
    cycle: { vi: '18,6 năm một vòng, luôn đi lùi', en: 'An 18.6-year cycle, always moving backwards', zh: '18.6年一周，恒常逆行' }
  },
  southNode: {
    key: 'southNode', glyph: '☋', color: '#fda4af', group: 'point', orbBonus: 0, alwaysRetrograde: true,
    name: { vi: 'Nút Nam (Kế Đô)', en: 'South Node', zh: '南交点' },
    role: { vi: 'Vốn liếng sẵn có - làm quá dễ nên dễ mắc kẹt trong đó', en: 'Ready-made capital - so easy it becomes a place to get stuck', zh: '现成的本钱——太容易，以致容易困在其中' },
    cycle: { vi: 'Luôn đối đỉnh Nút Bắc', en: 'Always opposite the North Node', zh: '恒与北交点相对' }
  }
};

/* Bốn góc của lá số. Không phải thiên thể nhưng đọc như thiên thể. */
export const ANGLES = {
  asc: {
    key: 'asc', glyph: 'AC', color: '#fbbf24',
    name: { vi: 'Cung Mọc (Ascendant)', en: 'Ascendant', zh: '上升星座' },
    role: { vi: 'Lớp vỏ bạn đưa ra thế giới - ấn tượng đầu tiên người khác nhận', en: 'The face you show the world - the first impression others receive', zh: '你朝向世界的那层外壳——他人的第一印象' }
  },
  mc: {
    key: 'mc', glyph: 'MC', color: '#22d3ee',
    name: { vi: 'Thiên Đỉnh (Midheaven)', en: 'Midheaven', zh: '天顶' },
    role: { vi: 'Đỉnh sự nghiệp và danh tiếng - thứ bạn muốn được nhớ đến', en: 'Career and reputation - what you want to be remembered for', zh: '事业与名声——你想被记住的样子' }
  },
  dsc: {
    key: 'dsc', glyph: 'DC', color: '#f472b6',
    name: { vi: 'Cung Lặn (Descendant)', en: 'Descendant', zh: '下降星座' },
    role: { vi: 'Kiểu người bạn bị hút vào và cần học từ họ', en: 'The kind of person you are drawn to and must learn from', zh: '你被吸引、并需向其学习的那类人' }
  },
  ic: {
    key: 'ic', glyph: 'IC', color: '#a78bfa',
    name: { vi: 'Thiên Để (Imum Coeli)', en: 'Imum Coeli', zh: '天底' },
    role: { vi: 'Gốc rễ, gia đình và nơi bạn lui về khi mệt', en: 'Roots, family, and where you retreat when tired', zh: '根源、家庭，以及疲惫时的退处' }
  }
};

/* ------------------------------------------------------------------ */
/* 12 NHÀ                                                              */
/* ------------------------------------------------------------------ */
export const HOUSES = [
  { num: 1, naturalSign: 'aries', angular: 'angular',
    name: { vi: 'Nhà 1 - Bản Thân', en: '1st House - Self', zh: '第一宫 · 命宫' },
    domain: { vi: 'thân thể, diện mạo, cách bạn bước vào một căn phòng', en: 'body, appearance, how you enter a room', zh: '身体、外貌，以及你走进一个房间的方式' } },
  { num: 2, naturalSign: 'taurus', angular: 'succedent',
    name: { vi: 'Nhà 2 - Tài Sản', en: '2nd House - Resources', zh: '第二宫 · 财帛宫' },
    domain: { vi: 'tiền bạc tự kiếm, giá trị bản thân, cảm giác đủ đầy', en: 'self-earned money, self-worth, the feeling of enough', zh: '自赚之财、自我价值与「够了」的感觉' } },
  { num: 3, naturalSign: 'gemini', angular: 'cadent',
    name: { vi: 'Nhà 3 - Giao Tiếp', en: '3rd House - Communication', zh: '第三宫 · 兄弟宫' },
    domain: { vi: 'anh chị em, hàng xóm, việc học ngắn hạn, cách bạn nói', en: 'siblings, neighbours, short study, the way you speak', zh: '手足、邻里、短期学习与说话方式' } },
  { num: 4, naturalSign: 'cancer', angular: 'angular',
    name: { vi: 'Nhà 4 - Gia Đình', en: '4th House - Home', zh: '第四宫 · 田宅宫' },
    domain: { vi: 'cha mẹ, mái nhà, gốc rễ, ký ức tuổi thơ', en: 'parents, home, roots, childhood memory', zh: '父母、居所、根源与童年记忆' } },
  { num: 5, naturalSign: 'leo', angular: 'succedent',
    name: { vi: 'Nhà 5 - Sáng Tạo', en: '5th House - Creativity', zh: '第五宫 · 子女宫' },
    domain: { vi: 'tình yêu lãng mạn, con cái, chơi đùa, thứ bạn làm vì thích', en: 'romance, children, play, what you do purely for joy', zh: '恋爱、子女、玩乐，以及纯粹因喜欢而做的事' } },
  { num: 6, naturalSign: 'virgo', angular: 'cadent',
    name: { vi: 'Nhà 6 - Công Việc & Sức Khoẻ', en: '6th House - Work & Health', zh: '第六宫 · 奴仆宫' },
    domain: { vi: 'việc hằng ngày, thói quen, cơ thể, sự phục vụ', en: 'daily work, routine, the body, service', zh: '日常工作、习惯、身体与服务' } },
  { num: 7, naturalSign: 'libra', angular: 'angular',
    name: { vi: 'Nhà 7 - Quan Hệ', en: '7th House - Partnership', zh: '第七宫 · 夫妻宫' },
    domain: { vi: 'hôn nhân, hợp tác, cả đối thủ công khai', en: 'marriage, partnership, and open rivals too', zh: '婚姻、合作，也包括公开的对手' } },
  { num: 8, naturalSign: 'scorpio', angular: 'succedent',
    name: { vi: 'Nhà 8 - Chuyển Hoá', en: '8th House - Transformation', zh: '第八宫 · 疾厄宫' },
    domain: { vi: 'tiền chung, thân mật sâu, khủng hoảng và tái sinh', en: 'shared money, deep intimacy, crisis and rebirth', zh: '共有之财、深层亲密、危机与重生' } },
  { num: 9, naturalSign: 'sagittarius', angular: 'cadent',
    name: { vi: 'Nhà 9 - Tri Thức', en: '9th House - Belief', zh: '第九宫 · 迁移宫' },
    domain: { vi: 'đi xa, học cao, tín ngưỡng, hệ giá trị sống', en: 'travel, higher study, faith, a life philosophy', zh: '远行、高等学习、信仰与人生观' } },
  { num: 10, naturalSign: 'capricorn', angular: 'angular',
    name: { vi: 'Nhà 10 - Sự Nghiệp', en: '10th House - Career', zh: '第十宫 · 官禄宫' },
    domain: { vi: 'nghề nghiệp, danh tiếng, vị trí xã hội', en: 'vocation, reputation, social standing', zh: '志业、名声与社会位置' } },
  { num: 11, naturalSign: 'aquarius', angular: 'succedent',
    name: { vi: 'Nhà 11 - Cộng Đồng', en: '11th House - Community', zh: '第十一宫 · 福德宫' },
    domain: { vi: 'bạn bè, hội nhóm, lý tưởng và ước mơ dài hạn', en: 'friends, groups, ideals and long-range hopes', zh: '朋友、群体、理想与长远愿望' } },
  { num: 12, naturalSign: 'pisces', angular: 'cadent',
    name: { vi: 'Nhà 12 - Tiềm Thức', en: '12th House - The Unseen', zh: '第十二宫 · 玄秘宫' },
    domain: { vi: 'giấc mơ, nỗi sợ ẩn, sự tĩnh lặng, điều bạn giấu cả chính mình', en: 'dreams, hidden fear, solitude, what you hide from yourself', zh: '梦、隐藏的恐惧、独处，以及你对自己也隐瞒之事' } }
];

/* ------------------------------------------------------------------ */
/* GÓC CHIẾU                                                           */
/* orb = sai lệch tối đa còn được tính là có góc, cộng thêm orbBonus    */
/* của hai hành tinh tham gia.                                         */
/* ------------------------------------------------------------------ */
export const ASPECTS = [
  { key: 'conjunction', angle: 0, orb: 7, nature: 'blend', glyph: '☌', major: true, color: '#fbbf24',
    name: { vi: 'Giao Hội', en: 'Conjunction', zh: '合相' },
    effect: { vi: 'hai năng lượng dính làm một, khuếch đại nhau và khó tách rời', en: 'two energies fuse into one, amplifying each other and hard to separate', zh: '两股能量融为一体，彼此放大且难以分开' } },
  { key: 'opposition', angle: 180, orb: 7, nature: 'tense', glyph: '☍', major: true, color: '#f43f5e',
    name: { vi: 'Xung Đối', en: 'Opposition', zh: '对分相' },
    effect: { vi: 'hai đầu giằng nhau, bạn hay bị đẩy về một phía rồi phải học cách bắc cầu', en: 'two ends pull against each other; you swing to one side, then must learn to bridge', zh: '两端相互拉扯，你常偏向一边，终须学会架桥' } },
  { key: 'trine', angle: 120, orb: 6, nature: 'flow', glyph: '△', major: true, color: '#34d399',
    name: { vi: 'Tam Phân', en: 'Trine', zh: '三分相' },
    effect: { vi: 'chảy trơn tới mức dễ bị coi thường - tài năng có sẵn nhưng ít được mài', en: 'so smooth it gets taken for granted - a gift that rarely gets sharpened', zh: '顺畅到易被忽视——现成的天赋，却少被打磨' } },
  { key: 'square', angle: 90, orb: 6, nature: 'tense', glyph: '□', major: true, color: '#fb7185',
    name: { vi: 'Vuông Góc', en: 'Square', zh: '四分相' },
    effect: { vi: 'ma sát liên tục, khó chịu nhưng chính nó đẩy bạn hành động', en: 'constant friction - uncomfortable, but it is what pushes you to act', zh: '持续摩擦，虽不舒服，却正是推动你行动的力量' } },
  { key: 'sextile', angle: 60, orb: 4, nature: 'flow', glyph: '⚹', major: true, color: '#22d3ee',
    name: { vi: 'Lục Phân', en: 'Sextile', zh: '六分相' },
    effect: { vi: 'cơ hội mở sẵn nhưng phải chủ động bước tới mới thành', en: 'an open opportunity that only pays off if you step towards it', zh: '机会已敞开，但须主动迈步才成' } },
  { key: 'quincunx', angle: 150, orb: 3, nature: 'awkward', glyph: '⚻', major: false, color: '#c084fc',
    name: { vi: 'Bất Hợp', en: 'Quincunx', zh: '梅花相' },
    effect: { vi: 'hai bên không hiểu tiếng nhau, phải chỉnh đi chỉnh lại mới vừa', en: 'two sides that do not speak the same language and need constant readjustment', zh: '两方语言不通，须一再调整方能相合' } },
  { key: 'semisextile', angle: 30, orb: 2, nature: 'awkward', glyph: '⚺', major: false, color: '#94a3b8',
    name: { vi: 'Bán Lục Phân', en: 'Semisextile', zh: '十二分相' },
    effect: { vi: 'liên hệ nhẹ, như hai phòng cạnh nhau nghe loáng thoáng tiếng nhau', en: 'a light link, like two rooms that faintly overhear each other', zh: '轻微牵连，如两间相邻的房间隐约听见彼此' } }
];

/* ------------------------------------------------------------------ */
/* MIẾU - VƯỢNG - HÃM - RƠI                                            */
/* Ba hành tinh hiện đại chỉ ghi phần cai quản: miếu/rơi của chúng tới  */
/* nay vẫn chưa thống nhất giữa các trường phái nên không bịa vào.      */
/* ------------------------------------------------------------------ */
export const DIGNITIES = {
  sun: { rulership: ['leo'], exaltation: ['aries'], detriment: ['aquarius'], fall: ['libra'] },
  moon: { rulership: ['cancer'], exaltation: ['taurus'], detriment: ['capricorn'], fall: ['scorpio'] },
  mercury: { rulership: ['gemini', 'virgo'], exaltation: ['virgo'], detriment: ['sagittarius', 'pisces'], fall: ['pisces'] },
  venus: { rulership: ['taurus', 'libra'], exaltation: ['pisces'], detriment: ['scorpio', 'aries'], fall: ['virgo'] },
  mars: { rulership: ['aries', 'scorpio'], exaltation: ['capricorn'], detriment: ['libra', 'taurus'], fall: ['cancer'] },
  jupiter: { rulership: ['sagittarius', 'pisces'], exaltation: ['cancer'], detriment: ['gemini', 'virgo'], fall: ['capricorn'] },
  saturn: { rulership: ['capricorn', 'aquarius'], exaltation: ['libra'], detriment: ['cancer', 'leo'], fall: ['aries'] },
  uranus: { rulership: ['aquarius'], exaltation: [], detriment: ['leo'], fall: [] },
  neptune: { rulership: ['pisces'], exaltation: [], detriment: ['virgo'], fall: [] },
  pluto: { rulership: ['scorpio'], exaltation: [], detriment: ['taurus'], fall: [] }
};

export const DIGNITY_INFO = {
  rulership: { key: 'rulership', score: 2, tone: 'good',
    name: { vi: 'Miếu (nhà riêng)', en: 'Domicile', zh: '入庙' },
    hint: { vi: 'Hành tinh đứng trong cung nó cai quản - làm việc thoải mái nhất, không phải gồng.', en: 'The planet sits in the sign it rules - working at full ease, with nothing to force.', zh: '行星落在自己主管的星座——最自在，无须硬撑。' } },
  exaltation: { key: 'exaltation', score: 1, tone: 'good',
    name: { vi: 'Vượng (được nâng)', en: 'Exaltation', zh: '曜升' },
    hint: { vi: 'Không phải nhà mình nhưng được cả cung nâng đỡ - dễ được người khác ghi nhận.', en: 'Not its own house, yet the whole sign lifts it - easily recognised by others.', zh: '虽非本宫，却被整宫托举——容易得到他人认可。' } },
  detriment: { key: 'detriment', score: -1, tone: 'bad',
    name: { vi: 'Hãm (đối nhà)', en: 'Detriment', zh: '落陷' },
    hint: { vi: 'Đứng đối diện nhà mình - phải học cách làm việc bằng công cụ không quen tay.', en: 'Opposite its own house - it must work with tools it is not used to.', zh: '与本宫相对——须用不趁手的工具做事。' } },
  fall: { key: 'fall', score: -2, tone: 'bad',
    name: { vi: 'Rơi (bị hạ)', en: 'Fall', zh: '入弱' },
    hint: { vi: 'Cung này làm hành tinh mất tiếng nói - không phải điềm xấu, chỉ là vùng phải tập nhiều hơn người khác.', en: 'This sign mutes the planet - not an omen, just an area needing more practice than others.', zh: '此星座使行星失声——并非凶兆，只是需比别人多练之处。' } },
  peregrine: { key: 'peregrine', score: 0, tone: 'neutral',
    name: { vi: 'Trung tính', en: 'Peregrine', zh: '平宫' },
    hint: { vi: 'Không được nâng cũng không bị ép - hành tinh làm việc theo đúng phong cách của cung.', en: 'Neither lifted nor pressed - the planet simply works in the style of its sign.', zh: '不扬不抑——行星依星座的风格行事。' } }
};

/* ------------------------------------------------------------------ */
/* CÂN BẰNG NGUYÊN TỐ - TAM THỂ - ÂM DƯƠNG - BÁN CẦU                   */
/* ------------------------------------------------------------------ */
export const ELEMENT_INFO = {
  fire: { key: 'fire', color: '#f97316',
    name: { vi: 'Lửa', en: 'Fire', zh: '火' },
    hint: { vi: 'nhiệt huyết, hành động, sống bằng cảm hứng', en: 'enthusiasm, action, living on inspiration', zh: '热情、行动，靠灵感而活' },
    excess: { vi: 'Lửa quá nhiều: khởi động ào ạt rồi cháy hết pin trước khi về đích. Cần một người đất bên cạnh để giữ nhịp.', en: 'Too much Fire: an explosive start that burns out before the finish. You need an earthy person nearby to keep the pace.', zh: '火过盛：起步猛烈，却在抵达前先烧尽。身边需要一个土象的人来稳住节奏。' },
    lack: { vi: 'Thiếu Lửa: bạn chờ đủ chắc mới dám bước, nên hay lỡ nhịp. Tập nói "làm thử" trước khi kịp phân tích.', en: 'Little Fire: you wait until it is safe before moving, and so miss the beat. Practise saying "let us try" before the analysis starts.', zh: '缺火：要够稳妥才敢迈步，因而常错过时机。练习在分析之前先说「试试看」。' } },
  earth: { key: 'earth', color: '#84cc16',
    name: { vi: 'Đất', en: 'Earth', zh: '土' },
    hint: { vi: 'thực tế, bền bỉ, tin vào thứ sờ được', en: 'practical, enduring, trusting what can be touched', zh: '务实、耐久，相信摸得到的东西' },
    excess: { vi: 'Đất quá nhiều: chắc chắn tới mức chậm đổi, dễ ở lại quá lâu trong thứ đã hết hạn. Cho phép mình liều một việc nhỏ mỗi tháng.', en: 'Too much Earth: so solid that change comes slowly, and you stay too long in what has expired. Allow yourself one small risk a month.', zh: '土过盛：稳到难以转身，常在早已过期之事里留太久。允许自己每月冒一次小险。' },
    lack: { vi: 'Thiếu Đất: ý tưởng nhiều mà khó thành hình. Hãy ghi mọi việc ra giấy và chia thành các bước có thể tick.', en: 'Little Earth: plenty of ideas that struggle to take shape. Write everything down and break it into steps you can tick off.', zh: '缺土：点子多却难成形。把一切写下来，拆成可打勾的步骤。' } },
  air: { key: 'air', color: '#38bdf8',
    name: { vi: 'Khí', en: 'Air', zh: '风' },
    hint: { vi: 'tư duy, ngôn ngữ, kết nối và trao đổi', en: 'thought, language, connecting and exchanging', zh: '思维、语言、联结与交流' },
    excess: { vi: 'Khí quá nhiều: sống trong đầu, phân tích cả những chuyện chỉ cần cảm. Về lại cơ thể bằng vận động và hơi thở.', en: 'Too much Air: living in your head, analysing things that only need to be felt. Come back to the body through movement and breath.', zh: '风过盛：活在脑中，连只需感受之事也要分析。以运动与呼吸回到身体。' },
    lack: { vi: 'Thiếu Khí: bạn cảm rất rõ nhưng khó gọi tên. Viết ra hoặc nói với một người khách quan sẽ gỡ được nút.', en: 'Little Air: you feel things sharply but struggle to name them. Writing it out, or telling someone impartial, unties the knot.', zh: '缺风：感受清晰却难以命名。写下来，或说给一个中立的人听，结便解开。' } },
  water: { key: 'water', color: '#818cf8',
    name: { vi: 'Nước', en: 'Water', zh: '水' },
    hint: { vi: 'cảm xúc, trực giác, thấm và nhớ', en: 'emotion, intuition, absorbing and remembering', zh: '情感、直觉，吸收并记住' },
    excess: { vi: 'Nước quá nhiều: thấm hết cảm xúc của người xung quanh rồi tưởng là của mình. Ranh giới là bài học lớn nhất đời bạn.', en: 'Too much Water: you soak up the feelings around you and mistake them for your own. Boundaries are your life lesson.', zh: '水过盛：吸尽周遭情绪，误以为是自己的。界线是你此生最大的功课。' },
    lack: { vi: 'Thiếu Nước: bạn xử lý việc rất gọn nhưng hay bỏ quên phần cảm xúc - của mình lẫn của người. Hỏi "mình đang thấy gì" trước khi hỏi "phải làm gì".', en: 'Little Water: you handle matters cleanly but often skip the feeling - yours and other people. Ask "what am I feeling" before "what should I do".', zh: '缺水：处事利落，却常略过情感——自己的与他人的。先问「我此刻感觉如何」，再问「该怎么做」。' } }
};

export const MODALITY_INFO = {
  cardinal: { key: 'cardinal',
    name: { vi: 'Khởi (Cardinal)', en: 'Cardinal', zh: '基本宫' },
    hint: { vi: 'giỏi bắt đầu, mở đường, nhưng dễ bỏ dở giữa chừng', en: 'good at starting and opening paths, but prone to leaving things half-done', zh: '善于起头开路，却易半途而废' } },
  fixed: { key: 'fixed',
    name: { vi: 'Định (Fixed)', en: 'Fixed', zh: '固定宫' },
    hint: { vi: 'giỏi giữ và làm tới cùng, nhưng rất khó xoay chuyển', en: 'good at holding on and finishing, but very hard to turn around', zh: '善于坚守到底，却极难转向' } },
  mutable: { key: 'mutable',
    name: { vi: 'Biến (Mutable)', en: 'Mutable', zh: '变动宫' },
    hint: { vi: 'giỏi thích nghi và xoay xở, nhưng dễ mất phương hướng', en: 'good at adapting and improvising, but easily loses direction', zh: '善于适应变通，却易失去方向' } }
};

export const POLARITY_INFO = {
  yang: { key: 'yang',
    name: { vi: 'Dương (hướng ra)', en: 'Yang - outward', zh: '阳 · 外向' },
    hint: { vi: 'nạp năng lượng bằng cách bước ra ngoài và tương tác', en: 'recharges by stepping out and interacting', zh: '靠走出去与人互动来充电' } },
  yin: { key: 'yin',
    name: { vi: 'Âm (hướng vào)', en: 'Yin - inward', zh: '阴 · 内向' },
    hint: { vi: 'nạp năng lượng bằng cách rút vào trong và ngẫm', en: 'recharges by drawing inward and reflecting', zh: '靠向内退守与沉思来充电' } }
};

export const HEMISPHERE_INFO = {
  lower: { name: { vi: 'Nửa dưới (nhà 1-6)', en: 'Lower half (houses 1-6)', zh: '下半球 · 一至六宫' },
    hint: { vi: 'đời sống hướng vào thế giới riêng, gia đình và sự tự chủ', en: 'a life turned towards the private world, family and self-direction', zh: '人生朝向私领域、家庭与自主' } },
  upper: { name: { vi: 'Nửa trên (nhà 7-12)', en: 'Upper half (houses 7-12)', zh: '上半球 · 七至十二宫' },
    hint: { vi: 'đời sống hướng ra xã hội, người khác và sân khấu công khai', en: 'a life turned towards society, other people and the public stage', zh: '人生朝向社会、他人与公共舞台' } },
  east: { name: { vi: 'Nửa Đông (nhà 10-3)', en: 'Eastern half (houses 10-3)', zh: '东半球 · 十至三宫' },
    hint: { vi: 'bạn tự quyết định đường đi nhiều hơn là để hoàn cảnh đưa đẩy', en: 'you set your own course more than circumstances set it for you', zh: '较多由自己定路，而非被环境推着走' } },
  west: { name: { vi: 'Nửa Tây (nhà 4-9)', en: 'Western half (houses 4-9)', zh: '西半球 · 四至九宫' },
    hint: { vi: 'đời bạn xoay quanh người khác - cơ hội thường đến qua quan hệ', en: 'your life turns around other people - opportunity usually arrives through relationships', zh: '人生绕着他人转——机会多经由关系而来' } }
};

/* ------------------------------------------------------------------ */
/* HỆ CHIA NHÀ                                                         */
/* ------------------------------------------------------------------ */
export const HOUSE_SYSTEMS = {
  placidus: {
    key: 'placidus',
    name: { vi: 'Placidus', en: 'Placidus', zh: '普拉西德制' },
    hint: { vi: 'Hệ phổ biến nhất trong chiêm tinh hiện đại phương Tây. Chia theo thời gian một điểm đi hết cung đường của nó nên các nhà rộng hẹp khác nhau.', en: 'The most common system in modern Western astrology. It divides by the time a point takes to travel its arc, so houses come out unequal.', zh: '现代西方占星最常用的分宫制。按一点走完其弧所需时间划分，故各宫大小不一。' }
  },
  whole: {
    key: 'whole',
    name: { vi: 'Cung Trọn (Whole Sign)', en: 'Whole Sign', zh: '整宫制' },
    hint: { vi: 'Hệ cổ nhất: mỗi cung hoàng đạo là trọn một nhà, cung của Mọc là nhà 1. Đơn giản và không bao giờ vỡ ở vĩ độ cao.', en: 'The oldest system: each zodiac sign is one whole house, the rising sign being the first. Simple, and never breaks at high latitudes.', zh: '最古老的分宫制：每一星座即一整宫，上升所在星座为第一宫。简洁，且在高纬永不失效。' }
  },
  equal: {
    key: 'equal',
    name: { vi: 'Đều (Equal)', en: 'Equal House', zh: '等宫制' },
    hint: { vi: 'Mỗi nhà đúng 30 độ, đếm từ Cung Mọc. Giữ được Cung Mọc làm mốc nhưng Thiên Đỉnh không còn trùng đỉnh nhà 10.', en: 'Every house is exactly thirty degrees from the Ascendant. It keeps the Ascendant as anchor, but the Midheaven no longer falls on the tenth cusp.', zh: '自上升起每宫整三十度。保住上升为基准，但天顶不再落在第十宫头。' }
  }
};
