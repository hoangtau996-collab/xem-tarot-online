// Góc chiếu của Mặt Trời và Mặt Trăng - luận giải riêng theo từng loại góc.
//
// Vì sao thêm tầng này: bản trước đã có chủ đề riêng cho từng cặp, nhưng đoạn
// nói "góc này chạy thế nào" lại dùng chung cho cả 90 cặp. Kết quả là đọc cặp
// nào cũng thấy na ná - đúng chỗ khách phàn nàn là chung chung.
//
// Nay mỗi cặp có bốn bản riêng theo bản chất góc:
//   blend   - Dính nhau (Conjunction)
//   flow    - Thuận (Trine) và Thuận nhẹ (Sextile)
//   tense   - Đối đỉnh (Opposition) và Vuông góc (Square)
//   awkward - Lệch pha (Quincunx) và Kề cạnh (Semisextile)
// Khoá nature lấy thẳng từ trường nature trong ASPECTS nên không phải tự ánh xạ.

export const ASPECT_DETAIL_LUMINARIES = {
  'sun|moon': {
    blend: 'Ý muốn và nhu cầu của bạn trùng nhau: bạn muốn đúng thứ mình cần, nên ít giằng xé bên trong hơn phần lớn mọi người. Mặt khác bạn thiếu khoảng cách để tự nhìn mình, và thường sinh ra quanh kỳ trăng non.',
    flow: 'Bạn khá hoà với chính mình: làm điều mình muốn mà không phải bỏ phần an toàn. Vì ít xung đột bên trong nên bạn cũng ít bị thúc - hãy tự đặt deadline, đừng đợi khủng hoảng đẩy.',
    tense: 'Bạn muốn một đằng mà cần một nẻo: dồn hết cho mục tiêu rồi kiệt, hoặc ôm phần an toàn rồi thấy đời không đi tới đâu. Thường cha và mẹ là hai hướng kéo đầu tiên bạn gặp. Việc nên làm: xếp lịch cho cả hai phần, mỗi tuần một khoảng rõ ràng, thay vì chọn một bên.',
    awkward: 'Bạn và chính bạn hơi lệch nhịp: biết mình muốn gì, cũng biết mình cần gì, nhưng hai cái không bao giờ khớp sẵn. Cách sống được là chỉnh dần theo từng giai đoạn, đừng mong tìm ra một công thức dùng mãi.'
  },
  'sun|mercury': {
    blend: 'Bạn nghĩ gì nói nấy và nói ra gần như là cách bạn tồn tại - khó mà giữ ý kiến trong lòng. Vì đầu óc dính liền với cái tôi nên bị phản bác ý kiến, bạn cảm như bị phản bác cả con người.',
    flow: 'Bạn diễn đạt được chính mình một cách tự nhiên: nghĩ sao nói vậy mà vẫn dễ nghe. Đây là lợi thế thật trong nghề cần trình bày - nên đặt mình vào chỗ phải nói trước người khác thường xuyên.',
    tense: 'Bạn khó nói đúng ý mình: nói ra rồi thấy không phải thế, hoặc im vì sợ nói chưa tới. Cách bù rất cụ thể là viết trước khi nói, và xin thêm thời gian thay vì đáp gấp.',
    awkward: 'Lời bạn nói và con người bạn hơi lệch nhau, nên người ta hay hiểu bạn sai một chút. Hãy kiểm tra lại bằng câu hỏi anh hiểu ý tôi thế nào, thay vì cho rằng mình đã nói rõ.'
  },
  'sun|venus': {
    blend: 'Bạn dễ mến và biết cách làm người khác thấy thoải mái - sức hút của bạn là một phần con người bạn, không phải lớp trang điểm. Đổi lại bạn rất cần được thích, và dễ mềm đi khi bị làm ngọt.',
    flow: 'Bạn cho phép mình được vui mà không cần lý do, và điều đó làm bạn nhẹ hơn nhiều người. Hãy dùng nó vào việc dựng quan hệ - bạn mở cửa bằng sự dễ chịu nhanh hơn bằng lý lẽ.',
    tense: 'Bạn và phần muốn được yêu của bạn hay cãi nhau: làm việc đến mức quên thưởng cho mình, hoặc tiêu và chiều mình rồi thấy tội. Cũng dễ thấy mình chưa đủ xứng để được yêu. Việc nên làm: định trước một khoản và một khoảng thời gian cho niềm vui, rồi dùng hết không hối.',
    awkward: 'Cái bạn thích và cái bạn muốn trở thành không cùng một hướng, nên bạn hay thấy mình đang sống hai nếp. Chỉnh dần là đủ - không cần dẹp một bên để bên kia yên.'
  },
  'sun|mars': {
    blend: 'Muốn là làm, gần như không có khoảng giữa. Bạn có sức đẩy mà người khác phải vay, nhưng cũng nóng nhanh và dễ lao vào trước khi đủ dữ kiện. Một nhịp thở trước khi đáp là khoản đầu tư lời nhất của bạn.',
    flow: 'Ý định của bạn tự biến thành hành động, không cần gồng ý chí. Vì nó quá sẵn nên bạn ít khi dùng tới hết - hãy nhận một việc lớn hơn mức hiện tại, nó đang bị dùng non.',
    tense: 'Bạn và sức của bạn đánh nhau: hoặc đẩy quá tay rồi mệt, hoặc kìm lại rồi tích thành cơn. Thường có một bóng người đàn ông nghiêm khắc trong chuyện này. Việc cụ thể: cho cơ thể một chỗ đốt mỗi ngày, rồi tính bạn dịu đi hẳn và quyết định cũng sáng hơn.',
    awkward: 'Bạn khó nhắm thẳng: biết mình muốn gì mà sức lại đổ sang chỗ khác. Hãy bẻ mục tiêu thành từng bước nhỏ nhìn thấy được, vì góc này không chịu được đích mơ hồ.'
  },
  'sun|jupiter': {
    blend: 'Bạn tin mình và tin đời, nên người khác cũng dễ tin bạn - đây là vốn mở cửa thật. Cái giá là nhận nhiều hơn làm nổi và hứa rộng hơn tay mình: hãy nhận ít hơn mức bạn tưởng là làm được.',
    flow: 'Cửa hay mở khi bạn tự đứng ra, và bạn hồi lại sau thất bại nhanh hơn người khác. Vì may tới dễ nên bạn ít mài - chọn một việc khó hơn hiện tại, bạn đủ sức cho nó.',
    tense: 'Bạn phóng to mình quá hoặc hạ mình quá, ít khi đứng ở mức đúng. Dễ hứa lớn rồi phải chạy theo lời hứa. Việc nên làm: viết ra con số và thời hạn thật trước khi nhận, rồi đối chiếu lại sau ba tháng.',
    awkward: 'Niềm tin của bạn và con người bạn hơi so le: tin vào một thứ mà sống theo thứ khác. Mỗi lần thấy lệch thì chỉnh một chút, đừng chờ một lần đổi hết.'
  },
  'sun|saturn': {
    blend: 'Bạn nghiêm với mình từ nhỏ và chín trước tuổi - người ta giao việc cho bạn sớm hơn bạn muốn. Bạn bền hơn gần như mọi người, nhưng cũng hay thấy mình chưa đủ. Sao Thổ trả công đúng hạn: khoảng sau ba mươi bạn vững hơn hẳn, việc cần làm chỉ là đừng bỏ giữa đường.',
    flow: 'Bạn có kỷ luật mà không phải gồng, nên đi được đường dài ở chỗ người khác bỏ cuộc. Hãy chọn một hướng và ở lại đủ lâu - mười năm trong một nghề là đồng tiền quý nhất của bạn.',
    tense: 'Có một thước đo rất khắc trong đầu bạn, thường học từ cha hoặc một người lớn nghiêm khắc, và bạn không bao giờ đạt được nó. Vì vậy bạn làm nhiều mà ít thấy đủ. Việc thực tế: ghi lại việc đã làm xong mỗi tuần, vì bạn chỉ nhớ phần còn thiếu.',
    awkward: 'Trách nhiệm và con người bạn hơi lệch nhau: gánh những việc không thuộc phần mình, rồi lại trống chỗ nên gánh. Hãy tập nói việc này không phải của tôi, mỗi lần một câu.'
  },
  'sun|uranus': {
    blend: 'Bạn khác người và không giấu được, kể cả khi muốn giấu. Đời bạn hay có những lần quay ngoặt khá đột ngột. Đừng gọt mình cho tròn - chỗ bạn được trả công cao nhất đúng là chỗ bạn không giống ai.',
    flow: 'Bạn đổi mới mà không phải đập đi: lệch khỏi khuôn vừa đủ để thành thú vị chứ không thành rắc rối. Hãy đi tìm chỗ thị trường đang đổi, bạn thuộc về đó.',
    tense: 'Phần muốn tự do và phần muốn là người đứng đắn trong bạn kéo nhau: bạn chịu khuôn một thời gian rồi bật ra một cái, thường làm người quanh bạn trở tay không kịp. Việc nên làm: chủ động chừa sẵn chỗ để lệch - một việc riêng, một khoảng thời gian không ai quản - thay vì để nó bật ra bằng một quyết định gấp.',
    awkward: 'Bạn muốn khác mà cũng muốn được nhận, hai cái không khớp sẵn. Mỗi giai đoạn chỉnh lại một lần là cách sống được với nó.'
  },
  'sun|neptune': {
    blend: 'Đường viền của bạn mờ: bạn nhạy, có khiếu nghệ thuật, và hoà vào người khác rất nhanh. Cũng vì thế bạn khó nói gọn mình là ai. Việc rất thực dụng: tập nói một câu rõ về mình và mình làm gì, rồi dùng đi dùng lại.',
    flow: 'Bạn có trực giác tốt và lòng trắc ẩn rộng mà không mất mình. Hãy đặt nó vào việc chăm người hoặc làm nghệ thuật - đó là chỗ nó sinh lời, không phải chỗ bạn phải kìm.',
    tense: 'Bạn hay không thấy rõ chính mình: mờ về việc mình muốn gì, dễ nhận hình ảnh người khác gán cho rồi sống theo. Cũng dễ tự dối một chút cho dễ chịu. Việc nên làm: mỗi tháng viết ra ba việc mình đã làm thật, chỉ dữ kiện - đó là cách bạn tìm lại đường viền của mình.',
    awkward: 'Con người bạn và phần mộng trong bạn không khớp tiếng nhau, nên bạn thấy mình lửng lơ giữa hai nếp. Chỉnh dần, và neo mình bằng một việc có kết quả nhìn thấy được.'
  },
  'sun|pluto': {
    blend: 'Bạn có sức nặng mà không cần lên giọng, người ta hoặc rất tin hoặc hơi dè. Đời bạn thường có một hai lần lột xác đến mức người cũ không nhận ra. Bạn không sống nhạt được, nên chọn sẵn xem muốn nặng về phía nào.',
    flow: 'Bạn dùng được sức mạnh của mình mà không phải đè ai: khủng hoảng tới thì bạn là người còn đứng. Đây là vùng nghề của bạn nếu muốn - việc nào cần một người không nhúc nhích trước áp lực.',
    tense: 'Bạn giằng với quyền lực: hoặc muốn nắm hết, hoặc gặp những người muốn nắm bạn. Thường có một bóng người rất mạnh từ thời nhỏ. Việc nên làm: khi thấy mình đang muốn siết, hãy đổi câu hỏi từ họ đang làm gì thành mình đang sợ mất gì.',
    awkward: 'Phần mãnh liệt trong bạn và con người bạn không vừa nhau, nên nó hay bật ra lệch chỗ. Mỗi lần nhận ra thì chỉnh một chút - vùng này chỉ dịu khi được gọi tên.'
  },
  'sun|northNode': {
    blend: 'Việc bạn cần lớn lên trùng với việc bạn muốn làm - khá hiếm và khá dễ chịu. Cứ đi theo hướng mình thấy đúng, nó cũng là hướng trưởng thành của bạn.',
    flow: 'Con đường của bạn mở theo chiều bạn vốn đã nghiêng về, nên lớn lên không phải trả giá nhiều. Nhớ là vì dễ nên cũng dễ dừng sớm - hãy đặt đích xa hơn một bậc.',
    tense: 'Hướng phải lớn lên của bạn đi ngược với thứ bạn thích làm, nên mỗi bước tiến đều hơi trái tay. Đó là chuyện bình thường ở góc này: hãy chọn một việc nhỏ trái tay làm đều mỗi tuần.',
    awkward: 'Bạn biết mình phải đi đâu mà không thấy đường, nên cứ chỉnh hoài. Chấp nhận rằng nó không khớp ngay, và ghi lại những gì đã chạy được.'
  },
  'sun|southNode': {
    blend: 'Bạn sống rất nhiều bằng vốn sẵn có: thạo, trơn, gần như không phải nghĩ. Chính vì thế dễ ở lại quá lâu trong đó - hãy để một phần sức sang việc còn lạ tay.',
    flow: 'Phần thạo của bạn đỡ cho bạn rất êm, nên đời không hay bắt bạn đổi. Cứ giữ nó làm nền, đừng dùng nó làm chỗ trốn.',
    tense: 'Cái bạn làm giỏi nhất lại là cái níu bạn lại, nên bạn cứ quay về nó rồi lại thấy bí. Việc nên làm: nhận một việc mà bạn chưa có tiếng gì, và đừng rút về chỗ an toàn khi khó.',
    awkward: 'Vốn cũ và hướng mới của bạn hơi vướng nhau. Đừng dẹp cái cũ - hãy tìm cách mang nó sang việc mới dưới một hình dạng khác.'
  },
  'sun|asc': {
    blend: 'Người khác gặp bạn gần như đúng bạn thật - ít lớp đệm, không diễn. Dễ chịu ở chỗ bạn không phải gồng, hơi khó ở chỗ bạn không có chỗ nấp khi cần.',
    flow: 'Con người bên trong và vẻ ngoài của bạn ăn khớp nên bạn gây thiện cảm tự nhiên. Hãy ra mặt nhiều hơn - gặp trực tiếp bạn thắng hơn qua giấy tờ.',
    tense: 'Người ta đọc bạn lệch khá thường xuyên: thấy bạn mạnh khi bạn đang yếu, thấy bạn lạnh khi bạn đang quan tâm. Việc bù rất đơn giản: nói thẳng ý mình ra thành lời, đừng tin là vẻ ngoài đã nói hộ.',
    awkward: 'Vỏ ngoài và con người bạn hơi lệch pha, nên ấn tượng đầu về bạn thường cần sửa lại. Cứ để thời gian làm việc đó, và đừng kết luận sớm rằng người ta không thích mình.'
  },
  'sun|mc': {
    blend: 'Nghề của bạn và con người bạn là một thứ, nên làm đúng nghề thì bạn sống, làm sai nghề thì bạn khổ hơn người khác nhiều. Đáng để chọn kỹ và chọn sớm.',
    flow: 'Việc bạn làm cho phép bạn là chính mình, nên bạn tiến mà không phải đóng vai. Hãy để mặt tiền công khai của bạn đúng như bạn - đừng dựng một hình ảnh khác để bán.',
    tense: 'Con người bạn và vai bạn phải diễn ngoài kia không khớp: hoặc nghề bắt bạn làm người khác, hoặc bạn phải nén mình để được công nhận. Việc nên làm: đổi một phần việc để nó chứa được bạn thật, thay vì chờ đổi hẳn nghề.',
    awkward: 'Bạn và con đường của bạn hơi so le, nên hay thấy mình đang đi đúng mà vẫn không ổn. Chỉnh từng phần việc một, đừng đập đi làm lại.'
  },

  'moon|mercury': {
    blend: 'Bạn nói ra mới nguôi: chưa kể xong là chưa xử lý xong. Bạn nhớ cảm xúc rất kỹ, và hay nhắn tin dài. Nên nuôi vài kênh xả đều đặn, vì nén lại là bạn mất ngủ.',
    flow: 'Bạn gọi tên được cảm giác của mình, đó là lợi thế lớn hơn nó nghe. Hãy dùng nó để làm cầu cho người khác - bạn diễn đạt hộ họ cái họ không nói được.',
    tense: 'Cảm xúc và lý lẽ của bạn tranh nhau: đang xúc động thì nói hớ, hoặc phân tích cảm giác tới mức không còn cảm. Việc nên làm: tin nhắn viết lúc đang nóng thì để qua mười phút hãy gửi.',
    awkward: 'Bạn cảm rõ mà gọi tên không nổi, nên hay bực vì không nói được ý mình. Viết ra trước, nói sau - đó là cách gỡ nút của góc này.'
  },
  'moon|venus': {
    blend: 'Bạn dịu và dễ thương thật, người ta thấy ấm khi ở gần. Bạn cũng rất cần được dỗ, và dễ dùng đồ ngon hay đồ đẹp để tự dỗ. Cứ dỗ, chỉ đặt trước một mức.',
    flow: 'Bạn biết mình cần gì để thấy được thương, và xin được điều đó mà không phải làm to chuyện. Đây là nền tốt cho quan hệ dài - hãy nói nhu cầu của mình sớm, nó hiệu quả với bạn.',
    tense: 'Cái bạn cần và cái bạn thích không trùng nhau, nên bạn hay chọn người làm mình say rồi thấy không an toàn, hoặc chọn người an toàn rồi thấy nhạt. Việc nên làm: viết ra ba điều bạn thật sự cần trong một quan hệ, rồi đối chiếu thay vì nghe cảm giác lúc đầu.',
    awkward: 'Nhu cầu và sở thích của bạn hơi vướng nhau, nên trong tình cảm bạn cứ phải điều chỉnh. Chuyện đó bình thường ở góc này - đừng đọc nó thành chọn sai người.'
  },
  'moon|mars': {
    blend: 'Cảm xúc của bạn có lửa: thương thì thương dữ, giận thì giận nhanh. Phản xạ đầu tiên khi thấy bị đe doạ là phản công. Hãy cho cơ thể một chỗ đốt mỗi ngày, nó hạ nhiệt cả tính bạn.',
    flow: 'Bạn bảo vệ được mình và người mình thương mà không phải nổ. Đây là sức bền cảm xúc thật - việc nào cần một người giữ được bình tĩnh trong lúc rối thì rất hợp bạn.',
    tense: 'Bạn giận trước khi hiểu mình đang buồn, rồi hối. Thường có một nếp cãi vã từ thời nhỏ bạn đang lặp lại. Việc cụ thể: khi thấy nóng lên, hỏi mình đang buồn chuyện gì trước khi mở miệng - câu đó cắt được phần lớn các cơn.',
    awkward: 'Cảm xúc và hành động của bạn lệch nhịp: lúc cần nói thì im, lúc không cần thì bật. Chỉnh dần bằng cách nói sớm hơn một nhịp, đừng đợi chịu hết được.'
  },
  'moon|jupiter': {
    blend: 'Bạn rộng lòng và cho đi rất thoải mái, ở gần bạn người ta thấy được đỡ. Cũng dễ ăn uống hay tiêu pha để dỗ mình, và dễ hứa hơi rộng khi đang xúc động.',
    flow: 'Bạn có cảm giác đời đỡ mình, nên hồi lại sau cú sốc nhanh hơn người khác. Hãy dùng nó làm chỗ tựa cho người quanh bạn - đó là chỗ bạn giàu nhất.',
    tense: 'Bạn phóng to cảm xúc của mình: buồn thì thành cả một bầu trời, vui thì hứa cả thế giới. Dễ cho đi quá tay rồi thấy trống. Việc nên làm: đợi qua một đêm trước khi quyết bất cứ gì lúc đang xúc động.',
    awkward: 'Nhu cầu an toàn và lòng muốn mở rộng của bạn hơi so le. Mỗi lần thấy lệch thì chỉnh một chút, đừng bắt mình chọn giữa yên ổn và đi xa.'
  },
  'moon|saturn': {
    blend: 'Bạn tự học cách nén từ sớm, và thường không cho mình cái quyền được cần người khác. Bạn chịu đựng giỏi hơn gần như mọi người. Việc đáng làm nhất: nói ra một nhu cầu nhỏ mỗi tuần với một người bạn tin, chỉ để tập.',
    flow: 'Bạn có một cái nền cảm xúc vững: không dễ sập, không cần ai vỗ về liên tục. Hãy làm chỗ dựa cho người khác, nhưng nhớ là bạn cũng được phép dựa.',
    tense: 'Bạn thấy cần người mà lại sợ cần, nên rút ra đúng lúc lẽ ra nên tới gần. Thường có một người lớn thời nhỏ đã không có mặt khi bạn cần. Việc nên làm: khi muốn rút, hãy nhắn một câu thay vì im hẳn - chỉ một câu cũng đủ đổi hướng.',
    awkward: 'Cảm xúc và trách nhiệm của bạn vướng nhau, nên hay thấy tội lỗi vì có nhu cầu. Chỉnh dần và nhớ rằng cần người không phải một món nợ.'
  },
  'moon|uranus': {
    blend: 'Tâm trạng bạn đổi theo đợt và đổi nhanh, chính bạn cũng không đoán được. Bạn cần khoảng riêng nhiều hơn người ta tưởng. Hãy nói trước nhu cầu đó, đừng để nó bật ra thành biến mất một hôm.',
    flow: 'Bạn thích nghi tốt về mặt cảm xúc: hoàn cảnh đổi thì bạn xoay được. Đây là lợi thế trong việc và trong di chuyển - đừng tự buộc mình vào một nếp cố định.',
    tense: 'Phần cần an toàn và phần cần tự do trong bạn kéo nhau: vừa yên ổn là bạn muốn bỏ đi, vừa đi xa là bạn muốn về. Việc nên làm: dựng một nền ổn định rồi chủ động chừa trong đó chỗ để thay đổi, thay vì đập cả nền mỗi lần bồn chồn.',
    awkward: 'An toàn và tự do của bạn không khớp sẵn, nên bạn hay thấy mình bất an không rõ nguyên do. Mỗi giai đoạn chỉnh lại một lần là đủ.'
  },
  'moon|neptune': {
    blend: 'Bạn thấm cảm xúc của người xung quanh rất nhanh rồi tưởng là của mình. Trực giác bạn nhạy, giấc mơ bạn rõ. Câu hỏi đáng tập cả đời: cảm giác này của mình hay của người mình vừa gặp.',
    flow: 'Bạn cảm được người khác mà không mất mình - đó là chất liệu của nghề chăm người và nghề nghệ thuật. Hãy đặt nó vào chỗ có ích thật, đừng để nó chỉ chảy vô định.',
    tense: 'Ranh giới cảm xúc của bạn rò: bạn gánh hộ tâm trạng người khác, dễ bị thương, và dễ trốn vào mộng khi khó. Việc nên làm: mỗi ngày một khoảng im lặng không màn hình, và học nói không mà không phải giải thích dài.',
    awkward: 'Cảm xúc và trực giác của bạn hơi lệch pha, nên bạn khó tin vào cái mình cảm. Ghi lại rồi đối chiếu sau - đó là cách bạn dần tin được chính mình.'
  },
  'moon|pluto': {
    blend: 'Bạn cảm sâu và nặng, hiếm khi cảm nhẹ. Những mối thân thiết của bạn có sức đổi cả con người bạn. Chỗ dễ vỡ là ghen và kiểm soát - hãy chọn một hai người để nói thật, nó xả được rất nhiều.',
    flow: 'Bạn chịu được chuyện nặng về mặt cảm xúc và đi ra khác hẳn sau mỗi lần. Đây là sức mà nghề trị liệu hay xử lý khủng hoảng rất cần.',
    tense: 'Bạn sợ mất người mình thương tới mức siết, hoặc gặp những người siết bạn. Thường có một mất mát hoặc một mối quyền lực từ thời nhỏ còn đang dội lại. Việc nên làm: gọi tên nỗi sợ ra thành lời với đúng một người - vùng này chỉ dịu khi được nói.',
    awkward: 'Cảm xúc và phần sâu trong bạn không vừa nhau, nên nó hay bật ra lệch chỗ hoặc bật ra muộn. Đi vào nó có người đi cùng thì dễ hơn tự gánh im lặng.'
  },
  'moon|northNode': {
    blend: 'Hướng trưởng thành của bạn nằm đúng ở chỗ bạn cần cho an toàn, nên lớn lên với bạn là chuyện chăm phần bên trong chứ không phải chinh phục bên ngoài.',
    flow: 'Phần cảm xúc của bạn đỡ cho con đường của bạn, nên bạn lớn lên bằng cách nghe mình chứ không phải cưỡng mình. Cứ tin cảm giác, nó đang chỉ đúng hướng.',
    tense: 'Thứ làm bạn thấy an toàn lại chính là thứ giữ bạn lại, nên mỗi bước lớn lên đều kéo theo chút bất an. Việc nên làm: đi tiếp dù thấy chưa yên, và nhớ rằng bất an ở đây là dấu đang đúng hướng, không phải dấu nguy.',
    awkward: 'Nhu cầu cảm xúc và hướng đi của bạn chưa khớp, nên bạn cứ phải dỗ mình để bước. Chỉnh dần là được, không cần dẹp nhu cầu nào.'
  },
  'moon|southNode': {
    blend: 'Bạn có một chỗ quen để quay về mỗi lần khó, quen tới mức gần như phản xạ. Nó đỡ bạn thật, nhưng ở đó lâu thì không gì đổi - hãy nhận ra lúc mình đang lui về.',
    flow: 'Phần thạo của bạn làm bạn dễ chịu, nên bạn ít khi phải tự ép. Giữ nó làm nền và nhớ rằng dễ chịu không phải đích.',
    tense: 'Lối cũ kéo bạn mạnh đúng lúc bạn đang muốn đổi, nên bạn hay quay về rồi tự giận. Việc nên làm: định trước một việc khác để làm khi cơn muốn lui về tới, và làm đúng việc đó.',
    awkward: 'Chỗ quen và chỗ cần đến của bạn vướng nhau. Đừng dẹp chỗ quen - hãy mang nó sang hình dạng mới.'
  },
  'moon|asc': {
    blend: 'Tâm trạng bạn hiện hết ra mặt, người khác đọc được bạn trước khi bạn kịp nhận ra. Dễ gần một cách tự nhiên, nhưng không có lớp che nào. Hãy nói ngắn về tâm trạng mình, vì giấu thì không được.',
    flow: 'Bạn và cảm xúc của bạn hoà với nhau nên trông bạn thật và dễ tin. Gặp mặt trực tiếp là thế mạnh của bạn.',
    tense: 'Vẻ ngoài và cảm xúc của bạn lệch nhau: trông bình thản lúc đang rối, hoặc trông khó gần lúc đang muốn gần. Việc bù: nói ra, đừng trông vào biểu hiện để nói hộ mình.',
    awkward: 'Người ta hay đọc tâm trạng bạn sai một chút, nên bạn phải sửa lại ấn tượng hơi thường xuyên. Cứ sửa, và đừng suy ra rằng mình khó hiểu.'
  },
  'moon|mc': {
    blend: 'Việc bạn làm và phần bên trong bạn dính nhau: nghề nuôi được cảm xúc thì bạn sống tốt, nghề chỉ nuôi cái lịch thì bạn cạn nhanh. Đáng để tính khi chọn việc.',
    flow: 'Công việc của bạn đỡ được phần bên trong, nên bạn làm mà vẫn giữ được mình. Hãy chọn nơi làm việc có không khí dễ thở - với bạn đó là điều kiện, không phải thứ xa xỉ.',
    tense: 'Nhu cầu cảm xúc và tham vọng của bạn kéo nhau: dồn cho việc rồi thấy trống, chăm phần riêng rồi thấy mình chậm. Việc nên làm: định trước mỗi tuần một khoảng cho nhà và giữ đúng khoảng đó, như giữ một cuộc họp.',
    awkward: 'Phần bên trong và con đường nghề của bạn hơi so le, nên bạn hay thấy làm đúng mà vẫn chưa ổn. Chỉnh từng phần việc, đừng đập đi làm lại.'
  }
};
