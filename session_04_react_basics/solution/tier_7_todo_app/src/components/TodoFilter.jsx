// components/TodoFilter.jsx
// Props: filter (string), setFilter (function), counts (object)

function TodoFilter({ filter, setFilter, counts }) {
    const filters = [
        { key: "all", label: "Tất cả", count: counts.all },
        { key: "active", label: "Chưa xong", count: counts.active },
        { key: "completed", label: "Hoàn thành", count: counts.completed },
    ];

    return (
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
            {filters.map(f => (
                <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    style={{
                        flex: 1,
                        padding: "8px 4px",
                        background: filter === f.key ? "#3498db" : "#f0f0f0",
                        color: filter === f.key ? "white" : "#555",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: filter === f.key ? "bold" : "normal",
                        fontSize: "14px",
                        transition: "all 0.2s",
                    }}
                >
                    {f.label}
                    <span style={{
                        marginLeft: "6px",
                        background: filter === f.key ? "rgba(255,255,255,0.3)" : "#ddd",
                        borderRadius: "10px",
                        padding: "1px 6px",
                        fontSize: "12px",
                    }}>
                        {f.count}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default TodoFilter;
