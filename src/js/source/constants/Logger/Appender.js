import Logger from './Logger';
import Level from './Level';

export default class Appender {

    constructor(appenderName) {
        this.appenderName = appenderName || 'Console';
        this.consoleLog = console.log.bind(console);
    }

    setAppenderName(newAppenderName) {
        this.appenderName = newAppenderName;
        return this;
    }

    append(message, level) {
       this.consoleLog(message);
    }

}
