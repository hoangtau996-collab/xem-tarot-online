// Dữ liệu Huyền Học phương Đông + cung hoàng đạo phương Tây.
//
// Mọi bảng đều để chuỗi ba ngôn ngữ dạng { vi, en, zh } ngay tại chỗ, nên engine
// chỉ việc trả về object và component chọn ngôn ngữ ở lớp hiển thị.

/* ---------------------------------------------------------------- Ngũ hành */

export const ELEMENTS = {
  Kim: {
    key: 'Kim',
    name: { vi: 'Kim', en: 'Metal', zh: '金' },
    icon: '⚔️',
    color: '#e2e8f0',
    traits: {
      vi: 'Sắc bén, có nguyên tắc, coi trọng danh dự và sự rõ ràng. Bạn thuộc kiểu nói là làm, quyết là dứt - chỉ là khi ai đó chạm vào nguyên tắc của mình thì bạn cứng lại rất nhanh.',
      en: 'Sharp, principled, protective of honour and clarity. Metal people are decisive and true to their word, but can turn rigid when their principles are touched.',
      zh: '锐利、有原则，重名誉与分明。金命之人果断守信，但原则被触碰时容易变得僵硬。'
    },
    luckyColors: { vi: 'Trắng, ánh kim, vàng đồng, nâu đất', en: 'White, metallic, bronze, earth brown', zh: '白色、金属色、古铜、土棕' },
    avoidColors: { vi: 'Đỏ, hồng cánh sen, tím đậm (Hoả khắc Kim)', en: 'Red, magenta, deep purple (Fire melts Metal)', zh: '红、洋红、深紫（火克金）' },
    gems: { vi: 'Thạch anh trắng, kim cương, ngọc trai, đá mặt trăng', en: 'Clear quartz, diamond, pearl, moonstone', zh: '白水晶、钻石、珍珠、月光石' },
    direction: { vi: 'Tây, Tây Bắc', en: 'West, Northwest', zh: '西、西北' }
  },
  'Mộc': {
    key: 'Mộc',
    name: { vi: 'Mộc', en: 'Wood', zh: '木' },
    icon: '🌳',
    color: '#4ade80',
    traits: {
      vi: 'Vươn lên, nhân hậu, lúc nào cũng muốn học thêm và lớn thêm. Bạn rộng lượng và nhiều ý tưởng, chỉ là hay ôm cùng lúc nhiều hướng nên sức bị chia mỏng.',
      en: 'Upward-reaching, kind, eager to learn and grow. Wood people are generous and full of ideas, but tend to spread across too many directions at once.',
      zh: '向上生长、仁厚，好学也好成长。木命之人宽厚多点子，却常同时揽下太多方向。'
    },
    luckyColors: { vi: 'Xanh lá, xanh ngọc, đen, xanh nước biển', en: 'Green, jade, black, navy blue', zh: '绿色、翡翠、黑色、深蓝' },
    avoidColors: { vi: 'Trắng, ánh kim, xám bạc (Kim khắc Mộc)', en: 'White, metallic, silver grey (Metal cuts Wood)', zh: '白色、金属色、银灰（金克木）' },
    gems: { vi: 'Ngọc bích, thạch anh xanh, aventurine, malachite', en: 'Jade, green quartz, aventurine, malachite', zh: '翡翠、绿水晶、东陵玉、孔雀石' },
    direction: { vi: 'Đông, Đông Nam', en: 'East, Southeast', zh: '东、东南' }
  },
  'Thuỷ': {
    key: 'Thuỷ',
    name: { vi: 'Thuỷ', en: 'Water', zh: '水' },
    icon: '🌊',
    color: '#38bdf8',
    traits: {
      vi: 'Mềm mại, thông minh, đặt vào đâu cũng thích nghi được. Bạn giao tiếp khéo và nhìn được xa, chỉ là đôi khi thiếu dứt khoát và hay đổi ý vào phút chót.',
      en: 'Fluid, intelligent, highly adaptable. Water people communicate skilfully and see far ahead, but can lack decisiveness and change their mind often.',
      zh: '柔软、聪慧、极善适应。水命之人善沟通、看得远，却有时不够果断、容易改主意。'
    },
    luckyColors: { vi: 'Đen, xanh nước biển, trắng, ánh kim', en: 'Black, navy blue, white, metallic', zh: '黑色、深蓝、白色、金属色' },
    avoidColors: { vi: 'Vàng đất, nâu, be (Thổ khắc Thuỷ)', en: 'Earth yellow, brown, beige (Earth dams Water)', zh: '土黄、棕色、米色（土克水）' },
    gems: { vi: 'Aquamarine, sapphire xanh, obsidian, thạch anh khói', en: 'Aquamarine, blue sapphire, obsidian, smoky quartz', zh: '海蓝宝、蓝宝石、黑曜石、茶晶' },
    direction: { vi: 'Bắc', en: 'North', zh: '北' }
  },
  'Hoả': {
    key: 'Hoả',
    name: { vi: 'Hoả', en: 'Fire', zh: '火' },
    icon: '🔥',
    color: '#f87171',
    traits: {
      vi: 'Nhiệt huyết, thẳng thắn, ở gần bạn là người ta thấy có lửa. Bạn truyền cảm hứng rất giỏi, chỉ là nóng vội, dễ bùng lên rồi cũng tắt nhanh.',
      en: 'Passionate, direct, contagious in energy. Fire people inspire easily but move too fast and can flare up then burn out.',
      zh: '热情、直率、感染力强。火命之人极能鼓舞人心，却性急，容易骤起骤灭。'
    },
    luckyColors: { vi: 'Đỏ, cam, hồng, tím, xanh lá', en: 'Red, orange, pink, purple, green', zh: '红、橙、粉、紫、绿' },
    avoidColors: { vi: 'Đen, xanh nước biển đậm (Thuỷ khắc Hoả)', en: 'Black, deep navy (Water quenches Fire)', zh: '黑色、深蓝（水克火）' },
    gems: { vi: 'Ruby, garnet, thạch anh hồng, carnelian', en: 'Ruby, garnet, rose quartz, carnelian', zh: '红宝石、石榴石、粉晶、红玛瑙' },
    direction: { vi: 'Nam', en: 'South', zh: '南' }
  },
  'Thổ': {
    key: 'Thổ',
    name: { vi: 'Thổ', en: 'Earth', zh: '土' },
    icon: '⛰️',
    color: '#fbbf24',
    traits: {
      vi: 'Vững chãi, thật thà, ai cũng thấy yên tâm khi dựa vào bạn. Bạn là chỗ dựa của cả nhà và của tập thể, chỉ là chậm đổi mới và hay ngại rủi ro.',
      en: 'Steady, honest, dependable. Earth people are the anchor of a family or team, but they modernise slowly and shy away from risk.',
      zh: '稳重、诚实、可靠。土命之人是家庭与团队的依靠，却更新缓慢、回避风险。'
    },
    luckyColors: { vi: 'Vàng đất, nâu, be, đỏ, cam', en: 'Earth yellow, brown, beige, red, orange', zh: '土黄、棕色、米色、红、橙' },
    avoidColors: { vi: 'Xanh lá, xanh ngọc (Mộc khắc Thổ)', en: 'Green, jade green (Wood breaks Earth)', zh: '绿色、翡翠绿（木克土）' },
    gems: { vi: 'Thạch anh vàng (citrine), hổ phách, mắt hổ, thạch anh tóc vàng', en: 'Citrine, amber, tiger eye, golden rutilated quartz', zh: '黄水晶、琥珀、虎眼石、金发晶' },
    direction: { vi: 'Trung tâm, Đông Bắc, Tây Nam', en: 'Centre, Northeast, Southwest', zh: '中央、东北、西南' }
  }
};

// Tương sinh: Kim sinh Thuỷ, Thuỷ sinh Mộc, Mộc sinh Hoả, Hoả sinh Thổ, Thổ sinh Kim
export const ELEMENT_GENERATES = { Kim: 'Thuỷ', 'Thuỷ': 'Mộc', 'Mộc': 'Hoả', 'Hoả': 'Thổ', 'Thổ': 'Kim' };
// Tương khắc: Kim khắc Mộc, Mộc khắc Thổ, Thổ khắc Thuỷ, Thuỷ khắc Hoả, Hoả khắc Kim
export const ELEMENT_CONTROLS = { Kim: 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thuỷ', 'Thuỷ': 'Hoả', 'Hoả': 'Kim' };

/* ----------------------------------------------------- Thiên Can & Địa Chi */

export const HEAVENLY_STEMS = [
  { vi: 'Giáp', en: 'Jia', zh: '甲', element: 'Mộc', polarity: 'Dương' },
  { vi: 'Ất', en: 'Yi', zh: '乙', element: 'Mộc', polarity: 'Âm' },
  { vi: 'Bính', en: 'Bing', zh: '丙', element: 'Hoả', polarity: 'Dương' },
  { vi: 'Đinh', en: 'Ding', zh: '丁', element: 'Hoả', polarity: 'Âm' },
  { vi: 'Mậu', en: 'Wu', zh: '戊', element: 'Thổ', polarity: 'Dương' },
  { vi: 'Kỷ', en: 'Ji', zh: '己', element: 'Thổ', polarity: 'Âm' },
  { vi: 'Canh', en: 'Geng', zh: '庚', element: 'Kim', polarity: 'Dương' },
  { vi: 'Tân', en: 'Xin', zh: '辛', element: 'Kim', polarity: 'Âm' },
  { vi: 'Nhâm', en: 'Ren', zh: '壬', element: 'Thuỷ', polarity: 'Dương' },
  { vi: 'Quý', en: 'Gui', zh: '癸', element: 'Thuỷ', polarity: 'Âm' }
];

export const EARTHLY_BRANCHES = [
  {
    vi: 'Tý', en: 'Zi', zh: '子', icon: '🐭', element: 'Thuỷ', hours: '23:00 - 01:00',
    animal: { vi: 'Chuột', en: 'Rat', zh: '鼠' },
    traits: {
      vi: 'Nhanh nhạy, tháo vát, xoay xở giỏi và biết tích luỹ. Chỗ đáng để ý là bạn hay tính quá kỹ, tính tới lúc cơ hội lớn đã đi mất.',
      en: 'Quick-witted, resourceful, skilled at manoeuvring and saving. The caution is over-calculating until big chances slip by.',
      zh: '机敏、能干，善周旋与积累。要留意的是算得太细而错过大机会。'
    }
  },
  {
    vi: 'Sửu', en: 'Chou', zh: '丑', icon: '🐮', element: 'Thổ', hours: '01:00 - 03:00',
    animal: { vi: 'Trâu', en: 'Ox', zh: '牛' },
    traits: {
      vi: 'Cần cù, nhẫn nại, việc gì đã nhận thì làm tới nơi tới chốn. Chỉ là bạn khá bảo thủ, và hầu như không bao giờ chịu nhờ ai.',
      en: 'Diligent and patient, finishing whatever is started. The weakness is stubbornness and rarely asking for help.',
      zh: '勤勉、有耐性，做事有始有终。弱点是保守，也很少求助于人。'
    }
  },
  {
    vi: 'Dần', en: 'Yin', zh: '寅', icon: '🐯', element: 'Mộc', hours: '03:00 - 05:00',
    animal: { vi: 'Hổ', en: 'Tiger', zh: '虎' },
    traits: {
      vi: 'Có dũng khí và tự tin, dám xông vào chỗ người khác chùn chân. Điều nên tiết chế là cơn nóng và thói quen tự quyết một mình.',
      en: 'Courageous and confident, charging in where others hesitate. Needs to temper a hot temper and the habit of deciding alone.',
      zh: '有胆识、自信，别人犹豫时敢冲。需收敛急躁与独断的习惯。'
    }
  },
  {
    vi: 'Mão', en: 'Mao', zh: '卯', icon: '🐱', element: 'Mộc', hours: '05:00 - 07:00',
    animal: { vi: 'Mèo', en: 'Cat', zh: '兔' },
    traits: {
      vi: 'Ôn hoà, tinh tế, ứng xử khéo và có mắt thẩm mỹ. Chỗ yếu là ngại va chạm, nên hay để vấn đề trôi đi thay vì gỡ nó.',
      en: 'Gentle, refined, socially skilful with good taste. The weak spot is avoiding confrontation and therefore dodging problems.',
      zh: '温和、细腻，处事圆融且有品味。弱点是怕冲突，因而回避问题。'
    }
  },
  {
    vi: 'Thìn', en: 'Chen', zh: '辰', icon: '🐲', element: 'Thổ', hours: '07:00 - 09:00',
    animal: { vi: 'Rồng', en: 'Dragon', zh: '龙' },
    traits: {
      vi: 'Khí chất lớn, nhiều hoài bão, và thường có quý nhân đỡ đúng lúc. Chỉ cần giữ mình đừng kiêu, và đừng ôm việc quá tầm tay.',
      en: 'Large presence and ambition, often helped by benefactors. Must avoid pride and taking on more than can be carried.',
      zh: '气场大、抱负多，常得贵人相助。要避免自傲与揽下超出能力的事。'
    }
  },
  {
    vi: 'Tỵ', en: 'Si', zh: '巳', icon: '🐍', element: 'Hoả', hours: '09:00 - 11:00',
    animal: { vi: 'Rắn', en: 'Snake', zh: '蛇' },
    traits: {
      vi: 'Sâu sắc, kín đáo, trực giác mạnh và nhìn người rất chuẩn. Chỗ thiệt cho bạn là hay giữ hết trong lòng, và tin được ai đó thì thật khó.',
      en: 'Deep, private, strongly intuitive and a good judge of character. The weakness is bottling things up and struggling to trust.',
      zh: '深沉、内敛，直觉强且善识人。弱点是心事不外露、难以信人。'
    }
  },
  {
    vi: 'Ngọ', en: 'Wu', zh: '午', icon: '🐴', element: 'Hoả', hours: '11:00 - 13:00',
    animal: { vi: 'Ngựa', en: 'Horse', zh: '马' },
    traits: {
      vi: 'Phóng khoáng, nhiệt tình, cần tự do như cần không khí và ghét bị bó buộc. Thứ bạn còn phải rèn là sự kiên trì để đi hết đường dài.',
      en: 'Open-hearted, enthusiastic, freedom-loving and allergic to constraint. Needs to build persistence to finish long roads.',
      zh: '豪爽、热情，爱自由、厌拘束。需练耐性，才能走完长路。'
    }
  },
  {
    vi: 'Mùi', en: 'Wei', zh: '未', icon: '🐐', element: 'Thổ', hours: '13:00 - 15:00',
    animal: { vi: 'Dê', en: 'Goat', zh: '羊' },
    traits: {
      vi: 'Hiền hoà, giàu tình cảm, có khiếu nghệ thuật và biết chăm người khác. Chỗ yếu là hay lo nghĩ, và tới lúc phải quyết thì chần chừ.',
      en: 'Gentle and warm-hearted, artistic and caring toward others. The weak spot is worrying and hesitating.',
      zh: '温和、重感情，有艺术天分也懂照顾人。弱点是多虑、不够果断。'
    }
  },
  {
    vi: 'Thân', en: 'Shen', zh: '申', icon: '🐵', element: 'Kim', hours: '15:00 - 17:00',
    animal: { vi: 'Khỉ', en: 'Monkey', zh: '猴' },
    traits: {
      vi: 'Linh hoạt, thông minh, xoay chuyển tình thế nhanh hơn ai hết. Chỉ cần tránh việc đổi ý liên tục rồi để lại một loạt chuyện dở dang.',
      en: 'Agile and clever, turning situations around fast. Must avoid restlessness and leaving many things unfinished.',
      zh: '灵活聪明，扭转局面极快。要避免善变与半途而废。'
    }
  },
  {
    vi: 'Dậu', en: 'You', zh: '酉', icon: '🐔', element: 'Kim', hours: '17:00 - 19:00',
    animal: { vi: 'Gà', en: 'Rooster', zh: '鸡' },
    traits: {
      vi: 'Chỉn chu, thẳng thắn, làm việc có kỷ luật và để ý tới từng chi tiết. Chỗ khiến người khác ngại là bạn khó tính và hay chê thẳng.',
      en: 'Meticulous and frank, disciplined and detail-focused. The weakness is being hard to please and bluntly critical.',
      zh: '一丝不苟、直率，做事有纪律且重细节。弱点是挑剔、批评直接。'
    }
  },
  {
    vi: 'Tuất', en: 'Xu', zh: '戌', icon: '🐶', element: 'Thổ', hours: '19:00 - 21:00',
    animal: { vi: 'Chó', en: 'Dog', zh: '狗' },
    traits: {
      vi: 'Trung thành, chính trực, sẵn sàng đứng ra che cho người mình thương. Điều nên bớt là tính đa nghi và cái tật lo xa quá mức.',
      en: 'Loyal and upright, ready to defend the people you love. Needs less suspicion and less far-reaching worry.',
      zh: '忠诚、正直，愿意护着所爱之人。需少些多疑与过度远虑。'
    }
  },
  {
    vi: 'Hợi', en: 'Hai', zh: '亥', icon: '🐷', element: 'Thuỷ', hours: '21:00 - 23:00',
    animal: { vi: 'Lợn', en: 'Pig', zh: '猪' },
    traits: {
      vi: 'Hào phóng, thật thà, sống có hậu nên lúc khó thường có người giúp lại. Chỗ yếu là cả tin, và hay nuông chiều chính mình.',
      en: 'Generous and honest, and because of that often helped in return. The weak spot is being too trusting and self-indulgent.',
      zh: '慷慨、诚实，因心厚而常获回报。弱点是轻信与放纵自己。'
    }
  }
];

/* Nạp âm 60 hoa giáp - mỗi mục ứng với 2 năm liên tiếp, tính từ Giáp Tý.
   Chỉ số nạp âm = floor(chỉ số hoa giáp / 2). */
export const NAP_AM = [
  { vi: 'Hải Trung Kim', en: 'Gold in the Sea', zh: '海中金', element: 'Kim', meaning: { vi: 'Vàng nằm dưới đáy biển: thứ quý bạn vốn có sẵn, chỉ là nó cần thời gian và đúng duyên mới lộ ra.', en: 'Gold at the bottom of the sea - great potential that needs time and the right moment to surface.', zh: '海底之金——潜力极大，需时机与缘分方能显现。' } },
  { vi: 'Lô Trung Hoả', en: 'Fire in the Furnace', zh: '炉中火', element: 'Hoả', meaning: { vi: 'Lửa trong lò: sức của bạn rất tập trung, nhưng phải có khuôn khổ thì nó mới cháy đúng chỗ.', en: 'Fire in a furnace - concentrated power that needs structure to be useful.', zh: '炉中之火——力量集中，需有框架方能发挥。' } },
  { vi: 'Đại Lâm Mộc', en: 'Great Forest Wood', zh: '大林木', element: 'Mộc', meaning: { vi: 'Cây rừng lớn: bạn độ lượng và biết che chở, càng nhiều tuổi thì tiếng nói càng có sức nặng.', en: 'Great forest timber - generous and sheltering, gaining standing with age.', zh: '大林之木——宽厚庇荫，年岁愈长愈有威望。' } },
  { vi: 'Lộ Bàng Thổ', en: 'Roadside Earth', zh: '路旁土', element: 'Thổ', meaning: { vi: 'Đất ven đường: bạn chịu thương chịu khó, gặp gỡ nhiều người, và thường có duyên với những nghề phục vụ người khác.', en: 'Roadside earth - hard-working, meeting many people, suited to service trades.', zh: '路旁之土——吃苦耐劳，人来人往，与服务行业有缘。' } },
  { vi: 'Kiếm Phong Kim', en: 'Sword Edge Metal', zh: '剑锋金', element: 'Kim', meaning: { vi: 'Vàng ở đầu lưỡi kiếm: bạn sắc và quyết liệt, hợp với những nghề đòi hỏi sự dứt khoát.', en: 'Metal of the sword edge - sharp and decisive, suited to work that demands resolve.', zh: '剑锋之金——锐利果决，宜从事需要决断之业。' } },
  { vi: 'Sơn Đầu Hoả', en: 'Fire on the Mountain', zh: '山头火', element: 'Hoả', meaning: { vi: 'Lửa trên đỉnh núi: bạn sáng từ xa đã thấy, dễ nổi bật - và cũng vì thế mà dễ bị soi.', en: 'Fire on a mountaintop - visible from afar, easy to stand out and equally easy to be scrutinised.', zh: '山头之火——远望可见，容易出众，也容易被审视。' } },
  { vi: 'Giản Hạ Thuỷ', en: 'Water in the Ravine', zh: '涧下水', element: 'Thuỷ', meaning: { vi: 'Nước khe suối: trong trẻo và bền bỉ, bạn hay phải đi đường vòng nhưng rồi vẫn tới nơi.', en: 'Water in a ravine - clear and persistent, taking the winding way but always arriving.', zh: '涧下之水——清澈坚韧，路虽曲折终能抵达。' } },
  { vi: 'Thành Đầu Thổ', en: 'City Wall Earth', zh: '城头土', element: 'Thổ', meaning: { vi: 'Đất đắp đầu thành: bạn vững chãi và có bản năng bảo vệ, hợp với những vai phải gánh vác cho người khác.', en: 'Earth of the city wall - solid and protective, suited to roles that carry others.', zh: '城头之土——稳固护卫，宜担当之责。' } },
  { vi: 'Bạch Lạp Kim', en: 'Candlestick Metal', zh: '白蜡金', element: 'Kim', meaning: { vi: 'Vàng của sáp nến: bạn mềm và tinh tế, nên cần một môi trường ổn định thì mới giữ được dáng của mình.', en: 'Candle-wax metal - soft and refined, needing a stable environment to keep its shape.', zh: '白蜡之金——柔软细致，需稳定环境方能守形。' } },
  { vi: 'Dương Liễu Mộc', en: 'Willow Wood', zh: '杨柳木', element: 'Mộc', meaning: { vi: 'Gỗ cây dương liễu: bạn uyển chuyển và thích nghi giỏi, gió lớn tới đâu cũng chỉ cong chứ không gãy.', en: 'Willow wood - supple and adaptable, bending in strong wind without breaking.', zh: '杨柳之木——柔韧善应，大风亦不折。' } },
  { vi: 'Tuyền Trung Thuỷ', en: 'Spring Water', zh: '泉中水', element: 'Thuỷ', meaning: { vi: 'Nước trong lòng suối: tinh khiết và nuôi dưỡng, bạn hợp với những nghề chăm sóc và chữa lành.', en: 'Water of the spring - pure and nourishing, suited to caring and healing work.', zh: '泉中之水——清纯滋养，宜照护与疗愈之业。' } },
  { vi: 'Ốc Thượng Thổ', en: 'Rooftop Earth', zh: '屋上土', element: 'Thổ', meaning: { vi: 'Đất trên nóc nhà: bạn che cho cả gia đình, trách nhiệm nặng thật, nhưng đổi lại là sự kính trọng.', en: 'Earth on the rooftop - shelters the whole family, a heavy duty that earns respect.', zh: '屋上之土——庇护全家，责任虽重却受敬重。' } },
  { vi: 'Tích Lịch Hoả', en: 'Thunderbolt Fire', zh: '霹雳火', element: 'Hoả', meaning: { vi: 'Lửa sấm sét: bạn bùng lên rất mạnh và tạo được bước ngoặt lớn, chỉ là cần học cách kiềm lại.', en: 'Thunderbolt fire - erupts powerfully and creates turning points, but must learn restraint.', zh: '霹雳之火——爆发力强，能造转折，需学克制。' } },
  { vi: 'Tùng Bách Mộc', en: 'Pine and Cypress Wood', zh: '松柏木', element: 'Mộc', meaning: { vi: 'Gỗ tùng bách: bạn kiên cường, và giữ được khí tiết của mình qua cả những mùa đông của đời người.', en: 'Pine and cypress - resilient, keeping integrity through life winters.', zh: '松柏之木——坚毅，历人生寒冬而不失气节。' } },
  { vi: 'Trường Lưu Thuỷ', en: 'Long Flowing Water', zh: '长流水', element: 'Thuỷ', meaning: { vi: 'Nước con sông dài: bạn đi xa và gặp nhiều, hợp với công việc trải rộng nhiều vùng hoặc ra nước ngoài.', en: 'Long-flowing river - travels far and meets much, suited to cross-regional or international work.', zh: '长流之水——行远见广，宜跨地域或国际事务。' } },
  { vi: 'Sa Trung Kim', en: 'Gold in the Sand', zh: '沙中金', element: 'Kim', meaning: { vi: 'Vàng lẫn trong cát: giá trị của bạn nằm ẩn, phải qua sàng lọc gian nan rồi mới sáng lên.', en: 'Gold in the sand - hidden value that only shines after hard sifting.', zh: '沙中之金——价值内藏，须经淘洗方显光华。' } },
  { vi: 'Sơn Hạ Hoả', en: 'Fire at the Foot of the Mountain', zh: '山下火', element: 'Hoả', meaning: { vi: 'Lửa dưới chân núi: ấm áp và gần gũi, bạn sưởi ấm đúng những người ở cạnh mình.', en: 'Fire at the mountain foot - warm and close, heating those nearby.', zh: '山下之火——温暖亲近，暖及身边之人。' } },
  { vi: 'Bình Địa Mộc', en: 'Plain Wood', zh: '平地木', element: 'Mộc', meaning: { vi: 'Gỗ vùng đồng bằng: bạn lớn lên đều đặn, hợp làm ăn đường dài hơn là đánh nhanh thắng nhanh.', en: 'Wood of the plains - grows steadily, better suited to the long game than the quick strike.', zh: '平地之木——稳步生长，宜长久经营而非速战速决。' } },
  { vi: 'Bích Thượng Thổ', en: 'Earth on the Wall', zh: '壁上土', element: 'Thổ', meaning: { vi: 'Đất trên vách: bạn giữ nề nếp, coi trọng gia đạo và những gì được truyền lại.', en: 'Earth on the wall - keeps order, values family and tradition.', zh: '壁上之土——守规矩，重家风与传统。' } },
  { vi: 'Kim Bạch Kim', en: 'Gilded Metal', zh: '金箔金', element: 'Kim', meaning: { vi: 'Vàng pha bạc: sang và ưa cái đẹp, bạn hợp với những nghề gắn với hình ảnh và thương hiệu.', en: 'Gilded metal - elegant and beauty-loving, suited to image and brand work.', zh: '金箔之金——华贵爱美，宜形象与品牌相关之业。' } },
  { vi: 'Phú Đăng Hoả', en: 'Lamp Fire', zh: '覆灯火', element: 'Hoả', meaning: { vi: 'Lửa ngọn đèn: bạn soi đường cho người khác, nên hợp với nghề dạy học và dẫn dắt.', en: 'Lamp fire - lights the way for others, suited to teaching and guiding.', zh: '覆灯之火——为他人照路，宜教学与引领。' } },
  { vi: 'Thiên Hà Thuỷ', en: 'Water of the Milky Way', zh: '天河水', element: 'Thuỷ', meaning: { vi: 'Nước trên trời: tầm nhìn của bạn cao và rộng, giàu lý tưởng - chỉ đôi khi hơi xa mặt đất.', en: 'Water of the heavenly river - lofty vision and idealism, sometimes a little far from the ground.', zh: '天河之水——视野高远、富理想，有时略离地。' } },
  { vi: 'Đại Trạch Thổ', en: 'Great Estate Earth', zh: '大驿土', element: 'Thổ', meaning: { vi: 'Đất nền của một ngôi nhà lớn: bạn có khả năng dựng cơ nghiệp và quy tụ được người.', en: 'Earth of the great estate - able to build an enterprise and gather people.', zh: '大驿之土——能立基业、聚人气。' } },
  { vi: 'Thoa Xuyến Kim', en: 'Ornament Metal', zh: '钗钏金', element: 'Kim', meaning: { vi: 'Vàng làm đồ trang sức: tinh tế và duyên dáng, bạn được quý mến nhờ chính sự khéo léo của mình.', en: 'Jewellery metal - refined and graceful, well-liked for its finesse.', zh: '钗钏之金——精致优雅，因巧思而受喜爱。' } },
  { vi: 'Tang Đố Mộc', en: 'Mulberry Wood', zh: '桑柘木', element: 'Mộc', meaning: { vi: 'Gỗ cây dâu: bạn nuôi người khác bằng những việc thầm lặng mà rất hữu ích.', en: 'Mulberry wood - nourishes others, working quietly but usefully.', zh: '桑柘之木——养育他人，默默而有益。' } },
  { vi: 'Đại Khê Thuỷ', en: 'Great Stream Water', zh: '大溪水', element: 'Thuỷ', meaning: { vi: 'Nước con khe lớn: bạn chảy mạnh và có sức cuốn, hợp những việc phải khai phá từ đầu.', en: 'Great stream water - strong current with pull, suited to pioneering work.', zh: '大溪之水——水势强劲有牵引力，宜开拓之事。' } },
  { vi: 'Sa Trung Thổ', en: 'Earth in the Sand', zh: '沙中土', element: 'Thổ', meaning: { vi: 'Đất lẫn trong cát: linh hoạt và chịu được biến động, bạn thích nghi rất nhanh với đổi thay.', en: 'Earth within sand - flexible, weathering turbulence and adapting well to change.', zh: '沙中之土——灵活耐变，善于顺应改变。' } },
  { vi: 'Thiên Thượng Hoả', en: 'Fire in the Sky', zh: '天上火', element: 'Hoả', meaning: { vi: 'Lửa trên trời cao: bạn toả sáng rộng và có ảnh hưởng lớn, nên càng cần giữ mình.', en: 'Fire in the sky - shines widely with real influence, but must stay grounded.', zh: '天上之火——普照四方影响甚广，须持守自身。' } },
  { vi: 'Thạch Lựu Mộc', en: 'Pomegranate Wood', zh: '石榴木', element: 'Mộc', meaning: { vi: 'Gỗ cây lựu: cây sai quả, con cháu đông vui, hậu vận của bạn thường tốt hơn tiền vận.', en: 'Pomegranate wood - fruits abundantly; family flourishes and later life tends to be good.', zh: '石榴之木——结果丰硕，子孙兴旺，晚运多佳。' } },
  { vi: 'Đại Hải Thuỷ', en: 'Great Ocean Water', zh: '大海水', element: 'Thuỷ', meaning: { vi: 'Nước biển lớn: bạn bao dung và sâu rộng, chứa được cả những điều trái ngược nhau.', en: 'Great ocean water - vast and tolerant, able to hold even contradictions.', zh: '大海之水——宽广包容，能纳矛盾于一身。' } }
];

/* ---------------------------------------------- Nhóm hợp - xung của Địa Chi */

// Chỉ số theo EARTHLY_BRANCHES (0 = Tý)
export const TAM_HOP = [
  { members: [8, 0, 4], name: { vi: 'Thân - Tý - Thìn', en: 'Monkey - Rat - Dragon', zh: '申子辰' } },
  { members: [2, 6, 10], name: { vi: 'Dần - Ngọ - Tuất', en: 'Tiger - Horse - Dog', zh: '寅午戌' } },
  { members: [5, 9, 1], name: { vi: 'Tỵ - Dậu - Sửu', en: 'Snake - Rooster - Ox', zh: '巳酉丑' } },
  { members: [11, 3, 7], name: { vi: 'Hợi - Mão - Mùi', en: 'Pig - Cat - Goat', zh: '亥卯未' } }
];

export const TU_HANH_XUNG = [
  { members: [2, 8, 5, 11], name: { vi: 'Dần - Thân - Tỵ - Hợi', en: 'Tiger - Monkey - Snake - Pig', zh: '寅申巳亥' } },
  { members: [0, 6, 3, 9], name: { vi: 'Tý - Ngọ - Mão - Dậu', en: 'Rat - Horse - Cat - Rooster', zh: '子午卯酉' } },
  { members: [4, 10, 1, 7], name: { vi: 'Thìn - Tuất - Sửu - Mùi', en: 'Dragon - Dog - Ox - Goat', zh: '辰戌丑未' } }
];

// Lục hợp: cặp đôi hợp nhất, chỉ số Địa Chi ghép đôi
export const LUC_HOP = { 0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6 };

/* ------------------------------------------------- Bát Quái & Bát Trạch */

/* lines = [hào dưới, hào giữa, hào trên], 1 = hào dương, 0 = hào âm.
   Quan hệ tám hướng của Bát Trạch được suy ra từ việc so sánh hào giữa hai
   quái (xem utils/metaphysics.js), nên không cần chép tay bảng 8x8. */
export const TRIGRAMS = {
  1: { kua: 1, key: 'Khảm', lines: [0, 1, 0], element: 'Thuỷ', group: 'East', direction: 'N', name: { vi: 'Khảm', en: 'Kan', zh: '坎' } },
  2: { kua: 2, key: 'Khôn', lines: [0, 0, 0], element: 'Thổ', group: 'West', direction: 'SW', name: { vi: 'Khôn', en: 'Kun', zh: '坤' } },
  3: { kua: 3, key: 'Chấn', lines: [1, 0, 0], element: 'Mộc', group: 'East', direction: 'E', name: { vi: 'Chấn', en: 'Zhen', zh: '震' } },
  4: { kua: 4, key: 'Tốn', lines: [0, 1, 1], element: 'Mộc', group: 'East', direction: 'SE', name: { vi: 'Tốn', en: 'Xun', zh: '巽' } },
  6: { kua: 6, key: 'Càn', lines: [1, 1, 1], element: 'Kim', group: 'West', direction: 'NW', name: { vi: 'Càn', en: 'Qian', zh: '乾' } },
  7: { kua: 7, key: 'Đoài', lines: [1, 1, 0], element: 'Kim', group: 'West', direction: 'W', name: { vi: 'Đoài', en: 'Dui', zh: '兑' } },
  8: { kua: 8, key: 'Cấn', lines: [0, 0, 1], element: 'Thổ', group: 'West', direction: 'NE', name: { vi: 'Cấn', en: 'Gen', zh: '艮' } },
  9: { kua: 9, key: 'Ly', lines: [1, 0, 1], element: 'Hoả', group: 'East', direction: 'S', name: { vi: 'Ly', en: 'Li', zh: '离' } }
};

export const DIRECTION_NAMES = {
  N: { vi: 'Bắc', en: 'North', zh: '北' },
  NE: { vi: 'Đông Bắc', en: 'Northeast', zh: '东北' },
  E: { vi: 'Đông', en: 'East', zh: '东' },
  SE: { vi: 'Đông Nam', en: 'Southeast', zh: '东南' },
  S: { vi: 'Nam', en: 'South', zh: '南' },
  SW: { vi: 'Tây Nam', en: 'Southwest', zh: '西南' },
  W: { vi: 'Tây', en: 'West', zh: '西' },
  NW: { vi: 'Tây Bắc', en: 'Northwest', zh: '西北' }
};

export const HOUSE_GROUPS = {
  East: {
    name: { vi: 'Đông Tứ Mệnh', en: 'East Group', zh: '东四命' },
    desc: {
      vi: 'Bạn thuộc nhóm Đông Tứ Mệnh (Khảm - Chấn - Tốn - Ly). Bốn hướng nền tảng của bạn là Bắc, Đông, Đông Nam và Nam.',
      en: 'You belong to the East Group (Kan - Zhen - Xun - Li). Your four base directions are North, East, Southeast and South.',
      zh: '你属东四命（坎震巽离），四个根本方位是北、东、东南、南。'
    }
  },
  West: {
    name: { vi: 'Tây Tứ Mệnh', en: 'West Group', zh: '西四命' },
    desc: {
      vi: 'Bạn thuộc nhóm Tây Tứ Mệnh (Càn - Khôn - Cấn - Đoài). Bốn hướng nền tảng của bạn là Tây, Tây Bắc, Tây Nam và Đông Bắc.',
      en: 'You belong to the West Group (Qian - Kun - Gen - Dui). Your four base directions are West, Northwest, Southwest and Northeast.',
      zh: '你属西四命（乾坤艮兑），四个根本方位是西、西北、西南、东北。'
    }
  }
};

/* Tám cung Bát Trạch. Khoá trùng với kết quả suy ra từ phép so hào. */
export const BAT_TRACH_ASPECTS = {
  sinhKhi: {
    good: true, icon: '🌱',
    name: { vi: 'Sinh Khí', en: 'Sheng Qi - Life Generating', zh: '生气' },
    desc: {
      vi: 'Hướng tốt nhất của bạn: thăng tiến, danh tiếng, tài lộc và sinh khí. Hãy để cửa chính, bàn làm việc hoặc hướng ngồi làm việc quay về phía này.',
      en: 'The best direction: promotion, reputation, wealth and vitality. Place your main door, desk or working orientation here.',
      zh: '最佳方位：升迁、名声、财富与生气。宜设大门、书桌或工作朝向于此。'
    }
  },
  thienY: {
    good: true, icon: '🌿',
    name: { vi: 'Thiên Y', en: 'Tian Yi - Heavenly Doctor', zh: '天医' },
    desc: {
      vi: 'Hướng của sức khoẻ và của quý nhân. Rất hợp để đặt giường ngủ, vì nó giúp bạn hồi phục và đỡ bệnh vặt.',
      en: 'The direction of health and helpful people. Excellent for the bed, aiding recovery and reducing illness.',
      zh: '健康与贵人之方。最宜安床，有助恢复、减少病痛。'
    }
  },
  dienNien: {
    good: true, icon: '💞',
    name: { vi: 'Diên Niên', en: 'Yan Nian - Longevity', zh: '延年' },
    desc: {
      vi: 'Hướng của tình cảm và sự hoà hợp. Tốt cho hôn nhân, cho không khí trong nhà, và cho những mối hợp tác lâu dài.',
      en: 'The direction of relationships and harmony. Good for marriage, family bonds and long-term partnerships.',
      zh: '关系与和合之方。利婚姻、家庭情感与长期合作。'
    }
  },
  phucVi: {
    good: true, icon: '🧘',
    name: { vi: 'Phục Vị', en: 'Fu Wei - Stability', zh: '伏位' },
    desc: {
      vi: 'Hướng của sự ổn định và tập trung. Hợp cho việc học, cho thiền, và cho những kế hoạch phải nhiều năm mới xong.',
      en: 'The direction of stability and focus. Suited to study, meditation and long-range plans.',
      zh: '安稳与专注之方。宜读书、静坐与长远计划。'
    }
  },
  hoaHai: {
    good: false, icon: '⚠️',
    name: { vi: 'Hoạ Hại', en: 'Huo Hai - Mishaps', zh: '祸害' },
    desc: {
      vi: 'Hướng xấu nhẹ nhất: hay gặp trục trặc vặt, thị phi và cãi cọ. Đừng để cửa chính quay về phía này.',
      en: 'The mildest inauspicious direction: petty setbacks, gossip and arguments. Avoid facing the main door here.',
      zh: '最轻的凶方：琐碎受阻、口舌是非。忌大门朝此。'
    }
  },
  lucSat: {
    good: false, icon: '🌀',
    name: { vi: 'Lục Sát', en: 'Liu Sha - Six Killings', zh: '六煞' },
    desc: {
      vi: 'Hướng dễ sinh rắc rối về tình cảm, kiện tụng và hao tiền. Không nên đặt giường hay bàn làm việc ở đây.',
      en: 'Brings relationship trouble, litigation and financial leakage. Do not place the bed or desk here.',
      zh: '主感情纠纷、官非与破财。不宜安床或设书桌于此。'
    }
  },
  nguQuy: {
    good: false, icon: '👻',
    name: { vi: 'Ngũ Quỷ', en: 'Wu Gui - Five Ghosts', zh: '五鬼' },
    desc: {
      vi: 'Hướng của xung đột, của mất mát bất ngờ và của tiểu nhân. Nên dành làm nhà kho hoặc nhà vệ sinh để trấn bớt.',
      en: 'The direction of conflict, sudden loss and troublemakers. Best used for storage or a bathroom to suppress it.',
      zh: '冲突、意外损失与小人之方。宜作储藏或卫浴以镇之。'
    }
  },
  tuyetMenh: {
    good: false, icon: '⛔',
    name: { vi: 'Tuyệt Mệnh', en: 'Jue Ming - Total Loss', zh: '绝命' },
    desc: {
      vi: 'Hướng xấu nhất: hao sức khoẻ, hao tiền, và dễ hỏng cả những quyết định lớn. Tuyệt đối tránh đặt cửa chính và đầu giường ở đây.',
      en: 'The worst direction: drains health, finances and major decisions. Absolutely avoid for the main door and the head of the bed.',
      zh: '最凶之方：损健康、财务与重大决策。大门与床头务必避开。'
    }
  }
};

/* ------------------------------------------------ Cung hoàng đạo phương Tây */

// startMonth/startDay: ngày bắt đầu của cung (theo dương lịch, mốc phổ thông)
export const ZODIAC_SIGNS = [
  {
    key: 'capricorn', icon: '♑', element: 'Earth', start: [12, 22], end: [1, 19], ruler: { vi: 'Thổ Tinh', en: 'Saturn', zh: '土星' },
    name: { vi: 'Ma Kết', en: 'Capricorn', zh: '摩羯座' },
    traits: { vi: 'Tham vọng, kỷ luật, kiên trì leo từng bậc một. Bạn nghiêm túc với mục tiêu của mình, chỉ là đôi khi khắt khe với bản thân hơn mức cần thiết.', en: 'Ambitious, disciplined, climbing step by step. Serious about goals but sometimes harsh on yourself.', zh: '有野心、守纪律，一级一级往上爬。对目标认真，却有时苛待自己。' }
  },
  {
    key: 'aquarius', icon: '♒', element: 'Air', start: [1, 20], end: [2, 18], ruler: { vi: 'Thiên Vương Tinh', en: 'Uranus', zh: '天王星' },
    name: { vi: 'Bảo Bình', en: 'Aquarius', zh: '水瓶座' },
    traits: { vi: 'Độc lập, nghĩ khác đám đông, và quan tâm tới cái chung. Bạn ghét bị rập khuôn, nên nhiều khi trông có vẻ xa cách về mặt tình cảm.', en: 'Independent, unconventional, community-minded. Hates conformity and can seem emotionally distant.', zh: '独立、思维另类、关心群体。厌恶模式化，情感上易显疏离。' }
  },
  {
    key: 'pisces', icon: '♓', element: 'Water', start: [2, 19], end: [3, 20], ruler: { vi: 'Hải Vương Tinh', en: 'Neptune', zh: '海王星' },
    name: { vi: 'Song Ngư', en: 'Pisces', zh: '双鱼座' },
    traits: { vi: 'Giàu trực giác, hay mơ mộng, và đồng cảm rất sâu. Bạn dễ bị cuốn theo cảm xúc của người khác, nên ranh giới là thứ bạn cần giữ.', en: 'Intuitive, dreamy, deeply empathetic. Easily swept up in other people feelings and needs clear boundaries.', zh: '直觉丰沛、爱幻想、共情极深。易被他人情绪带走，需要清晰界线。' }
  },
  {
    key: 'aries', icon: '♈', element: 'Fire', start: [3, 21], end: [4, 19], ruler: { vi: 'Hoả Tinh', en: 'Mars', zh: '火星' },
    name: { vi: 'Bạch Dương', en: 'Aries', zh: '白羊座' },
    traits: { vi: 'Nhiệt huyết, thẳng thắn, làm trước rồi mới nghĩ nhiều. Bạn dẫn đầu rất tự nhiên, chỉ là kiên nhẫn chưa bao giờ là điểm mạnh.', en: 'Passionate, direct, acting before overthinking. A natural leader, but short on patience.', zh: '热情直率，先行动后细想。天生领头，却缺乏耐性。' }
  },
  {
    key: 'taurus', icon: '♉', element: 'Earth', start: [4, 20], end: [5, 20], ruler: { vi: 'Kim Tinh', en: 'Venus', zh: '金星' },
    name: { vi: 'Kim Ngưu', en: 'Taurus', zh: '金牛座' },
    traits: { vi: 'Bền bỉ, thực tế, yêu cái đẹp và yêu sự ổn định. Bạn trung thành, nhưng đã quyết rồi thì rất khó lay chuyển.', en: 'Steady, practical, loving beauty and stability. Loyal, but very hard to move once decided.', zh: '踏实务实，爱美也爱安定。忠诚，但一旦决定极难改变。' }
  },
  {
    key: 'gemini', icon: '♊', element: 'Air', start: [5, 21], end: [6, 21], ruler: { vi: 'Thuỷ Tinh', en: 'Mercury', zh: '水星' },
    name: { vi: 'Song Tử', en: 'Gemini', zh: '双子座' },
    traits: { vi: 'Nhanh nhạy, hoạt ngôn, tò mò với gần như mọi thứ. Bạn học rất nhanh, chỉ là cũng chán nhanh và hay nhảy sang chuyện khác.', en: 'Quick, articulate, curious about everything. Learns fast but bores easily and jumps topics.', zh: '机敏善言，对一切好奇。学得快却易厌倦、常跳话题。' }
  },
  {
    key: 'cancer', icon: '♋', element: 'Water', start: [6, 22], end: [7, 22], ruler: { vi: 'Mặt Trăng', en: 'Moon', zh: '月亮' },
    name: { vi: 'Cự Giải', en: 'Cancer', zh: '巨蟹座' },
    traits: { vi: 'Nặng tình, gắn bó với gia đình, và luôn muốn che cho người thân. Bạn nhạy cảm, và giữ những ký ức cũ lâu hơn người khác nhiều.', en: 'Emotional, family-bound, protective of loved ones. Sensitive and prone to holding on to old memories.', zh: '重感情、恋家，护着亲人。敏感且常把旧记忆放在心里。' }
  },
  {
    key: 'leo', icon: '♌', element: 'Fire', start: [7, 23], end: [8, 22], ruler: { vi: 'Mặt Trời', en: 'Sun', zh: '太阳' },
    name: { vi: 'Sư Tử', en: 'Leo', zh: '狮子座' },
    traits: { vi: 'Tự tin, hào phóng, mang sức hút của người sinh ra để đứng trên sân khấu. Bạn cần được ghi nhận, và tổn thương thật lòng khi bị phớt lờ.', en: 'Confident, generous, with stage presence. Needs recognition and is easily hurt by being ignored.', zh: '自信慷慨，有舞台魅力。需要被认可，被忽视时易受伤。' }
  },
  {
    key: 'virgo', icon: '♍', element: 'Earth', start: [8, 23], end: [9, 22], ruler: { vi: 'Thuỷ Tinh', en: 'Mercury', zh: '水星' },
    name: { vi: 'Xử Nữ', en: 'Virgo', zh: '处女座' },
    traits: { vi: 'Tỉ mỉ, giỏi phân tích, luôn muốn mọi thứ đúng chuẩn. Bạn giúp được nhiều người, chỉ là hay quay ra tự phê bình chính mình.', en: 'Meticulous, analytical, wanting everything correct. Genuinely helpful but hard on yourself.', zh: '细致善分析，事事求准。乐于助人，却常自我批评。' }
  },
  {
    key: 'libra', icon: '♎', element: 'Air', start: [9, 23], end: [10, 23], ruler: { vi: 'Kim Tinh', en: 'Venus', zh: '金星' },
    name: { vi: 'Thiên Bình', en: 'Libra', zh: '天秤座' },
    traits: { vi: 'Duyên dáng, công bằng, giỏi giữ cân bằng giữa các bên. Bạn khó ra quyết định vì lúc nào cũng nhìn thấy cả hai mặt.', en: 'Charming, fair, skilled at balancing sides. Struggles to decide because you always see both.', zh: '优雅公正，善于平衡各方。因总看见两面而难以决断。' }
  },
  {
    key: 'scorpio', icon: '♏', element: 'Water', start: [10, 24], end: [11, 21], ruler: { vi: 'Diêm Vương Tinh', en: 'Pluto', zh: '冥王星' },
    name: { vi: 'Thiên Yết', en: 'Scorpio', zh: '天蝎座' },
    traits: { vi: 'Sâu sắc, mãnh liệt, và trung thành tuyệt đối với người mình đã chọn. Bạn khó quên, còn tha thứ thì lại càng khó hơn.', en: 'Deep, intense, absolutely loyal to those you choose. Slow to forget and slow to forgive.', zh: '深刻强烈，对认定之人绝对忠诚。难忘也难原谅。' }
  },
  {
    key: 'sagittarius', icon: '♐', element: 'Fire', start: [11, 22], end: [12, 21], ruler: { vi: 'Mộc Tinh', en: 'Jupiter', zh: '木星' },
    name: { vi: 'Nhân Mã', en: 'Sagittarius', zh: '射手座' },
    traits: { vi: 'Lạc quan, ham đi và ham hiểu, yêu tự do hơn hầu hết mọi thứ. Bạn nói thẳng tới mức đôi khi làm người khác chạnh lòng mà không hay biết.', en: 'Optimistic, exploratory, freedom-loving and philosophical. So blunt that others sometimes take offence.', zh: '乐观爱探索，崇尚自由与哲思。直言到有时会让人心里不好受。' }
  }
];
