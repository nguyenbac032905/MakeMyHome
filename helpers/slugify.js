const unidecode = require("unidecode");
module.exports.slugify = (str) => {
    return unidecode(str).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}