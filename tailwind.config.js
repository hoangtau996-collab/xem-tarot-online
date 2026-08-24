/** @type {import('tailwindcss').Config} */

// Cấu hình này chép nguyên văn từ khối <script>tailwind.config</script> từng
// nằm trong index.html (Tailwind Play CDN). Giữ đúng từng giá trị là có chủ ý:
// mục tiêu của lần chuyển này là bỏ CDN mà giao diện không xê dịch một pixel.
//
// Vì sao bỏ CDN: bản Play CDN tải ~400KB JS rồi mới biên dịch CSS ngay trên máy
// khách, nên trang chớp một nhịp không định dạng trước khi vào nếp; và nếu
// cdn.tailwindcss.com chậm hoặc bị chặn (hay gặp với khách ở Trung Quốc - trong
// khi trang này có sẵn bản 中文) thì toàn trang mất sạch giao diện.

export default {
  // Quét cả src/data: các bộ bài giữ sẵn chuỗi class trong dữ liệu
  // (cardBackBg, bgGradient, border...), bỏ sót là mất nền lá bài.
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: '#0b0818'
      },
      fontFamily: {
        serif: ['Philosopher', 'Cinzel', 'serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif']
      }
    },
    // Thang chữ phóng to so với mặc định của Tailwind cho dễ đọc trên
    // điện thoại và laptop. Ghi đè cả thang (không phải extend) để mọi
    // class text-* có sẵn trong code tự động lớn lên.
    fontSize: {
      '2xs':  ['0.8125rem', { lineHeight: '1.15rem' }],  // 13px - nhãn nhỏ nhất
      'xs':   ['0.875rem',  { lineHeight: '1.25rem' }],  // 14px (mặc định 12)
      'sm':   ['0.9375rem', { lineHeight: '1.45rem' }],  // 15px (mặc định 14)
      'base': ['1.0625rem', { lineHeight: '1.7rem'  }],  // 17px (mặc định 16)
      'lg':   ['1.1875rem', { lineHeight: '1.8rem'  }],  // 19px (mặc định 18)
      'xl':   ['1.375rem',  { lineHeight: '1.9rem'  }],  // 22px (mặc định 20)
      '2xl':  ['1.625rem',  { lineHeight: '2.1rem'  }],  // 26px (mặc định 24)
      '3xl':  ['2rem',      { lineHeight: '2.4rem'  }],  // 32px (mặc định 30)
      '4xl':  ['2.5rem',    { lineHeight: '2.9rem'  }],  // 40px (mặc định 36)
      '5xl':  ['3.25rem',   { lineHeight: '1.1'     }],
      '6xl':  ['4rem',      { lineHeight: '1.05'    }],
      '7xl':  ['4.75rem',   { lineHeight: '1'       }]
    }
  },
  plugins: []
};
