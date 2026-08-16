import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, BookmarkCheck, Volume2, VolumeX, Compass, Disc, Globe, Settings2, Hash, Orbit } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { buildPath } from '../utils/router';
import { VisitorCounter } from './VisitorCounter';

const LANG_NAMES = {
  vi: '🇻🇳 Tiếng Việt',
  en: '🇬🇧 English',
  zh: '🇨🇳 中文'
};

export const Navbar = ({ activeTab, lang, setLang }) => {
  const [isMuted, setIsMuted] = useState(cosmicAudio.isMuted);
  const [volume, setVolume] = useState(cosmicAudio.volume);
  const [musicMode, setMusicMode] = useState(cosmicAudio.musicMode);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const langRef = useRef(null);
  const audioRef = useRef(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  // Năm tab chính, dùng chung cho thanh trên (laptop) và thanh dưới (di động).
  // Thanh dưới chỉ có 1/5 chiều ngang mỗi ô nên dùng nhãn ngắn cho khỏi vỡ chữ.
  const TABS = [
    { id: 'reading', label: t.navReading, short: t.navReadingShort, Icon: Compass, accent: 'text-amber-400' },
    { id: 'numerology', label: t.navNumerology, short: t.navNumerologyShort, Icon: Hash, accent: 'text-emerald-400' },
    { id: 'mysticism', label: t.navMysticism, short: t.navMysticismShort, Icon: Orbit, accent: 'text-purple-400' },
    { id: 'encyclopedia', label: t.navEncyclopedia, short: t.navEncyclopediaShort, Icon: BookOpen, accent: 'text-cyan-400' },
    { id: 'journal', label: t.navJournal, short: t.navJournalShort, Icon: BookmarkCheck, accent: 'text-pink-400' }
  ];

  // Chạm ra ngoài thì đóng dropdown - trên điện thoại rất dễ để menu mở lơ lửng
  useEffect(() => {
    if (!showLangMenu && !showAudioMenu) return;

    const handleOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setShowLangMenu(false);
      if (audioRef.current && !audioRef.current.contains(e.target)) setShowAudioMenu(false);
    };

    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [showLangMenu, showAudioMenu]);

  /* Các tab là thẻ <a href="#/..."> thật, nên việc chuyển trang do chính hash
     lo - ở đây chỉ phát âm thanh. Nhờ vậy khách bấm chuột phải mở tab mới hoặc
     sao chép địa chỉ liên kết đều được, thứ mà thẻ <button> không làm được. */
  const handleSelectTab = () => {
    cosmicAudio.playSparkleSound();
  };

  const handleToggleSound = () => {
    const muted = cosmicAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) cosmicAudio.playSparkleSound();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    cosmicAudio.setVolume(val);
  };

  const handleModeChange = (mode) => {
    setMusicMode(mode);
    cosmicAudio.setMusicMode(mode);
    cosmicAudio.playSparkleSound();
  };

  const handleSelectLang = (code) => {
    setLang(code);
    setShowLangMenu(false);
    cosmicAudio.playSparkleSound();
  };

  return (
    <>
      <header className="sticky top-0 z-50 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-amber-400/20 backdrop-blur-xl bg-space/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">

          {/* Thương hiệu */}
          <a
            href={buildPath('reading')}
            onClick={handleSelectTab}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group min-w-0 no-underline"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-600 shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
              <img src="/logo.jpg" alt="P Healing Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="min-w-0">
              {/* Tên thương hiệu không được cắt - nhãn phụ nhường chỗ trước */}
              <h1 className="text-lg sm:text-xl font-bold font-serif gold-gradient-text tracking-wide whitespace-nowrap">
                {t.appTitle}
              </h1>
              <p className="hidden sm:block text-2xs text-amber-300/80 tracking-widest uppercase font-medium truncate">
                {t.appSubtitle}
              </p>
            </div>
          </a>

          {/* Tab chính - chỉ hiện từ laptop trở lên. Năm tab không đủ chỗ ở khổ
              tablet nên tablet dùng chung thanh dưới với điện thoại. */}
          <nav className="hidden lg:flex items-center gap-1">
            {TABS.map(({ id, label, Icon, accent }) => (
              <a
                key={id}
                href={buildPath(id)}
                onClick={handleSelectTab}
                aria-current={activeTab === id ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all no-underline ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 border border-amber-400/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${accent}`} />
                <span>{label}</span>
              </a>
            ))}
          </nav>

          {/* Điều khiển phụ - luôn hiện, thu gọn dần trên màn nhỏ */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

            <VisitorCounter lang={lang} variant="navbar" />

            {/* Ngôn ngữ */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => { setShowLangMenu(v => !v); setShowAudioMenu(false); }}
                aria-label="Language"
                className="flex items-center gap-1 h-11 px-3 rounded-full border border-purple-400/30 text-sm text-amber-300 hover:bg-purple-900/40 transition-all font-semibold uppercase"
              >
                <Globe className="w-4 h-4 text-cyan-300" />
                {/* Trên điện thoại chỉ để icon, nhường chỗ cho tên thương hiệu */}
                <span className="hidden sm:inline">{lang.toUpperCase()}</span>
              </button>

              {showLangMenu && (
                <div className="absolute top-14 right-0 bg-space border border-amber-400/40 rounded-xl p-2 shadow-2xl z-50 w-44 space-y-1 backdrop-blur-2xl">
                  {Object.keys(LANG_NAMES).map((code) => (
                    <button
                      key={code}
                      onClick={() => handleSelectLang(code)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                        lang === code ? 'bg-amber-400 text-purple-950 font-bold' : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{LANG_NAMES[code]}</span>
                      {lang === code && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Âm thanh */}
            <div className="relative flex items-center gap-1.5" ref={audioRef}>
              <button
                onClick={handleToggleSound}
                title={isMuted ? 'Bật chuông xoay Tây Tạng' : 'Tắt âm thanh'}
                aria-label="Sound"
                className={`flex items-center gap-1.5 h-11 px-3 rounded-full border text-sm font-semibold transition-all ${
                  isMuted
                    ? 'border-gray-600 text-gray-500 bg-white/5'
                    : 'border-amber-400/50 text-amber-300 bg-amber-950/40 shadow-md shadow-amber-500/20'
                }`}
              >
                <span className="text-base">🥣</span>
                <span className="hidden lg:inline">{t.navZenMusic}</span>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>

              {!isMuted && (
                <button
                  onClick={() => { setShowAudioMenu(v => !v); setShowLangMenu(false); }}
                  title="Cài đặt âm thanh"
                  aria-label="Audio settings"
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-purple-400/30 text-purple-300 hover:text-white bg-white/5"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              )}

              {showAudioMenu && !isMuted && (
                <div className="absolute top-14 right-0 bg-space border border-amber-400/40 rounded-2xl p-4 shadow-2xl z-50 space-y-3 w-72 backdrop-blur-2xl">
                  <div className="text-sm font-semibold text-amber-300 border-b border-purple-500/20 pb-2">
                    🎛️ {t.navMusicMode}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleModeChange('tibetan')}
                      className={`p-3 rounded-xl text-xs font-medium flex flex-col items-center gap-1 border transition-all ${
                        musicMode === 'tibetan'
                          ? 'bg-amber-950/80 border-amber-400 text-amber-300 font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-lg">🥣</span>
                      <span>{t.modeStream}</span>
                    </button>

                    <button
                      onClick={() => handleModeChange('cosmic')}
                      className={`p-3 rounded-xl text-xs font-medium flex flex-col items-center gap-1 border transition-all ${
                        musicMode === 'cosmic'
                          ? 'bg-purple-950/80 border-purple-400 text-purple-300 font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <Disc className="w-5 h-5 text-purple-400" />
                      <span>{t.modeCosmic}</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{t.navVolume}</span>
                      <span>{Math.round(volume * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <VolumeX className="w-4 h-4 text-gray-400" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full accent-amber-400 cursor-pointer h-2 bg-purple-900 rounded-lg"
                      />
                      <Volume2 className="w-4 h-4 text-amber-300" />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Thanh điều hướng dưới cùng - dùng cho điện thoại và tablet.
          Tách 5 tab chính khỏi header nên header không còn chen chúc,
          và nằm sẵn trong tầm ngón tay cái. */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-amber-400/25 bg-space/95 backdrop-blur-xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-5">
          {TABS.map(({ id, short, Icon, accent }) => {
            const active = activeTab === id;
            return (
              <a
                key={id}
                href={buildPath(id)}
                onClick={handleSelectTab}
                aria-current={active ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center gap-1 py-2.5 min-h-[4.25rem] transition-colors no-underline ${
                  active ? 'text-amber-300' : 'text-gray-400 active:bg-white/5'
                }`}
              >
                {active && (
                  <span className="absolute top-0 inset-x-2.5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                )}
                <Icon className={`w-5 h-5 ${active ? accent : 'text-gray-500'}`} />
                <span className={`text-2xs leading-tight text-center px-0.5 ${active ? 'font-bold' : 'font-medium'}`}>
                  {short}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
};
