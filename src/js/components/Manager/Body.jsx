import React from 'react';
import PropTypes from 'prop-types';
import Store from './Store.jsx';
import Load from './Load.jsx';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sources, actions } = this.props;
        return (
            <div className="manager-body">
              <Store sources={sources} actions={actions} />
              <Load actions={actions} />
            </div>
        );
    }
}
