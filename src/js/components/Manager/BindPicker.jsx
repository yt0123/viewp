var React = require('react');
var Picker = require('../Picker/Picker.jsx');

var Bind = React.createClass({
    propTypes: {
        defaultValue: React.PropTypes.array.isRequired,
        handleChange: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            color: this.props.defaultValue,
            visibility: false
        };
    },
    handleActivate: function(ev) {
        var { handleChange } = this.props;
        var { color, visibility } = this.state;
        var target = ev.target.parentNode;
        if (visibility) {
            handleChange(color);
            document.removeEventListener('mousedown', deactivate, false);
            window.removeEventListener('resize', deactivate, false);
        } else {
            document.addEventListener('mousedown', deactivate, false);
            window.addEventListener('resize', deactivate, false);
        }
        var self = this;
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
    },
    handleBind: function(nextColor) {
        this.setState({ color: nextColor });
    },
    render: function() {
        var { defaultValue, handleChange } = this.props;
        var { color, visibility } = this.state;
        var ColorPicker = null;
        if (visibility) {
            var position = { x: this.refs.toggle.offsetLeft, y: this.refs.toggle.offsetTop };
            ColorPicker = <Picker color={color} display={position} handleChange={this.handleBind} />;
        }
        var styles = {backgroundColor: 'rgb('+color.join(',')+')'};
        return (
            <span className="bind-picker">
              <button ref="toggle" className="picker-toggle" style={styles} onClick={this.handleActivate}>
                {ColorPicker}
              </button>
            </span>
        );
    }
});

module.exports = Bind;
