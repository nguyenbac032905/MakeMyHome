module.exports = (objectPagi,req,countProduct) => {
    const {page, limit} = req.query;
    if(page&&limit){
        objectPagi.currentPage = parseInt(page);
        objectPagi.limit = parseInt(limit);
    }
    objectPagi.skipItem = (objectPagi.currentPage-1)*objectPagi.limit;
    objectPagi.totalPage=Math.ceil(countProduct/objectPagi.limit);

    return objectPagi;
}