export type ProductCategory = "panel" | "battery" | "inverter" | "accessory";

export interface Product {
  slug: string;
  category: ProductCategory;
  name: string;
  brand: string;
  model: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  /** Ảnh sản phẩm (đường dẫn trong /public). Nếu để trống, ProductCard sẽ hiển thị icon minh họa. */
  image?: string;
  /** Công suất 1 tấm (Wp) - chỉ áp dụng cho category "panel". */
  wattPeak?: number;
  /** Đơn giá theo W (đồng/W) - chỉ áp dụng cho category "panel". Giá 1 tấm = wattPeak × pricePerWatt. */
  pricePerWatt?: number;
  /** Công suất biến tần (kW) - chỉ áp dụng cho category "inverter". */
  capacityKw?: number;
  /** Dung lượng pin (kWh) - chỉ áp dụng cho category "battery". */
  capacityKwh?: number;
  /** Giá niêm yết cố định cho 1 sản phẩm (đồng) - áp dụng cho "inverter" và "battery". */
  price?: number;
}

export const productCategories: { key: ProductCategory; title: string; description: string }[] = [
  {
    key: "panel",
    title: "Tấm pin năng lượng mặt trời",
    description:
      "Tấm pin công nghệ TOPCon / N-Type Bifacial hiệu suất cao, hai mặt kính, chịu được điều kiện khí hậu nhiệt đới, bảo hành hiệu suất đến 30 năm.",
  },
  {
    key: "inverter",
    title: "Biến tần (Inverter)",
    description:
      "Biến tần Hybrid 1 pha áp thấp, tích hợp sẵn khả năng đấu nối pin lưu trữ, giám sát từ xa qua ứng dụng di động.",
  },
  {
    key: "battery",
    title: "Pin lưu trữ năng lượng",
    description:
      "Pin Lithium LFP (LiFePO4) an toàn, tuổi thọ cao, lưu trữ điện dư để dùng vào buổi tối hoặc khi mất điện lưới.",
  },
  {
    key: "accessory",
    title: "Phụ kiện & khung giá đỡ",
    description:
      "Hệ khung nhôm định hình, ốc vít inox 304 chống ăn mòn, dây cáp DC chuyên dụng đạt chuẩn chống cháy.",
  },
];

// Nguồn giá: Bảng giá vật tư điện năng lượng mặt trời - CiTiSOLAR (www.citisolar.vn),
// cập nhật 04/07/2026. Đơn giá đã bao gồm VAT, là GIÁ NIÊM YẾT (giá bán lẻ đề xuất).
// Nguồn ảnh + thông số kỹ thuật chi tiết: catalogue chính hãng AUSTA (AUSTA CATALOGUE.pdf)
// và Felicity Solar ((EN) 2026 Felicitysolar Brochure.pdf).
//
// LƯU Ý: một số model trong bảng giá CiTiSOLAR có hậu tố thế hệ (G2/G3, G1/G2) không khớp
// tuyệt đối với catalogue hãng đang lưu hành (VD: giá ghi "AU6KESL-G3" nhưng catalogue AUSTA
// hiện chỉ có dòng 6kW ở thế hệ "AU6KESL-G2"; "IVGM6KLP1G2" nhưng Felicity hiện chỉ có
// "IVGM6KLP1G1"). Các trường hợp này mình dùng thông số/ảnh của model cùng công suất gần nhất
// trong catalogue hãng - nên xác nhận lại với nhà cung cấp trước khi in ấn/quảng cáo chính thức.
export const products: Product[] = [
  {
    slug: "osda-620w",
    category: "panel",
    wattPeak: 620,
    pricePerWatt: 4060,
    name: "OSDA 620W N-Type Bifacial",
    brand: "OSDA",
    model: "ODA620-33V-MHDRz",
    tagline: "Công nghệ N-Type Bifacial - hai mặt kính, hiệu suất cao",
    description:
      "Tấm pin công nghệ N-Type Bifacial hai mặt kính, có thể hấp thụ thêm ánh sáng phản xạ từ mặt sau, tăng sản lượng điện so với tấm pin một mặt kính truyền thống.",
    specs: [
      { label: "Công suất định mức", value: "620 Wp" },
      { label: "Công nghệ", value: "N-Type Bifacial" },
      { label: "Cấu tạo", value: "Hai mặt kính (Dual Glass)" },
      { label: "Bảo hành vật lý", value: "15 năm" },
      { label: "Bảo hành hiệu suất", value: "30 năm (≥ 87.4%)" },
    ],
    highlights: ["Hai mặt kính bền bỉ", "Hấp thụ ánh sáng cả 2 mặt", "Bảo hành vật lý 15 năm"],
  },
  {
    slug: "vsun-620w",
    category: "panel",
    wattPeak: 620,
    pricePerWatt: 4100,
    name: "VSUN 620W TOPcon",
    brand: "VSUN",
    model: "VSUN620N-132BMHR-DG",
    tagline: "Công nghệ TOPcon - hai mặt kính, thương hiệu quốc tế",
    description:
      "Tấm pin công nghệ TOPcon thế hệ mới từ VSUN, cấu tạo hai mặt kính giúp tăng độ bền và tuổi thọ, phù hợp cho cả công trình dân dụng và thương mại.",
    specs: [
      { label: "Công suất định mức", value: "620 Wp" },
      { label: "Công nghệ", value: "TOPcon" },
      { label: "Cấu tạo", value: "Hai mặt kính (Dual Glass)" },
      { label: "Bảo hành vật lý", value: "12 năm" },
      { label: "Bảo hành hiệu suất", value: "30 năm (≥ 87.4%)" },
    ],
    highlights: ["Công nghệ TOPcon mới nhất", "Thương hiệu quốc tế VSUN", "Hai mặt kính bền bỉ"],
  },
  {
    slug: "austa-au6kesl-g3",
    category: "inverter",
    capacityKw: 6,
    price: 18_990_000,
    image: "/products/austa-inverter-g2.png",
    name: "AUSTA AU6KESL-G3 - Hybrid 6kW",
    brand: "AUSTA",
    model: "AU6KESL-G3",
    tagline: "Biến tần Hybrid 6kW, 1 pha, áp thấp",
    description:
      "Biến tần Hybrid tích hợp sẵn khả năng đấu nối pin lưu trữ, phù hợp cho hộ gia đình quy mô vừa. Có thể lắp trong nhà hoặc ngoài trời.",
    specs: [
      { label: "Công suất AC đầu ra", value: "6.000 W" },
      { label: "MPPT", value: "2 tracker, 1 string/MPPT" },
      { label: "Dòng sạc/xả pin tối đa", value: "135 A" },
      { label: "Hiệu suất chuyển đổi tối đa", value: "97.6%" },
      { label: "Vị trí lắp đặt", value: "Trong nhà và ngoài trời (IP66)" },
      { label: "Kích thước (D×R×C)", value: "420 × 505 × 236 mm" },
      { label: "Trọng lượng", value: "28.5 kg" },
      { label: "Bảo hành", value: "5 năm (10 năm nếu dùng cùng pin AUSTA)" },
    ],
    highlights: ["Tích hợp Hybrid", "Chuẩn chống nước IP66", "Giám sát qua App"],
  },
  {
    slug: "austa-au8kesl-g3",
    category: "inverter",
    capacityKw: 8,
    price: 27_590_000,
    image: "/products/austa-inverter-g3.png",
    name: "AUSTA AU8KESL-G3 - Hybrid 8kW",
    brand: "AUSTA",
    model: "AU8KESL-G3",
    tagline: "Biến tần Hybrid 8kW, 1 pha, áp thấp",
    description:
      "Biến tần Hybrid công suất lớn hơn, phù hợp hộ gia đình có mức tiêu thụ điện cao hoặc doanh nghiệp nhỏ. Có thể lắp trong nhà hoặc ngoài trời.",
    specs: [
      { label: "Công suất AC đầu ra", value: "8.000 W" },
      { label: "MPPT", value: "2 tracker, 2 string/MPPT" },
      { label: "Dòng sạc/xả pin tối đa", value: "190 A" },
      { label: "Hiệu suất chuyển đổi tối đa", value: "97.6%" },
      { label: "Vị trí lắp đặt", value: "Trong nhà và ngoài trời (IP66)" },
      { label: "Kích thước (D×R×C)", value: "420 × 505 × 236 mm" },
      { label: "Trọng lượng", value: "29 kg" },
      { label: "Bảo hành", value: "5 năm (10 năm nếu dùng cùng pin AUSTA)" },
    ],
    highlights: ["Tích hợp Hybrid", "Chuẩn chống nước IP66", "Giám sát qua App"],
  },
  {
    slug: "austa-au10kesl-g3",
    category: "inverter",
    capacityKw: 10,
    price: 32_210_000,
    image: "/products/austa-inverter-g3.png",
    name: "AUSTA AU10KESL-G3 - Hybrid 10kW",
    brand: "AUSTA",
    model: "AU10KESL-G3",
    tagline: "Biến tần Hybrid 10kW, 1 pha, áp thấp",
    description:
      "Biến tần Hybrid công suất cao nhất trong dòng 1 pha, phù hợp biệt thự hoặc hộ kinh doanh có nhu cầu sử dụng điện lớn.",
    specs: [
      { label: "Công suất AC đầu ra", value: "10.000 W" },
      { label: "MPPT", value: "2 tracker, 2 string/MPPT" },
      { label: "Dòng sạc/xả pin tối đa", value: "210 A" },
      { label: "Hiệu suất chuyển đổi tối đa", value: "97.6%" },
      { label: "Vị trí lắp đặt", value: "Trong nhà và ngoài trời (IP66)" },
      { label: "Kích thước (D×R×C)", value: "420 × 505 × 236 mm" },
      { label: "Trọng lượng", value: "29 kg" },
      { label: "Bảo hành", value: "5 năm (10 năm nếu dùng cùng pin AUSTA)" },
    ],
    highlights: ["Công suất cao nhất dòng 1 pha", "Chuẩn chống nước IP66", "Giám sát qua App"],
  },
  {
    slug: "felicity-ivgm6klp1g2",
    category: "inverter",
    capacityKw: 6,
    price: 19_810_000,
    image: "/products/felicity-ivgm-inverter.png",
    name: "Felicity IVGM6KLP1G2 - Hybrid 6kW",
    brand: "Felicity",
    model: "IVGM6KLP1G2",
    tagline: "Biến tần Hybrid 6kW, 1 pha, áp thấp, bảo hành 10 năm",
    description:
      "Biến tần Hybrid từ Felicity với chính sách bảo hành tiêu chuẩn 10 năm, phù hợp hộ gia đình quy mô vừa.",
    specs: [
      { label: "Công suất AC đầu ra", value: "6.600 W" },
      { label: "MPPT", value: "2 tracker" },
      { label: "Dòng sạc/xả pin tối đa", value: "135 A" },
      { label: "Công suất PV khuyến nghị", value: "9.000 W" },
      { label: "Vị trí lắp đặt", value: "Trong nhà và ngoài trời (IP65)" },
      { label: "Kích thước (D×R×C)", value: "430 × 654 × 243 mm" },
      { label: "Trọng lượng", value: "33.5 kg" },
      { label: "Bảo hành", value: "10 năm" },
    ],
    highlights: ["Bảo hành tiêu chuẩn 10 năm", "Chuẩn chống nước IP65", "Giám sát qua App"],
  },
  {
    slug: "felicity-ivgm8klp1g1",
    category: "inverter",
    capacityKw: 8,
    price: 26_140_000,
    image: "/products/felicity-ivgm-inverter.png",
    name: "Felicity IVGM8KLP1G1 - Hybrid 8kW",
    brand: "Felicity",
    model: "IVGM8KLP1G1",
    tagline: "Biến tần Hybrid 8kW, 1 pha, áp thấp, bảo hành 10 năm",
    description:
      "Biến tần Hybrid công suất lớn hơn từ Felicity, bảo hành tiêu chuẩn 10 năm, phù hợp hộ gia đình mức tiêu thụ cao.",
    specs: [
      { label: "Công suất AC đầu ra", value: "8.800 W" },
      { label: "MPPT", value: "2 tracker" },
      { label: "Dòng sạc/xả pin tối đa", value: "190 A" },
      { label: "Công suất PV khuyến nghị", value: "12.000 W" },
      { label: "Vị trí lắp đặt", value: "Trong nhà và ngoài trời (IP65)" },
      { label: "Kích thước (D×R×C)", value: "430 × 654 × 243 mm" },
      { label: "Trọng lượng", value: "33.5 kg" },
      { label: "Bảo hành", value: "10 năm" },
    ],
    highlights: ["Bảo hành tiêu chuẩn 10 năm", "Chuẩn chống nước IP65", "Giám sát qua App"],
  },
  {
    slug: "felicity-fla48100",
    category: "battery",
    capacityKwh: 5.12,
    price: 17_810_000,
    image: "/products/felicity-fla48100.png",
    name: "Felicity FLA48100 - 5.12kWh",
    brand: "Felicity",
    model: "FLA48100",
    tagline: "Pin LFP 5.12kWh, kết nối App, chữa cháy tự động",
    description:
      "Pin lưu trữ dung lượng nhỏ gọn, phù hợp hộ gia đình mới bắt đầu lắp pin dự phòng. Tích hợp Wifi/Bluetooth điều khiển qua App và thiết bị chữa cháy tự động aerosol.",
    specs: [
      { label: "Dung lượng", value: "5.12 kWh (51.2V)" },
      { label: "Vị trí lắp đặt", value: "Trong nhà (IP21)" },
      { label: "Dòng sạc/xả liên tục", value: "100 A" },
      { label: "Số chu kỳ sạc/xả", value: "≥ 6.000 chu kỳ, DOD ≥ 95%" },
      { label: "Kích thước (D×R×C)", value: "663 × 400 × 178 mm" },
      { label: "Trọng lượng", value: "48 kg" },
      { label: "Bảo hành", value: "7 năm" },
    ],
    highlights: ["Điều khiển qua App", "Chữa cháy tự động aerosol", "DOD ≥95% - dùng được nhiều điện hơn"],
  },
  {
    slug: "felicity-flb48100wg1",
    category: "battery",
    capacityKwh: 5.12,
    price: 20_360_000,
    image: "/products/felicity-flb48100wg1.png",
    name: "Felicity FLB48100WG1 - 5.12kWh (ngoài trời)",
    brand: "Felicity",
    model: "FLB48100WG1",
    tagline: "Pin LFP 5.12kWh, lắp được ngoài trời, bảo hành 10 năm",
    description:
      "Phiên bản chống nước IP65, lắp đặt được cả ngoài trời, bảo hành tiêu chuẩn 10 năm không cần điều kiện đi kèm.",
    specs: [
      { label: "Dung lượng", value: "5.12 kWh (51.2V)" },
      { label: "Vị trí lắp đặt", value: "Treo tường / đặt sàn, trong nhà và ngoài trời (IP65)" },
      { label: "Dòng sạc/xả liên tục", value: "100 A" },
      { label: "Số chu kỳ sạc/xả", value: "≥ 6.000 chu kỳ, DOD ≥ 95%" },
      { label: "Kích thước (D×R×C)", value: "650 × 450 × 174 mm" },
      { label: "Trọng lượng", value: "48.5 kg" },
      { label: "Bảo hành", value: "10 năm" },
    ],
    highlights: ["Lắp đặt ngoài trời (IP65)", "Bảo hành 10 năm", "Chữa cháy tự động aerosol"],
  },
  {
    slug: "austa-au51200-s-is",
    category: "battery",
    capacityKwh: 10.24,
    price: 31_020_000,
    image: "/products/austa-battery-is.png",
    name: "AUSTA AU51200-S-IS - 10.24kWh",
    brand: "AUSTA",
    model: "AU51200-S-IS",
    tagline: "Pin LFP 10.24kWh, dung lượng lớn cho gia đình",
    description:
      "Pin lưu trữ dung lượng lớn, phù hợp gia đình cần dự phòng điện cho nhiều thiết bị vào buổi tối hoặc khi mất điện lưới.",
    specs: [
      { label: "Dung lượng", value: "10.24 kWh (51.2V), dùng được 9.21 kWh" },
      { label: "Vị trí lắp đặt", value: "Trong nhà (IP21)" },
      { label: "Dòng sạc/xả tối đa", value: "200 A" },
      { label: "Số chu kỳ sạc/xả", value: "Thiết kế >10.000 / bảo hành ≥8.000 chu kỳ, DOD 90%" },
      { label: "Kích thước (D×R×C)", value: "685 × 447 × 232 mm" },
      { label: "Trọng lượng", value: "92 kg" },
      { label: "Bảo hành", value: "5 năm (10 năm nếu dùng cùng inverter AUSTA)" },
    ],
    highlights: ["Dung lượng lớn", "Chu kỳ sạc/xả cao ≥8.000", "Tương thích inverter AUSTA"],
  },
  {
    slug: "austa-au51200-s-oh",
    category: "battery",
    capacityKwh: 10.24,
    price: 33_240_000,
    image: "/products/austa-battery-oh.png",
    name: "AUSTA AU51200-S-OH - 10.24kWh (ngoài trời)",
    brand: "AUSTA",
    model: "AU51200-S-OH",
    tagline: "Pin LFP 10.24kWh, lắp được ngoài trời",
    description: "Phiên bản chống nước IP65 của dòng AU51200, lắp đặt được cả ngoài trời.",
    specs: [
      { label: "Dung lượng", value: "10.24 kWh (51.2V), dùng được 9.21 kWh" },
      { label: "Vị trí lắp đặt", value: "Trong nhà và ngoài trời (IP65)" },
      { label: "Dòng sạc/xả tối đa", value: "200 A" },
      { label: "Số chu kỳ sạc/xả", value: "Thiết kế >10.000 / bảo hành ≥8.000 chu kỳ, DOD 90%" },
      { label: "Kích thước (D×R×C)", value: "462 × 728 × 251 mm" },
      { label: "Trọng lượng", value: "92 kg" },
      { label: "Bảo hành", value: "5 năm (10 năm nếu dùng cùng inverter AUSTA)" },
    ],
    highlights: ["Lắp đặt ngoài trời (IP65)", "Chu kỳ sạc/xả cao ≥8.000", "Tương thích inverter AUSTA"],
  },
  {
    slug: "felicity-fla48300tg2",
    category: "battery",
    capacityKwh: 15.3,
    price: 40_720_000,
    image: "/products/felicity-fla48300tg2.png",
    name: "Felicity FLA48300TG2 - 15.3kWh",
    brand: "Felicity",
    model: "FLA48300TG2",
    tagline: "Pin LFP 15.3kWh, dự phòng dài cho hộ dùng nhiều điện",
    description:
      "Dung lượng lớn, phù hợp hộ gia đình hoặc hộ kinh doanh có nhu cầu dự phòng điện dài hạn cho nhiều thiết bị.",
    specs: [
      { label: "Dung lượng", value: "15.3 kWh (51.2V)" },
      { label: "Vị trí lắp đặt", value: "Trong nhà, đặt sàn (IP21)" },
      { label: "Dòng sạc/xả liên tục", value: "160 A" },
      { label: "Số chu kỳ sạc/xả", value: "≥ 6.000 chu kỳ, DOD ≥ 95%" },
      { label: "Kích thước (D×R×C)", value: "435 × 880 × 247 mm" },
      { label: "Trọng lượng", value: "118.5 kg" },
      { label: "Bảo hành", value: "7 năm" },
    ],
    highlights: ["Dung lượng lớn 15.3kWh", "Điều khiển qua App", "DOD ≥95%"],
  },
  {
    slug: "austa-au51314-s-is",
    category: "battery",
    capacityKwh: 16.07,
    price: 43_410_000,
    image: "/products/austa-battery-is.png",
    name: "AUSTA AU51314-S-IS - 16.07kWh",
    brand: "AUSTA",
    model: "AU51314-S-IS",
    tagline: "Pin LFP 16.07kWh, dung lượng cao nhất dòng AUSTA",
    description: "Dung lượng cao nhất trong dòng pin AUSTA, phù hợp nhu cầu dự phòng điện lớn, dài hạn.",
    specs: [
      { label: "Dung lượng", value: "16.07 kWh (51.2V), dùng được 14.47 kWh" },
      { label: "Vị trí lắp đặt", value: "Trong nhà (IP21)" },
      { label: "Dòng sạc/xả tối đa", value: "200 A" },
      { label: "Số chu kỳ sạc/xả", value: "Thiết kế >12.000 / bảo hành ≥10.000 chu kỳ, DOD 90%" },
      { label: "Kích thước (D×R×C)", value: "817 × 447 × 232 mm" },
      { label: "Trọng lượng", value: "125 kg" },
      { label: "Bảo hành", value: "5 năm (10 năm nếu dùng cùng inverter AUSTA)" },
    ],
    highlights: ["Dung lượng cao nhất dòng AUSTA", "Chu kỳ sạc/xả cao ≥10.000", "Tương thích inverter AUSTA"],
  },
  {
    slug: "austa-au51314-s-oh",
    category: "battery",
    capacityKwh: 16.07,
    price: 45_230_000,
    image: "/products/austa-battery-oh.png",
    name: "AUSTA AU51314-S-OH - 16.07kWh (ngoài trời)",
    brand: "AUSTA",
    model: "AU51314-S-OH",
    tagline: "Pin LFP 16.07kWh, lắp được ngoài trời",
    description: "Phiên bản chống nước IP65 của dòng AU51314, lắp đặt được cả ngoài trời.",
    specs: [
      { label: "Dung lượng", value: "16.07 kWh (51.2V), dùng được 14.47 kWh" },
      { label: "Vị trí lắp đặt", value: "Trong nhà và ngoài trời (IP65)" },
      { label: "Dòng sạc/xả tối đa", value: "200 A" },
      { label: "Số chu kỳ sạc/xả", value: "Thiết kế >12.000 / bảo hành ≥10.000 chu kỳ, DOD 90%" },
      { label: "Kích thước (D×R×C)", value: "462 × 858 × 251 mm" },
      { label: "Trọng lượng", value: "125 kg" },
      { label: "Bảo hành", value: "5 năm (10 năm nếu dùng cùng inverter AUSTA)" },
    ],
    highlights: ["Lắp đặt ngoài trời (IP65)", "Chu kỳ sạc/xả cao ≥10.000", "Tương thích inverter AUSTA"],
  },
  {
    slug: "felicity-fla48314-eu",
    category: "battery",
    capacityKwh: 16.07,
    price: 43_260_000,
    image: "/products/felicity-fla48300tg2.png",
    name: "Felicity FLA48314-EU - 16.07kWh",
    brand: "Felicity",
    model: "FLA48314-EU",
    tagline: "Pin LFP 16.07kWh, bảo hành 10 năm không điều kiện",
    description:
      "Dung lượng lớn nhất dòng Felicity, chu kỳ sạc/xả cao và bảo hành tiêu chuẩn 10 năm không cần điều kiện đi kèm.",
    specs: [
      { label: "Dung lượng", value: "16.07 kWh (51.2V)" },
      { label: "Vị trí lắp đặt", value: "Trong nhà, đặt sàn (IP21)" },
      { label: "Dòng sạc/xả liên tục", value: "160 A" },
      { label: "Số chu kỳ sạc/xả", value: "≥ 8.000 chu kỳ, DOD ≥ 95%" },
      { label: "Kích thước (D×R×C)", value: "435 × 880 × 247 mm" },
      { label: "Trọng lượng", value: "121.5 kg" },
      { label: "Bảo hành", value: "10 năm" },
    ],
    highlights: ["Bảo hành 10 năm không điều kiện", "Chu kỳ sạc/xả cao ≥8.000", "DOD ≥95%"],
  },
  {
    slug: "png-mounting-system",
    category: "accessory",
    name: "Hệ khung giá đỡ PNG Mount",
    brand: "PNG ONE SOLAR",
    model: "PNG Mount",
    tagline: "Khung nhôm định hình - phù hợp mọi loại mái",
    description:
      "Hệ khung giá đỡ được thiết kế riêng cho từng loại mái (mái tôn, mái bằng, mái ngói), đảm bảo độ chắc chắn, chống thấm dột tuyệt đối và thẩm mỹ khi lắp đặt. Chi phí đã bao gồm trong công lắp đặt trọn gói.",
    specs: [
      { label: "Chất liệu khung", value: "Nhôm hợp kim 6005-T5" },
      { label: "Ốc vít, bát kẹp", value: "Inox 304 chống gỉ" },
      { label: "Tương thích mái", value: "Tôn, bê tông, ngói, mái lệch" },
      { label: "Chịu tải gió", value: "Đạt chuẩn TCVN vùng gió bão" },
      { label: "Bảo hành", value: "12 năm" },
    ],
    highlights: ["Chống thấm dột 100%", "Thi công nhanh - thẩm mỹ cao", "Đạt chuẩn chịu lực TCVN"],
  },
];

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((p) => p.category === category);
}
