var React = require('react');

var RgbData = React.createClass({
  propTypes: {
    targetColor: React.PropTypes.object.isRequired
  },
  render: function() {
    var evaluateRG = this.props.targetColor.r < 120 && this.props.targetColor.g < 120;
    var evaluateGB = this.props.targetColor.g < 120 && this.props.targetColor.b < 120;
    var evaluateBR = this.props.targetColor.b < 120 && this.props.targetColor.r < 120;
    var style = {
      color: evaluateRG || evaluateGB || evaluateBR ? '#ffffff' : '#000000',
      backgroundColor: this.props.targetColor.toString()
    };
    return (
      <div className="rgb-data" style={style}>
        {this.props.targetColor.toString()}
      </div>
    );
  }
});

module.exports = RgbData;
