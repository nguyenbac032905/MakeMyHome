const ProductCategory = require("../models/productCategory.model");
async function getSubCategory(categoryId) {
    const subs = await ProductCategory.find({parent_id: categoryId, status: "active", deleted: false});
    let allSub = [...subs];
    
    const childs = await Promise.all(
        subs.map(item => getSubCategory(item._id))
    )

    return allSub.concat(...childs);
}

module.exports = getSubCategory;