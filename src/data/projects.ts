export type ProjectCategory = "ho-gia-dinh" | "nha-xuong" | "doanh-nghiep" | "trang-trai";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  location: string;
  capacityKwp: number;
  completedYear: number;
  systemType: "On-grid" | "Hybrid";
  summary: string;
  results: string[];
}

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  "ho-gia-dinh": "Hộ gia đình",
  "nha-xuong": "Nhà xưởng",
  "doanh-nghiep": "Doanh nghiệp / Văn phòng",
  "trang-trai": "Trang trại / Nông nghiệp",
};

export const projects: Project[] = [
  {
    slug: "biet-thu-thu-duc",
    name: "Biệt thự anh Minh - TP. Thủ Đức",
    category: "ho-gia-dinh",
    location: "TP. Thủ Đức, TP.HCM",
    capacityKwp: 10.6,
    completedYear: 2024,
    systemType: "Hybrid",
    summary:
      "Hệ thống hybrid kết hợp pin lưu trữ 10.24kWh giúp gia đình chủ động điện sinh hoạt và duy trì máy bơm, tủ lạnh khi mất điện lưới.",
    results: ["Giảm 92% hóa đơn tiền điện", "Hoàn vốn trong 5.8 năm", "Thi công 3 ngày"],
  },
  {
    slug: "nha-xuong-det-may-binh-duong",
    name: "Nhà xưởng dệt may - Bình Dương",
    category: "nha-xuong",
    location: "TX. Tân Uyên, Bình Dương",
    capacityKwp: 486,
    completedYear: 2023,
    systemType: "On-grid",
    summary:
      "Lắp đặt trên diện tích mái tôn 2.600m², cung cấp điện trực tiếp cho dây chuyền sản xuất ban ngày, giảm áp lực chi phí điện sản xuất.",
    results: ["Giảm 65% chi phí điện sản xuất", "Hoàn vốn trong 4.3 năm", "Giảm nhiệt mái xưởng rõ rệt"],
  },
  {
    slug: "van-phong-quan-7",
    name: "Tòa văn phòng cho thuê - Quận 7",
    category: "doanh-nghiep",
    location: "Quận 7, TP.HCM",
    capacityKwp: 120,
    completedYear: 2024,
    systemType: "On-grid",
    summary:
      "Dự án nâng tầm hình ảnh doanh nghiệp xanh, tối ưu chi phí vận hành tòa nhà và hệ thống điều hòa trung tâm.",
    results: ["Giảm 58% chi phí điện vận hành", "Chứng nhận công trình xanh", "Giám sát từ xa 24/7"],
  },
  {
    slug: "trang-trai-ga-dong-nai",
    name: "Trang trại chăn nuôi gà - Đồng Nai",
    category: "trang-trai",
    location: "Huyện Trảng Bom, Đồng Nai",
    capacityKwp: 65,
    completedYear: 2023,
    systemType: "Hybrid",
    summary:
      "Hệ thống hybrid đảm bảo nguồn điện liên tục cho quạt thông gió, hệ thống làm mát chuồng trại kể cả khi lưới điện khu vực gặp sự cố.",
    results: ["Duy trì điện 24/7 cho chuồng trại", "Giảm 70% chi phí điện", "Không gián đoạn sản xuất"],
  },
  {
    slug: "nha-pho-binh-thanh",
    name: "Nhà phố chị Lan - Bình Thạnh",
    category: "ho-gia-dinh",
    location: "Q. Bình Thạnh, TP.HCM",
    capacityKwp: 5.9,
    completedYear: 2024,
    systemType: "On-grid",
    summary:
      "Giải pháp tiết kiệm cho hộ gia đình 4 người, dùng nhiều điện lạnh vào ban ngày, tối ưu chi phí đầu tư ban đầu.",
    results: ["Giảm 80% hóa đơn tiền điện", "Hoàn vốn trong 5.2 năm", "Lắp đặt trong 1 ngày"],
  },
  {
    slug: "nha-xuong-thuc-pham-long-an",
    name: "Nhà máy chế biến thực phẩm - Long An",
    category: "nha-xuong",
    location: "Bến Lức, Long An",
    capacityKwp: 320,
    completedYear: 2022,
    systemType: "On-grid",
    summary:
      "Đáp ứng tiêu chuẩn xuất khẩu về sử dụng năng lượng sạch, hỗ trợ doanh nghiệp đạt chứng chỉ ESG cho đối tác quốc tế.",
    results: ["Đáp ứng tiêu chuẩn ESG xuất khẩu", "Giảm 60% chi phí điện", "Hoàn vốn trong 4.6 năm"],
  },
];

export function getProjectsByCategory(category?: ProjectCategory) {
  if (!category) return projects;
  return projects.filter((p) => p.category === category);
}
