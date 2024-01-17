Vue.createApp({
    data() {
        return {
            todoList: [],
        };
    },

    methods: {
        addTodoItem() {
            if (this.newTodoItemText.length === 0) {
                return;
            }

            this.todoList.push({
                text: this.newTodoItemText,
                isEdit: false,
                isInvalid: false,
            })

            this.newTodoItemText = "";
        },

        deleteTodoItem(index) {
            this.todoList.splice(index, 1);
        },

        editTodoItem(index) {
            this.todoList[index].isEdit = true;
        },

        notSaveTodoItem(index, newText) {
            if (newText.length === 0) {
                this.todoList[index].isInvalid = true;
                return;
            }

            this.todoList[index].isEdit = false;
            this.todoList[index].isInvalid = false;
        },

        saveTodoItem(index, newText) {
            if (newText.length === 0) {
                this.todoList[index].isInvalid = true;
                return;
            }

            this.todoList[index].text = newText;
            this.todoList[index].isEdit = false;
            this.todoList[index].isInvalid = false;
        }
    }
}).mount("#app");