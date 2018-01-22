const Utils = {
    rankSort: function(data) {
        return data.sort((a, b) => {
            const diff = a.rank - b.rank;
            const textA = a.name.toLowerCase().split('.').pop();
            const textB = b.name.toLowerCase().split('.').pop();
            if (diff !== 0) {
                return diff;
            } else if (textA < textB) {
                return -1;
            } else if (textA > textB) {
                return 1;
            }
            return 0;
        });
    },
    rankSortEx: function(data, exclusion) {
        return data.sort((a, b) => {
            const diff = a.rank - b.rank;
            const rootA = a.name.split('.')[0];
            const rootB = b.name.split('.')[0];
            const textA = a.name.toLowerCase().split('.').pop();
            const textB = b.name.toLowerCase().split('.').pop();
            if (rootA === exclusion) {
                return Infinity;
            } else if (rootB === exclusion) {
                return -Infinity;
            } else if (diff !== 0) {
                return diff;
            } else if (textA < textB) {
                return -1;
            } else if (textA > textB) {
                return 1;
            }
            return 0;
        });
    },
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
    },
    createProperty: function(features, key, value = {}) {
        return features.map((feature) => {
            feature.properties[key] = value;
            return feature
        });
    }
};

export default Utils;