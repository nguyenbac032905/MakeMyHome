const Product = require("../../models/product.model");
const paginationHelper = require("../../helpers/pagination");
const sortHelper = require("../../helpers/sort");
const {search} = require("../../helpers/search");
module.exports.getListProduct = async (req,res) => {
    const find = {deleted: false,status:"active"};
    //pagination
    const objectPagi = {
        limit: 2,
        currentPage: 1
    };
    const countProduct = await Product.countDocuments({deleted: false, status: "active"});
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
    const slugProduct = req.params.slugProduct;
    
    try {
        const product = await Product.findOne({deleted: false,status: "active",slug: slugProduct});
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