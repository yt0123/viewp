var React = require('react');
var HueSliderWidget = require('./HueSliderWidget.jsx');

var HueSlider = React.createClass({
    propTypes: {
        color: React.PropTypes.array.isRequired,
        handleChange: React.PropTypes.func.isRequired,
        sliderLength: React.PropTypes.number.isRequired
    },
    getDefaultProps: function() {
        return { sliderLength: 306 };
    },
    render: function() {
        var { color, handleChange, sliderLength } = this.props;
        return (
            <div className="hue-slider">
              <HueSliderWidget handleChange={handleChange} color={color} limit={sliderLength} />
            </div>
        );
    }
});

module.exports = HueSlider;
