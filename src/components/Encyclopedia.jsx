import React, { useState, useEffect } from 'react';
import { TAROT_DECK } from '../data/tarotData';
import { Search, Sparkles, Filter, X, Link2, Check } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { buildPath, navigate, absoluteUrl } from '../utils/router';

/* Bộ lọc và lá bài đang mở đều lấy từ link chứ không phải state nội bộ, nên mỗi
   lá bài có một địa chỉ riêng gửi cho khách được:
     #/tra-cuu                  - toàn bộ
     #/tra-cuu/an-chinh         - lọc Ẩn Chính
     #/tra-cuu/la/major-0       - mở thẳng lá Chàng Khờ */
export const Encyclopedia = ({ lang = 'vi', arcana = 'All', cardId = null }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedCard = cardId ? TAROT_DECK.find(card => card.id === cardId) : null;

  // Link trỏ tới lá bài không tồn tại (gõ sai, hoặc lá bị gỡ khỏi bộ): đưa về
  // trang tra cứu bằng replace để nút Quay lại không dẫn vào lại link hỏng.
  useEffect(() => {
    if (cardId && !selectedCard) navigate(buildPath('encyclopedia'), { replace: true });
  }, [cardId, selectedCard]);

  // Đổi lá bài thì huỷ trạng thái "đã sao chép" của lá trước.
  useEffect(() => setCopiedLink(false), [cardId]);

  const cardName = (card) => (lang === 'en' ? card.name : lang === 'zh' ? (card.nameZh || card.name) : card.nameVi);

  const filteredCards = TAROT_DECK.filter(card => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      cardName(card).toLowerCase().includes(query) ||
      card.name.toLowerCase().includes(query) ||
      card.keywords.some(k => k.toLowerCase().includes(query));

    const matchesArcana = arcana === 'All' || card.arcana === arcana;

    return matchesSearch && matchesArcana;
  });

  const closeModal = () => {
    cosmicAudio.playSparkleSound();
    navigate(buildPath('encyclopedia', { arcana }));
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl(buildPath('encyclopedia', { cardId: selectedCard.id })));
      setCopiedLink(true);
      cosmicAudio.playSparkleSound();
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (e) {
      console.error('Failed to copy card link', e);
    }
  };

  const arcanaFilters = [
    { value: 'All', label: t.filterAll },
    { value: 'Major', label: t.filterMajor },
    { value: 'Minor', label: t.filterMinor }
  ];

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

        {/* Bộ lọc là link riêng, chia sẻ được */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-amber-400 hidden sm:inline" />
          {arcanaFilters.map(({ value, label }) => (
            <a
              key={value}
              href={buildPath('encyclopedia', { arcana: value })}
              onClick={() => cosmicAudio.playSparkleSound()}
              aria-current={arcana === value ? 'true' : undefined}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all no-underline ${
                arcana === value
                  ? 'bg-amber-400 text-purple-950 shadow-md shadow-amber-500/20'
                  : 'bg-purple-900/40 text-purple-200 border border-purple-400/20 hover:bg-purple-800/60'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCards.map((card) => (
          <a
            key={card.id}
            href={buildPath('encyclopedia', { cardId: card.id })}
            onClick={() => cosmicAudio.playSparkleSound()}
            className="glass-panel p-4 flex flex-col items-center justify-between text-center cursor-pointer hover:border-amber-400/60 hover:scale-105 transition-all group no-underline"
          >
            <span className="text-4xl my-3 group-hover:scale-110 transition-transform">
              {card.icon}
            </span>
            <div className="space-y-1 w-full">
              <span className="text-2xs text-amber-300 font-serif font-semibold block">
                Nº {card.number}
              </span>
              <h4 className="font-serif font-bold text-xs text-gray-100 line-clamp-1">
                {cardName(card)}
              </h4>
              <span className="text-2xs text-cyan-300 font-medium block">
                {card.element}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-xl w-full p-6 space-y-6 relative border-amber-400/50 max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              aria-label={t.closeModalBtn}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-purple-500/20 pb-4 pr-8">
              <span className="text-6xl">{selectedCard.icon}</span>
              <div>
                <span className="text-xs text-amber-300 font-serif">Nº {selectedCard.number}</span>
                <h3 className="font-serif font-bold text-2xl gold-gradient-text">
                  {cardName(selectedCard)}
                </h3>
                <p className="text-xs text-purple-300 font-medium">
                  {selectedCard.arcana} Arcana • Element {selectedCard.element}
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                {t.keywordsTitle}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCard.keywords?.map((kw, i) => (
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
                {lang === 'en'
                  ? selectedCard.upright?.summaryEn
                  : lang === 'zh'
                    ? selectedCard.upright?.summaryZh
                    : selectedCard.upright?.summary}
              </p>
            </div>

            {/* Reversed Detail */}
            <div className="p-4 rounded-xl bg-space/60 border border-rose-400/30 space-y-2">
              <h4 className="font-serif font-bold text-rose-300 text-sm">
                {t.reversedMeaningTitle}
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                {lang === 'en'
                  ? selectedCard.reversed?.summaryEn
                  : lang === 'zh'
                    ? selectedCard.reversed?.summaryZh
                    : selectedCard.reversed?.summary}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleCopyLink}
                className={`text-xs py-2 px-5 rounded-full border font-semibold transition-all flex items-center gap-1.5 ${
                  copiedLink
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-purple-900/50 text-purple-100 border-purple-400/40 hover:bg-purple-800/70'
                }`}
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                {copiedLink ? t.copiedLinkBtn : t.copyLinkBtn}
              </button>

              <button onClick={closeModal} className="btn-gold text-xs py-2 px-6">
                {t.closeModalBtn}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
