Vue.createApp({
    data() {
        return {
            contacts: [
                {
                    id: 1,
                    name: "bob",
                    surname: "dilan",
                    phoneNumber: "123"
                },
                {
                    id: 2,
                    name: "sue",
                    surname: "dilan",
                    phoneNumber: "456"
                }
            ],
            contactId: 3,
            selectAll: false,
            selectedContacts: [],
            searchingString: "",
            deletedContacts: []
        };
    },

    computed: {
        isAnyContactsChecked() {
            return this.selectedContacts.length !== 0;
        },

        contactsToShow() {
            return this.contacts.filter(contact => contact.name.includes(this.searchingString) || contact.surname.includes(this.searchingString) || contact.phoneNumber.includes(this.searchingString));
        }
    },

    methods: {
        addContact(contact) {
            this.contactId += 1;
            contact.id = this.contactId;

            this.contacts.push(contact);
        },

        saveContact(contact) {
            const contactToSave = this.contacts.find(c => c.id === contact.id);

            contactToSave.name = contact.name;
            contactToSave.surname = contact.surname;
            contactToSave.phoneNumber = contact.phoneNumber;
        },

        removeContacts() {
            this.deletedContacts.forEach(contactId => {
                this.contacts = this.contacts.filter(contact => contact.id !== contactId);
                this.selectedContacts = this.selectedContacts.filter(id => id !== contactId);
            });

            this.selectAll = this.selectedContacts.length !== 0;
            this.$refs.modal.hide();
        },

        selectContacts(contactId) {
            if (this.selectedContacts.includes(contactId)) {
                this.selectedContacts = this.selectedContacts.filter(id => id !== contactId);
                return;
            }

            this.selectedContacts.push(contactId);
        },

        selectAllContacts() {
            this.selectAll = !this.selectAll;
            this.selectedContacts = this.selectAll ? this.contacts.map(contact => contact.id) : [];
        },

        showDeleteConfirmDialog(deletedContacts) {
            this.deletedContacts = deletedContacts;
            this.$refs.modal.show();
        }
    },

    template: `
        <div class="row">
        <div class="col text-center mb-4">
            <h1>Телефонная книга</h1>
        </div>
        </div>
        <contact-adding-form :contacts="contacts" @add="addContact"></contact-adding-form>
        <div class="row">
        <div class="col-sm-4">
            <label for="filter" class="form-label">Поиск</label>
            <input type="text" id="filter" v-model="searchingString" class="form-control">
        </div>
        </div>
        <div class="row mt-3 table-responsive{-lg}">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>№</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Номер телефона</th>
                <th></th>
                <th>
                    <input type="checkbox" @click="selectAllContacts" v-model="selectAll">
                </th>
            </tr>
            </thead>
            <tbody>
            <contact v-for="(contact, index) in contactsToShow"
                     :key="contact.id"
                     :selectAll="selectAll"
                     :contacts="contacts"
                     :contact="contact"
                     :index="index"
                     @save="saveContact"
                     @select="selectContacts"
                     @showDeleteConfirmDialog="showDeleteConfirmDialog">
            </contact>
            </tbody>
        </table>
        </div>
        <div class="row">
        <div>
            <button class="btn btn-danger float-end col-auto"
                    :disabled="!isAnyContactsChecked"
                    @click="showDeleteConfirmDialog(selectedContacts)">Удалить
            </button>
        </div>
        </div>
        <delete-confirm-modal-dialog ref="modal" @remove="removeContacts"></delete-confirm-modal-dialog>`
})
    .component("DeleteConfirmModalDialog", {
        data() {
            return {
                modal: null
            };
        },

        emits: ["remove"],

        mounted() {
            this.modal = new bootstrap.Modal(this.$refs.modal, {});
        },

        methods: {
            show() {
                this.modal.show();
            },

            hide() {
                this.modal.hide();
            },

            remove() {
                this.$emit("remove");
            }
        },

        template: `
            <div ref="modal"
                 class="modal fade"
                 data-bs-backdrop="static"
                 data-bs-keyboard="false"
                 tabindex="-1"
                 aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Подтверждение удаления</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Вы действительно хотите удалить контакт / контакты?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                        <button type="button" class="btn btn-danger" @click="remove">Удалить</button>
                    </div>
                </div>
            </div>
            </div>`
    })
    .component("Contact", {
        data() {
            return {
                id: null,
                name: null,
                surname: null,
                phoneNumber: null,
                isChecked: false,
                isEditMode: false
            };
        },

        emits: ["save", "select", "showDeleteConfirmDialog"],

        props: {
            contacts: Array,
            contact: Object,
            index: Number,
            selectAll: Boolean
        },

        watch: {
            selectAll(newSelectAll) {
                this.isChecked = newSelectAll;
            }
        },

        methods: {
            edit() {
                this.isEditMode = true;

                this.id = this.contact.id;
                this.name = this.contact.name;
                this.surname = this.contact.surname;
                this.phoneNumber = this.contact.phoneNumber;

            },

            cancel() {
                this.isEditMode = false;
            },

            save() {
                if (this.nameValidationClass["is-invalid"]
                    || this.surnameValidationClass["is-invalid"]
                    || this.phoneNumberValidationClass["is-invalid"]) {
                    return;
                }

                const contactToSave = {
                    id: this.id,
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber
                }

                this.$emit("save", contactToSave)
                this.isEditMode = false;
            },

            select() {
                this.$emit("select", this.contact.id);
                this.isChecked = !this.isChecked;
            },

            showDeleteConfirmDialog() {
                this.$emit("showDeleteConfirmDialog", [this.contact.id]);
            },
        },

        computed: {
            nameValidationClass() {
                return {
                    "is-valid": this.name.length !== 0,
                    "is-invalid": this.name.length === 0
                };
            },

            surnameValidationClass() {
                return {
                    "is-valid": this.surname.length !== 0,
                    "is-invalid": this.surname.length === 0
                };
            },

            phoneNumberValidationClass() {
                return {
                    "is-valid": this.phoneNumber.length !== 0,
                    "is-invalid": this.phoneNumber.length === 0 || this.isRepeatedPhoneNumber
                };
            },

            errorPhoneNumberValidationMessage() {
                return this.isRepeatedPhoneNumber ? "Введен существующий номер" : "Введите номер телефона";
            },

            isRepeatedPhoneNumber() {
                return this.contacts.some(c => c.phoneNumber === this.phoneNumber && c.id !== this.id);
            }
        },

        template: `
            <tr v-if="!isEditMode">
            <td>{{ index + 1 }}</td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.surname }}</td>
            <td>{{ contact.phoneNumber }}</td>
            <td>
                <button type="button"
                        class="btn btn-sm btn-warning me-3"
                        @click="edit">
                    Редактировать
                </button>
                <button type="button"
                        class="btn btn-sm btn-danger mt-1 mt-md-0"
                        @click="showDeleteConfirmDialog">
                    Удалить
                </button>
            </td>
            <td>
                <input type="checkbox" v-model="isChecked" @click="select">
            </td>
            </tr>
            <tr v-else>
            <td>
                {{ index + 1 }}
            </td>
            <td>
                <input type="text"
                       v-model.trim="name"
                       class="form-control"
                       :class="nameValidationClass">
                <div class="invalid-feedback">Введите имя</div>
            </td>
            <td>
                <input type="text"
                       v-model.trim="surname"
                       class="form-control"
                       :class="surnameValidationClass">
                <div class="invalid-feedback">Введите фамилию</div>
            </td>
            <td>
                <input type="text"
                       v-model.trim="phoneNumber"
                       class="form-control"
                       :class="phoneNumberValidationClass">
                <div class="invalid-feedback">
                    {{ errorPhoneNumberValidationMessage }}
                </div>
            </td>
            <td>
                <button type="button"
                        class="btn btn-sm btn-success me-3"
                        @click="save">
                    Сохранить
                </button>
                <button type="button"
                        class="btn btn-sm btn-secondary mt-1 mt-md-0"
                        @click="cancel">
                    Отменить
                </button>
            </td>
            <td>
                <input type="checkbox" v-model="isChecked" @click="select">
            </td>
            </tr>`
    })
    .component("ContactAddingForm", {
        data() {
            return {
                name: "",
                surname: "",
                phoneNumber: "",
                isAttemptToAdd: false
            };
        },

        emits: ["add"],

        props: {
            contacts: Array
        },

        computed: {
            nameValidationClass() {
                return {
                    "is-valid": this.name.length !== 0,
                    "is-invalid": this.name.length === 0 && this.isAttemptToAdd
                };
            },

            surnameValidationClass() {
                return {
                    "is-valid": this.surname.length !== 0,
                    "is-invalid": this.surname.length === 0 && this.isAttemptToAdd
                };
            },

            phoneValidationClass() {
                return {
                    "is-valid": this.phoneNumber.length !== 0,
                    "is-invalid": (this.phoneNumber.length === 0 && this.isAttemptToAdd) || this.isRepeatedPhoneNumber
                };
            },

            errorPhoneNumberValidationMessage() {
                return this.isRepeatedPhoneNumber ? "Введен существующий номер" : "Введите номер телефона";
            },

            isRepeatedPhoneNumber() {
                return this.contacts.some(contact => contact.phoneNumber === this.phoneNumber)
            }

        },

        methods: {
            submit() {
                this.isAttemptToAdd = this.name.length === 0 || this.surname.length === 0 || this.phoneNumber.length === 0;

                if (this.nameValidationClass["is-invalid"] || this.surnameValidationClass["is-invalid"] || this.phoneValidationClass["is-invalid"]) {
                    return;
                }

                const contact = {
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber
                };

                this.name = "";
                this.surname = "";
                this.phoneNumber = "";
                this.$emit("add", contact);
            }
        },

        template: `
            <form @submit.prevent="submit" novalidate>
            <div class="row">
                <div class="col-sm-4">
                    <label for="name" class="form-label">Имя</label>
                    <input type="text"
                           id="name"
                           v-model.trim="name"
                           class="form-control"
                           :class="nameValidationClass"
                           required>
                    <div class="invalid-feedback">
                        Введите имя
                    </div>
                </div>
                <div class="col-sm-4">
                    <label for="surname" class="form-label">Фамилия</label>
                    <input type="text"
                           id="surname"
                           v-model.trim="surname"
                           class="form-control"
                           :class="surnameValidationClass"
                           required>
                    <div class="invalid-feedback">
                        Введите фамилию
                    </div>
                </div>
                <div class="col-sm-4">
                    <label for="phone-number" class="form-label">Номер телефона</label>
                    <input type="tel"
                           id="phone-number"
                           v-model.trim="phoneNumber"
                           class="form-control"
                           :class="phoneValidationClass"
                           required>
                    <div class="invalid-feedback">{{ errorPhoneNumberValidationMessage }}</div>
                </div>
            </div>
            <div class="row mt-3">
                <div>
                    <button class="col-auto float-end btn btn-primary">Добавить</button>
                </div>
            </div>
            </form>`
    })
    .mount("#app");

