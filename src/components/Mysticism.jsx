import React, { useState, useRef, useMemo } from 'react';
import {
  Orbit, Compass, Palette, Gem, HeartHandshake, Swords, Bookmark, Check,
  Download, FileText, RefreshCw, Sparkles, Landmark, Info
} from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { calcMetaphysicsProfile } from '../utils/metaphysics';
import { exportNodeAsPng, exportNodeAsPdf } from '../utils/posterExport';
import { MysticProfileForm } from './MysticProfileForm';

const JOURNAL_KEY = 'celestial_tarot_journal';

export const Mysticism = ({ lang = 'vi', profile, onSaveProfile }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  // Lấy chuỗi theo ngôn ngữ đang chọn, tự lùi về tiếng Việt nếu thiếu bản dịch.
  const L = (obj) => (obj ? obj[lang] || obj.vi : '');

  const [isEditing, setIsEditing] = useState(!profile?.birthDate);
  const [userNote, setUserNote] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportError, setExportError] = useState('');

  const posterRef = useRef(null);

  const result = useMemo(
    () => (profile?.birthDate ? calcMetaphysicsProfile(profile.birthDate, profile.gender) : null),
    [profile?.birthDate, profile?.gender]
  );

  const handleSubmit = (data) => {
    onSaveProfile(data);
    setIsEditing(false);
    setSavedSuccess(false);
  };

  const handleSaveJournal = () => {
    if (!result) return;
    try {
      const existing = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
      const entry = {
        id: 'mysticism-' + Date.now(),
        type: 'mysticism',
        date: new Date().toLocaleString(lang === 'en' ? 'en-GB' : lang === 'zh' ? 'zh-CN' : 'vi-VN'),
        name: profile.fullName || '',
        birthDate: profile.birthDate,
        canChi: `${result.canChi.stem.vi} ${result.canChi.branch.vi}`,
        animal: L(result.canChi.branch.animal),
        napAm: result.canChi.napAm.vi,
        destinyElement: result.destinyElement,
        kua: result.kua,
        trigram: result.trigram.key,
        zodiac: L(result.zodiac.name),
        goodDirections: result.goodDirections.map(d => L(d.directionName)),
        userNote: userNote.trim()
      };
      localStorage.setItem(JOURNAL_KEY, JSON.stringify([entry, ...existing]));
      setSavedSuccess(true);
      cosmicAudio.playSparkleSound();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save mysticism entry', e);
    }
  };

  const runExport = async (setBusy, task) => {
    setBusy(true);
    setExportError('');
    cosmicAudio.playSparkleSound();
    try {
      await task();
    } catch (err) {
      console.error('Failed to export mysticism profile', err);
      setExportError(t.exportErrorHint);
    } finally {
      setBusy(false);
    }
  };

  const handleExportPdf = () => {
    if (isExportingPdf) return;
    return runExport(setIsExportingPdf, () => exportNodeAsPdf(posterRef.current, `p_healing_huyen_hoc_${Date.now()}.pdf`));
  };

  const handleExportImage = () => {
    if (isExportingImage) return;
    return runExport(setIsExportingImage, () => exportNodeAsPng(posterRef.current, `p_healing_huyen_hoc_${Date.now()}.png`));
  };

  const formattedDob = result
    ? `${String(result.day).padStart(2, '0')}/${String(result.month).padStart(2, '0')}/${result.year}`
    : '';

  // Bốn quan hệ ngũ hành quanh bản mệnh, dựng sẵn để dùng cả ở màn hình lẫn poster.
  const elementRelations = result ? [
    { key: 'generatedBy', label: t.mysGeneratedBy, info: result.generatedBy, tone: 'emerald' },
    { key: 'generates', label: t.mysGenerates, info: result.generates, tone: 'cyan' },
    { key: 'controls', label: t.mysControls, info: result.controls, tone: 'amber' },
    { key: 'controlledBy', label: t.mysControlledBy, info: result.controlledBy, tone: 'rose' }
  ] : [];

  const TONE_CLASS = {
    emerald: 'border-emerald-400/35 text-emerald-300',
    cyan: 'border-yellow-400/35 text-yellow-300',
    amber: 'border-amber-400/35 text-amber-300',
    rose: 'border-rose-400/35 text-rose-300'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/40 border border-stone-400/30 text-stone-300 text-xs font-semibold">
          <Orbit className="w-4 h-4 text-yellow-300" />
          {t.mysBadge}
        </div>
        <h2 className="text-3xl md:text-4xl font-serif gold-gradient-text">
          {t.mysTitle}
        </h2>
        <p className="text-gray-300 text-sm max-w-2xl mx-auto font-light">
          {t.mysDesc}
        </p>
      </div>

      {(isEditing || !result) ? (
        <MysticProfileForm
          lang={lang}
          profile={profile}
          onSubmit={handleSubmit}
          requireName={false}
          accent="cyan"
          submitLabel={t.mysSubmitBtn}
        />
      ) : (
        <>
          {/* Thanh hồ sơ đang xem */}
          <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-2xs text-yellow-300 uppercase tracking-widest font-semibold block">
                {t.profileViewing}
              </span>
              <p className="font-serif font-bold text-base text-gray-100 truncate">
                {profile.fullName || t.profileAnonymous}
                <span className="text-gray-400 font-sans font-normal text-sm">
                  {' '}• {formattedDob} • {profile.gender === 'female' ? t.genderFemale : t.genderMale}
                </span>
              </p>
            </div>
            <button
              onClick={() => { setIsEditing(true); cosmicAudio.playSparkleSound(); }}
              className="px-4 py-2 rounded-full bg-stone-900/50 border border-stone-400/30 text-stone-200 text-xs hover:bg-stone-800/70 transition-all flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t.profileEditBtn}
            </button>
          </div>

          {/* Tuổi Can Chi & bản mệnh */}
          <div className="glass-panel p-6 md:p-8 space-y-5 border-amber-400/50">
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7">
              <div className="w-28 h-28 shrink-0 rounded-full bg-gradient-to-br from-amber-400/25 to-stone-600/25 border-2 border-amber-400/60 flex flex-col items-center justify-center shadow-lg shadow-amber-500/25">
                <span className="text-4xl leading-none">{result.canChi.branch.icon}</span>
                <span className="text-2xs text-amber-200/90 mt-1 font-semibold">
                  {L(result.canChi.branch.animal)}
                </span>
              </div>

              <div className="text-center sm:text-left space-y-2 min-w-0">
                <span className="text-2xs text-amber-300 uppercase tracking-widest font-semibold block">
                  {t.mysCanChiLabel}
                </span>
                <h3 className="text-2xl font-serif font-bold text-amber-200">
                  {result.canChi.stem.vi} {result.canChi.branch.vi}
                  <span className="text-base text-gray-400 font-sans font-normal ml-2">
                    ({result.canChi.stem.zh}{result.canChi.branch.zh} • {result.lunarYear})
                  </span>
                </h3>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  <span className="px-2.5 py-1 rounded-full bg-stone-900/60 border border-stone-400/25 text-2xs text-stone-200">
                    {t.mysNapAm}: {result.canChi.napAm.vi}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-900/50 border border-amber-400/30 text-2xs text-amber-200 font-semibold">
                    {t.mysDestinyElement}: {result.elementInfo.icon} {L(result.elementInfo.name)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-200 leading-relaxed font-light border-t border-amber-400/20 pt-4">
              {L(result.canChi.napAm.meaning)}
            </p>
            <p className="text-sm text-gray-200 leading-relaxed font-light">
              {L(result.canChi.branch.traits)}
            </p>

            {result.shiftedByLapXuan && (
              <p className="text-2xs text-yellow-200/90 bg-yellow-950/40 border border-yellow-400/25 rounded-xl px-4 py-2.5 flex gap-2 font-light">
                <Info className="w-4 h-4 shrink-0 text-yellow-300 mt-0.5" />
                <span>{t.mysLapXuanNote.replace('{year}', result.lunarYear)}</span>
              </p>
            )}
          </div>

          {/* Ngũ hành bản mệnh */}
          <div className="glass-panel p-5 md:p-7 space-y-5">
            <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {t.mysElementTitle}
            </h3>

            <p className="text-sm text-gray-200 leading-relaxed font-light">
              {L(result.elementInfo.traits)}
            </p>

            {/* Tương sinh - tương khắc */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {elementRelations.map(rel => (
                <div key={rel.key} className={`p-4 rounded-xl bg-space/60 border ${TONE_CLASS[rel.tone]} text-center space-y-1`}>
                  <span className="text-2xs text-gray-400 uppercase tracking-wider block">{rel.label}</span>
                  <span className="text-2xl block">{rel.info.icon}</span>
                  <span className="text-sm font-serif font-bold block">{L(rel.info.name)}</span>
                </div>
              ))}
            </div>

            {/* Màu sắc & đá hợp mệnh */}
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-space/60 border border-emerald-400/30 space-y-1.5">
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Palette className="w-4 h-4" />{t.mysLuckyColors}
                </span>
                <p className="text-xs text-gray-200 font-light">{L(result.elementInfo.luckyColors)}</p>
              </div>
              <div className="p-4 rounded-xl bg-space/60 border border-rose-400/30 space-y-1.5">
                <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                  <Palette className="w-4 h-4" />{t.mysAvoidColors}
                </span>
                <p className="text-xs text-gray-200 font-light">{L(result.elementInfo.avoidColors)}</p>
              </div>
              <div className="p-4 rounded-xl bg-space/60 border border-yellow-400/30 space-y-1.5">
                <span className="text-xs font-semibold text-yellow-300 flex items-center gap-1.5">
                  <Gem className="w-4 h-4" />{t.mysGems}
                </span>
                <p className="text-xs text-gray-200 font-light">{L(result.elementInfo.gems)}</p>
              </div>
            </div>
          </div>

          {/* Cung phi Bát Trạch */}
          <div className="glass-panel p-5 md:p-7 space-y-5">
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
                <Compass className="w-5 h-5 text-yellow-400" />
                {t.mysKuaTitle}
              </h3>
              <p className="text-xs text-gray-400 font-light">{t.mysKuaDesc}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="w-24 h-24 shrink-0 rounded-2xl bg-space/70 border border-yellow-400/40 flex flex-col items-center justify-center">
                <span className="text-2xs text-yellow-300 uppercase tracking-wider">{t.mysKuaNumber}</span>
                <span className="text-3xl font-serif font-bold text-yellow-200 leading-none mt-1">{result.kua}</span>
              </div>
              <div className="text-center sm:text-left space-y-2">
                <h4 className="text-xl font-serif font-bold text-yellow-200">
                  {t.mysTrigram} {result.trigram.key}
                  <span className="text-sm text-gray-400 font-sans font-normal ml-2">
                    ({result.trigram.name.zh} • {L(result.trigram.name)})
                  </span>
                </h4>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-2xs font-bold">
                  {L(result.houseGroup.name)}
                </span>
                <p className="text-xs text-gray-200 leading-relaxed font-light max-w-lg">
                  {L(result.houseGroup.desc)}
                </p>
              </div>
            </div>

            {/* 4 hướng tốt */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                ✓ {t.mysGoodDirections}
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {result.goodDirections.map(d => (
                  <div key={d.aspectKey} className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-400/30 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-serif font-bold text-emerald-300">
                        {d.aspect.icon} {L(d.aspect.name)}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-2xs font-bold shrink-0">
                        {L(d.directionName)}
                      </span>
                    </div>
                    <p className="text-2xs text-gray-300 font-light leading-relaxed">{L(d.aspect.desc)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 hướng xấu */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                ✕ {t.mysBadDirections}
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {result.badDirections.map(d => (
                  <div key={d.aspectKey} className="p-4 rounded-xl bg-rose-950/25 border border-rose-400/30 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-serif font-bold text-rose-300">
                        {d.aspect.icon} {L(d.aspect.name)}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-rose-400/20 text-rose-200 text-2xs font-bold shrink-0">
                        {L(d.directionName)}
                      </span>
                    </div>
                    <p className="text-2xs text-gray-300 font-light leading-relaxed">{L(d.aspect.desc)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hợp - xung con giáp */}
          <div className="glass-panel p-5 md:p-7 space-y-4">
            <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-yellow-400" />
              {t.mysCompatTitle}
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {result.animalGroups.tamHop && (
                <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-400/30 space-y-2">
                  <span className="text-xs font-semibold text-emerald-300 block">
                    {t.mysTamHop} — {L(result.animalGroups.tamHop.name)}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {result.animalGroups.tamHop.animals.map(a => (
                      <span key={a.vi} className="px-2.5 py-1 rounded-lg bg-space/70 border border-emerald-400/20 text-2xs text-gray-200">
                        {a.icon} {L(a.animal)} ({a.vi})
                      </span>
                    ))}
                  </div>
                  <p className="text-2xs text-gray-400 font-light">{t.mysTamHopHint}</p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-yellow-950/25 border border-yellow-400/30 space-y-2">
                <span className="text-xs font-semibold text-yellow-300 block">{t.mysLucHop}</span>
                <span className="px-2.5 py-1 rounded-lg bg-space/70 border border-yellow-400/20 text-2xs text-gray-200 inline-block">
                  {result.animalGroups.lucHop.icon} {L(result.animalGroups.lucHop.animal)} ({result.animalGroups.lucHop.vi})
                </span>
                <p className="text-2xs text-gray-400 font-light">{t.mysLucHopHint}</p>
              </div>

              {result.animalGroups.tuHanhXung && (
                <div className="p-4 rounded-xl bg-rose-950/25 border border-rose-400/30 space-y-2">
                  <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                    <Swords className="w-4 h-4" />
                    {t.mysTuHanhXung} — {L(result.animalGroups.tuHanhXung.name)}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {result.animalGroups.tuHanhXung.animals.map(a => (
                      <span key={a.vi} className="px-2.5 py-1 rounded-lg bg-space/70 border border-rose-400/20 text-2xs text-gray-200">
                        {a.icon} {L(a.animal)} ({a.vi})
                      </span>
                    ))}
                  </div>
                  <p className="text-2xs text-gray-400 font-light">{t.mysTuHanhXungHint}</p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-orange-950/25 border border-orange-400/30 space-y-2">
                <span className="text-xs font-semibold text-orange-300 block">{t.mysXungTrucTiep}</span>
                <span className="px-2.5 py-1 rounded-lg bg-space/70 border border-orange-400/20 text-2xs text-gray-200 inline-block">
                  {result.animalGroups.xungTrucTiep.icon} {L(result.animalGroups.xungTrucTiep.animal)} ({result.animalGroups.xungTrucTiep.vi})
                </span>
                <p className="text-2xs text-gray-400 font-light">{t.mysXungTrucTiepHint}</p>
              </div>
            </div>
          </div>

          {/* Cung hoàng đạo phương Tây */}
          <div className="glass-panel p-5 md:p-7 space-y-4 border-stone-400/40">
            <h3 className="font-serif font-bold text-lg cosmic-gradient-text flex items-center gap-2">
              <Landmark className="w-5 h-5 text-stone-400" />
              {t.mysZodiacTitle}
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-space/70 border border-stone-400/40 flex items-center justify-center">
                <span className="text-4xl text-stone-200">{result.zodiac.icon}</span>
              </div>
              <div className="text-center sm:text-left space-y-1.5">
                <h4 className="text-xl font-serif font-bold text-stone-200">{L(result.zodiac.name)}</h4>
                <p className="text-2xs text-gray-400">
                  {t.mysRuler}: {L(result.zodiac.ruler)} • {t.mysZodiacElement}: {result.zodiac.element}
                </p>
                <p className="text-xs text-gray-200 leading-relaxed font-light">{L(result.zodiac.traits)}</p>
              </div>
            </div>
          </div>

          {/* Ghi chép & lưu */}
          <div className="glass-panel p-5 md:p-6 space-y-4">
            <h3 className="font-serif font-bold text-sm text-amber-300 flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              {t.journalNoteTitle}
            </h3>
            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder={t.notePlaceholder}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-space/80 border border-stone-400/30 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 text-xs resize-none"
            />

            <div className="grid sm:grid-cols-3 gap-3">
              <button
                onClick={handleSaveJournal}
                className={`px-4 py-3 rounded-full text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  savedSuccess
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-stone-900/50 text-stone-100 border-stone-400/40 hover:bg-stone-800/70'
                }`}
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {savedSuccess ? t.savedSuccessBtn : t.saveProfileBtn}
              </button>

              <button
                onClick={handleExportPdf}
                disabled={isExportingPdf}
                className="px-4 py-3 rounded-full text-xs font-semibold border border-yellow-400/40 bg-yellow-950/40 text-yellow-200 hover:bg-yellow-900/60 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                <FileText className="w-4 h-4" />
                {isExportingPdf ? t.exportingPdfHint : t.exportPdfBtn}
              </button>

              <button
                onClick={handleExportImage}
                disabled={isExportingImage}
                className="px-4 py-3 rounded-full text-xs font-semibold border border-amber-400/40 bg-amber-950/40 text-amber-200 hover:bg-amber-900/60 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                {isExportingImage ? t.exportingHint : t.exportImageBtn}
              </button>
            </div>

            {exportError && (
              <p className="text-xs text-rose-300 bg-rose-950/50 border border-rose-400/30 rounded-xl px-4 py-2.5">
                {exportError}
              </p>
            )}
          </div>

          {/* 🌟 POSTER XUẤT FILE - style nội tuyến cho html2canvas */}
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
            <div style={{ border: '2px solid #fbbf24', borderRadius: '24px', padding: '36px', backgroundColor: '#140e33' }}>

              <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(251,191,36,0.3)', paddingBottom: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="/logo.jpg" alt="P Healing Logo" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid rgba(251,191,36,0.6)', marginBottom: '8px', objectFit: 'cover' }} />
                <div style={{ fontSize: '13px', color: '#fbbf24', letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  ✦ P HEALING ONLINE ✦
                </div>
                <div style={{ fontSize: '28px', color: '#fbbf24', fontFamily: "'Philosopher', serif", fontWeight: 'bold', margin: '8px 0' }}>
                  {t.mysTitle}
                </div>
                <div style={{ fontSize: '15px', color: '#e9d5ff' }}>
                  {profile.fullName ? `${profile.fullName} • ` : ''}{formattedDob} • {profile.gender === 'female' ? t.genderFemale : t.genderMale}
                </div>
              </div>

              {/* Can Chi & bản mệnh */}
              <div style={{ backgroundColor: '#0b0818', border: '1px solid #fbbf24', borderRadius: '16px', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '44px', lineHeight: 1.1 }}>{result.canChi.branch.icon}</div>
                <div style={{ fontSize: '24px', color: '#fbbf24', fontFamily: "'Philosopher', serif", fontWeight: 'bold' }}>
                  {result.canChi.stem.vi} {result.canChi.branch.vi} ({result.lunarYear})
                </div>
                <div style={{ fontSize: '13px', color: '#fde68a', marginBottom: '10px' }}>
                  {t.mysNapAm}: {result.canChi.napAm.vi} • {t.mysDestinyElement}: {result.elementInfo.icon} {L(result.elementInfo.name)}
                </div>
                <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: '1.7', textAlign: 'left' }}>
                  {L(result.canChi.napAm.meaning)} {L(result.canChi.branch.traits)}
                </div>
              </div>

              {/* Ngũ hành */}
              <div style={{ backgroundColor: '#0b0818', border: '1px solid rgba(192,132,252,0.35)', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '8px' }}>
                  ☯ {t.mysElementTitle}
                </div>
                <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.65', marginBottom: '8px' }}>
                  {L(result.elementInfo.traits)}
                </div>
                <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.8' }}>
                  <div><span style={{ color: '#10b981', fontWeight: 'bold' }}>{t.mysLuckyColors}: </span>{L(result.elementInfo.luckyColors)}</div>
                  <div><span style={{ color: '#f43f5e', fontWeight: 'bold' }}>{t.mysAvoidColors}: </span>{L(result.elementInfo.avoidColors)}</div>
                  <div><span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{t.mysGems}: </span>{L(result.elementInfo.gems)}</div>
                </div>
              </div>

              {/* Bát Trạch */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid rgba(251,191,36,0.2)', paddingBottom: '8px' }}>
                  🧭 {t.mysKuaTitle} — {t.mysKuaNumber} {result.kua} • {t.mysTrigram} {result.trigram.key} • {L(result.houseGroup.name)}
                </div>
                {result.directions.map(d => (
                  <div
                    key={d.aspectKey}
                    style={{
                      fontSize: '12px',
                      color: '#e5e7eb',
                      lineHeight: '1.6',
                      padding: '8px 12px',
                      marginBottom: '6px',
                      borderRadius: '10px',
                      border: d.aspect.good ? '1px solid rgba(16,185,129,0.35)' : '1px solid rgba(244,63,94,0.35)',
                      backgroundColor: '#0b0818'
                    }}
                  >
                    <span style={{ color: d.aspect.good ? '#10b981' : '#f43f5e', fontWeight: 'bold' }}>
                      {d.aspect.icon} {L(d.aspect.name)} — {L(d.directionName)}:{' '}
                    </span>
                    {L(d.aspect.desc)}
                  </div>
                ))}
              </div>

              {/* Hợp xung & hoàng đạo */}
              <div style={{ backgroundColor: '#0b0818', border: '1px solid rgba(244,114,182,0.35)', borderRadius: '14px', padding: '16px', marginBottom: '20px', fontSize: '12px', color: '#e5e7eb', lineHeight: '1.8' }}>
                <div style={{ fontSize: '14px', color: '#f472b6', fontWeight: 'bold', marginBottom: '8px' }}>
                  🤝 {t.mysCompatTitle}
                </div>
                {result.animalGroups.tamHop && (
                  <div><span style={{ color: '#10b981', fontWeight: 'bold' }}>{t.mysTamHop}: </span>{L(result.animalGroups.tamHop.name)}</div>
                )}
                <div><span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{t.mysLucHop}: </span>{L(result.animalGroups.lucHop.animal)} ({result.animalGroups.lucHop.vi})</div>
                {result.animalGroups.tuHanhXung && (
                  <div><span style={{ color: '#f43f5e', fontWeight: 'bold' }}>{t.mysTuHanhXung}: </span>{L(result.animalGroups.tuHanhXung.name)}</div>
                )}
                <div><span style={{ color: '#fb923c', fontWeight: 'bold' }}>{t.mysXungTrucTiep}: </span>{L(result.animalGroups.xungTrucTiep.animal)} ({result.animalGroups.xungTrucTiep.vi})</div>
              </div>

              <div style={{ backgroundColor: '#0b0818', border: '1px solid rgba(192,132,252,0.35)', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: '#c084fc', fontWeight: 'bold', marginBottom: '6px' }}>
                  {result.zodiac.icon} {t.mysZodiacTitle}: {L(result.zodiac.name)}
                </div>
                <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.65' }}>
                  {t.mysRuler}: {L(result.zodiac.ruler)} • {t.mysZodiacElement}: {result.zodiac.element}
                  <br />
                  {L(result.zodiac.traits)}
                </div>
              </div>

              {userNote.trim() && (
                <div style={{ backgroundColor: '#0b0818', border: '1px solid rgba(244,114,182,0.4)', borderRadius: '14px', padding: '14px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', color: '#f472b6', fontWeight: 'bold', marginBottom: '4px' }}>
                    {t.userNoteLabel}
                  </div>
                  <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.6' }}>{userNote.trim()}</div>
                </div>
              )}

              <div style={{ textAlign: 'center', fontSize: '11px', color: '#9ca3af', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                P Healing Online • Kết Nối Tâm Trí • Chữa Lành Cảm Xúc • Soi Sáng Tương Lai
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
