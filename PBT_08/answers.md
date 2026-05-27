# Phần A — Kiểm tra đọc hiểu


## Câu A1 — Function Declaration vs Expression vs Arrow

---

### Ba cách viết hàm `tinhThueBaoHiem(luong)`

Logic nghiệp vụ: nếu lương vượt 11.000.000đ thì thuế bằng 10% lương, ngược lại thuế bằng 0. Thực nhận bằng lương trừ đi thuế. Hàm trả về object gồm hai trường `{ thue, thuc_nhan }`.

**Cách 1 — Function Declaration**

```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}

console.log(tinhThueBaoHiem(15000000));
// → { thue: 1500000, thuc_nhan: 13500000 }

console.log(tinhThueBaoHiem(8000000));
// → { thue: 0, thuc_nhan: 8000000 }
```

**Cách 2 — Function Expression**

```javascript
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

console.log(tinhThueBaoHiem(15000000));
// → { thue: 1500000, thuc_nhan: 13500000 }
```

**Cách 3 — Arrow Function**

```javascript
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

console.log(tinhThueBaoHiem(15000000));
// → { thue: 1500000, thuc_nhan: 13500000 }
```

---

### Câu hỏi về Hoisting

Ba cách này có sự khác biệt rõ ràng về hoisting. Đây là điểm quan trọng nhất trong câu này.

**Function Declaration — được hoisted toàn bộ**

JavaScript khi đọc qua file sẽ kéo toàn bộ Function Declaration lên đầu scope, bao gồm cả phần thân hàm. Điều này có nghĩa là hàm có thể được gọi trước dòng khai báo mà không gây lỗi.

```javascript
// Gọi TRƯỚC khi khai báo → hoạt động bình thường
const ketQua = tinhThueBaoHiem(20000000);
console.log(ketQua);
// → { thue: 2000000, thuc_nhan: 18000000 }

function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}
```

JavaScript thực ra chạy đoạn này như sau — toàn bộ function đã được đưa lên đầu trước khi bất cứ dòng nào khác chạy:

```javascript
// JavaScript tự kéo lên đây:
function tinhThueBaoHiem(luong) { ... }

// Rồi mới chạy dòng này:
const ketQua = tinhThueBaoHiem(20000000);
```

**Function Expression và Arrow Function — chỉ hoisted tên biến, không hoisted giá trị**

Cả hai cách này đều gán hàm vào một biến. Biến thì được hoisted, nhưng giá trị (tức phần hàm) thì không. Nếu dùng `const` hoặc `let`, biến rơi vào Temporal Dead Zone — đọc trước khi gán sẽ báo `ReferenceError`. Nếu dùng `var`, biến tồn tại nhưng giá trị là `undefined`, dẫn đến `TypeError` khi cố gọi nó như một hàm.

```javascript
// Gọi TRƯỚC khi khai báo → ReferenceError
const ketQua = tinhThueBaoHiem(20000000);
// → ReferenceError: Cannot access 'tinhThueBaoHiem' before initialization

const tinhThueBaoHiem = function(luong) { ... };
```

```javascript
// Ví dụ với var để thấy rõ hơn:
console.log(typeof tinhThueBaoHiem); // → "undefined" (không phải function!)
var tinhThueBaoHiem = function(luong) { ... };

tinhThueBaoHiem(20000000);
// → TypeError: tinhThueBaoHiem is not a function
// (vì lúc này var đã kéo lên, giá trị là undefined, không thể gọi)
```

**Tổng kết sự khác nhau**

| Cách viết | Hoisted? | Gọi trước khai báo? |
|---|---|---|
| Function Declaration | Toàn bộ hàm | Được |
| Function Expression (const/let) | Chỉ tên biến (TDZ) | ReferenceError |
| Arrow Function (const/let) | Chỉ tên biến (TDZ) | ReferenceError |

Trong thực tế, các dự án hiện đại thường ưu tiên dùng Function Expression hoặc Arrow Function vì chúng rõ ràng hơn về thứ tự khai báo, tránh lạm dụng hoisting gây nhầm lẫn.

---

*Tham chiếu: `05_functions.md + DEFINING AND CALLING FUNCTIONS`, `05_functions.md + ARROW FUNCTIONS (HÀM MŨI TÊN — ES6)`*


---


## Câu A2 — Scope & Closure

---

### Đoạn 1 — Counter với Closure

```javascript
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());
console.log(c.increment());
console.log(c.increment());
console.log(c.decrement());
console.log(c.getCount());
```

### Kết quả dự đoán

```
1
2
3
2
2
```

### Giải thích

Đây là ví dụ điển hình của Closure. Khi `counter()` được gọi, JavaScript tạo ra một execution context với biến `count = 0` bên trong. Hàm `counter()` kết thúc và trả về một object gồm ba phương thức. Về mặt lý thuyết, execution context của `counter()` đã xong — nhưng ba phương thức đó vẫn giữ tham chiếu đến `count`. Đó chính là Closure: hàm con nhớ được biến của hàm cha, ngay cả khi hàm cha đã chạy xong.

Ba phương thức `increment`, `decrement`, `getCount` đều trỏ đến cùng một biến `count`. Không phải ba bản sao, mà cùng một vùng nhớ.

Phân tích từng dòng:

`c.increment()` — toán tử `++count` là pre-increment, tăng `count` lên 1 rồi mới trả về giá trị mới. `count` đi từ 0 lên 1, trả về `1`.

`c.increment()` lần hai — `count` đi từ 1 lên 2, trả về `2`.

`c.increment()` lần ba — `count` đi từ 2 lên 3, trả về `3`.

`c.decrement()` — toán tử `--count` là pre-decrement, giảm `count` xuống 1 rồi trả về. `count` đi từ 3 xuống 2, trả về `2`.

`c.getCount()` — đọc giá trị hiện tại của `count` mà không thay đổi. `count` đang là `2`, trả về `2`.

---

### Đoạn 2 — var vs let trong setTimeout

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
```

### Kết quả dự đoán — sau 200ms

```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

### Giải thích chi tiết — Tại sao var và let cho kết quả khác nhau

Điểm mấu chốt nằm ở **scope** của hai từ khóa này, kết hợp với cơ chế bất đồng bộ của `setTimeout`.

**Vòng lặp với var**

`var` có function scope (hoặc global scope nếu không nằm trong hàm), không có block scope. Điều này có nghĩa là toàn bộ ba lần lặp dùng chung một biến `i` duy nhất trong bộ nhớ.

Vòng lặp chạy xong trong vài microsecond. Ba callback đã được đăng ký vào event queue, nhưng chúng chỉ chạy sau ít nhất 100ms. Khi ba callback đó bắt đầu thực thi, vòng lặp đã kết thúc từ lâu. Điều kiện `i < 3` thất bại khi `i = 3`, vòng lặp dừng, nên `i` lúc đó bằng `3`. Cả ba callback đều đọc cùng biến `i`, cùng thấy giá trị `3`.

Nếu hình dung ra thì JavaScript thực ra chạy đoạn `var` như thế này:

```javascript
var i;                          // khai báo duy nhất, được hoisted ra ngoài loop
i = 0; // lần lặp 1 → đăng ký callback 1
i = 1; // lần lặp 2 → đăng ký callback 2
i = 2; // lần lặp 3 → đăng ký callback 3
i = 3; // điều kiện i < 3 thất bại, dừng

// 100ms sau, cả 3 callback mới chạy, đọc i = 3
```

**Vòng lặp với let**

`let` có block scope. Trong vòng lặp `for`, JavaScript tạo ra một binding mới cho `j` ở mỗi lần lặp. Mỗi iteration có biến `j` riêng của nó — không phải ba biến dùng chung, mà ba biến độc lập với ba giá trị khác nhau (0, 1, 2).

Mỗi callback capture biến `j` của lần lặp của nó thông qua Closure. Khi callback của lần lặp đầu tiên chạy, nó đọc `j` của lần lặp đó — và giá trị là `0`, không thay đổi bởi vì đó là một binding riêng biệt.

```javascript
// Về mặt khái niệm, JavaScript tạo ra:
{ let j = 0; setTimeout(() => console.log("let:", j), 200); } // j này = 0 mãi
{ let j = 1; setTimeout(() => console.log("let:", j), 200); } // j này = 1 mãi
{ let j = 2; setTimeout(() => console.log("let:", j), 200); } // j này = 2 mãi
```

Đây là lý do trong dự án thực tế, `let` và `const` được khuyến khích thay thế hoàn toàn `var`. Hành vi của `var` trong vòng lặp bất đồng bộ là nguồn gốc của vô số bug khó tìm.

---

*Tham chiếu: `05_functions.md + SCOPE — PHẠM VI BIẾN`, `05_functions.md + Closures — "Hàm con nhớ được đồ của hàm cha"`*


---


## Câu A3 — Array Methods — 8 one-liners

---

Cho mảng gốc: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`

**1. Lấy các số chẵn**

```javascript
const chanSo = nums.filter(n => n % 2 === 0);
// → [2, 4, 6, 8, 10]
```

`filter` duyệt qua từng phần tử, giữ lại những phần tử mà callback trả về `true`. Toán tử `%` lấy phần dư — số chẵn chia 2 dư 0.

**2. Nhân mỗi số với 3**

```javascript
const nhanBa = nums.map(n => n * 3);
// → [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
```

`map` biến đổi từng phần tử theo hàm callback và trả về mảng mới cùng độ dài.

**3. Tính tổng tất cả**

```javascript
const tong = nums.reduce((sum, n) => sum + n, 0);
// → 55
```

`reduce` tích lũy giá trị qua từng lần lặp. `0` là giá trị khởi tạo của `sum`. Mỗi bước cộng phần tử hiện tại vào `sum`.

**4. Tìm số đầu tiên lớn hơn 7**

```javascript
const timDuoc = nums.find(n => n > 7);
// → 8
```

`find` trả về phần tử đầu tiên thỏa điều kiện, không phải mảng. Nếu không tìm thấy thì trả về `undefined`.

**5. Kiểm tra có số nào lớn hơn 10 không**

```javascript
const coSoLon = nums.some(n => n > 10);
// → false
```

`some` trả về `true` nếu ít nhất một phần tử thỏa điều kiện. Trong mảng này số lớn nhất là 10, không phần tử nào `> 10`, nên kết quả là `false`.

**6. Kiểm tra tất cả đều lớn hơn 0**

```javascript
const tatCaDuong = nums.every(n => n > 0);
// → true
```

`every` trả về `true` chỉ khi tất cả phần tử đều thỏa điều kiện. Mảng gồm các số từ 1 đến 10, mọi phần tử đều `> 0`.

**7. Tạo mảng mô tả chẵn/lẻ**

```javascript
const moTa = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
// → ["Số 1 là lẻ", "Số 2 là chẵn", "Số 3 là lẻ", ..., "Số 10 là chẵn"]
```

Kết hợp `map` với ternary operator và template literal để tạo chuỗi mô tả động cho từng phần tử.

**8. Đảo ngược mảng không mutate gốc**

```javascript
const dao = [...nums].reverse();
// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

`Array.prototype.reverse()` là **in-place mutation** — nó đảo ngược mảng gốc và trả về chính mảng đó. Vì đề yêu cầu không mutate mảng gốc, cần clone trước bằng spread operator `[...nums]`. Sau đó gọi `.reverse()` trên bản sao, mảng `nums` gốc không bị ảnh hưởng.

Kiểm tra:
```javascript
console.log(nums);  // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  (không đổi)
console.log(dao);   // → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

---

*Tham chiếu: `06_arrays_objects.md + Array Power Methods`, `06_arrays_objects.md + CRUD Operations`*


---


## Câu A4 — Object Destructuring & Spread

---

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};
```

### Phần 1 — Nested Destructuring

```javascript
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // ???
console.log(specs);                     // ???
```

### Kết quả dự đoán

```
"iPhone 16" 25990000 8 "Titan"
ReferenceError: specs is not defined
```

### Giải thích

Dòng `const { name, price, specs: { ram, color } } = product` thực hiện destructuring lồng nhau. Cú pháp `specs: { ram, color }` có nghĩa: truy cập vào property `specs` của `product`, rồi lấy `ram` và `color` từ đó. Kết quả là hai biến `ram = 8` và `color = "Titan"` được tạo ra.

Điểm quan trọng: `specs` không được khai báo là một biến. Dấu hai chấm trong destructuring không tạo biến mới — nó chỉ là "đường dẫn" để đi vào object lồng nhau. Vì vậy `console.log(specs)` ném ra `ReferenceError: specs is not defined` — biến `specs` chưa từng được tạo ra trong scope hiện tại.

Nếu muốn giữ lại cả `specs`, phải viết:
```javascript
const { name, price, specs, specs: { ram, color } } = product;
// Lúc này specs mới tồn tại như một biến
```

---

### Phần 2 — Spread Operator

```javascript
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);   // ???
console.log(updated.sale);    // ???
console.log(product.price);   // ???
```

### Kết quả dự đoán

```
23990000
true
25990000
```

### Giải thích

`{ ...product, price: 23990000, sale: true }` trước tiên copy toàn bộ properties của `product` vào object mới, sau đó ghi tiếp `price: 23990000` và `sale: true`. Vì `price` xuất hiện sau `...product`, giá trị mới `23990000` ghi đè lên giá trị cũ `25990000` được copy từ spread.

`product.price` vẫn là `25990000` vì spread tạo ra một object hoàn toàn mới — object gốc không bị chạm đến.

---

### Phần 3 — Shallow Copy Gotcha

```javascript
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);  // ???
```

### Kết quả dự đoán

```
16
```

### Nguyên nhân — Shallow Copy

Đây là bẫy phổ biến nhất khi dùng spread. Spread chỉ thực hiện **shallow copy** — copy ở tầng trên cùng mà thôi. `product` có ba properties: `name` (string), `price` (number), `specs` (object).

String và number là primitive types, được copy theo giá trị. Nhưng `specs` là một object — spread chỉ copy tham chiếu (địa chỉ bộ nhớ) của nó, không tạo ra object mới. Kết quả là `copy.specs` và `product.specs` cùng trỏ đến một object duy nhất trong bộ nhớ.

Khi thực hiện `copy.specs.ram = 16`, thực chất là đang sửa object mà cả hai biến `copy.specs` và `product.specs` đều trỏ tới. Vì vậy `product.specs.ram` cũng thành `16`.

Để tránh điều này cần **deep clone**:
```javascript
const copy = JSON.parse(JSON.stringify(product));
// hoặc dùng structuredClone (ES2022):
const copy = structuredClone(product);
```

Sau đó `copy.specs.ram = 16` sẽ không ảnh hưởng gì đến `product.specs.ram`.

---

*Tham chiếu: `06_arrays_objects.md + Objects — "Bản ghi có tên trường"`, `06_arrays_objects.md + Spread & Rest Operators`*


---


# Phần C — Suy luận


## Câu C1 — Refactor Code

---

### Code gốc (ugly) — Phân tích vấn đề

```javascript
function processOrders(orders) {
    var result = [];
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "completed") {
            if (orders[i].total > 100000) {
                var item = {};
                item.id = orders[i].id;
                item.customer = orders[i].customer;
                item.total = orders[i].total;
                item.discount = orders[i].total * 0.1;
                item.finalTotal = orders[i].total - item.discount;
                result.push(item);
            }
        }
    }
    for (var j = 0; j < result.length; j++) {
        for (var k = j + 1; k < result.length; k++) {
            if (result[j].finalTotal < result[k].finalTotal) {
                var temp = result[j];
                result[j] = result[k];
                result[k] = temp;
            }
        }
    }
    return result;
}
```

Code trên có nhiều vấn đề: dùng `var` có function scope gây nguy hiểm trong vòng lặp lồng nhau, hai vòng `for` lồng O(n²) để sort thay vì dùng `.sort()` có sẵn, tạo object theo từng dòng thay vì dùng destructuring và shorthand, và hai tầng `if` lồng nhau trong khi có thể gộp thành một điều kiện duy nhất.

---

### Code sau khi refactor

```javascript
const processOrders = (orders) =>
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

### Phân tích từng bước

`filter(({ status, total }) => status === "completed" && total > 100000)` — bước này thay thế hai `if` lồng nhau. Sử dụng destructuring ngay trong tham số của callback để lấy `status` và `total` mà không cần `orders[i].status`, `orders[i].total`. Toán tử `&&` kết hợp cả hai điều kiện trong một biểu thức.

`.map(({ id, customer, total }) => ({ ... }))` — chỉ nhận những orders đã qua bộ lọc và biến đổi chúng thành object mới. Destructuring `{ id, customer, total }` lấy ba trường cần thiết. `finalTotal: total * 0.9` là cách viết rút gọn cho `total - total * 0.1` vì `total * (1 - 0.1) = total * 0.9`. Object trả về dùng shorthand property khi tên biến trùng với tên key (`id`, `customer`, `total`).

`.sort((a, b) => b.finalTotal - a.finalTotal)` — thay thế toàn bộ vòng lặp bubble sort O(n²). `.sort()` với comparator trả về số âm/dương/0 để sắp xếp. `b - a` cho thứ tự giảm dần.

---

### Test với dữ liệu mẫu

```javascript
const orders = [
    { id: 1, customer: "Minh", status: "completed", total: 500000 },
    { id: 2, customer: "Linh", status: "pending",   total: 300000 },
    { id: 3, customer: "Hùng", status: "completed", total: 200000 },
    { id: 4, customer: "An",   status: "completed", total: 80000  }
];

console.log(processOrders(orders));
// → [
//     { id: 1, customer: "Minh", total: 500000, discount: 50000, finalTotal: 450000 },
//     { id: 3, customer: "Hùng", total: 200000, discount: 20000, finalTotal: 180000 }
//   ]
```

Order id: 2 bị loại vì `status !== "completed"`. Order id: 4 bị loại vì `total <= 100000`. Hai order còn lại được sắp xếp theo `finalTotal` giảm dần.

---

*Tham chiếu: `06_arrays_objects.md + Array Power Methods`, `05_functions.md + ARROW FUNCTIONS (HÀM MŨI TÊN — ES6)`*


---


## Câu C2 — Thiết kế API `miniArray`

---

### Mục tiêu

Implement lại `map`, `filter`, `reduce` từ đầu mà không dùng built-in. Làm được điều này đòi hỏi hiểu rõ cơ chế bên trong của ba phương thức nền tảng nhất của JavaScript.

---

### Implementation

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let acc;
        let startIndex;

        if (initialValue !== undefined) {
            acc = initialValue;
            startIndex = 0;
        } else {
            acc = arr[0];
            startIndex = 1;
        }

        for (let i = startIndex; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }

        return acc;
    }
};
```

---

### Phân tích từng method

**`miniArray.map(arr, fn)`**

Khởi tạo mảng `result` rỗng. Duyệt qua từng phần tử theo index, gọi `fn` với ba tham số đúng theo spec của `Array.prototype.map`: giá trị phần tử hiện tại (`arr[i]`), index (`i`), và mảng gốc (`arr`). Kết quả của mỗi lần gọi được `push` vào `result`. Không bao giờ sửa `arr` gốc. Trả về `result` với đúng số phần tử bằng mảng đầu vào.

**`miniArray.filter(arr, fn)`**

Tương tự map, nhưng chỉ `push` vào `result` khi `fn` trả về `true` (hoặc truthy). Mảng trả về có thể ít phần tử hơn mảng gốc.

**`miniArray.reduce(arr, fn, initialValue)`**

Đây là method phức tạp nhất vì `reduce` có hai chế độ hoạt động. Khi `initialValue` được cung cấp: `acc` bắt đầu từ `initialValue` và vòng lặp đi từ index `0`. Khi không có `initialValue`: `acc` bắt đầu từ phần tử đầu tiên (`arr[0]`) và vòng lặp đi từ index `1` (bỏ qua phần tử đầu tiên vì nó đã được dùng làm `acc`). Đây đúng với hành vi của `Array.prototype.reduce` gốc.

---

### Chạy test cases

```javascript
console.log(miniArray.map([1, 2, 3], x => x * 2));
// → [2, 4, 6]

console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));
// → [3, 4]

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
```

**Test bổ sung — reduce không có initialValue**

```javascript
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b));
// → 10 (acc bắt đầu từ 1, loop từ index 1)

console.log(miniArray.reduce([5, 10, 3], (max, n) => n > max ? n : max));
// → 10 (tìm max không cần initialValue)
```

**Test — map với index**

```javascript
console.log(miniArray.map(["a", "b", "c"], (item, index) => `${index}: ${item}`));
// → ["0: a", "1: b", "2: c"]
// Chứng minh tham số index được truyền đúng
```

**Test — kết hợp các method**

```javascript
const products = [
    { name: "A", price: 100, inStock: true },
    { name: "B", price: 200, inStock: false },
    { name: "C", price: 150, inStock: true }
];

const totalInStock = miniArray.reduce(
    miniArray.filter(products, p => p.inStock),
    (sum, p) => sum + p.price,
    0
);
console.log(totalInStock);
// → 250 (chỉ tính A và C còn hàng: 100 + 150)
```

---

*Tham chiếu: `06_arrays_objects.md + Array Power Methods`, `06_arrays_objects.md + Arrays — "Danh sách có thứ tự"`*
