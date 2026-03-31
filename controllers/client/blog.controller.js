const Blog = require("../../models/blog.model.js");
module.exports.getListBlog = async (req,res) => {
    try{
        const blogs = await Blog.find({deleted: false,status: "active"});
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.getBlog = async (req,res) => {
    try{
        const blogSlug = req.params.blogSlug;
        const blog = await Blog.findOne({slug: blogSlug, deleted: false,status: "active"});
        if(!blog){
            return res.status(404).json({
                message: "Blog không tồn tại"
            })
        }
        return res.status(200).json(blog);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}