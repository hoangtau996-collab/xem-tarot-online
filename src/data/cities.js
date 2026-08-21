// Danh sách nơi sinh: 68 tỉnh thành Việt Nam và 49 thành phố lớn thế giới.
//
// Mỗi nơi chỉ cần ba thứ: vĩ độ, kinh độ và tên múi giờ IANA. Không lưu độ
// lệch giờ cứng - độ lệch được đọc từ cơ sở dữ liệu múi giờ của trình duyệt
// tại đúng ngày sinh, nên tự có cả giờ mùa hè lẫn các mốc lịch sử (ví dụ miền
// Nam Việt Nam dùng UTC+8 cho tới 13/6/1975).
//
// Toạ độ lấy ở trung tâm hành chính. Sai lệch trong phạm vi một tỉnh chỉ làm
// Cung Mọc xê dịch vài phút cung - nhỏ hơn nhiều so với sai số của giờ sinh
// ghi trên giấy tờ, nên không cần chi tiết tới từng phường.
//
// Tên tỉnh giữ theo cách gọi quen thuộc khi khai sinh, kèm tên thành phố tỉnh
// lỵ trong ngoặc, để người tra cứu tìm được bằng đúng chữ họ nhớ.

export const CITIES = [
  /* ---------------- VIỆT NAM ---------------- */
  { key: 'hanoi', region: 'vn', lat: 21.0285, lon: 105.8542, tz: 'Asia/Ho_Chi_Minh', alias: 'ha noi,hn,thang long,thu do', name: { vi: 'Hà Nội', en: 'Hanoi', zh: '河内' } },
  { key: 'hcmc', region: 'vn', lat: 10.8231, lon: 106.6297, tz: 'Asia/Ho_Chi_Minh', alias: 'sai gon,saigon,tphcm,hcm,ho chi minh,thanh pho ho chi minh', name: { vi: 'TP Hồ Chí Minh (Sài Gòn)', en: 'Ho Chi Minh City', zh: '胡志明市' } },
  { key: 'haiphong', region: 'vn', lat: 20.8449, lon: 106.6881, tz: 'Asia/Ho_Chi_Minh', alias: 'hai phong,hp,dat cang', name: { vi: 'Hải Phòng', en: 'Hai Phong', zh: '海防' } },
  { key: 'danang', region: 'vn', lat: 16.0544, lon: 108.2022, tz: 'Asia/Ho_Chi_Minh', alias: 'da nang,dn', name: { vi: 'Đà Nẵng', en: 'Da Nang', zh: '岘港' } },
  { key: 'cantho', region: 'vn', lat: 10.0452, lon: 105.7469, tz: 'Asia/Ho_Chi_Minh', alias: 'can tho,ct,tay do', name: { vi: 'Cần Thơ', en: 'Can Tho', zh: '芹苴' } },
  { key: 'angiang', region: 'vn', lat: 10.3860, lon: 105.4381, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'An Giang (Long Xuyên)', en: 'An Giang (Long Xuyen)', zh: '安江省' } },
  { key: 'vungtau', region: 'vn', lat: 10.3460, lon: 107.0843, tz: 'Asia/Ho_Chi_Minh', alias: 'vung tau,ba ria,brvt', name: { vi: 'Bà Rịa - Vũng Tàu', en: 'Ba Ria - Vung Tau', zh: '巴地头顿' } },
  { key: 'bacgiang', region: 'vn', lat: 21.2731, lon: 106.1946, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Bắc Giang', en: 'Bac Giang', zh: '北江' } },
  { key: 'backan', region: 'vn', lat: 22.1477, lon: 105.8348, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Bắc Kạn', en: 'Bac Kan', zh: '北𣴓' } },
  { key: 'baclieu', region: 'vn', lat: 9.2940, lon: 105.7216, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Bạc Liêu', en: 'Bac Lieu', zh: '薄辽' } },
  { key: 'bacninh', region: 'vn', lat: 21.1861, lon: 106.0763, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Bắc Ninh', en: 'Bac Ninh', zh: '北宁' } },
  { key: 'bentre', region: 'vn', lat: 10.2415, lon: 106.3759, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Bến Tre', en: 'Ben Tre', zh: '槟椥' } },
  { key: 'quynhon', region: 'vn', lat: 13.7829, lon: 109.2196, tz: 'Asia/Ho_Chi_Minh', alias: 'quy nhon,binh dinh', name: { vi: 'Bình Định (Quy Nhơn)', en: 'Binh Dinh (Quy Nhon)', zh: '平定省' } },
  { key: 'binhduong', region: 'vn', lat: 10.9804, lon: 106.6519, tz: 'Asia/Ho_Chi_Minh', alias: 'binh duong,thu dau mot,di an,thuan an', name: { vi: 'Bình Dương (Thủ Dầu Một)', en: 'Binh Duong', zh: '平阳省' } },
  { key: 'binhphuoc', region: 'vn', lat: 11.5347, lon: 106.8832, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Bình Phước (Đồng Xoài)', en: 'Binh Phuoc', zh: '平福省' } },
  { key: 'phanthiet', region: 'vn', lat: 10.9280, lon: 108.1020, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Bình Thuận (Phan Thiết)', en: 'Binh Thuan (Phan Thiet)', zh: '平顺省' } },
  { key: 'camau', region: 'vn', lat: 9.1769, lon: 105.1524, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Cà Mau', en: 'Ca Mau', zh: '金瓯' } },
  { key: 'caobang', region: 'vn', lat: 22.6663, lon: 106.2570, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Cao Bằng', en: 'Cao Bang', zh: '高平' } },
  { key: 'buonmathuot', region: 'vn', lat: 12.6667, lon: 108.0500, tz: 'Asia/Ho_Chi_Minh', alias: 'buon ma thuot,bmt,dak lak,daklak,ban me thuot', name: { vi: 'Đắk Lắk (Buôn Ma Thuột)', en: 'Dak Lak (Buon Ma Thuot)', zh: '多乐省' } },
  { key: 'daknong', region: 'vn', lat: 11.9998, lon: 107.6910, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Đắk Nông (Gia Nghĩa)', en: 'Dak Nong', zh: '多农省' } },
  { key: 'dienbien', region: 'vn', lat: 21.3860, lon: 103.0230, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Điện Biên (Điện Biên Phủ)', en: 'Dien Bien Phu', zh: '奠边府' } },
  { key: 'bienhoa', region: 'vn', lat: 10.9574, lon: 106.8426, tz: 'Asia/Ho_Chi_Minh', alias: 'bien hoa,dong nai', name: { vi: 'Đồng Nai (Biên Hoà)', en: 'Dong Nai (Bien Hoa)', zh: '同奈省' } },
  { key: 'caolanh', region: 'vn', lat: 10.4593, lon: 105.6329, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Đồng Tháp (Cao Lãnh)', en: 'Dong Thap (Cao Lanh)', zh: '同塔省' } },
  { key: 'pleiku', region: 'vn', lat: 13.9833, lon: 108.0000, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Gia Lai (Pleiku)', en: 'Gia Lai (Pleiku)', zh: '嘉莱省' } },
  { key: 'hagiang', region: 'vn', lat: 22.8233, lon: 104.9836, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Hà Giang', en: 'Ha Giang', zh: '河江' } },
  { key: 'hanam', region: 'vn', lat: 20.5411, lon: 105.9139, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Hà Nam (Phủ Lý)', en: 'Ha Nam (Phu Ly)', zh: '河南省' } },
  { key: 'hatinh', region: 'vn', lat: 18.3428, lon: 105.9057, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Hà Tĩnh', en: 'Ha Tinh', zh: '河静' } },
  { key: 'haiduong', region: 'vn', lat: 20.9373, lon: 106.3146, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Hải Dương', en: 'Hai Duong', zh: '海阳' } },
  { key: 'haugiang', region: 'vn', lat: 9.7845, lon: 105.4701, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Hậu Giang (Vị Thanh)', en: 'Hau Giang', zh: '后江省' } },
  { key: 'hoabinh', region: 'vn', lat: 20.8133, lon: 105.3383, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Hoà Bình', en: 'Hoa Binh', zh: '和平' } },
  { key: 'hungyen', region: 'vn', lat: 20.6464, lon: 106.0511, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Hưng Yên', en: 'Hung Yen', zh: '兴安' } },
  { key: 'nhatrang', region: 'vn', lat: 12.2388, lon: 109.1967, tz: 'Asia/Ho_Chi_Minh', alias: 'nha trang,khanh hoa', name: { vi: 'Khánh Hoà (Nha Trang)', en: 'Khanh Hoa (Nha Trang)', zh: '庆和省' } },
  { key: 'rachgia', region: 'vn', lat: 10.0125, lon: 105.0808, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Kiên Giang (Rạch Giá)', en: 'Kien Giang (Rach Gia)', zh: '坚江省' } },
  { key: 'kontum', region: 'vn', lat: 14.3497, lon: 108.0005, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Kon Tum', en: 'Kon Tum', zh: '昆嵩' } },
  { key: 'laichau', region: 'vn', lat: 22.3964, lon: 103.4590, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Lai Châu', en: 'Lai Chau', zh: '莱州' } },
  { key: 'dalat', region: 'vn', lat: 11.9404, lon: 108.4583, tz: 'Asia/Ho_Chi_Minh', alias: 'da lat,dalat,lam dong', name: { vi: 'Lâm Đồng (Đà Lạt)', en: 'Lam Dong (Da Lat)', zh: '林同省 · 大叻' } },
  { key: 'langson', region: 'vn', lat: 21.8537, lon: 106.7610, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Lạng Sơn', en: 'Lang Son', zh: '谅山' } },
  { key: 'laocai', region: 'vn', lat: 22.4809, lon: 103.9755, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Lào Cai', en: 'Lao Cai', zh: '老街' } },
  { key: 'tanan', region: 'vn', lat: 10.5354, lon: 106.4133, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Long An (Tân An)', en: 'Long An (Tan An)', zh: '隆安省' } },
  { key: 'namdinh', region: 'vn', lat: 20.4388, lon: 106.1621, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Nam Định', en: 'Nam Dinh', zh: '南定' } },
  { key: 'vinh', region: 'vn', lat: 18.6796, lon: 105.6813, tz: 'Asia/Ho_Chi_Minh', alias: 'tp vinh,nghe an', name: { vi: 'Nghệ An (Vinh)', en: 'Nghe An (Vinh)', zh: '乂安省 · 荣市' } },
  { key: 'ninhbinh', region: 'vn', lat: 20.2506, lon: 105.9745, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Ninh Bình', en: 'Ninh Binh', zh: '宁平' } },
  { key: 'phanrang', region: 'vn', lat: 11.5645, lon: 108.9887, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Ninh Thuận (Phan Rang)', en: 'Ninh Thuan (Phan Rang)', zh: '宁顺省' } },
  { key: 'viettri', region: 'vn', lat: 21.3227, lon: 105.4019, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Phú Thọ (Việt Trì)', en: 'Phu Tho (Viet Tri)', zh: '富寿省' } },
  { key: 'tuyhoa', region: 'vn', lat: 13.0882, lon: 109.0929, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Phú Yên (Tuy Hoà)', en: 'Phu Yen (Tuy Hoa)', zh: '富安省' } },
  { key: 'donghoi', region: 'vn', lat: 17.4689, lon: 106.6223, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Quảng Bình (Đồng Hới)', en: 'Quang Binh (Dong Hoi)', zh: '广平省' } },
  { key: 'tamky', region: 'vn', lat: 15.5736, lon: 108.4740, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Quảng Nam (Tam Kỳ)', en: 'Quang Nam (Tam Ky)', zh: '广南省' } },
  { key: 'quangngai', region: 'vn', lat: 15.1214, lon: 108.8044, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Quảng Ngãi', en: 'Quang Ngai', zh: '广义' } },
  { key: 'halong', region: 'vn', lat: 20.9515, lon: 107.0748, tz: 'Asia/Ho_Chi_Minh', alias: 'ha long,quang ninh,hon gai', name: { vi: 'Quảng Ninh (Hạ Long)', en: 'Quang Ninh (Ha Long)', zh: '广宁省 · 下龙' } },
  { key: 'dongha', region: 'vn', lat: 16.8163, lon: 107.1003, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Quảng Trị (Đông Hà)', en: 'Quang Tri (Dong Ha)', zh: '广治省' } },
  { key: 'soctrang', region: 'vn', lat: 9.6025, lon: 105.9739, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Sóc Trăng', en: 'Soc Trang', zh: '朔庄' } },
  { key: 'sonla', region: 'vn', lat: 21.3273, lon: 103.9141, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Sơn La', en: 'Son La', zh: '山萝' } },
  { key: 'tayninh', region: 'vn', lat: 11.3352, lon: 106.1099, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Tây Ninh', en: 'Tay Ninh', zh: '西宁' } },
  { key: 'thaibinh', region: 'vn', lat: 20.4463, lon: 106.3366, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Thái Bình', en: 'Thai Binh', zh: '太平' } },
  { key: 'thainguyen', region: 'vn', lat: 21.5942, lon: 105.8482, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Thái Nguyên', en: 'Thai Nguyen', zh: '太原' } },
  { key: 'thanhhoa', region: 'vn', lat: 19.8067, lon: 105.7852, tz: 'Asia/Ho_Chi_Minh', alias: 'thanh hoa,th', name: { vi: 'Thanh Hoá', en: 'Thanh Hoa', zh: '清化' } },
  { key: 'hue', region: 'vn', lat: 16.4637, lon: 107.5909, tz: 'Asia/Ho_Chi_Minh', alias: 'hue,thua thien,kinh do', name: { vi: 'Thừa Thiên Huế (Huế)', en: 'Hue', zh: '顺化' } },
  { key: 'mytho', region: 'vn', lat: 10.3600, lon: 106.3600, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Tiền Giang (Mỹ Tho)', en: 'Tien Giang (My Tho)', zh: '前江省' } },
  { key: 'travinh', region: 'vn', lat: 9.9347, lon: 106.3453, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Trà Vinh', en: 'Tra Vinh', zh: '茶荣' } },
  { key: 'tuyenquang', region: 'vn', lat: 21.8230, lon: 105.2140, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Tuyên Quang', en: 'Tuyen Quang', zh: '宣光' } },
  { key: 'vinhlong', region: 'vn', lat: 10.2537, lon: 105.9722, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Vĩnh Long', en: 'Vinh Long', zh: '永隆' } },
  { key: 'vinhyen', region: 'vn', lat: 21.3089, lon: 105.6049, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Vĩnh Phúc (Vĩnh Yên)', en: 'Vinh Phuc (Vinh Yen)', zh: '永福省' } },
  { key: 'yenbai', region: 'vn', lat: 21.7229, lon: 104.9113, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Yên Bái', en: 'Yen Bai', zh: '安沛' } },
  { key: 'phuquoc', region: 'vn', lat: 10.2270, lon: 103.9670, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Phú Quốc', en: 'Phu Quoc', zh: '富国岛' } },
  { key: 'condao', region: 'vn', lat: 8.6833, lon: 106.6167, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Côn Đảo', en: 'Con Dao', zh: '昆岛' } },
  { key: 'sapa', region: 'vn', lat: 22.3364, lon: 103.8438, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Sa Pa', en: 'Sa Pa', zh: '沙巴' } },
  { key: 'mongcai', region: 'vn', lat: 21.5333, lon: 107.9667, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Móng Cái', en: 'Mong Cai', zh: '芒街' } },
  { key: 'camranh', region: 'vn', lat: 11.9214, lon: 109.1591, tz: 'Asia/Ho_Chi_Minh', name: { vi: 'Cam Ranh', en: 'Cam Ranh', zh: '金兰' } },

  /* ---------------- CHÂU Á ---------------- */
  { key: 'bangkok', region: 'world', lat: 13.7563, lon: 100.5018, tz: 'Asia/Bangkok', name: { vi: 'Bangkok, Thái Lan', en: 'Bangkok, Thailand', zh: '曼谷 · 泰国' } },
  { key: 'phnompenh', region: 'world', lat: 11.5564, lon: 104.9282, tz: 'Asia/Phnom_Penh', name: { vi: 'Phnom Penh, Campuchia', en: 'Phnom Penh, Cambodia', zh: '金边 · 柬埔寨' } },
  { key: 'vientiane', region: 'world', lat: 17.9757, lon: 102.6331, tz: 'Asia/Vientiane', name: { vi: 'Viêng Chăn, Lào', en: 'Vientiane, Laos', zh: '万象 · 老挝' } },
  { key: 'singapore', region: 'world', lat: 1.3521, lon: 103.8198, tz: 'Asia/Singapore', name: { vi: 'Singapore', en: 'Singapore', zh: '新加坡' } },
  { key: 'kualalumpur', region: 'world', lat: 3.1390, lon: 101.6869, tz: 'Asia/Kuala_Lumpur', name: { vi: 'Kuala Lumpur, Malaysia', en: 'Kuala Lumpur, Malaysia', zh: '吉隆坡 · 马来西亚' } },
  { key: 'jakarta', region: 'world', lat: -6.2088, lon: 106.8456, tz: 'Asia/Jakarta', name: { vi: 'Jakarta, Indonesia', en: 'Jakarta, Indonesia', zh: '雅加达 · 印尼' } },
  { key: 'manila', region: 'world', lat: 14.5995, lon: 120.9842, tz: 'Asia/Manila', name: { vi: 'Manila, Philippines', en: 'Manila, Philippines', zh: '马尼拉 · 菲律宾' } },
  { key: 'yangon', region: 'world', lat: 16.8409, lon: 96.1735, tz: 'Asia/Yangon', name: { vi: 'Yangon, Myanmar', en: 'Yangon, Myanmar', zh: '仰光 · 缅甸' } },
  { key: 'beijing', region: 'world', lat: 39.9042, lon: 116.4074, tz: 'Asia/Shanghai', name: { vi: 'Bắc Kinh, Trung Quốc', en: 'Beijing, China', zh: '北京 · 中国' } },
  { key: 'shanghai', region: 'world', lat: 31.2304, lon: 121.4737, tz: 'Asia/Shanghai', name: { vi: 'Thượng Hải, Trung Quốc', en: 'Shanghai, China', zh: '上海 · 中国' } },
  { key: 'guangzhou', region: 'world', lat: 23.1291, lon: 113.2644, tz: 'Asia/Shanghai', name: { vi: 'Quảng Châu, Trung Quốc', en: 'Guangzhou, China', zh: '广州 · 中国' } },
  { key: 'hongkong', region: 'world', lat: 22.3193, lon: 114.1694, tz: 'Asia/Hong_Kong', alias: 'hong kong,hongkong,hk', name: { vi: 'Hồng Kông', en: 'Hong Kong', zh: '香港' } },
  { key: 'taipei', region: 'world', lat: 25.0330, lon: 121.5654, tz: 'Asia/Taipei', alias: 'taipei,dai bac,dai loan,taiwan', name: { vi: 'Đài Bắc, Đài Loan', en: 'Taipei, Taiwan', zh: '台北 · 台湾' } },
  { key: 'tokyo', region: 'world', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo', alias: 'tokyo,nhat ban,japan', name: { vi: 'Tokyo, Nhật Bản', en: 'Tokyo, Japan', zh: '东京 · 日本' } },
  { key: 'osaka', region: 'world', lat: 34.6937, lon: 135.5023, tz: 'Asia/Tokyo', name: { vi: 'Osaka, Nhật Bản', en: 'Osaka, Japan', zh: '大阪 · 日本' } },
  { key: 'seoul', region: 'world', lat: 37.5665, lon: 126.9780, tz: 'Asia/Seoul', alias: 'seoul,han quoc,korea', name: { vi: 'Seoul, Hàn Quốc', en: 'Seoul, South Korea', zh: '首尔 · 韩国' } },
  { key: 'newdelhi', region: 'world', lat: 28.6139, lon: 77.2090, tz: 'Asia/Kolkata', name: { vi: 'New Delhi, Ấn Độ', en: 'New Delhi, India', zh: '新德里 · 印度' } },
  { key: 'mumbai', region: 'world', lat: 19.0760, lon: 72.8777, tz: 'Asia/Kolkata', name: { vi: 'Mumbai, Ấn Độ', en: 'Mumbai, India', zh: '孟买 · 印度' } },
  { key: 'dubai', region: 'world', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai', name: { vi: 'Dubai, UAE', en: 'Dubai, UAE', zh: '迪拜 · 阿联酋' } },

  /* ---------------- CHÂU ÂU ---------------- */
  { key: 'moscow', region: 'world', lat: 55.7558, lon: 37.6173, tz: 'Europe/Moscow', name: { vi: 'Moskva, Nga', en: 'Moscow, Russia', zh: '莫斯科 · 俄罗斯' } },
  { key: 'berlin', region: 'world', lat: 52.5200, lon: 13.4050, tz: 'Europe/Berlin', name: { vi: 'Berlin, Đức', en: 'Berlin, Germany', zh: '柏林 · 德国' } },
  { key: 'paris', region: 'world', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris', name: { vi: 'Paris, Pháp', en: 'Paris, France', zh: '巴黎 · 法国' } },
  { key: 'london', region: 'world', lat: 51.5074, lon: -0.1278, tz: 'Europe/London', name: { vi: 'London, Anh', en: 'London, UK', zh: '伦敦 · 英国' } },
  { key: 'rome', region: 'world', lat: 41.9028, lon: 12.4964, tz: 'Europe/Rome', name: { vi: 'Roma, Ý', en: 'Rome, Italy', zh: '罗马 · 意大利' } },
  { key: 'madrid', region: 'world', lat: 40.4168, lon: -3.7038, tz: 'Europe/Madrid', name: { vi: 'Madrid, Tây Ban Nha', en: 'Madrid, Spain', zh: '马德里 · 西班牙' } },
  { key: 'amsterdam', region: 'world', lat: 52.3676, lon: 4.9041, tz: 'Europe/Amsterdam', name: { vi: 'Amsterdam, Hà Lan', en: 'Amsterdam, Netherlands', zh: '阿姆斯特丹 · 荷兰' } },
  { key: 'prague', region: 'world', lat: 50.0755, lon: 14.4378, tz: 'Europe/Prague', name: { vi: 'Praha, Séc', en: 'Prague, Czechia', zh: '布拉格 · 捷克' } },
  { key: 'warsaw', region: 'world', lat: 52.2297, lon: 21.0122, tz: 'Europe/Warsaw', name: { vi: 'Warszawa, Ba Lan', en: 'Warsaw, Poland', zh: '华沙 · 波兰' } },
  { key: 'kyiv', region: 'world', lat: 50.4501, lon: 30.5234, tz: 'Europe/Kyiv', name: { vi: 'Kyiv, Ukraina', en: 'Kyiv, Ukraine', zh: '基辅 · 乌克兰' } },
  { key: 'stockholm', region: 'world', lat: 59.3293, lon: 18.0686, tz: 'Europe/Stockholm', name: { vi: 'Stockholm, Thuỵ Điển', en: 'Stockholm, Sweden', zh: '斯德哥尔摩 · 瑞典' } },
  { key: 'zurich', region: 'world', lat: 47.3769, lon: 8.5417, tz: 'Europe/Zurich', name: { vi: 'Zurich, Thuỵ Sĩ', en: 'Zurich, Switzerland', zh: '苏黎世 · 瑞士' } },
  { key: 'istanbul', region: 'world', lat: 41.0082, lon: 28.9784, tz: 'Europe/Istanbul', name: { vi: 'Istanbul, Thổ Nhĩ Kỳ', en: 'Istanbul, Turkey', zh: '伊斯坦布尔 · 土耳其' } },

  /* ---------------- CHÂU PHI ---------------- */
  { key: 'cairo', region: 'world', lat: 30.0444, lon: 31.2357, tz: 'Africa/Cairo', name: { vi: 'Cairo, Ai Cập', en: 'Cairo, Egypt', zh: '开罗 · 埃及' } },
  { key: 'lagos', region: 'world', lat: 6.5244, lon: 3.3792, tz: 'Africa/Lagos', name: { vi: 'Lagos, Nigeria', en: 'Lagos, Nigeria', zh: '拉各斯 · 尼日利亚' } },
  { key: 'johannesburg', region: 'world', lat: -26.2041, lon: 28.0473, tz: 'Africa/Johannesburg', name: { vi: 'Johannesburg, Nam Phi', en: 'Johannesburg, South Africa', zh: '约翰内斯堡 · 南非' } },

  /* ---------------- CHÂU MỸ ---------------- */
  { key: 'newyork', region: 'world', lat: 40.7128, lon: -74.0060, tz: 'America/New_York', alias: 'new york,newyork,nyc,ny', name: { vi: 'New York, Hoa Kỳ', en: 'New York, USA', zh: '纽约 · 美国' } },
  { key: 'losangeles', region: 'world', lat: 34.0522, lon: -118.2437, tz: 'America/Los_Angeles', alias: 'los angeles,losangeles,la,cali,california', name: { vi: 'Los Angeles, Hoa Kỳ', en: 'Los Angeles, USA', zh: '洛杉矶 · 美国' } },
  { key: 'sanjose', region: 'world', lat: 37.3382, lon: -121.8863, tz: 'America/Los_Angeles', alias: 'san jose,sanjose,cali,california,bay area', name: { vi: 'San Jose, Hoa Kỳ', en: 'San Jose, USA', zh: '圣何塞 · 美国' } },
  { key: 'seattle', region: 'world', lat: 47.6062, lon: -122.3321, tz: 'America/Los_Angeles', name: { vi: 'Seattle, Hoa Kỳ', en: 'Seattle, USA', zh: '西雅图 · 美国' } },
  { key: 'chicago', region: 'world', lat: 41.8781, lon: -87.6298, tz: 'America/Chicago', name: { vi: 'Chicago, Hoa Kỳ', en: 'Chicago, USA', zh: '芝加哥 · 美国' } },
  { key: 'houston', region: 'world', lat: 29.7604, lon: -95.3698, tz: 'America/Chicago', name: { vi: 'Houston, Hoa Kỳ', en: 'Houston, USA', zh: '休斯敦 · 美国' } },
  { key: 'toronto', region: 'world', lat: 43.6532, lon: -79.3832, tz: 'America/Toronto', name: { vi: 'Toronto, Canada', en: 'Toronto, Canada', zh: '多伦多 · 加拿大' } },
  { key: 'vancouver', region: 'world', lat: 49.2827, lon: -123.1207, tz: 'America/Vancouver', name: { vi: 'Vancouver, Canada', en: 'Vancouver, Canada', zh: '温哥华 · 加拿大' } },
  { key: 'mexicocity', region: 'world', lat: 19.4326, lon: -99.1332, tz: 'America/Mexico_City', name: { vi: 'Mexico City, Mexico', en: 'Mexico City, Mexico', zh: '墨西哥城 · 墨西哥' } },
  { key: 'saopaulo', region: 'world', lat: -23.5505, lon: -46.6333, tz: 'America/Sao_Paulo', name: { vi: 'São Paulo, Brazil', en: 'Sao Paulo, Brazil', zh: '圣保罗 · 巴西' } },
  { key: 'buenosaires', region: 'world', lat: -34.6037, lon: -58.3816, tz: 'America/Argentina/Buenos_Aires', name: { vi: 'Buenos Aires, Argentina', en: 'Buenos Aires, Argentina', zh: '布宜诺斯艾利斯 · 阿根廷' } },

  /* ---------------- CHÂU ĐẠI DƯƠNG ---------------- */
  { key: 'sydney', region: 'world', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney', name: { vi: 'Sydney, Úc', en: 'Sydney, Australia', zh: '悉尼 · 澳大利亚' } },
  { key: 'melbourne', region: 'world', lat: -37.8136, lon: 144.9631, tz: 'Australia/Melbourne', name: { vi: 'Melbourne, Úc', en: 'Melbourne, Australia', zh: '墨尔本 · 澳大利亚' } },
  { key: 'perth', region: 'world', lat: -31.9505, lon: 115.8605, tz: 'Australia/Perth', name: { vi: 'Perth, Úc', en: 'Perth, Australia', zh: '珀斯 · 澳大利亚' } },
  { key: 'auckland', region: 'world', lat: -36.8485, lon: 174.7633, tz: 'Pacific/Auckland', name: { vi: 'Auckland, New Zealand', en: 'Auckland, New Zealand', zh: '奥克兰 · 新西兰' } }
];

export const DEFAULT_CITY_KEY = 'hanoi';

/* Bỏ dấu để gõ "da nang" hay "Đà Nẵng" đều tìm ra.
   NFD tách được dấu thanh và dấu mũ, nhưng chữ đ/Đ là một ký tự riêng chứ
   không phải d có dấu, nên phải thay tay. */
export const foldAccents = (text = '') =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();

/* Tìm nơi sinh theo từ khoá, khớp trên cả ba ngôn ngữ lẫn danh sách bí danh,
   để người gõ "saigon", "tphcm", "Ho Chi Minh" hay "胡志明" đều ra cùng một
   kết quả. Bí danh có mặt vì cách gõ tắt và cách viết liền không dấu rất phổ
   biến, mà tên hành chính chính thức lại không chứa những chuỗi đó. */
export const searchCities = (query, limit = 40) => {
  const q = foldAccents(query);
  if (!q) return CITIES.slice(0, limit);

  const scored = [];
  for (const city of CITIES) {
    const haystacks = [city.name.vi, city.name.en, city.name.zh, city.key, city.alias || ''].map(foldAccents);
    const idx = haystacks.reduce((best, h) => {
      const i = h.indexOf(q);
      return i === -1 ? best : (best === -1 ? i : Math.min(best, i));
    }, -1);
    // Khớp từ đầu chuỗi xếp trước khớp ở giữa; trong nước xếp trước ngoài nước.
    if (idx !== -1) scored.push({ city, score: idx * 10 + (city.region === 'vn' ? 0 : 1) });
  }

  return scored.sort((a, b) => a.score - b.score).slice(0, limit).map(s => s.city);
};

export const findCity = (key) => CITIES.find(c => c.key === key) || null;
