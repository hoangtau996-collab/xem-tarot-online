// Nhật ký: nơi duy nhất đọc và ghi kho bản ghi của khách.
//
// Trước đây khoá 'celestial_tarot_journal' được viết lại ở năm chỗ - bốn hằng
// số trong bốn component, cộng một chuỗi gõ thẳng trong ReadingResult. Đổi một
// chỗ mà quên chỗ còn lại là khách mất sạch nhật ký, mà lỗi kiểu đó không có
// công cụ nào bắt được. Gom về một nơi.
//
// Mọi hàm ở đây đều không ném lỗi ra ngoài: localStorage bị chặn ở chế độ
// riêng tư, và một mục nhật ký hỏng không đáng làm trắng cả trang.

const JOURNAL_KEY = 'celestial_tarot_journal';

/* Trần số bản ghi. Mỗi mục chỉ vài trăm byte nên hàng nghìn mục mới chạm hạn
   mức của trình duyệt - trần này không phải để chống tràn, mà để kho không
   phình vô hạn theo năm tháng. 200 mục là hơn nửa năm ghi mỗi ngày. */
const MAX_ENTRIES = 200;

export const readJournal = () => {
  try {
    const data = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return []; // dữ liệu hỏng hoặc localStorage bị chặn
  }
};

/* Ghi một mục lên đầu. Mục nào đã có sẵn cùng id thì THAY, không thêm bản mới.
 *
 * Cần vậy vì một phiên trải bài được ghi hai lần: tự lưu ngay lúc bản giải
 * hiện ra (để khách đóng tab vẫn còn), rồi ghi lại lần nữa nếu khách gõ thêm
 * ghi chú. Cứ nối vào đầu như trước thì cùng một phiên nằm hai chỗ trong nhật
 * ký, bản có ghi chú và bản không.
 *
 * Trả về true/false chứ không nuốt lỗi: nút Lưu phải biết mà báo cho khách,
 * thay vì bấm xong không thấy gì xảy ra. */
export const saveJournalEntry = (entry) => {
  try {
    const rest = readJournal().filter(e => e.id !== entry.id);
    const next = [entry, ...rest].slice(0, MAX_ENTRIES);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(next));
    return true;
  } catch (err) {
    console.error('Không lưu được mục nhật ký', err);
    return false;
  }
};

export const removeJournalEntry = (id) => {
  const next = readJournal().filter(e => e.id !== id);
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(next));
  } catch (err) {
    console.error('Không xoá được mục nhật ký', err);
  }
  return next;
};

export const clearJournal = () => {
  try {
    localStorage.removeItem(JOURNAL_KEY);
  } catch (err) {
    console.error('Không xoá được nhật ký', err);
  }
};
