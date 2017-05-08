import React from 'react';
import PropTypes from 'prop-types';
import PickerMap from './PickerMap.jsx';

export default class Picker extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        ev.stopPropagation();
    }

    render() {
        const { color, display, handleChange } = this.props;
        const styles = { left: display.x+'px', top: display.y+'px' };
        return (
            <div ref="view" className="picker-view" style={styles} onClick={this.handleClick}>
              <PickerMap color={color} handleChange={handleChange} />
            </div>
        );
    }
}

Picker.propTypes = {
    color: PropTypes.array.isRequired,
    display: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};
