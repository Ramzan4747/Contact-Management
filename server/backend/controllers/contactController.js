const asyncHandler = require('express-async-handler')
const Contact = require('../model/contactModel')

const getContact = asyncHandler(async (req, res) => {

    const contacts = await Contact.find()
    console.log('Contacts', contacts)
    res.send(contacts)

    //    const contacts = await Contact.find()
    //    res.status(200).json(contacts)
})


const setContact = asyncHandler(async (req, res) => {

    const contact = req.body;
    const newContact = new Contact(contact)

    try {
        await newContact.save()
        res.json(contact)
    } catch (err) {
        res.json(err)
    }


    // if (!req.body.text) {
    //     res.status(400)
    //     throw new Error("Please add text field")
    // }

    // const contact = await Contact.create({
    //     text: req.body.text
    // })

    // res.status(200).json(contact)
})


const updateContact = asyncHandler(async (req, res) => {


    const contact = req.body;

    // Find the contact by ID and update its fields
    await Contact.findByIdAndUpdate(contact._id, {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber
    });

    res.send("Contact Updated");

    // const contact = req.body
    // await Contact.findByIdAndUpdate(contact._id, { firstName: contact.firstName, lastName: contact.lastName, phoneNumber: contact.phoneNumber })
    // res.send("Contact Updated")


    //     const contact = await Contact.findById(req.params.id)

    //     if(!contact){
    //         res.status(400)
    //         throw new Error("Contact Not Found")
    //     }
    //     const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})

    //    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {



    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(400);
        throw new Error("Contact Not Found");
    }

    await Contact.deleteOne({ _id: req.params.id }); // Delete the contact from the database

    res.status(200).json({ id: req.params.id });
});



// const deleteContact = asyncHandler(async (req, res) => {
//     const contact = await Contact.findById(req.params.id)

//     if(!contact){
//         res.status(400)
//         throw new Error("Contact Not Found")
//     }
//     await contact.remove()

//    res.status(200).json({id: req.params.id})
// })

module.exports = {
    getContact,
    setContact,
    updateContact,
    deleteContact
}