module.exports.create = (req,res,next) => {
    if(!req.body.title){
        res.status(400).json({
            message: "Vui lòng nhập tiêu đề"
        })
        return;
    }
    if(req.body.position !== undefined && req.body.position !== ""){
        if(isNaN(Number(req.body.position))){
            res.status(400).json({
                message: "Vui lòng nhập vị trí là số"
            })
            return;
        }
    }
    next();
}
module.exports.patch = (req,res,next) => {
    if(req.body.title&& req.body.title.trim() === ""){
        res.status(400).json({
            message: "Vui lòng nhập tiêu đề"
        })
        return;
    }
    if(req.body.position !== undefined && req.body.position !== ""){
        if(isNaN(Number(req.body.position))){
            res.status(400).json({
                message: "Vui lòng nhập vị trí là số"
            })
            return;
        }
    }
    next();
}