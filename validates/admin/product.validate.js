module.exports.create = (req,res,next) => {
    const {title,price,discountPercentage} = req.body;
    if(!title || title.trim() === "") {
        res.status(400).json({
            message: "Vui lòng nhập tiêu đề"
        })
        return;
    }

    if(price !== undefined && price !== ""){
        const priceNum = Number(price);
        if(isNaN(priceNum)){
            res.status(400).json({
                message: "Vui lòng nhập giá là số"
            })
            return;
        }
        if(priceNum <0){
            res.status(400).json({
                message: "Vui lòng nhập giá là số lớn hơn 0"
            })
            return;
        }
        req.body.price = priceNum;
    }

    if(discountPercentage !== undefined && discountPercentage !== ""){
        const discountNum = Number(discountPercentage);
        if(isNaN(discountNum)){
            res.status(400).json({
                message: "Vui lòng nhập giảm giá là số"
            })
            return;
        }
        if(discountNum <0 || discountNum > 100){
            res.status(400).json({
                message: "Giảm giá phải từ 0 đến 100"
            })
            return;
        }
        req.body.discountPercentage = discountNum;
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
    const {title,price,discountPercentage,position} = req.body;
    if(title !== undefined) {
        if(title.trim() === "") {
            return res.status(400).json({ message: "Vui lòng nhập tiêu đề" });
        }
    }

    if(price !== undefined && price !== ""){
        const priceNum = Number(price);
        if(isNaN(priceNum)){
            res.status(400).json({
                message: "Vui lòng nhập giá là số"
            })
            return;
        }
        if(priceNum <0){
            res.status(400).json({
                message: "Vui lòng nhập giá là số lớn hơn 0"
            })
            return;
        }
        req.body.price = priceNum;
    }

    if(discountPercentage !== undefined && discountPercentage !== ""){
        const discountNum = Number(discountPercentage);
        if(isNaN(discountNum)){
            res.status(400).json({
                message: "Vui lòng nhập giảm giá là số"
            })
            return;
        }
        if(discountNum <0 || discountNum > 100){
            res.status(400).json({
                message: "Giảm giá phải từ 0 đến 100"
            })
            return;
        }
        req.body.discountPercentage = discountNum;
    }
    if(position !== undefined && position !== ""){
        if(isNaN(Number(position))){
            res.status(400).json({
                message: "Vui lòng nhập vị trí là số"
            })
            return;
        }
    }

    next();
}