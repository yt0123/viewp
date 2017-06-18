import Level from './Level';

export default class Logger {

    constructor(loggerName, loggerLevel, loggerFormatter, loggerAppender) {
        this.name = loggerName;
        this.level = loggerLevel;
        this.formatter = loggerFormatter.setFormatterName(loggerName);
        this.appender = loggerAppender.setAppenderName(loggerName);
    }

    setLevel(newLoggerLevel) {
        this.level = newLoggerLevel;
        return this;
    }

    setFormatter(newLoggerFormatter) {
        this.formatter = newLoggerFormatter;
        return this;
    }

    setAppender(newLoggerAppender) {
        this.appender = newLoggerAppender;
        return this;
    }

    debug(message) {
        if (this.level <= Level.DEBUG) {
            const debugMessage = this.formatter.format(message, 'DEBUG', new Date());
            this.appender.append(debugMessage);
        }
        return null;
    }

    info(message) {
        if (this.level <= Level.INFO) {
            const infoMessage = this.formatter.format(message, 'INFO', new Date());
            this.appender.append(infoMessage);
        }
        return null;
    }

    log(message) {
        if (this.level <= Level.LOG) {
            const logMessage = this.formatter.format(message, 'LOG', new Date());
            this.appender.append(logMessage);
        }
        return null;
    }

    warn(message) {
        if (this.level <= Level.WARN) {
            const warnMessage = this.formatter.format(message, 'WARN', new Date());
            this.appender.append(warnMessage);
        }
        return null;
    }

    error(message) {
        if (this.level <= Level.ERROR) {
            const errorMessage = this.formatter.format(message, 'ERROR', new Date());
            this.appender.append(errorMessage);
        }
        return null;
    }

}
