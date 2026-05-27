function createCart() {
    // Biến private — không thể truy cập từ bên ngoài hàm createCart.
    // Đây là trái tim của Closure pattern: items và discountAmount chỉ
    // tồn tại bên trong execution context của createCart(), nhưng tất cả
    // methods trong object trả về đều giữ tham chiếu đến chúng thông qua Closure.
    let items = [];
    let discountAmount = 0;

    return {
        // Thêm sản phẩm — nếu id đã tồn tại thì tăng quantity, không tạo mới
        addItem(product, quantity = 1) {
            const existing = items.find(i => i.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        // Xóa sản phẩm theo id — tạo mảng mới không chứa item bị xóa
        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },

        // Cập nhật số lượng theo id
        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },

        // Tính tổng tiền sau khi áp dụng giảm giá
        getTotal() {
            const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
            return subtotal - discountAmount;
        },

        // Tính subtotal riêng để dùng nội bộ (không expose ra ngoài)
        _getSubtotal() {
            return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },

        // Áp dụng mã giảm giá
        // "SALE10" → giảm 10% trên subtotal
        // "SALE20" → giảm 20% trên subtotal
        // "FREESHIP" → giảm cố định 30.000đ
        applyDiscount(code) {
            const subtotal = this._getSubtotal();
            const discountRules = {
                "SALE10":    subtotal * 0.1,
                "SALE20":    subtotal * 0.2,
                "FREESHIP":  30000
            };
            discountAmount = discountRules[code] || 0;
            if (!discountRules[code]) {
                console.log(`Mã "${code}" không hợp lệ.`);
            } else {
                console.log(`Áp dụng mã ${code}: giảm ${discountAmount.toLocaleString("vi-VN")}đ`);
            }
        },

        // In giỏ hàng dạng bảng
        printCart() {
            const LINE = "─".repeat(70);
            const subtotal = this._getSubtotal();
            const total    = this.getTotal();
            const discount = subtotal - total;

            console.log("┌" + LINE + "┐");
            console.log(
                "│ " +
                "  # ".padEnd(4) +
                "Sản phẩm".padEnd(22) +
                "SL".padStart(4) +
                "  Đơn giá".padStart(16) +
                "  Tổng".padStart(16) +
                " │"
            );
            console.log("├" + LINE + "┤");

            items.forEach((item, idx) => {
                const lineTotal = item.price * item.quantity;
                console.log(
                    "│ " +
                    String(idx + 1).padEnd(4) +
                    item.name.padEnd(22) +
                    String(item.quantity).padStart(4) +
                    item.price.toLocaleString("vi-VN").padStart(16) +
                    lineTotal.toLocaleString("vi-VN").padStart(16) +
                    " │"
                );
            });

            console.log("├" + LINE + "┤");

            if (discount > 0) {
                console.log(
                    "│ " +
                    "Tạm tính:".padEnd(48) +
                    subtotal.toLocaleString("vi-VN").padStart(20) + "đ │"
                );
                console.log(
                    "│ " +
                    "Giảm giá:".padEnd(48) +
                    ("-" + discount.toLocaleString("vi-VN")).padStart(20) + "đ │"
                );
                console.log("├" + LINE + "┤");
            }

            console.log(
                "│ " +
                "TỔNG CỘNG:".padEnd(48) +
                total.toLocaleString("vi-VN").padStart(20) + "đ │"
            );
            console.log("└" + LINE + "┘");
        },

        // Lấy tổng số lượng sản phẩm (tổng quantity, không phải số loại)
        getItemCount() {
            return items.reduce((sum, i) => sum + i.quantity, 0);
        },

        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountAmount = 0;
            console.log("Đã xóa toàn bộ giỏ hàng.");
        }
    };
}

// ===================================================
//  TEST CASES
// ===================================================

const cart = createCart();

console.log("=== THÊM SẢN PHẨM ===");
cart.addItem({ id: 1, name: "iPhone 16",   price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000  }, 2);
cart.addItem({ id: 1, name: "iPhone 16",   price: 25990000 }, 1); // Tăng lên 2

console.log("\nGiỏ hàng ban đầu:");
cart.printCart();
// iPhone 16:    SL 2, đơn giá 25.990.000, tổng 51.980.000
// AirPods Pro:  SL 2, đơn giá 6.990.000,  tổng 13.980.000
// TỔNG CỘNG: 65.960.000đ

console.log("\nSố sản phẩm:", cart.getItemCount()); // → 4

console.log("\n=== ÁP DỤNG MÃ GIẢM GIÁ SALE10 ===");
cart.applyDiscount("SALE10");
cart.printCart();
// Tạm tính: 65.960.000đ
// Giảm giá: -6.596.000đ
// TỔNG CỘNG: 59.364.000đ

console.log("\n=== THỬ MÃ KHÔNG HỢP LỆ ===");
cart.applyDiscount("XYZ99");

console.log("\n=== ÁP DỤNG FREESHIP ===");
cart.applyDiscount("FREESHIP");
cart.printCart();
// Giảm: 30.000đ
// TỔNG CỘNG: 65.930.000đ

console.log("\n=== XÓA SẢN PHẨM ===");
cart.removeItem(3);
console.log("Sau khi xóa AirPods Pro:");
cart.printCart();
// Chỉ còn iPhone 16 x2
console.log("Số sản phẩm:", cart.getItemCount()); // → 2

console.log("\n=== CẬP NHẬT SỐ LƯỢNG ===");
cart.updateQuantity(1, 3);
cart.printCart();
// iPhone 16 x3

console.log("\n=== XÓA TOÀN BỘ GIỎ ===");
cart.clearCart();
console.log("Số sản phẩm sau clear:", cart.getItemCount()); // → 0

console.log("\n=== KIỂM TRA PRIVATE STATE ===");
// items không thể truy cập trực tiếp từ bên ngoài:
console.log(typeof cart.items); // → "undefined" — items là private, không exposed
