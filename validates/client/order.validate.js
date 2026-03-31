module.exports.create = (req,res,next) => {
    const {fullName, phone, address,products} = req.body;
    if(!fullName || fullName=="" || !phone || phone=="" || !address || address ==""){
        return res.status(400).json({
            message: "Không để trống thông tin cá nhân"
        })
    }
    if(!products || products.length === 0){
        return res.status(400).json({
            message: "Không để trống danh sách sản phẩm"
        })
    }
    for(const item of products){
        if (!item.product_id) {
            return res.status(400).json({
                message: "Thiếu product_id"
            });
        }
        if(!item.quantity || item.quantity <= 0){
            return res.status(400).json({
                message: "Số lượng sản phẩm không hợp lệ"
            })
        }
    }
    next();
}
module.exports.patch = (req,res,next) => {
    const {fullName, phone, address} = req.body;
    if(fullName !== undefined && fullName.trim()==""){
        return res.status(400).json({
            message: "Không để trống tên"
        })
    }
    if(phone !== undefined && phone.trim()==""){
        return res.status(400).json({
            message: "Không để trống số điện thoại"
        })
    }
    if(address !== undefined && address.trim() ==""){
        return res.status(400).json({
            message: "Không để trống địa chỉ"
        })
    }
    next();
}