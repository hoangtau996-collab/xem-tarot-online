import React, { useState } from 'react';
import { getSpreadTypes, getTarotDecksThemes } from '../data/tarotData';
import { Sparkles, HelpCircle, Layers, Compass } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

export const SpreadSelector = ({ onSelectSpread, lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const spreadTypes = getSpreadTypes(lang);
  const deckThemes = getTarotDecksThemes(lang);

  const [selectedSpread, setSelectedSpread] = useState(spreadTypes[3] || spreadTypes[0]);
  const [selectedDeckTheme, setSelectedDeckTheme] = useState(deckThemes[0]);
  const [question, setQuestion] = useState('');

  const quickTopicsByLang = {
    vi: [
      { label: '💖 Tình cảm & Mối quan hệ', text: 'Chuyện tình cảm và kết nối của tôi trong thời gian tới như thế nào?' },
      { label: '💼 Sự nghiệp & Học tập', text: 'Định hướng công việc và học tập sắp tới của tôi ra sao?' },
      { label: '💰 Tài chính & Tiền bạc', text: 'Dòng chảy tài chính và cơ hội tiền bạc của tôi thế nào?' },
      { label: '🌟 Vận mệnh tổng quan', text: 'Vũ trụ có thông điệp gì quan trọng dành cho cuộc sống của tôi lúc này?' }
    ],
    en: [
      { label: '💖 Love & Relationship', text: 'What is the future guidance for my love life and relationships?' },
      { label: '💼 Career & Education', text: 'What is the career and study orientation for me in the coming months?' },
      { label: '💰 Finance & Wealth', text: 'How will my financial flow and money opportunities evolve?' },
      { label: '🌟 General Destiny', text: 'What important cosmic message does the Universe have for me right now?' }
    ],
    zh: [
      { label: '💖 感情与羁绊', text: '未来一段时间我的感情生活与人际关系将如何发展？' },
      { label: '💼 事业与学业', text: '接下来的事业、工作与学业方向有哪些重要启示？' },
      { label: '💰 财务与财富', text: '我的财务状况与财富机会将呈现怎样的趋势？' },
      { label: '🌟 整体命运指引', text: '此时此刻宇宙对我的人生有哪些最重要的启示？' }
    ]
  };

  const currentTopics = quickTopicsByLang[lang] || quickTopicsByLang.vi;

  const handleStart = (e) => {
    e.preventDefault();
    cosmicAudio.playShuffleSound();
    cosmicAudio.startAmbient();
    onSelectSpread(selectedSpread, selectedDeckTheme, question.trim() || t.defaultQuestion);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          {t.portalBadge}
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold font-serif gold-gradient-text">
          {t.mainHeading}
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base font-light">
          {t.subHeading}
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleStart} className="glass-panel p-6 md:p-8 space-y-8">
        
        {/* Step 1: Select Deck Theme */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-amber-300 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            {t.step1Deck}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {deckThemes.map((theme) => {
              const isSelected = selectedDeckTheme.id === theme.id;
              return (
                <div
                  key={theme.id}
                  onClick={() => {
                    setSelectedDeckTheme(theme);
                    cosmicAudio.playSparkleSound();
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-950/90 border-amber-400 shadow-lg shadow-amber-500/25 scale-[1.03]'
                      : 'bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{theme.icon}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-purple-900/60 text-purple-200 border border-purple-400/30">
                      {theme.styleTag}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-gray-100 mb-1">
                      {theme.name}
                    </h4>
                    <p className="text-[11px] text-gray-300 font-light leading-snug line-clamp-2">
                      {theme.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-purple-500/20 flex items-center justify-between text-[10px] text-amber-300 font-serif">
                    <span>{theme.symbol} {theme.englishName}</span>
                    {isSelected && <span className="font-bold">{t.selectedBadge}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Spread Type */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-cyan-300 uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            {t.step2Spread}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spreadTypes.map((spread) => {
              const isSelected = selectedSpread.id === spread.id;
              return (
                <div
                  key={spread.id}
                  onClick={() => {
                    setSelectedSpread(spread);
                    cosmicAudio.playSparkleSound();
                  }}
                  className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-purple-950/80 border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{spread.icon}</span>
                      <div>
                        <h4 className="font-serif font-bold text-base text-gray-100 flex items-center gap-2">
                          {spread.title}
                        </h4>
                        <span className="text-xs text-purple-300 font-medium">
                          {spread.cardCount} {t.cardsUnit}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isSelected ? 'bg-amber-400 text-purple-950' : 'bg-purple-900/60 text-purple-200'
                    }`}>
                      {spread.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-gray-300 leading-relaxed font-light">
                    {spread.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Intention & Question */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-pink-300 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            {t.step3Question}
          </label>

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.questionPlaceholder}
            className="w-full px-5 py-3.5 rounded-xl bg-space/80 border border-purple-400/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-sm transition-all"
          />

          {/* Quick topic buttons */}
          <div className="space-y-2">
            <span className="text-xs text-gray-400">{t.quickQuestionLabel}</span>
            <div className="flex flex-wrap gap-2">
              {currentTopics.map((topic, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuestion(topic.text);
                    cosmicAudio.playSparkleSound();
                  }}
                  className="px-3 py-1.5 rounded-full bg-purple-900/30 border border-purple-400/20 text-xs text-purple-200 hover:border-amber-400/50 hover:text-amber-300 transition-all"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 text-center">
          <button
            type="submit"
            className="btn-gold w-full md:w-auto px-10 py-4 text-base font-serif tracking-wider uppercase animate-pulse-glow"
          >
            <Sparkles className="w-5 h-5 text-purple-950" />
            {t.startDrawBtn}
          </button>
        </div>

      </form>
    </div>
  );
};
