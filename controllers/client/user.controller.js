const User = require("../../models/user.model");
const passwordHelper = require("../../helpers/password");

module.exports.getUser = async (req,res) => {
    try{
        const user = req.user;
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
        const user = req.user;
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