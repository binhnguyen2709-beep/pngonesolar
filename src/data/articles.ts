import type { Locale } from "@/i18n/routing";

interface ArticleI18n {
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
}

export interface Article {
  slug: string;
  i18n: Record<Locale, ArticleI18n>;
}

export const articles: Article[] = [
  {
    slug: "on-grid-vs-hybrid",
    i18n: {
      vi: {
        title: "On-grid hay Hybrid: Nên chọn hệ thống nào?",
        excerpt:
          "Hệ on-grid (hòa lưới) phù hợp với khách hàng muốn tối ưu chi phí đầu tư ban đầu và chỉ sử dụng điện vào ban ngày. Hệ hybrid tích hợp pin lưu trữ, phù hợp với khu vực hay mất điện hoặc cần duy trì hoạt động liên tục cho thiết bị quan trọng. Cân nhắc dựa trên ngân sách, mức độ ổn định của lưới điện khu vực và nhu cầu sử dụng điện vào buổi tối.",
        readTime: "4 phút đọc",
        category: "Kiến thức cơ bản",
      },
      en: {
        title: "On-grid vs. Hybrid: Which system should you choose?",
        excerpt:
          "On-grid systems suit customers who want to optimize upfront investment and only use power during the day. Hybrid systems add battery storage, ideal for areas with frequent outages or critical equipment that needs continuous power. Decide based on your budget, local grid reliability, and evening power usage.",
        readTime: "4 min read",
        category: "Basics",
      },
      zh: {
        title: "并网型还是混合型：该如何选择？",
        excerpt:
          "并网型系统适合希望优化初期投资成本、且仅在白天用电的客户。混合型系统集成储能电池，适合经常停电或需要为关键设备持续供电的地区。请根据预算、当地电网稳定性及夜间用电需求综合考虑。",
        readTime: "阅读需4分钟",
        category: "基础知识",
      },
    },
  },
  {
    slug: "ve-sinh-tam-pin",
    i18n: {
      vi: {
        title: "Hướng dẫn vệ sinh và bảo trì tấm pin đúng cách",
        excerpt:
          "Bụi bẩn, lá cây tích tụ có thể làm giảm 5-15% hiệu suất phát điện. Nên vệ sinh tấm pin bằng nước sạch và khăn mềm vào sáng sớm hoặc chiều mát, tránh vệ sinh khi tấm pin đang nóng để không gây sốc nhiệt. Khuyến nghị vệ sinh định kỳ 3-6 tháng/lần tùy khu vực (gần biển, gần khu công nghiệp nên vệ sinh thường xuyên hơn).",
        readTime: "3 phút đọc",
        category: "Vận hành & bảo trì",
      },
      en: {
        title: "How to properly clean and maintain your solar panels",
        excerpt:
          "Dust and leaf build-up can reduce output by 5-15%. Clean panels with clean water and a soft cloth in the early morning or late afternoon, avoiding cleaning while the panels are hot to prevent thermal shock. We recommend cleaning every 3-6 months depending on location (coastal or industrial areas need more frequent cleaning).",
        readTime: "3 min read",
        category: "Operation & Maintenance",
      },
      zh: {
        title: "太阳能板正确清洁与维护指南",
        excerpt:
          "灰尘和落叶堆积可能导致发电效率下降5-15%。建议在清晨或傍晚气温较低时，用清水和软布清洁太阳能板，避免在板面高温时清洁以防热冲击。建议根据所在地区每3-6个月清洁一次（靠近海边或工业区应更频繁清洁）。",
        readTime: "阅读需3分钟",
        category: "运行与维护",
      },
    },
  },
  {
    slug: "doc-chi-so-cong-to-2-chieu",
    i18n: {
      vi: {
        title: "Cách đọc chỉ số công tơ điện 2 chiều sau khi lắp điện mặt trời",
        excerpt:
          "Công tơ 2 chiều ghi nhận cả điện năng tiêu thụ từ lưới và điện năng phát dư (nếu có) lên lưới. Bài viết hướng dẫn cách đọc các chỉ số cơ bản, phân biệt sản lượng tự dùng và sản lượng phát dư để bạn dễ dàng đối chiếu với ứng dụng giám sát hệ thống.",
        readTime: "3 phút đọc",
        category: "Vận hành & bảo trì",
      },
      en: {
        title: "How to read your two-way meter after installing solar",
        excerpt:
          "A two-way meter records both power drawn from the grid and any surplus power exported to it. This guide explains the basic readings and how to tell self-consumption apart from exported output, so you can easily cross-check them against your monitoring app.",
        readTime: "3 min read",
        category: "Operation & Maintenance",
      },
      zh: {
        title: "安装太阳能后如何读取双向电表",
        excerpt:
          "双向电表既记录从电网取用的电量，也记录多余电量（如有）回送电网的电量。本文将指导您如何读取基本数据，区分自用电量与上网电量，方便您与监控App中的数据进行核对。",
        readTime: "阅读需3分钟",
        category: "运行与维护",
      },
    },
  },
  {
    slug: "chinh-sach-bao-hanh",
    i18n: {
      vi: {
        title: "Toàn bộ chính sách bảo hành thiết bị bạn cần biết",
        excerpt:
          "Tổng hợp thời gian bảo hành sản phẩm và bảo hành hiệu suất cho từng loại thiết bị: tấm pin, biến tần, pin lưu trữ và công lắp đặt. Nắm rõ quyền lợi bảo hành giúp bạn an tâm hơn trong suốt vòng đời sử dụng hệ thống.",
        readTime: "5 phút đọc",
        category: "Chính sách",
      },
      en: {
        title: "Everything you need to know about our warranty policy",
        excerpt:
          "A summary of product and performance warranty terms for each type of equipment: panels, inverters, battery storage and installation workmanship. Knowing your warranty rights gives you peace of mind for your system's entire lifetime.",
        readTime: "5 min read",
        category: "Policy",
      },
      zh: {
        title: "您需要了解的全部设备质保政策",
        excerpt:
          "汇总各类设备（太阳能板、逆变器、储能电池及安装工程）的产品质保和性能质保期限。了解清楚您的质保权益，让您在系统整个使用寿命期间更加安心。",
        readTime: "阅读需5分钟",
        category: "政策说明",
      },
    },
  },
];

export function getLocalizedArticles(locale: Locale) {
  return articles.map((a) => ({ slug: a.slug, ...(a.i18n[locale] ?? a.i18n.vi) }));
}
