import Logger from './Logger';
import Level from './Level';
import Appender from './Appender';
import Formatter from './Formatter';

class LogManager {

    constructor(defaultLevel, defaultFormatter, defaultAppender) {
        this.loggers = {};
        this.defaultLevel = defaultLevel || Level.RUN;
        this.defaultFormatter = defaultFormatter || Formatter;
        this.defaultAppender = defaultAppender || Appender;
    }

    getLogger(loggerName = 'root') {
        if (!this.loggers.hasOwnProperty(loggerName)) {
            const logger = new Logger(loggerName, this.defaultLevel, new this.defaultFormatter(), new this.defaultAppender());
            this.loggers[loggerName] = logger;
            return logger;
        } else {
            const logger = this.loggers[loggerName];
            return logger;
        }
    }

    setConfigLevel(newLoggingLevel) {
        this.defaultLevel = newLoggingLevel;
        return this;
    }

    setConfigFormatter(newLoggingFormatter) {
        this.defaultFormatter = newLoggingFormatter;
        return this;
    }

    setConfigAppender(newLoggingAppender) {
        this.defaultAppender = newLoggingAppender;
        return this;
    }

}

export default new LogManager();
