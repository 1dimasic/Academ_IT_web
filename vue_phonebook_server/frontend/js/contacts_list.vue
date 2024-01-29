<template>
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
          <button type="button" class="btn btn-sm btn-warning me-3" @click="">
            Редактировать
          </button>
          <button type="button" class="btn btn-sm btn-danger" @click="remove(contact.id)">
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
</template>

<script>
export default {
  name: "contactsList",

  props: {
    contacts: Array
  },

  methods: {
    remove(id) {
      this.$emit("remove", id);
    }
  }
}
</script>
