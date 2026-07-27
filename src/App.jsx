import React, { useState } from 'react';
import { StarfieldBackground } from './components/StarfieldBackground';
import { Navbar } from './components/Navbar';
import { SpreadSelector } from './components/SpreadSelector';
import { CardDeck } from './components/CardDeck';
import { ReadingResult } from './components/ReadingResult';
import { Encyclopedia } from './components/Encyclopedia';
import { Journal } from './components/Journal';
import { VisitorCounter } from './components/VisitorCounter';
import { SPREAD_TYPES, TAROT_DECKS_THEMES } from './data/tarotData';
import { TRANSLATIONS } from './data/translations';
import { Sparkles } from 'lucide-react';

export function App() {
  const [lang, setLang] = useState('vi'); // 'vi', 'en', 'zh'
  const [activeTab, setActiveTab] = useState('reading'); // 'reading', 'encyclopedia', 'journal'
  const [readingStep, setReadingStep] = useState('selector'); // 'selector', 'deck', 'result'
  
  const [selectedSpread, setSelectedSpread] = useState(SPREAD_TYPES[3]);
  const [selectedDeckTheme, setSelectedDeckTheme] = useState(TAROT_DECKS_THEMES[0]);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState([]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const handleSelectSpread = (spread, deckTheme, qText) => {
    setSelectedSpread(spread);
    setSelectedDeckTheme(deckTheme);
    setQuestion(qText);
    setReadingStep('deck');
  };

  const handleCompleteDraw = (cards) => {
    setDrawnCards(cards);
    setReadingStep('result');
  };

  const handleResetReading = () => {
    setDrawnCards([]);
    setReadingStep('selector');
  };

  return (
    <div className="min-h-screen flex flex-col relative text-gray-100 selection:bg-purple-500 selection:text-white has-bottom-nav">
      
      {/* Dynamic Starfield Canvas Background */}
      <StarfieldBackground />

      {/* Cosmic Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Body View Switching */}
      <main className="flex-1 pb-16">
        {activeTab === 'reading' && (
          <>
            {readingStep === 'selector' && (
              <SpreadSelector
                onSelectSpread={handleSelectSpread}
                lang={lang}
              />
            )}

            {readingStep === 'deck' && (
              <CardDeck
                spread={selectedSpread}
                deckTheme={selectedDeckTheme}
                question={question}
                onCompleteDraw={handleCompleteDraw}
                lang={lang}
              />
            )}

            {readingStep === 'result' && (
              <ReadingResult
                drawnCards={drawnCards}
                spread={selectedSpread}
                question={question}
                onReset={handleResetReading}
                lang={lang}
              />
            )}
          </>
        )}

        {activeTab === 'encyclopedia' && <Encyclopedia lang={lang} />}

        {activeTab === 'journal' && <Journal lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-purple-500/20 text-center text-xs text-gray-400 backdrop-blur-md bg-space/40 space-y-3">
        {/* Visitor Analytics Widget */}
        <VisitorCounter lang={lang} variant="footer" />

        {/* footerText đã chứa sẵn tên thương hiệu ở cả 3 ngôn ngữ,
            nên không lặp lại appTitle ở đây nữa. */}
        <p className="px-4 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5">
          <span>{t.footerText}</span>
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        </p>
        <p className="px-4 text-xs text-purple-300/60 font-light">
          {t.footerSubtext}
        </p>
      </footer>

    </div>
  );
}

export default App;
