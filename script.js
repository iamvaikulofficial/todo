document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('taskInput').addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
    loadTasks();
});

function addTask() {
    const input = document.getElementById('taskInput');
    const message = document.getElementById('message');
    if (input.value.trim() === '') {
        message.textContent = "Please enter a task!";
        return;
    }
    message.textContent = ""; // Clear message
    const tasksList = document.getElementById('tasksList');
    const li = document.createElement('li');
    li.textContent = input.value;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        tasksList.removeChild(li);
        saveTasks();
    };
    li.appendChild(deleteBtn);
    li.addEventListener('click', function(e) {
        if (e.target === li) {
            li.classList.toggle('completed');
            saveTasks();
        }
    });
    tasksList.appendChild(li);
    input.value = '';
    saveTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = ''; // Clear list before loading
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            tasksList.removeChild(li);
            saveTasks();
        };
        li.appendChild(deleteBtn);
        if (task.completed) li.classList.add('completed');
        li.addEventListener('click', function(e) {
            if (e.target === li) {
                li.classList.toggle('completed');
                saveTasks();
            }
        });
        tasksList.appendChild(li);
    });
}

function saveTasks() {
    const tasksList = document.getElementById('tasksList');
    const tasks = [];
    tasksList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].nodeValue.trim(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}