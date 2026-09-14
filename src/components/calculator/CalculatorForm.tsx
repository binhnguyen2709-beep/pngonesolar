"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
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
import { getLocalizedProduct } from "@/data/products";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/i18n/routing";

const batteryOptions = getBatteryOptions();

type InputMode = "bill" | "kwh";
type Step = 1 | 2 | 3;

const customerTypeIcons: Record<CustomerType, typeof Home> = {
  "ho-gia-dinh": Home,
  "doanh-nghiep": Building2,
  "nha-xuong": Tractor,
};
const customerTypeKeys: CustomerType[] = ["ho-gia-dinh", "doanh-nghiep", "nha-xuong"];
const roofTypeKeys: RoofType[] = ["ton", "bang", "ngoi", "khac"];
const tariffTypeKeys: TariffType[] = ["sinh-hoat", "kinh-doanh", "san-xuat"];
const phaseTypeKeys: PhaseType[] = ["1-pha", "3-pha"];

export function CalculatorForm() {
  const t = useTranslations("calculator");
  const locale = useLocale() as Locale;

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
      setFormError(t("errors.invalidConsumption"));
      return;
    }
    setFormError(null);
    setStep(2);
  }

  async function handleStep2Submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (name.trim().length < 2) {
      setFormError(t("errors.invalidName"));
      return;
    }
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phone.trim())) {
      setFormError(t("errors.invalidPhone"));
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
        throw new Error(data.error || t("errors.generic"));
      }
      setStep(3);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t("errors.generic"));
    } finally {
      setSubmitting(false);
    }
  }

  const localizedPanel = result ? getLocalizedProduct(result.panelProduct, locale) : null;
  const localizedInverter = result?.inverterProduct ? getLocalizedProduct(result.inverterProduct, locale) : null;
  const localizedBattery = result?.batteryProduct ? getLocalizedProduct(result.batteryProduct, locale) : null;
  const localizedSelectedBattery = selectedBatteryProduct ? getLocalizedProduct(selectedBatteryProduct, locale) : null;

  return (
    <div className="mx-auto max-w-3xl">
      <StepIndicator step={step} />

      <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-10">
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-navy-950">{t("customerType.label")}</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {customerTypeKeys.map((key) => {
                  const Icon = customerTypeIcons[key];
                  const labelKey = key === "ho-gia-dinh" ? "hoGiaDinh" : key === "doanh-nghiep" ? "doanhNghiep" : "nhaXuong";
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setCustomerType(key)}
                      className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
                        customerType === key
                          ? "border-brand-600 bg-brand-50 text-brand-800"
                          : "border-slate-100 text-slate-600 hover:border-slate-200"
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-none" />
                      <span className="text-sm font-semibold">{t(`customerType.${labelKey}`)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-navy-950">{t("tariff.label")}</p>
                <select
                  value={tariffType}
                  onChange={(e) => setTariffType(e.target.value as TariffType)}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2"
                >
                  {tariffTypeKeys.map((key) => {
                    const labelKey = key === "sinh-hoat" ? "sinhHoat" : key === "kinh-doanh" ? "kinhDoanh" : "sanXuat";
                    return (
                      <option key={key} value={key}>
                        {t(`tariff.${labelKey}`)}
                      </option>
                    );
                  })}
                </select>
                {tariffType !== "sinh-hoat" && <p className="mt-1.5 text-xs text-amber-600">{t("tariff.note")}</p>}
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-950">{t("phase.label")}</p>
                <select
                  value={phase}
                  onChange={(e) => setPhase(e.target.value as PhaseType)}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2"
                >
                  {phaseTypeKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`phase.${key === "1-pha" ? "onePhase" : "threePhase"}`)}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-slate-400">{t("phase.note")}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy-950">{t("consumption.label")}</p>
                <div className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setMode("bill")}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      mode === "bill" ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    {t("consumption.byBill")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("kwh")}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      mode === "kwh" ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    {t("consumption.byKwh")}
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
                      placeholder={t("consumption.billPlaceholder")}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                      {t("consumption.billUnit")}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    {t("consumption.equivKwh", { value: monthlyKwh.toLocaleString(locale) })}
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
                      placeholder={t("consumption.kwhPlaceholder")}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                      {t("consumption.kwhUnit")}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    {t("consumption.equivBill", { value: formatVnd(derivedBill, locale) })}
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-navy-950">{t("daytime.label")}</p>
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
                  <Sun className="h-3.5 w-3.5 text-sun-500" /> {t("daytime.day", { value: daytimePercent })}
                </span>
                <span className="flex items-center gap-1">
                  {t("daytime.night", { value: 100 - daytimePercent })} <Moon className="h-3.5 w-3.5 text-brand-500" />
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500">{t("daytime.note")}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-navy-950">{t("roof.label")}</p>
                <select
                  value={roofType}
                  onChange={(e) => setRoofType(e.target.value as RoofType)}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2"
                >
                  {roofTypeKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`roof.${key}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-950">{t("province.label")}</p>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder={t("province.placeholder")}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy-950">{t("offset.label")}</p>
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
              <p className="mt-2 text-xs text-slate-500">{t("offset.note")}</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <BatteryCharging className="h-4 w-4 text-brand-600" />
                <p className="text-sm font-semibold text-navy-950">{t("battery.label")}</p>
              </div>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <select
                  value={batterySlug ?? ""}
                  onChange={(e) => setBatterySlugOverride(e.target.value || null)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-navy-950 outline-none ring-brand-500 focus:ring-2 sm:max-w-sm"
                >
                  <option value="">{t("battery.none")}</option>
                  {batteryOptions.map((b) => {
                    const lb = getLocalizedProduct(b, locale);
                    return (
                      <option key={b.slug} value={b.slug}>
                        {lb.name} - {formatVnd(b.price!, locale)}
                      </option>
                    );
                  })}
                </select>
                {!isBatteryAuto && (
                  <button
                    type="button"
                    onClick={() => setBatterySlugOverride(undefined)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> {t("battery.useAuto")}
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {isBatteryAuto ? (
                  batterySuggestion.product ? (
                    t("battery.autoNote", {
                      product: localizedSelectedBattery?.name ?? "",
                      kwh: batterySuggestion.neededCapacityKwh,
                    })
                  ) : (
                    t("battery.noneNeeded")
                  )
                ) : (
                  t("battery.manualNote")
                )}
              </p>
            </div>

            {formError && <p className="text-sm font-medium text-red-600">{formError}</p>}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
            >
              {t("submitStep1")} <Zap className="h-5 w-5" />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div className="flex items-start gap-3 rounded-2xl bg-brand-50 p-4">
              <Lock className="mt-0.5 h-5 w-5 flex-none text-brand-600" />
              <p className="text-sm leading-relaxed text-brand-800">{t("step2Intro")}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-navy-950">{t("form.name")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
                  placeholder={t("form.namePlaceholder")}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-navy-950">{t("form.phone")}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
                  placeholder={t("form.phonePlaceholder")}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-navy-950">{t("form.email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-navy-950">{t("form.address")}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
                  placeholder={t("form.addressPlaceholder")}
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
                {t("form.back")}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> {t("form.submitting")}
                  </>
                ) : (
                  t("form.submit")
                )}
              </button>
            </div>
            <p className="text-center text-xs text-slate-400">{t("form.privacyNote")}</p>
          </form>
        )}

        {step === 3 && result && localizedPanel && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
              <CheckCircle2 className="h-6 w-6 flex-none text-emerald-600" />
              <p className="text-sm font-medium text-emerald-800">{t("result.thankYou", { name, phone })}</p>
            </div>

            {result.exceedsCatalog ? (
              <div className="rounded-2xl bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-900">
                  {t("result.exceedsWarning", { kwp: result.actualKwp })}
                </p>
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ResultCard label={t("result.panelPower")} value={`${result.actualKwp} kWp`} icon={Zap} highlight />
              <ResultCard
                label={t("result.panelCount")}
                value={t("result.panelCountUnit", { count: result.panelCount, product: localizedPanel.name })}
                icon={Home}
              />
              <ResultCard
                label={t("result.inverter")}
                value={localizedInverter ? localizedInverter.name : t("result.inverterContact")}
                icon={CircuitBoard}
              />
              <ResultCard
                label={t("result.battery")}
                value={localizedBattery ? localizedBattery.name : t("result.batteryNone")}
                icon={Battery}
              />
              {!result.exceedsCatalog && (
                <>
                  <ResultCard label={t("result.investment")} value={formatVndCompact(result.estimatedInvestmentVnd, locale)} icon={Wallet} />
                  <ResultCard
                    label={t("result.monthlySavings")}
                    value={formatVndCompact(result.estimatedMonthlySavingsVnd, locale)}
                    icon={CheckCircle2}
                  />
                  <ResultCard label={t("result.payback")} value={t("result.paybackUnit", { years: result.paybackYears })} icon={Zap} />
                </>
              )}
              <ResultCard
                label={t("result.co2")}
                value={t("result.co2Unit", { value: result.co2ReducedTonPerYear })}
                icon={Leaf}
              />
            </div>

            {!result.exceedsCatalog && (
              <div className="rounded-2xl border border-slate-100 bg-white p-5">
                <p className="text-sm font-semibold text-navy-950">{t("result.breakdownTitle")}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">{t("result.breakdownPanel", { count: result.panelCount })}</span>
                    <span className="font-semibold text-navy-950">{formatVnd(result.costBreakdown.panelCostVnd, locale)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">{t("result.breakdownInverter")}</span>
                    <span className="font-semibold text-navy-950">{formatVnd(result.costBreakdown.inverterCostVnd, locale)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">{t("result.breakdownBattery")}</span>
                    <span className="font-semibold text-navy-950">
                      {result.costBreakdown.batteryCostVnd > 0 ? formatVnd(result.costBreakdown.batteryCostVnd, locale) : "-"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">{t("result.breakdownLabor")}</span>
                    <span className="font-semibold text-navy-950">{formatVnd(result.costBreakdown.laborCostVnd, locale)}</span>
                  </li>
                  <li className="flex items-center justify-between border-t border-slate-100 pt-2 text-base">
                    <span className="font-bold text-navy-950">{t("result.breakdownTotal")}</span>
                    <span className="font-extrabold text-brand-600">{formatVnd(result.estimatedInvestmentVnd, locale)}</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-xs leading-relaxed text-slate-500">
              {t("result.disclaimer")}
            </div>

            <a
              href={`tel:${siteConfig.hotlineRaw}`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-sun-500 px-6 py-4 text-base font-semibold text-navy-950 shadow-lg shadow-sun-500/25 transition-colors hover:bg-sun-400"
            >
              <PhoneCall className="h-5 w-5" /> {t("result.callCta", { hotline: siteConfig.hotline })}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const t = useTranslations("calculator.steps");
  const labels = [t("step1"), t("step2"), t("step3")];
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
