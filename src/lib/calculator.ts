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

/** Ước tính số kWh tiêu thụ/tháng từ số tiền điện (đồng), dựa trên biểu giá bậc thang. */
export function estimateKwhFromBill(billVnd: number): number {
  if (billVnd <= 0) return 0;
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

  // Nếu hóa đơn vượt bậc cao nhất (trường hợp lý thuyết), cộng phần dư theo giá bậc cuối.
  if (remainingBill > 0) {
    totalKwh += remainingBill / EVN_TARIFF_TIERS[EVN_TARIFF_TIERS.length - 1].price;
  }

  return Math.round(totalKwh);
}

/** Ước tính tiền điện (đồng) từ số kWh tiêu thụ/tháng theo biểu giá bậc thang. */
export function estimateBillFromKwh(kwh: number): number {
  if (kwh <= 0) return 0;
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
export type SystemType = "on-grid" | "hybrid";

export interface CalculatorInput {
  customerType: CustomerType;
  monthlyKwh: number;
  offsetPercent: number; // % sản lượng điện muốn tự chủ, mặc định 80%
  systemType: SystemType;
  roofType: RoofType;
  province: string;
}

export interface CalculatorResult {
  recommendedKwp: number;
  panelCount: number;
  estimatedYearlyOutputKwh: number;
  estimatedMonthlySavingsVnd: number;
  estimatedInvestmentLowVnd: number;
  estimatedInvestmentHighVnd: number;
  paybackYears: number;
  co2ReducedTonPerYear: number;
  roofAreaSqm: number;
}

// Sản lượng điện trung bình mỗi kWp tạo ra tại Việt Nam ~ 3.8 - 4.2 kWh/ngày tùy vùng miền.
const AVG_DAILY_YIELD_PER_KWP = 3.9;
const DAYS_PER_MONTH = 30;
const PANEL_WATT_PEAK = 590; // Wp / tấm pin (công nghệ hiện đại phổ biến)
const ROOF_AREA_PER_KWP = 5.2; // m2 mái cần thiết cho mỗi kWp lắp đặt

// Suất đầu tư tham khảo (đồng/kWp) theo loại hệ thống, đã gồm nhân công + thiết bị cơ bản.
const COST_PER_KWP: Record<SystemType, { low: number; high: number }> = {
  "on-grid": { low: 12_500_000, high: 15_500_000 },
  hybrid: { low: 19_000_000, high: 24_500_000 },
};

const CO2_KG_PER_KWH = 0.6768; // hệ số phát thải lưới điện Việt Nam (tấn CO2/MWh quy đổi)

export function calculateSolarSystem(input: CalculatorInput): CalculatorResult {
  const { monthlyKwh, offsetPercent, systemType } = input;

  const targetMonthlyOffsetKwh = (monthlyKwh * offsetPercent) / 100;
  const rawKwp = targetMonthlyOffsetKwh / (AVG_DAILY_YIELD_PER_KWP * DAYS_PER_MONTH);
  const recommendedKwp = Math.max(3, Math.round(rawKwp * 10) / 10);

  const panelCount = Math.ceil((recommendedKwp * 1000) / PANEL_WATT_PEAK);
  const estimatedYearlyOutputKwh = Math.round(
    recommendedKwp * AVG_DAILY_YIELD_PER_KWP * 365
  );

  const monthlyOutputKwh = estimatedYearlyOutputKwh / 12;
  const offsetKwhActual = Math.min(monthlyOutputKwh, monthlyKwh);
  const avgPricePerKwh = monthlyKwh > 0 ? estimateBillFromKwh(monthlyKwh) / monthlyKwh : 2500;
  const estimatedMonthlySavingsVnd = Math.round(offsetKwhActual * avgPricePerKwh);

  const costRange = COST_PER_KWP[systemType];
  const estimatedInvestmentLowVnd = Math.round(recommendedKwp * costRange.low);
  const estimatedInvestmentHighVnd = Math.round(recommendedKwp * costRange.high);
  const avgInvestment = (estimatedInvestmentLowVnd + estimatedInvestmentHighVnd) / 2;

  const paybackYears =
    estimatedMonthlySavingsVnd > 0
      ? Math.round((avgInvestment / (estimatedMonthlySavingsVnd * 12)) * 10) / 10
      : 0;

  const co2ReducedTonPerYear =
    Math.round(((estimatedYearlyOutputKwh * CO2_KG_PER_KWH) / 1000) * 10) / 10;

  const roofAreaSqm = Math.round(recommendedKwp * ROOF_AREA_PER_KWP);

  return {
    recommendedKwp,
    panelCount,
    estimatedYearlyOutputKwh,
    estimatedMonthlySavingsVnd,
    estimatedInvestmentLowVnd,
    estimatedInvestmentHighVnd,
    paybackYears,
    co2ReducedTonPerYear,
    roofAreaSqm,
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
