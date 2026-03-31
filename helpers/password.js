const bcrypt = require("bcrypt");
module.exports.hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password,saltRounds)
}
module.exports.comparePassword = async (password,hash) => {
    return await bcrypt.compare(password,hash)
}