import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { getAstroGuide } from '../data/astrologyTexts';

/* Khối "hiểu thêm" đặt cạnh từng mục của lá số.
 *
 * Vì sao gấp lại thay vì in thẳng: trang lá số đã rất dài, và người đã biết
 * chiêm tinh không cần đọc lại định nghĩa orb. Nhưng người mới thì cần, và nếu
 * không có thì họ tự suy diễn - thường theo hướng xấu, vì mấy chữ như "hãm"
 * hay "rơi" nghe như điềm gở trong khi chỉ là vị trí kỹ thuật.
 *
 * Chỉ hiện với tiếng Việt: getAstroGuide trả về null cho en/zh, nên ở hai
 * ngôn ngữ đó component này tự biến mất mà không cần phía gọi kiểm tra thêm.
 */
export const AstroGuideNote = ({ sectionKey, lang = 'vi' }) => {
  const guide = getAstroGuide(sectionKey, lang);
  const [open, setOpen] = useState(false);

  if (!guide) return null;

  return (
    <div className="rounded-xl bg-indigo-950/30 border border-indigo-400/20 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-indigo-950/50 transition-colors"
      >
        <span className="flex items-center gap-2 text-2xs font-semibold text-cyan-300">
          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
          {guide.title}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/5">
          {guide.body.map((para, i) => (
            <p key={i} className="text-2xs text-gray-300 leading-relaxed font-light">{para}</p>
          ))}

          {/* Bảng đối chiếu thuật ngữ, chỉ mục nào có mới hiện. Cho cuộn ngang
              riêng để không đẩy cả trang lệch trên điện thoại. */}
          {guide.table && (
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-2xs border-collapse">
                <tbody>
                  {guide.table.map(([vi, en]) => (
                    <tr key={en} className="border-b border-white/5 last:border-0">
                      <td className="py-1.5 pr-3 text-gray-200 font-light align-top">{vi}</td>
                      <td className="py-1.5 text-cyan-300/90 font-light align-top whitespace-nowrap">{en}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
