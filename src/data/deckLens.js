// Lăng kính của từng bộ bài.
//
// Trước đây chọn bộ bài chỉ đổi màu nền và mặt lưng lá: sáu bộ cho ra bản giải
// giống hệt nhau đến từng byte, trong khi lời mô tả lại hứa những thứ như
// "thông điệp thức tỉnh" hay "mắt thần Horus". Khách chọn xong không nhận được
// gì khác ngoài một tông màu khác.
//
// Bảng này làm cho lựa chọn đó có trọng lượng thật. Không phải bằng cách viết
// lại 78 lá cho từng bộ - như vậy là 5.616 đoạn và không ai duy trì nổi - mà
// bằng cách cho mỗi bộ một CÁCH ĐỌC riêng trên cùng những lá đó. Đấy cũng là
// cách người xem bài thật làm việc: cùng một lá, người hỏi "nên làm gì bây
// giờ" và người hỏi "việc này để lại gì sau một năm" sẽ đọc ra hai điều khác
// nhau, mà không ai sai cả.
//
// Mỗi bộ có hai câu:
//   frame      - đặt ở cuối đoạn mở đầu, nói rõ bộ này đọc theo hướng nào
//   adviceLead - đặt ở đầu phần "vậy nên làm gì", uốn phần hành động theo hướng đó
//
// Bộ nào không có trong bảng (hoặc không truyền bộ bài) thì bản giải chạy y như
// cũ, không thêm gì. Nhờ vậy bản ghi nhật ký cũ và mọi nơi gọi hàm mà chưa biết
// tới bộ bài đều không vỡ.

export const DECK_LENS = {

  cosmic_advice: {
    vi: {
      frame: 'Bộ này đọc theo hướng hành động: mỗi lá đều bị hỏi cùng một câu - việc này đòi bạn bước nào tiếp theo.',
      adviceLead: 'Bộ Lời Khuyên Vũ Trụ đặt việc cần làm lên trước, nên hãy đọc phần này trước phần còn lại.'
    },
    en: {
      frame: 'This deck reads for action: every card is asked the same question - what step does this ask of you next.',
      adviceLead: 'The Cosmic Advice deck puts the doing first, so read this part before the rest.'
    },
    zh: {
      frame: '这副牌偏向行动：每一张都被问同一个问题——这件事要你迈出哪一步。',
      adviceLead: '宇宙建言这副牌把「该做什么」摆在最前，所以先读这一段。'
    }
  },

  cosmic_gold: {
    vi: {
      frame: 'Bộ này đọc theo lối kinh điển: đủ các mặt, không nghiêng hẳn về đâu, để bạn tự thấy trọng tâm.',
      adviceLead: 'Bộ Vũ Trụ Hoàng Kim không thúc bạn làm gì gấp. Đọc hết đã, rồi hẵng chọn.'
    },
    en: {
      frame: 'This deck reads the classic way: every side covered, nothing weighted, so you find the centre yourself.',
      adviceLead: 'The Cosmic Gold deck does not rush you. Read it all, then choose.'
    },
    zh: {
      frame: '这副牌按经典的读法：各个面向都照顾到，不偏重哪一边，让你自己找到重心。',
      adviceLead: '黄金宇宙这副牌不催你。整段读完，再做选择。'
    }
  },

  lunar_nebula: {
    vi: {
      frame: 'Bộ này đọc theo nhịp: chuyện đang ở đoạn dâng lên hay đoạn lắng xuống, và điều đó quyết định nên đi hay nên đợi.',
      adviceLead: 'Bộ Trăng & Tinh Vân hay nhắc một chuyện: đúng việc mà sai lúc thì vẫn hỏng.'
    },
    en: {
      frame: 'This deck reads for timing: whether the tide is rising or falling, which decides whether to move or to wait.',
      adviceLead: 'The Lunar deck keeps saying one thing: the right move at the wrong hour still fails.'
    },
    zh: {
      frame: '这副牌看的是节奏：事情正在涨还是正在落，这决定了该走还是该等。',
      adviceLead: '月相这副牌一直在说同一件事：对的事赶上错的时辰，照样办不成。'
    }
  },

  mystic_botanical: {
    vi: {
      frame: 'Bộ này đọc như chăm một khu vườn: cái gì đang cần tưới, cái gì đã đến lúc cắt bỏ.',
      adviceLead: 'Bộ Phù Thủy & Thảo Mộc chia việc ra làm hai: thứ nên nuôi, và thứ nên tỉa.'
    },
    en: {
      frame: 'This deck reads like tending a garden: what needs watering, and what has reached the point of being cut back.',
      adviceLead: 'The Botanical deck splits the work in two: what to feed, and what to prune.'
    },
    zh: {
      frame: '这副牌像照料一座园子：什么正需要浇水，什么已经到了该剪掉的时候。',
      adviceLead: '草木这副牌把事情分成两堆：该养的，和该剪的。'
    }
  },

  ancient_egyptian: {
    vi: {
      frame: 'Bộ này đọc theo lối cân đo: việc bạn làm hôm nay được đặt lên cân, và cán cân đã nghiêng dần về một phía.',
      adviceLead: 'Bộ Thần Thoại Ai Cập nhìn xa hơn tuần này. Hãy hỏi việc này để lại gì sau một năm.'
    },
    en: {
      frame: 'This deck reads by weighing: what you do today goes on the scale, and the balance is already leaning.',
      adviceLead: 'The Egyptian deck looks further than this week. Ask what this leaves behind in a year.'
    },
    zh: {
      frame: '这副牌用秤来读：你今天做的事会被放上秤，而秤已经在往一边偏。',
      adviceLead: '埃及这副牌看得比这一周远。问问这件事一年之后留下什么。'
    }
  },

  solar_radiance: {
    vi: {
      frame: 'Bộ này đọc theo hướng can đảm: chỗ nào bạn đang nấp, và bước ra thì được gì.',
      adviceLead: 'Bộ Mặt Trời & Hào Quang không hỏi bạn sẵn sàng chưa. Nó hỏi bạn định đợi tới bao giờ.'
    },
    en: {
      frame: 'This deck reads for nerve: where you are hiding, and what stepping out would give you.',
      adviceLead: 'The Solar deck does not ask whether you are ready. It asks how long you plan to wait.'
    },
    zh: {
      frame: '这副牌读的是胆量：你正躲在哪里，走出来又能换到什么。',
      adviceLead: '烈日这副牌不问你准备好了没有。它问你打算等到什么时候。'
    }
  }
};

/* Lấy lăng kính của một bộ. Không có bộ, hoặc bộ lạ, thì trả về null và bản
   giải giữ nguyên như khi chưa có tính năng này. */
export const deckLens = (deckId, lang = 'vi') => {
  const entry = DECK_LENS[deckId];
  if (!entry) return null;
  return entry[lang] || entry.vi;
};
