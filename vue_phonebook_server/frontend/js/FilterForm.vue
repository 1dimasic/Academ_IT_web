<template>
    <div class="row">
        <div class="col-sm-4">
            <label for="filter" class="form-label">Поиск</label>
            <input type="text" id="filter" v-model.trim="term" class="form-control">
        </div>
    </div>
</template>

<script>
import _ from "lodash";

export default {
    name: "FilterForm",

    emits: ["filter"],

    data() {
        return {
            term: ""
        };
    },

    watch: {
        term(newTerm) {
            this.search(newTerm);
        }
    },

    methods: {
        search: _.debounce(function (term) {
            this.$emit("filter", term);
        }, 500)
    }
};
</script>
