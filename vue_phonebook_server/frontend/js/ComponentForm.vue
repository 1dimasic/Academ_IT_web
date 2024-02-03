<template>
  <form @submit.prevent="submit" novalidate>
    <div class="row">
      <div class="col-sm-4">
        <label for="name" class="form-label">Имя</label>
        <input type="text" id="name"
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
        <input type="text" id="surname"
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
        <input type="tel" id="phone-number"
               v-model.trim="phoneNumber"
               class="form-control"
               :class="phoneValidationClass"
               required>
        <div class="invalid-feedback">Введите номер телефона</div>
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
  name: "ComponentForm",

  data() {
    return {
      name: "",
      surname: "",
      phoneNumber: "",
      isEmptyName: false,
      isEmptySurname: false,
      isEmptyPhoneNumber: false
    };
  },

  computed: {
    nameValidationClass() {
      return {
        "is-valid": this.name.length !== 0,
        "is-invalid": this.isEmptyName && this.name.length === 0
      }
    },

    surnameValidationClass() {
      return {
        "is-valid": this.surname.length !== 0,
        "is-invalid": this.isEmptySurname && this.surname.length === 0
      }
    },

    phoneValidationClass() {
      return {
        "is-valid": this.phoneNumber.length !== 0,
        "is-invalid": this.isEmptyPhoneNumber && this.phoneNumber.length === 0
      }
    },
  },

  methods: {
    submit() {
      this.isEmptyName = this.name.length === 0;
      this.isEmptySurname = this.surname.length === 0;
      this.isEmptyPhoneNumber = this.phoneNumber.length === 0;

      if (this.isEmptyName || this.isEmptySurname || this.isEmptyPhoneNumber) {
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
  }
}
</script>
