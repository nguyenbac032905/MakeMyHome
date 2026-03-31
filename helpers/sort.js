module.exports = (req) => {
    const sort = {};
    const {sortKey,sortValue} = req.query;
    if(sortKey && sortValue){
        sort[sortKey] = parseInt(sortValue);
    }else{
        sort.createdAt=-1;
    }
    return sort;
}