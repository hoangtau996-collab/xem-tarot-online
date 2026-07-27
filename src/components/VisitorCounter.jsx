import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

// Mốc khởi điểm lượt truy cập.
const START_VISITS = 190;

// Traffic thật đã tích lũy trên bộ đếm cloud trước khi gộp (chốt 26/07/2026).
// Bộ đếm khi đó ở mức 78, trong đó có 3 lượt gọi kiểm thử khi dựng bộ đếm.
const MERGED_VISITS = 75;

// Nền cộng dồn: mốc khởi điểm + traffic đã gộp.
const BASE_VISITS = START_VISITS + MERGED_VISITS;

// Giá trị bộ đếm cloud tại thời điểm gộp. Trừ đi để không cộng trùng MERGED_VISITS.
const COUNTER_START = 78;

// Bộ đếm cộng dồn toàn cục (counterapi.dev v1).
// LƯU Ý: endpoint đọc BẮT BUỘC có dấu "/" ở cuối. Thiếu dấu này server trả 301,
// và response redirect không kèm header CORS nên browser chặn luôn request.
const COUNTER = 'https://api.counterapi.dev/v1/phealing_tarot_app_real/visits';
const COUNTER_READ = `${COUNTER}/`;
const COUNTER_UP = `${COUNTER}/up`;

const SESSION_KEY = 'phealing_session_v2';
const DAILY_LOG_KEY = 'phealing_daily_log_v2';
const TOTAL_CACHE_KEY = 'phealing_total_cache_v2';

const todayStr = () => new Date().toISOString().split('T')[0];

const readDailyLog = () => {
  try {
    const log = JSON.parse(localStorage.getItem(DAILY_LOG_KEY) || '{}');
    return log && typeof log === 'object' ? log : {};
  } catch {
    return {};
  }
};

// Công thức cộng dồn: tổng lượt truy cập = mốc khởi điểm + Σ(lượt của từng ngày)
const sumDailyLog = (log) =>
  Object.values(log).reduce((sum, n) => sum + (Number(n) || 0), 0);

export const VisitorCounter = ({ lang = 'vi', variant = 'footer' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [totalVisits, setTotalVisits] = useState(BASE_VISITS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let localTotal = BASE_VISITS;
    let cachedTotal = 0;
    let isNewSession = false;

    try {
      isNewSession = !sessionStorage.getItem(SESSION_KEY);
      // Đặt cờ trước khi fetch để StrictMode (mount 2 lần) không đếm trùng.
      if (isNewSession) sessionStorage.setItem(SESSION_KEY, '1');

      // 1. Ghi nhận lượt của hôm nay vào nhật ký ngày
      const log = readDailyLog();
      if (isNewSession) {
        const day = todayStr();
        log[day] = (Number(log[day]) || 0) + 1;
        localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(log));
      }

      localTotal = BASE_VISITS + sumDailyLog(log);
      cachedTotal = Number(localStorage.getItem(TOTAL_CACHE_KEY)) || 0;

      // Hiển thị ngay số cộng dồn cục bộ, cloud sẽ ghi đè khi về tới
      setTotalVisits(Math.max(localTotal, cachedTotal));
    } catch (e) {
      console.warn('VisitorCounter storage fallback', e);
    }
    setIsLoaded(true);

    // 2. Đồng bộ số cộng dồn toàn cục (tăng 1 lần cho mỗi phiên truy cập)
    fetch(isNewSession ? COUNTER_UP : COUNTER_READ)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.status))))
      .then((data) => {
        if (cancelled) return;
        const cloudCount = Number(data?.count);
        if (!Number.isFinite(cloudCount)) return;

        // Số chỉ tăng, không bao giờ tụt lại
        const cloudTotal = BASE_VISITS + Math.max(0, cloudCount - COUNTER_START);
        const next = Math.max(cloudTotal, localTotal, cachedTotal);
        setTotalVisits(next);
        try {
          localStorage.setItem(TOTAL_CACHE_KEY, String(next));
        } catch {
          /* storage bị chặn - bỏ qua */
        }
      })
      .catch(() => {
        // Offline hoặc API lỗi: giữ nguyên số cộng dồn cục bộ
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const label = t.totalVisits || 'Lượt truy cập';
  const value = isLoaded
    ? new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US').format(totalVisits)
    : '...';

  // Pill gọn trên Navbar
  if (variant === 'navbar') {
    return (
      <div
        className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/40 border border-amber-400/30 text-xs text-amber-200/90 shadow-sm backdrop-blur-md hover:border-amber-400/60 transition-all cursor-default"
        title={`${label}: ${value}`}
      >
        <Eye className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-gray-400 hidden md:inline">{label}</span>
        <span className="font-semibold font-mono text-amber-300">{value}</span>
      </div>
    );
  }

  // Badge đơn ở Footer
  return (
    <div className="w-full flex justify-center my-3 px-4">
      <div className="relative overflow-hidden inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-950/60 via-space/90 to-indigo-950/60 border border-amber-400/30 px-5 py-2.5 shadow-lg backdrop-blur-xl hover:border-amber-400/50 transition-all">
        <div className="absolute -top-8 -left-8 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-300 shrink-0">
          <Eye className="w-4 h-4" />
        </div>
        <span className="text-xs md:text-sm text-gray-300 font-medium">{label}</span>
        <span className="text-base md:text-lg font-bold font-mono text-amber-300 tracking-tight tabular-nums">
          {value}
        </span>
      </div>
    </div>
  );
};
