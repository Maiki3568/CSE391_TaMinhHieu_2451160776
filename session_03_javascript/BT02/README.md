Bài 2: Quản lý công việc cá nhân
Mô tả
Xây dựng ứng dụng quản lý công việc cá nhân bằng HTML, CSS, JavaScript thuần.
Chức năng cần có
Hiển thị danh sách công việc.
Có nút Thêm công việc.
Khi bấm nút thêm, hiển thị form popup.
Thêm mới công việc.
Sửa công việc.
Xóa công việc có xác nhận.
Đánh dấu công việc đã hoàn thành hoặc chưa hoàn thành.
Cập nhật giao diện ngay sau mỗi thao tác.
Hiển thị số lượng công việc tổng cộng.
Hiển thị số công việc đã hoàn thành.
Hiển thị số công việc chưa hoàn thành.
Lưu dữ liệu bằng localStorage.
Các trường thông tin gợi ý
Tiêu đề công việc
Mô tả ngắn
Hạn hoàn thành
Mức ưu tiên
Trạng thái hoàn thành
Giới hạn yêu cầu
Không làm chức năng tìm kiếm.
Không làm lọc theo trạng thái.
Không làm lọc theo mức ưu tiên.
Không dùng framework.
Yêu cầu giao diện
Có tiêu đề ứng dụng.
Có nút thêm công việc.
Có khu vực danh sách công việc.
Có form popup để thêm/sửa.
Có khu vực hiển thị thống kê.
Có thông báo khi thao tác thành công.
Phân tích thành phần DOM cần xử lý
Sinh viên cần xác định rõ các phần tử sau:
Nút mở form thêm công việc.
Nút đóng form.
Form nhập liệu.
Danh sách card hoặc danh sách dòng công việc.
Các nút sửa, xóa, đổi trạng thái.
Khu vực thông báo.
Khu vực thống kê.
Các xử lý sự kiện bắt buộc
1.Sự kiện click mở form.
2.Sự kiện click đóng form.
3.Sự kiện submit form để thêm mới.
4.Sự kiện click vào nút sửa.
5.Sự kiện click vào nút xóa.
6.Sự kiện click hoặc change để đổi trạng thái hoàn thành.
Luồng xử lý cần triển khai
A. Hiển thị danh sách công việc
Tạo mảng dữ liệu công việc.
Đọc dữ liệu từ localStorage khi tải trang.
Render dữ liệu ra giao diện dạng card hoặc bảng đơn giản.
Nếu chưa có dữ liệu thì hiển thị trạng thái rỗng.
B. Thêm công việc
Mở popup form.
Nhập dữ liệu.
Bấm lưu để tạo object công việc.
Thêm object vào mảng.
Lưu localStorage.
Render lại danh sách.
Cập nhật thống kê.
Đóng form.
C. Sửa công việc
Bấm nút sửa của một công việc.
Đưa dữ liệu cũ lên form.
Chuyển form sang chế độ cập nhật.
Sau khi lưu, cập nhật dữ liệu trong mảng.
Render lại danh sách.
Cập nhật thống kê.
D. Xóa công việc
Bấm nút xóa.
Hiển thị xác nhận.
Nếu đồng ý thì xóa khỏi mảng.
Lưu localStorage.
Render lại danh sách.
Cập nhật thống kê.
E. Đổi trạng thái hoàn thành
Bấm checkbox hoặc nút hoàn thành.
Cập nhật trạng thái của công việc trong mảng.
Thay đổi giao diện của công việc trên màn hình.
Lưu localStorage.
Cập nhật thống kê.
Nội dung giảng dạy nên nhấn mạnh
Cách render danh sách phần tử động.
Cách xử lý nhiều nút thao tác trong cùng một khu vực dữ liệu.
Cách thay đổi class CSS theo trạng thái hoàn thành.
Cách cập nhật số liệu thống kê theo dữ liệu hiện tại.
Cách viết các hàm xử lý tách biệt như: renderTasks(), saveTasks(), showMessage(), updateTaskSummary().

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