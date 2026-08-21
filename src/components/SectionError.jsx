import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

/* Màn hình thay thế khi một mục gặp sự cố.
 *
 * Nói đúng ba điều khách cần biết, không nói gì thêm: chuyện gì vừa xảy ra,
 * họ làm gì được ngay, và các mục khác vẫn chạy. Không hiện thông báo lỗi kỹ
 * thuật - nó chỉ làm khách hoang mang chứ không giúp được gì, phần đó đã ghi
 * vào console cho người sửa.
 */
export const SectionError = ({ lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="glass-panel p-6 md:p-8 text-center space-y-4 border-amber-400/40">
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/15 border border-amber-400/40 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-amber-300" />
        </div>

        <h2 className="font-serif font-bold text-xl text-amber-200">{t.errorSectionTitle}</h2>
        <p className="text-sm text-gray-300 leading-relaxed font-light">{t.errorSectionBody}</p>

        <button
          onClick={() => window.location.reload()}
          className="btn-gold text-sm px-6 py-2.5 inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {t.errorReloadBtn}
        </button>
      </div>
    </div>
  );
};
