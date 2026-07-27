import React, { useState, useEffect, useRef } from 'react';
import { TAROT_DECK, getRandomDeckDraw, TAROT_DECKS_THEMES } from '../data/tarotData';
import { TarotCard } from './TarotCard';
import { Sparkles, Shuffle, Eye, ChevronRight, Layers } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

const FAN_SIZE = 7;

/* Chùm hạt sáng bắn ra khi lá bài được lật lên */
const SparkleBurst = () => (
  <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
    {[...Array(10)].map((_, i) => {
      const angle = (i / 10) * Math.PI * 2;
      return (
        <span
          key={i}
          className="absolute text-base animate-sparkle-float"
          style={{
            '--sx': `${Math.cos(angle) * 62}px`,
            '--sy': `${Math.sin(angle) * 62}px`,
            animationDelay: `${i * 35}ms`
          }}
        >
          ✦
        </span>
      );
    })}
  </div>
);

export const CardDeck = ({ spread, deckTheme, question, onCompleteDraw, lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [drawnCards, setDrawnCards] = useState([]);
  const [flippedMap, setFlippedMap] = useState({});
  const [isShuffling, setIsShuffling] = useState(false);
  const [burstIdx, setBurstIdx] = useState(null);

  // Mọi setTimeout đều được ghi lại để dọn khi unmount hoặc đổi trải bài
  const timers = useRef([]);
  const after = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const neededCount = spread.cardCount;
  const theme = deckTheme || TAROT_DECKS_THEMES[0];

  const getSlotLabel = (idx) => {
    if (spread.id === 'five_aspects') return t.slotLabelsFive[idx] || `Card ${idx + 1}`;
    if (spread.id === 'three_time') {
      const labels = lang === 'en' ? ['1. Past', '2. Present', '3. Future'] : lang === 'zh' ? ['1. 过去', '2. 现状', '3. 未来'] : ['1. Quá khứ', '2. Hiện tại', '3. Tương lai'];
      return labels[idx] || `Card ${idx + 1}`;
    }
    if (spread.id === 'three_advice') {
      const labels = lang === 'en' ? ['1. Situation', '2. Challenge', '3. Advice'] : lang === 'zh' ? ['1. 现状', '2. 挑战', '3. 建议'] : ['1. Hoàn cảnh', '2. Thử thách', '3. Lời khuyên'];
      return labels[idx] || `Card ${idx + 1}`;
    }
    return `Card ${idx + 1}`;
  };

  useEffect(() => {
    clearTimers();
    setDrawnCards([]);
    setFlippedMap({});
    setBurstIdx(null);
  }, [spread, deckTheme]);

  useEffect(() => clearTimers, []);

  const handleShuffle = () => {
    setIsShuffling(true);
    cosmicAudio.playShuffleSound();
    after(() => {
      setIsShuffling(false);
      cosmicAudio.playSparkleSound();
    }, 1200);
  };

  const handleDrawCard = () => {
    if (drawnCards.length >= neededCount) return;

    const available = TAROT_DECK.filter(c => !drawnCards.some(d => d.id === c.id));
    if (available.length === 0) return;

    const randomCard = available[Math.floor(Math.random() * available.length)];
    setDrawnCards(prev => [...prev, { ...randomCard, isReversed: Math.random() < 0.2 }]);
    cosmicAudio.playFlipSound();
  };

  /* Rút tự động: chia bài ra từng lá một cho thấy được động tác,
     xong mới lật đồng loạt. */
  const handleAutoDraw = () => {
    cosmicAudio.playShuffleSound();
    setIsShuffling(true);

    const cards = getRandomDeckDraw(neededCount);

    after(() => {
      setIsShuffling(false);
      cards.forEach((card, i) => {
        after(() => {
          setDrawnCards(prev => [...prev, card]);
          cosmicAudio.playFlipSound();
        }, i * 220);
      });

      after(() => {
        const newFlipped = {};
        cards.forEach((_, idx) => (newFlipped[idx] = true));
        setFlippedMap(newFlipped);
        setBurstIdx('all');
        cosmicAudio.playSparkleSound();
        after(() => setBurstIdx(null), 1200);
      }, cards.length * 220 + 350);
    }, 700);
  };

  const toggleFlipCard = (idx) => {
    cosmicAudio.playFlipSound();
    setFlippedMap(prev => {
      const next = { ...prev, [idx]: !prev[idx] };
      if (next[idx]) {
        setBurstIdx(idx);
        after(() => setBurstIdx(null), 1200);
      }
      return next;
    });
  };

  const handleRevealAll = () => {
    const newFlipped = {};
    drawnCards.forEach((_, idx) => (newFlipped[idx] = true));
    setFlippedMap(newFlipped);
    setBurstIdx('all');
    cosmicAudio.playSparkleSound();
    after(() => setBurstIdx(null), 1200);
  };

  const handleProceedToReading = () => {
    cosmicAudio.playSparkleSound();
    onCompleteDraw(drawnCards);
  };

  const allFlipped = drawnCards.length === neededCount && drawnCards.every((_, idx) => flippedMap[idx]);
  const isDeckFull = drawnCards.length >= neededCount;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">

      {/* Thanh tiêu đề phiên */}
      <div className="glass-panel p-4 sm:p-6 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-purple-300 uppercase tracking-widest">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>{theme.name} ({spread.title})</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif gold-gradient-text">
          "{question || t.defaultQuestion}"
        </h3>
        <p className="text-sm text-gray-400">
          {t.drawnProgress} {drawnCards.length} / {neededCount} {t.cardsUnit}
        </p>
      </div>

      {/* Nút điều khiển */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
        <button onClick={handleShuffle} disabled={isShuffling} className="btn-cosmic text-sm px-5 py-3">
          <Shuffle className={`w-5 h-5 ${isShuffling ? 'animate-spin' : ''}`} />
          {t.shuffleBtn} {theme.icon}
        </button>

        {!isDeckFull && (
          <>
            <button onClick={handleDrawCard} className="btn-gold text-sm px-5 py-3">
              <Sparkles className="w-5 h-5 text-purple-950" />
              {t.drawSingleBtn}
            </button>

            <button
              onClick={handleAutoDraw}
              className="px-5 py-3 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-200 text-sm font-semibold hover:bg-purple-800/80 transition-all active:scale-95 min-h-[44px]"
            >
              {t.autoDrawBtn}
            </button>
          </>
        )}

        {isDeckFull && !allFlipped && (
          <button onClick={handleRevealAll} className="btn-gold text-sm px-6 py-3 animate-bounce">
            <Eye className="w-5 h-5 text-purple-950" />
            {t.revealAllBtn}
          </button>
        )}
      </div>

      {/* Khu vực bài */}
      {/* Khung phải cao hơn lá bài, nếu không lá sẽ tràn lên che hàng nút */}
      <div className="min-h-[19rem] sm:min-h-[22.5rem] md:min-h-[26rem] flex items-center justify-center">
        {drawnCards.length === 0 ? (
          /* Nan quạt bài úp - bấm vào để rút */
          <div className="fan-deck relative w-full max-w-sm sm:max-w-md h-[18.5rem] sm:h-[22rem] md:h-[25.5rem] flex items-center justify-center">
            {[...Array(FAN_SIZE)].map((_, i) => {
              const offset = i - (FAN_SIZE - 1) / 2;
              return (
                <div
                  key={i}
                  onClick={handleDrawCard}
                  style={{
                    transform: `translateX(calc(var(--fan-gap) * ${offset})) rotate(${offset * 5}deg)`,
                    zIndex: i
                  }}
                  className="absolute cursor-pointer transition-transform duration-500 hover:-translate-y-8 active:scale-95"
                >
                  <div
                    className={isShuffling ? 'animate-deck-shuffle' : 'animate-deck-breathe'}
                    style={{ animationDelay: `${i * 55}ms` }}
                  >
                    <TarotCard
                      card={{ nameVi: theme.name }}
                      deckTheme={theme}
                      isFlipped={false}
                      lang={lang}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Bài đã rút */
          <div className="w-full">
            {/* 5 cột chỉ bật từ xl - ở lg lá thứ 5 sẽ tràn khỏi khung */}
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center items-start overflow-x-auto pb-4 sm:pb-0 mobile-card-scroll">
              {drawnCards.map((card, idx) => {
                const showBurst = burstIdx === 'all' || burstIdx === idx;
                return (
                  <div
                    key={idx}
                    className="relative flex flex-col items-center space-y-2 flex-shrink-0 animate-deal-in"
                    style={{ animationDelay: `${idx * 90}ms` }}
                  >
                    {/* Nhãn vị trí xuống dòng thay vì cắt cụt - tên vị trí
                        tiếng Việt dài hơn nhiều so với chỗ của một dòng */}
                    <span className="text-xs sm:text-sm font-serif font-semibold text-amber-300 bg-purple-950/80 px-3 py-1 rounded-2xl border border-amber-400/30 text-center leading-snug w-40 sm:w-48 min-h-[2rem] flex items-center justify-center">
                      {getSlotLabel(idx)}
                    </span>

                    <div className="relative">
                      {/* Vòng sáng lan ra lúc lật */}
                      {showBurst && (
                        <>
                          <span
                            className="pointer-events-none absolute inset-0 z-20 rounded-2xl border-2 animate-reveal-ring"
                            style={{ borderColor: card.color || theme.color }}
                          />
                          <SparkleBurst />
                        </>
                      )}

                      <TarotCard
                        card={card}
                        deckTheme={theme}
                        isFlipped={!!flippedMap[idx]}
                        onClick={() => toggleFlipCard(idx)}
                        lang={lang}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {drawnCards.length > 2 && (
              <p className="text-xs text-gray-400 text-center sm:hidden pt-2 italic">
                ← Vuốt ngang để xem hết các lá bài đã rút →
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sang phần luận giải */}
      {isDeckFull && (
        <div className="text-center pt-2 sm:pt-4">
          <button
            onClick={handleProceedToReading}
            className="btn-gold px-7 sm:px-9 py-3.5 text-base sm:text-lg font-serif tracking-wider uppercase shadow-xl animate-pulse-glow"
          >
            {t.viewReadingBtn}
            <ChevronRight className="w-5 h-5 text-purple-950" />
          </button>
        </div>
      )}

    </div>
  );
};
