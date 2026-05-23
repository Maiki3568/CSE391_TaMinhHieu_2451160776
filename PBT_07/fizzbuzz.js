// Bài B4 — FizzBuzz nâng cao
// Chạy: node fizzbuzz.js


// ==============================================
// Version 1: Classic FizzBuzz (1 đến 100)
// ==============================================

console.log("=== VERSION 1: Classic FizzBuzz ===");

for (var i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
        // Chia hết cho cả 3 và 5 — phải check cái này trước
        // vì nếu check riêng 3 và 5 trước thì sẽ không bao giờ vào đây
        console.log(i + ": FizzBuzz");
    } else if (i % 3 === 0) {
        console.log(i + ": Fizz");
    } else if (i % 5 === 0) {
        console.log(i + ": Buzz");
    } else {
        console.log(i);
    }
}


// ==============================================
// Version 2: Custom FizzBuzz
// ==============================================
// Hàm này nhận vào:
//   n     — số muốn in từ 1 đến n
//   rules — mảng các object { divisor, word }
// Với mỗi số, nó kiểm tra từng rule, nếu chia hết thì ghép word vào kết quả

console.log("\n=== VERSION 2: Custom FizzBuzz ===");

function customFizzBuzz(n, rules) {
    for (var i = 1; i <= n; i++) {
        var ketQua = "";

        // Duyệt qua từng rule và kiểm tra
        for (var j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                // Nếu chia hết thì ghép word vào cuối kết quả
                ketQua = ketQua + rules[j].word;
            }
        }

        // Nếu không khớp rule nào thì in số
        if (ketQua === "") {
            console.log(i);
        } else {
            console.log(i + ": " + ketQua);
        }
    }
}


// Test với 3 rules: Fizz, Buzz, Jazz
console.log("\nTest customFizzBuzz(30, [Fizz/3, Buzz/5, Jazz/7]):");

customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);

// Kiểm tra các case đặc biệt:
// 21 = 3*7    → FizzJazz
// 15 = 3*5    → FizzBuzz
// 35 = 5*7    → BuzzJazz
// 105 = 3*5*7 → FizzBuzzJazz (nhưng n=30 nên không thấy)

console.log("\nKiem tra case dac biet voi n=105:");
customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);
