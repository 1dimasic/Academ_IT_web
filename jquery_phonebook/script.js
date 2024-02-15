$(function () {
    const form = $(".form");
    const nameInput = $("#name");
    const surnameInput = $("#surname");
    const phoneNumberInput = $("#phone-number");
    const contacts = $(".contact-list");
    const addButton = $(".add-button");
    const deleteAllButton = $(".delete-all-button");

    form.submit(function (e) {
        e.preventDefault();

        let name = nameInput.val().trim();
        let surname = surnameInput.val().trim();
        let phoneNumber = phoneNumberInput.val().trim();

        nameInput.removeClass("invalid");
        surnameInput.removeClass("invalid");
        phoneNumberInput.removeClass("invalid repeated-phone-number");

        if (name.length === 0) {
            nameInput.addClass("invalid");
        }

        if (surname.length === 0) {
            surnameInput.addClass("invalid");
        }

        if (phoneNumber.length === 0) {
            phoneNumberInput.addClass("invalid");
            $(".invalid#phone-number").next(".error-message").text("Введите номер телефона");
        }

        $(".phone-number").each(function () {
            if ($(this).text() === phoneNumber) {
                phoneNumberInput.addClass("repeated-phone-number");
                $(".repeated-phone-number#phone-number").next(".error-message").text("Введен существующий номер");
            }
        });

        if (nameInput.hasClass("invalid") || surnameInput.hasClass("invalid")
            || phoneNumberInput.hasClass("invalid") || phoneNumberInput.hasClass("repeated-phone-number")) {
            addButton.blur();
            return;
        }

        const contact = $("<tr>").addClass("contact");
        contacts.append(contact);

        function initContactInViewMode() {
            function assignNumbers() {
                $(".number").each(function (i) {
                    $(this).text(i + 1);
                });
            }

            contact.html(`<td class="number"></td>
                      <td class="name"></td>
                      <td class="surname"></td>
                      <td class="phone-number"></td>
                      <td>
                        <button type="button" class="edit-button table-button">Редактировать</button>
                        <button type="button" class="delete-button table-button">Удалить</button>
                      </td>
                      <td>
                        <input type="checkbox" class="checkbox">
                      </td>`);

            assignNumbers();
            contact.find(".name").text(name);
            contact.find(".surname").text(surname);
            contact.find(".phone-number").text(phoneNumber);

            contact.find(".delete-button").click(function () {
                $(".deletion-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Удалить": function () {
                            contact.remove();
                            $(this).dialog("close");
                            assignNumbers();
                        },
                        "Отменить": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });

            contact.find(".edit-button").click(function () {
                const currentNumber = contact.find(".number").text();

                contact.html(`<td class="number">
                                <p class="current-number"></p>
                              </td>
                              <td>
                                <input type="text" class="edit-name table-input">
                                <span class="error-message"></span>
                              </td>    
                              <td>                      
                                <input type="text" class="edit-surname table-input">
                                <span class="error-message"></span>
                              </td> 
                              <td>   
                                <input type="tel" class="edit-phone-number table-input">
                                <span class="error-message"></span>
                              </td>
                              <td> 
                                <button type="button" class="cancel-button table-button">Отменить</button>
                                <button type="button" class="save-button table-button">Сохранить</button>
                              </td>
                              <td>
                                <input type="checkbox" class="checkbox">
                              </td>`);

                contact.find(".current-number").text(currentNumber);
                const editNameInput = contact.find(".edit-name").val(name);
                const editSurnameInput = contact.find(".edit-surname").val(surname);
                const editPhoneNumberInput = contact.find(".edit-phone-number").val(phoneNumber);

                contact.find(".cancel-button").click(function () {
                    initContactInViewMode();
                });

                contact.find(".save-button").click(function () {
                    const newName = editNameInput.val().trim();
                    const newSurname = editSurnameInput.val().trim();
                    const newPhoneNumber = editPhoneNumberInput.val().trim();

                    editNameInput.removeClass("invalid");
                    editSurnameInput.removeClass("invalid");
                    editPhoneNumberInput.removeClass("invalid repeated-phone-number");

                    if (newName.length === 0) {
                        editNameInput.addClass("invalid");
                        $(".invalid.edit-name").next(".error-message").text("Введите имя");
                    } else {
                        $("edit-name").next(".error-message").text("");
                    }

                    if (newSurname.length === 0) {
                        editSurnameInput.addClass("invalid");
                        $(".invalid.edit-surname").next(".error-message").text("Введите фамилию");
                    } else {
                        $(".edit-surname").next(".error-message").text("");
                    }

                    if (newPhoneNumber.length === 0) {
                        editPhoneNumberInput.addClass("invalid");
                        $(".invalid.edit-phone-number").next(".error-message").text("Введите номер телефона");
                    } else {
                        $(".edit-phone-number").next(".error-message").text("");
                    }

                    $(".phone-number").each(function () {
                        if ($(this).text() === newPhoneNumber) {
                            editPhoneNumberInput.addClass("repeated-phone-number");
                            $(".repeated-phone-number.edit-phone-number")
                                .next(".error-message").text("Номер существует");
                        }
                    });

                    if (editNameInput.hasClass("invalid") || editSurnameInput.hasClass("invalid")
                        || editPhoneNumberInput.hasClass("invalid")
                        || editPhoneNumberInput.hasClass("repeated-phone-number")) {
                        return;
                    }

                    name = newName;
                    surname = newSurname;
                    phoneNumber = newPhoneNumber;

                    initContactInViewMode();
                });
            });

            $(".checkbox").click(function () {
                if ($(".checkbox").is(":checked")) {
                    deleteAllButton.prop("disabled", false);
                } else {
                    deleteAllButton.prop("disabled", true);
                }
            });

            deleteAllButton.click(function () {
                $(".deletion-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Удалить": function () {
                            $(".contact:has(.checkbox:checked)").remove();
                            $(this).dialog("close");
                            assignNumbers();
                            deleteAllButton.prop("disabled", true);
                            $(".select-all").prop("checked", false);
                        },
                        "Отменить": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });

            $(".select-all").click(function () {
                if ($(this).is(":checked")) {
                    $(".checkbox").prop("checked", true);
                    deleteAllButton.prop("disabled", false);
                } else {
                    $(".checkbox").prop("checked", false);
                    deleteAllButton.prop("disabled", true);
                }
            });

            $(".set-filter").click(function () {
                const searchingString = $(".filter").val().trim().toLowerCase();

                $(".contact")
                    .hide()
                    .filter(function () {
                        return $(this)
                            .find(".name,.surname,.phone-number")
                            .text()
                            .toLowerCase()
                            .includes(searchingString);
                    })
                    .addClass("contact-to-show")
                    .show();

                $(".contact:has(.checkbox:checked)")
                    .not(".contact-to-show")
                    .find(".checkbox:checked")
                    .prop("checked", false);

                if ($(".contact-to-show:has(.checkbox:checked)").length === 0) {
                    deleteAllButton.prop("disabled", true);
                }

                $(this).blur();
            });

            $(".reset-filter").click(function () {
                $(".contact").removeClass("contact-to-show").show();
                $(".filter").val("");
                $(this).blur();
            });
        }

        addButton.blur();
        nameInput.val("");
        surnameInput.val("");
        phoneNumberInput.val("");
        initContactInViewMode();
    });
});