
console.log("Doan 1:");
console.log(x);  // undefined
var x = 5;


console.log("\nDoan 2:");
try {
    console.log(y);  // ReferenceError
    let y = 10;
} catch (err) {
    console.log("Loi:", err.message);
}



console.log("\nDoan 3:");
try {
    const z = 15;
    z = 20;          
    console.log(z);  
} catch (err) {
    console.log("Loi:", err.message);
}


console.log("\nDoan 4:");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);  // [1, 2, 3, 4]


console.log("\nDoan 5:");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);   
}
console.log("Ngoai block:", a);       
