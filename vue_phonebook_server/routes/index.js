const express = require("express");
const router = express.Router();

let contacts = [
    {
        id: 1,
        name: "bob",
        surname: "dilan",
        phoneNumber: "12"
    },
    {
        id: 2,
        name: "sue",
        surname: "dilan",
        phoneNumber: "34"
    }
];
let contactId = 2;

/* GET home page. */
router.get("/", function (req, res) {
    res.render("./index", {title: "Express"});
});

router.get("/api/contacts", function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    const contactToShow = term.length === 0
        ? contacts
        : contacts.filter(contact => contact.name.toUpperCase().includes(term)
            || contact.surname.toUpperCase().includes(term)
            || contact.phoneNumber.toUpperCase().includes(term))

    res.send(contactToShow);
});

router.delete("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);

    contacts = contacts.filter(contact => contact.id !== id);

    res.send({
        success: true,
        message: null
    })
});

router.post("/api/contacts/", function (req, res) {
    const contact = {
        name: req.body.name,
        surname: req.body.name,
        phoneNumber: req.body.phoneNumber
    }

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

    if (contacts.some(c => c.phoneNumber === contact.phoneNumber)) {
        res.send({
            success: false,
            message: "Номер телефона должен быть уникальным"
        });
        return;
    }

    contact.id = ++contactId;
    contacts.push(contact);
});

module.exports = router;
