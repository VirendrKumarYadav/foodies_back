const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");


const userSchema = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    Date: {
        type: Date,
        required: true,
        default: Date.now
    }
   
}
module.exports = mongoose.model("users", userSchema);