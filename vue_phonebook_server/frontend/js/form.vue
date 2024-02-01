<template>
  <form @submit.prevent="submit" novalidate>
    <div class="row">
      <div class="col-sm-4">
        <label for="name" class="form-label">Имя</label>
        <input type="text" id="name"
               v-model="nameInputField"
               class="form-control"
               :class="nameValidation"
               required>
        <div class="invalid-feedback">
          Введите имя
        </div>
      </div>
      <div class="col-sm-4">
        <label for="surname" class="form-label">Фамилия</label>
        <input type="text" id="surname"
               v-model="surnameInputField"
               class="form-control"
               :class="surnameValidation"
               required>
        <div class="invalid-feedback">
          Введите фамилию
        </div>
      </div>
      <div class="col-sm-4">
        <label for="phone-number" class="form-label">Номер телефона</label>
        <input type="tel" id="phone-number"
               v-model="phoneNumberInputField"
               class="form-control"
               :class="phoneValidation"
               required>
        <div class="invalid-feedback">//TODO</div>
      </div>
    </div>
    <div class="row mt-3">
      <div>
        <button class="col-auto float-end btn btn-primary">Добавить</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "componentForm",

  data() {
    return {
      nameInputField: "",
      surnameInputField: "",
      phoneNumberInputField: "",
      isEmptyName: false,
      isEmptySurname: false,
      isEmptyPhoneNumber: false
    };
  },

  computed: {
    nameValidation() {
      return {
        "is-valid": this.nameInputField.trim().length !== 0,
        "is-invalid": this.isEmptyName && this.nameInputField.trim().length === 0
      }
    },

    surnameValidation() {
      return {
        "is-valid": this.surnameInputField.trim().length !== 0,
        "is-invalid": this.isEmptySurname && this.surnameInputField.trim().length === 0
      }
    },

    phoneValidation() {
      return {
        "is-valid": this.phoneNumberInputField.trim().length !== 0,
        "is-invalid": this.isEmptyPhoneNumber && this.phoneNumberInputField.trim().length === 0
      }
    },
  },

  methods: {
    submit() {
      this.isEmptyName = this.nameInputField.trim().length === 0;
      this.isEmptySurname = this.surnameInputField.trim().length === 0;
      this.isEmptyPhoneNumber = this.phoneNumberInputField.trim().length === 0;

      if (this.isEmptyName || this.isEmptySurname || this.isEmptyPhoneNumber) {
        return;
      }

      const contact = {
        name: this.nameInputField,
        surname: this.surnameInputField,
        phoneNumber: this.phoneNumberInputField
      };

      this.nameInputField = "";
      this.surnameInputField = "";
      this.phoneNumberInputField = "";
      this.$emit("add", contact);
    }
  }
}
</script>
