import React from 'react';
import PropTypes from 'prop-types';

export default class Assembly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { assembly, subAssembly, actions } = this.props;
        let label = assembly[0].toUpperCase() + assembly.slice(1);
        if (subAssembly) {
            label = label + ' - ' + subAssembly[0].toUpperCase() + subAssembly.slice(1);
        }
        return (
            <span>
                Key Property :
                <span className="sampler-label">{label}</span>
            </span>
        );
    }
}

Assembly.propTypes = {
    assembly: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
};
