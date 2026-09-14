"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Battery,
  BatteryCharging,
  Building2,
  CheckCircle2,
  CircuitBoard,
  Home,
  Leaf,
  Loader2,
  Lock,
  Moon,
  PhoneCall,
  RotateCcw,
  Sun,
  Tractor,
  Wallet,
  Zap,
} from "lucide-react";
import {
  calculateSolarSystem,
  estimateBillFromKwh,
  estimateKwhFromBill,
  formatVnd,
  formatVndCompact,
  getBatteryOptions,
  suggestBatteryCapacity,
  type CustomerType,
  type PhaseType,
  type RoofType,
  type TariffType,
} from "@/lib/calculator";
import { siteConfig } from "@/lib/site-config";

const batteryOptions = getBatteryOptions();

type InputMode = "bill" | "kwh";
type Step = 1 | 2 | 3;

const customerTypes: { key: CustomerType; label: string; icon: typeof Home }[] = [
  { key: "ho-gia-dinh", label: "Hộ gia đình", icon: Home },
  { key: "doanh-nghiep", label: "Doanh nghiệp / Văn phòng", icon: Building2 },
  { key: "nha-xuong", label: "Nhà xưởng / Trang trại", icon: Tractor },
];

const roofTypes: { key: RoofType; label: string }[] = [
  { key: "ton", label: "Mái tôn" },
  { key: "bang", label: "Mái bằng (bê tông)" },
  { key: "ngoi", label: "Mái ngói" },
  { key: "khac", label: "Khác" },
];

const tariffTypes: { key: TariffType; label: string }[] = [
  { key: "sinh-hoat", label: "Điện sinh hoạt" },
  { key: "kinh-doanh", label: "Điện kinh doanh" },
  { key: "san-xuat", label: "Điện sản xuất" },
];

const phaseTypes: { key: PhaseType; label: string }[] = [
  { key: "1-pha", label: "1 pha" },
  { key: "3-pha", label: "3 pha" },
];

export function CalculatorForm() {
  const [step, setStep] = useState<Step>(1);
  const [mode, setMode] = useState<InputMode>("bill");
  const [billVnd, setBillVnd] = useState<string>("2000000");
  const [kwh, setKwh] = useState<string>("700");
  const [customerType, setCustomerType] = useState<CustomerType>("ho-gia-dinh");
  const [tariffType, setTariffType] = useState<TariffType>("sinh-hoat");
  const [phase, setPhase] = useState<PhaseType>("1-pha");
  const [roofType, setRoofType] = useState<RoofType>("ton");
  const [offsetPercent, setOffsetPercent] = useState(80);
  const [daytimePercent, setDaytimePercent] = useState(50);
  const [province, setProvince] = useState("");
  const [batterySlugOverride, setBatterySlugOverride] = useState<string | null | undefined>(undefined);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const monthlyKwh = useMemo(() => {
    if (mode === "kwh") return Number(kwh) || 0;
    return estimateKwhFromBill(Number(billVnd) || 0, tariffType);
  }, [mode, kwh, billVnd, tariffType]);

  const derivedBill = useMemo(() => {
    if (mode === "bill") return Number(billVnd) || 0;
    return estimateBillFromKwh(Number(kwh) || 0, tariffType);
  }, [mode, billVnd, kwh, tariffType]);

  const batterySuggestion = useMemo(
    () => suggestBatteryCapacity(monthlyKwh, daytimePercent, offsetPercent),
    [monthlyKwh, daytimePercent, offsetPercent]
  );
  const isBatteryAuto = batterySlugOverride === undefined;
  const batterySlug = isBatteryAuto ? (batterySuggestion.product?.slug ?? null) : batterySlugOverride;
  const selectedBatteryProduct = batteryOptions.find((p) => p.slug === batterySlug) ?? null;

  const result = useMemo(() => {
    if (monthlyKwh <= 0) return null;
    return calculateSolarSystem({
      customerType,
      monthlyKwh,
      offsetPercent,
      daytimePercent,
      batterySlug,
      roofType,
      phase,
      province,
    });
  }, [customerType, monthlyKwh, offsetPercent, daytimePercent, batterySlug, roofType, phase, province]);

  function handleStep1Submit(e: FormEvent) {
    e.preventDefault();
    if (monthlyKwh <= 0) {
      setFormError("Vui lòng nhập số tiền điện hoặc số kWh hợp lệ.");
      return;
    }
    setFormError(null);
    setStep(2);
  }

  async function handleStep2Submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (name.trim().length < 2) {
      setFormError("Vui lòng nhập họ tên.");
      return;
    }
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phone.trim())) {
      setFormError("Số điện thoại không hợp lệ (VD: 0901234567).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "calculator",
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          address: address.trim() || undefined,
          meta: {
            customerType,
            tariffType,
            phase,
            monthlyKwh,
            derivedBillVnd: derivedBill,
            offsetPercent,
            daytimePercent,
            batterySlug,
            batteryAutoSuggested: isBatteryAuto,
            roofType,
            province: province || undefined,
            result,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Có lỗi xảy ra, vui lòng thử lại.");
      }
      setStep(3);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <StepIndicator step={step} />

      <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-10">
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-navy-950">Bạn là</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {customerTypes.map((c) => (
                  <button
                    type="button"
                    key={c.key}
                    onClick={() => setCustomerType(c.key)}
                    className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
                      customerType === c.key
                        ? "border-brand-600 bg-brand-50 text-brand-800"
                        : "border-slate-100 text-slate-600 hover:border-slate-200"
                    }`}
                  >
                    <c.icon className="h-5 w-5 flex-none" />
                    <span className="text-sm font-semibold">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-navy-950">Giá điện trả hàng tháng</p>
                <select
                  value={tariffType}
                  onChange={(e) => setTariffType(e.target.value as TariffType)}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2"
                >
                  {tariffTypes.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.label}
                    </option>
                  ))}
                </select>
                {tariffType !== "sinh-hoat" && (
                  <p className="mt-1.5 text-xs text-amber-600">
                    *Đơn giá bình quân tham khảo, giá thực tế theo khung giờ sẽ được tư vấn chính xác khi khảo sát.
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-950">Điện sử dụng</p>
                <select
                  value={phase}
                  onChange={(e) => setPhase(e.target.value as PhaseType)}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2"
                >
                  {phaseTypes.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-slate-400">*Thông tin tham khảo, không giới hạn công suất đề xuất.</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy-950">Mức tiêu thụ điện hàng tháng</p>
                <div className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setMode("bill")}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      mode === "bill" ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    Theo tiền điện
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("kwh")}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      mode === "kwh" ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    Theo số kWh
                  </button>
                </div>
              </div>

              {mode === "bill" ? (
                <div className="mt-3">
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      step={50000}
                      value={billVnd}
                      onChange={(e) => setBillVnd(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-16 text-lg font-semibold text-navy-950 outline-none ring-brand-500 focus:ring-2"
                      placeholder="VD: 2.000.000"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                      đ / tháng
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Tương đương ~{monthlyKwh.toLocaleString("vi-VN")} kWh/tháng (ước tính)
                  </p>
                </div>
              ) : (
                <div className="mt-3">
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      step={10}
                      value={kwh}
                      onChange={(e) => setKwh(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-16 text-lg font-semibold text-navy-950 outline-none ring-brand-500 focus:ring-2"
                      placeholder="VD: 700"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                      kWh / tháng
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Tương đương ~{formatVnd(derivedBill)}/tháng</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-navy-950">
                  Mức sử dụng điện từ 6h đến 18h
                </p>
                <span className="text-sm font-bold text-brand-600">{daytimePercent}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={90}
                step={5}
                value={daytimePercent}
                onChange={(e) => setDaytimePercent(Number(e.target.value))}
                className="mt-3 w-full accent-brand-600"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Sun className="h-3.5 w-3.5 text-sun-500" /> Ban ngày {daytimePercent}%
                </span>
                <span className="flex items-center gap-1">
                  Buổi tối {100 - daytimePercent}% <Moon className="h-3.5 w-3.5 text-brand-500" />
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Dùng để tính dung lượng pin lưu trữ cần thiết cho phần điện sử dụng ngoài giờ nắng.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-navy-950">Loại mái</p>
                <select
                  value={roofType}
                  onChange={(e) => setRoofType(e.target.value as RoofType)}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2"
                >
                  {roofTypes.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-950">Tỉnh / thành (không bắt buộc)</p>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="VD: TP. Hồ Chí Minh"
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy-950">Mức độ tự chủ điện mong muốn</p>
                <span className="text-sm font-bold text-brand-600">{offsetPercent}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                step={5}
                value={offsetPercent}
                onChange={(e) => setOffsetPercent(Number(e.target.value))}
                className="mt-3 w-full accent-brand-600"
              />
              <p className="mt-2 text-xs text-slate-500">
                Tỷ lệ sản lượng điện mặt trời dự kiến bù đắp cho nhu cầu sử dụng hàng tháng của bạn.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <BatteryCharging className="h-4 w-4 text-brand-600" />
                <p className="text-sm font-semibold text-navy-950">Bộ lưu điện</p>
              </div>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <select
                  value={batterySlug ?? ""}
                  onChange={(e) => setBatterySlugOverride(e.target.value || null)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2 sm:max-w-sm"
                >
                  <option value="">Không lắp</option>
                  {batteryOptions.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name} - {formatVnd(b.price!)}
                    </option>
                  ))}
                </select>
                {!isBatteryAuto && (
                  <button
                    type="button"
                    onClick={() => setBatterySlugOverride(undefined)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Dùng đề xuất tự động
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {isBatteryAuto ? (
                  batterySuggestion.product ? (
                    <>
                      Hệ thống tự đề xuất <b>{selectedBatteryProduct?.name}</b> (cần tối thiểu ~
                      {batterySuggestion.neededCapacityKwh} kWh) dựa trên lượng điện buổi tối và mức tự chủ bạn chọn ở
                      trên - bạn có thể chỉnh lại nếu muốn.
                    </>
                  ) : (
                    "Với mức sử dụng hiện tại, bạn chưa cần lắp pin lưu trữ - bạn có thể tự chọn nếu muốn dự phòng thêm."
                  )
                ) : (
                  "Bạn đã tự chọn pin lưu trữ, khác với mức đề xuất tự động."
                )}
              </p>
            </div>

            {formError && <p className="text-sm font-medium text-red-600">{formError}</p>}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
            >
              Xem kết quả ước tính <Zap className="h-5 w-5" />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div className="flex items-start gap-3 rounded-2xl bg-brand-50 p-4">
              <Lock className="mt-0.5 h-5 w-5 flex-none text-brand-600" />
              <p className="text-sm leading-relaxed text-brand-800">
                Vui lòng để lại thông tin liên hệ để nhận ngay kết quả ước tính công suất, chi phí đầu tư và thời
                gian hoàn vốn. Đội ngũ tư vấn sẽ liên hệ để khảo sát và đưa ra báo giá chính xác.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-navy-950">Họ và tên *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-navy-950">Số điện thoại *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
                  placeholder="0901 234 567"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-navy-950">Email (không bắt buộc)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-navy-950">Khu vực lắp đặt (không bắt buộc)</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
                  placeholder="Số nhà, đường, quận/huyện..."
                />
              </div>
            </div>

            {formError && <p className="text-sm font-medium text-red-600">{formError}</p>}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full border border-slate-200 px-6 py-4 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Quay lại
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Đang gửi...
                  </>
                ) : (
                  "Nhận kết quả ước tính"
                )}
              </button>
            </div>
            <p className="text-center text-xs text-slate-400">
              Thông tin của bạn được bảo mật và chỉ dùng để tư vấn lắp đặt điện mặt trời.
            </p>
          </form>
        )}

        {step === 3 && result && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
              <CheckCircle2 className="h-6 w-6 flex-none text-emerald-600" />
              <p className="text-sm font-medium text-emerald-800">
                Cảm ơn {name}! Đây là kết quả ước tính dựa trên thông tin bạn cung cấp. Đội ngũ kỹ thuật sẽ liên hệ
                số {phone} trong vòng 24h để khảo sát và tư vấn chi tiết.
              </p>
            </div>

            {result.exceedsCatalog ? (
              <div className="rounded-2xl bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-900">
                  Hệ thống của bạn cần công suất {result.actualKwp} kWp - vượt quá dải biến tần 1 pha hiện có (tối đa
                  10kW). Đây là quy mô cần thiết bị 3 pha / công suất lớn hơn, đội ngũ kỹ thuật sẽ khảo sát và tư vấn
                  thiết bị phù hợp riêng cho bạn.
                </p>
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ResultCard label="Công suất dàn pin" value={`${result.actualKwp} kWp`} icon={Zap} highlight />
              <ResultCard label="Số lượng tấm pin" value={`${result.panelCount} tấm (${result.panelProduct.name})`} icon={Home} />
              <ResultCard
                label="Biến tần"
                value={result.inverterProduct ? `${result.inverterProduct.name}` : "Cần tư vấn riêng"}
                icon={CircuitBoard}
              />
              <ResultCard label="Pin lưu trữ" value={result.batteryProduct ? result.batteryProduct.name : "Không lắp"} icon={Battery} />
              {!result.exceedsCatalog && (
                <>
                  <ResultCard label="Chi phí đầu tư ước tính" value={formatVndCompact(result.estimatedInvestmentVnd)} icon={Wallet} />
                  <ResultCard label="Tiết kiệm mỗi tháng" value={formatVndCompact(result.estimatedMonthlySavingsVnd)} icon={CheckCircle2} />
                  <ResultCard label="Thời gian hoàn vốn" value={`~${result.paybackYears} năm`} icon={Zap} />
                </>
              )}
              <ResultCard label="Giảm phát thải CO2" value={`~${result.co2ReducedTonPerYear} tấn/năm`} icon={Leaf} />
            </div>

            {!result.exceedsCatalog && (
              <div className="rounded-2xl border border-slate-100 bg-white p-5">
                <p className="text-sm font-semibold text-navy-950">Chi tiết chi phí đầu tư</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">Tấm pin ({result.panelCount} tấm)</span>
                    <span className="font-semibold text-navy-950">{formatVnd(result.costBreakdown.panelCostVnd)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">Biến tần</span>
                    <span className="font-semibold text-navy-950">{formatVnd(result.costBreakdown.inverterCostVnd)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">Pin lưu trữ</span>
                    <span className="font-semibold text-navy-950">
                      {result.costBreakdown.batteryCostVnd > 0 ? formatVnd(result.costBreakdown.batteryCostVnd) : "-"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">Công lắp đặt</span>
                    <span className="font-semibold text-navy-950">{formatVnd(result.costBreakdown.laborCostVnd)}</span>
                  </li>
                  <li className="flex items-center justify-between border-t border-slate-100 pt-2 text-base">
                    <span className="font-bold text-navy-950">Tổng cộng</span>
                    <span className="font-extrabold text-brand-600">{formatVnd(result.estimatedInvestmentVnd)}</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-xs leading-relaxed text-slate-500">
              *Kết quả chỉ mang tính chất tham khảo, dựa trên thông số trung bình về bức xạ mặt trời và biểu giá
              điện hiện hành. Chi phí, công suất dàn pin, biến tần và pin lưu trữ thực tế có thể thay đổi sau khi
              đội ngũ kỹ thuật khảo sát trực tiếp diện tích mái, hướng nắng và nhu cầu sử dụng của bạn.
            </div>

            <a
              href={`tel:${siteConfig.hotlineRaw}`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-sun-500 px-6 py-4 text-base font-semibold text-navy-950 shadow-lg shadow-sun-500/25 transition-colors hover:bg-sun-400"
            >
              <PhoneCall className="h-5 w-5" /> Gọi ngay {siteConfig.hotline} để được khảo sát miễn phí
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const labels = ["Thông tin sử dụng điện", "Thông tin liên hệ", "Kết quả ước tính"];
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {labels.map((label, i) => {
        const idx = (i + 1) as Step;
        const active = step === idx;
        const done = step > idx;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold sm:h-9 sm:w-9 ${
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : idx}
              </div>
              <span className={`hidden text-xs font-medium sm:block ${active ? "text-navy-950" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
            {idx < 3 && <div className={`h-0.5 w-8 sm:w-16 ${done ? "bg-emerald-500" : "bg-slate-200"}`} />}
          </div>
        );
      })}
    </div>
  );
}

function ResultCard({
  label,
  value,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: typeof Zap;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 ${highlight ? "bg-navy-950 text-white" : "border border-slate-100 bg-white"}`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          highlight ? "bg-white/10 text-sun-400" : "bg-brand-50 text-brand-600"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className={`mt-3 text-xs font-medium ${highlight ? "text-slate-300" : "text-slate-500"}`}>{label}</p>
      <p className={`mt-1 text-xl font-extrabold ${highlight ? "text-white" : "text-navy-950"}`}>{value}</p>
    </div>
  );
}
