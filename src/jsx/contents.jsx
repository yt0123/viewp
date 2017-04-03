var React = require('react');
var Manager = require('./manager/manager.jsx');

var Contents = React.createClass({
  propTypes: {
    triggerManager: React.PropTypes.number.isRequired
  },
  render: function() {
    return (
      <div className="contents">
        <Manager triggerManager={this.props.triggerManager} />
      </div>
    );
  }
});

module.exports = Contents;
