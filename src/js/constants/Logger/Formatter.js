export default class Formatter {

    this.defaultFormat = "%d{yy/MM/dd HH:mm:ss} %p %c{1}: %m%n"

    constructor(name, pattern) {
        this.name = name;
        this.pattern = format;
    }

    convert(message, level, date, type, pattern) {
        switch(type) {
            case '%c':
                return this.name + pattern;
                break;
            case '%d':
                pattern = pattern.slice(1,-1)
                pattern = pattern.replace(/YYYY/g, date.getFullYear());
                pattern = pattern.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
                pattern = pattern.replace(/DD/g, ('0' + date.getDate()).slice(-2));
                pattern = pattern.replace(/hh/g, ('0' + date.getHours()).slice(-2));
                pattern = pattern.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
                pattern = pattern.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
                return pattern;
                break;
            case '%p':
                return level + pattern;
                break;
            case '%m':
                return message + pattern;
                break;
            case '%n':
                return '\n' + pattern;
                break;
            default:
                return null;
        }
    }

    pattern(message, level, date) {
        let patternMessage = message;
        const stack = this.pattern.split(" ");
        while(stack.lenght > 0) {
            const expr = stack.pop;
            const prefix = expr.slice(0, 1);
            const suffix = expr.slice(2);
            patternMessage = convert(message, level, date, preffix, suffix) + formatMessage;
        }
        return patternMessage;
    }

}
