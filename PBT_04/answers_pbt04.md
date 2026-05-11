

# phần A — kiểm tra đọc hiểu

---

## câu A1 (10đ) — 5 loại positioning
## trả lời

position static:

vẫn chiếm chỗ trong flow: có

tham chiếu vị trí: không có mốc, top/left/right/bottom không hoạt động

cuộn theo trang: có

use case: đây là giá trị mặc định, không cần khai báo, dùng khi không cần dịch chuyển element

position relative:

vẫn chiếm chỗ trong flow: có

tham chiếu vị trí: chính element đó (so với vị trí gốc của nó)

cuộn theo trang: có

use case: dịch chuyển nhẹ element so với vị trí gốc, hoặc làm mốc tọa độ cho các element absolute bên trong

position absolute:

vẫn chiếm chỗ trong flow: không, element bị "bay ra" khỏi layout

tham chiếu vị trí: cha gần nhất có position khác static (nearest positioned ancestor)

cuộn theo trang: có (cuộn cùng trang, không dính như fixed)

use case: badge số lượng trên icon giỏ hàng, dropdown menu, tooltip

position fixed:

vẫn chiếm chỗ trong flow: không

tham chiếu vị trí: viewport (cửa sổ trình duyệt)

cuộn theo trang: không, luôn dính cố định dù scroll

use case: chat button góc màn hình, header cố định, modal overlay

position sticky:

vẫn chiếm chỗ trong flow: có (cho đến khi dính, sau đó hành xử như fixed)

tham chiếu vị trí: vị trí gốc trong flow, khi đạt ngưỡng scroll thì tham chiếu viewport

cuộn theo trang: ban đầu có, sau khi đạt ngưỡng (ví dụ top: 0) thì dính lại

use case: sticky header, sticky sidebar, thanh điều hướng dính khi scroll

**câu hỏi thêm**: khi nào absolute tham chiếu body, khi nào tham chiếu parent?

absolute tìm đến cha gần nhất có position khác static để làm mốc tọa độ. đây gọi là "nearest positioned ancestor".

nếu element cha trực tiếp có position: relative thì absolute tham chiếu cha đó.

nếu không có cha nào có position khác static (tức tất cả cha đều là static) thì absolute sẽ leo lên tận body và tham chiếu body.

ví dụ minh họa:

```
<div class="parent">          <!-- position: relative → mốc -->
    <span class="badge">5</span>   <!-- position: absolute → bám vào .parent -->
</div>
```

```
<div class="wrapper">         <!-- position: static (mặc định) → bỏ qua -->
    <span class="badge">5</span>   <!-- position: absolute → leo lên, tham chiếu body -->
</div>
```

vì vậy khi dùng absolute để đặt badge hoặc dropdown, luôn nhớ thêm position: relative cho element cha.

nguồn tham chiếu: 12_css_positioning.md — 5 giá trị position, absolute, bảng so sánh nhanh

---

## câu A2 (10đ) — flexbox vs grid
## trả lời

trường hợp 1:

```
.container { display: flex; }
.item { flex: 1; }
```

4 items với flex: 1 có nghĩa mỗi item chiếm phần không gian đều nhau. container flex theo chiều ngang mặc định (flex-direction: row). kết quả: 4 cột nằm ngang, đều chiều rộng, trên 1 hàng duy nhất.

sơ đồ bố cục:

```
[ item 1 ][ item 2 ][ item 3 ][ item 4 ]
```


trường hợp 2:

```
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
```

mỗi item chiếm 45% + margin 2 bên 2.5% = tổng 50% không gian. vậy mỗi hàng chứa được đúng 2 item (50% + 50% = 100%). 6 items chia thành 3 hàng, mỗi hàng 2 cột.

sơ đồ bố cục:

```
[ item 1 ][ item 2 ]
[ item 3 ][ item 4 ]
[ item 5 ][ item 6 ]
```

trường hợp 3:

```
.container { display: flex; justify-content: space-between; align-items: center; }
```

justify-content: space-between đẩy item đầu sát trái, item cuối sát phải, item giữa nằm chính giữa. align-items: center căn giữa theo trục dọc. 3 items nằm trên 1 hàng.

sơ đồ bố cục:

```
[ item 1 ]       [ item 2 ]       [ item 3 ]
  (trái)           (giữa)            (phải)
  ← tất cả đều được căn giữa theo chiều cao →
```

trường hợp 4:

```
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
```

3 cột: cột 1 cố định 200px, cột 2 co giãn lấp đầy không gian còn lại (1fr), cột 3 cố định 200px. 3 items lần lượt vào 3 cột đó trên 1 hàng.

sơ đồ bố cục:

```
[200px - item 1][  1fr - item 2  ][200px - item 3]
   (cố định)       (co giãn)         (cố định)
```

trường hợp 5:

```
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
```

grid 3 cột đều nhau. 7 items sẽ tự động wrap xuống hàng tiếp theo. hàng 1 có 3 items, hàng 2 có 3 items, hàng 3 chỉ có 1 item nằm ở cột đầu tiên bên trái.

sơ đồ bố cục:

```
[ item 1 ][ item 2 ][ item 3 ]
[ item 4 ][ item 5 ][ item 6 ]
[ item 7 ][        ][        ]
  (item 7 ở cột trái, 2 ô còn lại trống)
```

nguồn tham chiếu: 13_creating_responsive_layouts.md — media queries, grid-template-columns, repeat(), 1fr

---

# phần B — thực hành code

## bài B1 — positioning playground (positioning.html + positioning.css)
file: `positioning.html` + `positioning.css`

các kỹ thuật positioning đã sử dụng:
1. fixed header: position: fixed; top: 0; left: 0; width: 100%; z-index: 1000
2. sticky sidebar: position: sticky; top: 80px;
3. badge hot trên card: card dùng position: relative, badge dùng position: absolute; top: 10px; right: 10px
4. scroll to top button: position: fixed; bottom: 20px; right: 20px; z-index: 999
---
## bài B2 — flexbox navigation & cards (flexbox_layout.html + flexbox.css)

phần 1 — navbar:
- toàn bộ navbar dùng display: flex; align-items: center; justify-content: space-between
- logo bên trái, menu ở giữa dùng gap đều, nút đăng nhập bên phải
- hover link: đổi màu + text-decoration: underline + transition

phần 2 — product cards:
- container: display: flex; flex-wrap: wrap; gap: 20px
- mỗi card: flex: 0 0 calc(25% - 20px) tức 4 cột, 2 hàng với 8 cards
- bên trong card: display: flex; flex-direction: column
- nút mua: margin-top: auto để dính đáy
---
## bài B3 — grid layout e-commerce (grid_layout.html + grid.css)

layout chính dùng grid-template-areas:
- header và hero và footer span full width: grid-column: 1 / -1
- main area: grid-template-columns: 200px 1fr 200px
- sidebar: filter checkbox giả lập
- main content: grid con 3 cột cho 6 product cards
- ads: placeholder banner

---

# phần C — suy luận

---

## câu C1 (10đ) — flexbox vs grid: khi nào dùng gì?
## trả lời

tình huống 1: navigation bar ngang (logo + menu + buttons)

dùng flexbox.

lý do: navigation bar là bố cục 1 chiều (ngang), chỉ cần căn các items theo trục ngang với justify-content: space-between và align-items: center. đây là use case điển hình của flexbox — đơn giản, 1 hàng, không cần định nghĩa ô lưới.

tình huống 2: lưới ảnh instagram (3 cột đều nhau, số ảnh không biết trước)

dùng grid.

lý do: đây là bố cục 2 chiều cần cả hàng lẫn cột đều nhau. với grid-template-columns: repeat(3, 1fr), grid tự động tạo hàng mới khi cần dù không biết số lượng ảnh. flexbox cũng có thể làm nhưng khó kiểm soát chiều rộng và chiều cao đồng đều của từng ô.

tình huống 3: layout blog (main content + sidebar)

dùng grid.

lý do: đây là layout 2 vùng rõ ràng, cần định nghĩa grid-template-columns: 1fr 300px hoặc tương tự. grid phù hợp cho layout tổng thể trang. nếu cần, bên trong mỗi vùng có thể dùng flexbox thêm.

tình huống 4: footer với 4 cột thông tin

dùng grid hoặc flexbox đều được, nhưng flexbox đơn giản hơn cho trường hợp này.

lý do: 4 cột đều nhau trên 1 hàng là bố cục 1 chiều điển hình. dùng display: flex; gap: 20px; mỗi cột flex: 1. nếu cần responsive tự xuống hàng thì thêm flex-wrap: wrap.

tình huống 5: card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

dùng flexbox với flex-direction: column và margin-top: auto cho nút.

lý do: layout bên trong card là 1 chiều dọc. bằng cách set display: flex; flex-direction: column; height: 100% cho card và margin-top: auto cho nút, nút sẽ luôn bị đẩy xuống đáy card dù tên sản phẩm dài hay ngắn.

nguồn tham chiếu: 12_css_positioning.md, 13_creating_responsive_layouts.md

---

## câu C2 (10đ) — debug flexbox
## trả lời

lỗi 1: cards không đều chiều cao — nút "mua" bị nhảy lên/xuống

```
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```

nguyên nhân: các card không được set chiều cao bằng nhau và bên trong card không có cơ chế đẩy nút xuống đáy. khi tên sản phẩm ngắn thì nút ở cao, tên dài thì nút ở thấp → nút nhảy loạn.

code sửa:

```
.card-container { display: flex; flex-wrap: wrap; }
.card {
    width: 30%;
    margin: 1.5%;
    display: flex;              /* thêm: card cũng dùng flex */
    flex-direction: column;    /* thêm: xếp dọc */
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn {
    padding: 10px;
    margin-top: auto;          /* thêm: đẩy nút xuống đáy card */
}
```

giải thích: khi card là flex container theo chiều dọc, margin-top: auto trên nút sẽ hút hết khoảng trống còn lại và đẩy nút dính đáy. tất cả card trong cùng 1 hàng sẽ có chiều cao bằng nhau (flexbox tự align-stretch), nên nút sẽ nằm ở cùng 1 vị trí dưới cùng.

lỗi 2: muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

```
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```

nguyên nhân: display: flex được khai báo nhưng thiếu justify-content và align-items. mặc định justify-content: flex-start đẩy item sát trái, align-items: stretch kéo dài item. item dính góc trái trên là đúng với mặc định.

code sửa:

```
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;   /* thêm: căn giữa ngang */
    align-items: center;       /* thêm: căn giữa dọc */
}
.hero-content {
    text-align: center;
}
```

giải thích: justify-content: center căn item vào giữa theo trục chính (ngang), align-items: center căn theo trục phụ (dọc). kết hợp 2 thuộc tính này là cách chuẩn để căn giữa hoàn hảo cả 2 chiều trong flexbox.

Lỗi 3: sidebar bị co lại khi content quá dài

```
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```

nguyên nhân: mặc định flex items có flex-shrink: 1, nghĩa là khi không gian không đủ thì tất cả items có thể bị co lại. sidebar mặc dù đặt width: 250px nhưng không có flex-shrink: 0 nên bị co theo khi content cần nhiều chỗ hơn.

code sửa:

```
.layout { display: flex; }
.sidebar {
    width: 250px;
    flex-shrink: 0;            /* thêm: ngăn sidebar bị co lại */
}
.content { flex: 1; }
```

giải thích: flex-shrink: 0 báo cho flexbox biết sidebar không được phép co lại dù có thiếu không gian. chỉ có content (flex: 1) mới co giãn linh hoạt. sidebar sẽ luôn giữ đúng 250px.

nguồn tham chiếu: 12_css_positioning.md, 13_creating_responsive_layouts.md
