import React from 'react';
import { maskDate, maskTime } from '../utils/birthInput';

/* Ô nhập ngày sinh và giờ sinh dạng gõ số, dùng thay cho input type="date" /
 * type="time" của trình duyệt.
 *
 * Vì sao bỏ ô có sẵn: thứ tự ngày/tháng và kiểu 12 giờ SA/CH của chúng đi theo
 * cài đặt máy chứ không theo trang, nên khách Việt hay gặp 02/04 bị hiểu thành
 * mùng 4 tháng 2, giờ chiều bị lưu thành giờ sáng. Ô năm còn nhận ngay "0001"
 * từ chữ số đầu tiên gõ vào. Ở đây luôn là ngày/tháng/năm và 24 giờ, bàn phím
 * số bật lên trên điện thoại, dấu "/" và ":" tự chèn.
 *
 * Giá trị lưu trong hồ sơ vẫn là ISO (YYYY-MM-DD, HH:MM) như cũ; form giữ chuỗi
 * khách đang gõ và chỉ đổi sang ISO lúc bấm nút.
 */

export const DateTextInput = ({ id, value, onChange, placeholder, className }) => (
  <input
    id={id}
    type="text"
    inputMode="numeric"
    autoComplete="bday"
    maxLength={10}
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(maskDate(e.target.value))}
    className={className}
  />
);

export const TimeTextInput = ({ id, value, onChange, placeholder, disabled, className }) => (
  <input
    id={id}
    type="text"
    inputMode="numeric"
    autoComplete="off"
    maxLength={5}
    value={value}
    placeholder={placeholder}
    disabled={disabled}
    onChange={(e) => onChange(maskTime(e.target.value))}
    className={className}
  />
);
