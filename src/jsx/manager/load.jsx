var React = require('react');

var Load = React.createClass({
  propTypes: {
    handleLoad: React.PropTypes.func.isRequired
  },
  handleClick: function(ev) {
    this.props.handleLoad()
  },
  render: function() {
    return (
      <div className="manager-load" onClick={this.handleClick}>
        Source Add +
      </div>
    );
  }
});

module.exports = Load;
