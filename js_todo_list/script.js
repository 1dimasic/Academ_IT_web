document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const newTask = document.querySelector(".new_task");
    const todoList = document.querySelector(".todo_list");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let newTaskText = newTask.value.trim();
        newTask.classList.remove("invalid");

        if (newTaskText.length === 0) {
            newTask.classList.add("invalid");
            return;
        }

        const addedTask = document.createElement("li");
        addedTask.classList.add("todo_item");

        function viewContactList() {
            addedTask.innerHTML = `<span class="task_text"></span>
                <button type="button" class="delete_button">Удалить</button>
                <button type="button" class="edit_button">Редактировать</button>`;

            addedTask.querySelector(".task_text").textContent = newTaskText;

            if (addedTask.classList.contains("edit_task")) {
                document.querySelector(".edit_task").parentNode.replaceChild(addedTask,
                    document.querySelector(".edit_task"));
                addedTask.classList.remove("edit_task");
            } else {
                todoList.append(addedTask);
            }

            addedTask.querySelector(".delete_button").addEventListener("click", function () {
                addedTask.remove();
            });

            addedTask.querySelector(".edit_button").addEventListener("click", function () {
                addedTask.classList.add("edit_task");
                addedTask.innerHTML = `<input type="text" class="edit_task_field">                            
                    <button type="button" class="cancel_button">Отменить</button>
                    <button type="button" class="save_button">Сохранить</button>`;

                const editTask = addedTask.querySelector(".edit_task_field");
                editTask.value = newTaskText;

                addedTask.querySelector(".cancel_button").addEventListener("click", function () {
                    viewContactList();
                });

                addedTask.querySelector(".save_button").addEventListener("click", function () {
                    const editTaskText = editTask.value.trim();
                    editTask.classList.remove("invalid");

                    if (editTaskText.length === 0) {
                        editTask.classList.add("invalid");
                        return;
                    }

                    newTaskText = editTaskText;
                    viewContactList();
                });

                document.addEventListener("keydown", function (e) {
                    if (e.code === "Enter") {
                        addedTask.querySelector(".save_button").click();
                    }
                });
            });
        }

        viewContactList();
        newTask.value = "";
    });
});