// Wait for the DOM to fully load before running the script
// This ensures all elements are available for selection and manipulation
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage and populate the list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again
    }

    // Function to add a new task to the list and optionally save to Local Storage
    function addTask(taskText, save = true) {
        // If called from button/Enter, get value from input
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }
        // Check if the input is empty
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item (li) for the task
        const li = document.createElement('li');
        const textNode = document.createTextNode(taskText);
        li.appendChild(textNode);

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Assign an onclick event to remove the task when clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            // Remove from Local Storage
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(t => t !== taskText || storedTasks.indexOf(t) !== Array.from(taskList.children).indexOf(li));
            // The above line ensures only the correct instance is removed if duplicates exist
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);
        // Append the list item to the task list
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field if this was a user entry
        if (save) {
            taskInput.value = '';
        }
    }

    // Event listener for the Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for the Enter key in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
}); 
