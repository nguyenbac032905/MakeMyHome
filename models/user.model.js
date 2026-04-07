const mongoose = require("mongoose");
const generateToken = require("../helpers/generate");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: String,
    phone: String,
    avatar: String,
    status: String,
    deletedAt: Date,
    tokenUser:{
        type: String,
        default: () => generateToken.generateRandomString(20)
    },
    deleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const User = mongoose.model("User",userSchema,"users");

module.exports = User;