const addStudentButton = document.querySelector('#addStudentButton');
const modal = document.querySelector('#studentModal');
const closeModalButton = document.querySelector('#closeModal');
const cancelButton = document.querySelector('#cancelButton');
const studentForm = document.querySelector('#studentForm');
const studentsTableBody = document.querySelector('#studentsTableBody');
const totalStudents = document.querySelector('#totalStudents');
const averageGpa = document.querySelector('#averageGpa');
const notification = document.querySelector('#notification');
const modalTitle = document.querySelector('#modalTitle');
const editIndexInput = document.querySelector('#editIndex');
const studentIdInput = document.querySelector('#studentId');
const fullNameInput = document.querySelector('#fullName');
const birthDateInput = document.querySelector('#birthDate');
const classNameInput = document.querySelector('#className');
const gpaInput = document.querySelector('#gpa');
const emailInput = document.querySelector('#email');
const LOCAL_STORAGE_KEY = 'student-management-data';

let students = [];

function getDefaultStudents() {
  return [
    {
      studentId: 'SV001',
      fullName: 'Nguyễn Văn A',
      birthDate: '2004-02-12',
      className: 'DHTH01',
      gpa: '3.8',
      email: 'a@example.com'
    },
    {
      studentId: 'SV002',
      fullName: 'Trần Thị B',
      birthDate: '2003-09-24',
      className: 'DHTH01',
      gpa: '3.5',
      email: 'b@example.com'
    },
    {
      studentId: 'SV003',
      fullName: 'Lê Minh C',
      birthDate: '2005-01-05',
      className: 'DHTH02',
      gpa: '3.2',
      email: 'c@example.com'
    },
    {
      studentId: 'SV004',
      fullName: 'Phạm Quốc D',
      birthDate: '2002-07-17',
      className: 'DHTH02',
      gpa: '3.9',
      email: 'd@example.com'
    },
    {
      studentId: 'SV005',
      fullName: 'Hoàng Lan E',
      birthDate: '2004-12-30',
      className: 'DHTH03',
      gpa: '3.6',
      email: 'e@example.com'
    }
  ];
}

function showNotification(message) {
  notification.textContent = message;
  notification.classList.remove('hidden');

  setTimeout(function () {
    notification.classList.add('hidden');
  }, 2500);
}

function saveToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedData === null) {
    students = getDefaultStudents();
    saveToLocalStorage();
    return;
  }

  try {
    students = JSON.parse(savedData);
  } catch (error) {
    students = getDefaultStudents();
    saveToLocalStorage();
    return;
  }

  if (students === null || students.length === 0) {
    students = getDefaultStudents();
    saveToLocalStorage();
  }
}

function updateStatistics() {
  let total = students.length;
  let sum = 0;

  students.forEach(function (student) {
    sum = sum + Number(student.gpa);
  });

  if (total === 0) {
    totalStudents.textContent = '0';
    averageGpa.textContent = '0.00';
    return;
  }

  let average = sum / total;

  totalStudents.textContent = String(total);
  averageGpa.textContent = average.toFixed(2);
}

function resetForm() {
  studentForm.reset();
  editIndexInput.value = '';
  modalTitle.textContent = 'Thêm sinh viên';
}

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  resetForm();
}

function fillForm(student, index) {
  editIndexInput.value = String(index);
  studentIdInput.value = student.studentId;
  fullNameInput.value = student.fullName;
  birthDateInput.value = student.birthDate;
  classNameInput.value = student.className;
  gpaInput.value = student.gpa;
  emailInput.value = student.email;
  modalTitle.textContent = 'Sửa sinh viên';
}

function isEmailValid(email) {
  const rule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return rule.test(email);
}

function getFormData() {
  return {
    studentId: studentIdInput.value.trim(),
    fullName: fullNameInput.value.trim(),
    birthDate: birthDateInput.value,
    className: classNameInput.value.trim(),
    gpa: gpaInput.value,
    email: emailInput.value.trim()
  };
}

function validateForm() {
  const data = getFormData();

  if (data.studentId === '') {
    showNotification('Vui lòng nhập mã sinh viên');
    return null;
  }

  if (data.fullName === '') {
    showNotification('Vui lòng nhập họ và tên');
    return null;
  }

  if (data.birthDate === '') {
    showNotification('Vui lòng chọn ngày sinh');
    return null;
  }

  if (data.className === '') {
    showNotification('Vui lòng nhập lớp');
    return null;
  }

  if (data.gpa === '') {
    showNotification('Vui lòng nhập GPA');
    return null;
  }

  const gpaValue = Number(data.gpa);

  if (isNaN(gpaValue)) {
    showNotification('GPA phải là số');
    return null;
  }

  if (gpaValue < 0 || gpaValue > 4) {
    showNotification('GPA phải nằm trong khoảng 0 đến 4');
    return null;
  }

  if (data.email === '') {
    showNotification('Vui lòng nhập email');
    return null;
  }

  if (isEmailValid(data.email) === false) {
    showNotification('Email không đúng định dạng');
    return null;
  }

  return data;
}

function renderStudents() {
  let tableHtml = '';

  if (students.length === 0) {
    tableHtml = '<tr class="empty-row"><td colspan="7">Chưa có sinh viên nào</td></tr>';
    studentsTableBody.innerHTML = tableHtml;
    return;
  }

  students.forEach(function (student, index) {
    tableHtml = tableHtml + '<tr>';
    tableHtml = tableHtml + '<td>' + student.studentId + '</td>';
    tableHtml = tableHtml + '<td>' + student.fullName + '</td>';
    tableHtml = tableHtml + '<td>' + student.birthDate + '</td>';
    tableHtml = tableHtml + '<td>' + student.className + '</td>';
    tableHtml = tableHtml + '<td>' + student.gpa + '</td>';
    tableHtml = tableHtml + '<td>' + student.email + '</td>';
    tableHtml = tableHtml + '<td>';
    tableHtml = tableHtml + '<div class="action-group">';
    tableHtml = tableHtml + '<button type="button" class="edit-btn" data-index="' + index + '">Sửa</button>';
    tableHtml = tableHtml + '<button type="button" class="delete-btn" data-index="' + index + '">Xóa</button>';
    tableHtml = tableHtml + '</div>';
    tableHtml = tableHtml + '</td>';
    tableHtml = tableHtml + '</tr>';
  });

  studentsTableBody.innerHTML = tableHtml;
}

function addStudent() {
  const data = validateForm();

  if (data === null) {
    return;
  }

  const duplicateIndex = students.findIndex(function (student) {
    return student.studentId === data.studentId;
  });

  if (duplicateIndex !== -1) {
    showNotification('Mã sinh viên đã tồn tại');
    return;
  }

  students.push(data);
  saveToLocalStorage();
  renderStudents();
  updateStatistics();
  closeModal();
  showNotification('Thêm sinh viên thành công');
}

function editStudent() {
  const data = validateForm();

  if (data === null) {
    return;
  }

  const index = Number(editIndexInput.value);

  if (index < 0 || index >= students.length) {
    showNotification('Không tìm thấy sinh viên để sửa');
    return;
  }

  const duplicateIndex = students.findIndex(function (student) {
    return student.studentId === data.studentId;
  });

  if (duplicateIndex !== -1 && duplicateIndex !== index) {
    showNotification('Mã sinh viên đã tồn tại');
    return;
  }

  students[index] = data;
  saveToLocalStorage();
  renderStudents();
  updateStatistics();
  closeModal();
  showNotification('Cập nhật sinh viên thành công');
}

function handleTableClick(event) {
  const button = event.target;

  if (button.classList.contains('edit-btn') === false && button.classList.contains('delete-btn') === false) {
    return;
  }

  const index = Number(button.getAttribute('data-index'));

  if (button.classList.contains('edit-btn')) {
    fillForm(students[index], index);
    openModal();
    return;
  }

  const confirmDelete = confirm('Bạn có chắc muốn xóa sinh viên này?');

  if (confirmDelete === false) {
    return;
  }

  students.splice(index, 1);
  saveToLocalStorage();
  renderStudents();
  updateStatistics();
  showNotification('Đã xóa sinh viên');
}

studentForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (editIndexInput.value === '') {
    addStudent();
    return;
  }

  editStudent();
});

addStudentButton.addEventListener('click', function () {
  resetForm();
  openModal();
});

closeModalButton.addEventListener('click', closeModal);

cancelButton.addEventListener('click', closeModal);

studentsTableBody.addEventListener('click', handleTableClick);

window.addEventListener('load', function () {
  loadFromLocalStorage();
  renderStudents();
  updateStatistics();
});
