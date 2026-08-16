import React, { useState, useRef, useMemo } from 'react';
import {
  Hash, Sparkles, Grid3x3, CalendarClock, TrendingUp, ShieldCheck,
  Briefcase, Heart, Bookmark, Check, Download, FileText, RefreshCw, Route,
  ChevronLeft, ChevronRight, CalendarRange, Target
} from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { calcNumerologyProfile, calcYearForecast, isMasterNumber } from '../utils/numerology';
import { exportNodeAsPng, exportNodeAsPdf } from '../utils/posterExport';
import { MysticProfileForm } from './MysticProfileForm';

const JOURNAL_KEY = 'celestial_tarot_journal';

// Xem trước được 30 năm là đủ cho mọi kế hoạch đời người; xa hơn nữa chỉ làm
// danh sách chọn năm dài ra mà không ai dùng tới.
const FORECAST_YEARS_AHEAD = 30;

/* Màu riêng cho từng chỉ số để bảng 7 con số không bị đọc thành một khối xám. */
const CORE_ACCENTS = {
  lifePath: { text: 'text-amber-300', border: 'border-amber-400/40', glow: 'shadow-amber-500/20' },
  expression: { text: 'text-cyan-300', border: 'border-cyan-400/40', glow: 'shadow-cyan-500/20' },
  soulUrge: { text: 'text-pink-300', border: 'border-pink-400/40', glow: 'shadow-pink-500/20' },
  personality: { text: 'text-purple-300', border: 'border-purple-400/40', glow: 'shadow-purple-500/20' },
  birthday: { text: 'text-emerald-300', border: 'border-emerald-400/40', glow: 'shadow-emerald-500/20' },
  attitude: { text: 'text-orange-300', border: 'border-orange-400/40', glow: 'shadow-orange-500/20' },
  maturity: { text: 'text-indigo-300', border: 'border-indigo-400/40', glow: 'shadow-indigo-500/20' }
};

export const Numerology = ({ lang = 'vi', profile, onSaveProfile }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [isEditing, setIsEditing] = useState(!profile?.birthDate || !profile?.fullName);
  const [userNote, setUserNote] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportError, setExportError] = useState('');

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  const [forecastYear, setForecastYear] = useState(thisYear);

  const posterRef = useRef(null);

  const result = useMemo(
    () => (profile?.fullName && profile?.birthDate
      ? calcNumerologyProfile(profile.fullName, profile.birthDate, lang)
      : null),
    [profile?.fullName, profile?.birthDate, lang]
  );

  // Tách khỏi hồ sơ chính: đổi năm chỉ tính lại 12 tháng, không tính lại tên
  // và biểu đồ ngày sinh vốn không đổi theo năm.
  const forecast = useMemo(
    () => (result ? calcYearForecast(result.day, result.month, forecastYear, lang) : null),
    [result, forecastYear, lang]
  );

  // Không cho lùi về trước năm sinh - năm cá nhân khi chưa chào đời là vô nghĩa.
  const minYear = result?.year || thisYear;
  const maxYear = thisYear + FORECAST_YEARS_AHEAD;
  const yearOptions = useMemo(
    () => Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i),
    [minYear, maxYear]
  );

  const goToYear = (year) => {
    if (year < minYear || year > maxYear) return;
    setForecastYear(year);
    cosmicAudio.playSparkleSound();
  };

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
        id: 'numerology-' + Date.now(),
        type: 'numerology',
        date: new Date().toLocaleString(lang === 'en' ? 'en-GB' : lang === 'zh' ? 'zh-CN' : 'vi-VN'),
        name: profile.fullName,
        birthDate: profile.birthDate,
        lifePath: result.lifePath,
        lifePathTitle: result.lifePathMeaning.title,
        numbers: result.core.map(c => ({ key: c.key, value: c.value })),
        // Lưu đúng năm khách đang xem, không phải mặc định năm hiện tại.
        forecastYear: forecast.year,
        personalYear: forecast.personalYear,
        personalYearTitle: forecast.info.title,
        userNote: userNote.trim()
      };
      localStorage.setItem(JOURNAL_KEY, JSON.stringify([entry, ...existing]));
      setSavedSuccess(true);
      cosmicAudio.playSparkleSound();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save numerology entry', e);
    }
  };

  const runExport = async (setBusy, task) => {
    setBusy(true);
    setExportError('');
    cosmicAudio.playSparkleSound();
    try {
      await task();
    } catch (err) {
      console.error('Failed to export numerology profile', err);
      setExportError(t.exportErrorHint);
    } finally {
      setBusy(false);
    }
  };

  const handleExportPdf = () => {
    if (isExportingPdf) return;
    return runExport(setIsExportingPdf, () => exportNodeAsPdf(posterRef.current, `p_healing_than_so_hoc_${Date.now()}.pdf`));
  };

  const handleExportImage = () => {
    if (isExportingImage) return;
    return runExport(setIsExportingImage, () => exportNodeAsPng(posterRef.current, `p_healing_than_so_hoc_${Date.now()}.png`));
  };

  const formattedDob = result ? `${String(result.day).padStart(2, '0')}/${String(result.month).padStart(2, '0')}/${result.year}` : '';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-300 text-xs font-semibold">
          <Hash className="w-4 h-4 text-amber-300" />
          {t.numBadge}
        </div>
        <h2 className="text-3xl md:text-4xl font-serif gold-gradient-text">
          {t.numTitle}
        </h2>
        <p className="text-gray-300 text-sm max-w-2xl mx-auto font-light">
          {t.numDesc}
        </p>
      </div>

      {(isEditing || !result) ? (
        <MysticProfileForm
          lang={lang}
          profile={profile}
          onSubmit={handleSubmit}
          requireName
          submitLabel={t.numSubmitBtn}
        />
      ) : (
        <>
          {/* Thanh hồ sơ đang xem */}
          <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-2xs text-amber-300 uppercase tracking-widest font-semibold block">
                {t.profileViewing}
              </span>
              <p className="font-serif font-bold text-base text-gray-100 truncate">
                {profile.fullName}
                <span className="text-gray-400 font-sans font-normal text-sm"> • {formattedDob}</span>
              </p>
            </div>
            <button
              onClick={() => { setIsEditing(true); cosmicAudio.playSparkleSound(); }}
              className="px-4 py-2 rounded-full bg-purple-900/50 border border-purple-400/30 text-purple-200 text-xs hover:bg-purple-800/70 transition-all flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t.profileEditBtn}
            </button>
          </div>

          {/* Số Đường Đời - chỉ số quan trọng nhất, để riêng một khối lớn */}
          <div className="glass-panel p-6 md:p-8 space-y-5 border-amber-400/50">
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7">
              <div className="relative shrink-0">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400/25 to-purple-600/25 border-2 border-amber-400/60 flex flex-col items-center justify-center shadow-lg shadow-amber-500/25">
                  <span className="text-4xl font-serif font-bold gold-gradient-text leading-none">
                    {result.lifePath}
                  </span>
                  <span className="text-2xs text-amber-200/80 mt-1">{result.lifePathMeaning.icon}</span>
                </div>
                {isMasterNumber(result.lifePath) && (
                  <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-purple-950 text-2xs font-bold shadow">
                    {t.numMasterBadge}
                  </span>
                )}
              </div>

              <div className="text-center sm:text-left space-y-2 min-w-0">
                <span className="text-2xs text-amber-300 uppercase tracking-widest font-semibold block">
                  {t.numLabels.lifePath.name}
                </span>
                <h3 className="text-2xl font-serif font-bold text-amber-200">
                  {result.lifePathMeaning.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {result.lifePathMeaning.keywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-purple-900/60 border border-purple-400/25 text-2xs text-purple-200">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-200 leading-relaxed font-light border-t border-amber-400/20 pt-4">
              {result.lifePathMeaning.lifePath}
            </p>
          </div>

          {/* Dự báo theo năm & tháng */}
          <div className="glass-panel p-5 md:p-7 space-y-6 border-cyan-400/40">
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
                <CalendarRange className="w-5 h-5 text-cyan-400" />
                {t.numForecastTitle}
              </h3>
              <p className="text-xs text-gray-400 font-light">{t.numForecastDesc}</p>
            </div>

            {/* Chọn năm */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => goToYear(forecastYear - 1)}
                disabled={forecastYear <= minYear}
                aria-label={t.numPrevYear}
                className="w-11 h-11 shrink-0 rounded-full border border-purple-400/30 bg-space/70 text-purple-200 flex items-center justify-center hover:bg-purple-900/50 transition-all disabled:opacity-30 disabled:hover:bg-space/70"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-center">
                <label htmlFor="forecast-year" className="text-2xs text-cyan-300 uppercase tracking-widest font-semibold block mb-1">
                  {t.numForecastYearLabel}
                </label>
                <select
                  id="forecast-year"
                  value={forecastYear}
                  onChange={(e) => goToYear(Number(e.target.value))}
                  className="px-4 py-2 rounded-xl bg-space/80 border border-cyan-400/40 text-lg font-serif font-bold text-cyan-200 focus:outline-none focus:border-amber-400 text-center cursor-pointer"
                >
                  {yearOptions.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => goToYear(forecastYear + 1)}
                disabled={forecastYear >= maxYear}
                aria-label={t.numNextYear}
                className="w-11 h-11 shrink-0 rounded-full border border-purple-400/30 bg-space/70 text-purple-200 flex items-center justify-center hover:bg-purple-900/50 transition-all disabled:opacity-30 disabled:hover:bg-space/70"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {forecastYear !== thisYear && (
                <button
                  onClick={() => goToYear(thisYear)}
                  className="px-4 py-2 rounded-full bg-amber-950/50 border border-amber-400/35 text-amber-200 text-xs font-semibold hover:bg-amber-900/60 transition-all self-end"
                >
                  {t.numBackToday}
                </button>
              )}
            </div>

            {/* Con số của năm đang xem */}
            <div className="glass-panel-purple p-5 md:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-24 h-24 shrink-0 rounded-2xl bg-space/70 border border-cyan-400/40 flex flex-col items-center justify-center">
                  <CalendarClock className="w-5 h-5 text-cyan-300" />
                  <span className="text-3xl font-serif font-bold text-cyan-200 leading-none mt-1">
                    {forecast.personalYear}
                  </span>
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-2xs text-cyan-300 uppercase tracking-widest font-semibold block">
                    {t.numPersonalYearTitle} {forecast.year}
                  </span>
                  <h4 className="text-xl font-serif font-bold text-cyan-100">
                    {forecast.info.title}
                  </h4>
                  <p className="text-sm text-gray-200 leading-relaxed font-light">
                    {forecast.info.summary}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 border-t border-purple-500/25 pt-4">
                <div className="p-3.5 rounded-xl bg-space/60 border border-emerald-400/30 space-y-1">
                  <span className="text-2xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />{t.numYearFocus}
                  </span>
                  <p className="text-xs text-gray-200 font-light">{forecast.info.focus}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-space/60 border border-amber-400/30 space-y-1">
                  <span className="text-2xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />{t.numYearAdvice}
                  </span>
                  <p className="text-xs text-gray-200 font-light">{forecast.info.advice}</p>
                </div>
              </div>
            </div>

            {/* Mười hai tháng */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                  {t.numMonthlyTitle}
                </h4>
                <p className="text-2xs text-gray-400 font-light">{t.numMonthlyDesc}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {forecast.months.map(m => {
                  const isNow = forecastYear === thisYear && m.calendarMonth === thisMonth;
                  return (
                    <div
                      key={m.calendarMonth}
                      className={`p-4 rounded-xl border space-y-2 transition-all ${
                        isNow
                          ? 'bg-amber-950/40 border-amber-400/60 shadow-md shadow-amber-500/15'
                          : 'bg-space/60 border-purple-400/25'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-semibold ${isNow ? 'text-amber-300' : 'text-gray-300'}`}>
                          {t.monthNames[m.calendarMonth - 1]}
                        </span>
                        <span className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-serif font-bold text-sm ${
                          isNow ? 'bg-amber-400 text-purple-950' : 'bg-purple-900/60 text-purple-200'
                        }`}>
                          {m.value}
                        </span>
                      </div>

                      {isNow && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-amber-400 text-purple-950 text-[10px] font-bold">
                          {t.numCurrentMonthBadge}
                        </span>
                      )}

                      <h5 className={`text-sm font-serif font-bold ${isNow ? 'text-amber-200' : 'text-cyan-200'}`}>
                        {m.title}
                      </h5>
                      <p className="text-2xs text-gray-300 leading-relaxed font-light">
                        {m.summary}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sáu chỉ số còn lại */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {t.numCoreTitle}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.core.slice(1).map(item => {
                const accent = CORE_ACCENTS[item.key];
                return (
                  <div key={item.key} className={`glass-panel p-5 space-y-3 ${accent.border}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-2xs text-gray-400 uppercase tracking-wider font-semibold block">
                          {t.numLabels[item.key].name}
                        </span>
                        <h4 className={`font-serif font-bold text-base ${accent.text} truncate`}>
                          {item.title}
                        </h4>
                      </div>
                      <div className={`shrink-0 w-12 h-12 rounded-xl bg-space/80 border ${accent.border} flex items-center justify-center relative`}>
                        <span className={`text-xl font-serif font-bold ${accent.text}`}>{item.value}</span>
                        {item.isMaster && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-purple-950 text-[9px] font-bold flex items-center justify-center">
                            ★
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-2xs text-gray-400 font-light italic">
                      {t.numLabels[item.key].hint}
                    </p>
                    <p className="text-xs text-gray-200 leading-relaxed font-light">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Điểm mạnh - thử thách - sự nghiệp - tình cảm theo Số Đường Đời */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-panel p-5 space-y-3 border-emerald-400/30">
              <h4 className="font-serif font-bold text-emerald-300 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {t.numStrengths}
              </h4>
              <ul className="space-y-2">
                {result.lifePathMeaning.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-gray-200 font-light flex gap-2">
                    <span className="text-emerald-400 shrink-0">✦</span>{s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-5 space-y-3 border-rose-400/30">
              <h4 className="font-serif font-bold text-rose-300 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                {t.numChallenges}
              </h4>
              <ul className="space-y-2">
                {result.lifePathMeaning.challenges.map((s, i) => (
                  <li key={i} className="text-xs text-gray-200 font-light flex gap-2">
                    <span className="text-rose-400 shrink-0">✦</span>{s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-5 space-y-2 border-cyan-400/30">
              <h4 className="font-serif font-bold text-cyan-300 text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {t.numCareer}
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed font-light">{result.lifePathMeaning.career}</p>
            </div>

            <div className="glass-panel p-5 space-y-2 border-pink-400/30">
              <h4 className="font-serif font-bold text-pink-300 text-sm flex items-center gap-2">
                <Heart className="w-4 h-4" />
                {t.numLove}
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed font-light">{result.lifePathMeaning.love}</p>
            </div>
          </div>

          {/* Biểu đồ ngày sinh Lo Shu */}
          <div className="glass-panel p-5 md:p-7 space-y-5">
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-lg gold-gradient-text flex items-center gap-2">
                <Grid3x3 className="w-5 h-5 text-amber-400" />
                {t.numChartTitle}
              </h3>
              <p className="text-xs text-gray-400 font-light">{t.numChartDesc}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Bàn 3x3 */}
              <div className="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto lg:mx-0 shrink-0">
                {result.birthChart.grid.map(cell => (
                  <div
                    key={cell.number}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-1 text-center transition-all ${
                      cell.count > 0
                        ? 'bg-amber-950/40 border-amber-400/50'
                        : 'bg-space/60 border-purple-500/20'
                    }`}
                  >
                    <span className={`font-serif font-bold leading-none ${
                      cell.count > 0 ? 'text-amber-300 text-lg' : 'text-gray-600 text-base'
                    }`}>
                      {cell.count > 0 ? String(cell.number).repeat(cell.count) : cell.number}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-1 leading-tight">{cell.label}</span>
                  </div>
                ))}
              </div>

              {/* Diễn giải từng ô */}
              <div className="flex-1 space-y-2">
                {result.birthChart.grid
                  .slice()
                  .sort((a, b) => a.number - b.number)
                  .map(cell => (
                    <div key={cell.number} className="flex gap-3 text-xs">
                      <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center font-bold ${
                        cell.count > 0 ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-gray-500'
                      }`}>
                        {cell.number}
                      </span>
                      <p className="text-gray-300 font-light leading-relaxed">
                        <span className={cell.count > 0 ? 'text-amber-200 font-semibold' : 'text-gray-400 font-semibold'}>
                          {cell.label}
                          {cell.count > 0 ? ` (x${cell.count})` : ` — ${t.numMissingLabel}`}:
                        </span>{' '}
                        {cell.text}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Mũi tên */}
            {result.birthChart.arrows.length > 0 && (
              <div className="space-y-3 border-t border-purple-500/20 pt-4">
                <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <Route className="w-4 h-4" />
                  {t.numArrowsTitle}
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {result.birthChart.arrows.map(arrow => (
                    <div
                      key={arrow.id}
                      className={`p-3.5 rounded-xl border space-y-1 ${
                        arrow.type === 'strong'
                          ? 'bg-emerald-950/30 border-emerald-400/30'
                          : 'bg-rose-950/30 border-rose-400/30'
                      }`}
                    >
                      <span className={`text-xs font-bold block ${arrow.type === 'strong' ? 'text-emerald-300' : 'text-rose-300'}`}>
                        {arrow.type === 'strong' ? '▲' : '▽'} {arrow.name}
                        <span className="font-normal text-gray-400 ml-1">
                          ({arrow.type === 'strong' ? t.numArrowStrong : t.numArrowWeak})
                        </span>
                      </span>
                      <p className="text-2xs text-gray-300 font-light leading-relaxed">{arrow.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              className="w-full px-4 py-3 rounded-xl bg-space/80 border border-purple-400/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-xs resize-none"
            />

            <div className="grid sm:grid-cols-3 gap-3">
              <button
                onClick={handleSaveJournal}
                className={`px-4 py-3 rounded-full text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  savedSuccess
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-purple-900/50 text-purple-100 border-purple-400/40 hover:bg-purple-800/70'
                }`}
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {savedSuccess ? t.savedSuccessBtn : t.saveProfileBtn}
              </button>

              <button
                onClick={handleExportPdf}
                disabled={isExportingPdf}
                className="px-4 py-3 rounded-full text-xs font-semibold border border-cyan-400/40 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/60 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
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

          {/* 🌟 POSTER XUẤT FILE - html2canvas không đọc được nhiều class Tailwind
              nên khối này dùng style nội tuyến giống poster của bản giải Tarot. */}
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
                  {t.numTitle}
                </div>
                <div style={{ fontSize: '15px', color: '#e9d5ff' }}>
                  {profile.fullName} • {formattedDob}
                </div>
              </div>

              {/* Số Đường Đời */}
              <div style={{ backgroundColor: '#0b0818', border: '1px solid #fbbf24', borderRadius: '16px', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t.numLabels.lifePath.name}
                </div>
                <div style={{ fontSize: '52px', color: '#fbbf24', fontFamily: "'Philosopher', serif", fontWeight: 'bold', lineHeight: 1.1 }}>
                  {result.lifePath}
                </div>
                <div style={{ fontSize: '18px', color: '#fde68a', fontFamily: "'Philosopher', serif", marginBottom: '10px' }}>
                  {result.lifePathMeaning.title}
                </div>
                <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: '1.7', textAlign: 'left' }}>
                  {result.lifePathMeaning.lifePath}
                </div>
              </div>

              {/* Bảng các chỉ số */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px', borderBottom: '1px solid rgba(251,191,36,0.2)', paddingBottom: '8px' }}>
                  🔢 {t.numCoreTitle}
                </div>
                {result.core.map(item => (
                  <div key={item.key} style={{ backgroundColor: '#0b0818', border: '1px solid rgba(192,132,252,0.3)', borderRadius: '12px', padding: '12px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '13px', color: '#38bdf8', fontWeight: 'bold', marginBottom: '4px' }}>
                      {t.numLabels[item.key].name}: <span style={{ color: '#fbbf24' }}>{item.value} — {item.title}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.6' }}>{item.text}</div>
                  </div>
                ))}
              </div>

              {/* Dự báo năm đang xem + 12 tháng */}
              <div style={{ backgroundColor: '#0b0818', border: '1px solid #38bdf8', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: '#38bdf8', fontWeight: 'bold', marginBottom: '6px' }}>
                  📅 {t.numPersonalYearTitle} {forecast.year}: {forecast.personalYear} — {forecast.info.title}
                </div>
                <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.6', marginBottom: '6px' }}>
                  {forecast.info.summary}
                </div>
                <div style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.7' }}>
                  <div><span style={{ color: '#10b981', fontWeight: 'bold' }}>{t.numYearFocus}: </span>{forecast.info.focus}</div>
                  <div><span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{t.numYearAdvice}: </span>{forecast.info.advice}</div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid rgba(251,191,36,0.2)', paddingBottom: '8px' }}>
                  🗓️ {t.numMonthlyTitle} — {forecast.year}
                </div>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '6px' }}>
                  <tbody>
                    {[0, 1, 2, 3].map(row => (
                      <tr key={row}>
                        {forecast.months.slice(row * 3, row * 3 + 3).map(m => (
                          <td
                            key={m.calendarMonth}
                            style={{
                              width: '33%',
                              verticalAlign: 'top',
                              borderRadius: '10px',
                              border: '1px solid rgba(192,132,252,0.3)',
                              backgroundColor: '#0b0818',
                              padding: '10px'
                            }}
                          >
                            <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                              {t.monthNames[m.calendarMonth - 1]}
                            </div>
                            <div style={{ fontSize: '13px', color: '#38bdf8', fontWeight: 'bold' }}>
                              {m.value} — {m.title}
                            </div>
                            <div style={{ fontSize: '11px', color: '#e5e7eb', lineHeight: '1.5' }}>
                              {m.summary}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Biểu đồ ngày sinh */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>
                  🔲 {t.numChartTitle}
                </div>
                <table style={{ borderCollapse: 'separate', borderSpacing: '8px', margin: '0 auto 12px' }}>
                  <tbody>
                    {[0, 1, 2].map(row => (
                      <tr key={row}>
                        {result.birthChart.grid.slice(row * 3, row * 3 + 3).map(cell => (
                          <td
                            key={cell.number}
                            style={{
                              width: '92px',
                              height: '72px',
                              textAlign: 'center',
                              verticalAlign: 'middle',
                              borderRadius: '12px',
                              border: cell.count > 0 ? '1px solid rgba(251,191,36,0.6)' : '1px solid rgba(192,132,252,0.25)',
                              backgroundColor: cell.count > 0 ? '#2a1f06' : '#0b0818'
                            }}
                          >
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: cell.count > 0 ? '#fbbf24' : '#4b5563', fontFamily: "'Philosopher', serif" }}>
                              {cell.count > 0 ? String(cell.number).repeat(cell.count) : cell.number}
                            </div>
                            <div style={{ fontSize: '10px', color: '#9ca3af' }}>{cell.label}</div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {result.birthChart.arrows.map(arrow => (
                  <div key={arrow.id} style={{ fontSize: '12px', color: '#e5e7eb', lineHeight: '1.6', marginBottom: '4px' }}>
                    <span style={{ color: arrow.type === 'strong' ? '#10b981' : '#f43f5e', fontWeight: 'bold' }}>
                      {arrow.type === 'strong' ? '▲' : '▽'} {arrow.name}:{' '}
                    </span>
                    {arrow.text}
                  </div>
                ))}
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
