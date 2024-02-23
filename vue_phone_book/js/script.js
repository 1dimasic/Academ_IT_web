Vue.createApp({
    data() {
        return {
            contacts: [],
            contactId: 0,
            selectAll: false,
            selectedContactsIds: [],
            searchingString: "",
            deletedContactsIds: []
        };
    },

    computed: {
        isAnyContactsChecked() {
            return this.selectedContactsIds.length !== 0;
        },

        filteredContacts() {
            const upperCaseSearchingString = this.searchingString.toUpperCase();
            return this.contacts.filter(contact => contact.name.toUpperCase().includes(upperCaseSearchingString)
                || contact.surname.toUpperCase().includes(upperCaseSearchingString)
                || contact.phoneNumber.toUpperCase().includes(upperCaseSearchingString));
        }
    },

    methods: {
        addContact(contact) {
            this.contactId++;
            contact.id = this.contactId;

            this.contacts.push(contact);
        },

        saveContact(contact) {
            const contactToSave = this.contacts.find(c => c.id === contact.id);

            contactToSave.name = contact.name;
            contactToSave.surname = contact.surname;
            contactToSave.phoneNumber = contact.phoneNumber;
        },

        deleteContacts() {
            this.deletedContactsIds.forEach(contactId => {
                this.contacts = this.contacts.filter(contact => contact.id !== contactId);
                this.selectedContactsIds = this.selectedContactsIds.filter(id => id !== contactId);
            });

            this.selectAll = this.selectedContactsIds.length !== 0;
            this.$refs.modal.hide();
        },

        selectContacts(contactId) {
            if (this.selectedContactsIds.includes(contactId)) {
                this.selectedContactsIds = this.selectedContactsIds.filter(id => id !== contactId);
                return;
            }

            this.selectedContactsIds.push(contactId);
        },

        selectAllContacts() {
            this.selectAll = !this.selectAll;
            this.selectedContactsIds = this.selectAll ? this.contacts.map(contact => contact.id) : [];
        },

        showDeleteConfirmDialog(deletedContactsIds) {
            const filteredContactsIds = this.filteredContacts.map(contact => contact.id);
            this.deletedContactsIds = deletedContactsIds.filter(id => filteredContactsIds.includes(id));
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
        <table class="mt-3 table table-hover table-responsive-lg">
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
        <contact v-for="(contact, index) in filteredContacts"
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
        <div class="row">
        <div>
            <button class="btn btn-danger float-end col-auto"
                    :disabled="!isAnyContactsChecked"
                    @click="showDeleteConfirmDialog(selectedContactsIds)">Удалить
            </button>
        </div>
        </div>
        <delete-confirm-modal-dialog ref="modal" @deleteContacts="deleteContacts"></delete-confirm-modal-dialog>`
})
    .component("DeleteConfirmModalDialog", {
        data() {
            return {
                modal: null
            };
        },

        emits: ["deleteContacts"],

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

            deleteContacts() {
                this.$emit("deleteContacts");
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
                        <button type="button" class="btn btn-danger" @click="deleteContacts">Удалить</button>
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
            contacts: {
                type: Array,
                required: true
            },

            contact: {
                type: Object,
                required: true
            },

            index: {
                type: Number,
                required: true
            },

            selectAll: {
                type: Boolean,
                required: true
            }
        },

        watch: {
            selectAll(newValue) {
                this.isChecked = newValue;
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
                };

                this.$emit("save", contactToSave);
                this.isEditMode = false;
            },

            select() {
                this.$emit("select", this.contact.id);
                this.isChecked = !this.isChecked;
            },

            deleteContact() {
                this.$emit("showDeleteConfirmDialog", [this.contact.id]);
            }
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

            phoneNumberErrorMessage() {
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
                        @click="deleteContact">
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
                    {{ phoneNumberErrorMessage }}
                </div>
            </td>
            <td>
                <button type="button"
                        class="btn btn-sm btn-success me-3"
                        @click="save">
                    Сохранить
                </button>
                <button type="button"
                        class="btn btn-sm btn-secondary mt-1 mt-sm-0"
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
                isAddContactAttempt: false
            };
        },

        emits: ["add"],

        props: {
            contacts: {
                type: Array,
                required: true
            }
        },

        computed: {
            nameValidationClass() {
                return {
                    "is-valid": this.name.length !== 0,
                    "is-invalid": this.name.length === 0 && this.isAddContactAttempt
                };
            },

            surnameValidationClass() {
                return {
                    "is-valid": this.surname.length !== 0,
                    "is-invalid": this.surname.length === 0 && this.isAddContactAttempt
                };
            },

            phoneValidationClass() {
                return {
                    "is-valid": this.phoneNumber.length !== 0,
                    "is-invalid": (this.phoneNumber.length === 0 && this.isAddContactAttempt)
                        || this.isRepeatedPhoneNumber
                };
            },

            phoneNumberErrorMessage() {
                return this.isRepeatedPhoneNumber ? "Введен существующий номер" : "Введите номер телефона";
            },

            isRepeatedPhoneNumber() {
                return this.contacts.some(contact => contact.phoneNumber === this.phoneNumber);
            }

        },

        methods: {
            submit() {
                this.isAddContactAttempt = this.name.length === 0 || this.surname.length === 0 || this.phoneNumber.length === 0;

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
                    <div class="invalid-feedback">{{ phoneNumberErrorMessage }}</div>
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

