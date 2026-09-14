export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
}

export const articles: Article[] = [
  {
    slug: "on-grid-vs-hybrid",
    title: "On-grid hay Hybrid: Nên chọn hệ thống nào?",
    excerpt:
      "Hệ on-grid (hòa lưới) phù hợp với khách hàng muốn tối ưu chi phí đầu tư ban đầu và chỉ sử dụng điện vào ban ngày. Hệ hybrid tích hợp pin lưu trữ, phù hợp với khu vực hay mất điện hoặc cần duy trì hoạt động liên tục cho thiết bị quan trọng. Cân nhắc dựa trên ngân sách, mức độ ổn định của lưới điện khu vực và nhu cầu sử dụng điện vào buổi tối.",
    readTime: "4 phút đọc",
    category: "Kiến thức cơ bản",
  },
  {
    slug: "ve-sinh-tam-pin",
    title: "Hướng dẫn vệ sinh và bảo trì tấm pin đúng cách",
    excerpt:
      "Bụi bẩn, lá cây tích tụ có thể làm giảm 5-15% hiệu suất phát điện. Nên vệ sinh tấm pin bằng nước sạch và khăn mềm vào sáng sớm hoặc chiều mát, tránh vệ sinh khi tấm pin đang nóng để không gây sốc nhiệt. Khuyến nghị vệ sinh định kỳ 3-6 tháng/lần tùy khu vực (gần biển, gần khu công nghiệp nên vệ sinh thường xuyên hơn).",
    readTime: "3 phút đọc",
    category: "Vận hành & bảo trì",
  },
  {
    slug: "doc-chi-so-cong-to-2-chieu",
    title: "Cách đọc chỉ số công tơ điện 2 chiều sau khi lắp điện mặt trời",
    excerpt:
      "Công tơ 2 chiều ghi nhận cả điện năng tiêu thụ từ lưới và điện năng phát dư (nếu có) lên lưới. Bài viết hướng dẫn cách đọc các chỉ số cơ bản, phân biệt sản lượng tự dùng và sản lượng phát dư để bạn dễ dàng đối chiếu với ứng dụng giám sát hệ thống.",
    readTime: "3 phút đọc",
    category: "Vận hành & bảo trì",
  },
  {
    slug: "chinh-sach-bao-hanh",
    title: "Toàn bộ chính sách bảo hành thiết bị bạn cần biết",
    excerpt:
      "Tổng hợp thời gian bảo hành sản phẩm và bảo hành hiệu suất cho từng loại thiết bị: tấm pin, biến tần, pin lưu trữ và công lắp đặt. Nắm rõ quyền lợi bảo hành giúp bạn an tâm hơn trong suốt vòng đời sử dụng hệ thống.",
    readTime: "5 phút đọc",
    category: "Chính sách",
  },
];
