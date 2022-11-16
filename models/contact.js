
const moongose = require('mongoose');
const Schema = moongose.Schema;

const Contact = new Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,

    },
   
    number: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }


}, { timestamps: true })

module.exports = moongose.model('GreenCodesContact', Contact);
