import React from 'react';
import PropTypes from 'prop-types';
import AppLogo from './AppLogo.jsx';
import AppSetting from './AppSetting.jsx';
import AppManager from './AppManager.jsx';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { visibility, modal, actions } = this.props;
        return (
            <div className="header">
              <div className="header-contents linearContainer">
                <AppLogo />
                <AppSetting modal={modal} actions={actions} />
                <AppManager visibility={visibility} actions={actions} />
              </div>
            </div>
        );
    }
}

Header.propTypes = {
    visibility: PropTypes.bool.isRequired,
    modal: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};
