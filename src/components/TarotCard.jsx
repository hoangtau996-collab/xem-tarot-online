import React from 'react';
import { TAROT_DECKS_THEMES } from '../data/tarotData';
import { TRANSLATIONS } from '../data/translations';

/* Hoa văn mandala hình học thiêng trên mặt sau lá bài.
   Dùng SVG thay vì ảnh để nét ở mọi kích thước và ăn theo màu của bộ bài. */
const Mandala = ({ color, gradientId }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
    <defs>
      <radialGradient id={gradientId}>
        <stop offset="0%" stopColor={color} stopOpacity="0.55" />
        <stop offset="70%" stopColor={color} stopOpacity="0.08" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>

    <circle cx="50" cy="50" r="46" fill={`url(#${gradientId})`} />

    {/* Vòng ngoài + vạch chia như mặt la bàn chiêm tinh */}
    <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeOpacity="0.5" strokeWidth="0.6" />
    <circle cx="50" cy="50" r="41" fill="none" stroke="#fbbf24" strokeOpacity="0.35" strokeWidth="0.4" />
    {[...Array(24)].map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="4"
        x2="50"
        y2={i % 2 === 0 ? '9' : '7'}
        stroke="#fbbf24"
        strokeOpacity={i % 2 === 0 ? '0.6' : '0.3'}
        strokeWidth="0.5"
        transform={`rotate(${i * 15} 50 50)`}
      />
    ))}

    {/* Hai tam giác lồng nhau - ngôi sao sáu cánh */}
    {[0, 60].map((rot) => (
      <polygon
        key={rot}
        points="50,14 81,68 19,68"
        fill="none"
        stroke={color}
        strokeOpacity="0.45"
        strokeWidth="0.7"
        transform={`rotate(${rot} 50 50)`}
      />
    ))}

    {/* Cánh hoa đời sống */}
    {[...Array(6)].map((_, i) => (
      <circle
        key={i}
        cx="50"
        cy="32"
        r="18"
        fill="none"
        stroke="#fbbf24"
        strokeOpacity="0.18"
        strokeWidth="0.4"
        transform={`rotate(${i * 60} 50 50)`}
      />
    ))}

    <circle cx="50" cy="50" r="16" fill="none" stroke={color} strokeOpacity="0.6" strokeWidth="0.6" />
  </svg>
);

/* Tia sáng toả ra sau biểu tượng ở mặt trước */
const RayBurst = ({ color }) => (
  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
    {[...Array(16)].map((_, i) => (
      <polygon
        key={i}
        points="50,50 48.4,6 51.6,6"
        fill={color}
        fillOpacity={i % 2 === 0 ? '0.55' : '0.22'}
        transform={`rotate(${i * 22.5} 50 50)`}
      />
    ))}
  </svg>
);

/* Góc trang trí kiểu khung bài cổ */
const CornerFlourish = ({ className }) => (
  <svg viewBox="0 0 20 20" className={`absolute w-4 h-4 text-amber-400/60 z-10 ${className}`} aria-hidden="true">
    <path d="M1 8 V1 H8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="4.5" cy="4.5" r="1.3" fill="currentColor" />
  </svg>
);

export const TarotCard = ({
  card,
  deckTheme = TAROT_DECKS_THEMES[0],
  isFlipped = false,
  isSelected = false,
  onClick,
  spreadLabel,
  lang = 'vi'
}) => {
  const theme = deckTheme || TAROT_DECKS_THEMES[0];
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const accent = card?.color || theme.color;

  // id gradient phải là duy nhất, nếu trùng thì các lá cùng dùng chung một màu
  const uid = React.useId().replace(/:/g, '');

  const getCardName = () => {
    if (!card) return '';
    if (lang === 'en') return card.name;
    if (lang === 'zh') return card.nameZh || card.name;
    return card.nameVi;
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-40 h-[17rem] sm:w-48 sm:h-[20.5rem] md:w-56 md:h-96 cursor-pointer perspective-1000 group active:scale-95 ${
        isSelected ? 'scale-105 z-20' : 'hover:scale-105 hover:-translate-y-2'
      } transition-all duration-300 select-none`}
    >
      <div
        className={`w-full h-full duration-700 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ================= MẶT SAU ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl p-[3px] bg-gradient-to-tr ${theme.bgGradient} shadow-xl shadow-purple-950/80 backface-hidden border ${theme.border}`}
        >
          <div className="w-full h-full bg-gradient-to-b from-[#150e30] via-[#0f0a24] to-[#150e30] rounded-xl flex flex-col items-center justify-between border border-amber-400/30 overflow-hidden relative">

            {/* Sao nền */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:14px_14px]" />

            {/* Dải sáng quét chéo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-holo-sheen" />
            </div>

            {/* Mandala xoay chậm, hai lớp ngược chiều nhau */}
            <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
              <div className="relative w-full aspect-square max-h-full">
                <div className="absolute inset-0 animate-slow-spin">
                  <Mandala color={theme.color} gradientId={`mdl-${uid}-a`} />
                </div>
                <div className="absolute inset-[18%] animate-slow-spin-reverse opacity-70">
                  <Mandala color="#fbbf24" gradientId={`mdl-${uid}-b`} />
                </div>
              </div>
            </div>

            <CornerFlourish className="top-1.5 left-1.5" />
            <CornerFlourish className="top-1.5 right-1.5 rotate-90" />
            <CornerFlourish className="bottom-1.5 right-1.5 rotate-180" />
            <CornerFlourish className="bottom-1.5 left-1.5 -rotate-90" />

            {/* Tên bộ bài trên đỉnh */}
            <div className="relative z-10 flex justify-between items-center w-full px-3 pt-2.5 text-2xs text-amber-300/80 font-serif">
              <span>{theme.symbol}</span>
              <span className="tracking-widest uppercase truncate px-1 text-center">{theme.name}</span>
              <span>{theme.symbol}</span>
            </div>

            {/* Biểu tượng trung tâm */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center bg-[#0b0818]/80 shadow-inner group-hover:rotate-45 transition-transform duration-700 backdrop-blur-sm"
                style={{ borderColor: theme.color, boxShadow: `0 0 28px ${theme.glowColor || 'rgba(251,191,36,0.4)'}` }}
              >
                <span className="text-3xl sm:text-4xl animate-pulse">{theme.icon}</span>
              </div>
              <span className="mt-2 text-2xs sm:text-xs font-serif tracking-widest text-amber-200 px-2 text-center">
                {theme.styleTag}
              </span>
            </div>

            {spreadLabel && (
              <div className="relative z-10 mx-2 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-2xs text-amber-300 font-semibold text-center uppercase tracking-wider truncate max-w-[90%]">
                {spreadLabel}
              </div>
            )}

            <div className="relative z-10 flex justify-between w-full px-3 pb-2.5 text-2xs text-amber-300/70 font-serif tracking-[0.3em]">
              <span>✦</span>
              <span>TAROT</span>
              <span>✦</span>
            </div>
          </div>
        </div>

        {/* ================= MẶT TRƯỚC ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl p-[3px] bg-gradient-to-tr ${theme.bgGradient} shadow-2xl backface-hidden rotate-y-180`}
        >
          <div
            className={`w-full h-full bg-gradient-to-b from-[#120c2a] via-space to-[#160f33] rounded-xl p-2.5 sm:p-3 flex flex-col border border-amber-400/50 relative overflow-hidden ${
              card?.isReversed ? 'rotate-180' : ''
            }`}
          >
            {/* Quầng sáng theo màu lá bài */}
            <div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: accent }}
            />

            <CornerFlourish className="top-1 left-1" />
            <CornerFlourish className="top-1 right-1 rotate-90" />
            <CornerFlourish className="bottom-1 right-1 rotate-180" />
            <CornerFlourish className="bottom-1 left-1 -rotate-90" />

            {/* Thanh trên: số hiệu + bộ ẩn */}
            <div className="relative z-10 flex justify-between items-center text-xs font-serif text-amber-300 border-b border-amber-400/25 pb-1.5 px-1">
              <span className="tracking-wider">Nº {card?.number ?? 0}</span>
              <span className="text-2xs font-sans px-2 py-0.5 rounded-full bg-purple-900/70 text-purple-200 border border-purple-400/30">
                {card?.arcana}
              </span>
            </div>

            {/* Khung minh hoạ */}
            <div
              className="relative z-10 my-2 flex-1 rounded-lg overflow-hidden flex flex-col items-center justify-center border"
              style={{
                borderColor: `${accent}66`,
                background: `radial-gradient(circle at 50% 42%, ${accent}30 0%, rgba(11,8,24,0.9) 68%)`
              }}
            >
              <RayBurst color={accent} />

              {/* Vòng tròn thiêng bao quanh biểu tượng */}
              <div
                className="relative z-10 flex items-center justify-center w-[62%] aspect-square rounded-full border"
                style={{ borderColor: `${accent}80`, boxShadow: `inset 0 0 24px ${accent}40` }}
              >
                <span
                  className="text-4xl sm:text-5xl md:text-6xl"
                  style={{ filter: `drop-shadow(0 0 14px ${accent})` }}
                >
                  {card?.icon || theme.icon}
                </span>
              </div>

              <span className="relative z-10 mt-1.5 text-lg sm:text-xl opacity-85">
                {card?.symbol || theme.symbol}
              </span>
            </div>

            {/* Tên lá bài + nguyên tố */}
            <div className="relative z-10 text-center space-y-1 px-1">
              <h4 className="font-serif font-bold text-sm sm:text-base text-amber-200 leading-snug">
                {getCardName()}
              </h4>
              <p className="text-2xs sm:text-xs text-cyan-300 font-medium">{card?.element}</p>

              <div className="pt-0.5 flex justify-center">
                <span
                  className={`text-2xs sm:text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    card?.isReversed
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-400/40'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-400/40'
                  }`}
                >
                  {card?.isReversed ? t.reversedBadge : t.uprightBadge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
