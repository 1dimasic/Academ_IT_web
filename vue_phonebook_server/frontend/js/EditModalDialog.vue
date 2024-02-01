<template>
  <div ref="modal" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Редактировать контакт</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <label for="nameToEdit" class="form-label">Имя</label>
            <input type="text" id="nameToEdit" class="form-control"
                   v-model.trim="nameToEdit"
                   :class="nameValidationClass"
                   required>
            <div class="invalid-feedback">Введите имя</div>
          </div>
          <div>
            <label for="surnameToEdit" class="form-label">Фамилия</label>
            <input type="text" id="surnameToEdit" class="form-control"
                   v-model.trim="surnameToEdit"
                   :class="surnameValidationClass"
                   required>
            <div class="invalid-feedback">Введите фамилию</div>
          </div>
          <div>
            <label for="phone-number" class="form-label">Номер телефона</label>
            <input type="text" id="phone-number" class="form-control"
                   v-model.trim="phoneNumberToEdit"
                   :class="phoneNumberValidationClass"
                   required>
            <div class="invalid-feedback">Введите номер телефона</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
          <button @click="save" class="btn btn-success">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Modal} from "bootstrap";

export default {
  name: "EditModalDialog",

  data() {
    return {
      modal: null,
      id: null,
      nameToEdit: null,
      surnameToEdit: null,
      phoneNumberToEdit: null
    }
  },

  mounted() {
    this.modal = new Modal(this.$refs.modal, {});
  },

  computed: {
    nameValidationClass() {
      return {
        "is-valid": this.nameToEdit === null ? false : this.nameToEdit.length !== 0,
        "is-invalid": this.nameToEdit === null ? false : this.nameToEdit.length === 0
      }
    },

    surnameValidationClass() {
      return {
        "is-valid": this.surnameToEdit === null ? false : this.surnameToEdit.length !== 0,
        "is-invalid": this.surnameToEdit === null ? false : this.surnameToEdit.length === 0
      }
    },

    phoneNumberValidationClass() {
      return {
        "is-valid": this.phoneNumberToEdit === null ? false : this.phoneNumberToEdit.length !== 0,
        "is-invalid": this.phoneNumberToEdit === null ? false : this.phoneNumberToEdit.length === 0
      }
    },
  },

  methods: {
    show(contact) {
      this.id = contact.id;
      this.nameToEdit = contact.name;
      this.surnameToEdit = contact.surname;
      this.phoneNumberToEdit = contact.phoneNumber;

      this.modal.show();
    },

    hide() {
      this.modal.hide();
    },

    save() {
      const contactToSave = {
        id: this.id,
        name: this.nameToEdit,
        surname: this.surnameToEdit,
        phoneNumber: this.phoneNumberToEdit
      };

      this.$emit("save", contactToSave);
    }
  }
}
</script>
