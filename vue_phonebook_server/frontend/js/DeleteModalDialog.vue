<template>
    <div ref="modal" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Подтвердите удаление</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы действительно хотите удалить контакт (контакты)?
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                    <button @click="remove" class="btn btn-danger">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Modal} from "bootstrap";

export default {
    name: "DeleteModalDialog",

    emits: ["remove"],

    data() {
        return {
            modal: null
        };
    },

    mounted() {
        this.modal = new Modal(this.$refs.modal, {});
    },

    methods: {
        show() {
            this.modal.show();
        },

        hide() {
            this.modal.hide();
        },

        remove() {
            this.$emit("remove");
        }
    }
};
</script>
