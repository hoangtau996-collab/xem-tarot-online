// Xuất một khối DOM ẩn thành ảnh PNG hoặc file PDF tải thẳng về máy.
//
// Tách ra khỏi ReadingResult để bản giải Tarot, hồ sơ Thần Số Học và hồ sơ
// Huyền Học dùng chung một đường xuất file - sửa một chỗ là cả ba cùng đúng.

import { deliverFile } from './fileSheet';

const MAX_CANVAS_AREA = 12e6; // chừa biên an toàn dưới ngưỡng ~16,7 triệu điểm ảnh của iOS Safari
const MAX_CANVAS_SIDE = 8000; // một số máy còn giới hạn riêng từng chiều

/* Chụp poster thành canvas.
   Tỉ lệ chụp phải co lại theo độ dài poster: trình duyệt điện thoại từ chối
   canvas quá lớn và trả về ảnh trắng, nên poster càng dài thì scale càng nhỏ. */
export const capturePoster = async (node) => {
  if (!node) throw new Error('Poster template chưa được gắn vào DOM');

  // Nạp muộn, cùng lý do với jspdf bên dưới: thư viện chụp ảnh nặng gần 50KB nén
  // và chỉ cần tới khi khách thật sự bấm xuất file. Nạp sẵn thì mọi người mở
  // bản giải đều phải tải, kể cả người chỉ đọc rồi đóng.
  const { default: html2canvas } = await import('html2canvas');

  /* Đẩy poster ra ngoài màn hình trong lúc chụp. Ba trong bốn poster nằm ngay
     trong luồng trang, nên trước đây bật display là poster rộng 900px hiện
     chình ình cuối trang suốt mấy giây chụp: trang giật chiều cao, còn trên
     điện thoại thì lòi thanh cuộn ngang. */
  const prevCss = node.style.cssText;
  node.style.position = 'absolute';
  node.style.left = '-10000px';
  node.style.top = '0';
  node.style.display = 'block';
  try {
    const rawW = node.offsetWidth || 900;
    const rawH = node.scrollHeight || 1;
    const scale = Math.min(
      2,
      Math.max(
        0.8,
        Math.min(
          Math.sqrt(MAX_CANVAS_AREA / (rawW * rawH)),
          MAX_CANVAS_SIDE / rawH,
          MAX_CANVAS_SIDE / rawW
        )
      )
    );

    const canvas = await html2canvas(node, {
      scale,
      backgroundColor: '#0b0818',
      useCORS: true,
      logging: false
    });

    if (!canvas.width || !canvas.height) throw new Error('Canvas rỗng');
    return canvas;
  } finally {
    node.style.cssText = prevCss;
  }
};

/* Tải file về máy qua blob URL. Data URL nặng vài MB hay bị iOS Safari và
   trình duyệt trong ứng dụng (Zalo, Facebook) lặng lẽ bỏ qua. */
export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Thu hồi muộn: một số trình duyệt cần URL còn sống lúc bắt đầu tải.
  setTimeout(() => URL.revokeObjectURL(url), 60000);
};

export const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error('canvas.toBlob trả về null'))),
      type,
      quality
    );
  });

/* 🖼️ Xuất PNG độ phân giải cao. */
export const exportNodeAsPng = async (node, filename) => {
  const canvas = await capturePoster(node);
  const blob = await canvasToBlob(canvas, 'image/png');
  await deliverFile(blob, filename);
};

/* 📄 Dựng PDF ngay tại máy khách rồi tải về.
   Không dùng window.print(): trên điện thoại và trình duyệt trong ứng dụng,
   hộp thoại in thường không phản hồi nên khách không bao giờ có file. */
export const exportNodeAsPdf = async (node, filename) => {
  const canvas = await capturePoster(node);
  // Nạp muộn: thư viện PDF chỉ tải về khi khách thật sự bấm xuất file.
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 8;
  const usableH = pageH - margin * 2;

  const imgW = pageW - margin * 2;
  const pxPerMm = canvas.width / imgW;
  const pagePx = Math.floor(usableH * pxPerMm);
  const pxPerCss = canvas.width / (node.offsetWidth || 900);

  /* Mỗi trang là một lát cắt riêng của poster. Cách cũ đặt nguyên ảnh dài lên
     mọi trang rồi đẩy dần lên: chỗ ngắt rơi bừa vào giữa dòng chữ, và vì lề
     dưới không bị xén nên một dải ~16mm cuối trang trước lặp lại ở đầu trang
     sau. Giờ chỗ ngắt được dời lên khoảng trống gần nhất giữa hai khối (hoặc
     ít nhất giữa hai dòng), các lát nối tiếp nhau không chồng lấn. */
  const slices = [];
  let start = 0;
  while (start < canvas.height) {
    const ideal = start + pagePx;
    if (ideal >= canvas.height) {
      if (!isBlankBand(canvas, start, canvas.height)) slices.push([start, canvas.height]);
      break;
    }
    const end =
      findQuietRow(canvas, ideal, ideal - Math.floor(pagePx * 0.25), Math.round(14 * pxPerCss)) ??
      findQuietRow(canvas, ideal, ideal - Math.floor(pagePx * 0.12), Math.round(3 * pxPerCss)) ??
      ideal;
    slices.push([start, end]);
    start = end;
  }

  const sliceCanvas = document.createElement('canvas');
  sliceCanvas.width = canvas.width;
  const sliceCtx = sliceCanvas.getContext('2d');

  slices.forEach(([y0, y1], i) => {
    if (i > 0) doc.addPage();
    // Nền vũ trụ cho từng trang, khớp màu poster (#0b0818) để không lòi ra
    // dải trắng quanh lát cắt.
    doc.setFillColor(11, 8, 24);
    doc.rect(0, 0, pageW, pageH, 'F');

    sliceCanvas.height = y1 - y0;
    sliceCtx.drawImage(canvas, 0, y0, canvas.width, y1 - y0, 0, 0, canvas.width, y1 - y0);
    const imgData = sliceCanvas.toDataURL('image/jpeg', 0.92);
    doc.addImage(imgData, 'JPEG', margin, margin, imgW, (y1 - y0) / pxPerMm, undefined, 'FAST');
  });

  await deliverFile(doc.output('blob'), filename);
};

/* Một hàng điểm ảnh "lặng" là hàng giống hệt hàng ngay trên nó - tức không đi
   qua chữ, viền ngang hay hình vẽ nào. Viền dọc hai bên khung vẫn lặp lại y
   nguyên từ hàng này sang hàng kia nên không làm hỏng phép so. */
const quietFlags = (canvas, y0, y1) => {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const top = Math.max(0, y0 - 1);
  const data = ctx.getImageData(0, top, w, y1 - top).data;
  const flags = [];
  for (let y = y0; y < y1; y++) {
    if (y === 0) { flags.push(true); continue; }
    const row = (y - top) * w * 4;
    const prev = row - w * 4;
    let noisy = 0;
    for (let x = 0; x < w * 4; x += 8) {
      const d = Math.abs(data[row + x] - data[prev + x]) +
        Math.abs(data[row + x + 1] - data[prev + x + 1]) +
        Math.abs(data[row + x + 2] - data[prev + x + 2]);
      if (d > 24 && ++noisy > 2) break;
    }
    flags.push(noisy <= 2);
  }
  return flags;
};

/* Dò ngược từ `ideal` lên tới `minY` tìm một dải lặng cao ít nhất `run` hàng,
   trả về điểm giữa dải để cắt. Không có thì trả về null. */
const findQuietRow = (canvas, ideal, minY, run) => {
  const from = Math.max(1, minY);
  const flags = quietFlags(canvas, from, ideal);
  let streak = 0;
  for (let y = ideal - 1; y >= from; y--) {
    streak = flags[y - from] ? streak + 1 : 0;
    if (streak >= run) return y + Math.floor(run / 2);
  }
  return null;
};

// Phần đuôi chỉ còn lề nền trống thì không đáng một trang PDF riêng.
const isBlankBand = (canvas, y0, y1) => quietFlags(canvas, y0, y1).every(Boolean);
