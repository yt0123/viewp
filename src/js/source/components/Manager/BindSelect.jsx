import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export default class Bind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: { value: 'none', label: '[x] None' }
        };
        this.handleBind = this.handleBind.bind(this);
    }

    handleBind(nextOption) {
        const { handleChange } = this.props;
        handleChange(nextOption.value);
        this.setState({ selectedOption: nextOption });
    }

    render() {
        const { source, handleChange } = this.props;
        const { selectedOption } = this.state;
        const styles = { width: '110px' };
        const options = source.extra.filter(function(elm) {
            return elm.name !== 'tmp_';
        }).map(function(elm) {
            const notations = elm.name.split('.');
            const key = notations[notations.length - 1];
            if (notations[0] === 'tmp_') {
                return {
                    value: elm.name,
                    label: '[s] ' + key[0].toUpperCase() + key.slice(1)
                }
            }
            return {
                value: elm.name,
                label: '[' + String(elm.rank) + '] ' + key[0].toUpperCase() + key.slice(1)
            };
        });
        return (
            <span className="bind-select">
                <Select
                    name="source-select"
                    style={styles}
                    wrapperStyle={styles}
                    value={selectedOption.value}
                    options={options}
                    autosize={false}
                    clearable={false}
                    searchable={false}
                    onChange={this.handleBind}
                />
            </span>
        );
    }
}

Bind.propTypes = {
    source: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};
