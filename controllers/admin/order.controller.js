const Order = require("../../models/order.model");
module.exports.getListOrder = async (req,res) => {
    try{
        const orders = await Order.find({deleted: false});
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.getOrder = async (req,res) => {
    try{
        const orderId = req.params.orderId;
        const order = await Order.findOne({_id: orderId, deleted: false}).populate("products.product_id","title images");
        if(!order){
            return res.status(404).json({
                message: "Đơn hàng không tồn tại"
            })
        }
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.deleteOrder = async (req,res) => {
    try{
        const orderId = req.params.orderId;
        const order = await Order.findOneAndUpdate({_id: orderId},{$set: {deleted: true}},{new: true});
        if(!order){
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng"
            })
        }
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}