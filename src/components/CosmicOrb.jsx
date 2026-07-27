import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { pickAffirmationIndex, getAffirmationAt } from '../utils/affirmation';

/* Các hạt sáng lấp lánh bám quanh quả cầu. Toạ độ cố định (không random lúc
   render) để hạt không nhảy chỗ mỗi khi component vẽ lại. */
const SPARKS = [
  { top: '-8%',  left: '14%',  size: 'w-5 h-5', color: 'text-amber-200',  delay: '0s'   },
  { top: '6%',   left: '92%',  size: 'w-4 h-4', color: 'text-cyan-200',   delay: '0.7s' },
  { top: '46%',  left: '-10%', size: 'w-4 h-4', color: 'text-pink-200',   delay: '1.4s' },
  { top: '84%',  left: '86%',  size: 'w-5 h-5', color: 'text-purple-200', delay: '0.4s' },
  { top: '96%',  left: '26%',  size: 'w-3 h-3', color: 'text-amber-100',  delay: '1.9s' },
  { top: '20%',  left: '-4%',  size: 'w-3 h-3', color: 'text-cyan-100',   delay: '1.1s' }
];

/* Màu thân đom đóm - vàng mật là chính, xen chút tím và xanh cho hợp tông vũ trụ. */
const FIREFLY_COLORS = ['#fde68a', '#fbbf24', '#fef3c7', '#c4b5fd', '#a5f3fc'];

const FIREFLY_COUNT = 26;

/* Mốc thời gian của màn hiện thông điệp (ms). */
const REVEAL_DELAY = 780;    // đom đóm bay xuống rồi chữ mới kết tụ
const CHARGING_TIME = 1300;  // khoá nút trong lúc quả cầu đang loé sáng
const SWARM_LIFETIME = 3400; // dọn đom đóm khỏi DOM sau khi bay xong

/* Dựng một bầy đom đóm mới: mỗi con có đường bay, độ võng, cỡ và nhịp nháy
   riêng nên bầy trông tự nhiên chứ không như hiệu ứng lặp. Đích đến (dx, dy)
   là vùng khung thông điệp ngay bên dưới quả cầu. */
const createSwarm = () =>
  Array.from({ length: FIREFLY_COUNT }, (_, i) => ({
    id: i,
    dx: (Math.random() - 0.5) * 430,
    dy: 130 + Math.random() * 180,
    curve: (Math.random() - 0.5) * 170,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 0.5,
    duration: 1.7 + Math.random() * 1,
    blink: 0.35 + Math.random() * 0.45,
    color: FIREFLY_COLORS[i % FIREFLY_COLORS.length]
  }));

/* Vài con đom đóm ở lại lượn quanh khung thông điệp sau khi bầy đã tan. */
const RESIDENT_FIREFLIES = [
  { top: '18%', left: '6%',  size: 4, delay: '0s',   duration: '7s',   color: '#fde68a' },
  { top: '72%', left: '13%', size: 3, delay: '1.6s', duration: '8.5s', color: '#c4b5fd' },
  { top: '26%', left: '91%', size: 4, delay: '0.8s', duration: '9s',   color: '#fbbf24' },
  { top: '80%', left: '84%', size: 3, delay: '2.4s', duration: '7.5s', color: '#a5f3fc' }
];

export const CosmicOrb = ({ lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  // Giữ chỉ số thay vì câu chữ: đổi ngôn ngữ thì thông điệp đang mở tự dịch
  // theo mà không đổi sang ý khác.
  const [messageIndex, setMessageIndex] = useState(null);
  const [isCharging, setIsCharging] = useState(false);
  const [fireflies, setFireflies] = useState([]);
  // Tăng mỗi lần chạm để React thay node -> hiệu ứng được chạy lại từ đầu.
  // burstId cho màn triệu hồi ở quả cầu, revealId cho lúc chữ kết tụ.
  const [burstId, setBurstId] = useState(0);
  const [revealId, setRevealId] = useState(0);

  const timersRef = useRef([]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const handleTouchOrb = () => {
    if (isCharging) return;

    cosmicAudio.playSparkleSound();
    setBurstId(id => id + 1);
    setFireflies(createSwarm());
    setIsCharging(true);

    timersRef.current.push(
      // Chữ chỉ kết tụ khi bầy đom đóm đã bay tới vùng khung thông điệp.
      setTimeout(() => {
        setMessageIndex(pickAffirmationIndex());
        setRevealId(id => id + 1);
        cosmicAudio.playSparkleSound();
      }, REVEAL_DELAY),
      setTimeout(() => setIsCharging(false), CHARGING_TIME),
      setTimeout(() => setFireflies([]), SWARM_LIFETIME)
    );
  };

  const message = messageIndex === null ? null : getAffirmationAt(messageIndex, lang);

  return (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 flex flex-col items-center text-center">

      {/* Quả cầu ma thuật. z-30 để bầy đom đóm bay đè lên khung thông điệp. */}
      <div className="relative z-30">
        <button
          type="button"
          onClick={handleTouchOrb}
          aria-label={t.orbAriaLabel}
          className="relative block w-32 h-32 md:w-40 md:h-40 rounded-full cursor-pointer bg-transparent border-0 p-0 transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-4 focus-visible:ring-offset-space"
        >
          {/* Quầng sáng toả ra nền */}
          <span className="absolute -inset-8 rounded-full bg-purple-600/25 blur-3xl pointer-events-none" />

          {/* Màn triệu hồi khi chạm: vòng sáng bung ra, vòng ấn cổ xoay tròn,
              sóng xung kích lan rộng và lõi cầu loé trắng. */}
          {isCharging && (
            <React.Fragment key={burstId}>
              <span className="absolute inset-0 rounded-full border-2 border-amber-300/70 animate-orb-burst pointer-events-none" />
              <span
                className="absolute inset-0 rounded-full border border-cyan-300/60 animate-orb-burst pointer-events-none"
                style={{ animationDelay: '0.18s' }}
              />
              <span className="absolute -inset-4 rounded-full border border-dashed border-amber-200/60 animate-rune-ring pointer-events-none" />
              <span className="absolute -inset-2 rounded-full border-2 border-purple-300/50 animate-shockwave pointer-events-none" />
              <span className="absolute inset-0 rounded-full animate-orb-flare pointer-events-none" />
            </React.Fragment>
          )}

          {/* Thân cầu thuỷ tinh */}
          <span className={`absolute inset-0 rounded-full overflow-hidden cosmic-orb animate-orb-breathe ${isCharging ? 'is-charging' : ''}`}>
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

        {/* Bầy đom đóm bay ra từ lòng quả cầu, mang thông điệp xuống dưới */}
        {fireflies.length > 0 && (
          <div key={burstId} className="firefly-layer" aria-hidden="true">
            {fireflies.map(fly => (
              <span
                key={fly.id}
                className="firefly"
                style={{
                  '--fx': `${fly.dx}px`,
                  '--fy': `${fly.dy}px`,
                  '--fcurve': `${fly.curve}px`,
                  '--fsize': `${fly.size}px`,
                  '--fcolor': fly.color,
                  '--fdur': `${fly.duration}s`,
                  '--fdelay': `${fly.delay}s`,
                  '--fblink': `${fly.blink}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Câu dẫn */}
      <p className="mt-6 text-sm md:text-base font-serif italic text-purple-200/90 max-w-xl">
        {message ? t.orbHintAgain : t.orbHint}
      </p>

      {/* Thông điệp kết tụ giữa bầy đom đóm */}
      {message && (
        <div
          key={revealId}
          className="relative mt-5 w-full glass-panel-purple px-6 py-7 md:px-10 md:py-8 space-y-3 overflow-hidden animate-message-materialize"
        >
          {/* Đom đóm ở lại lượn quanh khung thông điệp */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {RESIDENT_FIREFLIES.map((fly, i) => (
              <span
                key={i}
                className="firefly-idle"
                style={{
                  top: fly.top,
                  left: fly.left,
                  '--fsize': `${fly.size}px`,
                  '--fcolor': fly.color,
                  '--fdur': fly.duration,
                  '--fdelay': fly.delay
                }}
              />
            ))}
          </div>

          <h2 className="relative text-2xs md:text-xs font-semibold text-purple-300 uppercase tracking-widest">
            {t.affirmationTitle}
          </h2>
          <p className="relative text-lg md:text-2xl font-serif italic text-amber-200 leading-relaxed animate-text-ember">
            "{message}"
          </p>
        </div>
      )}

    </section>
  );
};
