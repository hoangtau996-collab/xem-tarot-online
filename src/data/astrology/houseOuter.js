// Thiên Vương, Hải Vương, Diêm Vương và hai nút Mặt Trăng trong mười hai nhà.
//
// Ba hành tinh ngoài đi rất chậm nên cung của chúng nói về cả một thế hệ, còn
// NHÀ của chúng mới là phần riêng của từng người - đây đúng là chỗ đáng viết
// tay nhất. Hai nút Mặt Trăng thì ngược lại: chúng gần như chỉ có nghĩa qua
// nhà và qua trục Bắc - Nam, nên phần này cố nói cho cụ thể hướng nào là hướng
// phải bước tới và lối mòn nào là lối cần bớt dựa vào.

export const HOUSE_TEXT_OUTER = {
  uranus: {
    1: 'Bạn khác người ngay ở lớp ngoài cùng và không giấu được điều đó - cách bạn nói, bạn mặc, bạn chọn việc đều lệch khỏi khuôn. Đời bạn hay có những lần thay đổi hình ảnh khá đột ngột. Đừng cố gọt mình cho tròn: chỗ bạn được trả tiền cao nhất chính là chỗ bạn không giống ai.',
    2: 'Thu nhập của bạn khó đều - lên xuống theo đợt, hoặc đến từ những nguồn không giống ai. Bạn cũng thấy khó chịu khi bị cột vào một chỗ chỉ vì đồng lương. Cách sống được với nó: nhiều nguồn thu nhỏ thay vì một nguồn duy nhất, cộng một quỹ dự phòng dày hơn người khác.',
    3: 'Đầu bạn bật ra ý lạ và nhảy nhanh giữa các chủ đề, người nghe hay không theo kịp. Bạn học theo kiểu tự học, nhảy chương, chán hệ thống tuần tự. Hãy để nó tự do nhưng ghi lại - những ý tưởng của bạn có giá trị thật, chỉ cần một chỗ lưu tử tế để chúng không bay mất.',
    4: 'Nhà của bạn không theo khuôn thường: chuyển chỗ nhiều, gia đình có cấu trúc riêng, hoặc bạn là người trong nhà phá lệ đầu tiên. Bạn cần một chỗ ở nhưng không chịu được cảm giác bị chôn chân. Điều thực tế: chọn nơi ở nào cho bạn dễ đổi khi cần, và nếu bạn là người khác biệt trong nhà thì cứ khác - nhà bạn rồi sẽ nới ra theo.',
    5: 'Bạn sáng tạo theo hướng không ai đoán được, và trong tình cảm thì bạn cần không gian nhiều hơn lời hứa. Bạn dễ bị hút vào những người khác thường. Đáng dùng nhất: tìm một nghề hoặc một thú vui cho phép bạn thử cái chưa ai thử, vì phần bốc đồng ấy nếu không có sân thì nó sẽ tìm sang chuyện tình cảm.',
    6: 'Bạn không sống nổi với một ngày giống hệt ngày hôm qua - lịch cố định làm bạn tắt dần. Bạn lại rất giỏi tìm cách làm mới một quy trình cũ. Vậy thì chọn kiểu làm việc linh hoạt, làm theo dự án hoặc tự do, và nhớ rằng cơ thể bạn cũng phản ứng theo cảm giác bị giam - đổi nhịp một chút là đỡ.',
    7: 'Bạn cần tự do bên trong một mối quan hệ, và quan hệ ràng buộc quá chặt làm bạn bật ra. Người đến với bạn thường tới bất ngờ, và quan hệ của bạn có thể đổi hình dạng giữa đường. Cách giữ được: nói thẳng nhu cầu khoảng riêng của mình từ đầu, thay vì chịu đựng rồi biến mất một hôm.',
    8: 'Những khúc quanh lớn của đời bạn đến đột ngột và thường liên quan tới tiền chung hoặc một mối thân mật. Bạn cũng không sợ mấy những chuyện người khác né. Việc phòng thân rất nên làm: giữ tài chính của mình độc lập ở mức nhất định, để một cú bất ngờ không cuốn hết.',
    9: 'Bạn không nhận một hệ giá trị chỉ vì nó có sẵn - bạn tự tra, tự thử, rồi tự kết luận. Đời bạn dễ có một lần quay ngoặt về niềm tin hoặc một chuyến đi đổi hẳn cách nghĩ. Cứ cho phép mình đổi ý khi có dữ kiện mới, và tìm chỗ học nào không bắt bạn nhắc lại đúng lời thầy.',
    10: 'Đường nghề của bạn không thẳng: đổi hướng giữa đường, làm nghề chưa có tên, hoặc lên bằng cách đi cửa khác. Bạn khó ngồi lâu trong một cơ cấu có tôn ti chặt. Hãy nhắm vào chỗ thị trường đang đổi - với nhà 10 kiểu này, sự nghiệp của bạn dựng trên cái mới chứ không trên bậc thang có sẵn.',
    11: 'Bạn thuộc về những nhóm khác thường và thường là người kéo cả nhóm đi trước thời của nó. Bạn bè bạn đa dạng tới mức khó gom vào một bàn. Đây là vùng mạnh của bạn: hãy đi tìm những người đang làm cái mới, vì cơ hội của bạn tới từ tập thể chứ không từ một cá nhân đỡ đầu.',
    12: 'Phần tự do nhất trong bạn nằm ở chỗ ẩn: bạn có những ý rất riêng mà không nói ra, và bạn hay bất an không rõ nguyên do. Bạn cũng dễ tỉnh ngộ đột ngột về một chuyện mình đã tin nhiều năm. Việc nên làm là cho nó đường ra kín đáo - viết, làm nghệ thuật, ở một mình có chủ đích - đừng đợi nó bật ra bằng một quyết định gấp.'
  },

  neptune: {
    1: 'Người ta thấy bạn mờ mờ và hay tự điền vào chỗ trống - mỗi người đọc bạn một kiểu khác nhau. Bạn có sức hút dịu và dễ hoà theo không khí xung quanh. Việc thực dụng: nói rõ mình là ai và mình làm gì, càng cụ thể càng tốt, vì nhà 1 này không tự phát ra thông tin đó.',
    2: 'Chuyện tiền của bạn dễ mờ: không rõ còn bao nhiêu, dễ cho, dễ bị lợi dụng, hoặc thu nhập đến từ những việc khó đo. Bạn cũng không đặt giá cho công sức mình đúng mức. Việc cần làm gần như là việc bắt buộc: ghi chép thu chi đều đặn và có một người khách quan nhìn hộ các hợp đồng.',
    3: 'Bạn nói bằng hình ảnh và ẩn ý nhiều hơn bằng dữ kiện, nên có duyên kể chuyện nhưng cũng dễ bị hiểu sai. Bạn nghe ra cả những gì người ta không nói. Một mẹo đỡ nhiều: chốt lại bằng văn bản sau mỗi cuộc trao đổi quan trọng, chỉ vài dòng thôi.',
    4: 'Ký ức về nhà của bạn có sương mù: bạn khó dựng lại rõ ràng chuyện đã xảy ra, hoặc trong nhà có điều không ai nói thẳng. Bạn cần một chỗ ở êm và yên, gần nước thì càng dễ chịu. Điều tử tế nên làm: chấp nhận rằng có thể bạn không bao giờ biết hết chuyện cũ, và vẫn sống tốt được với chỗ trống đó.',
    5: 'Bạn yêu bằng tưởng tượng và dễ dựng người mình yêu thành một bức tranh đẹp hơn họ thật. Bạn có tài nghệ thuật rõ, đặc biệt ở nhạc, phim, thơ, hình ảnh. Hãy đổ phần mộng ấy vào việc sáng tác thay vì vào một người, rồi đợi đủ lâu để thấy người kia đúng như họ là.',
    6: 'Bạn khó chịu được môi trường làm việc căng, và cơ thể bạn phản ứng với căng thẳng sớm hơn người khác - mệt không rõ lý do, thuốc tác dụng mạnh hơn liều thường. Bạn làm việc bằng cảm nhận, không bằng quy trình. Nên chọn nơi làm việc êm, ngủ đủ và nói với bác sĩ rằng bạn nhạy với thuốc.',
    7: 'Bạn dễ lý tưởng hoá người bên cạnh, rồi thất vọng khi họ chỉ là người bình thường. Bạn cũng dễ gặp những người cần được cứu, và bạn nhận vai cứu đó khá nhanh. Bài tập đáng làm cả đời: sau ba tháng đầu, viết ra những gì bạn thật sự biết về họ - chỉ dữ kiện, không suy diễn.',
    8: 'Bạn rất dễ thấm những gì thuộc tầng sâu: trực giác về người khác của bạn mạnh, đôi khi đúng tới mức khó giải thích. Đổi lại tiền chung là vùng dễ mờ nhất của bạn. Nguyên tắc thực tế: mọi chuyện tiền với người khác đều phải có giấy, kể cả với người thân nhất, và đọc kỹ trước khi ký.',
    9: 'Bạn cần một điều gì lớn hơn mình để tin, và tâm linh với bạn không phải trang trí. Bạn cũng dễ theo một người dạy quá nhanh, hoặc nhận cả một hệ thống mà chưa kiểm. Cách giữ mình: cứ đi sâu, nhưng để một phần lý trí đứng ngoài canh cửa, và cẩn thận với bất cứ ai đòi bạn phải tin tuyệt đối.',
    10: 'Bạn khó nói gọn mình làm nghề gì, và sự nghiệp bạn hay đi theo tiếng gọi hơn theo bậc thang. Bạn làm tốt ở những nghề dính tới hình ảnh, chăm sóc, nghệ thuật, hoặc tâm linh. Việc nên đầu tư: một cách giới thiệu bản thân thật rõ và một hồ sơ việc đã làm, vì đó là chỗ nhà 10 này yếu nhất.',
    11: 'Bạn bị hút vào những nhóm có lý tưởng, và bạn cho đi trong nhóm rất nhiều. Cũng chính vì thế bạn dễ bị dùng, hoặc dễ tan vào một tập thể tới mức mất tiếng nói riêng. Hãy chọn nhóm bằng cách xem họ đối xử với người ít quyền lực nhất, đó là phép thử tốt nhất cho bạn.',
    12: 'Đây là nhà riêng của Hải Vương: đời sống bên trong của bạn rộng, giấc mơ rõ, trực giác nhạy, và bạn cần khoảng lặng như cần khí. Bạn cũng dễ chìm - vào mơ mộng, vào buồn không tên, vào những thứ giúp bạn trốn. Việc quan trọng nhất là có một nếp đều đặn để đi vào phần ấy có chủ đích: thiền, viết, cầu nguyện - và một người ngoài để neo bạn lại.'
  },

  pluto: {
    1: 'Bạn có sức nặng mà không cần lên giọng - người ta hoặc rất tin bạn hoặc hơi dè bạn. Đời bạn thường có một hai lần lột xác đến mức người cũ gặp lại không nhận ra. Cứ nhận lấy sức đó và dùng cho tử tế: với nhà 1 này, bạn không thể sống nhạt được, nên chọn sẵn xem mình muốn nặng về phía nào.',
    2: 'Tiền với bạn dính vào chuyện quyền lực và sinh tồn, không chỉ chuyện mua bán. Bạn có thể đi qua một lần mất trắng hoặc một lần đổi hoàn toàn cách kiếm sống. Điều đáng làm: tách cảm giác giá trị bản thân ra khỏi con số tài sản, vì con số ấy trong lá số bạn không nằm yên.',
    3: 'Lời bạn nói có sức nặng hơn bạn tưởng - nói thật thì chữa được người, nói sắc thì cắt được người. Bạn thích đi tới đáy một chủ đề, và đọc được động cơ phía sau câu nói của người khác. Hãy chọn nghề dùng tới sự sắc sảo ấy, và nhớ rằng với nhà 3 này thì một câu buột miệng có thể để lại dấu rất lâu.',
    4: 'Gốc gia đình bạn có gì đó nặng, có thể là một bí mật, một mất mát hoặc một mối quyền lực ngột ngạt. Bạn là người trong nhà nhìn thẳng vào chuyện đó. Phần việc của bạn là cắt vòng lặp - không phải bằng cách cắt người, mà bằng cách không làm lại điều đã làm mình đau.',
    5: 'Bạn yêu mãnh liệt và không biết yêu nửa vời; tình cảm của bạn hay có phần sống chết. Sáng tạo của bạn cũng đi tới chỗ người khác không dám. Điều nên biết trước: những quan hệ của bạn thường biến đổi bạn, nên hãy chọn người xứng với sức đó, và giữ một sân sáng tạo để trút phần mãnh liệt vào.',
    6: 'Bạn làm việc với cường độ cao và không chịu được kiểu làm nửa chừng. Đời bạn dễ có một lần đổi nghề tận gốc, hoặc một đợt sức khoẻ bắt bạn thay hết cách sống. Cách đi trước một bước: đổi nếp sống khi còn được chọn, thay vì đợi cơ thể ra lệnh.',
    7: 'Quan hệ là nơi bạn thay đổi nhiều nhất: có những người đi qua đời bạn và để lại một bạn khác hẳn. Bạn cũng dễ vào những mối có giằng kéo về quyền lực, ai nắm phần hơn. Bài tập rõ ràng: khi thấy mình đang muốn nắm chặt hoặc đang chịu nắm, hãy gọi tên nó ra - vùng này chỉ dịu đi khi được nói thẳng.',
    8: 'Đây là nhà riêng của Diêm Vương: bạn chịu được những chuyện nặng mà người khác gãy, và bạn tái sinh sau mỗi lần sập. Bạn cũng có bản năng về tiền chung, về khủng hoảng, về những gì người ta giấu. Vùng này là nghề của bạn nếu bạn muốn - trị liệu, điều tra, tài chính, xử lý khủng hoảng - miễn là bạn chăm lấy mình sau mỗi lần đi vào.',
    9: 'Niềm tin của bạn không nằm yên: bạn có thể mất hẳn một hệ giá trị rồi dựng lại từ móng. Khi đã tin, bạn tin tới mức muốn thuyết phục người khác. Điều đáng canh chính là chỗ đó - hãy giữ chỗ cho khả năng mình sai, vì với nhà 9 này thì niềm tin dễ hoá thành quyền lực.',
    10: 'Bạn nhắm tới vị trí có thực quyền, và bạn tới được đó bằng cách đi qua những chỗ người khác bỏ chạy. Sự nghiệp bạn dễ có một lần đổ và dựng lại lớn hơn. Việc cần giữ là sự sạch sẽ: nhà 10 này cho bạn quyền, và cách bạn dùng quyền sẽ quyết định bạn được nhớ thế nào.',
    11: 'Bạn có ảnh hưởng thật trong nhóm, kể cả khi bạn không giữ chức gì. Các mối bạn bè của bạn dễ có lần thanh lọc rõ rệt - một đợt bạn rời đi và một lớp người mới vào. Điều nên nhìn nhận: chuyện đó là bình thường trong lá số của bạn, và đám người ở lại sau mỗi đợt thường là đám đúng.',
    12: 'Có một phần rất mạnh trong bạn hoạt động dưới mặt nước: nỗi sợ sâu, sức chịu đựng lớn, và những chuyện cũ bạn chưa kể với ai. Bạn cũng cảm được phần tối của người khác khá nhanh. Việc nên làm là đi vào có người đi cùng - trị liệu, hoặc một việc thực hành đều đặn - vì vùng này quá nặng để tự gánh im lặng.'
  },

  northNode: {
    1: 'Hướng trưởng thành đời này của bạn là dám là chính mình và dám đi trước. Bạn quen đặt người khác lên trước, và phần cần tập là nói tôi muốn mà không phải xin phép. Cứ bắt đầu bằng những việc nhỏ do bạn tự quyết, không hỏi ai.',
    2: 'Bạn cần học cách tự đứng trên nguồn lực của mình: tự kiếm, tự giữ, tự định giá công sức mình. Vùng lạ với bạn là sự ổn định chậm và bền, thay vì dựa vào nguồn của người khác. Một bước cụ thể: dựng cho được một khoản tiết kiệm hoàn toàn của riêng bạn.',
    3: 'Phần phải bước vào là nói ra và học lại từ đầu: hỏi, ghi chép, đi gặp người gần mình. Bạn hay muốn có ngay một chân lý lớn, còn bài của bạn lại nằm ở những mẩu kiến thức nhỏ, cụ thể. Hãy tập hỏi nhiều hơn giảng.',
    4: 'Hướng của bạn là về phía trong: gia đình, gốc rễ, đời sống riêng, chỗ bạn được là người chứ không là chức danh. Bạn quen đo mình bằng thành tích ngoài xã hội. Việc phải tập là có mặt ở nhà thật sự, và cho phép mình cần người khác.',
    5: 'Bạn cần học cách sống cho mình: làm thứ mình thích, tỏ ra mình muốn, dám đứng ra cho người khác thấy. Bạn quen hoà vào tập thể và nhường phần vui. Bước đi rất thực: nhận lấy một việc sáng tạo có tên bạn ở trên, dù nhỏ.',
    6: 'Hướng trưởng thành của bạn nằm trong việc nhỏ làm mỗi ngày: nếp sống, sức khoẻ, làm cho xong và làm cho gọn. Bạn quen chờ cảm hứng hoặc chờ một điều lớn. Cách vào rất đơn giản: chọn ba việc lặp mỗi ngày và giữ trong ba mươi ngày.',
    7: 'Bài của bạn là học đi cùng người khác: nghe, nhường, để người ta giúp mình. Bạn quen tự lo hết một mình và coi đó là bản lĩnh. Bước cụ thể: giao hẳn một việc quan trọng cho một người và không xen vào.',
    8: 'Hướng của bạn đi vào chỗ sâu: chia sẻ thật, dựa vào nhau, dám đi qua đổi thay thay vì giữ nguyên. Bạn quen nắm chắc thứ mình đang có. Bước đầu tiên nên làm: nói ra một chuyện bạn vẫn giữ riêng, với đúng một người bạn tin.',
    9: 'Bạn cần mở rộng ra: đi xa, học cao, tìm một hệ giá trị của riêng mình thay vì góp mãi các mẩu thông tin. Bạn quen biết nhiều thứ mà chưa nối chúng lại. Việc đáng làm: theo học cho trọn một khoá dài, hoặc đi một chuyến đủ xa.',
    10: 'Hướng của bạn là ra mặt công khai: nhận việc, nhận vị trí, để mình được đánh giá bởi kết quả. Bạn quen núp trong đời sống riêng, an toàn và kín. Bước đi rõ ràng: nhận lấy một vai có trách nhiệm và làm trong ít nhất một năm.',
    11: 'Bạn cần học sống trong tập thể: đóng góp cho một việc chung, có bạn đồng hành, nghĩ tới đường dài của nhiều người. Bạn quen làm riêng và quen được chú ý một mình. Bước cụ thể: vào một nhóm có việc thật và nhận một phần việc trong đó.',
    12: 'Hướng của bạn là buông bớt kiểm soát và học tin: nghỉ khi cần nghỉ, cho đi không đợi nhận, chăm phần bên trong. Bạn quen bận, quen tính, quen làm cho hết việc. Bước vào rất giản dị: mỗi ngày một khoảng lặng, không màn hình, không việc.'
  },

  southNode: {
    1: 'Vốn sẵn của bạn là tự lập và tự xoay - bạn không cần ai cũng sống được. Chính vì quá thạo nên nó thành lối mòn: bạn tự làm hết rồi mệt một mình. Cứ giữ bản lĩnh đó, nhưng bớt dùng nó làm cái cớ để không phải nhờ ai.',
    2: 'Bạn giỏi giữ và giỏi tích: bạn biết cách làm mình đủ đầy. Lối mòn là bám vào thứ mình đang nắm và sợ đổi. Vốn này rất quý khi bạn dùng nó để làm nền, chứ không dùng nó làm chỗ trốn.',
    3: 'Bạn khéo nói, nhanh nhạy, biết đủ thứ để nối chuyện với bất cứ ai. Cái bẫy là ở hoài trên mặt: biết nhiều mà không đi tới đáy nào. Hãy dùng khiếu nói ấy để chuyển tải một thứ bạn thật sự hiểu sâu.',
    4: 'Bạn có bản năng chăm sóc và biết cách dựng một chỗ an toàn. Lối mòn là lui về chỗ an toàn ấy mỗi khi khó, và ở đó lâu hơn cần thiết. Giữ lấy khả năng làm người ta thấy nhà, nhưng đừng để nó thành nơi trú.',
    5: 'Bạn biết cách toả sáng và làm người khác thích mình - đó là vốn thật. Lối mòn là cần được vỗ tay mới thấy mình có giá. Hãy dùng sức hút đó cho một việc lớn hơn bản thân bạn.',
    6: 'Bạn tỉ mỉ, làm được việc, và không bỏ dở - người ta luôn cần một người như bạn. Cái bẫy là vùi vào chi tiết, làm hoài mà không nhìn lên. Vốn này đáng dùng để đỡ cho một tầm nhìn, chứ không để lấp thời gian.',
    7: 'Bạn biết cách làm người ta dễ chịu và biết dung hoà một cuộc căng. Lối mòn là chiều theo tới mức mất mình, hoặc đợi người khác quyết. Giữ sự tinh tế đó, nhưng để nó phục vụ cho ý của chính bạn.',
    8: 'Bạn chịu được chuyện nặng và không sợ đi vào chỗ sâu - phần lớn người khác không làm được. Lối mòn là sống trong cường độ cao như một thói quen, và dựa vào nguồn lực của người khác. Dùng sức đó khi cần, rồi đi ra.',
    9: 'Bạn có sẵn một hệ giá trị và nói ra rất thuyết phục. Cái bẫy là giảng thay vì nghe, và tin rằng mình đã hiểu trước khi hỏi. Vốn ấy quý nhất khi bạn hạ nó xuống thành việc cụ thể làm được.',
    10: 'Bạn biết cách nhắm mục tiêu, giữ vai và làm cho ra kết quả trước mắt mọi người. Lối mòn là quy hết giá trị bản thân vào công việc và vị trí. Giữ năng lực đó, và trả lại cho đời sống riêng phần nó đáng có.',
    11: 'Bạn hoà vào tập thể dễ và có mạng quan hệ rộng - đó là vốn ít người có. Cái bẫy là tan vào nhóm, làm theo ý chung, không còn giọng riêng. Hãy dùng mạng người đó để đỡ cho việc của chính bạn.',
    12: 'Bạn có đời sống bên trong dày, trực giác tốt và biết cách rút ra khi cần. Lối mòn là rút quá nhiều: mơ thay vì làm, tránh thay vì đối diện. Vốn này quý khi bạn mang phần nhìn thấy được từ trong ấy ra ngoài và làm gì đó với nó.'
  }
};
