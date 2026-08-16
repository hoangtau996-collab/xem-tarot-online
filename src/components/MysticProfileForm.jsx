import React, { useState } from 'react';
import { CalendarDays, User, Sparkles, VenusAndMars } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

/* Form nhập hồ sơ dùng chung cho tab Thần Số Học và tab Huyền Học.
   Hai tab cùng đọc một profile ở App state nên khách chỉ nhập một lần; form
   này luôn hiện lại giá trị đang có để sửa cho nhanh.

   requireName=false dùng cho Huyền Học - phần đó chỉ cần ngày sinh và giới
   tính, họ tên để trống vẫn xem được. */
export const MysticProfileForm = ({
  lang = 'vi',
  profile,
  onSubmit,
  requireName = true,
  accent = 'amber',
  submitLabel
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [birthDate, setBirthDate] = useState(profile?.birthDate || '');
  const [gender, setGender] = useState(profile?.gender || 'female');
  const [error, setError] = useState('');

  const todayIso = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (requireName && !fullName.trim()) {
      setError(t.profileNameRequired);
      return;
    }
    if (!birthDate) {
      setError(t.profileDobRequired);
      return;
    }
    if (birthDate > todayIso) {
      setError(t.profileDobFuture);
      return;
    }

    setError('');
    cosmicAudio.playSparkleSound();
    onSubmit({ fullName: fullName.trim(), birthDate, gender });
  };

  const accentRing = accent === 'cyan' ? 'focus:border-cyan-400' : 'focus:border-amber-400';

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-5 md:p-7 space-y-5 max-w-2xl mx-auto">

      {requireName && (
        <div className="space-y-1.5">
          <label htmlFor="mystic-name" className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
            <User className="w-4 h-4" />
            {t.profileNameLabel}
          </label>
          <input
            id="mystic-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t.profileNamePlaceholder}
            className={`w-full px-4 py-3 rounded-xl bg-space/80 border border-purple-400/30 text-white placeholder-gray-500 focus:outline-none ${accentRing} text-sm`}
          />
          <p className="text-2xs text-gray-400 font-light">{t.profileNameHint}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="mystic-dob" className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
            <CalendarDays className="w-4 h-4" />
            {t.profileDobLabel}
          </label>
          <input
            id="mystic-dob"
            type="date"
            value={birthDate}
            max={todayIso}
            onChange={(e) => setBirthDate(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-space/80 border border-purple-400/30 text-white focus:outline-none ${accentRing} text-sm [color-scheme:dark]`}
          />
        </div>

        <div className="space-y-1.5">
          <span className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
            <VenusAndMars className="w-4 h-4" />
            {t.profileGenderLabel}
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'female', label: t.genderFemale, icon: '♀' },
              { id: 'male', label: t.genderMale, icon: '♂' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setGender(opt.id)}
                className={`px-3 py-3 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  gender === opt.id
                    ? 'bg-amber-400 text-purple-950 border-amber-300 shadow-md shadow-amber-500/20'
                    : 'bg-space/80 text-gray-300 border-purple-400/30 hover:bg-purple-900/40'
                }`}
              >
                <span className="text-base">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-2xs text-gray-400 font-light">{t.profileGenderHint}</p>
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-300 bg-rose-950/50 border border-rose-400/30 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      <button type="submit" className="btn-gold w-full text-sm py-3 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        {submitLabel || t.profileSubmitBtn}
      </button>
    </form>
  );
};
