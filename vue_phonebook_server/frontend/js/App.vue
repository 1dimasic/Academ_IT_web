<template>
  <div class="row">
    <div class="col text-center mb-4">
      <h1>Телефонная книга</h1>
    </div>
  </div>
  <component-form @add="addContact"></component-form>
  <filter-form @filter="searchContact"></filter-form>
  <div class="row mt-3">
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
          <button type="button" class="btn btn-sm btn-danger" @click="showDeleteModalDialog(contact)">
            Удалить
          </button>
        </td>
        <td>
          <input type="checkbox" v-bind:value=contact.id v-model="selectedContactsId">
        </td>
      </tr>
      </tbody>
    </table>
    <div class="row">
      <div>
        <button class="btn btn-danger float-end col-auto" @click="showDeleteModalDialog(selectedContactsId)">
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
</template>

<script>
import PhoneBookService from "./PhoneBookService";
import ComponentForm from "./ComponentForm.vue";
import FilterForm from "./FilterForm.vue";
import DeleteModalDialog from "./DeleteModalDialog.vue";
import EditModalDialog from "./EditModalDialog.vue";
import ValidationErrorDialog from "./ValidationErrorDialog.vue"
import _ from "lodash";

export default {
  name: "App",

  components: {
    ComponentForm,
    FilterForm,
    DeleteModalDialog,
    EditModalDialog,
    ValidationErrorDialog
  },

  data() {
    return {
      contacts: [],
      selectedContactsId: [],
      selectAll: false,
      service: new PhoneBookService(),
      editContact: null,
      deletedData: null,
      validationErrorMessage: "",
    }
  },

  created() {
    this.loadContacts();
  },

  watch: {
    selectAll(newSelectAll) {
      if (newSelectAll) {
        this.selectedContactsId = this.contacts.map(contact => contact.id);
      } else {
        this.selectedContactsId = [];
      }
    }
  },

  methods: {
    addContact(contact) {
      this.service.addContactToContacts(contact).then(response => {
        if (!response.success) {
          this.validationErrorMessage = response.message;
          this.$refs.validationErrorDialog.show();
        }
      })
      this.loadContacts();
    },

    loadContacts() {
      this.service.getContacts("").then(contacts => {
        this.contacts = contacts
      }).catch(() => {
        this.validationErrorMessage = "Ошибка загрузки контактов";
        this.$refs.validationErrorDialog.show();
      });
    },

    showDeleteModalDialog(deletedData) {
      this.deletedData = deletedData;
      this.$refs.deleteConfirmModalDialog.show();
    },


    showEditModalDialog(contact) {
      this.editContact = contact;
      this.$refs.editConfirmModalDialog.show(this.editContact);
    },

    saveContact(contactToSave) {
      this.service.updateContact(contactToSave).then(response => {
        if (!response.success) {
          alert(response.message);
        }
      })
      this.loadContacts();
      this.$refs.editConfirmModalDialog.hide();
    },

    deleteContact() {
      if (_.isObject(this.deletedData)) {
        this.service.deleteContact(this.deletedData.id).then(response => {
          if (!response.success) {
            this.validationErrorMessage = response.message;
            this.$refs.validationErrorDialog.show();
          }
        }).catch(() => {
          this.validationErrorMessage = "Ошибка удаления контакта";
          this.$refs.validationErrorDialog.show();
        });
      }

      if (_.isArray(this.deletedData)) {
        let service = this.service;

        _.forEach(this.deletedData, function (contactId) {
          service.deleteContact(contactId).then(response => {
            if (!response.success) {
              this.validationErrorMessage = response.message;
              this.$refs.validationErrorDialog.show();
            }
          }).catch(() => {
            this.validationErrorMessage = "Ошибка удаления контакта";
            this.$refs.validationErrorDialog.show();
          });
        });
        this.selectedContactsId = [];
        this.selectAll = false;
      }

      this.$refs.deleteConfirmModalDialog.hide();
      this.loadContacts();
    },

    searchContact(term) {
      this.service.getContacts(term.toUpperCase()).then(contacts => {
        this.contacts = contacts
      }).catch(() => {
        this.validationErrorMessage = "Ошибка загрузки контактов";
        this.$refs.validationErrorDialog.show();
      });
    },
  },
}
</script>
