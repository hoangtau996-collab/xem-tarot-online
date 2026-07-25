import React, { useState, useEffect } from 'react';
import { Bookmark, Sparkles, Trash2, Calendar, HelpCircle, MessageSquare } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

export const Journal = ({ lang = 'vi' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadJournal();
  }, []);

  const loadJournal = () => {
    try {
      const data = JSON.parse(localStorage.getItem('celestial_tarot_journal') || '[]');
      setEntries(data);
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
    if (window.confirm('Delete all journal entries?')) {
      cosmicAudio.playSparkleSound();
      localStorage.removeItem('celestial_tarot_journal');
      setEntries([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
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
            className="px-4 py-2 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-300 text-xs hover:bg-rose-900/80 transition-all flex items-center gap-1.5"
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
          {entries.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-6 space-y-4 hover:border-amber-400/50 transition-all relative group"
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-purple-500/20 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-300 uppercase tracking-widest font-semibold block">
                    {item.spreadTitle}
                  </span>
                  <h4 className="font-serif font-bold text-base text-gray-100 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    "{item.question}"
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-300" />
                    {item.date}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-rose-400 hover:bg-rose-950/60 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cards Summary */}
              <div className="flex flex-wrap gap-2">
                {item.cards?.map((card, idx) => (
                  <div key={idx} className="px-3 py-1.5 rounded-xl bg-space/70 border border-purple-400/20 flex items-center gap-2 text-xs">
                    <span>{card.icon || '🔮'}</span>
                    <span className="font-medium text-gray-200">{card.nameVi}</span>
                    <span className={`text-[10px] ${card.isReversed ? 'text-rose-300' : 'text-emerald-300'}`}>
                      ({card.isReversed ? t.reversedBadge : t.uprightBadge})
                    </span>
                  </div>
                ))}
              </div>

              {/* Affirmation */}
              {item.affirmation && (
                <p className="text-xs text-amber-200/90 italic bg-purple-950/40 p-3 rounded-xl border border-amber-400/20">
                  ✨ Advice: "{item.affirmation}"
                </p>
              )}

              {/* User Note */}
              {item.userNote && (
                <div className="flex items-start gap-2 text-xs text-gray-300 pt-1">
                  <MessageSquare className="w-4 h-4 text-pink-400 mt-0.5" />
                  <div>
                    <span className="font-semibold text-pink-300 block">{t.userNoteLabel}</span>
                    <p className="font-light">{item.userNote}</p>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
