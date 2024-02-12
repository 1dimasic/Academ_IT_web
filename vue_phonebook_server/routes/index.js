const express = require("express");
const router = express.Router();

let contacts = [];
let contactId = 1;

/* GET home page. */
router.get("/", function (req, res) {
    res.render("./index", {title: "Express"});
});

router.get("/api/contacts", function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    const contactsToShow = term.length === 0
        ? contacts
        : contacts.filter(contact => contact.name.toUpperCase().includes(term)
            || contact.surname.toUpperCase().includes(term)
            || contact.phoneNumber.toUpperCase().includes(term));

    res.send(contactsToShow);
});

router.delete("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);

    contacts = contacts.filter(contact => contact.id !== id);

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/contacts", function (req, res) {
    const contact = {
        name: req.body.name,
        surname: req.body.name,
        phoneNumber: req.body.phoneNumber
    };

    if (!contact.name) {
        res.send({
            success: false,
            message: "Поле 'имя' обязательно"
        });
        return;
    }

    if (!contact.surname) {
        res.send({
            success: false,
            message: "Поле 'фамилия' обязательно"
        });
        return;
    }

    if (!contact.phoneNumber) {
        res.send({
            success: false,
            message: "Поле 'номер телефона' обязательно"
        });
        return;
    }

    const upperCasePhoneNumber = contact.phoneNumber.toUpperCase();

    if (contacts.some(c => c.phoneNumber.toUpperCase() === upperCasePhoneNumber)) {
        res.send({
            success: false,
            message: "Номер телефона должен быть уникальным"
        });
        return;
    }

    contact.id = contactId;
    contacts.push(contact);
    contactId++;

    res.send({
        success: true,
        message: "Контакт успешно добавлен"
    });
});

router.put("/api/contacts", function (req, res) {
    const contactToSave = {
        id: Number(req.body.id),
        name: req.body.name,
        surname: req.body.surname,
        phoneNumber: req.body.phoneNumber
    };

    if (!contactToSave.name) {
        res.send({
            success: false,
            message: "Поле 'имя' обязательно"
        });
        return;
    }
    if (!contactToSave.surname) {
        res.send({
            success: false,
            message: "Поле 'фамилия' обязательно"
        });
        return;
    }

    if (!contactToSave.phoneNumber) {
        res.send({
            success: false,
            message: "Поле 'номер телефона' обязательно"
        });
        return;
    }

    const upperCasePhoneNumber = contactToSave.phoneNumber.toUpperCase();

    if (contacts.some(c => c.phoneNumber.toUpperCase() === upperCasePhoneNumber && c.id !== contactToSave.id)) {
        res.send({
            success: false,
            message: "Номер телефона должен быть уникальным"
        });
        return;
    }

    const contactToEdit = contacts.find(c => c.id === contactToSave.id);

    contactToEdit.name = contactToSave.name;
    contactToEdit.surname = contactToSave.surname;
    contactToEdit.phoneNumber = contactToSave.phoneNumber;

    res.send({
        success: true,
        message: "Контакт успешно обновлен"
    });
});

module.exports = router;
