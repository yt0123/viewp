class Appender {
    constructor() {}

    append() {}
}

export default class ConsoleAppender extends Appender {

    constructor(appenderName) {
        this.appenderName = appenderName || 'Console';
    }

    append(output, level) {
         switch(level) {
            case Level.DEBUG:
                console.debug(output);
                break;
            case Level.INFO:
                console.info(output);
                break;
            case Level.LOG:
                console.log(output);
                break;
            case Level.WARN:
                console.warn(output);
                break;
            case Level.ERROR:
                console.error(output);
                break;
            default:
                break;
        }
        return null;
    }

}
