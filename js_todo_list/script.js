document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const new_task = document.querySelector(".new_task");
    const todo_list = document.querySelector(".todo_list");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let new_task_text = new_task.value.trim();
        new_task.classList.remove("invalid");

        if (new_task_text.length === 0) {
            new_task.classList.add("invalid");
            return;
        }

        const added_task = document.createElement("li");
        added_task.classList.add("todo_item");

        function set_view() {
            added_task.innerHTML = `<span class="task_text"></span>
            <button type="button" class="delete_button">Удалить</button>
            <button type="button" class="edit_button">Редактировать</button>`;

            added_task.querySelector(".task_text").textContent = new_task_text;
            todo_list.append(added_task);

            added_task.querySelector(".delete_button").addEventListener("click", function () {
                added_task.remove();
            });

            added_task.querySelector(".edit_button").addEventListener("click", function () {
                added_task.innerHTML = `<input type="text" class="edit_task_field">                            
                <button type="button" class="cancel_button">Отменить</button>
                <button type="button" class="save_button">Сохранить</button>
                <span class="error_message">Введите текст задачи</span>`;

                const edit_task = added_task.querySelector(".edit_task_field");
                edit_task.value = new_task_text;

                added_task.querySelector(".cancel_button").addEventListener("click", function () {
                    set_view();
                })

                added_task.querySelector(".save_button").addEventListener("click", function () {
                    const edit_task_text = edit_task.value.trim();
                    edit_task.classList.remove("invalid")

                    if (edit_task_text.length === 0) {
                        edit_task.classList.add("invalid");
                        return;
                    }
                    new_task_text = edit_task_text;
                    set_view();
                })
            });
        }
        set_view();
        new_task.value = "";
    });
});