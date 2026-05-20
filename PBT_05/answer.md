# phần A — kiểm tra đọc hiểu

---

## câu A1 (5đ) — viewport & mobile-first
## trả lời

**câu hỏi 1 — thẻ meta viewport chuẩn:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

giải thích từng thuộc tính:

`width=device-width` — báo trình duyệt đặt chiều rộng của viewport bằng chiều rộng thực tế của màn hình thiết bị. nếu điện thoại rộng 390px thì viewport cũng là 390px, không phải 980px giả lập như mặc định.

`initial-scale=1.0` — mức zoom ban đầu khi trang load là 1 (100%), tức không phóng to không thu nhỏ. nếu để mặc định không có thẻ này thì trình duyệt có thể tự quyết định mức zoom, dẫn đến trang bị thu nhỏ hoặc phóng to tuỳ ý.

**câu hỏi 2 — thiếu thẻ viewport trên iPhone:**

khi thiếu thẻ này, iPhone sẽ giả lập viewport rộng khoảng 980px (chiều rộng desktop truyền thống). toàn bộ trang web sẽ bị thu nhỏ xíu lại để vừa màn hình 390px. người dùng phải zoom in bằng tay để đọc, chữ nhỏ không bấm được nút, phải kéo ngang liên tục. dù CSS responsive có viết đúng đến đâu cũng vô nghĩa vì trang nghĩ nó đang hiển thị trên màn hình 980px trong khi thực tế là 390px.

**câu hỏi 3 — mobile-first vs desktop-first:**

mobile-first là viết CSS mặc định cho màn hình nhỏ nhất trước, rồi dùng `min-width` để thêm styles cho màn hình lớn hơn. ví dụ:

```css
/* mặc định: mobile */
.col { width: 100%; }

/* tablet trở lên */
@media (min-width: 768px) {
    .col { width: 50%; }
}
```

desktop-first là viết CSS mặc định cho màn hình lớn trước, rồi dùng `max-width` để thu nhỏ lại cho màn hình nhỏ hơn. ví dụ:

```css
/* mặc định: desktop */
.col { width: 50%; }

/* mobile */
@media (max-width: 768px) {
    .col { width: 100%; }
}
```

tại sao mobile-first được khuyên dùng: điện thoại tải ít CSS hơn vì CSS mặc định là mobile, không cần tải các rule desktop để rồi override. thiết bị yếu xử lý ít hơn nên trang load nhanh hơn. hơn 60% traffic web đến từ mobile nên ưu tiên mobile là đúng. progressive enhancement — bắt đầu từ cơ bản rồi thêm dần, thay vì bắt đầu phức tạp rồi cắt bớt.

nguồn tham chiếu: 13_creating_responsive_layouts.md — viewport meta tag, mobile-first vs desktop-first

---

## câu A2 (5đ) — breakpoints
## trả lời

breakpoints chuẩn theo Bootstrap:

xs nhỏ hơn 576px, đại diện cho điện thoại dọc như iPhone SE, Galaxy A. lưới sản phẩm nên hiển thị 1 cột vì màn hình quá hẹp, 2 cột sẽ làm ảnh và chữ quá nhỏ.

sm từ 576px trở lên, đại diện cho điện thoại ngang hoặc điện thoại lớn. lưới sản phẩm có thể hiển thị 2 cột, vẫn dễ nhìn và bấm.

md từ 768px trở lên, đại diện cho tablet như iPad. lưới sản phẩm nên 2 đến 3 cột, sidebar filter có thể bắt đầu xuất hiện hoặc chuyển dạng dropdown ngang.

lg từ 992px trở lên, đại diện cho laptop hoặc desktop nhỏ. lưới sản phẩm 3 đến 4 cột, sidebar có thể hiển thị đầy đủ bên cạnh.

xl từ 1200px trở lên, đại diện cho desktop lớn hoặc màn hình rộng. lưới sản phẩm 4 cột là thoải mái, thêm cột ads bên phải cũng được.

nguồn tham chiếu: 13_creating_responsive_layouts.md — breakpoints chuẩn Bootstrap

---

## câu A3 (5đ) — media queries
## trả lời

đọc lần lượt từng media query: CSS dùng `min-width` tức là query chỉ áp dụng khi màn hình đạt đến hoặc vượt qua kích thước đó. các query chồng lên nhau theo thứ tự, query sau (giá trị min-width lớn hơn) sẽ ghi đè query trước nếu cả 2 cùng áp dụng.

màn hình 375px — không breakpoint nào áp dụng vì 375px nhỏ hơn 576px, nên `.container` lấy width mặc định là 100%.

màn hình 600px — breakpoint `min-width: 576px` áp dụng nhưng `min-width: 768px` chưa đạt. `.container` có width là 540px.

màn hình 800px — breakpoint `min-width: 576px` và `min-width: 768px` đều áp dụng, nhưng 768px là query gần nhất và lớn nhất đang áp dụng. `.container` có width là 720px.

màn hình 1000px — breakpoint 576px, 768px, 992px đều áp dụng, query 992px ghi đè tất cả. `.container` có width là 960px.

màn hình 1400px — cả 4 breakpoint đều áp dụng, query 1200px là lớn nhất và thắng. `.container` có width là 1140px.

nguồn tham chiếu: 13_creating_responsive_layouts.md — media queries, min-width

---

## câu A4 (5đ) — SCSS basics
## trả lời

**tính năng 1 — variables:**

khai báo biến một lần, dùng khắp nơi. đổi 1 biến là toàn bộ stylesheet tự đổi theo.

```scss
$primary-color: #667eea;
$font-body: 'Inter', sans-serif;
$radius: 8px;

.btn {
    background: $primary-color;
    font-family: $font-body;
    border-radius: $radius;
}

.header {
    background: $primary-color; // đổi $primary-color thì cả btn lẫn header đổi
}
```

**tính năng 2 — nesting:**

viết CSS lồng theo cấu trúc HTML, không cần lặp lại tên class cha. dấu `&` đại diện cho selector cha.

```scss
.card {
    border-radius: 12px;
    overflow: hidden;

    .card-image {
        width: 100%;
    }

    .card-title {
        font-size: 18px;
        font-weight: 600;
    }

    &:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    &.featured {
        border: 2px solid $primary-color;
    }
}
```

**tính năng 3 — mixins:**

tạo "hàm CSS" dùng lại nhiều lần, có thể nhận tham số.

```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin card-shadow {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
}

.hero {
    @include flex-center;
    height: 100vh;
}

.product-card {
    @include card-shadow;
}
```

**tính năng 4 — @extend / inheritance:**

cho phép một selector kế thừa toàn bộ CSS của selector khác, tránh lặp code.

```scss
%btn-base {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
}

.btn-primary {
    @extend %btn-base;
    background: $primary-color;
    color: white;
}

.btn-secondary {
    @extend %btn-base;
    background: transparent;
    border: 1px solid $primary-color;
    color: $primary-color;
}
```

**tại sao trình duyệt không đọc được file .scss:**

trình duyệt chỉ hiểu HTML, CSS thuần và JavaScript. SCSS là ngôn ngữ preprocessor, có cú pháp mở rộng mà trình duyệt không biết xử lý. cần bước compile để chuyển SCSS thành CSS thuần trước khi trình duyệt đọc.

cách compile: cài extension "Live Sass Compiler" trong VS Code rồi nhấn "Watch Sass" ở thanh dưới, nó tự động compile mỗi khi lưu file. hoặc dùng npm: `npm install -g sass` rồi chạy `sass style.scss style.css`. trong dự án React hoặc Vue thì Webpack và Vite đã tích hợp sẵn, chỉ cần import file .scss là tự compile.

nguồn tham chiếu: 16_sass_scss.md — variables, nesting, mixins, @extend, cách chạy SCSS

---


# phần C — phân tích

---

## câu C1 (10đ) — phân tích trang web thực
## trả lời (phân tích Shopee)

**phân tích trên 3 kích thước màn hình:**

trên mobile 375px — navigation bar ẩn toàn bộ menu ngang, thay bằng thanh tìm kiếm cố định trên cùng với icon giỏ hàng và icon chat ở bên phải. danh mục sản phẩm hiển thị dạng icon nhỏ cuộn ngang thay vì danh sách. lưới sản phẩm hiển thị 2 cột nhỏ. banner hero chiếm full width. phần footer ẩn gần hết, chỉ còn thanh điều hướng dưới cùng (tab bar) gồm trang chủ, tìm kiếm, thông báo, tôi.

trên tablet 768px — navigation bắt đầu hiển thị logo Shopee và thanh tìm kiếm mở rộng hơn. lưới sản phẩm tăng lên 3 đến 4 cột. một số category menu bắt đầu xuất hiện dạng ngang phía dưới header. sidebar filter vẫn chưa hiển thị hoặc thu gọn thành dropdown.

trên desktop 1440px — navigation đầy đủ với logo, thanh tìm kiếm lớn ở giữa, icon giỏ hàng và thông báo bên phải, nav links danh mục phía dưới. lưới sản phẩm 5 đến 6 cột. sidebar filter xuất hiện bên trái. banner flash sale hiển thị đầy đủ với đồng hồ đếm ngược.

**những elements bị ẩn trên mobile:** footer đa cột với link thông tin công ty, sidebar filter, thanh danh mục ngang, một số banner phụ.

**font size thay đổi:** có, giá sản phẩm trên desktop khoảng 16px trong khi mobile khoảng 13px. tên sản phẩm cũng co lại.

**media queries tìm thấy trong DevTools:** thường thấy breakpoint 768px và 1200px là 2 điểm chính Shopee dùng. ví dụ `.shopee-product-grid { grid-template-columns: repeat(2, 1fr) }` trên mobile và `repeat(5, 1fr)` trên desktop.

---

## Câu C2 (10đ) — Thiết kế Responsive Strategy trang đặt bàn nhà hàng
## Trả lời

Trang web được thiết kế theo hướng mobile-first responsive design, ưu tiên trải nghiệm trên điện thoại trước, sau đó mở rộng bố cục cho tablet và desktop bằng media queries.

1. Mobile Layout

Trên mobile, giao diện được tối ưu cho màn hình nhỏ nên các thành phần sẽ xếp theo chiều dọc để dễ đọc và dễ thao tác bằng tay.

Wireframe Mobile
----------------------
|        HEADER      |
|  Logo              |
|  Số điện thoại     |
----------------------
|      HERO IMAGE    |
----------------------
|  FOOD | FOOD       |
|  FOOD | FOOD       |
|  FOOD | FOOD       |
----------------------
|    BOOKING FORM    |
|  Ngày              |
|  Giờ               |
|  Số người          |
|  Ghi chú           |
----------------------
|      GOOGLE MAP    |
----------------------
|       FOOTER       |
----------------------
Responsive strategy trên mobile
Header hiển thị logo và số điện thoại theo 2 dòng để tiết kiệm chiều ngang.
Hero image hiển thị full width với chiều cao khoảng 40vh.
Grid món ăn hiển thị 2 cột.
Form đặt bàn hiển thị full width bên dưới gallery ảnh.
Các trường input xếp dọc từng dòng để dễ bấm trên màn hình cảm ứng.
Google Maps nằm dưới form và chiếm toàn bộ chiều ngang.
Footer được rút gọn chỉ còn thông tin cần thiết như địa chỉ và copyright.
Một số nội dung phụ có thể bị ẩn để giảm chiều dài trang.

Ngoài ra, các input trên mobile sử dụng:

font-size: 16px;

để tránh iPhone tự động zoom khi focus vào input.

2. Tablet Layout

Trên tablet, không gian hiển thị lớn hơn nên bố cục được mở rộng theo dạng nhiều cột để tận dụng chiều ngang.

Wireframe Tablet
--------------------------------------
| LOGO                PHONE          |
--------------------------------------
|            HERO IMAGE              |
--------------------------------------
| FOOD | FOOD | FOOD                 |
| FOOD | FOOD | FOOD                 |
--------------------------------------
|      FORM      |       MAP         |
--------------------------------------
|              FOOTER                |
--------------------------------------
Responsive strategy trên tablet
Header chuyển sang layout ngang:
Logo bên trái
Số điện thoại bên phải
Grid món ăn hiển thị 3 cột.
Form đặt bàn được chia thành 2 cột:
Ngày và giờ nằm cùng hàng
Các trường lớn như ghi chú chiếm full width
Bản đồ Google Maps nằm cạnh form theo layout 50-50.
Khoảng cách giữa các section tăng lên để giao diện thoáng hơn.
3. Desktop Layout

Trên desktop, giao diện được tối ưu cho màn hình lớn với bố cục nhiều cột và nhiều khoảng trắng hơn.

Wireframe Desktop
---------------------------------------------------
| LOGO                     PHONE                   |
---------------------------------------------------
|                 HERO IMAGE                       |
---------------------------------------------------
| FOOD | FOOD | FOOD | FOOD | FOOD | FOOD         |
---------------------------------------------------
|         FORM         |        MAP + INFO         |
---------------------------------------------------
|     FOOTER MULTI COLUMN                          |
---------------------------------------------------
Responsive strategy trên desktop
Hero image tăng chiều cao khoảng 60vh.
Grid món ăn có thể:
hiển thị 6 cột 1 hàng
hoặc 3 cột x 2 hàng
Layout phần booking chia thành 2 cột lớn:
bên trái là form đặt bàn
bên phải là Google Maps và thông tin nhà hàng
Footer hiển thị dạng đa cột đầy đủ thông tin.
Header có thể sử dụng sticky header để logo và nút gọi điện luôn hiển thị khi scroll.
Không cần sidebar vì nội dung chính đã đủ rõ ràng và tập trung.
4. CSS Skeleton Responsive Strategy
@media (min-width: 768px) {

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .booking-section {
        flex-direction: row;
    }
}

@media (min-width: 1024px) {

    .food-grid {
        grid-template-columns: repeat(6, 1fr);
    }

    .booking-section {
        gap: 40px;
    }

    .footer {
        grid-template-columns: repeat(4, 1fr);
    }
}
5. Kết luận

Chiến lược responsive của trang tập trung vào:

Mobile-first design
Grid layout linh hoạt theo kích thước màn hình
Form dễ thao tác trên thiết bị cảm ứng
Tối ưu trải nghiệm đặt bàn trên mọi thiết bị
Sử dụng media queries để mở rộng bố cục từ mobile → tablet → desktop

Thiết kế này giúp giao diện vừa dễ sử dụng trên điện thoại, vừa tận dụng tốt không gian hiển thị trên tablet và desktop.
nguồn tham chiếu: 13_creating_responsive_layouts.md — mobile-first, media queries, responsive images, navigation; 14_styling_with_css.md — transitions, animations, shadows; 15_testing_organizing.md — BEM naming, modular CSS; 16_sass_scss.md — variables, nesting, mixins, partials