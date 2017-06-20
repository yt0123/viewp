import LogManager from '../Logger';

class Properties {
    constructor() {
        this.values = [{ category: ['none'], group: [''] }];
        this.names = ['none'];
        this.logger = LogManager.getLogger('ty.edelweiss.veiep.Properties');
    }

    _unique() {
        let nameSet = [];
        for (let i = 0; i < this.values.length; i++) {
            const uniquePropertyNames = this.values[i]['category'].filter(function(elm, index) { return nameSet.indexOf(elm) === -1; });
            nameSet = nameSet.concat(uniquePropertyNames);
        }
        return nameSet;
    }

    setValue(newProperties) {
        this.values.push(newProperties);
        this.logger.log('Add properties take the number of ' + String(this.values.length - 1) + ' elements');
        this.names = this._unique();
        return this;
    }

    delValue(propertyId) {
        this.values.splice(propertyId + 1, 1);
        this.logger.log('Delete properties take the number of ' + String(this.values.length - 1) + ' elements');
        this.names = this._unique();
        return this;
    }

    getValue(propertyId) {
        return this.values[propertyId];
    }

    getValues() {
        return this.values;
    }

    getNames() {
        return this.names;
    }

    deploy(propertyId, propertyName) {
        const index = this.values[propertyId + 1]['category'].indexOf(propertyName);
        let properties = this.values[propertyId + 1]['group'][index].split('.');
        if (properties[0] === '') { properties.pop(); }
        properties.push(this.values[propertyId + 1]['category'][index]);
        return properties;
    }
}

export default new Properties();
