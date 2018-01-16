import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';

export default class Bind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'rgb(' + props.defaultValue.join(',') + ')',
            visibility: false
        };
        this.handleActivate = this.handleActivate.bind(this);
        this.handleDeactivate = this.handleDeactivate.bind(this);
        this.handleBind = this.handleBind.bind(this);
    }

    handleActivate(ev) {
        const { visibility } = this.state;
        this.setState({ visibility: !visibility });
    }

    handleDeactivate(ev) {
        this.setState({ visibility: false });
    }

    handleBind(nextColor) {
        const { handleChange } = this.props;
        const color = [nextColor.rgb.r, nextColor.rgb.g, nextColor.rgb.b];
        handleChange(color);
        this.setState({ color: 'rgb(' + color.join(",") + ')' });
    }

    render() {
        const { defaultValue, handleChange } = this.props;
        const { color, visibility } = this.state;
        let ColorPicker = null;
        if (visibility) {
            ColorPicker = (
                <div className="picker-popover">
                    <div className="picker-cover" onClick={this.handleDeactivate}/>
                    <ChromePicker color={color} onChange={this.handleBind} disableAlpha={true} />
                </div>
            );
        }
        const styles = { backgroundColor: color };
        return (
            <span className="bind-picker">
                <div ref="toggle" className="picker-toggle" onClick={this.handleActivate}>
                    <div className="picker-color" style={styles} />
                </div>
                {ColorPicker}
            </span>
        );
    }
}

Bind.propTypes = {
    defaultValue: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
};
