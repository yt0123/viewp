var React = require('react');
var Bind = require('../../constants/Bind.js');

var map = null;

var Map = React.createClass({
    propTypes: {
        sources: React.PropTypes.array.isRequired,
        config: React.PropTypes.object.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    componentDidMount: function() {
        var { sources, config } = this.props;
        map = new Bind('map', sources, config);
    },
    componentDidUpdate: function(prevProps, prevState) {
        var { sources, config } = this.props;
        console.log(sources, config);
        map.update(sources, config);
    },
    render: function() {
        var { sources, config, actions } = this.props;
        return (
            <div id="map" className="map">
            </div>
        );
    }
});

module.exports = Map;
