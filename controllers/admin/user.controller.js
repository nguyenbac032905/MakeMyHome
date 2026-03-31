const User = require("../../models/user.model");
const passwordHelper = require("../../helpers/password");
module.exports.getListUser = async (req,res) => {
    try{
        const users = await User.find({deleted: false}).select("-password");
        res.status(200).json({
            users : users 
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.getUser = async (req,res) => {
    try{
        const userId = req.params.userId;
        const user = await User.findOne({_id: userId,deleted: false}).select("-password");
        if(!user){
            res.status(404).json({
                message: "User không tồn tại"
            })
            return;
        }
        res.status(200).json({
            user: user
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.patch = async (req,res) => {
    try{
        const userId = req.params.userId;
        const allowedFields = ["fullName","status","avatar","phone"];
        const dataUpdate = {};
        allowedFields.forEach(item => {
            if(req.body[item] !== undefined){
                dataUpdate[item] = req.body[item];
            }
        })
        const user = await User.findByIdAndUpdate(userId,dataUpdate,{new: true});
        if(!user){
            res.status(404).json({
                message: "User không tồn tại"
            })
            return;
        }
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            user: userWithoutPassword
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
        return;
    }
}
module.exports.register = async (req,res) => {
    try{
        const dataRegister = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: await passwordHelper.hashPassword(req.body.password)
        };
        const user = new User(dataRegister);
        await user.save();
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            user: userWithoutPassword
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.login = async (req,res) => {
    try{
        const email = req.body.email;

        const user = await User.findOne({email: email});
        if(!user){
            res.status(400).json({
                message: "Sai email"
            })
            return;
        }
        const match = await passwordHelper.comparePassword(req.body.password,user.password)
        if(!match){
            res.status(400).json({
                message: "Sai mật khẩu"
            })
            return;
        }
        const{password,...userWithoutPassword} = user.toObject();
        res.status(200).json({
            user: userWithoutPassword
        })
    }catch(error){
        res.status(500).json({
            message: "error"
        })
    }
}
module.exports.deleteUser = async (req,res) => {
    try{
        const userId = req.params.userId;

        const user = await User.findByIdAndUpdate(userId,{deleted: true},{new: true});
        if(!user){
            res.status(404).json({
                message: "User không tồn tại"
            })
            return;
        }
        res.status(200).json({
            user: user
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
        return;
    }
}