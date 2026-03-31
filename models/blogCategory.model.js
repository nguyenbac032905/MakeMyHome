const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const blogCategorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogCategory",
        default: null
    },
    description: String,
    status: String,
    position: Number,
    slug:{
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
  timestamps:true
});

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema, "blog_category");
module.exports = BlogCategory;
