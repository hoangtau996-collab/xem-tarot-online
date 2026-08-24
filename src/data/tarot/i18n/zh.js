// 78 张牌五大面向解读的简体中文版本。
//
// 按套牌分文件，与旁边的越南语原始数据一一对应（majorArcana.js、wands.js、
// cups.js、swords.js、pentacles.js）。这样每一套都可以单独翻译、单独校对，
// 不必动到其他套牌。
//
// 表中缺少的条目会回退到越南语原文，所以某一套只翻了一半时，是一张一张地
// 退回去，而不是整页空白（见 ../cardText.js）。运行 "npm run check" 可以
// 看到还差多少。

import { ZH_MAJOR } from './zh/major.js';
import { ZH_WANDS } from './zh/wands.js';
import { ZH_CUPS } from './zh/cups.js';
import { ZH_SWORDS } from './zh/swords.js';
import { ZH_PENTACLES } from './zh/pentacles.js';

export const TAROT_TEXT_ZH = {
  ...ZH_MAJOR,
  ...ZH_WANDS,
  ...ZH_CUPS,
  ...ZH_SWORDS,
  ...ZH_PENTACLES
};
