// Ba tầng luận giải sâu còn lại cho bản tiếng Việt.
//
// 1. ASPECT_EDGE_VI   - phân biệt hai góc nằm cùng một nhóm bản chất. Bản
//    luận giải theo cặp ở aspectDetail*.js chia theo nhóm (blend / flow /
//    tense / awkward), nên Đối đỉnh và Vuông góc dùng chung một đoạn. Hai góc
//    đó khác nhau thật: một cái gặp qua người khác, một cái cọ trong chính
//    mình. Câu ở đây bù đúng chỗ khác biệt ấy.
//
// 2. PATTERN_APEX_VI  - hình mẫu lớn trước đây dùng một đoạn chung bất kể
//    hành tinh nào tạo ra nó, nên Hình Chữ T của ai cũng đọc giống nhau.
//    findPatterns đã trả về pattern.apex, dùng nó để nói đúng hành tinh đang
//    chịu áp lực.
//
// 3. BIG_THREE_VI     - ba trụ trước đây chỉ có một câu định nghĩa chung. Ở
//    đây ghép theo quan hệ nguyên tố giữa Mặt Trời và Mặt Trăng (16 tổ hợp),
//    cộng một câu về Cung Mọc theo nguyên tố, nên mỗi người đọc ra một bài
//    khác nhau thật.

/* ------------------------------------------------------------------ */
/* 1. PHÂN BIỆT TRONG CÙNG NHÓM GÓC                                    */
/* ------------------------------------------------------------------ */
export const ASPECT_EDGE_VI = {
  conjunction: 'Vì là góc dính nhau, hai bên không có khoảng cách nào để bạn nhìn chúng riêng ra - chúng luôn lên tiếng cùng lúc.',
  opposition: 'Vì là góc đối đỉnh, bạn thường không nhận ra nửa còn lại trong mình mà gặp nó qua một người bên ngoài - vợ chồng, đối tác, đối thủ.',
  square: 'Vì là góc vuông, nó cọ ngay trong chính bạn và đòi một hành động, không chịu để yên như góc đối đỉnh.',
  trine: 'Vì là góc thuận rộng, nó chạy sẵn tới mức bạn ít khi biết mình đang có nó.',
  sextile: 'Vì là góc thuận nhẹ, cửa chỉ hé chứ không đẩy bạn qua - khác góc thuận rộng, cái này phải tự bước mới có.',
  quincunx: 'Vì là góc lệch pha, hai bên không hiểu tiếng nhau nên phải chỉnh lại nhiều lần, không có lần nào xong hẳn.',
  semisextile: 'Vì là góc kề cạnh, ảnh hưởng nhẹ hơn hẳn góc lệch pha - ghi nhận là đủ, không cần dồn sức.'
};

/* ------------------------------------------------------------------ */
/* 2. HÀNH TINH Ở ĐỈNH HÌNH MẪU                                        */
/* Dùng cho Hình Chữ T và Yod - hai hình có điểm đỉnh rõ ràng.          */
/* ------------------------------------------------------------------ */
export const PATTERN_APEX_VI = {
  sun: 'Điểm chịu áp lực là Mặt Trời, nghĩa là chính cái tôi của bạn bị ép: bạn phải liên tục chứng minh mình là ai. Đây là lý do bạn làm được nhiều, và cũng là lý do bạn hiếm khi thấy đủ.',
  moon: 'Điểm chịu áp lực là Mặt Trăng, nên sức ép dồn vào đời sống cảm xúc và chuyện gia đình. Bạn xử lý cảm giác bằng cách làm việc, và cần chủ động chừa chỗ cho phần bên trong được nói.',
  mercury: 'Điểm chịu áp lực là Sao Thuỷ, nên nó dồn vào cách bạn nghĩ và nói: đầu óc chạy không nghỉ, hay phải nói lại cho rõ. Viết ra là cách xả tốt nhất cho cấu hình này.',
  venus: 'Điểm chịu áp lực là Sao Kim, nên chuyện tình cảm, tiền bạc và cảm giác được yêu là nơi căng nhất. Bạn học nhiều nhất qua các mối quan hệ, kể cả những mối không thành.',
  mars: 'Điểm chịu áp lực là Sao Hoả, nên sức ép thành hành động: bạn làm, làm nữa, và dễ cháy. Hãy cho cơ thể một chỗ đốt có kế hoạch, bằng không nó tự tìm đường ra.',
  jupiter: 'Điểm chịu áp lực là Sao Mộc, nên nó dồn vào niềm tin và chuyện mở rộng: bạn hay đứng trước những lựa chọn lớn hơn mức mình thấy sẵn sàng. Nhận ít hơn một bậc là cách giữ sức.',
  saturn: 'Điểm chịu áp lực là Sao Thổ, nên bạn gánh trách nhiệm từ sớm và gánh nhiều hơn phần mình. Đây là cấu hình của người bền, với cái giá là ít khi cho mình nghỉ.',
  uranus: 'Điểm chịu áp lực là Sao Thiên Vương, nên nó bật ra thành những lần đổi hướng gấp. Chừa sẵn chỗ để lệch thì bạn đỡ phải đập cả nền mỗi lần bồn chồn.',
  neptune: 'Điểm chịu áp lực là Sao Hải Vương, nên sức ép thành sự mơ hồ: bạn căng mà không gọi được tên nguyên nhân. Neo lại bằng việc cụ thể và một nếp sống đều.',
  pluto: 'Điểm chịu áp lực là Sao Diêm Vương, nên nó dồn vào quyền lực và những lần lột xác. Áp lực ở đây nặng nhưng cũng đổi bạn sâu nhất - đừng đi qua nó một mình.',
  northNode: 'Điểm chịu áp lực nằm ở Nút Bắc, nên chính hướng trưởng thành của bạn là chỗ bị ép. Đời sẽ cứ đẩy bạn về hướng đó cho tới khi bạn đi.',
  southNode: 'Điểm chịu áp lực nằm ở Nút Nam, nên sức ép dồn vào đúng lối mòn của bạn - nó bị ép để bạn thôi dựa vào đó.'
};

/* ------------------------------------------------------------------ */
/* 3. BA TRỤ THEO NGUYÊN TỐ                                            */
/* Mặt Trời là hướng đi, Mặt Trăng là nhu cầu. Quan hệ giữa hai nguyên  */
/* tố này là chỗ quyết định bạn sống với mình dễ hay khó, nên mười sáu  */
/* tổ hợp được viết riêng.                                              */
/* ------------------------------------------------------------------ */
export const SUN_MOON_ELEMENT_VI = {
  'fire|fire': 'Hướng bạn đi và thứ bạn cần cùng một chất lửa: bạn muốn hành động và cũng cần hành động mới thấy an. Rất ít giằng xé bên trong, nhưng cũng ít thứ phanh bạn lại - hãy nhờ một người điềm đạm giữ nhịp hộ.',
  'fire|earth': 'Bạn muốn xông lên nhưng chỉ an tâm khi mọi thứ chắc chắn, nên hay phanh chính mình giữa đà. Cách hoà hai bên: cứ bắt đầu, nhưng luôn có một phần dự phòng đã chuẩn bị sẵn - khi đó phần đất trong bạn thôi cản phần lửa.',
  'fire|air': 'Bạn muốn làm và cần hiểu, hai thứ này đẩy nhau đi rất nhanh. Bạn bắt đầu nhiều việc và nói hay về chúng; chỗ hụt là đoạn giữa, nên hãy chọn ít việc hơn và giao phần tỉ mỉ cho người khác.',
  'fire|water': 'Bạn muốn tiến lên nhưng cần được an toàn về cảm xúc trước đã, nên bên ngoài trông mạnh mà bên trong mềm hơn nhiều. Đừng để ai bảo bạn nhạy cảm là yếu - chỉ cần nói trước rằng mình cần gì, rồi phần lửa sẽ chạy thoải mái.',
  'earth|fire': 'Bạn xây chắc nhưng lại cần cảm giác hào hứng mới thấy sống, nên công việc ổn định đôi khi làm bạn tù. Cách giải: giữ nghề chắc, rồi chừa một phần đời cho những thứ bốc đồng vô hại.',
  'earth|earth': 'Cả hướng đi và nhu cầu của bạn đều cần thứ sờ được: bạn làm ra kết quả thật và yên tâm khi đời có nền. Rủi ro duy nhất là đứng lại quá lâu trong một chỗ đã hết nuôi mình - hãy tự đặt một mốc xem lại mỗi năm.',
  'earth|air': 'Bạn làm việc rất thực tế nhưng lại cần trao đổi và hiểu biết mới thấy ổn, nên làm một mình lâu là bạn cạn. Hãy chọn chỗ làm có người để bàn, hoặc giữ một nhóm nghề để nói chuyện đều.',
  'earth|water': 'Bạn xây và bạn cảm - đây là một trong những cặp dễ sống với chính mình nhất: thực tế mà không khô. Bạn chăm người bằng việc làm cụ thể. Nhớ là bạn thấm cảm xúc người khác khá nhiều, nên cần khoảng riêng để rút ra.',
  'air|fire': 'Bạn nghĩ và nói là chính, nhưng cần hành động mới thấy mình đang sống. Nên đừng ở lại quá lâu trong bàn luận - chốt một việc nhỏ và làm ngay, đó là cách phần lửa trong bạn được ăn.',
  'air|earth': 'Bạn sống bằng ý tưởng nhưng chỉ an tâm khi có nền vật chất, nên bạn là người nghĩ xa mà vẫn tính được đường về. Cấu hình khá cân; việc nên làm là biến mỗi ý thành một bước có thể tick, bằng không phần đất sẽ lo.',
  'air|air': 'Cả hướng đi và nhu cầu của bạn đều ở trong đầu: bạn cần hiểu, cần nói, cần kết nối. Rất linh hoạt, nhưng dễ sống trên lý thuyết - hãy về lại cơ thể bằng vận động, và cho phép mình cảm mà chưa cần gọi tên.',
  'air|water': 'Bạn muốn hiểu mọi thứ bằng lý lẽ nhưng lại cần được cảm nhận mới thấy an, nên hay phân tích chính cảm xúc của mình rồi vẫn không nguôi. Thứ tự đúng cho bạn là cảm trước, hiểu sau - hỏi mình đang thấy gì trước khi hỏi tại sao.',
  'water|fire': 'Bạn sống bằng cảm nhận nhưng cần nhiệt và chuyển động mới thấy mình còn sống, nên bạn dễ bị hút vào những người bốc. Hãy tự tạo nhiệt bằng một việc mình chủ động làm, đừng đi vay nhiệt của người khác.',
  'water|earth': 'Bạn cảm sâu và cần thứ chắc chắn để tựa vào - một cặp rất bền. Bạn chăm người và dựng được chỗ cho họ về. Điều nên canh là ở lại quá lâu trong một hoàn cảnh chỉ vì nó quen.',
  'water|air': 'Bạn cảm trước rồi cần nói ra mới xong, nên chưa kể hết là chưa nguôi. Nuôi vài kênh xả đều đặn là việc quan trọng với bạn hơn với phần lớn mọi người.',
  'water|water': 'Cả hướng đi và nhu cầu của bạn đều là cảm xúc: bạn đọc người rất nhanh và nhớ rất lâu. Sức mạnh thật, nhưng ranh giới là bài học lớn nhất đời bạn - hãy tập hỏi cảm giác này của mình hay của người vừa gặp.'
};

/* Cung Mọc là lớp người khác gặp trước, nên câu này nói về khoảng cách giữa
   vỏ ngoài và hai trụ bên trong. */
export const ASC_ELEMENT_VI = {
  fire: 'Cung Mọc hành Lửa nên người lạ thấy bạn nhanh nhẹn và dám nói - họ đoán bạn tự tin hơn mức bạn thấy mình.',
  earth: 'Cung Mọc hành Đất nên người lạ thấy bạn vững và đáng tin, đôi khi hơi khó gần lúc đầu - họ đoán bạn bình tĩnh hơn mức bạn thấy mình.',
  air: 'Cung Mọc hành Khí nên người lạ thấy bạn dễ nói chuyện và linh hoạt - họ đoán bạn thoải mái hơn mức bạn thấy mình.',
  water: 'Cung Mọc hành Nước nên người lạ thấy bạn dịu và kín - họ đoán bạn mềm hơn, hoặc khó đọc hơn, mức bạn thấy mình.'
};

/* ------------------------------------------------------------------ */
/* 4. BẢNG ĐỐI CHIẾU THUẬT NGỮ                                         */
/* Khách muốn tra thêm trên tài liệu nước ngoài thì cần đúng từ gốc.    */
/* Đặt trong phần hiểu thêm của mục góc chiếu và phẩm chất.             */
/* ------------------------------------------------------------------ */
export const TERM_TABLE_VI = [
  ['Lá số gốc', 'Natal chart / Birth chart'],
  ['Cung hoàng đạo', 'Zodiac sign'],
  ['Cung Mọc', 'Ascendant / Rising sign'],
  ['Thiên Đỉnh', 'Midheaven / MC'],
  ['Nhà (12 vùng đời sống)', 'House'],
  ['Hệ chia nhà', 'House system'],
  ['Đỉnh nhà', 'Cusp'],
  ['Góc chiếu', 'Aspect'],
  ['Sai số góc', 'Orb'],
  ['Nhà riêng', 'Domicile / Rulership'],
  ['Được nâng', 'Exaltation'],
  ['Đối nhà', 'Detriment'],
  ['Bị hạ', 'Fall'],
  ['Chủ tinh lá số', 'Chart ruler'],
  ['Điểm Phúc', 'Part of Fortune'],
  ['Nghịch hành', 'Retrograde'],
  ['Nút Bắc / Nút Nam', 'North Node / South Node'],
  ['Chùm sao', 'Stellium'],
  ['Nguyên tố', 'Element'],
  ['Tam thể', 'Modality']
];
