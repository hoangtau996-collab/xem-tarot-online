// Xuất một khối DOM ẩn thành ảnh PNG hoặc file PDF tải thẳng về máy.
//
// Tách ra khỏi ReadingResult để bản giải Tarot, hồ sơ Thần Số Học và hồ sơ
// Huyền Học dùng chung một đường xuất file - sửa một chỗ là cả ba cùng đúng.

import html2canvas from 'html2canvas';

const MAX_CANVAS_AREA = 12e6; // chừa biên an toàn dưới ngưỡng ~16,7 triệu điểm ảnh của iOS Safari
const MAX_CANVAS_SIDE = 8000; // một số máy còn giới hạn riêng từng chiều

/* Chụp poster thành canvas.
   Tỉ lệ chụp phải co lại theo độ dài poster: trình duyệt điện thoại từ chối
   canvas quá lớn và trả về ảnh trắng, nên poster càng dài thì scale càng nhỏ. */
export const capturePoster = async (node) => {
  if (!node) throw new Error('Poster template chưa được gắn vào DOM');

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
    node.style.display = 'none';
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
  downloadBlob(blob, filename);
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

  const imgData = canvas.toDataURL('image/jpeg', 0.92);
  const imgW = pageW - margin * 2;
  const imgH = (canvas.height / canvas.width) * imgW;

  // Nền vũ trụ cho từng trang, khớp màu poster (#0b0818) để không lòi ra
  // dải trắng ở trang cuối.
  const paintBackground = () => {
    doc.setFillColor(11, 8, 24);
    doc.rect(0, 0, pageW, pageH, 'F');
  };

  // Poster dài hơn một trang A4: cắt bằng cách đẩy dần ảnh lên qua từng trang.
  let heightLeft = imgH;
  let offset = margin;

  paintBackground();
  doc.addImage(imgData, 'JPEG', margin, offset, imgW, imgH, undefined, 'FAST');
  heightLeft -= usableH;

  while (heightLeft > 0) {
    offset = margin - (imgH - heightLeft);
    doc.addPage();
    paintBackground();
    doc.addImage(imgData, 'JPEG', margin, offset, imgW, imgH, undefined, 'FAST');
    heightLeft -= usableH;
  }

  downloadBlob(doc.output('blob'), filename);
};
