$(function () {
    const form = $(".form");
    const newTask = $(".new_task");
    const todoList = $(".todo_list");

    form.submit(function (e) {
        e.preventDefault();

        let newTaskText = newTask.val().trim();
        newTask.removeClass("invalid");

        if (newTaskText.length === 0) {
            newTask.addClass("invalid");
            return;
        }

        const addedTask = $("<li>").addClass("todo_item");

        function viewContactList() {
            addedTask.html(`<span class="task_text"></span>
                <button type="button" class="delete_button">Удалить</button>
                <button type="button" class="edit_button">Редактировать</button>`);

            addedTask.find(".task_text").text(newTaskText);

            if (addedTask.hasClass("edit_task")) {
                addedTask.appendTo("edit_task");
                addedTask.removeClass("edit_task");
            } else {
                todoList.append(addedTask);
            }

            addedTask.find(".delete_button").click(function () {
                addedTask.remove();
            });

            addedTask.find(".edit_button").click(function () {
                addedTask.addClass("edit_task");
                addedTask.html(`<input type="text" class="edit_task_field">                            
                    <button type="button" class="cancel_button">Отменить</button>
                    <button type="button" class="save_button">Сохранить</button>`);

                const editTask = addedTask.find(".edit_task_field").val(newTaskText);

                addedTask.find(".cancel_button").click(function () {
                    viewContactList();
                });

                addedTask.find(".save_button").click(function () {
                    const editTaskText = editTask.val().trim();
                    editTask.removeClass("invalid");

                    if (editTaskText.length === 0) {
                        editTask.addClass("invalid");
                        return;
                    }

                    newTaskText = editTaskText;
                    viewContactList();
                });

                $(document).keypress(function (e) {
                    if (e.key === "Enter") {
                        $(".save_button").click();
                    }
                });
            });
        }

        viewContactList();
        newTask.text("");
    });
});