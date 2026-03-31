const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE);
    } catch (error) {
        console.log(error);
    }
}