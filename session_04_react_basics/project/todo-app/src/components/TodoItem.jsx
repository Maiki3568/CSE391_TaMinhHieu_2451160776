// components/TodoItem.jsx
// Props: todo (object), onToggle (function), onDelete (function)

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            margin: "6px 0",
            background: todo.done ? "#f0fff4" : "#ffffff",
            border: `1px solid ${todo.done ? "#b7ebc8" : "#e8e8e8"}`,
            borderRadius: "8px",
            transition: "all 0.2s",
            gap: "12px",
        }}>
            {/* Checkbox toggle */}
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "#27ae60" }}
            />

            {/* Nội dung todo */}
            <span style={{
                flex: 1,
                fontSize: "15px",
                textDecoration: todo.done ? "line-through" : "none",
                color: todo.done ? "#999" : "#2c3e50",
                transition: "all 0.2s",
            }}>
                {todo.text}
            </span>

            {/* Timestamp */}
            <span style={{ fontSize: "11px", color: "#bbb", whiteSpace: "nowrap" }}>
                {todo.createdAt}
            </span>

            {/* Nút xóa */}
            <button
                onClick={() => onDelete(todo.id)}
                title="Xóa"
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    color: "#e74c3c",
                    lineHeight: 1,
                }}
                onMouseEnter={e => e.target.style.background = "#fde8e8"}
                onMouseLeave={e => e.target.style.background = "transparent"}
            >
                🗑
            </button>
        </div>
    );
}

export default TodoItem;
