
## PHẦN A — ĐỌC HIỂU (20 điểm)
---
## Câu A1 (10đ) — Grid System
## Trả lời
Phân tích HTML cho sẵn để vẽ layout ở 3 kích thước màn hình. Bốn div đều có cùng bộ class: col-12 col-md-6 col-lg-3. Ta đọc lần lượt từng breakpoint.

Kích thước	< 768px (xs/sm)	768px – 991px (md)	≥ 992px (lg+)
Class áp dụng	col-12	col-md-6	col-lg-3
Số cột mỗi box	12 / 12 (toàn hàng)	6 / 12 (nửa hàng)	3 / 12 (1/4 hàng)
Box layout	4 box xếp dọc, mỗi box full width	2 box mỗi hàng, 2 hàng tổng cộng	4 box nằm ngang trên 1 hàng duy nhất

Câu hỏi thêm
col-md-6 có nghĩa là: tại breakpoint md (từ 768px trở lên), div này chiếm 6 cột trên tổng 12 cột của hàng, tương đương 50% chiều ngang container. Tiền tố md là tên breakpoint, số 6 là số cột.

Tại sao không cần viết col-sm-12: vì Bootstrap dùng tiếp cận mobile-first. Khi bạn chỉ viết col-12 (không có breakpoint prefix), Bootstrap mặc định áp dụng class đó cho tất cả kích thước từ nhỏ nhất trở lên. col-md-6 sau đó ghi đè cho màn hình md+. Viết thêm col-sm-12 là thừa vì col-12 đã bao phủ toàn bộ phạm vi nhỏ hơn md rồi.

---
## Câu A2 (10đ) — Utilities & Components
## Trả lòi
1. Giải thích class d-none d-md-block
Hai class này kết hợp theo nguyên tắc cascade của Bootstrap. d-none đặt display: none cho tất cả kích thước từ nhỏ nhất. d-md-block sau đó ghi đè bằng display: block khi màn hình đạt breakpoint md (từ 768px). Kết quả thực tế:
•Dưới 768px: element bị ẩn hoàn toàn (không chiếm chỗ trong layout).
•Từ 768px trở lên: element hiển thị bình thường dạng block.
Dùng trường hợp điển hình: ẩn sidebar hoặc menu ngang trên mobile, chỉ hiện trên tablet/desktop.

2. Năm spacing utilities phổ biến

Class	CSS tương đương	Giá trị thực	Dùng khi nào
mt-3	margin-top: 1rem	16px	Tạo khoảng cách phía trên element
px-4	padding-left + padding-right: 1.5rem	24px mỗi bên	Tạo padding ngang, thường dùng trong container/card
mb-auto	margin-bottom: auto	Tự tính	Đẩy element xuống đáy trong flex container
mx-auto	margin-left + margin-right: auto	Tự tính	Căn giữa block element theo chiều ngang
py-2	padding-top + padding-bottom: 0.5rem	8px mỗi bên	Tạo padding dọc, thường dùng trong button/nav item

3. Sự khác nhau giữa ba loại container
•.container: có max-width thay đổi theo breakpoint (540px / 720px / 960px / 1140px / 1320px). Tự động căn giữa, có margin ngang. Dùng cho layout nội dung chính cần giới hạn độ rộng.
•.container-fluid: luôn width: 100% ở mọi kích thước màn hình. Không có max-width. Dùng cho full-width section như hero, banner, footer.
•.container-md: hoạt động như container-fluid (100% width) khi dưới breakpoint md, và chuyển sang container thông thường (có max-width) từ md trở lên. Biến thể tương tự tồn tại cho sm, lg, xl, xxl. Dùng khi muốn full-width trên mobile nhưng centered trên desktop.



## PHẦN C — PHÂN TÍCH (20 điểm)
---
## Câu C1 (10đ) — Tùy biến Bootstrap
## Trả lời
1. Quy trình đổi màu $primary sang #E63946
Để thay đổi màu primary, cần công cụ biên dịch SASS. Bootstrap được viết bằng SCSS, vì vậy muốn override variable phải can thiệp vào source SCSS trước khi build.

Bước 1 — Cài dependencies: Chạy npm install bootstrap sass trong thư mục project.

Bước 2 — Tạo file custom.scss: Đây là file bạn trực tiếp chỉnh sửa, không bao giờ sửa trong node_modules.

// custom.scss

// Bước quan trọng: override TRƯỚC khi import
$primary: #E63946;

// Import Bootstrap sau khi đã override
@import "bootstrap/scss/bootstrap";

Bước 3 — Thêm script vào package.json: 
"scripts": {
  "sass": "sass src/scss/custom.scss src/css/style.css",
  "sass:watch": "sass --watch src/scss/custom.scss src/css/style.css"
}

Bước 4 — Chạy build: npm run sass hoặc npm run sass:watch khi đang phát triển.

Kết quả: toàn bộ btn-primary, bg-primary, text-primary, border-primary và mọi component dùng màu primary trong Bootstrap đều tự động đổi sang #E63946. Một dòng SASS thay cho hàng chục dòng CSS override.

2. Tại sao không nên override trực tiếp .btn-primary { background: red }
Có ba lý do chính để không dùng cách ghi đè CSS thuần:

Thứ nhất — không nhất quán: Override trực tiếp .btn-primary chỉ thay đổi màu nền của button. Nhưng Bootstrap còn dùng $primary cho bg-primary, text-primary, border-primary, badge, link màu primary, outline, focus ring, active state. Sẽ phải override từng class một — công sức gấp 10-20 lần.

Thứ hai — phải dùng !important: Do Bootstrap đã compile sẵn CSS với specificty nhất định, CSS custom của bạn đôi khi không đủ mạnh để ghi đè. Buộc phải thêm !important, dẫn đến code khó maintain về sau.

Thứ ba — không tận dụng hệ thống biến: Bootstrap thiết kế hệ thống theme colors dựa trên SASS variables chính xác là để customize. Không dùng SASS variables là đi ngược lại kiến trúc đã thiết kế sẵn, tự làm khó mình.

--- 
## Câu C2 (10đ) — So sánh Bootstrap vs CSS Thuần
## Trả lời
Navbar responsive — CSS thuần vs Bootstrap

CSS thuần cần viết toàn bộ logic: flexbox layout, hamburger button, toggle animation, dropdown, z-index stack, breakpoints. Ước tính khoảng 80-120 dòng CSS tối thiểu chưa kể JavaScript toggle.

/* CSS thuần — Navbar responsive (ước tính ~100 dòng) */
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #1e293b; }
.nav-links { display: flex; gap: 1.5rem; list-style: none; }
.hamburger { display: none; flex-direction: column; cursor: pointer; }
.hamburger span { width: 24px; height: 2px; background: white; margin: 3px 0; transition: 0.3s; }
@media (max-width: 768px) {
  .nav-links { display: none; flex-direction: column; position: absolute; width: 100%; background: #1e293b; }
  .nav-links.open { display: flex; }
  .hamburger { display: flex; }
}
/* + JavaScript: document.querySelector('.hamburger').addEventListener('click', ...) */

Bootstrap: viết HTML thuần với đúng class names, không cần CSS, không cần JavaScript vì Bootstrap JS đã xử lý toggle.

<!-- Bootstrap — Navbar responsive (0 dòng CSS + 0 dòng JS) -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
      </ul>
    </div>
  </div>
</nav>

Product card — CSS thuần vs Bootstrap

/* CSS thuần — Product Card (~50 dòng) */
.card { border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.1); transition: transform 0.2s; }
.card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,.15); }
.card-img { width: 100%; height: 200px; object-fit: cover; }
.card-body { padding: 1rem; }
.card-title { font-size: 1rem; font-weight: 600; margin-bottom: .5rem; }
.badge { position: absolute; top: 10px; right: 10px; padding: .25rem .6rem; border-radius: 20px; font-size: .75rem; }

<!-- Bootstrap — Product Card (0 dòng CSS) -->
<div class="card h-100 shadow-sm">
  <img src="product.jpg" class="card-img-top" style="height:200px;object-fit:cover">
  <div class="card-body">
    <h6 class="card-title fw-bold">Tên sản phẩm</h6>
    <p class="card-text text-muted small">Mô tả ngắn</p>
    <span class="badge bg-danger position-absolute top-0 end-0 m-2">Sale</span>
  </div>
</div>

Bảng so sánh tổng hợp

Tiêu chí	CSS Thuần	Bootstrap
Số dòng CSS cần viết (navbar + card)	~150 dòng	~0 dòng
Thời gian phát triển	2-4 giờ cơ bản	15-30 phút
JavaScript cần viết	~30 dòng (toggle)	0 — đã có sẵn
Cross-browser test	Tự test thủ công	Bootstrap đã test
Khả năng tùy biến design	Toàn quyền	Bị ràng buộc bởi Bootstrap style
Bundle size	Nhỏ, chỉ code bạn viết	Lớn hơn (~30KB min+gzip)
Đường cong học tập	Cao (CSS native)	Thấp (học class names)
Bảo trì dài hạn	Dễ nếu code sạch	Phụ thuộc vào version Bootstrap

Khi nào NÊN dùng Bootstrap
•Cần prototype nhanh trong vài tiếng để demo hoặc pitch.
•Làm admin panel, dashboard nội bộ — nơi tốc độ quan trọng hơn brand identity.
•Team nhỏ không có designer chuyên sâu, cần UI nhất quán mà không đầu tư thời gian.
•Dự án cần các component phức tạp như Modal, Carousel, Accordion — viết từ đầu tốn quá nhiều thời gian.
•Học lập trình web — muốn tập trung vào logic backend/JS hơn là CSS styling.

Khi nào KHÔNG NÊN dùng Bootstrap
•Dự án cần brand identity riêng biệt, thiết kế độc đáo — Bootstrap styles sẽ cản trở và việc override trở nên phức tạp hơn viết từ đầu.
•Landing page marketing cần hiệu năng tối đa — load thêm toàn bộ Bootstrap khi chỉ cần vài component là lãng phí.
•Bạn đang học CSS thuần — dùng Bootstrap sớm sẽ tạo thói quen phụ thuộc, mất đi nền tảng CSS thực sự.
•Dự án dùng TailwindCSS, CSS Modules hoặc CSS-in-JS — xung đột style khó debug, không nên trộn lẫn framework.
•Dự án nhỏ chỉ cần 2-3 component đơn giản — chi phí bundle size không xứng đáng.


— Hết PBT 06 —