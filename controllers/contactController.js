
const Contact = require('../models/contact');
const HanlderAsync = require("express-async-handler");
const GreenContact = HanlderAsync(async (req, res, next) => {
    const { fname, lname, email, number, message } = req.body;
    const contacts = Contact({
        fname,
        lname,
        email,
        number,
        message
    })
    await contacts.save((error, data) => {
        if (data) {
            res.status(201).json({
                fname: contacts.fname,
                lname: contacts.lname,
                email: contacts.email,
                number: contacts.number,
                message: contacts.message
            })
        }
        if (error) {
            res.status(400).json({ error: "Unable to save the form data" });
        }
    })
})
const GreenContactFindAll = HanlderAsync(async (req, res) => {

    try {

        const allContacts = await Contact.find({});

        if (allContacts) {
            res.status(201).json(
                allContacts
            )
        }

    }
    catch (error) {
        res.status(400).json({ error: error })
    }

})
const GreenContactFindById = HanlderAsync(async (req, res) => {

    try {
        const id = req.params.id;
        const filteredContact = await Contact.findById({ id });
        if (filteredContact) {
            res.status(201).json(
                filteredContact
            )
        }

    }
    catch (error) {
        res.status(400).json({ error: error })
    }

})
const GreenContactDelete = HanlderAsync(async (req, res) => {

    try {

        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (deletedContact) {
            res.status(201).json(
                deletedContact
            )
        }

    }
    catch (error) {
        res.status(400).json({ error: error })
    }
});
const GreenContactUpdate = HanlderAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const { fname, lname, email, number, message } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(id, { $set: { fname, lname, email, number, message } }, { new: true });
        res.status(201);
        res.json(updatedContact)
    }
    catch (error) {
        res.status(201).json({ error: error })
    }


})
module.exports = { GreenContact, GreenContactFindAll, GreenContactFindById, GreenContactDelete, GreenContactUpdate };