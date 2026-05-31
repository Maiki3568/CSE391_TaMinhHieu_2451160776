// Tier 4 — Solution: UseStateDemo.jsx
// useState với số, chuỗi, boolean, kết hợp

import { useState } from "react";

// ===== Bài 4.1 — useState với số =====
function Calculator() {
    const [count, setCount] = useState(0);

    const mauSo = count > 0 ? "#27ae60" : count < 0 ? "#e74c3c" : "#333";
    const nhanXet = count > 0 ? "Số dương +" : count < 0 ? "Số âm −" : "Bằng 0";

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
            <h2>Calculator</h2>
            <p style={{ fontSize: "48px", color: mauSo, margin: "10px 0" }}>{count}</p>
            <p style={{ color: mauSo }}>{nhanXet}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button onClick={() => setCount(count + 1)}>+1</button>
                <button onClick={() => setCount(count - 1)} disabled={count === 0}>-1</button>
                <button onClick={() => setCount(0)}>Reset</button>
                <button onClick={() => setCount(count * 2)}>×2</button>
                <button onClick={() => setCount(count + 5)}>+5</button>
            </div>
        </div>
    );
}

// ===== Bài 4.2 — useState với chuỗi =====
function LiveSearch() {
    const [query, setQuery] = useState("");
    const MAX = 50;
    const remaining = MAX - query.length;
    const isNearLimit = remaining <= 10;

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
            <h2>Live Search</h2>
            <div style={{ display: "flex", gap: "8px" }}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm kiếm..."
                    maxLength={MAX}
                    style={{
                        flex: 1,
                        padding: "8px",
                        border: `2px solid ${isNearLimit ? "#e74c3c" : "#ddd"}`,
                        borderRadius: "4px",
                    }}
                />
                <button onClick={() => setQuery("")}>Xóa</button>
            </div>
            <p style={{ color: isNearLimit ? "#e74c3c" : "#666", fontSize: "13px" }}>
                {query.length}/{MAX} ký tự {isNearLimit && "⚠️ Sắp hết!"}
            </p>
            {query && (
                <p style={{ background: "#eaf4ff", padding: "8px", borderRadius: "4px" }}>
                    🔍 Bạn đang tìm: <strong>{query}</strong>
                </p>
            )}
        </div>
    );
}

// ===== Bài 4.3 — useState với boolean =====
function SettingsPanel() {
    const [isDark, setIsDark] = useState(false);
    const [isNotif, setIsNotif] = useState(true);
    const [showPass, setShowPass] = useState(false);

    const bgStyle = {
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
        background: isDark ? "#2c3e50" : "#fff",
        color: isDark ? "#ecf0f1" : "#333",
        transition: "all 0.3s",
    };

    return (
        <div style={bgStyle}>
            <h2>⚙️ Settings</h2>

            {/* Dark mode */}
            <div style={{ marginBottom: "12px" }}>
                <button onClick={() => setIsDark(!isDark)}>
                    {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            {/* Thông báo */}
            <div style={{ marginBottom: "12px" }}>
                <button onClick={() => setIsNotif(!isNotif)}>
                    {isNotif ? "🔕 Tắt thông báo" : "🔔 Bật thông báo"}
                </button>
                {isNotif && (
                    <div style={{ marginTop: "8px", padding: "8px", background: "#fff3cd", borderRadius: "4px", color: "#333" }}>
                        📢 Bạn có 3 thông báo mới
                    </div>
                )}
            </div>

            {/* Hiện/ẩn mật khẩu */}
            <div>
                <input
                    type={showPass ? "text" : "password"}
                    defaultValue="matkhaubimatlam"
                    style={{ padding: "6px", marginRight: "8px" }}
                />
                <button onClick={() => setShowPass(!showPass)}>
                    {showPass ? "👁️ Ẩn" : "👁️ Hiện"}
                </button>
            </div>
        </div>
    );
}

// ===== Bài 4.4 — Nhiều useState: Form =====
function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function validate() {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Vui lòng nhập tên";
        if (!email.includes("@")) newErrors.email = "Email không hợp lệ";
        if (!age || age < 1 || age > 100) newErrors.age = "Tuổi phải từ 1 đến 100";
        return newErrors;
    }

    function handleSubmit() {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div style={{ padding: "20px", background: "#d4edda", borderRadius: "8px" }}>
                <h3>✅ Đăng ký thành công!</h3>
                <p>Tên: {name}</p>
                <p>Email: {email}</p>
                <p>Tuổi: {age}</p>
                <p>Sinh viên: {isStudent ? "Có" : "Không"}</p>
                <button onClick={() => { setName(""); setEmail(""); setAge(""); setIsStudent(false); setSubmitted(false); }}>
                    Đăng ký lại
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2>Form đăng ký</h2>
            <div style={{ marginBottom: "12px" }}>
                <label>Tên: </label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <span style={{ color: "red", fontSize: "13px" }}> {errors.name}</span>}
            </div>
            <div style={{ marginBottom: "12px" }}>
                <label>Email: </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <span style={{ color: "red", fontSize: "13px" }}> {errors.email}</span>}
            </div>
            <div style={{ marginBottom: "12px" }}>
                <label>Tuổi: </label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "60px" }} />
                {errors.age && <span style={{ color: "red", fontSize: "13px" }}> {errors.age}</span>}
            </div>
            <div style={{ marginBottom: "16px" }}>
                <label>
                    <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} />
                    {" "}Là sinh viên
                </label>
            </div>
            <button onClick={handleSubmit} style={{ padding: "8px 20px", background: "#3498db", color: "white", border: "none", borderRadius: "4px" }}>
                Đăng ký
            </button>
        </div>
    );
}

function App() {
    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial" }}>
            <h1>Tier 4 — useState cơ bản</h1>
            <Calculator />
            <LiveSearch />
            <SettingsPanel />
            <RegisterForm />
        </div>
    );
}

export default App;
