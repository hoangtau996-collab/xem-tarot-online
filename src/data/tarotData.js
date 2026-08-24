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

// Helper to draw random unique cards
export const getRandomDeckDraw = (count = 5) => {
  const deckCopy = [...TAROT_DECK];
  const drawn = [];
  for (let i = 0; i < count; i++) {
    if (deckCopy.length === 0) break;
    const randomIndex = Math.floor(Math.random() * deckCopy.length);
    const card = deckCopy.splice(randomIndex, 1)[0];
    drawn.push({
      ...card,
      isReversed: Math.random() < 0.2
    });
  }
  return drawn;
};
