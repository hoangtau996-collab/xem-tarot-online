import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, ChevronDown, BookOpen } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import { HOUSE_SYSTEMS } from '../data/astrologyData';

/* Phần giới thiệu đặt trước ô nhập liệu.
 *
 * Vì sao cần: hầu hết khách vào đây chỉ biết cung hoàng đạo của mình và chưa
 * từng thấy một lá số bao giờ. Nếu đưa ngay ba ô "ngày - giờ - nơi sinh" thì
 * hai chuyện xảy ra: khách bỏ trống giờ sinh vì không hiểu nó để làm gì (mất
 * luôn Cung Mọc và cả mười hai nhà), và khách chọn bừa hệ chia nhà rồi tưởng
 * mình vừa chọn sai điều gì đó quan trọng.
 *
 * Nên phần này trả lời đúng ba câu hỏi theo thứ tự khách nghĩ tới: đây là cái
 * gì, tôi phải đưa gì và vì sao, rồi mới tới những thứ đọc thêm nếu muốn.
 */

/* Ba dữ kiện đầu vào, mỗi cái mở khoá một tầng khác nhau của lá số. Nói rõ
   cái giá của việc bỏ trống ngay tại đây, trước khi khách xuống tới form. */
const INPUTS = [
  { key: 'date', Icon: CalendarDays, color: '#fbbf24' },
  { key: 'time', Icon: Clock, color: '#22d3ee' },
  { key: 'place', Icon: MapPin, color: '#a78bfa' }
];

export const AstroIntro = ({ lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const L = (obj) => (obj ? obj[lang] || obj.vi : '');

  const [openDeep, setOpenDeep] = useState(false);

  return (
    <div className="glass-panel p-5 md:p-7 space-y-6 max-w-3xl mx-auto">

      {/* Lá số là gì */}
      <div className="space-y-2.5">
        <h3 className="font-serif font-bold text-lg gold-gradient-text">{t.astroIntroTitle}</h3>
        <p className="text-sm text-gray-200 leading-relaxed font-light">{t.astroIntroBody}</p>
        <p className="text-sm text-gray-300 leading-relaxed font-light">{t.astroIntroNotFortune}</p>
      </div>

      {/* Ba dữ kiện cần nhập, và mỗi cái mở ra tầng nào */}
      <div className="space-y-2.5">
        <p className="text-2xs text-cyan-300 uppercase tracking-widest font-semibold">{t.astroIntroInputsTitle}</p>
        <div className="grid sm:grid-cols-3 gap-2.5">
          {INPUTS.map(({ key, Icon, color }) => (
            <div key={key} className="rounded-xl bg-space/70 border border-indigo-400/25 p-3.5 space-y-1.5">
              <span className="flex items-center gap-2 text-xs font-semibold text-gray-100">
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                {t[`astroInput_${key}`]}
              </span>
              <p className="text-2xs text-gray-300 leading-relaxed font-light">{t[`astroInputWhy_${key}`]}</p>
            </div>
          ))}
        </div>
        <p className="text-2xs text-amber-200/90 leading-relaxed font-light">{t.astroIntroTimeWarning}</p>
      </div>

      {/* Đọc thêm - gấp lại vì không phải ai cũng cần trước khi xem */}
      <div className="border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={() => setOpenDeep(v => !v)}
          className="w-full flex items-center justify-between gap-3 text-left group"
        >
          <span className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <BookOpen className="w-4 h-4" />
            {t.astroIntroDeepTitle}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openDeep ? 'rotate-180' : ''}`} />
        </button>

        {openDeep && (
          <div className="pt-4 space-y-5">

            {/* Ba tầng: hành tinh - cung - nhà */}
            <div className="space-y-2">
              <p className="text-2xs text-cyan-300 uppercase tracking-widest font-semibold">{t.astroLayersTitle}</p>
              {['planet', 'sign', 'house'].map(key => (
                <p key={key} className="text-xs text-gray-200 leading-relaxed font-light">
                  <span className="text-amber-200 font-semibold">{t[`astroLayer_${key}`]}: </span>
                  {t[`astroLayerBody_${key}`]}
                </p>
              ))}
              <p className="text-xs text-gray-300 leading-relaxed font-light pt-1">{t.astroLayersExample}</p>
            </div>

            {/* Nhà là gì và vì sao lại có nhiều hệ chia */}
            <div className="space-y-2 border-t border-white/10 pt-4">
              <p className="text-2xs text-cyan-300 uppercase tracking-widest font-semibold">{t.astroHouseSystemWhyTitle}</p>
              <p className="text-xs text-gray-200 leading-relaxed font-light">{t.astroHouseSystemWhyBody}</p>

              <div className="space-y-1.5 pt-1">
                {Object.values(HOUSE_SYSTEMS).map(sys => (
                  <p key={sys.key} className="text-xs text-gray-300 leading-relaxed font-light">
                    <span className="text-amber-200 font-semibold">{L(sys.name)}: </span>
                    {L(sys.hint)}
                  </p>
                ))}
              </div>

              {/* Điều quan trọng nhất về hệ chia nhà: nó không đổi cung của
                  hành tinh. Khách hay sợ chọn sai là hỏng cả lá số. */}
              <p className="text-2xs text-emerald-200/90 leading-relaxed font-light bg-emerald-950/30 border border-emerald-400/25 rounded-xl px-4 py-2.5 mt-1">
                {t.astroHouseSystemReassure}
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
