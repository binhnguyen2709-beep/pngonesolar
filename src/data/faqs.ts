import type { Locale } from "@/i18n/routing";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqGroupI18n {
  group: string;
  items: FaqItem[];
}

export const faqGroupSlugs = ["before", "cost", "warranty"] as const;
export type FaqGroupSlug = (typeof faqGroupSlugs)[number];

export const faqGroups: Record<FaqGroupSlug, Record<Locale, FaqGroupI18n>> = {
  before: {
    vi: {
      group: "Trước khi lắp đặt",
      items: [
        {
          question: "Nhà tôi cần lắp bao nhiêu kWp là đủ?",
          answer:
            "Công suất phù hợp phụ thuộc vào mức tiêu thụ điện hàng tháng, diện tích mái và hướng mái nhà. Bạn có thể dùng công cụ Tính chi phí trên website để có con số ước tính nhanh, sau đó đội ngũ kỹ thuật PNG ONE SOLAR sẽ khảo sát thực tế để đưa ra phương án chính xác nhất.",
        },
        {
          question: "Mái nhà tôi là mái tôn cũ, có lắp được không?",
          answer:
            "Được. PNG ONE SOLAR có giải pháp khung giá đỡ riêng cho từng loại mái, kể cả mái tôn đã xuống cấp. Đội kỹ thuật sẽ khảo sát kết cấu mái, gia cố nếu cần thiết để đảm bảo an toàn và chống thấm dột tuyệt đối.",
        },
        {
          question: "Thời gian thi công lắp đặt mất bao lâu?",
          answer:
            "Với hộ gia đình (3-15 kWp): 1-3 ngày. Với nhà xưởng, doanh nghiệp quy mô lớn: 1-3 tuần tùy công suất và mức độ phức tạp của hệ thống điện.",
        },
        {
          question: "Có cần xin phép cơ quan điện lực không?",
          answer:
            "Với hệ thống tự dùng (không bán điện dư lên lưới), thủ tục khá đơn giản. PNG ONE SOLAR hỗ trợ trọn gói các thủ tục đăng ký, đấu nối với công ty điện lực địa phương để khách hàng không phải lo lắng về giấy tờ.",
        },
      ],
    },
    en: {
      group: "Before Installation",
      items: [
        {
          question: "How many kWp does my home need?",
          answer:
            "The right capacity depends on your monthly electricity usage, roof area and orientation. Use the Cost Calculator on our website for a quick estimate, then PNG ONE SOLAR's technical team will survey your site to provide the most accurate plan.",
        },
        {
          question: "My roof is old corrugated metal - can it still be installed?",
          answer:
            "Yes. PNG ONE SOLAR has mounting solutions tailored to every roof type, including aging metal roofs. Our technical team will inspect the roof structure and reinforce it if needed to ensure full safety and leak-proofing.",
        },
        {
          question: "How long does installation take?",
          answer:
            "For households (3-15 kWp): 1-3 days. For factories and large businesses: 1-3 weeks depending on capacity and system complexity.",
        },
        {
          question: "Do I need approval from the power utility?",
          answer:
            "For self-consumption systems (not selling surplus power to the grid), the paperwork is quite simple. PNG ONE SOLAR handles the full registration and grid-connection process with the local power company, so you don't have to worry about the paperwork.",
        },
      ],
    },
    zh: {
      group: "安装前",
      items: [
        {
          question: "我家需要安装多少kWp才够用？",
          answer:
            "合适的功率取决于您每月的用电量、屋顶面积及朝向。您可以使用网站上的费用计算工具快速估算，随后 PNG ONE SOLAR 的技术团队会实地勘察，为您提供最准确的方案。",
        },
        {
          question: "我家是旧铁皮屋顶，可以安装吗？",
          answer:
            "可以。PNG ONE SOLAR 针对各类屋顶（包括已老化的铁皮屋顶）都有专属支架方案。技术团队会勘察屋顶结构，如有需要会进行加固，以确保绝对安全和防漏水。",
        },
        {
          question: "施工安装需要多长时间？",
          answer: "家庭用户（3-15 kWp）：1-3天。大型厂房、企业：根据功率及系统复杂程度需1-3周。",
        },
        {
          question: "是否需要向电力公司申请许可？",
          answer:
            "对于自发自用（不将多余电力售回电网）的系统，手续相对简单。PNG ONE SOLAR 提供一站式服务，协助办理与当地电力公司的登记并网手续，您无需为文件手续操心。",
        },
      ],
    },
  },
  cost: {
    vi: {
      group: "Chi phí & hiệu quả đầu tư",
      items: [
        {
          question: "Chi phí lắp đặt điện mặt trời áp mái khoảng bao nhiêu?",
          answer:
            "Chi phí phụ thuộc vào công suất hệ thống, loại hệ (on-grid hoặc hybrid có pin lưu trữ) và điều kiện thi công thực tế. Sử dụng công cụ Tính chi phí để nhận báo giá ước tính, hoặc để lại thông tin để được tư vấn báo giá chi tiết miễn phí.",
        },
        {
          question: "Bao lâu thì hoàn vốn đầu tư?",
          answer:
            "Thông thường từ 4-6 năm tùy vào mức tiêu thụ điện và loại hệ thống. Tuổi thọ hệ thống trên 25 năm, nghĩa là sau khi hoàn vốn bạn có thể sử dụng điện gần như miễn phí trong 20 năm còn lại.",
        },
        {
          question: "Có hỗ trợ trả góp / vay vốn lắp đặt không?",
          answer:
            "PNG ONE SOLAR liên kết với các ngân hàng đối tác hỗ trợ vay vốn lắp đặt điện mặt trời với lãi suất ưu đãi, thời hạn vay linh hoạt đến 5-7 năm. Liên hệ hotline để được tư vấn chi tiết.",
        },
      ],
    },
    en: {
      group: "Cost & Investment Returns",
      items: [
        {
          question: "How much does a rooftop solar installation cost?",
          answer:
            "Cost depends on system size, type (on-grid or hybrid with battery storage) and on-site installation conditions. Use the Cost Calculator for an instant estimate, or leave your details for a free detailed quote.",
        },
        {
          question: "How long until the investment pays for itself?",
          answer:
            "Typically 4-6 years depending on your usage and system type. The system lasts over 25 years, so after payback you enjoy nearly free electricity for the remaining 20+ years.",
        },
        {
          question: "Is installment payment or financing available?",
          answer:
            "PNG ONE SOLAR partners with banks to offer preferential-rate solar financing with flexible terms up to 5-7 years. Call our hotline for details.",
        },
      ],
    },
    zh: {
      group: "费用与投资回报",
      items: [
        {
          question: "安装屋顶太阳能大约需要多少费用？",
          answer:
            "费用取决于系统功率、类型（并网型或带储能的混合型）以及实际施工条件。使用费用计算工具可立即获得估算报价，或留下联系方式，获取免费详细报价咨询。",
        },
        {
          question: "投资回本需要多长时间？",
          answer:
            "通常为4-6年，具体取决于用电量及系统类型。系统使用寿命超过25年，也就是说回本后，剩余20多年您几乎可以免费用电。",
        },
        {
          question: "是否支持分期付款/贷款安装？",
          answer:
            "PNG ONE SOLAR 与多家合作银行提供优惠利率的太阳能安装贷款，贷款期限最长可达5-7年，灵活选择。请致电热线获取详细咨询。",
        },
      ],
    },
  },
  warranty: {
    vi: {
      group: "Bảo hành & vận hành",
      items: [
        {
          question: "Chế độ bảo hành như thế nào?",
          answer:
            "Tấm pin bảo hành sản phẩm 12-18 năm, bảo hành hiệu suất đến 25-30 năm. Biến tần bảo hành 10 năm (có thể nâng cấp thêm). Pin lưu trữ bảo hành 10 năm. PNG ONE SOLAR bảo hành công lắp đặt 5 năm, bảo trì miễn phí năm đầu tiên.",
        },
        {
          question: "Hệ thống có cần bảo trì thường xuyên không?",
          answer:
            "Hệ thống điện mặt trời gần như không cần bảo trì phức tạp. Khuyến nghị vệ sinh tấm pin định kỳ 3-6 tháng/lần và kiểm tra tổng thể mỗi năm 1 lần. PNG ONE SOLAR có gói bảo trì định kỳ cho khách hàng có nhu cầu.",
        },
        {
          question: "Làm sao để theo dõi sản lượng điện tạo ra mỗi ngày?",
          answer:
            "Toàn bộ hệ thống được tích hợp ứng dụng giám sát trên điện thoại, cho phép bạn theo dõi sản lượng điện theo thời gian thực, lịch sử phát điện và cảnh báo sự cố (nếu có) mọi lúc mọi nơi.",
        },
      ],
    },
    en: {
      group: "Warranty & Operation",
      items: [
        {
          question: "What does the warranty cover?",
          answer:
            "Panels: 12-18 year product warranty, up to 25-30 year performance warranty. Inverters: 10-year warranty (upgradable). Battery storage: 10-year warranty. PNG ONE SOLAR warranties installation workmanship for 5 years, with free maintenance in the first year.",
        },
        {
          question: "Does the system need frequent maintenance?",
          answer:
            "Solar systems need almost no complex maintenance. We recommend cleaning the panels every 3-6 months and a full inspection once a year. PNG ONE SOLAR offers a scheduled maintenance package for customers who want one.",
        },
        {
          question: "How can I track daily power output?",
          answer:
            "The whole system integrates with a mobile monitoring app, letting you track real-time output, generation history and fault alerts (if any) anytime, anywhere.",
        },
      ],
    },
    zh: {
      group: "质保与运行",
      items: [
        {
          question: "质保政策是怎样的？",
          answer:
            "太阳能板产品质保12-18年，性能质保长达25-30年。逆变器质保10年（可升级）。储能电池质保10年。PNG ONE SOLAR 对安装工程提供5年质保，首年免费维护。",
        },
        {
          question: "系统是否需要经常维护？",
          answer:
            "太阳能系统几乎不需要复杂维护。建议每3-6个月清洁一次太阳能板，每年进行一次全面检查。PNG ONE SOLAR 也为有需要的客户提供定期维护套餐。",
        },
        {
          question: "如何查看每天的发电量？",
          answer: "整套系统已集成手机监控App，可让您随时随地查看实时发电量、发电历史记录及故障提醒（如有）。",
        },
      ],
    },
  },
};

export function getLocalizedFaqGroups(locale: Locale): FaqGroupI18n[] {
  return faqGroupSlugs.map((slug) => faqGroups[slug][locale] ?? faqGroups[slug].vi);
}
