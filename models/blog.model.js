    const mongoose = require("mongoose");
    //khai bao slug
    const slug = require('mongoose-slug-updater');
    mongoose.plugin(slug);
    //khai báo bộ khung dữ liệu
    const blogSchema = new mongoose.Schema({
        title: String,
        blog_category_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "BlogCategory"
        },
        content: String,
        thumbnail: String,
        description: String,
        status: {
            type: String,
            default: 'active'
        },
        position: Number,
        slug:{
            type: String,
            slug: "title",
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },{
    timestamps:true
    });

    const Blog = mongoose.model("Blog", blogSchema, "blogs");
    module.exports = Blog;
