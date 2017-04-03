function properties(data) {
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
    var record = ['none'];
    var features = this.subject.features;
    Array.prototype.push.apply(record, Object.keys(features[0].properties));
    for (var i = 1; i < features.length; i++) {
        for (var key in features[i].properties) {
            if (record.indexOf(key) != -1) {
                continue;
            } else {
                record.push(key);
            }
        }
    }
    return record;
};


module.exports = Validation;
