import React, { useMemo } from 'react';
import { SIGNS, PLANETS, ASPECTS, ELEMENT_INFO } from '../data/astrologyData';
import { norm360 } from '../utils/ephemeris';

/* Vòng bản đồ sao vẽ bằng SVG thuần.
 *
 * Vì sao không dùng thư viện biểu đồ: vòng này không phải biểu đồ dữ liệu mà
 * là một hệ toạ độ riêng của chiêm tinh - mọi thứ đều quy về một phép đổi từ
 * kinh độ hoàng đạo sang góc trên màn hình. Tự vẽ thì ngắn hơn cấu hình một
 * thư viện, và quan trọng hơn là không kéo thêm phụ thuộc vào một trang tĩnh.
 *
 * Mọi màu sắc và nét vẽ đều đặt thẳng bằng thuộc tính SVG chứ không qua class
 * Tailwind: html2canvas khi xuất poster sẽ tuần tự hoá thẻ SVG, và lúc đó các
 * class từ CDN không còn được áp dụng nữa - poster sẽ ra một vòng tròn trắng.
 */

const SYMBOL_FONT = "'Segoe UI Symbol','Apple Symbols','Noto Sans Symbols 2','Arial Unicode MS',sans-serif";

/* Cung Mọc luôn nằm ở mép trái (vị trí 9 giờ) và các nhà chạy ngược chiều kim
   đồng hồ xuống dưới - đúng quy ước của mọi lá số phương Tây.
   Trục y của SVG hướng xuống nên phải đảo dấu sin. */
const angleFor = (lon, ascLon) => 180 + (norm360(lon) - ascLon);

const pointAt = (lon, radius, ascLon, cx, cy) => {
  const rad = (angleFor(lon, ascLon) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) };
};

/* Cung tròn từ kinh độ này tới kinh độ kia, dùng cho các múi cung hoàng đạo. */
const sectorPath = (fromLon, toLon, rOuter, rInner, ascLon, cx, cy) => {
  const a1 = pointAt(fromLon, rOuter, ascLon, cx, cy);
  const a2 = pointAt(toLon, rOuter, ascLon, cx, cy);
  const b2 = pointAt(toLon, rInner, ascLon, cx, cy);
  const b1 = pointAt(fromLon, rInner, ascLon, cx, cy);
  // sweep = 0 vì góc màn hình tăng theo chiều ngược kim đồng hồ của SVG.
  return [
    `M ${a1.x} ${a1.y}`,
    `A ${rOuter} ${rOuter} 0 0 0 ${a2.x} ${a2.y}`,
    `L ${b2.x} ${b2.y}`,
    `A ${rInner} ${rInner} 0 0 1 ${b1.x} ${b1.y}`,
    'Z'
  ].join(' ');
};

/* Đẩy các hành tinh đứng sát nhau ra xa để glyph không chồng lên nhau.
   Chỉ đổi chỗ vẽ, không đổi số: vạch nối từ vị trí thật tới glyph vẫn được vẽ
   nên người đọc luôn thấy được độ chính xác. */
const spreadLabels = (items, minGap = 7.5) => {
  const sorted = [...items].sort((a, b) => a.lon - b.lon);
  const display = sorted.map(item => ({ ...item, display: item.lon }));

  for (let pass = 0; pass < 60; pass++) {
    let moved = false;
    for (let i = 0; i < display.length; i++) {
      const cur = display[i];
      const next = display[(i + 1) % display.length];
      const gap = norm360(next.display - cur.display);
      if (gap < minGap) {
        const push = (minGap - gap) / 2;
        cur.display = norm360(cur.display - push);
        next.display = norm360(next.display + push);
        moved = true;
      }
    }
    if (!moved) break;
  }

  return display;
};

export const NatalChart = ({ chart, lang = 'vi', size = 720, showAspects = true }) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 4;

  const rSignOuter = R;
  const rSignInner = R * 0.855;
  const rPlanet = R * 0.755;      // vòng đặt glyph hành tinh
  const rHouseRing = R * 0.60;    // vòng ghi số nhà
  const rAspect = R * 0.545;      // vòng trong cùng, nơi vẽ lưới góc chiếu

  // Không có giờ sinh thì không có Cung Mọc: lấy 0 độ Bạch Dương làm mốc trái
  // để vòng vẫn đọc được, và phần nhà sẽ được ẩn đi.
  const ascLon = chart.hasTime ? chart.angles.asc : 0;
  const P = (lon, r) => pointAt(lon, r, ascLon, cx, cy);

  const planetLayout = useMemo(() => {
    const items = chart.planets.map(p => ({ key: p.key, lon: p.lon, retro: p.retrograde, deg: p.position.deg }));
    return spreadLabels(items);
  }, [chart]);

  const aspectLines = useMemo(() => {
    if (!showAspects) return [];
    const byKey = Object.fromEntries(chart.planets.map(p => [p.key, p.lon]));
    return chart.aspects
      .filter(a => byKey[a.a] !== undefined && byKey[a.b] !== undefined)
      .map(a => {
        const meta = ASPECTS.find(x => x.key === a.aspectKey);
        return { ...a, meta, from: P(byKey[a.a], rAspect), to: P(byKey[a.b], rAspect) };
      })
      .filter(a => a.meta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, showAspects]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      style={{ maxWidth: size, display: 'block', margin: '0 auto' }}
      role="img"
      aria-label={lang === 'en' ? 'Natal chart wheel' : lang === 'zh' ? '本命星盘' : 'Vòng bản đồ sao'}
    >
      <defs>
        <radialGradient id="natal-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1b1740" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#07061a" stopOpacity="0.95" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={rSignOuter} fill="url(#natal-core)" />

      {/* Vành 12 cung hoàng đạo, tô nhạt theo màu nguyên tố */}
      {SIGNS.map((sign, i) => {
        const from = i * 30;
        const mid = from + 15;
        const label = P(mid, (rSignOuter + rSignInner) / 2);
        return (
          <g key={sign.key}>
            <path
              d={sectorPath(from, from + 30, rSignOuter, rSignInner, ascLon, cx, cy)}
              fill={ELEMENT_INFO[sign.element].color}
              fillOpacity="0.16"
              stroke="rgba(226,214,255,0.28)"
              strokeWidth="1"
            />
            <text
              x={label.x} y={label.y}
              fill={sign.color} fontSize={R * 0.072} fontFamily={SYMBOL_FONT}
              textAnchor="middle" dominantBaseline="central"
            >
              {sign.glyph}
            </text>
          </g>
        );
      })}

      {/* Vạch chia 5 độ trên vành cung - để đọc được vị trí chính xác bằng mắt */}
      {Array.from({ length: 72 }, (_, i) => i * 5).map(deg => {
        const isTen = deg % 10 === 0;
        const a = P(deg, rSignInner);
        const b = P(deg, rSignInner + (isTen ? R * 0.032 : R * 0.018));
        return (
          <line key={`tick-${deg}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="rgba(226,214,255,0.35)" strokeWidth={isTen ? 1.1 : 0.6} />
        );
      })}

      <circle cx={cx} cy={cy} r={rSignInner} fill="none" stroke="rgba(226,214,255,0.35)" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={rAspect} fill="none" stroke="rgba(226,214,255,0.22)" strokeWidth="1" />

      {/* Đỉnh nhà. Bốn góc (1, 4, 7, 10) vẽ đậm hơn vì đó là trục của lá số. */}
      {chart.houses && chart.houses.map((house, i) => {
        const isAngle = [0, 3, 6, 9].includes(i);
        const a = P(house.cusp, rAspect);
        const b = P(house.cusp, rSignInner);
        const nextCusp = chart.houses[(i + 1) % 12].cusp;
        const midLon = house.cusp + norm360(nextCusp - house.cusp) / 2;
        const numAt = P(midLon, rHouseRing);
        return (
          <g key={`house-${house.num}`}>
            <line
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={isAngle ? 'rgba(251,191,36,0.85)' : 'rgba(226,214,255,0.3)'}
              strokeWidth={isAngle ? 2 : 0.9}
              strokeDasharray={isAngle ? undefined : '3 4'}
            />
            <text
              x={numAt.x} y={numAt.y}
              fill="rgba(226,214,255,0.5)" fontSize={R * 0.045}
              textAnchor="middle" dominantBaseline="central"
            >
              {house.num}
            </text>
          </g>
        );
      })}

      {/* Lưới góc chiếu ở lõi vòng */}
      {aspectLines.map((a, i) => (
        <line
          key={`asp-${i}`}
          x1={a.from.x} y1={a.from.y} x2={a.to.x} y2={a.to.y}
          stroke={a.meta.color}
          strokeWidth={a.major ? 0.6 + a.strength * 1.9 : 0.5 + a.strength * 0.8}
          strokeOpacity={a.major ? 0.25 + a.strength * 0.55 : 0.18 + a.strength * 0.3}
          strokeDasharray={a.major ? undefined : '4 3'}
        />
      ))}

      {/* Hành tinh: vạch nối từ vị trí thật tới glyph đã được đẩy ra cho dễ đọc */}
      {planetLayout.map(item => {
        const meta = PLANETS[item.key];
        const tickA = P(item.lon, rSignInner);
        const tickB = P(item.display, rPlanet + R * 0.045);
        const at = P(item.display, rPlanet);
        const degAt = P(item.display, rPlanet - R * 0.062);
        return (
          <g key={item.key}>
            <line x1={tickA.x} y1={tickA.y} x2={tickB.x} y2={tickB.y} stroke={meta.color} strokeWidth="0.9" strokeOpacity="0.55" />
            <circle cx={at.x} cy={at.y} r={R * 0.048} fill="rgba(7,6,26,0.85)" stroke={meta.color} strokeOpacity="0.6" strokeWidth="0.8" />
            <text
              x={at.x} y={at.y}
              fill={meta.color} fontSize={R * 0.062} fontFamily={SYMBOL_FONT}
              textAnchor="middle" dominantBaseline="central"
            >
              {meta.glyph}
            </text>
            <text
              x={degAt.x} y={degAt.y}
              fill="rgba(226,214,255,0.75)" fontSize={R * 0.034}
              textAnchor="middle" dominantBaseline="central"
            >
              {item.deg}{'°'}{item.retro ? ' ℞' : ''}
            </text>
          </g>
        );
      })}

      {/* Nhãn bốn góc, vẽ sau cùng để luôn nằm trên */}
      {chart.hasTime && [
        { key: 'AC', lon: chart.angles.asc, color: '#fbbf24' },
        { key: 'IC', lon: chart.angles.ic, color: '#a78bfa' },
        { key: 'DC', lon: chart.angles.dsc, color: '#f472b6' },
        { key: 'MC', lon: chart.angles.mc, color: '#22d3ee' }
      ].map(angle => {
        const at = P(angle.lon, rSignOuter - R * 0.045);
        return (
          <g key={angle.key}>
            <circle cx={at.x} cy={at.y} r={R * 0.042} fill="rgba(7,6,26,0.9)" stroke={angle.color} strokeWidth="1.1" />
            <text
              x={at.x} y={at.y}
              fill={angle.color} fontSize={R * 0.04} fontWeight="700"
              textAnchor="middle" dominantBaseline="central"
            >
              {angle.key}
            </text>
          </g>
        );
      })}

      {/* Không có giờ sinh thì nói thẳng ra ngay trên vòng, thay vì để trống
          giữa vòng khiến người xem tưởng là lá số đầy đủ. */}
      {!chart.hasTime && (
        <text
          x={cx} y={cy}
          fill="rgba(226,214,255,0.55)" fontSize={R * 0.05}
          textAnchor="middle" dominantBaseline="central"
        >
          {lang === 'en' ? 'No birth time - houses not drawn'
            : lang === 'zh' ? '无出生时间 · 未划分宫位'
              : 'Chưa có giờ sinh - không chia nhà'}
        </text>
      )}
    </svg>
  );
};

/* Bảng chú giải màu góc chiếu, tách riêng để trang chính đặt được ở đâu tuỳ ý. */
export const AspectLegend = ({ lang = 'vi' }) => {
  const L = (obj) => (obj ? obj[lang] || obj.vi : '');
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-2xs">
      {ASPECTS.map(a => (
        <span key={a.key} className="inline-flex items-center gap-1.5 text-gray-300">
          <span className="inline-block w-4 h-0.5 rounded-full" style={{ backgroundColor: a.color }} />
          <span style={{ color: a.color }}>{a.glyph}</span>
          {L(a.name)}
          <span className="text-gray-500">{a.angle}{'°'}</span>
        </span>
      ))}
    </div>
  );
};
