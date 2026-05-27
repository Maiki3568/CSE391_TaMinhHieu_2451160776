// ===================================================
//  1. pipe() — Nối chuỗi functions
// ===================================================
// pipe nhận một danh sách các functions và trả về một function mới.
// Function mới đó nhận một giá trị ban đầu, rồi lần lượt "đẩy" nó
// qua từng function trong danh sách, output của function trước
// trở thành input của function sau.
// Đây là ứng dụng của reduce: dùng giá trị làm accumulator,
// dùng từng fn làm bước biến đổi.

function pipe(...fns) {
    return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

console.log("=== pipe() ===");

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));
// Bước 1: 5 * 2 = 10
// Bước 2: 10 + 10 = 20
// Bước 3: 20.toString() = "20"
// Bước 4: "Kết quả: " + "20" = "Kết quả: 20"
// → "Kết quả: 20"

const formatPrice = pipe(
    price => price * 1.1,                                // Tăng 10% VAT
    price => Math.round(price),                          // Làm tròn
    price => price.toLocaleString("vi-VN") + "đ"        // Định dạng
);
console.log(formatPrice(25990000)); // → "28.589.000đ"


// ===================================================
//  2. memoize() — Cache kết quả
// ===================================================
// memoize nhận một function và trả về một function mới có thêm
// cơ chế cache. Lần đầu gọi với một tập tham số: tính toán và lưu vào cache.
// Lần sau gọi với cùng tham số: trả về ngay từ cache, không tính lại.
// Dùng JSON.stringify(args) làm key để hỗ trợ nhiều tham số.

function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            return cache[key];
        }
        cache[key] = fn(...args);
        return cache[key];
    };
}

console.log("\n=== memoize() ===");

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000));
// → In "Đang tính..." rồi trả về 499999500000

console.log(expensiveCalc(1000000));
// → Không in "Đang tính..." — lấy thẳng từ cache
// → 499999500000

console.log(expensiveCalc(500000));
// → In "Đang tính..." (tham số khác, cache miss)
// → 124999750000

console.log(expensiveCalc(500000));
// → Không in "Đang tính..." (đã cache rồi)

// Test với nhiều tham số
const memoAdd = memoize((a, b) => {
    console.log(`Cộng ${a} + ${b}`);
    return a + b;
});
console.log(memoAdd(3, 4)); // → In "Cộng 3 + 4", trả về 7
console.log(memoAdd(3, 4)); // → Không in gì, trả về 7 từ cache
console.log(memoAdd(5, 6)); // → In "Cộng 5 + 6", trả về 11


// ===================================================
//  3. debounce() — Trì hoãn thực thi
// ===================================================
// debounce trả về một function "được kiềm chế". Mỗi lần function đó
// được gọi, nó hủy timer cũ và đặt timer mới với thời gian delay.
// Chỉ khi không có lần gọi mới nào trong suốt khoảng delay,
// function gốc mới thực sự chạy.
// Ứng dụng phổ biến: search box — chỉ gọi API khi user ngừng gõ.

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

console.log("\n=== debounce() ===");

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Giả lập user gõ liên tục — chỉ lần cuối mới thực sự chạy
search("i");        // Hủy bởi lần sau
search("ip");       // Hủy bởi lần sau
search("iph");      // Hủy bởi lần sau
search("ipho");     // Hủy bởi lần sau
search("iphon");    // Hủy bởi lần sau
search("iphone");   // Chờ 500ms không có gì → chạy

setTimeout(() => {
    console.log("(Sau 600ms, chỉ in một lần)");
    // → "Searching: iphone"
}, 600);


// ===================================================
//  4. retry() — Thử lại nếu lỗi
// ===================================================
// retry nhận một async function và số lần thử tối đa.
// Mỗi lần thử: nếu thành công thì return ngay.
// Nếu thất bại và còn lần thử: log lỗi và thử tiếp.
// Nếu đã hết số lần thử: throw lỗi cuối cùng cho caller xử lý.

async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (err) {
            if (attempt === maxAttempts) {
                throw err;
            }
            console.log(`Lần thử ${attempt} thất bại: ${err.message}. Đang thử lại...`);
        }
    }
}

console.log("\n=== retry() ===");

// Giả lập API hay bị lỗi: thành công ở lần thứ 3
let callCount = 0;
const unstableApi = () => new Promise((resolve, reject) => {
    callCount++;
    if (callCount < 3) {
        reject(new Error(`Server lỗi (lần ${callCount})`));
    } else {
        resolve({ data: "OK", attempt: callCount });
    }
});

retry(unstableApi, 3)
    .then(result => console.log("Thành công:", result))
    .catch(err => console.log("Thất bại hoàn toàn:", err.message));
// → Lần thử 1 thất bại: Server lỗi (lần 1). Đang thử lại...
// → Lần thử 2 thất bại: Server lỗi (lần 2). Đang thử lại...
// → Thành công: { data: "OK", attempt: 3 }

// Test: thất bại hoàn toàn sau maxAttempts lần
let failCount = 0;
const alwaysFail = () => new Promise((_, reject) => {
    failCount++;
    reject(new Error(`Lỗi lần ${failCount}`));
});

retry(alwaysFail, 3)
    .then(result => console.log("Không nên tới đây"))
    .catch(err => console.log("Đúng rồi — thất bại sau 3 lần:", err.message));
// → Lần thử 1 thất bại...
// → Lần thử 2 thất bại...
// → Đúng rồi — thất bại sau 3 lần: Lỗi lần 3
