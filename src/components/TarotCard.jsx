import React from 'react';
import { TAROT_DECKS_THEMES } from '../data/tarotData';
import { TRANSLATIONS } from '../data/translations';

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

  const getCardName = () => {
    if (!card) return '';
    if (lang === 'en') return card.name;
    if (lang === 'zh') return card.nameZh || card.name;
    return card.nameVi;
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-36 h-60 sm:w-44 sm:h-72 md:w-52 md:h-84 cursor-pointer perspective-1000 group active:scale-95 ${
        isSelected ? 'scale-105 z-20' : 'hover:scale-102 hover:-translate-y-2'
      } transition-all duration-300 select-none`}
    >
      <div
        className={`w-full h-full duration-700 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* BACK OF CARD */}
        <div className={`absolute inset-0 w-full h-full rounded-2xl p-1 bg-gradient-to-tr ${theme.bgGradient} shadow-xl shadow-purple-950/80 backface-hidden border ${theme.border}`}>
          <div className={`w-full h-full ${theme.cardBackBg} rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-between border border-amber-400/30 overflow-hidden relative backdrop-blur-md`}>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:12px_12px]" />
            
            <div className="flex justify-between w-full text-[9px] sm:text-[10px] text-amber-300/70 font-serif">
              <span>{theme.symbol}</span>
              <span className="tracking-widest uppercase truncate max-w-[100px] text-center">{theme.name}</span>
              <span>{theme.symbol}</span>
            </div>

            {/* Center Mandala Icon */}
            <div className="relative my-auto flex flex-col items-center">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center bg-purple-950/50 shadow-inner group-hover:rotate-45 transition-transform duration-700"
                style={{ borderColor: theme.color }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-purple-400/40 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl animate-pulse">{theme.icon}</span>
                </div>
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-serif tracking-widest text-amber-200">
                {theme.styleTag}
              </span>
            </div>

            {/* Bottom Label if in spread */}
            {spreadLabel && (
              <div className="z-10 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-[9px] text-amber-300 font-semibold text-center uppercase tracking-wider truncate max-w-full">
                {spreadLabel}
              </div>
            )}
            
            <div className="flex justify-between w-full text-[9px] sm:text-[10px] text-amber-300/70 font-serif">
              <span>✦</span>
              <span>TAROT</span>
              <span>✦</span>
            </div>

          </div>
        </div>

        {/* FRONT OF CARD */}
        <div className={`absolute inset-0 w-full h-full rounded-2xl p-1 bg-gradient-to-tr ${theme.bgGradient} shadow-2xl backface-hidden rotate-y-180`}>
          <div className={`w-full h-full bg-space rounded-xl p-2.5 sm:p-3 flex flex-col justify-between border border-amber-400/50 relative overflow-hidden ${
            card?.isReversed ? 'rotate-180' : ''
          }`}>
            
            {/* Top Bar */}
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-serif text-amber-300 border-b border-amber-400/20 pb-1">
              <span>Nº {card?.number ?? 0}</span>
              <span className="text-[9px] sm:text-[10px] font-sans px-1.5 py-0.2 rounded-full bg-purple-900/60 text-purple-200">
                {card?.arcana}
              </span>
            </div>

            {/* Illustration Graphic Area */}
            <div className="my-1 flex-1 rounded-lg bg-gradient-to-b from-purple-950/60 to-space p-2 flex flex-col items-center justify-center border border-purple-400/30 relative">
              <span className="text-4xl sm:text-5xl md:text-6xl mb-1 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                {card?.icon || theme.icon}
              </span>
              <span className="text-base sm:text-xl opacity-80">{card?.symbol || theme.symbol}</span>
            </div>

            {/* Card Name & Meaning */}
            <div className="text-center space-y-0.5">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-amber-200 leading-tight truncate">
                {getCardName()}
              </h4>
              <p className="text-[9px] sm:text-[10px] text-cyan-300 font-medium">
                {card?.element}
              </p>

              {/* Upright / Reversed Badge */}
              <div className="pt-0.5 flex justify-center">
                <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  card?.isReversed
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-400/40'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-400/40'
                }`}>
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
