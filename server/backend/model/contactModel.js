const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);
