export default class Formatter {

    constructor(formatterName, formatPattern) {
        this.formatterName = formatterName;
        this.formatPattern = formatPattern || '%d{yyyy/MM/dd HH:mm:ss} %p %c{1}: %m%n';
    }

    setFormatterName(newFormatterName) {
        this.formatterName = newFormatterName;
        return this;
    }

    convert(message, level, date, prefix, suffix) {
        switch(prefix) {
            case '%c':
                suffix = Number(suffix.slice(1,-1));
                const category = this.formatterName.split('.').slice(-1 * suffix)
                return category.join('.');
                break;
            case '%d':
                suffix = suffix.slice(1,-1)
                suffix = suffix.replace(/yyyy/g, date.getFullYear());
                suffix = suffix.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
                suffix = suffix.replace(/dd/g, ('0' + date.getDate()).slice(-2));
                suffix = suffix.replace(/HH/g, ('0' + date.getHours()).slice(-2));
                suffix = suffix.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
                suffix = suffix.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
                return suffix;
                break;
            case '%p':
                return level + suffix;
                break;
            case '%m':
                return message + suffix;
                break;
            case '%n':
                return '\n' + suffix;
                break;
            default:
                return '';
        }
    }

    format(message, level, date) {
        let formatMessage = this.formatPattern;
        const stack = this.formatPattern.match(/\%\D{1}(\{[^\}]+\})*/g);
        while(stack.length > 0) {
            const expr = stack.pop();
            const prefix = expr.slice(0, 2);
            const suffix = expr.length > 2 ? expr.slice(2) : '' ;
            formatMessage = formatMessage.replace(expr, this.convert(message, level, date, prefix, suffix));
        }
        return formatMessage;
    }

}
