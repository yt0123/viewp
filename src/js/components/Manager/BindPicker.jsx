import React from 'react';
import PropTypes from 'prop-types';
import Picker from '../Picker/Picker.jsx';

export default class Bind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: props.defaultValue,
            visibility: false
        };
        this.handleActivate = this.handleActivate.bind(this);
        this.handleBind = this.handleBind.bind(this);
    }

    handleActivate(ev) {
        const { handleChange } = this.props;
        const { color, visibility } = this.state;
        const target = ev.target.parentNode;
        if (visibility) {
            handleChange(color);
            document.removeEventListener('mousedown', deactivate, false);
            window.removeEventListener('resize', deactivate, false);
        } else {
            document.addEventListener('mousedown', deactivate, false);
            window.addEventListener('resize', deactivate, false);
        }
        const self = this;
        function deactivate(ev) {
            var ancestor = ev.target;
            while (ancestor.parentNode) {
                if (ancestor === target) { break; }
                ancestor = ancestor.parentNode;
            }
            if (!ancestor.parentNode) {
                handleChange(self.state.color);
                document.removeEventListener('mousedown', deactivate, false);
                window.removeEventListener('resize', deactivate, false);
                self.setState({ visibility: false });
            }
        }
        this.setState({ visibility: !visibility });
    }

    handleBind(nextColor) {
        this.setState({ color: nextColor });
    }

    render() {
        const { defaultValue, handleChange } = this.props;
        const { color, visibility } = this.state;
        let ColorPicker = null;
        if (visibility) {
            const position = { x: this.refs.toggle.offsetLeft, y: this.refs.toggle.offsetTop };
            ColorPicker = <Picker color={color} display={position} handleChange={this.handleBind} />;
        }
        const styles = {backgroundColor: 'rgb('+color.join(',')+')'};
        return (
            <span className="bind-picker">
              <button ref="toggle" className="picker-toggle" style={styles} onClick={this.handleActivate}>
                {ColorPicker}
              </button>
            </span>
        );
    }
}

Bind.propTypes = {
    defaultValue: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
};
