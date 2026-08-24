import React from 'react';
import { TRANSLATIONS } from '../data/translations';

/* Màn chờ trong lúc mã của một mục đang tải về.
 *
 * Mỗi mục nay được tải riêng khi khách mở tới (xem React.lazy trong App), nên
 * giữa lúc bấm và lúc nội dung hiện ra có một khoảng trống. Khoảng đó ngắn,
 * nhưng để trắng trơn thì khách tưởng bấm hụt và bấm lại.
 *
 * Cố ý làm nhẹ và cao đúng một khoảng cố định: nếu để nó chiếm cả màn hình thì
 * trang giật lên giật xuống mỗi lần đổi mục, còn khó chịu hơn cả khoảng trống.
 */
export const SectionLoading = ({ lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center" role="status" aria-live="polite">
      <div className="w-10 h-10 mx-auto mb-4 rounded-full border-2 border-amber-400/30 border-t-amber-300 animate-slow-spin" />
      <p className="text-sm text-gray-400 font-light">{t.sectionLoading}</p>
    </div>
  );
};
