const Utils = {
    dotSearch: function(notation, tree) {
        const dot = notation.split('.');
        return dot.reduce((accumlator, currentValue) => accumlator[currentValue], tree);
    },
    treeSearch: function(tree, trunk = [], result = []) {
        for (let key in tree) {
            const node = tree[key];
            const dot = trunk.length > 0 ? trunk.join('.') + '.' + key : key;
            const type = Object.prototype.toString.call(node);
            result.push({name: dot, rank: trunk.length, type: type.match(/\[object (.*)\]/)[1]});
            if (type === '[object Object]') {
                const branch = trunk.concat(key);
                Utils.treeSearch(node, branch, result);
            }
        }
        return result;
    }
};

export default Utils;