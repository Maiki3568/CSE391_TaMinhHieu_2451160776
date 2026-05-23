// Bài B3 — Mini Game: Đoán số
// Mở file guess_number.html trên browser để chơi

var soCanDoan = 0;
var soLuotDaDoan = 0;
var gioiHanLuot = 7;
var danhSachDaDoan = [];  // Lưu những số đã đoán để cảnh báo trùng
var gameKetThuc = false;


function batDauGame() {
    // Tạo số ngẫu nhiên từ 1 đến 100
    // Math.random() ra số từ 0 đến <1, nhân 100 ra 0-99.9, Math.floor làm tròn xuống, +1 thành 1-100
    soCanDoan = Math.floor(Math.random() * 100) + 1;
    soLuotDaDoan = 0;
    danhSachDaDoan = [];
    gameKetThuc = false;

    // Reset giao diện
    document.getElementById("inputSo").value = "";
    document.getElementById("inputSo").disabled = false;
    document.getElementById("btnDoan").disabled = false;
    hienThongBao("", "");
    document.getElementById("luot-con").textContent = "Con " + gioiHanLuot + " luot.";
    document.getElementById("danh-sach-doan").textContent = "";
}


function xuLyDoan() {
    if (gameKetThuc) {
        return;
    }

    var inputEl = document.getElementById("inputSo");
    var soNhap = Number(inputEl.value);

    // Validate: phải là số từ 1 đến 100
    if (inputEl.value === "" || isNaN(soNhap)) {
        hienThongBao("Vui long nhap mot so!", "canh-bao");
        return;
    }

    if (soNhap < 1 || soNhap > 100) {
        hienThongBao("Chi chap nhan so tu 1 den 100!", "canh-bao");
        return;
    }

    // Kiểm tra số đã đoán trước chưa
    var daDoanRoi = false;
    for (var i = 0; i < danhSachDaDoan.length; i++) {
        if (danhSachDaDoan[i] === soNhap) {
            daDoanRoi = true;
            break;
        }
    }

    if (daDoanRoi) {
        hienThongBao("Ban da doan so " + soNhap + " roi! Hay thu so khac.", "canh-bao");
        return;
    }

    // Lưu số vừa đoán vào danh sách
    danhSachDaDoan.push(soNhap);
    soLuotDaDoan++;

    // Cập nhật danh sách đã đoán hiển thị
    document.getElementById("danh-sach-doan").textContent = "Da doan: " + danhSachDaDoan.join(", ");

    // Xóa input để nhập tiếp
    inputEl.value = "";

    // Kiểm tra đúng không
    if (soNhap === soCanDoan) {
        hienThongBao("Dung roi! Ban doan dung sau " + soLuotDaDoan + " luot!", "thang");
        ketThucGame();
        return;
    }

    // Tính số lượt còn lại
    var luotConLai = gioiHanLuot - soLuotDaDoan;

    // Hết lượt thì thua
    if (soLuotDaDoan >= gioiHanLuot) {
        hienThongBao("Het luot! So can doan la " + soCanDoan + ".", "thua");
        ketThucGame();
        return;
    }

    // Gợi ý cao hơn hay thấp hơn
    if (soNhap < soCanDoan) {
        hienThongBao("Cao hon! Con " + luotConLai + " luot.", "info");
    } else {
        hienThongBao("Thap hon! Con " + luotConLai + " luot.", "info");
    }

    document.getElementById("luot-con").textContent = "Luot " + soLuotDaDoan + "/" + gioiHanLuot;
}


function ketThucGame() {
    gameKetThuc = true;
    document.getElementById("inputSo").disabled = true;
    document.getElementById("btnDoan").disabled = true;
    document.getElementById("luot-con").textContent = "";
}


function hienThongBao(noiDung, loai) {
    var el = document.getElementById("thongBao");

    if (noiDung === "") {
        el.style.display = "none";
        return;
    }

    el.textContent = noiDung;
    el.className = loai;
    el.style.display = "block";
}


// Chạy game ngay khi trang load xong
batDauGame();
