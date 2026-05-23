// Câu A1 — Kiểm chứng var / let / const
// Chạy: node var_let_const.js

// ==============================================
// Đoạn 1 — var hoisting
// ==============================================
// Dự đoán: undefined
// Nguyên nhân: var x được hoisted lên đầu, nhưng giá trị chưa gán
console.log("Doan 1:");
console.log(x);  // undefined
var x = 5;

// ==============================================
// Đoạn 2 — let TDZ (Temporal Dead Zone)
// ==============================================
// Dự đoán: ReferenceError
// Nguyên nhân: let có TDZ — không đọc được trước khi khai báo
console.log("\nDoan 2:");
try {
    console.log(y);  // ReferenceError
    let y = 10;
} catch (err) {
    console.log("Loi:", err.message);
}

// ==============================================
// Đoạn 3 — const không gán lại được
// ==============================================
// Dự đoán: TypeError
console.log("\nDoan 3:");
try {
    const z = 15;
    z = 20;          // TypeError: Assignment to constant variable
    console.log(z);  // Dong nay khong chay den
} catch (err) {
    console.log("Loi:", err.message);
}

// ==============================================
// Đoạn 4 — const với array
// ==============================================
// Dự đoán: [1, 2, 3, 4]
// Nguyên nhân: const chi khoa bien, khong khoa noi dung cua array
console.log("\nDoan 4:");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);  // [1, 2, 3, 4]

// ==============================================
// Đoạn 5 — let block scope
// ==============================================
// Dự đoán: "Trong block: 2" roi "Ngoai block: 1"
// Nguyên nhân: let a trong {} la bien rieng, khong anh huong bien ngoai
console.log("\nDoan 5:");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);   // 2
}
console.log("Ngoai block:", a);       // 1
