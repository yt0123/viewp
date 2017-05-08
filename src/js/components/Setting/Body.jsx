import React from 'react';
import PropTypes from 'prop-types';
import List from './List.jsx';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        const { actions } = this.props;
        actions.changeModal();
    }

    render() {
        const { config, modal, actions } = this.props;
        return (
            <div className="setting-wrap">
              <div className="setting-menu">
                <button className="setting-close" onClick={this.handleClick}>
                  <img src="./dest/img/destroy-icon.png" width="12px" height="12px" />
                </button>
                <List config={config} actions={actions} />
              </div>
            </div>
        );
    }
}

Body.propTypes = {
    config: PropTypes.object.isRequired,
    modal: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};
