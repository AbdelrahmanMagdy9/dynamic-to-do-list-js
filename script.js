// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li span').forEach(taskSpan => {
            tasks.push(taskSpan.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a new task element
    function createTaskElement(taskText) {
        // Create new list item
        const li = document.createElement('li');
        
        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        
        // Add click event to remove button
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks(); // Save tasks after removal
        };

        // Add remove button to list item
        li.appendChild(removeBtn);

        // Add list item to task list
        taskList.appendChild(li);
    }

    // Function to add a new task
    function addTask() {
        // Get and trim the task text
        const taskText = taskInput.value.trim();

        // Validate task text
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create and add the new task element
        createTaskElement(taskText);

        // Save tasks to localStorage
        saveTasks();

        // Clear input field
        taskInput.value = '';
    }

    // Add click event listener to the add button
    addButton.addEventListener('click', addTask);

    // Add keypress event listener to input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when the page loads
    loadTasks();
}); 
