// Tier 3 — Solution: components/Footer.jsx

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer style={{
            background: "#2c3e50",
            color: "#aaa",
            textAlign: "center",
            padding: "20px",
            marginTop: "40px",
        }}>
            <p>© {year} ReactShop. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
