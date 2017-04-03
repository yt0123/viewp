var React = require('react');

var AppManager = React.createClass({
  propTypes: {
    onClickManager: React.PropTypes.func.isRequired
  },
  handleClick: function(ev) {
    this.props.onClickManager(ev);
  },
  render: function() {
    return (
      <div className="appManager linearRight boxCenter">
        <div className="manager-toggle linearContainer" onClick={this.handleClick}>
          <span className="linearLeft">My Source</span>
          <img className="linearLeft" src="dest/img/down-icon.png" width="12px" height="12px" />
        </div>
      </div>
    );
  }
});

module.exports = AppManager;

