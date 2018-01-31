import LogManager from './Logger';

export default class Validator {
    constructor() {
        this.result = null;
        this.certification = false;
        this.logger = LogManager.getLogger('ty.edelweiss.viewp.Validator');
    }

    getCertification() {
        return this.certification;
    }

    getResult() {
        return this.result;
    }

    done(context) {
        try {
            this.result = JSON.parse(context);
            this.logger.log('Success input source parse to object');
            this.certification = true;
        } catch(errorMessage) {
            this.logger.error(errorMessage);
            this.certification = false;
        }
        return this;
    }
}
