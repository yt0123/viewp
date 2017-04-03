var React = require('react');
var Rgb = require('./rgb');
var HueSliderWidget = require('./huesliderwidget.jsx');

var HueSlider = React.createClass({
  propTypes: {
    originColor: React.PropTypes.object.isRequired,
    handleBase: React.PropTypes.func.isRequired,
    sliderLength: React.PropTypes.number.isRequired
  },
  getDefaultProps: function() {
    return {
      sliderLength: 306
    };
  },
  handleChange: function(x) {
    var rgb = new Rgb();
    rgb.setHsl((x/this.props.sliderLength)*360,100,50);
    this.props.handleBase(rgb);
  },
  render: function() {
    return (
      <div className="hue-slider">
        <HueSliderWidget originColor={this.props.originColor} handleChange={this.handleChange} limitX={this.props.sliderLength} />
      </div>
    );
  }
});

module.exports = HueSlider;
