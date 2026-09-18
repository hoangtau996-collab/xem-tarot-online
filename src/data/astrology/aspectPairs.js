// Góc chiếu - bản tiếng Việt viết sâu.
//
// Vì sao không viết tay từng ô: 90 cặp điểm nhân 7 loại góc là 630 đoạn, viết
// hết thì vừa không nổi vừa chắc chắn loãng giọng. Nhưng bản ghép cũ lại quá
// mỏng - nó chỉ nối hai từ khoá với một mệnh đề chung ("con người thật của bạn
// và nhu cầu cảm xúc của bạn - hai năng lượng dính làm một"), đọc xong không
// biết làm gì.
//
// Nên chỗ này ghép ở mức sâu hơn, bằng hai tầng đều được viết tay:
//   PAIR_THEME_VI  - 90 cặp: hai điểm này gặp nhau thì chuyện gì được bàn tới.
//   NATURE_VI      - 7 loại góc: cặp ấy chạy theo kiểu nào, và làm gì với nó.
// Ghép hai tầng ra 2-3 câu có nội dung thật, và nói rõ trong chú thích rằng
// đây là văn ghép - trung thực hơn là giả vờ mỗi ô một bài riêng.

/* Thứ tự này đúng theo thứ tự các điểm được đưa vào phép tính góc chiếu ở
   natalChart.js, dùng để dựng khoá cặp không phụ thuộc chiều a-b. */
const POINT_ORDER = [
  'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn',
  'uranus', 'neptune', 'pluto', 'northNode', 'southNode', 'asc', 'mc'
];

export const pairKey = (a, b) => {
  const ia = POINT_ORDER.indexOf(a);
  const ib = POINT_ORDER.indexOf(b);
  if (ia === -1 || ib === -1) return null;
  return ia <= ib ? `${a}|${b}` : `${b}|${a}`;
};

export const PAIR_THEME_VI = {
  /* --- Mặt Trời --- */
  'sun|moon': 'Đây là cặp gốc của cả lá số: điều bạn muốn trở thành gặp điều bạn cần để thấy an toàn. Nó quyết định bạn sống với chính mình dễ hay khó.',
  'sun|mercury': 'Con người bạn gặp cách bạn nghĩ và nói - tức là bạn diễn đạt được bao nhiêu phần của chính mình ra thành lời.',
  'sun|venus': 'Con người bạn gặp cách bạn yêu và hưởng thụ: bạn có cho phép mình được vui và được thích không, hay luôn phải có lý do.',
  'sun|mars': 'Ý muốn gặp sức làm: đây là cặp quyết định bạn biến ý định thành hành động nhanh hay chậm, và bạn dùng sức thế nào khi bị chắn.',
  'sun|jupiter': 'Con người bạn gặp niềm tin và cơ hội - bạn dám mở tới đâu, và bạn có tin đời còn chỗ cho mình không.',
  'sun|saturn': 'Con người bạn gặp kỷ luật và giới hạn: bạn nghiêm với chính mình tới mức nào, và ai là người đã đặt ra thước đo đó.',
  'sun|uranus': 'Con người bạn gặp nhu cầu tự do - bạn cần lệch khỏi khuôn bao nhiêu để còn thấy mình là mình.',
  'sun|neptune': 'Con người bạn gặp trí tưởng tượng và lòng trắc ẩn: đường viền của bản thân bạn rõ hay mờ khi ở cạnh người khác.',
  'sun|pluto': 'Con người bạn gặp khát khao quyền lực và chuyển hoá - bạn dùng sức nặng của mình thế nào, và bạn đã lột xác mấy lần.',
  'sun|northNode': 'Con người bạn gặp hướng trưởng thành đời này: việc bạn cần lớn lên đi cùng hay đi ngược với việc bạn muốn làm.',
  'sun|southNode': 'Con người bạn gặp vốn liếng sẵn có - phần bạn đã thạo tới mức dễ mắc kẹt trong đó.',
  'sun|asc': 'Con người bên trong gặp lớp vỏ đưa ra ngoài: người khác gặp bạn có giống bạn thật không.',
  'sun|mc': 'Con người bạn gặp con đường sự nghiệp - nghề bạn làm có phải chỗ bạn được là chính mình hay không.',

  /* --- Mặt Trăng --- */
  'moon|mercury': 'Cảm xúc gặp lời nói: bạn gọi tên được cảm giác của mình dễ hay khó, và bạn nói chuyện lúc đang xúc động ra sao.',
  'moon|venus': 'Nhu cầu cảm xúc gặp cách yêu - bạn cần gì để thấy được thương, và bạn có xin được điều đó không.',
  'moon|mars': 'Cảm xúc gặp hành động: đây là cặp nói về cách bạn nổi nóng, và phản ứng đầu tiên của bạn khi thấy bị đe doạ.',
  'moon|jupiter': 'Nhu cầu cảm xúc gặp niềm tin - bạn có cảm giác được đời đỡ hay không, và bạn rộng tay tới mức nào với người mình thương.',
  'moon|saturn': 'Cảm xúc gặp giới hạn: bạn có cho phép mình cần người khác không, hay đã tự học cách nén từ sớm.',
  'moon|uranus': 'Nhu cầu an toàn gặp nhu cầu tự do - hai thứ này kéo bạn về hai phía, và tâm trạng bạn đổi theo đợt.',
  'moon|neptune': 'Cảm xúc gặp trí tưởng tượng: bạn thấm cảm xúc của người xung quanh rất nhanh, và ranh giới là bài học chính.',
  'moon|pluto': 'Cảm xúc gặp sức chuyển hoá - bạn cảm sâu và nặng, và những mối thân thiết của bạn có sức đổi cả con người bạn.',
  'moon|northNode': 'Nhu cầu cảm xúc gặp hướng trưởng thành: phần bạn cần cho an toàn có giúp bạn lớn lên hay đang giữ bạn lại.',
  'moon|southNode': 'Cảm xúc gặp lối mòn quen - chỗ bạn hay quay về mỗi lần khó, dù đã biết nó không còn giúp gì.',
  'moon|asc': 'Cảm xúc gặp lớp vỏ ngoài: tâm trạng bạn hiện ra ngoài bao nhiêu, và người lạ đọc được bạn tới đâu.',
  'moon|mc': 'Nhu cầu cảm xúc gặp sự nghiệp - việc bạn làm có nuôi được phần bên trong bạn hay chỉ nuôi cái lịch.',

  /* --- Sao Thuỷ --- */
  'mercury|venus': 'Cách nghĩ gặp cách yêu: bạn nói lời dễ nghe tới mức nào, và bạn thương lượng thế nào khi muốn giữ hoà khí.',
  'mercury|mars': 'Lời nói gặp sức làm - đây là cặp của tranh luận: bạn nói thẳng, nói nhanh, và đôi khi nói sắc hơn ý định.',
  'mercury|jupiter': 'Cách nghĩ gặp tầm rộng: bạn nhìn bức tranh lớn tốt, còn chi tiết nhỏ thì dễ bỏ sót.',
  'mercury|saturn': 'Cách nghĩ gặp kỷ luật: bạn nghĩ chắc và nói có căn cứ, nhưng cũng dễ tự chặn mình vì sợ nói sai.',
  'mercury|uranus': 'Đầu óc gặp nhu cầu phá lệ - ý tưởng bật ra nhanh, lệch khỏi lối thường, và bạn khó theo trình tự.',
  'mercury|neptune': 'Lời nói gặp tưởng tượng: bạn diễn đạt bằng hình ảnh và ẩn ý, hay hơn nhưng cũng dễ bị hiểu sai hơn.',
  'mercury|pluto': 'Lời nói gặp quyền lực: bạn đào tới đáy một chuyện, đọc được động cơ người khác, và lời bạn nói có sức nặng thật.',
  'mercury|northNode': 'Cách nghĩ gặp hướng trưởng thành - việc học và việc nói là một phần của con đường bạn phải đi.',
  'mercury|southNode': 'Cách nghĩ gặp lối mòn: bạn có sẵn một nếp tư duy rất thạo, thạo tới mức ít khi chịu đổi.',
  'mercury|asc': 'Cách nghĩ gặp lớp vỏ ngoài: người ta nhận ra bạn qua cách bạn nói, gần như trước mọi thứ khác.',
  'mercury|mc': 'Cách nghĩ gặp sự nghiệp - bạn đi lên bằng chữ nghĩa, thông tin và khả năng trình bày.',

  /* --- Sao Kim --- */
  'venus|mars': 'Cách yêu gặp cách muốn: đây là cặp của sức hút - bạn theo đuổi thế nào, và giữa dịu dàng với quyết liệt bạn nghiêng về đâu.',
  'venus|jupiter': 'Cách yêu gặp sự rộng rãi: bạn hào phóng, thích cái đẹp, và tận hưởng không tiếc tay.',
  'venus|saturn': 'Cách yêu gặp giới hạn - bạn thận trọng trong tình cảm, cần thời gian để tin, và coi cam kết là chuyện nghiêm túc.',
  'venus|uranus': 'Cách yêu gặp nhu cầu tự do: bạn bị hút vào người khác thường, và không chịu được cảm giác bị buộc chặt.',
  'venus|neptune': 'Cách yêu gặp tưởng tượng - bạn yêu bằng lý tưởng, dễ dựng người kia đẹp hơn thật, và có khiếu nghệ thuật rõ.',
  'venus|pluto': 'Cách yêu gặp sức chuyển hoá: tình cảm của bạn mãnh liệt và có sức biến đổi, hiếm khi nhẹ nhàng.',
  'venus|northNode': 'Cách yêu gặp hướng trưởng thành - quan hệ và cái đẹp là phần thuộc về con đường đời này của bạn.',
  'venus|southNode': 'Cách yêu gặp lối mòn: bạn có một kiểu quan hệ rất quen tay, quen tới mức dễ lặp lại cả phần không tốt.',
  'venus|asc': 'Cách yêu gặp lớp vỏ ngoài - sức hút của bạn nằm ngay ở bề mặt, người ta thấy dễ chịu khi ở gần bạn.',
  'venus|mc': 'Cách yêu gặp sự nghiệp: duyên với người mở cửa cho bạn trong công việc, và bạn dễ gặp người quan trọng qua chuyện nghề.',

  /* --- Sao Hoả --- */
  'mars|jupiter': 'Sức làm gặp tầm rộng: bạn dám đánh lớn và có sức theo đuổi, cũng dễ nhận nhiều hơn mức làm nổi.',
  'mars|saturn': 'Sức làm gặp giới hạn - bạn bền, chịu được việc nặng, nhưng hay có cảm giác phải đẩy một cánh cửa nặng.',
  'mars|uranus': 'Sức làm gặp nhu cầu phá lệ: bạn phản ứng nhanh và bất ngờ, làm được việc người khác không dám làm.',
  'mars|neptune': 'Sức làm gặp sự mờ ranh giới - bạn khó nhắm thẳng vào một đích, và sức của bạn hay tiêu vào chỗ không rõ.',
  'mars|pluto': 'Sức làm gặp quyền lực: ý chí của bạn rất lớn, đã muốn là đi tới cùng, và bạn không lùi khi bị ép.',
  'mars|northNode': 'Sức làm gặp hướng trưởng thành - bạn phải học cách dùng sức của mình cho đúng chỗ, không phải bớt dùng nó.',
  'mars|southNode': 'Sức làm gặp lối mòn: bạn có một kiểu phản ứng rất quen khi bị chắn, quen nên ít khi xét lại.',
  'mars|asc': 'Sức làm gặp lớp vỏ ngoài - bạn xông lên trước, người ta thấy rõ khi bạn không vui.',
  'mars|mc': 'Sức làm gặp sự nghiệp: tham vọng của bạn hiện ra thành việc làm, người ta biết bạn là người dám làm.',

  /* --- Sao Mộc --- */
  'jupiter|saturn': 'Mở rộng gặp thu hẹp: đây là cặp giữ nhịp của cả lá số - bạn cân giữa dám và chắc, giữa liều và tính.',
  'jupiter|uranus': 'Cơ hội gặp phá lệ: những bước ngoặt tốt của bạn hay tới bất ngờ, và bạn liều được ở chỗ người khác chần chừ.',
  'jupiter|neptune': 'Niềm tin gặp tưởng tượng - bạn có lòng rộng và trực giác tốt, cũng dễ tin nhanh hơn cần thiết.',
  'jupiter|pluto': 'Cơ hội gặp quyền lực: bạn có sức làm chuyện lớn và ảnh hưởng tới nhiều người, với cái giá là dễ quá tay.',
  'jupiter|northNode': 'Cơ hội gặp hướng trưởng thành - đường lớn lên của bạn được đỡ, đi đúng hướng thì thấy cửa mở.',
  'jupiter|southNode': 'Cơ hội gặp lối mòn: bạn có sẵn một vốn may khá dễ dùng, nên cũng dễ dựa vào nó mà không mài thêm.',
  'jupiter|asc': 'Cơ hội gặp lớp vỏ ngoài - người ta có thiện cảm với bạn nhanh, và cửa hay mở khi bạn tự đứng ra.',
  'jupiter|mc': 'Cơ hội gặp sự nghiệp: bạn được nâng trong công việc, được giao việc lớn hơn tuổi.',

  /* --- Sao Thổ --- */
  'saturn|uranus': 'Giới hạn gặp nhu cầu tự do: một bên muốn giữ, một bên muốn phá - bạn sống giữa hai thứ đó suốt đời.',
  'saturn|neptune': 'Kỷ luật gặp mộng: bạn phải học cách biến điều mình mơ thành thứ làm được thật, đó là việc cả đời.',
  'saturn|pluto': 'Kỷ luật gặp chuyển hoá - bạn bền tới mức khắc, chịu được áp lực rất nặng, và đổi thì đổi tận móng.',
  'saturn|northNode': 'Giới hạn gặp hướng trưởng thành: con đường của bạn đi qua chỗ khó, không có lối tắt nào.',
  'saturn|southNode': 'Giới hạn gặp lối mòn - bạn mang một nỗi sợ hoặc một trách nhiệm cũ, quen tới mức tưởng là tính mình.',
  'saturn|asc': 'Giới hạn gặp lớp vỏ ngoài: bạn trông nghiêm và chín hơn tuổi, người lạ thấy bạn khó gần lúc đầu.',
  'saturn|mc': 'Kỷ luật gặp sự nghiệp - bạn lên bằng từng bậc thật, chậm mà vững, và trụ lại đúng lúc người khác hụt hơi.',

  /* --- Thiên Vương --- */
  'uranus|neptune': 'Phá lệ gặp tan ranh giới: đây là cặp của cả một thế hệ, nói về cách lứa bạn đổi những gì được coi là đương nhiên.',
  'uranus|pluto': 'Phá lệ gặp chuyển hoá - lứa của bạn không cải cách từng phần, họ đổi tận gốc, và bạn mang chất đó trong người.',
  'uranus|northNode': 'Nhu cầu tự do gặp hướng trưởng thành: con đường của bạn đòi bạn dám khác, không phải dám giống.',
  'uranus|southNode': 'Nhu cầu tự do gặp lối mòn - bạn quen bật ra khỏi mọi thứ, quen tới mức đó thành cách trốn.',
  'uranus|asc': 'Phá lệ gặp lớp vỏ ngoài: bạn khác người ngay ở bề mặt và không giấu được, cũng không nên giấu.',
  'uranus|mc': 'Phá lệ gặp sự nghiệp - đường nghề của bạn không thẳng, và chỗ mạnh của bạn là cái chưa có tên.',

  /* --- Hải Vương --- */
  'neptune|pluto': 'Tan ranh giới gặp chuyển hoá: một cặp rất chậm, nói về lớp nền tinh thần của cả một thế hệ.',
  'neptune|northNode': 'Trực giác gặp hướng trưởng thành - con đường của bạn có phần tâm linh hoặc nghệ thuật thật, không phải trang trí.',
  'neptune|southNode': 'Trực giác gặp lối mòn: bạn có sẵn khả năng cảm rất nhạy, và cũng sẵn thói rút vào mộng khi khó.',
  'neptune|asc': 'Tan ranh giới gặp lớp vỏ ngoài - người ta thấy bạn mờ mờ rồi tự điền vào, mỗi người đọc bạn một kiểu.',
  'neptune|mc': 'Mộng gặp sự nghiệp: bạn khó nói gọn mình làm nghề gì, và nghề của bạn thường theo tiếng gọi hơn theo bậc thang.',

  /* --- Diêm Vương --- */
  'pluto|northNode': 'Chuyển hoá gặp hướng trưởng thành: con đường đời này của bạn đi qua những lần lột xác thật, không tránh được.',
  'pluto|southNode': 'Chuyển hoá gặp lối mòn - bạn quen sống trong cường độ cao, quen tới mức bình yên lại làm bạn bồn chồn.',
  'pluto|asc': 'Quyền lực gặp lớp vỏ ngoài: bạn có sức nặng mà không cần lên giọng, người ta hoặc rất tin hoặc hơi dè bạn.',
  'pluto|mc': 'Quyền lực gặp sự nghiệp - bạn nhắm tới chỗ có thực quyền, và sự nghiệp bạn dễ có một lần đổ rồi dựng lại lớn hơn.',

  /* --- Nút Mặt Trăng và bốn góc --- */
  'northNode|asc': 'Hướng trưởng thành gặp lớp vỏ ngoài: việc bạn phải lớn lên nằm ngay ở chỗ bạn xuất hiện và tự đứng ra.',
  'northNode|mc': 'Hướng trưởng thành gặp sự nghiệp - con đường đời này của bạn và con đường nghề của bạn trùng nhau khá rõ.',
  'southNode|asc': 'Lối mòn gặp lớp vỏ ngoài: bạn có một cách xuất hiện rất quen tay, quen tới mức nó thay bạn nói.',
  'southNode|mc': 'Lối mòn gặp sự nghiệp - bạn có sẵn một vốn nghề dễ dùng, và dễ ở lại trong nó lâu hơn mức có lợi.',
  'asc|mc': 'Lớp vỏ ngoài gặp con đường sự nghiệp: cách bạn xuất hiện và chỗ bạn muốn tới ăn khớp với nhau tới đâu.'
};

/* Bảy loại góc, viết theo hướng làm gì được với nó. Câu thứ hai luôn là một
   việc cụ thể, vì đó là phần bản ghép cũ không có. */
export const NATURE_VI = {
  conjunction: 'Ở góc Giao Hội, hai bên dính làm một và khuếch đại nhau - bạn gần như không tách nổi chúng ra, nên cả điểm mạnh lẫn điểm lệch đều đậm hơn người khác. Cách dùng: đừng cố chia chúng, hãy tìm một việc cần đúng cả hai cùng lúc.',
  opposition: 'Ở góc Xung Đối, hai bên giằng nhau như hai đầu một sợi dây - bạn thường nghiêng hẳn về một phía rồi bị phía kia đòi lại, hoặc gặp nó qua một người bên ngoài. Cách dùng: đừng chọn một bên, hãy xếp lịch cho cả hai, mỗi bên một khoảng rõ ràng.',
  trine: 'Ở góc Tam Phân, hai bên chảy trơn và hợp tác gần như tự động - đây là chỗ bạn làm tốt mà không phải gắng, nên cũng là chỗ bạn ít mài nhất. Cách dùng: đặt nó vào một việc có yêu cầu cao hơn hiện tại, vì nó đủ sức và đang bị dùng non.',
  square: 'Ở góc Vuông Góc, hai bên cọ vào nhau liên tục - khó chịu thật, nhưng đây thường là chỗ sinh ra phần lớn những gì bạn làm được trong đời. Cách dùng: coi nó như một việc phải tập lâu dài, và chọn ra một hành động nhỏ làm đều thay vì chờ nó hết cọ.',
  sextile: 'Ở góc Lục Phân, hai bên hợp nhau nhưng chỉ mở cửa chứ không đẩy bạn qua - cơ hội có sẵn và im lặng chờ đó. Cách dùng: cứ chủ động bước một bước nhỏ về phía nó, vì góc này chỉ trả công khi bạn động.',
  quincunx: 'Ở góc Bất Hợp, hai bên không nói cùng một thứ tiếng - chúng chẳng đánh nhau, chỉ là không vừa, nên bạn phải chỉnh đi chỉnh lại. Cách dùng: đừng đợi nó khớp một lần cho xong, hãy chấp nhận chỉnh dần và ghi lại cái gì đã chạy được.',
  semisextile: 'Ở góc Bán Lục Phân, hai bên liên hệ nhẹ như hai phòng cạnh nhau nghe loáng thoáng tiếng nhau - có ảnh hưởng nhưng không nhiều. Cách dùng: ghi nhận rồi để đó, đây không phải chỗ đáng dồn sức.'
};

/* Góc khít dưới một độ chi phối lá số mạnh hơn hẳn góc nằm sát mép, nên nói
   thêm một câu thay vì chỉ gắn một cái nhãn. */
export const TIGHT_NOTE_VI = 'Góc này khít dưới một độ, tức là nó gần như đúng số tuyệt đối - hãy đọc nó nặng hơn các góc còn lại trong bảng, vì nó biểu hiện ra đời sống rõ rệt hơn nhiều.';
