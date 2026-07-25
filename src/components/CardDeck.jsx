import React, { useState, useEffect } from 'react';
import { TAROT_DECK, getRandomDeckDraw, TAROT_DECKS_THEMES } from '../data/tarotData';
import { TarotCard } from './TarotCard';
import { Sparkles, Shuffle, Eye, ChevronRight, Layers } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

export const CardDeck = ({ spread, deckTheme, question, onCompleteDraw, lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [drawnCards, setDrawnCards] = useState([]);
  const [flippedMap, setFlippedMap] = useState({});
  const [isShuffling, setIsShuffling] = useState(false);

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
    setDrawnCards([]);
    setFlippedMap({});
  }, [spread, deckTheme]);

  const handleShuffle = () => {
    setIsShuffling(true);
    cosmicAudio.playShuffleSound();
    setTimeout(() => {
      setIsShuffling(false);
      cosmicAudio.playSparkleSound();
    }, 1200);
  };

  const handleDrawCard = () => {
    if (drawnCards.length >= neededCount) return;
    
    const available = TAROT_DECK.filter(c => !drawnCards.some(d => d.id === c.id));
    if (available.length === 0) return;
    
    const randomCard = available[Math.floor(Math.random() * available.length)];
    const cardWithState = {
      ...randomCard,
      isReversed: Math.random() < 0.2
    };

    setDrawnCards(prev => [...prev, cardWithState]);
    cosmicAudio.playFlipSound();
  };

  const handleAutoDraw = () => {
    cosmicAudio.playShuffleSound();
    const cards = getRandomDeckDraw(neededCount);
    setDrawnCards(cards);
    setTimeout(() => {
      const newFlipped = {};
      cards.forEach((_, idx) => (newFlipped[idx] = true));
      setFlippedMap(newFlipped);
      cosmicAudio.playSparkleSound();
    }, 600);
  };

  const toggleFlipCard = (idx) => {
    cosmicAudio.playFlipSound();
    setFlippedMap(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleRevealAll = () => {
    const newFlipped = {};
    drawnCards.forEach((_, idx) => (newFlipped[idx] = true));
    setFlippedMap(newFlipped);
    cosmicAudio.playSparkleSound();
  };

  const handleProceedToReading = () => {
    cosmicAudio.playSparkleSound();
    onCompleteDraw(drawnCards);
  };

  const allFlipped = drawnCards.length === neededCount && drawnCards.every((_, idx) => flippedMap[idx]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Session Title Bar */}
      <div className="glass-panel p-4 sm:p-6 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold text-purple-300 uppercase tracking-widest">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>{theme.name} ({spread.title})</span>
        </div>
        <h3 className="text-lg sm:text-2xl font-serif gold-gradient-text">
          "{question || t.defaultQuestion}"
        </h3>
        <p className="text-xs text-gray-400">
          {t.drawnProgress} {drawnCards.length} / {neededCount} {t.cardsUnit}
        </p>
      </div>

      {/* Drawing Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
        <button
          onClick={handleShuffle}
          disabled={isShuffling}
          className="btn-cosmic text-xs sm:text-sm px-4 py-2.5"
        >
          <Shuffle className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
          {t.shuffleBtn} {theme.icon}
        </button>

        {drawnCards.length < neededCount && (
          <>
            <button
              onClick={handleDrawCard}
              className="btn-gold text-xs sm:text-sm px-4 py-2.5"
            >
              <Sparkles className="w-4 h-4 text-purple-950" />
              {t.drawSingleBtn}
            </button>

            <button
              onClick={handleAutoDraw}
              className="px-4 py-2.5 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-200 text-xs sm:text-sm font-semibold hover:bg-purple-800/80 transition-all active:scale-95"
            >
              {t.autoDrawBtn}
            </button>
          </>
        )}

        {drawnCards.length === neededCount && !allFlipped && (
          <button
            onClick={handleRevealAll}
            className="btn-gold text-xs sm:text-sm px-5 py-2.5 animate-bounce"
          >
            <Eye className="w-4 h-4 text-purple-950" />
            {t.revealAllBtn}
          </button>
        )}
      </div>

      {/* Drawn Cards Display Area (Scrollable on mobile) */}
      <div className="min-h-[340px] flex items-center justify-center">
        {drawnCards.length === 0 ? (
          /* Card Back Fan Deck Placeholders */
          <div className="relative w-full max-w-sm sm:max-w-md h-64 sm:h-72 flex items-center justify-center">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                onClick={handleDrawCard}
                style={{
                  transform: `translateX(${(i - 3) * (window.innerWidth < 640 ? 18 : 28)}px) rotate(${(i - 3) * 5}deg)`,
                  transitionDelay: `${i * 40}ms`
                }}
                className={`absolute cursor-pointer transition-transform duration-500 hover:-translate-y-6 active:scale-95 ${
                  isShuffling ? 'animate-pulse' : ''
                }`}
              >
                <TarotCard
                  card={{ nameVi: theme.name }}
                  deckTheme={theme}
                  isFlipped={false}
                  lang={lang}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Drawn Cards Responsive Grid / Swipe container */
          <div className="w-full">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center items-center overflow-x-auto pb-4 sm:pb-0 mobile-card-scroll">
              {drawnCards.map((card, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-2 flex-shrink-0">
                  <span className="text-[11px] sm:text-xs font-serif font-semibold text-amber-300 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/30 text-center truncate max-w-[140px]">
                    {getSlotLabel(idx)}
                  </span>
                  
                  <TarotCard
                    card={card}
                    deckTheme={theme}
                    isFlipped={!!flippedMap[idx]}
                    onClick={() => toggleFlipCard(idx)}
                    lang={lang}
                  />
                </div>
              ))}
            </div>
            {drawnCards.length > 2 && (
              <p className="text-[10px] text-gray-400 text-center sm:hidden pt-2 italic">
                ← Vuốt ngang để xem hết các lá bài đã rút →
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action to Proceed to Interpretation */}
      {drawnCards.length === neededCount && (
        <div className="text-center pt-2 sm:pt-4">
          <button
            onClick={handleProceedToReading}
            className="btn-gold px-6 sm:px-8 py-3 text-sm sm:text-base font-serif tracking-wider uppercase shadow-xl animate-pulse-glow"
          >
            {t.viewReadingBtn}
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-950" />
          </button>
        </div>
      )}

    </div>
  );
};
