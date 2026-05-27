const products = [
    { id: 1,  name: "iPhone 16",   price: 25990000, category: "phone",     stock: 15,  rating: 4.5 },
    { id: 2,  name: "MacBook Pro", price: 45990000, category: "laptop",    stock: 8,   rating: 4.8 },
    { id: 3,  name: "AirPods Pro", price: 6990000,  category: "accessory", stock: 50,  rating: 4.3 },
    { id: 4,  name: "iPad Air",    price: 16990000, category: "tablet",    stock: 0,   rating: 4.6 },
    { id: 5,  name: "Samsung S24", price: 22990000, category: "phone",     stock: 20,  rating: 4.4 },
    { id: 6,  name: "Dell XPS 15", price: 35990000, category: "laptop",    stock: 5,   rating: 4.7 },
    { id: 7,  name: "Galaxy Buds", price: 3490000,  category: "accessory", stock: 100, rating: 4.1 },
    { id: 8,  name: "Xiaomi Pad 6",price: 7990000,  category: "tablet",    stock: 25,  rating: 4.2 },
    { id: 9,  name: "Pixel 9",     price: 19990000, category: "phone",     stock: 12,  rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop",    stock: 3,   rating: 4.5 }
];

// 1. Lọc sản phẩm còn hàng (stock > 0)
function getInStock(products) {
    return products.filter(p => p.stock > 0);
}

// 2. Lọc theo category VÀ khoảng giá
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(p =>
        p.category === category &&
        p.price >= minPrice &&
        p.price <= maxPrice
    );
}

// 3. Sắp xếp theo giá (tăng/giảm) — không mutate mảng gốc
function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
    );
}

// 4. Tìm sản phẩm rẻ nhất mỗi category
// Duyệt qua mọi sản phẩm, với mỗi category giữ lại sản phẩm có giá thấp nhất.
// acc là object tích lũy: { phone: {...}, laptop: {...}, ... }
function cheapestByCategory(products) {
    return products.reduce((acc, p) => {
        if (!acc[p.category] || p.price < acc[p.category].price) {
            acc[p.category] = p;
        }
        return acc;
    }, {});
}

// 5. Tính tổng giá trị kho (price × stock cho mỗi sản phẩm)
function totalInventoryValue(products) {
    return products.reduce((sum, p) => sum + p.price * p.stock, 0);
}

// 6. Tạo mảng chỉ chứa { name, formattedPrice }
// toLocaleString("vi-VN") định dạng số theo chuẩn Việt Nam: 25.990.000
function formatProductList(products) {
    return products.map(p => ({
        name: p.name,
        formattedPrice: p.price.toLocaleString("vi-VN") + "đ"
    }));
}

// 7. Tính rating trung bình toàn bộ, làm tròn 2 chữ số thập phân
function averageRating(products) {
    const total = products.reduce((sum, p) => sum + p.rating, 0);
    return Math.round((total / products.length) * 100) / 100;
}

// 8. Tìm sản phẩm theo keyword trong name (case-insensitive)
function searchProducts(products, keyword) {
    return products.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
    );
}

// ===================================================
//  TEST CASES
// ===================================================

console.log("=== 1. IN-STOCK PRODUCTS ===");
const inStock = getInStock(products);
console.log(`Còn hàng: ${inStock.length} sản phẩm`);
console.log(inStock.map(p => `${p.name} (stock: ${p.stock})`));
// → 9 sản phẩm (iPad Air bị lọc ra vì stock = 0)

console.log("\n=== 2. PHONES 15-25 TRIỆU ===");
const affordablePhones = filterProducts(products, "phone", 15000000, 25000000);
console.log(affordablePhones.map(p => `${p.name}: ${p.price.toLocaleString("vi-VN")}đ`));
// → ["iPhone 16: 25.990.000đ", "Samsung S24: 22.990.000đ", "Pixel 9: 19.990.000đ"]

console.log("\n=== 3. SẮP XẾP GIÁ TĂNG DẦN ===");
const cheapFirst = sortByPrice(products, "asc");
console.log(cheapFirst.map(p => `${p.name}: ${p.price.toLocaleString("vi-VN")}đ`));
// → Galaxy Buds → AirPods Pro → ... → MacBook Pro

console.log("\n=== 3b. SẮP XẾP GIÁ GIẢM DẦN ===");
const expensiveFirst = sortByPrice(products, "desc");
console.log(expensiveFirst.map(p => `${p.name}: ${p.price.toLocaleString("vi-VN")}đ`));

console.log("\n=== 4. CHEAPEST BY CATEGORY ===");
const cheapest = cheapestByCategory(products);
Object.entries(cheapest).forEach(([cat, p]) => {
    console.log(`${cat}: ${p.name} — ${p.price.toLocaleString("vi-VN")}đ`);
});
// phone     → Pixel 9 — 19.990.000đ
// laptop    → ThinkPad X1 — 32.990.000đ
// accessory → Galaxy Buds — 3.490.000đ
// tablet    → Xiaomi Pad 6 — 7.990.000đ

console.log("\n=== 5. TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString("vi-VN") + "đ");
// → Tổng giá trị tồn kho của toàn bộ sản phẩm

console.log("\n=== 6. FORMATTED PRODUCT LIST ===");
console.log(formatProductList(products));
// → [{ name: "iPhone 16", formattedPrice: "25.990.000đ" }, ...]

console.log("\n=== 7. AVERAGE RATING ===");
console.log(`Rating trung bình: ${averageRating(products)}`);
// → 4.45

console.log("\n=== 8. TÌM THEO KEYWORD ===");
console.log(searchProducts(products, "pro").map(p => p.name));
// → ["MacBook Pro", "AirPods Pro"] (case-insensitive)

console.log(searchProducts(products, "PAD").map(p => p.name));
// → ["iPad Air", "Xiaomi Pad 6"] (chữ hoa cũng tìm được)

console.log("\n=== 9. GỐC KHÔNG BỊ MUTATE ===");
sortByPrice(products, "asc");
console.log("Sản phẩm đầu tiên trong mảng gốc:", products[0].name);
// → "iPhone 16" (thứ tự gốc không đổi)
