var React = require('react');

var AppSetting = React.createClass({
  render: function() {
    return (
      <div className="appSetting linearRight boxCenter">
        <button type="button" className="setting-toggle">
          <img src="dest/img/setting-icon.png" width="12px" height="12px" />
        </button>
      </div>
    );
  }
})

module.exports = AppSetting;
