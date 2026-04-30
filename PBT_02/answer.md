# PHẦN A — ĐỌC HIỂU

---

## Câu A1 — Input Types
## Trả lời
1. **type="email"** -> Đây là ô nhập dạng text nhưng có thêm khả năng kiểm tra định dạng email. Khi người dùng nhập sai (không có ký tự @), trình duyệt sẽ báo lỗi ngay khi submit. Loại này thường dùng trong form đăng ký hoặc đăng nhập.

2. **type="password"** -> Ô nhập nhưng các ký tự sẽ bị ẩn đi khi gõ. Điều này giúp bảo mật thông tin người dùng. Dùng cho nhập mật khẩu.

3. **type="number"** -> Cho phép nhập số và có thêm nút tăng giảm. Trình duyệt cũng có thể kiểm tra min, max nếu có khai báo. Dùng cho số lượng sản phẩm.

4. **type="tel"** -> Hiển thị bàn phím số trên điện thoại. Không tự validate chặt chẽ nhưng thường kết hợp với pattern để kiểm tra số điện thoại.

5. **type="date"** -> Hiển thị lịch để người dùng chọn ngày. Tránh việc nhập sai format. Dùng cho ngày sinh hoặc ngày giao hàng.

6. **type="file"** -> Cho phép người dùng upload file từ máy. Thường dùng để upload avatar hoặc tài liệu.

7. **type="range"** -> Hiển thị thanh kéo (slider). Người dùng kéo để chọn giá trị trong một khoảng. Ví dụ chọn mức giá.

8. **type="url"** -> Tự kiểm tra định dạng link. Nếu nhập sai (không có http/https), trình duyệt sẽ báo lỗi.

9. **type="search"** -> Giống text nhưng có thêm nút xóa nhanh. Dùng cho thanh tìm kiếm.

10. **type="checkbox"** -> Dùng để chọn hoặc bỏ chọn. Thường dùng cho điều khoản hoặc chọn nhiều option.

Nguồn tham chiếu: 07_forms_interactive.md + Bảng "Các Input Types HTML5"

---

## Câu A2 — Validation
## Trả lời

![alt text](screenshots/A2_validation%20test.png)

1. **required + để trống** ->Khi bấm submit, form sẽ không gửi đi. Trình duyệt sẽ hiển thị thông báo yêu cầu nhập dữ liệu. Điều này xảy ra vì thuộc tính required bắt buộc phải có giá trị.

2. **type="email" value="abc"** -> Trình duyệt sẽ báo lỗi vì không đúng định dạng email. Chuỗi "abc" không chứa ký tự @ nên không hợp lệ.

3. **number min=1 max=10 value=15** -> Không hợp lệ vì giá trị 15 vượt quá max. Trình duyệt sẽ không cho submit.

4. **pattern="[0-9]{10}" value="abc123"** -> Không hợp lệ vì giá trị không khớp với regex yêu cầu 10 chữ số.

5. **password minlength=8 value="123"** -> Không hợp lệ vì độ dài nhỏ hơn 8 ký tự.




Nguồn tham chiếu: 07_forms_interactive.md + HTML5 Validation Attributes

---

## Câu A3 — Accessibility
## Trả lời

1. Thẻ `<label for="...">` rất quan trọng vì nó giúp liên kết giữa label và input. Khi dùng screen reader, hệ thống sẽ đọc đúng tên trường nhập, giúp người khiếm thị biết mình đang nhập gì.

2. Thẻ `<fieldset>` và `<legend>` được dùng khi có nhiều input liên quan với nhau, ví dụ nhóm thông tin giao hàng hoặc thông tin tài khoản. Nó giúp chia form rõ ràng hơn.

3. aria-label` chỉ nên dùng khi không thể hiển thị label trực tiếp. Nếu đã có `<label>` mà vẫn dùng aria-label thì sẽ gây trùng thông tin và làm rối screen reader.

Nguồn tham chiếu: 07_forms_interactive.md + Accessibility — Form cho mọi người

---

## Câu A4 — Media
## Trả lời

Thuộc tính `loading="lazy"` giúp trì hoãn việc tải ảnh cho đến khi người dùng cuộn đến vị trí đó. Điều này giúp giảm thời gian load ban đầu và cải thiện hiệu suất.

Tuy nhiên, không nên dùng lazy loading cho ảnh chính ở đầu trang (hero image), vì sẽ làm ảnh hiển thị chậm.

Trong thẻ `<video>`, nên cung cấp nhiều `<source>` vì mỗi trình duyệt hỗ trợ định dạng khác nhau. Các format phổ biến gồm mp4, webm và ogg.

Alt có vai trò mô tả nội dung ảnh:

- Ảnh sản phẩm: "iPhone 16 Pro Max màu titan"  
- Ảnh trang trí: ""  
- Ảnh biểu đồ: "Biểu đồ doanh thu Q1 năm 2026 tăng 20%"

Nguồn tham chiếu: 06_graphics_multimedia.md + Images & Video HTML5 

---

## Câu A5 — figure vs img
## Trả lời
Thẻ `<img>` được dùng khi chỉ cần hiển thị ảnh đơn lẻ, không cần mô tả thêm.

Thẻ `<figure>` dùng khi ảnh có ý nghĩa nội dung rõ ràng và cần thêm chú thích bằng `<figcaption>`.

Ví dụ:

- Dùng `<img>` cho avatar, icon, ảnh nhỏ không cần giải thích  
- Dùng `<figure>` cho ảnh sản phẩm hoặc biểu đồ vì cần mô tả thêm  

Nguồn tham chiếu: 04_visible_part_html.md + Semantic HTML5 — Media

---

# PHẦN C — SUY LUẬN

---

## Câu C1 — Debug Form
## Trả lời

Lỗi 1: Input "Tên" không có label → cần thêm `<label for="...">` để đảm bảo accessibility  

Lỗi 2: Email không có thuộc tính required → người dùng có thể bỏ trống  

Lỗi 3: Password không có minlength → không đảm bảo độ mạnh  

Lỗi 4: Confirm password không thể validate bằng HTML → cần JavaScript  

Lỗi 5: Phone dùng type="text" → nên dùng type="tel" + pattern  

Lỗi 6: Select không có name → không gửi dữ liệu về server  

Lỗi 7: Checkbox thiếu input → label không có chức năng  

Lỗi 8: Submit dùng input thay vì button → không sai hoàn toàn nhưng không tối ưu  

---

## Câu C2 — Validation Strategy
## Trả lời

FROM ĐĂNG KÍ NGÂN HÀNG SỐ: 
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Đăng ký ngân hàng số</title>
</head>
<body>

<h2>Form đăng ký</h2>

<form>

    <label>CMND/CCCD:</label><br>
    <input type="text"
           pattern="[0-9]{12}"
           required
           title="Phải gồm đúng 12 chữ số">
    <br><br>

    <label>Số tài khoản:</label><br>
    <input type="text"
           pattern="[0-9]{10,15}"
           required
           title="Từ 10 đến 15 chữ số">
    <br><br>

    <label>Email:</label><br>
    <input type="email"
           required>
    <br><br>

    <label>PIN:</label><br>
    <input type="password"
           pattern="[0-9]{6}"
           required
           inputmode="numeric"
           title="PIN phải gồm đúng 6 chữ số">
    <br><br>

    <button type="submit">Đăng ký</button>

</form>

</body>
</html>

- CCCD: `[0-9]{12}` → đúng 12 chữ số  
- Số tài khoản: `[0-9]{10,15}` → từ 10 đến 15 chữ số  

HTML validation không đủ an toàn vì chỉ chạy ở phía client. Người dùng có thể tắt hoặc bypass.

Những thứ HTML không làm được:

- So sánh password và confirm password  
- Kiểm tra email đã tồn tại hay chưa  
- Xử lý logic phức tạp  

Rủi ro nếu chỉ validate frontend:

- Người dùng bypass validation để gửi dữ liệu sai  
- Có thể bị tấn công injection nếu backend không kiểm tra lại  

---

