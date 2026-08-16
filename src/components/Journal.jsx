import React, { useState, useEffect } from 'react';
import { Bookmark, Sparkles, Trash2, Calendar, HelpCircle, MessageSquare, Hash, Orbit, Compass } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

/* Nhật ký chứa ba loại bản ghi: phiên trải bài Tarot, hồ sơ Thần Số Học và hồ
   sơ Huyền Học. Bản ghi Tarot cũ được lưu trước khi có trường `type` nên mặc
   định coi như 'tarot' - không được để chúng biến mất khỏi nhật ký của khách. */
const ENTRY_STYLES = {
  tarot: { Icon: Compass, accent: 'text-amber-300', border: 'hover:border-amber-400/50' },
  numerology: { Icon: Hash, accent: 'text-emerald-300', border: 'hover:border-emerald-400/50' },
  mysticism: { Icon: Orbit, accent: 'text-purple-300', border: 'hover:border-purple-400/50' }
};

export const Journal = ({ lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadJournal();
  }, []);

  const loadJournal = () => {
    try {
      const data = JSON.parse(localStorage.getItem('celestial_tarot_journal') || '[]');
      setEntries(Array.isArray(data) ? data : []);
    } catch (e) {
      setEntries([]);
    }
  };

  const handleDelete = (id) => {
    cosmicAudio.playSparkleSound();
    const updated = entries.filter(e => e.id !== id);
    localStorage.setItem('celestial_tarot_journal', JSON.stringify(updated));
    setEntries(updated);
  };

  const handleClearAll = () => {
    if (window.confirm(t.clearAllConfirm)) {
      cosmicAudio.playSparkleSound();
      localStorage.removeItem('celestial_tarot_journal');
      setEntries([]);
    }
  };

  const typeLabel = (type) => {
    if (type === 'numerology') return t.journalTypeNumerology;
    if (type === 'mysticism') return t.journalTypeMysticism;
    return t.journalTypeTarot;
  };

  // Ô nhỏ hiển thị một cặp nhãn - giá trị, dùng lại cho cả hai loại hồ sơ mới.
  const Fact = ({ label, value }) => (
    <div className="px-3 py-2 rounded-xl bg-space/70 border border-purple-400/20 min-w-0">
      <span className="text-2xs text-gray-400 block truncate">{label}</span>
      <span className="text-xs font-semibold text-gray-100 block truncate">{value}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-300 text-xs font-semibold">
            <Bookmark className="w-3.5 h-3.5 text-pink-400" />
            {t.journalBadge}
          </div>
          <h2 className="text-2xl md:text-3xl font-serif gold-gradient-text font-bold">
            {t.journalTitle}
          </h2>
        </div>

        {entries.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-300 text-xs hover:bg-rose-900/80 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {t.clearAllBtn}
          </button>
        )}
      </div>

      {/* Journal List */}
      {entries.length === 0 ? (
        <div className="glass-panel p-12 text-center space-y-4">
          <Sparkles className="w-10 h-10 text-amber-400/40 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-gray-300">
            {t.emptyJournalTitle}
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            {t.emptyJournalDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((item) => {
            const type = item.type || 'tarot';
            const style = ENTRY_STYLES[type] || ENTRY_STYLES.tarot;
            const { Icon } = style;

            return (
              <div
                key={item.id}
                className={`glass-panel p-6 space-y-4 transition-all relative group ${style.border}`}
              >
                {/* Header Info */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-purple-500/20 pb-3">
                  <div className="space-y-1 min-w-0">
                    <span className={`text-2xs uppercase tracking-widest font-semibold flex items-center gap-1.5 ${style.accent}`}>
                      <Icon className="w-3.5 h-3.5" />
                      {typeLabel(type)}
                      {type === 'tarot' && item.spreadTitle ? ` • ${item.spreadTitle}` : ''}
                    </span>

                    {type === 'tarot' ? (
                      <h4 className="font-serif font-bold text-base text-gray-100 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        "{item.question}"
                      </h4>
                    ) : (
                      <h4 className="font-serif font-bold text-base text-gray-100 truncate">
                        {item.name || t.profileAnonymous}
                        {item.birthDate && (
                          <span className="text-gray-400 font-sans font-normal text-sm"> • {item.birthDate}</span>
                        )}
                      </h4>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-300" />
                      {item.date}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      aria-label={t.clearAllBtn}
                      className="p-1.5 rounded-full text-gray-400 hover:text-rose-400 hover:bg-rose-950/60 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Thân bản ghi theo từng loại */}
                {type === 'tarot' && (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {item.cards?.map((card, idx) => (
                        <div key={idx} className="px-3 py-1.5 rounded-xl bg-space/70 border border-purple-400/20 flex items-center gap-2 text-xs">
                          <span>{card.icon || '🔮'}</span>
                          <span className="font-medium text-gray-200">{card.nameVi}</span>
                          <span className={`text-2xs ${card.isReversed ? 'text-rose-300' : 'text-emerald-300'}`}>
                            ({card.isReversed ? t.reversedBadge : t.uprightBadge})
                          </span>
                        </div>
                      ))}
                    </div>

                    {item.affirmation && (
                      <p className="text-xs text-amber-200/90 italic bg-purple-950/40 p-3 rounded-xl border border-amber-400/20">
                        ✨ "{item.affirmation}"
                      </p>
                    )}
                  </>
                )}

                {type === 'numerology' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 shrink-0 rounded-xl bg-emerald-950/40 border border-emerald-400/40 flex items-center justify-center font-serif font-bold text-lg text-emerald-300">
                        {item.lifePath}
                      </span>
                      <div className="min-w-0">
                        <span className="text-2xs text-gray-400 block">{t.numLabels.lifePath.name}</span>
                        <span className="text-sm font-serif font-bold text-emerald-200 truncate block">
                          {item.lifePathTitle}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {item.numbers?.filter(n => n.key !== 'lifePath').map(n => (
                        <Fact key={n.key} label={t.numLabels[n.key]?.name || n.key} value={n.value} />
                      ))}
                      {item.personalYear != null && (
                        <Fact label={t.numPersonalYearTitle} value={item.personalYear} />
                      )}
                    </div>
                  </div>
                )}

                {type === 'mysticism' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {item.canChi && <Fact label={t.mysCanChiLabel} value={`${item.canChi}${item.animal ? ` (${item.animal})` : ''}`} />}
                    {item.napAm && <Fact label={t.mysNapAm} value={item.napAm} />}
                    {item.destinyElement && <Fact label={t.mysDestinyElement} value={item.destinyElement} />}
                    {item.kua != null && <Fact label={t.mysKuaNumber} value={`${item.kua} — ${item.trigram}`} />}
                    {item.zodiac && <Fact label={t.mysZodiacTitle} value={item.zodiac} />}
                    {item.goodDirections?.length > 0 && (
                      <Fact label={t.mysGoodDirections} value={item.goodDirections.join(', ')} />
                    )}
                  </div>
                )}

                {/* User Note */}
                {item.userNote && (
                  <div className="flex items-start gap-2 text-xs text-gray-300 pt-1">
                    <MessageSquare className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <span className="font-semibold text-pink-300 block">{t.userNoteLabel}</span>
                      <p className="font-light">{item.userNote}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
