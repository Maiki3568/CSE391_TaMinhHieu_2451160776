

var students = [
    { name: "An",    math: 8,  physics: 7, cs: 9, gender: "M" },
    { name: "Binh",  math: 6,  physics: 9, cs: 7, gender: "F" },
    { name: "Chi",   math: 9,  physics: 6, cs: 8, gender: "F" },
    { name: "Dung",  math: 5,  physics: 5, cs: 6, gender: "M" },
    { name: "Em",    math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3,  physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7,  physics: 7, cs: 7, gender: "F" },
    { name: "Huy",   math: 4,  physics: 6, cs: 3, gender: "M" },
];




function tinhDiemTrungBinh(student) {
    var tb = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
    // Làm tròn 1 chữ số thập phân
    return Math.round(tb * 10) / 10;
}

function xepLoai(diemTB) {
    if (diemTB >= 8.0) {
        return "Gioi";
    } else if (diemTB >= 6.5) {
        return "Kha";
    } else if (diemTB >= 5.0) {
        return "Trung binh";
    } else {
        return "Yeu";
    }
}




function inBang(students) {
    console.log("| STT | Ten    | TB   | Xep loai    |");
    console.log("|-----|--------|------|-------------|");

    for (var i = 0; i < students.length; i++) {
        var sv = students[i];
        var tb = tinhDiemTrungBinh(sv);
        var loai = xepLoai(tb);

        // Căn chuỗi cho thẳng hàng
        var stt = String(i + 1).padEnd(3);
        var ten = sv.name.padEnd(6);
        var diem = String(tb).padEnd(4);
        var xep = loai.padEnd(11);

        console.log("| " + stt + " | " + ten + " | " + diem + " | " + xep + " |");
    }
}

console.log("\nBANG KET QUA:");
inBang(students);


function demXepLoai(students) {
    var soGioi = 0;
    var soKha = 0;
    var soTrungBinh = 0;
    var soYeu = 0;

    for (var i = 0; i < students.length; i++) {
        var tb = tinhDiemTrungBinh(students[i]);
        var loai = xepLoai(tb);

        if (loai === "Gioi") {
            soGioi++;
        } else if (loai === "Kha") {
            soKha++;
        } else if (loai === "Trung binh") {
            soTrungBinh++;
        } else {
            soYeu++;
        }
    }

    console.log("\nTHONG KE XEP LOAI:");
    console.log("Gioi:       " + soGioi + " sinh vien");
    console.log("Kha:        " + soKha + " sinh vien");
    console.log("Trung binh: " + soTrungBinh + " sinh vien");
    console.log("Yeu:        " + soYeu + " sinh vien");
}

demXepLoai(students);




function timCaoNhatThapNhat(students) {
    // Bắt đầu bằng sinh viên đầu tiên làm mốc so sánh
    var caoNhat = students[0];
    var thapNhat = students[0];

    for (var i = 1; i < students.length; i++) {
        var tbHienTai = tinhDiemTrungBinh(students[i]);
        var tbCaoNhat = tinhDiemTrungBinh(caoNhat);
        var tbThapNhat = tinhDiemTrungBinh(thapNhat);

        if (tbHienTai > tbCaoNhat) {
            caoNhat = students[i];
        }

        if (tbHienTai < tbThapNhat) {
            thapNhat = students[i];
        }
    }

    console.log("\nSINH VIEN CAO NHAT: " + caoNhat.name + " - TB: " + tinhDiemTrungBinh(caoNhat));
    console.log("SINH VIEN THAP NHAT: " + thapNhat.name + " - TB: " + tinhDiemTrungBinh(thapNhat));
}

timCaoNhatThapNhat(students);




function tinhTBTungMon(students) {
    var tongMath = 0;
    var tongPhysics = 0;
    var tongCs = 0;

    for (var i = 0; i < students.length; i++) {
        tongMath = tongMath + students[i].math;
        tongPhysics = tongPhysics + students[i].physics;
        tongCs = tongCs + students[i].cs;
    }

    var total = students.length;

    console.log("\nDIEM TB TOAN LOP TUNG MON:");
    console.log("Toan:    " + (tongMath / total).toFixed(2));
    console.log("Ly:      " + (tongPhysics / total).toFixed(2));
    console.log("CNTT:    " + (tongCs / total).toFixed(2));
}

tinhTBTungMon(students);




function tinhTBTheoGioiTinh(students) {
    var tongNam = 0;
    var soNam = 0;
    var tongNu = 0;
    var soNu = 0;

    for (var i = 0; i < students.length; i++) {
        var tb = tinhDiemTrungBinh(students[i]);

        if (students[i].gender === "M") {
            tongNam = tongNam + tb;
            soNam++;
        } else {
            tongNu = tongNu + tb;
            soNu++;
        }
    }

    console.log("\nDIEM TB THEO GIOI TINH:");
    console.log("Nam: " + (tongNam / soNam).toFixed(2) + " (" + soNam + " sinh vien)");
    console.log("Nu:  " + (tongNu / soNu).toFixed(2) + " (" + soNu + " sinh vien)");
}

tinhTBTheoGioiTinh(students);
