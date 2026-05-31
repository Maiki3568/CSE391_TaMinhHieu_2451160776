// Tier 6 — Solution: StudentManager.jsx
// CRUD hoàn chỉnh: Create + Read + Update + Delete

import { useState } from "react";

const initialStudents = [
    { id: 1, name: "Minh", age: 20, gpa: 3.5 },
    { id: 2, name: "An", age: 21, gpa: 2.8 },
    { id: 3, name: "Linh", age: 19, gpa: 3.9 },
    { id: 4, name: "Hùng", age: 22, gpa: 3.1 },
];

function getXepLoai(gpa) {
    if (gpa >= 3.6) return { label: "Xuất sắc", color: "#8e44ad" };
    if (gpa >= 3.2) return { label: "Giỏi", color: "#27ae60" };
    if (gpa >= 2.5) return { label: "Khá", color: "#2980b9" };
    return { label: "Trung bình", color: "#e67e22" };
}

function StudentManager() {
    const [students, setStudents] = useState(initialStudents);

    // Form thêm mới
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newGpa, setNewGpa] = useState("");
    const [addError, setAddError] = useState("");

    // Sửa inline
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [editGpa, setEditGpa] = useState("");

    // ===== CREATE =====
    function handleAdd() {
        if (!newName.trim() || !newAge || !newGpa) {
            setAddError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        const gpa = parseFloat(newGpa);
        if (gpa < 0 || gpa > 4) { setAddError("GPA phải từ 0 đến 4"); return; }

        setStudents([...students, {
            id: Date.now(),
            name: newName.trim(),
            age: parseInt(newAge),
            gpa,
        }]);
        setNewName(""); setNewAge(""); setNewGpa("");
        setAddError("");
    }

    function handleAddKeyDown(e) {
        if (e.key === "Enter") handleAdd();
    }

    // ===== DELETE =====
    function handleDelete(id) {
        setStudents(students.filter(s => s.id !== id));
    }

    function handleDeleteAll() {
        if (window.confirm(`Xóa tất cả ${students.length} sinh viên?`)) {
            setStudents([]);
        }
    }

    // ===== UPDATE =====
    function startEdit(student) {
        setEditingId(student.id);
        setEditName(student.name);
        setEditAge(student.age.toString());
        setEditGpa(student.gpa.toString());
    }

    function saveEdit() {
        if (!editName.trim() || !editAge || !editGpa) return;
        setStudents(students.map(s =>
            s.id === editingId
                ? { ...s, name: editName.trim(), age: parseInt(editAge), gpa: parseFloat(editGpa) }
                : s
        ));
        setEditingId(null);
    }

    function cancelEdit() { setEditingId(null); }

    function handleEditKeyDown(e) {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") cancelEdit();
    }

    // ===== Computed values =====
    const avgGpa = students.length > 0
        ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)
        : "—";

    const thStyle = { padding: "10px 12px", background: "#2c3e50", color: "white", textAlign: "left" };
    const tdStyle = { padding: "10px 12px", borderBottom: "1px solid #eee" };
    const inputStyle = { padding: "4px 6px", width: "100%", boxSizing: "border-box" };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial" }}>
            <h1>👩‍🎓 Quản lý sinh viên</h1>

            {/* ===== FORM THÊM ===== */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={handleAddKeyDown}
                    placeholder="Tên sinh viên" style={{ padding: "8px", flex: "2", minWidth: "120px" }} />
                <input type="number" value={newAge} onChange={e => setNewAge(e.target.value)} onKeyDown={handleAddKeyDown}
                    placeholder="Tuổi" style={{ padding: "8px", width: "70px" }} />
                <input type="number" step="0.1" min="0" max="4" value={newGpa} onChange={e => setNewGpa(e.target.value)} onKeyDown={handleAddKeyDown}
                    placeholder="GPA" style={{ padding: "8px", width: "80px" }} />
                <button onClick={handleAdd} style={{ padding: "8px 16px", background: "#27ae60", color: "white", border: "none", borderRadius: "4px" }}>
                    ➕ Thêm
                </button>
            </div>
            {addError && <p style={{ color: "red", marginBottom: "10px" }}>{addError}</p>}

            {/* ===== HEADER BẢNG ===== */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span><strong>{students.length}</strong> sinh viên | GPA TB: <strong>{avgGpa}</strong></span>
                {students.length > 0 && (
                    <button onClick={handleDeleteAll} style={{ padding: "6px 12px", background: "#e74c3c", color: "white", border: "none", borderRadius: "4px" }}>
                        🗑 Xóa tất cả
                    </button>
                )}
            </div>

            {/* ===== BẢNG ===== */}
            {students.length === 0 ? (
                <p style={{ textAlign: "center", color: "#999", padding: "40px" }}>Chưa có sinh viên nào</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Tên</th>
                            <th style={thStyle}>Tuổi</th>
                            <th style={thStyle}>GPA</th>
                            <th style={thStyle}>Xếp loại</th>
                            <th style={thStyle}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => {
                            const xl = getXepLoai(student.gpa);
                            const isEditing = editingId === student.id;
                            const rowStyle = {
                                fontWeight: student.gpa >= 3.5 ? "bold" : "normal",
                                background: index % 2 === 0 ? "#fff" : "#f9f9f9",
                            };

                            return (
                                <tr key={student.id} style={rowStyle}>
                                    <td style={tdStyle}>{index + 1}</td>

                                    {isEditing ? (
                                        <>
                                            <td style={tdStyle}><input value={editName} onChange={e => setEditName(e.target.value)} onKeyDown={handleEditKeyDown} style={inputStyle} autoFocus /></td>
                                            <td style={tdStyle}><input type="number" value={editAge} onChange={e => setEditAge(e.target.value)} onKeyDown={handleEditKeyDown} style={inputStyle} /></td>
                                            <td style={tdStyle}><input type="number" step="0.1" value={editGpa} onChange={e => setEditGpa(e.target.value)} onKeyDown={handleEditKeyDown} style={inputStyle} /></td>
                                            <td style={tdStyle}>—</td>
                                            <td style={tdStyle}>
                                                <button onClick={saveEdit} style={{ marginRight: "4px", background: "#27ae60", color: "white", border: "none", padding: "4px 8px", borderRadius: "3px" }}>✓</button>
                                                <button onClick={cancelEdit} style={{ background: "#95a5a6", color: "white", border: "none", padding: "4px 8px", borderRadius: "3px" }}>✕</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td style={tdStyle}>{student.name}</td>
                                            <td style={tdStyle}>{student.age}</td>
                                            <td style={tdStyle}>{student.gpa.toFixed(1)}</td>
                                            <td style={{ ...tdStyle, color: xl.color }}>{xl.label}</td>
                                            <td style={tdStyle}>
                                                <button onClick={() => startEdit(student)} style={{ marginRight: "4px", background: "#3498db", color: "white", border: "none", padding: "4px 8px", borderRadius: "3px" }}>✏️</button>
                                                <button onClick={() => handleDelete(student.id)} style={{ background: "#e74c3c", color: "white", border: "none", padding: "4px 8px", borderRadius: "3px" }}>🗑</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>
                💡 Khi đang sửa: Enter để lưu, Escape để hủy
            </p>
        </div>
    );
}

export default StudentManager;
