# PNG ONE SOLAR - Website

Website chính thức của **PNG ONE SOLAR** - đơn vị thi công, lắp đặt hệ thống điện năng lượng mặt trời áp mái cho hộ gia đình, nhà xưởng và doanh nghiệp.

Xây dựng bằng **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, chạy trên Node.js.

## Tính năng chính

1. **Trang chủ** - Giới thiệu thương hiệu, nỗi đau khách hàng (hóa đơn điện tăng cao, mất điện, thi công kém uy tín...) và lý do nên lắp điện mặt trời áp mái.
2. **Sản phẩm** (`/san-pham`) - Tấm pin, biến tần (inverter), pin lưu trữ, phụ kiện & khung giá đỡ.
3. **Tính chi phí** (`/tinh-chi-phi`) - Công cụ ước tính công suất & chi phí lắp đặt dựa trên tiền điện/số kWh hàng tháng. **Yêu cầu khách để lại thông tin liên hệ trước khi hiển thị kết quả** (lead gate 3 bước).
4. **Dự án** (`/du-an`) - Thư viện các công trình đã thi công, lọc theo loại khách hàng.
5. **Kiến thức hữu ích** (`/kien-thuc`) - Bài viết hướng dẫn, chính sách bảo hành, FAQ.
6. **Liên hệ** (`/lien-he`) - Form liên hệ, bản đồ, thông tin liên hệ.

Toàn bộ lead (từ công cụ tính chi phí và form liên hệ) được lưu vào `data/leads.json` và có thể gửi email thông báo qua SMTP (tùy chọn, xem `.env.example`).

> **Lưu ý:** Nội dung công ty (số điện thoại, email, địa chỉ, số liệu dự án...) trong `src/lib/site-config.ts`, `src/data/*.ts` hiện đang là dữ liệu **placeholder**. Hãy cập nhật lại bằng thông tin thật trước khi vận hành chính thức.

## Cấu trúc thư mục

```
src/
  app/                 # Các route (App Router): trang chủ, sản phẩm, dự án, tính chi phí, kiến thức, liên hệ, api/leads
  components/          # Component UI theo nhóm: layout, home, products, projects, calculator, contact, shared, ui
  data/                # Dữ liệu tĩnh: sản phẩm, dự án, FAQ, testimonials, bài viết, quy trình
  lib/                 # site-config, logic tính toán (calculator.ts), lưu lead, gửi email
data/leads.json        # Nơi lưu lead thu thập được (không commit lên git)
server.js              # Entry point Node.js dùng khi deploy lên hosting yêu cầu startup file (VD: Hostinger)
```

## Chạy dự án ở local

Yêu cầu Node.js >= 18.18 (khuyến nghị Node 20+).

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

### Cấu hình email thông báo lead (tùy chọn)

Sao chép `.env.example` thành `.env.local` và điền thông tin SMTP:

```bash
cp .env.example .env.local
```

Nếu không cấu hình, hệ thống vẫn hoạt động bình thường và lưu lead vào `data/leads.json`, chỉ không gửi email thông báo.

## Build production

```bash
npm run build
npm start
```

## Đưa code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit: PNG ONE SOLAR website"
git branch -M main
git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
git push -u origin main
```

## Deploy lên Hostinger (Node.js Hosting)

Hostinger hỗ trợ chạy ứng dụng Node.js thông qua **hPanel > Website > Node.js**.

### Cách 1: Deploy qua Git (khuyến nghị)

1. Đăng nhập **hPanel** > chọn website > **Node.js**.
2. Tạo ứng dụng Node.js mới:
   - **Node.js version**: 18.x hoặc 20.x trở lên
   - **Application root**: thư mục chứa mã nguồn (VD: `pngonesolar`)
   - **Application URL**: domain/subdomain của bạn
   - **Application startup file**: `server.js`
3. Kết nối repository GitHub vừa tạo ở bước trên (hPanel hỗ trợ deploy từ Git), hoặc upload code qua File Manager / FTP.
4. Trong phần quản lý ứng dụng Node.js, mở **Terminal / NPM install** và chạy:
   ```bash
   npm install
   npm run build
   ```
5. Thêm biến môi trường (nếu dùng gửi email) trong phần **Environment variables**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `LEAD_NOTIFY_EMAIL`.
6. Nhấn **Restart** ứng dụng. Hostinger sẽ tự gán biến `PORT` - `server.js` đã được cấu hình để đọc `process.env.PORT`.
7. Trỏ domain (hoặc subdomain) về ứng dụng Node.js vừa tạo trong phần **Domains**.

### Cách 2: Deploy thủ công qua FTP/File Manager

1. Build ở máy local: `npm run build`.
2. Upload toàn bộ thư mục dự án (trừ `node_modules`, `.next/cache`) lên Hostinger qua File Manager hoặc FTP.
3. Trong hPanel Node.js app, chạy `npm install` (để cài lại dependencies đúng môi trường server) rồi `npm run build`.
4. Cấu hình **Application startup file** là `server.js`, sau đó **Restart**.

### Lưu ý khi vận hành trên Hostinger

- Thư mục `data/` cần có quyền ghi (write permission) để lưu `leads.json`.
- Sau mỗi lần cập nhật code, cần chạy lại `npm run build` rồi **Restart** ứng dụng Node.js.
- Nếu dùng domain riêng, cấu hình SSL miễn phí (Let's Encrypt) trong hPanel > SSL.

## Cập nhật nội dung

| Nội dung | File |
| --- | --- |
| Thông tin công ty, hotline, mạng xã hội | `src/lib/site-config.ts` |
| Sản phẩm (tấm pin, inverter, pin lưu trữ...) | `src/data/products.ts` |
| Dự án đã thực hiện | `src/data/projects.ts` |
| Câu hỏi thường gặp | `src/data/faqs.ts` |
| Đánh giá khách hàng | `src/data/testimonials.ts` |
| Bài viết kiến thức | `src/data/articles.ts` |
| Quy trình làm việc | `src/data/process.ts` |
| Bảng giá điện bậc thang & công thức tính chi phí | `src/lib/calculator.ts` |

## Công nghệ sử dụng

- [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) - bộ icon
- [Zod](https://zod.dev/) - validate dữ liệu form
- [Nodemailer](https://nodemailer.com/) - gửi email thông báo lead
