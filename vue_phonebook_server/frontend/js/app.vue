<template>
  <div class="row">
    <div class="col text-center mb-4">
      <h1>Телефонная книга</h1>
    </div>
  </div>
  <component-form @add="addContact"></component-form>
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
          <input type="checkbox">
        </th>
      </tr>
      </thead>
      <tbody v-for="(contact, index) in contacts" :key="index">
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
          <input type="checkbox" @click="">
        </td>
      </tr>
      </tbody>
    </table>
    <div class="row">
      <div>
        <button class="btn btn-danger float-end col-auto" :disabled=true>
          Удалить
        </button>
      </div>
    </div>
  </div>
  <delete-modal-dialog ref="deleteConfirmModalDialog" @remove="deleteContact"></delete-modal-dialog>
  <edit-modal-dialog ref="editModalDialog" @save="saveContact"></edit-modal-dialog>
</template>

<script>
import componentForm from "./form.vue";
import PhoneBookService from "./phone_book_service";
import DeleteModalDialog from "./DeleteModalDialog.vue";
import EditModalDialog from "./EditModalDialog.vue";

export default {
  name: "app",

  components: {
    componentForm,
    DeleteModalDialog,
    EditModalDialog
  },

  data() {
    return {
      contacts: [],
      service: new PhoneBookService(),
      contactToDelete: null,
      contactToEdit: null
    }
  },

  created() {
    this.loadContacts();
  },

  methods: {
    addContact(contact) {
      this.service.addContactToContacts(contact).then(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }
      })
      this.loadContacts();
    },

    loadContacts() {
      this.service.getContacts("").then(contacts => {
        this.contacts = contacts
      }).catch(() => alert("Load contacts error")); // TODO
    },

    showDeleteModalDialog(contact) {
      this.contactToDelete = contact;
      this.$refs.deleteConfirmModalDialog.show();
    },

    showEditModalDialog(contact) {
      this.contactToEdit = contact;
      this.$refs.editModalDialog.show(this.contactToEdit);
    },

    saveContact(contactToSave) {
      this.service.addContactToContacts(contactToSave).then(response => {
        if(!response.success) {
          alert(response.message);
          return;
        }
      })
      this.loadContacts();
      this.$refs.editModalDialog.hide();
    },

    deleteContact() {
      this.service.deleteContacts(this.contactToDelete.id).then(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }
      }).catch(() => alert("Delete contact error"));

      this.$refs.deleteConfirmModalDialog.hide();
      this.loadContacts();
    },
  },
}
</script>
