const Product = require("../../models/product.model");
const paginationHelper = require("../../helpers/pagination");
const sortHelper = require("../../helpers/sort");
const {search} = require("../../helpers/search");
module.exports.getListProduct = async (req,res) => {
    const find = {deleted: false};
    //pagination
    const objectPagi = {
        limit: 2,
        currentPage: 1
    };
    const countProduct = await Product.countDocuments({deleted: false});
    const pagi = paginationHelper(objectPagi,req,countProduct);
    //sort
    const sort = sortHelper(req);
    //search
    const arraySearch = search(req);
    if(arraySearch.length > 0){
        find["$or"] = arraySearch;
    }

    const products = await Product.find(find).skip(pagi.skipItem).limit(pagi.limit).sort(sort);
    try{
        res.status(200).send({
            products: products
        })
    }catch(error){
        res.status(500).send({
            message: "Server error"
        })
    }
}
module.exports.getProduct = async (req,res) => {
    const productId = req.params.productId;
    
    try {
        const product = await Product.findOne({deleted: false,_id: productId});
        if(product){
            res.status(200).json({
                product: product
            })
        }else{
             res.status(404).json({
                message: "Product Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.create = async (req,res) => {
    try{
        if (!req.body.position) {
            const countProduct = await Product.countDocuments({deleted: false});

            req.body.position = countProduct+1;
        } else {
            req.body.position = Number(req.body.position);
        }
        const data = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            discountPercentage: req.body.discountPercentage,
            status: req.body.status,
            featured: req.body.featured,
            content: req.body.content,
            images: req.body.images,
            position: req.body.position
        }
        const product = new Product(data);
        await product.save();
        res.status(201).json({
            product: product
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.patch = async (req,res) => {
    try{
        const productId = req.params.productId;
        const allowedFields = ["title","description","price","discountPercentage","status","featured","content","images"];
        const updateData = {};
        allowedFields.forEach(field => {
            if(req.body[field] !== undefined){
                updateData[field] = req.body[field];
            }
        });
        const product = await Product.findByIdAndUpdate(productId, updateData, {new: true});
        if(!product){
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }
        res.status(200).json({
            product: product
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.deleteProduct = async (req,res) => {
    try{
        const productId = req.params.productId;
        const product = await Product.findByIdAndUpdate(productId,{$set: {deleted: true}},{new: true});
        if(!product){
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        res.status(200).json({
            product: product
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}