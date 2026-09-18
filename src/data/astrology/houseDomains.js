// Mười hai nhà - đoạn giải nghĩa sâu bằng tiếng Việt.
//
// HOUSES trong astrologyData.js chỉ giữ một cụm từ khoá ("cha mẹ, mái nhà,
// gốc rễ, ký ức tuổi thơ") vì cụm đó phải dùng chung cho cả ba ngôn ngữ và
// phải ghép được vào câu. Chỗ này viết dài hơn để trả lời đúng câu khách hay
// hỏi: nhà này thật ra nói về chuyện gì trong đời sống, và nhìn vào đâu thì
// thấy nó.
//
// scope  = vùng đời sống nhà này quản, nói cho cụ thể.
// empty  = nhà trống thì nghĩa là gì - câu hỏi bị hỏi nhiều nhất và cũng là
//          chỗ khách dễ tự suy diễn xấu nhất nếu không ai nói rõ.

export const HOUSE_DEEP_VI = {
  1: {
    scope: 'Nhà 1 là cái cửa: thân thể bạn, nét mặt, dáng đi, tốc độ nói, và phản xạ đầu tiên của bạn khi gặp chuyện lạ. Nó không nói bạn là ai bên trong, nó nói cách bạn đi vào thế giới và cách thế giới đọc bạn trong ba mươi giây đầu.',
    empty: 'Nhà 1 không có hành tinh nào là chuyện rất thường. Khi đó lớp vỏ của bạn được mô tả bằng cung Mọc và bằng chủ tinh lá số đang đứng ở đâu, chứ không mất đi phần nào cả.'
  },
  2: {
    scope: 'Nhà 2 là những gì thuộc về bạn và chỉ bạn: tiền tự kiếm, đồ đạc, kỹ năng bán được, và cái cảm giác bao nhiêu thì gọi là đủ. Nó cũng đo lòng tự trọng theo nghĩa rất thật - bạn có tin mình đáng được trả công tử tế hay không.',
    empty: 'Nhà 2 trống không có nghĩa là thiếu tiền. Nó thường nghĩa là chuyện của cải không phải sân khấu chính của đời bạn, và bạn xử lý nó theo phong cách của cung nằm ở đỉnh nhà này.'
  },
  3: {
    scope: 'Nhà 3 là vòng gần: anh chị em, hàng xóm, đồng nghiệp cùng phòng, những chuyến đi trong ngày, việc học ngắn, tin nhắn và cách bạn diễn đạt. Đây là nhà của thông tin đi vào và đi ra, và của những mối quan hệ bạn không chọn nhưng gặp hằng ngày.',
    empty: 'Nhà 3 trống thì việc nói và học của bạn được đọc qua Sao Thuỷ đang ở đâu. Trống ở đây không nói gì về việc bạn khéo hay không khéo.'
  },
  4: {
    scope: 'Nhà 4 là móng: cha mẹ, mái nhà, quê gốc, những gì bạn mang theo từ tuổi thơ mà không ai dạy. Nó cũng là nơi bạn lui về khi mệt, và là phần đời sống không ai ngoài kia nhìn thấy.',
    empty: 'Nhà 4 trống thường thấy ở người có đời sống hướng ra ngoài. Phần gốc rễ khi đó đọc qua Mặt Trăng và qua cung ở đỉnh nhà 4.'
  },
  5: {
    scope: 'Nhà 5 là chỗ bạn chơi: tình yêu lãng mạn ở giai đoạn còn say, con cái, sáng tác, biểu diễn, cá cược, và mọi việc bạn làm chỉ vì thích. Nhà này trả lời câu bạn vui bằng cách nào, một câu hỏi thực dụng hơn nó nghe.',
    empty: 'Nhà 5 trống không có nghĩa là bạn không có duyên hay không có con. Nó nghĩa là niềm vui và sáng tạo của bạn không phải trục chính của lá số, và thường tới qua những nhà khác.'
  },
  6: {
    scope: 'Nhà 6 là đời thường: công việc hằng ngày chứ không phải sự nghiệp, thói quen, giờ ngủ, bữa ăn, cơ thể, và cả những việc bạn làm giúp người khác mà không ai ghi công. Rất nhiều chất lượng cuộc sống thật nằm ở nhà này chứ ở nhà 10.',
    empty: 'Nhà 6 trống thường là dấu hiệu việc thường ngày chạy khá êm, hoặc bạn không để tâm nhiều tới nó. Sức khoẻ vẫn đọc được qua Mặt Trăng, Sao Hoả và cung ở đỉnh nhà 6.'
  },
  7: {
    scope: 'Nhà 7 là người đứng đối diện: vợ chồng, người yêu lâu dài, đối tác làm ăn, luật sư của bạn - và cả đối thủ công khai, vì cả hai đều là một người bạn phải nhìn vào mắt. Nhà này cho biết bạn bị hút vào kiểu người nào và bạn học được gì từ họ.',
    empty: 'Nhà 7 trống rất phổ biến và không nói gì về chuyện bạn có kết hôn hay không. Kiểu người bạn bị hút vào khi đó đọc qua cung Lặn và qua Sao Kim.'
  },
  8: {
    scope: 'Nhà 8 là chỗ hai người chạm nhau ở phần không có gì che: tiền góp chung, nợ, thừa kế, bảo hiểm, sự thân mật thật, và những lần đời bạn sập rồi dựng lại. Đây là nhà nặng nhất, và cũng là nhà cho bạn sức chịu đựng.',
    empty: 'Nhà 8 trống thường nghĩa là đời bạn ít phải đi qua những khúc lột xác kiểu ấy - đó là tin tốt, không phải thiếu sót.'
  },
  9: {
    scope: 'Nhà 9 là tầm xa: đi nước ngoài, học cao, tôn giáo, triết, luật, xuất bản, và cái hệ giá trị bạn dùng để quyết định điều gì là đúng. Nếu nhà 3 là thông tin thì nhà 9 là ý nghĩa bạn gán cho thông tin đó.',
    empty: 'Nhà 9 trống thì niềm tin và việc học của bạn đọc qua Sao Mộc. Nhiều người có nhà 9 trống vẫn đi rất nhiều - nhà này nói về ý nghĩa nhiều hơn về số dấu hộ chiếu.'
  },
  10: {
    scope: 'Nhà 10 là phần đời của bạn nằm ngoài sáng: nghề nghiệp, chức vụ, danh tiếng, người có quyền đánh giá bạn, và câu trả lời cho câu bạn làm gì. Nó cũng nói về thứ bạn muốn được nhớ tới sau khi đã đi.',
    empty: 'Nhà 10 trống không nghĩa là không có sự nghiệp. Hướng nghề khi đó đọc qua Thiên Đỉnh và qua chủ tinh của cung ở Thiên Đỉnh - thường còn rõ hơn một hành tinh đứng lẻ ở đây.'
  },
  11: {
    scope: 'Nhà 11 là tập thể bạn tự chọn: bạn bè, hội nhóm, đồng nghiệp cùng chí hướng, cộng đồng nghề, và những ước mơ dài hạn chưa thành hình. Rất nhiều cơ hội trong đời người đi qua nhà này, dưới dạng một người quen giới thiệu.',
    empty: 'Nhà 11 trống thường thấy ở người thân với ít người nhưng thân sâu. Không phải thiếu bạn, chỉ là bạn bè không phải trục chính của lá số.'
  },
  12: {
    scope: 'Nhà 12 là phần dưới mặt nước: giấc mơ, nỗi sợ không tên, những chuyện cũ chưa xử lý, khoảng lặng bạn cần để hồi lại, và cả những việc bạn làm cho người khác mà không muốn ai biết. Nó cũng là nhà của những gì bạn giấu cả chính mình.',
    empty: 'Nhà 12 trống là chuyện tốt theo nghĩa thực dụng: ít gánh ngầm, ít nút cũ phải gỡ. Phần bên trong khi đó đọc qua Hải Vương và qua cung ở đỉnh nhà 12.'
  }
};
