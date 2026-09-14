export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  group: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
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
  {
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
  {
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
];
