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
        const { options, handleChange } = this.props;
        const { selectedOption } = this.state;
        const styles = { width: '110px' };
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
    options: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
};
