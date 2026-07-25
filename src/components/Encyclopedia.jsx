import React, { useState } from 'react';
import { TAROT_DECK } from '../data/tarotData';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

export const Encyclopedia = ({ lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArcana, setSelectedArcana] = useState('All');
  const [selectedCardModal, setSelectedCardModal] = useState(null);

  const filteredCards = TAROT_DECK.filter(card => {
    const cardName = lang === 'en' ? card.name : card.nameVi;
    const matchesSearch =
      cardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesArcana =
      selectedArcana === 'All' ||
      (selectedArcana === 'Major' && card.arcana === 'Major') ||
      (selectedArcana === 'Minor' && card.arcana === 'Minor');

    return matchesSearch && matchesArcana;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-300" />
          {t.encyclopediaTitle}
        </div>
        <h2 className="text-3xl md:text-4xl font-serif gold-gradient-text">
          {t.encyclopediaTitle}
        </h2>
        <p className="text-gray-300 text-sm max-w-xl mx-auto font-light">
          {t.encyclopediaDesc}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space/80 border border-purple-400/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-xs md:text-sm"
          />
        </div>

        {/* Arcana Filter Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-amber-400 hidden sm:inline" />
          {['All', 'Major', 'Minor'].map((arcana) => (
            <button
              key={arcana}
              onClick={() => {
                setSelectedArcana(arcana);
                cosmicAudio.playSparkleSound();
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedArcana === arcana
                  ? 'bg-amber-400 text-purple-950 shadow-md shadow-amber-500/20'
                  : 'bg-purple-900/40 text-purple-200 border border-purple-400/20 hover:bg-purple-800/60'
              }`}
            >
              {arcana === 'All' ? t.filterAll : arcana === 'Major' ? t.filterMajor : t.filterMinor}
            </button>
          ))}
        </div>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              setSelectedCardModal(card);
              cosmicAudio.playSparkleSound();
            }}
            className="glass-panel p-4 flex flex-col items-center justify-between text-center cursor-pointer hover:border-amber-400/60 hover:scale-105 transition-all group"
          >
            <span className="text-4xl my-3 group-hover:scale-110 transition-transform">
              {card.icon}
            </span>
            <div className="space-y-1 w-full">
              <span className="text-[10px] text-amber-300 font-serif font-semibold block">
                Nº {card.number}
              </span>
              <h4 className="font-serif font-bold text-xs text-gray-100 line-clamp-1">
                {lang === 'en' ? card.name : card.nameVi}
              </h4>
              <span className="text-[10px] text-cyan-300 font-medium block">
                {card.element}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Card Detail Modal */}
      {selectedCardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-xl w-full p-6 space-y-6 relative border-amber-400/50 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCardModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-purple-500/20 pb-4">
              <span className="text-6xl">{selectedCardModal.icon}</span>
              <div>
                <span className="text-xs text-amber-300 font-serif">Nº {selectedCardModal.number}</span>
                <h3 className="font-serif font-bold text-2xl gold-gradient-text">
                  {lang === 'en' ? selectedCardModal.name : selectedCardModal.nameVi}
                </h3>
                <p className="text-xs text-purple-300 font-medium">
                  {selectedCardModal.arcana} Arcana • Element {selectedCardModal.element}
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                {t.keywordsTitle}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCardModal.keywords?.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-purple-900/60 text-xs text-purple-200">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Upright Detail */}
            <div className="p-4 rounded-xl bg-space/60 border border-emerald-400/30 space-y-2">
              <h4 className="font-serif font-bold text-emerald-300 text-sm">
                {t.uprightMeaningTitle}
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                {selectedCardModal.upright?.summary}
              </p>
            </div>

            {/* Reversed Detail */}
            <div className="p-4 rounded-xl bg-space/60 border border-rose-400/30 space-y-2">
              <h4 className="font-serif font-bold text-rose-300 text-sm">
                {t.reversedMeaningTitle}
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                {selectedCardModal.reversed?.summary}
              </p>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setSelectedCardModal(null)}
                className="btn-gold text-xs py-2 px-6"
              >
                {t.closeModalBtn}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
