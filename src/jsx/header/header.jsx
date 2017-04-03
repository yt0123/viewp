var React = require('react');
var AppLogo = require('./applogo.jsx');
var AppSetting = require('./appsetting.jsx');
var AppManager = require('./appmanager.jsx');

var Header = React.createClass({
  propTypes: {
    onClickManager: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="header">
        <div className="headerContents linearContainer">
          <AppLogo />
          <AppSetting />
          <AppManager onClickManager={this.props.onClickManager} />
        </div>
      </div>
    );
  }
});

module.exports = Header;
