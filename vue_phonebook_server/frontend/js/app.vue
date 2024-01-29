<template>
  <div class="row">
    <div class="col text-center mb-4">
      <h1>Телефонная книга</h1>
    </div>
  </div>
  <component-form @add="addContact" :contacts="contacts"></component-form>
  <filter-form></filter-form>
  <contacts-list :contacts="contacts" @remove="deleteContact"></contacts-list>
</template>

<script>
import componentForm from "./form.vue";
import contactsList from "./contacts_list.vue";
import filterForm from "./filter_form.vue";
import PhoneBookService from "./phone_book_service";

export default {
  name: "app",

  components: {
    componentForm,
    contactsList,
    filterForm
  },

  data() {
    return {
      contacts: [],
      service: new PhoneBookService()
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

    deleteContact(id) {
      alert(id);
      this.service.deleteContacts(id).then(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }
      }).catch(() => alert("Delete contact error"));

      this.loadContacts();
    }
  },
}
</script>
