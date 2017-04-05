function keySearch(tree, log = [['none'],['']], branch = []) {
    for (var key in tree) {
        if (log[0].indexOf(key) != -1) {
            continue;
        } else {
            log[0].push(key);
            log[1].push(branch.join('-'));
            if (Object.prototype.toString.call(tree[key]) === '[object Object]') {
                branch.push(key);
                for (var nextKey in tree[key]) {
                    keySearch(tree[key], log, branch);
                }
            }
        }
    }
    return log;
}

var Validation = (function() {
    function Validation(text) {
        try {
            this.subject = JSON.parse(text);
        } catch(err) {
            console.log(err);
        }
    };
    return Validation;
})();
Validation.prototype.validator = function() {
    var certificate = this.subject;
    return certificate;
};
Validation.prototype.getResult = function() {
    var result = null;
    try {
        result = this.validator();
    } catch(err) {
        console.log(err);
    }
    return result;
};
Validation.prototype.getProperties = function() {
    var log;
    var features = this.subject.features;
    features.forEach(function(feature, index, array) {
        log = keySearch(feature.properties, log);
    });
    return log;
};


module.exports = Validation;
