import React from 'react';
import PropTypes from 'prop-types';

export default class PickerData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { color } = this.props;
        const rgb = 'rgb(' + color.join(',') + ')';
        const evaluateRG = color[0] < 120 && color[1] < 120;
        const evaluateGB = color[1] < 120 && color[2] < 120;
        const evaluateBR = color[2] < 120 && color[0] < 120;
        const styles = {
            color: evaluateRG || evaluateGB || evaluateBR ? '#ffffff' : '#000000',
            backgroundColor: rgb
        };
        return (
            <div className="rgb-data" style={styles}>
              {rgb}
            </div>
        );
    }
}

PickerData.propTypes = {
    color: PropTypes.array.isRequired
};
