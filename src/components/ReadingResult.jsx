import React, { useState, useRef, useMemo } from 'react';
import { analyzeReadingSession } from '../utils/tarotEngine';
import {
  Sparkles, User, Heart, Briefcase, DollarSign, Compass,
  Bookmark, Share2, Check, RefreshCw, X, Download, FileText, Layers
} from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import html2canvas from 'html2canvas';

export const ReadingResult = ({
  drawnCards,
  spread,
  question,
  onReset,
  lang = 'vi'
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  // Phải memo hoá: hàm này bốc thông điệp ngẫu nhiên và đóng dấu thời gian,
  // nên nếu gọi thẳng trong thân render thì mỗi lần re-render (bấm tab khía
  // cạnh, gõ ghi chú...) sẽ ra một thông điệp khác. Chỉ đổi khi sang lượt
  // trải bài mới, vì lúc đó drawnCards là một mảng mới.
  const analysis = useMemo(
    () => analyzeReadingSession(drawnCards, spread.id, question, lang),
    [drawnCards, spread.id, question, lang]
  );
  const [activeAspectTab, setActiveAspectTab] = useState('situation');
  const [selectedCardModal, setSelectedCardModal] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [userNote, setUserNote] = useState('');
  
  const posterRef = useRef(null);

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
      `🌟 Element: ${analysis.stats.dominantElement}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSuccess(true);
    cosmicAudio.playSparkleSound();
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  // 📄 Export Result to PDF (Print to PDF)
  const handleExportPDF = () => {
    cosmicAudio.playSparkleSound();
    window.print();
  };

  // 🖼️ Export Result to High-Res PNG Image via Dedicated Poster Template
  const handleExportImage = async () => {
    if (!posterRef.current) return;
    try {
      setIsExportingImage(true);
      cosmicAudio.playSparkleSound();

      posterRef.current.style.display = 'block';

      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        backgroundColor: '#0b0818',
        useCORS: true,
        logging: false
      });

      posterRef.current.style.display = 'none';

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `p_healing_tarot_reading_${Date.now()}.png`;
      link.click();

      setIsExportingImage(false);
    } catch (err) {
      console.error('Failed to capture image', err);
      if (posterRef.current) posterRef.current.style.display = 'none';
      setIsExportingImage(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* Interactive Screen Container */}
      <div className="space-y-8">
        
        {/* Top Banner & Question Header */}
        <div className="glass-panel p-6 md:p-8 text-center space-y-3 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            {t.resultBadge}
          </div>
          <h2 className="text-2xl md:text-4xl font-serif text-amber-300 font-bold tracking-wide">
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
                    <span className={`px-1.5 py-0.2 rounded text-2xs ${
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

        {/* 🔮 1. HOLISTIC INTERCONNECTED NARRATIVE SECTION */}
        <div className="glass-panel p-6 md:p-8 space-y-4 border-amber-400/40 relative overflow-hidden bg-gradient-to-br from-purple-950/70 via-space to-indigo-950/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-2xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/30">
                {t.holisticBadge}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-amber-300 font-bold mt-1">
                {t.holisticTitle}
              </h3>
            </div>
          </div>

          <div className="text-sm md:text-base text-gray-200 leading-relaxed space-y-4 pt-2 font-light border-t border-purple-500/20">
            {analysis.holisticNarrative.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('###')) {
                return null;
              }
              return (
                <p key={pIdx} className="bg-space/40 p-4 rounded-xl border border-purple-400/20">
                  {paragraph.split('**').map((chunk, cIdx) => (
                    cIdx % 2 === 1 ? (
                      <strong key={cIdx} className="text-amber-300 font-semibold">{chunk}</strong>
                    ) : (
                      chunk
                    )
                  ))}
                </p>
              );
            })}
          </div>
        </div>

        {/* 2. MAIN ASPECT INTERPRETATION SECTION */}
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
              <h3 className="text-xl font-serif text-amber-300 font-bold">
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

        {/* Thông điệp khẳng định từ Vũ Trụ đã tách khỏi phần giải bài:
            nay nằm ở quả cầu đầu trang (xem components/CosmicOrb.jsx). */}

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

          {/* Action Buttons Row with Export Options */}
          <div className="flex flex-wrap gap-3 pt-2 items-center">
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

            {/* Export PDF Button */}
            <button
              onClick={handleExportPDF}
              className="px-4 py-2.5 rounded-full bg-indigo-900/60 border border-indigo-400/40 text-indigo-200 text-xs font-semibold hover:bg-indigo-800/80 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              {t.exportPdfBtn}
            </button>

            {/* Export PNG Image Button */}
            <button
              onClick={handleExportImage}
              disabled={isExportingImage}
              className="px-4 py-2.5 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-200 text-xs font-semibold hover:bg-purple-800/80 transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-cyan-300" />
              {isExportingImage ? t.exportingHint : t.exportImageBtn}
            </button>

            <button
              onClick={handleCopyShare}
              className="px-4 py-2.5 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-200 text-xs font-semibold hover:bg-purple-800/80 transition-all flex items-center gap-1.5"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  {t.sharedSuccessBtn}
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-pink-300" />
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

      {/* 🌟 DEDICATED HIGH-RES PNG POSTER EXPORT TEMPLATE */}
      <div
        ref={posterRef}
        style={{
          display: 'none',
          width: '900px',
          padding: '40px',
          backgroundColor: '#0b0818',
          color: '#ffffff',
          fontFamily: "'Be Vietnam Pro', sans-serif"
        }}
      >
        <div style={{
          border: '2px solid #fbbf24',
          borderRadius: '24px',
          padding: '36px',
          backgroundColor: '#140e33',
          boxShadow: '0 0 40px rgba(0,0,0,0.8)'
        }}>
          {/* Poster Header */}
          <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(251,191,36,0.3)', paddingBottom: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/logo.jpg" alt="P Healing Logo" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid rgba(251,191,36,0.6)', marginBottom: '8px', objectFit: 'cover' }} />
            <div style={{ fontSize: '13px', color: '#fbbf24', letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              ✦ P HEALING ONLINE ✦
            </div>
            <div style={{ fontSize: '28px', color: '#fbbf24', fontFamily: "'Philosopher', serif", fontWeight: 'bold', margin: '8px 0' }}>
              {t.resultHeading}
            </div>
            <div style={{ fontSize: '15px', color: '#e9d5ff', fontStyle: 'italic' }}>
              "{question || t.defaultQuestion}"
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
              📅 {analysis.date}
            </div>
          </div>

          {/* Drawn Cards Grid Poster */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase' }}>
              🎴 {t.drawnCardsTitle}
            </div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {drawnCards.map((card, i) => (
                <div key={i} style={{
                  backgroundColor: '#0b0818',
                  border: '1px solid #c084fc',
                  borderRadius: '16px',
                  padding: '16px',
                  textAlign: 'center',
                  width: '150px'
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '6px' }}>{card.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fbbf24', fontFamily: "'Philosopher', serif" }}>
                    {lang === 'en' ? card.name : lang === 'zh' ? (card.nameZh || card.name) : card.nameVi}
                  </div>
                  <div style={{ fontSize: '11px', color: card.isReversed ? '#f43f5e' : '#10b981', marginTop: '4px' }}>
                    {card.isReversed ? t.reversedBadge : t.uprightBadge}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Holistic Narrative Poster Section */}
          <div style={{
            backgroundColor: '#0b0818',
            border: '1px solid #fbbf24',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fbbf24', marginBottom: '10px' }}>
              {t.holisticTitle}
            </div>
            <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: '1.65' }}>
              {analysis.holisticNarrative.replace(/###/g, '').replace(/\*\*/g, '')}
            </div>
          </div>

          {/* 5 Aspects Breakdown Poster */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '16px', borderBottom: '1px solid rgba(251,191,36,0.2)', paddingBottom: '8px' }}>
              🔮 {t.aspectHeading}
            </div>
            {aspectTabs.map(tab => (
              <div key={tab.id} style={{
                backgroundColor: '#0b0818',
                border: '1px solid rgba(192,132,252,0.3)',
                borderRadius: '14px',
                padding: '14px',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '6px' }}>
                  ✦ {tab.label}
                </div>
                {analysis.aspects[tab.id]?.map((item, idx) => (
                  <div key={idx} style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.6' }}>
                    <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{item.cardName}: </span>
                    {item.text}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer Signature */}
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#9ca3af', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            P Healing Online • Kết Nối Tâm Trí • Chữa Lành Cảm Xúc • Soi Sáng Tương Lai
          </div>

        </div>
      </div>

    </div>
  );
};
