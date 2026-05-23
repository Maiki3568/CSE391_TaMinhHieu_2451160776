# Phần A — Kiểm tra đọc hiểu


## Câu A1 — var / let / const

---

### Đoạn 1

```javascript
console.log(x);  // undefined
var x = 5;
```

Kết quả dự đoán: `undefined`

Nguyên nhân là vì `var` bị **hoisting** — JavaScript sẽ đọc qua toàn bộ file trước khi chạy, và khi thấy `var x`, nó tự động "kéo" khai báo lên đầu scope. Nhưng chỉ khai báo thôi, không kéo giá trị. Vậy nên khi chạy tới `console.log(x)`, biến `x` đã tồn tại rồi, nhưng giá trị của nó là `undefined` vì chưa được gán.

Nếu hình dung ra thì JavaScript thực ra chạy đoạn code giống như thế này:

```javascript
var x;           // khai báo được kéo lên đây
console.log(x);  // undefined — biến có rồi nhưng chưa có giá trị
x = 5;
```

Điều này hay gây bẫy vì không báo lỗi, cứ lặng lẽ ra `undefined` mà mình không biết tại sao.

---

### Đoạn 2

```javascript
console.log(y);  // ReferenceError
let y = 10;
```

Kết quả dự đoán: `ReferenceError: Cannot access 'y' before initialization`

`let` cũng bị hoisting, nhưng khác `var` ở chỗ nó có **Temporal Dead Zone (TDZ)**. Khi chạy tới dòng `console.log(y)`, JavaScript biết biến `y` sẽ tồn tại (vì đã hoisted), nhưng chưa được khởi tạo nên không cho phép đọc. Hậu quả là chương trình dừng hẳn và báo lỗi ngay.

Điều này thực ra tốt hơn `var` — lỗi rõ ràng, dễ tìm hơn là ra `undefined` âm thầm.

---

### Đoạn 3

```javascript
const z = 15;
z = 20;          // TypeError
console.log(z);
```

Kết quả dự đoán: `TypeError: Assignment to constant variable.`

`const` nghĩa là hằng số — một khi đã gán giá trị thì không được gán lại. Khi chạy tới dòng `z = 20`, JavaScript phát hiện `z` là `const` nên báo lỗi ngay và dừng chương trình, dòng `console.log` không bao giờ chạy đến.

---

### Đoạn 4

```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);  // [1, 2, 3, 4]
```

Kết quả dự đoán: `[1, 2, 3, 4]`

Đây là điểm nhiều người nhầm. `const` không có nghĩa là giá trị bất biến — nó có nghĩa là **biến không thể trỏ sang chỗ khác**. `arr` đang trỏ vào một mảng trong bộ nhớ, và mảng đó vẫn có thể thay đổi nội dung bên trong. `push(4)` thêm phần tử vào mảng đó, nhưng `arr` vẫn đang trỏ đúng vào mảng đó — không có gì vi phạm `const` ở đây.

Cái không được làm là `arr = [5, 6, 7]` — vì đó là trỏ `arr` sang một mảng mới, khác với mảng cũ.

---

### Đoạn 5

```javascript
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);   // Trong block: 2
}
console.log("Ngoài block:", a);       // Ngoài block: 1
```

Kết quả dự đoán: `Trong block: 2` rồi `Ngoài block: 1`

`let` có **block scope** — biến khai báo trong `{}` chỉ sống trong đó. Bên trong block là một biến `a` riêng (giá trị 2), bên ngoài là biến `a` khác (giá trị 1). Hai biến này không liên quan nhau dù cùng tên. Khi ra khỏi block, `a` bên trong bị xoá, biến `a` bên ngoài vẫn giữ nguyên giá trị 1.

---

*Tham chiếu: `03_data_types_variables.md`, `02_getting_started.md`*


---


## Câu A2 — Data Types và Coercion

---

### Dự đoán từng dòng

```javascript
console.log(typeof null);        // "object"
console.log(typeof undefined);   // "undefined"
console.log(typeof NaN);         // "number"
console.log("5" + 3);           // "53"
console.log("5" - 3);           // 2
console.log("5" * "3");         // 15
console.log(true + true);       // 2
console.log([] + []);           // ""
console.log([] + {});           // "[object Object]"
console.log({} + []);           // "[object Object]"
```

---

### Giải thích từng dòng đáng chú ý

`typeof null` ra `"object"` là một bug lịch sử của JavaScript từ năm 1995. Lúc đó người ta dùng bit pattern trong bộ nhớ để phân biệt type, và `null` có cùng bit pattern với object. Bug này được phát hiện sau nhưng không thể sửa vì sẽ làm vỡ hết code đang chạy. Vì vậy nó tồn tại mãi đến nay.

`typeof NaN` ra `"number"` cũng nghe lạ — NaN là "Not a Number" mà lại có type là `number`. Điều này xảy ra do NaN là giá trị đặc biệt trong chuẩn số học IEEE 754, nó vẫn thuộc kiểu số, chỉ là một giá trị không xác định trong đó.

---

### Tại sao "5" + 3 khác "5" - 3

Đây là câu hỏi quan trọng nhất. Hai dòng này hành xử hoàn toàn khác nhau:

`"5" + 3` ra `"53"` vì toán tử `+` có hai nghĩa trong JavaScript: cộng số và nối chuỗi. Khi JavaScript thấy một trong hai operand là string, nó chọn nghĩa nối chuỗi. Vậy nên 3 bị chuyển thành `"3"`, sau đó `"5"` + `"3"` = `"53"`.

`"5" - 3` ra `2` vì toán tử `-` chỉ có một nghĩa duy nhất là trừ số. Nó không thể nối chuỗi. Vậy nên JavaScript buộc phải chuyển `"5"` thành số 5, rồi tính `5 - 3 = 2`.

Nói ngắn gọn: `+` là trừ khi có string → nối chuỗi. `-`, `*`, `/` luôn ép về số.

---

*Tham chiếu: `03_data_types_variables.md`*


---


## Câu A3 — So sánh == vs ===


### Dự đoán từng dòng

```javascript
console.log(5 == "5");           // true
console.log(5 === "5");          // false
console.log(null == undefined);  // true
console.log(null === undefined); // false
console.log(NaN == NaN);        // false
console.log(0 == false);        // true
console.log(0 === false);       // false
console.log("" == false);       // true
```


### Giải thích

`5 == "5"` ra `true` vì `==` tự động chuyển type trước khi so sánh. JavaScript thấy số và chuỗi thì chuyển chuỗi về số, rồi `5 == 5` là true.

`5 === "5"` ra `false` vì `===` không chuyển type. Số thì phải là số, chuỗi thì phải là chuỗi — khác type là false ngay.

`null == undefined` ra `true` là một trường hợp đặc biệt JavaScript quy định: hai giá trị này được coi là bằng nhau khi dùng `==`. Nhưng `null === undefined` là `false` vì khác type.

`NaN == NaN` ra `false` — đây là quy tắc toán học: NaN không bằng bất cứ thứ gì, kể cả chính nó. Nếu muốn kiểm tra một giá trị có phải NaN không, dùng `isNaN()` hoặc `Number.isNaN()`.

---

### Nên dùng == hay ===

Từ giờ trở đi nên dùng `===` (strict equality) trong mọi trường hợp. Nguyên nhân là vì `==` có quá nhiều quy tắc chuyển type ngầm — nhìn vào code không đoán được nó sẽ làm gì. `===` thì đơn giản hơn: khác type là false, cùng type thì so sánh giá trị. Không có bất ngờ.

---

*Tham chiếu: `02_getting_started.md`, `03_data_types_variables.md`*


---


## Câu A4 — Truthy và Falsy


### 6 giá trị Falsy trong JavaScript

```
false
0
""           (chuỗi rỗng)
null
undefined
NaN
```

Tất cả còn lại đều là Truthy, kể cả những giá trị trông có vẻ "rỗng" như `[]`, `{}`, hay `"0"`.

---

### Dự đoán từng dòng

```javascript
if ("0") console.log("A");    // In ra "A"
if ("") console.log("B");     // Không in (falsy)
if ([]) console.log("C");     // In ra "C"
if ({}) console.log("D");     // In ra "D"
if (null) console.log("E");   // Không in (falsy)
if (0) console.log("F");      // Không in (falsy)
if (-1) console.log("G");     // In ra "G"
if (" ") console.log("H");    // In ra "H"
```

---

### Những điểm dễ nhầm

`"0"` là truthy mặc dù trông giống zero. Nguyên nhân là vì nó là một chuỗi có nội dung — bất kỳ chuỗi nào không rỗng đều là truthy, dù nội dung là gì.

`[]` và `{}` cũng truthy dù rỗng. Lý do là array và object là reference type — chúng là địa chỉ bộ nhớ, và địa chỉ đó luôn tồn tại. JavaScript chỉ coi 6 giá trị trên là falsy, không có "empty array" hay "empty object" trong đó.

`-1` là truthy vì nó là số khác 0. Chỉ có đúng `0` là falsy, còn tất cả số khác (dương hoặc âm) đều truthy.

`" "` (một khoảng trắng) là truthy vì chuỗi không rỗng — nó có một ký tự space bên trong.

---

*Tham chiếu: `03_data_types_variables.md`*


---


## Câu A5 — Template Literals

---

### Cách 1

```javascript
// Cũ
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";

// Template literal
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

---

### Cách 2

```javascript
// Cũ
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;

// Template literal
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

---

### Cách 3

```javascript
// Cũ — phải escape dấu ngoặc kép, nối chuỗi qua nhiều dòng
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";

// Template literal — không cần escape, xuống dòng tự nhiên
var html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

Template literal dùng backtick (`) thay vì nháy đơn hoặc đôi. Bên trong `${}` có thể đặt bất kỳ biểu thức JavaScript nào — biến, tính toán, gọi hàm đều được.

---

*Tham chiếu: `02_getting_started.md`*


---

# Phần C — Suy luận


## Câu C1 — Debug JavaScript


### Danh sách lỗi tìm được

#### Lỗi 1 — Gán nhầm trong điều kiện if (nghiêm trọng)

Dòng bị lỗi:

```javascript
if (giaSauGiam = 0) {
```

Lỗi này dùng `=` thay vì `===`. Khi chạy tới đây, JavaScript không so sánh — nó gán giá trị `0` vào biến `giaSauGiam`. Sau khi gán xong, `giaSauGiam` là `0`, mà `0` là falsy, nên điều kiện `if` không bao giờ đúng.

Hậu quả là dòng `console.log("Sản phẩm miễn phí!")` không bao giờ chạy. Tệ hơn nữa, biến `giaSauGiam` bị ghi đè thành 0, rồi hàm trả về 0 thay vì giá trị đúng.

Cách sửa:

```javascript
if (giaSauGiam === 0) {
```

---

#### Lỗi 2 — Truyền string thay vì number vào tham số

Dòng bị lỗi:

```javascript
const gia = tinhGiaGiamGia("100000", 20);
```

`"100000"` là chuỗi, không phải số. Hàm không kiểm tra điều này nên JavaScript dùng coercion: `"100000" * 20 / 100` ra `20000` do coercion, rồi `"100000" - 20000` ra `80000` (cũng do coercion). Kết quả trông đúng nhưng là nhờ may mắn — nếu truyền `"100abc"` thì sẽ ra NaN.

Hàm cần thêm validation:

```javascript
if (isNaN(Number(giaBan)) || isNaN(Number(phanTramGiam))) {
    return "Lỗi: Input không phải số hợp lệ";
}
```

---

#### Lỗi 3 — Không kiểm tra giaBan là số hợp lệ

Hàm chỉ kiểm tra `phanTramGiam` có nằm trong khoảng 0-100 không, nhưng không hề kiểm tra `giaBan`. Nếu truyền chữ vào `giaBan`, hàm vẫn chạy và trả về NaN mà không báo lỗi.

Cần thêm:

```javascript
if (isNaN(Number(giaBan)) || Number(giaBan) < 0) {
    return "Lỗi: Giá bán không hợp lệ";
}
```

---

#### Lỗi 4 — giaBan âm không bị chặn

Hàm không kiểm tra giaBan có phải số dương không. Truyền `-50000` vào vẫn tính được, nhưng giá âm là vô nghĩa.

---

#### Lỗi 5 — Thiếu dấu chấm phẩy (lỗi nhỏ, không gây crash nhờ ASI)

```javascript
var giamGia = giaBan * phanTramGiam / 100   // thiếu ;
let giaSauGiam = giaBan - giamGia           // thiếu ;
return giaSauGiam                           // thiếu ;
```

JavaScript có ASI (Automatic Semicolon Insertion) xử lý những trường hợp này, nên không crash. Nhưng theo coding style thì nên viết đủ dấu chấm phẩy để tránh các trường hợp ASI hiểu sai ý định.

---

#### Lỗi 6 (ẩn) — var trong vòng lặp với setTimeout

Đây là lỗi "ẩn" quan trọng nhất. Đoạn code:

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
```

Dự đoán sai: in ra `Item 0`, `Item 1`, `Item 2`, `Item 3`, `Item 4`

Kết quả thực tế: in ra `Item 5` năm lần

Điều này xảy ra do `var` có **function scope**, không phải block scope. Biến `i` chỉ có một bản duy nhất trong toàn bộ hàm. Vòng lặp chạy xong trước khi setTimeout callback nào được gọi (vì phải đợi 1000ms). Lúc callback chạy, `i` đã tăng lên 5 rồi (điều kiện `i < 5` thất bại khi `i = 5` nên vòng lặp dừng). Tất cả 5 callback cùng đọc cùng một biến `i = 5`.

Cách sửa bằng `let`:

```javascript
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
```

`let` có block scope — mỗi lần lặp tạo ra một biến `i` riêng. Mỗi callback giữ tham chiếu đến biến `i` của lần lặp của nó, không phải biến chung. Kết quả sẽ in đúng `Item 0` đến `Item 4`.

---

### Code sau khi sửa (snippet minh hoạ phần quan trọng nhất)

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Thêm: validate input
    if (isNaN(Number(giaBan)) || Number(giaBan) < 0) {
        return "Lỗi: Giá bán không hợp lệ";
    }

    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Lỗi: Phần trăm giảm không hợp lệ";
    }

    var giaBanSo = Number(giaBan);  // Đảm bảo là số
    var giamGia = giaBanSo * phanTramGiam / 100;
    var giaSauGiam = giaBanSo - giamGia;

    if (giaSauGiam === 0) {  // Sửa: === thay vì =
        console.log("San pham mien phi!");
    }

    return giaSauGiam;
}
```

---

*Tham chiếu: `03_data_types_variables.md`, `02_getting_started.md`*


---


## Câu C2 — Tính hóa đơn nhà hàng

---

### Logic xử lý

File code đầy đủ nằm ở `restaurant_bill.js`. Phần này giải thích thuật toán.

---

### Cách tính tổng tiền món ăn

Duyệt qua từng món trong mảng, nhân giá với số lượng, cộng dồn vào biến `tongTien`.

```javascript
// snippet minh hoạ logic chính
var tongTien = 0;
for (var i = 0; i < danhSachMon.length; i++) {
    var thanhtien = danhSachMon[i].gia * danhSachMon[i].soLuong;
    tongTien = tongTien + thanhtien;
}
```

---

### Cách tính giảm giá — thứ tự ưu tiên

Quy tắc giảm giá áp dụng theo tổng tiền gốc, không cộng dồn. Nghĩa là nếu tổng > 1 triệu thì giảm 15%, không phải 10% + 15%.

Thứ Ba (Wednesday) là `getDay() === 3` trong JavaScript (0 = Chủ Nhật, 1 = Thứ Hai,...).

```javascript
// snippet logic giảm giá
var phanTramGiam = 0;

if (tongTien > 1000000) {
    phanTramGiam = 15;
} else if (tongTien > 500000) {
    phanTramGiam = 10;
}

var ngayHomNay = new Date().getDay();
if (ngayHomNay === 3) {
    phanTramGiam = phanTramGiam + 5;
}

var soTienGiam = tongTien * phanTramGiam / 100;
var tongSauGiam = tongTien - soTienGiam;
```

---

### Thứ tự tính toán cuối cùng

Tổng sau giảm → cộng VAT 8% → cộng Tip 5% (nếu có) → ra số cuối cùng.

```javascript
var vat = tongSauGiam * 8 / 100;
var tip = coTip ? tongSauGiam * 5 / 100 : 0;
var thanhToan = tongSauGiam + vat + tip;
```

---

### Kết quả chạy thử

Chạy `node restaurant_bill.js` với dữ liệu mẫu (Phở bò x2, Trà đá x3, Bún chả x1):

```
╔══════════════════════════════════════╗
║        HOA DON NHA HANG             ║
╠══════════════════════════════════════╣
║ 1. Pho bo        x2   @65k = 130k   ║
║ 2. Tra da        x3   @5k  = 15k    ║
║ 3. Bun cha       x1   @55k = 55k    ║
╠══════════════════════════════════════╣
║ Tong cong:             200,000d     ║
║ Giam gia (0%):               0d     ║
║ VAT (8%):               16,000d     ║
║ Tip (5%):               10,000d     ║
╠══════════════════════════════════════╣
║ THANH TOAN:            226,000d     ║
╚══════════════════════════════════════╝
```

---

*Tham chiếu: `04_control_structures.md`, `03_data_types_variables.md`*
