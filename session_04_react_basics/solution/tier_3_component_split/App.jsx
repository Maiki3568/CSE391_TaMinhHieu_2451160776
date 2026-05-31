// Tier 3 — Solution: App.jsx
// Ghép Header + ProductCard (từ array) + Footer

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";

const products = [
    { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://via.placeholder.com/200x200?text=iPhone+15" },
    { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://via.placeholder.com/200x200?text=Samsung+S24" },
    { id: 3, name: "Xiaomi 14", price: "15.000.000", image: "https://via.placeholder.com/200x200?text=Xiaomi+14" },
];

function App() {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh" }}>
            {/* Component con: Header */}
            <Header />

            {/* Main content */}
            <main style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
                    Sản phẩm nổi bật
                </h2>

                {/* Render danh sách ProductCard từ array bằng .map() */}
                <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </div>
            </main>

            {/* Component con: Footer */}
            <Footer />
        </div>
    );
}

export default App;

// ====== Key takeaways ======
// 1. Mỗi component = 1 file riêng trong /components/
// 2. export default ở cuối mỗi file component
// 3. import ở đầu file dùng đến component đó
// 4. Truyền dữ liệu bằng props (name, price, image)
// 5. .map() + key để render danh sách component
