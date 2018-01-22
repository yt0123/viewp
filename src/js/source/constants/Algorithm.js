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

export class Network extends Algorithm {
    constructor(features) {
        super('link');
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
            const targets = {};
            this.features.forEach((feature) => {
                self.tick();
                const coordinates = feature.geometry.coordinates;
                const property = Utils.dotSearch(target, feature.properties);
                if (targets.hasOwnProperty(property)) {
                    targets[property].push(coordinates);
                } else {
                    targets[property] = [ coordinates ];
                }
            });
            console.log(targets);

            const m = Object.keys(targets).length;
            this.setOrder(this.n + m);

            let edges = [];
            Object.keys(targets).forEach((key) => {
                self.tick();
                const combinations = Utils.combSearch(targets[key]);
                console.log(key, combinations);
                edges.push(
                    combinations.map((comb) => {
                        const center = [
                            Utils.computeCenter(comb[0][0]),
                            Utils.computeCenter(comb[1][0])
                        ];
                        return {
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: [center[0], center[1]]
                            },
                            properties: {
                                tmp_: { key: target }
                            }
                        };
                    })
                );
            });
            console.log(edges);
            //this.result = this.features.concat(edges);
            this.result = this.features;
        } else {
            this.setOrder(this.n);
            this.result = this.features.filter((feature) => {
                self.tick();
                return !feature.properties.tmp_.hasOwnProperty('key');
            })
        }
    }
}
