const Blog = require("../../models/blog.model.js");
module.exports.getListBlog = async (req,res) => {
    try{
        const blogs = await Blog.find({deleted: false});
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.getBlog = async (req,res) => {
    try{
        const blogId = req.params.blogId;
        const blog = await Blog.findOne({_id: blogId, deleted: false});
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
module.exports.create = async (req,res) => {
    try{
        const countBlog = await Blog.countDocuments({deleted: false});
        if(req.body.position === undefined){
            req.body.position = countBlog + 1;
        }
        const dataCreate = {
            title: req.body.title,
            blog_category_id: req.body.blog_category_id,
            content: req.body.content,
            thumbnail: req.body.thumbnail,
            description: req.body.description,
            status: req.body.status,
            position: Number(req.body.position)
        };
        const blog = new Blog(dataCreate);
        await blog.save();
        res.status(201).json(blog);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.patch = async (req,res) => {
    try{
        const blogId = req.params.blogId;
        const allowFields = ["title","blog_category_id","content","thumbnail","description","status","position"];
        const dataUpdate = {};
        allowFields.forEach(field => {
            if(req.body[field] !== undefined){
                dataUpdate[field] = req.body[field];
            }
        });
        const blog = await Blog.findByIdAndUpdate(blogId,dataUpdate,{new: true});
        if(!blog){
            return res.status(404).json({
                message: "Blog không tồn tại"
            })
        }
        res.status(200).json(blog);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.deleteBlog = async (req,res) => {
    try{
        const blogId = req.params.blogId;
        const blog = await Blog.findByIdAndUpdate(blogId,{deleted: true}, {new: true});
        if(!blog){
            return res.status(404).json({
                message: "Blog không tồn tại"
            })
        }
        res.status(200).json(blog);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}