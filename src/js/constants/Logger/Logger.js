import Level from './Level';
import Formatter from './Formatter';

class Logger {

    constructor(loggerName, loggerLevel, loggerFormater, loogerAppenders) {
        this.name = loggerName;
        this.level = loggerLevel;
        this.formatter = loggerFormatter;
        this.appenders = loggerAppenders;
    }

    setLevel(newLoggerLevel) {
        this.level = newLoggerLevel;
        return null;
    }

    setFormatter(newLoggerFormatter) {
        this.formatter = newLoggerFormatter;
        return null;
    }

    setAppeder(newLoggerAppender) {
        this.appenders.push(newLoggerAppender);
        return null;
    }

    delAppender() {
        this.appenders.pop();
        return null;
    }

    debug(message) {
        if (this.level >= 1) {
            const debugMessage = this.formatter.format(message, Level.DEBUG, new Date());
            for (let appenderId in this.appenders) {
                this.appenders[appenderId].append(debugMessage, Level.DEBUG);
            }
        }
        return null;
    }

    info(message) {
        if (this.level >= 2) {
            const infoMeassge = this.formatter.format(message, Level.INFO, new Date());
            for (let appenderId in this.appenders) {
                this.appenders[appenderId].append(infoMessage, Level.INFO);
            }
        }
        return null;
    }

    log(message) {
        if (this.level >= 3) {
            const logMeassge = this.formatter.format(message, Level.LOG, new Date());
            for (let appenderId in this.appenders) {
                this.appenders[appenderId].append(logMessage, Level.LOG);
            }
        }
        return null;
    }

    warn(message) {
        if (this.level >= 4) {
            const warnMeassge = this.formatter.format(message, Level.WARN, new Date());
            for (let appenderId in this.appenders) {
                this.appenders[appenderId].append(warnMessage, Level.WARN);
            }
        }
        return null;
    }

    error(message) {
        if (this.level >= 5) {
            const errorMeassge = this.formatter.format(message, Level.ERROR, new Date());
            for (let appenderId in this.appenders) {
                this.appenders[appenderId].append(errorMessage, Level.ERROR);
            }
        }
        return null;
    }

}
