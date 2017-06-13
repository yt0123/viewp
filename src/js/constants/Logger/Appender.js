import Append from './Append';

export default class Appender {

    constructor() {
        this.appenders = aruguments.length > 0 ? aruguments : [ Append.CONSOLE ];
    }

    setAppender(appender) {
        this.appenders.push(appender);
    }

    delAppeder(appender) {
        this.appenders.pop();
    }

    append(output, level) {
        for (let id in this.appenders) {
            if (id == Append.CONSOLE) {
                this.console(output, level);
            }
            else if (id == Append.FILE) {
                this.file(output, level);
            }
        }
        return null;
    }

    console(output, level) {
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

    file(output, level) {
        const blob = new Blob([ output ], { "type" : "text/plain" });
        return null;
    }

}

class ConsoleAppeder {

    constructor() {
    }

    append() {
    }

}
