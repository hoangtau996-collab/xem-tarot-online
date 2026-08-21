// Luận giải cho bốn Đỉnh Cuộc Đời và bốn Thử Thách.
//
// Vì sao hai bảng riêng chứ không dùng lại NUMBER_MEANINGS: cùng một con số
// nhưng đứng ở hai vai trò hoàn toàn khác nhau. Số 4 ở vai trò Đỉnh là "giai
// đoạn xây móng, làm đều tay thì có kết quả"; số 4 ở vai trò Thử Thách là
// "ngại kỷ luật, hay bỏ dở". Dùng chung một bảng sẽ lệch giọng ngay.
//
// Thử Thách còn có số 0 - thứ không tồn tại ở bất kỳ chỉ số nào khác của thần
// số học, vì nó sinh ra từ phép trừ chứ không phải phép cộng.

/* Đỉnh chỉ có thể là 1-9, 11 hoặc 22. Số 33 không thể xuất hiện: đỉnh thứ ba
   là tổng của hai đỉnh đầu, mà mỗi đỉnh tối đa là 11. */
export const PINNACLE_TEXT = {
  vi: {
    1: { title: 'Giai đoạn tự đứng', text: 'Quãng này bắt bạn tự quyết. Cơ hội mở ra đúng lúc bạn dám khởi xướng thay vì chờ được cho phép, và mỗi lần tự chọn là một lần bạn bớt dựa vào người khác. Việc lớn trong giai đoạn này thường bắt đầu từ một mình bạn.' },
    2: { title: 'Giai đoạn của quan hệ', text: 'Tiến bộ đến qua hợp tác chứ không qua sức mạnh cá nhân. Việc lớn trong quãng này thường do người khác mang tới, nên chỗ đáng đầu tư là lòng kiên nhẫn và khả năng lắng nghe. Gồng lên tranh phần thường phản tác dụng.' },
    3: { title: 'Giai đoạn biểu đạt', text: 'Viết, nói, dạy, sáng tạo - những thứ đưa bạn ra ánh sáng sẽ mở đường trong quãng này. Sức sáng tạo dồi dào nhưng dễ tản: chọn lấy một hướng và làm tới nơi, nếu không cuối giai đoạn nhìn lại sẽ thấy vui mà không đọng lại gì.' },
    4: { title: 'Giai đoạn xây móng', text: 'Không có đường tắt nào trong quãng này - kết quả đến từ kỷ luật và làm đều tay. Đổi lại, thứ bạn dựng ở giai đoạn này đứng được rất lâu. Đây là lúc thích hợp để xây cái nền mà mọi chuyện về sau tựa vào.' },
    5: { title: 'Giai đoạn thay đổi', text: 'Đi lại, đổi việc, đổi chỗ ở, gặp nhiều người mới - quãng này hiếm khi yên một chỗ. Tự do là món quà lớn nhất của giai đoạn, và cũng là chỗ dễ tiêu tán nhất nếu bạn không neo lại một thứ gì đủ quan trọng.' },
    6: { title: 'Giai đoạn trách nhiệm', text: 'Gia đình, chăm sóc, gánh vác cho người khác chiếm phần lớn quãng này. Bạn được yêu thương và được cần tới nhiều hơn bao giờ hết, nhưng bài học đi kèm là học nói "không" trước khi mình kiệt sức.' },
    7: { title: 'Giai đoạn vào trong', text: 'Học sâu, nghiên cứu, tĩnh lặng, đời sống tinh thần. Ép mình bon chen trong quãng này thường không đi tới đâu; lùi lại một bước để hiểu cho tới nơi mới là hướng đúng. Nhiều người thấy giai đoạn này cô đơn, nhưng đó là cô đơn có ích.' },
    8: { title: 'Giai đoạn quyền lực và tiền bạc', text: 'Cơ hội lớn nhất về sự nghiệp và tài chính thường rơi vào quãng này. Đòi hỏi bản lĩnh cầm tiền và cầm người - đây cũng là giai đoạn dễ được và dễ mất nhất, vì quy mô mọi thứ đều lớn hơn trước.' },
    9: { title: 'Giai đoạn cho đi', text: 'Làm việc vì cái chung, và buông những thứ đã hết vai trò. Quãng này có nhiều kết thúc hơn khởi đầu, điều đó không phải mất mát: chính chỗ bạn chịu buông ra mới mở được đường cho chu kỳ kế tiếp.' },
    11: { title: 'Đỉnh bậc thầy - Trực giác', text: 'Trực giác mạnh khác thường, và bạn dễ trở thành người truyền cảm hứng cho cả một nhóm. Đổi lại, áp lực cao hơn hẳn một giai đoạn số 2 thông thường: căng thẳng thần kinh chính là cái giá của tầng rung động này.' },
    22: { title: 'Đỉnh bậc thầy - Kiến tạo', text: 'Khả năng biến một giấc mơ lớn thành công trình có thật. Quãng này đòi cả tầm nhìn lẫn sự cần cù, và rất mệt. Nhưng nếu đi trọn, thứ bạn để lại sẽ vượt quá phạm vi cá nhân mình.' }
  },
  en: {
    1: { title: 'The stand-alone period', text: 'This stretch forces you to decide for yourself. Opportunity opens precisely when you dare to start something rather than wait for permission, and each choice leaves you leaning on others a little less. The big things here tend to begin with you alone.' },
    2: { title: 'The period of relationship', text: 'Progress arrives through cooperation rather than personal force. What matters here usually comes to you via someone else, so patience and listening are what pay. Straining to take your share tends to backfire.' },
    3: { title: 'The period of expression', text: 'Writing, speaking, teaching, creating - whatever brings you into the light opens the road here. Creativity runs high but scatters easily: pick one direction and see it through, or you will reach the end of the period having enjoyed yourself with nothing to show.' },
    4: { title: 'The foundation-laying period', text: 'There are no shortcuts in this stretch - results come from discipline and steady work. In exchange, what you build here lasts a long time. This is the moment to lay the base that everything afterwards rests on.' },
    5: { title: 'The period of change', text: 'Travel, changes of work, changes of address, a great many new people - this stretch rarely sits still. Freedom is the period greatest gift and also where it drains away fastest, unless you anchor yourself to something that matters.' },
    6: { title: 'The period of responsibility', text: 'Family, caregiving and carrying weight for others fill most of this stretch. You are loved and needed more than ever, and the lesson riding along with it is learning to say no before you are hollowed out.' },
    7: { title: 'The inward period', text: 'Deep study, research, quiet, the life of the spirit. Forcing yourself to compete in this stretch usually goes nowhere; stepping back to understand something properly is the right direction. Many find this period lonely, but it is a useful loneliness.' },
    8: { title: 'The period of power and money', text: 'The largest opportunities in career and finance tend to fall here. It asks for the nerve to handle money and to handle people - and it is also the easiest period to win big in and to lose big in, because the scale of everything rises.' },
    9: { title: 'The period of giving', text: 'Work for the common good, and letting go of what has finished its role. This stretch holds more endings than beginnings, which is no loss: what you are willing to release is exactly what opens the way to the next cycle.' },
    11: { title: 'Master pinnacle - Intuition', text: 'Unusually strong intuition, and a real chance of becoming the person who inspires a whole group. In exchange, the pressure runs far above an ordinary 2 period: nervous strain is the price of this frequency.' },
    22: { title: 'Master pinnacle - The builder', text: 'The capacity to turn a large dream into something that actually stands. This stretch demands vision and drudgery in equal measure, and it is exhausting. Carry it through, and what you leave behind outlasts your own scope.' }
  },
  zh: {
    1: { title: '自立的阶段', text: '这一段逼着你自己拿主意。机会恰在你敢于开创、而非等待许可时打开；每一次自选，都让你少依赖别人一分。此期的大事，多半从你一个人开始。' },
    2: { title: '关系的阶段', text: '进展经由合作而来，而非个人蛮力。此期的要紧事往往由他人带到你面前，因此值得投入的是耐性与倾听。硬争一份，多半适得其反。' },
    3: { title: '表达的阶段', text: '写作、言说、教学、创作——凡把你带到明处的事，都在此期开路。创造力充沛却极易散掉：挑定一个方向做到底，否则走到阶段末回望，只见尽兴，不见留下什么。' },
    4: { title: '筑基的阶段', text: '这一段没有捷径——成果来自自律与日复一日。作为交换，你在此期筑起之物立得极久。这是打下往后一切所倚之地基的时候。' },
    5: { title: '变动的阶段', text: '奔走、换工作、换住处、结识大量新人——此期少有安坐之时。自由是这一阶段最大的礼物，也是它流失得最快之处，除非你把自己系在某件够重要的事上。' },
    6: { title: '责任的阶段', text: '家庭、照护、为他人担重，占去这一段的大半。你被爱、被需要的程度前所未有，而随之而来的功课是：在被掏空之前，学会说不。' },
    7: { title: '向内的阶段', text: '深研、探究、静默、精神生活。在此期强迫自己去争，多半无果；退开一步、把一件事弄透，才是对的方向。许多人觉得这一段孤独，但那是有用的孤独。' },
    8: { title: '权力与金钱的阶段', text: '事业与财务上最大的机会，多半落在此期。它要求你有掌钱、也有掌人的胆识——同时这也是最易大得、亦最易大失的一段，因为一切的量级都上去了。' },
    9: { title: '给予的阶段', text: '为公共之事做事，并放下已尽其职之物。这一段结束多于开始，那并非损失：你肯松手之处，恰是通往下一轮周期的路口。' },
    11: { title: '大师顶点 · 直觉', text: '直觉异常敏锐，很有机会成为点燃一整群人的那个人。作为代价，压力远高于寻常的二数阶段：神经的紧绷，正是这一频率的价钱。' },
    22: { title: '大师顶点 · 筑造', text: '把一个宏大的梦，变成真正立得住之物的能力。这一段同时索取远见与苦工，极耗人。但若走完，你留下的东西将越出自身的范围。' }
  }
};

/* Thử Thách nằm trong khoảng 0-8. Số 0 chỉ xuất hiện ở đây và mang nghĩa
   riêng: không có bài học nào bị ép, mọi hướng đều để ngỏ. */
export const CHALLENGE_TEXT = {
  vi: {
    0: { title: 'Thử thách của lựa chọn', text: 'Không có bài học nào bị ép buộc trong giai đoạn này - mọi hướng đều để ngỏ. Nghe thì nhẹ, nhưng đây lại là loại khó: không có sức ép nào bắt bạn phải trưởng thành, nên rất dễ trôi qua nhiều năm mà không đi tới đâu. Kỷ luật ở đây phải do chính bạn tự đặt ra.' },
    1: { title: 'Sợ tự khẳng định', text: 'Bạn hoặc quá thuận theo ý người khác, hoặc lấn át trước để khỏi bị lấn. Cả hai đầu đều xuất phát từ cùng một nỗi sợ. Bài học là nói ra ý mình mà không cần đè ai xuống, và chịu được việc có người không đồng tình.' },
    2: { title: 'Quá nhạy cảm', text: 'Bạn để ý từng lời chê, ngại va chạm nên hay nhận phần thiệt cho xong chuyện. Bài học là bớt lấy phản ứng của người khác làm thước đo giá trị của mình - phần lớn những gì bạn tưởng là chê đều không nhắm vào bạn.' },
    3: { title: 'Nghi ngờ khả năng biểu đạt', text: 'Bạn nghĩ rất nhiều mà không nói ra, hoặc nói cho vui để né đúng chuyện cần nói. Bài học là dám đưa thứ mình làm ra ánh sáng, kể cả khi nó chưa hoàn hảo - và chấp nhận rằng bản chưa hoàn hảo vẫn tốt hơn bản không bao giờ ra.' },
    4: { title: 'Ngại kỷ luật', text: 'Bạn tránh phần khô khan và hay bỏ dở khi việc hết thú vị. Bài học là làm cho xong thay vì chỉ làm phần hay ho - và nhận ra rằng chính đoạn tẻ nhạt mới là chỗ tách người làm được với người chỉ nói.' },
    5: { title: 'Bị cuốn theo cái mới', text: 'Ham tự do tới mức không cam kết được thứ gì lâu, và dễ sa vào những thứ cho khoái cảm nhanh. Bài học là ở lại đủ lâu với một việc để thấy được kết quả của chính mình.' },
    6: { title: 'Trách nhiệm lệch', text: 'Bạn hoặc ôm hết phần của người khác, hoặc trốn hẳn không nhận gì. Thường đi kèm việc đặt tiêu chuẩn quá cao cho người thân rồi thất vọng. Bài học là giúp mà không kiểm soát, và cho phép người khác làm theo cách của họ.' },
    7: { title: 'Khép mình và hoài nghi', text: 'Bạn giấu cảm xúc và ngại để ai nhìn thấy chỗ yếu, nên hay bị coi là lạnh. Bài học là mở ra một chút mà không thấy mình bị đe doạ - tin một người không có nghĩa là giao hết cho họ.' },
    8: { title: 'Quan hệ lệch với tiền và quyền', text: 'Hoặc bạn để tiền bạc và địa vị chi phối mọi quyết định, hoặc né tránh chúng vì sợ. Bài học là cầm được nguồn lực mà không để nó định nghĩa mình - tiền là công cụ, không phải bảng điểm.' }
  },
  en: {
    0: { title: 'The challenge of choice', text: 'No lesson is forced on you in this period - every direction stays open. That sounds light, but it is the hard kind: nothing pressures you into growing, so years can pass without arriving anywhere. Whatever discipline exists here, you have to impose yourself.' },
    1: { title: 'Fear of asserting yourself', text: 'You either go along with what others want, or dominate first so as not to be dominated. Both ends grow from the same fear. The lesson is stating your view without having to push anyone down, and bearing the fact that someone will disagree.' },
    2: { title: 'Oversensitivity', text: 'You register every criticism, and avoid friction by taking the loss to end the matter. The lesson is to stop using other people reactions as the measure of your worth - most of what you read as criticism was not aimed at you.' },
    3: { title: 'Doubting your own expression', text: 'You think a great deal and say none of it, or keep things light to dodge the thing that actually needs saying. The lesson is daring to bring your work into the light even unfinished - an imperfect version still beats one that never appears.' },
    4: { title: 'Resistance to discipline', text: 'You avoid the dry part and drift away once the work stops being interesting. The lesson is finishing rather than only doing the enjoyable stretch - and recognising that the tedious part is exactly what separates people who deliver from people who talk.' },
    5: { title: 'Swept along by the new', text: 'You want freedom so badly that nothing gets committed to for long, and quick gratification is an easy trap. The lesson is staying with one thing long enough to see a result that is genuinely yours.' },
    6: { title: 'Responsibility out of balance', text: 'You either absorb everyone else share or refuse to carry anything at all. It usually comes with holding your family to standards they never agreed to, then being let down. The lesson is helping without controlling, and letting people do it their own way.' },
    7: { title: 'Closed off and doubting', text: 'You hide what you feel and dislike anyone seeing a weak point, so you read as cold. The lesson is opening a little without feeling under threat - trusting one person does not mean handing them everything.' },
    8: { title: 'A crooked relationship with money and power', text: 'Either money and standing drive every decision, or you avoid them out of fear. The lesson is holding resources without letting them define you - money is a tool, not a scoreboard.' }
  },
  zh: {
    0: { title: '选择的挑战', text: '此期没有任何功课被强加于你——每个方向都敞着。听来轻松，却是难的那一种：没有压力逼你成长，于是可以过去许多年而未抵达任何地方。此处的自律，只能由你自己立下。' },
    1: { title: '不敢确立自己', text: '你要么顺着别人的意思，要么先压过去以免被压。两端出自同一种恐惧。功课是：说出自己的看法而不必压下谁，并承受总会有人不同意。' },
    2: { title: '过度敏感', text: '你在意每一句批评，怕摩擦，宁可自己吃亏了事。功课是：别再拿他人的反应当作衡量自身价值的尺——你读作批评的，多半根本不是冲你来的。' },
    3: { title: '怀疑自己的表达', text: '你想得极多却一句不说，或只说轻松话以躲开真正该说的。功课是：敢把自己做的东西拿到明处，哪怕还没做完——不完美的版本，终究胜过永不出现的版本。' },
    4: { title: '抗拒自律', text: '你回避枯燥的部分，事情一不有趣就飘走。功课是：做完，而不只做有意思的那一段——并认清枯燥处，恰是把交得出货的人与只会说的人分开之处。' },
    5: { title: '被新鲜事卷走', text: '你太想要自由，以致什么都无法长久投入，也容易落入速成快感的陷阱。功课是：在一件事上待够久，久到看见真正属于自己的结果。' },
    6: { title: '责任失衡', text: '你要么把别人那份也扛下，要么索性一点不担。这往往伴随着用亲人从未同意的标准要求他们，然后失望。功课是：帮而不控，容许别人用自己的方式来。' },
    7: { title: '封闭与怀疑', text: '你藏起感受，不喜欢任何人看见弱处，因而显得冷。功课是：稍微打开一点而不觉得受威胁——信任一个人，并不等于把一切交出去。' },
    8: { title: '与金钱权力的关系歪了', text: '要么金钱地位主导你每一个决定，要么你因害怕而回避它们。功课是：握得住资源而不被它定义——钱是工具，不是记分板。' }
  }
};

/* Tra cứu an toàn: đỉnh rơi vào số lạ (không nên xảy ra với công thức hiện
   tại) thì rút về một chữ số thay vì trả ra ô trống. */
export const getPinnacleText = (value, lang = 'vi') => {
  const table = PINNACLE_TEXT[lang] || PINNACLE_TEXT.vi;
  if (table[value]) return table[value];
  const reduced = String(value).split('').reduce((sum, d) => sum + Number(d), 0);
  return table[reduced] || table[9];
};

export const getChallengeText = (value, lang = 'vi') => {
  const table = CHALLENGE_TEXT[lang] || CHALLENGE_TEXT.vi;
  return table[value] || table[0];
};
