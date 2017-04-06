var React = require('react');
var PickerMap = require('./PickerMap.jsx');

var Picker = React.createClass({
    propTypes: {
        color: React.PropTypes.array.isRequired,
        display: React.PropTypes.object.isRequired,
        handleChange: React.PropTypes.func.isRequired
    },
    handleClick: function(ev) {
        ev.stopPropagation();
    },
    render: function() {
        var { color, display, handleChange } = this.props;
        var styles = { left: display.x+'px', top: display.y+'px' };
        return (
            <div ref="view" className="picker-view" style={styles} onClick={this.handleClick}>
              <PickerMap color={color} handleChange={handleChange} />
            </div>
        );
    }
});

module.exports = Picker;
