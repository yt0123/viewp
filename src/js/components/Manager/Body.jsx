var React = require('react');
var Store = require('./Store.jsx');
var Load = require('./Load.jsx');

var Body = React.createClass({
    PropTypes: {
        sources: React.PropTypes.array.isRequired,
        actions: React.PropTypes.object.isRequired
    },
    render: function() {
        var { sources, actions } = this.props;
        return (
            <div className="manager-body">
              <Store sources={sources} actions={actions} />
              <Load actions={actions} />
            </div>
        );
    }
});

module.exports = Body;
