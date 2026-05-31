// App.jsx — Todo App hoàn chỉnh (Tier 7)
// Tổng hợp: useState + Events + Lists + CRUD + Component Split

import { useState } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import { sampleTodos } from "./data/sampleTodos";

function App() {
    // ===== STATE (Tier 4) =====
    const [todos, setTodos] = useState(sampleTodos);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");

    // ===== CREATE — Thêm todo (Tier 6) =====
    function addTodo() {
        const text = inputValue.trim();
        if (!text) return;

        const newTodo = {
            id: Date.now(),
            text,
            done: false,
            createdAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        };

        setTodos([...todos, newTodo]);
        setInputValue("");
    }

    // Xử lý phím Enter (Tier 5)
    function handleKeyDown(e) {
        if (e.key === "Enter") addTodo();
    }

    // ===== TOGGLE done/undone (Tier 6) =====
    function toggleTodo(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    }

    // ===== DELETE — Xóa todo (Tier 6) =====
    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    // Xóa tất cả đã hoàn thành
    function clearCompleted() {
        setTodos(todos.filter(todo => !todo.done));
    }

    // ===== FILTER — Lọc (Tier 2) =====
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true; // "all"
    });

    // ===== COMPUTED VALUES — Tính toán (Tier 2) =====
    const counts = {
        all: todos.length,
        active: todos.filter(t => !t.done).length,
        completed: todos.filter(t => t.done).length,
    };

    // ===== RENDER =====
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "40px 16px",
            fontFamily: "'Segoe UI', Arial, sans-serif",
        }}>
            <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "30px",
                width: "100%",
                maxWidth: "520px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}>
                {/* ===== HEADER ===== */}
                <h1 style={{
                    textAlign: "center",
                    margin: "0 0 24px",
                    fontSize: "28px",
                    color: "#2c3e50",
                    letterSpacing: "1px",
                }}>
                    📋 Todo List
                </h1>

                {/* ===== INPUT (Tier 4, 5) ===== */}
                <div style={{ display: "flex", marginBottom: "20px", gap: "8px" }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Thêm công việc mới... (Enter để thêm)"
                        style={{
                            flex: 1,
                            padding: "12px 16px",
                            fontSize: "15px",
                            border: "2px solid #e8e8e8",
                            borderRadius: "8px",
                            outline: "none",
                            transition: "border-color 0.2s",
                        }}
                        onFocus={e => e.target.style.borderColor = "#3498db"}
                        onBlur={e => e.target.style.borderColor = "#e8e8e8"}
                    />
                    <button
                        onClick={addTodo}
                        style={{
                            padding: "12px 20px",
                            background: inputValue.trim() ? "#3498db" : "#bdc3c7",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: inputValue.trim() ? "pointer" : "default",
                            fontSize: "20px",
                            transition: "background 0.2s",
                        }}
                    >
                        ＋
                    </button>
                </div>

                {/* ===== FILTER (Tier 3: component con) ===== */}
                <TodoFilter filter={filter} setFilter={setFilter} counts={counts} />

                {/* ===== DANH SÁCH (Tier 6: CRUD) ===== */}
                {filteredTodos.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 20px", color: "#bbb" }}>
                        {todos.length === 0
                            ? <><p style={{ fontSize: "48px" }}>📝</p><p>Chưa có công việc nào. Hãy thêm vào!</p></>
                            : <><p style={{ fontSize: "48px" }}>✨</p><p>Không có việc nào ở tab này</p></>
                        }
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                )}

                {/* ===== FOOTER STATS (Tier 2) ===== */}
                {todos.length > 0 && (
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "16px",
                        paddingTop: "16px",
                        borderTop: "1px solid #eee",
                        fontSize: "13px",
                        color: "#888",
                    }}>
                        <span>
                            {counts.active > 0
                                ? <><strong style={{ color: "#3498db" }}>{counts.active}</strong> việc chưa xong</>
                                : <span style={{ color: "#27ae60" }}>✅ Xong hết rồi!</span>
                            }
                        </span>

                        {counts.completed > 0 && (
                            <button
                                onClick={clearCompleted}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#e74c3c",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    textDecoration: "underline",
                                }}
                            >
                                Xóa {counts.completed} việc đã xong
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
