const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pinned: [{
        name: String,
        currWeight: String,
        isPinned: Boolean
    }]
})

const User = mongoose.model("User", UserSchema);

module.exports = User;