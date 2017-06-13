import Level from './Level';
import Appender from './Appender';
import Formatter from './Formatter';

class Logger {

    constructor(loggerName, loggerLevel, loggerAppend, loggerFormat) {
        this.name = loggerName;
        this.level = loggerLevel;
        this.appender = new Appender(loggerName, loggerAppend)
        this.formatter = new Formatter(loggerName, loggerFormat);
    }

    setLevel(newLoggerLevel) {
        this.level = newLoggerLevel;
        return null;
    }

    setStyle(newLoggerStyle) {
        this.style = newLoggerStyle;
        return null;
    }

    debug(message) {
        if (this.level >= 1) {
            const debugMessage = this.formatter.format(message, Level.DEBUG, new Date());
            this.appender.append(debugMessage, Level.DEBUG);
        }
        return null;
    }

    info(message) {
        if (this.level >= 2) {
            const infoMeassge = this.formatter.format(message, Level.INFO, new Date());
            this.appender.append(infoMessage, Level.INFO);
        }
        return null;
    }

    log(message) {
        if (this.level >= 3) {
            const logMeassge = this.formatter.format(message, Level.LOG, new Date());
            this.appender.append(logMessage, Level.LOG);
        }
        return null;
    }

    warn(message) {
        if (this.level >= 4) {
            const warnMeassge = this.formatter.format(message, Level.WARN, new Date());
            this.appender.append(warnMessage, Level.WARN);
        }
        return null;
    }

    error(message) {
        if (this.level >= 5) {
            const errorMeassge = this.formatter.format(message, Level.ERROR, new Date());
            this.appender.append(errorMessage, Level.ERROR);
        }
        return null;
    }

}
