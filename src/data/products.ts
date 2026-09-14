import type { Locale } from "@/i18n/routing";

export type ProductCategory = "panel" | "battery" | "inverter" | "accessory";

interface Spec {
  label: string;
  value: string;
}

interface ProductI18n {
  name: string;
  tagline: string;
  description: string;
  specs: Spec[];
  highlights: string[];
}

export interface Product {
  slug: string;
  category: ProductCategory;
  brand: string;
  model: string;
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
  i18n: Record<Locale, ProductI18n>;
}

export interface LocalizedProduct extends ProductI18n {
  slug: string;
  category: ProductCategory;
  brand: string;
  model: string;
  image?: string;
  wattPeak?: number;
  pricePerWatt?: number;
  capacityKw?: number;
  capacityKwh?: number;
  price?: number;
}

export function getLocalizedProduct(product: Product, locale: Locale): LocalizedProduct {
  const t = product.i18n[locale] ?? product.i18n.vi;
  return {
    slug: product.slug,
    category: product.category,
    brand: product.brand,
    model: product.model,
    image: product.image,
    wattPeak: product.wattPeak,
    pricePerWatt: product.pricePerWatt,
    capacityKw: product.capacityKw,
    capacityKwh: product.capacityKwh,
    price: product.price,
    ...t,
  };
}

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
    brand: "OSDA",
    model: "ODA620-33V-MHDRz",
    wattPeak: 620,
    pricePerWatt: 4060,
    i18n: {
      vi: {
        name: "OSDA 620W N-Type Bifacial",
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
      en: {
        name: "OSDA 620W N-Type Bifacial",
        tagline: "N-Type Bifacial technology - dual glass, high efficiency",
        description:
          "A dual-glass N-Type Bifacial panel that captures reflected light on its rear side, boosting output compared to traditional single-sided panels.",
        specs: [
          { label: "Rated power", value: "620 Wp" },
          { label: "Technology", value: "N-Type Bifacial" },
          { label: "Construction", value: "Dual Glass" },
          { label: "Product warranty", value: "15 years" },
          { label: "Performance warranty", value: "30 years (≥ 87.4%)" },
        ],
        highlights: ["Durable dual-glass build", "Absorbs light on both sides", "15-year product warranty"],
      },
      zh: {
        name: "OSDA 620W N型双面组件",
        tagline: "N型双面发电技术 - 双玻璃，高效率",
        description: "双玻璃N型双面发电太阳能板，可吸收背面反射光线，比传统单面板发电量更高。",
        specs: [
          { label: "额定功率", value: "620 Wp" },
          { label: "技术类型", value: "N型双面发电" },
          { label: "结构", value: "双玻璃" },
          { label: "产品质保", value: "15 年" },
          { label: "性能质保", value: "30 年（≥ 87.4%）" },
        ],
        highlights: ["双玻璃结构耐用", "双面吸光发电", "15年产品质保"],
      },
    },
  },
  {
    slug: "vsun-620w",
    category: "panel",
    brand: "VSUN",
    model: "VSUN620N-132BMHR-DG",
    wattPeak: 620,
    pricePerWatt: 4100,
    i18n: {
      vi: {
        name: "VSUN 620W TOPcon",
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
      en: {
        name: "VSUN 620W TOPcon",
        tagline: "TOPcon technology - dual glass, international brand",
        description:
          "A new-generation TOPcon panel from VSUN, with dual-glass construction for greater durability and lifespan, suited to both residential and commercial projects.",
        specs: [
          { label: "Rated power", value: "620 Wp" },
          { label: "Technology", value: "TOPcon" },
          { label: "Construction", value: "Dual Glass" },
          { label: "Product warranty", value: "12 years" },
          { label: "Performance warranty", value: "30 years (≥ 87.4%)" },
        ],
        highlights: ["Latest TOPcon technology", "International VSUN brand", "Durable dual-glass build"],
      },
      zh: {
        name: "VSUN 620W TOPcon组件",
        tagline: "TOPcon技术 - 双玻璃，国际品牌",
        description: "VSUN新一代TOPcon技术太阳能板，双玻璃结构提升耐用性与使用寿命，适用于住宅及商业项目。",
        specs: [
          { label: "额定功率", value: "620 Wp" },
          { label: "技术类型", value: "TOPcon" },
          { label: "结构", value: "双玻璃" },
          { label: "产品质保", value: "12 年" },
          { label: "性能质保", value: "30 年（≥ 87.4%）" },
        ],
        highlights: ["最新TOPcon技术", "VSUN国际品牌", "双玻璃结构耐用"],
      },
    },
  },
  {
    slug: "austa-au6kesl-g3",
    category: "inverter",
    brand: "AUSTA",
    model: "AU6KESL-G3",
    capacityKw: 6,
    price: 18_990_000,
    image: "/products/austa-inverter-g2.png",
    i18n: {
      vi: {
        name: "AUSTA AU6KESL-G3 - Hybrid 6kW",
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
      en: {
        name: "AUSTA AU6KESL-G3 - 6kW Hybrid",
        tagline: "6kW single-phase, low-voltage hybrid inverter",
        description:
          "A hybrid inverter with battery-ready connectivity built in, suited to mid-size households. Can be installed indoors or outdoors.",
        specs: [
          { label: "AC output power", value: "6,000 W" },
          { label: "MPPT", value: "2 trackers, 1 string/MPPT" },
          { label: "Max. charge/discharge current", value: "135 A" },
          { label: "Max. conversion efficiency", value: "97.6%" },
          { label: "Installation location", value: "Indoor & outdoor (IP66)" },
          { label: "Dimensions (D×W×H)", value: "420 × 505 × 236 mm" },
          { label: "Weight", value: "28.5 kg" },
          { label: "Warranty", value: "5 years (10 years with AUSTA battery)" },
        ],
        highlights: ["Hybrid-ready", "IP66 water resistance", "App monitoring"],
      },
      zh: {
        name: "AUSTA AU6KESL-G3 - 6kW混合逆变器",
        tagline: "6kW单相低压混合逆变器",
        description: "内置储能电池接入能力的混合逆变器，适合中等规模家庭使用，可室内或室外安装。",
        specs: [
          { label: "交流输出功率", value: "6,000 W" },
          { label: "MPPT", value: "2路，每路1串" },
          { label: "最大充放电电流", value: "135 A" },
          { label: "最高转换效率", value: "97.6%" },
          { label: "安装位置", value: "室内外均可（IP66）" },
          { label: "尺寸（长×宽×高）", value: "420 × 505 × 236 mm" },
          { label: "重量", value: "28.5 kg" },
          { label: "质保", value: "5年（搭配AUSTA电池可延长至10年）" },
        ],
        highlights: ["支持混合储能", "IP66防水等级", "App远程监控"],
      },
    },
  },
  {
    slug: "austa-au8kesl-g3",
    category: "inverter",
    brand: "AUSTA",
    model: "AU8KESL-G3",
    capacityKw: 8,
    price: 27_590_000,
    image: "/products/austa-inverter-g3.png",
    i18n: {
      vi: {
        name: "AUSTA AU8KESL-G3 - Hybrid 8kW",
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
      en: {
        name: "AUSTA AU8KESL-G3 - 8kW Hybrid",
        tagline: "8kW single-phase, low-voltage hybrid inverter",
        description:
          "A higher-capacity hybrid inverter for households with heavier usage or small businesses. Can be installed indoors or outdoors.",
        specs: [
          { label: "AC output power", value: "8,000 W" },
          { label: "MPPT", value: "2 trackers, 2 strings/MPPT" },
          { label: "Max. charge/discharge current", value: "190 A" },
          { label: "Max. conversion efficiency", value: "97.6%" },
          { label: "Installation location", value: "Indoor & outdoor (IP66)" },
          { label: "Dimensions (D×W×H)", value: "420 × 505 × 236 mm" },
          { label: "Weight", value: "29 kg" },
          { label: "Warranty", value: "5 years (10 years with AUSTA battery)" },
        ],
        highlights: ["Hybrid-ready", "IP66 water resistance", "App monitoring"],
      },
      zh: {
        name: "AUSTA AU8KESL-G3 - 8kW混合逆变器",
        tagline: "8kW单相低压混合逆变器",
        description: "更大功率的混合逆变器，适合用电量较高的家庭或小型企业，可室内或室外安装。",
        specs: [
          { label: "交流输出功率", value: "8,000 W" },
          { label: "MPPT", value: "2路，每路2串" },
          { label: "最大充放电电流", value: "190 A" },
          { label: "最高转换效率", value: "97.6%" },
          { label: "安装位置", value: "室内外均可（IP66）" },
          { label: "尺寸（长×宽×高）", value: "420 × 505 × 236 mm" },
          { label: "重量", value: "29 kg" },
          { label: "质保", value: "5年（搭配AUSTA电池可延长至10年）" },
        ],
        highlights: ["支持混合储能", "IP66防水等级", "App远程监控"],
      },
    },
  },
  {
    slug: "austa-au10kesl-g3",
    category: "inverter",
    brand: "AUSTA",
    model: "AU10KESL-G3",
    capacityKw: 10,
    price: 32_210_000,
    image: "/products/austa-inverter-g3.png",
    i18n: {
      vi: {
        name: "AUSTA AU10KESL-G3 - Hybrid 10kW",
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
      en: {
        name: "AUSTA AU10KESL-G3 - 10kW Hybrid",
        tagline: "10kW single-phase, low-voltage hybrid inverter",
        description:
          "The highest-capacity single-phase hybrid inverter in the line-up, suited to villas or businesses with heavy power needs.",
        specs: [
          { label: "AC output power", value: "10,000 W" },
          { label: "MPPT", value: "2 trackers, 2 strings/MPPT" },
          { label: "Max. charge/discharge current", value: "210 A" },
          { label: "Max. conversion efficiency", value: "97.6%" },
          { label: "Installation location", value: "Indoor & outdoor (IP66)" },
          { label: "Dimensions (D×W×H)", value: "420 × 505 × 236 mm" },
          { label: "Weight", value: "29 kg" },
          { label: "Warranty", value: "5 years (10 years with AUSTA battery)" },
        ],
        highlights: ["Highest capacity in the single-phase line", "IP66 water resistance", "App monitoring"],
      },
      zh: {
        name: "AUSTA AU10KESL-G3 - 10kW混合逆变器",
        tagline: "10kW单相低压混合逆变器",
        description: "单相系列中功率最高的混合逆变器，适合别墅或用电量较大的商业用户。",
        specs: [
          { label: "交流输出功率", value: "10,000 W" },
          { label: "MPPT", value: "2路，每路2串" },
          { label: "最大充放电电流", value: "210 A" },
          { label: "最高转换效率", value: "97.6%" },
          { label: "安装位置", value: "室内外均可（IP66）" },
          { label: "尺寸（长×宽×高）", value: "420 × 505 × 236 mm" },
          { label: "重量", value: "29 kg" },
          { label: "质保", value: "5年（搭配AUSTA电池可延长至10年）" },
        ],
        highlights: ["单相系列最大功率", "IP66防水等级", "App远程监控"],
      },
    },
  },
  {
    slug: "felicity-ivgm6klp1g2",
    category: "inverter",
    brand: "Felicity",
    model: "IVGM6KLP1G2",
    capacityKw: 6,
    price: 19_810_000,
    image: "/products/felicity-ivgm-inverter.png",
    i18n: {
      vi: {
        name: "Felicity IVGM6KLP1G2 - Hybrid 6kW",
        tagline: "Biến tần Hybrid 6kW, 1 pha, áp thấp, bảo hành 10 năm",
        description: "Biến tần Hybrid từ Felicity với chính sách bảo hành tiêu chuẩn 10 năm, phù hợp hộ gia đình quy mô vừa.",
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
      en: {
        name: "Felicity IVGM6KLP1G2 - 6kW Hybrid",
        tagline: "6kW single-phase, low-voltage hybrid inverter, 10-year warranty",
        description: "A hybrid inverter from Felicity with a standard 10-year warranty, suited to mid-size households.",
        specs: [
          { label: "AC output power", value: "6,600 W" },
          { label: "MPPT", value: "2 trackers" },
          { label: "Max. charge/discharge current", value: "135 A" },
          { label: "Recommended PV power", value: "9,000 W" },
          { label: "Installation location", value: "Indoor & outdoor (IP65)" },
          { label: "Dimensions (D×W×H)", value: "430 × 654 × 243 mm" },
          { label: "Weight", value: "33.5 kg" },
          { label: "Warranty", value: "10 years" },
        ],
        highlights: ["Standard 10-year warranty", "IP65 water resistance", "App monitoring"],
      },
      zh: {
        name: "Felicity IVGM6KLP1G2 - 6kW混合逆变器",
        tagline: "6kW单相低压混合逆变器，10年质保",
        description: "Felicity混合逆变器，提供标准10年质保，适合中等规模家庭使用。",
        specs: [
          { label: "交流输出功率", value: "6,600 W" },
          { label: "MPPT", value: "2路" },
          { label: "最大充放电电流", value: "135 A" },
          { label: "建议光伏功率", value: "9,000 W" },
          { label: "安装位置", value: "室内外均可（IP65）" },
          { label: "尺寸（长×宽×高）", value: "430 × 654 × 243 mm" },
          { label: "重量", value: "33.5 kg" },
          { label: "质保", value: "10 年" },
        ],
        highlights: ["标准10年质保", "IP65防水等级", "App远程监控"],
      },
    },
  },
  {
    slug: "felicity-ivgm8klp1g1",
    category: "inverter",
    brand: "Felicity",
    model: "IVGM8KLP1G1",
    capacityKw: 8,
    price: 26_140_000,
    image: "/products/felicity-ivgm-inverter.png",
    i18n: {
      vi: {
        name: "Felicity IVGM8KLP1G1 - Hybrid 8kW",
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
      en: {
        name: "Felicity IVGM8KLP1G1 - 8kW Hybrid",
        tagline: "8kW single-phase, low-voltage hybrid inverter, 10-year warranty",
        description:
          "A higher-capacity hybrid inverter from Felicity with a standard 10-year warranty, suited to households with heavier usage.",
        specs: [
          { label: "AC output power", value: "8,800 W" },
          { label: "MPPT", value: "2 trackers" },
          { label: "Max. charge/discharge current", value: "190 A" },
          { label: "Recommended PV power", value: "12,000 W" },
          { label: "Installation location", value: "Indoor & outdoor (IP65)" },
          { label: "Dimensions (D×W×H)", value: "430 × 654 × 243 mm" },
          { label: "Weight", value: "33.5 kg" },
          { label: "Warranty", value: "10 years" },
        ],
        highlights: ["Standard 10-year warranty", "IP65 water resistance", "App monitoring"],
      },
      zh: {
        name: "Felicity IVGM8KLP1G1 - 8kW混合逆变器",
        tagline: "8kW单相低压混合逆变器，10年质保",
        description: "Felicity更大功率的混合逆变器，提供标准10年质保，适合用电量较高的家庭。",
        specs: [
          { label: "交流输出功率", value: "8,800 W" },
          { label: "MPPT", value: "2路" },
          { label: "最大充放电电流", value: "190 A" },
          { label: "建议光伏功率", value: "12,000 W" },
          { label: "安装位置", value: "室内外均可（IP65）" },
          { label: "尺寸（长×宽×高）", value: "430 × 654 × 243 mm" },
          { label: "重量", value: "33.5 kg" },
          { label: "质保", value: "10 年" },
        ],
        highlights: ["标准10年质保", "IP65防水等级", "App远程监控"],
      },
    },
  },
  {
    slug: "felicity-fla48100",
    category: "battery",
    brand: "Felicity",
    model: "FLA48100",
    capacityKwh: 5.12,
    price: 17_810_000,
    image: "/products/felicity-fla48100.png",
    i18n: {
      vi: {
        name: "Felicity FLA48100 - 5.12kWh",
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
      en: {
        name: "Felicity FLA48100 - 5.12kWh",
        tagline: "5.12kWh LFP battery, app-connected, automatic fire suppression",
        description:
          "A compact battery, ideal for households installing backup storage for the first time. Integrates Wifi/Bluetooth app control and an automatic aerosol fire-suppression device.",
        specs: [
          { label: "Capacity", value: "5.12 kWh (51.2V)" },
          { label: "Installation location", value: "Indoor (IP21)" },
          { label: "Continuous charge/discharge current", value: "100 A" },
          { label: "Cycle life", value: "≥ 6,000 cycles, DOD ≥ 95%" },
          { label: "Dimensions (D×W×H)", value: "663 × 400 × 178 mm" },
          { label: "Weight", value: "48 kg" },
          { label: "Warranty", value: "7 years" },
        ],
        highlights: ["App control", "Automatic aerosol fire suppression", "≥95% DOD - more usable energy"],
      },
      zh: {
        name: "Felicity FLA48100 - 5.12kWh",
        tagline: "5.12kWh磷酸铁锂电池，App连接，自动灭火",
        description: "紧凑型储能电池，适合首次安装备用电池的家庭。集成Wifi/蓝牙App控制及气溶胶自动灭火装置。",
        specs: [
          { label: "容量", value: "5.12 kWh（51.2V）" },
          { label: "安装位置", value: "室内（IP21）" },
          { label: "持续充放电电流", value: "100 A" },
          { label: "循环寿命", value: "≥ 6,000 次循环，DOD ≥ 95%" },
          { label: "尺寸（长×宽×高）", value: "663 × 400 × 178 mm" },
          { label: "重量", value: "48 kg" },
          { label: "质保", value: "7 年" },
        ],
        highlights: ["App远程控制", "气溶胶自动灭火", "DOD≥95% - 可用电量更多"],
      },
    },
  },
  {
    slug: "felicity-flb48100wg1",
    category: "battery",
    brand: "Felicity",
    model: "FLB48100WG1",
    capacityKwh: 5.12,
    price: 20_360_000,
    image: "/products/felicity-flb48100wg1.png",
    i18n: {
      vi: {
        name: "Felicity FLB48100WG1 - 5.12kWh (ngoài trời)",
        tagline: "Pin LFP 5.12kWh, lắp được ngoài trời, bảo hành 10 năm",
        description: "Phiên bản chống nước IP65, lắp đặt được cả ngoài trời, bảo hành tiêu chuẩn 10 năm không cần điều kiện đi kèm.",
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
      en: {
        name: "Felicity FLB48100WG1 - 5.12kWh (Outdoor)",
        tagline: "5.12kWh LFP battery, outdoor-rated, 10-year warranty",
        description: "An IP65 water-resistant version suitable for outdoor installation, with a standard unconditional 10-year warranty.",
        specs: [
          { label: "Capacity", value: "5.12 kWh (51.2V)" },
          { label: "Installation location", value: "Wall-mounted / floor-standing, indoor & outdoor (IP65)" },
          { label: "Continuous charge/discharge current", value: "100 A" },
          { label: "Cycle life", value: "≥ 6,000 cycles, DOD ≥ 95%" },
          { label: "Dimensions (D×W×H)", value: "650 × 450 × 174 mm" },
          { label: "Weight", value: "48.5 kg" },
          { label: "Warranty", value: "10 years" },
        ],
        highlights: ["Outdoor-rated (IP65)", "10-year warranty", "Automatic aerosol fire suppression"],
      },
      zh: {
        name: "Felicity FLB48100WG1 - 5.12kWh（户外型）",
        tagline: "5.12kWh磷酸铁锂电池，可户外安装，10年质保",
        description: "IP65防水版本，可安装于室外，享受无附加条件的标准10年质保。",
        specs: [
          { label: "容量", value: "5.12 kWh（51.2V）" },
          { label: "安装位置", value: "壁挂/落地，室内外均可（IP65）" },
          { label: "持续充放电电流", value: "100 A" },
          { label: "循环寿命", value: "≥ 6,000 次循环，DOD ≥ 95%" },
          { label: "尺寸（长×宽×高）", value: "650 × 450 × 174 mm" },
          { label: "重量", value: "48.5 kg" },
          { label: "质保", value: "10 年" },
        ],
        highlights: ["支持户外安装（IP65）", "10年质保", "气溶胶自动灭火"],
      },
    },
  },
  {
    slug: "austa-au51200-s-is",
    category: "battery",
    brand: "AUSTA",
    model: "AU51200-S-IS",
    capacityKwh: 10.24,
    price: 31_020_000,
    image: "/products/austa-battery-is.png",
    i18n: {
      vi: {
        name: "AUSTA AU51200-S-IS - 10.24kWh",
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
      en: {
        name: "AUSTA AU51200-S-IS - 10.24kWh",
        tagline: "10.24kWh LFP battery, large capacity for households",
        description:
          "A large-capacity battery for households that need backup power for multiple devices in the evening or during grid outages.",
        specs: [
          { label: "Capacity", value: "10.24 kWh (51.2V), 9.21 kWh usable" },
          { label: "Installation location", value: "Indoor (IP21)" },
          { label: "Max. charge/discharge current", value: "200 A" },
          { label: "Cycle life", value: "Design >10,000 / warranty ≥8,000 cycles, DOD 90%" },
          { label: "Dimensions (D×W×H)", value: "685 × 447 × 232 mm" },
          { label: "Weight", value: "92 kg" },
          { label: "Warranty", value: "5 years (10 years with an AUSTA inverter)" },
        ],
        highlights: ["Large capacity", "High cycle life ≥8,000", "Compatible with AUSTA inverters"],
      },
      zh: {
        name: "AUSTA AU51200-S-IS - 10.24kWh",
        tagline: "10.24kWh磷酸铁锂电池，大容量家用",
        description: "大容量储能电池，适合需要为夜间或停电时多个设备提供备用电力的家庭。",
        specs: [
          { label: "容量", value: "10.24 kWh（51.2V），可用9.21 kWh" },
          { label: "安装位置", value: "室内（IP21）" },
          { label: "最大充放电电流", value: "200 A" },
          { label: "循环寿命", value: "设计>10,000次 / 质保≥8,000次循环，DOD 90%" },
          { label: "尺寸（长×宽×高）", value: "685 × 447 × 232 mm" },
          { label: "重量", value: "92 kg" },
          { label: "质保", value: "5年（搭配AUSTA逆变器可延长至10年）" },
        ],
        highlights: ["大容量", "循环寿命高达≥8,000次", "兼容AUSTA逆变器"],
      },
    },
  },
  {
    slug: "austa-au51200-s-oh",
    category: "battery",
    brand: "AUSTA",
    model: "AU51200-S-OH",
    capacityKwh: 10.24,
    price: 33_240_000,
    image: "/products/austa-battery-oh.png",
    i18n: {
      vi: {
        name: "AUSTA AU51200-S-OH - 10.24kWh (ngoài trời)",
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
      en: {
        name: "AUSTA AU51200-S-OH - 10.24kWh (Outdoor)",
        tagline: "10.24kWh LFP battery, outdoor-rated",
        description: "The IP65 water-resistant version of the AU51200 line, suitable for outdoor installation.",
        specs: [
          { label: "Capacity", value: "10.24 kWh (51.2V), 9.21 kWh usable" },
          { label: "Installation location", value: "Indoor & outdoor (IP65)" },
          { label: "Max. charge/discharge current", value: "200 A" },
          { label: "Cycle life", value: "Design >10,000 / warranty ≥8,000 cycles, DOD 90%" },
          { label: "Dimensions (D×W×H)", value: "462 × 728 × 251 mm" },
          { label: "Weight", value: "92 kg" },
          { label: "Warranty", value: "5 years (10 years with an AUSTA inverter)" },
        ],
        highlights: ["Outdoor-rated (IP65)", "High cycle life ≥8,000", "Compatible with AUSTA inverters"],
      },
      zh: {
        name: "AUSTA AU51200-S-OH - 10.24kWh（户外型）",
        tagline: "10.24kWh磷酸铁锂电池，可户外安装",
        description: "AU51200系列的IP65防水版本，可安装于室外。",
        specs: [
          { label: "容量", value: "10.24 kWh（51.2V），可用9.21 kWh" },
          { label: "安装位置", value: "室内外均可（IP65）" },
          { label: "最大充放电电流", value: "200 A" },
          { label: "循环寿命", value: "设计>10,000次 / 质保≥8,000次循环，DOD 90%" },
          { label: "尺寸（长×宽×高）", value: "462 × 728 × 251 mm" },
          { label: "重量", value: "92 kg" },
          { label: "质保", value: "5年（搭配AUSTA逆变器可延长至10年）" },
        ],
        highlights: ["支持户外安装（IP65）", "循环寿命高达≥8,000次", "兼容AUSTA逆变器"],
      },
    },
  },
  {
    slug: "felicity-fla48300tg2",
    category: "battery",
    brand: "Felicity",
    model: "FLA48300TG2",
    capacityKwh: 15.3,
    price: 40_720_000,
    image: "/products/felicity-fla48300tg2.png",
    i18n: {
      vi: {
        name: "Felicity FLA48300TG2 - 15.3kWh",
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
      en: {
        name: "Felicity FLA48300TG2 - 15.3kWh",
        tagline: "15.3kWh LFP battery, long backup for heavy usage households",
        description:
          "A large-capacity battery for households or businesses that need long-duration backup power for multiple devices.",
        specs: [
          { label: "Capacity", value: "15.3 kWh (51.2V)" },
          { label: "Installation location", value: "Indoor, floor-standing (IP21)" },
          { label: "Continuous charge/discharge current", value: "160 A" },
          { label: "Cycle life", value: "≥ 6,000 cycles, DOD ≥ 95%" },
          { label: "Dimensions (D×W×H)", value: "435 × 880 × 247 mm" },
          { label: "Weight", value: "118.5 kg" },
          { label: "Warranty", value: "7 years" },
        ],
        highlights: ["Large 15.3kWh capacity", "App control", "≥95% DOD"],
      },
      zh: {
        name: "Felicity FLA48300TG2 - 15.3kWh",
        tagline: "15.3kWh磷酸铁锂电池，适合高用电量家庭长时备电",
        description: "大容量储能电池，适合需要为多个设备提供长时间备用电力的家庭或商业用户。",
        specs: [
          { label: "容量", value: "15.3 kWh（51.2V）" },
          { label: "安装位置", value: "室内落地式（IP21）" },
          { label: "持续充放电电流", value: "160 A" },
          { label: "循环寿命", value: "≥ 6,000 次循环，DOD ≥ 95%" },
          { label: "尺寸（长×宽×高）", value: "435 × 880 × 247 mm" },
          { label: "重量", value: "118.5 kg" },
          { label: "质保", value: "7 年" },
        ],
        highlights: ["15.3kWh大容量", "App远程控制", "DOD≥95%"],
      },
    },
  },
  {
    slug: "austa-au51314-s-is",
    category: "battery",
    brand: "AUSTA",
    model: "AU51314-S-IS",
    capacityKwh: 16.07,
    price: 43_410_000,
    image: "/products/austa-battery-is.png",
    i18n: {
      vi: {
        name: "AUSTA AU51314-S-IS - 16.07kWh",
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
      en: {
        name: "AUSTA AU51314-S-IS - 16.07kWh",
        tagline: "16.07kWh LFP battery, the largest in AUSTA's range",
        description: "The largest capacity in the AUSTA battery line, for large, long-duration backup power needs.",
        specs: [
          { label: "Capacity", value: "16.07 kWh (51.2V), 14.47 kWh usable" },
          { label: "Installation location", value: "Indoor (IP21)" },
          { label: "Max. charge/discharge current", value: "200 A" },
          { label: "Cycle life", value: "Design >12,000 / warranty ≥10,000 cycles, DOD 90%" },
          { label: "Dimensions (D×W×H)", value: "817 × 447 × 232 mm" },
          { label: "Weight", value: "125 kg" },
          { label: "Warranty", value: "5 years (10 years with an AUSTA inverter)" },
        ],
        highlights: ["Largest capacity in the AUSTA range", "High cycle life ≥10,000", "Compatible with AUSTA inverters"],
      },
      zh: {
        name: "AUSTA AU51314-S-IS - 16.07kWh",
        tagline: "16.07kWh磷酸铁锂电池，AUSTA系列最大容量",
        description: "AUSTA电池系列中容量最大的型号，适合大容量、长时间的备用电力需求。",
        specs: [
          { label: "容量", value: "16.07 kWh（51.2V），可用14.47 kWh" },
          { label: "安装位置", value: "室内（IP21）" },
          { label: "最大充放电电流", value: "200 A" },
          { label: "循环寿命", value: "设计>12,000次 / 质保≥10,000次循环，DOD 90%" },
          { label: "尺寸（长×宽×高）", value: "817 × 447 × 232 mm" },
          { label: "重量", value: "125 kg" },
          { label: "质保", value: "5年（搭配AUSTA逆变器可延长至10年）" },
        ],
        highlights: ["AUSTA系列最大容量", "循环寿命高达≥10,000次", "兼容AUSTA逆变器"],
      },
    },
  },
  {
    slug: "austa-au51314-s-oh",
    category: "battery",
    brand: "AUSTA",
    model: "AU51314-S-OH",
    capacityKwh: 16.07,
    price: 45_230_000,
    image: "/products/austa-battery-oh.png",
    i18n: {
      vi: {
        name: "AUSTA AU51314-S-OH - 16.07kWh (ngoài trời)",
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
      en: {
        name: "AUSTA AU51314-S-OH - 16.07kWh (Outdoor)",
        tagline: "16.07kWh LFP battery, outdoor-rated",
        description: "The IP65 water-resistant version of the AU51314 line, suitable for outdoor installation.",
        specs: [
          { label: "Capacity", value: "16.07 kWh (51.2V), 14.47 kWh usable" },
          { label: "Installation location", value: "Indoor & outdoor (IP65)" },
          { label: "Max. charge/discharge current", value: "200 A" },
          { label: "Cycle life", value: "Design >12,000 / warranty ≥10,000 cycles, DOD 90%" },
          { label: "Dimensions (D×W×H)", value: "462 × 858 × 251 mm" },
          { label: "Weight", value: "125 kg" },
          { label: "Warranty", value: "5 years (10 years with an AUSTA inverter)" },
        ],
        highlights: ["Outdoor-rated (IP65)", "High cycle life ≥10,000", "Compatible with AUSTA inverters"],
      },
      zh: {
        name: "AUSTA AU51314-S-OH - 16.07kWh（户外型）",
        tagline: "16.07kWh磷酸铁锂电池，可户外安装",
        description: "AU51314系列的IP65防水版本，可安装于室外。",
        specs: [
          { label: "容量", value: "16.07 kWh（51.2V），可用14.47 kWh" },
          { label: "安装位置", value: "室内外均可（IP65）" },
          { label: "最大充放电电流", value: "200 A" },
          { label: "循环寿命", value: "设计>12,000次 / 质保≥10,000次循环，DOD 90%" },
          { label: "尺寸（长×宽×高）", value: "462 × 858 × 251 mm" },
          { label: "重量", value: "125 kg" },
          { label: "质保", value: "5年（搭配AUSTA逆变器可延长至10年）" },
        ],
        highlights: ["支持户外安装（IP65）", "循环寿命高达≥10,000次", "兼容AUSTA逆变器"],
      },
    },
  },
  {
    slug: "felicity-fla48314-eu",
    category: "battery",
    brand: "Felicity",
    model: "FLA48314-EU",
    capacityKwh: 16.07,
    price: 43_260_000,
    image: "/products/felicity-fla48300tg2.png",
    i18n: {
      vi: {
        name: "Felicity FLA48314-EU - 16.07kWh",
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
      en: {
        name: "Felicity FLA48314-EU - 16.07kWh",
        tagline: "16.07kWh LFP battery, unconditional 10-year warranty",
        description: "The largest capacity in Felicity's range, with a high cycle life and a standard unconditional 10-year warranty.",
        specs: [
          { label: "Capacity", value: "16.07 kWh (51.2V)" },
          { label: "Installation location", value: "Indoor, floor-standing (IP21)" },
          { label: "Continuous charge/discharge current", value: "160 A" },
          { label: "Cycle life", value: "≥ 8,000 cycles, DOD ≥ 95%" },
          { label: "Dimensions (D×W×H)", value: "435 × 880 × 247 mm" },
          { label: "Weight", value: "121.5 kg" },
          { label: "Warranty", value: "10 years" },
        ],
        highlights: ["Unconditional 10-year warranty", "High cycle life ≥8,000", "≥95% DOD"],
      },
      zh: {
        name: "Felicity FLA48314-EU - 16.07kWh",
        tagline: "16.07kWh磷酸铁锂电池，无附加条件10年质保",
        description: "Felicity系列中容量最大的型号，循环寿命高，并提供无附加条件的标准10年质保。",
        specs: [
          { label: "容量", value: "16.07 kWh（51.2V）" },
          { label: "安装位置", value: "室内落地式（IP21）" },
          { label: "持续充放电电流", value: "160 A" },
          { label: "循环寿命", value: "≥ 8,000 次循环，DOD ≥ 95%" },
          { label: "尺寸（长×宽×高）", value: "435 × 880 × 247 mm" },
          { label: "重量", value: "121.5 kg" },
          { label: "质保", value: "10 年" },
        ],
        highlights: ["无附加条件10年质保", "循环寿命高达≥8,000次", "DOD≥95%"],
      },
    },
  },
  {
    slug: "png-mounting-system",
    category: "accessory",
    brand: "PNG ONE SOLAR",
    model: "PNG Mount",
    i18n: {
      vi: {
        name: "Hệ khung giá đỡ PNG Mount",
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
      en: {
        name: "PNG Mount Racking System",
        tagline: "Formed aluminum racking - fits every roof type",
        description:
          "A mounting system engineered for each roof type (metal, flat concrete, tile), ensuring structural strength, complete leak-proofing and a clean finish. Cost is included in the all-in-one installation package.",
        specs: [
          { label: "Frame material", value: "6005-T5 aluminum alloy" },
          { label: "Hardware", value: "Corrosion-resistant 304 stainless steel" },
          { label: "Compatible roofs", value: "Metal, concrete, tile, sloped roofs" },
          { label: "Wind load rating", value: "Meets Vietnamese standards for wind/storm zones" },
          { label: "Warranty", value: "12 years" },
        ],
        highlights: ["100% leak-proof", "Fast installation, clean finish", "Meets structural load standards"],
      },
      zh: {
        name: "PNG Mount 支架系统",
        tagline: "定型铝合金支架 - 适用于各类屋顶",
        description: "针对不同屋顶类型（铁皮、混凝土平顶、瓦片）专门设计的支架系统，确保结构牢固、完全防漏水且安装美观。费用已包含在整体安装套餐中。",
        specs: [
          { label: "支架材质", value: "6005-T5铝合金" },
          { label: "五金件", value: "304不锈钢，防腐蚀" },
          { label: "适用屋顶", value: "铁皮、混凝土、瓦片、斜坡屋顶" },
          { label: "抗风等级", value: "符合越南抗风/台风地区标准" },
          { label: "质保", value: "12 年" },
        ],
        highlights: ["100%防漏水", "施工快速、外观美观", "符合结构承重标准"],
      },
    },
  },
];

export const productCategories: { key: ProductCategory }[] = [
  { key: "panel" },
  { key: "inverter" },
  { key: "battery" },
  { key: "accessory" },
];

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((p) => p.category === category);
}
