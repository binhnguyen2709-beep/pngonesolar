export interface Scenario {
  slug: string;
  label: string;
  image: string;
}

export const scenarios: Scenario[] = [
  { slug: "houses", label: "Nhà ở gia đình", image: "/scenarios/houses.jpg" },
  { slug: "cabins", label: "Nhà vườn / biệt lập", image: "/scenarios/cabins.jpg" },
  { slug: "stores", label: "Cửa hàng kinh doanh", image: "/scenarios/stores.jpg" },
  { slug: "offices", label: "Văn phòng", image: "/scenarios/offices.jpg" },
  { slug: "farms", label: "Trang trại / nông nghiệp", image: "/scenarios/farms.jpg" },
];
