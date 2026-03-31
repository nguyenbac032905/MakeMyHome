const User = require("../../models/user.model");

module.exports.auth = async (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                message: "Thiếu token"
            });
        }
        const tokenUser = authHeader.split(" ")[1];
        const user = await User.findOne({tokenUser: tokenUser,deleted: false, status: "active"}).select("-password");
        if(!user){
            res.status(401).json({
                message: "User không tồn tại"
            })
            return;
        }
        req.user = user;
        next();
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}