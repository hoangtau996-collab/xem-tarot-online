import React, { useState, useRef, useMemo } from 'react';
import {
  Orbit, Sparkles, RefreshCw, Bookmark, Check, Download, FileText,
  Info, ChevronDown, Compass, Scale, Gem, Route, Home
} from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { calcNatalChart } from '../utils/natalChart';
import { formatOffset } from '../utils/ephemeris';
import { findCity, DEFAULT_CITY_KEY } from '../data/cities';
import {
  SIGNS, PLANETS, HOUSES, ASPECTS, DIGNITY_INFO, ELEMENT_INFO,
  MODALITY_INFO, POLARITY_INFO, HEMISPHERE_INFO, HOUSE_SYSTEMS
} from '../data/astrologyData';
import {
  getPlanetInSign, getPlanetInHouse, getAspectText, isTightAspect,
  PATTERN_TEXTS, grandTrineElementText, chartRulerText, partOfFortuneText,
  RETROGRADE_TEXT, CHART_NOTES, bigThreeSummary
} from '../data/astrologyTexts';
import { exportNodeAsPng, exportNodeAsPdf } from '../utils/posterExport';
import { NatalChart, AspectLegend } from './NatalChart';
import { AstroBirthForm } from './AstroBirthForm';
import { AstroIntro } from './AstroIntro';

const JOURNAL_KEY = 'celestial_tarot_journal';

/* Mặc định mở sẵn phần luận giải của các hành tinh cá nhân - đó là chỗ khách
   muốn đọc trước. Ba hành tinh ngoài và hai nút để gấp lại cho trang đỡ dài,
   ai quan tâm thì tự mở. */
const DEFAULT_OPEN = new Set(['sun', 'moon', 'mercury', 'venus', 'mars']);

export const Astrology = ({ lang = 'vi', profile, onSaveProfile }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const L = (obj) => (obj ? obj[lang] || obj.vi : '');

  const [isEditing, setIsEditing] = useState(!profile?.birthDate);
  const [openPlanets, setOpenPlanets] = useState(DEFAULT_OPEN);
  const [userNote, setUserNote] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportError, setExportError] = useState('');

  const posterRef = useRef(null);

  const city = profile?.manualPlace ? null : (findCity(profile?.cityKey) || findCity(DEFAULT_CITY_KEY));

  const chart = useMemo(() => {
    if (!profile?.birthDate) return null;
    return calcNatalChart({
      birthDate: profile.birthDate,
      birthTime: profile.birthTime || null,
      latitude: profile.manualPlace ? profile.manualLat : city.lat,
      longitude: profile.manualPlace ? profile.manualLon : city.lon,
      timeZone: profile.manualPlace ? undefined : city.tz,
      offsetMinutes: profile.manualPlace ? profile.manualOffset : undefined,
      houseSystem: profile.houseSystem || 'placidus'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, city]);

  const togglePlanet = (key) => {
    setOpenPlanets(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const handleSubmit = (data) => {
    onSaveProfile(data);
    setIsEditing(false);
    setSavedSuccess(false);
  };

  const placeLabel = profile?.manualPlace
    ? `${Number(profile.manualLat).toFixed(3)}, ${Number(profile.manualLon).toFixed(3)}`
    : L(city?.name);

  const formattedDob = chart
    ? `${String(chart.input.birthDate.slice(8, 10))}/${chart.input.birthDate.slice(5, 7)}/${chart.input.birthDate.slice(0, 4)}`
    : '';

  const handleSaveJournal = () => {
    if (!chart) return;
    try {
      const existing = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
      const entry = {
        id: 'astrology-' + Date.now(),
        type: 'astrology',
        date: new Date().toLocaleString(lang === 'en' ? 'en-GB' : lang === 'zh' ? 'zh-CN' : 'vi-VN'),
        name: profile.fullName || '',
        birthDate: profile.birthDate,
        birthTime: profile.birthTime || '',
        place: placeLabel,
        sunSign: L(SIGNS[sunPlanet.signIndex].name),
        moonSign: L(SIGNS[moonPlanet.signIndex].name),
        ascSign: chart.hasTime ? L(SIGNS[chart.angles.ascSign].name) : '',
        mcSign: chart.hasTime ? L(SIGNS[chart.angles.mcSign].name) : '',
        dominantElement: L(ELEMENT_INFO[chart.balances.dominantElement].name),
        houseSystem: chart.houseSystem ? L(HOUSE_SYSTEMS[chart.houseSystem].name) : '',
        aspectCount: chart.aspects.length,
        userNote: userNote.trim()
      };
      localStorage.setItem(JOURNAL_KEY, JSON.stringify([entry, ...existing]));
      setSavedSuccess(true);
      cosmicAudio.playSparkleSound();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save astrology entry', e);
    }
  };

  const runExport = async (setBusy, task) => {
    setBusy(true);
    setExportError('');
    cosmicAudio.playSparkleSound();
    try {
      await task();
    } catch (err) {
      console.error('Failed to export natal chart', err);
      setExportError(t.exportErrorHint);
    } finally {
      setBusy(false);
    }
  };

  const handleExportPdf = () => {
    if (isExportingPdf) return;
    return runExport(setIsExportingPdf, () => exportNodeAsPdf(posterRef.current, `p_healing_ban_do_sao_${Date.now()}.pdf`));
  };

  const handleExportImage = () => {
    if (isExportingImage) return;
    return runExport(setIsExportingImage, () => exportNodeAsPng(posterRef.current, `p_healing_ban_do_sao_${Date.now()}.png`));
  };

  /* Ghi vị trí theo kiểu chuẩn của mọi phần mềm chiêm tinh: 24°17' Sư Tử. */
  const posText = (position) =>
    `${position.deg}°${String(position.min).padStart(2, '0')}' ${L(SIGNS[position.signIndex].name)}`;

  /* Tra theo khoa chu khong theo chi so mang: thu tu trong PLANET_ORDER co the
     doi ma khong ai nho sua cho nay, va luc do lá số sẽ hiện nhầm hành tinh mà
     vẫn trông hợp lý. */
  const sunPlanet = chart?.realPlanets.find(p => p.key === 'sun');
  const moonPlanet = chart?.realPlanets.find(p => p.key === 'moon');

  const bigThree = chart ? [
    { key: 'sun', signIndex: sunPlanet.signIndex },
    { key: 'moon', signIndex: moonPlanet.signIndex },
    ...(chart.hasTime ? [{ key: 'asc', signIndex: chart.angles.ascSign }] : [])
  ] : [];

  const balanceBars = chart ? [
    {
      title: t.astroElements,
      rows: Object.entries(chart.balances.elementPct).map(([key, pct]) => ({
        key, pct, label: L(ELEMENT_INFO[key].name), hint: L(ELEMENT_INFO[key].hint), color: ELEMENT_INFO[key].color
      }))
    },
    {
      title: t.astroModalities,
      rows: Object.entries(chart.balances.modalityPct).map(([key, pct]) => ({
        key, pct, label: L(MODALITY_INFO[key].name), hint: L(MODALITY_INFO[key].hint), color: '#a78bfa'
      }))
    },
    {
      title: t.astroPolarity,
      rows: Object.entries(chart.balances.polarityPct).map(([key, pct]) => ({
        key, pct, label: L(POLARITY_INFO[key].name), hint: L(POLARITY_INFO[key].hint), color: '#22d3ee'
      }))
    }
  ] : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
          <Orbit className="w-4 h-4 text-cyan-300" />
          {t.astroBadge}
        </div>
        <h2 className="text-3xl md:text-4xl font-serif gold-gradient-text">{t.astroTitle}</h2>
        <p className="text-gray-300 text-sm max-w-2xl mx-auto font-light">{t.astroDesc}</p>
      </div>

      {(isEditing || !chart) ? (
        <>
          {/* Gioi thieu chi hien o man hinh nhap lieu - do la luc khach can
              hieu minh dang lam gi va vi sao phai dua gio sinh. Xem xong la so
              roi thi khong ai doc lai phan nay nua. */}
          <AstroIntro lang={lang} />
          <AstroBirthForm lang={lang} profile={profile} onSubmit={handleSubmit} />
        </>
      ) : (
        <>
          {/* Hồ sơ đang xem */}
          <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-2xs text-cyan-300 uppercase tracking-widest font-semibold block">
                {t.profileViewing}
              </span>
              <p className="font-serif font-bold text-base text-gray-100 truncate">
                {profile.fullName || t.profileAnonymous}
                <span className="text-gray-400 font-sans font-normal text-sm">
                  {' '}• {formattedDob}
                  {profile.birthTime ? ` • ${profile.birthTime}` : ` • ${t.astroNoTimeShort}`}
                  {' '}• {placeLabel}
                </span>
              </p>
              <p className="text-2xs text-gray-500 font-light mt-0.5">
                {formatOffset(chart.offsetMinutes)} • {t.astroUtcLabel} {chart.utcDate.toISOString().slice(0, 16).replace('T', ' ')}
                {chart.houseSystem ? ` • ${L(HOUSE_SYSTEMS[chart.houseSystem].name)}` : ''}
              </p>
            </div>
            <button
              onClick={() => { setIsEditing(true); cosmicAudio.playSparkleSound(); }}
              className="px-4 py-2 rounded-full bg-indigo-950/60 border border-indigo-400/30 text-indigo-200 text-xs hover:bg-indigo-900/70 transition-all flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t.profileEditBtn}
            </button>
          </div>

          {/* Ghi chú độ tin cậy - đặt ngay đầu, trước khi khách đọc kết quả */}
          {chart.notes.length > 0 && (
            <div className="space-y-2">
              {chart.notes.map(note => (
                <p key={note} className="text-2xs text-amber-200/90 bg-amber-950/40 border border-amber-400/25 rounded-xl px-4 py-2.5 flex gap-2 font-light">
                  <Info className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
                  <span>{L(CHART_NOTES[note])}</span>
                </p>
              ))}
            </div>
          )}

          {/* Ba trụ */}
          <div className="glass-panel p-5 md:p-7 space-y-5 border-cyan-400/40">
            <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-300" />
              {t.astroBigThreeTitle}
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed font-light">
              {bigThreeSummary(
                SIGNS[sunPlanet.signIndex].key,
                SIGNS[moonPlanet.signIndex].key,
                chart.hasTime ? SIGNS[chart.angles.ascSign].key : null,
                lang
              )}
            </p>

            <div className="grid sm:grid-cols-3 gap-3">
              {bigThree.map(item => {
                const sign = SIGNS[item.signIndex];
                const meta = PLANETS[item.key] || { glyph: 'AC', name: { vi: 'Cung Mọc', en: 'Ascendant', zh: '上升' }, color: '#fbbf24' };
                return (
                  <div key={item.key} className="rounded-2xl bg-space/70 border border-indigo-400/25 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl leading-none" style={{ color: meta.color }}>{meta.glyph}</span>
                      <div className="min-w-0">
                        <p className="text-2xs text-gray-400 uppercase tracking-wider">{L(meta.name)}</p>
                        <p className="font-serif font-bold text-base" style={{ color: sign.color }}>
                          {sign.glyph} {L(sign.name)}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      {getPlanetInSign(item.key, sign.key, lang)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vòng bản đồ sao */}
          <div className="glass-panel p-4 md:p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
              <Orbit className="w-5 h-5 text-cyan-300" />
              {t.astroWheelTitle}
            </h3>
            <NatalChart chart={chart} lang={lang} size={720} />
            <AspectLegend lang={lang} />
            <p className="text-2xs text-gray-400 font-light text-center">{t.astroWheelHint}</p>
          </div>

          {/* Bảng vị trí hành tinh + luận giải */}
          <div className="glass-panel p-5 md:p-7 space-y-4">
            <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
              <Gem className="w-5 h-5 text-cyan-300" />
              {t.astroPlanetsTitle}
            </h3>

            <div className="space-y-2.5">
              {chart.planets.map(planet => {
                const meta = PLANETS[planet.key];
                const sign = SIGNS[planet.signIndex];
                const dignity = DIGNITY_INFO[planet.dignity];
                const open = openPlanets.has(planet.key);
                const signText = getPlanetInSign(planet.key, sign.key, lang);

                return (
                  <div key={planet.key} className="rounded-2xl bg-space/70 border border-indigo-400/25 overflow-hidden">
                    <button
                      onClick={() => togglePlanet(planet.key)}
                      className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-indigo-950/40 transition-colors"
                    >
                      <span className="text-xl w-7 text-center shrink-0" style={{ color: meta.color }}>{meta.glyph}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-100 truncate">
                          {L(meta.name)}
                          {planet.retrograde && (
                            <span className="ml-1.5 text-2xs text-rose-300 font-normal" title={t.astroRetroTitle}>℞</span>
                          )}
                        </p>
                        <p className="text-2xs text-gray-400">
                          {posText(planet.position)}
                          {planet.house ? ` • ${t.astroHouseShort}${planet.house}` : ''}
                        </p>
                      </div>
                      {dignity.tone !== 'neutral' && (
                        <span className={`text-2xs px-2 py-0.5 rounded-full border shrink-0 hidden sm:inline ${
                          dignity.tone === 'good'
                            ? 'text-emerald-300 border-emerald-400/35 bg-emerald-950/40'
                            : 'text-rose-300 border-rose-400/35 bg-rose-950/40'
                        }`}>
                          {L(dignity.name)}
                        </span>
                      )}
                      <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>

                    {open && (
                      <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/5">
                        <p className="text-2xs text-cyan-300/90 font-light">{L(meta.role)}</p>
                        {signText && (
                          <p className="text-xs text-gray-200 leading-relaxed font-light">{signText}</p>
                        )}
                        {planet.house && (
                          <p className="text-xs text-gray-300 leading-relaxed font-light">
                            {getPlanetInHouse(planet.key, planet.house, lang)}
                          </p>
                        )}
                        {dignity.tone !== 'neutral' && (
                          <p className="text-2xs text-gray-400 leading-relaxed font-light">
                            <span className={dignity.tone === 'good' ? 'text-emerald-300' : 'text-rose-300'}>
                              {L(dignity.name)}:{' '}
                            </span>
                            {L(dignity.hint)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {chart.retrogrades.length > 0 && (
              <p className="text-2xs text-gray-400 leading-relaxed font-light border-t border-white/10 pt-3">
                <span className="text-rose-300 font-semibold">℞ {t.astroRetroTitle}: </span>
                {L(RETROGRADE_TEXT)}
              </p>
            )}
          </div>

          {/* Mười hai nhà */}
          {chart.houses && (
            <div className="glass-panel p-5 md:p-7 space-y-4">
              <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
                <Home className="w-5 h-5 text-cyan-300" />
                {t.astroHousesTitle}
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {chart.houses.map(house => (
                  <div key={house.num} className="rounded-xl bg-space/70 border border-indigo-400/20 px-4 py-3 space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-semibold text-gray-100">{L(HOUSES[house.num - 1].name)}</p>
                      <p className="text-2xs text-cyan-300 shrink-0">{posText(house.position)}</p>
                    </div>
                    <p className="text-2xs text-gray-400 font-light">{L(HOUSES[house.num - 1].domain)}</p>
                    <p className="text-2xs text-gray-300">
                      {house.occupants.length > 0
                        ? house.occupants.map(k => `${PLANETS[k].glyph} ${L(PLANETS[k].name)}`).join(' · ')
                        : <span className="text-gray-500">{t.astroHouseEmpty}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Góc chiếu */}
          <div className="glass-panel p-5 md:p-7 space-y-4">
            <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
              <Route className="w-5 h-5 text-cyan-300" />
              {t.astroAspectsTitle}
              <span className="text-2xs text-gray-400 font-sans font-normal">({chart.aspects.length})</span>
            </h3>
            <p className="text-2xs text-gray-400 font-light">{t.astroAspectsHint}</p>

            {chart.aspects.length === 0 ? (
              <p className="text-xs text-gray-400">{t.astroNoAspects}</p>
            ) : (
              <div className="space-y-2">
                {chart.aspects.map((aspect, i) => {
                  const meta = ASPECTS.find(a => a.key === aspect.aspectKey);
                  const nameOf = (k) => (PLANETS[k] ? `${PLANETS[k].glyph} ${L(PLANETS[k].name)}` : k.toUpperCase());
                  return (
                    <div
                      key={`${aspect.a}-${aspect.b}-${i}`}
                      className="rounded-xl bg-space/70 border px-4 py-3 space-y-1"
                      style={{ borderColor: `${meta.color}40` }}
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                        <span className="text-gray-100 font-semibold">{nameOf(aspect.a)}</span>
                        <span style={{ color: meta.color }}>{meta.glyph} {L(meta.name)}</span>
                        <span className="text-gray-100 font-semibold">{nameOf(aspect.b)}</span>
                        <span className="text-2xs text-gray-500">
                          {t.astroOrb} {aspect.orb.toFixed(1)}°
                        </span>
                        {isTightAspect(aspect) && (
                          <span className="text-2xs px-2 py-0.5 rounded-full bg-amber-950/50 border border-amber-400/35 text-amber-200">
                            {t.astroTightAspect}
                          </span>
                        )}
                      </div>
                      <p className="text-2xs text-gray-300 leading-relaxed font-light">
                        {getAspectText(aspect, lang)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Hình mẫu lớn */}
          <div className="glass-panel p-5 md:p-7 space-y-4">
            <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-300" />
              {t.astroPatternsTitle}
            </h3>

            {chart.patterns.length === 0 ? (
              <p className="text-xs text-gray-400 font-light">{t.astroNoPatterns}</p>
            ) : (
              <div className="space-y-3">
                {chart.patterns.map((pattern, i) => {
                  const info = PATTERN_TEXTS[pattern.key];
                  const members = pattern.planets
                    .map(k => `${PLANETS[k].glyph} ${L(PLANETS[k].name)}`)
                    .join(' · ');
                  return (
                    <div key={`${pattern.key}-${i}`} className="rounded-xl bg-space/70 border border-purple-400/30 px-4 py-3 space-y-1.5">
                      <p className="text-sm font-serif font-bold text-purple-200">
                        {L(info.name)}
                        {pattern.signIndex !== undefined && ` — ${L(SIGNS[pattern.signIndex].name)}`}
                      </p>
                      <p className="text-2xs text-cyan-300">{members}</p>
                      <p className="text-xs text-gray-300 leading-relaxed font-light">{L(info.text)}</p>
                      {pattern.element && (
                        <p className="text-xs text-gray-300 leading-relaxed font-light">
                          {grandTrineElementText(pattern.element, lang)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cân bằng */}
          <div className="glass-panel p-5 md:p-7 space-y-5">
            <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-300" />
              {t.astroBalanceTitle}
            </h3>

            {balanceBars.map(group => (
              <div key={group.title} className="space-y-2">
                <p className="text-2xs text-cyan-300 uppercase tracking-widest font-semibold">{group.title}</p>
                {group.rows.map(row => (
                  <div key={row.key} className="space-y-0.5">
                    <div className="flex items-baseline justify-between gap-2 text-2xs">
                      <span className="text-gray-200">{row.label}</span>
                      <span className="text-gray-400 shrink-0">{String(row.pct).replace('.', ',')}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
                    </div>
                    <p className="text-2xs text-gray-500 font-light">{row.hint}</p>
                  </div>
                ))}
              </div>
            ))}

            <div className="space-y-2 border-t border-white/10 pt-4">
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                <span className="text-emerald-300 font-semibold">{t.astroDominant}: </span>
                {L(ELEMENT_INFO[chart.balances.dominantElement].name)} — {L(ELEMENT_INFO[chart.balances.dominantElement].excess)}
              </p>
              {chart.balances.lackingElement && (
                <p className="text-xs text-gray-200 leading-relaxed font-light">
                  <span className="text-rose-300 font-semibold">{t.astroLacking}: </span>
                  {L(ELEMENT_INFO[chart.balances.lackingElement].name)} — {L(ELEMENT_INFO[chart.balances.lackingElement].lack)}
                </p>
              )}
            </div>

            {chart.hemispheres && (chart.hemispheres.verticalDominant || chart.hemispheres.horizontalDominant) && (
              <div className="space-y-2 border-t border-white/10 pt-4">
                <p className="text-2xs text-cyan-300 uppercase tracking-widest font-semibold">{t.astroHemispheres}</p>
                {[chart.hemispheres.verticalDominant, chart.hemispheres.horizontalDominant]
                  .filter(Boolean)
                  .map(key => (
                    <p key={key} className="text-xs text-gray-200 leading-relaxed font-light">
                      <span className="text-gray-100 font-semibold">{L(HEMISPHERE_INFO[key].name)}: </span>
                      {L(HEMISPHERE_INFO[key].hint)}
                    </p>
                  ))}
              </div>
            )}
          </div>

          {/* Chủ tinh & Điểm Phúc */}
          {(chart.chartRuler || chart.partOfFortune) && (
            <div className="glass-panel p-5 md:p-7 space-y-3">
              <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-300" />
                {t.astroRulerTitle}
              </h3>
              {chart.chartRuler && (
                <p className="text-sm text-gray-200 leading-relaxed font-light">
                  {chartRulerText(chart.chartRuler.key, chart.chartRuler.signKey, chart.chartRuler.house, lang)}
                </p>
              )}
              {chart.partOfFortune && (
                <p className="text-sm text-gray-200 leading-relaxed font-light border-t border-white/10 pt-3">
                  {partOfFortuneText(
                    SIGNS[chart.partOfFortune.signIndex].key,
                    chart.partOfFortune.house,
                    chart.partOfFortune.isDay,
                    lang
                  )}
                </p>
              )}
            </div>
          )}

          {/* Ghi chú riêng + lưu + xuất file */}
          <div className="glass-panel p-5 md:p-7 space-y-4">
            <label htmlFor="astro-note" className="text-2xs text-cyan-300 uppercase tracking-widest font-semibold block">
              {t.userNoteLabel}
            </label>
            <textarea
              id="astro-note"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              rows={3}
              placeholder={t.astroNotePlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-space/80 border border-indigo-400/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm resize-none"
            />

            <div className="grid sm:grid-cols-3 gap-2.5">
              <button
                onClick={handleSaveJournal}
                className={`px-4 py-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  savedSuccess
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-space/80 text-gray-200 border-indigo-400/30 hover:bg-indigo-900/40'
                }`}
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {savedSuccess ? t.savedSuccessBtn : t.saveProfileBtn}
              </button>

              <button
                onClick={handleExportPdf}
                disabled={isExportingPdf}
                className="px-4 py-3 rounded-xl text-xs font-semibold border border-indigo-400/30 bg-space/80 text-gray-200 hover:bg-indigo-900/40 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <FileText className="w-4 h-4" />
                {isExportingPdf ? t.exportingPdfHint : t.exportPdfBtn}
              </button>

              <button
                onClick={handleExportImage}
                disabled={isExportingImage}
                className="px-4 py-3 rounded-xl text-xs font-semibold border border-indigo-400/30 bg-space/80 text-gray-200 hover:bg-indigo-900/40 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {isExportingImage ? t.exportingHint : t.exportImageBtn}
              </button>
            </div>

            {exportError && (
              <p className="text-2xs text-rose-300 bg-rose-950/50 border border-rose-400/30 rounded-xl px-4 py-2.5">
                {exportError}
              </p>
            )}
          </div>

          {/* Poster ẩn dùng cho xuất PNG/PDF.
              Toàn bộ dùng style nội tuyến vì html2canvas đọc style đã tính của
              từng thẻ - class Tailwind từ CDN không phải lúc nào cũng còn hiệu
              lực khi node được nhân bản để chụp. */}
          <div style={{ position: 'absolute', left: '-99999px', top: 0 }} aria-hidden="true">
            <div
              ref={posterRef}
              style={{
                display: 'none', width: '900px', padding: '40px',
                backgroundColor: '#0b0818', fontFamily: '"Be Vietnam Pro", sans-serif', color: '#f3f4f6'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '13px', color: '#22d3ee', letterSpacing: '3px', marginBottom: '6px' }}>P HEALING</div>
                <div style={{ fontSize: '26px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '6px' }}>{t.astroTitle}</div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  {profile.fullName ? `${profile.fullName} • ` : ''}
                  {formattedDob}
                  {profile.birthTime ? ` • ${profile.birthTime}` : ` • ${t.astroNoTimeShort}`}
                  {` • ${placeLabel} • ${formatOffset(chart.offsetMinutes)}`}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <NatalChart chart={chart} lang={lang} size={620} />
              </div>

              <div style={{ backgroundColor: '#120e2c', border: '1px solid rgba(34,211,238,0.35)', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
                <div style={{ fontSize: '14px', color: '#22d3ee', fontWeight: 'bold', marginBottom: '8px' }}>
                  {t.astroBigThreeTitle}
                </div>
                <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.7' }}>
                  {bigThreeSummary(
                    SIGNS[sunPlanet.signIndex].key,
                    SIGNS[moonPlanet.signIndex].key,
                    chart.hasTime ? SIGNS[chart.angles.ascSign].key : null,
                    lang
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid rgba(251,191,36,0.2)', paddingBottom: '8px' }}>
                  {t.astroPlanetsTitle}
                </div>
                {chart.planets.map(planet => (
                  <div key={planet.key} style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.7', display: 'flex', gap: '10px', padding: '3px 0' }}>
                    <span style={{ color: PLANETS[planet.key].color, width: '150px', flexShrink: 0 }}>
                      {PLANETS[planet.key].glyph} {L(PLANETS[planet.key].name)}
                    </span>
                    <span style={{ width: '160px', flexShrink: 0 }}>
                      {posText(planet.position)}{planet.retrograde ? ' ℞' : ''}
                    </span>
                    <span style={{ color: '#9ca3af' }}>
                      {planet.house ? `${t.astroHouseShort}${planet.house}` : ''}
                      {planet.dignity !== 'peregrine' ? ` • ${L(DIGNITY_INFO[planet.dignity].name)}` : ''}
                    </span>
                  </div>
                ))}
              </div>

              {chart.houses && (
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid rgba(251,191,36,0.2)', paddingBottom: '8px' }}>
                    {t.astroHousesTitle} — {L(HOUSE_SYSTEMS[chart.houseSystem].name)}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {chart.houses.map(house => (
                      <div key={house.num} style={{ width: '50%', fontSize: '12px', color: '#e5e7eb', lineHeight: '1.7', padding: '2px 0' }}>
                        <span style={{ color: '#22d3ee' }}>{t.astroHouseShort}{house.num}: </span>
                        {posText(house.position)}
                        {house.occupants.length > 0 && (
                          <span style={{ color: '#9ca3af' }}>
                            {' '}({house.occupants.map(k => PLANETS[k].glyph).join(' ')})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ backgroundColor: '#120e2c', border: '1px solid rgba(167,139,250,0.35)', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
                <div style={{ fontSize: '14px', color: '#a78bfa', fontWeight: 'bold', marginBottom: '8px' }}>
                  {t.astroBalanceTitle}
                </div>
                <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.8' }}>
                  <div>
                    <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{t.astroElements}: </span>
                    {Object.entries(chart.balances.elementPct)
                      .map(([k, v]) => `${L(ELEMENT_INFO[k].name)} ${String(v).replace('.', ',')}%`)
                      .join(' • ')}
                  </div>
                  <div>
                    <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{t.astroModalities}: </span>
                    {Object.entries(chart.balances.modalityPct)
                      .map(([k, v]) => `${L(MODALITY_INFO[k].name)} ${String(v).replace('.', ',')}%`)
                      .join(' • ')}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid rgba(251,191,36,0.2)', paddingBottom: '8px' }}>
                  {t.astroAspectsTitle} ({chart.aspects.length})
                </div>
                {chart.aspects.slice(0, 22).map((aspect, i) => {
                  const meta = ASPECTS.find(a => a.key === aspect.aspectKey);
                  const nameOf = (k) => (PLANETS[k] ? `${PLANETS[k].glyph} ${L(PLANETS[k].name)}` : k.toUpperCase());
                  return (
                    <div key={i} style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.7', padding: '2px 0' }}>
                      <span style={{ color: meta.color }}>{meta.glyph} </span>
                      {nameOf(aspect.a)} — {nameOf(aspect.b)}
                      <span style={{ color: '#9ca3af' }}> ({L(meta.name)}, {t.astroOrb} {aspect.orb.toFixed(1)}°)</span>
                    </div>
                  );
                })}
              </div>

              {userNote.trim() && (
                <div style={{ backgroundColor: '#120e2c', border: '1px solid rgba(244,114,182,0.4)', borderRadius: '14px', padding: '14px', marginBottom: '18px' }}>
                  <div style={{ fontSize: '13px', color: '#f472b6', fontWeight: 'bold', marginBottom: '4px' }}>{t.userNoteLabel}</div>
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
