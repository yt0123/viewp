export const treeSearch = function(tree, branch = [], treeLog = { category: ['none'], group: ['']}) {
    for (let key in tree) {
        if (treeLog['category'].indexOf(key) != -1) {
            continue;
        } else {
            treeLog['category'].push(key);
            treeLog['group'].push(branch.join('.'));
            if (Object.prototype.toString.call(tree[key]) === '[object Object]') {
                branch.push(key);
                for (let nextKey in tree[key]) {
                    treeSearch(tree[key], branch, treeLog);
                }
            }
        }
    }
    return treeLog;
}
