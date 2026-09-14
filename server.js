// Custom Node.js entry point dùng để deploy lên Hostinger (hoặc bất kỳ Node.js hosting nào
// yêu cầu một "Application startup file" thay vì chạy trực tiếp `next start`).
//
// Cách dùng trên Hostinger hPanel > Website > Node.js:
//   - Application root: thư mục chứa project này
//   - Application startup file: server.js
//   - Sau khi cấu hình, chạy: npm install && npm run build, rồi khởi động lại ứng dụng
const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`> PNG ONE SOLAR đang chạy tại http://localhost:${port}`);
  });
});
