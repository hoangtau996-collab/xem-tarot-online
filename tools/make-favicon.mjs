// Sinh bộ favicon cỏ bốn lá may mắn cho P Healing.
//
// Chạy:  node tools/make-favicon.mjs
// Xuất ra:  public/favicon.svg, public/favicon-32.png, public/apple-touch-icon.png
//
// Hình được mô tả một lần bằng đường cong Bézier ở đây rồi vừa ghi ra SVG, vừa
// tự tô thành PNG, nên hai định dạng không bao giờ lệch nhau. PNG được tô bằng
// zlib có sẵn của Node - không cần thư viện đồ hoạ nào.

import { writeFileSync, mkdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = join(ROOT, 'public');

/* ---------------------------------------------------------------- Hình học */

const VIEW = 64;            // khung vuông 64x64
// Tâm chụm bốn lá đặt hơi cao hơn giữa khung vì cuống thò xuống dưới; cỡ lá
// lấy sát mép để icon vẫn đọc được ở 16px trên thanh tab.
const CENTER = [32, 28.3];
const LEAF_SCALE = 1.104;

// Một lá hình trái tim, mũi nhọn ở gốc toạ độ và phình lên phía trên (-y).
// Mỗi phần tử: [c1x, c1y, c2x, c2y, x, y] của một đoạn cubic Bézier.
const LEAF_CURVES = [
  [-1.5, -5.5, -13, -7, -13, -16],
  [-13, -22.5, -6.5, -25.5, 0, -20.5],
  [6.5, -25.5, 13, -22.5, 13, -16],
  [13, -7, 1.5, -5.5, 0, 0]
];

// Cuống cỏ: đường tâm cong xuống dưới bên phải, thon dần về ngọn.
const STEM_CURVE = { from: [0, 1], c1: [1.5, 12], c2: [9, 18], to: [7.5, 30] };
const STEM_WIDTH = [3.4, 0.9]; // bề ngang ở gốc và ở ngọn

const LEAF_ANGLES = [45, 135, 225, 315];

const GOLD = [251, 191, 36];
const STEM_COLOR = [21, 128, 61];
const LEAF_LIGHT = [167, 243, 208];
const LEAF_MID = [34, 197, 94];
const LEAF_DARK = [20, 83, 45];
const SPACE = [11, 8, 24]; // nền vũ trụ #0b0818 cho icon iOS

const STROKE = 1.25;

/* --------------------------------------------------- Bézier -> đa giác phẳng */

const cubicAt = (p0, c1, c2, p1, t) => {
  const u = 1 - t;
  return (
    u * u * u * p0 +
    3 * u * u * t * c1 +
    3 * u * t * t * c2 +
    t * t * t * p1
  );
};

const flattenLeaf = (steps = 22) => {
  const pts = [];
  let cur = [0, 0];
  for (const [c1x, c1y, c2x, c2y, x, y] of LEAF_CURVES) {
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      pts.push([
        cubicAt(cur[0], c1x, c2x, x, t),
        cubicAt(cur[1], c1y, c2y, y, t)
      ]);
    }
    cur = [x, y];
  }
  return pts;
};

const rotateTranslate = (pts, angleDeg, [cx, cy], scale) => {
  const a = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return pts.map(([x, y]) => {
    const sx = x * scale;
    const sy = y * scale;
    return [cx + sx * cos - sy * sin, cy + sx * sin + sy * cos];
  });
};

// Cuống: lấy đường tâm rồi nới sang hai bên theo bề ngang thon dần.
const buildStem = (steps = 26) => {
  const { from, c1, c2, to } = STEM_CURVE;
  const spine = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    spine.push([
      cubicAt(from[0], c1[0], c2[0], to[0], t),
      cubicAt(from[1], c1[1], c2[1], to[1], t),
      t
    ]);
  }

  const left = [];
  const right = [];
  for (let i = 0; i < spine.length; i++) {
    const [x, y, t] = spine[i];
    const prev = spine[Math.max(0, i - 1)];
    const next = spine[Math.min(spine.length - 1, i + 1)];
    const dx = next[0] - prev[0];
    const dy = next[1] - prev[1];
    const len = Math.hypot(dx, dy) || 1;
    const half = (STEM_WIDTH[0] + (STEM_WIDTH[1] - STEM_WIDTH[0]) * t) / 2;
    const nx = (-dy / len) * half;
    const ny = (dx / len) * half;
    left.push([x + nx, y + ny]);
    right.push([x - nx, y - ny]);
  }

  const pts = [...left, ...right.reverse()];
  const [cx, cy] = CENTER;
  return pts.map(([x, y]) => [cx + x * LEAF_SCALE, cy + y * LEAF_SCALE]);
};

const LEAVES = LEAF_ANGLES.map(angle =>
  rotateTranslate(flattenLeaf(), angle, CENTER, LEAF_SCALE)
);
const STEM = buildStem();
const SHAPES = [STEM, ...LEAVES];

/* ------------------------------------------------------------------- SVG ra */

/* Toạ độ trong SVG được tính sẵn ra hệ 64x64 (không dùng thuộc tính transform)
   vì hai lý do: dải màu userSpaceOnUse phải trải đều trên cả hình thay vì xoay
   theo từng lá, và bề dày nét vàng phải bằng đúng STROKE như lúc tô PNG. */
const fmt = n => String(Math.round(n * 1000) / 1000);

const toWorld = ([x, y], angleDeg) => {
  const a = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const sx = x * LEAF_SCALE;
  const sy = y * LEAF_SCALE;
  return [CENTER[0] + sx * cos - sy * sin, CENTER[1] + sx * sin + sy * cos];
};

const svgLeafPath = angle => {
  const p0 = toWorld([0, 0], angle);
  let d = `M ${fmt(p0[0])} ${fmt(p0[1])}`;
  for (const [c1x, c1y, c2x, c2y, x, y] of LEAF_CURVES) {
    const c1 = toWorld([c1x, c1y], angle);
    const c2 = toWorld([c2x, c2y], angle);
    const p = toWorld([x, y], angle);
    d += ` C ${fmt(c1[0])} ${fmt(c1[1])}, ${fmt(c2[0])} ${fmt(c2[1])}, ${fmt(p[0])} ${fmt(p[1])}`;
  }
  return `${d} Z`;
};

// Cuống dùng chính đường bao đã dựng cho bản PNG nên nét thon giống hệt nhau.
const svgStemPath = () =>
  `M ${STEM.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join(' L ')} Z`;

const buildSvg = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}" width="${VIEW}" height="${VIEW}" role="img" aria-label="Cỏ bốn lá may mắn">
  <title>P Healing - Cỏ bốn lá may mắn</title>
  <defs>
    <linearGradient id="leaf" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${VIEW}" y2="${VIEW}">
      <stop offset="0" stop-color="rgb(${LEAF_LIGHT})"/>
      <stop offset="0.52" stop-color="rgb(${LEAF_MID})"/>
      <stop offset="1" stop-color="rgb(${LEAF_DARK})"/>
    </linearGradient>
  </defs>

  <!-- Cuống cỏ -->
  <path d="${svgStemPath()}" fill="rgb(${STEM_COLOR})"/>

  <!-- Bốn lá chụm mũi vào tâm -->
${LEAF_ANGLES.map(a => `  <path d="${svgLeafPath(a)}" fill="url(#leaf)"
        stroke="rgb(${GOLD})" stroke-width="${STROKE}" stroke-linejoin="round"/>`).join('\n')}
</svg>
`;

/* ------------------------------------------------------------- Tô ra bitmap */

const pointInPolygon = (px, py, poly) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
};

const distToPolygon = (px, py, poly) => {
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const dx = xj - xi;
    const dy = yj - yi;
    const lenSq = dx * dx + dy * dy || 1e-9;
    let t = ((px - xi) * dx + (py - yi) * dy) / lenSq;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const d = Math.hypot(px - (xi + t * dx), py - (yi + t * dy));
    if (d < best) best = d;
  }
  return best;
};

const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

// Màu lá theo dải chuyển chéo, khớp với linearGradient của bản SVG.
const leafColorAt = (x, y) => {
  const t = Math.min(1, Math.max(0, (x + y) / (VIEW * 2)));
  return t < 0.52
    ? lerp(LEAF_LIGHT, LEAF_MID, t / 0.52)
    : lerp(LEAF_MID, LEAF_DARK, (t - 0.52) / 0.48);
};

/* Trả về [r, g, b, a] tại một điểm trong hệ toạ độ 64x64. */
const sampleAt = (x, y) => {
  // Cuống nằm dưới cùng, không viền vàng cho gọn nét ở cỡ nhỏ.
  let color = pointInPolygon(x, y, STEM) ? STEM_COLOR : null;

  for (const leaf of LEAVES) {
    const inside = pointInPolygon(x, y, leaf);
    const edge = distToPolygon(x, y, leaf);
    if (edge <= STROKE / 2) return [...GOLD, 255];
    if (inside) color = leafColorAt(x, y);
  }

  return color ? [...color, 255] : [0, 0, 0, 0];
};

/* Tô một ảnh size x size với khử răng cưa bằng cách lấy nhiều mẫu mỗi điểm ảnh. */
const render = (size, background) => {
  const SS = 4; // 4x4 mẫu con
  const px = Buffer.alloc(size * size * 4);
  const unit = VIEW / size;

  for (let py = 0; py < size; py++) {
    for (let pxi = 0; pxi < size; pxi++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = (pxi + (sx + 0.5) / SS) * unit;
          const y = (py + (sy + 0.5) / SS) * unit;
          const [sr, sg, sb, sa] = sampleAt(x, y);
          const w = sa / 255;
          r += sr * w;
          g += sg * w;
          b += sb * w;
          a += w;
        }
      }
      const n = SS * SS;
      const cov = a / n;
      const idx = (py * size + pxi) * 4;

      if (cov < 1e-6) {
        if (background) {
          px[idx] = background[0];
          px[idx + 1] = background[1];
          px[idx + 2] = background[2];
          px[idx + 3] = 255;
        }
        continue;
      }

      // Màu trung bình của phần được phủ (premultiplied -> straight alpha).
      const fr = r / a;
      const fg = g / a;
      const fb = b / a;

      if (background) {
        px[idx] = Math.round(fr * cov + background[0] * (1 - cov));
        px[idx + 1] = Math.round(fg * cov + background[1] * (1 - cov));
        px[idx + 2] = Math.round(fb * cov + background[2] * (1 - cov));
        px[idx + 3] = 255;
      } else {
        px[idx] = Math.round(fr);
        px[idx + 1] = Math.round(fg);
        px[idx + 2] = Math.round(fb);
        px[idx + 3] = Math.round(cov * 255);
      }
    }
  }
  return px;
};

/* ------------------------------------------------------------ Đóng gói PNG */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

const crc32 = buf => {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

const pngChunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

const encodePng = (size, rgba) => {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // 8 bit mỗi kênh
  ihdr[9] = 6;  // truecolour + alpha
  // 10-12: nén/lọc/xen kẽ đều là 0

  // Mỗi hàng có một byte chọn bộ lọc (0 = None) đứng trước.
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0))
  ]);
};

/* ------------------------------------------------------------------- Chạy */

mkdirSync(PUBLIC_DIR, { recursive: true });

const outputs = [
  ['favicon.svg', Buffer.from(buildSvg(), 'utf8')],
  ['favicon-32.png', encodePng(32, render(32, null))],
  ['favicon-180.png', encodePng(180, render(180, null))],
  // iOS không xử lý nền trong suốt: nền vũ trụ đặc cho icon màn hình chính.
  ['apple-touch-icon.png', encodePng(180, render(180, SPACE))]
];

for (const [name, buf] of outputs) {
  writeFileSync(join(PUBLIC_DIR, name), buf);
  console.log(`${name.padEnd(22)} ${(buf.length / 1024).toFixed(1)} KB`);
}
