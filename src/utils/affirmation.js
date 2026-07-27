// Bốc thông điệp khẳng định từ Vũ Trụ cho quả cầu ma thuật (xem CosmicOrb).

import { AFFIRMATIONS } from '../data/affirmations.js';

const LAST_INDEX_KEY = 'phealing_last_affirmation_index';

/* Trả về CHỈ SỐ chứ không trả về câu chữ: ba ngôn ngữ trong AFFIRMATIONS song
   song theo chỉ số, nên giữ chỉ số thì khách đổi ngôn ngữ vẫn thấy đúng thông
   điệp đang mở. Loại trừ chỉ số của lần chạm liền trước (nhớ qua localStorage
   nên kể cả lần truy cập trước cũng không lặp lại ngay). */
export const pickAffirmationIndex = () => {
  const total = AFFIRMATIONS.vi.length;

  let previous = -1;
  try {
    previous = Number.parseInt(localStorage.getItem(LAST_INDEX_KEY), 10);
  } catch {
    /* localStorage bị chặn hoặc chạy ngoài trình duyệt - bỏ qua */
  }
  if (!Number.isInteger(previous) || previous < 0 || previous >= total) {
    previous = -1;
  }

  // Bốc trong (total - 1) ứng viên rồi đẩy chỉ số lên 1 khi chạm vào câu cũ:
  // cách này vẫn đều xác suất mà chắc chắn không trùng câu trước.
  let chosen;
  if (previous >= 0 && total > 1) {
    chosen = Math.floor(Math.random() * (total - 1));
    if (chosen >= previous) chosen += 1;
  } else {
    chosen = Math.floor(Math.random() * total);
  }

  try {
    localStorage.setItem(LAST_INDEX_KEY, String(chosen));
  } catch {
    /* bỏ qua */
  }

  return chosen;
};

/* Lấy câu theo chỉ số, tự lùi về tiếng Việt nếu ngôn ngữ chưa có bản dịch. */
export const getAffirmationAt = (index, lang = 'vi') => {
  const pool = AFFIRMATIONS[lang] || AFFIRMATIONS.vi;
  return pool[index] || AFFIRMATIONS.vi[index] || '';
};
