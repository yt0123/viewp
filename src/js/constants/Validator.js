import LogManager from './Logger';

export default class Validator {
    constructor() {
        this.result = null;
        this.certificate = false;
        this.logger = LogManager.getLogger('ty.edelweiss.viewp.Validator');
    }

    getCertificate() {
        return this.certificate;
    }

    getResult() {
        return this.result;
    }

    done(context) {
        try {
            this.result = JSON.parse(context);
            this.logger.log('Success input source parse to object');
            this.certificate = true;
        } catch(errorMessage) {
            this.logger.error(errorMessage);
            this.certificate = false;
        }
        return this;
    }
}
