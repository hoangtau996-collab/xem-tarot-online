// Dựng lá số chiêm tinh: bốn góc, mười hai nhà, góc chiếu, cân bằng nguyên tố
// và các hình mẫu đặc biệt.
//
// Chia làm hai tầng cho dễ kiểm chứng: ephemeris.js lo phần thiên văn thuần
// (hành tinh ở đâu), file này lo phần chiêm tinh (những vị trí đó nghĩa là gì
// về mặt cấu trúc lá số). Không có chữ luận giải nào ở đây - chỉ có số.

import {
  getPlanetPositions, localSiderealDegrees, localToUtc, meanObliquity,
  norm360, angleDiff, toRad, toDeg, PLANET_ORDER, formatOffset
} from './ephemeris.js';
import {
  SIGNS, PLANETS, ASPECTS, DIGNITIES, HOUSES
} from '../data/astrologyData.js';

/* Vĩ độ mà Placidus không còn định nghĩa được: quá vòng cực, có những cung
   hoàng đạo không bao giờ mọc nên không chia được nhà theo cung đường ngày. */
const PLACIDUS_LIMIT = 66.0;

/* Trọng số khi đếm nguyên tố / tam thể. Mặt Trời, Mặt Trăng và Cung Mọc là ba
   trụ của lá số nên nặng gấp ba hành tinh thế hệ - nếu đếm ngang nhau thì ba
   hành tinh chậm (cả một thế hệ giống nhau) sẽ lấn át nét riêng của từng người. */
const WEIGHTS = {
  sun: 3, moon: 3, asc: 3, mc: 2,
  mercury: 2, venus: 2, mars: 2,
  jupiter: 1.5, saturn: 1.5,
  uranus: 1, neptune: 1, pluto: 1
};

export const signIndexOf = (lon) => Math.floor(norm360(lon) / 30) % 12;
export const degreeInSign = (lon) => norm360(lon) % 30;

/* Định dạng 24°17' Sư Tử - kiểu ghi chuẩn của mọi phần mềm chiêm tinh. */
export const formatPosition = (lon) => {
  const d = degreeInSign(lon);
  const deg = Math.floor(d);
  const min = Math.round((d - deg) * 60);
  // Làm tròn phút có thể đẩy lên 60 - dồn sang độ cho khỏi hiện "12°60'".
  const carry = min === 60;
  return { deg: carry ? deg + 1 : deg, min: carry ? 0 : min, signIndex: signIndexOf(lon) };
};

/* ------------------------------------------------------------------ */
/* BỐN GÓC                                                             */
/* ------------------------------------------------------------------ */

/* Thiên Đỉnh: điểm hoàng đạo có cùng xích kinh với kinh tuyến trời. */
export const calcMc = (ramc, obliquity) => {
  const r = toRad(ramc);
  const e = toRad(obliquity);
  return norm360(toDeg(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(e))));
};

/* Cung Mọc: điểm hoàng đạo đang nhô lên khỏi chân trời phía Đông.
   Công thức chuẩn từ RAMC, độ nghiêng hoàng đạo và vĩ độ nơi sinh. */
export const calcAsc = (ramc, obliquity, latitude) => {
  const r = toRad(ramc);
  const e = toRad(obliquity);
  const phi = toRad(latitude);
  const y = Math.cos(r);
  const x = -(Math.sin(r) * Math.cos(e) + Math.tan(phi) * Math.sin(e));
  return norm360(toDeg(Math.atan2(y, x)));
};

/* Kinh độ hoàng đạo của điểm nằm trên hoàng đạo có xích kinh cho trước.
   Đây là phép nghịch của tan(a) = tan(lon)*cos(e): chia cho cos(e) chứ không nhân -
   viết nhầm chiều thì các đỉnh nhà trung gian lệch vài độ mà vẫn trông hợp lý. */
const eclipticLonFromRa = (ra, obliquity) => {
  const r = toRad(ra);
  const e = toRad(obliquity);
  return norm360(toDeg(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(e))));
};

/* Xích vĩ của điểm hoàng đạo tại kinh độ lon. */
const declinationOfEclipticPoint = (lon, obliquity) =>
  toDeg(Math.asin(Math.sin(toRad(obliquity)) * Math.sin(toRad(lon))));

/* ------------------------------------------------------------------ */
/* CHIA NHÀ                                                            */
/* ------------------------------------------------------------------ */

/* Một đỉnh nhà trung gian theo Placidus.
   Ý tưởng: đỉnh nhà 11 là điểm đã đi được 2/3 cung đường từ lúc mọc tới lúc
   lên đỉnh trời, tức còn cách kinh tuyến đúng 1/3 bán cung ngày của chính nó.
   Bán cung ngày lại phụ thuộc xích vĩ, mà xích vĩ phụ thuộc vị trí đang tìm -
   nên phải lặp cho tới khi hội tụ. Thực tế hội tụ sau 5-6 vòng.

   offset và k lấy từ chính định nghĩa trên:
     nhà 11: RA = RAMC + 30  + AD/3     nhà 12: RA = RAMC + 60  + 2AD/3
     nhà 2 : RA = RAMC + 120 + 2AD/3    nhà 3 : RA = RAMC + 150 + AD/3   */
const placidusCusp = (ramc, offset, k, obliquity, latitude) => {
  const tanPhi = Math.tan(toRad(latitude));
  let ra = ramc + offset;

  for (let i = 0; i < 25; i++) {
    const lon = eclipticLonFromRa(ra, obliquity);
    const dec = declinationOfEclipticPoint(lon, obliquity);
    const sinAd = tanPhi * Math.tan(toRad(dec));
    if (Math.abs(sinAd) > 1) return null; // vùng cực: điểm này không bao giờ mọc
    const ad = toDeg(Math.asin(sinAd));

    const next = ramc + offset + k * ad;
    if (Math.abs(next - ra) < 1e-9) { ra = next; break; }
    ra = next;
  }

  return eclipticLonFromRa(ra, obliquity);
};

/* Mười hai đỉnh nhà. Trả về mảng 12 kinh độ, phần tử 0 là đỉnh nhà 1. */
export const calcHouseCusps = (system, { ramc, obliquity, latitude, asc, mc }) => {
  if (system === 'whole') {
    // Cung của Mọc là trọn nhà 1, nên đỉnh nhà 1 lùi về đầu cung đó.
    const start = signIndexOf(asc) * 30;
    return Array.from({ length: 12 }, (_, i) => norm360(start + i * 30));
  }

  if (system === 'equal') {
    return Array.from({ length: 12 }, (_, i) => norm360(asc + i * 30));
  }

  const c11 = placidusCusp(ramc, 30, 1 / 3, obliquity, latitude);
  const c12 = placidusCusp(ramc, 60, 2 / 3, obliquity, latitude);
  const c2 = placidusCusp(ramc, 120, 2 / 3, obliquity, latitude);
  const c3 = placidusCusp(ramc, 150, 1 / 3, obliquity, latitude);
  if ([c11, c12, c2, c3].some(c => c === null || !Number.isFinite(c))) return null;

  const cusps = [
    asc, c2, c3,
    norm360(mc + 180), norm360(c11 + 180), norm360(c12 + 180),
    norm360(asc + 180), norm360(c2 + 180), norm360(c3 + 180),
    mc, c11, c12
  ];

  // Nhà phải nối tiếp nhau theo chiều tăng của hoàng đạo. Nếu một nhà rỗng
  // hoặc âm thì phép lặp đã lạc - thà lùi về hệ khác còn hơn vẽ ra lá số sai.
  for (let i = 0; i < 12; i++) {
    const span = norm360(cusps[(i + 1) % 12] - cusps[i]);
    if (span < 0.5 || span > 180) return null;
  }

  return cusps;
};

/* Nhà chứa một kinh độ. Đi từng nhà và kiểm tra điểm có nằm trong cung quét
   của nhà đó không - cách này đúng cả khi nhà vắt qua mốc 0 độ Bạch Dương. */
export const houseOfLongitude = (lon, cusps) => {
  if (!cusps) return null;
  for (let i = 0; i < 12; i++) {
    const from = cusps[i];
    const span = norm360(cusps[(i + 1) % 12] - from);
    if (norm360(lon - from) < span) return i + 1;
  }
  return 12;
};

/* ------------------------------------------------------------------ */
/* GÓC CHIẾU                                                           */
/* ------------------------------------------------------------------ */

/* Hai điểm có tạo góc chiếu nào không. Trả về góc khít nhất nếu có nhiều
   lựa chọn (hiếm, chỉ xảy ra ở orb rất rộng). */
const findAspect = (lonA, lonB, bonusA = 0, bonusB = 0) => {
  const separation = Math.abs(angleDiff(lonA, lonB));
  let best = null;

  for (const aspect of ASPECTS) {
    const orbLimit = aspect.orb + (aspect.major ? bonusA + bonusB : 0);
    const orb = Math.abs(separation - aspect.angle);
    if (orb <= orbLimit && (!best || orb < best.orb)) {
      best = {
        aspectKey: aspect.key,
        angle: aspect.angle,
        nature: aspect.nature,
        major: aspect.major,
        orb,
        // Càng khít càng mạnh. 0 orb = 100%, chạm giới hạn = 0%.
        strength: Math.max(0, 1 - orb / orbLimit),
        separation
      };
    }
  }

  return best;
};

/* Toàn bộ góc chiếu giữa các điểm trong lá số.
   Hai nút Mặt Trăng luôn đối đỉnh nhau và Cung Lặn / Thiên Để luôn đối đỉnh
   Cung Mọc / Thiên Đỉnh - đó là hệ quả hình học chứ không phải tin tức về
   người xem, nên loại khỏi danh sách cho khỏi nhiễu. */
const REDUNDANT_PAIRS = new Set(['northNode|southNode', 'asc|dsc', 'mc|ic']);

export const calcAspects = (points) => {
  const result = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];
      if (REDUNDANT_PAIRS.has(`${a.key}|${b.key}`) || REDUNDANT_PAIRS.has(`${b.key}|${a.key}`)) continue;

      const found = findAspect(a.lon, b.lon, a.orbBonus || 0, b.orbBonus || 0);
      if (found) result.push({ a: a.key, b: b.key, ...found });
    }
  }

  return result.sort((x, y) => y.strength - x.strength);
};

/* ------------------------------------------------------------------ */
/* HÌNH MẪU LỚN                                                        */
/* Chỉ xét góc chính giữa các hành tinh thật - kéo cả bốn góc vào sẽ    */
/* sinh ra hàng loạt "hình mẫu" ảo do Cung Lặn luôn đối đỉnh Cung Mọc.  */
/* ------------------------------------------------------------------ */
export const findPatterns = (planets, aspects) => {
  const byKey = Object.fromEntries(planets.map(p => [p.key, p]));
  const keys = planets.map(p => p.key);
  const has = (a, b, type) => aspects.find(
    asp => asp.aspectKey === type && ((asp.a === a && asp.b === b) || (asp.a === b && asp.b === a))
  );

  const patterns = [];

  // Tam Giác Lớn: ba hành tinh chiếu tam phân vòng quanh, thường cùng nguyên tố.
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = j + 1; k < keys.length; k++) {
        const [a, b, c] = [keys[i], keys[j], keys[k]];
        if (has(a, b, 'trine') && has(b, c, 'trine') && has(a, c, 'trine')) {
          const elements = [a, b, c].map(x => SIGNS[byKey[x].signIndex].element);
          patterns.push({
            key: 'grandTrine',
            planets: [a, b, c],
            element: elements.every(e => e === elements[0]) ? elements[0] : null
          });
        }
      }
    }
  }

  // Chữ T: hai hành tinh xung đối, cả hai cùng vuông góc với một hành tinh thứ ba.
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      if (!has(keys[i], keys[j], 'opposition')) continue;
      for (const apex of keys) {
        if (apex === keys[i] || apex === keys[j]) continue;
        if (has(apex, keys[i], 'square') && has(apex, keys[j], 'square')) {
          patterns.push({ key: 'tSquare', planets: [keys[i], keys[j], apex], apex });
        }
      }
    }
  }

  // Yod: hai hành tinh lục phân, cùng bất hợp với một hành tinh thứ ba.
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      if (!has(keys[i], keys[j], 'sextile')) continue;
      for (const apex of keys) {
        if (apex === keys[i] || apex === keys[j]) continue;
        if (has(apex, keys[i], 'quincunx') && has(apex, keys[j], 'quincunx')) {
          patterns.push({ key: 'yod', planets: [keys[i], keys[j], apex], apex });
        }
      }
    }
  }

  // Chùm sao: từ ba hành tinh trở lên dồn vào cùng một cung.
  const bySign = {};
  planets.forEach(p => {
    (bySign[p.signIndex] = bySign[p.signIndex] || []).push(p.key);
  });
  Object.entries(bySign).forEach(([signIndex, members]) => {
    if (members.length >= 3) {
      patterns.push({ key: 'stellium', planets: members, signIndex: Number(signIndex) });
    }
  });

  return patterns;
};

/* ------------------------------------------------------------------ */
/* CÂN BẰNG                                                            */
/* ------------------------------------------------------------------ */
const emptyTally = (keys) => Object.fromEntries(keys.map(k => [k, 0]));

export const calcBalances = (weightedPoints) => {
  const elements = emptyTally(['fire', 'earth', 'air', 'water']);
  const modalities = emptyTally(['cardinal', 'fixed', 'mutable']);
  const polarities = emptyTally(['yang', 'yin']);
  let total = 0;

  weightedPoints.forEach(({ signIndex, weight }) => {
    const sign = SIGNS[signIndex];
    elements[sign.element] += weight;
    modalities[sign.modality] += weight;
    polarities[sign.polarity] += weight;
    total += weight;
  });

  const pct = (tally) => Object.fromEntries(
    Object.entries(tally).map(([k, v]) => [k, total ? Math.round((v / total) * 1000) / 10 : 0])
  );

  const topOf = (tally) => Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
  const bottomOf = (tally) => Object.entries(tally).sort((a, b) => a[1] - b[1])[0];

  return {
    total,
    elements, elementPct: pct(elements),
    modalities, modalityPct: pct(modalities),
    polarities, polarityPct: pct(polarities),
    dominantElement: topOf(elements),
    dominantModality: topOf(modalities),
    dominantPolarity: topOf(polarities),
    // Chỉ gọi là "thiếu" khi thực sự dưới 10% tổng trọng số, không phải chỉ vì
    // đứng cuối bảng - lá số cân bằng đều thì không thiếu nguyên tố nào cả.
    lackingElement: (() => {
      const [key, value] = bottomOf(elements);
      return total && value / total < 0.1 ? key : null;
    })()
  };
};

/* Phân bố nhà theo nửa trên/dưới và Đông/Tây. */
export const calcHemispheres = (planetsInHouses) => {
  const tally = { lower: 0, upper: 0, east: 0, west: 0 };

  planetsInHouses.forEach(({ house }) => {
    if (!house) return;
    if (house <= 6) tally.lower++; else tally.upper++;
    if (house >= 10 || house <= 3) tally.east++; else tally.west++;
  });

  const counted = tally.lower + tally.upper;
  return {
    ...tally,
    counted,
    verticalDominant: tally.upper === tally.lower ? null : (tally.upper > tally.lower ? 'upper' : 'lower'),
    horizontalDominant: tally.east === tally.west ? null : (tally.east > tally.west ? 'east' : 'west')
  };
};

/* ------------------------------------------------------------------ */
/* MIẾU VƯỢNG HÃM RƠI                                                  */
/* ------------------------------------------------------------------ */
export const dignityOf = (planetKey, signIndex) => {
  const table = DIGNITIES[planetKey];
  if (!table) return 'peregrine';
  const signKey = SIGNS[signIndex].key;

  if (table.rulership.includes(signKey)) return 'rulership';
  if (table.exaltation.includes(signKey)) return 'exaltation';
  if (table.fall.includes(signKey)) return 'fall';
  if (table.detriment.includes(signKey)) return 'detriment';
  return 'peregrine';
};

/* ------------------------------------------------------------------ */
/* LÁ SỐ HOÀN CHỈNH                                                    */
/* ------------------------------------------------------------------ */

/* birthTime để trống là chuyện thường gặp: rất nhiều người Việt không có giờ
   sinh trên giấy tờ. Khi đó vẫn dựng được vị trí hành tinh (lấy mốc 12h trưa
   cho sai số nhỏ nhất) nhưng không có Cung Mọc và không chia nhà - và phải nói
   thẳng điều đó ra thay vì lặng lẽ dùng một giờ bịa. */
export const calcNatalChart = ({
  birthDate,
  birthTime = null,
  latitude = 21.0278,
  longitude = 105.8342,
  timeZone = 'Asia/Ho_Chi_Minh',
  offsetMinutes,
  houseSystem = 'placidus'
}) => {
  const [yearStr, monthStr, dayStr] = String(birthDate || '').split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (!year || !month || !day) return null;

  const hasTime = Boolean(birthTime);
  const [hourStr, minuteStr] = String(birthTime || '12:00').split(':');
  const hour = Number(hourStr);
  const minute = Number(minuteStr);

  const { date: utcDate, offsetMinutes: usedOffset } = localToUtc({
    year, month, day,
    hour: Number.isFinite(hour) ? hour : 12,
    minute: Number.isFinite(minute) ? minute : 0,
    timeZone, offsetMinutes
  });

  const { astroTime, planets: rawPlanets } = getPlanetPositions(utcDate);
  const obliquity = meanObliquity(astroTime);

  const notes = [];
  let ramc = null;
  let asc = null;
  let mc = null;
  let cusps = null;
  let usedHouseSystem = null;

  if (hasTime) {
    ramc = localSiderealDegrees(utcDate, longitude);
    mc = calcMc(ramc, obliquity);
    asc = calcAsc(ramc, obliquity, latitude);

    let requested = houseSystem;
    if (requested === 'placidus' && Math.abs(latitude) > PLACIDUS_LIMIT) {
      requested = 'whole';
      notes.push('placidusPolar');
    }

    cusps = calcHouseCusps(requested, { ramc, obliquity, latitude, asc, mc });
    if (!cusps && requested !== 'whole') {
      cusps = calcHouseCusps('whole', { ramc, obliquity, latitude, asc, mc });
      requested = 'whole';
      notes.push('placidusFallback');
    }
    usedHouseSystem = requested;
  } else {
    notes.push('noBirthTime');
  }

  // Hành tinh, kèm cung - nhà - phẩm chất.
  const planets = rawPlanets.map(p => {
    const signIndex = signIndexOf(p.lon);
    return {
      ...p,
      signIndex,
      signKey: SIGNS[signIndex].key,
      position: formatPosition(p.lon),
      house: houseOfLongitude(p.lon, cusps),
      dignity: dignityOf(p.key, signIndex),
      orbBonus: PLANETS[p.key]?.orbBonus || 0
    };
  });

  const realPlanets = planets.filter(p => PLANET_ORDER.includes(p.key));

  // Bốn góc được đưa vào danh sách tính góc chiếu như một thiên thể: hành tinh
  // dính Cung Mọc hay Thiên Đỉnh là một trong những chi tiết nặng ký nhất.
  const anglePoints = hasTime ? [
    { key: 'asc', lon: asc, orbBonus: 1 },
    { key: 'mc', lon: mc, orbBonus: 1 },
    { key: 'dsc', lon: norm360(asc + 180), orbBonus: 0 },
    { key: 'ic', lon: norm360(mc + 180), orbBonus: 0 }
  ].map(pt => ({
    ...pt,
    signIndex: signIndexOf(pt.lon),
    signKey: SIGNS[signIndexOf(pt.lon)].key,
    position: formatPosition(pt.lon),
    house: null
  })) : [];

  // Cung Lặn và Thiên Để không tự sinh thêm thông tin nào ngoài hai góc kia,
  // nên chỉ đưa Mọc và Đỉnh vào lưới góc chiếu cho bảng khỏi nhân đôi.
  const aspects = calcAspects([
    ...planets,
    ...anglePoints.filter(p => p.key === 'asc' || p.key === 'mc')
  ]);

  const patterns = findPatterns(realPlanets, aspects);

  const weightedPoints = [
    ...realPlanets.map(p => ({ signIndex: p.signIndex, weight: WEIGHTS[p.key] || 1 })),
    ...(hasTime ? [
      { signIndex: signIndexOf(asc), weight: WEIGHTS.asc },
      { signIndex: signIndexOf(mc), weight: WEIGHTS.mc }
    ] : [])
  ];

  const balances = calcBalances(weightedPoints);
  const hemispheres = hasTime ? calcHemispheres(realPlanets) : null;

  // Chủ tinh lá số: hành tinh cai quản cung Mọc. Đây là "người quản gia" của
  // toàn bộ lá số - vị trí của nó nhuộm màu mọi thứ còn lại.
  const chartRulerKey = hasTime ? SIGNS[signIndexOf(asc)].ruler : null;
  const chartRuler = chartRulerKey ? planets.find(p => p.key === chartRulerKey) : null;

  // Điểm Phúc (Part of Fortune): lá số ban ngày và ban đêm đảo công thức cho
  // nhau - Mặt Trời trên chân trời (nhà 7-12) là ban ngày.
  let partOfFortune = null;
  if (hasTime && cusps) {
    const sun = planets.find(p => p.key === 'sun');
    const moon = planets.find(p => p.key === 'moon');
    const isDay = sun.house >= 7;
    const lon = norm360(isDay ? asc + moon.lon - sun.lon : asc + sun.lon - moon.lon);
    partOfFortune = {
      key: 'partOfFortune',
      lon,
      isDay,
      signIndex: signIndexOf(lon),
      position: formatPosition(lon),
      house: houseOfLongitude(lon, cusps)
    };
  }

  const houses = cusps ? cusps.map((cusp, i) => ({
    num: i + 1,
    cusp,
    signIndex: signIndexOf(cusp),
    position: formatPosition(cusp),
    rulerKey: SIGNS[signIndexOf(cusp)].ruler,
    meta: HOUSES[i],
    // Hành tinh nằm trong nhà này, sắp theo kinh độ để đọc từ đỉnh nhà đi tới.
    occupants: planets
      .filter(p => p.house === i + 1)
      .sort((a, b) => norm360(a.lon - cusp) - norm360(b.lon - cusp))
      .map(p => p.key)
  })) : null;

  return {
    input: { birthDate, birthTime, latitude, longitude, timeZone, hasTime },
    utcDate,
    offsetMinutes: usedOffset,
    offsetLabel: formatOffset(usedOffset),
    obliquity,
    ramc,
    hasTime,
    houseSystem: usedHouseSystem,
    notes,
    angles: hasTime ? {
      asc, mc,
      dsc: norm360(asc + 180),
      ic: norm360(mc + 180),
      ascSign: signIndexOf(asc),
      mcSign: signIndexOf(mc),
      ascPosition: formatPosition(asc),
      mcPosition: formatPosition(mc),
      dscPosition: formatPosition(norm360(asc + 180)),
      icPosition: formatPosition(norm360(mc + 180))
    } : null,
    anglePoints,
    planets,
    realPlanets,
    houses,
    aspects,
    patterns,
    balances,
    hemispheres,
    chartRuler,
    partOfFortune,
    retrogrades: realPlanets.filter(p => p.retrograde).map(p => p.key)
  };
};
