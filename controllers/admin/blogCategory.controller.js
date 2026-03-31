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
module.exports.create = async (req,res) => {
    try{
        if(req.body.position === undefined || req.body.position === ""){
            const countCategory = await BlogCategory.countDocuments({deleted: false});
            req.body.position = countCategory + 1;
        }
        const data = {
            title: req.body.title,
            parent_id: req.body.parent_id ? req.body.parent_id : null,
            description: req.body.description,
            status: req.body.status,
            position: Number(req.body.position)
        };
        const category = new BlogCategory(data);
        await category.save();
        res.status(200).json({
            category: category
        })
    }catch(error){
        res.status(500).json({
            message: "Server Error"
        })
    }
}
module.exports.patch = async (req,res) => {
    try{
        const categoryId = req.params.categoryId;
        const allowedFields = ["title","parent_id","description","status","position"];
        const updateField = {};
        allowedFields.forEach(item => {
            if(req.body[item] !== undefined){
                updateField[item] = req.body[item]
            }
        })
        const category = await BlogCategory.findByIdAndUpdate(categoryId,updateField,{new: true});
        if(!category){
            res.status(404).json({
                message: "Không tìm thấy danh mục"
            })
            return;
        }
        res.status(200).json({
            category: category
        })
    }catch(error){
        res.status(500).json({
            message: "Server Error"
        })
    }
}
module.exports.deleteCategory = async (req,res) => {
    try{
        const categoryId = req.params.categoryId;
        const category = await BlogCategory.findByIdAndUpdate(categoryId,{deleted: true}, {new: true});
        if(!category){
            res.status(404).json({
                message: "Không tìm thấy danh mục"
            })
            return;
        }
        res.status(200).json({
            category: category
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}