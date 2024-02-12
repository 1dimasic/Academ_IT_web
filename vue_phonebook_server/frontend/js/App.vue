<template>
    <div class="container">
        <h1 class="text-center mb-4">Телефонная книга</h1>
        <contact-adding-form @add="addContact" ref="form"></contact-adding-form>
        <filter-form @filter="searchContacts"></filter-form>
        <div class="table-responsive{-lg} row mt-3">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Номер телефона</th>
                    <th></th>
                    <th>
                        <input type="checkbox" v-model="selectAll">
                    </th>
                </tr>
                </thead>
                <tbody v-for="(contact, index) in contacts" :key="contact.id">
                <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.surname }}</td>
                    <td>{{ contact.phoneNumber }}</td>
                    <td>
                        <button type="button" class="btn btn-sm btn-warning me-3" @click="showEditModalDialog(contact)">
                            Редактировать
                        </button>
                        <button type="button" class="btn btn-sm btn-danger"
                                @click="showDeleteModalDialog([contact.id])">
                            Удалить
                        </button>
                    </td>
                    <td>
                        <input type="checkbox" :value="contact.id" v-model="selectedContactsIds">
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="row">
                <div>
                    <button class="btn btn-danger float-end col-auto"
                            @click="showDeleteModalDialog(selectedContactsIds)">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
        <delete-modal-dialog ref="deleteConfirmModalDialog" @remove="deleteContact"></delete-modal-dialog>
        <edit-modal-dialog ref="editConfirmModalDialog" @save="saveContact"></edit-modal-dialog>
        <validation-error-dialog ref="validationErrorDialog">
            <template #validationErrorMessage>{{ validationErrorMessage }}</template>
        </validation-error-dialog>
    </div>
</template>

<script>
import PhoneBookService from "./PhoneBookService";
import ContactAddingForm from "./ContactAddingForm.vue";
import FilterForm from "./FilterForm.vue";
import DeleteModalDialog from "./DeleteModalDialog.vue";
import EditModalDialog from "./EditModalDialog.vue";
import ValidationErrorDialog from "./ValidationErrorDialog.vue";

export default {
    name: "App",

    components: {
        ContactAddingForm,
        FilterForm,
        DeleteModalDialog,
        EditModalDialog,
        ValidationErrorDialog
    },

    data() {
        return {
            contacts: [],
            selectedContactsIds: [],
            selectAll: false,
            service: new PhoneBookService(),
            editContact: null,
            deletedContacts: null,
            validationErrorMessage: "",
            term: ""
        };
    },

    created() {
        this.loadContacts();
    },

    watch: {
        selectAll(newSelectAll) {
            if (newSelectAll) {
                this.selectedContactsIds = this.contacts.map(contact => contact.id);
            } else {
                this.selectedContactsIds = [];
            }
        }
    },

    methods: {
        addContact(contact) {
            this.service.addContact(contact).then(response => {
                if (!response.success) {
                    this.validationErrorMessage = response.message;
                    this.$refs.validationErrorDialog.show();
                } else {
                    this.loadContacts();
                    this.$refs.form.clear();
                }
            }).catch(() => {
                this.validationErrorMessage = "Ошибка добавления контакта";
                this.$refs.validationErrorDialog.show();
            });
        },

        showDeleteModalDialog(deletedContacts) {
            this.deletedContacts = deletedContacts;
            this.$refs.deleteConfirmModalDialog.show();
        },

        showEditModalDialog(contact) {
            this.editContact = contact;
            this.$refs.editConfirmModalDialog.show(this.editContact);
        },

        saveContact(contactToSave) {
            this.service.updateContact(contactToSave).then(response => {
                if (!response.success) {
                    this.validationErrorMessage = response.message;
                    this.$refs.validationErrorDialog.show();
                } else {
                    this.loadContacts();
                    this.$refs.editConfirmModalDialog.hide();
                }
            }).catch(() => {
                this.validationErrorMessage = "Ошибка сохранения контакта";
                this.$refs.validationErrorDialog.show();
            });
        },

        deleteContact() {
            this.deletedContacts.forEach(contactId => {
                this.service.deleteContact(contactId).then(response => {
                    if (!response.success) {
                        this.validationErrorMessage = response.message;
                        this.$refs.validationErrorDialog.show();
                    }
                }).catch(() => {
                    this.validationErrorMessage = "Ошибка удаления контакта";
                    this.$refs.validationErrorDialog.show();
                });
            });

            this.selectedContactsIds = this.selectedContactsIds
                .filter(id => !this.deletedContacts.includes(id));
            this.deletedContacts = [];
            this.selectAll = false;

            this.$refs.deleteConfirmModalDialog.hide();
            this.loadContacts();
        },

        searchContacts(term) {
            this.term = term;
            this.loadContacts();
        },

        loadContacts() {
            this.service.getContacts(this.term).then(contacts => {
                this.contacts = contacts;
            }).catch(() => {
                this.validationErrorMessage = "Ошибка загрузки контактов";
                this.$refs.validationErrorDialog.show();
            });
        }
    }
};
</script>
