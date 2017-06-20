import React from 'react';
import PropTypes from 'prop-types';
import HueSliderWidget from './HueSliderWidget.jsx';

export default class HueSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { color, handleChange, sliderLength } = this.props;
        return (
            <div className="hue-slider">
              <HueSliderWidget handleChange={handleChange} color={color} limit={sliderLength} />
            </div>
        );
    }
}

HueSlider.propTypes = {
    color: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    sliderLength: PropTypes.number.isRequired
};
HueSlider.defaultProps = { sliderLength: 306 };
