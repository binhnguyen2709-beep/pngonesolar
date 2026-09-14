export interface Certification {
  slug: string;
  name: string;
  image: string;
}

// Logo chứng nhận quốc tế của các nhà sản xuất thiết bị (AUSTA/OSDA Group) mà PNG ONE SOLAR
// phân phối - đây KHÔNG phải chứng nhận riêng của PNG ONE SOLAR, mà là chứng nhận áp dụng cho
// dòng thiết bị (biến tần, pin lưu trữ) đang bán trên website. Nguồn: AUSTA CATALOGUE.pdf.
export const certifications: Certification[] = [
  { slug: "iso", name: "ISO", image: "/certs/iso.png" },
  { slug: "tuv", name: "TÜV Rheinland", image: "/certs/tuv.png" },
  { slug: "ce", name: "CE", image: "/certs/ce.png" },
  { slug: "mcs", name: "MCS", image: "/certs/mcs.png" },
  { slug: "eu-weee", name: "EU-28 WEEE Compliant", image: "/certs/eu-weee.png" },
  { slug: "cqc", name: "CQC", image: "/certs/cqc.png" },
  { slug: "inmetro", name: "INMETRO", image: "/certs/inmetro.png" },
  { slug: "saso", name: "SASO", image: "/certs/saso.png" },
  { slug: "s-mark", name: "S-Mark", image: "/certs/s-mark.png" },
];
