const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type:String,
        required: [true, "Please add the name"]
    },
    email: {
        type:String,
        required: [true, "Please add the email"]
    },
    phone: {
        type:String,
        required: [true, "Please add the phone number"]
    }    
}, 
{
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact;