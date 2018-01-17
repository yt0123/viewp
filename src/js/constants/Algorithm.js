import Utils from './Utils';

const Algorithm = {
    scaling: function(features, target, notification) {
        const targets = features.map((feature) => {
            return Utils.dotSearch(target, feature.properties);
        });
        return features.map(function(feature, index) {
        });
    }
};

export default Algorithm;