// Tier 3 — Solution: components/ProductCard.jsx
// Nhận props: name, price, image

function ProductCard({ name, price, image }) {
    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            width: "200px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>
            <img
                src={image}
                alt={name}
                style={{ width: "100%", borderRadius: "4px", marginBottom: "10px" }}
            />
            <h3 style={{ margin: "0 0 8px" }}>{name}</h3>
            <p style={{ color: "#e74c3c", fontWeight: "bold", margin: "0 0 12px" }}>
                {price}đ
            </p>
            <button style={{
                background: "#3498db",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
            }}>
                Thêm vào giỏ 🛒
            </button>
        </div>
    );
}

export default ProductCard;
