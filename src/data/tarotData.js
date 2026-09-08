// Bộ bài 78 lá Rider-Waite.
//
// Kiểu trải bài và các bộ bài nằm ở tarotSpreads.js: chúng không cần dữ liệu
// lá bài, nên để chung ở đây thì mọi nơi chỉ muốn danh sách kiểu trải bài cũng
// bị kéo theo cả bộ bài.

import { MAJOR_ARCANA } from './tarot/majorArcana.js';
import { WANDS } from './tarot/wands.js';
import { CUPS } from './tarot/cups.js';
import { SWORDS } from './tarot/swords.js';
import { PENTACLES } from './tarot/pentacles.js';

export const TAROT_DECK = [
  ...MAJOR_ARCANA,
  ...WANDS,
  ...CUPS,
  ...SWORDS,
  ...PENTACLES
];

/* Xác suất một lá rơi vào thế ngược.
 *
 * Xáo bài thật thì tỉ lệ này quanh 50%. Ở đây để 40%: vẫn đủ để bài ngược là
 * chuyện thường gặp chứ không phải điềm dữ hiếm hoi, nhưng phần lớn phiên vẫn
 * nghiêng về bài xuôi.
 *
 * Có ĐÚNG MỘT chỗ định nghĩa con số này, và cả hai đường rút bài (rút từng lá
 * trong CardDeck lẫn rút tự động ở đây) đều phải đọc từ đây. Trước kia mỗi bên
 * tự viết 0.2 nên sửa một chỗ là hai nút cho ra hai tỉ lệ khác nhau. */
export const REVERSED_CHANCE = 0.4;

export const rollReversed = () => Math.random() < REVERSED_CHANCE;

/* Rút ngẫu nhiên `count` lá khác nhau.
 *
 * `exclude` là những lá người xem đã lật trước đó trong cùng phiên. Trước đây
 * hàm này luôn rút từ nguyên bộ 78 lá, nên ai rút tay vài lá rồi mới bấm "Rút
 * tự động" sẽ nhận thêm đủ số lá nữa lấy từ cả bộ - vừa dôi ra so với kiểu
 * trải bài, vừa có khả năng trùng đúng lá vừa lật.
 *
 * Trả về ít hơn `count` nếu bộ bài không còn đủ lá, chứ không lặp lại lá nào.
 */
export const getRandomDeckDraw = (count = 5, exclude = []) => {
  const taken = new Set(exclude.map(c => c.id));
  const deckCopy = TAROT_DECK.filter(c => !taken.has(c.id));
  const drawn = [];
  for (let i = 0; i < count; i++) {
    if (deckCopy.length === 0) break;
    const randomIndex = Math.floor(Math.random() * deckCopy.length);
    const card = deckCopy.splice(randomIndex, 1)[0];
    drawn.push({
      ...card,
      isReversed: rollReversed()
    });
  }
  return drawn;
};
