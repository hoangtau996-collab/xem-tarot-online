import React, { useState } from 'react';
import { analyzeReadingSession } from '../utils/tarotEngine';
import {
  Sparkles, User, Heart, Briefcase, DollarSign, Compass,
  Bookmark, Share2, Check, RefreshCw, X
} from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

export const ReadingResult = ({
  drawnCards,
  spread,
  question,
  onReset,
  lang = 'vi'
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const analysis = analyzeReadingSession(drawnCards, spread.id, question, lang);
  const [activeAspectTab, setActiveAspectTab] = useState('situation');
  const [selectedCardModal, setSelectedCardModal] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [userNote, setUserNote] = useState('');

  if (!analysis) return null;

  const aspectTabs = [
    { id: 'situation', label: t.aspectSituation, icon: User, color: 'text-amber-300' },
    { id: 'love', label: t.aspectLove, icon: Heart, color: 'text-pink-400' },
    { id: 'work', label: t.aspectWork, icon: Briefcase, color: 'text-cyan-400' },
    { id: 'finance', label: t.aspectFinance, icon: DollarSign, color: 'text-emerald-400' },
    { id: 'advice', label: t.aspectAdvice, icon: Compass, color: 'text-purple-400' }
  ];

  const handleSaveJournal = () => {
    try {
      const existing = JSON.parse(localStorage.getItem('celestial_tarot_journal') || '[]');
      const newEntry = {
        id: 'journal-' + Date.now(),
        date: analysis.date,
        question: question || t.defaultQuestion,
        spreadTitle: spread.title,
        cards: drawnCards.map(c => ({
          nameVi: lang === 'en' ? c.name : lang === 'zh' ? (c.nameZh || c.name) : c.nameVi,
          isReversed: c.isReversed,
          icon: c.icon
        })),
        dominantElement: analysis.stats.dominantElement,
        affirmation: analysis.affirmation,
        userNote: userNote.trim()
      };
      localStorage.setItem('celestial_tarot_journal', JSON.stringify([newEntry, ...existing]));
      setSavedSuccess(true);
      cosmicAudio.playSparkleSound();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save journal entry', e);
    }
  };

  const handleCopyShare = () => {
    const summaryText = `🔮 ${t.appTitle} - Reading Result\n` +
      `📅 Date: ${analysis.date}\n` +
      `❓ Question: ${question || t.defaultQuestion}\n` +
      `🎴 Cards: ${drawnCards.map(c => `${lang === 'en' ? c.name : lang === 'zh' ? (c.nameZh || c.name) : c.nameVi} (${c.isReversed ? 'Reversed' : 'Upright'})`).join(', ')}\n` +
      `🌟 Element: ${analysis.stats.dominantElement}\n` +
      `✨ Affirmation: ${analysis.affirmation}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSuccess(true);
    cosmicAudio.playSparkleSound();
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* Top Banner & Question Header */}
      <div className="glass-panel p-6 md:p-8 text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          {t.resultBadge}
        </div>
        <h2 className="text-2xl md:text-4xl font-serif gold-gradient-text">
          {t.resultHeading}
        </h2>
        <p className="text-gray-300 text-sm md:text-base italic">
          "{question || t.defaultQuestion}"
        </p>

        {/* Quick Stats Grid */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-space/60 border border-purple-500/20">
            <span className="text-gray-400 block">{t.statTotal}</span>
            <span className="font-bold text-amber-300 text-sm">{analysis.stats.total} {t.cardsUnit}</span>
          </div>
          <div className="p-3 rounded-xl bg-space/60 border border-purple-500/20">
            <span className="text-gray-400 block">{t.statMajor}</span>
            <span className="font-bold text-purple-300 text-sm">{analysis.stats.majorCount} {t.cardsUnit}</span>
          </div>
          <div className="p-3 rounded-xl bg-space/60 border border-purple-500/20">
            <span className="text-gray-400 block">{t.statReversed}</span>
            <span className="font-bold text-pink-300 text-sm">{analysis.stats.reversedCount} {t.cardsUnit}</span>
          </div>
          <div className="p-3 rounded-xl bg-space/60 border border-purple-500/20">
            <span className="text-gray-400 block">{t.statElement}</span>
            <span className="font-bold text-cyan-300 text-sm">{analysis.stats.dominantElement}</span>
          </div>
        </div>
      </div>

      {/* Drawn Cards Quick Gallery */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-widest flex items-center gap-2">
          <span>{t.drawnCardsTitle}</span>
          <span className="text-xs text-gray-400 font-normal">{t.clickDetailHint}</span>
        </h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {drawnCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedCardModal(card);
                cosmicAudio.playSparkleSound();
              }}
              className="glass-panel p-3.5 flex items-center gap-3 cursor-pointer hover:border-amber-400/60 hover:scale-105 transition-all w-full sm:w-auto"
            >
              <span className="text-3xl">{card.icon}</span>
              <div>
                <h4 className="font-serif font-bold text-sm text-gray-100">
                  {lang === 'en' ? card.name : lang === 'zh' ? (card.nameZh || card.name) : card.nameVi}
                </h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-purple-300">{card.arcana}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    card.isReversed ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'
                  }`}>
                    {card.isReversed ? t.reversedBadge : t.uprightBadge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Aspect Interpretation Section */}
      <div className="glass-panel p-6 md:p-8 space-y-6">
        
        {/* Aspect Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-purple-500/20 pb-4">
          {aspectTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeAspectTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveAspectTab(tab.id);
                  cosmicAudio.playSparkleSound();
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all ${
                  isActive
                    ? 'bg-purple-900/90 text-amber-300 border border-amber-400/50 shadow-lg shadow-purple-950/60'
                    : 'bg-space/40 text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Aspect Content Body */}
        <div className="space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center border border-amber-400/30">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="text-xl font-serif gold-gradient-text font-bold">
              {t.aspectHeading} {aspectTabs.find(t => t.id === activeAspectTab)?.label}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {analysis.aspects[activeAspectTab]?.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-space/60 border border-purple-400/25 space-y-2 hover:border-amber-400/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-amber-300 text-sm md:text-base">
                    Card #{item.cardIndex}: {item.cardName}
                  </h4>
                  <span className="text-xs text-gray-400 italic">{item.summary}</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed font-light">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Cosmic Affirmation Banner */}
      <div className="glass-panel-purple p-6 md:p-8 text-center space-y-3 relative overflow-hidden">
        <Sparkles className="w-6 h-6 text-amber-300 mx-auto animate-pulse" />
        <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-widest">
          {t.affirmationTitle}
        </h4>
        <p className="text-base md:text-xl font-serif text-amber-200 italic max-w-2xl mx-auto">
          "{analysis.affirmation}"
        </p>
      </div>

      {/* User Journal & Notes Input */}
      <div className="glass-panel p-6 space-y-4">
        <h4 className="font-serif font-bold text-amber-300 text-base flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-pink-400" />
          {t.journalNoteTitle}
        </h4>
        <textarea
          rows={3}
          value={userNote}
          onChange={(e) => setUserNote(e.target.value)}
          placeholder={t.notePlaceholder}
          className="w-full p-4 rounded-xl bg-space/80 border border-purple-400/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
        />

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleSaveJournal}
            className="btn-gold text-xs font-serif"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-purple-950" />
                {t.savedSuccessBtn}
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-purple-950" />
                {t.saveJournalBtn}
              </>
            )}
          </button>

          <button
            onClick={handleCopyShare}
            className="px-5 py-2.5 rounded-full bg-purple-900/50 border border-purple-400/40 text-purple-200 text-xs font-semibold hover:bg-purple-800/80 transition-all flex items-center gap-2"
          >
            {copiedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                {t.sharedSuccessBtn}
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-cyan-400" />
                {t.shareBtn}
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold hover:bg-white/10 transition-all ml-auto flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {t.newReadingBtn}
          </button>
        </div>
      </div>

      {/* Card Inspection Modal */}
      {selectedCardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full p-6 space-y-4 relative border-amber-400/50 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCardModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-purple-500/20 pb-4">
              <span className="text-5xl">{selectedCardModal.icon}</span>
              <div>
                <h3 className="font-serif font-bold text-xl text-amber-300">
                  {lang === 'en' ? selectedCardModal.name : lang === 'zh' ? (selectedCardModal.nameZh || selectedCardModal.name) : selectedCardModal.nameVi}
                </h3>
                <p className="text-xs text-purple-300">
                  {selectedCardModal.arcana} Arcana • Element {selectedCardModal.element}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  {t.keywordsTitle}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCardModal.keywords?.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-purple-900/60 text-xs text-purple-200">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                  {t.uprightMeaningTitle}
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {lang === 'en' ? selectedCardModal.upright?.summaryEn : lang === 'zh' ? selectedCardModal.upright?.summaryZh : selectedCardModal.upright?.summary}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-1">
                  {t.reversedMeaningTitle}
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {lang === 'en' ? selectedCardModal.reversed?.summaryEn : lang === 'zh' ? selectedCardModal.reversed?.summaryZh : selectedCardModal.reversed?.summary}
                </p>
              </div>
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
