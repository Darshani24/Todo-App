document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    const saveAndRender = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
    };

    const renderTodos = () => {
        todoList.innerHTML = todos.map((todo, index) => `
            <li class="todo">
                <input type="checkbox" ${todo.completed ? "checked" : ""} data-index="${index}" class="checkbox-input">
                <span class="todo-text">
                    <span class="custom-checkbox"></span> <!-- Custom checkbox will be added here -->
                    ${todo.text}
                </span>
                <button class="delete-button" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            </li>
        `).join("");

        // Add event listeners for delete buttons
        document.querySelectorAll(".delete-button").forEach(btn =>
            btn.addEventListener("click", (e) => {
                todos.splice(e.target.closest("button").dataset.index, 1);
                saveAndRender();
            })
        );

        // Add event listeners for checkbox state changes
        document.querySelectorAll('.checkbox-input').forEach(checkbox =>
            checkbox.addEventListener("change", (e) => {
                todos[e.target.dataset.index].completed = e.target.checked;
                saveAndRender();
            })
        );

        // Adding the custom checkbox appearance and functionality
        document.querySelectorAll('.checkbox-input').forEach(checkbox => {
            const customCheckbox = checkbox.nextElementSibling.querySelector('.custom-checkbox');
            
            if (checkbox.checked) {
                customCheckbox.style.backgroundColor = "greenyellow"; // Checkbox checked state
                customCheckbox.innerHTML = "<span>&#10003;</span>"; // Checkmark
            }

            // Handle checkbox click events to toggle checked state
            customCheckbox.addEventListener("click", () => {
                checkbox.checked = !checkbox.checked;
                customCheckbox.style.backgroundColor = checkbox.checked ? "greenyellow" : "white";
                customCheckbox.innerHTML = checkbox.checked ? "<span>&#10003;</span>" : ""; // Checkmark toggle
                todos[checkbox.dataset.index].completed = checkbox.checked;
                saveAndRender();
            });
        });
    };

    // Adding a new todo item
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (todoInput.value.trim()) {
            todos.push({ text: todoInput.value.trim(), completed: false });
            todoInput.value = "";
            saveAndRender();
        }
    });

    renderTodos();
});
