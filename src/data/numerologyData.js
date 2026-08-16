// Dữ liệu Thần Số Học (Pythagorean numerology) - ba ngôn ngữ song song.
//
// Tra cứu theo NUMBER_MEANINGS[lang][number]. Ba bảng vi/en/zh có cùng bộ khoá
// (1-9, 11, 22, 33) và cùng bộ trường, nên component chỉ cần đổi lang là ra
// đúng bản dịch mà không phải xử lý trường hợp thiếu.

const VI = {
  1: {
    title: 'Người Tiên Phong',
    icon: '🔱',
    keywords: ['Độc lập', 'Khởi tạo', 'Lãnh đạo', 'Quyết đoán'],
    overview: 'Số 1 là điểm khởi đầu của mọi con số, mang năng lượng của người mở đường. Bạn sinh ra để đi trước, tự quyết và tự chịu trách nhiệm cho lựa chọn của mình.',
    lifePath: 'Hành trình của bạn là học cách đứng vững một mình trước khi dẫn dắt người khác. Vũ Trụ liên tục đặt bạn vào những tình huống buộc phải tự quyết định, vì chỉ khi tự chọn bạn mới thật sự trưởng thành. Thành công đến khi bạn dám khởi xướng thay vì chờ được cho phép.',
    expression: 'Năng lực trời cho của bạn là khả năng biến ý tưởng thành hành động đầu tiên. Người khác nhìn vào bạn để biết nên bắt đầu từ đâu.',
    soulUrge: 'Sâu thẳm bên trong, bạn khao khát được công nhận là chính mình - không phải bản sao của bất kỳ ai.',
    personality: 'Người mới gặp thấy ở bạn sự tự tin, dứt khoát và một chút xa cách của người quen tự lo liệu.',
    strengths: ['Ý chí mạnh, khó bị lung lay', 'Dám nhận trách nhiệm khi người khác lùi', 'Tư duy độc lập, ít chạy theo đám đông'],
    challenges: ['Dễ trở nên độc đoán khi bị phản đối', 'Ngại nhờ vả nên hay ôm việc quá sức', 'Cái tôi lớn có thể che mất góc nhìn của người khác'],
    career: 'Hợp vị trí sáng lập, quản lý, kinh doanh riêng, hoặc bất cứ vai trò nào cho bạn quyền tự quyết.',
    love: 'Cần một người bạn đời tôn trọng không gian riêng và không tìm cách kiểm soát bạn.'
  },
  2: {
    title: 'Người Kết Nối',
    icon: '🌗',
    keywords: ['Nhạy cảm', 'Hoà giải', 'Hợp tác', 'Kiên nhẫn'],
    overview: 'Số 2 là năng lượng của sự cân bằng và kết nối. Bạn cảm nhận được điều người khác chưa nói ra và có tài xoa dịu những căng thẳng vô hình.',
    lifePath: 'Bài học đời bạn là học cách yêu thương mà không đánh mất chính mình. Bạn thường được đặt vào vai trò cầu nối giữa hai phía đối lập, và mỗi lần hoà giải thành công là một lần bạn hiểu thêm về giá trị của mình. Sức mạnh của bạn nằm ở sự mềm mại, không phải ở việc gồng lên cạnh tranh.',
    expression: 'Bạn có tài ngoại giao bẩm sinh, biết chọn đúng lời vào đúng lúc để mọi người chịu ngồi lại với nhau.',
    soulUrge: 'Trái tim bạn tìm kiếm sự bình yên, một mối quan hệ sâu sắc và cảm giác được thuộc về.',
    personality: 'Bạn toát ra sự dịu dàng, dễ gần, khiến người lạ nhanh chóng thấy an toàn khi ở cạnh.',
    strengths: ['Lắng nghe sâu, thấu cảm tự nhiên', 'Làm việc nhóm rất tốt', 'Kiên nhẫn với những tiến trình chậm'],
    challenges: ['Hay nhường nhịn tới mức tự làm khổ mình', 'Nhạy cảm quá mức với lời chê', 'Chần chừ khi phải ra quyết định lớn'],
    career: 'Hợp nghề tư vấn, nhân sự, chăm sóc khách hàng, trị liệu, điều phối dự án.',
    love: 'Yêu sâu và chung thuỷ, nhưng cần học cách nói ra nhu cầu của mình thay vì chờ đối phương đoán.'
  },
  3: {
    title: 'Người Sáng Tạo',
    icon: '🎭',
    keywords: ['Biểu đạt', 'Lạc quan', 'Nghệ thuật', 'Giao tiếp'],
    overview: 'Số 3 mang năng lượng của ngôn từ, màu sắc và niềm vui. Bạn có khả năng thổi sức sống vào những thứ khô khan và làm người khác thấy nhẹ lòng.',
    lifePath: 'Đời bạn xoay quanh việc tìm ra tiếng nói riêng và dám dùng nó. Sẽ có giai đoạn bạn giấu tài năng đi vì sợ bị đánh giá, nhưng năng lượng số 3 chỉ nở hoa khi được biểu đạt ra ngoài. Càng chia sẻ, bạn càng nhận lại nhiều.',
    expression: 'Bạn diễn đạt giỏi bằng lời nói, chữ viết hoặc hình ảnh - đó là kênh dẫn năng lượng chính của bạn.',
    soulUrge: 'Bên trong, bạn muốn được nhìn thấy, được lắng nghe và được sống trong một thế giới nhiều màu sắc.',
    personality: 'Người khác thấy bạn vui vẻ, dí dỏm và có sức hút xã giao tự nhiên.',
    strengths: ['Truyền cảm hứng bằng cách kể chuyện', 'Phục hồi tinh thần nhanh sau va vấp', 'Nhìn ra cái đẹp ở nơi người khác bỏ qua'],
    challenges: ['Dễ phân tán, bắt đầu nhiều hơn kết thúc', 'Che giấu nỗi buồn sau vẻ ngoài vui vẻ', 'Nói nhiều hơn làm khi thiếu kỷ luật'],
    career: 'Hợp sáng tạo nội dung, marketing, thiết kế, giảng dạy, biểu diễn, truyền thông.',
    love: 'Cần người bạn đời biết cười cùng bạn và cho bạn không gian để bay bổng.'
  },
  4: {
    title: 'Người Kiến Tạo',
    icon: '🧱',
    keywords: ['Kỷ luật', 'Bền bỉ', 'Thực tế', 'Đáng tin'],
    overview: 'Số 4 là nền móng. Bạn là người biến kế hoạch thành hệ thống, biến lời hứa thành kết quả đo đếm được.',
    lifePath: 'Con đường của bạn là xây dựng từng viên gạch một, không đi tắt. Vũ Trụ hay thử thách bạn bằng những giai đoạn phải làm lại từ đầu, để bạn hiểu rằng thứ bền vững luôn cần thời gian. Phần thưởng đến muộn nhưng ở lại lâu.',
    expression: 'Bạn giỏi tổ chức, lập quy trình và giữ cho mọi thứ vận hành trơn tru.',
    soulUrge: 'Bạn khao khát sự an toàn - một mái nhà, một công việc ổn định, một tương lai nhìn thấy được.',
    personality: 'Bạn cho người khác cảm giác chắc chắn, nghiêm túc và có thể trông cậy.',
    strengths: ['Rất đáng tin, đã hứa là làm', 'Chịu được áp lực dài hạn', 'Tư duy quy trình rõ ràng'],
    challenges: ['Cứng nhắc, khó chấp nhận thay đổi đột ngột', 'Lo xa quá mức thành căng thẳng', 'Hay tự ép mình làm việc không nghỉ'],
    career: 'Hợp tài chính - kế toán, kỹ thuật, xây dựng, vận hành, quản lý chất lượng.',
    love: 'Yêu bằng hành động cụ thể hơn lời ngọt ngào; cần người hiểu ngôn ngữ tình yêu đó.'
  },
  5: {
    title: 'Người Tự Do',
    icon: '🕊️',
    keywords: ['Tự do', 'Trải nghiệm', 'Linh hoạt', 'Thay đổi'],
    overview: 'Số 5 là gió. Bạn cần chuyển động, cần cái mới, và héo dần trong những khuôn khổ chật hẹp.',
    lifePath: 'Đời bạn là chuỗi trải nghiệm đa dạng, nhiều bước ngoặt hơn người thường. Bài học lớn nhất là phân biệt giữa tự do thật sự và việc bỏ chạy khỏi trách nhiệm. Khi biết chọn giới hạn cho mình, bạn trở thành người vừa bay được vừa đi tới đích.',
    expression: 'Bạn thích nghi nhanh, học nghề mới nhanh, và xoay chuyển tình thế giỏi.',
    soulUrge: 'Bên trong bạn là tiếng gọi của những chân trời chưa đặt chân tới.',
    personality: 'Bạn cuốn hút, năng động, khiến người khác thấy cuộc sống thú vị hơn.',
    strengths: ['Thích nghi rất nhanh với môi trường mới', 'Không sợ rủi ro', 'Kết nối rộng, quen biết nhiều giới'],
    challenges: ['Cả thèm chóng chán', 'Khó cam kết dài hạn', 'Dễ sa vào hưởng thụ quá đà'],
    career: 'Hợp kinh doanh, du lịch, truyền thông, bán hàng, nghề tự do, công việc phải di chuyển.',
    love: 'Cần một mối quan hệ có hơi thở và sự mới mẻ, không phải một chiếc lồng đẹp.'
  },
  6: {
    title: 'Người Chăm Sóc',
    icon: '🏵️',
    keywords: ['Trách nhiệm', 'Gia đình', 'Yêu thương', 'Bao dung'],
    overview: 'Số 6 là năng lượng của tổ ấm và sự chở che. Bạn tự nhiên trở thành chỗ dựa cho những người quanh mình.',
    lifePath: 'Hành trình của bạn gắn liền với gia đình, cộng đồng và việc chăm lo cho người khác. Bài học là học cách cho đi mà vẫn giữ lại phần cho mình, vì số 6 rất dễ kiệt sức trong vai trò người gánh vác. Khi bạn tự chăm sóc mình tốt, tình yêu bạn cho đi mới thật sự lành.',
    expression: 'Bạn có tài tạo dựng không gian ấm áp và khiến người khác cảm thấy được che chở.',
    soulUrge: 'Bạn muốn được cần đến, được yêu thương trong một mái ấm hài hoà.',
    personality: 'Bạn toát ra sự ấm áp, chín chắn, khiến người ta muốn tâm sự.',
    strengths: ['Trách nhiệm cao với người thân', 'Có gu thẩm mỹ và biết chăm chút chi tiết', 'Giải quyết mâu thuẫn gia đình khéo léo'],
    challenges: ['Hay ôm việc của người khác vào mình', 'Đặt tiêu chuẩn quá cao rồi thất vọng', 'Khó nói lời từ chối'],
    career: 'Hợp giáo dục, y tế, chăm sóc sức khoẻ, nội thất, ẩm thực, dịch vụ gia đình.',
    love: 'Là người bạn đời tận tuỵ, nhưng cần tránh biến tình yêu thành sự kiểm soát vì lo lắng.'
  },
  7: {
    title: 'Người Tìm Đạo',
    icon: '🔭',
    keywords: ['Chiêm nghiệm', 'Trí tuệ', 'Tâm linh', 'Phân tích'],
    overview: 'Số 7 là con số của người quan sát. Bạn không tin điều gì chỉ vì ai đó nói vậy - bạn phải tự đi tới tận cùng câu hỏi.',
    lifePath: 'Đời bạn là hành trình đi tìm sự thật phía sau bề mặt. Sẽ có những giai đoạn cô đơn, nhưng đó là khoảng lặng cần thiết để bạn nghe được tiếng nói bên trong. Khi kết hợp trực giác với lý trí, bạn trở thành người hiểu chuyện sâu sắc hiếm có.',
    expression: 'Bạn có năng lực phân tích, nghiên cứu và nhìn thấu bản chất vấn đề.',
    soulUrge: 'Bạn khao khát hiểu biết và một khoảng riêng thật sự yên tĩnh.',
    personality: 'Người khác thấy bạn kín đáo, bí ẩn và có chiều sâu.',
    strengths: ['Tư duy sắc, không dễ bị dẫn dắt', 'Trực giác mạnh', 'Chuyên môn sâu ở lĩnh vực mình chọn'],
    challenges: ['Dễ tự cô lập khi tổn thương', 'Hoài nghi quá mức, khó mở lòng', 'Suy nghĩ nhiều hơn hành động'],
    career: 'Hợp nghiên cứu, phân tích dữ liệu, công nghệ, tâm lý, tâm linh - trị liệu, giảng dạy chuyên sâu.',
    love: 'Cần người kiên nhẫn với sự kín tiếng của bạn và tôn trọng khoảng lặng bạn cần.'
  },
  8: {
    title: 'Người Quyền Lực',
    icon: '⚖️',
    keywords: ['Tham vọng', 'Tài chính', 'Bản lĩnh', 'Nhân quả'],
    overview: 'Số 8 là con số của quyền lực và dòng chảy vật chất. Bạn có bản năng làm chủ nguồn lực và tổ chức những việc lớn.',
    lifePath: 'Hành trình của bạn là học cách cầm quyền lực mà không bị nó cầm lại. Số 8 sống rất rõ luật nhân quả: gieo gì gặt nấy, nhanh và sòng phẳng. Khi bạn dùng sức mạnh của mình để nâng người khác lên, của cải và uy tín tự tìm đến.',
    expression: 'Bạn có tài nhìn ra cơ hội, định giá đúng và điều phối nguồn lực hiệu quả.',
    soulUrge: 'Bên trong, bạn muốn được tự chủ về tài chính và được ghi nhận vì thành quả thật.',
    personality: 'Bạn toát ra khí chất quyền uy, chuyên nghiệp, khó xem thường.',
    strengths: ['Bản lĩnh trước áp lực và rủi ro lớn', 'Tư duy chiến lược và con số tốt', 'Phục hồi nhanh sau thất bại'],
    challenges: ['Dễ đánh đồng giá trị bản thân với thu nhập', 'Hay áp đặt trong công việc', 'Làm quá sức, bỏ quên sức khoẻ và gia đình'],
    career: 'Hợp quản trị doanh nghiệp, tài chính - đầu tư, bất động sản, luật, kinh doanh quy mô lớn.',
    love: 'Cần người bạn đời hiểu tham vọng của bạn và không thấy bị bỏ rơi vì công việc.'
  },
  9: {
    title: 'Người Nhân Ái',
    icon: '🌍',
    keywords: ['Bao dung', 'Lý tưởng', 'Buông bỏ', 'Phụng sự'],
    overview: 'Số 9 là con số cuối, mang năng lượng của sự hoàn tất và cho đi. Bạn nhìn cuộc đời bằng tầm rộng và trái tim mềm.',
    lifePath: 'Đời bạn là bài học về buông bỏ - buông những gì đã hết duyên để nhường chỗ cho điều lớn hơn. Bạn thường được đặt vào hoàn cảnh phải tha thứ, phải chấp nhận mất mát, và mỗi lần như vậy tâm bạn lại rộng thêm. Số 9 sống trọn khi phụng sự điều gì đó lớn hơn bản thân.',
    expression: 'Bạn có khả năng truyền cảm hứng và làm cầu nối giữa những nhóm người rất khác nhau.',
    soulUrge: 'Bạn muốn cuộc đời mình để lại điều gì đó có ý nghĩa cho người khác.',
    personality: 'Bạn cho cảm giác nhân hậu, từng trải và không phán xét.',
    strengths: ['Bao dung hiếm có', 'Tầm nhìn rộng, ít tính toán vụn vặt', 'Truyền cảm hứng cho cộng đồng'],
    challenges: ['Ôm nỗi buồn của thiên hạ vào mình', 'Khó dứt điểm những mối quan hệ đã cạn', 'Lý tưởng hoá rồi vỡ mộng'],
    career: 'Hợp công tác xã hội, giáo dục, y tế cộng đồng, nghệ thuật, phi lợi nhuận, chữa lành.',
    love: 'Yêu rộng lượng và vị tha, nhưng cần học cách đặt ranh giới để không bị lợi dụng.'
  },
  11: {
    title: 'Bậc Thầy Trực Giác',
    icon: '💫',
    keywords: ['Trực giác', 'Truyền cảm hứng', 'Nhạy bén', 'Thức tỉnh'],
    overview: 'Số 11 là số bậc thầy đầu tiên - phiên bản rung động cao của số 2. Bạn cảm nhận được những tầng năng lượng mà người khác không thấy.',
    lifePath: 'Bạn đến đây để thức tỉnh chính mình rồi soi sáng cho người khác. Áp lực của số 11 rất lớn: hệ thần kinh nhạy, dễ căng thẳng, và nửa đầu đời thường loay hoay giữa việc sống như số 2 bình thường hay dám bước vào vai trò dẫn dắt tinh thần. Khi bạn tin vào trực giác của mình, mọi thứ vào đúng chỗ.',
    expression: 'Bạn nói ra những điều chạm thẳng vào bên trong người nghe, dù không cố gắng.',
    soulUrge: 'Bạn khao khát ý nghĩa tâm linh và sự kết nối vượt trên bề mặt.',
    personality: 'Bạn có một luồng năng lượng đặc biệt khiến người khác vừa bị hút vừa hơi dè chừng.',
    strengths: ['Trực giác sắc bén khác thường', 'Truyền cảm hứng mạnh mẽ', 'Nhìn thấy tiềm năng ẩn của người khác'],
    challenges: ['Lo âu và quá tải thần kinh', 'Tự nghi ngờ chính trực giác của mình', 'Dao động cảm xúc mạnh'],
    career: 'Hợp trị liệu, tâm linh, giảng dạy, nghệ thuật, tư vấn, dẫn dắt cộng đồng.',
    love: 'Cần một mối quan hệ có chiều sâu tinh thần; tình yêu hời hợt làm bạn héo.'
  },
  22: {
    title: 'Bậc Thầy Kiến Tạo',
    icon: '🏛️',
    keywords: ['Tầm nhìn', 'Hiện thực hoá', 'Quy mô', 'Di sản'],
    overview: 'Số 22 là số quyền năng nhất - phiên bản rung động cao của số 4. Bạn có thể biến giấc mơ lớn thành công trình có thật.',
    lifePath: 'Bạn mang tiềm năng tạo ra thứ phục vụ được rất nhiều người. Nhưng số 22 chỉ mở khoá khi bạn chịu làm phần việc nhàm chán của số 4: kỷ luật, chi tiết, kiên trì nhiều năm. Nhiều người mang số 22 sống cả đời ở mức số 4 vì không dám mơ đủ lớn.',
    expression: 'Bạn vừa nhìn được bức tranh tổng thể vừa biết chính xác phải bắt đầu từ đâu.',
    soulUrge: 'Bạn muốn để lại một di sản cụ thể, chạm được, đo được.',
    personality: 'Bạn cho cảm giác vững chãi và có tầm, khiến người khác muốn đi theo.',
    strengths: ['Hiện thực hoá được ý tưởng quy mô lớn', 'Chịu áp lực dài hạn rất tốt', 'Kết hợp được tầm nhìn và kỷ luật'],
    challenges: ['Áp lực tự đặt lên vai quá nặng', 'Cầu toàn tới mức trì hoãn khởi động', 'Dễ kiệt sức vì ôm đồm'],
    career: 'Hợp sáng lập doanh nghiệp, kiến trúc, quy hoạch, chuyển đổi tổ chức, dự án cộng đồng lớn.',
    love: 'Cần người bạn đời đủ vững để đi đường dài cùng tham vọng của bạn.'
  },
  33: {
    title: 'Bậc Thầy Chữa Lành',
    icon: '🕯️',
    keywords: ['Từ bi', 'Chữa lành', 'Dẫn dắt', 'Hy sinh'],
    overview: 'Số 33 là số bậc thầy hiếm nhất - rung động cao của số 6. Đây là năng lượng của tình thương vô điều kiện và sự dẫn dắt bằng tấm gương.',
    lifePath: 'Bạn đến để chữa lành - bằng lời nói, bằng sự có mặt, hoặc đơn giản bằng cách sống. Bài học của số 33 là cho đi từ sự đủ đầy chứ không phải từ sự thiếu thốn, vì hy sinh mà oán trách thì không còn là từ bi. Khi bạn tự chữa lành mình trước, ảnh hưởng của bạn lan rất xa.',
    expression: 'Bạn có khả năng nâng đỡ tinh thần người khác chỉ bằng cách hiện diện.',
    soulUrge: 'Bạn muốn thấy nỗi đau của người khác được vơi đi.',
    personality: 'Bạn toát ra sự bao dung và một sự bình an khiến người ta muốn ở gần.',
    strengths: ['Từ bi sâu sắc và thật lòng', 'Truyền dạy bằng chính đời sống', 'Chịu đựng và thấu hiểu phi thường'],
    challenges: ['Hy sinh tới mức đánh mất bản thân', 'Gánh cảm xúc của quá nhiều người', 'Khó chấp nhận rằng mình cũng cần được giúp'],
    career: 'Hợp trị liệu, giáo dục, y tế, tôn giáo - tâm linh, thiện nguyện, nghệ thuật chữa lành.',
    love: 'Cần người biết chăm sóc ngược lại bạn, thay vì chỉ nhận từ bạn.'
  }
};

const EN = {
  1: {
    title: 'The Pioneer',
    icon: '🔱',
    keywords: ['Independence', 'Initiative', 'Leadership', 'Decisiveness'],
    overview: 'One is where every number begins, carrying the energy of the trailblazer. You came here to go first, to decide for yourself and to own the outcome.',
    lifePath: 'Your journey is learning to stand alone before you lead anyone else. Life keeps placing you in situations where nobody can choose for you, because only your own choices mature you. Success arrives the moment you dare to start instead of waiting for permission.',
    expression: 'Your natural gift is turning an idea into the very first action. Others look at you to know where to begin.',
    soulUrge: 'Deep down you long to be recognised as yourself - not as a copy of anyone.',
    personality: 'People first read confidence, decisiveness and the slight distance of someone used to managing alone.',
    strengths: ['Strong will that is hard to shake', 'Takes responsibility when others step back', 'Independent thinking, rarely follows the crowd'],
    challenges: ['Can turn authoritarian when opposed', 'Reluctant to ask for help, so overloads yourself', 'A large ego can hide other viewpoints'],
    career: 'Founding roles, management, your own business, or anything that grants real autonomy.',
    love: 'You need a partner who respects your space and does not try to control you.'
  },
  2: {
    title: 'The Peacemaker',
    icon: '🌗',
    keywords: ['Sensitivity', 'Diplomacy', 'Cooperation', 'Patience'],
    overview: 'Two is the energy of balance and connection. You sense what people have not said yet and know how to soften invisible tension.',
    lifePath: 'Your lesson is to love without losing yourself. Life places you between opposing sides again and again, and each reconciliation teaches you more about your own worth. Your power is in softness, not in competing harder.',
    expression: 'You have natural diplomacy - the right words at the right moment to get people back at the same table.',
    soulUrge: 'Your heart looks for peace, one deep relationship and the feeling of belonging.',
    personality: 'You radiate gentleness and approachability; strangers feel safe near you quickly.',
    strengths: ['Deep listening and natural empathy', 'Excellent in teams', 'Patient with slow processes'],
    challenges: ['Yields until it hurts you', 'Over-sensitive to criticism', 'Hesitates on big decisions'],
    career: 'Counselling, human resources, customer care, therapy, project coordination.',
    love: 'You love deeply and loyally, but must learn to voice your needs instead of waiting to be guessed.'
  },
  3: {
    title: 'The Communicator',
    icon: '🎭',
    keywords: ['Expression', 'Optimism', 'Artistry', 'Communication'],
    overview: 'Three carries the energy of words, colour and joy. You breathe life into dry things and leave people feeling lighter.',
    lifePath: 'Your life turns on finding your own voice and daring to use it. There will be a stretch where you hide your talent for fear of judgement, but three only blossoms when expressed outward. The more you share, the more comes back.',
    expression: 'You express beautifully in speech, writing or imagery - that is your main channel.',
    soulUrge: 'Inside, you want to be seen, to be heard, and to live in a world full of colour.',
    personality: 'People see you as cheerful, witty and naturally magnetic in company.',
    strengths: ['Inspires through storytelling', 'Bounces back quickly after setbacks', 'Finds beauty where others walk past'],
    challenges: ['Scatters easily, starts more than finishes', 'Hides sadness behind cheerfulness', 'Talks more than acts without discipline'],
    career: 'Content creation, marketing, design, teaching, performance, media.',
    love: 'You need a partner who laughs with you and leaves room for your flights of imagination.'
  },
  4: {
    title: 'The Builder',
    icon: '🧱',
    keywords: ['Discipline', 'Endurance', 'Practicality', 'Reliability'],
    overview: 'Four is the foundation. You turn plans into systems and promises into measurable results.',
    lifePath: 'Your path is laid one brick at a time, with no shortcuts. Life tests you with periods of starting over so you learn that anything durable takes time. Your rewards come late but they stay.',
    expression: 'You organise well, build processes and keep everything running smoothly.',
    soulUrge: 'You long for security - a home, steady work, a future you can actually see.',
    personality: 'You give others a sense of solidity, seriousness and dependability.',
    strengths: ['Highly reliable - a promise made is a promise kept', 'Withstands long-term pressure', 'Clear process thinking'],
    challenges: ['Rigid when change comes suddenly', 'Worries far ahead until it becomes stress', 'Pushes yourself to work without rest'],
    career: 'Finance and accounting, engineering, construction, operations, quality management.',
    love: 'You love through concrete acts rather than sweet words; you need someone who reads that language.'
  },
  5: {
    title: 'The Explorer',
    icon: '🕊️',
    keywords: ['Freedom', 'Experience', 'Flexibility', 'Change'],
    overview: 'Five is wind. You need movement and novelty, and you wither inside narrow frames.',
    lifePath: 'Your life is a string of varied experiences with more turning points than most. The great lesson is telling real freedom apart from running from responsibility. Once you choose your own limits, you become someone who can fly and still arrive.',
    expression: 'You adapt fast, learn new trades fast and turn situations around well.',
    soulUrge: 'Inside you is the call of horizons you have not walked yet.',
    personality: 'You are magnetic and energetic, making life feel more interesting to others.',
    strengths: ['Adapts very fast to new environments', 'Unafraid of risk', 'Wide network across very different circles'],
    challenges: ['Enthusiasm cools quickly', 'Struggles with long commitments', 'Can slide into overindulgence'],
    career: 'Business, travel, media, sales, freelance work, anything involving movement.',
    love: 'You need a relationship with air and freshness in it, not a beautiful cage.'
  },
  6: {
    title: 'The Nurturer',
    icon: '🏵️',
    keywords: ['Responsibility', 'Family', 'Love', 'Compassion'],
    overview: 'Six is the energy of home and shelter. You naturally become the one everyone leans on.',
    lifePath: 'Your journey is bound to family, community and caring for others. The lesson is to give while keeping something for yourself, because six burns out easily in the role of the carrier. When you look after yourself well, the love you give truly heals.',
    expression: 'You create warm spaces and make people feel protected.',
    soulUrge: 'You want to be needed and loved inside a harmonious home.',
    personality: 'You radiate warmth and maturity; people want to confide in you.',
    strengths: ['Deep responsibility toward loved ones', 'Good taste and care for detail', 'Handles family conflict gracefully'],
    challenges: ['Takes on other people problems as your own', 'Sets standards so high that disappointment follows', 'Finds it hard to say no'],
    career: 'Education, healthcare, wellness, interiors, food, family services.',
    love: 'A devoted partner, but must avoid turning love into control born of worry.'
  },
  7: {
    title: 'The Seeker',
    icon: '🔭',
    keywords: ['Reflection', 'Wisdom', 'Spirituality', 'Analysis'],
    overview: 'Seven is the observer. You do not believe something because you were told - you go to the bottom of the question yourself.',
    lifePath: 'Your life is a search for the truth behind the surface. There will be lonely stretches, but that silence is exactly what lets you hear your inner voice. When intuition and reason meet, you become rarely wise.',
    expression: 'You analyse, research and see through to the heart of a problem.',
    soulUrge: 'You crave understanding and a genuinely quiet space of your own.',
    personality: 'Others read you as reserved, mysterious and deep.',
    strengths: ['Sharp thinking, hard to mislead', 'Strong intuition', 'Deep expertise in your chosen field'],
    challenges: ['Isolates when hurt', 'Sceptical to the point of not opening up', 'Thinks more than acts'],
    career: 'Research, data analysis, technology, psychology, spiritual work and therapy, advanced teaching.',
    love: 'You need someone patient with your reserve who respects the silence you require.'
  },
  8: {
    title: 'The Powerhouse',
    icon: '⚖️',
    keywords: ['Ambition', 'Finance', 'Fortitude', 'Cause and effect'],
    overview: 'Eight is the number of power and material flow. You instinctively command resources and organise large undertakings.',
    lifePath: 'Your journey is learning to hold power without being held by it. Eight lives cause and effect openly: you reap what you sow, quickly and squarely. When you use your strength to lift others, wealth and standing follow.',
    expression: 'You spot opportunity, price it correctly and allocate resources efficiently.',
    soulUrge: 'Inside you want financial autonomy and recognition for real achievement.',
    personality: 'You carry an air of authority and professionalism that is hard to dismiss.',
    strengths: ['Steady under heavy pressure and risk', 'Strong strategic and numerical thinking', 'Recovers quickly from failure'],
    challenges: ['Confuses self-worth with income', 'Can be domineering at work', 'Overworks and neglects health and family'],
    career: 'Corporate leadership, finance and investment, real estate, law, large-scale business.',
    love: 'You need a partner who understands your ambition and does not feel abandoned to your work.'
  },
  9: {
    title: 'The Humanitarian',
    icon: '🌍',
    keywords: ['Compassion', 'Idealism', 'Letting go', 'Service'],
    overview: 'Nine is the last number, carrying completion and giving. You see life widely and feel it softly.',
    lifePath: 'Your life is a lesson in release - letting go of what has run its course to make room for something larger. You are repeatedly asked to forgive and to accept loss, and each time your heart widens. Nine lives fully when serving something bigger than itself.',
    expression: 'You inspire and bridge groups of people who are very different from each other.',
    soulUrge: 'You want your life to leave something meaningful behind for others.',
    personality: 'You feel kind, well-travelled in spirit and non-judgemental.',
    strengths: ['Rare tolerance', 'Wide vision, little pettiness', 'Inspires communities'],
    challenges: ['Carries the sorrow of the world', 'Struggles to end relationships already finished', 'Idealises, then is disillusioned'],
    career: 'Social work, education, public health, the arts, non-profits, healing work.',
    love: 'You love generously and forgivingly, but must learn boundaries so you are not taken advantage of.'
  },
  11: {
    title: 'The Intuitive Master',
    icon: '💫',
    keywords: ['Intuition', 'Inspiration', 'Sensitivity', 'Awakening'],
    overview: 'Eleven is the first master number - the high vibration of two. You sense layers of energy others cannot see.',
    lifePath: 'You came to awaken yourself and then light the way for others. The pressure of eleven is real: a sensitive nervous system, easy overwhelm, and a first half of life spent torn between living as an ordinary two or stepping into spiritual leadership. When you trust your intuition, everything falls into place.',
    expression: 'You say things that land straight inside the listener, even without trying.',
    soulUrge: 'You crave spiritual meaning and connection beyond the surface.',
    personality: 'You carry an unusual current that both draws people in and makes them slightly careful.',
    strengths: ['Unusually sharp intuition', 'Powerfully inspiring', 'Sees hidden potential in others'],
    challenges: ['Anxiety and nervous overload', 'Doubting your own intuition', 'Strong emotional swings'],
    career: 'Therapy, spiritual work, teaching, the arts, advisory roles, community leadership.',
    love: 'You need a relationship with spiritual depth; shallow love makes you wilt.'
  },
  22: {
    title: 'The Master Builder',
    icon: '🏛️',
    keywords: ['Vision', 'Manifestation', 'Scale', 'Legacy'],
    overview: 'Twenty-two is the most powerful number - the high vibration of four. You can turn a large dream into a structure that actually exists.',
    lifePath: 'You carry the potential to build something that serves a great many people. But twenty-two only unlocks when you accept the dull work of four: discipline, detail, years of persistence. Many who carry twenty-two live at the level of four because they never dared to dream large enough.',
    expression: 'You see the whole picture and know exactly where to start.',
    soulUrge: 'You want to leave a legacy that is concrete, touchable and measurable.',
    personality: 'You feel solid and far-sighted, which makes people want to follow.',
    strengths: ['Realises ideas at scale', 'Withstands long-term pressure very well', 'Combines vision with discipline'],
    challenges: ['Puts crushing pressure on yourself', 'Perfectionism that delays starting', 'Burns out from taking on too much'],
    career: 'Founding companies, architecture, planning, organisational transformation, large community projects.',
    love: 'You need a partner steady enough to walk the long road beside your ambition.'
  },
  33: {
    title: 'The Master Teacher',
    icon: '🕯️',
    keywords: ['Compassion', 'Healing', 'Guidance', 'Sacrifice'],
    overview: 'Thirty-three is the rarest master number - the high vibration of six. This is unconditional love and leadership by example.',
    lifePath: 'You came to heal - through words, through presence, or simply through the way you live. The lesson of thirty-three is to give from fullness rather than from lack, because sacrifice with resentment is no longer compassion. When you heal yourself first, your influence travels far.',
    expression: 'You lift other people simply by being present.',
    soulUrge: 'You want to see other people pain eased.',
    personality: 'You radiate tolerance and a calm that people want to sit near.',
    strengths: ['Deep and genuine compassion', 'Teaches through your own life', 'Extraordinary endurance and understanding'],
    challenges: ['Sacrifices until you lose yourself', 'Carries too many people emotions', 'Struggles to accept that you need help too'],
    career: 'Therapy, education, healthcare, spiritual and religious work, charity, healing arts.',
    love: 'You need someone who cares for you back rather than only receiving from you.'
  }
};

const ZH = {
  1: {
    title: '先锋者',
    icon: '🔱',
    keywords: ['独立', '开创', '领导', '果断'],
    overview: '一是万数之始，带着开路者的能量。你生来就要走在前面，自己决定，也自己承担结果。',
    lifePath: '你的功课是先学会独自站稳，再去带领别人。宇宙不断把你放进无人能代你决定的处境，因为只有自己的选择才能让你真正成熟。当你敢于开始而不是等待许可，成功便到来。',
    expression: '你天生的才能是把想法化为第一个行动。别人看着你，才知道该从哪里起步。',
    soulUrge: '内心深处，你渴望被认可为你自己，而不是任何人的复制品。',
    personality: '初见你的人会看到自信、果断，以及习惯独自打理一切的那点疏离。',
    strengths: ['意志坚定，不易动摇', '别人退缩时你敢承担', '独立思考，不随波逐流'],
    challenges: ['被反对时容易变得专断', '不愿求助，常常揽事过量', '自我过强会遮住他人的视角'],
    career: '适合创办、管理、自主创业，或任何给你决定权的岗位。',
    love: '需要一位尊重你独处空间、不试图控制你的伴侣。'
  },
  2: {
    title: '协调者',
    icon: '🌗',
    keywords: ['敏感', '调和', '合作', '耐心'],
    overview: '二是平衡与连结的能量。你能感受到别人尚未说出口的话，也懂得化解无形的紧张。',
    lifePath: '你此生的功课是爱人而不失去自己。你常被放在两方对立之间做桥梁，每一次调和成功，都让你更明白自身的价值。你的力量在于柔软，而不在硬碰硬。',
    expression: '你有天生的外交才能，懂得在对的时刻说对的话，让大家重新坐下来。',
    soulUrge: '你的心寻求安宁、一段深刻的关系，以及归属感。',
    personality: '你散发温柔与亲和，陌生人很快就能在你身边感到安全。',
    strengths: ['深度倾听，自然共情', '团队合作极佳', '对缓慢的过程有耐心'],
    challenges: ['退让到委屈自己', '对批评过度敏感', '面对重大决定时犹豫'],
    career: '适合咨询、人力资源、客户服务、疗愈、项目协调。',
    love: '爱得深且忠诚，但要学会说出需求，而不是等对方猜。'
  },
  3: {
    title: '创造者',
    icon: '🎭',
    keywords: ['表达', '乐观', '艺术', '沟通'],
    overview: '三带着语言、色彩与喜悦的能量。你能为枯燥之物注入生气，让人心里轻松起来。',
    lifePath: '你的一生围绕着找到自己的声音并敢于使用它。你会有一段时间因怕被评判而藏起才华，但三只有向外表达才会开花。分享得越多，回来的也越多。',
    expression: '你擅长用言语、文字或图像表达，那是你主要的能量出口。',
    soulUrge: '内心里，你想被看见、被听见，活在一个色彩丰富的世界。',
    personality: '别人眼中的你开朗、机智，天生有社交魅力。',
    strengths: ['以故事激励人心', '受挫后精神恢复快', '在别人忽略之处看见美'],
    challenges: ['容易分心，开头多结尾少', '把难过藏在开朗背后', '缺乏纪律时说多做少'],
    career: '适合内容创作、市场营销、设计、教学、表演、传媒。',
    love: '需要一位能陪你一起笑、给你飞翔空间的伴侣。'
  },
  4: {
    title: '建造者',
    icon: '🧱',
    keywords: ['纪律', '坚韧', '务实', '可靠'],
    overview: '四是地基。你把计划变成系统，把承诺变成可衡量的结果。',
    lifePath: '你的路要一砖一瓦地砌，没有捷径。宇宙常用重头再来的阶段考验你，让你明白牢固之物都需要时间。你的回报来得晚，却留得久。',
    expression: '你善于组织、建立流程，让一切平稳运转。',
    soulUrge: '你渴望安全感——一个家、一份稳定的工作、一个看得见的未来。',
    personality: '你给人踏实、认真、可依靠的感觉。',
    strengths: ['极为可靠，答应就做到', '扛得住长期压力', '流程思维清晰'],
    challenges: ['僵硬，难以接受突变', '过度远虑变成焦虑', '常逼自己不休息地工作'],
    career: '适合财务会计、工程、建筑、运营、质量管理。',
    love: '用具体行动而非甜言蜜语去爱；需要懂这种语言的人。'
  },
  5: {
    title: '自由者',
    icon: '🕊️',
    keywords: ['自由', '体验', '灵活', '变化'],
    overview: '五是风。你需要移动、需要新鲜，在狭窄的框架里会慢慢枯萎。',
    lifePath: '你的一生是一连串多样的体验，转折比常人更多。最大的功课是分辨真正的自由与逃避责任。当你懂得为自己设限，你就成了既能飞、又能抵达的人。',
    expression: '你适应快、学新技能快，也很会扭转局面。',
    soulUrge: '你心里是尚未踏足的远方在呼唤。',
    personality: '你充满吸引力与活力，让别人觉得生活更有意思。',
    strengths: ['对新环境适应极快', '不惧风险', '人脉广，跨界结交'],
    challenges: ['三分钟热度', '难以长期承诺', '容易沉溺于享乐'],
    career: '适合商贸、旅游、传媒、销售、自由职业、需要移动的工作。',
    love: '需要一段有呼吸、有新鲜感的关系，而不是一个漂亮的笼子。'
  },
  6: {
    title: '关怀者',
    icon: '🏵️',
    keywords: ['责任', '家庭', '爱', '包容'],
    overview: '六是家与庇护的能量。你自然而然成为身边人的依靠。',
    lifePath: '你的旅程与家庭、社群和照顾他人紧紧相连。功课是在付出的同时留一份给自己，因为六在承担者的角色里最容易耗竭。当你把自己照顾好，你给出的爱才真正能疗愈人。',
    expression: '你善于营造温暖的空间，让人感到被守护。',
    soulUrge: '你想被需要、被爱，住在一个和谐的家里。',
    personality: '你散发温暖与成熟，让人想向你倾诉。',
    strengths: ['对亲人责任心极强', '有审美，注重细节', '化解家庭矛盾很有分寸'],
    challenges: ['常把别人的事揽到身上', '标准太高而后失望', '很难说不'],
    career: '适合教育、医疗、健康照护、室内设计、餐饮、家庭服务。',
    love: '是尽心的伴侣，但要避免因担忧而把爱变成控制。'
  },
  7: {
    title: '探道者',
    icon: '🔭',
    keywords: ['沉思', '智慧', '灵性', '分析'],
    overview: '七是观察者之数。你不会因为别人说了就相信，你必须自己追问到底。',
    lifePath: '你的一生是寻找表象背后真相的旅程。会有孤独的阶段，但那份安静正是让你听见内在声音的必要留白。当直觉与理性相遇，你会成为难得的通透之人。',
    expression: '你具备分析、研究、看穿问题本质的能力。',
    soulUrge: '你渴望理解，也渴望一处真正安静的独处空间。',
    personality: '别人觉得你内敛、神秘、有深度。',
    strengths: ['思维锐利，不易被误导', '直觉强', '在所选领域有深厚专业'],
    challenges: ['受伤时容易自我封闭', '怀疑过度，难以敞开', '想得多做得少'],
    career: '适合研究、数据分析、科技、心理、灵性疗愈、深度教学。',
    love: '需要一位对你的沉默有耐心、尊重你所需留白的人。'
  },
  8: {
    title: '掌权者',
    icon: '⚖️',
    keywords: ['野心', '财务', '魄力', '因果'],
    overview: '八是权力与物质流动之数。你本能地掌控资源，也擅长组织大局。',
    lifePath: '你的旅程是学会握住权力而不被它反握。八活得因果分明：种什么得什么，又快又直接。当你用自身的力量托举他人，财富与声望自会到来。',
    expression: '你能看出机会、给出正确的估值，并高效调度资源。',
    soulUrge: '内心里，你想要财务上的自主，以及因真实成果而获得的认可。',
    personality: '你带着权威与专业的气场，让人不敢轻视。',
    strengths: ['面对高压与风险有魄力', '战略与数字思维强', '失败后恢复快'],
    challenges: ['容易把自我价值等同于收入', '工作中常有强势之嫌', '过劳，忽略健康与家庭'],
    career: '适合企业管理、金融投资、房地产、法律、大规模经营。',
    love: '需要一位理解你的野心、不会因你的工作而感到被冷落的伴侣。'
  },
  9: {
    title: '博爱者',
    icon: '🌍',
    keywords: ['包容', '理想', '放下', '奉献'],
    overview: '九是末位之数，带着圆满与给予的能量。你以宽广的眼光看世界，以柔软的心去感受。',
    lifePath: '你的一生是关于放下的功课——放下缘尽之事，为更大的事物腾出位置。你屡屡被放进必须原谅、必须接受失去的处境，而每一次，你的心都更宽一分。九在奉献于比自己更大的事物时活得最完整。',
    expression: '你能激励人心，也能在极不相同的人群之间搭桥。',
    soulUrge: '你希望自己的一生能为他人留下有意义的东西。',
    personality: '你给人仁厚、历练、不轻易评判的感觉。',
    strengths: ['罕见的包容', '视野宽广，不斤斤计较', '能激励一整个群体'],
    challenges: ['把众人的悲伤扛在身上', '难以了断早已耗尽的关系', '理想化之后幻灭'],
    career: '适合社会工作、教育、公共卫生、艺术、非营利、疗愈。',
    love: '爱得宽厚无私，但要学会设立界线，以免被利用。'
  },
  11: {
    title: '直觉大师',
    icon: '💫',
    keywords: ['直觉', '启发', '敏锐', '觉醒'],
    overview: '十一是第一个大师数——二的高频版本。你能感受到别人看不见的能量层次。',
    lifePath: '你来此先唤醒自己，再去照亮他人。十一的压力真实存在：神经敏感、容易过载，前半生常在做一个普通的二、还是踏入精神引领角色之间摇摆。当你信任自己的直觉，一切便各就各位。',
    expression: '你说出的话会直接落进听者心里，即便你并未刻意。',
    soulUrge: '你渴望灵性层面的意义，以及超越表象的连结。',
    personality: '你带着一股特别的气场，让人既被吸引又略有敬畏。',
    strengths: ['异常敏锐的直觉', '强大的感召力', '看得见他人隐藏的潜能'],
    challenges: ['焦虑与神经过载', '怀疑自己的直觉', '情绪起伏大'],
    career: '适合疗愈、灵性工作、教学、艺术、咨询、社群引领。',
    love: '需要一段有精神深度的关系；浅薄的爱会让你枯萎。'
  },
  22: {
    title: '建设大师',
    icon: '🏛️',
    keywords: ['远见', '实现', '规模', '传承'],
    overview: '二十二是最具力量之数——四的高频版本。你能把宏大的梦想变成真实存在的工程。',
    lifePath: '你带着造就惠及众人之物的潜能。但二十二只有在你肯做四那份枯燥功课时才会解锁：纪律、细节、多年的坚持。许多带着二十二的人一生停在四的层次，只因不敢把梦做得够大。',
    expression: '你既能看见全局，也清楚该从哪里下第一手。',
    soulUrge: '你想留下具体的、摸得着、量得出的传承。',
    personality: '你给人稳重而有格局的感觉，让人愿意跟随。',
    strengths: ['能把大规模构想落地', '极能承受长期压力', '兼具远见与纪律'],
    challenges: ['自我施加的压力过重', '完美主义拖延了启动', '揽事过多而耗竭'],
    career: '适合创办企业、建筑、规划、组织转型、大型社群项目。',
    love: '需要一位足够稳、能与你的野心走远路的伴侣。'
  },
  33: {
    title: '疗愈大师',
    icon: '🕯️',
    keywords: ['慈悲', '疗愈', '引领', '奉献'],
    overview: '三十三是最罕见的大师数——六的高频版本。这是无条件的爱，以及以身作则的引领。',
    lifePath: '你来此疗愈——用言语、用陪伴，或仅仅用你生活的方式。三十三的功课是从丰盛而非匮乏中给予，因为带着怨怼的牺牲已不再是慈悲。当你先疗愈自己，你的影响便传得很远。',
    expression: '你只要在场，就能托起别人的精神。',
    soulUrge: '你希望看见他人的痛苦被减轻。',
    personality: '你散发包容与一种让人愿意靠近的安宁。',
    strengths: ['深切而真诚的慈悲', '以自身生命教导他人', '非凡的承受力与理解力'],
    challenges: ['牺牲到失去自己', '承载了太多人的情绪', '难以承认自己也需要帮助'],
    career: '适合疗愈、教育、医疗、宗教灵性工作、公益、疗愈艺术。',
    love: '需要一位会反过来照顾你、而不只是索取的人。'
  }
};

export const NUMBER_MEANINGS = { vi: VI, en: EN, zh: ZH };

/* Năm cá nhân và tháng cá nhân đều rút gọn về 1-9 (không giữ số bậc thầy),
   nên mỗi bảng chỉ cần 9 mục.

   Năm cá nhân = ngày sinh + tháng sinh + năm cần xem.
   Tháng cá nhân = năm cá nhân + số thứ tự tháng dương lịch.

   Chu kỳ chạy theo năm dương lịch: tháng 1 mở đầu và tháng 12 khép lại một
   năm cá nhân. */
export const PERSONAL_YEAR = {
  vi: {
    1: {
      title: 'Năm Khởi Đầu',
      summary: 'Năm khởi đầu. Hạt giống gieo năm nay quyết định cả chu kỳ 9 năm tới - hãy bắt đầu thứ bạn thật sự muốn.',
      focus: 'Khởi xướng, tự quyết, đặt nền cho chu kỳ mới',
      advice: 'Hãy chủ động đề xuất và bắt đầu, đừng chờ ai cho phép.'
    },
    2: {
      title: 'Năm Vun Đắp Quan Hệ',
      summary: 'Năm của quan hệ và kiên nhẫn. Đừng ép tiến độ; hợp tác và chờ đúng thời điểm sẽ hiệu quả hơn lao tới.',
      focus: 'Hợp tác, lắng nghe, chờ đúng thời điểm',
      advice: 'Hãy nuôi dưỡng các mối quan hệ, năm nay bạn tiến nhờ người khác.'
    },
    3: {
      title: 'Năm Biểu Đạt',
      summary: 'Năm của biểu đạt và giao lưu. Cơ hội đến qua lời nói, sáng tạo và những người bạn mới gặp.',
      focus: 'Sáng tạo, giao tiếp, mở rộng quan hệ',
      advice: 'Hãy nói ra và cho người khác thấy thứ bạn làm được.'
    },
    4: {
      title: 'Năm Xây Nền',
      summary: 'Năm xây nền. Ít hào nhoáng, nhiều việc thật. Kỷ luật năm nay sẽ đỡ bạn suốt những năm sau.',
      focus: 'Kỷ luật, hệ thống, làm chắc từng bước',
      advice: 'Hãy làm cho xong phần nhàm chán, nó chính là nền của mọi năm sau.'
    },
    5: {
      title: 'Năm Biến Động',
      summary: 'Năm biến động và tự do. Thay đổi tới nhanh - hãy giữ sự linh hoạt và đừng bám chấp.',
      focus: 'Thay đổi, di chuyển, trải nghiệm mới',
      advice: 'Hãy giữ lịch trống một phần, năm nay cơ hội tới rất đột ngột.'
    },
    6: {
      title: 'Năm Gia Đình',
      summary: 'Năm của gia đình và trách nhiệm. Tổ ấm, người thân và các cam kết dài hạn được đặt lên bàn.',
      focus: 'Gia đình, cam kết, chăm sóc lẫn nhau',
      advice: 'Hãy dành thời gian thật cho người nhà, đừng chỉ gửi tiền về.'
    },
    7: {
      title: 'Năm Nhìn Vào Trong',
      summary: 'Năm nhìn vào bên trong. Chậm lại, học thêm, chữa lành. Đừng ép mình phải bung ra ngoài.',
      focus: 'Học hỏi, chiêm nghiệm, hồi phục',
      advice: 'Hãy cho phép mình chậm lại, đây không phải năm để bung sức.'
    },
    8: {
      title: 'Năm Thu Hoạch',
      summary: 'Năm thu hoạch về vật chất và quyền lực. Bản lĩnh và kỷ luật những năm trước sẽ được trả công.',
      focus: 'Tài chính, quyền lực, kết quả đo được',
      advice: 'Hãy dám đàm phán và đòi đúng giá trị công sức của mình.'
    },
    9: {
      title: 'Năm Khép Lại',
      summary: 'Năm khép lại chu kỳ. Buông những gì đã hết duyên để năm sau bắt đầu nhẹ nhàng.',
      focus: 'Kết thúc, buông bỏ, tổng kết chín năm',
      advice: 'Đừng khởi sự lớn năm nay, hãy dọn sạch để năm sau bắt đầu nhẹ.'
    }
  },
  en: {
    1: {
      title: 'A Year of Beginnings',
      summary: 'A year of beginnings. What you plant now shapes the whole nine-year cycle - start what you actually want.',
      focus: 'Initiative, self-direction, laying ground for a new cycle',
      advice: 'Propose and begin on your own - do not wait for permission.'
    },
    2: {
      title: 'A Year of Relationships',
      summary: 'A year of relationships and patience. Do not force the pace; cooperation and timing beat rushing.',
      focus: 'Cooperation, listening, waiting for the right moment',
      advice: 'Tend your relationships - this year you advance through other people.'
    },
    3: {
      title: 'A Year of Expression',
      summary: 'A year of expression and connection. Opportunity arrives through words, creativity and new people.',
      focus: 'Creativity, communication, widening your circle',
      advice: 'Speak up and let people see what you can actually do.'
    },
    4: {
      title: 'A Year of Foundations',
      summary: 'A year of foundations. Less glamour, more real work. This year discipline carries you for years after.',
      focus: 'Discipline, systems, one solid step at a time',
      advice: 'Finish the boring part - it is the ground every later year stands on.'
    },
    5: {
      title: 'A Year of Change',
      summary: 'A year of movement and freedom. Change arrives fast - stay flexible and hold nothing too tightly.',
      focus: 'Change, travel, new experience',
      advice: 'Keep part of your calendar open; this year opportunity arrives abruptly.'
    },
    6: {
      title: 'A Year of Family',
      summary: 'A year of family and responsibility. Home, loved ones and long-term commitments come to the table.',
      focus: 'Family, commitment, mutual care',
      advice: 'Give your people real time, not just money sent home.'
    },
    7: {
      title: 'A Year of Looking Inward',
      summary: 'A year of looking inward. Slow down, study, heal. Do not force yourself outward.',
      focus: 'Study, reflection, recovery',
      advice: 'Let yourself slow down - this is not the year to push hard outward.'
    },
    8: {
      title: 'A Year of Harvest',
      summary: 'A year of material harvest and authority. Earlier discipline and nerve get paid back.',
      focus: 'Money, authority, measurable results',
      advice: 'Negotiate, and ask for what your work is actually worth.'
    },
    9: {
      title: 'A Year of Closure',
      summary: 'A year that closes the cycle. Release what has run its course so next year can start light.',
      focus: 'Endings, release, reviewing nine years',
      advice: 'Do not launch anything big - clear the ground so next year starts light.'
    }
  },
  zh: {
    1: {
      title: '开始之年',
      summary: '开始之年。今年播下的种子决定未来九年的循环——去开始你真正想要的事。',
      focus: '开创、自主、为新循环奠基',
      advice: '主动提议并动手，别等谁来批准。'
    },
    2: {
      title: '关系之年',
      summary: '关系与耐心之年。别硬赶进度；合作与时机胜过猛冲。',
      focus: '合作、倾听、等待恰当时机',
      advice: '好好经营关系，今年你靠他人推进。'
    },
    3: {
      title: '表达之年',
      summary: '表达与交流之年。机会来自言语、创作，以及新遇见的人。',
      focus: '创作、沟通、拓展人脉',
      advice: '说出来，让别人看见你真正的本事。'
    },
    4: {
      title: '筑基之年',
      summary: '打地基之年。少些光鲜，多些实事。今年的纪律会撑住往后数年。',
      focus: '纪律、体系、一步一个脚印',
      advice: '把枯燥的部分做完，它是往后每一年的地基。'
    },
    5: {
      title: '变动之年',
      summary: '变动与自由之年。变化来得快——保持灵活，不要执着。',
      focus: '变化、走动、新体验',
      advice: '留出一部分空档，今年机会来得很突然。'
    },
    6: {
      title: '家庭之年',
      summary: '家庭与责任之年。家、亲人与长期承诺都会被摆上台面。',
      focus: '家庭、承诺、彼此照顾',
      advice: '给家人实实在在的时间，而不只是寄钱回去。'
    },
    7: {
      title: '内省之年',
      summary: '向内之年。慢下来、进修、疗愈。别逼自己向外冲。',
      focus: '进修、沉思、休养',
      advice: '允许自己慢下来，今年不是向外冲的年份。'
    },
    8: {
      title: '收成之年',
      summary: '物质与权力的收成之年。前几年的纪律与胆识会得到回报。',
      focus: '财务、权力、可衡量的成果',
      advice: '敢于谈判，索取与你付出相称的回报。'
    },
    9: {
      title: '收束之年',
      summary: '收束循环之年。放下缘尽之事，好让明年轻装启程。',
      focus: '结束、放下、总结九年',
      advice: '今年别开大局，清理干净好让明年轻装上阵。'
    }
  }
};

/* Tháng cá nhân mang cùng chủ đề với năm nhưng ở quy mô ngắn hơn: đây là nhịp
   để sắp lịch trong năm chứ không phải bước ngoặt cuộc đời. */
export const PERSONAL_MONTH = {
  vi: {
    1: { title: 'Tháng Khởi Động', summary: 'Tháng để mở màn: đề xuất ý tưởng, ký kết, bắt đầu việc mới.' },
    2: { title: 'Tháng Kết Nối', summary: 'Tháng của hợp tác và kiên nhẫn. Việc tiến chậm là bình thường, đừng ép.' },
    3: { title: 'Tháng Giao Tiếp', summary: 'Tháng thuận cho nói, viết, gặp gỡ và mọi việc cần sáng tạo.' },
    4: { title: 'Tháng Sắp Xếp', summary: 'Tháng dọn dẹp và làm việc nền: giấy tờ, quy trình, số liệu.' },
    5: { title: 'Tháng Thay Đổi', summary: 'Tháng nhiều biến động và di chuyển. Hãy chừa chỗ cho việc phát sinh.' },
    6: { title: 'Tháng Gia Đình', summary: 'Tháng dành cho người thân, tổ ấm và các trách nhiệm chung.' },
    7: { title: 'Tháng Tĩnh Lặng', summary: 'Tháng nên chậm lại: nghỉ ngơi, học thêm, xem lại kế hoạch.' },
    8: { title: 'Tháng Tiền Bạc', summary: 'Tháng thuận cho đàm phán, chốt hợp đồng và các quyết định tài chính.' },
    9: { title: 'Tháng Dọn Dẹp', summary: 'Tháng kết thúc và buông bỏ. Hoàn tất việc cũ thay vì mở việc mới.' }
  },
  en: {
    1: { title: 'Month of Starting', summary: 'A month to open: pitch ideas, sign things, begin new work.' },
    2: { title: 'Month of Connecting', summary: 'A month of cooperation and patience. Slow progress is normal - do not force it.' },
    3: { title: 'Month of Expression', summary: 'A good month for speaking, writing, meeting people and creative work.' },
    4: { title: 'Month of Ordering', summary: 'A month for tidying and groundwork: paperwork, process, numbers.' },
    5: { title: 'Month of Change', summary: 'A month of movement and disruption. Leave room for the unexpected.' },
    6: { title: 'Month of Family', summary: 'A month for loved ones, home and shared responsibilities.' },
    7: { title: 'Month of Quiet', summary: 'A month to slow down: rest, study, review your plans.' },
    8: { title: 'Month of Money', summary: 'A good month for negotiation, closing contracts and financial decisions.' },
    9: { title: 'Month of Clearing', summary: 'A month of endings and release. Finish old work rather than opening new.' }
  },
  zh: {
    1: { title: '启动之月', summary: '适合开局的月份：提案、签约、开始新工作。' },
    2: { title: '连结之月', summary: '合作与耐心之月。进展缓慢很正常，别硬推。' },
    3: { title: '表达之月', summary: '适合言谈、写作、会面与一切创意工作的月份。' },
    4: { title: '整理之月', summary: '适合整理与打底的月份：文书、流程、数据。' },
    5: { title: '变动之月', summary: '多变动与奔走的月份。请为突发之事留出余地。' },
    6: { title: '家庭之月', summary: '属于亲人、家与共同责任的月份。' },
    7: { title: '静养之月', summary: '宜放慢的月份：休息、进修、检视计划。' },
    8: { title: '财务之月', summary: '适合谈判、签定合同与财务决策的月份。' },
    9: { title: '清理之月', summary: '结束与放下的月份。收尾旧事，而非开启新事。' }
  }
};

/* Biểu đồ ngày sinh (Lo Shu): ý nghĩa khi một chữ số có mặt hoặc vắng mặt
   trong ngày tháng năm sinh. */
export const BIRTH_CHART_CELLS = {
  vi: {
    1: { label: 'Bản ngã', present: 'Bạn biết mình là ai và dám nói ra điều mình nghĩ.', missing: 'Khó khẳng định bản thân; cần luyện nói ra quan điểm sớm hơn.' },
    2: { label: 'Trực giác', present: 'Nhạy cảm với cảm xúc người khác, linh cảm khá chuẩn.', missing: 'Hay bỏ qua tín hiệu tinh tế; nên tập lắng nghe cảm nhận đầu tiên.' },
    3: { label: 'Trí tuệ', present: 'Học nhanh, tư duy tưởng tượng và ghi nhớ tốt.', missing: 'Cần lặp lại và ghi chép để nhớ lâu; hợp học qua thực hành.' },
    4: { label: 'Kỷ luật', present: 'Có tổ chức, biết sắp xếp và hoàn tất công việc.', missing: 'Dễ bừa bộn hoặc trì hoãn; nên dựa vào lịch và thói quen cố định.' },
    5: { label: 'Cân bằng', present: 'Trung tâm biểu đồ - bạn giữ được thăng bằng cảm xúc khá tốt.', missing: 'Cảm xúc dễ chao đảo khi có biến; thiền và vận động giúp nhiều.' },
    6: { label: 'Sáng tạo', present: 'Có gu, khéo tay và biết làm đẹp cho không gian sống.', missing: 'Ít quan tâm thẩm mỹ; có thể bồi đắp bằng nghệ thuật và thủ công.' },
    7: { label: 'Trải nghiệm', present: 'Học nhanh từ va vấp, hiểu đời qua chính mình.', missing: 'Ít đúc rút từ chuyện đã qua; nên viết nhật ký để rút bài học.' },
    8: { label: 'Thực tế', present: 'Giỏi việc tay chân, quản lý tiền bạc và chi tiết cụ thể.', missing: 'Dễ lơ là chuyện tiền nong; cần công cụ theo dõi thu chi.' },
    9: { label: 'Tham vọng', present: 'Có mục tiêu rõ và động lực bền để theo đuổi.', missing: 'Thiếu mục tiêu dài hạn; nên đặt mốc nhỏ để nuôi động lực.' }
  },
  en: {
    1: { label: 'Self', present: 'You know who you are and dare to say what you think.', missing: 'Hard to assert yourself; practise voicing your view earlier.' },
    2: { label: 'Intuition', present: 'Sensitive to other people feelings; your hunches are usually right.', missing: 'You skip subtle signals; practise trusting your first impression.' },
    3: { label: 'Mind', present: 'Fast learner with strong imagination and memory.', missing: 'You need repetition and notes to retain; learn by doing.' },
    4: { label: 'Discipline', present: 'Organised, tidy and good at finishing what you start.', missing: 'Clutter or procrastination creeps in; lean on calendars and fixed routines.' },
    5: { label: 'Balance', present: 'The centre of the chart - you hold emotional balance fairly well.', missing: 'Emotions wobble under change; meditation and movement help a lot.' },
    6: { label: 'Creativity', present: 'Good taste, skilled hands, and you make living spaces beautiful.', missing: 'Little interest in aesthetics; art and craft can build it up.' },
    7: { label: 'Experience', present: 'You learn fast from setbacks and understand life first-hand.', missing: 'You rarely extract lessons from the past; journalling helps.' },
    8: { label: 'Practicality', present: 'Good with hands-on work, money and concrete detail.', missing: 'Money matters slip; you need a tracking tool.' },
    9: { label: 'Ambition', present: 'Clear goals and steady drive to pursue them.', missing: 'Long-term goals are vague; set small milestones to feed momentum.' }
  },
  zh: {
    1: { label: '自我', present: '你清楚自己是谁，也敢说出心里的想法。', missing: '不易表明立场；要练习更早说出观点。' },
    2: { label: '直觉', present: '对他人情绪敏感，预感往往很准。', missing: '容易忽略细微信号；练习相信第一感觉。' },
    3: { label: '心智', present: '学得快，想象力与记忆力都不错。', missing: '需要重复与笔记才记得牢；适合在实作中学。' },
    4: { label: '纪律', present: '有条理，会整理，能把事情做完。', missing: '容易杂乱或拖延；靠日历与固定习惯来撑。' },
    5: { label: '平衡', present: '图表的中心——你的情绪平衡守得不错。', missing: '遇变动情绪易摇摆；冥想与运动帮助很大。' },
    6: { label: '创造', present: '有品味、手巧，懂得把生活空间弄美。', missing: '对美感兴趣不大；可用艺术与手作慢慢培养。' },
    7: { label: '历练', present: '能从挫折中快速学习，靠亲身经历读懂人生。', missing: '不太从过往提炼教训；写日记会很有用。' },
    8: { label: '务实', present: '擅长动手、理财与具体细节。', missing: '钱财事务容易疏忽；需要记账工具。' },
    9: { label: '抱负', present: '目标清晰，追求目标的动力持久。', missing: '长期目标模糊；设小里程碑来养动力。' }
  }
};

/* Mũi tên trong biểu đồ ngày sinh: ba ô thẳng hàng cùng có số (mũi tên sức
   mạnh) hoặc cùng trống (mũi tên khuyết). Bàn Lo Shu xếp theo hàng
   [4 9 2 / 3 5 7 / 8 1 6]. */
export const BIRTH_CHART_ARROWS = [
  { id: 'determination', cells: [4, 5, 6], vi: { name: 'Mũi tên Quyết Tâm', strong: 'Đã muốn là theo tới cùng, ít bỏ cuộc giữa chừng.', weak: 'Dễ nản khi gặp trở ngại kéo dài; cần chia mục tiêu thành chặng ngắn.' }, en: { name: 'Arrow of Determination', strong: 'Once you decide, you see it through and rarely quit halfway.', weak: 'Discouraged by long obstacles; break goals into short stages.' }, zh: { name: '决心之箭', strong: '一旦决定就走到底，很少半途而废。', weak: '遇到长期阻碍容易气馁；把目标切成短程。' } },
  { id: 'spirituality', cells: [3, 5, 7], vi: { name: 'Mũi tên Tâm Linh', strong: 'Trực giác và đức tin mạnh, hay có linh cảm đúng.', weak: 'Hoài nghi những gì không chứng minh được; cần trải nghiệm thật để tin.' }, en: { name: 'Arrow of Spirituality', strong: 'Strong intuition and faith; your hunches often land.', weak: 'Sceptical of what cannot be proven; you need lived proof to believe.' }, zh: { name: '灵性之箭', strong: '直觉与信念强，预感常常应验。', weak: '对无法证明之事存疑；需要亲身体验才相信。' } },
  { id: 'intellect', cells: [4, 9, 2], vi: { name: 'Mũi tên Trí Tuệ', strong: 'Tư duy sắc bén, phân tích và ghi nhớ vượt trội.', weak: 'Trí nhớ ngắn hạn hay trục trặc; nên ghi chép và dùng danh sách.' }, en: { name: 'Arrow of Intellect', strong: 'Sharp mind with outstanding analysis and recall.', weak: 'Short-term memory slips; write things down and use lists.' }, zh: { name: '智慧之箭', strong: '思维锐利，分析与记忆出众。', weak: '短期记忆易失手；多做笔记、用清单。' } },
  { id: 'emotion', cells: [3, 6, 9], vi: { name: 'Mũi tên Nhạy Cảm', strong: 'Đời sống nội tâm phong phú, đồng cảm sâu.', weak: 'Khó gọi tên cảm xúc của mình; nên tập diễn đạt cảm nhận thành lời.' }, en: { name: 'Arrow of Sensitivity', strong: 'Rich inner life and deep empathy.', weak: 'Hard to name your own feelings; practise putting emotion into words.' }, zh: { name: '情感之箭', strong: '内心世界丰富，共情深刻。', weak: '难以命名自己的情绪；练习把感受说成话。' } },
  { id: 'practical', cells: [1, 5, 9], vi: { name: 'Mũi tên Hành Động', strong: 'Nghĩ được là làm được, biến ý tưởng thành kết quả.', weak: 'Hay trì hoãn dù đã có kế hoạch; cần một người đồng hành nhắc nhở.' }, en: { name: 'Arrow of Action', strong: 'What you think, you execute - ideas become results.', weak: 'You delay even with a plan; an accountability partner helps.' }, zh: { name: '行动之箭', strong: '想得到就做得到，把想法变成结果。', weak: '有计划仍会拖延；需要有人督促同行。' } },
  { id: 'planner', cells: [1, 2, 3], vi: { name: 'Mũi tên Hoạch Định', strong: 'Sắp xếp và lên kế hoạch rất mạch lạc.', weak: 'Làm theo cảm hứng, thiếu trình tự; nên dùng mẫu kế hoạch có sẵn.' }, en: { name: 'Arrow of the Planner', strong: 'You organise and plan with real clarity.', weak: 'You work on impulse without sequence; use ready-made planning templates.' }, zh: { name: '规划之箭', strong: '组织与规划条理分明。', weak: '凭兴致行事、缺少次序；用现成的计划模板。' } },
  { id: 'willpower', cells: [7, 8, 9], vi: { name: 'Mũi tên Ý Chí', strong: 'Bền bỉ khác thường, chịu được đường dài.', weak: 'Dễ buông khi mệt; nên đặt phần thưởng nhỏ theo chặng.' }, en: { name: 'Arrow of Willpower', strong: 'Unusual staying power over the long haul.', weak: 'You let go when tired; set small rewards along the way.' }, zh: { name: '意志之箭', strong: '异常坚韧，扛得住长路。', weak: '累了就放手；沿途设一些小奖励。' } },
  { id: 'compassion', cells: [1, 4, 7], vi: { name: 'Mũi tên Thực Tế', strong: 'Rất thực tế, giỏi xoay xở việc cụ thể hằng ngày.', weak: 'Hay lơ lửng trong ý tưởng; cần người giúp đưa về mặt đất.' }, en: { name: 'Arrow of the Practical', strong: 'Very grounded and good at everyday practicalities.', weak: 'You float in ideas; you need someone to bring you back to earth.' }, zh: { name: '务实之箭', strong: '非常接地气，擅长日常实务。', weak: '容易飘在想法里；需要有人把你拉回地面。' } }
];
