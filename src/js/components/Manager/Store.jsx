var React = require('react');
var Source = require('./Source.jsx');

var Store = React.createClass({
    propTypes: {
        sources: React.PropTypes.array.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    render: function() {
        var { sources, actions } = this.props;

        var Sources = [];
        for (var index in sources) {
            Sources.push(
                <li key={index} className="store-list">
                  <Source source={sources[index]} actions={actions} />
                </li>
            );
        }
        var styles = sources.length > 0 ? { display: 'none' } : { display: 'block' } ;

        return (
            <ul className="manager-store">
              <li className="store-none" style={styles}>None Source</li>
              {Sources}
            </ul>
        );
    }
});

module.exports = Store;
