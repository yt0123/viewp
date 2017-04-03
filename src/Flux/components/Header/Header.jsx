var React = require('react');
var AppLogo = require('./applogo.jsx');
var AppSetting = require('./appsetting.jsx');
var AppManager = require('./appmanager.jsx');

var Header = React.createClass({
    propTypes: {
        visibility: React.PropTypes.bool.isRequired,
        modal: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    render: function() {
        var { visibility, modal, actions } = this.props;
        return (
            <div className="header">
              <div className="headerContents linearContainer">
                <AppLogo />
                <AppSetting modal={modal} actions={actions} />
                <AppManager visibility={visibility} actions={actions} />
              </div>
            </div>
        );
    }
});

module.exports = Header;
