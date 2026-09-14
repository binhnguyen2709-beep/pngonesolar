export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Anh Trần Văn Minh",
    role: "Chủ nhà",
    location: "TP. Thủ Đức, TP.HCM",
    quote:
      "Hóa đơn tiền điện nhà tôi từ 4.2 triệu giảm còn hơn 300 nghìn mỗi tháng. Đội thi công làm việc chuyên nghiệp, sạch sẽ, hoàn thành đúng như cam kết ban đầu.",
    rating: 5,
  },
  {
    name: "Chị Nguyễn Thị Lan",
    role: "Chủ nhà",
    location: "Q. Bình Thạnh, TP.HCM",
    quote:
      "Tư vấn nhiệt tình, không hề chèo kéo. Nhân viên giải thích rõ ràng từng con số trước khi tôi quyết định đầu tư nên rất yên tâm.",
    rating: 5,
  },
  {
    name: "Ông Lê Hoàng Phúc",
    role: "Giám đốc sản xuất",
    location: "Nhà xưởng dệt may, Bình Dương",
    quote:
      "Chi phí điện sản xuất là gánh nặng lớn với nhà xưởng chúng tôi. Sau khi lắp điện mặt trời, chi phí giảm rõ rệt và đội ngũ kỹ thuật hỗ trợ bảo trì rất tận tâm.",
    rating: 5,
  },
];
