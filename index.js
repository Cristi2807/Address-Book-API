const express = require('express');
const app = express();
const fs = require("fs");
const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))


app.get('/contacts', (req, res) => {
    try {
        const dataBuffer = fs.readFileSync('contacts.json')
        data = JSON.parse(dataBuffer.toString())

        res.status(200).send(data)

    } catch (e) {
        res.status(500).send(e.toString())
    }

})

app.get('/contacts/:name/:family_name', (req, res) => {
    try {
        const dataBuffer = fs.readFileSync('contacts.json')
        data = JSON.parse(dataBuffer.toString())

    } catch (e) {
        res.status(500).send(e.toString())
    }

    const duplicateContact = data.find((contact) => contact.name === req.params.name && contact.family_name === req.params.family_name)

    if (!duplicateContact) {
        res.status(404).send('Status: Contact not found!')
    } else {
        res.status(200).send(duplicateContact)
    }

})

app.post('/contacts', function (req, res) {

    try {
        const dataBuffer = fs.readFileSync('contacts.json')
        data = JSON.parse(dataBuffer.toString())
    } catch (e) {
        res.status(500).send(e.toString())
    }


    const duplicateContact = data.find((contact) => contact.name === req.body.name && contact.family_name === req.body.family_name)

    if (!duplicateContact) {
        data.push({
            "name": req.body.name,
            "family_name": req.body.family_name,
            "phone_number": req.body.phone,
            "email": req.body.email
        })

        try {
            fs.writeFileSync('contacts.json', JSON.stringify(data))
        } catch (e) {
            res.status(500).send(e.toString())
        }

        res.status(200).send(data)

    } else {
        res.status(400).send('Status: Contact exists !')
    }


})

app.delete('/contacts', function (req, res) {

    try {
        const dataBuffer = fs.readFileSync('contacts.json')
        data = JSON.parse(dataBuffer.toString())
    } catch (e) {
        res.status(500).send(e.toString())
    }

    const duplicateContacts = data.filter((contact) => contact.name !== req.body.name || contact.family_name !== req.body.family_name)

    if (duplicateContacts.length === data.length) {
        res.status(404).send('Status: Contact not found!')
    } else {

        try {
            fs.writeFileSync('contacts.json', JSON.stringify(duplicateContacts))
        } catch (e) {
            res.status(500).send(e.toString())
        }

        res.status(200).send(duplicateContacts)
    }
})

app.put('/contacts', (req, res) => {

    try {
        const dataBuffer = fs.readFileSync('contacts.json')
        data = JSON.parse(dataBuffer.toString())
    } catch (e) {
        res.status(500).send(e.toString())
    }

    const duplicateContacts = data.filter((contact) => contact.name !== req.body.name || contact.family_name !== req.body.family_name)

    if (duplicateContacts.length === data.length) {
        res.status(404).send('Status: Contact not found!')
    } else {

        duplicateContacts.push({
            "name": req.body.name,
            "family_name": req.body.family_name,
            "phone_number": req.body.phone,
            "email": req.body.email
        })

        try {
            fs.writeFileSync('contacts.json', JSON.stringify(duplicateContacts))
        } catch (e) {
            res.status(500).send(e.toString())
        }

        res.status(200).send(duplicateContacts)
    }


})


var server = app.listen(8081, function () {
    var port = server.address().port
    console.log("Listening on PORT", port)
})