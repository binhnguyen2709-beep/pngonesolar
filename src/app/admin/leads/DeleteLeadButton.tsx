"use client";

export function DeleteLeadButton({
  id,
  action,
}: {
  id: string;
  action: (formData: FormData) => void;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Xóa thông tin khách hàng này? Không thể hoàn tác.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-lg px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        Xóa
      </button>
    </form>
  );
}
