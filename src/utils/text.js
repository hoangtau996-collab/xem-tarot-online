// Xử lý chuỗi tiếng Việt cho việc tìm kiếm.

/* Bỏ dấu để gõ "da nang" hay "Đà Nẵng" đều tìm ra.
   NFD tách được dấu thanh và dấu mũ, nhưng chữ đ/Đ là một ký tự riêng chứ
   không phải d có dấu, nên phải thay tay.

   Hàm này trước đây nằm trong data/cities.js và chỉ ô tìm nơi sinh dùng. Đưa
   ra đây vì nó không dính gì tới thành phố: mọi ô tìm kiếm trên trang đều cần
   nó. Phần lớn người dùng gõ tiếng Việt trên điện thoại không bỏ dấu, nên một
   ô tìm kiếm so khớp nguyên văn thì với họ là một ô hỏng. */
export const foldAccents = (text = '') =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
