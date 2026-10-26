// State management: array of objects
let tasks = [];
let currentFilter = 'all';

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemCount = document.getElementById('item-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter-btn');

// Add task event
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    
    // Refuse empty or spaces-only tasks
    if (taskText === '') return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    todoInput.value = '';
    renderTasks();
});

// Event Delegation on the UL list for toggle and delete
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const taskId = Number(li.dataset.id);

    // If delete button clicked
    if (e.target.classList.contains('delete-btn')) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
        return;
    }

    // Otherwise, toggle completion
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
});

// Filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Clear completed button
clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});

// Render function
function renderTasks() {
    todoList.innerHTML = '';

    // Filter tasks based on current selection
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        const span = document.createElement('span');
        span.textContent = task.text; // Uses textContent for safety as required

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    // Update item count
    const activeCount = tasks.filter(task => !task.completed).length;
    itemCount.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
}
