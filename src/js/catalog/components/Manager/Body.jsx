import React from 'react';
import PropTypes from 'prop-types';
import Store from './Store.jsx';
import Load from './Load.jsx';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sources, samples, process, actions } = this.props;
        return (
            <div className="manager-body">
              <Store sources={sources} samples={samples} process={process} actions={actions} />
              <Load actions={actions} />
            </div>
        );
    }
}

Body.propTypes = {
    sources: PropTypes.array.isRequired,
    samples: PropTypes.array.isRequired,
    process: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};