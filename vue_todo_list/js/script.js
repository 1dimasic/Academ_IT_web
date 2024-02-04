Vue.createApp({
    data() {
        return {
            todoList: [],
            id: 0
        }
    },

    methods: {
        addTodoItem(text) {
            const todoItem = {
                id: ++this.id,
                text: text,
                isEdit: false
            }

            this.todoList.push(todoItem);
        },

        deleteTodoItem(itemToDelete) {
            this.todoList = this.todoList.filter(item => item.id !== itemToDelete.id);
        },
    },

    template: `<h1 class="text-center">Список задач</h1>
               <component-form @add="addTodoItem"></component-form>
               <todo-item :item="item" :index="index"
                          v-for="(item, index) in todoList" :key="item.id"
                          @remove="deleteTodoItem">
               </todo-item>`
})
    .component("ComponentForm", {
        data() {
            return {
                newTodoItemText: "",
                isEmptyNewTodoItemText: false
            }
        },

        computed: {
            validationTodoItemTextClass() {
                return {
                    "is-valid": this.newTodoItemText.length !== 0,
                    "is-invalid": this.isEmptyNewTodoItemText && this.newTodoItemText.length === 0
                }
            },
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

        template: `<form @submit.prevent="submit" class="row" novalidate>
                    <div class="col-12">
                      <input type="text" v-model.trim="newTodoItemText"
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
        props: {
            item: Object,
            index: Number
        },

        data() {
            return {
                todoItemText: this.item.text,
                editMode: this.item.isEdit,
                savedTodoItemText: ""
            }
        },

        methods: {
            remove(item) {
                this.$emit("remove", item);
            },

            edit() {
                this.savedTodoItemText = this.todoItemText;
                this.editMode = true;
            },

            save() {
                if (this.todoItemText.length === 0) {
                    return;
                }

                this.editMode = false;
            },

            cancel() {
                if (this.todoItemText.length === 0) {
                    return;
                }

                this.todoItemText = this.savedTodoItemText;
                this.editMode = false;
            }
        },

        computed: {
            editTodoItemValidation() {
                return {
                    "is-valid": this.todoItemText.length !== 0,
                    "is-invalid": this.todoItemText.length === 0
                }
            }
        },

        template:`<div v-if="!editMode" class="row mt-3">
                    <div class="col-auto">{{ index + 1 }}</div>
                    <div class="text-break col">{{ todoItemText }}</div>
                    <div class="col-auto">
                      <button @click="remove(item)"
                              class="btn btn-sm btn-danger float-end">Удалить
                      </button>
                      <button @click="edit"
                              class="btn btn-sm btn-warning float-end me-2">Редактировать
                      </button>
                    </div>
                  </div>
                  <div v-else class="row mt-3">
                    <div class="col-auto">{{ index + 1 }}</div>
                    <div class="col">
                      <input type="text"
                             class="form-control"
                             v-model.trim="todoItemText"
                             :class="editTodoItemValidation"
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