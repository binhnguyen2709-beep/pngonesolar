import type { Locale } from "@/i18n/routing";

export type ProjectCategory = "ho-gia-dinh" | "nha-xuong" | "doanh-nghiep" | "trang-trai";

interface ProjectI18n {
  name: string;
  location: string;
  summary: string;
  results: string[];
}

export interface Project {
  slug: string;
  category: ProjectCategory;
  capacityKwp: number;
  completedYear: number;
  systemType: "On-grid" | "Hybrid";
  i18n: Record<Locale, ProjectI18n>;
}

export const projectCategoryLabelKeys: Record<ProjectCategory, string> = {
  "ho-gia-dinh": "household",
  "nha-xuong": "factory",
  "doanh-nghiep": "business",
  "trang-trai": "farm",
};

export const projects: Project[] = [
  {
    slug: "biet-thu-thu-duc",
    category: "ho-gia-dinh",
    capacityKwp: 10.6,
    completedYear: 2024,
    systemType: "Hybrid",
    i18n: {
      vi: {
        name: "Biệt thự anh Minh - TP. Thủ Đức",
        location: "TP. Thủ Đức, TP.HCM",
        summary:
          "Hệ thống hybrid kết hợp pin lưu trữ 10.24kWh giúp gia đình chủ động điện sinh hoạt và duy trì máy bơm, tủ lạnh khi mất điện lưới.",
        results: ["Giảm 92% hóa đơn tiền điện", "Hoàn vốn trong 5.8 năm", "Thi công 3 ngày"],
      },
      en: {
        name: "Mr. Minh's Villa - Thu Duc City",
        location: "Thu Duc City, Ho Chi Minh City",
        summary:
          "A hybrid system with 10.24kWh of battery storage lets the family run daily loads independently and keep the water pump and fridge running during outages.",
        results: ["92% lower power bill", "5.8-year payback", "3-day installation"],
      },
      zh: {
        name: "明先生别墅 - 守德市",
        location: "越南胡志明市守德市",
        summary: "混合系统配备10.24kWh储能电池，使家庭日常用电自给自足，并在停电时维持水泵与冰箱运转。",
        results: ["电费降低92%", "5.8年回本", "3天完成施工"],
      },
    },
  },
  {
    slug: "nha-xuong-det-may-binh-duong",
    category: "nha-xuong",
    capacityKwp: 486,
    completedYear: 2023,
    systemType: "On-grid",
    i18n: {
      vi: {
        name: "Nhà xưởng dệt may - Bình Dương",
        location: "TX. Tân Uyên, Bình Dương",
        summary:
          "Lắp đặt trên diện tích mái tôn 2.600m², cung cấp điện trực tiếp cho dây chuyền sản xuất ban ngày, giảm áp lực chi phí điện sản xuất.",
        results: ["Giảm 65% chi phí điện sản xuất", "Hoàn vốn trong 4.3 năm", "Giảm nhiệt mái xưởng rõ rệt"],
      },
      en: {
        name: "Textile Factory - Binh Duong",
        location: "Tan Uyen Town, Binh Duong",
        summary:
          "Installed across 2,600m² of metal roofing, powering the production line directly during the day and easing the burden of production electricity costs.",
        results: ["65% lower production power cost", "4.3-year payback", "Noticeably cooler factory roof"],
      },
      zh: {
        name: "纺织厂 - 平阳省",
        location: "越南平阳省新原镇",
        summary: "在2,600平方米铁皮屋顶上安装，白天直接为生产线供电，减轻生产用电成本压力。",
        results: ["生产用电成本降低65%", "4.3年回本", "厂房屋顶明显降温"],
      },
    },
  },
  {
    slug: "van-phong-quan-7",
    category: "doanh-nghiep",
    capacityKwp: 120,
    completedYear: 2024,
    systemType: "On-grid",
    i18n: {
      vi: {
        name: "Tòa văn phòng cho thuê - Quận 7",
        location: "Quận 7, TP.HCM",
        summary:
          "Dự án nâng tầm hình ảnh doanh nghiệp xanh, tối ưu chi phí vận hành tòa nhà và hệ thống điều hòa trung tâm.",
        results: ["Giảm 58% chi phí điện vận hành", "Chứng nhận công trình xanh", "Giám sát từ xa 24/7"],
      },
      en: {
        name: "Leased Office Building - District 7",
        location: "District 7, Ho Chi Minh City",
        summary:
          "A project that elevates the building's green credentials while optimizing operating costs for the building and central air-conditioning system.",
        results: ["58% lower operating power cost", "Green building certified", "24/7 remote monitoring"],
      },
      zh: {
        name: "出租写字楼 - 第七郡",
        location: "越南胡志明市第七郡",
        summary: "该项目提升了企业绿色形象，并优化了大楼运营及中央空调系统的成本。",
        results: ["运营用电成本降低58%", "获得绿色建筑认证", "24/7远程监控"],
      },
    },
  },
  {
    slug: "trang-trai-ga-dong-nai",
    category: "trang-trai",
    capacityKwp: 65,
    completedYear: 2023,
    systemType: "Hybrid",
    i18n: {
      vi: {
        name: "Trang trại chăn nuôi gà - Đồng Nai",
        location: "Huyện Trảng Bom, Đồng Nai",
        summary:
          "Hệ thống hybrid đảm bảo nguồn điện liên tục cho quạt thông gió, hệ thống làm mát chuồng trại kể cả khi lưới điện khu vực gặp sự cố.",
        results: ["Duy trì điện 24/7 cho chuồng trại", "Giảm 70% chi phí điện", "Không gián đoạn sản xuất"],
      },
      en: {
        name: "Poultry Farm - Dong Nai",
        location: "Trang Bom District, Dong Nai",
        summary:
          "A hybrid system that keeps ventilation fans and barn cooling running continuously, even when the local grid fails.",
        results: ["24/7 power for the barns", "70% lower power cost", "Zero production disruption"],
      },
      zh: {
        name: "养鸡场 - 同奈省",
        location: "越南同奈省庄泵县",
        summary: "混合系统确保通风扇与畜舍降温设备持续供电，即使区域电网出现故障也不受影响。",
        results: ["畜舍24/7不间断供电", "电费降低70%", "生产不受影响"],
      },
    },
  },
  {
    slug: "nha-pho-binh-thanh",
    category: "ho-gia-dinh",
    capacityKwp: 5.9,
    completedYear: 2024,
    systemType: "On-grid",
    i18n: {
      vi: {
        name: "Nhà phố chị Lan - Bình Thạnh",
        location: "Q. Bình Thạnh, TP.HCM",
        summary:
          "Giải pháp tiết kiệm cho hộ gia đình 4 người, dùng nhiều điện lạnh vào ban ngày, tối ưu chi phí đầu tư ban đầu.",
        results: ["Giảm 80% hóa đơn tiền điện", "Hoàn vốn trong 5.2 năm", "Lắp đặt trong 1 ngày"],
      },
      en: {
        name: "Ms. Lan's Townhouse - Binh Thanh",
        location: "Binh Thanh District, Ho Chi Minh City",
        summary:
          "A cost-effective solution for a family of four with heavy daytime AC use, keeping the upfront investment optimized.",
        results: ["80% lower power bill", "5.2-year payback", "1-day installation"],
      },
      zh: {
        name: "兰女士排屋 - 平盛郡",
        location: "越南胡志明市平盛郡",
        summary: "为白天大量使用空调的四口之家提供的节能方案，优化了初始投资成本。",
        results: ["电费降低80%", "5.2年回本", "1天完成安装"],
      },
    },
  },
  {
    slug: "nha-xuong-thuc-pham-long-an",
    category: "nha-xuong",
    capacityKwp: 320,
    completedYear: 2022,
    systemType: "On-grid",
    i18n: {
      vi: {
        name: "Nhà máy chế biến thực phẩm - Long An",
        location: "Bến Lức, Long An",
        summary:
          "Đáp ứng tiêu chuẩn xuất khẩu về sử dụng năng lượng sạch, hỗ trợ doanh nghiệp đạt chứng chỉ ESG cho đối tác quốc tế.",
        results: ["Đáp ứng tiêu chuẩn ESG xuất khẩu", "Giảm 60% chi phí điện", "Hoàn vốn trong 4.6 năm"],
      },
      en: {
        name: "Food Processing Plant - Long An",
        location: "Ben Luc, Long An",
        summary:
          "Meets clean-energy export standards, helping the business earn ESG certification for international partners.",
        results: ["Meets export ESG standards", "60% lower power cost", "4.6-year payback"],
      },
      zh: {
        name: "食品加工厂 - 隆安省",
        location: "越南隆安省本露",
        summary: "满足清洁能源出口标准，帮助企业获得面向国际合作伙伴的ESG认证。",
        results: ["符合出口ESG标准", "电费降低60%", "4.6年回本"],
      },
    },
  },
];

export function getLocalizedProject(project: Project, locale: Locale) {
  const t = project.i18n[locale] ?? project.i18n.vi;
  return {
    slug: project.slug,
    category: project.category,
    capacityKwp: project.capacityKwp,
    completedYear: project.completedYear,
    systemType: project.systemType,
    ...t,
  };
}

export function getProjectsByCategory(category?: ProjectCategory) {
  if (!category) return projects;
  return projects.filter((p) => p.category === category);
}
