import { products, type Product } from "@/data/products";

export type TariffType = "sinh-hoat" | "kinh-doanh" | "san-xuat";

// Bảng giá điện sinh hoạt bậc thang - số liệu THAM KHẢO để ước tính, có thể thay đổi
// theo quyết định mới nhất của EVN. Đơn vị: đồng/kWh.
export const EVN_TARIFF_TIERS = [
  { from: 0, to: 50, price: 1984 },
  { from: 51, to: 100, price: 2050 },
  { from: 101, to: 200, price: 2380 },
  { from: 201, to: 300, price: 2998 },
  { from: 301, to: 400, price: 3350 },
  { from: 401, to: Infinity, price: 3460 },
];

// Điện kinh doanh và sản xuất tại Việt Nam tính theo khung giờ cao điểm/bình thường/thấp điểm
// và cấp điện áp đấu nối - KHÔNG theo bậc thang như điện sinh hoạt. Vì chưa có bảng giá thực tế
// chi tiết, tạm dùng đơn giá bình quân tham khảo (đồng/kWh) để ước tính nhanh. Cần thay bằng
// số liệu thật của PNG ONE SOLAR khi có.
const FLAT_AVG_PRICE_VND: Record<Exclude<TariffType, "sinh-hoat">, number> = {
  "kinh-doanh": 3100,
  "san-xuat": 2300,
};

/** Ước tính số kWh tiêu thụ/tháng từ số tiền điện (đồng). */
export function estimateKwhFromBill(billVnd: number, tariffType: TariffType = "sinh-hoat"): number {
  if (billVnd <= 0) return 0;

  if (tariffType !== "sinh-hoat") {
    return Math.round(billVnd / FLAT_AVG_PRICE_VND[tariffType]);
  }

  let remainingBill = billVnd;
  let totalKwh = 0;

  for (const tier of EVN_TARIFF_TIERS) {
    const tierWidth = tier.to === Infinity ? Infinity : tier.to - tier.from + 1;
    const tierCost = tierWidth === Infinity ? Infinity : tierWidth * tier.price;

    if (remainingBill <= tierCost) {
      totalKwh += remainingBill / tier.price;
      remainingBill = 0;
      break;
    } else {
      totalKwh += tierWidth;
      remainingBill -= tierCost;
    }
  }

  if (remainingBill > 0) {
    totalKwh += remainingBill / EVN_TARIFF_TIERS[EVN_TARIFF_TIERS.length - 1].price;
  }

  return Math.round(totalKwh);
}

/** Ước tính tiền điện (đồng) từ số kWh tiêu thụ/tháng. */
export function estimateBillFromKwh(kwh: number, tariffType: TariffType = "sinh-hoat"): number {
  if (kwh <= 0) return 0;

  if (tariffType !== "sinh-hoat") {
    return Math.round(kwh * FLAT_AVG_PRICE_VND[tariffType]);
  }

  let remaining = kwh;
  let total = 0;

  for (const tier of EVN_TARIFF_TIERS) {
    const tierWidth = tier.to === Infinity ? Infinity : tier.to - tier.from + 1;
    const used = Math.min(remaining, tierWidth);
    total += used * tier.price;
    remaining -= used;
    if (remaining <= 0) break;
  }

  return Math.round(total);
}

export type RoofType = "ton" | "bang" | "ngoi" | "khac";
export type CustomerType = "ho-gia-dinh" | "doanh-nghiep" | "nha-xuong";
export type PhaseType = "1-pha" | "3-pha";

export interface CalculatorInput {
  customerType: CustomerType;
  monthlyKwh: number;
  offsetPercent: number; // % sản lượng điện muốn tự chủ, mặc định 80%
  daytimePercent: number; // % điện tiêu thụ trong khung 6h-18h, phần còn lại là buổi tối
  batterySlug: string | null; // slug sản phẩm pin lưu trữ đã chọn, null = không lắp
  roofType: RoofType;
  phase: PhaseType;
  province: string;
}

export interface CostBreakdown {
  panelCostVnd: number;
  inverterCostVnd: number;
  batteryCostVnd: number;
  laborCostVnd: number;
}

export interface CalculatorResult {
  actualKwp: number;
  panelCount: number;
  panelProduct: Product;
  estimatedYearlyOutputKwh: number;
  estimatedMonthlySavingsVnd: number;
  estimatedInvestmentVnd: number;
  costBreakdown: CostBreakdown;
  paybackYears: number;
  co2ReducedTonPerYear: number;
  roofAreaSqm: number;
  inverterProduct: Product | null;
  batteryProduct: Product | null;
  /** true nếu công suất cần thiết vượt quá công suất biến tần lớn nhất hiện có trong danh mục (10kW, 1 pha). */
  exceedsCatalog: boolean;
}

// Sản lượng điện trung bình mỗi kWp tạo ra tại Việt Nam ~ 3.8 - 4.2 kWh/ngày tùy vùng miền.
const AVG_DAILY_YIELD_PER_KWP = 3.9;
const DAYS_PER_MONTH = 30;
const ROOF_AREA_PER_KWP = 5.2; // m2 mái cần thiết cho mỗi kWp lắp đặt

// Tấm pin mặc định dùng để tính công suất/chi phí trong công cụ Tính chi phí (giá thấp hơn +
// bảo hành vật lý dài hơn trong 2 lựa chọn hiện có - xem src/data/products.ts).
const BASE_PANEL_SLUG = "osda-620w";

function getProductOrThrow(slug: string): Product {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`Không tìm thấy sản phẩm "${slug}" trong danh mục.`);
  return product;
}

// Chi phí nhân công + khung giá đỡ + dây cáp + tủ điện... chiếm 15% TỔNG chi phí đầu tư
// (không phải 15% giá thiết bị) - theo yêu cầu của PNG ONE SOLAR. Tức là:
//   laborCost = 15% × (equipmentCost + laborCost)  =>  laborCost = equipmentCost × 0.15 / 0.85
const LABOR_COST_PERCENTAGE = 0.15;

const CO2_KG_PER_KWH = 0.6768; // hệ số phát thải lưới điện Việt Nam (tấn CO2/MWh quy đổi)

// Độ sâu xả an toàn (Depth of Discharge) và hiệu suất sạc/xả round-trip trung bình của pin LFP
// trong danh mục hiện có (dao động 90-95% tùy hãng, lấy mức thận trọng để không đề xuất thiếu).
const BATTERY_DOD = 0.9;
const BATTERY_ROUND_TRIP_EFFICIENCY = 0.95;

// Tỷ lệ oversize DC/AC phổ biến khi chọn công suất biến tần so với công suất dàn pin.
const INVERTER_DC_AC_RATIO = 1.15;

function getInverterOptions(): Product[] {
  return products
    .filter((p) => p.category === "inverter")
    .slice()
    .sort((a, b) => a.capacityKw! - b.capacityKw! || a.price! - b.price!);
}

export function getBatteryOptions(): Product[] {
  return products
    .filter((p) => p.category === "battery")
    .slice()
    .sort((a, b) => a.capacityKwh! - b.capacityKwh! || a.price! - b.price!);
}

/** Chọn biến tần rẻ nhất trong nhóm công suất nhỏ nhất đủ đáp ứng nhu cầu. Null nếu vượt quá danh mục hiện có. */
function pickInverter(kwNeeded: number): Product | null {
  const candidates = getInverterOptions().filter((p) => p.capacityKw! >= kwNeeded);
  if (candidates.length === 0) return null;
  const minCap = Math.min(...candidates.map((p) => p.capacityKw!));
  return candidates.filter((p) => p.capacityKw === minCap).sort((a, b) => a.price! - b.price!)[0];
}

/** Chọn pin lưu trữ rẻ nhất trong nhóm dung lượng nhỏ nhất đủ đáp ứng nhu cầu. */
function pickBattery(kwhNeeded: number): Product | null {
  if (kwhNeeded <= 0) return null;
  const options = getBatteryOptions();
  const candidates = options.filter((p) => p.capacityKwh! >= kwhNeeded);
  if (candidates.length === 0) {
    // Vượt quá dung lượng 1 sản phẩm lớn nhất hiện có - tạm đề xuất sản phẩm lớn nhất, cần tư vấn ghép thêm.
    return options[options.length - 1] ?? null;
  }
  const minCap = Math.min(...candidates.map((p) => p.capacityKwh!));
  return candidates.filter((p) => p.capacityKwh === minCap).sort((a, b) => a.price! - b.price!)[0];
}

/**
 * Đề xuất sản phẩm pin lưu trữ dựa trên lượng điện tiêu thụ buổi tối (ngoài khung 6h-18h) và
 * mức tự chủ mong muốn. Trả về sản phẩm rẻ nhất có dung lượng đủ đáp ứng nhu cầu.
 */
export function suggestBatteryCapacity(
  monthlyKwh: number,
  daytimePercent: number,
  offsetPercent: number
): { neededCapacityKwh: number; product: Product | null } {
  const dailyKwh = monthlyKwh / DAYS_PER_MONTH;
  const eveningKwhPerDay = dailyKwh * (1 - daytimePercent / 100);
  const eveningTargetKwh = eveningKwhPerDay * (offsetPercent / 100);
  const neededCapacityKwh = eveningTargetKwh / (BATTERY_DOD * BATTERY_ROUND_TRIP_EFFICIENCY);

  return {
    neededCapacityKwh: Math.round(neededCapacityKwh * 100) / 100,
    product: pickBattery(neededCapacityKwh),
  };
}

export function calculateSolarSystem(input: CalculatorInput): CalculatorResult {
  const { monthlyKwh, offsetPercent, batterySlug } = input;

  const panel = getProductOrThrow(BASE_PANEL_SLUG);
  const panelWattPeak = panel.wattPeak!;
  const panelUnitPrice = Math.round(panelWattPeak * panel.pricePerWatt!);

  // 1. Công suất dàn pin: tính theo TỔNG mức tự chủ mong muốn (cả ngày lẫn tối), vì nắng ban ngày
  // cần sản xuất đủ để vừa dùng trực tiếp ban ngày, vừa sạc pin dùng cho buổi tối.
  const targetMonthlyOffsetKwh = (monthlyKwh * offsetPercent) / 100;
  const rawKwp = targetMonthlyOffsetKwh / (AVG_DAILY_YIELD_PER_KWP * DAYS_PER_MONTH);
  const targetKwp = Math.max(3, rawKwp);

  // 2. Chốt số tấm pin trước, sau đó suy ngược công suất thực tế để mọi con số (chi phí, sản
  // lượng, tiết kiệm...) đều nhất quán với số tấm thực sự lắp đặt.
  const panelCount = Math.ceil((targetKwp * 1000) / panelWattPeak);
  const actualKwp = Math.round(((panelCount * panelWattPeak) / 1000) * 100) / 100;

  const estimatedYearlyOutputKwh = Math.round(actualKwp * AVG_DAILY_YIELD_PER_KWP * 365);
  const monthlyOutputKwh = estimatedYearlyOutputKwh / 12;
  const offsetKwhActual = Math.min(monthlyOutputKwh, monthlyKwh);
  const avgPricePerKwh = monthlyKwh > 0 ? estimateBillFromKwh(monthlyKwh) / monthlyKwh : 2500;
  const estimatedMonthlySavingsVnd = Math.round(offsetKwhActual * avgPricePerKwh);

  // 3. Biến tần: theo công suất dàn pin thực tế, tỷ lệ oversize DC/AC ~1.15 lần. Danh mục hiện tại
  // chỉ có biến tần Hybrid 1 pha tối đa 10kW - hệ thống lớn hơn cần tư vấn thiết bị riêng.
  const requiredInverterKw = actualKwp / INVERTER_DC_AC_RATIO;
  const inverterProduct = pickInverter(requiredInverterKw);
  const exceedsCatalog = inverterProduct === null;

  // 4. Pin lưu trữ: dùng đúng sản phẩm khách chọn (mặc định = đề xuất tự động theo % buổi tối).
  const batteryProduct = batterySlug ? getProductOrThrow(batterySlug) : null;

  // 5. Chi phí = giá tấm pin + giá biến tần + giá pin lưu trữ (theo bảng giá CiTiSOLAR) + công lắp đặt
  // (= 15% tổng chi phí đầu tư, suy ra từ chi phí thiết bị).
  const panelCostVnd = panelCount * panelUnitPrice;
  const inverterCostVnd = inverterProduct ? inverterProduct.price! : 0;
  const batteryCostVnd = batteryProduct ? batteryProduct.price! : 0;
  const equipmentCostVnd = panelCostVnd + inverterCostVnd + batteryCostVnd;
  const laborCostVnd = Math.round(equipmentCostVnd * (LABOR_COST_PERCENTAGE / (1 - LABOR_COST_PERCENTAGE)));

  const estimatedInvestmentVnd = exceedsCatalog ? 0 : equipmentCostVnd + laborCostVnd;

  const paybackYears =
    !exceedsCatalog && estimatedMonthlySavingsVnd > 0
      ? Math.round((estimatedInvestmentVnd / (estimatedMonthlySavingsVnd * 12)) * 10) / 10
      : 0;

  const co2ReducedTonPerYear =
    Math.round(((estimatedYearlyOutputKwh * CO2_KG_PER_KWH) / 1000) * 10) / 10;

  const roofAreaSqm = Math.round(actualKwp * ROOF_AREA_PER_KWP);

  return {
    actualKwp,
    panelCount,
    panelProduct: panel,
    estimatedYearlyOutputKwh,
    estimatedMonthlySavingsVnd,
    estimatedInvestmentVnd,
    costBreakdown: { panelCostVnd, inverterCostVnd, batteryCostVnd, laborCostVnd },
    paybackYears,
    co2ReducedTonPerYear,
    roofAreaSqm,
    inverterProduct,
    batteryProduct,
    exceedsCatalog,
  };
}

export function formatVnd(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(Math.round(value)) + " đ";
}

export function formatVndCompact(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2).replace(/\.00$/, "")} tỷ`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)} triệu`;
  }
  return formatVnd(value);
}
