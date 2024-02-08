$(function () {
    const form = $(".form");
    const newTaskInput = $("#new_task_input");
    const todoList = $(".todo_list");

    form.submit(function (e) {
        e.preventDefault();

        function setTodoItem() {
            addedTodoTask.html(`
                <div class="task_text inline"></div>
                <div class="inline">
                    <button type="button" class="button delete_button">Удалить</button>
                    <button type="button" class="button edit_button">Редактировать</button>              
                </div>`);

            addedTodoTask.find(".task_text").text(newTaskText);
        }

        let newTaskText = newTaskInput.val().trim();
        newTaskInput.removeClass("invalid");

        if (newTaskText.length === 0) {
            newTaskInput.addClass("invalid");
            return;
        }

        const addedTodoTask = $("<li>").addClass("todo_item");
        setTodoItem();
        todoList.append(addedTodoTask);

        function setViewMode() {
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
                    setTodoItem();
                    setViewMode();
                });

                addedTodoTask.find(".save_button").click(function () {
                    const editTaskText = editTaskInput.val().trim();
                    editTaskInput.removeClass("invalid");

                    if (editTaskText.length === 0) {
                        editTaskInput.addClass("invalid");
                        return;
                    }

                    newTaskText = editTaskText;
                    setTodoItem();
                    setViewMode();
                });

                editTaskInput.keypress(function (e) {
                    if (e.key === "Enter") {
                        addedTodoTask.find(".save_button").click();
                    }
                });
            });
        }

        setViewMode();
        newTaskInput.val("");
    });
});