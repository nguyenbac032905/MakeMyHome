const Admin = require("../../models/admid.model");
const passwordHelper = require("../../helpers/password");
module.exports.getListAdmin = async (req,res) => {
    try{
        const admins = await Admin.find({deleted: false}).select("-password");
        res.status(200).json({
            admins: admins
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.getAdmin = async (req,res) => {
    try{
        const adminId = req.params.adminId;
        const admin = await Admin.findOne({_id: adminId,deleted: false}).select("-password");
        if(!admin){
            res.status(404).json({
                message: "Admin không tồn tại"
            })
            return;
        }
        res.status(200).json({
            admin: admin
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.patch = async (req,res) => {
    try{
        const adminId = req.params.adminId;
        const allowedFields = ["fullName","status","avatar","phone"];
        const dataUpdate = {};
        allowedFields.forEach(item => {
            if(req.body[item] !== undefined){
                dataUpdate[item] = req.body[item];
            }
        })
        const admin = await Admin.findByIdAndUpdate(adminId,dataUpdate,{new: true});
        if(!admin){
            res.status(404).json({
                message: "Id admin không tồn tại"
            })
            return;
        }
        res.status(200).json({
            admin: admin
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
        const admin = new Admin(dataRegister);
        await admin.save();
        res.status(200).json({
            admin: admin
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

        const user = await Admin.findOne({email: email});
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
module.exports.deleteAdmin = async (req,res) => {
    try{
        const adminId = req.params.adminId;

        const admin = await Admin.findByIdAndUpdate(adminId,{deleted: true},{new: true});
        if(!admin){
            res.status(404).json({
                message: "Id admin không tồn tại"
            })
            return;
        }
        res.status(200).json({
            admin: admin
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
        return;
    }
}