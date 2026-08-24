// English rendering of the five-aspect reading for all 78 cards.
//
// Split one file per suit, mirroring the Vietnamese source data next door
// (majorArcana.js, wands.js, cups.js, swords.js, pentacles.js). A suit can then
// be translated and reviewed on its own without touching the others.
//
// Anything absent from these tables falls back to the Vietnamese text, so a
// half-finished suit degrades one card at a time instead of blanking the page
// (see ../cardText.js). Run "npm run check" to print how much is still missing.

import { EN_MAJOR } from './en/major.js';
import { EN_WANDS } from './en/wands.js';
import { EN_CUPS } from './en/cups.js';
import { EN_SWORDS } from './en/swords.js';
import { EN_PENTACLES } from './en/pentacles.js';

export const TAROT_TEXT_EN = {
  ...EN_MAJOR,
  ...EN_WANDS,
  ...EN_CUPS,
  ...EN_SWORDS,
  ...EN_PENTACLES
};
