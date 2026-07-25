import React, { useState } from 'react';
import { Sparkles, BookOpen, BookmarkCheck, Volume2, VolumeX, Compass, Disc, Globe } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

export const Navbar = ({ activeTab, setActiveTab, lang, setLang }) => {
  const [isMuted, setIsMuted] = useState(cosmicAudio.isMuted);
  const [volume, setVolume] = useState(cosmicAudio.volume);
  const [musicMode, setMusicMode] = useState(cosmicAudio.musicMode);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const handleToggleSound = () => {
    const muted = cosmicAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      cosmicAudio.playSparkleSound();
    }
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

  const langNames = {
    vi: '🇻🇳 Tiếng Việt',
    en: '🇬🇧 English',
    zh: '🇨🇳 中文'
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-3 border-b border-amber-400/20 backdrop-blur-xl bg-space/70">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('reading')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-amber-400 to-cyan-400 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-space rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif gold-gradient-text">
              {t.appTitle}
            </h1>
            <p className="text-[10px] text-purple-300/80 tracking-widest uppercase">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => {
              setActiveTab('reading');
              cosmicAudio.playSparkleSound();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
              activeTab === 'reading'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 border border-amber-400/40'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>{t.navReading}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('encyclopedia');
              cosmicAudio.playSparkleSound();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
              activeTab === 'encyclopedia'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 border border-amber-400/40'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>{t.navEncyclopedia}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('journal');
              cosmicAudio.playSparkleSound();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
              activeTab === 'journal'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 border border-amber-400/40'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookmarkCheck className="w-4 h-4 text-pink-400" />
            <span>{t.navJournal}</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-purple-400/30 text-xs text-amber-300 hover:bg-purple-900/40 transition-all font-semibold uppercase"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-300" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {showLangMenu && (
              <div className="absolute top-11 right-0 bg-space border border-amber-400/40 rounded-xl p-2 shadow-2xl z-50 w-36 space-y-1 backdrop-blur-2xl">
                {Object.keys(langNames).map((code) => (
                  <button
                    key={code}
                    onClick={() => handleSelectLang(code)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                      lang === code
                        ? 'bg-amber-400 text-purple-950 font-bold'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{langNames[code]}</span>
                    {lang === code && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Controls */}
          <div className="relative flex items-center gap-1">
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Turn on Tibetan Singing Bowls' : 'Mute sound'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                isMuted
                  ? 'border-gray-600 text-gray-500 bg-white/5'
                  : 'border-amber-400/50 text-amber-300 bg-amber-950/40 shadow-md shadow-amber-500/20'
              }`}
            >
              <span className="text-sm">🥣</span>
              <span className="hidden lg:inline">{t.navZenMusic}</span>
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            {!isMuted && (
              <button
                onClick={() => setShowAudioMenu(!showAudioMenu)}
                title="Audio settings"
                className="p-1.5 rounded-full border border-purple-400/30 text-purple-300 hover:text-white bg-white/5 text-xs"
              >
                ⚙️
              </button>
            )}

            {showAudioMenu && !isMuted && (
              <div className="absolute top-12 right-0 bg-space border border-amber-400/40 rounded-2xl p-4 shadow-2xl z-50 space-y-3 w-64 backdrop-blur-2xl">
                <div className="text-xs font-semibold text-amber-300 border-b border-purple-500/20 pb-2">
                  🎛️ {t.navMusicMode}
                </div>

                <div className="space-y-1.5">
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleModeChange('tibetan')}
                      className={`p-2 rounded-xl text-[11px] font-medium flex flex-col items-center gap-1 border transition-all ${
                        musicMode === 'tibetan'
                          ? 'bg-amber-950/80 border-amber-400 text-amber-300 font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-base">🥣</span>
                      <span>{t.modeStream}</span>
                    </button>

                    <button
                      onClick={() => handleModeChange('cosmic')}
                      className={`p-2 rounded-xl text-[11px] font-medium flex flex-col items-center gap-1 border transition-all ${
                        musicMode === 'cosmic'
                          ? 'bg-purple-950/80 border-purple-400 text-purple-300 font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <Disc className="w-4 h-4 text-purple-400" />
                      <span>{t.modeCosmic}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>{t.navVolume}</span>
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full accent-amber-400 cursor-pointer h-1.5 bg-purple-900 rounded-lg"
                    />
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                </div>

              </div>
            )}
          </div>

        </nav>

      </div>
    </header>
  );
};
