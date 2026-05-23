K66 – BTTH03 – HTML,CSS,JS DOM
Mục tiêu
Sinh viên xây dựng 02 bài thực hành bằng HTML, CSS, JavaScript thuần, tập trung mạnh vào:
1.DOM
2.Xử lý sự kiện
Yêu cầu ưu tiên là hiểu cách lấy phần tử, thay đổi nội dung giao diện, hiển thị/ẩn thành phần, bắt sự kiện người dùng và cập nhật dữ liệu lên giao diện. Không yêu cầu các chức năng tìm kiếm và lọc nâng cao.

Phạm vi kiến thức cần tập trung
1. DOM
Sinh viên cần luyện các nội dung sau:
Chọn phần tử bằng getElementById, querySelector, querySelectorAll.
Thay đổi nội dung bằng innerText, innerHTML, textContent, value.
Thay đổi thuộc tính và class của phần tử.
Hiển thị và ẩn popup/form.
Tạo và cập nhật danh sách dữ liệu từ JavaScript.
Render lại bảng hoặc danh sách sau khi dữ liệu thay đổi.
Làm việc với cấu trúc cha - con - anh em giữa các phần tử.
2. Xử lý sự kiện
Sinh viên cần luyện mạnh các nội dung sau:
Bắt sự kiện click.
Bắt sự kiện submit của form.
Bắt sự kiện change cho các ô nhập liệu hoặc checkbox.
Gắn sự kiện cho nút thêm, sửa, xóa, đóng form.
Phân biệt thao tác của người dùng trên từng nút.
Hiển thị thông báo, xác nhận xóa, cập nhật giao diện sau khi có sự kiện.
Làm quen với event delegation ở mức cơ bản đối với danh sách dữ liệu động.

Bài 1: Quản lý sinh viên
Mô tả
Xây dựng trang quản lý sinh viên bằng HTML, CSS, JavaScript thuần.
Chức năng cần có
Hiển thị danh sách sinh viên dưới dạng bảng.
Có nút Thêm sinh viên.
Khi bấm nút thêm, hiển thị form dạng popup/modal.
Thêm mới sinh viên từ form.
Mỗi dòng dữ liệu có nút Sửa và Xóa.
Khi bấm Sửa, dữ liệu của dòng được đưa ngược lên form để cập nhật.
Khi bấm Xóa, hiển thị thông báo xác nhận trước khi xóa.
Sau khi thêm, sửa hoặc xóa, bảng dữ liệu phải cập nhật ngay.
Hiển thị tổng số sinh viên.
Hiển thị điểm trung bình của cả lớp.
Dữ liệu được lưu bằng localStorage.
Các trường thông tin gợi ý
Mã sinh viên
Họ và tên
Ngày sinh
Lớp học
Điểm trung bình
Email
Yêu cầu giao diện
Có tiêu đề trang rõ ràng.
Có khu vực chứa nút thêm sinh viên.
Có bảng hiển thị dữ liệu.
Có popup form để thêm/sửa.
Có khu vực hiển thị thông báo.
Có khu vực thống kê tổng số sinh viên và điểm trung bình.
Phân tích thành phần DOM cần xử lý
Sinh viên cần xác định rõ các phần tử sau:
Nút mở form thêm sinh viên.
Nút đóng form.
Form nhập liệu.
Các ô input/select trong form.
Phần thân bảng hiển thị danh sách.
Khu vực hiển thị thông báo.
Khu vực hiển thị thống kê.
Các xử lý sự kiện bắt buộc
1.Sự kiện bấm nút Thêm sinh viên để mở form.
2.Sự kiện bấm nút Đóng/Hủy để ẩn form.
3.Sự kiện submit form để thêm mới dữ liệu.
4.Sự kiện bấm nút Sửa để nạp dữ liệu cũ lên form.
5.Sự kiện submit form trong chế độ cập nhật.
6.Sự kiện bấm nút Xóa để xác nhận và xóa dữ liệu.
Luồng xử lý cần triển khai
A. Hiển thị danh sách
Tạo mảng dữ liệu sinh viên.
Đọc dữ liệu từ localStorage khi tải trang.
Duyệt mảng và render từng sinh viên lên bảng.
Nếu chưa có dữ liệu, có thể hiển thị dòng thông báo trống.
B. Thêm sinh viên
Bấm nút thêm để mở popup.
Nhập dữ liệu vào form.
Bấm lưu để lấy dữ liệu từ input.
Tạo object sinh viên.
Thêm object vào mảng.
Lưu mảng xuống localStorage.
Render lại bảng.
Cập nhật khu vực thống kê.
Đóng popup và xóa dữ liệu cũ trong form.
C. Sửa sinh viên
Bấm nút sửa ở một dòng bất kỳ.
Xác định đúng sinh viên cần sửa.
Đưa dữ liệu hiện tại lên form.
Đổi tiêu đề form hoặc nút submit sang trạng thái cập nhật.
Sau khi lưu, cập nhật lại dữ liệu trong mảng.
Lưu lại localStorage.
Render lại bảng.
Cập nhật thống kê.
D. Xóa sinh viên
Bấm nút xóa ở dòng dữ liệu.
Hiển thị hộp xác nhận.
Nếu đồng ý thì xóa phần tử khỏi mảng.
Lưu lại localStorage.
Render lại bảng.
Cập nhật thống kê.
Nội dung giảng dạy nên nhấn mạnh
Cách lấy dữ liệu từ form.
Cách đưa dữ liệu từ JavaScript ra bảng HTML.
Cách dùng chung một form cho cả thêm và sửa.
Cách xác định nút nào trong bảng vừa được bấm.
Cách cập nhật lại giao diện sau mỗi thao tác.
Cách tách code thành các hàm như: renderStudents(), saveStudents(), resetForm(), updateStatistics().



Tổ chức bài học trên lớp
Giai đoạn 1: Dựng khung HTML
Tạo đầy đủ các khu vực giao diện.
Chưa cần xử lý dữ liệu ngay.
Xác định rõ id/class cho từng phần tử.
Giai đoạn 2: Thao tác DOM cơ bản
Lấy phần tử từ HTML sang JavaScript.
Thử thay đổi nội dung tiêu đề, thông báo, nút bấm.
Thử hiển thị và ẩn popup.
Giai đoạn 3: Xử lý sự kiện cơ bản
Gắn sự kiện click cho nút mở/đóng form.
Gắn sự kiện submit cho form.
Gắn sự kiện cho các nút thao tác trên dữ liệu.
Giai đoạn 4: CRUD
Thêm dữ liệu.
Hiển thị dữ liệu.
Sửa dữ liệu.
Xóa dữ liệu.
Giai đoạn 5: Hoàn thiện
Lưu dữ liệu bằng localStorage.
Hiển thị thông báo thao tác thành công.
Cập nhật thống kê.
Hoàn thiện giao diện CSS cơ bản.

Bài tập về nhà: Form Validation
Sinh viên tự thực hiện validation cho form của một trong hai bài.
Yêu cầu tối thiểu
Không được để trống các trường bắt buộc.
Kiểm tra email đúng định dạng cơ bản.
Kiểm tra điểm là số hợp lệ.
Kiểm tra ngày hợp lệ.
Yêu cầu nâng cao
Kiểm tra mã sinh viên theo mẫu quy định.
Kiểm tra độ dài chuỗi nhập.
Kiểm tra giá trị số nằm trong khoảng cho phép.
Kiểm tra xác nhận mật khẩu trùng khớp.
Hiển thị lỗi ngay dưới từng ô nhập liệu.
Không cho submit form nếu dữ liệu chưa hợp lệ.
Mục tiêu của bài tập về nhà
Rèn tư duy kiểm tra dữ liệu đầu vào.
Tách riêng xử lý giao diện và xử lý validation.
Chuẩn bị cho các bài học có form phức tạp hơn.

Gợi ý chấm điểm
Bài 1 hoặc Bài 2: Thang điểm 10
Nội dung	Điểm gợi ý
Cấu trúc HTML đầy đủ, bố cục rõ ràng	2
Thao tác DOM đúng và hợp lý	2
Xử lý sự kiện đầy đủ	3
Thực hiện CRUD hoàn chỉnh	2
Giao diện dễ nhìn, có thông báo, có thống kê	1


Checklist cho sinh viên
Checklist DOM
Đã lấy đúng các phần tử cần thao tác.
Đã biết thay đổi nội dung và thuộc tính phần tử.
Đã biết hiển thị/ẩn popup.
Đã render được danh sách từ mảng dữ liệu.
Đã cập nhật giao diện sau khi dữ liệu thay đổi.
Checklist xử lý sự kiện
Đã bắt sự kiện click.
Đã bắt sự kiện submit.
Đã xử lý nút thêm, sửa, xóa.
Đã có xác nhận trước khi xóa.
Đã có thông báo sau khi thao tác thành công.
Đã cập nhật lại bảng hoặc danh sách ngay sau mỗi thao tác.

Yêu cầu cuối cùng
Không code sẵn toàn bộ bài.
Sinh viên phải tự xây dựng từng phần theo hướng dẫn trên.
Ưu tiên hiểu luồng xử lý hơn là làm giao diện phức tạp.
Tập trung mạnh vào DOM và xử lý sự kiện.
Validation để làm bài tập về nhà.