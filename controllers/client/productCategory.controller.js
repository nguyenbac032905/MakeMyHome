const { tree } = require("../../helpers/createTree");
const getSubCategory = require("../../helpers/getSubCategory");
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/productCategory.model");
const mongoose = require("mongoose");
module.exports.getListCategory = async (req,res) => {
    try{
        const categories = await ProductCategory.find({deleted: false,status: "active"});
        const categoryTree = tree(categories);
        res.status(200).json({
            categories: categoryTree
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.getListProductByCategory = async (req,res) => {
    try{
        const slugCategory = req.params.slugCategory;
        const category = await ProductCategory.findOne({deleted: false,status: "active",slug: slugCategory});
        if(!category){
            return res.status(404).json({
                message: "Không tồn tại danh mục"
            })
        }
        const categoryId = category._id;
        const allSubCategory = await getSubCategory(categoryId);
        const idsSubCategory = allSubCategory.map(item => item._id);
        const products = await Product.find({
            product_category_id: {$in: [categoryId,...idsSubCategory]},
            deleted: false,
            status: "active"
        })
        res.status(200).json({
            products: products
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}