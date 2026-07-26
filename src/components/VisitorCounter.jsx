import React, { useState, useEffect } from 'react';
import { Eye, Users, Calendar, UserCheck, Activity } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const VisitorCounter = ({ lang = 'vi', variant = 'footer' }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [stats, setStats] = useState({
    totalVisits: 1548,
    todayVisits: 124,
    activeOnline: 18,
    userVisits: 1
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const todayKey = `phealing_visits_${new Date().toISOString().split('T')[0]}`;
      const userVisitKey = 'phealing_user_visit_count';
      const totalVisitKey = 'phealing_total_visits';

      // 1. User specific visit count
      let userCount = parseInt(localStorage.getItem(userVisitKey) || '0', 10);
      const isNewSession = !sessionStorage.getItem('phealing_session');

      if (isNewSession) {
        sessionStorage.setItem('phealing_session', 'true');
        userCount += 1;
        localStorage.setItem(userVisitKey, userCount.toString());
      } else if (userCount === 0) {
        userCount = 1;
        localStorage.setItem(userVisitKey, '1');
      }

      // 2. Today visits
      let todayCount = parseInt(localStorage.getItem(todayKey) || '0', 10);
      if (isNewSession) {
        todayCount += 1;
        localStorage.setItem(todayKey, todayCount.toString());
      } else if (todayCount === 0) {
        todayCount = 42; // Base offset for current day
        localStorage.setItem(todayKey, todayCount.toString());
      }

      // 3. Total visits
      let totalCount = parseInt(localStorage.getItem(totalVisitKey) || '1548', 10);
      if (isNewSession) {
        totalCount += 1;
        localStorage.setItem(totalVisitKey, totalCount.toString());
      }

      // 4. Online active users (simulated organic fluctuation)
      const baseOnline = 15 + (new Date().getHours() % 12) + Math.floor(Math.random() * 5);

      setStats({
        totalVisits: totalCount,
        todayVisits: todayCount,
        activeOnline: baseOnline,
        userVisits: userCount
      });

      // Async sync with public counter API if available
      fetch('https://api.counterapi.dev/v1/phealing_vn/visits/up')
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.count === 'number') {
            const apiCount = Math.max(data.count + 1200, totalCount);
            setStats(prev => ({ ...prev, totalVisits: apiCount }));
            localStorage.setItem(totalVisitKey, apiCount.toString());
          }
        })
        .catch(() => {});

      setIsLoaded(true);
    } catch (e) {
      console.warn('VisitorCounter storage fallback', e);
      setIsLoaded(true);
    }
  }, []);

  const formatNum = (num) => {
    return new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US').format(num);
  };

  // Compact Navbar Pill Variant
  if (variant === 'navbar') {
    return (
      <div 
        className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/40 border border-amber-400/30 text-[11px] text-amber-200/90 shadow-sm backdrop-blur-md hover:border-amber-400/60 transition-all cursor-default group"
        title={`${t.totalVisits || 'Tổng lượt truy cập'}: ${formatNum(stats.totalVisits)} | ${t.onlineNow || 'Đang online'}: ${stats.activeOnline}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold font-mono text-amber-300">
            {formatNum(stats.totalVisits)}
          </span>
          <span className="text-gray-400 text-[10px] hidden md:inline">{t.totalVisitsShort || 'lượt xem'}</span>
        </div>
      </div>
    );
  }

  // Full Featured Cosmic Footer Analytics Banner
  return (
    <div className="w-full max-w-4xl mx-auto my-4 px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/60 via-space/90 to-indigo-950/60 border border-amber-400/30 p-4 md:p-5 shadow-xl backdrop-blur-xl group hover:border-amber-400/50 transition-all">
        
        {/* Glow accent decoration */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-amber-300 font-serif">
            <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t.visitorStatsTitle || 'Thống Kê Lượt Truy Cập P Healing'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>{stats.activeOnline} {t.onlineNow || 'đang online'}</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Total Visits */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-900/20 border border-amber-400/15 hover:border-amber-400/40 transition-colors">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-300 shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                {t.totalVisits || 'Tổng lượt xem'}
              </div>
              <div className="text-base md:text-lg font-bold font-mono text-amber-300 tracking-tight">
                {isLoaded ? formatNum(stats.totalVisits) : '...'}
              </div>
            </div>
          </div>

          {/* Today Visits */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-900/20 border border-purple-400/15 hover:border-purple-400/40 transition-colors">
            <div className="p-2 rounded-lg bg-purple-400/10 text-purple-300 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                {t.todayVisits || 'Hôm nay'}
              </div>
              <div className="text-base md:text-lg font-bold font-mono text-purple-200 tracking-tight">
                {isLoaded ? formatNum(stats.todayVisits) : '...'}
              </div>
            </div>
          </div>

          {/* Online Active */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-900/20 border border-emerald-400/15 hover:border-emerald-400/40 transition-colors">
            <div className="p-2 rounded-lg bg-emerald-400/10 text-emerald-300 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                {t.onlineNow || 'Đang trực tuyến'}
              </div>
              <div className="text-base md:text-lg font-bold font-mono text-emerald-300 tracking-tight">
                {stats.activeOnline}
              </div>
            </div>
          </div>

          {/* Your Visits */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-900/20 border border-cyan-400/15 hover:border-cyan-400/40 transition-colors">
            <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-300 shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                {t.yourVisits || 'Lượt ghé thăm bạn'}
              </div>
              <div className="text-base md:text-lg font-bold font-mono text-cyan-200 tracking-tight">
                {stats.userVisits} <span className="text-[10px] font-normal text-gray-400">lần</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
