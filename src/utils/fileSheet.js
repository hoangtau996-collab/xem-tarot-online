// Giao file vừa xuất tới tay khách.
//
// Máy tính tải thẳng về. Điện thoại thì khác: trình duyệt trong Zalo,
// Facebook, Messenger lặng lẽ bỏ qua lệnh tải file (nút quay xong, không báo
// lỗi, không có file), còn iPhone thì cất ảnh vào app Tệp chứ không vào Ảnh.
// Nên trên màn hình cảm ứng, file làm xong được đưa vào một hộp xem trước:
// - "Lưu / Chia sẻ" mở bảng chia sẻ của máy (có sẵn "Lưu ảnh" trên iPhone).
//   Phải gọi từ một cú chạm mới - lượt chạm vào nút xuất đã hết hiệu lực sau
//   mấy giây dựng ảnh, gọi luôn thì trình duyệt từ chối.
// - Ảnh xem trước nhấn giữ được để lưu - đường lui cho trình duyệt trong ứng
//   dụng không có bảng chia sẻ. Ảnh dùng data URL chứ không dùng blob URL vì
//   trình lưu ảnh của app chạy ngoài trang, không đọc được blob URL.
// Hộp dựng bằng DOM thuần để bốn mục dùng chung mà không phải sửa component.

import { downloadBlob } from './posterExport';

const SHEET_TEXT = {
  vi: {
    readyImage: 'Ảnh của bạn đã sẵn sàng',
    readyPdf: 'File PDF của bạn đã sẵn sàng',
    holdHint: 'Nhấn giữ ảnh để lưu vào máy',
    pdfHint: 'Nếu bấm Tải về mà không thấy file, hãy mở trang bằng Chrome hoặc Safari.',
    share: 'Lưu / Chia sẻ',
    download: 'Tải về',
    openPdf: 'Mở PDF',
    close: 'Đóng'
  },
  en: {
    readyImage: 'Your image is ready',
    readyPdf: 'Your PDF is ready',
    holdHint: 'Press and hold the image to save it',
    pdfHint: 'If Download does nothing, open this page in Chrome or Safari.',
    share: 'Save / Share',
    download: 'Download',
    openPdf: 'Open PDF',
    close: 'Close'
  },
  zh: {
    readyImage: '图片已生成',
    readyPdf: 'PDF 文件已生成',
    holdHint: '长按图片即可保存',
    pdfHint: '若点击下载没有反应，请改用 Chrome 或 Safari 打开本页面。',
    share: '保存 / 分享',
    download: '下载',
    openPdf: '打开 PDF',
    close: '关闭'
  }
};

// App ghi ngôn ngữ đang chọn lên <html lang> (xem utils/lang.js).
const sheetText = () => {
  const code = (document.documentElement.lang || 'vi').slice(0, 2);
  return SHEET_TEXT[code] || SHEET_TEXT.vi;
};

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(pointer: coarse)').matches;

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

export const deliverFile = async (blob, filename) => {
  if (!isTouchDevice()) {
    downloadBlob(blob, filename);
    return;
  }
  const isImage = blob.type.startsWith('image/');
  const previewUrl = isImage ? await blobToDataUrl(blob) : null;
  showFileSheet({ blob, filename, isImage, previewUrl });
};

const makeButton = (label, primary) => {
  const el = document.createElement('button');
  el.type = 'button';
  el.textContent = label;
  el.style.cssText = [
    'flex:1 1 0', 'min-height:46px', 'padding:10px 14px', 'border-radius:999px',
    'font:600 14px "Be Vietnam Pro",sans-serif', 'cursor:pointer', 'white-space:nowrap',
    primary
      ? 'background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#1e1033;border:none'
      : 'background:rgba(255,255,255,0.06);color:#e9d5ff;border:1px solid rgba(192,132,252,0.45)'
  ].join(';');
  return el;
};

const showFileSheet = ({ blob, filename, isImage, previewUrl }) => {
  const t = sheetText();
  const file = new File([blob], filename, { type: blob.type });
  let canShare = false;
  try {
    canShare = !!(navigator.canShare && navigator.canShare({ files: [file] }));
  } catch {
    /* Trình duyệt cũ ném lỗi thay vì trả false */
  }
  const opener = document.activeElement;
  const prevOverflow = document.body.style.overflow;

  const overlay = document.createElement('div');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', isImage ? t.readyImage : t.readyPdf);
  overlay.setAttribute('data-file-sheet', '');
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:2147483000', 'display:flex',
    'align-items:flex-end', 'justify-content:center',
    'background:rgba(5,3,15,0.82)', 'padding:16px'
  ].join(';');

  const panel = document.createElement('div');
  panel.style.cssText = [
    'width:100%', 'max-width:460px', 'max-height:calc(100vh - 32px)', 'display:flex',
    'flex-direction:column', 'gap:12px', 'padding:16px', 'border-radius:20px',
    'background:#140e33', 'border:1px solid rgba(251,191,36,0.45)',
    'box-shadow:0 10px 40px rgba(0,0,0,0.6)', 'color:#f3f4f6',
    'font-family:"Be Vietnam Pro",sans-serif', 'box-sizing:border-box'
  ].join(';');

  const title = document.createElement('div');
  title.textContent = isImage ? t.readyImage : t.readyPdf;
  title.style.cssText = 'font-weight:700;font-size:16px;color:#fbbf24;text-align:center';
  panel.append(title);

  if (isImage) {
    // Poster dài nên khung xem trước tự cuộn; ảnh vẫn là một ảnh nguyên vẹn để
    // nhấn giữ là lưu được trọn.
    const frame = document.createElement('div');
    frame.style.cssText = 'flex:1 1 auto;min-height:0;overflow-y:auto;border-radius:12px;background:#0b0818;-webkit-overflow-scrolling:touch';
    const img = document.createElement('img');
    img.src = previewUrl;
    img.alt = filename;
    img.style.cssText = 'display:block;width:100%;height:auto;-webkit-touch-callout:default';
    frame.append(img);
    panel.append(frame);
  }

  const hint = document.createElement('div');
  hint.textContent = isImage ? t.holdHint : t.pdfHint;
  hint.style.cssText = 'font-size:12.5px;color:#c4b5fd;text-align:center;line-height:1.5';
  panel.append(hint);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap';
  panel.append(row);

  let blobUrl = null;
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  const close = () => {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    document.body.style.overflow = prevOverflow;
    if (blobUrl) setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    if (opener && opener.focus) opener.focus();
  };

  if (canShare) {
    const shareBtn = makeButton(t.share, true);
    shareBtn.addEventListener('click', async () => {
      try {
        await navigator.share({ files: [file], title: filename });
      } catch (err) {
        // Khách tự đóng bảng chia sẻ thì thôi; lỗi khác mới chuyển sang tải về.
        if (err && err.name !== 'AbortError') downloadBlob(blob, filename);
      }
    });
    // PDF có ba nút, chung một hàng thì chữ bị gãy dòng trên điện thoại.
    if (!isImage) shareBtn.style.flex = '1 1 100%';
    row.append(shareBtn);
  }

  if (!isImage) {
    // iPhone mở PDF trong trình xem có sẵn, từ đó lưu vào Tệp hoặc chia sẻ.
    const openBtn = makeButton(t.openPdf, !canShare);
    openBtn.addEventListener('click', () => {
      blobUrl = blobUrl || URL.createObjectURL(blob);
      window.open(blobUrl, '_blank', 'noopener');
    });
    row.append(openBtn);
  }

  const dlBtn = makeButton(t.download, !canShare && isImage);
  dlBtn.addEventListener('click', () => downloadBlob(blob, filename));
  row.append(dlBtn);

  const closeBtn = makeButton(t.close, false);
  closeBtn.style.flex = '1 1 100%';
  closeBtn.addEventListener('click', close);
  row.append(closeBtn);

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', onKey);

  document.body.style.overflow = 'hidden';
  overlay.append(panel);
  document.body.append(overlay);
  row.querySelector('button').focus();
};
