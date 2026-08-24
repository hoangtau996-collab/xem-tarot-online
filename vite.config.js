import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    /* Ghim cú pháp CSS về mức các máy cũ còn đọc được.
       Mặc định, trình rút gọn của Vite viết lại @media (min-width:640px) thành
       cú pháp mới @media (width>=640px). Safari dưới 16.4 và WebView Android cũ
       không hiểu dạng này: chúng bỏ qua cả khối, tức là toàn bộ cách bày trí
       theo khổ màn hình (sm: md: lg:) mất tác dụng - chứ không phải vỡ một vài
       chỗ. Bản Tailwind CDN trước đây trả về cú pháp cổ điển nên không gặp lỗi
       này, nên phải ghim lại cho khớp. */
    cssTarget: ['chrome87', 'safari14', 'firefox78', 'edge88']
  }
})
