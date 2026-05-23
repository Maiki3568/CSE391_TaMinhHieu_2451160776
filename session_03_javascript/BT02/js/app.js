const addTaskButton = document.querySelector('#openModalBtn');
const closeModalButton = document.querySelector('#closeModalBtn');
const cancelButton = document.querySelector('#cancelBtn');
const modal = document.querySelector('#taskModal');
const taskForm = document.querySelector('#taskForm');
const taskList = document.querySelector('#taskList');
const notification = document.querySelector('#notification');
const totalTasksElement = document.querySelector('#totalTasks');
const completedTasksElement = document.querySelector('#completedTasks');
const pendingTasksElement = document.querySelector('#pendingTasks');
const modalTitle = document.querySelector('#modalTitle');
const titleInput = document.querySelector('#titleInput');
const descriptionInput = document.querySelector('#descriptionInput');
const deadlineInput = document.querySelector('#deadlineInput');
const priorityInput = document.querySelector('#priorityInput');

let tasks = [];
let editIndex = -1;

function getDefaultTasks() {
  return [
    {
      title: 'Hoàn thành bài tập HTML',
      description: 'Nộp phần bài tập tuần này trước 17:00',
      deadline: '2026-05-25',
      priority: 'Cao',
      completed: false
    },
    {
      title: 'Ôn lại JavaScript DOM',
      description: 'Xem lại phần event listener và DOM manipulation',
      deadline: '2026-05-26',
      priority: 'Trung bình',
      completed: true
    },
    {
      title: 'Làm phiên bản mockup',
      description: 'Thiết kế giao diện cho dự án cá nhân',
      deadline: '2026-05-27',
      priority: 'Thấp',
      completed: false
    },
    {
      title: 'Gửi báo cáo tiến độ',
      description: 'Chia sẻ tiến độ với giảng viên',
      deadline: '2026-05-28',
      priority: 'Cao',
      completed: false
    },
    {
      title: 'Chuẩn bị mẫu dữ liệu',
      description: 'Tiền xử lý dữ liệu cho bài thực hành',
      deadline: '2026-05-29',
      priority: 'Trung bình',
      completed: true
    }
  ];
}

function loadFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks === null) {
    tasks = getDefaultTasks();
    saveToLocalStorage();
    return;
  }

  try {
    tasks = JSON.parse(savedTasks);
  } catch (error) {
    tasks = getDefaultTasks();
    saveToLocalStorage();
    return;
  }

  if (tasks === null || tasks.length === 0) {
    tasks = getDefaultTasks();
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskSummary() {
  let total = tasks.length;
  let completed = 0;
  let pending = 0;

  tasks.forEach(function(task) {
    if (task.completed === true) {
      completed = completed + 1;
    } else {
      pending = pending + 1;
    }
  });

  totalTasksElement.textContent = total;
  completedTasksElement.textContent = completed;
  pendingTasksElement.textContent = pending;
}

function showNotification(message) {
  notification.textContent = message;
  notification.classList.remove('hidden');

  setTimeout(function() {
    notification.classList.add('hidden');
  }, 2000);
}

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

function resetForm() {
  taskForm.reset();
  editIndex = -1;
  modalTitle.textContent = 'Thêm công việc';
}

function createTaskCard(task, index) {
  const card = document.createElement('div');
  card.classList.add('task-card');

  if (task.completed === true) {
    card.classList.add('completed');
  }

  const info = document.createElement('div');
  info.classList.add('task-info');

  const title = document.createElement('h3');
  title.classList.add('task-title');
  title.textContent = task.title;

  const description = document.createElement('p');
  description.classList.add('task-description');
  description.textContent = task.description;

  const meta = document.createElement('div');
  meta.classList.add('task-meta');

  const deadline = document.createElement('span');
  deadline.classList.add('task-deadline');
  deadline.textContent = 'Hạn: ' + task.deadline;

  const priority = document.createElement('span');
  priority.classList.add('task-priority');
  priority.textContent = 'Ưu tiên: ' + task.priority;

  const status = document.createElement('span');
  status.classList.add('task-status');

  if (task.completed === true) {
    status.textContent = 'Trạng thái: Hoàn thành';
  } else {
    status.textContent = 'Trạng thái: Chưa hoàn thành';
  }

  meta.appendChild(deadline);
  meta.appendChild(priority);
  meta.appendChild(status);

  info.appendChild(title);
  info.appendChild(description);
  info.appendChild(meta);

  const actions = document.createElement('div');
  actions.classList.add('task-actions');

  const actionTop = document.createElement('div');
  actionTop.classList.add('task-actions-top');

  const checkboxLabel = document.createElement('label');
  checkboxLabel.classList.add('checkbox-label');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.dataset.index = index;

  const checkboxText = document.createElement('span');
  checkboxText.textContent = 'Hoàn thành';

  checkboxLabel.appendChild(checkbox);
  checkboxLabel.appendChild(checkboxText);

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.classList.add('edit-btn');
  editButton.textContent = 'Sửa';
  editButton.dataset.index = index;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('delete-btn');
  deleteButton.textContent = 'Xóa';
  deleteButton.dataset.index = index;

  actionTop.appendChild(checkboxLabel);
  actionTop.appendChild(editButton);
  actionTop.appendChild(deleteButton);

  actions.appendChild(actionTop);

  card.appendChild(info);
  card.appendChild(actions);

  return card;
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.classList.add('empty-state');
    emptyState.textContent = 'Chưa có công việc nào. Hãy thêm công việc mới.';
    taskList.appendChild(emptyState);
    return;
  }

  tasks.forEach(function(task, index) {
    const card = createTaskCard(task, index);
    taskList.appendChild(card);
  });
}

function getFormData() {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const deadline = deadlineInput.value.trim();
  const priority = priorityInput.value;

  if (title === '') {
    showNotification('Vui lòng nhập tiêu đề');
    return null;
  }

  if (deadline === '') {
    showNotification('Vui lòng chọn hạn nộp');
    return null;
  }

  if (priority !== 'Thấp' && priority !== 'Trung bình' && priority !== 'Cao') {
    showNotification('Mức ưu tiên không hợp lệ');
    return null;
  }

  return {
    title: title,
    description: description,
    deadline: deadline,
    priority: priority,
    completed: false
  };
}

function addTask() {
  const data = getFormData();

  if (!data) {
    return;
  }

  tasks.push(data);
  saveToLocalStorage();
  renderTasks();
  updateTaskSummary();
  closeModal();
  resetForm();
  showNotification('Đã thêm công việc');
}

function editTask(index) {
  const task = tasks[index];

  titleInput.value = task.title;
  descriptionInput.value = task.description;
  deadlineInput.value = task.deadline;
  priorityInput.value = task.priority;

  editIndex = index;
  modalTitle.textContent = 'Sửa công việc';
  openModal();
}

function updateTask(index) {
  const data = getFormData();

  if (!data) {
    return;
  }

  data.completed = tasks[index].completed;
  tasks[index] = data;
  saveToLocalStorage();
  renderTasks();
  updateTaskSummary();
  closeModal();
  resetForm();
  showNotification('Đã cập nhật công việc');
}

function deleteTask(index) {
  const confirmDelete = confirm('Bạn có chắc muốn xóa công việc này không?');

  if (confirmDelete === false) {
    return;
  }

  tasks.splice(index, 1);
  saveToLocalStorage();
  renderTasks();
  updateTaskSummary();
  showNotification('Đã xóa công việc');
}

function toggleTaskStatus(index, isChecked) {
  tasks[index].completed = isChecked;
  saveToLocalStorage();
  renderTasks();
  updateTaskSummary();

  if (isChecked === true) {
    showNotification('Đã đánh dấu hoàn thành');
  } else {
    showNotification('Đã đánh dấu chưa hoàn thành');
  }
}

function handleTaskListClick(event) {
  const target = event.target;

  if (target.classList.contains('edit-btn')) {
    const index = Number(target.dataset.index);
    editTask(index);
    return;
  }

  if (target.classList.contains('delete-btn')) {
    const index = Number(target.dataset.index);
    deleteTask(index);
  }
}

function handleTaskListChange(event) {
  const target = event.target;

  if (target.type === 'checkbox') {
    const index = Number(target.dataset.index);
    toggleTaskStatus(index, target.checked);
  }
}

addTaskButton.addEventListener('click', function() {
  resetForm();
  openModal();
});

closeModalButton.addEventListener('click', function() {
  closeModal();
  resetForm();
});

cancelButton.addEventListener('click', function() {
  closeModal();
  resetForm();
});

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  if (editIndex === -1) {
    addTask();
  } else {
    updateTask(editIndex);
  }
});

taskList.addEventListener('click', handleTaskListClick);

taskList.addEventListener('change', handleTaskListChange);

loadFromLocalStorage();
renderTasks();
updateTaskSummary();
