import Utils from '../Utils';
import LogManager from '../Logger';

class Properties {
    constructor() {
        this.values = [];
        this.limit = 100;
        this.logger = LogManager.getLogger('ty.edelweiss.veiep.Properties');
    }

    setValue(newProperties) {
        this.values.push(newProperties.slice(1));
        this.logger.log('Add properties take the number of ' + String(this.values.length - 1) + ' elements');
        return this;
    }

    addValue(propertyId, newProperties) {
        this.values[propertyId] = this.values.concat(newProperties);
        return this;
    }

    delValue(propertyId) {
        this.values.splice(propertyId, 1);
        this.logger.log('Delete properties take the number of ' + String(this.values.length - 1) + ' elements');
        return this;
    }

    getValue(propertyId) {
        return this.values[propertyId];
    }

    getValues() {
        return this.values;
    }

    getLimit() {
        return this.limit;
    }

    fetch(propertyKey, properties) {
        let property = '';
        const tmpString = String(Utils.dotSearch(propertyKey, properties));
        if (tmpString.length > this.limit) {
            property = tmpString.slice(0, this.limit) + '...';
        } else {
            property = tmpString;
        }
        return property;
    }

    deploy(propertyId, properties) {
        const propertyValue = this.values[propertyId];
        let contents = '';
        const self = this;
        propertyValue.forEach(function(elm, index) {
            const key = elm.name;
            let property = '';
            if (elm.type !== 'Object') {
                const tmpString = String(Utils.dotSearch(elm.name, properties));
                if (tmpString.length > self.limit) {
                    property = tmpString.slice(0, self.limit) + '...';
                } else {
                    property = tmpString;
                }
                const lines = { key: ['[ ', key, ' ]', '<br />'], property: [property, '<br />'] };
                contents = contents + lines.key.join('') + lines.property.join('');
            }
        });
        return contents;
    }
}

export default new Properties();
