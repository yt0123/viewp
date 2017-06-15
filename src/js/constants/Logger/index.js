import Logger from './Logger';
import Level from './Level';
import Appender from './Appender';
import Formatter from './Formatter';

class Logging {

    costructor(defaultLevel, defaultFormat, defaultAppenders) {
        this.loggers = {};
        this.defaultLevel = defaultLevel && Level.RUN;
        this.defaultFormatter = defaultFormatter && new Formatter();
        this.defaultAppenders = defaultAppenders && [ new Appender.ConsoleAppender() ];
    }

    getLogger(loggerName) {
        const logger = new Logger(loggerName, this.defaultLevel, this.defaultFormatter, this.defaultAppenders);
        this.loggers[loggerName] = logger;
        return logger;
    }

    setConfigLevel(newLoggingLevel) {
        this.defaultLevel = newLoggingLevel;
        return null;
    }

    setConfigFormatter(newLoggingFormatter) {
        this.defaultFormatter = newLoggingFormatter;
        return null;
    }

    setConfigAppender(newLoggingAppender) {
        this.defaultAppenders.push(newLoggingAppender);
        return null;
    }

    delConfigAppender() {
        this.defaultAppenders.pop();
        return null;
    }

}

export default new Logging();
