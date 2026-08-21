import React from 'react';
import { Compass, Orbit } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { buildPath, DEFAULT_DESTINY } from '../utils/router';
import { Mysticism } from './Mysticism';
import { Astrology } from './Astrology';

/* Mục Bản Mệnh: hai truyền thống cùng trả lời một câu hỏi.
 *
 * Vì sao gộp chung một mục thay vì thành hai tab riêng trên thanh điều hướng:
 * thanh dưới cùng chia đúng năm ô cứng cho điện thoại, thêm ô thứ sáu là chữ
 * bắt đầu vỡ ở khổ máy nhỏ. Gộp lại còn giữ được đúng ý niệm - Huyền Học Đông
 * Phương và Chiêm Tinh Tây Phương đều đọc lá số đời người từ ngày sinh, chỉ
 * khác hệ quy chiếu.
 *
 * Hai tab con là thẻ <a> thật trỏ tới hash riêng, nên mỗi hệ có link chia sẻ
 * được và nút Quay lại của trình duyệt chạy đúng.
 */

const SECTIONS = [
  { key: 'mysticism', Icon: Compass, labelKey: 'destinyEastTab', hintKey: 'destinyEastHint' },
  { key: 'astrology', Icon: Orbit, labelKey: 'destinyWestTab', hintKey: 'destinyWestHint' }
];

export const Destiny = ({ lang = 'vi', section = DEFAULT_DESTINY, profile, onSaveProfile }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const active = SECTIONS.some(s => s.key === section) ? section : DEFAULT_DESTINY;

  return (
    <div data-section={active === 'astrology' ? 'astrology' : 'mysticism'}>

      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="glass-panel p-1.5 grid grid-cols-2 gap-1.5">
          {SECTIONS.map(({ key, Icon, labelKey, hintKey }) => {
            const isActive = key === active;
            return (
              <a
                key={key}
                href={buildPath('destiny', { destiny: key })}
                onClick={() => cosmicAudio.playSparkleSound()}
                className={`rounded-xl px-3 py-2.5 text-center transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-amber-400/25 to-cyan-400/15 border border-amber-300/40'
                    : 'border border-transparent hover:bg-white/5'
                }`}
              >
                <span className={`flex items-center justify-center gap-1.5 text-xs font-semibold ${
                  isActive ? 'text-amber-200' : 'text-gray-300'
                }`}>
                  <Icon className="w-4 h-4" />
                  {t[labelKey]}
                </span>
                <span className="block text-2xs text-gray-400 font-light mt-0.5">{t[hintKey]}</span>
              </a>
            );
          })}
        </div>
      </div>

      {active === 'astrology'
        ? <Astrology lang={lang} profile={profile} onSaveProfile={onSaveProfile} />
        : <Mysticism lang={lang} profile={profile} onSaveProfile={onSaveProfile} />}
    </div>
  );
};
