// Tầng luận giải: gom 132 ô hành tinh × cung viết tay, và ghép văn cho những
// phần có quá nhiều tổ hợp để chép tay.
//
// Vì sao chia hai kiểu: hành tinh trong cung có 132 tổ hợp - viết tay được và
// đáng viết tay, vì đó là chỗ khách đọc kỹ nhất. Hành tinh trong nhà có 144 tổ
// hợp và góc chiếu có hơn năm trăm, chép tay hết thì vừa không nổi vừa dễ lệch
// giọng; nên hai phần đó ghép từ "việc hành tinh làm" + "lĩnh vực của nhà" hoặc
// "bản chất của góc". Ghép công khai như vậy trung thực hơn là viết tay lấy lệ
// rồi giả vờ mỗi ô là một bài riêng.

import { SIGN_TEXT_LUMINARIES } from './astrology/signLuminaries.js';
import { SIGN_TEXT_PERSONAL } from './astrology/signPersonal.js';
import { SIGN_TEXT_SOCIAL } from './astrology/signSocial.js';
import { SIGN_TEXT_OUTER } from './astrology/signOuter.js';
import { PLANETS, HOUSES, SIGNS, ASPECTS, ELEMENT_INFO } from './astrologyData.js';

export const PLANET_IN_SIGN = {
  ...SIGN_TEXT_LUMINARIES,
  ...SIGN_TEXT_PERSONAL,
  ...SIGN_TEXT_SOCIAL,
  ...SIGN_TEXT_OUTER
};

const pick = (obj, lang) => (obj ? obj[lang] || obj.vi : '');

/* Luận giải hành tinh trong cung. Hai nút Mặt Trăng không có bảng riêng vì ý
   nghĩa của chúng nằm ở nhà và ở trục Bắc - Nam chứ không ở cung. */
export const getPlanetInSign = (planetKey, signKey, lang = 'vi') =>
  pick(PLANET_IN_SIGN[planetKey]?.[signKey], lang);

/* ------------------------------------------------------------------ */
/* HÀNH TINH TRONG NHÀ                                                 */
/* Mỗi hành tinh có một động từ riêng, ghép với lĩnh vực của nhà.       */
/* ------------------------------------------------------------------ */
const HOUSE_VERB = {
  sun: { vi: 'Bạn tìm thấy chính mình ở', en: 'You find yourself in', zh: '你在这一领域找到自己：' },
  moon: { vi: 'Bạn thấy an toàn khi được ở trong', en: 'You feel safe inside', zh: '你在这一领域才感到安全：' },
  mercury: { vi: 'Đầu óc bạn bận rộn nhất với', en: 'Your mind is busiest with', zh: '你的心思最忙于：' },
  venus: { vi: 'Bạn yêu và tận hưởng qua', en: 'You love and enjoy through', zh: '你透过这一领域去爱与享受：' },
  mars: { vi: 'Bạn dồn sức và dễ nổi nóng ở', en: 'You pour energy into (and lose your temper over)', zh: '你把力气倾注于此，也容易在此动怒：' },
  jupiter: { vi: 'Bạn được mở rộng và gặp may ở', en: 'You expand and meet good fortune in', zh: '你在这一领域扩展并遇到好运：' },
  saturn: { vi: 'Bạn phải tự tay xây từ con số không ở', en: 'You must build from nothing, with your own hands, in', zh: '你必须在这一领域亲手从零筑起：' },
  uranus: { vi: 'Bạn phá lệ và thay đổi đột ngột ở', en: 'You break the rules and change abruptly in', zh: '你在这一领域破例并骤然改变：' },
  neptune: { vi: 'Ranh giới của bạn mờ đi ở', en: 'Your boundaries blur in', zh: '你的界线在这一领域变得模糊：' },
  pluto: { vi: 'Bạn chết đi sống lại nhiều lần ở', en: 'You die and are reborn, repeatedly, in', zh: '你在这一领域一再地向死而生：' },
  northNode: { vi: 'Hướng trưởng thành đời này của bạn nằm ở', en: 'Your growth direction this life lies in', zh: '你此生的成长方向在于：' },
  southNode: { vi: 'Vốn liếng sẵn có - và cũng là lối mòn dễ mắc kẹt - của bạn nằm ở', en: 'Your ready-made capital, and the rut you get stuck in, lies in', zh: '你现成的本钱，也是最易困住你的旧辙，在于：' }
};

export const getPlanetInHouse = (planetKey, houseNum, lang = 'vi') => {
  const verb = HOUSE_VERB[planetKey];
  const house = HOUSES[houseNum - 1];
  if (!verb || !house) return '';

  const name = pick(house.name, lang);
  const domain = pick(house.domain, lang);

  // Tiếng Anh cần mạo từ trước tên nhà ("in the 10th House"), tiếng Việt và
  // tiếng Trung thì không - nên ba ngôn ngữ ghép câu theo ba khuôn khác nhau.
  if (lang === 'zh') return `${pick(verb, lang)}${name}——${domain}。`;
  if (lang === 'en') return `${pick(verb, lang)} the ${name}: ${domain}.`;
  return `${pick(verb, lang)} ${name}: ${domain}.`;
};

/* ------------------------------------------------------------------ */
/* GÓC CHIẾU                                                           */
/* Từ khoá một cụm cho mỗi điểm, ghép với bản chất của góc.             */
/* ------------------------------------------------------------------ */
export const POINT_KEYWORD = {
  sun: { vi: 'con người thật của bạn', en: 'who you really are', zh: '真实的你' },
  moon: { vi: 'nhu cầu cảm xúc của bạn', en: 'your emotional needs', zh: '你的情绪需求' },
  mercury: { vi: 'cách bạn nghĩ và nói', en: 'how you think and speak', zh: '你思考与说话的方式' },
  venus: { vi: 'cách bạn yêu và hưởng thụ', en: 'how you love and enjoy', zh: '你爱与享受的方式' },
  mars: { vi: 'cách bạn hành động', en: 'how you act', zh: '你行动的方式' },
  jupiter: { vi: 'niềm tin và cơ hội của bạn', en: 'your faith and opportunities', zh: '你的信念与机会' },
  saturn: { vi: 'kỷ luật và giới hạn của bạn', en: 'your discipline and limits', zh: '你的自律与界限' },
  uranus: { vi: 'nhu cầu tự do của bạn', en: 'your need for freedom', zh: '你对自由的需求' },
  neptune: { vi: 'trí tưởng tượng và lòng trắc ẩn của bạn', en: 'your imagination and compassion', zh: '你的想象力与悲悯' },
  pluto: { vi: 'khát khao quyền lực và chuyển hoá', en: 'your hunger for power and transformation', zh: '你对权力与蜕变的渴求' },
  northNode: { vi: 'hướng trưởng thành của bạn', en: 'your growth direction', zh: '你的成长方向' },
  southNode: { vi: 'lối mòn quen thuộc của bạn', en: 'your familiar rut', zh: '你熟悉的旧辙' },
  asc: { vi: 'lớp vỏ bạn đưa ra ngoài', en: 'the face you show outward', zh: '你朝外展现的那层外壳' },
  mc: { vi: 'con đường sự nghiệp của bạn', en: 'your career path', zh: '你的事业之路' },
  dsc: { vi: 'kiểu người bạn bị hút vào', en: 'the kind of person you are drawn to', zh: '你被吸引的那类人' },
  ic: { vi: 'gốc rễ và mái nhà của bạn', en: 'your roots and home', zh: '你的根源与家' }
};

export const getAspectText = (aspect, lang = 'vi') => {
  const meta = ASPECTS.find(a => a.key === aspect.aspectKey);
  const kwA = pick(POINT_KEYWORD[aspect.a], lang);
  const kwB = pick(POINT_KEYWORD[aspect.b], lang);
  if (!meta || !kwA || !kwB) return '';

  const effect = pick(meta.effect, lang);
  if (lang === 'zh') return `${kwA}与${kwB}——${effect}。`;
  if (lang === 'en') return `${kwA} and ${kwB} - ${effect}.`;
  return `${kwA} và ${kwB} - ${effect}.`;
};

/* Góc khít dưới một độ đáng được nói riêng: nó chi phối lá số mạnh hơn hẳn
   những góc nằm sát mép orb. */
export const isTightAspect = (aspect) => aspect.orb < 1;

/* ------------------------------------------------------------------ */
/* HÌNH MẪU LỚN                                                        */
/* ------------------------------------------------------------------ */
export const PATTERN_TEXTS = {
  grandTrine: {
    name: { vi: 'Tam Giác Lớn', en: 'Grand Trine', zh: '大三角' },
    text: {
      vi: 'Ba hành tinh nối nhau thành một tam giác đều - một mạch năng lượng khép kín chảy rất trơn. Đây là tài năng bẩm sinh, nhưng vì quá trơn nên bạn ít khi phải mài giũa nó, và cũng dễ ỷ vào nó mà không phát triển tiếp.',
      en: 'Three planets close into an equilateral triangle - a self-contained circuit that flows almost too easily. This is native talent, but because it costs nothing you rarely sharpen it, and can come to lean on it instead of growing past it.',
      zh: '三颗行星连成一个正三角——一条自成闭环、流动得几乎太顺的能量回路。这是天生的才能，但因为不费力，你少去打磨它，也容易靠着它而不再往前长。'
    }
  },
  tSquare: {
    name: { vi: 'Hình Chữ T', en: 'T-Square', zh: 'T 三角' },
    text: {
      vi: 'Hai hành tinh xung đối nhau, cả hai cùng ép lên một hành tinh thứ ba ở đỉnh. Đây là chỗ căng nhất trong lá số và cũng là động cơ mạnh nhất: hầu hết những gì bạn làm được trong đời đều sinh ra từ áp lực ở điểm đỉnh này.',
      en: 'Two planets oppose each other and both press on a third at the apex. This is the tightest knot in the chart and also its strongest engine: most of what you achieve in life is born out of the pressure at that apex.',
      zh: '两颗行星彼此对分，又同时挤压顶端的第三颗。这是整张星盘最紧的一处，也是最强的发动机：你此生成就的大半，都诞生自那个顶点上的压力。'
    }
  },
  yod: {
    name: { vi: 'Yod - Ngón Tay Định Mệnh', en: 'Yod - Finger of Fate', zh: '上帝之指' },
    text: {
      vi: 'Hai hành tinh hợp nhau cùng chỉ về một hành tinh thứ ba theo góc bất hợp. Vùng ở đỉnh Yod là chỗ bạn phải liên tục điều chỉnh, không bao giờ vừa vặn ngay từ đầu - nhưng thường là nơi bạn tìm ra việc mình sinh ra để làm.',
      en: 'Two harmonious planets both point at a third through awkward angles. The apex of a Yod is where you must keep readjusting - it never fits on the first try - and it is often where you eventually find the thing you were made for.',
      zh: '两颗相合的行星，以别扭的角度共同指向第三颗。上帝之指的顶点，是你必须不断调整之处，从来无法一次到位——却往往正是你最终找到「此生该做之事」的地方。'
    }
  },
  stellium: {
    name: { vi: 'Chùm Sao', en: 'Stellium', zh: '星群' },
    text: {
      vi: 'Từ ba hành tinh trở lên dồn vào cùng một cung. Cả khối năng lượng ấy tập trung vào một phong cách sống duy nhất - bạn rất mạnh ở vùng này, nhưng cũng dễ bị nó chiếm chỗ của mọi vùng khác.',
      en: 'Three or more planets crowd into a single sign. That whole block of energy concentrates into one mode of living - you are formidable in this area, and equally at risk of letting it crowd out everything else.',
      zh: '三颗以上的行星挤在同一星座。整块能量集中成单一的生活方式——你在这一领域极强，也同样容易让它挤掉其他一切。'
    }
  }
};

/* Tam Giác Lớn thuần một nguyên tố có màu riêng, nên nói thêm một câu. */
export const grandTrineElementText = (elementKey, lang = 'vi') => {
  const el = ELEMENT_INFO[elementKey];
  if (!el) return '';
  const name = pick(el.name, lang);
  const hint = pick(el.hint, lang);
  if (lang === 'zh') return `此为纯${name}象大三角：${hint}——这一整套本事都现成可用。`;
  if (lang === 'en') return `A pure ${name} grand trine: ${hint} - that whole set of abilities comes ready-made.`;
  return `Đây là Tam Giác Lớn thuần hành ${name}: ${hint} - cả bộ khả năng ấy có sẵn không phải học.`;
};

/* ------------------------------------------------------------------ */
/* CHỦ TINH LÁ SỐ                                                      */
/* ------------------------------------------------------------------ */
export const chartRulerText = (rulerKey, signKey, houseNum, lang = 'vi') => {
  const planet = PLANETS[rulerKey];
  const sign = SIGNS.find(s => s.key === signKey);
  if (!planet || !sign) return '';

  const pName = pick(planet.name, lang);
  const sName = pick(sign.name, lang);
  const house = houseNum ? HOUSES[houseNum - 1] : null;
  const hName = house ? pick(house.name, lang) : '';

  if (lang === 'zh') {
    return `你的命主星是${pName}，落在${sName}${hName ? `、${hName}` : ''}。命主星是整张星盘的管家——它所在之处，就是你人生重心实际落下的地方。`;
  }
  if (lang === 'en') {
    return `Your chart ruler is ${pName}, placed in ${sName}${hName ? `, ${hName}` : ''}. The chart ruler is the housekeeper of the whole chart - wherever it sits is where the centre of gravity of your life actually falls.`;
  }
  return `Chủ tinh lá số của bạn là ${pName}, đặt tại ${sName}${hName ? `, ${hName}` : ''}. Chủ tinh là người quản gia của cả lá số - nó đứng ở đâu thì trọng tâm đời bạn thật sự rơi vào đó.`;
};

/* ------------------------------------------------------------------ */
/* ĐIỂM PHÚC                                                           */
/* ------------------------------------------------------------------ */
export const partOfFortuneText = (signKey, houseNum, isDay, lang = 'vi') => {
  const sign = SIGNS.find(s => s.key === signKey);
  const house = houseNum ? HOUSES[houseNum - 1] : null;
  if (!sign || !house) return '';

  const sName = pick(sign.name, lang);
  const hName = pick(house.name, lang);
  const domain = pick(house.domain, lang);

  if (lang === 'zh') {
    return `福点落在${sName}、${hName}。这是三合一的点——上升、太阳与月亮的交会——标出你不必硬撑就顺手的地方：${domain}。（依${isDay ? '日间' : '夜间'}盘公式计算。）`;
  }
  if (lang === 'en') {
    return `Your Part of Fortune sits in ${sName}, ${hName}. It is a three-way point - Ascendant, Sun and Moon combined - marking where things come easily without forcing: ${domain}. (Calculated with the ${isDay ? 'day' : 'night'} chart formula.)`;
  }
  return `Điểm Phúc của bạn nằm ở ${sName}, ${hName}. Đây là điểm ghép của ba yếu tố - Cung Mọc, Mặt Trời và Mặt Trăng - đánh dấu nơi mọi thứ đến với bạn thuận tay mà không phải gồng: ${domain}. (Tính theo công thức lá số ${isDay ? 'ban ngày' : 'ban đêm'}.)`;
};

/* ------------------------------------------------------------------ */
/* NGHỊCH HÀNH                                                         */
/* ------------------------------------------------------------------ */
export const RETROGRADE_TEXT = {
  vi: 'Hành tinh nghịch hành không phải điềm xấu - đó chỉ là hiện tượng nhìn từ Trái Đất khi ta vượt qua nó trên quỹ đạo. Trong lá số, nó có nghĩa là năng lượng của hành tinh ấy hướng vào trong: bạn tiêu hoá nó ở bên trong trước, và thường phải mất nhiều thời gian hơn người khác mới thể hiện được ra ngoài.',
  en: 'A retrograde planet is not an omen - it is simply how the sky looks from Earth as we overtake that planet on the track. In a chart it means the planet energy turns inward: you digest it privately first, and usually need longer than other people before it comes out.',
  zh: '逆行行星并非凶兆——那只是我们在轨道上超过它时，从地球看去的样子。在星盘中，它意味着该行星的能量转向内在：你先在里面消化它，通常也要比别人花更长的时间，才能把它表现出来。'
};

/* ------------------------------------------------------------------ */
/* GHI CHÚ ĐỘ TIN CẬY                                                  */
/* Nói thẳng giới hạn của phép tính thay vì để khách tự đoán.          */
/* ------------------------------------------------------------------ */
export const CHART_NOTES = {
  noBirthTime: {
    vi: 'Bạn chưa nhập giờ sinh, nên bản đồ này chỉ có vị trí hành tinh theo cung, không có Cung Mọc và không chia được mười hai nhà. Vị trí hành tinh được tính ở mốc 12h trưa - riêng Mặt Trăng đi hơn 13 độ mỗi ngày nên có thể lệch tới nửa cung. Có giờ sinh thì hãy nhập lại để xem bản đầy đủ.',
    en: 'You have not entered a birth time, so this chart shows planetary signs only - no Ascendant, and no house division. Positions are computed for 12:00 noon; the Moon alone travels over 13 degrees a day, so it may be off by up to half a sign. Enter a time to see the full chart.',
    zh: '你尚未填写出生时间，因此本盘只显示行星所在星座，没有上升，也无法划分十二宫。行星位置以中午十二点计算；单是月亮每天就走十三度以上，可能偏差达半个星座。若知道时间，请补上以查看完整星盘。'
  },
  placidusPolar: {
    vi: 'Nơi sinh nằm quá vòng cực nên hệ Placidus không định nghĩa được ở đây - có những cung hoàng đạo không bao giờ mọc tại vĩ độ này. Bản đồ đã tự chuyển sang hệ Cung Trọn.',
    en: 'The birthplace lies beyond the polar circle, where Placidus is undefined - some zodiac signs never rise at this latitude. The chart has switched to Whole Sign houses.',
    zh: '出生地位于极圈之外，普拉西德制在此无定义——在这一纬度，有些星座永不升起。本盘已自动改用整宫制。'
  },
  placidusFallback: {
    vi: 'Phép chia nhà Placidus không hội tụ được ở vĩ độ này, nên bản đồ đã chuyển sang hệ Cung Trọn để không hiển thị một lá số sai.',
    en: 'The Placidus division would not converge at this latitude, so the chart has fallen back to Whole Sign houses rather than display an incorrect one.',
    zh: '在此纬度普拉西德分宫无法收敛，因此本盘退回整宫制，以免显示一张错误的星盘。'
  }
};

/* ------------------------------------------------------------------ */
/* LỜI MỞ ĐẦU THEO BA TRỤ                                              */
/* ------------------------------------------------------------------ */
export const bigThreeSummary = (sunSign, moonSign, ascSign, lang = 'vi') => {
  const s = pick(SIGNS.find(x => x.key === sunSign)?.name, lang);
  const m = pick(SIGNS.find(x => x.key === moonSign)?.name, lang);
  const a = ascSign ? pick(SIGNS.find(x => x.key === ascSign)?.name, lang) : null;

  if (!a) {
    if (lang === 'zh') return `太阳${s} · 月亮${m}。缺出生时间，尚无法定出上升。`;
    if (lang === 'en') return `Sun in ${s}, Moon in ${m}. Without a birth time the Ascendant cannot be found.`;
    return `Mặt Trời ${s} · Mặt Trăng ${m}. Chưa có giờ sinh nên chưa xác định được Cung Mọc.`;
  }

  if (lang === 'zh') return `太阳${s} · 月亮${m} · 上升${a}。太阳是你要成为的人，月亮是你私下真正的样子，上升是别人先看见的那一层。`;
  if (lang === 'en') return `Sun in ${s}, Moon in ${m}, Rising in ${a}. The Sun is who you are becoming, the Moon is who you are in private, and the Rising is the layer other people meet first.`;
  return `Mặt Trời ${s} · Mặt Trăng ${m} · Cung Mọc ${a}. Mặt Trời là con người bạn đang trở thành, Mặt Trăng là con người bạn khi ở một mình, còn Cung Mọc là lớp người khác gặp trước tiên.`;
};
