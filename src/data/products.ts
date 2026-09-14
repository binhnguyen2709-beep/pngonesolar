export type ProductCategory = "panel" | "battery" | "inverter" | "accessory";

export interface Product {
  slug: string;
  category: ProductCategory;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  highlights: string[];
}

export const productCategories: { key: ProductCategory; title: string; description: string }[] = [
  {
    key: "panel",
    title: "Tấm pin năng lượng mặt trời",
    description:
      "Tấm pin công nghệ Mono PERC / TOPCon hiệu suất cao, chịu được điều kiện khí hậu nhiệt đới, bảo hành hiệu suất đến 25-30 năm.",
  },
  {
    key: "inverter",
    title: "Biến tần (Inverter)",
    description:
      "Bộ chuyển đổi điện DC sang AC hiệu suất chuyển đổi trên 98%, tích hợp giám sát từ xa qua ứng dụng di động.",
  },
  {
    key: "battery",
    title: "Pin lưu trữ năng lượng",
    description:
      "Pin Lithium LFP an toàn, tuổi thọ cao, lưu trữ điện dư để dùng vào buổi tối hoặc khi mất điện lưới.",
  },
  {
    key: "accessory",
    title: "Phụ kiện & khung giá đỡ",
    description:
      "Hệ khung nhôm định hình, ốc vít inox 304 chống ăn mòn, dây cáp DC chuyên dụng đạt chuẩn chống cháy.",
  },
];

export const products: Product[] = [
  {
    slug: "png-mono-590w",
    category: "panel",
    name: "PNG Mono PERC 590W",
    brand: "PNG ONE SOLAR",
    tagline: "Hiệu suất chuyển đổi 22.8% - tối ưu diện tích mái",
    description:
      "Dòng tấm pin Mono PERC công suất lớn, phù hợp cho cả nhà ở và nhà xưởng cần tối ưu sản lượng trên mỗi m² mái. Khung nhôm anod hóa chống ăn mòn, kính cường lực chống chịu mưa đá.",
    specs: [
      { label: "Công suất định mức", value: "590 Wp" },
      { label: "Hiệu suất tấm pin", value: "22.8%" },
      { label: "Loại tế bào", value: "Mono PERC Half-cell" },
      { label: "Bảo hành sản phẩm", value: "15 năm" },
      { label: "Bảo hành hiệu suất", value: "30 năm (≥ 87.4%)" },
      { label: "Chịu tải trọng", value: "Gió 2400 Pa / Tuyết 5400 Pa" },
    ],
    highlights: ["Chống PID", "Chịu muối biển & amoniac", "Chứng nhận IEC 61215/61730"],
  },
  {
    slug: "png-topcon-605w",
    category: "panel",
    name: "PNG TOPCon 605W",
    brand: "PNG ONE SOLAR",
    tagline: "Công nghệ TOPCon thế hệ mới - suy hao thấp theo thời gian",
    description:
      "Công nghệ TOPCon cho hiệu suất vượt trội và độ suy hao hằng năm thấp hơn Mono PERC truyền thống, lựa chọn tối ưu cho dự án doanh nghiệp cần hiệu quả đầu tư dài hạn.",
    specs: [
      { label: "Công suất định mức", value: "605 Wp" },
      { label: "Hiệu suất tấm pin", value: "23.4%" },
      { label: "Loại tế bào", value: "N-Type TOPCon" },
      { label: "Bảo hành sản phẩm", value: "18 năm" },
      { label: "Bảo hành hiệu suất", value: "30 năm (≥ 88.4%)" },
      { label: "Suy hao năm đầu", value: "≤ 1%" },
    ],
    highlights: ["Suy hao thấp 0.4%/năm", "Hiệu suất cao trong điều kiện nhiệt độ lớn", "Hệ số nhiệt độ tối ưu"],
  },
  {
    slug: "png-inverter-string",
    category: "inverter",
    name: "PNG Inverter String 10-50kW",
    brand: "PNG ONE SOLAR",
    tagline: "Hiệu suất chuyển đổi 98.6% - giám sát qua App",
    description:
      "Biến tần chuỗi (string inverter) dùng cho hệ on-grid hộ gia đình và doanh nghiệp vừa, tích hợp 2-4 MPPT tối ưu sản lượng khi mái có nhiều hướng nghiêng khác nhau.",
    specs: [
      { label: "Dải công suất", value: "10 - 50 kW" },
      { label: "Hiệu suất chuyển đổi", value: "98.6%" },
      { label: "Số MPPT", value: "2 - 4" },
      { label: "Chuẩn bảo vệ", value: "IP65 - lắp ngoài trời" },
      { label: "Giám sát", value: "App di động + Web portal" },
      { label: "Bảo hành", value: "10 năm (có thể nâng lên 15-20 năm)" },
    ],
    highlights: ["Giám sát thời gian thực", "Tự động ngắt an toàn khi mất lưới", "Chống sét lan truyền"],
  },
  {
    slug: "png-inverter-hybrid",
    category: "inverter",
    name: "PNG Inverter Hybrid 5-30kW",
    brand: "PNG ONE SOLAR",
    tagline: "Tích hợp pin lưu trữ - duy trì điện khi mất lưới",
    description:
      "Biến tần hybrid cho phép kết hợp trực tiếp với pin lưu trữ, tự động chuyển đổi nguồn điện ưu tiên (điện mặt trời → pin lưu trữ → điện lưới) giúp duy trì hoạt động liên tục.",
    specs: [
      { label: "Dải công suất", value: "5 - 30 kW" },
      { label: "Tương thích pin", value: "Lithium LFP 48V/51.2V" },
      { label: "Thời gian chuyển mạch", value: "< 20ms (UPS mode)" },
      { label: "Số MPPT", value: "2" },
      { label: "Giám sát", value: "App di động + Web portal" },
      { label: "Bảo hành", value: "10 năm" },
    ],
    highlights: ["Chống mất điện đột ngột", "Sạc/xả pin thông minh theo giờ", "Mở rộng dễ dàng"],
  },
  {
    slug: "png-battery-lfp-5kwh",
    category: "battery",
    name: "PNG Battery LFP 5.12kWh",
    brand: "PNG ONE SOLAR",
    tagline: "Pin Lithium LFP an toàn - có thể ghép nối song song",
    description:
      "Pin lưu trữ dạng module, dễ dàng lắp thêm để tăng dung lượng theo nhu cầu sử dụng. Công nghệ LFP (Lithium Iron Phosphate) an toàn, không cháy nổ, tuổi thọ chu kỳ sạc/xả cao.",
    specs: [
      { label: "Dung lượng", value: "5.12 kWh / module" },
      { label: "Điện áp", value: "51.2V" },
      { label: "Số chu kỳ sạc/xả", value: "≥ 6.000 chu kỳ (80% DOD)" },
      { label: "Khả năng mở rộng", value: "Ghép song song đến 16 module" },
      { label: "Bảo hành", value: "10 năm" },
      { label: "Chuẩn an toàn", value: "IP65, chống cháy nổ" },
    ],
    highlights: ["Không cháy nổ", "Tuổi thọ > 15 năm sử dụng", "Lắp đặt trong nhà hoặc ngoài trời"],
  },
  {
    slug: "png-battery-lfp-10kwh",
    category: "battery",
    name: "PNG Battery LFP 10.24kWh",
    brand: "PNG ONE SOLAR",
    tagline: "Dung lượng lớn cho nhà xưởng, biệt thự",
    description:
      "Phiên bản dung lượng cao dành cho khách hàng có nhu cầu dự trữ điện lớn, đảm bảo vận hành các thiết bị quan trọng (tủ lạnh, máy bơm, hệ thống an ninh...) khi mất điện lưới kéo dài.",
    specs: [
      { label: "Dung lượng", value: "10.24 kWh / module" },
      { label: "Điện áp", value: "51.2V" },
      { label: "Số chu kỳ sạc/xả", value: "≥ 6.000 chu kỳ (80% DOD)" },
      { label: "Khả năng mở rộng", value: "Ghép song song đến 8 module" },
      { label: "Bảo hành", value: "10 năm" },
      { label: "Chuẩn an toàn", value: "IP65, chống cháy nổ" },
    ],
    highlights: ["Dự phòng điện dài hạn", "Quản lý pin thông minh BMS", "Tương thích hầu hết inverter hybrid"],
  },
  {
    slug: "png-mounting-system",
    category: "accessory",
    name: "Hệ khung giá đỡ PNG Mount",
    brand: "PNG ONE SOLAR",
    tagline: "Khung nhôm định hình - phù hợp mọi loại mái",
    description:
      "Hệ khung giá đỡ được thiết kế riêng cho từng loại mái (mái tôn, mái bằng, mái ngói), đảm bảo độ chắc chắn, chống thấm dột tuyệt đối và thẩm mỹ khi lắp đặt.",
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
