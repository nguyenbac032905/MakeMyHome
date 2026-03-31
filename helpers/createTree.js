let count = 0;
function createTree(arr,parent_id=null) {
    const tree = [];
    arr.forEach(item => {
        if(String(item.parent_id) === String(parent_id)){
            count++;

            const newItem = item.toObject ? item.toObject() : {...item};

            newItem.index = count;

            newItem.id = newItem._id.toString();

            newItem.children = createTree(arr,newItem.id);
            
            tree.push(newItem);
        }
    })
    return tree;
}

module.exports.tree = (arr,parent_id=null) =>{
    count=0;
    const arrayTree = createTree(arr,parent_id);
    return arrayTree;
}

