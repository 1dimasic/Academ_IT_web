document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const newTaskInput = document.getElementById("new_task_input");
    const todoList = document.querySelector(".todo_list");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let newTaskText = newTaskInput.value.trim();
        newTaskInput.classList.remove("invalid");

        if (newTaskText.length === 0) {
            newTaskInput.classList.add("invalid");
            return;
        }

        const addedTodoTask = document.createElement("li");

        addedTodoTask.innerHTML = `<span class="task_text"></span>
                <button type="button" class="button delete_button">Удалить</button>
                <button type="button" class="button edit_button">Редактировать</button>`;
        
        addedTodoTask.classList.add("todo_item");
        addedTodoTask.querySelector(".task_text").textContent = newTaskText;
        todoList.append(addedTodoTask);

        function initTodoListInViewMode() {
            addedTodoTask.querySelector(".delete_button").addEventListener("click", function () {
                addedTodoTask.remove();
            });

            addedTodoTask.querySelector(".edit_button").addEventListener("click", function () {
                addedTodoTask.innerHTML = `<input type="text" class="edit_task_field">
                    <button type="button" class="button cancel_button">Отменить</button>
                    <button type="button" class="button save_button">Сохранить</button>
                    <div class="error_message">Введите текст задачи</div>`;

                const editTaskInput = addedTodoTask.querySelector(".edit_task_field");
                editTaskInput.value = newTaskText;

                addedTodoTask.querySelector(".cancel_button").addEventListener("click", function () {
                    addedTodoTask.innerHTML = `<span class="task_text"></span>
                        <button type="button" class="button delete_button">Удалить</button>
                        <button type="button" class="button edit_button">Редактировать</button>`;

                    addedTodoTask.querySelector(".task_text").textContent = newTaskText;
                    initTodoListInViewMode();
                });

                addedTodoTask.querySelector(".save_button").addEventListener("click", function () {
                    const editTaskText = editTaskInput.value.trim();
                    editTaskInput.classList.remove("invalid");

                    if (editTaskText.length === 0) {
                        editTaskInput.classList.add("invalid");
                        return;
                    }

                    addedTodoTask.innerHTML = `<span class="task_text"></span>
                        <button type="button" class="button delete_button">Удалить</button>
                        <button type="button" class="button edit_button">Редактировать</button>`;

                    newTaskText = editTaskText;
                    addedTodoTask.querySelector(".task_text").textContent = newTaskText;
                    initTodoListInViewMode();
                });

                editTaskInput.addEventListener("keydown", function (e) {
                    if (e.code === "Enter") {
                        addedTodoTask.querySelector(".save_button").click();
                    }
                });
            });
        }

        initTodoListInViewMode();
        newTaskInput.value = "";
    });
});