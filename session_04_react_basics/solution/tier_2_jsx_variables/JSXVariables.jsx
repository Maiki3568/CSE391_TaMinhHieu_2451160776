// Tier 2 — Solution: JSXVariables.jsx
// Biến trong JSX: {}, ternary, &&, .map()

// ===== Bài 2.1 — Biến đơn giản =====
function MyProfile() {
    const ten = "Nguyễn Văn Minh";
    const tuoi = 20;
    const ngheNghiep = "Sinh viên năm 3";
    const kyNang = ["HTML", "CSS", "JavaScript", "React"];

    const gio = new Date().getHours();
    const loi_chao =
        gio < 12 ? "Chào buổi sáng ☀️" :
        gio < 18 ? "Chào buổi chiều 🌤️" :
        "Chào buổi tối 🌙";

    const canNang = 65; // kg
    const chieuCao = 1.70; // m
    const bmi = (canNang / (chieuCao * chieuCao)).toFixed(1);

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2>{loi_chao}</h2>
            <h1>Xin chào, {ten}!</h1>
            <p>Tuổi: {tuoi} (năm sau: {tuoi + 1})</p>
            <p>Nghề nghiệp: {ngheNghiep}</p>
            <p>Kỹ năng: {kyNang.join(", ")}</p>
            <p>BMI: {bmi} ({bmi < 18.5 ? "Gầy" : bmi < 25 ? "Bình thường" : "Thừa cân"})</p>
        </div>
    );
}

// ===== Bài 2.2 — Conditional Rendering =====
function ProductCard() {
    const isInStock = true;
    const isOnSale = true;
    const price = 500000;
    const salePrice = 350000;
    const rating = 4;

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", width: "250px" }}>
            <h3>Tai nghe Bluetooth</h3>

            {/* Trạng thái hàng */}
            <p>
                {isInStock
                    ? <span style={{ color: "green" }}>🟢 Còn hàng</span>
                    : <span style={{ color: "red" }}>🔴 Hết hàng</span>
                }
            </p>

            {/* Giá — có thể gạch giá gốc nếu đang sale */}
            <div>
                {isOnSale ? (
                    <>
                        <span style={{ textDecoration: "line-through", color: "#999", marginRight: "8px" }}>
                            {price.toLocaleString()}đ
                        </span>
                        <span style={{ color: "#e74c3c", fontWeight: "bold" }}>
                            {salePrice.toLocaleString()}đ
                        </span>
                    </>
                ) : (
                    <span style={{ fontWeight: "bold" }}>{price.toLocaleString()}đ</span>
                )}
            </div>

            {/* Badge nổi bật */}
            {rating >= 4 && (
                <span style={{ background: "#f39c12", color: "white", padding: "2px 8px", borderRadius: "4px", fontSize: "12px" }}>
                    ⭐ Nổi bật
                </span>
            )}
        </div>
    );
}

// ===== Bài 2.3 — Render danh sách =====
function ProductList() {
    const products = [
        { id: 1, name: "Bàn phím cơ", price: 1200000 },
        { id: 2, name: "Chuột gaming", price: 850000 },
        { id: 3, name: "Tai nghe", price: 450000 },
        { id: 4, name: "Webcam", price: 980000 },
        { id: 5, name: "Đèn LED", price: 320000 },
    ];

    const tongTien = products.reduce((sum, p) => sum + p.price, 0);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách sản phẩm</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {products.map((product) => (
                    <li
                        key={product.id}
                        style={{
                            padding: "8px",
                            marginBottom: "4px",
                            background: "#f9f9f9",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>{product.name}</span>
                        <span style={{ color: product.price > 1000000 ? "#e74c3c" : "#333", fontWeight: "bold" }}>
                            {product.price.toLocaleString()}đ
                        </span>
                    </li>
                ))}
            </ul>
            <p style={{ fontWeight: "bold", borderTop: "2px solid #333", paddingTop: "8px" }}>
                Tổng: {tongTien.toLocaleString()}đ
            </p>
        </div>
    );
}

function App() {
    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
            <h1>Tier 2 — Biến trong JSX</h1>
            <MyProfile />
            <hr />
            <ProductCard />
            <hr />
            <ProductList />
        </div>
    );
}

export default App;
