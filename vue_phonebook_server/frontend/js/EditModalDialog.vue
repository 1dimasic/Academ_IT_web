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
                        <label for="name" class="form-label">Имя</label>
                        <input type="text"
                               id="name"
                               class="form-control"
                               v-model.trim="name"
                               :class="nameValidationClass"
                               required>
                        <div class="invalid-feedback">Введите имя</div>
                    </div>
                    <div>
                        <label for="surname" class="form-label">Фамилия</label>
                        <input type="text"
                               id="surname"
                               class="form-control"
                               v-model.trim="surname"
                               :class="surnameValidationClass"
                               required>
                        <div class="invalid-feedback">Введите фамилию</div>
                    </div>
                    <div>
                        <label for="phone-number" class="form-label">Номер телефона</label>
                        <input type="text"
                               id="phone-number"
                               class="form-control"
                               v-model.trim="phoneNumber"
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

    emits: ["save"],

    data() {
        return {
            modal: null,
            id: null,
            name: null,
            surname: null,
            phoneNumber: null
        };
    },

    mounted() {
        this.modal = new Modal(this.$refs.modal, {});
    },

    computed: {
        nameValidationClass() {
            return {
                "is-valid": this.name === null ? false : this.name.length !== 0,
                "is-invalid": this.name === null ? false : this.name.length === 0
            };
        },

        surnameValidationClass() {
            return {
                "is-valid": this.surname === null ? false : this.surname.length !== 0,
                "is-invalid": this.surname === null ? false : this.surname.length === 0
            };
        },

        phoneNumberValidationClass() {
            return {
                "is-valid": this.phoneNumber === null ? false : this.phoneNumber.length !== 0,
                "is-invalid": this.phoneNumber === null ? false : this.phoneNumber.length === 0
            };
        }
    },

    methods: {
        show(contact) {
            this.id = contact.id;
            this.name = contact.name;
            this.surname = contact.surname;
            this.phoneNumber = contact.phoneNumber;

            this.modal.show();
        },

        hide() {
            this.modal.hide();
        },

        save() {
            if (this.nameValidationClass["is-valid"] && this.surnameValidationClass["is-valid"]
                && this.phoneNumberValidationClass["is-valid"]) {
                const contactToSave = {
                    id: this.id,
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber
                };

                this.$emit("save", contactToSave);
            }
        }
    }
};
</script>
