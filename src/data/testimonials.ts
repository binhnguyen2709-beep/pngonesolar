import type { Locale } from "@/i18n/routing";

interface TestimonialI18n {
  name: string;
  role: string;
  location: string;
  quote: string;
}

export interface Testimonial {
  slug: string;
  rating: number;
  i18n: Record<Locale, TestimonialI18n>;
}

export const testimonials: Testimonial[] = [
  {
    slug: "anh-minh",
    rating: 5,
    i18n: {
      vi: {
        name: "Anh Trần Văn Minh",
        role: "Chủ nhà",
        location: "TP. Thủ Đức, TP.HCM",
        quote:
          "Hóa đơn tiền điện nhà tôi từ 4.2 triệu giảm còn hơn 300 nghìn mỗi tháng. Đội thi công làm việc chuyên nghiệp, sạch sẽ, hoàn thành đúng như cam kết ban đầu.",
      },
      en: {
        name: "Mr. Tran Van Minh",
        role: "Homeowner",
        location: "Thu Duc City, Ho Chi Minh City",
        quote:
          "My monthly power bill dropped from 4.2 million to just over 300,000 VND. The installation crew was professional and tidy, and delivered exactly what they promised.",
      },
      zh: {
        name: "陈文明 先生",
        role: "房主",
        location: "越南胡志明市守德市",
        quote: "我家的电费从每月420万越南盾降到了30多万。施工团队专业整洁，完全按照最初的承诺完成。",
      },
    },
  },
  {
    slug: "chi-lan",
    rating: 5,
    i18n: {
      vi: {
        name: "Chị Nguyễn Thị Lan",
        role: "Chủ nhà",
        location: "Q. Bình Thạnh, TP.HCM",
        quote:
          "Tư vấn nhiệt tình, không hề chèo kéo. Nhân viên giải thích rõ ràng từng con số trước khi tôi quyết định đầu tư nên rất yên tâm.",
      },
      en: {
        name: "Ms. Nguyen Thi Lan",
        role: "Homeowner",
        location: "Binh Thanh District, Ho Chi Minh City",
        quote:
          "The consultation was thorough and never pushy. The staff explained every number clearly before I decided to invest, which gave me real peace of mind.",
      },
      zh: {
        name: "阮氏兰 女士",
        role: "房主",
        location: "越南胡志明市平盛郡",
        quote: "咨询非常用心，完全不会强行推销。在我决定投资之前，工作人员把每一个数字都解释得清清楚楚，让我很放心。",
      },
    },
  },
  {
    slug: "ong-phuc",
    rating: 5,
    i18n: {
      vi: {
        name: "Ông Lê Hoàng Phúc",
        role: "Giám đốc sản xuất",
        location: "Nhà xưởng dệt may, Bình Dương",
        quote:
          "Chi phí điện sản xuất là gánh nặng lớn với nhà xưởng chúng tôi. Sau khi lắp điện mặt trời, chi phí giảm rõ rệt và đội ngũ kỹ thuật hỗ trợ bảo trì rất tận tâm.",
      },
      en: {
        name: "Mr. Le Hoang Phuc",
        role: "Production Director",
        location: "Textile factory, Binh Duong",
        quote:
          "Production power costs were a heavy burden for our factory. After installing solar, our costs dropped noticeably, and the technical team is genuinely dedicated to maintenance support.",
      },
      zh: {
        name: "黎黄福 先生",
        role: "生产总监",
        location: "平阳省 纺织厂",
        quote: "生产用电成本一直是我们工厂的沉重负担。安装太阳能后，成本明显下降，技术团队在维护支持上也非常用心。",
      },
    },
  },
];
