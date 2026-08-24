import React from 'react';
import { navigate } from '../utils/router';

/* Thẻ liên kết nội bộ.
 *
 * Vì sao cần: hồi định tuyến bằng hash, một thẻ <a href="#/tra-cuu"> tự nó
 * chạy đúng - đổi hash không làm trình duyệt tải lại trang. Với đường dẫn thật
 * thì ngược lại: bấm vào là trình duyệt đi lấy trang mới, mất trạng thái và
 * nhấp một cái trắng màn hình. Nên phải chặn cú bấm và tự đổi đường dẫn.
 *
 * Vẫn là thẻ <a> thật với href đầy đủ, không phải <div onClick>. Điều đó quan
 * trọng: Google đọc href để biết trang này dẫn đi đâu, khách bấm chuột giữa để
 * mở tab mới, rê chuột thấy địa chỉ, và trình đọc màn hình gọi đúng tên "liên
 * kết". Một cái div thì mất sạch những thứ đó.
 *
 * Chỉ chặn cú bấm chuột trái thuần: bấm kèm Ctrl/Cmd/Shift là khách cố ý mở
 * tab hoặc cửa sổ mới, chặn lại là phá đúng cái họ muốn.
 */
export const RouteLink = ({ to, children, onClick, ...rest }) => {
  const handleClick = (event) => {
    if (onClick) onClick(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    ) return;

    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
