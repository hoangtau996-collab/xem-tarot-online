// Nhãn ngắn trên lá bài: nguyên tố và các từ khoá.
//
// Hai trường này nằm ngoài phần luận giải năm khía cạnh nhưng vẫn hiện ra màn
// hình - từ khoá là mấy con chữ nhỏ dưới tên lá ở tab Tra Cứu và trong ô chi
// tiết lá bài, nguyên tố nằm ngay cạnh tên. Bản tiếng Anh và tiếng Trung trước
// đây vẫn đọc thẳng dữ liệu gốc nên chỗ này lộ nguyên tiếng Việt.
//
// Tra theo chính chuỗi tiếng Việt chứ không theo id lá bài: 78 lá dùng chung
// 294 từ khoá (334 lượt), khoá theo chuỗi thì mỗi từ chỉ phải dịch một lần và
// dò lại cũng dễ hơn. Từ nào không có trong bảng thì giữ nguyên tiếng Việt.

const ELEMENT_EN = {
  'Lửa (Fire)': 'Fire',
  'Nước (Water)': 'Water',
  'Khí (Air)': 'Air',
  'Đất (Earth)': 'Earth'
};

const ELEMENT_ZH = {
  'Lửa (Fire)': '火',
  'Nước (Water)': '水',
  'Khí (Air)': '风',
  'Đất (Earth)': '土'
};

const KEYWORD_EN = {
  'Ám ảnh': 'Obsession', 'An toàn': 'Safety', 'Ảo ảnh': 'Illusion', 'Ảo tưởng': 'Fantasy',
  'Ăn mừng': 'Celebration', 'Ấm áp': 'Warmth', 'Bạn bè': 'Friendship', 'Bản lĩnh': 'Nerve',
  'Bao dung': 'Tolerance', 'Bảo vệ': 'Protection', 'Bất đồng': 'Disagreement', 'Bất lực': 'Powerlessness',
  'Bất ngờ': 'Surprise', 'Bế tắc': 'Deadlock', 'Bền bỉ': 'Endurance', 'Bền vững': 'Durability',
  'Bị bỏ rơi': 'Abandonment', 'Bí mật': 'Secrecy', 'Bình an': 'Peace', 'Bình minh': 'Dawn',
  'Bình tâm dần': 'Calm returning', 'Bỏ lỡ': 'Missed chance', 'Bóng tối': 'Shadow', 'Bốc đồng': 'Impulsiveness',
  'Buồn bã': 'Sorrow', 'Buông bỏ': 'Letting go', 'Cái tôi': 'Ego', 'Cám dỗ': 'Temptation',
  'Cảm hứng': 'Inspiration', 'Cam kết': 'Commitment', 'Cảm xúc mới': 'New feeling', 'Cảnh giác': 'Vigilance',
  'Cạnh tranh': 'Competition', 'Cân bằng': 'Balance', 'Cân đối': 'Proportion', 'Cần giúp đỡ': 'Needing help',
  'Cân nhắc': 'Weighing it up', 'Cấu trúc': 'Structure', 'Chạm đáy': 'Rock bottom', 'Chán nản': 'Discouragement',
  'Chăm chỉ': 'Diligence', 'Chăm lo': 'Caretaking', 'Chậm mà chắc': 'Slow and sure', 'Chia ly': 'Parting',
  'Chiêm nghiệm': 'Reflection', 'Chiến thắng': 'Victory', 'Chín chắn': 'Maturity', 'Chinh phục': 'Conquest',
  'Cho và nhận': 'Give and take', 'Chờ đợi': 'Waiting', 'Chờ kết quả': 'Awaiting results', 'Chờ mùa gặt': 'Awaiting harvest',
  'Chu cấp': 'Providing', 'Chu kỳ': 'Cycle', 'Chu kỳ mới': 'New cycle', 'Chuẩn bị': 'Preparation',
  'Chung vui': 'Shared joy', 'Chuyển động nhanh': 'Fast movement', 'Chuyển hoá': 'Transformation', 'Chuyển tiếp': 'Transition',
  'Chữa lành': 'Healing', 'Chưa quyết': 'Undecided', 'Chừng mực': 'Moderation', 'Công bằng': 'Fairness',
  'Cộng đồng': 'Community', 'Công minh': 'Impartiality', 'Cột mốc': 'Milestone', 'Cơ hội': 'Opportunity',
  'Cơ hội mới': 'New opportunity', 'Cơ hội tài chính': 'Financial opening', 'Dẫn dắt': 'Leading', 'Di sản': 'Legacy',
  'Dịu dàng': 'Gentleness', 'Dòng chảy cảm xúc': 'Emotional current', 'Dục vọng': 'Craving', 'Dứt khoát': 'Decisiveness',
  'Đa nhiệm': 'Juggling', 'Đam mê': 'Passion', 'Đáng tin': 'Trustworthy', 'Đánh giá lại': 'Reassessment',
  'Đạo đức': 'Ethics', 'Đảo lộn': 'Upheaval', 'Đau lòng': 'Heartbreak', 'Đầu tư dài hạn': 'Long-term investment',
  'Đi đường tắt': 'Cutting corners', 'Đi xa': 'Travel', 'Điềm tĩnh': 'Composure', 'Điều ước': 'A wish',
  'Định hướng': 'Direction', 'Định mệnh': 'Fate', 'Độc lập': 'Independence', 'Đổi góc nhìn': 'A change of view',
  'Đổi mới': 'Renewal', 'Đồng điệu': 'In tune', 'Đột phá trí tuệ': 'Mental breakthrough', 'Được công nhận': 'Recognition',
  'Được ghi nhận': 'Credit given', 'Gánh nặng': 'Burden', 'Gắn bó': 'Attachment', 'Gắn kết': 'Bonding',
  'Gần đích': 'Nearly there', 'Gia đình': 'Family', 'Giá trị': 'Values', 'Giải phóng': 'Release',
  'Giấu giếm': 'Concealment', 'Giúp đỡ': 'Help', 'Giữ chặt': 'Holding tight', 'Giữ vững lập trường': 'Standing firm',
  'Hải đăng': 'Lighthouse', 'Ham học': 'Eager to learn', 'Hành động': 'Action', 'Hạnh phúc gia đình': 'Family happiness',
  'Hành trình': 'Journey', 'Háo hức': 'Eagerness', 'Hào phóng': 'Generosity', 'Hấp tấp': 'Haste',
  'Hết đường': 'No way out', 'Hiện thực': 'Reality', 'Hiện thực hóa': 'Manifesting', 'Hoà hợp': 'Harmony',
  'Hòa hợp': 'Harmony', 'Hoài niệm': 'Nostalgia', 'Hoàn tất': 'Completion', 'Học hỏi': 'Learning',
  'Hội nhập': 'Integration', 'Hồi phục': 'Recovery', 'Hợp tác': 'Collaboration', 'Hợp tác xa': 'Distant partnership',
  'Hy sinh': 'Sacrifice', 'Hy vọng': 'Hope', 'Kết đôi': 'Pairing', 'Kết thúc': 'Ending',
  'Kết thúc đau': 'A painful ending', 'Khám phá': 'Discovery', 'Khó khăn': 'Hardship', 'Khởi đầu mới': 'A new start',
  'Khởi đầu thực tế': 'A practical start', 'Khởi nghiệp': 'Starting out', 'Kiên định': 'Steadfastness', 'Kiên nhẫn': 'Patience',
  'Kỷ luật': 'Discipline', 'Ký ức': 'Memory', 'Làm chủ cảm xúc': 'Emotional mastery', 'Lãng mạn': 'Romance',
  'Lãnh đạo': 'Leadership', 'Lắng nghe': 'Listening', 'Lệ thuộc': 'Dependence', 'Lên kế hoạch': 'Planning',
  'Linh hoạt': 'Flexibility', 'Lo âu': 'Anxiety', 'Lòng tốt': 'Kindness', 'Lời mời': 'An invitation',
  'Lựa chọn': 'Choice', 'Lý trí': 'Reason', 'Mãn nguyện': 'Contentment', 'Mạo hiểm': 'Risk',
  'Mắc kẹt': 'Stuck', 'Mất mát': 'Loss', 'Mất ngủ': 'Sleeplessness', 'Mệt mỏi': 'Exhaustion',
  'Mộng mơ': 'Daydreaming', 'Một mình': 'Solitude', 'Mơ hồ': 'Vagueness', 'Mơ mộng': 'Reverie',
  'Mở rộng': 'Expansion', 'Mưu mẹo': 'Cunning', 'Năng lực': 'Capability', 'Năng lượng dồi dào': 'Abundant energy',
  'Né tránh': 'Avoidance', 'Nền tảng vững chắc': 'A solid base', 'Ngây thơ': 'Innocence', 'Nghỉ ngơi': 'Rest',
  'Nghĩ quá nhiều': 'Overthinking', 'Ngọn lửa cảm hứng': 'A spark of inspiration', 'Người cũ': 'Someone from the past', 'Nhanh gọn': 'Swift and clean',
  'Nhân quả': 'Cause and effect', 'Nhiệt huyết mới': 'Fresh enthusiasm', 'Nhiều lựa chọn': 'Many options', 'Nhìn vào trong': 'Looking inward',
  'Nhu hòa': 'Gentle strength', 'Niềm tin': 'Faith', 'Niềm vui': 'Joy', 'Nuôi dưỡng': 'Nurturing',
  'Ôm đồm': 'Taking on too much', 'Ổn định': 'Stability', 'Phân vân': 'Hesitation', 'Phiêu lưu': 'Adventure',
  'Phòng thủ': 'Defensiveness', 'Quá tải': 'Overload', 'Quan sát': 'Observation', 'Quy chuẩn': 'Standards',
  'Quyền lực': 'Power', 'Quyết định': 'Decision', 'Quyết định lớn': 'A large decision', 'Quyết đoán': 'Resolve',
  'Quyết liệt': 'Fierceness', 'Ràng buộc': 'Being bound', 'Ranh giới rõ': 'Clear boundaries', 'Rèn nghề': 'Honing the craft',
  'Rõ ràng': 'Clarity', 'Rời đi': 'Leaving', 'Rời vùng khó': 'Moving out of hardship', 'Sáng suốt': 'Clear judgement',
  'Sáng tạo': 'Creativity', 'Sẻ chia': 'Sharing', 'Sinh sôi': 'Fertility', 'Sợ hãi': 'Fear',
  'Sợ mất': 'Fear of losing', 'Sung túc': 'Abundance', 'Sụp đổ': 'Collapse', 'Sự thật đau': 'A painful truth',
  'Sự thật minh bạch': 'The truth in the open', 'Sức hút': 'Magnetism', 'Sức sống': 'Vitality', 'Tái sinh': 'Rebirth',
  'Tạm dừng': 'Pause', 'Tạm rút': 'Stepping back', 'Tạo tác': 'Making', 'Tay nghề': 'Craftsmanship',
  'Tăng tốc': 'Acceleration', 'Tâm linh': 'The spiritual', 'Tầm nhìn': 'Vision', 'Tầm nhìn xa': 'Long sight',
  'Tận hưởng': 'Enjoyment', 'Tập trung': 'Focus', 'Tha thứ': 'Forgiveness', 'Thành công': 'Success',
  'Thành tựu': 'Achievement', 'Thay đổi': 'Change', 'Thắng mà thua': 'A costly win', 'Thẳng thắn': 'Directness',
  'Thấu cảm': 'Empathy', 'Thấu hiểu': 'Understanding', 'Theo đuổi': 'Pursuit', 'Thiếu thốn': 'Scarcity',
  'Thịnh vượng': 'Prosperity', 'Thịnh vượng vật chất': 'Material prosperity', 'Thờ ơ': 'Indifference', 'Thời cơ': 'The right moment',
  'Thử thách': 'Challenge', 'Thực tế': 'Practicality', 'Thức tỉnh': 'Awakening', 'Tỉ mỉ': 'Meticulousness',
  'Tiếc nuối': 'Regret', 'Tiềm thức': 'The subconscious', 'Tiến bộ': 'Progress', 'Tiến triển': 'Development',
  'Tiếng gọi': 'A calling', 'Tiết kiệm': 'Thrift', 'Tìm kiếm sự thật': 'Seeking the truth', 'Tìm ý nghĩa': 'Seeking meaning',
  'Tin nhắn tình cảm': 'A message of feeling', 'Tin tức': 'News', 'Tin tưởng': 'Trust', 'Tin vui': 'Good news',
  'Tĩnh lặng': 'Stillness', 'Tình mẫu tử': 'Motherly love', 'Tình yêu': 'Love', 'Tình yêu đong đầy': 'Love in full',
  'Tò mò': 'Curiosity', 'Toại nguyện': 'Wish fulfilled', 'Tổ ấm': 'Home', 'Tổn hại': 'Damage',
  'Tổn thương': 'Hurt', 'Tổng kết': 'Taking stock', 'Trách nhiệm': 'Responsibility', 'Trí tuệ': 'Intellect',
  'Trí tuệ nội tâm': 'Inner wisdom', 'Trọn vẹn': 'Wholeness', 'Trong trẻo': 'Clearness', 'Trù phú': 'Bounty',
  'Trung thực': 'Honesty', 'Truyền thống': 'Tradition', 'Trực giác': 'Intuition', 'Tự chủ': 'Self-reliance',
  'Tự do': 'Freedom', 'Tư duy sắc bén': 'Sharp thinking', 'Tự giới hạn': 'Self-imposed limits', 'Tự tin': 'Confidence',
  'Uy quyền trí tuệ': 'Intellectual authority', 'Va chạm': 'Friction', 'Vẫn còn lại': 'What remains', 'Vận may': 'Luck',
  'Vẻ đẹp': 'Beauty', 'Viên mãn': 'Fulfilment', 'Vinh danh': 'Honour', 'Vỡ lẽ': 'Realisation',
  'Vun vén': 'Tending', 'Xây dựng': 'Building', 'Xoay xở': 'Managing', 'Xông pha': 'Charging in',
  'Xung đột': 'Conflict', 'Ý chí': 'Will'
};

const KEYWORD_ZH = {
  'Ám ảnh': '执念', 'An toàn': '安全', 'Ảo ảnh': '幻象', 'Ảo tưởng': '妄想',
  'Ăn mừng': '庆祝', 'Ấm áp': '温暖', 'Bạn bè': '友情', 'Bản lĩnh': '胆识',
  'Bao dung': '包容', 'Bảo vệ': '守护', 'Bất đồng': '分歧', 'Bất lực': '无力',
  'Bất ngờ': '意外', 'Bế tắc': '僵局', 'Bền bỉ': '韧性', 'Bền vững': '长久',
  'Bị bỏ rơi': '被丢下', 'Bí mật': '秘密', 'Bình an': '平安', 'Bình minh': '黎明',
  'Bình tâm dần': '慢慢平静', 'Bỏ lỡ': '错过', 'Bóng tối': '阴影', 'Bốc đồng': '冲动',
  'Buồn bã': '悲伤', 'Buông bỏ': '放下', 'Cái tôi': '自我', 'Cám dỗ': '诱惑',
  'Cảm hứng': '灵感', 'Cam kết': '承诺', 'Cảm xúc mới': '新的心动', 'Cảnh giác': '警觉',
  'Cạnh tranh': '竞争', 'Cân bằng': '平衡', 'Cân đối': '匀称', 'Cần giúp đỡ': '需要帮忙',
  'Cân nhắc': '权衡', 'Cấu trúc': '结构', 'Chạm đáy': '触底', 'Chán nản': '灰心',
  'Chăm chỉ': '勤勉', 'Chăm lo': '照料', 'Chậm mà chắc': '稳扎稳打', 'Chia ly': '离别',
  'Chiêm nghiệm': '沉思', 'Chiến thắng': '胜利', 'Chín chắn': '成熟', 'Chinh phục': '征服',
  'Cho và nhận': '有来有往', 'Chờ đợi': '等待', 'Chờ kết quả': '等结果', 'Chờ mùa gặt': '等收成',
  'Chu cấp': '供养', 'Chu kỳ': '周期', 'Chu kỳ mới': '新周期', 'Chuẩn bị': '准备',
  'Chung vui': '同乐', 'Chuyển động nhanh': '快速推进', 'Chuyển hoá': '蜕变', 'Chuyển tiếp': '过渡',
  'Chữa lành': '疗愈', 'Chưa quyết': '未决', 'Chừng mực': '节制', 'Công bằng': '公平',
  'Cộng đồng': '社群', 'Công minh': '公正', 'Cột mốc': '里程碑', 'Cơ hội': '机会',
  'Cơ hội mới': '新机会', 'Cơ hội tài chính': '财务机会', 'Dẫn dắt': '带领', 'Di sản': '传承',
  'Dịu dàng': '温柔', 'Dòng chảy cảm xúc': '情绪的流动', 'Dục vọng': '欲望', 'Dứt khoát': '干脆',
  'Đa nhiệm': '多头兼顾', 'Đam mê': '热情', 'Đáng tin': '可靠', 'Đánh giá lại': '重新评估',
  'Đạo đức': '德行', 'Đảo lộn': '翻覆', 'Đau lòng': '心碎', 'Đầu tư dài hạn': '长线投资',
  'Đi đường tắt': '抄近道', 'Đi xa': '远行', 'Điềm tĩnh': '沉稳', 'Điều ước': '心愿',
  'Định hướng': '定方向', 'Định mệnh': '命运', 'Độc lập': '独立', 'Đổi góc nhìn': '换个角度',
  'Đổi mới': '更新', 'Đồng điệu': '合拍', 'Đột phá trí tuệ': '思维突破', 'Được công nhận': '被认可',
  'Được ghi nhận': '被记功', 'Gánh nặng': '重担', 'Gắn bó': '依恋', 'Gắn kết': '连结',
  'Gần đích': '近终点', 'Gia đình': '家庭', 'Giá trị': '价值', 'Giải phóng': '解脱',
  'Giấu giếm': '隐瞒', 'Giúp đỡ': '帮助', 'Giữ chặt': '攥紧', 'Giữ vững lập trường': '守住立场',
  'Hải đăng': '灯塔', 'Ham học': '好学', 'Hành động': '行动', 'Hạnh phúc gia đình': '家庭幸福',
  'Hành trình': '旅程', 'Háo hức': '雀跃', 'Hào phóng': '慷慨', 'Hấp tấp': '毛躁',
  'Hết đường': '无路', 'Hiện thực': '现实', 'Hiện thực hóa': '显化', 'Hoà hợp': '和谐',
  'Hòa hợp': '和谐', 'Hoài niệm': '怀旧', 'Hoàn tất': '完成', 'Học hỏi': '学习',
  'Hội nhập': '融入', 'Hồi phục': '复原', 'Hợp tác': '合作', 'Hợp tác xa': '远方合作',
  'Hy sinh': '牺牲', 'Hy vọng': '希望', 'Kết đôi': '结对', 'Kết thúc': '结束',
  'Kết thúc đau': '痛的结束', 'Khám phá': '探索', 'Khó khăn': '困顿', 'Khởi đầu mới': '新开始',
  'Khởi đầu thực tế': '踏实的开始', 'Khởi nghiệp': '创业', 'Kiên định': '坚定', 'Kiên nhẫn': '耐心',
  'Kỷ luật': '纪律', 'Ký ức': '记忆', 'Làm chủ cảm xúc': '掌控情绪', 'Lãng mạn': '浪漫',
  'Lãnh đạo': '领导', 'Lắng nghe': '倾听', 'Lệ thuộc': '依赖', 'Lên kế hoạch': '做计划',
  'Linh hoạt': '灵活', 'Lo âu': '焦虑', 'Lòng tốt': '善意', 'Lời mời': '邀约',
  'Lựa chọn': '选择', 'Lý trí': '理智', 'Mãn nguyện': '满足', 'Mạo hiểm': '冒险',
  'Mắc kẹt': '困住', 'Mất mát': '失去', 'Mất ngủ': '失眠', 'Mệt mỏi': '疲惫',
  'Mộng mơ': '空想', 'Một mình': '独处', 'Mơ hồ': '模糊', 'Mơ mộng': '遐想',
  'Mở rộng': '扩展', 'Mưu mẹo': '心计', 'Năng lực': '能力', 'Năng lượng dồi dào': '精力充沛',
  'Né tránh': '回避', 'Nền tảng vững chắc': '扎实的地基', 'Ngây thơ': '天真', 'Nghỉ ngơi': '休息',
  'Nghĩ quá nhiều': '想太多', 'Ngọn lửa cảm hứng': '灵感的火苗', 'Người cũ': '旧人', 'Nhanh gọn': '快而利落',
  'Nhân quả': '因果', 'Nhiệt huyết mới': '新的干劲', 'Nhiều lựa chọn': '选择很多', 'Nhìn vào trong': '向内看',
  'Nhu hòa': '以柔克刚', 'Niềm tin': '信念', 'Niềm vui': '喜悦', 'Nuôi dưỡng': '滋养',
  'Ôm đồm': '揽太多', 'Ổn định': '稳定', 'Phân vân': '犹豫', 'Phiêu lưu': '冒险闯荡',
  'Phòng thủ': '防守', 'Quá tải': '超载', 'Quan sát': '观察', 'Quy chuẩn': '规范',
  'Quyền lực': '权力', 'Quyết định': '决定', 'Quyết định lớn': '重大决定', 'Quyết đoán': '果断',
  'Quyết liệt': '凌厉', 'Ràng buộc': '被绑住', 'Ranh giới rõ': '界线清楚', 'Rèn nghề': '磨手艺',
  'Rõ ràng': '清楚', 'Rời đi': '离开', 'Rời vùng khó': '走出难关', 'Sáng suốt': '明断',
  'Sáng tạo': '创造', 'Sẻ chia': '分享', 'Sinh sôi': '孕育', 'Sợ hãi': '恐惧',
  'Sợ mất': '怕失去', 'Sung túc': '丰足', 'Sụp đổ': '崩塌', 'Sự thật đau': '疼的真相',
  'Sự thật minh bạch': '真相摊开', 'Sức hút': '吸引力', 'Sức sống': '生命力', 'Tái sinh': '重生',
  'Tạm dừng': '暂停', 'Tạm rút': '暂退', 'Tạo tác': '创作', 'Tay nghề': '手艺',
  'Tăng tốc': '加速', 'Tâm linh': '灵性', 'Tầm nhìn': '眼光', 'Tầm nhìn xa': '远见',
  'Tận hưởng': '享受', 'Tập trung': '专注', 'Tha thứ': '原谅', 'Thành công': '成功',
  'Thành tựu': '成就', 'Thay đổi': '改变', 'Thắng mà thua': '赢了也是输', 'Thẳng thắn': '坦率',
  'Thấu cảm': '共情', 'Thấu hiểu': '理解', 'Theo đuổi': '追求', 'Thiếu thốn': '匮乏',
  'Thịnh vượng': '兴旺', 'Thịnh vượng vật chất': '物质兴旺', 'Thờ ơ': '冷淡', 'Thời cơ': '时机',
  'Thử thách': '考验', 'Thực tế': '务实', 'Thức tỉnh': '觉醒', 'Tỉ mỉ': '细致',
  'Tiếc nuối': '惋惜', 'Tiềm thức': '潜意识', 'Tiến bộ': '进步', 'Tiến triển': '进展',
  'Tiếng gọi': '召唤', 'Tiết kiệm': '节俭', 'Tìm kiếm sự thật': '寻找真相', 'Tìm ý nghĩa': '寻找意义',
  'Tin nhắn tình cảm': '一条心意', 'Tin tức': '消息', 'Tin tưởng': '信任', 'Tin vui': '好消息',
  'Tĩnh lặng': '静', 'Tình mẫu tử': '母爱', 'Tình yêu': '爱', 'Tình yêu đong đầy': '满满的爱',
  'Tò mò': '好奇', 'Toại nguyện': '如愿', 'Tổ ấm': '家', 'Tổn hại': '损害',
  'Tổn thương': '受伤', 'Tổng kết': '总结', 'Trách nhiệm': '责任', 'Trí tuệ': '才智',
  'Trí tuệ nội tâm': '内在智慧', 'Trọn vẹn': '圆满', 'Trong trẻo': '澄澈', 'Trù phú': '丰饶',
  'Trung thực': '诚实', 'Truyền thống': '传统', 'Trực giác': '直觉', 'Tự chủ': '自主',
  'Tự do': '自由', 'Tư duy sắc bén': '思路锋利', 'Tự giới hạn': '自设的限制', 'Tự tin': '自信',
  'Uy quyền trí tuệ': '理性的权威', 'Va chạm': '摩擦', 'Vẫn còn lại': '剩下的', 'Vận may': '运气',
  'Vẻ đẹp': '美', 'Viên mãn': '圆满', 'Vinh danh': '荣誉', 'Vỡ lẽ': '恍然',
  'Vun vén': '经营', 'Xây dựng': '建造', 'Xoay xở': '周旋', 'Xông pha': '冲在前',
  'Xung đột': '冲突', 'Ý chí': '意志'
};

const ELEMENTS = { en: ELEMENT_EN, zh: ELEMENT_ZH };
const KEYWORDS = { en: KEYWORD_EN, zh: KEYWORD_ZH };

export const elementLabel = (element, lang = 'vi') =>
  (lang === 'vi' ? null : ELEMENTS[lang]?.[element]) || element || '';

export const keywordLabel = (keyword, lang = 'vi') =>
  (lang === 'vi' ? null : KEYWORDS[lang]?.[keyword]) || keyword || '';

/* Đếm nhãn còn thiếu, dùng cho bộ kiểm tra trước build. */
export const labelCoverage = (deck, lang) => {
  const missing = new Set();
  for (const card of deck) {
    if (card.element && !ELEMENTS[lang]?.[card.element]) missing.add(card.element);
    for (const kw of card.keywords || []) {
      if (!KEYWORDS[lang]?.[kw]) missing.add(kw);
    }
  }
  return [...missing];
};
