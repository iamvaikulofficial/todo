document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() === '') return;
    const tasksList = document.getElementById('tasksList');
    const li = document.createElement('li');
    li.textContent = taskInput.value;
    li.onclick = function() {
        this.classList.toggle('completed');
        saveTasks();
    };
    tasksList.appendChild(li);
    taskInput.value = '';
    saveTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksList = document.getElementById('tasksList');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('completed');
        li.onclick = function() {
            this.classList.toggle('completed');
            saveTasks();
        };
        tasksList.appendChild(li);
    });
}

function saveTasks() {
    const tasksList = document.getElementById('tasksList');
    const tasks = [];
    tasksList.querySelectorAll('li').forEach(li => {
        tasks.push({ text: li.textContent, completed: li.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
