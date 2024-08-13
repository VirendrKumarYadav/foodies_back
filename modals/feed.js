const mongoose = require("mongoose");


const feedSchema = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now
    }
   
}
module.exports = mongoose.model("feedback", feedSchema);
