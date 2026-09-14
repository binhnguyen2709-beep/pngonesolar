import { loginAction } from "./actions";

const errorMessages: Record<string, string> = {
  invalid: "Mật khẩu không đúng, vui lòng thử lại.",
  "not-configured": "Server chưa cấu hình biến môi trường ADMIN_PASSWORD.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error ? errorMessages[error] : null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-navy-950">Đăng nhập quản trị</h1>
        <p className="mt-1 text-sm text-slate-500">
          Xem danh sách khách hàng đã để lại thông tin trên website.
        </p>

        {errorMessage && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-navy-950">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
