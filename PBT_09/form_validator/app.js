const nameInput = document.querySelector("#nameInput");
const nameIcon = document.querySelector("#nameIcon");
const nameMsg = document.querySelector("#nameMsg");

const emailInput = document.querySelector("#emailInput");
const emailIcon = document.querySelector("#emailIcon");
const emailMsg = document.querySelector("#emailMsg");

const passwordInput = document.querySelector("#passwordInput");
const passwordIcon = document.querySelector("#passwordIcon");
const passwordMsg = document.querySelector("#passwordMsg");
const strengthFill = document.querySelector("#strengthFill");

const confirmInput = document.querySelector("#confirmInput");
const confirmIcon = document.querySelector("#confirmIcon");
const confirmMsg = document.querySelector("#confirmMsg");

const phoneInput = document.querySelector("#phoneInput");
const phoneIcon = document.querySelector("#phoneIcon");
const phoneMsg = document.querySelector("#phoneMsg");

const submitBtn = document.querySelector("#submitBtn");
const successModal = document.querySelector("#successModal");
const successInfo = document.querySelector("#successInfo");
const closeSuccess = document.querySelector("#closeSuccess");
const successOverlay = document.querySelector("#successOverlay");

const validity = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false,
};

function setFieldState(input, icon, msg, isValid, message) {
    input.classList.toggle("valid", isValid);
    input.classList.toggle("invalid", !isValid && message !== "");
    icon.textContent = message === "" ? "" : isValid ? "✅" : "❌";
    msg.textContent = message;
    msg.className = "field-msg " + (message === "" ? "" : isValid ? "success" : "error");
}

function checkSubmitEnabled() {
    submitBtn.disabled = !Object.values(validity).every(Boolean);
}

nameInput.addEventListener("input", () => {
    const val = nameInput.value.trim();
    if (val.length === 0) {
        setFieldState(nameInput, nameIcon, nameMsg, false, "");
        validity.name = false;
    } else if (val.length < 2) {
        setFieldState(nameInput, nameIcon, nameMsg, false, "Tên phải có ít nhất 2 ký tự");
        validity.name = false;
    } else if (val.length > 50) {
        setFieldState(nameInput, nameIcon, nameMsg, false, "Tên không được quá 50 ký tự");
        validity.name = false;
    } else {
        setFieldState(nameInput, nameIcon, nameMsg, true, "Tên hợp lệ");
        validity.name = true;
    }
    checkSubmitEnabled();
});

emailInput.addEventListener("input", () => {
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val.length === 0) {
        setFieldState(emailInput, emailIcon, emailMsg, false, "");
        validity.email = false;
    } else if (!val.includes("@")) {
        setFieldState(emailInput, emailIcon, emailMsg, false, "Email phải có ký tự @");
        validity.email = false;
    } else if (!emailRegex.test(val)) {
        setFieldState(emailInput, emailIcon, emailMsg, false, "Định dạng email không hợp lệ");
        validity.email = false;
    } else {
        setFieldState(emailInput, emailIcon, emailMsg, true, "Email hợp lệ");
        validity.email = true;
    }
    checkSubmitEnabled();
});

function getPasswordStrength(password) {
    if (password.length < 8) return "weak";
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    if (hasUpper && hasLower && hasNumber && hasSpecial) return "strong";
    if ((hasLower || hasUpper) && hasNumber) return "medium";
    return "weak";
}

passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    if (val.length === 0) {
        setFieldState(passwordInput, passwordIcon, passwordMsg, false, "");
        strengthFill.className = "";
        strengthFill.style.width = "0%";
        validity.password = false;
    } else {
        const strength = getPasswordStrength(val);
        strengthFill.className = strength;
        if (strength === "weak") {
            setFieldState(passwordInput, passwordIcon, passwordMsg, false, "Mật khẩu yếu — cần ít nhất 8 ký tự");
            validity.password = false;
        } else if (strength === "medium") {
            setFieldState(passwordInput, passwordIcon, passwordMsg, true, "Mật khẩu trung bình");
            validity.password = true;
        } else {
            setFieldState(passwordInput, passwordIcon, passwordMsg, true, "Mật khẩu mạnh");
            validity.password = true;
        }
    }

    if (confirmInput.value.length > 0) {
        validateConfirm();
    }
    checkSubmitEnabled();
});

function validateConfirm() {
    const val = confirmInput.value;
    if (val.length === 0) {
        setFieldState(confirmInput, confirmIcon, confirmMsg, false, "");
        validity.confirm = false;
    } else if (val !== passwordInput.value) {
        setFieldState(confirmInput, confirmIcon, confirmMsg, false, "Mật khẩu không khớp");
        validity.confirm = false;
    } else {
        setFieldState(confirmInput, confirmIcon, confirmMsg, true, "Mật khẩu khớp");
        validity.confirm = true;
    }
    checkSubmitEnabled();
}

confirmInput.addEventListener("input", validateConfirm);

phoneInput.addEventListener("input", (e) => {
    let digits = e.target.value.replace(/\D/g, "").slice(0, 10);

    let formatted = digits;
    if (digits.length > 7) {
        formatted = digits.slice(0, 4) + "-" + digits.slice(4, 7) + "-" + digits.slice(7);
    } else if (digits.length > 4) {
        formatted = digits.slice(0, 4) + "-" + digits.slice(4);
    }
    phoneInput.value = formatted;

    if (digits.length === 0) {
        setFieldState(phoneInput, phoneIcon, phoneMsg, false, "");
        validity.phone = false;
    } else if (digits.length !== 10) {
        setFieldState(phoneInput, phoneIcon, phoneMsg, false, "Số điện thoại phải có đúng 10 chữ số");
        validity.phone = false;
    } else if (!/^(0[35789])/.test(digits)) {
        setFieldState(phoneInput, phoneIcon, phoneMsg, false, "Đầu số không hợp lệ (03, 05, 07, 08, 09)");
        validity.phone = false;
    } else {
        setFieldState(phoneInput, phoneIcon, phoneMsg, true, "Số điện thoại hợp lệ");
        validity.phone = true;
    }
    checkSubmitEnabled();
});

submitBtn.addEventListener("click", () => {
    const info = document.createElement("div");
    successInfo.innerHTML = "";

    const rows = [
        ["Họ tên", nameInput.value.trim()],
        ["Email", emailInput.value.trim()],
        ["Điện thoại", phoneInput.value],
        ["Mật khẩu", "•".repeat(passwordInput.value.length)],
    ];

    rows.forEach(([label, value]) => {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = label + ": ";
        p.appendChild(strong);
        p.appendChild(document.createTextNode(value));
        successInfo.appendChild(p);
    });

    successModal.classList.remove("hidden");
});

function closeModal() {
    successModal.classList.add("hidden");
}

closeSuccess.addEventListener("click", closeModal);
successOverlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});
