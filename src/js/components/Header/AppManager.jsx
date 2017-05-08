import React from 'react';
import PropTypes from 'prop-types';

export default class AppManager extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        const { actions } = this.props;
        actions.changeVisibility();
    }

    render() {
        const { visibility } = this.props;
        const imgSrc = visibility ? 'dest/img/up-icon.png' : 'dest/img/down-icon.png';
        return (
            <div className="appManager linearRight boxCenter">
              <div className="manager-toggle linearContainer" onClick={this.handleClick}>
                <span className="linearLeft">My Source</span>
                <img className="linearLeft" src={imgSrc} width="12px" height="12px" />
              </div>
            </div>
        );
    }
}

AppManager.propTypes = {
    visibility: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};
