const { tree } = require("../../helpers/createTree");
const getSubCategory = require("../../helpers/getSubCategory");
const BlogCategory = require("../../models/BlogCategory.model");
const Blog = require("../../models/blog.model");
const mongoose = require("mongoose");
module.exports.getListCategory = async (req,res) => {
    try{
        const categories = await BlogCategory.find({deleted: false});
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
        const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);
        const allSubCategory = await getSubCategory(categoryId);
        const idsSubCategory = allSubCategory.map(item => item._id);
        const blogs = await Blog.find({
            blog_category_id: {$in: [categoryId,...idsSubCategory]},
            deleted: false,
            status: "active"
        })
        if(blogs.length === 0){
            return res.status(404).json({
                message: "Không có bài viết"
            })
        }
        res.status(200).json({
            blogs:blogs
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}