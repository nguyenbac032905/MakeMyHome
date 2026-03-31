const mongoose = require("mongoose");
const generateToken = require("../helpers/generate");

const adminSchema = new mongoose.Schema({
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
    tokenAdmin:{
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

const Admin = mongoose.model("Admin",adminSchema,"admins");

module.exports = Admin;