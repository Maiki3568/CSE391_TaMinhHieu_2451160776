# File: answers.md
# Phiếu Bài Tập 09 — DOM Manipulation & Events
## Phần A + Phần C

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

## Câu A1 — DOM Tree

### 1. Sơ đồ cây DOM

```
document
└── html
    └── body
        └── div#app
            ├── header
            │   ├── h1
            │   │   └── "Todo App"
            │   └── nav
            │       ├── a.active
            │       │   └── "All"
            │       ├── a
            │       │   └── "Active"
            │       └── a
            │           └── "Completed"
            └── main
                ├── form#todoForm
                │   ├── input#todoInput [type="text"]
                │   └── button [type="submit"]
                │       └── "Add"
                └── ul#todoList
                    ├── li.todo-item
                    │   └── "Learn HTML"
                    └── li.todo-item.completed
                        └── "Learn CSS"
```

Mỗi thẻ HTML trở thành một node trong cây. Quan hệ cha-con trong HTML giữ nguyên trong DOM — `div#app` là cha của `header` và `main`, `nav` là con của `header`, và cứ thế tiếp tục. Browser đọc HTML từ trên xuống và dựng cây này trước khi render trang.

### 2. Các querySelector tương ứng

**Chọn thẻ `<h1>`:**

```javascript
document.querySelector("h1");
```

Selector `"h1"` sẽ tìm thẻ `h1` đầu tiên trong document. Vì chỉ có 1 thẻ `h1` duy nhất nên không cần viết cụ thể hơn.

**Chọn input trong form:**

```javascript
document.querySelector("#todoForm input");
```

Viết theo kiểu descendant selector — tìm `input` nằm bên trong `#todoForm`. Tránh dùng chỉ `"input"` vì nếu sau này trang có nhiều input khác thì dễ nhầm.

**Chọn tất cả `.todo-item`:**

```javascript
document.querySelectorAll(".todo-item");
```

`querySelectorAll` trả về `NodeList` chứa tất cả elements có class `todo-item`. Ở đây sẽ trả về 2 `li` — cả "Learn HTML" lẫn "Learn CSS" (kể cả cái đã completed).

**Chọn link đang active:**

```javascript
document.querySelector("a.active");
```

Kết hợp tag selector + class selector. Cách này rõ hơn `".active"` vì chỉ rõ ta đang tìm thẻ `<a>` có class `active`, không phải element nào khác.

**Chọn `<li>` đầu tiên trong `#todoList`:**

```javascript
document.querySelector("#todoList li:first-child");
```

`:first-child` là pseudo-class chọn element con đầu tiên. Kết quả trả về `li` chứa "Learn HTML".

**Chọn tất cả `<a>` bên trong `<nav>`:**

```javascript
document.querySelectorAll("nav a");
```

Trả về `NodeList` gồm 3 phần tử `<a>`: "All", "Active", "Completed". Descendant combinator (khoảng cách) tìm tất cả `<a>` ở mọi cấp độ trong `nav`.

*Tham chiếu:* `19_dom_manipulation.md + Chọn Elements`

---

## Câu A2 — innerHTML vs textContent

### Sự khác nhau cơ bản

`textContent` trả về/gán nội dung text thuần túy. Mọi thẻ HTML bên trong sẽ bị bỏ qua hoặc escape thành ký tự literal. `innerHTML` thì khác — nó đọc và gán chuỗi HTML thật, browser sẽ parse và render các thẻ bên trong.

Xét ví dụ sau:

```javascript
const div = document.querySelector("#demo");
div.innerHTML = "<strong>Hello</strong>";
div.textContent = "<strong>Hello</strong>";
```

Kết quả khi render:

- `innerHTML`: hiển thị chữ **Hello** in đậm — thẻ `<strong>` được parse thành HTML thật.
- `textContent`: hiển thị nguyên chuỗi `<strong>Hello</strong>` dưới dạng text — không có gì được bold.

**Khi nào dùng `textContent`:** Khi chỉ cần hiển thị text thông thường, đặc biệt khi text đến từ input của user. An toàn, không có rủi ro gì.

**Khi nào dùng `innerHTML`:** Khi cần chèn cấu trúc HTML phức tạp mà mình tự kiểm soát nội dung — ví dụ template cố định như render card sản phẩm từ dữ liệu sạch. Điểm dễ nhầm là nhiều người dùng `innerHTML` cho mọi thứ vì tiện, nhưng đây là cái bẫy về bảo mật.

### Lỗ hổng XSS với innerHTML

XSS (Cross-Site Scripting) xảy ra khi attacker chèn script độc hại vào trang thông qua input của user, và trang đó vô tình execute script đó.

```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
```

Nếu user nhập: `<img src=x onerror="alert('Hacked!')">`

Browser sẽ parse đây là một thẻ `img`, `src` không hợp lệ nên trigger `onerror`, và đoạn JavaScript trong `onerror` được chạy. Thay vì `alert` vô hại, attacker có thể viết code đánh cắp cookie, gửi request giả mạo, hoặc redirect user sang trang độc hại.

**Cách sửa:**

```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

Dùng `textContent` thì browser sẽ xử lý `<img src=x onerror="...">` như text thuần, hiển thị nguyên chuỗi đó ra màn hình mà không execute gì cả. Nếu bắt buộc phải dùng `innerHTML` với dữ liệu từ user, phải sanitize input trước bằng thư viện như DOMPurify.

*Tham chiếu:* `19_dom_manipulation.md + Sửa Elements`

---

## Câu A3 — Event Bubbling

### Dự đoán output khi KHÔNG có stopPropagation

```
BUTTON
INNER
OUTER
```

Lý do là vì đây là cơ chế **event bubbling** — khi click vào `#btn`, event được trigger trên button trước, rồi "nổi bọt" lên element cha là `#inner`, rồi tiếp tục nổi lên `#outer`. Thứ tự luôn là từ element sâu nhất ra ngoài. Ba listener đều được chạy, theo đúng thứ tự DOM từ con lên cha.

### Dự đoán khi BỎ COMMENT `e.stopPropagation()`

```
BUTTON
```

Khi `stopPropagation()` được gọi, nó dừng event ngay tại `#btn` — event không còn nổi bọt lên `#inner` hay `#outer` nữa. Chỉ có listener của `#btn` được chạy. Hai listener kia hoàn toàn không biết event đã xảy ra.

Điểm dễ nhầm ở đây: `stopPropagation()` không cancel event, nó chỉ ngăn event lan ra ngoài. Nếu trên `#btn` có nhiều listener, tất cả đều vẫn chạy. Muốn cancel luôn các listener khác trên cùng element thì phải dùng `stopImmediatePropagation()`.

Cũng cần phân biệt với `preventDefault()` — cái đó ngăn hành vi mặc định của browser (ví dụ ngăn form submit reload trang), còn bubbling vẫn xảy ra bình thường nếu không có `stopPropagation()`.

*Tham chiếu:* `19_dom_manipulation.md + Events — Lắng nghe hành động user`

---

# PHẦN C — DEBUG & PHÂN TÍCH

---

## Câu C1 — Debug DOM Code

Đoạn code gốc có ít nhất 7 lỗi. Phân tích từng lỗi và cách sửa:

### Lỗi 1: `countDisplay.innerHTML = count` thay vì `textContent`

```javascript
countDisplay.innerHTML = count;
```

Lý do sửa: `count` là một số nguyên, không phải HTML. Dùng `innerHTML` ở đây không sai về mặt kỹ thuật nhưng là bad practice. Nếu sau này `count` chứa ký tự đặc biệt (giả sử từ nguồn khác), `innerHTML` có thể gây XSS. Nên dùng `textContent` cho text thuần.

### Lỗi 2: Event name sai — `"onclick"` thay vì `"click"`

```javascript
document.querySelector("#decrementBtn").addEventListener("onclick", function() {
```

`"onclick"` là tên attribute HTML, không phải tên event. `addEventListener` nhận tên event không có tiền tố "on". Phải là `"click"`.

### Lỗi 3: Gán trực tiếp vào `const` — `countDisplay = count`

```javascript
countDisplay = count;
```

`countDisplay` khai báo bằng `const` — không thể reassign. Hơn nữa, kể cả đây là `let`, gán `count` (số) vào `countDisplay` (DOM element) cũng sai logic. Phải update `.textContent`.

### Lỗi 4: `historyList.innerHTML = null` không hợp lệ để clear

```javascript
historyList.innerHTML = null;
```

Gán `null` sẽ được coerce thành chuỗi `"null"` và set innerHTML thành đó — tức là hiển thị chữ "null" trên trang. Muốn xóa hết nội dung bên trong thì phải gán `""` (empty string).

### Lỗi 5: `item.remove` thiếu dấu `()` — gọi hàm không thực thi

```javascript
items.forEach(item => {
    item.remove;
});
```

`item.remove` chỉ là reference đến method, không gọi nó. Phải viết `item.remove()` với dấu ngoặc để thực sự xóa element.

### Lỗi 6: Load từ localStorage trả về string, không phải number

```javascript
count = localStorage.getItem("count");
```

`localStorage.getItem()` luôn trả về string. Nếu sau đó dùng `count` để tính toán (`count++`, `count--`) thì JavaScript sẽ coerce kiểu và cho kết quả sai kiểu. Phải parse về number bằng `parseInt` hoặc `Number()`.

### Lỗi 7: Thiếu null check khi load — nếu chưa có key trong localStorage

Khi lần đầu mở trang, `localStorage.getItem("count")` trả về `null`. Gán `null` vào `count` rồi hiển thị sẽ ra "null". Phải có giá trị mặc định.

### Code đã sửa hoàn chỉnh

```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;

    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    const saved = localStorage.getItem("count");
    count = saved !== null ? parseInt(saved, 10) : 0;
    countDisplay.textContent = count;
});
```

**Tổng kết 7 lỗi đã sửa:**

| # | Lỗi gốc | Sửa thành | Nguyên nhân |
|---|---------|-----------|-------------|
| 1 | `innerHTML = count` (2 chỗ) | `textContent = count` | Best practice, tránh XSS |
| 2 | `"onclick"` | `"click"` | Tên event không có tiền tố "on" |
| 3 | `countDisplay = count` | `countDisplay.textContent = count` | Không reassign const, sai logic |
| 4 | `innerHTML = null` | `innerHTML = ""` | null bị coerce thành chuỗi "null" |
| 5 | `item.remove` | `item.remove()` | Thiếu () không gọi được method |
| 6 | Không parse localStorage | `parseInt(saved, 10)` | getItem trả về string |
| 7 | Không có null check | Fallback về `0` nếu null | Lần đầu chạy chưa có key |

*Tham chiếu:* `19_dom_manipulation.md + Thêm & Xóa Elements` + `19_dom_manipulation.md + Events`

---

## Câu C2 — Performance

### 1. Tại sao bind event lên 1000 elements riêng lẻ là bad practice

Khi viết:

```javascript
const items = document.querySelectorAll(".item");
items.forEach(item => {
    item.addEventListener("click", handleClick);
});
```

JavaScript tạo ra 1000 event listener objects riêng biệt và attach vào 1000 DOM nodes. Mỗi listener chiếm bộ nhớ. Ngoài ra, nếu sau này thêm item mới vào DOM (ví dụ user load thêm sản phẩm), item mới đó không có listener — phải bind lại thủ công. Code dễ bị memory leak nếu quên remove listener khi xóa element.

**Event Delegation giải quyết vấn đề này như sau:**

Thay vì bind lên từng item, bind 1 listener duy nhất lên element cha. Khi user click vào bất kỳ item con nào, event bubbles lên cha, và cha dùng `event.target` để xác định đúng item nào được click.

```javascript
document.querySelector("#list").addEventListener("click", (e) => {
    if (e.target.matches(".item")) {
        handleClick(e.target);
    }
});
```

Chỉ 1 listener, tiết kiệm bộ nhớ tuyến tính — từ O(n) xuống O(1). Và khi thêm item mới vào `#list`, listener tự động hoạt động cho item đó mà không cần bind thêm gì. Đây chính là lý do Event Delegation được dùng trong hầu hết các dự án thực tế.

### 2. Refactor dùng DocumentFragment

**Code gốc — 1000 lần reflow:**

```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);
}
```

Vấn đề: mỗi lần `appendChild` vào `document.body`, browser phải tính lại layout (reflow) và vẽ lại trang (repaint). 1000 lần `appendChild` = 1000 lần reflow. Với DOM phức tạp, mỗi reflow tốn hàng millisecond — dồn lại là đáng kể.

**Code refactor dùng DocumentFragment — 1 lần reflow:**

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

`DocumentFragment` là một container tồn tại trong bộ nhớ, không phải trong DOM thật. Append vào fragment không trigger reflow vì fragment không được render. Chỉ đến dòng cuối cùng khi `fragment` được append vào `document.body`, browser mới thực hiện đúng 1 lần reflow với toàn bộ 1000 divs. Fragment "tan biến" sau khi append — chỉ các children của nó được chèn vào DOM.

Kết quả thực tế: benchmark cho thấy cách này nhanh hơn 5-10x so với append từng element khi số lượng lớn. Đây là kỹ thuật chuẩn khi cần render danh sách dài trong Vanilla JS.

*Tham chiếu:* `19_dom_manipulation.md + Thêm & Xóa Elements`
