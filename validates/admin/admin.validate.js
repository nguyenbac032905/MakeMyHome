module.exports.register = (req,res,next) => {
    const { email, fullName, password } = req.body;
    if(!email || email.trim() == ""){
        res.status(400).json({
            message: "Vui lòng nhập email"
        })
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        res.status(400).json({
            message: "Email không hợp lệ"
        })
        return;
    }
    if(!fullName || fullName.trim() == ""){
        res.status(400).json({
            message: "Vui lòng nhập họ và tên"
        })
        return;
    }
    if(!password || password.trim() == ""){
        res.status(400).json({
            message: "Vui lòng nhập mật khẩu"
        })
        return;
    }
    next();
}
module.exports.login = (req,res,next) => {
    const { email, password } = req.body;
    if(!email || email.trim() == ""){
        res.status(400).json({
            message: "Vui lòng nhập email"
        })
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        res.status(400).json({
            message: "Email không hợp lệ"
        })
        return;
    }
    if(!password || password.trim() == ""){
        res.status(400).json({
            message: "Vui lòng nhập mật khẩu"
        })
        return;
    }
    next();
}
module.exports.patch = (req,res,next) => {
   const {fullName ,avatar,phone,status} = req.body;
   if(fullName !== undefined){
        if(fullName.trim() === ""){
            return res.status(200).json({
                message: "Vui lòng không để trống họ tên"
            })
        }
   }
   if(status !== undefined){
        if(status.trim() === ""){
            return res.status(200).json({
                message: "Vui lòng không để trống trạng thái"
            })
        }
   }
   next();
}