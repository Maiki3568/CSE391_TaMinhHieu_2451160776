let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";
let nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const itemCount = document.querySelector("#itemCount");
const clearCompletedBtn = document.querySelector("#clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    itemCount.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
}

function applyFilter() {
    const items = list.querySelectorAll("li");
    items.forEach(li => {
        const id = parseInt(li.dataset.id);
        const todo = todos.find(t => t.id === id);
        if (!todo) return;
        if (currentFilter === "all") {
            li.classList.remove("hidden");
        } else if (currentFilter === "active") {
            li.classList.toggle("hidden", todo.completed);
        } else {
            li.classList.toggle("hidden", !todo.completed);
        }
    });
}

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "❌";
    deleteBtn.dataset.action = "delete";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

function renderAll() {
    list.innerHTML = "";
    todos.forEach(todo => {
        const li = createTodoElement(todo);
        list.appendChild(li);
    });
    applyFilter();
    updateCount();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const todo = { id: nextId++, text, completed: false };
    todos.push(todo);
    saveTodos();

    const li = createTodoElement(todo);
    list.appendChild(li);
    applyFilter();
    updateCount();

    input.value = "";
    input.focus();
});

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = parseInt(li.dataset.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    if (e.target.dataset.action === "delete") {
        todos = todos.filter(t => t.id !== id);
        li.remove();
        saveTodos();
        updateCount();
        return;
    }

    if (e.target.classList.contains("todo-text")) {
        todo.completed = !todo.completed;
        li.classList.toggle("completed", todo.completed);
        saveTodos();
        applyFilter();
        updateCount();
    }
});

list.addEventListener("dblclick", (e) => {
    if (!e.target.classList.contains("todo-text")) return;

    const li = e.target.closest("li");
    const id = parseInt(li.dataset.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const editInput = document.createElement("input");
    editInput.className = "edit-input";
    editInput.value = todo.text;

    e.target.replaceWith(editInput);
    editInput.focus();

    const saveEdit = () => {
        const newText = editInput.value.trim();
        if (!newText) return;
        todo.text = newText;
        saveTodos();

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;
        editInput.replaceWith(span);
    };

    editInput.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") saveEdit();
        if (ev.key === "Escape") {
            const span = document.createElement("span");
            span.className = "todo-text";
            span.textContent = todo.text;
            editInput.replaceWith(span);
        }
    });

    editInput.addEventListener("blur", saveEdit);
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        applyFilter();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderAll();
});

renderAll();
