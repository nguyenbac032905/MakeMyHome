const {slugify} = require("../helpers/slugify");
module.exports.search = (req) => {
    const keyword = req.query.keyword?.trim();
    if(!keyword) return [];
    const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const titleRegex = new RegExp(safeKeyword,"i");
    const slugRegex = new RegExp(slugify(keyword),"i");
    
    return [{title: titleRegex},{slug: slugRegex}];
}