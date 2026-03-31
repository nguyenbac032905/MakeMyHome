const { default: mongoose } = require("mongoose");

module.exports.create = (req,res,next) => {
    const {title,position,blog_category_id,content} = req.body;
    if(!title || title.trim() === ""){
        return res.status(400).json({
            message: "Vui Lòng nhập tiêu đề"
        })
    }
    if (!content || content.trim() === "") {
        return res.status(400).json({
            message: "Vui lòng nhập nội dung"
        });
    }
    if (!blog_category_id || !mongoose.Types.ObjectId.isValid(blog_category_id)) {
        return res.status(400).json({
            message: "blog_category_id không hợp lệ"
        });
    }
    if(position !== undefined && isNaN(position)){
        return res.status(400).json({
            message: "Vị trí phải là số"
        })
    }
    next();
}
module.exports.patch = (req,res,next) => {
    const {title,position,blog_category_id,content} = req.body;
    if(title && title.trim() === ""){
        return res.status(400).json({
            message: "Vui Lòng nhập tiêu đề"
        })
    }
    if (content && content.trim() === "") {
        return res.status(400).json({
            message: "Vui lòng nhập nội dung"
        });
    }
    if (blog_category_id && !mongoose.Types.ObjectId.isValid(blog_category_id)) {
        return res.status(400).json({
            message: "blog_category_id không hợp lệ"
        });
    }
    if(position !== undefined && isNaN(position)){
        return res.status(400).json({
            message: "Vị trí phải là số"
        })
    }
    next();
}