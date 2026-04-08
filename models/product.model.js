const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema({
    title: String,
    product_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
        default: null
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    thumbnail: String,
    status: String,
    featured: {
        type: Boolean,
        default: false
    },
    content: String,
    color:  String,
    size: String,
    material: String,
    position: Number,
    sold: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
},{
    timestamps: true
});

const Product = mongoose.model("Product",ProductSchema,"products");
module.exports = Product;