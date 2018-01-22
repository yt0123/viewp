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

    tick() {
        this.setProgress(1);
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
        this.chunk = features.length;
    }

    tick() {
        this.setProgress(1);
    }

    calc(target) {
        const self = this;
        if (target !== 'none') {
            this.setOrder(this.n);
            const edges = this.features.forEach((feature) => {
                self.tick();
                return Utils.dotSearch(target, feature.properties);
            });
            this.result = this.features.push(edges);
        } else {
            this.setOrder(this.n);
            this.result = this.features.filter((feature) => {
                self.tick();
                return !features.properties.tmp_.hasOwnProperty('key');
            })
        }
    }
}
