// Tier 5 — Solution: EventsDemo.jsx
// onClick, onChange, onKeyDown, onSubmit

import { useState } from "react";

// ===== Bài 5.1 — Click Events: ColorBox =====
function ColorBox() {
    const [color, setColor] = useState("#3498db");
    const [count, setCount] = useState(0);

    function randomColor() {
        const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
        setColor(newColor);
        setCount(c => c + 1);
    }

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
            <h2>🎨 Color Box</h2>
            <div style={{
                width: "200px", height: "200px",
                background: color,
                borderRadius: "8px",
                marginBottom: "10px",
                transition: "background 0.3s",
            }} />
            <p>Màu hiện tại: <code>{color}</code></p>
            <p>Đã đổi: {count} lần</p>
            <button onClick={randomColor} style={{ padding: "8px 16px" }}>
                🎲 Đổi màu ngẫu nhiên
            </button>
        </div>
    );
}

// ===== Bài 5.2 — Input Events: EmailValidator =====
function EmailValidator() {
    const [email, setEmail] = useState("");

    const isEmpty = email.length === 0;
    const isValid = email.includes("@") && email.split("@")[1]?.includes(".");

    const borderColor = isEmpty ? "#ddd" : isValid ? "#27ae60" : "#e74c3c";
    const statusText = isEmpty ? "" : isValid ? "✅ Email hợp lệ" : "❌ Email không hợp lệ";
    const statusColor = isValid ? "#27ae60" : "#e74c3c";

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
            <h2>📧 Email Validator</h2>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email..."
                style={{ padding: "8px", width: "300px", border: `2px solid ${borderColor}`, borderRadius: "4px" }}
            />
            <p style={{ color: "#666", fontSize: "13px" }}>{email.length} ký tự</p>
            {!isEmpty && <p style={{ color: statusColor }}>{statusText}</p>}
        </div>
    );
}

// ===== Bài 5.3 — Keyboard Events: KeyGame =====
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function KeyGame() {
    const [target, setTarget] = useState(() => ALPHABET[Math.floor(Math.random() * 26)]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");

    function nextKey() {
        setTarget(ALPHABET[Math.floor(Math.random() * 26)]);
        setFeedback("");
    }

    function handleKeyDown(e) {
        const pressed = e.key.toUpperCase();
        if (!ALPHABET.includes(pressed)) return;

        if (pressed === target) {
            setScore(s => s + 1);
            setFeedback("✅ Đúng rồi!");
            setTimeout(nextKey, 600);
        } else {
            setFeedback(`❌ Sai! Bạn nhấn ${pressed}`);
        }
    }

    return (
        <div
            style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px", outline: "none" }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <h2>⌨️ Key Game</h2>
            <p style={{ fontSize: "14px", color: "#666" }}>Click vào khung này rồi nhấn phím</p>
            <p style={{ fontSize: "80px", textAlign: "center", fontWeight: "bold", color: "#3498db", margin: "10px 0" }}>
                {target}
            </p>
            <p style={{ fontSize: "18px", textAlign: "center", minHeight: "28px", color: feedback.includes("✅") ? "#27ae60" : "#e74c3c" }}>
                {feedback}
            </p>
            <p style={{ textAlign: "center" }}>⭐ Điểm: {score}</p>
        </div>
    );
}

// ===== Bài 5.4 — Form Events: ContactForm =====
const SUBJECTS = ["Hỗ trợ kỹ thuật", "Hợp tác kinh doanh", "Góp ý sản phẩm", "Khác"];

function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault(); // Ngăn reload trang!
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Bắt buộc";
        if (!form.email.includes("@")) newErrors.email = "Email không hợp lệ";
        if (!form.subject) newErrors.subject = "Bắt buộc";
        if (!form.message.trim()) newErrors.message = "Bắt buộc";

        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
        setSubmitted(true);
    }

    if (submitted) return (
        <div style={{ padding: "20px", background: "#d4edda", borderRadius: "8px" }}>
            <h3>✅ Đã gửi thành công!</h3>
            <p>Chúng tôi sẽ liên hệ lại qua <strong>{form.email}</strong></p>
            <button onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setSubmitted(false); }}>
                Gửi lại
            </button>
        </div>
    );

    const inputStyle = { padding: "8px", width: "100%", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box" };
    const errStyle = { color: "red", fontSize: "12px" };

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2>📬 Liên hệ</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "12px" }}>
                    <label>Tên *</label>
                    <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
                    {errors.name && <p style={errStyle}>{errors.name}</p>}
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <label>Email *</label>
                    <input name="email" value={form.email} onChange={handleChange} style={inputStyle} />
                    {errors.email && <p style={errStyle}>{errors.email}</p>}
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <label>Chủ đề *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}>
                        <option value="">-- Chọn chủ đề --</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.subject && <p style={errStyle}>{errors.subject}</p>}
                </div>
                <div style={{ marginBottom: "16px" }}>
                    <label>Tin nhắn *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} style={inputStyle} />
                    {errors.message && <p style={errStyle}>{errors.message}</p>}
                </div>
                <button type="submit" style={{ padding: "10px 24px", background: "#3498db", color: "white", border: "none", borderRadius: "4px" }}>
                    Gửi
                </button>
            </form>
        </div>
    );
}

function App() {
    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial" }}>
            <h1>Tier 5 — Events cơ bản</h1>
            <ColorBox />
            <EmailValidator />
            <KeyGame />
            <ContactForm />
        </div>
    );
}

export default App;
