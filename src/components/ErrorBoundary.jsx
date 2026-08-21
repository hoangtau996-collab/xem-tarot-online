import React from 'react';

/* Lưới an toàn cho phần nội dung của từng mục.
 *
 * Vì sao cần: khi bất kỳ chỗ nào trong cây giao diện ném lỗi, React gỡ sạch
 * toàn bộ cây chứ không chỉ chỗ hỏng - khách nhận một trang trắng, mất luôn
 * thanh menu và không còn cách nào đi tiếp ngoài đóng tab. Với một trang đang
 * có khách thật thì đó là mất khách, không phải mất một tính năng.
 *
 * Bọc riêng phần nội dung mục (không bọc thanh điều hướng và chân trang) nên
 * khi một mục hỏng, khách vẫn bấm sang mục khác được như bình thường.
 *
 * Đây bắt buộc phải là class component: React chưa có hook nào thay được
 * componentDidCatch.
 *
 * Cách đặt lại sau khi hỏng: phía App gắn thuộc tính key bằng tên mục đang mở,
 * nên đổi mục là React dựng lại hẳn khối này với trạng thái sạch. Gọn hơn và
 * đúng khuyến nghị của React hơn là tự xoá trạng thái trong componentDidUpdate.
 *
 * Về việc kiểm thử: renderToStaticMarkup không kích hoạt lưới an toàn - React
 * cố ý như vậy, cơ chế bắt lỗi chỉ chạy phía trình duyệt. Nên phép kiểm tra
 * trước mỗi lần build không đi qua được đường bắt lỗi này; nó chỉ kiểm tra
 * hợp đồng của class (getDerivedStateFromError và render) cùng chỗ nối trong
 * App. Ai sửa file này nhớ điều đó, đừng tưởng phép kiểm tra đã phủ hết.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Ghi ra console để còn lần được nguyên nhân khi khách báo lỗi.
    console.error('Section crashed', error, info?.componentStack);
  }

  render() {
    if (this.state.error) return this.props.fallback || null;
    return this.props.children;
  }
}
