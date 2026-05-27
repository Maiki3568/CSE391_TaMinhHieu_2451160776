

var danhSachMon = [
    { ten: "Pho bo",   gia: 65000, soLuong: 2 },
    { ten: "Tra da",   gia: 5000,  soLuong: 3 },
    { ten: "Bun cha",  gia: 55000, soLuong: 1 },
];

var coTip = true;  


function tinhTongTien(danhSach) {
    var tong = 0;
    for (var i = 0; i < danhSach.length; i++) {
        tong = tong + danhSach[i].gia * danhSach[i].soLuong;
    }
    return tong;
}


// ==============================================
// Xác định phần trăm giảm giá
// ==============================================

function tinhPhanTramGiam(tongTien) {
    var phanTramGiam = 0;

    // Áp dụng giảm giá theo tổng tiền — chỉ lấy mức cao nhất
    if (tongTien > 1000000) {
        phanTramGiam = 15;
    } else if (tongTien > 500000) {
        phanTramGiam = 10;
    }

    // Thứ Ba (Wednesday) là getDay() === 3
    // 0=CN, 1=Th2, 2=Th3, 3=Th4, 4=Th5, 5=Th6, 6=Th7
    var ngayHomNay = new Date().getDay();
    if (ngayHomNay === 3) {
        phanTramGiam = phanTramGiam + 5;
    }

    return phanTramGiam;
}


// ==============================================
// Format số tiền cho đẹp
// ==============================================

function formatTien(so) {
    return so.toLocaleString("vi-VN") + "d";
}


// ==============================================
// In hóa đơn ra console
// ==============================================

function inHoaDon(danhSach, coTip) {
    var duongKe = "==========================================";

    console.log("\n+--" + duongKe + "--+");
    console.log("|           HOA DON NHA HANG              |");
    console.log("+--" + duongKe + "--+");

    // In từng món
    for (var i = 0; i < danhSach.length; i++) {
        var mon = danhSach[i];
        var thanhTien = mon.gia * mon.soLuong;

        var stt = (i + 1) + ".";
        var ten = mon.ten.padEnd(12);
        var soLuong = ("x" + mon.soLuong).padEnd(4);
        var gia = ("@" + formatTien(mon.gia)).padEnd(10);
        var tien = formatTien(thanhTien);

        console.log("| " + stt + " " + ten + " " + soLuong + " " + gia + " = " + tien);
    }

    console.log("+--" + duongKe + "--+");

    // Tính các khoản
    var tongGoc = tinhTongTien(danhSach);
    var phanTramGiam = tinhPhanTramGiam(tongGoc);
    var soTienGiam = Math.round(tongGoc * phanTramGiam / 100);
    var tongSauGiam = tongGoc - soTienGiam;
    var vat = Math.round(tongSauGiam * 8 / 100);
    var tip = 0;
    if (coTip) {
        tip = Math.round(tongSauGiam * 5 / 100);
    }
    var thanhToan = tongSauGiam + vat + tip;

    // In kết quả
    console.log("| Tong cong:      " + formatTien(tongGoc).padStart(20) + "   |");
    console.log("| Giam gia (" + phanTramGiam + "%): " + formatTien(soTienGiam).padStart(20) + "   |");
    console.log("| VAT (8%):       " + formatTien(vat).padStart(20) + "   |");
    console.log("| Tip (5%):       " + formatTien(tip).padStart(20) + "   |");
    console.log("+--" + duongKe + "--+");
    console.log("| THANH TOAN:     " + formatTien(thanhToan).padStart(20) + "   |");
    console.log("+--" + duongKe + "--+\n");
}


// Chạy in hóa đơn
inHoaDon(danhSachMon, coTip);


// ==============================================
// Test thêm với tổng trên 500k (giảm 10%)
// ==============================================

var danhSachLon = [
    { ten: "Bo luc lac",  gia: 180000, soLuong: 2 },
    { ten: "Hai san",     gia: 250000, soLuong: 1 },
    { ten: "Nuoc ngot",   gia: 15000,  soLuong: 3 },
];

console.log("--- Test don hang lon (> 500k) ---");
inHoaDon(danhSachLon, false);
