var React = require('react');
var Body = require('./body.jsx');

var Picker = React.createClass({
    propTypes: {
        display: React.PropTypes.string.isRequired,
        displayX: React.PropTypes.number.isRequired,
        displayY: React.PropTypes.number.isRequired
    },
    render: function() {
        var style = { display: this.props.display, left: this.props.displayX+'px', top: this.props.displayY+'px' };
        return (
            <div ref="view" className="picker-view" style={style}>
              <Body />
            </div>
        );
    }
});

module.exports = Picker;
