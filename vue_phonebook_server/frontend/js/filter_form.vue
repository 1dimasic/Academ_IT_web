<template>
  <div class="row">
    <div class="col-sm-6">
      <label for="searching-string-input" class="form-label">Поиск</label>
      <div class="input-group">
        <input type="text" id="searching-string-input" v-model="searchingString" class="form-control">
        <button type="button" class="btn btn-success" @click="setFilter(searchingString)">Найти</button>
        <button type="button" class="btn btn-secondary" @click="resetFilter">Сбросить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterForm",

  props: {
    contacts: Array
  },

  data() {
    return {
      searchingString: ""
    }
  },

  methods: {
    setFilter(searchingString) {
      this.$emit("load", searchingString);
    },

    resetFilter() {
      if (this.searchingString.length !== 0) {
        this.searchingString = "";
        this.$emit("load", this.searchingString);
      }
    }
  }
}
</script>
