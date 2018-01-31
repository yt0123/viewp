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
        Object.keys(tree).forEach((key) => {
            const node = tree[key];
            const dot = trunk.length > 0 ? trunk.join('.') + '.' + key : key;
            const type = Object.prototype.toString.call(node);
            result.push({name: dot, rank: trunk.length, type: type.match(/\[object (.*)\]/)[1]});
            if (type === '[object Object]') {
                const branch = trunk.concat(key);
                Utils.treeSearch(node, branch, result);
            }
        });
        return result;
    },
    combSearch: function(dataset, index = 0, result = []) {
        if (dataset.slice(index).length > 1) {
            const data0 = dataset[index];
            dataset.slice(index + 1).forEach((data1) => {
                result.push([data0, data1]);
            });
            Utils.combSearch(dataset, index + 1, result);
        }
        return result;
    },
    computeCenter: function(coordinates) {
        const n = coordinates.length - 1;
        const a = 0.5 * coordinates.slice(0, n - 1).reduce((accumlator, cv, idx) => {
            const [xi , yi] = cv;
            const [xii, yii] = coordinates[idx + 1];
            return accumlator + ((xi * yii) - (xii * yi));
        }, 0);
        const c = coordinates.slice(0, n - 1).reduce((accumlator, cv, idx) => {
            const [xi , yi] = cv;
            const [xii, yii] = coordinates[idx + 1];
            accumlator.x = accumlator.x + ( (xi + xii) * ((xi * yii) - (xii * yi)) );
            accumlator.y = accumlator.y + ( (yi + yii) * ((xi * yii) - (xii * yi)) );
            return accumlator;
        }, {x: 0, y: 0});
        return [(1 / (6 * a)) * c.x, (1 / (6 * a)) * c.y];
    },
    createProperty: function(features, key, value = {}) {
        return features.map((feature) => {
            feature.properties[key] = value;
            return feature
        });
    }
};

export default Utils;