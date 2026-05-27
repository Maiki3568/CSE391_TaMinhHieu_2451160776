

const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Binh", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dung", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];





function tinhDiemTrungBinh(student) {

    let tb =
        student.math * 0.4 +
        student.physics * 0.3 +
        student.cs * 0.3;

    return tb.toFixed(1);
}





function xepLoai(diemTB) {

    if (diemTB >= 8.0) {
        return "Gioi";
    }

    else if (diemTB >= 6.5) {
        return "Kha";
    }

    else if (diemTB >= 5.0) {
        return "Trung binh";
    }

    else {
        return "Yeu";
    }
}





function inBangKetQua(students) {

    console.log("| STT | Ten    | TB   | Xep loai    |");

    console.log("|-----|--------|------|-------------|");

    for (let i = 0; i < students.length; i++) {

        let sv = students[i];

        let tb = tinhDiemTrungBinh(sv);

        let loai = xepLoai(tb);

        console.log(
            "| " +
            (i + 1) + "   | " +
            sv.name.padEnd(6) + " | " +
            tb.padEnd(4) + " | " +
            loai.padEnd(11) + " |"
        );
    }
}


console.log("\nBANG KET QUA:");

inBangKetQua(students);




function demXepLoai(students) {

    let gioi = 0;

    let kha = 0;

    let trungBinh = 0;

    let yeu = 0;

    for (let i = 0; i < students.length; i++) {

        let tb = tinhDiemTrungBinh(students[i]);

        let loai = xepLoai(tb);

        if (loai === "Gioi") {
            gioi++;
        }

        else if (loai === "Kha") {
            kha++;
        }

        else if (loai === "Trung binh") {
            trungBinh++;
        }

        else {
            yeu++;
        }
    }

    console.log("\nTHONG KE XEP LOAI:");

    console.log("Gioi: " + gioi + " sinh vien");

    console.log("Kha: " + kha + " sinh vien");

    console.log("Trung binh: " + trungBinh + " sinh vien");

    console.log("Yeu: " + yeu + " sinh vien");
}


demXepLoai(students);




function timCaoNhatThapNhat(students) {

    let caoNhat = students[0];

    let thapNhat = students[0];

    for (let i = 1; i < students.length; i++) {

        let tbHienTai =
            Number(tinhDiemTrungBinh(students[i]));

        let tbCaoNhat =
            Number(tinhDiemTrungBinh(caoNhat));

        let tbThapNhat =
            Number(tinhDiemTrungBinh(thapNhat));

        if (tbHienTai > tbCaoNhat) {
            caoNhat = students[i];
        }

        if (tbHienTai < tbThapNhat) {
            thapNhat = students[i];
        }
    }

    console.log("\nSINH VIEN CAO NHAT:");

    console.log(
        caoNhat.name +
        " - TB: " +
        tinhDiemTrungBinh(caoNhat)
    );

    console.log("\nSINH VIEN THAP NHAT:");

    console.log(
        thapNhat.name +
        " - TB: " +
        tinhDiemTrungBinh(thapNhat)
    );
}


timCaoNhatThapNhat(students);




function tinhTBTungMon(students) {

    let tongMath = 0;

    let tongPhysics = 0;

    let tongCs = 0;

    for (let i = 0; i < students.length; i++) {

        tongMath += students[i].math;

        tongPhysics += students[i].physics;

        tongCs += students[i].cs;
    }

    let total = students.length;

    console.log("\nDIEM TB TUNG MON:");

    console.log(
        "Math: " +
        (tongMath / total).toFixed(2)
    );

    console.log(
        "Physics: " +
        (tongPhysics / total).toFixed(2)
    );

    console.log(
        "CS: " +
        (tongCs / total).toFixed(2)
    );
}


tinhTBTungMon(students);





function tinhTBTheoGioiTinh(students) {

    let tongNam = 0;

    let tongNu = 0;

    let soNam = 0;

    let soNu = 0;

    for (let i = 0; i < students.length; i++) {

        let tb =
            Number(tinhDiemTrungBinh(students[i]));

        if (students[i].gender === "M") {

            tongNam += tb;

            soNam++;
        }

        else {

            tongNu += tb;

            soNu++;
        }
    }

    console.log("\nDIEM TB THEO GIOI TINH:");

    console.log(
        "Nam: " +
        (tongNam / soNam).toFixed(2)
    );

    console.log(
        "Nu: " +
        (tongNu / soNu).toFixed(2)
    );
}


tinhTBTheoGioiTinh(students);