import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { pickAffirmationIndex, getAffirmationAt } from '../utils/affirmation';

/* Các hạt sáng lấp lánh bay quanh quả cầu. Toạ độ cố định (không random lúc
   render) để hạt không nhảy chỗ mỗi khi component vẽ lại. */
const SPARKS = [
  { top: '-8%',  left: '14%',  size: 'w-5 h-5', color: 'text-amber-200',  delay: '0s'   },
  { top: '6%',   left: '92%',  size: 'w-4 h-4', color: 'text-cyan-200',   delay: '0.7s' },
  { top: '46%',  left: '-10%', size: 'w-4 h-4', color: 'text-pink-200',   delay: '1.4s' },
  { top: '84%',  left: '86%',  size: 'w-5 h-5', color: 'text-purple-200', delay: '0.4s' },
  { top: '96%',  left: '26%',  size: 'w-3 h-3', color: 'text-amber-100',  delay: '1.9s' },
  { top: '20%',  left: '-4%',  size: 'w-3 h-3', color: 'text-cyan-100',   delay: '1.1s' }
];

export const CosmicOrb = ({ lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  // Giữ chỉ số thay vì câu chữ: đổi ngôn ngữ thì thông điệp đang mở tự dịch
  // theo mà không đổi sang ý khác.
  const [messageIndex, setMessageIndex] = useState(null);
  const [isBursting, setIsBursting] = useState(false);
  // Tăng mỗi lần chạm để React thay node thông điệp -> hiệu ứng hiện chạy lại.
  const [revealKey, setRevealKey] = useState(0);

  const timersRef = useRef([]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const handleTouchOrb = () => {
    if (isBursting) return;

    cosmicAudio.playSparkleSound();
    setIsBursting(true);

    // Chờ vòng sáng loé lên rồi mới thả chữ ra, để cảm giác thông điệp bước ra
    // từ trong quả cầu chứ không phải hiện cùng lúc với cú chạm.
    timersRef.current.push(
      setTimeout(() => {
        setMessageIndex(pickAffirmationIndex());
        setRevealKey(k => k + 1);
      }, 320),
      setTimeout(() => setIsBursting(false), 1000)
    );
  };

  const message = messageIndex === null ? null : getAffirmationAt(messageIndex, lang);

  return (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 flex flex-col items-center text-center">

      {/* Quả cầu ma thuật */}
      <button
        type="button"
        onClick={handleTouchOrb}
        aria-label={t.orbAriaLabel}
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full cursor-pointer bg-transparent border-0 p-0 transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-4 focus-visible:ring-offset-space"
      >
        {/* Quầng sáng toả ra nền */}
        <span className="absolute -inset-8 rounded-full bg-purple-600/25 blur-3xl pointer-events-none" />

        {/* Vòng sáng loé ra khi chạm */}
        {isBursting && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-amber-300/70 animate-orb-burst pointer-events-none" />
            <span
              className="absolute inset-0 rounded-full border border-cyan-300/60 animate-orb-burst pointer-events-none"
              style={{ animationDelay: '0.18s' }}
            />
          </>
        )}

        {/* Thân cầu thuỷ tinh */}
        <span className="absolute inset-0 rounded-full overflow-hidden cosmic-orb animate-orb-breathe">
          {/* Dải màu xoay bên trong */}
          <span className="orb-swirl" />
          {/* Đốm sáng phản chiếu */}
          <span className="absolute top-[16%] left-[20%] w-1/4 h-1/5 rounded-full bg-white/70 blur-md" />
          <span className="absolute bottom-[14%] right-[22%] w-6 h-2 md:w-8 md:h-2.5 rounded-full bg-cyan-200/40 blur-sm" />
        </span>

        {/* Hạt sáng lấp lánh quanh cầu */}
        {SPARKS.map((spark, i) => (
          <Sparkles
            key={i}
            className={`absolute ${spark.size} ${spark.color} animate-orb-twinkle pointer-events-none drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]`}
            style={{ top: spark.top, left: spark.left, animationDelay: spark.delay }}
          />
        ))}
      </button>

      {/* Câu dẫn */}
      <p className="mt-6 text-sm md:text-base font-serif italic text-purple-200/90 max-w-xl">
        {message ? t.orbHintAgain : t.orbHint}
      </p>

      {/* Thông điệp hiện ra sau khi chạm */}
      {message && (
        <div
          key={revealKey}
          className="mt-5 w-full glass-panel-purple px-6 py-7 md:px-10 md:py-8 space-y-3 animate-message-rise"
        >
          <h2 className="text-2xs md:text-xs font-semibold text-purple-300 uppercase tracking-widest">
            {t.affirmationTitle}
          </h2>
          <p className="text-lg md:text-2xl font-serif italic text-amber-200 leading-relaxed">
            "{message}"
          </p>
        </div>
      )}

    </section>
  );
};
