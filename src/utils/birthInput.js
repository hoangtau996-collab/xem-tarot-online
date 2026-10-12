/* Định dạng và kiểm tra ngày/giờ sinh khách gõ tay - dùng cho các ô trong
   components/BirthInputs.jsx. Hồ sơ vẫn lưu ISO (YYYY-MM-DD, HH:MM). */

export const MIN_BIRTH_YEAR = 1900;

/* Ghép các chữ số khách gõ thành khuôn có dấu ngăn. Khách tự gõ dấu ngăn sau
   một chữ số ("2/4/1990", "7:30", "7h30") thì hiểu là có số 0 đứng trước. */
const maskDigits = (raw, groups, sep) => {
  const parts = String(raw).split(/\D+/);
  // Vị trí bắt đầu của từng nhóm: ngày/tháng/năm -> [0, 2, 4].
  const starts = groups.map((_, i) => groups.slice(0, i).reduce((a, b) => a + b, 0));
  const maxLen = groups.reduce((a, b) => a + b, 0);

  let digits = '';
  parts.forEach((part, i) => {
    const followedBySep = i < parts.length - 1;
    const groupIdx = starts.indexOf(digits.length);
    // Chỉ đệm số 0 cho các nhóm trước nhóm cuối (không đệm năm hay phút).
    if (followedBySep && groupIdx > -1 && groupIdx < groups.length - 1 && part.length > 0) {
      part = part.padStart(groups[groupIdx], '0');
    }
    digits += part;
  });
  digits = digits.slice(0, maxLen);

  let out = '';
  let pos = 0;
  groups.forEach((size, i) => {
    if (pos >= digits.length) return;
    if (i > 0) out += sep;
    out += digits.slice(pos, pos + size);
    pos += size;
  });
  return out;
};

export const maskDate = (raw) => maskDigits(raw, [2, 2, 4], '/');
export const maskTime = (raw) => maskDigits(raw, [2, 2], ':');

/* "2026-04-02" -> "02/04/2026"; giá trị hỏng thì trả rỗng. */
export const isoToDmy = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
};

/* "02/04/1990" -> "1990-04-02"; ngày không có thật hoặc năm ngoài khoảng
   hợp lệ thì trả null. Không kiểm ngày tương lai - form tự báo lỗi riêng. */
export const dmyToIso = (text) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text || '');
  if (!m) return null;
  const d = Number(m[1]);
  const mo = Number(m[2]);
  const y = Number(m[3]);
  if (y < MIN_BIRTH_YEAR || mo < 1 || mo > 12 || d < 1) return null;
  const daysInMonth = new Date(Date.UTC(y, mo, 0)).getUTCDate();
  if (d > daysInMonth) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
};

/* "7:30" đã qua mask thành "07:30"; giờ quá 23 hoặc phút quá 59 thì null. */
export const parseTime = (text) => {
  const m = /^(\d{2}):(\d{2})$/.exec(text || '');
  if (!m) return null;
  if (Number(m[1]) > 23 || Number(m[2]) > 59) return null;
  return text;
};
