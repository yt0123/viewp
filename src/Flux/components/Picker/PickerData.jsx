var React = require('react');

var PickerData = React.createClass({
    propTypes: {
        color: React.PropTypes.array.isRequired
    },
    render: function() {
        var { color } = this.props;
        var rgb = 'rgb(' + color.join(',') + ')';
        var evaluateRG = color[0] < 120 && color[1] < 120;
        var evaluateGB = color[1] < 120 && color[2] < 120;
        var evaluateBR = color[2] < 120 && color[0] < 120;
        var styles = {
            color: evaluateRG || evaluateGB || evaluateBR ? '#ffffff' : '#000000',
            backgroundColor: rgb
        };
        return (
            <div className="rgb-data" style={styles}>
              {rgb}
            </div>
        );
    }
});

module.exports = PickerData;
