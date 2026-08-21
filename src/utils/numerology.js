// Engine Thần Số Học theo hệ Pythagoras.
//
// Điểm dễ sai nhất với người Việt là bảng chữ cái: "Nguyễn Thị Hoà" phải được
// đưa về "NGUYEN THI HOA" trước khi tra số, nếu không các ký tự có dấu sẽ rơi
// ra ngoài bảng A-Z và mọi chỉ số đều lệch.

import {
  NUMBER_MEANINGS,
  PERSONAL_YEAR,
  PERSONAL_MONTH,
  BIRTH_CHART_CELLS,
  BIRTH_CHART_ARROWS
} from '../data/numerologyData.js';

const MASTER_NUMBERS = [11, 22, 33];

/* Bỏ dấu tiếng Việt và đưa về chữ in hoa không dấu.
   Đ/đ không tách được bằng NFD nên phải thay riêng trước khi chuẩn hoá. */
export const normalizeName = (name = '') =>
  name
    .replace(/Đ/g, 'D')
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

// Bảng Pythagoras: A=1..I=9, J=1..R=9, S=1..Z=8
const letterValue = (ch) => {
  const code = ch.charCodeAt(0);
  if (code < 65 || code > 90) return 0;
  return ((code - 65) % 9) + 1;
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

/* Rút gọn về một chữ số, nhưng dừng lại ở 11/22/33 vì đó là số bậc thầy.
   keepMaster=false dùng cho những chỉ số không giữ số bậc thầy (năm cá nhân). */
export const reduceNumber = (n, keepMaster = true) => {
  let value = Math.abs(Math.trunc(n));
  while (value > 9) {
    if (keepMaster && MASTER_NUMBERS.includes(value)) return value;
    value = String(value).split('').reduce((sum, d) => sum + Number(d), 0);
  }
  return value;
};

export const isMasterNumber = (n) => MASTER_NUMBERS.includes(n);

/* Y được tính là nguyên âm khi đứng một mình trong âm tiết (không có nguyên âm
   nào khác cạnh nó). Cách xử lý phổ thông và đủ dùng cho tên Việt - Anh. */
const splitLetters = (normalized) => {
  const letters = normalized.replace(/ /g, '').split('');
  const vowels = [];
  const consonants = [];

  letters.forEach((ch, i) => {
    if (VOWELS.has(ch)) {
      vowels.push(ch);
    } else if (ch === 'Y') {
      const prev = letters[i - 1];
      const next = letters[i + 1];
      const nextToVowel = (prev && VOWELS.has(prev)) || (next && VOWELS.has(next));
      if (nextToVowel) consonants.push(ch);
      else vowels.push(ch);
    } else {
      consonants.push(ch);
    }
  });

  return { letters, vowels, consonants };
};

const sumLetters = (arr) => arr.reduce((sum, ch) => sum + letterValue(ch), 0);

/* Số Đường Đời: cộng riêng ngày, tháng, năm rồi mới cộng lại. Cách này giữ
   được số bậc thầy ở từng thành phần (VD ngày 29 -> 11), khác với cách cộng
   dồn toàn bộ chữ số. */
export const calcLifePath = (day, month, year) => {
  const d = reduceNumber(day);
  const m = reduceNumber(month);
  const y = reduceNumber(year);
  return reduceNumber(d + m + y);
};

/* Năm cá nhân = ngày sinh + tháng sinh + năm cần xem, luôn rút về 1-9.
   Không giữ số bậc thầy: 11 hay 22 ở đây là nhịp của năm chứ không phải một
   tầng rung động cao hơn, nên rút hết cho đồng nhất với bảng tra 9 mục. */
export const calcPersonalYear = (birthDay, birthMonth, targetYear) =>
  reduceNumber(
    reduceNumber(birthDay, false) + reduceNumber(birthMonth, false) + reduceNumber(targetYear, false),
    false
  );

/* Tháng cá nhân = năm cá nhân + số thứ tự tháng dương lịch (1-12). */
export const calcPersonalMonth = (personalYear, calendarMonth) =>
  reduceNumber(personalYear + calendarMonth, false);

/* Dự báo một năm bất kỳ: con số của năm kèm nhịp của cả 12 tháng.
   Tách khỏi calcNumerologyProfile để đổi năm không phải tính lại toàn bộ hồ sơ
   (họ tên, biểu đồ ngày sinh... đều không đổi theo năm). */
export const calcYearForecast = (birthDay, birthMonth, targetYear, lang = 'vi') => {
  if (!birthDay || !birthMonth || !targetYear) return null;

  const yearTable = PERSONAL_YEAR[lang] || PERSONAL_YEAR.vi;
  const monthTable = PERSONAL_MONTH[lang] || PERSONAL_MONTH.vi;

  const personalYear = calcPersonalYear(birthDay, birthMonth, targetYear);

  const months = Array.from({ length: 12 }, (_, i) => {
    const calendarMonth = i + 1;
    const value = calcPersonalMonth(personalYear, calendarMonth);
    return {
      calendarMonth,
      value,
      title: monthTable[value].title,
      summary: monthTable[value].summary
    };
  });

  return {
    year: targetYear,
    personalYear,
    info: yearTable[personalYear],
    months
  };
};

/* Tính toàn bộ hồ sơ thần số học từ họ tên + ngày sinh.
   birthDate ở dạng chuỗi 'YYYY-MM-DD' (giá trị của input type=date).

   Chỉ chứa những chỉ số cố định suốt đời. Phần đổi theo năm (năm cá nhân,
   tháng cá nhân) nằm ở calcYearForecast để đổi năm không phải tính lại tên và
   biểu đồ ngày sinh. */
/* Bốn Đỉnh Cuộc Đời và bốn Thử Thách.

   Đây là mảng chu kỳ dài của Pythagoras, khác hẳn Năm/Tháng cá nhân vốn chỉ
   nói về nhịp ngắn. Đỉnh cho biết cơ hội và chủ đề của cả một giai đoạn nhiều
   năm; Thử Thách nói cái giá phải trả để đi qua chính giai đoạn ấy. Hai thứ
   luôn đi cặp và được tính từ cùng một bộ ba số, chỉ khác phép toán: Đỉnh lấy
   tổng, Thử Thách lấy hiệu tuyệt đối.

   Ba thành phần phải rút hết về một chữ số trước khi cộng trừ. Giữ lại số bậc
   thầy ở bước này sẽ làm hỏng phép trừ của Thử Thách - hiệu của 11 và 3 không
   có nghĩa gì trong hệ 0-8.

   Riêng Thử Thách không rút gọn tiếp: hiệu của hai số 1-9 vốn đã nằm trong
   khoảng 0-8, và số 0 ở đây là kết quả hợp lệ chứ không phải lỗi - nó mang
   nghĩa riêng, khác hẳn mọi chỉ số còn lại của thần số học vốn không có số 0. */
export const calcPinnacles = (day, month, year, lifePath) => {
  const m = reduceNumber(month, false);
  const d = reduceNumber(day, false);
  const y = reduceNumber(year, false);

  const p1 = reduceNumber(m + d);
  const p2 = reduceNumber(d + y);
  const p3 = reduceNumber(p1 + p2);
  const p4 = reduceNumber(m + y);

  const c1 = Math.abs(m - d);
  const c2 = Math.abs(d - y);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(m - y);

  /* Đỉnh đầu kéo dài tới năm 36 trừ Số Đường Đời tuổi, nên luôn rơi vào
     khoảng 27-35. Số Đường Đời là số bậc thầy thì rút về một chữ số ở riêng
     phép tính này (11 thành 2, 22 thành 4), nếu không mốc chuyển sẽ rơi vào
     tuổi 25 hay 14 - vô lý với một chu kỳ đời người.
     Ba đỉnh sau mỗi đỉnh đúng chín năm, đỉnh cuối kéo tới hết đời. */
  const firstEnd = 36 - reduceNumber(lifePath, false);

  return [
    { index: 1, pinnacle: p1, challenge: c1, fromAge: 0, toAge: firstEnd - 1 },
    { index: 2, pinnacle: p2, challenge: c2, fromAge: firstEnd, toAge: firstEnd + 8 },
    { index: 3, pinnacle: p3, challenge: c3, fromAge: firstEnd + 9, toAge: firstEnd + 17 },
    { index: 4, pinnacle: p4, challenge: c4, fromAge: firstEnd + 18, toAge: null }
  ];
};

/* Tuổi tròn tính tới hôm nay. Dùng để tô sáng đúng giai đoạn người xem đang
   sống - phần có ích nhất của cả khối chu kỳ. */
export const getCurrentAge = (birthDate, at = new Date()) => {
  const [yearStr, monthStr, dayStr] = String(birthDate || '').split('-');
  const y = Number(yearStr);
  const m = Number(monthStr);
  const d = Number(dayStr);
  if (!y || !m || !d) return null;

  let age = at.getFullYear() - y;
  // Chưa tới sinh nhật trong năm nay thì chưa tính thêm một tuổi.
  const beforeBirthday = at.getMonth() + 1 < m || (at.getMonth() + 1 === m && at.getDate() < d);
  if (beforeBirthday) age -= 1;
  return age < 0 ? null : age;
};

/* Giai đoạn đang sống. Trả về null khi chưa biết tuổi. */
export const findActivePinnacle = (pinnacles, age) => {
  if (age === null || age === undefined) return null;
  return pinnacles.find(p => age >= p.fromAge && (p.toAge === null || age <= p.toAge)) || null;
};

export const calcNumerologyProfile = (fullName, birthDate, lang = 'vi') => {
  const normalized = normalizeName(fullName);
  const [yearStr, monthStr, dayStr] = String(birthDate || '').split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (!normalized || !year || !month || !day) return null;

  const { letters, vowels, consonants } = splitLetters(normalized);

  const lifePath = calcLifePath(day, month, year);
  const expression = reduceNumber(sumLetters(letters));

  // Thần số học không có con số 0. Tên chỉ gồm phụ âm (viết tắt kiểu "TN") hay
  // chỉ gồm nguyên âm sẽ cho tổng 0 và làm hỏng cả bảng tra, nên trường hợp đó
  // lấy toàn bộ chữ cái thay cho nhóm rỗng.
  const soulUrge = reduceNumber(sumLetters(vowels.length ? vowels : letters));
  const personality = reduceNumber(sumLetters(consonants.length ? consonants : letters));
  const birthday = reduceNumber(day);
  const attitude = reduceNumber(reduceNumber(day) + reduceNumber(month));
  const maturity = reduceNumber(lifePath + expression);

  const meanings = NUMBER_MEANINGS[lang] || NUMBER_MEANINGS.vi;

  const core = [
    { key: 'lifePath', value: lifePath, field: 'lifePath' },
    { key: 'expression', value: expression, field: 'expression' },
    { key: 'soulUrge', value: soulUrge, field: 'soulUrge' },
    { key: 'personality', value: personality, field: 'personality' },
    { key: 'birthday', value: birthday, field: 'overview' },
    { key: 'attitude', value: attitude, field: 'overview' },
    { key: 'maturity', value: maturity, field: 'overview' }
  ].map(item => {
    const meaning = meanings[item.value] || meanings[9];
    return {
      ...item,
      title: meaning.title,
      icon: meaning.icon,
      keywords: meaning.keywords,
      text: meaning[item.field],
      isMaster: isMasterNumber(item.value)
    };
  });

  return {
    normalizedName: normalized,
    day,
    month,
    year,
    lifePath,
    expression,
    soulUrge,
    personality,
    birthday,
    attitude,
    maturity,
    core,
    lifePathMeaning: meanings[lifePath] || meanings[9],
    birthChart: calcBirthChart(day, month, year, lang),
    pinnacles: calcPinnacles(day, month, year, lifePath)
  };
};

/* Biểu đồ ngày sinh (Lo Shu): đếm số lần mỗi chữ số 1-9 xuất hiện trong toàn
   bộ ngày/tháng/năm sinh. Chữ số 0 không có ô trên bàn nên bị bỏ qua. */
export const calcBirthChart = (day, month, year, lang = 'vi') => {
  const digits = `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${year}`
    .split('')
    .map(Number)
    .filter(d => d > 0);

  const counts = {};
  for (let i = 1; i <= 9; i += 1) counts[i] = 0;
  digits.forEach(d => { counts[d] += 1; });

  const cells = BIRTH_CHART_CELLS[lang] || BIRTH_CHART_CELLS.vi;

  // Bàn Lo Shu chuẩn, đọc từ trái sang phải theo hàng.
  const layout = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  const grid = layout.map(num => ({
    number: num,
    count: counts[num],
    label: cells[num].label,
    text: counts[num] > 0 ? cells[num].present : cells[num].missing
  }));

  const arrows = [];
  BIRTH_CHART_ARROWS.forEach(arrow => {
    const allPresent = arrow.cells.every(n => counts[n] > 0);
    const allMissing = arrow.cells.every(n => counts[n] === 0);
    const copy = arrow[lang] || arrow.vi;
    if (allPresent) arrows.push({ id: arrow.id, type: 'strong', name: copy.name, text: copy.strong, cells: arrow.cells });
    else if (allMissing) arrows.push({ id: arrow.id, type: 'weak', name: copy.name, text: copy.weak, cells: arrow.cells });
  });

  const missing = Object.keys(counts).filter(n => counts[n] === 0).map(Number);

  return { counts, grid, arrows, missing };
};
