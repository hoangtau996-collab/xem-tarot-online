// Engine thiên văn cho bản đồ sao: đổi giờ sinh địa phương sang UTC rồi lấy
// kinh độ hoàng đạo của mười thiên thể tại đúng khoảnh khắc đó.
//
// Vì sao dùng astronomy-engine chứ không tự viết công thức: vị trí hành tinh
// đòi hỏi chuỗi nhiễu loạn dài, tự chép tay rất dễ sai một dấu mà không ai
// phát hiện - sai một độ là lệch cả cung. Thư viện này (MIT, không phụ thuộc
// gì thêm) cho sai số dưới một giây cung và đã được đối chiếu với JPL.
//
// Ecliptic() của thư viện trả toạ độ theo hoàng đạo thật của ngày sinh (ECT),
// đúng thứ chiêm tinh cần - không phải hệ J2000 cố định.

import { Body, GeoVector, Ecliptic, MakeTime, SiderealTime } from 'astronomy-engine';

/* Mười thiên thể theo thứ tự truyền thống: hai đèn trời trước, rồi các hành
   tinh cá nhân, xã hội và thế hệ. Thứ tự này dùng chung cho bảng vị trí, vòng
   bản đồ và phần luận giải nên chỉ cần sửa ở đây. */
export const PLANET_ORDER = [
  'sun', 'moon', 'mercury', 'venus', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'
];

const BODY_MAP = {
  sun: Body.Sun,
  moon: Body.Moon,
  mercury: Body.Mercury,
  venus: Body.Venus,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
  uranus: Body.Uranus,
  neptune: Body.Neptune,
  pluto: Body.Pluto
};

export const norm360 = (deg) => ((deg % 360) + 360) % 360;

/* Khoảng cách góc ngắn nhất giữa hai điểm trên vòng tròn, luôn nằm trong
   [-180, 180]. Dùng cho cả tốc độ hành tinh lẫn sai lệch góc chiếu. */
export const angleDiff = (a, b) => {
  const d = norm360(a - b);
  return d > 180 ? d - 360 : d;
};

const DEG = Math.PI / 180;
export const toRad = (deg) => deg * DEG;
export const toDeg = (rad) => rad / DEG;

/* Độ nghiêng trục Trái Đất tại thời điểm sinh (độ nghiêng trung bình, IAU 2006).
   Bỏ qua chương động vì biên độ tối đa chỉ 9 giây cung - nhỏ hơn nhiều so với
   sai số của một phút giờ sinh nhớ nhầm. */
export const meanObliquity = (astroTime) => {
  const T = astroTime.tt / 36525;
  return 23.439291111
    - 0.0130041667 * T
    - 1.6667e-7 * T * T
    + 5.02778e-7 * T * T * T;
};

/* Điểm nút Mặt Trăng phía Bắc (La Hầu / North Node) - giao điểm quỹ đạo Mặt
   Trăng với hoàng đạo. Đây là một điểm hình học chứ không phải thiên thể nên
   thư viện không có sẵn; dùng đa thức nút trung bình của Meeus.
   Nút luôn đi lùi, nên coi như nghịch hành vĩnh viễn. */
export const meanLunarNode = (astroTime) => {
  const T = astroTime.tt / 36525;
  return norm360(
    125.0445479
    - 1934.1362891 * T
    + 0.0020754 * T * T
    + (T * T * T) / 467441
    - (T * T * T * T) / 60616000
  );
};

/* Kinh độ hoàng đạo của một thiên thể, nhìn từ tâm Trái Đất, đã hiệu chỉnh
   quang sai - đúng vị trí mà người trên mặt đất trông thấy. */
const eclipticLongitude = (key, astroTime) => {
  const vec = GeoVector(BODY_MAP[key], astroTime, true);
  return norm360(Ecliptic(vec).elon);
};

/* Tốc độ theo kinh độ (độ/ngày), lấy bằng sai phân trung tâm quanh thời điểm
   sinh. Dấu âm nghĩa là nghịch hành.
   Bước ±0,5 ngày là thoả hiệp: đủ rộng để sai số làm tròn không nhấn chìm tín
   hiệu, đủ hẹp để không bỏ sót ngày hành tinh đứng yên đổi chiều. */
const longitudeSpeed = (key, astroTime) => {
  const step = 0.5;
  const before = eclipticLongitude(key, MakeTime(astroTime.ut - step));
  const after = eclipticLongitude(key, MakeTime(astroTime.ut + step));
  return angleDiff(after, before) / (2 * step);
};

/* Vị trí mười thiên thể + điểm nút Bắc tại một thời điểm UTC. */
export const getPlanetPositions = (utcDate) => {
  const astroTime = MakeTime(utcDate);

  const planets = PLANET_ORDER.map(key => {
    const lon = eclipticLongitude(key, astroTime);
    const speed = longitudeSpeed(key, astroTime);
    return {
      key,
      lon,
      speed,
      // Mặt Trời và Mặt Trăng không bao giờ nghịch hành - chặn luôn cho chắc,
      // tránh trường hợp sai phân rơi đúng chỗ nhiễu số học.
      retrograde: key !== 'sun' && key !== 'moon' && speed < 0
    };
  });

  const nodeLon = meanLunarNode(astroTime);
  planets.push({ key: 'northNode', lon: nodeLon, speed: -0.0529539, retrograde: true });
  planets.push({ key: 'southNode', lon: norm360(nodeLon + 180), speed: -0.0529539, retrograde: true });

  return { astroTime, planets };
};

/* Giờ sao địa phương quy ra độ (RAMC) - góc giờ của điểm Xuân phân tại nơi
   sinh. Đây là đại lượng gốc để dựng Thiên Đỉnh và Cung Mọc. */
export const localSiderealDegrees = (utcDate, longitude) =>
  norm360(SiderealTime(utcDate) * 15 + longitude);

/* Độ lệch múi giờ (phút) của một múi giờ IANA tại một khoảnh khắc cụ thể.
   Đọc thẳng từ cơ sở dữ liệu múi giờ của trình duyệt nên có luôn cả giờ mùa hè
   lẫn các mốc lịch sử - ví dụ miền Nam Việt Nam dùng UTC+8 tới 13/6/1975. */
export const tzOffsetMinutesAt = (utcDate, timeZone) => {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    const parts = Object.fromEntries(dtf.formatToParts(utcDate).map(p => [p.type, p.value]));
    const asUtc = Date.UTC(
      Number(parts.year), Number(parts.month) - 1, Number(parts.day),
      Number(parts.hour) % 24, Number(parts.minute), Number(parts.second)
    );
    return Math.round((asUtc - utcDate.getTime()) / 60000);
  } catch {
    return null; // tên múi giờ lạ hoặc trình duyệt quá cũ - phía gọi tự lo phương án dự phòng
  }
};

/* Đổi giờ sinh địa phương sang UTC.
   Phải lặp hai lượt vì độ lệch múi giờ lại phụ thuộc chính cái mốc UTC ta đang
   đi tìm: đoán lần một bằng độ lệch tại mốc thô, rồi tính lại. Hai lượt là đủ
   cho mọi trường hợp trừ đúng giờ chuyển giao giờ mùa hè. */
export const localToUtc = ({ year, month, day, hour = 12, minute = 0, timeZone, offsetMinutes }) => {
  const naiveUtc = Date.UTC(year, month - 1, day, hour, minute, 0);

  if (Number.isFinite(offsetMinutes)) {
    return { date: new Date(naiveUtc - offsetMinutes * 60000), offsetMinutes };
  }

  let offset = tzOffsetMinutesAt(new Date(naiveUtc), timeZone);
  if (offset === null) return { date: new Date(naiveUtc - 7 * 60 * 60000), offsetMinutes: 420 };

  for (let i = 0; i < 2; i++) {
    const candidate = new Date(naiveUtc - offset * 60000);
    const refined = tzOffsetMinutesAt(candidate, timeZone);
    if (refined === null || refined === offset) break;
    offset = refined;
  }

  return { date: new Date(naiveUtc - offset * 60000), offsetMinutes: offset };
};

/* Hiển thị độ lệch múi giờ dạng UTC+07:00 để khách tự đối chiếu với giấy khai sinh. */
export const formatOffset = (minutes) => {
  const sign = minutes < 0 ? '-' : '+';
  const abs = Math.abs(minutes);
  return `UTC${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
};
