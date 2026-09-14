"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tErr = useTranslations("calculator.errors");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError(tErr("invalidName"));
      return;
    }
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phone.trim())) {
      setError(tErr("invalidPhone"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          address: address.trim() || undefined,
          note: note.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || tErr("generic"));
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : tErr("generic"));
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-lg shadow-slate-200/50">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy-950">{t("successTitle")}</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-navy-950">{t("name")}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder={t("namePlaceholder")}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy-950">{t("phone")}</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder={t("phonePlaceholder")}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy-950">{t("email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder={t("emailPlaceholder")}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy-950">{t("address")}</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder={t("addressPlaceholder")}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-navy-950">{t("note")}</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
          placeholder={t("notePlaceholder")}
        />
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> {t("submitting")}
          </>
        ) : (
          <>
            <Send className="h-5 w-5" /> {t("submit")}
          </>
        )}
      </button>
    </form>
  );
}
