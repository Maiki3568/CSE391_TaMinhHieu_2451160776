

console.log("=== VERSION 1: Classic FizzBuzz ===");

for (var i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      
        console.log(i + ": FizzBuzz");
    } else if (i % 3 === 0) {
        console.log(i + ": Fizz");
    } else if (i % 5 === 0) {
        console.log(i + ": Buzz");
    } else {
        console.log(i);
    }
}




console.log("\n=== VERSION 2: Custom FizzBuzz ===");

function customFizzBuzz(n, rules) {
    for (var i = 1; i <= n; i++) {
        var ketQua = "";

        for (var j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
               
                ketQua = ketQua + rules[j].word;
            }
        }

   
        if (ketQua === "") {
            console.log(i);
        } else {
            console.log(i + ": " + ketQua);
        }
    }
}



console.log("\nTest customFizzBuzz(30, [Fizz/3, Buzz/5, Jazz/7]):");

customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);



console.log("\nKiem tra case dac biet voi n=105:");
customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);
