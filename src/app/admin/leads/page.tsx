import { requireAdminSession } from "@/lib/admin-auth";
import { getLeads, type LeadRecord } from "@/lib/leads";
import { deleteLeadAction, logoutAction } from "./actions";
import { DeleteLeadButton } from "./DeleteLeadButton";

const sourceLabel: Record<LeadRecord["source"], string> = {
  calculator: "Công cụ tính chi phí",
  contact: "Form liên hệ",
  "project-cta": "CTA trang dự án",
};

function formatVnd(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(Math.round(value)) + " đ";
}

interface CalculatorMetaResult {
  actualKwp?: number;
  panelCount?: number;
  estimatedInvestmentVnd?: number;
  paybackYears?: number;
}

function renderDetail(lead: LeadRecord) {
  const meta = lead.meta as { result?: CalculatorMetaResult } | undefined;
  const result = meta?.result;

  if (result?.actualKwp) {
    return (
      <div className="space-y-0.5 text-sm text-slate-600">
        <div>
          {result.actualKwp} kWp{result.panelCount ? ` · ${result.panelCount} tấm pin` : ""}
        </div>
        {typeof result.estimatedInvestmentVnd === "number" && result.estimatedInvestmentVnd > 0 && (
          <div>≈ {formatVnd(result.estimatedInvestmentVnd)}</div>
        )}
        {typeof result.paybackYears === "number" && result.paybackYears > 0 && (
          <div>Hoàn vốn ~{result.paybackYears} năm</div>
        )}
      </div>
    );
  }

  if (lead.note) {
    return <p className="max-w-xs text-sm text-slate-600">{lead.note}</p>;
  }

  return <span className="text-sm text-slate-400">-</span>;
}

export default async function AdminLeadsPage() {
  await requireAdminSession();
  const leads = await getLeads();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-950">Khách hàng để lại thông tin</h1>
          <p className="mt-1 text-sm text-slate-500">{leads.length} lượt để lại thông tin</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Đăng xuất
          </button>
        </form>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Thời gian</th>
              <th className="px-4 py-3">Nguồn</th>
              <th className="px-4 py-3">Họ tên</th>
              <th className="px-4 py-3">Điện thoại</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Địa chỉ</th>
              <th className="px-4 py-3">Chi tiết</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="align-top">
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                  {new Date(lead.createdAt).toLocaleString("vi-VN")}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                    {sourceLabel[lead.source]}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-navy-950">{lead.name}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <a href={`tel:${lead.phone}`} className="text-brand-600 hover:underline">
                    {lead.phone}
                  </a>
                </td>
                <td className="px-4 py-3">
                  {lead.email ? (
                    <a href={`mailto:${lead.email}`} className="text-brand-600 hover:underline">
                      {lead.email}
                    </a>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="max-w-[200px] px-4 py-3 text-slate-600">{lead.address || "-"}</td>
                <td className="px-4 py-3">{renderDetail(lead)}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <DeleteLeadButton id={lead.id} action={deleteLeadAction} />
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                  Chưa có khách hàng nào để lại thông tin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
