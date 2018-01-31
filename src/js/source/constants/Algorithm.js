import Utils from './Utils';

class Algorithm {
    constructor(name) {
        this.name = name;
        this.result = null;
        this.progress = 0;
        this.order = Infinity;
    }

    setProgress(chunk) {
        this.progress = this.progress + chunk;
        return this;
    }

    setOrder(o) {
        this.order = o;
        return this;
    }

    getProgress() {
        const progress = this.progress / this.order;
        return Math.floor(100 * progress);
    }

    getOrder() {
        return this.order;
    }

    getResult() {
        return this.result;
    }

    tick() {
        // Algorithm computational complexity method.
    }

    calc() {
        // Algorithm computational method.
    }
}

export class Scale extends Algorithm {
    constructor(features) {
       super('scale');
       this.features = features;
       this.n = features.length;
    }

    tick(chunk = 1) {
        this.setProgress(chunk);
    }

    calc(target) {
        const self = this;
        if (target !== 'none') {
            this.setOrder(2 * this.n);
            const targets = this.features.map((feature) => {
                self.tick();
                const tmp = Utils.dotSearch(target, feature.properties);
                if (isNaN(tmp)) {
                    return tmp.length;
                }
                return Number(tmp);
            });
            const xMax = Math.max.apply(null, targets);
            const xMin = Math.min.apply(null, targets);
            this.result = this.features.map((feature, index) => {
                self.tick();
                const x = targets[index];
                const temporary = feature.properties.tmp_;
                feature.properties.tmp_ = Object.assign({}, temporary, {score: (x - xMin) / (xMax - xMin)});
                return feature;
            });
        } else {
            this.setOrder(this.n);
            this.result = this.features.map((feature) => {
                self.tick();
                if (feature.properties.tmp_.hasOwnProperty('score')) {
                    delete feature.properties.tmp_.score;
                }
                return feature;
            });
        }
    }
}

export class Link extends Algorithm {
    constructor(features) {
        super('link');
        this.features = features;
        this.n = features.length;
    }

    tick(chunk = 1) {
        this.setProgress(chunk);
    }

    calc(target) {
        const self = this;
        if (target !== 'none') {
            this.setOrder(2 * this.n);
            const targets = {};
            this.features.forEach((feature, index) => {
                self.tick();
                const coordinates = feature.geometry.coordinates;
                const key = Utils.dotSearch(target, feature.properties);
                if (targets.hasOwnProperty(key)) {
                    targets[key].push({ index, coordinates });
                } else {
                    targets[key] = [ { index, coordinates } ];
                }
            });
            const chunk = this.n  / Object.keys(targets).length;
            Object.keys(targets).forEach((key) => {
                self.tick(chunk);
                const feature = this.features[targets[key][0].index];
                const link = targets[key].map((target) => target.coordinates);
                const temporary = feature.properties.tmp_;
                feature.properties.tmp_ = Object.assign({}, temporary, { link });
            });
            console.log(targets);
            this.result = this.features;
        } else {
            this.setOrder(this.n);
            this.result = this.features.filter((feature) => {
                self.tick();
                if (feature.properties.tmp_.hasOwnProperty('link')) {
                    delete feature.properties.tmp_.link;
                }
            })
        }
    }
}

export class Track extends Algorithm {
    constructor(features) {
        super('track');
        this.features = features;
        this.n = features.length;
    }

    tick(chunk = 1) {
        this.setProgress(chunk);
    }

    calc(targetKey, sortKey) {
        const self = this;
        if (targetKey !== 'none') {
            this.setOrder(2 * this.n);
            const targets = {};
            this.features.forEach((feature, index) => {
                self.tick();
                const coordinates = feature.geometry.coordinates;
                const key = Utils.dotSearch(targetKey, feature.properties);
                let value = Utils.dotSearch(sortKey, feature.properties);
                if (isNaN(value)) {
                    const tmp = new Date(value);
                    if (tmp.toString() !== 'Invalid Date') {
                        value = tmp;
                    } else {
                        value = value.length;
                    }
                } else {
                    value = Number(value);
                }
                if (targets.hasOwnProperty(key)) {
                    targets[key].push({index, value, coordinates});
                } else {
                    targets[key] = [ {index, value, coordinates} ];
                }
            });
            const chunk = this.n  / Object.keys(targets).length;
            Object.keys(targets).forEach((key) => {
                self.tick(chunk);
                targets[key].sort((start, end) => {
                    if (start.value > end.value) {
                        return 1;
                    } else if (start.value < end.value) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                const feature = this.features[targets[key][0].index];
                const track = targets[key].map((target) => target.coordinates);
                const temporary = feature.properties.tmp_;
                feature.properties.tmp_ = Object.assign({}, temporary, { track });
            });
            this.result = this.features;
        } else {
            this.setOrder(this.n);
            this.result = this.features.filter((feature) => {
                self.tick();
                if (feature.properties.tmp_.hasOwnProperty('link')) {
                    delete feature.properties.tmp_.link;
                }
            })
        }
    }
}

export class Orient extends Algorithm {
    constructor(features) {
        super('orient');
        this.features = features;
        this.n = features.length;
    }

    tick(chunk = 1) {
        this.setProgress(chunk);
    }

    calc(target) {
        const self = this;
        if (target !== 'none') {
            this.setOrder(this.n);
            this.result = this.features.map((feature, index) => {
                self.tick();
                const tmp = Utils.dotSearch(target, feature.properties);
                const targets = tmp.map((value, index) => {
                    if (isNaN(value)) {
                        const tmp = new Date(value);
                        return {
                            value: tmp.toString() !== 'Invalid Date' ? tmp : value.length,
                            coordinates: feature.geometry.coordinates[index]
                        };
                    } else {
                        return {
                            value: Number(value),
                            coordinates: feature.geometry.coordinates[index]
                        };
                    }
                });
                const orient = targets[0].value < targets[targets.length - 1].value ? 1 : -1;
                const temporary = feature.properties.tmp_;
                feature.properties.tmp_ = Object.assign({}, temporary, { orient });
                return feature;
            });
        } else {
            this.setOrder(this.n);
            this.result = this.features.filter((feature) => {
                self.tick();
                if (feature.properties.tmp_.hasOwnProperty('orient')) {
                    delete feature.properties.tmp_.orient;
                }
            })
        }
    }
}
