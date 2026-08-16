// Engine Huyền Học: Can Chi - Ngũ hành nạp âm - Cung phi Bát Trạch - Hoàng đạo.
//
// LƯU Ý VỀ NĂM ÂM LỊCH: tuổi Can Chi đổi vào tiết Lập Xuân (khoảng 4/2 dương
// lịch) chứ không phải 1/1. Người sinh trong tháng 1 và đầu tháng 2 vì thế
// thuộc về Can Chi của năm trước. Ở đây lấy mốc cố định 4/2 - sai số tối đa
// một ngày so với tiết khí thật, đủ chính xác cho mục đích tra cứu và luôn
// được ghi chú lại cho người dùng.

import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  NAP_AM,
  ELEMENTS,
  ELEMENT_GENERATES,
  ELEMENT_CONTROLS,
  TRIGRAMS,
  DIRECTION_NAMES,
  HOUSE_GROUPS,
  BAT_TRACH_ASPECTS,
  ZODIAC_SIGNS,
  TAM_HOP,
  TU_HANH_XUNG,
  LUC_HOP
} from '../data/metaphysicsData.js';

const LAP_XUAN_MONTH = 2;
const LAP_XUAN_DAY = 4;

/* Năm Can Chi hiệu lực: lùi một năm nếu sinh trước Lập Xuân. */
export const getLunarYear = (year, month, day) => {
  const beforeLapXuan = month < LAP_XUAN_MONTH || (month === LAP_XUAN_MONTH && day < LAP_XUAN_DAY);
  return beforeLapXuan ? year - 1 : year;
};

/* Chu kỳ hoa giáp bắt đầu từ Giáp Tý = năm 1984 (và 1924, 2044...).
   Cộng thêm bội số của 60 để phép chia dư luôn dương với năm trước Công nguyên
   hoặc các năm rất nhỏ. */
export const getCanChi = (lunarYear) => {
  const offset = ((lunarYear - 1984) % 60 + 60) % 60;
  const stem = HEAVENLY_STEMS[offset % 10];
  const branch = EARTHLY_BRANCHES[offset % 12];
  const napAm = NAP_AM[Math.floor(offset / 2)];
  return { offset, stem, branch, napAm, branchIndex: offset % 12 };
};

/* Cung phi Bát Trạch (số Kua).
   Rút gọn 4 chữ số của năm âm lịch về 1 chữ số, rồi:
     - Nam sinh trước 2000: 10 - a ; từ 2000: 9 - a
     - Nữ  sinh trước 2000: a + 5  ; từ 2000: a + 6
   Kua 5 không có quái riêng: nam quy về Khôn (2), nữ quy về Cấn (8). */
export const getKuaNumber = (lunarYear, gender = 'male') => {
  let sum = String(lunarYear).split('').reduce((s, d) => s + Number(d), 0);
  while (sum > 9) sum = String(sum).split('').reduce((s, d) => s + Number(d), 0);

  const after2000 = lunarYear >= 2000;
  let kua;
  if (gender === 'female') kua = after2000 ? sum + 6 : sum + 5;
  else kua = after2000 ? 9 - sum : 10 - sum;

  while (kua > 9) kua = String(kua).split('').reduce((s, d) => s + Number(d), 0);
  if (kua === 0) kua = 9;
  if (kua === 5) kua = gender === 'female' ? 8 : 2;

  return kua;
};

/* Quan hệ giữa hai quái trong Bát Trạch được xác định bằng việc so ba hào.
   Suy ra từ quy tắc biến hào nên không phải chép tay bảng 8x8 - đỡ sai sót. */
const RELATION_BY_DIFF = {
  '000': 'phucVi',
  '001': 'sinhKhi',    // đổi hào trên
  '010': 'tuyetMenh',  // đổi hào giữa
  '100': 'hoaHai',     // đổi hào dưới
  '011': 'nguQuy',     // đổi hào giữa + trên
  '101': 'lucSat',     // đổi hào dưới + trên
  '110': 'thienY',     // đổi hào dưới + giữa
  '111': 'dienNien'    // đổi cả ba hào
};

export const getBatTrachDirections = (kua) => {
  const self = TRIGRAMS[kua];
  if (!self) return [];

  return Object.values(TRIGRAMS).map(other => {
    const diff = self.lines.map((line, i) => (line === other.lines[i] ? '0' : '1')).join('');
    const aspectKey = RELATION_BY_DIFF[diff];
    return {
      aspectKey,
      aspect: BAT_TRACH_ASPECTS[aspectKey],
      direction: other.direction,
      directionName: DIRECTION_NAMES[other.direction],
      trigram: other
    };
  }).sort((a, b) => {
    // Hướng tốt lên trước, trong mỗi nhóm giữ thứ tự truyền thống.
    const order = ['sinhKhi', 'thienY', 'dienNien', 'phucVi', 'hoaHai', 'lucSat', 'nguQuy', 'tuyetMenh'];
    return order.indexOf(a.aspectKey) - order.indexOf(b.aspectKey);
  });
};

/* Cung hoàng đạo theo dương lịch.
   Mọi cung đều nằm gọn trong đúng hai tháng liền nhau, nên chỉ cần xét "từ ngày
   bắt đầu tới hết tháng đầu" hoặc "từ đầu tháng sau tới ngày kết thúc". Cách này
   đúng luôn cho Ma Kết dù cung đó vắt qua giao thừa (22/12 - 19/1). */
export const getZodiacSign = (month, day) =>
  ZODIAC_SIGNS.find(sign => {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay);
  }) || ZODIAC_SIGNS[0];

/* Quan hệ ngũ hành giữa mệnh của người xem và một hành bất kỳ. */
export const getElementRelation = (mine, other) => {
  if (mine === other) return 'same';
  if (ELEMENT_GENERATES[other] === mine) return 'generatedBy'; // other sinh mine
  if (ELEMENT_GENERATES[mine] === other) return 'generates';   // mine sinh other
  if (ELEMENT_CONTROLS[other] === mine) return 'controlledBy'; // other khắc mine
  if (ELEMENT_CONTROLS[mine] === other) return 'controls';     // mine khắc other
  return 'neutral';
};

/* Nhóm con giáp hợp / xung với địa chi đã cho. */
export const getAnimalGroups = (branchIndex) => {
  const tamHop = TAM_HOP.find(g => g.members.includes(branchIndex));
  const tuHanhXung = TU_HANH_XUNG.find(g => g.members.includes(branchIndex));
  const lucHopIndex = LUC_HOP[branchIndex];

  return {
    tamHop: tamHop
      ? { name: tamHop.name, animals: tamHop.members.filter(i => i !== branchIndex).map(i => EARTHLY_BRANCHES[i]) }
      : null,
    tuHanhXung: tuHanhXung
      ? { name: tuHanhXung.name, animals: tuHanhXung.members.filter(i => i !== branchIndex).map(i => EARTHLY_BRANCHES[i]) }
      : null,
    lucHop: EARTHLY_BRANCHES[lucHopIndex],
    // Xung trực tiếp: cách nhau 6 cung trên vòng 12 địa chi
    xungTrucTiep: EARTHLY_BRANCHES[(branchIndex + 6) % 12]
  };
};

/* Hồ sơ huyền học đầy đủ. birthDate dạng 'YYYY-MM-DD', gender 'male' | 'female'. */
export const calcMetaphysicsProfile = (birthDate, gender = 'male') => {
  const [yearStr, monthStr, dayStr] = String(birthDate || '').split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (!year || !month || !day) return null;

  const lunarYear = getLunarYear(year, month, day);
  const shiftedByLapXuan = lunarYear !== year;

  const canChi = getCanChi(lunarYear);
  const destinyElement = canChi.napAm.element;
  const elementInfo = ELEMENTS[destinyElement];

  const kua = getKuaNumber(lunarYear, gender);
  const trigram = TRIGRAMS[kua];
  const directions = getBatTrachDirections(kua);

  const zodiac = getZodiacSign(month, day);
  const animalGroups = getAnimalGroups(canChi.branchIndex);

  return {
    year,
    month,
    day,
    lunarYear,
    shiftedByLapXuan,
    gender,
    canChi,
    destinyElement,
    elementInfo,
    generates: ELEMENTS[ELEMENT_GENERATES[destinyElement]],
    generatedBy: ELEMENTS[Object.keys(ELEMENT_GENERATES).find(k => ELEMENT_GENERATES[k] === destinyElement)],
    controls: ELEMENTS[ELEMENT_CONTROLS[destinyElement]],
    controlledBy: ELEMENTS[Object.keys(ELEMENT_CONTROLS).find(k => ELEMENT_CONTROLS[k] === destinyElement)],
    kua,
    trigram,
    houseGroup: HOUSE_GROUPS[trigram.group],
    directions,
    goodDirections: directions.filter(d => d.aspect.good),
    badDirections: directions.filter(d => !d.aspect.good),
    zodiac,
    animalGroups
  };
};
