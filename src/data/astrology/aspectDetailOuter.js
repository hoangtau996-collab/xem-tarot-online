// Góc chiếu của Sao Mộc, Sao Thổ, ba hành tinh ngoài, hai nút Mặt Trăng và
// cặp Cung Mọc - Thiên Đỉnh. Luận giải riêng theo từng loại góc.
//
// Lưu ý về giọng: các cặp giữa hai hành tinh đi chậm (Mộc - Thổ trở ra) đúng
// ra là đặc trưng của cả một lứa người sinh cùng thời, nên phần văn ở đây nói
// rõ điều đó thay vì để khách tưởng là nét riêng của mình.

export const ASPECT_DETAIL_OUTER = {
  /* --- Sao Mộc --- */
  'jupiter|saturn': {
    blend: 'Bạn vừa dám vừa tính, nên ít khi đánh cược mù - cả lứa sinh cùng thời bạn đều có nhịp này. Trong đời bạn nó hiện ra thành kiểu phát triển chậm mà chắc.',
    flow: 'Bạn mở rộng mà không mất nền: dám bước nhưng vẫn có đường lùi. Đây là cấu hình tốt cho việc kinh doanh dài hạn.',
    tense: 'Bạn kẹt giữa muốn và dám: bung ra rồi tự thắt, thắt rồi lại thấy mình bỏ lỡ. Việc nên làm: chia tiền và thời gian thành hai phần cố định - một phần để thử, một phần không được chạm - rồi thôi tranh luận với chính mình.',
    awkward: 'Mở rộng và thu lại trong bạn lệch nhịp, nên bạn hay bước sai thời điểm. Quyết theo lịch đã định trước, đừng quyết theo cảm giác trong ngày.'
  },
  'jupiter|uranus': {
    blend: 'Những bước ngoặt tốt của bạn tới bất ngờ, và bạn liều được ở chỗ người khác chần chừ. Hãy để sẵn một khoản dám mất, vì cơ hội của bạn thường tới gấp.',
    flow: 'Bạn bắt được cái mới sớm và nó thường có lợi cho bạn. Đi tìm chỗ thị trường đang đổi, đừng chờ nó ổn định.',
    tense: 'Bạn nhảy vào cái mới quá nhanh rồi phải gỡ, hoặc tự do tới mức không ai cộng tác được. Việc nên làm: đặt một quy tắc chờ bảy ngày cho mọi quyết định lớn phát sinh đột ngột.',
    awkward: 'Cơ hội và nhu cầu phá lệ của bạn chưa khớp, nên bạn bỏ cái đang chạy để thử cái mới. Thử ở quy mô nhỏ trước.'
  },
  'jupiter|neptune': {
    blend: 'Bạn có lòng rộng và trực giác tốt, dễ tin vào điều lớn hơn mình - cả lứa bạn mang chất này. Đổi lại bạn tin nhanh hơn cần thiết: hãy kiểm tra dữ kiện trước khi góp tiền hay góp tên.',
    flow: 'Bạn thương người một cách tự nhiên và việc thiện nguyện đến với bạn dễ. Đặt nó vào một việc có tổ chức thì nó sinh kết quả thật.',
    tense: 'Bạn tin quá nhiều rồi mất, hoặc hứa những thứ không có thật ở đó. Dễ gặp người bán cho bạn một giấc mơ. Việc nên làm: với mọi lời mời có dính tiền, nhờ một người tỉnh táo đọc hộ trước khi bạn trả lời.',
    awkward: 'Niềm tin và trí tưởng tượng của bạn lệch pha, nên bạn hay thất vọng về chính kỳ vọng của mình. Hạ kỳ vọng xuống thành con số cụ thể.'
  },
  'jupiter|pluto': {
    blend: 'Bạn có sức làm chuyện lớn và ảnh hưởng tới nhiều người. Cái giá là dễ quá tay - đã muốn là muốn hết. Hãy định sẵn giới hạn của mình trước khi có quyền trong tay.',
    flow: 'Bạn dựng lại được sau đổ vỡ, và lần sau thường lớn hơn lần trước. Đây là sức hồi phục mà ít người có.',
    tense: 'Khát muốn của bạn dễ thành thừa: dồn tất tay, hoặc muốn kiểm soát cả một việc chung. Việc nên làm: giao hẳn một phần cho người khác quyết, và không xen vào - tập đúng chuyện đó.',
    awkward: 'Cơ hội và sức chuyển hoá của bạn vướng nhau, nên bạn hay đổi lớn vào lúc không cần. Chỉnh dần và đợi dữ kiện.'
  },
  'jupiter|northNode': {
    blend: 'Con đường của bạn được đỡ: đi đúng hướng là thấy cửa mở. Cứ mạnh dạn hơn mức bạn tưởng mình được phép.',
    flow: 'Việc lớn lên đến với bạn khá êm và thường qua người giúp. Nhớ đi sâu, đừng chỉ mở rộng.',
    tense: 'Hướng của bạn đòi bạn tin trong khi bạn muốn chắc, nên mỗi lần dám đều hơi cưỡng. Việc nên làm: mỗi tháng nhận một việc hơi quá sức mình một chút.',
    awkward: 'Niềm tin hiện tại và hướng cần đến chưa khớp. Chỉnh dần, đừng đổi hết một lần.'
  },
  'jupiter|southNode': {
    blend: 'Bạn có sẵn một vốn may khá dễ dùng, nên ít khi phải mài. Dùng nó làm nền, nhưng đừng coi nó là năng lực.',
    flow: 'May tới trơn nên bạn ít gặp cản. Hãy tự đặt ra thử thách, vì đời sẽ không đặt hộ bạn.',
    tense: 'Vốn cũ làm bạn tự tin quá mức ở chỗ không còn đúng nữa, nên bạn lặp lại một cách làm đã hết thời. Việc nên làm: hỏi một người ngoài xem cách này còn chạy không, rồi nghe thật.',
    awkward: 'Vốn may và hướng mới vướng nhau. Mang nó sang việc mới dưới hình dạng khác.'
  },
  'jupiter|asc': {
    blend: 'Người ta có thiện cảm với bạn nhanh và cửa hay mở khi bạn tự đứng ra. Hãy chủ động xin gặp, xin cơ hội - với bạn may tới qua việc xuất hiện.',
    flow: 'Vẻ ngoài rộng rãi của bạn làm người khác thấy an tâm. Dùng nó vào nghề tiếp xúc người.',
    tense: 'Bạn trông tự tin hơn thực tế cho phép, nên người ta kỳ vọng quá rồi bạn phải chạy theo. Việc nên làm: nói rõ mình chưa biết chỗ nào, ngay từ đầu.',
    awkward: 'Vẻ ngoài và niềm tin của bạn hơi lệch, nên người ta đọc sai mức cam kết của bạn. Nói thành lời.'
  },
  'jupiter|mc': {
    blend: 'Bạn được nâng trong công việc và hay được giao việc lớn hơn tuổi. Cái cần canh là nhận quá nhiều rồi làm không tới - phần dôi ra chính là chỗ giữ uy tín.',
    flow: 'Sự nghiệp của bạn mở ra khá êm và thường có người đỡ đầu. Cứ nhận vai lớn hơn hiện tại.',
    tense: 'Bạn muốn vị trí cao hơn mức mình đã dựng, nên hoặc nhận bừa, hoặc thấy mình bị kìm. Việc nên làm: liệt kê năng lực thật so với vai đang nhắm, rồi bù đúng chỗ thiếu.',
    awkward: 'Cơ hội và con đường nghề chưa khớp, nên cửa mở ở chỗ bạn không muốn đi. Chỉnh dần, đừng nhận cho có.'
  },

  /* --- Sao Thổ --- */
  'saturn|uranus': {
    blend: 'Bạn vừa muốn giữ vừa muốn phá, và cả lứa sinh cùng thời bạn đều mang mâu thuẫn đó. Trong đời bạn nó hiện ra thành kiểu đổi mới có kỷ luật - khá hiếm và khá có giá.',
    flow: 'Bạn cải cách mà không đập đi: đổi được cái cũ trong khuôn cho phép. Rất cần trong những tổ chức đang phải thay đổi.',
    tense: 'Bạn chịu khuôn tới mức ngột rồi bật ra, hoặc tự do tới mức không trụ được việc gì. Việc nên làm: giữ một nền ổn định rồi chừa sẵn trong đó một ô để lệch, thay vì đập cả nền.',
    awkward: 'Giữ và phá trong bạn lệch nhịp nên bạn đổi sai thời điểm. Quyết theo lịch đã định, đừng quyết lúc đang ngột.'
  },
  'saturn|neptune': {
    blend: 'Bạn phải biến điều mình mơ thành thứ làm được thật, và đó là việc cả đời - lứa bạn cùng chia nhịp này. Mỗi lần mơ thành một bước cụ thể là một lần bạn thắng.',
    flow: 'Bạn có khả năng hiếm: giữ được mộng mà vẫn làm ra kết quả. Hãy chọn việc cần cả hai thứ đó.',
    tense: 'Hoặc bạn bóp chết giấc mơ bằng thực tế, hoặc bạn trốn việc bằng mơ. Dễ thấy mệt mỏi không rõ nguyên do. Việc nên làm: mỗi tuần biến một phần của giấc mơ thành đúng một việc có thể gạch xong.',
    awkward: 'Kỷ luật và mộng của bạn chưa khớp nên bạn chần chừ lâu. Bước nhỏ nhất làm được là bước nên làm.'
  },
  'saturn|pluto': {
    blend: 'Bạn bền tới mức khắc, chịu được áp lực rất nặng, và khi đổi thì đổi tận móng - lứa bạn sinh ra trong một thời kỳ nhiều áp lực chung. Đừng gánh im lặng, đó là chỗ dễ vỡ nhất.',
    flow: 'Bạn dựng lại được từ con số không mà không gãy. Đây là sức mà những việc nhiều năm mới ra kết quả rất cần.',
    tense: 'Bạn ép mình tới cùng rồi sập, hoặc gặp những cấu trúc quyền lực ngột ngạt. Cơ thể và giấc ngủ là nơi gửi hoá đơn. Việc nên làm: đặt một mức dừng cho chính mình bằng con số giờ, và tôn trọng nó như tôn trọng hợp đồng.',
    awkward: 'Kỷ luật và sức chuyển hoá của bạn vướng nhau, nên bạn giữ quá lâu rồi đổi quá gấp. Chỉnh dần và nói với một người.'
  },
  'saturn|northNode': {
    blend: 'Con đường của bạn đi qua chỗ khó, không có lối tắt - nhưng cũng nghĩa là nó vững. Chọn một hướng và ở lại đủ lâu.',
    flow: 'Bạn lớn lên bằng kỷ luật và nó đến khá tự nhiên. Cứ làm đều, đó đúng là đường của bạn.',
    tense: 'Hướng trưởng thành của bạn bị chặn liên tục: trễ, tốn, phải đi đường vòng. Đó là đặc trưng của góc này, không phải dấu bạn chọn sai. Việc nên làm: tính dư thời gian ngay từ đầu, rồi đừng bỏ.',
    awkward: 'Trách nhiệm và hướng đi của bạn chưa khớp, nên bạn gánh việc không dẫn tới đâu. Rà lại và bỏ một việc.'
  },
  'saturn|southNode': {
    blend: 'Bạn mang một nỗi sợ hoặc một trách nhiệm cũ, quen tới mức tưởng là tính mình. Nhận ra nó là của hoàn cảnh cũ, không phải của bạn - đó là bước gỡ đầu tiên.',
    flow: 'Kỷ luật sẵn có đỡ bạn êm, ít phải tự ép. Giữ nó, đừng để nó thành khắc khổ không cần thiết.',
    tense: 'Nỗi sợ cũ chặn đúng chỗ bạn đang muốn bước, nên bạn tự dừng trước khi ai kịp cản. Việc nên làm: viết ra điều tệ nhất có thể xảy ra, rồi xem nó có thật đáng sợ như cảm giác không.',
    awkward: 'Giới hạn cũ và hướng mới vướng nhau. Nới một chút mỗi lần, đừng đợi hết sợ mới đi.'
  },
  'saturn|asc': {
    blend: 'Bạn trông nghiêm và chín hơn tuổi, người lạ thấy khó gần lúc đầu nhưng tin bạn về sau. Chỉ cần mềm phần mở đầu - một câu hỏi thăm là đủ.',
    flow: 'Vẻ ngoài của bạn tạo cảm giác đáng tin cậy, và đó là tài sản thật trong nghề. Dùng nó ở những chỗ cần sự chắc chắn.',
    tense: 'Bạn tự khắt khe với hình ảnh của mình, nên hay căng khi phải ra mặt. Việc nên làm: chuẩn bị kỹ phần nội dung rồi thôi lo phần hình ảnh - với bạn nội dung luôn đủ đỡ.',
    awkward: 'Vẻ ngoài và phần nghiêm trong bạn hơi lệch, nên người ta đọc sai mức dễ gần của bạn. Nói nhiều hơn một chút.'
  },
  'saturn|mc': {
    blend: 'Bạn lên bằng từng bậc thật, chậm mà vững, và trụ lại đúng lúc người khác hụt hơi. Mười năm trong một nghề là đồng tiền quý nhất của bạn.',
    flow: 'Kỷ luật của bạn và con đường nghề khớp nhau nên bạn tiến đều. Nhận trách nhiệm, nó trả công đúng hạn.',
    tense: 'Sự nghiệp bạn bị chặn sớm hoặc khởi đầu chậm, và bạn hay thấy mình đi sau người khác. Góc này trả muộn nhưng trả thật: việc cần làm là đừng đổi hướng vì sốt ruột.',
    awkward: 'Trách nhiệm và con đường nghề so le, nên bạn gánh phần không được tính công. Rà lại phần việc và nói ra.'
  },

  /* --- Thiên Vương --- */
  'uranus|neptune': {
    blend: 'Đây là nhịp của cả một thế hệ: lứa bạn đổi những gì được coi là đương nhiên, và làm điều đó bằng cảm nhận hơn bằng lý lẽ. Phần riêng của bạn nằm ở nhà hai hành tinh này đứng, không ở góc.',
    flow: 'Lứa bạn đổi mới một cách mềm, không đập phá. Bạn thuộc về những việc làm mới cách con người cảm nhận.',
    tense: 'Lứa bạn lớn lên giữa lúc những điều chắc chắn cũ tan ra, nên hay thấy không có gì để neo. Việc nên làm cho riêng bạn: chọn lấy một vài nguyên tắc tự mình kiểm được và sống theo đó.',
    awkward: 'Hai nhịp thế hệ này lệch nhau, biểu hiện thành cảm giác lửng lơ không rõ cớ. Neo vào việc cụ thể hằng ngày.'
  },
  'uranus|pluto': {
    blend: 'Lứa của bạn không cải cách từng phần, họ đổi tận gốc - và bạn mang chất đó trong người. Dùng nó cho một việc đáng, vì nó quá mạnh để tiêu vào chuyện nhỏ.',
    flow: 'Bạn đổi được cái cũ mà không phải đốt nó. Đây là sức rất cần trong những tổ chức đang chuyển mình.',
    tense: 'Lứa bạn sinh ra trong thời kỳ nhiều biến động, và trong đời bạn nó thành những khúc quanh gấp. Việc nên làm: giữ một phần đời không cho biến động chạm vào - một nếp sống, một chỗ ở, một người.',
    awkward: 'Hai lực này lệch nhịp nên bạn phá và dựng không cùng lúc. Làm xong một vòng rồi mới mở vòng sau.'
  },
  'uranus|northNode': {
    blend: 'Con đường của bạn đòi bạn dám khác, không phải dám giống. Chỗ bạn lệch khỏi khuôn chính là chỗ bạn được trả công.',
    flow: 'Cái mới đến với bạn tự nhiên và nó mở đường. Cứ đi theo thứ làm bạn thấy sống.',
    tense: 'Hướng của bạn bắt bạn phá lệ trong khi bạn muốn được nhận, nên mỗi lần khác người đều hơi sợ. Việc nên làm: làm khác ở một chuyện nhỏ mỗi tuần, để quen dần cảm giác đó.',
    awkward: 'Nhu cầu tự do và hướng đi chưa khớp, nên bạn đổi mà không tiến. Chỉnh dần và giữ lại cái đã chạy được.'
  },
  'uranus|southNode': {
    blend: 'Bạn quen bật ra khỏi mọi thứ, quen tới mức đó thành cách trốn. Lần tới khi muốn bỏ đi, hãy thử ở lại thêm một chút xem sao.',
    flow: 'Khả năng xoay của bạn đỡ bạn êm. Giữ nó, nhưng đừng để nó thành lý do không cam kết.',
    tense: 'Phản xạ bỏ đi bật ra đúng lúc bạn cần ở lại, nên bạn hay cắt những thứ chưa kịp thành. Việc nên làm: định trước một thời hạn tối thiểu cho mỗi việc, và giữ cho hết hạn đó.',
    awkward: 'Lối bật ra quen và hướng mới vướng nhau. Chuyển nó thành việc thử có kiểm soát.'
  },
  'uranus|asc': {
    blend: 'Bạn khác người ngay ở bề mặt và không giấu được. Đừng cố gọt cho tròn - chỗ bạn không giống ai chính là chỗ bạn được nhớ tới.',
    flow: 'Vẻ ngoài khác thường của bạn làm người ta tò mò theo hướng tốt. Dùng nó, đừng xin lỗi vì nó.',
    tense: 'Bạn bật ra khỏi khuôn vào lúc không nên, nên ấn tượng đầu về bạn hay gây tranh cãi. Việc nên làm: chọn trước chỗ nào mình sẽ khác và chỗ nào mình theo lệ, đừng để tình huống chọn hộ.',
    awkward: 'Vẻ ngoài và nhu cầu tự do lệch pha, nên người ta đoán sai mức bạn chịu ràng buộc. Nói trước nhu cầu khoảng riêng.'
  },
  'uranus|mc': {
    blend: 'Đường nghề của bạn không thẳng: đổi hướng giữa đường, hoặc làm nghề chưa có tên. Hãy nhắm vào chỗ thị trường đang đổi, đừng leo thang có sẵn.',
    flow: 'Bạn tiến bằng cái mới và nó đến khá êm. Chọn nơi làm việc linh hoạt, bạn bật lên ở đó.',
    tense: 'Bạn không ngồi lâu được trong một cơ cấu, nên sự nghiệp hay bị cắt khúc. Việc nên làm: giữ một dòng nghề xuyên suốt qua mọi lần đổi chỗ, để các khúc cộng lại thành một con đường.',
    awkward: 'Nhu cầu phá lệ và con đường nghề chưa khớp, nên bạn đổi việc mà không tiến. Giữ lại phần đã dựng được mỗi lần đổi.'
  },

  /* --- Hải Vương --- */
  'neptune|pluto': {
    blend: 'Một cặp rất chậm, nói về lớp nền tinh thần của cả một thế hệ hơn là về riêng bạn. Phần riêng của bạn nằm ở nhà hai hành tinh này đứng.',
    flow: 'Lứa bạn có chiều sâu tinh thần đi kèm sức chuyển hoá. Với riêng bạn, nó hiện ra thành khả năng hiểu phần tối của người khác.',
    tense: 'Lứa bạn lớn lên giữa những đổ vỡ niềm tin tập thể. Việc nên làm cho riêng bạn: giữ một thực hành đều đặn thuộc về bên trong, nó neo bạn lại.',
    awkward: 'Hai nhịp này lệch nhau, biểu hiện thành cảm giác nặng không rõ cớ. Đi vào nó có người đi cùng thì dễ hơn.'
  },
  'neptune|northNode': {
    blend: 'Con đường của bạn có phần tâm linh hoặc nghệ thuật thật, không phải trang trí. Hãy cho nó một chỗ chính thức trong đời sống của bạn.',
    flow: 'Trực giác dẫn bạn đi khá đúng. Cứ tin nó, chỉ nhớ neo lại bằng một việc có kết quả thấy được.',
    tense: 'Hướng của bạn đòi bạn buông kiểm soát trong khi bạn muốn chắc, nên mỗi lần tin đều hơi sợ. Việc nên làm: thử tin ở một việc nhỏ, rồi ghi lại kết quả.',
    awkward: 'Trực giác và hướng đi chưa khớp, nên bạn thấy mơ hồ về đường của mình. Chỉnh dần, đừng đợi thấy rõ hết.'
  },
  'neptune|southNode': {
    blend: 'Bạn có sẵn khả năng cảm rất nhạy, và cũng sẵn thói rút vào mộng khi khó. Cả hai đều thật - hãy giữ cái đầu, bớt cái sau.',
    flow: 'Phần nhạy cảm sẵn có đỡ bạn êm. Dùng nó cho người khác, đừng chỉ để nó chảy vô định.',
    tense: 'Thói trốn bật ra đúng lúc bạn cần đối diện, nên bạn hoãn những việc quan trọng. Việc nên làm: chia việc đáng sợ thành bước mười lăm phút, rồi làm đúng mười lăm phút đó.',
    awkward: 'Lối rút vào quen và hướng mới vướng nhau. Chuyển nó thành khoảng lặng có chủ đích, có giờ bắt đầu và giờ kết thúc.'
  },
  'neptune|asc': {
    blend: 'Người ta thấy bạn mờ mờ rồi tự điền vào, mỗi người đọc bạn một kiểu. Việc rất thực dụng: nói rõ mình là ai và mình làm gì, càng cụ thể càng tốt.',
    flow: 'Bạn có sức hút dịu và người ta thấy an toàn khi ở gần. Dùng nó trong nghề chăm người.',
    tense: 'Bạn bị hiểu sai khá thường xuyên, và cũng dễ hoà theo không khí tới mức mất đường viền. Việc nên làm: chuẩn bị trước một câu giới thiệu về mình và dùng nguyên văn.',
    awkward: 'Vẻ ngoài và phần bên trong lệch pha, nên ấn tượng đầu về bạn luôn cần sửa. Cứ sửa, đừng kết luận là mình khó hiểu.'
  },
  'neptune|mc': {
    blend: 'Bạn khó nói gọn mình làm nghề gì, và nghề của bạn thường theo tiếng gọi hơn theo bậc thang. Hãy đầu tư vào một hồ sơ việc đã làm - đó là chỗ yếu nhất của cấu hình này.',
    flow: 'Bạn tiến trong những nghề dính tới hình ảnh, chăm sóc hay nghệ thuật, khá tự nhiên. Chọn đúng vùng đó.',
    tense: 'Hướng nghề của bạn mờ, nên bạn đi vòng khá lâu mới thấy đường. Việc nên làm: thử một vai cụ thể trong sáu tháng rồi đánh giá, thay vì nghĩ mãi cho ra đúng nghề.',
    awkward: 'Phần mộng và con đường nghề chưa khớp, nên bạn làm được mà không thấy thuộc về. Chỉnh từng phần việc một.'
  },

  /* --- Diêm Vương --- */
  'pluto|northNode': {
    blend: 'Con đường đời này của bạn đi qua những lần lột xác thật, không tránh được. Biết trước thì đỡ sợ - mỗi lần sập là một lần bạn đổi tầng.',
    flow: 'Bạn chuyển mình được mà không gãy, và mỗi lần đổi đưa bạn lên một bậc. Cứ dám đi vào chỗ sâu.',
    tense: 'Hướng của bạn đòi bạn buông thứ mình đang nắm, nên mỗi bước tiến đều kéo theo một mất mát. Việc nên làm: chọn chủ động cái mình bỏ, đừng đợi bị lấy.',
    awkward: 'Sức chuyển hoá và hướng đi chưa khớp, nên bạn đổi lớn mà không tiến. Đợi dữ kiện rồi mới động.'
  },
  'pluto|southNode': {
    blend: 'Bạn quen sống trong cường độ cao, quen tới mức bình yên lại làm bạn bồn chồn. Hãy tập chịu được những quãng không có gì xảy ra.',
    flow: 'Sức chịu đựng sẵn có đỡ bạn qua nhiều chuyện. Giữ nó, nhưng đừng đi tìm khủng hoảng để thấy mình sống.',
    tense: 'Nếp cũ kéo bạn vào lại những tình huống nặng mà bạn tưởng đã thoát. Việc nên làm: khi thấy một tình huống quen đang hình thành, nói ra với một người ngoài trước khi bước vào.',
    awkward: 'Cường độ quen và hướng mới vướng nhau. Hạ cường độ xuống từng bậc, đừng cắt một lần.'
  },
  'pluto|asc': {
    blend: 'Bạn có sức nặng mà không cần lên giọng, người ta hoặc rất tin hoặc hơi dè. Chọn sẵn xem mình muốn dùng sức đó vào đâu, vì bạn không sống nhạt được.',
    flow: 'Sự hiện diện của bạn làm người khác tin, và bạn không phải diễn để có nó. Dùng ở chỗ cần một người vững.',
    tense: 'Bạn toả ra sức nặng hơn ý mình, nên người ta e dè hoặc thử thách bạn. Việc nên làm: mở đầu bằng một câu mềm và hỏi nhiều hơn khẳng định, nó hạ ngay bức tường.',
    awkward: 'Vẻ ngoài và phần sâu trong bạn lệch pha, nên người ta đọc sai sức của bạn. Nói thẳng ý mình thay vì để không khí nói hộ.'
  },
  'pluto|mc': {
    blend: 'Bạn nhắm tới chỗ có thực quyền và tới được đó qua những chỗ người khác bỏ chạy. Cách bạn dùng quyền sẽ quyết định bạn được nhớ thế nào - đáng để nghĩ trước.',
    flow: 'Bạn lên bằng sức chịu đựng và nó đến khá êm. Nhận việc nặng, nó trả công.',
    tense: 'Sự nghiệp của bạn dễ có một lần đổ rồi dựng lại lớn hơn, và trên đường thì hay có tranh giành quyền. Việc nên làm: giữ cho sạch và giữ bằng chứng công việc của mình - đó là cái bảo vệ bạn.',
    awkward: 'Sức chuyển hoá và con đường nghề so le, nên bạn đổi nghề vào lúc không cần. Chỉnh phần việc trước khi đổi hẳn.'
  },

  /* --- Nút Mặt Trăng và hai góc --- */
  'northNode|asc': {
    blend: 'Việc bạn phải lớn lên nằm ngay ở chỗ bạn xuất hiện và tự đứng ra. Cứ nhận lấy vai trò, kể cả khi thấy chưa sẵn sàng.',
    flow: 'Bạn tiến lên bằng cách ra mặt và nó đến tự nhiên. Xuất hiện nhiều hơn là đủ.',
    tense: 'Hướng của bạn đòi bạn ra mặt trong khi bạn muốn ẩn, nên mỗi lần xuất hiện đều hơi cưỡng. Việc nên làm: nhận một việc có tên mình trên đó, mỗi quý một lần.',
    awkward: 'Cách xuất hiện hiện tại và hướng cần đến chưa khớp. Chỉnh dần cách mình giới thiệu bản thân.'
  },
  'northNode|mc': {
    blend: 'Con đường đời này và con đường nghề của bạn trùng nhau khá rõ - chọn đúng nghề là đã đi đúng hướng. Đáng để chọn kỹ.',
    flow: 'Sự nghiệp và việc trưởng thành của bạn cùng chiều, nên làm việc là lớn lên. Cứ nhận trách nhiệm.',
    tense: 'Hướng của bạn đòi bạn ra sân khấu công khai trong khi bạn muốn ở trong, nên mỗi bước nghề đều hơi trái tay. Việc nên làm: nhận một vai có trách nhiệm và giữ ít nhất một năm.',
    awkward: 'Hướng đi và con đường nghề chưa khớp, nên bạn làm đúng mà vẫn thấy chưa phải. Chỉnh từng phần việc.'
  },
  'southNode|asc': {
    blend: 'Bạn có một cách xuất hiện rất quen tay, quen tới mức nó thay bạn nói. Tiện, nhưng người ta chỉ gặp cái lớp đó - hãy để họ thấy phần thật hơn một chút.',
    flow: 'Lớp vỏ sẵn có đỡ bạn êm trong mọi tình huống. Giữ nó, đừng để nó thành mặt nạ.',
    tense: 'Cách xuất hiện cũ kéo bạn lại đúng lúc bạn muốn khác, nên bạn diễn lại vai quen rồi tự mệt. Việc nên làm: trong một cuộc gặp tới, bỏ một thói quen quen tay và xem có gì xảy ra không.',
    awkward: 'Lớp vỏ quen và hướng mới vướng nhau. Đổi dần, không cần đổi hết.'
  },
  'southNode|mc': {
    blend: 'Bạn có sẵn một vốn nghề dễ dùng, nên dễ ở lại trong nó lâu hơn mức có lợi. Hãy hỏi thật xem nghề này còn nuôi mình hay chỉ còn nuôi cái guồng.',
    flow: 'Vốn nghề sẵn có đưa bạn đi khá êm. Giữ nó làm nền, nhưng mỗi năm thêm một kỹ năng mới.',
    tense: 'Vốn cũ níu bạn ở lại đúng lúc nên đổi, nên bạn thấy mình bị kẹt mà vẫn không dám đi. Việc nên làm: dựng thử một hướng mới ở quy mô nhỏ trước khi bỏ hướng cũ.',
    awkward: 'Vốn nghề quen và con đường cần đến vướng nhau. Mang kỹ năng cũ sang lĩnh vực mới.'
  },
  'asc|mc': {
    blend: 'Cách bạn xuất hiện và chỗ bạn muốn tới gần như là một - người ta nhìn bạn là đoán được bạn làm nghề gì. Rất tiện, chỉ hơi thiếu chỗ để bạn thử một vai khác.',
    flow: 'Vẻ ngoài và con đường nghề của bạn ăn khớp nên bạn tiến mà không phải đóng vai. Cứ là mình ở chỗ làm.',
    tense: 'Con người bạn đưa ra ngoài và vai bạn phải diễn trong nghề không khớp, nên bạn hay thấy mệt vì phải giữ hai bộ mặt. Việc nên làm: đổi một phần việc để nó chứa được bạn thật, thay vì đổi mình cho vừa việc.',
    awkward: 'Vỏ ngoài và con đường nghề so le, nên người ta khó đặt bạn vào đúng chỗ. Nói rõ mình làm gì, mỗi lần gặp người mới.'
  }
};
