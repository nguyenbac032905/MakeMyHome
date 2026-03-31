const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userInfo: {
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            price: {
                type: Number,
                required:true,
                min: 0
            },
            quantity: {
                type: Number,
                required:true,
                min: 1
            },
            discountPercentage: {
                type: Number,
                required:true,
                min: 0,
                max: 100
            }
        }
    ],
    status: {
        type: String,
        default: "initial"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
});

const Order = mongoose.model("Order",orderSchema,"orders");
module.exports = Order;