// Tier 0 — Solution: UserProfile.jsx

function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserProfile;

// ====== Điểm khác biệt HTML → JSX ======
// 1. class="profile"  →  className="profile"
// 2. <img src="...">  →  <img src="..." />   (phải đóng thẻ)
// 3. Wrap toàn bộ trong 1 thẻ cha
// 4. <tbody> bắt buộc trong JSX (HTML có thể bỏ qua)
