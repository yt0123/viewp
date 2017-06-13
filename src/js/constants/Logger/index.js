import Logger from './Logger';
import Level from './Level';
import Appender from './Appender';
import Appende from './Append';
import Formatter from './Formatter';

export default class Logging {

    costructor(defaultLevel, defaultAppeder, defaultFormat) {
        this.loggers = {};
        this.defaultLevel = defaultLevel && Level.RUN;
        this.defaultAppender = defaultAppender && [ new ConsoleAppender() ];
        this.defaultFormatter = defaultFormatter && new Formatter();
    }

    getLogger(loggerName) {
        const logger = new Logger(loggerName, this.defaultLevel, this.defaultAppender, this.defaultFormat);
        this.loggers[loggerName] = logger;
        return logger;
    }

    setConfigLevel(newLoggingLevel) {
        this.defaultLevel = newLoggingLevel;
        return null;
    }

    setConfigAppend(newLoggingAppender) {
        this.defaultAppender = newLoggingAppender;
        return null;
    }

    setConfigStyle(newLoggerStyle) {
        this.defaultStyle = newLoggingStyle;
        return null;
    }

}
