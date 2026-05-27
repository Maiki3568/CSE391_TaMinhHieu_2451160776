function calculate(num1, operator, num2) {

    // Kiem tra input co phai so khong
    if (isNaN(Number(num1)) || isNaN(Number(num2))) {
        return "Loi: Input khong phai so";
    }

    // Chuyen sang number
    let n1 = Number(num1);
    let n2 = Number(num2);

    // Cong
    if (operator === "+") {
        return n1 + n2;
    }

    // Tru
    if (operator === "-") {
        return n1 - n2;
    }

    // Nhan
    if (operator === "*") {
        return n1 * n2;
    }

    // Chia
    if (operator === "/") {

        if (n2 === 0) {
            return "Loi: Khong the chia cho 0";
        }

        return n1 / n2;
    }

    // Chia lay du
    if (operator === "%") {

        if (n2 === 0) {
            return "Loi: Khong the chia cho 0";
        }

        return n1 % n2;
    }

    // Luy thua
    if (operator === "**") {
        return n1 ** n2;
    }

    // Operator khong hop le
    return "Loi: Operator '" + operator + "' khong hop le";
}



console.log(calculate(10, "+", 5));
console.log(calculate(10, "/", 0));
console.log(calculate(10, "^", 5));
console.log(calculate("abc", "+", 5));
console.log(calculate(2, "**", 10));



const output = document.getElementById("output");

function print(text) {
    output.innerHTML += text + "<br>";
}

print("10 + 5 = " + calculate(10, "+", 5));

print("10 / 0 = " + calculate(10, "/", 0));

print("10 ^ 5 = " + calculate(10, "^", 5));

print("abc + 5 = " + calculate("abc", "+", 5));

print("2 ** 10 = " + calculate(2, "**", 10));