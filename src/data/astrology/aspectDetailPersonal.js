// Góc chiếu của Sao Thuỷ, Sao Kim, Sao Hoả - luận giải riêng theo từng loại góc.
//
// Ba hành tinh này nói về việc thường ngày nên phần văn ở đây cố nêu cho được
// một biểu hiện cụ thể và một việc làm được ngay, thay vì mô tả tính cách.

export const ASPECT_DETAIL_PERSONAL = {
  /* --- Sao Thuỷ --- */
  'mercury|venus': {
    blend: 'Bạn chọn chữ dễ nghe gần như tự động, nhắn tin và nói chuyện đều có duyên. Dùng được vào việc thương lượng; chỉ canh chuyện nói êm quá thành mờ ý.',
    flow: 'Bạn làm dịu một cuộc căng chỉ bằng cách đổi cách nói - kỹ năng này đáng tiền trong nghề. Hãy nhận những vai cần người gỡ bế tắc giữa hai bên.',
    tense: 'Bạn muốn nói thẳng mà cũng muốn giữ hoà khí, nên hay nói vòng rồi không ai hiểu đúng ý. Việc nên làm: tách làm hai câu - một câu ghi nhận người kia, một câu nói thẳng ý mình, đừng trộn vào nhau.',
    awkward: 'Lời nói và thiện chí của bạn hơi lệch nhau, nên câu tử tế của bạn có lúc nghe ra khác. Hỏi lại cho chắc thay vì cho rằng đã nói rõ.'
  },
  'mercury|mars': {
    blend: 'Bạn nói nhanh, nói thẳng và tranh luận có sức - trong việc thì lợi, trong nhà thì dễ làm hỏng chuyện. Thoả thuận với chính mình: câu viết lúc đang nóng để qua mười phút hãy gửi.',
    flow: 'Bạn nói ra điều mình muốn một cách rõ ràng mà không gây chiến. Đây là lợi thế thật khi đàm phán - hãy là người mở miệng trước.',
    tense: 'Lời bạn sắc hơn ý bạn định, nên bạn thắng cuộc tranh luận mà mất người. Cũng dễ bị cắt ngang rồi nổi nóng. Việc cụ thể: trước khi đáp, nói lại ý người kia bằng một câu - nó hạ nhiệt cả hai phía.',
    awkward: 'Bạn nghĩ một đằng, lời bật ra một nẻo, nên hay phải nói lại. Chậm nửa nhịp là đủ chỉnh phần lớn.'
  },
  'mercury|jupiter': {
    blend: 'Bạn nhìn bức tranh lớn tốt và nói rộng, người nghe thấy mở ra. Chỗ hụt là chi tiết nhỏ và con số - hãy có một người tỉ mỉ soát lại sau bạn.',
    flow: 'Bạn học nhanh và dạy lại được ngay, đây là nền của nghề giảng hay viết. Cứ nhận việc đòi đọc nhiều rồi giải thích lại cho người khác.',
    tense: 'Bạn nói quá cỡ rồi phải chạy theo lời mình: hứa rộng, kết luận sớm, nhảy từ vài dữ kiện tới một chân lý. Việc nên làm: tập nói dựa trên cái gì mà mình nghĩ vậy, trước khi phát biểu.',
    awkward: 'Chi tiết và tầm rộng trong đầu bạn chưa khớp, nên bạn biết nhiều mà khó gom thành một ý gọn. Viết ra rồi cắt bớt - đó là cách gỡ của góc này.'
  },
  'mercury|saturn': {
    blend: 'Bạn nghĩ chắc và nói có căn cứ, không ai bắt lỗi được bạn dễ. Đổi lại bạn tự chặn mình vì sợ nói sai, nên hay im rồi tiếc. Hãy tập trình bày nhiều lần cho một nội dung, giọng bạn sẽ thành thứ người ta tin.',
    flow: 'Bạn có một đầu óc có kỷ luật: học chậm mà chắc, nói ít mà đúng. Đây là chất liệu của nghề cần độ chính xác lâu dài.',
    tense: 'Có một giọng phê trong đầu bạn gạch hết câu bạn chưa kịp nói. Thi cử hay nói trước đông người làm bạn mệt hơn người khác. Việc rất thực tế: viết ra đầy đủ rồi đọc lại thành tiếng ba lần, bạn sẽ nói được - đây là vấn đề luyện tập, không phải năng lực.',
    awkward: 'Cách nghĩ và kỷ luật của bạn hơi vướng nhau, nên bạn vừa muốn chắc vừa thấy chậm. Chia nhỏ việc học ra là đủ.'
  },
  'mercury|uranus': {
    blend: 'Ý bật ra rất nhanh và lệch khỏi lối thường - bạn thấy cách làm khác trước khi người khác thấy vấn đề. Hãy ghi lại ngay, vì chúng bay cũng nhanh.',
    flow: 'Bạn làm mới được một quy trình cũ mà không gây đổ vỡ. Rất đáng đặt vào việc cải tiến cách làm, không phải việc chạy theo quy trình có sẵn.',
    tense: 'Đầu bạn nhảy nhanh quá nên bạn bỏ bước, nói trước khi người ta kịp theo, và khó ngồi hết một việc tuần tự. Việc nên làm: chốt ý ra giấy theo thứ tự trước khi trình bày - bạn không thiếu ý, bạn thiếu đường đi của ý.',
    awkward: 'Cách nghĩ và nhu cầu phá lệ của bạn lệch pha, nên bạn hay thấy bí đúng lúc cần ý mới. Đổi chỗ, đi bộ, rồi quay lại - với góc này nó thật sự có tác dụng.'
  },
  'mercury|neptune': {
    blend: 'Bạn nói bằng hình ảnh và ẩn ý, kể chuyện có duyên nhưng dễ bị hiểu sai. Mẹo đỡ nhiều: sau mỗi cuộc trao đổi quan trọng, chốt lại bằng vài dòng văn bản.',
    flow: 'Bạn nghe ra cả những gì người ta không nói, và diễn đạt được phần không lời. Đây là chất liệu của viết, dạy và tư vấn.',
    tense: 'Bạn khó nhớ chính xác và dễ nói mờ đi cho dễ chịu, nên hay vướng chuyện ai nói gì. Việc nên làm: ghi chép tại chỗ và xác nhận lại bằng tin nhắn, đừng tin vào trí nhớ về lời nói.',
    awkward: 'Lời nói và trực giác của bạn chưa khớp, nên bạn biết mà nói không ra. Viết trước, nói sau.'
  },
  'mercury|pluto': {
    blend: 'Bạn đào tới đáy một chuyện và đọc được động cơ phía sau câu nói. Lời bạn có sức nặng hơn bạn tưởng - nói thật thì chữa được người, nói sắc thì cắt được người.',
    flow: 'Bạn nhìn ra cái cốt của vấn đề nhanh mà không phải ép ai. Nghề điều tra, phân tích hay tâm lý dùng được đúng chỗ này.',
    tense: 'Bạn nghi trước khi tin, và tranh luận để thắng chứ không để hiểu. Dễ nói một câu để lại dấu rất lâu. Việc nên làm: trước khi phản bác, hỏi một câu thật - nó đổi cả cuộc nói chuyện.',
    awkward: 'Lời nói và phần sâu trong bạn vướng nhau, nên bạn giữ nhiều hơn nói. Chọn một người để nói thật là đủ.'
  },
  'mercury|northNode': {
    blend: 'Việc học và việc nói chính là con đường của bạn, nên đầu tư vào nó không bao giờ lệch. Cứ nhận những việc buộc bạn phải trình bày.',
    flow: 'Bạn lớn lên qua trao đổi và nó đến khá tự nhiên. Nhớ đi sâu một lĩnh vực, đừng chỉ mở rộng mãi.',
    tense: 'Hướng của bạn đòi bạn nói ra trong khi bạn thích giữ, nên mỗi lần phát biểu đều hơi trái tay. Việc nên làm: mỗi tuần nói hoặc viết công khai một lần, dù ngắn.',
    awkward: 'Cách nghĩ hiện tại và hướng cần đến chưa khớp, nên bạn phải học lại cách học. Chỉnh dần.'
  },
  'mercury|southNode': {
    blend: 'Bạn có một nếp tư duy rất thạo, chạy gần như tự động. Tiện, nhưng cũng là lý do bạn ít chịu đổi cách nghĩ - hãy chủ động đọc thứ trái quan điểm mình.',
    flow: 'Cách nghĩ sẵn của bạn đỡ bạn êm, nên ít khi phải nghĩ lại. Giữ nó làm nền, đừng để nó thành kết luận có trước.',
    tense: 'Nếp cũ trong đầu cãi lại cái bạn đang cần học, nên bạn hay quay về lối giải thích quen rồi bí tiếp. Việc nên làm: viết ra giả định của mình rồi tự tìm một dữ kiện ngược lại.',
    awkward: 'Lối nghĩ quen và hướng mới vướng nhau. Mang cái quen sang việc mới dưới hình dạng khác là cách đi được.'
  },
  'mercury|asc': {
    blend: 'Người ta nhận ra bạn qua cách bạn nói, gần như trước mọi thứ khác - giọng và chữ của bạn là thương hiệu. Hãy để phần đó được thấy thường xuyên.',
    flow: 'Bạn nói ra điều mình nghĩ một cách tự nhiên và dễ nghe. Gặp trực tiếp hoặc gọi điện bạn thắng hơn qua văn bản.',
    tense: 'Bạn bắn ra câu đầu tiên chứ chưa phải câu đúng nhất, nên ấn tượng đầu hay phải sửa. Việc bù: một nhịp thở trước khi đáp, đó là toàn bộ cách chữa.',
    awkward: 'Cách nói và vẻ ngoài của bạn hơi lệch, nên người ta đọc ý bạn trật một chút. Hỏi lại cho chắc.'
  },
  'mercury|mc': {
    blend: 'Bạn đi lên bằng chữ nghĩa và khả năng trình bày, người ta gọi bạn khi cần một người nói cho ra chuyện. Hãy có một chỗ công khai mang tên bạn và viết đều ở đó.',
    flow: 'Nghề của bạn và đầu óc của bạn khớp nhau nên bạn tiến mà không phải diễn. Cứ nhận việc đòi giải thích và kết nối thông tin.',
    tense: 'Bạn khó nói gọn về việc mình làm, nên người ngoài đánh giá bạn thấp hơn thực lực. Việc nên làm: viết một câu duy nhất về việc mình làm, rồi dùng đi dùng lại cho tới lúc nó mượt.',
    awkward: 'Cách nghĩ và con đường nghề hơi so le, nên bạn thấy mình làm việc không đúng sở trường. Chỉnh từng phần việc một.'
  },

  /* --- Sao Kim --- */
  'venus|mars': {
    blend: 'Bạn muốn ai là theo đuổi khá thẳng, và sức hút của bạn có nhiệt. Trong tình cảm bạn sống động nhưng cũng dễ nóng lạnh. Giữ một sân thể thao hay sáng tạo để đổ phần hiếu thắng vào.',
    flow: 'Dịu dàng và quyết liệt trong bạn hợp tác tốt: bạn tỏ ý mà không làm người kia thấy bị đẩy. Lợi thế rõ trong tình cảm và trong bán hàng.',
    tense: 'Bạn vừa muốn chinh phục vừa muốn được yên, nên tới rồi lùi làm người kia không đọc nổi. Chuyện tiền và chuyện yêu cũng dễ trộn vào nhau. Việc nên làm: nói rõ mình đang muốn gì ở giai đoạn này, một câu thôi, thay vì để hành động tự nói.',
    awkward: 'Cái bạn thích và cái bạn đuổi theo không cùng hướng, nên bạn hay chọn rồi thấy không phải. Chỉnh dần, đừng tự kết luận là mình kém duyên.'
  },
  'venus|jupiter': {
    blend: 'Bạn hào phóng và thích cái đẹp, tận hưởng không tiếc tay - ở gần bạn người ta thấy đời dễ chịu. Cái giá là chi vượt mức: đặt trước một hạn mức rồi dùng hết trong đó.',
    flow: 'Duyên của bạn mở cửa thật, và người ta muốn làm ăn với bạn. Hãy coi việc xây quan hệ là một phần công việc chính thức, vì đó là chỗ bạn mạnh nhất.',
    tense: 'Bạn muốn nhiều hơn mức vừa: trong tình cảm thì lý tưởng hoá, trong tiêu pha thì quá tay, rồi sau đó phải thắt. Việc nên làm: tự động chuyển một phần thu nhập đi ngay khi tiền về, rồi sống bằng phần còn lại.',
    awkward: 'Sở thích và lòng rộng của bạn hơi vướng nhau, nên bạn cho đi lệch chỗ. Hỏi người ta cần gì trước khi cho.'
  },
  'venus|saturn': {
    blend: 'Bạn thận trọng trong tình cảm, cần thời gian mới tin, và coi cam kết là chuyện nghiêm túc. Quan hệ của bạn vào muộn nhưng bền - không phải bạn kém duyên, chỉ là đồng hồ của bạn chạy chậm hơn ở vùng này.',
    flow: 'Bạn yêu có trách nhiệm mà không nặng nề, và giữ được một quan hệ đi đường dài. Đây là lợi thế lớn mà người ta chỉ thấy sau nhiều năm.',
    tense: 'Bạn thấy mình chưa đủ đáng được yêu, nên hoặc cố làm cho xứng, hoặc tự rút trước khi bị từ chối. Tiền và tình cũng hay vướng vào nhau. Việc nên làm: nhận một lời khen mà không đáp lại bằng một câu hạ mình - tập đúng chuyện nhỏ đó.',
    awkward: 'Sở thích và kỷ luật của bạn chưa khớp, nên bạn vừa muốn hưởng vừa thấy tội. Chia rõ ra: một khoản để hưởng, phần còn lại để dành.'
  },
  'venus|uranus': {
    blend: 'Bạn bị hút vào người khác thường và cần khoảng riêng trong quan hệ. Tình cảm của bạn tới nhanh và đổi hình dạng giữa đường. Nói trước nhu cầu tự do của mình, đừng để nó bật ra thành biến mất.',
    flow: 'Bạn giữ được quan hệ mà vẫn thoáng, và có khiếu thẩm mỹ lệch khỏi lối thường. Cứ đi theo gu riêng, nó là tài sản.',
    tense: 'Vừa gần là bạn muốn chạy, vừa xa là bạn muốn về - nên quan hệ của bạn hay đứt nối. Việc nên làm: thoả thuận trước về khoảng riêng của mỗi người, cụ thể bằng thời gian, thay vì bỏ đi khi thấy ngột.',
    awkward: 'Cái bạn thích và nhu cầu tự do của bạn vướng nhau. Chỉnh theo từng giai đoạn là cách sống được.'
  },
  'venus|neptune': {
    blend: 'Bạn yêu bằng lý tưởng và dễ dựng người kia đẹp hơn thật. Khiếu nghệ thuật rõ - hãy đổ phần mộng vào việc sáng tác, rồi đợi đủ lâu để thấy người ta đúng như họ là.',
    flow: 'Bạn thương người một cách tự nhiên và cảm được cái đẹp ở chỗ người khác bỏ qua. Nghề hình ảnh, nhạc hay chăm sóc dùng đúng chỗ này.',
    tense: 'Bạn yêu một bức tranh chứ không yêu một người, nên vỡ mộng là chuyện lặp lại. Cũng dễ nhận vai người đi cứu. Việc rất cụ thể: sau ba tháng, viết ra những gì bạn thật sự biết về họ - chỉ dữ kiện, không suy diễn.',
    awkward: 'Sở thích và trí tưởng tượng của bạn lệch pha, nên bạn khó nói mình muốn gì. Nói thành lời, đừng chờ người ta tự hiểu.'
  },
  'venus|pluto': {
    blend: 'Tình cảm của bạn mãnh liệt và có sức biến đổi, hiếm khi nhẹ nhàng. Tiền và tình dễ dính vào nhau. Hãy nói rõ chuyện tiền và ranh giới từ lúc còn tốt đẹp, đừng đợi tới lúc rối.',
    flow: 'Bạn yêu sâu mà không phải siết, và những quan hệ của bạn làm cả hai bên lớn lên. Đây là chiều sâu mà nhiều người tìm cả đời.',
    tense: 'Bạn giằng trong tình cảm: ghen, muốn nắm, hoặc gặp người muốn nắm bạn. Dễ có một lần đổ vỡ làm bạn khác đi hẳn. Việc nên làm: khi thấy mình muốn siết, hỏi mình đang sợ mất gì - và nói câu đó ra với người kia.',
    awkward: 'Cách yêu và phần mãnh liệt trong bạn không vừa nhau, nên nó hay bật ra lệch chỗ. Gọi tên nó là bước đầu.'
  },
  'venus|northNode': {
    blend: 'Quan hệ và cái đẹp chính là con đường của bạn, nên đầu tư vào đó không lệch. Cứ để quan hệ là nơi bạn học.',
    flow: 'Bạn lớn lên qua người khác một cách tự nhiên và êm. Nhớ chọn người xứng, vì đây là kênh chính của bạn.',
    tense: 'Hướng của bạn đòi bạn mở lòng trong khi bạn muốn giữ, nên mỗi lần tới gần đều hơi trái tay. Việc nên làm: nói ra một điều mình muốn trong quan hệ, mỗi tuần một lần.',
    awkward: 'Sở thích hiện tại và hướng cần đến chưa khớp, nên bạn hay chọn người quen kiểu cũ. Chỉnh dần.'
  },
  'venus|southNode': {
    blend: 'Bạn có một kiểu quan hệ rất quen tay, vào là biết đường. Tiện, nhưng cũng là lý do bạn lặp lại cả phần không tốt - hãy nhìn xem mình đang chọn theo nếp nào.',
    flow: 'Cách yêu sẵn của bạn làm mọi thứ êm, ít phải học. Giữ nó, nhưng đừng để nó chọn người thay bạn.',
    tense: 'Kiểu quan hệ cũ kéo bạn lại đúng lúc bạn muốn khác, nên bạn hay quay về mẫu người cũ rồi thất vọng y như lần trước. Việc nên làm: viết ra ba điểm chung của những người cũ, rồi tự đặt một điều kiện mới.',
    awkward: 'Nếp yêu quen và hướng mới vướng nhau. Mang phần tốt sang, bỏ phần lặp.'
  },
  'venus|asc': {
    blend: 'Sức hút của bạn nằm ngay ở bề mặt, người ta thấy dễ chịu khi ở gần trước cả khi bạn làm gì. Hãy đàm phán gặp mặt, đừng chốt việc lớn qua tin nhắn.',
    flow: 'Vẻ ngoài và cách yêu của bạn khớp nhau nên bạn gây thiện cảm tự nhiên và lâu. Dùng nó vào nghề tiếp xúc người.',
    tense: 'Bạn muốn được thích tới mức làm mềm cả ý của mình, rồi sau thấy mất mình. Việc nên làm: nói một câu tôi không đồng ý, đúng lúc - đó là món quà cho cả hai phía.',
    awkward: 'Vẻ ngoài và gu của bạn hơi lệch, nên người ta đoán sai bạn thích gì. Nói ra là xong.'
  },
  'venus|mc': {
    blend: 'Duyên với người mở cửa cho bạn trong nghề, và bạn dễ gặp người quan trọng qua công việc. Hãy để việc xây quan hệ thành một dòng chính thức trong lịch của bạn.',
    flow: 'Người ta muốn làm việc với bạn, và điều đó đưa bạn đi xa hơn năng lực thuần. Nhận những vai cần mặt tiền và tiếp xúc.',
    tense: 'Bạn muốn được lòng người mà cũng muốn được công nhận, nên hay nhường phần công rồi tiếc. Việc nên làm: nói rõ phần mình đã làm, bằng dữ kiện, không cần khoe.',
    awkward: 'Gu của bạn và con đường nghề chưa khớp, nên bạn làm việc mình không thấy đẹp. Chỉnh từng phần một.'
  },

  /* --- Sao Hoả --- */
  'mars|jupiter': {
    blend: 'Bạn dám đánh lớn và có sức theo đuổi, nên hay làm được việc người khác chỉ nói. Cái giá là nhận quá tay - hãy nhận ít hơn mức bạn tưởng là làm được.',
    flow: 'Sức của bạn gặp đúng cơ hội và bạn bước tới mà không phải gồng. Đây là lúc nên đặt mục tiêu lớn hơn hiện tại.',
    tense: 'Bạn lao vào quá nhiều cùng lúc rồi vỡ kế hoạch, hoặc đánh một cú quá cỡ. Việc nên làm: mỗi lúc chỉ một mục tiêu lớn, và viết ra con số với thời hạn trước khi bắt đầu.',
    awkward: 'Sức làm và tầm nhìn của bạn chưa khớp, nên bạn đi nhanh mà không rõ về đâu. Bẻ nhỏ mục tiêu ra.'
  },
  'mars|saturn': {
    blend: 'Bạn bền, chịu được việc nặng và việc lặp, nhưng luôn có cảm giác phải đẩy một cánh cửa nặng. Hãy chọn việc cần sức bền dài hơi - đó là chỗ bạn hơn người khác hẳn.',
    flow: 'Sức của bạn có kỷ luật: làm đều, làm tới, không bỏ dở. Rất đáng tin trong những việc nhiều năm mới ra kết quả.',
    tense: 'Bạn bị chặn ngay lúc muốn bước, nên hoặc dồn sức tới kiệt, hoặc kìm lại rồi tích thành cơn. Cơ thể gửi hoá đơn về: lưng, khớp, dạ dày, giấc ngủ. Việc nên làm: giảm cường độ nhưng tăng số lần, và coi việc nghỉ là một phần của công việc.',
    awkward: 'Sức và giới hạn của bạn vướng nhau, nên bạn hay hết hơi đúng lúc gần xong. Chia chặng ngắn hơn.'
  },
  'mars|uranus': {
    blend: 'Bạn phản ứng nhanh và bất ngờ, dám làm việc người khác không dám. Cũng dễ bốc đồng và dễ gặp tai nạn vì vội - hãy chậm lại nửa nhịp ở những việc dính tới an toàn.',
    flow: 'Bạn xoay rất nhanh khi tình thế đổi, đó là lợi thế thật trong khủng hoảng. Chọn việc có nhịp thay đổi cao.',
    tense: 'Bạn chịu khuôn một thời gian rồi bật ra một cái, thường làm người quanh bạn trở tay không kịp. Việc nên làm: cho mình một chỗ để lệch có chủ đích, trước khi nó tự bật ra lúc không nên.',
    awkward: 'Sức làm và nhu cầu phá lệ của bạn lệch pha, nên bạn hay bỏ việc giữa đường rồi quay lại. Chấp nhận nhịp đó và chia việc thành đoạn ngắn.'
  },
  'mars|neptune': {
    blend: 'Sức của bạn chảy chứ không bắn, nên bạn khó nhắm thẳng vào một đích. Bù lại bạn làm rất tốt những việc cần sự mềm - chữa lành, nghệ thuật, chăm người.',
    flow: 'Bạn hành động theo trực giác và nó thường đúng, không cần tính nhiều. Hãy tin nhịp đó, chỉ đừng bỏ hẳn phần kế hoạch.',
    tense: 'Sức bạn tiêu vào chỗ không rõ: làm nhiều mà không thấy kết quả, hoặc mệt không rõ nguyên do. Cũng khó nổi giận đúng lúc nên giận muộn. Việc nên làm: mỗi tuần chọn đúng một việc có kết quả nhìn thấy được, và làm xong nó.',
    awkward: 'Hành động và trực giác của bạn chưa khớp, nên bạn chần chừ rồi lại làm vội. Viết ra bước kế tiếp, chỉ một bước.'
  },
  'mars|pluto': {
    blend: 'Ý chí của bạn rất lớn: đã muốn là đi tới cùng và không lùi khi bị ép. Dùng cho tử tế thì đây là sức hiếm; dùng sai thì thành áp chế. Hãy chọn trước xem mình muốn dùng nó vào đâu.',
    flow: 'Bạn chịu được áp lực nặng mà không gãy, và làm được việc cần một người không nhúc nhích. Nghề xử lý khủng hoảng dùng đúng chỗ này.',
    tense: 'Bạn dồn lực tới mức tự hại, hoặc vào những cuộc tranh giành ai hơn ai. Cơn giận của bạn có sức tàn phá thật. Việc nên làm: có một chỗ đốt sức cường độ cao mỗi tuần, và rời khỏi phòng trước khi nói câu không rút lại được.',
    awkward: 'Sức và phần sâu trong bạn không vừa nhau, nên nó hay bật ra muộn và bật quá. Gọi tên nó sớm hơn một nhịp.'
  },
  'mars|northNode': {
    blend: 'Con đường của bạn đòi bạn dùng sức của mình, không phải bớt dùng. Cứ đứng ra và nhận việc - đó đúng là hướng trưởng thành.',
    flow: 'Bạn tiến lên bằng hành động và nó đến tự nhiên. Nhớ chọn đích đáng, vì bạn sẽ tới được.',
    tense: 'Hướng của bạn bắt bạn hành động theo kiểu trái tay, nên mỗi bước đều hơi cưỡng. Việc nên làm: một việc nhỏ trái tay làm đều mỗi tuần, đừng đợi thấy sẵn sàng.',
    awkward: 'Cách hành động hiện tại và hướng cần đến chưa khớp. Chỉnh dần, ghi lại cái gì đã chạy.'
  },
  'mars|southNode': {
    blend: 'Bạn có một kiểu phản ứng rất quen khi bị chắn, quen nên ít khi xét lại. Nó từng cứu bạn, nhưng giờ hãy thử một cách khác một lần xem sao.',
    flow: 'Sức sẵn của bạn chạy trơn nên bạn ít phải gồng. Giữ nó làm nền, đừng để nó thành phản xạ duy nhất.',
    tense: 'Phản xạ cũ bật ra đúng lúc bạn đang muốn làm khác, nên bạn hay nổi theo nếp rồi hối. Việc nên làm: nhận ra dấu hiệu đầu tiên của cơn, rồi làm một việc đã định trước thay cho phản xạ.',
    awkward: 'Lối phản ứng quen và hướng mới vướng nhau. Chuyển sức sang hình dạng mới thay vì dẹp nó.'
  },
  'mars|asc': {
    blend: 'Bạn xông lên trước và người ta thấy rõ khi bạn không vui - năng lượng của bạn nằm sát bề mặt. Cho cơ thể một chỗ đốt mỗi ngày, rồi tính bạn dịu đi hẳn.',
    flow: 'Bạn chủ động một cách tự nhiên và người ta theo. Hãy là người mở miệng trước và ra tay trước, đó là thế mạnh.',
    tense: 'Bạn phản ứng trước khi nghĩ, nên ấn tượng đầu về bạn hay gắt hơn ý bạn. Việc bù: một nhịp thở trước khi đáp, nhất là trong tin nhắn.',
    awkward: 'Sức làm và vẻ ngoài của bạn hơi lệch, nên người ta đoán sai mức quyết tâm của bạn. Nói thẳng ra là xong.'
  },
  'mars|mc': {
    blend: 'Tham vọng của bạn hiện ra thành việc làm, người ta biết bạn là người dám làm. Hãy nhắm vào vai có quyền quyết, đừng đứng ở chỗ chỉ thực thi.',
    flow: 'Sức của bạn và con đường nghề khớp nhau nên bạn tiến mà không phải tranh. Nhận việc nặng, nó trả công cho bạn.',
    tense: 'Bạn đẩy quá mạnh trong công việc rồi va vào người khác, hoặc bị chặn rồi dồn nén. Việc nên làm: định trước cái giá mình chịu trả cho tham vọng, rồi giữ đúng mức đó.',
    awkward: 'Sức và con đường nghề của bạn so le, nên bạn dồn lực vào chỗ không được tính công. Chỉnh phần việc, đừng chỉ làm nhiều hơn.'
  }
};
