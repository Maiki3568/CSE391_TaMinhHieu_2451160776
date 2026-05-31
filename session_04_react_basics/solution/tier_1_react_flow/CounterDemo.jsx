// Tier 1 — Solution: CounterDemo.jsx
// So sánh biến thường vs useState

import { useState } from "react";

// ❌ KHÔNG HOẠT ĐỘNG — Biến thường không trigger re-render
function BadCounter() {
    let count = 0;

    function handleClick() {
        count = count + 1;
        console.log("Count (biến thường):", count); // Tăng trong console...
        // ...nhưng UI không cập nhật vì React không biết state thay đổi!
    }

    return (
        <div style={{ padding: "20px", border: "2px solid #e74c3c", marginBottom: "20px" }}>
            <h2>❌ BadCounter (biến thường)</h2>
            <p style={{ fontSize: "32px" }}>{count}</p>
            <button onClick={handleClick} style={{ padding: "8px 16px" }}>
                Tăng (+1)
            </button>
            <p style={{ color: "#e74c3c", fontSize: "14px" }}>
                Mở Console → nhấn nút → console tăng nhưng UI không đổi!
            </p>
        </div>
    );
}

// ✅ HOẠT ĐỘNG — useState trigger re-render
function GoodCounter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1); // React biết cần re-render → UI cập nhật!
        console.log("Count (useState):", count + 1);
    }

    return (
        <div style={{ padding: "20px", border: "2px solid #27ae60", marginBottom: "20px" }}>
            <h2>✅ GoodCounter (useState)</h2>
            <p style={{ fontSize: "32px" }}>{count}</p>
            <button onClick={handleClick} style={{ padding: "8px 16px", background: "#27ae60", color: "white", border: "none" }}>
                Tăng (+1)
            </button>
            <p style={{ color: "#27ae60", fontSize: "14px" }}>
                Nhấn nút → UI cập nhật ngay lập tức!
            </p>
        </div>
    );
}

// FlowDemo — quan sát luồng re-render
function FlowDemo() {
    console.log("🔄 FlowDemo render!");

    const [step, setStep] = useState(1);

    const steps = {
        1: "👋 Bước 1: Component mount — hiển thị lần đầu",
        2: "📝 Bước 2: setStep(2) được gọi → re-render",
        3: "🔄 Bước 3: JSX mới được return",
        4: "✅ Bước 4: React cập nhật DOM — xong!",
    };

    return (
        <div style={{ padding: "20px", border: "2px solid #3498db" }}>
            <h2>Luồng hoạt động</h2>
            <p>Step hiện tại: <strong>{step}</strong></p>

            <div style={{ padding: "15px", background: "#eaf4ff", marginBottom: "15px", borderRadius: "4px" }}>
                {steps[step] || "🎉 Đã xem hết! Nhấn Reset"}
            </div>

            <button onClick={() => setStep(step < 4 ? step + 1 : step)} style={{ marginRight: "8px", padding: "8px 16px" }}>
                Bước tiếp →
            </button>
            <button onClick={() => setStep(1)} style={{ padding: "8px 16px" }}>
                Reset
            </button>

            <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
                💡 Mở Console để thấy "🔄 FlowDemo render!" mỗi khi step thay đổi
            </p>
        </div>
    );
}

// App tổng hợp
function App() {
    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h1>Tier 1 — So sánh Biến vs useState</h1>
            <BadCounter />
            <GoodCounter />
            <FlowDemo />
        </div>
    );
}

export default App;
