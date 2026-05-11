

# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

## Câu A1 (5đ) — 3 Cách nhúng CSS
## Trả lời
Cách 1. Inline CSS

```
<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
```

- Ưu điểm: Nhanh, ghi đè mọi style khác, không cần tạo file riêng
- Nhược điểm: Khó bảo trì, không tái sử dụng được, trộn lẫn HTML và CSS, làm code rối
- Dùng khi: Debug nhanh, style duy nhất cho 1 element cụ thể không lặp lại ở đâu khác

Cách 2. Internal CSS

```
<head>
    <style>
        h1 { color: red; font-size: 24px; }
        .btn { background: blue; }
    </style>
</head>
```

- Ưu điểm: Không cần file riêng, style áp dụng toàn trang, tiện cho trang đơn lẻ
- Nhược điểm: Không tái sử dụng được giữa nhiều trang HTML, làm file HTML nặng hơn, không được cache riêng
- Dùng khi: Prototype nhanh, email HTML, trang đơn lẻ không chia sẻ style với trang khác

Cách 3. External CSS

```
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

- Ưu điểm: Tái sử dụng giữa nhiều trang, tách biệt HTML và CSS, trình duyệt cache được file CSS (tải nhanh hơn lần sau), dễ bảo trì
- Nhược điểm: Cần thêm HTTP request, nếu file CSS chưa tải xong trang sẽ không có style
- Dùng khi: Dự án thực tế, nhiều trang HTML chia sẻ cùng style — đây là chuẩn production

### Câu hỏi thêm: Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào thắng?

Inline CSS thắng. Thứ tự ưu tiên: Inline (1000) > Internal/External (phụ thuộc selector).

Giải thích: Inline style có specificity tương đương 1000 điểm — cao hơn mọi selector trong file CSS. Internal và External có độ ưu tiên ngang nhau; nếu cùng selector thì rule nào được khai báo sau cùng sẽ thắng (source order). Vì vậy nếu `<link>` đặt trước `<style>` thì Internal thắng External, và ngược lại.

Nguồn tham chiếu: 08_introduction_css.md -🎨 3 cách thêm CSS + 09_css_selectors.md (Specificity) - ⚖️ Specificity — "Ai thắng khi xung đột?

---

## Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả
## Trả lời
HTML mẫu đã cho:

```
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>
```

1. Selector `h1`

Selector này chọn tất cả thẻ `<h1>` trong trang.  
Kết quả nhận được là:

"ShopTLU"

2. Selector `.price`

Selector này chọn tất cả element có class `price`.  
Kết quả nhận được gồm:

- "25.990.000đ"
- "45.990.000đ"

3. Selector `#app header`

Selector này chọn thẻ `<header>` nằm bên trong element có id `app`.  
Kết quả là:

`<header class="top-bar dark">`

4. Selector `nav a:first-child`

Selector này chọn thẻ `<a>` đầu tiên nằm trong `<nav>`.  
Kết quả là:

"Home"

5. Selector `.product.featured h2`

Selector này chọn thẻ `<h2>` nằm trong element có đồng thời class `product` và `featured`.  
Kết quả là:

"MacBook Pro"

6. Selector `article > p`

Selector này chọn tất cả thẻ `<p>` là con trực tiếp của `<article>`.  
Kết quả gồm:

- "25.990.000đ"
- "Mô tả sản phẩm..."
- "45.990.000đ"
- "Mô tả sản phẩm..."

7. Selector `a[href="/"]`

Selector này chọn thẻ `<a>` có thuộc tính `href="/"`.  
Kết quả là:

"Home"


8. Selector `.top-bar.dark h1`

Selector này chọn thẻ `<h1>` nằm bên trong phần tử có đồng thời class `top-bar` và `dark`.  
Kết quả là:

"ShopTLU"

**Giải thích chi tiết các trường hợp quan trọng:**

- Selector 3 (`#app header`): Đây là descendant selector, chọn bất kỳ `<header>` nào nằm trong `#app`, không nhất thiết phải là con trực tiếp.
- Selector 5 (`.product.featured`): Hai class viết liền nhau = phần tử phải có CẢ HAI class. Chỉ article thứ 2 thỏa mãn.
- Selector 6 (`article > p`): Dấu `>` = chỉ con TRỰC TIẾP. Cả 4 thẻ `<p>` đều là con trực tiếp của `<article>` nên đều được chọn.

Nguồn tham chiếu: 09_css_selectors.md — Combinator Selectors, Attribute Selector, Pseudo-classes

---

## Câu A3 (7đ) — Box Model — Tính toán kích thước
## Trả lời
Trường hợp 1: content-box (mặc định)

```
.box-1 {
    width: 400px;      /* Content width */
    padding: 20px;     /* +20px mỗi bên = +40px */
    border: 5px solid black;   /* +5px mỗi bên = +10px */
    margin: 10px;      /* +10px mỗi bên = +20px (không tính vào render box) */
}
```

- Chiều rộng hiển thị (render) = width + padding×2 + border×2 = 400 + 40 + 10 = 450px
- Không gian chiếm trên trang = 450 + margin×2 = 450 + 20 = 470px

Trường hợp 2: border-box

```
.box-2 {
    box-sizing: border-box;
    width: 400px;      /* Tổng chiều rộng = đúng 400px */
    padding: 20px;     /* Co vào trong */
    border: 5px solid black;   /* Co vào trong */
    margin: 10px;
}
```

- Chiều rộng hiển thị = 400px (đúng như đặt — border-box giữ nguyên)
- Kích thước content thực tế = 400 - padding×2 - border×2 = 400 - 40 - 10 = 350px
- Không gian chiếm trên trang = 400 + margin×2 = 400 + 20 = 420px

 Trường hợp 3: Margin Collapse

```
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```

- Khoảng cách giữa box-a và box-b = 40px (KHÔNG PHẢI 65px)
- Giải thích:** Đây là hiện tượng Margin Collapse(margin bị gộp). Khi hai block element nằm dọc cạnh nhau, margin trên/dưới của chúng KHÔNG cộng dồn mà lấy giá trị lớn hơn. CSS lấy max(25, 40) = 40px. Margin ngang (trái/phải) không bị ảnh hưởng bởi collapse.

**Nâng cao:** `.box-a { margin-bottom: -10px; }` và `.box-b { margin-top: 40px; }`

-> Khoảng cách = 40 + (-10) = 30px

Khi có margin âm, CSS cộng đại số: giá trị dương lớn nhất + giá trị âm nhỏ nhất = 40 + (-10) = 30px.

Nguồn tham chiếu: 11_box_model.md — Classic Box Model, Margin Collapse

---

## Câu A4 (5đ) — Specificity
## Trả lời
```
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */
```

Element: `<p class="price" id="main-price">`

1. Tính specificity score (a, b, c):

Rule A: Selector p có:

ID = 0
Class = 0
Tag = 1
-> Score: (0,0,1)

Rule B: Selector .price có:

ID = 0
Class = 1
Tag = 0
-> Score: (0,1,0)

Rule C: Selector #main-price có:

ID = 1
Class = 0
Tag = 0
→ Score: (1,0,0)

Rule D: Selector p.price có:

ID = 0
Class = 1
Tag = 1
→ Score: (0,1,1)

 2. Element có màu gì?

Màu đỏ (red) — Rule C thắng vì có ID selector với specificity (1,0,0) cao hơn tất cả.

Thứ tự thắng thua: C (1,0,0) > D (0,1,1) > B (0,1,0) > A (0,0,1)

 3. Nếu thêm inline style `style="color: orange"`?

Màu cam (orange) — Inline style có specificity tương đương (1,0,0,0), cao hơn mọi selector kể cả ID selector.

 4. Nếu Rule A thêm `!important`?

Màu đen (black) — `!important` override toàn bộ specificity thông thường, kể cả inline style. `p { color: black !important; }` sẽ thắng tất cả rules còn lại.

Nguồn tham chiếu: 09_css_selectors.md (Specificity Table) + 10_inheritance_cascading.md (Cascade)

---

# PHẦN C — DEBUG & SUY LUẬN

---

## Câu C1 (10đ) — Debug CSS Layout
## Trả lời
 1. Tính chiều rộng thực tế (content-box):

```
.sidebar { width: 300px; padding: 20px; border: 1px solid #ccc; }
.content { width: 660px; padding: 30px; border: 1px solid #ccc; }
```

- Sidebar thực tế = 300 + (20×2) + (1×2) = 300 + 40 + 2 = 342px
- Content thực tế = 660 + (30×2) + (1×2) = 660 + 60 + 2 = 722px
- Tổng = 342 + 722 = 1064px > 960px -> Vượt quá container!

2. Giải thích tại sao layout bị vỡ:

Vì đang dùng `box-sizing: content-box` (mặc định), khi đặt `padding` và `border`, kích thước thực tế lớn hơn `width` đã khai báo. Sidebar tính 300px nhưng thực tế chiếm 342px; content tính 660px nhưng thực tế chiếm 722px. Tổng 1064px vượt container 960px → content bị đẩy xuống dòng mới.

 3. Hai cách sửa:

Cách 1 — Dùng border-box:
```
* { box-sizing: border-box; }
/* Width giữ nguyên 300 và 660, padding/border co vào trong */
/* Tổng = 300 + 660 = 960px ✅ */
```

Cách 2 — Không dùng border-box (giảm width thủ công):
```
.sidebar {
    width: 258px;   /* 300 - padding(40) - border(2) = 258 → thực tế = 300px */
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 598px;   /* 660 - padding(60) - border(2) = 598 → thực tế = 660px */
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
/* Tổng thực tế = 300 + 660 = 960px ✅ */
```

File kiểm chứng: `debug_layout.html` + `debug_layout.css`

---

## Câu C2 (10đ) — Cascade Puzzle

```
body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }
```
## Trả lời

Phân tích từng phần tử:

1. "Sản phẩm A" (h2.title.highlight trong #featured.card):

- font-size = 20px
  Áp dụng: `.card .title { font-size: 20px; }` (specificity 0,2,0) — rule duy nhất có font-size cho .title → 20px
  
- color = green
  Các rule tranh nhau:
  - `.card { color: blue; }` -> (0,1,0) — kế thừa qua inheritance
  - `#featured .title { color: red; }` -> (1,1,0)
  - `.highlight { color: green !important; }` -> (0,1,0) + !important
  
  `!important` thắng tất cả → color = green

2. "Mô tả sản phẩm" (p thường, không có class, trong #featured.card):

- color = blue
  `.card p { color: inherit; }` ->inherit từ element cha gần nhất là `.card` → `.card { color: blue; }` -> blue
  
  (Lưu ý: `.card p` có specificity (0,1,1), nhưng giá trị là `inherit` nên lấy màu của cha là `.card` = blue)

3. "Sản phẩm B" (h2.title trong .card thông thường, không có id):

- font-size = 20px
  `.card .title { font-size: 20px; }` áp dụng -> 20px
  
- color = blue
  Không có rule đặt color trực tiếp cho h2.title (không phải #featured). `.card { color: blue; }` áp dụng cho .card, h2 kế thừa từ đó. `.card .title` chỉ đặt font-size, không đặt color → kế thừa từ `.card` ->blue

4. "Mô tả sản phẩm B" (p.highlight trong .card thứ 2):

- color = green
  `.highlight { color: green !important; }` áp dụng trực tiếp cho element này. `!important` override mọi rule khác (kể cả `.card p { color: inherit; }` và `.card { color: blue; }`) → green

### Tóm tắt kết quả:

Phần tử "Sản phẩm A" (h2#featured) có:

font-size: 20px
color: green (!important)

Phần tử "Mô tả sản phẩm" (p trong #featured) có:

font-size: 14px (kế thừa từ .container)
color: blue (inherit từ .card)

Phần tử "Sản phẩm B" (h2 thường) có:

font-size: 20px
color: blue (kế thừa từ .card)

Phần tử "Mô tả sản phẩm B" (p.highlight) có:

font-size: 14px (kế thừa từ .container)
color: green (!important)

File kiểm chứng: `cascade_test.html` + `cascade.css`

Nguồn tham chiếu: 09_css_selectors.md (Specificity) + 10_inheritance_cascading.md (Cascade + Inheritance)

---

# PHẦN B — THỰC HÀNH CODE

## Bài B1 — Selectors trong CSS (profile.html + style.css)
File: `profile.html` + `style.css`

Các loại selector đã sử dụng:
1. Element selector: `body`, `table`, `h1`, `footer`
2. Class selector: `.nav-links`, `.skills-table`
3. ID selector: `#main-header`
4. Descendant selector: `.nav-links a`
5. Pseudo-class: `a:hover`, `tr:nth-child(even)`, `tr:hover`, `.nav-links a.active`

## Bài B2 — Box Model Lab (boxmodel_lab.html + boxmodel.css)

### Phần 1 — content-box vs border-box:

- Hộp 1 (content-box): chiều rộng thực tế = 300 + 20×2 + 5×2 = 350px(đo từ DevTools)
- Hộp 2 (border-box): chiều rộng thực tế = 300px (đo từ DevTools)
- Giải thích: content-box cộng padding và border vào ngoài width -> to hơn 50px. border-box gói padding và border vào trong width đã đặt -> luôn đúng 300px.

Phần 2 — Layout 3 cột (1000px container):

Nếu KHÔNG dùng border-box:
- Sidebar: 250 + 15×2 = 280px thực tế
- Content: 500 + 20×2 = 540px thực tế
- Ads: 250 + 15×2 = 280px thực tế
- Tổng: 280 + 540 + 280 = **1100px > 1000px → vỡ layout

Nếu dùng border-box:
- Sidebar: 250px, Content: 500px, Ads: 250px
- Tổng: 250 + 500 + 250 = 1000px

## Bài B3 — Specificity Battle (specificity.html + specificity.css)

Element: `<p id="demo" class="text highlight">Hello World</p>`

10 rules từ thấp đến cao:

Rule 1: * { color: ...; }

Specificity: (0,0,0)
Color: dimgray

Rule 2: p { color: ...; }

Specificity: (0,0,1)
Color: slategray

Rule 3: div p { color: ...; }

Specificity: (0,0,2)
Color: steelblue

Rule 4: .text { color: ...; }

Specificity: (0,1,0)
Color: teal

Rule 5: .highlight { color: ...; }

Specificity: (0,1,0)
Color: darkcyan

Rule 6: p.text { color: ...; }

Specificity: (0,1,1)
Color: mediumblue

Rule 7: p.text.highlight { color: ...; }

Specificity: (0,2,1)
Color: darkviolet

Rule 8: #demo { color: ...; }

Specificity: (1,0,0)
Color: darkred

Rule 9: #demo.text { color: ...; }

Specificity: (1,1,0)
Color: crimson

Rule 10: #demo.text.highlight { color: ...; }

Specificity: (1,2,1)
Color: hotpink ← thắng vì có độ ưu tiên cao nhất.

Element cuối cùng hiển thị màu hotpink vì rule 10 có specificity (1,2,1) cao nhất.

Thay đổi thứ tự rules: Nếu 2 rules có cùng specificity thì thứ tự quan trọng (rule sau thắng). Nhưng nếu specificity khác nhau (như 10 rules trên) thì đổi thứ tự KHÔNG thay đổi kết quả — specificity luôn quyết định.