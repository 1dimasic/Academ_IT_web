$(function () {
    const form = $(".form");
    const newTaskInput = $("#new_task_input");
    const todoList = $(".todo_list");

    form.submit(function (e) {
        e.preventDefault();

        let newTaskText = newTaskInput.val().trim();
        newTaskInput.removeClass("invalid");

        if (newTaskText.length === 0) {
            newTaskInput.addClass("invalid");
            return;
        }

        const addedTodoTask = $("<li>").addClass("todo_item");

        addedTodoTask.html(`<span class="task_text"></span>
                <button type="button" class="button delete_button">Удалить</button>
                <button type="button" class="button edit_button">Редактировать</button>`);

        addedTodoTask.find(".task_text").text(newTaskText);
        todoList.append(addedTodoTask);

        function initTodoListInViewMode() {
            addedTodoTask.find(".delete_button").click(function () {
                addedTodoTask.remove();
            });

            addedTodoTask.find(".edit_button").click(function () {
                addedTodoTask.html(`<input type="text" class="edit_task_field">                            
                    <button type="button" class="button cancel_button">Отменить</button>
                    <button type="button" class="button save_button">Сохранить</button>
                    <div class="error_message">Введите текст задачи</div>`);

                const editTaskInput = addedTodoTask.find(".edit_task_field").val(newTaskText);

                addedTodoTask.find(".cancel_button").click(function () {
                    addedTodoTask.html(`<span class="task_text"></span>
                        <button type="button" class="button delete_button">Удалить</button>
                        <button type="button" class="button edit_button">Редактировать</button>`);

                    addedTodoTask.find(".task_text").text(newTaskText);
                    initTodoListInViewMode();
                });

                addedTodoTask.find(".save_button").click(function () {
                    const editTaskText = editTaskInput.val().trim();
                    editTaskInput.removeClass("invalid");

                    if (editTaskText.length === 0) {
                        editTaskInput.addClass("invalid");
                        return;
                    }

                    addedTodoTask.html(`<span class="task_text"></span>
                        <button type="button" class="button delete_button">Удалить</button>
                        <button type="button" class="button edit_button">Редактировать</button>`);

                    newTaskText = editTaskText;
                    addedTodoTask.find(".task_text").text(newTaskText);
                    initTodoListInViewMode();
                });

                editTaskInput.keypress(function (e) {
                    if (e.key === "Enter") {
                        addedTodoTask.find(".save_button").click();
                    }
                });
            });
        }

        initTodoListInViewMode();
        newTaskInput.val("");
    });
});