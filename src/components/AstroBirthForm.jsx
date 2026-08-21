import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CalendarDays, Clock, MapPin, Search, Compass, Info, Sparkles, Crosshair } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { CITIES, DEFAULT_CITY_KEY, findCity, searchCities } from '../data/cities';
import { HOUSE_SYSTEMS } from '../data/astrologyData';
import { tzOffsetMinutesAt, formatOffset } from '../utils/ephemeris';

/* Form riêng cho bản đồ sao.
 *
 * Vì sao không dùng chung MysticProfileForm: lá số cần ba dữ kiện mà Thần Số
 * Học và Huyền Học không cần - giờ sinh chính xác tới phút, toạ độ nơi sinh và
 * hệ chia nhà. Nhét cả ba vào form dùng chung sẽ làm hai mục kia rối lên vì
 * những ô chúng không bao giờ dùng tới.
 *
 * Ngày sinh vẫn đọc và ghi vào cùng một hồ sơ với hai mục kia, nên khách nhập
 * ở đâu cũng chỉ phải nhập một lần.
 */

/* Danh sách múi giờ cho trường hợp nhập toạ độ tay. Chỉ liệt kê các mốc thật
   sự có nước dùng, kể cả những mốc lẻ 30 và 45 phút. */
const MANUAL_OFFSETS = [
  -720, -660, -600, -570, -540, -480, -420, -360, -300, -240, -210, -180, -120, -60,
  0, 60, 120, 180, 210, 240, 270, 300, 330, 345, 360, 390, 420, 480, 540, 570, 600, 630, 660, 720, 780, 840
];

export const AstroBirthForm = ({ lang = 'vi', profile, onSubmit }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const L = (obj) => (obj ? obj[lang] || obj.vi : '');

  const [birthDate, setBirthDate] = useState(profile?.birthDate || '');
  const [birthTime, setBirthTime] = useState(profile?.birthTime || '');
  const [unknownTime, setUnknownTime] = useState(Boolean(profile?.birthDate) && !profile?.birthTime);
  const [cityKey, setCityKey] = useState(profile?.cityKey || DEFAULT_CITY_KEY);
  const [houseSystem, setHouseSystem] = useState(profile?.houseSystem || 'placidus');

  const [manualPlace, setManualPlace] = useState(Boolean(profile?.manualPlace));
  const [manualLat, setManualLat] = useState(profile?.manualLat ?? '');
  const [manualLon, setManualLon] = useState(profile?.manualLon ?? '');
  const [manualOffset, setManualOffset] = useState(profile?.manualOffset ?? 420);

  const [query, setQuery] = useState('');
  const [openList, setOpenList] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef(null);

  const todayIso = new Date().toISOString().slice(0, 10);
  const selectedCity = findCity(cityKey) || CITIES[0];
  const results = useMemo(() => searchCities(query, 60), [query]);

  // Chạm ra ngoài thì đóng danh sách - trên điện thoại rất dễ để nó mở lơ lửng.
  useEffect(() => {
    if (!openList) return;
    const handleOutside = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) setOpenList(false);
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [openList]);

  /* Độ lệch múi giờ thật tại đúng ngày sinh, hiện ngay dưới ô chọn nơi sinh.
     Đây là chỗ hay sai nhất của mọi trang lá số, nên phải cho khách nhìn thấy
     con số để tự đối chiếu chứ không giấu trong phép tính. */
  const previewOffset = useMemo(() => {
    if (manualPlace) return Number(manualOffset);
    if (!birthDate) return null;
    const [y, m, d] = birthDate.split('-').map(Number);
    if (!y || !m || !d) return null;
    const probe = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    return tzOffsetMinutesAt(probe, selectedCity.tz);
  }, [birthDate, selectedCity, manualPlace, manualOffset]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!birthDate) { setError(t.profileDobRequired); return; }
    if (birthDate > todayIso) { setError(t.profileDobFuture); return; }
    if (!unknownTime && !birthTime) { setError(t.astroTimeRequired); return; }

    if (manualPlace) {
      const lat = Number(manualLat);
      const lon = Number(manualLon);
      if (!Number.isFinite(lat) || lat < -90 || lat > 90) { setError(t.astroLatInvalid); return; }
      if (!Number.isFinite(lon) || lon < -180 || lon > 180) { setError(t.astroLonInvalid); return; }
    }

    setError('');
    cosmicAudio.playSparkleSound();
    onSubmit({
      ...profile,
      birthDate,
      birthTime: unknownTime ? null : birthTime,
      cityKey,
      houseSystem,
      manualPlace,
      manualLat: manualPlace ? Number(manualLat) : undefined,
      manualLon: manualPlace ? Number(manualLon) : undefined,
      manualOffset: manualPlace ? Number(manualOffset) : undefined
    });
  };

  const fieldClass = 'w-full px-4 py-3 rounded-xl bg-space/80 border border-indigo-400/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm';
  const labelClass = 'flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider';

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-5 md:p-7 space-y-5 max-w-2xl mx-auto">

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="astro-dob" className={labelClass}>
            <CalendarDays className="w-4 h-4" />
            {t.profileDobLabel}
          </label>
          <input
            id="astro-dob"
            type="date"
            value={birthDate}
            max={todayIso}
            onChange={(e) => setBirthDate(e.target.value)}
            className={`${fieldClass} [color-scheme:dark]`}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="astro-time" className={labelClass}>
            <Clock className="w-4 h-4" />
            {t.astroTimeLabel}
          </label>
          <input
            id="astro-time"
            type="time"
            value={birthTime}
            disabled={unknownTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className={`${fieldClass} [color-scheme:dark] ${unknownTime ? 'opacity-40' : ''}`}
          />
          <label className="flex items-center gap-2 text-2xs text-gray-300 font-light cursor-pointer pt-0.5">
            <input
              type="checkbox"
              checked={unknownTime}
              onChange={(e) => setUnknownTime(e.target.checked)}
              className="w-4 h-4 rounded accent-cyan-400"
            />
            {t.astroUnknownTime}
          </label>
        </div>
      </div>

      {/* Giờ sinh quyết định Cung Mọc và toàn bộ hệ nhà, nên phải nói rõ cái giá
          của việc bỏ trống ngay tại chỗ khách vừa tích vào ô đó. */}
      {unknownTime && (
        <p className="text-2xs text-amber-200/90 bg-amber-950/40 border border-amber-400/25 rounded-xl px-4 py-2.5 flex gap-2 font-light">
          <Info className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
          <span>{t.astroUnknownTimeHint}</span>
        </p>
      )}

      {/* Nơi sinh */}
      <div className="space-y-1.5" ref={listRef}>
        <span className={labelClass}>
          <MapPin className="w-4 h-4" />
          {t.astroPlaceLabel}
        </span>

        {!manualPlace ? (
          <div className="relative">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={openList ? query : L(selectedCity.name)}
                onFocus={() => { setOpenList(true); setQuery(''); }}
                onChange={(e) => { setQuery(e.target.value); setOpenList(true); }}
                placeholder={t.astroPlacePlaceholder}
                className={`${fieldClass} pl-10`}
              />
            </div>

            {openList && (
              <ul className="absolute z-30 mt-1.5 w-full max-h-64 overflow-y-auto rounded-xl bg-space border border-indigo-400/40 shadow-2xl shadow-black/60 divide-y divide-white/5">
                {results.length === 0 && (
                  <li className="px-4 py-3 text-xs text-gray-400">{t.astroPlaceNoResult}</li>
                )}
                {results.map(city => (
                  <li key={city.key}>
                    <button
                      type="button"
                      onClick={() => { setCityKey(city.key); setOpenList(false); setQuery(''); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-900/50 transition-colors flex items-center justify-between gap-3 ${
                        city.key === cityKey ? 'text-cyan-300' : 'text-gray-200'
                      }`}
                    >
                      <span className="truncate">{L(city.name)}</span>
                      <span className="text-2xs text-gray-500 shrink-0">
                        {city.lat.toFixed(1)}, {city.lon.toFixed(1)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-3">
            <input
              type="number" step="0.0001" min="-90" max="90"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              placeholder={t.astroLatPlaceholder}
              className={fieldClass}
            />
            <input
              type="number" step="0.0001" min="-180" max="180"
              value={manualLon}
              onChange={(e) => setManualLon(e.target.value)}
              placeholder={t.astroLonPlaceholder}
              className={fieldClass}
            />
            <select
              value={manualOffset}
              onChange={(e) => setManualOffset(Number(e.target.value))}
              className={fieldClass}
            >
              {MANUAL_OFFSETS.map(min => (
                <option key={min} value={min}>{formatOffset(min)}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <p className="text-2xs text-gray-400 font-light">
            {manualPlace
              ? t.astroManualHint
              : `${selectedCity.lat.toFixed(4)}, ${selectedCity.lon.toFixed(4)} • ${selectedCity.tz}`}
            {previewOffset !== null && ` • ${formatOffset(previewOffset)}`}
          </p>
          <button
            type="button"
            onClick={() => setManualPlace(v => !v)}
            className="text-2xs text-cyan-300 hover:text-cyan-200 underline underline-offset-2 flex items-center gap-1"
          >
            <Crosshair className="w-3.5 h-3.5" />
            {manualPlace ? t.astroUseCityList : t.astroUseManual}
          </button>
        </div>
      </div>

      {/* Hệ chia nhà */}
      <div className="space-y-1.5">
        <span className={labelClass}>
          <Compass className="w-4 h-4" />
          {t.astroHouseSystemLabel}
        </span>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(HOUSE_SYSTEMS).map(sys => (
            <button
              key={sys.key}
              type="button"
              onClick={() => setHouseSystem(sys.key)}
              className={`px-2 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                houseSystem === sys.key
                  ? 'bg-cyan-400 text-indigo-950 border-cyan-300 shadow-md shadow-cyan-500/20'
                  : 'bg-space/80 text-gray-300 border-indigo-400/30 hover:bg-indigo-900/40'
              }`}
            >
              {L(sys.name)}
            </button>
          ))}
        </div>
        <p className="text-2xs text-gray-400 font-light">{L(HOUSE_SYSTEMS[houseSystem].hint)}</p>
        {/* Nhac lai ngay tai cho chon: khach cuon thang xuong day thuong khong
            doc phan gioi thieu o tren, va deu so chon sai la hong ca la so. */}
        <p className="text-2xs text-emerald-200/80 font-light">{t.astroHouseSystemReassure}</p>
      </div>

      {error && (
        <p className="text-xs text-rose-300 bg-rose-950/50 border border-rose-400/30 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      <button type="submit" className="btn-cosmic w-full text-sm py-3 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        {t.astroSubmitBtn}
      </button>
    </form>
  );
};
