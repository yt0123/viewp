import LogManager from './Logger';

export default class Validator {
    constructor() {
        this.result = null;
        this.certification = false;
        this.purity = null;
        this.logger = LogManager.getLogger('ty.edelweiss.viewp.Validator');
    }

    getCertification() {
        return this.certification;
    }

    getPurity() {
        return this.purity;
    }

    getResult() {
        return this.result;
    }

    validate(obj) {
        if (obj.type !== 'FeatureCollection') {
            throw new Error('Source object has type. but, object type is invalid');
        }

        const types = obj.features.map((feature) => {
            if (feature.type !== 'Feature') {
                throw new Error('Source object has feature. but, feature type is invalid');
            }

            const geometry = feature.geometry;
            if (geometry.hasOwnProperty('type') && geometry.hasOwnProperty('coordinates')) {
                return geometry.type;
            } else {
                throw new Error('Source object has feature, but feature has not required property');
            }
        });

        this.purity = types.reduce((accumlator, currentValue) => {
            return accumlator === currentValue ? currentValue : 'Multiple Type' ;
        }, types[0]);

        return obj
    }

    done(context) {
        try {
            const obj = JSON.parse(context);
            this.result = this.validate(obj);
            this.logger.log('Success input source parse to object');
            this.certification = true;
        } catch(errorMessage) {
            this.logger.error(errorMessage);
            this.certification = false;
        }
        return this;
    }
}
