import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Body from './Body.jsx';

export default class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { completed, actions } = this.props;
        const styles = { width: String(completed) + '%' };
        return (
            <div className="sampler-progress">
                <h3>Target property processing ... </h3>
                <div className="sampler-progressbar">
                    <div style={styles} />
                </div>
            </div>
        );
    }
}

Progress.propTypes = {
    completed: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
};
