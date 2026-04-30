# PHẦN A: ĐỌC HIỂU

---

## Câu A1 (5đ) — HTTP & Browser

**1.** Khi bạn gõ `https://shopee.vn` vào trình duyệt và nhấn Enter, hãy liệt kê đúng thứ tự ít nhất 5 bước xảy ra (từ DNS lookup đến render).

**2.** Trong DevTools của Chrome, tab Network cho thấy thông tin gì? Hãy mở một trang web bất kỳ, chụp screenshot tab Network và đánh dấu (vẽ mũi tên/khoanh tròn) vào:
- Status Code của request đầu tiên
- Tổng thời gian load trang
- Một request trả về file CSS

### Trả lời

**Câu 1:** Khi bạn gõ `https://shopee.vn` vào trình duyệt và nhấn Enter, các 5 bước xảy ra từ DNS lookup đến render:

- **Bước 1:** Tìm địa chỉ của Shopee (DNS lookup)
- **Bước 2:** Gửi yêu cầu đến server (HTTP Request)
- **Bước 3:** Server nhận được yêu cầu sau đó xử lý yêu cầu
- **Bước 4:** Server trả dữ liệu về (HTTP Response)
- **Bước 5:** Trình duyệt hiện trang shopee

> <sub>Nguồn tham chiếu: 01_introduction_html_universe.md + 1.1. Kiến trúc Client-Server — "Nhà hàng Online"</sub>

---

**Câu 2:** Trong DevTools của Chrome, tab Network cho thấy thông tin về requests/responses.

![Network Tab Screenshot](screeenshots/A1_2.png)

- **Status Code** request đầu tiên: `200`
- **Tổng thời gian load:** Finish `3.64s`
- **File CSS:** `f4a8867675.css`

> <sub>Nguồn tham chiếu: 01_introduction_html_universe.md + 4.3. Developer Tools (F12) — "Kính hiển vi" cho website</sub>

---

## Câu A2 (5đ) — Semantic HTML

Đọc chương 04, trả lời: Tại sao trang web dưới đây bị Google đánh giá SEO thấp? Liệt kê ít nhất 4 lỗi semantic và sửa lại.

```html
<div class="header">
    <div class="logo">ShopTLU</div>
    <div class="menu">
        <div><a href="/">Trang chủ</a></div>
        <div><a href="/products">Sản phẩm</a></div>
    </div>
</div>
<div class="main">
    <div class="product">
        <div class="title">iPhone 16 Pro</div>
        <div class="price">25.990.000đ</div>
        <div class="image"><img src="iphone.jpg"></div>
    </div>
</div>
<div class="footer">© 2026 ShopTLU</div>
```

### Trả lời

**Lí do bị Google đánh giá SEO thấp:** Trang web trên bị "div soup" (Google không hiểu cấu trúc trang).

8 lỗi semantic và cách sửa:

1. `<div class="header">` → đổi thành `<header>`
2. `<div class="menu">` → đổi thành `<nav>`
3. `<div class="main">` → đổi thành `<main>`
4. `<div class="product">` → đổi thành `<article>`
5. `<div class="title">` → đổi thành `<h2>`
6. `<div class="price">` → đổi thành `<p>`
7. `<div class="image"><img src="iphone.jpg"></div>` → thêm thuộc tính `alt="iPhone 16 Pro"` vào thẻ img
8. `<div class="footer">` → đổi thành `<footer>`

**Code sau khi hoàn chỉnh:**

```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>
<main>
    <article class="product">
        <h2>iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <div class="image">
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </div>
    </article>
</main>
<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

> <sub>Nguồn tham chiếu: 04_visible_part_html.md + Semantic HTML5 — "Thẻ có ý nghĩa"</sub>

---

## Câu A3 (5đ) — Block vs Inline

```html
<div>Hộp 1</div>
<span>Text A</span>
<span>Text B</span>
<div>Hộp 2</div>
<span>Text C</span>
<strong>Text D</strong>
<div>Hộp 3</div>
```

### Trả lời

**Hình minh họa:**

```
+--------------------------------------+
|              Hộp 1                   |
+--------------------------------------+

[ Text A ] [ Text B ]

+--------------------------------------+
|              Hộp 2                   |
+--------------------------------------+

[ Text C ] [ Text D ]

+--------------------------------------+
|              Hộp 3                   |
+--------------------------------------+
```

Trong đoạn HTML này, thẻ `<div>` là **block element**, nên mỗi lần xuất nó sẽ chiếm toàn bộ chiều ngang và tự động xuống dòng. Vì vậy các phần "Hộp 1", "Hộp 2" và "Hộp 3" sẽ mỗi cái nằm trên một dòng riêng.

Còn thẻ `<span>` và `<strong>` là **inline element**, nên chúng chỉ chiếm đúng phần nội dung của mình và không xuống dòng. Vì vậy "Text A" và "Text B" sẽ nằm trên cùng một dòng, tương tự "Text C" và "Text D" cũng nằm trên một dòng.

> <sub>Nguồn tham chiếu: 04_visible_part_html.md + Block vs Inline - Hai loại element cơ bản</sub>

---

## Câu A4 (5đ) — Table

### Trả lời

Trong một bảng HTML, `<thead>`, `<tbody>` và `<tfoot>` dùng để phân chia cấu trúc của bảng:

- `<thead>` — phần đầu bảng, chứa tiêu đề của các cột
- `<tbody>` — phần thân bảng, chứa dữ liệu chính
- `<tfoot>` — phần cuối bảng, thường dùng để hiển thị tổng kết hoặc thông tin bổ sung

**Lí do không nên dùng `<table>` để tạo layout trang web:**

1. Thẻ `<table>` được thiết kế để biểu diễn dữ liệu dạng bảng (tabular data), vì vậy việc sử dụng cho mục đích bố cục (layout) là không đúng ngữ nghĩa (semantic).
2. Việc sử dụng `<table>` để xây dựng layout làm cấu trúc HTML trở nên phức tạp, lồng nhiều cấp (nested), gây khó khăn trong việc đọc hiểu và bảo trì mã nguồn.
3. Layout dựa trên `<table>` không linh hoạt và không hỗ trợ tốt thiết kế responsive, dẫn đến hiển thị kém trên các thiết bị có kích thước màn hình khác nhau, đặc biệt là thiết bị di động.
4. Các phương pháp hiện đại như CSS Flexbox và CSS Grid cung cấp khả năng xây dựng layout hiệu quả, linh hoạt và phù hợp hơn với tiêu chuẩn phát triển web hiện nay.

---

# PHẦN B: THỰC HÀNH CODE

---

## Bài B3 (15đ) — Debug HTML

### Trả lời

12 lỗi tìm được và cách sửa:

1. Dòng 1 — `<!DOCTYPE>` sai chuẩn → sửa thành `<!DOCTYPE html>`
2. Dòng 4 — `<title>` không đóng thẻ → thêm `</title>`
3. Dòng 5 — charset sai (`utf8`) → sửa thành `UTF-8`
4. Dòng 9 — `<h1>` không đóng đúng → sửa thành `</h1>`
5. Dòng 13 — `<a>` không đóng thẻ → sửa thành `</a>`
6. Dòng 21 — `<img>` thiếu dấu ngoặc kép và alt → sửa thành `<img src="iphone.jpg" alt="iPhone 16 Pro">`
7. Dòng 23 — thẻ `<b>` lồng sai vị trí → sửa lại đúng nesting
8. Dòng 23 — nên dùng `<strong>` thay vì `<b>` (semantic)
9. Dòng 30 — bảng thiếu `<thead>`, `<tbody>` → bổ sung semantic table
10. Dòng 40 — dùng 2 thẻ `<main>` (chỉ được 1) → đổi cái thứ 2 thành `<aside>`
11. Dòng 46 — `<p>` trong footer không đóng → thêm `</p>`
12. Thiếu thuộc tính `lang` trong `<html>` → thêm `lang="vi"`

---

## Bài B4 (15đ) — Phân tích trang web thật

### Trả lời

**Trang được chọn:** `thegioididong.com`

**1. Phân tích Semantic HTML**

![Semantic HTML Analysis](screeenshots/B4_1.png)

**3 thẻ semantic HTML5 trang sử dụng:**
- `<header>` — nằm ở phần đầu trang, chứa logo, banner và menu điều hướng
- `<footer>` — nằm ở cuối trang (`<footer class="footer v2024">`)
- `<h1>` — tồn tại trong DOM (`<h1 class="sc-only">`) dùng cho SEO

**2 thẻ trang KHÔNG dùng đúng semantic:**
- `<div class="header-top-bar">`
- `<div class="banner-media">`

---

**2. Phân tích Table**

![Table Analysis](screeenshots/B4_2.png)

Table trong trang hiển thị thông tin mô tả về loại điện thoại, cụ thể là hệ điều hành Android và các đặc điểm của nó như tính phổ biến và việc được nhiều hãng sử dụng. Table này có sử dụng thẻ `<tbody>` và không có thẻ `<thead>`.

---

**3. Phân tích Form**

![Form Analysis](screeenshots/B4_3.png)

Form được sử dụng cho chức năng tìm kiếm sản phẩm trên trang.
- **Action:** `/tim-kiem`
- **Method:** Không khai báo

**Các input types được sử dụng:**
- `type="text"` — ô nhập nội dung tìm kiếm
- `type="submit"` — nút gửi yêu cầu tìm kiếm

---

# PHẦN C: SUY LUẬN

---

## Câu C1 (10đ) — Thiết kế cấu trúc

Bạn được giao thiết kế cấu trúc HTML cho trang chi tiết sản phẩm (giống trang sản phẩm Shopee/Tiki). Trang bao gồm:

- Header + Navigation
- Breadcrumb (Trang chủ > Điện thoại > iPhone 16)
- Khu vực ảnh sản phẩm (5 ảnh)
- Thông tin sản phẩm (tên, giá, đánh giá sao, mô tả)
- Bảng thông số kỹ thuật
- Khu vực đánh giá/bình luận
- Sidebar: Sản phẩm tương tự
- Footer

> **Yêu cầu:** Viết chỉ phần cấu trúc HTML (không cần nội dung thật, chỉ cần đúng thẻ và nesting). Mỗi thẻ phải có comment giải thích tại sao bạn chọn thẻ đó.

### Trả lời

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Chi tiết sản phẩm</title>
</head>
<body>

    <!-- Header: phần đầu trang chứa logo và điều hướng -->
    <header>
        <!-- Navigation: menu chính của website -->
        <nav>
            <a href="#">Trang chủ</a>
            <a href="#">Sản phẩm</a>
            <a href="#">Liên hệ</a>
        </nav>
    </header>

    <!-- Breadcrumb: thể hiện vị trí trang hiện tại -->
    <nav aria-label="breadcrumb">
        <a href="#">Trang chủ</a> >
        <a href="#">Điện thoại</a> >
        <span>iPhone 16</span>
    </nav>

    <!-- Main: nội dung chính của trang -->
    <main>

        <!-- Section: khu vực chi tiết sản phẩm -->
        <section class="product-detail">

            <!-- Article: một sản phẩm độc lập -->
            <article>

                <!-- Section: khu vực ảnh sản phẩm -->
                <section class="product-images">
                    <!-- Figure: mỗi ảnh có thể kèm chú thích -->
                    <figure><img src="#" alt="Ảnh 1"></figure>
                    <figure><img src="#" alt="Ảnh 2"></figure>
                    <figure><img src="#" alt="Ảnh 3"></figure>
                    <figure><img src="#" alt="Ảnh 4"></figure>
                    <figure><img src="#" alt="Ảnh 5"></figure>
                </section>

                <!-- Section: thông tin sản phẩm -->
                <section class="product-info">
                    <!-- Heading: tên sản phẩm -->
                    <h1>Tên sản phẩm</h1>

                    <!-- Giá sản phẩm -->
                    <p class="price">Giá</p>

                    <!-- Đánh giá -->
                    <p class="rating">Đánh giá sao</p>

                    <!-- Mô tả -->
                    <p class="description">Mô tả sản phẩm</p>
                </section>

                <!-- Section: bảng thông số kỹ thuật -->
                <section class="specifications">
                    <!-- Table: dùng cho dữ liệu dạng bảng -->
                    <table>
                        <thead>
                            <tr>
                                <th>Thông số</th>
                                <th>Giá trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ví dụ</td>
                                <td>Chi tiết</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <!-- Section: đánh giá / bình luận -->
                <section class="reviews">
                    <h2>Đánh giá</h2>
                    <article>
                        <p>Bình luận 1</p>
                    </article>
                    <article>
                        <p>Bình luận 2</p>
                    </article>
                </section>

            </article>

        </section>

        <!-- Aside: sidebar sản phẩm liên quan -->
        <aside>
            <h2>Sản phẩm tương tự</h2>
            <article>Sản phẩm 1</article>
            <article>Sản phẩm 2</article>
        </aside>

    </main>

    <!-- Footer: phần cuối trang -->
    <footer>
        <p>© 2026</p>
    </footer>

</body>
</html>
```

---

## Câu C2 (10đ) — So sánh & Tranh luận

Một đồng nghiệp nói: *"Dùng `<div>` cho mọi thứ rồi thêm class là được, không cần semantic HTML. Tốn thời gian học thêm thẻ mới."*

> **Yêu cầu:** Viết 1 đoạn phản biện (200–300 từ), phải bao gồm: ít nhất 2 lý do kỹ thuật (SEO, Accessibility), 1 ví dụ cụ thể chứng minh semantic HTML giúp ích, 1 trường hợp thực tế mà `<div>` vẫn phù hợp.

### Trả lời

Quan điểm "chỉ dùng `<div>` cho mọi thứ" là không phù hợp về mặt kỹ thuật.

**Thứ nhất, về SEO:** semantic HTML giúp công cụ tìm kiếm hiểu cấu trúc trang. Các thẻ như `<header>`, `<nav>`, `<main>`, `<article>` cung cấp ngữ nghĩa rõ ràng, từ đó hỗ trợ việc phân tích nội dung và cải thiện thứ hạng tìm kiếm. Ngược lại, việc sử dụng `<div>` cho toàn bộ cấu trúc (div soup) làm mất ngữ nghĩa, khiến Google khó xác định nội dung chính của trang.

**Thứ hai, về Accessibility:** semantic HTML hỗ trợ các công cụ như screen reader xác định vai trò của từng khu vực trên trang. Ví dụ, `<nav>` giúp người dùng định hướng nhanh, `<main>` xác định nội dung chính. Nếu chỉ dùng `<div>`, các công cụ này không thể cung cấp trải nghiệm truy cập hiệu quả.

**Ví dụ cụ thể:** trong một trang thương mại điện tử, mỗi sản phẩm nên được đặt trong `<article>`. Điều này giúp công cụ tìm kiếm nhận diện đây là một đơn vị nội dung độc lập, từ đó cải thiện khả năng hiển thị trên kết quả tìm kiếm.

Tuy nhiên, `<div>` vẫn có vai trò nhất định. Trong trường hợp cần tạo container cho mục đích layout hoặc styling, khi không có thẻ semantic phù hợp, việc sử dụng `<div>` là hợp lý.

**Kết luận:** semantic HTML là cần thiết để đảm bảo tính rõ ràng, khả năng truy cập và tối ưu hóa công cụ tìm kiếm; `<div>` chỉ nên sử dụng khi không có lựa chọn semantic phù hợp.

---

# PHẦN D: VIDEO THỰC HÀNH

**Link video PBT01:** https://youtu.be/tsu2U-7n3Hk
