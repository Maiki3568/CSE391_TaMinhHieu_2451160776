// Bài B1 — Máy tính đơn giản
// Chạy: node calculator.js

function calculate(num1, operator, num2) {
    // Kiểm tra input có phải số không
    // Number("abc") ra NaN, isNaN(NaN) là true
    if (isNaN(Number(num1)) || isNaN(Number(num2))) {
        return "Loi: Input khong phai so";
    }

    // Chuyển về số thực sự để tính toán
    var n1 = Number(num1);
    var n2 = Number(num2);

    // Xử lý từng operator
    if (operator === "+") {
        return n1 + n2;
    }

    if (operator === "-") {
        return n1 - n2;
    }

    if (operator === "*") {
        return n1 * n2;
    }

    if (operator === "/") {
        // Phải kiểm tra chia cho 0 trước khi tính
        if (n2 === 0) {
            return "Loi: Khong the chia cho 0";
        }
        return n1 / n2;
    }

    if (operator === "%") {
        if (n2 === 0) {
            return "Loi: Khong the chia cho 0";
        }
        return n1 % n2;
    }

    if (operator === "**") {
        return n1 ** n2;
    }

    // Nếu operator không khớp với bất kỳ cái nào ở trên
    return "Loi: Operator '" + operator + "' khong hop le";
}


// ============================================
// Chạy test
// ============================================

console.log(calculate(10, "+", 5));      // 15
console.log(calculate(10, "-", 3));      // 7
console.log(calculate(10, "*", 4));      // 40
console.log(calculate(10, "/", 0));      // Loi: Khong the chia cho 0
console.log(calculate(10, "^", 5));      // Loi: Operator '^' khong hop le
console.log(calculate("abc", "+", 5));   // Loi: Input khong phai so
console.log(calculate(2, "**", 10));     // 1024
console.log(calculate(10, "%", 3));      // 1
console.log(calculate(10, "/", 4));      // 2.5
