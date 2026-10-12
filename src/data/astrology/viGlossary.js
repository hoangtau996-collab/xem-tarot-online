// Phần "dễ hiểu" của bản luận giải tiếng Việt.
//
// Vì sao cần: trang này in ra hàng loạt thuật ngữ mà một người mới chưa gặp
// bao giờ - orb, miếu vượng hãm rơi, bán cầu, Điểm Phúc, hệ chia nhà. Trước
// đây mỗi thứ chỉ có một dòng gợi ý, nên khách đọc xong vẫn không biết con số
// đó nói gì về mình, và tệ hơn là dễ tự suy diễn theo hướng xấu ("hãm" nghe
// như điềm gở, trong khi nó chỉ là một vị trí kỹ thuật).
//
// Mỗi mục là một khối gấp lại được, đặt ngay cạnh phần nó giải thích, chỉ hiện
// khi ngôn ngữ là tiếng Việt. Văn viết như trả lời một người bạn hỏi thật,
// không phải như từ điển.

import { TERM_TABLE_VI } from './viDepth.js';

/* Khối giải thích theo từng mục trên trang. Khoá trùng với tên mục trong
   Astrology.jsx để đặt đúng chỗ. */
export const ASTRO_GUIDE_VI = {
  terms: {
    title: 'Đối chiếu thuật ngữ Việt - Anh',
    body: [
      'Chiêm tinh học này là hệ phương Tây, nên gần như mọi tài liệu gốc đều bằng tiếng Anh. Chúng tôi dùng chữ tiếng Việt dễ hiểu ở nhãn chính và để thuật ngữ gốc trong ngoặc, để bạn tra tiếp được mà không phải đoán.',
      'Một lưu ý nhỏ về chữ nghĩa: trước đây nhiều bản dịch tiếng Việt mượn từ của tử vi Đông phương - miếu, vượng, hãm, rơi, giao hội, tam phân. Những chữ đó không sai, nhưng chúng gợi liên tưởng tốt xấu khá nặng và không có trong hệ phương Tây. Bản này nói thẳng nghĩa kỹ thuật thay vì mượn chữ.'
    ],
    table: TERM_TABLE_VI
  },
  bigThree: {
    title: 'Ba trụ là gì, và vì sao ba cái chứ không phải một',
    body: [
      'Người ta hay hỏi cung của bạn là gì và chờ một câu trả lời duy nhất. Thật ra một lá số cần ít nhất ba mốc mới ra hình người.',
      'Mặt Trời là hướng bạn đang đi tới - con người bạn trở thành khi được sống đúng ý mình. Đây là cung mà ai cũng biết, tính theo ngày sinh.',
      'Mặt Trăng là con người bạn khi không có ai nhìn: bạn cần gì để thấy an toàn, bạn dỗ mình bằng cách nào. Nó đổi cung khoảng hai ngày rưỡi một lần nên cần ngày sinh chính xác, và có giờ sinh thì chắc hơn nhiều.',
      'Cung Mọc là lớp người khác gặp trước tiên - cách bạn bước vào một căn phòng. Nó đổi khoảng hai giờ một lần, nên không có giờ sinh thì không tính được, và đó là lý do chúng tôi hỏi giờ.',
      'Khi ba mốc này lệch nhau, bạn sẽ thấy quen: đó chính là cảm giác bên trong mình khác với cái người ta thấy.'
    ]
  },

  wheel: {
    title: 'Đọc vòng bản đồ sao thế nào cho đỡ hoa mắt',
    body: [
      'Vòng ngoài là mười hai cung hoàng đạo, chia đều mỗi cung ba mươi độ. Đó là bối cảnh, không phải nội dung.',
      'Các ký hiệu nằm trong vòng là hành tinh, đặt đúng vào chỗ chúng ở trên trời vào lúc bạn sinh. Ký hiệu nằm gần nhau nghĩa là hai hành tinh đó đang dính nhau và cùng lên tiếng một lúc.',
      'Mười hai ô hình nan quạt là mười hai nhà, tức mười hai vùng đời sống. Nhà chỉ dựng được khi có giờ sinh.',
      'Những đường kẻ vắt qua giữa vòng là góc chiếu - quan hệ giữa hai hành tinh. Đường xanh lá và xanh lam là quan hệ thuận, đường đỏ và hồng là quan hệ căng.',
      'Một mẹo đọc nhanh: chỗ nào trên vòng có nhiều ký hiệu chen chúc thì đó là vùng đời sống đang được dồn sức nhất, còn nửa vòng trống trải là vùng bạn ít để tâm.'
    ]
  },

  planets: {
    title: 'Mười hai ký hiệu này ai làm việc gì',
    body: [
      'Ba hành tinh nhanh là phần đời thường: Sao Thuỷ lo nghĩ và nói, Sao Kim lo yêu và hưởng thụ, Sao Hoả lo hành động và nổi nóng. Chúng đổi cung trong vài tuần nên rất riêng cho từng người.',
      'Hai hành tinh xã hội quyết định nhịp đời: Sao Mộc chỉ chỗ mọi thứ mở ra dễ dàng, Sao Thổ chỉ chỗ phải tự tay xây và trả giá bằng thời gian. Đọc cặp này trước nếu bạn đang phải chọn nên đặt cược vào đâu.',
      'Ba hành tinh ngoài đi rất chậm - Thiên Vương bảy năm một cung, Hải Vương mười bốn năm, Diêm Vương tới hai mươi năm. Cung của chúng nói về cả một thế hệ chứ không riêng bạn, nên phần riêng của bạn nằm ở NHÀ chúng đứng, không ở cung.',
      'Hai nút Mặt Trăng không phải thiên thể, chúng là hai điểm giao nhau của quỹ đạo. Nút Bắc là hướng còn lạ mà bạn cần bước vào, Nút Nam là vốn sẵn có mà bạn dễ mắc kẹt trong đó.',
      'Ký hiệu ℞ nghĩa là nghịch hành - hành tinh trông như đi lùi khi nhìn từ Trái Đất. Nó không phải điềm xấu, chỉ nghĩa là năng lượng đó hướng vào trong và cần thời gian lâu hơn mới ra ngoài được.'
    ]
  },

  houses: {
    title: 'Nhà khác cung ở chỗ nào',
    body: [
      'Cung trả lời câu bạn làm chuyện đó theo phong cách nào. Nhà trả lời câu chuyện đó xảy ra ở đâu trong đời bạn.',
      'Ví dụ cho dễ thấy: Sao Kim ở Bảo Bình nghĩa là bạn yêu theo kiểu thoáng và cần khoảng riêng - đó là phong cách. Sao Kim ở nhà 10 nghĩa là chuyện tình cảm và duyên với người diễn ra quanh công việc - đó là địa điểm. Hai cái cộng lại mới thành một câu dùng được.',
      'Nhà có hành tinh đứng trong là vùng đời sống đang được dồn sức. Nhà trống không có nghĩa là vùng đó thiếu hay xấu - nó chỉ nghĩa là vùng đó không phải sân khấu chính, và được đọc qua cung ở đỉnh nhà cùng với hành tinh cai quản cung đó.',
      'Vì các nhà được chia từ đường chân trời tại nơi bạn sinh, chúng phụ thuộc hoàn toàn vào giờ và toạ độ. Lệch bốn phút giờ sinh là lệch khoảng một độ - chưa sao. Lệch một tiếng thì bản đồ nhà đã khác hẳn.'
    ]
  },

  aspects: {
    title: 'Góc chiếu và con số orb nghĩa là gì',
    body: [
      'Góc chiếu là khoảng cách góc giữa hai hành tinh trên vòng tròn. Vài khoảng cách nhất định được coi là có ý nghĩa: 0 độ là dính nhau, 180 độ là đối nhau, 120 độ là thuận, 90 độ là căng, 60 độ là có cơ hội.',
      'Orb là mức sai lệch còn được tính. Hai hành tinh cách nhau 88 độ thì vẫn tính là góc vuông 90 độ, với orb 2 độ. Orb càng nhỏ thì góc càng mạnh - dưới một độ là khít, và những góc khít ấy thường biểu hiện rõ rệt trong đời sống hơn hẳn số còn lại.',
      'Góc thuận không phải là tốt và góc căng không phải là xấu, dù nghe thì rất giống. Góc thuận cho bạn năng lực có sẵn nhưng ít được mài, còn góc căng là chỗ khó chịu nhưng cũng chính là động cơ - phần lớn những gì người ta làm được trong đời sinh ra từ mấy góc căng này.',
      'Bảng thường có từ mười tới ba mươi góc. Đừng đọc hết một lượt: hãy đọc trước những góc có Mặt Trời, Mặt Trăng hoặc Cung Mọc tham gia, và những góc có nhãn khít.'
    ]
  },

  patterns: {
    title: 'Hình mẫu lớn - khi ba bốn hành tinh xếp thành hình',
    body: [
      'Đôi khi các góc chiếu không đứng lẻ mà nối nhau thành một hình hoàn chỉnh. Lúc đó cả hình hoạt động như một khối, và nó nói nhiều hơn tổng các góc rời.',
      'Không phải ai cũng có hình mẫu, và không có cũng hoàn toàn bình thường - phần lớn lá số chỉ có một hai hình, nhiều lá số không có hình nào.',
      'Nếu bạn có, hãy đọc nó trước cả bảng góc chiếu: hình mẫu thường là cấu trúc rõ nhất của cả lá số, và giải thích được khá nhiều thứ trong đời bạn mà những phần khác không giải thích nổi.'
    ]
  },

  balance: {
    title: 'Mấy cái thanh phần trăm này đo cái gì',
    body: [
      'Bốn nguyên tố là bốn cách xử lý đời sống: Lửa hành động, Đất làm cho thành hình, Khí suy nghĩ và nói, Nước cảm nhận. Phần trăm cho biết bạn nghiêng về cách nào.',
      'Ba tam thể là ba cách vào việc: Khởi thì giỏi bắt đầu, Định thì giỏi giữ tới cùng, Biến thì giỏi xoay theo tình thế.',
      'Âm dương ở đây không phải nam nữ, nó là hướng nạp năng lượng: Dương nạp bằng cách bước ra ngoài, Âm nạp bằng cách rút vào trong.',
      'Con số không phải điểm thi - không có cấu hình nào tốt hơn cấu hình nào. Điều đáng dùng là chỗ lệch: nguyên tố nào trội thì bạn hay dùng nó cả ở chỗ nó không hợp, còn nguyên tố nào thiếu thì bạn phải mượn của người khác. Nhìn ra chỗ thiếu rồi chủ động bù, đó là toàn bộ giá trị thực tế của mục này.',
      'Các thanh này được tính có trọng số: Mặt Trời, Mặt Trăng và Cung Mọc nặng hơn các hành tinh còn lại, vì chúng nói nhiều hơn về bạn.'
    ]
  },

  dignity: {
    title: 'Miếu, vượng, hãm, rơi - đừng đọc thành tốt xấu',
    body: [
      'Đây là hệ thống cổ đo độ thuận tay giữa một hành tinh và cung nó đang đứng. Hãy hình dung như một người làm việc trong một căn phòng: có phòng đúng ý họ, có phòng thiếu đồ.',
      'Miếu là hành tinh đứng trong cung nó cai quản, như người làm trong phòng của mình - thoải mái nhất, không phải gồng.',
      'Vượng là không phải phòng mình nhưng cả phòng nâng nó lên - làm gì cũng dễ được ghi nhận.',
      'Hãm là đứng đối diện phòng mình, phải làm việc bằng những công cụ không quen tay. Rơi là cung này làm hành tinh mất tiếng nói.',
      'Chỗ này quan trọng: hãm và rơi không phải điềm gở và không hề nói bạn kém ở vùng đó. Nó chỉ nghĩa là vùng đó bạn phải tập nhiều hơn người khác mới tới được cùng một mức - và rất nhiều người làm rất giỏi ở đúng chỗ họ bị hãm, chính vì đã phải tập.',
      'Ba hành tinh ngoài chỉ ghi phần cai quản, vì tới nay các trường phái vẫn chưa thống nhất miếu và rơi của chúng - chúng tôi không đoán thêm vào.'
    ]
  },

  hemispheres: {
    title: 'Bán cầu - hành tinh của bạn dồn về nửa nào',
    body: [
      'Vòng bản đồ chia được làm hai theo hai cách, và chỗ các hành tinh dồn về cho biết đời bạn nghiêng ra ngoài hay vào trong.',
      'Nửa dưới là nhà 1 tới 6 - đời sống riêng, gia đình, việc tự lo. Nửa trên là nhà 7 tới 12 - xã hội, người khác, sân khấu công khai.',
      'Nửa Đông là nhà 10 tới 3 - bạn tự định đường đi. Nửa Tây là nhà 4 tới 9 - đời bạn xoay quanh người khác, và cơ hội thường tới qua quan hệ.',
      'Mục này chỉ hiện khi có một nửa rõ ràng trội hơn hẳn. Chia đều thì không có gì để nói, và đó cũng là trường hợp thường gặp.'
    ]
  },

  ruler: {
    title: 'Chủ tinh lá số và Điểm Phúc',
    body: [
      'Chủ tinh lá số là hành tinh cai quản cung Mọc của bạn. Nếu Mọc của bạn là Thiên Bình thì chủ tinh là Sao Kim, Mọc Ma Kết thì chủ tinh là Sao Thổ.',
      'Nó đáng để ý vì nó là người quản gia của cả lá số: nó đứng ở nhà nào thì trọng tâm đời bạn thật sự rơi vào đó, kể cả khi Mặt Trời của bạn nằm ở chỗ khác. Nhiều người đọc mãi không thấy đúng mình, tới lúc xem chủ tinh mới thấy khớp.',
      'Điểm Phúc không phải một thiên thể, nó là một điểm tính ra từ ba mốc Mọc, Mặt Trời và Mặt Trăng. Nó đánh dấu vùng mọi thứ đến với bạn thuận tay mà không phải gồng.',
      'Công thức của Điểm Phúc khác nhau giữa lá số ban ngày và ban đêm - ban ngày là khi Mặt Trời nằm trên đường chân trời lúc bạn sinh. Chúng tôi ghi rõ đã dùng công thức nào để bạn đối chiếu được với phần mềm khác.'
    ]
  }
};

/* Miếu vượng hãm rơi: DIGNITY_INFO trong astrologyData.js chỉ có một dòng gợi
   ý dùng chung ba ngôn ngữ. Bản tiếng Việt nói thêm phần thực dụng: vậy thì
   làm gì với nó. */
export const DIGNITY_DEEP_VI = {
  rulership: 'Đây là vùng bạn nên nhận việc và đứng ra làm, vì ở đây bạn chạy hết công suất mà không tốn sức ý chí. Cẩn thận một chỗ duy nhất: dễ tới mức bạn ít mài, rồi tưởng mình đã giỏi hết mức.',
  exaltation: 'Vùng này người khác dễ nhìn thấy và dễ ghi nhận công của bạn, nên rất đáng đặt vào chỗ có người chứng kiến - phỏng vấn, thuyết trình, một vai được giao. Nó không phải nhà mình nên vẫn cần chuẩn bị, chỉ là gió thổi cùng chiều.',
  detriment: 'Vùng này bạn làm được, chỉ là bằng công cụ không quen tay - nên tốn sức hơn và mất thời gian hơn người khác ở cùng một việc. Cách thực dụng: đừng tránh nó, nhưng hãy tính dư thời gian và mượn người giỏi vùng đó một tay.',
  fall: 'Vùng này hành tinh bị hạ giọng, nên bạn hay có cảm giác mình dở ở đây dù thực tế không hẳn vậy. Điều đáng biết: người ta thường thành thạo nhất đúng ở chỗ mình bị hạ, vì đã phải tập kỹ hơn mọi người - hãy tập có phương pháp thay vì kết luận rằng mình không có khiếu.',
  peregrine: 'Không được nâng cũng không bị ép: hành tinh làm việc đúng theo phong cách của cung, không hơn không kém. Đây là trạng thái thường gặp nhất và cũng là trạng thái dễ đọc nhất - cứ đọc thẳng phần hành tinh trong cung ở trên.'
};

/* Nghịch hành: nói rõ phần thực tế mà bản dùng chung ba ngôn ngữ không có chỗ
   để nói. */
export const RETROGRADE_DEEP_VI = 'Trong thực tế, một hành tinh nghịch hành trong lá số thường biểu hiện thế này: bạn hiểu vấn đề của vùng đó khá sâu nhưng thể hiện ra ngoài chậm, hay phải làm lại một vòng mới ổn, và thường tới tuổi ba mươi trở đi mới thật sự dùng được nó. Đây là chuyện rất phổ biến - phần lớn lá số có từ hai tới bốn hành tinh nghịch hành, riêng Sao Thuỷ nghịch hành khoảng ba lần mỗi năm.';
