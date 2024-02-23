Vue.createApp({
        data() {
            return {
                todoItems: [],
                id: 0
            };
        },

        methods: {
            addTodoItem(text) {
                this.id++;

                const todoItem = {
                    id: this.id,
                    text: text
                };

                this.todoItems.push(todoItem);
            },

            saveTodoItem(itemToSave) {
                this.todoItems.find(item => item.id === itemToSave.id).text = itemToSave.text;
            },

            deleteTodoItem(itemId) {
                this.todoItems = this.todoItems.filter(item => item.id !== itemId);
            }
        },

        template: `<h1 class="text-center">Список задач</h1>
        <todo-item-adding-form @add="addTodoItem"></todo-item-adding-form>
        <todo-item v-for="(item, index) in todoItems"
                   :key="item.id"
                   :item="item"
                   :index="index"
                   @remove="deleteTodoItem"
                   @save="saveTodoItem">
        </todo-item>`
})
    .component("TodoItemAddingForm", {
        data() {
            return {
                newTodoItemText: "",
                isEmptyNewTodoItemText: false
            };
        },

        emits: ["add"],

        computed: {
            validationTodoItemTextClass() {
                return {
                    "is-valid": this.newTodoItemText.length !== 0,
                    "is-invalid": this.isEmptyNewTodoItemText && this.newTodoItemText.length === 0
                };
            }
        },

        methods: {
            submit() {
                this.isEmptyNewTodoItemText = this.newTodoItemText.length === 0;

                if (this.isEmptyNewTodoItemText) {
                    return;
                }

                this.$emit("add", this.newTodoItemText);
                this.newTodoItemText = "";
            }
        },

        template: `
            <form @submit.prevent="submit" class="row" novalidate>
            <div class="col-12">
                <input type="text"
                       v-model.trim="newTodoItemText"
                       class="form-control"
                       :class="validationTodoItemTextClass"
                       required>
                <div class="invalid-feedback text-center">Введите текст задачи</div>
            </div>
            <div class="col-12 mt-4">
                <button class="btn btn-primary float-end">Добавить</button>
            </div>
            </form>`
    })
    .component("TodoItem", {
        data() {
            return {
                id: this.item.id,
                todoItemText: "",
                isEditMode: false
            };
        },

        emits: ["remove", "save"],

        props: {
            item: {
                type: Object,
                required: true
            },

            index: {
                type: Number,
                required: true
            }
        },

        methods: {
            remove() {
                this.$emit("remove", this.id);
            },

            edit() {
                this.isEditMode = true;
                this.todoItemText = this.item.text;
            },

            save() {
                if (this.validationTodoItemTextClass["is-invalid"]) {
                    return;
                }

                const itemToSave = {
                    id: this.id,
                    text: this.todoItemText
                };

                this.$emit("save", itemToSave);
                this.isEditMode = false;
            },

            cancel() {
                this.isEditMode = false;
            }
        },

        computed: {
            validationTodoItemTextClass() {
                return {
                    "is-valid": this.todoItemText.length !== 0,
                    "is-invalid": this.todoItemText.length === 0
                };
            }
        },

        template: `
            <div v-if="!isEditMode" class="row mt-3">
            <div class="col-auto">{{ index + 1 }}</div>
            <div class="text-break col">{{ item.text }}</div>
            <div class="col-auto">
                <button @click="remove"
                        class="btn btn-sm btn-danger float-end">
                    Удалить
                </button>
                <button @click="edit"
                        class="btn btn-sm btn-warning float-end me-2">
                    Редактировать
                </button>
            </div>
            </div>
            <div v-else class="row mt-3">
            <div class="col-auto">{{ index + 1 }}</div>
            <div class="col">
                <input type="text"
                       class="form-control"
                       v-model.trim="todoItemText"
                       :class="validationTodoItemTextClass"
                       @keyup.enter="save">
                <div class="invalid-feedback text-center">Введите текст задачи</div>
            </div>
            <div class="col-auto">
                <button @click="cancel"
                        class="btn btn-sm btn-secondary float-end">Отменить
                </button>
                <button @click="save"
                        class="btn btn-sm btn-success float-end me-2">Сохранить
                </button>
            </div>
            </div>`
    })
    .mount("#app");